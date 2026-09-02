import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const WEBHOOK_SECRET = process.env.RESEND_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const headersList = headers();
    const svix_id = headersList.get('svix-id');
    const svix_timestamp = headersList.get('svix-timestamp');
    const svix_signature = headersList.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
      return NextResponse.json({ error: 'Missing svix headers' }, { status: 400 });
    }

    if (!WEBHOOK_SECRET) {
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: any;
    try {
      evt = wh.verify(body, {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature,
      });
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const { type, data } = evt;

    if (type === 'email.received') {
      const toAddresses: string[] = Array.isArray(data.to) ? data.to : [data.to];
      const fromRaw: string = data.from || '';
      // Parse "Name <email>" or plain "email"
      const fromMatch = fromRaw.match(/<([^>]+)>/);
      const fromAddress = fromMatch ? fromMatch[1].trim() : fromRaw.trim();
      const fromName = fromMatch ? fromRaw.replace(/<[^>]+>/, '').trim() : fromRaw;

      for (const recipient of toAddresses) {
        const toMatch = recipient.match(/<([^>]+)>/);
        const cleanTo = (toMatch ? toMatch[1] : recipient).trim().toLowerCase();

        // Find the mailbox
        const mailbox = await prisma.mailbox.findUnique({ where: { address: cleanTo } });

        if (!mailbox) {
          console.log(`[Webhook] No mailbox for: ${cleanTo}`);
          continue;
        }

        const messageId = data.email_id || data.id || `msg_${Date.now()}_${Math.random().toString(36).slice(2)}`;

        // Upsert a thread for this subject
        const threadSubject = data.subject || 'No Subject';
        let thread = await prisma.mailThread.findFirst({
          where: { mailbox_id: mailbox.id, subject: threadSubject }
        });

        if (!thread) {
          thread = await prisma.mailThread.create({
            data: {
              mailbox_id: mailbox.id,
              subject: threadSubject,
              last_message_at: new Date(),
            }
          });
        } else {
          await prisma.mailThread.update({
            where: { id: thread.id },
            data: { last_message_at: new Date() }
          });
        }

        // Check if this message already exists (idempotency)
        const existing = await prisma.mailMessage.findUnique({ where: { message_id: messageId } });
        if (existing) {
          console.log(`[Webhook] Message already exists: ${messageId}`);
          continue;
        }

        // Save the email
        await prisma.mailMessage.create({
          data: {
            mailbox_id: mailbox.id,
            thread_id: thread.id,
            message_id: messageId,
            folder: 'inbox',
            from_name: fromName || fromAddress,
            from_address: fromAddress,
            to_address: cleanTo,
            subject: threadSubject,
            body_html: data.html || null,
            body_text: data.text || null,
            is_read: false,
            received_at: new Date(),
          }
        });

        console.log(`[Webhook] Saved email to ${cleanTo}: "${threadSubject}"`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Webhook] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
