import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const works = await prisma.work.findMany({
      where: { is_published: true },
      orderBy: { order_index: 'asc' },
    });
    return NextResponse.json(works);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const work = await prisma.work.create({
      data: {
        title: body.title,
        title_bn: body.title_bn,
        title_en: body.title_en,
        description: body.description,
        description_bn: body.description_bn,
        description_en: body.description_en,
        category: body.category,
        image_url: body.image_url,
        client: body.client,
        completion_date: body.completion_date,
        technologies: body.technologies,
        live_url: body.live_url,
        is_featured: body.is_featured ?? false,
        is_published: body.is_published ?? true,
        order_index: body.order_index ?? 0,
      },
    });
    return NextResponse.json(work);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
