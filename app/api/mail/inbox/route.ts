import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const mailboxAddress = searchParams.get('address') || 'atik@astropixel.tech';
    const folder = searchParams.get('folder') || 'inbox';

    // Find mailbox
    const mailbox = await prisma.mailbox.findUnique({
      where: { address: mailboxAddress },
    });

    if (!mailbox) {
      return NextResponse.json({ error: 'Mailbox not found', messages: [] }, { status: 200 });
    }

    // Get messages from the correct folder
    const messages = await prisma.mailMessage.findMany({
      where: {
        mailbox_id: mailbox.id,
        folder: folder,
      },
      orderBy: { received_at: 'desc' },
      include: { attachments: true },
    });

    return NextResponse.json({ success: true, messages });
  } catch (error: any) {
    console.error('Error fetching inbox:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error', messages: [] }, { status: 500 });
  }
}

// Mark email as read
export async function PATCH(req: Request) {
  try {
    const { messageId } = await req.json();
    await prisma.mailMessage.update({
      where: { id: messageId },
      data: { is_read: true },
    });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
