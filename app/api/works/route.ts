import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// GET all works
export async function GET() {
  try {
    const works = await prisma.work.findMany({
      orderBy: { order_index: 'asc' },
    });
    return NextResponse.json({ success: true, works });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST create new project with Behance content blocks
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      title,
      description,
      category,
      image_url,
      live_url,
      project_url,
      is_featured,
      is_published,
      content_blocks,
      tags,
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const count = await prisma.work.count();

    const work = await prisma.work.create({
      data: {
        title,
        description: description || null,
        category: category || 'web',
        image_url: image_url || null,
        live_url: live_url || project_url || null,
        is_featured: Boolean(is_featured),
        is_published: is_published ?? true,
        content_blocks: content_blocks || [],
        tags: tags || [],
        order_index: count + 1,
      },
    });

    return NextResponse.json({ success: true, work });
  } catch (err: any) {
    console.error('Create work error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT update existing project
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, title, description, category, image_url, live_url, project_url, is_featured, is_published, content_blocks, tags } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const work = await prisma.work.update({
      where: { id },
      data: {
        title: title !== undefined ? title : undefined,
        description: description !== undefined ? description : undefined,
        category: category !== undefined ? category : undefined,
        image_url: image_url !== undefined ? image_url : undefined,
        live_url: (live_url || project_url) !== undefined ? (live_url || project_url) : undefined,
        is_featured: is_featured !== undefined ? Boolean(is_featured) : undefined,
        is_published: is_published !== undefined ? Boolean(is_published) : undefined,
        content_blocks: content_blocks !== undefined ? content_blocks : undefined,
        tags: tags !== undefined ? tags : undefined,
      },
    });

    return NextResponse.json({ success: true, work });
  } catch (err: any) {
    console.error('Update work error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE project
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await prisma.work.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('Delete work error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
