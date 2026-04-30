import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

/**
 * 관리자 세션 쿠키 설정 (LUMINA_ADMIN_SECRET 일치 시에만)
 */
export async function POST(request: Request) {
  const secret = process.env.LUMINA_ADMIN_SECRET?.trim()
  if (!secret) {
    return NextResponse.json({ error: 'LUMINA_ADMIN_SECRET not configured' }, { status: 503 })
  }

  let body: { secret?: string } = {}
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'JSON required' }, { status: 400 })
  }

  const provided = body.secret?.trim()
  if (!provided || provided !== secret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.cookies.set('lumina_admin_session', secret, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set('lumina_admin_session', '', { httpOnly: true, path: '/', maxAge: 0 })
  return res
}
