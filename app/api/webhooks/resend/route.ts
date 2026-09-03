import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';

// Prisma singleton (avoids multiple instances in hot-reload)
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  try {
    const body = await req.text();

    // Read svix headers directly from Request (correct for Route Handlers)
    const svix_id        = req.headers.get('svix-id')        ?? '';
    const svix_timestamp = req.headers.get('svix-timestamp') ?? '';
    const svix_signature = req.headers.get('svix-signature') ?? '';

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
    }

    if (!WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    // Verify signature
    let evt: any;
    try {
      const wh = new Webhook(WEBHOOK_SECRET);
      evt = wh.verify(body, {
        'svix-id':        svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
    } catch (err) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const eventType: string = evt?.type ?? '';
    const data: any = evt?.data ?? {};

    // Accept if type is email.received OR if it has email fields
    const isEmail = eventType === 'email.received' || (data?.from && (data?.to || data?.toAddress));

    if (!isEmail) {
      return NextResponse.json({ success: true, ignored: true, eventType });
    }

    // Parse to-addresses
    const toRaw = data?.to ?? data?.toAddresses ?? data?.toAddress ?? [];
    const toAddresses: string[] = Array.isArray(toRaw)
      ? toRaw
      : typeof toRaw === 'string' ? [toRaw] : [];

    if (toAddresses.length === 0) {
      return NextResponse.json({ success: true, message: 'No recipients' });
    }

    // Parse sender
    const fromRaw: string = data?.from ?? '';
    const fromMatch   = fromRaw.match(/<([^>]+)>/);
    const fromAddress = (fromMatch ? fromMatch[1] : fromRaw).trim().toLowerCase();
    const fromName    = fromMatch
      ? fromRaw.replace(/<[^>]+>/, '').trim().replace(/^"|"$/g, '')
      : fromRaw;

    const subject  = data?.subject  ?? '(No Subject)';
    const bodyHtml = data?.html     ?? null;
    const bodyText = data?.text     ?? null;
    const emailId  = data?.email_id ?? data?.emailId ?? data?.id ?? `msg_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

    const results: string[] = [];

    for (const recipient of toAddresses) {
      const toMatch = recipient.match(/<([^>]+)>/);
      const cleanTo = (toMatch ? toMatch[1] : recipient).trim().toLowerCase();

      // Auto-create mailbox if needed
      let mailbox = await prisma.mailbox.findUnique({ where: { address: cleanTo } });
      if (!mailbox) {
        mailbox = await prisma.mailbox.create({
          data: { address: cleanTo, user_id: 'admin-1', is_active: true }
        });
      }

      // Skip duplicate
      const existing = await prisma.mailMessage.findUnique({ where: { message_id: emailId } });
      if (existing) { results.push(`${cleanTo}: duplicate`); continue; }

      // Create thread
      let thread = await prisma.mailThread.findFirst({ where: { mailbox_id: mailbox.id, subject } });
      if (!thread) {
        thread = await prisma.mailThread.create({
          data: { mailbox_id: mailbox.id, subject, last_message_at: new Date() }
        });
      } else {
        await prisma.mailThread.update({
          where: { id: thread.id },
          data: { last_message_at: new Date() }
        });
      }

      // Save message
      await prisma.mailMessage.create({
        data: {
          mailbox_id:   mailbox.id,
          thread_id:    thread.id,
          message_id:   emailId,
          folder:       'inbox',
          from_name:    fromName,
          from_address: fromAddress,
          to_address:   cleanTo,
          subject,
          body_html:    bodyHtml,
          body_text:    bodyText,
          is_read:      false,
          received_at:  new Date(),
        }
      });

      results.push(`${cleanTo}: saved`);
    }

    return NextResponse.json({ success: true, results });

  } catch (err: any) {
    console.error('[Webhook] Error:', err?.message ?? err);
    return NextResponse.json({ error: err?.message ?? 'Internal error' }, { status: 500 });
  }
}
