import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(request: Request) {
  const url = new URL('/dashboard/admin/login', request.url)
  const res = NextResponse.redirect(url)
  res.cookies.set('lumina_admin_session', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
  })
  return res
}
