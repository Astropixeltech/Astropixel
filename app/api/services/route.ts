import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { is_active: true },
      orderBy: { order_index: 'asc' },
    });
    return NextResponse.json(services);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const service = await prisma.service.create({
      data: {
        title: body.title,
        title_bn: body.title_bn,
        title_en: body.title_en,
        description: body.description,
        description_bn: body.description_bn,
        description_en: body.description_en,
        icon: body.icon,
        is_active: body.is_active ?? true,
        order_index: body.order_index ?? 0,
        features: body.features,
      },
    });
    return NextResponse.json(service);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
