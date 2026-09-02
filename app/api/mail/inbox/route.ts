import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mailboxAddress = searchParams.get('address') || 'admin@astropixel.tech';

    // Verify if the mailbox exists
    const mailbox = await prisma.mailbox.findUnique({
      where: { address: mailboxAddress },
      include: {
        messages: {
          orderBy: { received_at: 'desc' },
          include: { attachments: true }
        }
      }
    });

    if (!mailbox) {
      return NextResponse.json({ error: 'Mailbox not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, messages: mailbox.messages });
  } catch (error: any) {
    console.error('Error fetching inbox:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
