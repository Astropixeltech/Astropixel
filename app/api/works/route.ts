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

    let generatedSlug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // check if slug exists
    const existing = await prisma.work.findUnique({ where: { slug: generatedSlug } });
    if (existing) {
      generatedSlug = `${generatedSlug}-${Date.now()}`;
    }

    const work = await prisma.work.create({
      data: {
        title: body.title,
        slug: generatedSlug,
        title_bn: body.title_bn,
        title_en: body.title_en,
        description: body.description,
        description_bn: body.description_bn,
        description_en: body.description_en,
        category: body.category,
        tags: body.tags || [],
        project_type: body.project_type,
        image_url: body.image_url,
        client: body.client,
        completion_date: body.completion_date,
        technologies: body.technologies,
        live_url: body.live_url,
        is_featured: body.is_featured ?? false,
        is_published: body.is_published ?? true,
        content_blocks: body.content_blocks || [],
        order_index: body.order_index ?? 0,
      },
    });
    return NextResponse.json(work);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
