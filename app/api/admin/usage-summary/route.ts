import { NextResponse } from 'next/server'
import { getUsageSummaryForAdmin } from '@/lib/api-usage/summary'

export const runtime = 'nodejs'

/**
 * 관리자용 사용량 요약. `x-lumina-admin-secret` = LUMINA_ADMIN_SECRET
 */
export async function GET(request: Request) {
  const secret = process.env.LUMINA_ADMIN_SECRET?.trim()
  if (!secret) {
    return NextResponse.json(
      { error: 'LUMINA_ADMIN_SECRET이 서버에 설정되지 않았습니다.' },
      { status: 503 }
    )
  }
  const header = request.headers.get('x-lumina-admin-secret')
  if (header !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const summary = await getUsageSummaryForAdmin()
  return NextResponse.json(summary)
}
