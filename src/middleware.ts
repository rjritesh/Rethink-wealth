import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl

  const protectedRoutes = ['/admin', '/admin/']
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  )

  // If user is trying to access login page but already has a token
  if (pathname === '/login' && token) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  // if (pathname === '/about-us') {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  // If user is trying to access protected route without token
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}