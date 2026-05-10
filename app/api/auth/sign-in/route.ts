import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { luminaSupabasePublicConfig } from '@/lib/supabase'

export async function POST(request: Request) {
  const { url, anonKey } = luminaSupabasePublicConfig()
  if (!url || !anonKey) {
    return NextResponse.json(
      { error: 'Supabase 환경 변수가 설정되지 않았습니다.' },
      { status: 500 }
    )
  }

  let body: { email?: unknown; password?: unknown }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: '잘못된 요청입니다.' }, { status: 400 })
  }

  const email = typeof body.email === 'string' ? body.email.trim() : ''
  const password = typeof body.password === 'string' ? body.password : ''
  if (!email || !password) {
    return NextResponse.json(
      { error: '이메일과 비밀번호를 입력해 주세요.' },
      { status: 400 }
    )
  }

  const supabase = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 })
    }
    if (!data.session) {
      return NextResponse.json(
        { error: '세션을 만들 수 없습니다. 이메일 인증 여부를 확인해 주세요.' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      expires_at: data.session.expires_at ?? undefined,
      expires_in: data.session.expires_in ?? undefined,
      token_type: data.session.token_type,
    })
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e)
    if (/fetch failed|failed to fetch|network|econnrefused|enotfound|etimedout/i.test(msg)) {
      return NextResponse.json(
        {
          error:
            'Supabase에 연결할 수 없습니다. NEXT_PUBLIC_SUPABASE_URL·키가 프로젝트와 일치하는지, 네트워크·방화벽·DNS를 확인해 주세요.',
        },
        { status: 503 }
      )
    }
    return NextResponse.json({ error: '로그인 처리 중 오류가 발생했습니다.' }, { status: 500 })
  }
}
