import Link from 'next/link'
import { Gem } from 'lucide-react'
import { getUsageSummaryForAdmin } from '@/lib/api-usage/summary'
import { ApiBudgetWidget } from '@/components/dashboard/api-budget-widget'
import { getLuminaAdminDailySloganKo } from '@/lib/lumina/lumina-admin-daily-slogan'
import { LUMINA_FIRST_PRINCIPLE_KO } from '@/lib/lumina/lumina-first-principle-charter'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const usageSummary = await getUsageSummaryForAdmin()
  const dailySlogan = getLuminaAdminDailySloganKo()

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-cream">
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="mx-auto max-w-3xl px-4 pb-5 pt-6">
          <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.32em] text-white/40">
            Master command · 오늘의 한 줄
          </p>
          <p className="text-center font-serif text-lg leading-relaxed tracking-[0.04em] text-white/88 sm:text-xl md:text-[1.35rem]">
            {dailySlogan}
          </p>
          <p className="mt-4 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-white/38">
            First principle · 작업 지침
          </p>
          <p className="mx-auto mt-2 max-w-xl text-center font-serif text-sm leading-relaxed tracking-[0.03em] text-white/55 sm:text-[0.95rem]">
            {LUMINA_FIRST_PRINCIPLE_KO}
          </p>
        </div>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-gold">
              <Gem className="h-5 w-5 text-black" />
            </div>
            <div>
              <h1 className="font-serif text-xl tracking-wide text-white">관리자 · API 비용</h1>
              <p className="text-xs uppercase tracking-[0.2em] text-white/45">Lumina · Cost guard</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <Link href="/dashboard" className="text-[#c9a227]/90 transition hover:text-[#c9a227]">
              보석함
            </Link>
            <Link
              href="/api/admin/logout"
              className="rounded-full border border-white/15 px-4 py-2 text-white/60 transition hover:border-white/25 hover:text-white"
            >
              로그아웃
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-10">
        <ApiBudgetWidget summary={usageSummary} />
        <p className="mt-8 text-center text-xs text-white/35">
          외부 연동:{' '}
          <code className="rounded bg-white/5 px-1.5 py-0.5 text-[11px] text-white/50">
            GET /api/admin/usage-summary
          </code>{' '}
          + 헤더 <code className="text-white/50">x-lumina-admin-secret</code>
        </p>
      </div>
    </main>
  )
}
