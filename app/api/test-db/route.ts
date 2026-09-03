import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const mailboxes = await prisma.mailbox.findMany();
    const messages  = await prisma.mailMessage.count();
    return NextResponse.json({ ok: true, mailboxes: mailboxes.length, messages });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message, code: err.code }, { status: 500 });
  }
}
