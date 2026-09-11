import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // 1. Subdomain Routing for mail.astropixel.tech / mail.localhost
  const isMailSubdomain = host.startsWith('mail.') || host.includes('mail.astropixel.tech');
  
  if (isMailSubdomain) {
    // If accessing root on mail subdomain, rewrite directly to /mail Webmail App
    if (pathname === '/') {
      return NextResponse.rewrite(new URL('/mail', request.url));
    }
  }

  // 2. Standard session cookie check for admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/login')) {
    const sessionToken = request.cookies.get('astropixel_session')?.value;
    // Allow access in development or if token exists
    if (!sessionToken && process.env.NODE_ENV === 'production') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
