import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  const body = await req.text();

  const headersList = headers();
  const svix_id        = headersList.get('svix-id')        ?? '';
  const svix_timestamp = headersList.get('svix-timestamp') ?? '';
  const svix_signature = headersList.get('svix-signature') ?? '';

  if (!WEBHOOK_SECRET) {
    console.error('[Webhook] RESEND_WEBHOOK_SECRET not set');
    return NextResponse.json({ error: 'Secret not configured' }, { status: 500 });
  }

  // Verify signature
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
    // Try parsing without verification for debugging
    try { evt = JSON.parse(body); } catch { }
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  // Log everything for debugging
  console.log('[Webhook] Full evt:', JSON.stringify(evt).substring(0, 500));
  console.log('[Webhook] evt.type:', evt?.type);
  console.log('[Webhook] evt.data?.from:', evt?.data?.from);

  // Determine event type - handle multiple possible formats
  const eventType: string = evt?.type ?? evt?.event ?? '';
  const data: any = evt?.data ?? evt ?? {};

  console.log('[Webhook] Resolved eventType:', eventType);

  // Process if it's email.received OR if it has email fields (inbound email)
  const isEmailReceived = eventType === 'email.received' || (data?.from && data?.to && data?.subject !== undefined);

  if (!isEmailReceived) {
    console.log('[Webhook] Ignoring event type:', eventType);
    return NextResponse.json({ success: true, ignored: true, eventType });
  }

  console.log('[Webhook] Processing inbound email from:', data?.from, 'to:', data?.to);

  // Parse recipient(s)
  const toRaw = data?.to ?? data?.toAddresses ?? [];
  const toAddresses: string[] = Array.isArray(toRaw)
    ? toRaw
    : typeof toRaw === 'string' ? [toRaw] : [];

  if (toAddresses.length === 0) {
    console.warn('[Webhook] No to-address. data.to:', data?.to);
    return NextResponse.json({ success: true, message: 'No recipients' });
  }

  // Parse sender
  const fromRaw: string = data?.from ?? '';
  const fromMatch = fromRaw.match(/<([^>]+)>/);
  const fromAddress = (fromMatch ? fromMatch[1] : fromRaw).trim().toLowerCase();
  const fromName    = fromMatch
    ? fromRaw.replace(/<[^>]+>/, '').trim().replace(/^"|"$/g, '')
    : fromRaw;

  const subject  = data?.subject  ?? '(No Subject)';
  const bodyHtml = data?.html     ?? null;
  const bodyText = data?.text     ?? null;
  const emailId  = data?.email_id ?? data?.emailId ?? data?.id ?? `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`;

  console.log('[Webhook] Saving email - from:', fromAddress, '| to:', toAddresses, '| subject:', subject);

  const results: string[] = [];

  for (const recipient of toAddresses) {
    try {
      const toMatch = recipient.match(/<([^>]+)>/);
      const cleanTo = (toMatch ? toMatch[1] : recipient).trim().toLowerCase();

      // Auto-create mailbox if not exists
      let mailbox = await prisma.mailbox.findUnique({ where: { address: cleanTo } });
      if (!mailbox) {
        console.log(`[Webhook] Creating mailbox for: ${cleanTo}`);
        mailbox = await prisma.mailbox.create({
          data: { address: cleanTo, user_id: 'admin-1', is_active: true }
        });
      }

      // Check duplicate
      const existing = await prisma.mailMessage.findUnique({ where: { message_id: emailId } });
      if (existing) {
        console.log('[Webhook] Duplicate, skipping:', emailId);
        results.push(`${cleanTo}: duplicate`);
        continue;
      }

      // Create or find thread
      let thread = await prisma.mailThread.findFirst({
        where: { mailbox_id: mailbox.id, subject }
      });
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

      console.log(`[Webhook] ✅ Saved: ${msg.id} → ${cleanTo}: "${subject}"`);
      results.push(`${cleanTo}: saved`);
    } catch (err: any) {
      console.error(`[Webhook] Error for ${recipient}:`, err?.message ?? err);
      results.push(`${recipient}: error - ${err?.message}`);
    }
  }

  return NextResponse.json({ success: true, results });
}
