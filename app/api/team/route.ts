import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      where: { is_active: true },
      include: { custom_links: true },
      orderBy: { order_index: 'asc' },
    });
    return NextResponse.json(team);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const member = await prisma.teamMember.create({
      data: {
        name: body.name,
        name_bn: body.name_bn,
        name_en: body.name_en,
        role: body.role,
        role_bn: body.role_bn,
        role_en: body.role_en,
        bio: body.bio,
        bio_bn: body.bio_bn,
        bio_en: body.bio_en,
        image_url: body.image_url,
        order_index: body.order_index ?? 0,
        is_active: body.is_active ?? true,
        site_scope: body.site_scope ?? 'agency',
      },
    });
    return NextResponse.json(member);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
