"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  Activity,
  AlertTriangle,
  Gauge,
  Pause,
  Play,
  Settings2,
  Square,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

const LuminaSandboxLineChart = dynamic(
  () =>
    import("@/components/landing/lumina-sandbox-chart").then((m) => ({
      default: m.LuminaSandboxLineChart,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[240px] min-h-[240px] w-full items-center justify-center rounded-xl border border-white/[0.06] bg-black/30 md:h-[280px] md:min-h-[280px]">
        <p className="text-[10px] tracking-wide text-white/40">차트 로딩…</p>
      </div>
    ),
  },
)

type FeedItem = {
  id: string
  persona: string
  handle: string
  text: string
  intent: "positive" | "neutral" | "negative" | "purchase"
  t: number
}

type AdvisorAlert = {
  id: string
  level: "critical" | "warning" | "info"
  title: string
  detail: string
  t: number
}

const FEED_POOL: Omit<FeedItem, "id" | "t">[] = [
  { persona: "민지", handle: "@minimal_skin", text: "패키지 톤이 너무 예뻐요… 저장각", intent: "positive" },
  { persona: "준호", handle: "@groom_lab", text: "가격대가 살짝 부담? 성분은 끌림", intent: "neutral" },
  { persona: "하은", handle: "@glow_daily", text: "이번 주 에센스 품절각이네 바로 담았어요", intent: "purchase" },
  { persona: "태양", handle: "@sun_mood", text: "경쟁 브랜드랑 비슷한 느낌인데 차별점이?", intent: "negative" },
  { persona: "유리", handle: "@yuri_beauty", text: "CS 문의 답장 빨라서 신뢰 감", intent: "positive" },
  { persona: "시우", handle: "@siwoo_pick", text: "첫 구매 쿠폰 있으면 시도해볼듯", intent: "neutral" },
  { persona: "나연", handle: "@nayeon_vibe", text: "인스타 광고 보고 들어왔는데 랜딩은 깔끔", intent: "positive" },
  { persona: "도윤", handle: "@doyun_logs", text: "배송 문의 3일째 답 없음… 이탈", intent: "negative" },
  { persona: "채원", handle: "@chae_won", text: "리뷰 사진 실제랑 비슷해서 만족", intent: "positive" },
  { persona: "강민", handle: "@km_commerce", text: "마케팅 예산 다 쓴 거 아님? 노출 줄었음", intent: "negative" },
]

const CRISIS_SCRIPTS: Omit<AdvisorAlert, "id" | "t">[] = [
  {
    level: "critical",
    title: "마케팅 예산 임계선",
    detail: "유료 캠페인 일예산이 92% 소진. 노출 CPM이 급락할 수 있습니다.",
  },
  {
    level: "critical",
    title: "경쟁사 유사 SKU 런칭",
    detail: "디지털 트윈 시장에 ‘에어리스 글라스’ 유사 패키지가 등장했습니다. 가격 −12%.",
  },
  {
    level: "warning",
    title: "CS 응답 SLA 경고",
    detail: "평균 응답 6.2h → Loyalty 지수 하락 중. 24h 내 복구 권장.",
  },
  {
    level: "warning",
    title: "재고 회전율 둔화",
    detail: "시뮬레이션 주차 8에서 재고 일수 +18%. 프로모션 시나리오를 검토하세요.",
  },
  {
    level: "info",
    title: "바이럴 힌트",
    detail: "‘비건 글라스’ 키워드 언급량 +34%. 숏폼 각도 A/B 추천.",
  },
]

export type SandboxDifficulty = "hard" | "normal" | "easy"
export type SandboxMarket = "recession" | "normal" | "boom"
export type SandboxBarrier = "high" | "low"

export type SandboxSettings = {
  difficulty: SandboxDifficulty
  market: SandboxMarket
  barrier: SandboxBarrier
}

const DIFFICULTY_OPTIONS: {
  id: SandboxDifficulty
  badge: string
  title: string
  capital: string
  audience: string
  tagline: string
  survival: string
  risk: string
}[] = [
  {
    id: "hard",
    badge: "Hard",
    title: "생존 모드",
    capital: "1,000만 원",
    audience: "가장 및 절박한 창업자용",
    tagline: "실패는 곧 종료입니다.",
    survival: "예상 생존 기간: 약 8~12주 · 현금 소진 임계가 매우 빠릅니다.",
    risk: "주요 리스크: 유동성 붕괴, 단일 채널 의존, CS·배송 지연 시 이탈 급증.",
  },
  {
    id: "normal",
    badge: "Normal",
    title: "도전 모드",
    capital: "5,000만 원",
    audience: "MZ세대 및 예비 창업자용",
    tagline: "시행착오를 견딜 체력이 있습니다.",
    survival: "예상 생존 기간: 약 20~32주 · 실험·피벗을 감당할 버퍼가 있습니다.",
    risk: "주요 리스크: 성장 정체, CAC·단가 압박, 재고·캠페인 밸런스 붕괴.",
  },
  {
    id: "easy",
    badge: "Easy",
    title: "학습 모드",
    capital: "1억 원 이상",
    audience: "어린이 및 교육용",
    tagline: "풍족한 자원으로 마케팅 실험이 가능합니다.",
    survival: "예상 생존 기간: 제한 없음(교육 모드) · 반복 학습에 최적화되었습니다.",
    risk: "주요 리스크: 낮음 — 다만 과도한 낙관 편향만 주의하세요.",
  },
]

const MARKET_OPTIONS: { id: SandboxMarket; label: string; hint: string }[] = [
  { id: "recession", label: "불황(고물가)", hint: "원가·광고비 압박, 전환율 하락 경향" },
  { id: "normal", label: "평시", hint: "기준 시장, 변동이 완만합니다." },
  { id: "boom", label: "호황", hint: "수요·노출 여유, 성장 곡선이 완만히 우호적" },
]

const BARRIER_OPTIONS: { id: SandboxBarrier; label: string; hint: string }[] = [
  { id: "high", label: "현실의 벽 재현", hint: "노출·전환에 마찰. 실무 감각에 가깝습니다." },
  { id: "low", label: "알고리즘 지원", hint: "리치·학습 곡선이 완만. 전략 실험에 유리합니다." },
]

function clampChart(n: number) {
  return Math.max(12, Math.min(96, Math.round(n)))
}

function initialChartForSettings(s: SandboxSettings) {
  let success = 42
  let revenue = 28
  switch (s.difficulty) {
    case "hard":
      success = 30
      revenue = 20
      break
    case "normal":
      success = 42
      revenue = 28
      break
    case "easy":
      success = 54
      revenue = 38
      break
  }
  switch (s.market) {
    case "recession":
      success -= 7
      revenue -= 8
      break
    case "boom":
      success += 7
      revenue += 7
      break
    default:
      break
  }
  if (s.barrier === "high") {
    success -= 5
    revenue -= 4
  } else {
    success += 4
    revenue += 3
  }
  const a = clampChart(success)
  const b = clampChart(revenue)
  return [
    { week: "W0", success: a, revenue: b },
    { week: "W1", success: clampChart(a + 3), revenue: clampChart(b + 4) },
  ]
}

function ethicsBoundsForSettings(s: SandboxSettings) {
  let creditMin = 45
  let loyaltyMin = 42
  let decencyMin = 52
  let creditMax = 98
  let loyaltyMax = 98
  const decencyMax = 99
  if (s.difficulty === "hard") {
    creditMin = 36
    loyaltyMin = 34
    decencyMin = 44
  } else if (s.difficulty === "easy") {
    creditMin = 65
    loyaltyMin = 65
    decencyMin = 68
    creditMax = 99
    loyaltyMax = 99
  }
  if (s.barrier === "high") {
    creditMin -= 2
    loyaltyMin -= 2
    decencyMin -= 2
  } else {
    creditMin += 2
    loyaltyMin += 2
    decencyMin += 2
  }
  return { creditMin, creditMax, loyaltyMin, loyaltyMax, decencyMin, decencyMax }
}

function seedFeed() {
  return FEED_POOL.slice(0, 4).map((f, i) => ({
    ...f,
    id: `seed-${i}`,
    t: -4 + i,
  }))
}

function seedFeedFresh() {
  const stamp = Date.now()
  return FEED_POOL.slice(0, 4).map((f, i) => ({
    ...f,
    id: `seed-${stamp}-${i}`,
    t: -4 + i,
  }))
}

function intentStyles(intent: FeedItem["intent"]) {
  switch (intent) {
    case "positive":
      return "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-100/90"
    case "purchase":
      return "border-gold/35 bg-gold/[0.08] text-gold"
    case "negative":
      return "border-rose-500/25 bg-rose-500/[0.08] text-rose-100/85"
    default:
      return "border-white/10 bg-white/[0.04] text-white/75"
  }
}

function EthicsGauge({
  label,
  ko,
  value,
  hint,
}: {
  label: string
  ko: string
  value: number
  hint: string
}) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold/80">
          {label}
        </span>
        <span className="font-mono text-xs tabular-nums text-white/90">{v.toFixed(0)}</span>
      </div>
      <p className="text-[11px] font-medium text-white/85">{ko}</p>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06] ring-1 ring-inset ring-white/[0.08]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold/40 via-gold to-amber-200/90 shadow-[0_0_12px_rgba(201,162,39,0.35)] transition-[width] duration-500 ease-out"
          style={{ width: `${v}%` }}
        />
      </div>
      <p className="text-[9px] leading-snug text-white/40">{hint}</p>
    </div>
  )
}

export function LuminaSandboxPage() {
  const defaultDraft: SandboxSettings = {
    difficulty: "normal",
    market: "normal",
    barrier: "low",
  }
  const [activeSettings, setActiveSettings] = useState<SandboxSettings | null>(null)
  const [setupModalOpen, setSetupModalOpen] = useState(true)
  const [draft, setDraft] = useState<SandboxSettings>(defaultDraft)

  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState<1 | 2 | 10>(1)
  const [tick, setTick] = useState(0)
  const [chartData, setChartData] = useState<{ week: string; success: number; revenue: number }[]>([
    { week: "W0", success: 38, revenue: 22 },
    { week: "W1", success: 41, revenue: 28 },
  ])
  const [feed, setFeed] = useState<FeedItem[]>(() => seedFeed())
  const [credit, setCredit] = useState(100)
  const [loyalty, setLoyalty] = useState(100)
  const [decency, setDecency] = useState(100)
  const [alerts, setAlerts] = useState<AdvisorAlert[]>([])

  const intervalMs = useMemo(() => Math.max(280, 900 / speed), [speed])

  const selectedDifficultyMeta = useMemo(
    () => DIFFICULTY_OPTIONS.find((d) => d.id === draft.difficulty)!,
    [draft.difficulty],
  )

  const applyScenario = useCallback((s: SandboxSettings) => {
    setPlaying(false)
    setTick(0)
    setChartData(initialChartForSettings(s))
    setFeed(seedFeedFresh())
    setCredit(100)
    setLoyalty(100)
    setDecency(100)
    setAlerts([])
  }, [])

  const tickSimulation = useCallback(() => {
    if (!activeSettings) return
    const s = activeSettings
    const bounds = ethicsBoundsForSettings(s)
    let bias = 0
    if (s.difficulty === "hard") bias -= 0.12
    if (s.difficulty === "normal") bias -= 0.02
    if (s.difficulty === "easy") bias += 0.09
    if (s.market === "recession") bias -= 0.07
    if (s.market === "boom") bias += 0.05
    if (s.barrier === "high") bias -= 0.045
    else bias += 0.03

    const driftScale = s.difficulty === "hard" ? 5.2 : s.difficulty === "easy" ? 3.2 : 4

    setTick((t) => t + 1)
    setChartData((prev) => {
      const last = prev[prev.length - 1]
      const w = prev.length
      const drift = (Math.random() - 0.42 + bias) * driftScale
      const success = Math.max(18, Math.min(94, Math.round(last.success + drift)))
      const revenue = Math.max(12, Math.min(96, Math.round(last.revenue + drift * 1.08)))
      return [...prev, { week: `W${w}`, success, revenue }].slice(-18)
    })
    setCredit((c) =>
      Math.max(
        bounds.creditMin,
        Math.min(bounds.creditMax, c + (Math.random() - 0.5 + bias * 0.35) * 3.2),
      ),
    )
    setLoyalty((l) =>
      Math.max(
        bounds.loyaltyMin,
        Math.min(bounds.loyaltyMax, l + (Math.random() - 0.48 + bias * 0.4) * 4),
      ),
    )
    setDecency((d) =>
      Math.max(
        bounds.decencyMin,
        Math.min(bounds.decencyMax, d + (Math.random() - 0.5 + bias * 0.2) * 2.2),
      ),
    )
    if (Math.random() > 0.55) {
      const pick = FEED_POOL[Math.floor(Math.random() * FEED_POOL.length)]
      const item: FeedItem = {
        ...pick,
        id: `f-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        t: 0,
      }
      setFeed((prev) => [item, ...prev].slice(0, 14))
    }
    const alertRoll = s.barrier === "high" ? 0.78 : 0.82
    if (Math.random() > alertRoll) {
      const script = CRISIS_SCRIPTS[Math.floor(Math.random() * CRISIS_SCRIPTS.length)]
      setAlerts((a) =>
        [{ ...script, id: `a-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, t: 0 }, ...a].slice(
          0,
          6,
        ),
      )
    }
  }, [activeSettings])

  useEffect(() => {
    if (!playing || !activeSettings) return
    const id = window.setInterval(tickSimulation, intervalMs)
    return () => window.clearInterval(id)
  }, [playing, activeSettings, intervalMs, tickSimulation])

  const handlePause = () => setPlaying(false)

  const handleStop = () => {
    if (!activeSettings) return
    applyScenario(activeSettings)
  }

  const handleEnterSandbox = () => {
    const next = { ...draft }
    setActiveSettings(next)
    setSetupModalOpen(false)
    applyScenario(next)
  }

  const openSetupModal = () => {
    if (activeSettings) setDraft(activeSettings)
    setPlaying(false)
    setSetupModalOpen(true)
  }

  const setupBlocking = activeSettings === null
  const dialogOpen = setupBlocking || setupModalOpen

  const [portalReady, setPortalReady] = useState(false)
  useEffect(() => {
    setPortalReady(true)
  }, [])

  return (
    <>
      {portalReady ? (
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          if (open) {
            setSetupModalOpen(true)
            return
          }
          if (activeSettings === null) return
          setSetupModalOpen(false)
        }}
      >
        <DialogContent
          showCloseButton={!setupBlocking}
          overlayClassName="z-[100]"
          onPointerDownOutside={(e) => setupBlocking && e.preventDefault()}
          onEscapeKeyDown={(e) => setupBlocking && e.preventDefault()}
          className={cn(
            "z-[100] max-h-[min(92vh,880px)] gap-0 overflow-y-auto border border-white/[0.12] bg-[#0a0908] p-0 text-white shadow-[0_0_0_1px_rgba(201,162,39,0.06)_inset,0_32px_120px_rgba(0,0,0,0.75)] sm:max-w-lg md:max-w-2xl",
            "[scrollbar-width:thin]",
          )}
        >
          <DialogHeader className="sr-only">
            <DialogTitle>창업 시나리오 설정</DialogTitle>
            <DialogDescription>
              난이도, 시장 상황, 마케팅 장벽을 선택한 뒤 샌드박스에 입장합니다.
            </DialogDescription>
          </DialogHeader>

          <div className="px-6 py-10 sm:px-10 sm:py-12 md:px-14 md:py-14">
            <p className="text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-gold/75">
              창업 시나리오 설정
            </p>
            <h2 className="mx-auto mt-6 max-w-md text-center font-serif text-xl leading-snug tracking-tight text-white sm:text-2xl md:text-[1.65rem] md:leading-tight">
              당신의 브랜드,
              <br />
              샌드박스에서 증명하세요
            </h2>
            <p className="mx-auto mt-5 max-w-md text-center text-[12px] leading-relaxed text-white/45">
              난이도와 시장 조건을 맞추면 곡선·피드·AI Advisor의 리듬이 달라집니다. 실전 감각을 몸으로 익혀 보세요.
            </p>
            <p className="mx-auto mt-4 max-w-lg text-center text-[10px] leading-relaxed text-white/35">
              신용(Credit)·도리(Decency)·의리(Loyalty) 지수는 시뮬레이션 시작 시{" "}
              <span className="text-gold/80">기본 100점</span>으로 세팅됩니다.
            </p>

            <div className="mt-12">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                난이도
              </p>
              <div className="grid gap-4 md:grid-cols-3">
                {DIFFICULTY_OPTIONS.map((opt) => {
                  const selected = draft.difficulty === opt.id
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, difficulty: opt.id }))}
                      className={cn(
                        "rounded-2xl border p-5 text-left transition-all duration-200",
                        "hover:border-gold/35 hover:bg-white/[0.03]",
                        selected
                          ? "border-gold/45 bg-gradient-to-b from-gold/[0.09] to-transparent shadow-[0_0_32px_rgba(201,162,39,0.12)] ring-1 ring-gold/25"
                          : "border-white/[0.1] bg-black/30",
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={cn(
                            "rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider",
                            opt.id === "hard" && "bg-rose-500/15 text-rose-200/90",
                            opt.id === "normal" && "bg-sky-500/15 text-sky-200/85",
                            opt.id === "easy" && "bg-emerald-500/15 text-emerald-200/85",
                          )}
                        >
                          {opt.badge}
                        </span>
                        <span className="font-mono text-[10px] tabular-nums text-gold/85">{opt.capital}</span>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-white">{opt.title}</p>
                      <p className="mt-1 text-[11px] text-white/45">{opt.audience}</p>
                      <p className="mt-3 text-[11px] italic leading-snug text-white/55">“{opt.tagline}”</p>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="mt-8 space-y-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] px-5 py-4 md:px-6 md:py-5">
              <p className="text-[11px] leading-relaxed text-white/72">{selectedDifficultyMeta.survival}</p>
              <p className="text-[11px] leading-relaxed text-amber-100/[0.78]">{selectedDifficultyMeta.risk}</p>
            </div>

            <div className="mt-10">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                시장 상황
              </p>
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {MARKET_OPTIONS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, market: m.id }))}
                    className={cn(
                      "flex-1 rounded-xl border px-4 py-3 text-left transition-colors sm:min-w-[140px]",
                      draft.market === m.id
                        ? "border-gold/40 bg-gold/[0.08] text-white"
                        : "border-white/[0.1] bg-black/25 text-white/65 hover:border-white/20 hover:text-white/85",
                    )}
                  >
                    <span className="block text-[12px] font-semibold">{m.label}</span>
                    <span className="mt-1 block text-[10px] leading-snug text-white/40">{m.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">
                마케팅 장벽
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {BARRIER_OPTIONS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setDraft((d) => ({ ...d, barrier: b.id }))}
                    className={cn(
                      "rounded-xl border px-4 py-3.5 text-left transition-colors",
                      draft.barrier === b.id
                        ? "border-gold/40 bg-gold/[0.08] text-white"
                        : "border-white/[0.1] bg-black/25 text-white/65 hover:border-white/20 hover:text-white/85",
                    )}
                  >
                    <span className="block text-[12px] font-semibold">{b.label}</span>
                    <span className="mt-1 block text-[10px] leading-snug text-white/40">{b.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={handleEnterSandbox}
              className={cn(
                "relative mt-12 w-full overflow-hidden rounded-full border border-gold/50 py-4 text-sm font-bold tracking-wide text-[#0f0e0d]",
                "bg-gradient-to-r from-[#f0d060] via-[#c9a227] to-[#9a7209]",
                "shadow-[0_0_28px_rgba(201,162,39,0.55),0_0_64px_rgba(201,162,39,0.18)]",
                "transition-[box-shadow,transform] duration-200 hover:shadow-[0_0_40px_rgba(201,162,39,0.7),0_0_80px_rgba(201,162,39,0.22)]",
                "active:scale-[0.99]",
              )}
            >
              <span className="relative z-10">시뮬레이션 세계 입장하기</span>
              <span
                className="pointer-events-none absolute inset-0 opacity-40 blur-xl"
                style={{
                  background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.5), transparent 55%)",
                }}
              />
            </button>
          </div>
        </DialogContent>
      </Dialog>
      ) : dialogOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-6 backdrop-blur-sm"
          role="alertdialog"
          aria-busy="true"
          aria-label="창업 시나리오 설정"
        >
          <div className="max-w-sm rounded-2xl border border-white/[0.12] bg-[#0a0908] p-10 text-center shadow-[0_0_60px_rgba(0,0,0,0.6)]">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/80">Lumina Sandbox</p>
            <p className="mt-5 text-sm leading-relaxed text-white/65">
              설정 화면을 준비하는 중입니다…
            </p>
          </div>
        </div>
      ) : null}

      <div
        className={cn(
          "relative min-h-screen overflow-hidden bg-[#040303] pb-36 pt-36 text-white transition-[filter] duration-300 md:pb-40 md:pt-40",
          dialogOpen && "blur-[2px]",
        )}
      >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,162,39,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,162,39,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(201,162,39,0.14),transparent_50%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1600px] px-4 sm:px-5 lg:px-8">
        <header className="mb-6 space-y-4 border-b border-white/[0.08] pb-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-1.5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold/90">
              <Activity className="h-3.5 w-3.5" />
              Lumina Sandbox
            </p>
            <h1 className="font-serif text-2xl tracking-tight text-white md:text-3xl">
              디지털 트윈 <span className="text-gradient-gold italic">Control Room</span>
            </h1>
            <p className="mt-1.5 max-w-xl text-sm text-white/50">
              가상 시장에서 브랜드 아이디어의 반응·매출·윤리 지표를 동시에 지휘합니다.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={openSetupModal}
              className="h-9 gap-1.5 rounded-lg border-white/15 bg-transparent text-xs text-white/75 hover:bg-white/[0.06]"
            >
              <Settings2 className="h-3.5 w-3.5" />
              시나리오 설정
            </Button>
            <Button
              type="button"
              size="sm"
              disabled={!activeSettings}
              onClick={() => activeSettings && setPlaying((p) => !p)}
              className={cn(
                "h-9 gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-3 text-xs font-semibold text-white hover:bg-white/[0.1]",
                playing && "border-gold/40 bg-gold/15 text-gold",
              )}
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {playing ? "일시정지" : "시뮬레이션 시작"}
            </Button>
            <div className="flex items-center gap-1 rounded-lg border border-white/10 bg-black/40 p-0.5">
              {([1, 2, 10] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSpeed(s)}
                  className={cn(
                    "rounded-md px-2.5 py-1.5 text-[10px] font-bold tabular-nums transition-colors",
                    speed === s
                      ? "bg-gold/20 text-gold"
                      : "text-white/45 hover:bg-white/[0.06] hover:text-white/80",
                  )}
                >
                  {s}x
                </button>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePause}
              className="h-9 border-white/15 bg-transparent text-xs text-white/70 hover:bg-white/[0.06]"
            >
              <Pause className="mr-1 h-3.5 w-3.5" />
              중단
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={!activeSettings}
              onClick={handleStop}
              className="h-9 border-rose-500/20 bg-transparent text-xs text-rose-200/80 hover:bg-rose-500/10 disabled:opacity-40"
            >
              <Square className="mr-1 h-3.5 w-3.5" />
              리셋
            </Button>
            <span className="ml-1 font-mono text-[10px] tabular-nums text-white/30">
              tick {tick}
            </span>
          </div>
          </div>

          {activeSettings ? (
            <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] pt-4">
              {(() => {
                const d = DIFFICULTY_OPTIONS.find((x) => x.id === activeSettings.difficulty)!
                const m = MARKET_OPTIONS.find((x) => x.id === activeSettings.market)!
                const b = BARRIER_OPTIONS.find((x) => x.id === activeSettings.barrier)!
                return (
                  <>
                    <span className="rounded-full border border-gold/25 bg-gold/[0.07] px-3 py-1 text-[10px] font-semibold text-gold">
                      {d.title} · 자본 {d.capital}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] text-white/65">
                      시장 {m.label}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] text-white/65">
                      {b.label}
                    </span>
                  </>
                )
              })()}
            </div>
          ) : null}
        </header>

        <div className="flex flex-col gap-5 xl:flex-row xl:items-stretch">
          {/* 중앙: 피드 + 차트 */}
          <div className="min-w-0 flex-1 space-y-5">
            <section className="rounded-2xl border border-white/[0.09] bg-black/50 p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-5">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">
                  가상 소비자 반응 피드
                </h2>
                <span className="flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-emerald-200/90">
                  <Zap className="h-3 w-3" />
                  Live Twin
                </span>
              </div>
              <div className="max-h-[min(52vh,420px)] space-y-2.5 overflow-y-auto pr-1 [scrollbar-width:thin]">
                {feed.map((item) => (
                  <article
                    key={item.id}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-left transition-transform",
                      intentStyles(item.intent),
                    )}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-white/95">{item.persona}</span>
                      <span className="text-[10px] text-white/40">{item.handle}</span>
                    </div>
                    <p className="mt-1 text-[13px] leading-snug text-white/88">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-white/[0.09] bg-black/50 p-4 backdrop-blur-md md:p-5">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">
                  실시간 성공 확률 · 매출 예측
                </h2>
                <Gauge className="h-4 w-4 text-gold/60" />
              </div>
              <LuminaSandboxLineChart data={chartData} />
              <p className="mt-2 text-center text-[10px] text-white/35">
                Credit·Loyalty·Decency 변동이 곡선에 반영되는 프로토타입 로직입니다.
              </p>
            </section>
          </div>

          {/* 우측: 윤리·신용 */}
          <aside className="w-full shrink-0 space-y-4 xl:w-[300px]">
            <div className="rounded-2xl border border-gold/15 bg-gradient-to-b from-gold/[0.07] to-black/60 p-4 shadow-[0_0_40px_rgba(201,162,39,0.08)] backdrop-blur-md md:p-5">
              <h2 className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-gold/90">
                Ethics &amp; Credit Score
              </h2>
              <div className="space-y-5">
                <EthicsGauge
                  label="Credit"
                  ko="신용"
                  value={credit}
                  hint="거래처 약속 이행·정산 리드타임이 성공 확률과 매출 지수에 가중됩니다."
                />
                <EthicsGauge
                  label="Loyalty"
                  ko="의리"
                  value={loyalty}
                  hint="CS 응답 SLA·재구매 시나리오가 충성도에 반영되며, 피드 톤에도 영향을 줍니다."
                />
                <EthicsGauge
                  label="Decency"
                  ko="도리"
                  value={decency}
                  hint="과장 광고·민감 클레임 대응 품질이 브랜드 신뢰 곡선을 좌우합니다."
                />
              </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3 text-[10px] leading-relaxed text-white/45">
              시뮬레이션 틱마다 지표가 미세 변동합니다. 중단 후 리셋으로 초기 시나리오로 돌아갑니다.
            </div>
          </aside>
        </div>

        {/* 하단 AI Advisor */}
        <section className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.08] bg-[#050403]/92 px-4 py-3 shadow-[0_-12px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-6">
          <div className="mx-auto flex max-w-[1600px] flex-col gap-2 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex shrink-0 items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 ring-1 ring-gold/30">
                <AlertTriangle className="h-4 w-4 text-gold" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold/85">
                  Lumina AI Advisor
                </p>
                <p className="text-[11px] text-white/45">실시간 리스크·기회 신호</p>
              </div>
            </div>
            <div className="flex min-h-[3rem] flex-1 flex-wrap gap-2 overflow-x-auto pb-1 sm:max-h-[4.5rem] sm:overflow-y-auto">
              {alerts.length === 0 ? (
                <p className="self-center text-sm text-white/35">
                  시뮬레이션을 시작하면 결정적 이벤트가 이 영역에 적재됩니다.
                </p>
              ) : (
                alerts.map((a) => (
                  <div
                    key={a.id}
                    className={cn(
                      "min-w-[200px] max-w-sm flex-1 rounded-xl border px-3 py-2",
                      a.level === "critical" && "border-rose-500/35 bg-rose-500/[0.1]",
                      a.level === "warning" && "border-amber-500/30 bg-amber-500/[0.08]",
                      a.level === "info" && "border-sky-500/25 bg-sky-500/[0.06]",
                    )}
                  >
                    <p className="text-[11px] font-semibold text-white/95">{a.title}</p>
                    <p className="mt-0.5 text-[10px] leading-snug text-white/55">{a.detail}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  )
}
