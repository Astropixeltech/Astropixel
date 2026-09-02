import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY || '');

export async function POST(req: Request) {
  try {
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: 'Resend API key not configured' }, { status: 500 });
    }

    const { to, subject, html, text, from = 'admin@astropixel.tech' } = await req.json();

    if (!to || !subject) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Since this is a custom system, from address must be verified in Resend (e.g. astropixel.tech)
    const fromAddress = `Astropixel <${from}>`;

    const data = await resend.emails.send({
      from: fromAddress,
      to: [to],
      subject: subject,
      html: html || text || ' ',
      text: text || ' ',
    });

    if (data.error) {
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    // Save to sent folder in database (if using real DB)
    // For now we just return success
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
