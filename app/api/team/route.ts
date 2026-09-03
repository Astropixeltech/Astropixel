import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// GET all team members
export async function GET() {
  try {
    const members = await prisma.teamMember.findMany({
      orderBy: { order_index: 'asc' },
    });
    return NextResponse.json({ success: true, members });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// POST - create new member
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const member = await prisma.teamMember.create({ data: body });
    return NextResponse.json({ success: true, member });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// PUT - update member
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { id, ...data } = body;
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    const member = await prisma.teamMember.update({ where: { id }, data });
    return NextResponse.json({ success: true, member });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

// DELETE - remove member
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
