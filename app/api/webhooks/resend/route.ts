import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  const body = await req.text();

  // ── 1. Verify Svix signature ──────────────────────────────────
  const headersList = headers();
  const svix_id        = headersList.get('svix-id')        ?? '';
  const svix_timestamp = headersList.get('svix-timestamp') ?? '';
  const svix_signature = headersList.get('svix-signature') ?? '';

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
  }

  if (!WEBHOOK_SECRET) {
    console.error('[Webhook] RESEND_WEBHOOK_SECRET not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let evt: any;
  try {
    const wh = new Webhook(WEBHOOK_SECRET);
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('[Webhook] Signature failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // ── 2. Only handle email.received ────────────────────────────
  const { type, data } = evt ?? {};
  console.log('[Webhook] Event type:', type);
  console.log('[Webhook] Data keys:', data ? Object.keys(data) : 'none');

  if (type !== 'email.received') {
    return NextResponse.json({ success: true, message: 'Event ignored' });
  }

  // ── 3. Parse recipient(s) ─────────────────────────────────────
  // Resend payload: data.to can be string or string[]
  const toRaw = data?.to ?? data?.toAddresses ?? [];
  const toAddresses: string[] = Array.isArray(toRaw)
    ? toRaw
    : typeof toRaw === 'string'
      ? [toRaw]
      : [];

  if (toAddresses.length === 0) {
    console.warn('[Webhook] No to-address in payload. Payload data:', JSON.stringify(data).substring(0, 300));
    return NextResponse.json({ success: true, message: 'No recipients' });
  }

  // ── 4. Parse sender ───────────────────────────────────────────
  const fromRaw: string = data?.from ?? data?.fromAddress ?? '';
  const fromMatch = fromRaw.match(/<([^>]+)>/);
  const fromAddress = (fromMatch ? fromMatch[1] : fromRaw).trim().toLowerCase();
  const fromName    = fromMatch
    ? fromRaw.replace(/<[^>]+>/, '').trim().replace(/^"|"$/g, '')
    : fromRaw;

  const subject   = data?.subject ?? '(No Subject)';
  const bodyHtml  = data?.html    ?? null;
  const bodyText  = data?.text    ?? null;
  const emailId   = data?.email_id ?? data?.emailId ?? `msg_${Date.now()}`;

  console.log('[Webhook] From:', fromAddress, '| To:', toAddresses, '| Subject:', subject);

  // ── 5. Save to each mailbox ───────────────────────────────────
  for (const recipient of toAddresses) {
    try {
      const toMatch = recipient.match(/<([^>]+)>/);
      const cleanTo = (toMatch ? toMatch[1] : recipient).trim().toLowerCase();

      // Find the mailbox
      const mailbox = await prisma.mailbox.findUnique({ where: { address: cleanTo } });
      if (!mailbox) {
        console.log(`[Webhook] No mailbox for: ${cleanTo}, auto-creating…`);
        // Auto-create the mailbox so future emails work
        await prisma.mailbox.create({
          data: { address: cleanTo, user_id: 'admin-1', is_active: true }
        });
        // Re-fetch
        const newMailbox = await prisma.mailbox.findUnique({ where: { address: cleanTo } });
        if (!newMailbox) continue;
        await saveMessage(newMailbox, emailId, subject, fromName, fromAddress, cleanTo, bodyHtml, bodyText);
      } else {
        await saveMessage(mailbox, emailId, subject, fromName, fromAddress, cleanTo, bodyHtml, bodyText);
      }
    } catch (err) {
      console.error(`[Webhook] Error saving for ${recipient}:`, err);
    }
  }

  return NextResponse.json({ success: true });
}

async function saveMessage(
  mailbox: { id: string },
  emailId: string,
  subject: string,
  fromName: string,
  fromAddress: string,
  cleanTo: string,
  bodyHtml: string | null,
  bodyText: string | null
) {
  // Check duplicate
  const existing = await prisma.mailMessage.findUnique({ where: { message_id: emailId } });
  if (existing) {
    console.log('[Webhook] Duplicate message, skipping:', emailId);
    return;
  }

  // Upsert thread
  let thread = await prisma.mailThread.findFirst({
    where: { mailbox_id: mailbox.id, subject }
  });

  if (!thread) {
    thread = await prisma.mailThread.create({
      data: {
        mailbox_id: mailbox.id,
        subject,
        last_message_at: new Date(),
      }
    });
  } else {
    await prisma.mailThread.update({
      where: { id: thread.id },
      data: { last_message_at: new Date() }
    });
  }

  // Save message
  const msg = await prisma.mailMessage.create({
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

  console.log(`[Webhook] ✅ Saved message ${msg.id} to ${cleanTo}: "${subject}"`);
}
