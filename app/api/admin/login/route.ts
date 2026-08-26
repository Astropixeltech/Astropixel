import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.AUTH_SECRET || 'astropixel-secret-key-change-in-production';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Default admin fallback for Sofiullah Ahammad
    if ((email === 'sofiullahahammad@gmail.com' || email === 'admin@astropixel.tech') && (password === 'atix69@#' || password === 'admin123')) {
      const token = jwt.sign(
        { email, role: 'admin', user_id: 'default-admin-id' },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      const response = NextResponse.json({
        success: true,
        user: { email: 'sofiullahahammad@gmail.com', full_name: 'Sofiullah Ahammad (Founder & CEO)', role: 'admin' },
      });

      response.cookies.set('astropixel_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      });

      return response;
    }

    const profile = await prisma.profile.findFirst({
      where: { email },
      include: { roles: true },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isAdmin = profile.roles.some((r) => r.role === 'admin');
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized admin access' }, { status: 403 });
    }

    const token = jwt.sign(
      { email: profile.email, role: 'admin', user_id: profile.user_id },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const response = NextResponse.json({
      success: true,
      user: {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name,
        role: 'admin',
      },
    });

    response.cookies.set('astropixel_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json({ error: error?.message || 'Login failed' }, { status: 500 });
  }
}
