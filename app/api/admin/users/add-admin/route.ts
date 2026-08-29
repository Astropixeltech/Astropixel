import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { cookies } from 'next/headers';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const sessionToken = cookies().get('astropixel_session')?.value;
    if (!sessionToken && process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { full_name, email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Upsert profile
    let profile = await prisma.profile.findFirst({ where: { email } });
    if (!profile) {
      profile = await prisma.profile.create({
        data: {
          user_id: crypto.randomUUID(),
          email,
          full_name: full_name || email.split('@')[0],
        }
      });
    }

    // Add role
    const existingRole = await prisma.userRole.findFirst({
      where: { user_id: profile.user_id, role: 'admin' }
    });

    if (!existingRole) {
      await prisma.userRole.create({
        data: {
          user_id: profile.user_id,
          role: 'admin'
        }
      });
    }

    return NextResponse.json({ success: true, message: 'Admin added successfully' });
  } catch (error: any) {
    console.error('Add admin error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
