import { defaultCostMatrix, type UsageSummary } from '@/lib/api-usage/summary'
import { DashboardBudgetRefresh } from '@/components/dashboard/dashboard-budget-refresh'
import { Wallet, AlertTriangle, BarChart3 } from 'lucide-react'

const featureLabels: Record<string, string> = {
  analyze_product: '제품 분석 (동기)',
  analyze_product_stream: '제품 분석 (스트림)',
  generate_background: '배경 생성',
  refine_copy: '카피 리파인',
  export_launch_bundle: '런칭 번들',
  genesis_render_queue: '제네시스 큐',
}

function formatUsd(n: number) {
  if (!Number.isFinite(n)) return '—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(n)
}

export function ApiBudgetWidget({ summary }: { summary: UsageSummary }) {
  const costs = defaultCostMatrix()
  const budget = summary.budgetHintUsd
  const projected = summary.projectedMonthlyUsd
  const overBudget = budget > 0 && projected > budget

  return (
    <>
      <DashboardBudgetRefresh intervalMs={20000} />
      <section className="mb-12 rounded-2xl border border-[#c9a227]/25 bg-gradient-to-br from-[#1a1814]/90 to-black/80 p-6 shadow-[inset_0_1px_0_rgba(201,162,39,0.12)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c9a227]/15">
              <Wallet className="h-5 w-5 text-[#c9a227]" aria-hidden />
            </div>
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#c9a227]/80">
                Admin · API 예상 과금
              </p>
              <h2 className="font-serif text-lg text-white/95">실시간 사용량 (추정)</h2>
              <p className="mt-1 text-xs text-white/45">
                DB: <span className="text-white/60">{summary.source}</span> · 마지막 24시간 기준 · 단가는 환경변수로 조정
              </p>
            </div>
          </div>
          {overBudget ? (
            <div className="flex items-center gap-2 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-100">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              월 추정이 예산 초과
            </div>
          ) : null}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">24h 합계 (추정)</p>
            <p className="mt-1 font-mono text-xl text-white tabular-nums">{formatUsd(summary.last24hTotalUsd)}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">호출 수 (24h)</p>
            <p className="mt-1 font-mono text-xl text-white tabular-nums">{summary.last24hCalls}</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-black/30 px-4 py-3">
            <p className="text-[10px] uppercase tracking-wider text-white/40">월 추정 (24h×30)</p>
            <p className="mt-1 font-mono text-xl text-[#c9a227] tabular-nums">{formatUsd(projected)}</p>
            {budget > 0 ? (
              <p className="mt-1 text-[11px] text-white/45">
                예산 상한 LUMINA_MONTHLY_BUDGET_USD: {formatUsd(budget)}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
            <BarChart3 className="h-4 w-4" />
            기능별 24h 추정 비용
          </div>
          <ul className="space-y-2 text-sm">
            {Object.entries(summary.last24hByFeature)
              .filter(([, v]) => (v ?? 0) > 0)
              .sort((a, b) => (b[1] ?? 0) - (a[1] ?? 0))
              .map(([k, v]) => (
                <li
                  key={k}
                  className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
                >
                  <span className="text-white/70">{featureLabels[k] ?? k}</span>
                  <span className="font-mono text-[#c9a227]/90 tabular-nums">{formatUsd(v ?? 0)}</span>
                </li>
              ))}
            {Object.keys(summary.last24hByFeature).filter((k) => (summary.last24hByFeature[k as keyof typeof summary.last24hByFeature] ?? 0) > 0).length === 0 ? (
              <li className="text-white/40">아직 기록된 호출이 없습니다.</li>
            ) : null}
          </ul>
        </div>

        <div className="mt-6 rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/40">기본 단가 (환경변수 미설정 시)</p>
          <ul className="mt-2 grid gap-1 text-xs text-white/55 sm:grid-cols-2">
            {Object.entries(costs).map(([k, v]) => (
              <li key={k} className="flex justify-between gap-2 font-mono tabular-nums">
                <span>{featureLabels[k] ?? k}</span>
                <span>{formatUsd(v)}/call</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
