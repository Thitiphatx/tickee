// middleware.js
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentSession } from '@/utils/getCurrentSession';

export async function middleware(req: NextRequest) {
  const session = await getCurrentSession();
  const { pathname } = req.nextUrl;

  // If user is not logged in, redirect to login page
  if (!session) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Check user role
  const userRole = session.user.role; // Assuming user role is stored in session

  // Restrict access based on role
  if (userRole !== 'admin' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', req.url)); // Redirect normal users to home
  }

  return NextResponse.next();
}

// Apply middleware to relevant paths
export const config = {
  matcher: ['/admin/:path*', '/login'], // Apply to /admin and login paths
};
