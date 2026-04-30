import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * 관리자 전용 /dashboard/admin — LUMINA_ADMIN_SECRET 과 일치하는 세션 쿠키 필요.
 * 로그인: POST /api/admin/session (또는 /dashboard/admin/login 폼)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (!pathname.startsWith('/dashboard/admin')) {
    return NextResponse.next()
  }
  if (pathname.startsWith('/dashboard/admin/login')) {
    return NextResponse.next()
  }

  const secret = process.env.LUMINA_ADMIN_SECRET?.trim()
  if (!secret) {
    return NextResponse.redirect(new URL('/dashboard/admin/login?reason=missing_secret', request.url))
  }

  const session = request.cookies.get('lumina_admin_session')?.value
  if (session !== secret) {
    const login = new URL('/dashboard/admin/login', request.url)
    login.searchParams.set('from', pathname)
    return NextResponse.redirect(login)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/admin', '/dashboard/admin/:path*'],
}
