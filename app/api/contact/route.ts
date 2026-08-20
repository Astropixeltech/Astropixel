import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(5, 'Message must be at least 5 characters'),
  service: z.string().optional(),
  budget: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = contactSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { name, email, message, service, budget } = validation.data;

    const emailRecord = await prisma.emailMessage.create({
      data: {
        sender_name: name,
        sender_email: email,
        subject: `[Agency Inquiry - ${service || 'General'}] Budget: ${budget || 'N/A'}`,
        message: message,
        status: 'pending',
        is_read: false,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Inquiry submitted successfully', data: emailRecord },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
