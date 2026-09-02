import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Your Resend Webhook Secret
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
      console.error('RESEND_WEBHOOK_SECRET is not set');
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

    // Handle the event
    const { type, data } = evt;

    if (type === 'email.received') {
      const { from, to, subject, html, text, attachments } = data;
      // Extract the exact email address from strings like "Name <email@astropixel.tech>"
      const toAddresses = Array.isArray(to) ? to : [to];
      
      for (const recipient of toAddresses) {
        const emailMatch = recipient.match(/<([^>]+)>/) ? recipient.match(/<([^>]+)>/)[1] : recipient;
        const cleanTo = emailMatch.trim().toLowerCase();

        // Find the mailbox in our database
        const mailbox = await prisma.mailbox.findUnique({
          where: { address: cleanTo }
        });

        if (mailbox) {
          // Store the email in the inbox!
          // We will expand this with proper threading, attachments, and html sanitization later.
          await prisma.mailMessage.create({
            data: {
              mailbox_id: mailbox.id,
              thread_id: 'temp-thread-id', // Placeholder, will generate proper threads later
              message_id: data.id || \`msg_\${Date.now()}\`, // Use Resend ID or generate one
              folder: 'inbox',
              from_name: from, // Parse name properly later
              from_address: from,
              to_address: cleanTo,
              subject: subject || '(No Subject)',
              body_html: html,
              body_text: text,
              is_read: false,
            }
          });
          console.log(\`[Webhook] Email saved to mailbox: \${cleanTo}\`);
        } else {
          console.log(\`[Webhook] No mailbox found for recipient: \${cleanTo}\`);
        }
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
