import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { z } from 'zod';

const feedbackSchema = z.object({
  rating: z.number().min(1).max(5),
  feedback: z.string().min(2, 'Feedback text required'),
  category: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = feedbackSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid feedback data' },
        { status: 400 }
      );
    }

    const { rating, feedback, category } = validation.data;

    // Save as email message in inbox for admin review
    const record = await prisma.emailMessage.create({
      data: {
        sender_name: 'Anonymous Feedback',
        sender_email: 'feedback@astropixel.tech',
        subject: `[Site Feedback - ${rating} Stars] ${category || 'General'}`,
        message: feedback,
        status: 'pending',
        is_read: false,
      },
    });

    return NextResponse.json(
      { success: true, message: 'Feedback submitted successfully', data: record },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Feedback API Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
