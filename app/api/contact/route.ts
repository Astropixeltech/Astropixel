import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }

    const subject = `New Inquiry: ${service || 'General'} from ${name}`;
    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; rounded: 10px;">
        <h2 style="color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 8px;">New Project Inquiry — AstroPixel</h2>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        ${phone ? `<p><strong>Phone / WhatsApp:</strong> ${phone}</p>` : ''}
        ${service ? `<p><strong>Service Requested:</strong> ${service}</p>` : ''}
        ${budget ? `<p><strong>Budget:</strong> ${budget}</p>` : ''}
        <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-top: 15px;">
          <h4 style="margin-top: 0; color: #334155;">Message:</h4>
          <p style="white-space: pre-wrap; color: #1e293b;">${message}</p>
        </div>
      </div>
    `;

    // 1. Try forwarding email to admin mailbox via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'AstroPixel Inquiry <hello@astropixel.tech>',
          to: ['atik@astropixel.tech', 'sofiullahahammed6@gmail.com'],
          replyTo: email,
          subject,
          html: htmlContent,
        });
      } catch (sendErr) {
        console.warn('Resend forward warning:', sendErr);
      }
    }

    // 2. Also save into MailMessage DB so it appears directly inside Admin Mail Workspace!
    try {
      let mailbox = await prisma.mailbox.findFirst({ where: { address: 'atik@astropixel.tech' } });
      if (mailbox) {
        let thread = await prisma.mailThread.create({
          data: {
            mailbox_id: mailbox.id,
            subject,
            last_message_at: new Date(),
          }
        });

        await prisma.mailMessage.create({
          data: {
            mailbox_id: mailbox.id,
            thread_id: thread.id,
            message_id: `inquiry_${Date.now()}`,
            folder: 'inbox',
            from_name: name,
            from_address: email,
            to_address: 'atik@astropixel.tech',
            subject,
            body_html: htmlContent,
            body_text: `From: ${name} (${email})\nService: ${service || 'General'}\nPhone: ${phone || 'N/A'}\nBudget: ${budget || 'N/A'}\n\n${message}`,
            is_read: false,
            received_at: new Date(),
          }
        });
      }
    } catch (dbErr) {
      console.warn('MailMessage DB save warning:', dbErr);
    }

    return NextResponse.json({ success: true, message: 'Inquiry sent successfully!' });
  } catch (err: any) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: err.message || 'Failed to send inquiry' }, { status: 500 });
  }
}
