"use client"

import { useState } from "react"
import Link from "next/link"
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion"
import {
  Bot,
  Clapperboard,
  FileStack,
  LayoutTemplate,
  Palette,
  Rocket,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const BG = "#121212"
const GOLD = "#D4AF37"

const fontSerif =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontSans = "font-sans"

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

type Mode = "insight" | "master"

type ModuleDef = {
  id: string
  title: string
  subtitle: string
  tag: string
  href: string
  Icon: typeof Sparkles
  /** Free diagnostic — 치명적 약점 한 줄 */
  insightLine: string
  /** Master — 3단계 격상 */
  masterTiers: [string, string, string]
}

const MODULES: ModuleDef[] = [
  {
    id: "genesis",
    title: "Brand Genesis",
    subtitle: "핵심 가치·페르소나 설계",
    tag: "The Origin",
    href: "/brand-genesis",
    Icon: Sparkles,
    insightLine:
      "브랜드 제네시스의 서사가 약해 고객의 결핍을 건드리지 못하고 있습니다.",
    masterTiers: [
      "프리미엄 텍스처: 오리진 스토리를 감각적 언어로 재구성해 첫인상에서 ‘명품’ 무드를 고정합니다.",
      "심리 동기화: 페르소나의 내면 동기와 구매 트리거를 정렬해 설득이 아닌 공명으로 전환합니다.",
      "전략적 일관성: 모든 터치포인트가 동일한 DNA를 말하도록 가치·톤·메시지 축을 단일화합니다.",
    ],
  },
  {
    id: "builder",
    title: "Brand Builder",
    subtitle: "로고·컬러·텍스처",
    tag: "The Identity",
    href: "/brand-builder",
    Icon: Palette,
    insightLine:
      "시각 시스템이 파편화되어 채널마다 ‘다른 브랜드’로 인지될 위험이 큽니다.",
    masterTiers: [
      "프리미엄 텍스처: 재질·광·그레인까지 규정한 하이엔드 비주얼 토큰 세트를 제공합니다.",
      "심리 동기화: 색·형태가 타깃의 안정감·욕망 신호와 맞물리도록 심리 기준을 반영합니다.",
      "전략적 일관성: 디지털·인쇄·패키지에 동일한 규격으로 확장 가능한 아이덴티티 매뉴얼을 구축합니다.",
    ],
  },
  {
    id: "detail",
    title: "Detail Page",
    subtitle: "AI 고품격 상세페이지",
    tag: "The Content",
    href: "/#upload",
    Icon: LayoutTemplate,
    insightLine:
      "상세 콘텐츠가 정보 나열에 머물러 전환을 설계한 내러티브 구조가 부족합니다.",
    masterTiers: [
      "프리미엄 텍스처: 섹션 리듬·여백·타이포 계층으로 ‘읽히는 명품 카탈로그’ 톤을 완성합니다.",
      "심리 동기화: 반박 처리·사회적 증거·희소성을 단계별로 배치해 이탈 지점을 줄입니다.",
      "전략적 일관성: 제네시스 메시지와 동일한 약속을 상세 전 구간에서 반복·증명합니다.",
    ],
  },
  {
    id: "motion",
    title: "Motion Video",
    subtitle: "텍스처 제어 엔진 영상",
    tag: "The Narrative",
    href: "/#showcase",
    Icon: Clapperboard,
    insightLine:
      "영상이 기능 소개에 치우쳐 브랜드 서사와 감정 곡선이 단절되어 있습니다.",
    masterTiers: [
      "프리미엄 텍스처: 프레임별 조명·그레인·모션 블러를 통제해 영화적 밀도를 유지합니다.",
      "심리 동기화: 시청자의 긴장·이완 리듬에 맞춘 컷·카피 타이밍으로 몰입을 설계합니다.",
      "전략적 일관성: 런칭·리타깃·리마인드까지 채널별 변주만 허용하는 내러티브 바이블을 적용합니다.",
    ],
  },
  {
    id: "package",
    title: "Launching Package",
    subtitle: "시장 진입 통합 패키지",
    tag: "The Entry",
    href: "/#launch-bundle",
    Icon: Rocket,
    insightLine:
      "런칭 자산과 메시지가 동시에 나가지 않아 초기 유입 대비 신뢰 전환이 떨어집니다.",
    masterTiers: [
      "프리미엄 텍스처: 런칭 키 비주얼·랜딩·SNS 티저의 톤을 한 번에 맞춘 패키지로 제공합니다.",
      "심리 동기화: 첫 구매 장벽·배송 불안 등 진입 심리에 대한 선제적 카피를 배치합니다.",
      "전략적 일관성: 일정·채널·KPI에 맞춘 론칭 시나리오로 ‘한 번에 안착’하는 흐름을 설계합니다.",
    ],
  },
  {
    id: "agent",
    title: "Marketing Agent",
    subtitle: "반박 대응 AI 마케팅",
    tag: "The Growth",
    href: "/marketing-agent",
    Icon: Bot,
    insightLine:
      "캠페인이 반응 데이터와 연결되지 않아 반복 실험·학습 루프가 끊겨 있습니다.",
    masterTiers: [
      "프리미엄 텍스처: 광고·CRM·커뮤니티 터치 모두 동일한 브랜드 질감으로 출력됩니다.",
      "심리 동기화: 심리적 반박 모델로 이탈·비교·가격 민감 구간을 실시간 대응합니다.",
      "전략적 일관성: 성장 실험이 브랜드 약속을 훼손하지 않도록 가드레일과 우선순위를 유지합니다.",
    ],
  },
]

/** 6영역 통합 진단 — Insight 모드 상단 요약 (2~3개) */
const GLOBAL_INSIGHTS = [
  MODULES[0].insightLine,
  MODULES[2].insightLine,
  MODULES[5].insightLine,
]

const tierLabels = [
  "① 프리미엄 텍스처",
  "② 심리 동기화",
  "③ 전략적 일관성",
] as const

function OsLoadingBar({ active }: { active: boolean }) {
  return (
    <div className="relative mt-2 h-0.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        key={active ? "scan" : "idle"}
        className="absolute inset-y-0 left-0 w-[45%] rounded-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${GOLD}, #f2e8c8, ${GOLD}, transparent)`,
          boxShadow: `0 0 12px ${GOLD}66`,
        }}
        initial={{ x: "-120%" }}
        animate={
          active
            ? { x: ["-120%", "280%"] }
            : { x: "-120%", opacity: 0 }
        }
        transition={{
          duration: active ? 0.75 : 0.25,
          ease: [0.22, 1, 0.36, 1],
          repeat: active ? Infinity : 0,
        }}
      />
    </div>
  )
}

export function LuminaServiceHub() {
  const reduceMotion = useReducedMotion()
  const [mode, setMode] = useState<Mode>("insight")
  const [activeId, setActiveId] = useState(MODULES[0].id)
  const [booting, setBooting] = useState(false)

  const active = MODULES.find((m) => m.id === activeId) ?? MODULES[0]

  const onSelect = (id: string) => {
    if (id === activeId) return
    if (reduceMotion) {
      setActiveId(id)
      return
    }
    setBooting(true)
    window.setTimeout(() => setActiveId(id), 480)
    window.setTimeout(() => setBooting(false), 900)
  }

  return (
    <section
      id="service-hub"
      className={cn(
        "relative overflow-hidden py-20 text-[#e8e6e3] lg:py-28",
        fontSans,
      )}
      style={{ backgroundColor: BG }}
      aria-labelledby="service-hub-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{ backgroundImage: grainSvg }}
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(212,175,55,0.12),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mb-12 max-w-3xl lg:mb-16">
          <p
            className={cn(
              "mb-3 text-xs font-medium uppercase tracking-[0.28em] text-[#D4AF37]/90",
            )}
          >
            Branding Operating System
          </p>
          <h2
            id="service-hub-heading"
            className={cn(
              "text-2xl font-semibold leading-tight tracking-tight text-[#faf8f5] sm:text-3xl lg:text-4xl",
              fontSerif,
            )}
          >
            여섯 개의 엔진이 하나의{" "}
            <span className="bg-gradient-to-r from-[#f2e8c8] via-[#D4AF37] to-[#b8941f] bg-clip-text text-transparent">
              Service Hub
            </span>
            로 연결됩니다
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#a3a09b] sm:text-base">
            제네시스부터 에이전트까지, 루미나는 브랜드 OS로서 각 모듈의 출력이
            다음 단계의 입력이 되도록 설계되어 있습니다.{" "}
            <strong className="font-medium text-[#cfc9c2]">
              Insight Mode
            </strong>
            에서는 6영역을 스캔한 진단에 집중하고,{" "}
            <strong className="font-medium text-[#D4AF37]/95">
              Master Mode
            </strong>
            에서는 동일 약점을 3단계 격상으로 완전 해결합니다.
          </p>
        </header>

        {/* Mode switch — 컨설팅 데스크 느낌 */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            className="inline-flex rounded-full border border-white/[0.08] bg-black/40 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            role="tablist"
            aria-label="진단 모드 선택"
          >
            {(
              [
                { key: "insight" as const, label: "Insight Mode", hint: "무료 진단" },
                { key: "master" as const, label: "Master Mode", hint: "유료 해결" },
              ] as const
            ).map(({ key, label, hint }) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                onClick={() => setMode(key)}
                className={cn(
                  "relative rounded-full px-4 py-2.5 text-left transition-colors sm:px-5",
                  mode === key
                    ? "text-[#121212]"
                    : "text-[#9c9893] hover:text-[#d4d0ca]",
                )}
              >
                {mode === key && (
                  <motion.span
                    layoutId="hub-mode-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-[#e8c547] via-[#D4AF37] to-[#b8941f] shadow-[0_0_24px_rgba(212,175,55,0.25)]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 34,
                    }}
                  />
                )}
                <span className="relative z-10 block text-sm font-semibold">
                  {label}
                </span>
                <span
                  className={cn(
                    "relative z-10 block text-[11px] font-normal",
                    mode === key ? "text-[#3d3520]/90" : "text-[#7a7670]",
                  )}
                >
                  {hint}
                </span>
              </button>
            ))}
          </div>
          <Link
            href="/pricing"
            className="text-sm font-medium text-[#D4AF37] transition hover:text-[#e8c547]"
          >
            플랜 비교 →
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,280px)_1fr] lg:gap-10 xl:grid-cols-[minmax(0,300px)_1fr]">
          {/* Module rail */}
          <nav
            className="flex flex-col gap-2"
            aria-label="서비스 모듈"
          >
            {MODULES.map((m) => {
              const selected = m.id === activeId
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onSelect(m.id)}
                  className={cn(
                    "group relative flex w-full items-start gap-3 rounded-xl border px-3.5 py-3.5 text-left transition-colors",
                    selected
                      ? "border-[#D4AF37]/45 bg-[#1a1a1a] shadow-[0_0_0_1px_rgba(212,175,55,0.12)]"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.1] hover:bg-white/[0.04]",
                  )}
                >
                  {selected && (
                    <motion.span
                      layoutId="hub-module-glow"
                      className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-[#D4AF37]/[0.07] to-transparent"
                      transition={{
                        type: "spring",
                        stiffness: 350,
                        damping: 38,
                      }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                      selected
                        ? "border-[#D4AF37]/40 text-[#D4AF37]"
                        : "border-white/[0.08] text-[#8a8680] group-hover:text-[#c4c0ba]",
                    )}
                  >
                    <m.Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <span className="relative z-10 min-w-0">
                    <span className="block font-sans text-[13px] font-semibold text-[#f5f3ef]">
                      {m.title}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-[#8f8b85]">
                      {m.tag}
                    </span>
                  </span>
                </button>
              )
            })}
          </nav>

          {/* Detail panel */}
          <div className="relative min-h-[320px] rounded-2xl border border-white/[0.08] bg-[#161616] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="border-b border-white/[0.06] px-5 py-3 sm:px-6">
              <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#D4AF37]/80">
                <FileStack className="h-3.5 w-3.5" aria-hidden />
                Lumina OS
              </div>
              <OsLoadingBar active={booting} />
            </div>

            <div className="p-5 sm:p-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeId}-${mode}`}
                  initial={
                    reduceMotion
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 12, filter: "blur(6px)" }
                  }
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                  }}
                  exit={
                    reduceMotion
                      ? undefined
                      : { opacity: 0, y: -8, filter: "blur(4px)" }
                  }
                  transition={{
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <p className={cn("text-xl font-semibold text-[#faf8f5] sm:text-2xl", fontSerif)}>
                        {active.title}
                      </p>
                      <p className="mt-1 text-sm text-[#9c9893]">
                        {active.subtitle} · {active.tag}
                      </p>
                    </div>
                    <Link
                      href={active.href}
                      className="inline-flex items-center rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-2 text-xs font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37]/18"
                    >
                      모듈 열기
                    </Link>
                  </div>

                  {mode === "insight" && (
                    <div className="mt-8 space-y-6">
                      <div>
                        <h3 className={cn("text-sm font-semibold text-[#D4AF37]", fontSerif)}>
                          6영역 통합 스캔 — 치명적 약점 (요약)
                        </h3>
                        <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-[#c8c4bd]">
                          {GLOBAL_INSIGHTS.map((line, i) => (
                            <li
                              key={i}
                              className="flex gap-2 border-l-2 border-[#D4AF37]/35 pl-3"
                            >
                              <span className="shrink-0 font-mono text-[11px] text-[#D4AF37]/70">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="rounded-xl border border-white/[0.06] bg-black/30 p-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8f8b85]">
                          선택 모듈 — 심층 진단
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[#dedbd6]">
                          {active.insightLine}
                        </p>
                        <p className="mt-3 text-xs text-[#7a7670]">
                          실제 서비스에서는 업로드·설문 데이터를 반영해 약점 순위와
                          근거 지표를 함께 제시합니다.
                        </p>
                      </div>
                    </div>
                  )}

                  {mode === "master" && (
                    <div className="mt-8 space-y-5">
                      <p className="text-sm leading-relaxed text-[#b8b4ae]">
                        Master Mode는 Insight에서 식별된 공백을 메워, 출력물 전반에{" "}
                        <span className="text-[#D4AF37]">3단계 격상</span>을
                        적용합니다. 아래는{" "}
                        <span className="text-[#e8e6e3]">{active.title}</span>{" "}
                        기준 샘플입니다.
                      </p>
                      <ol className="space-y-4">
                        {active.masterTiers.map((text, i) => (
                          <motion.li
                            key={i}
                            initial={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{
                              delay: reduceMotion ? 0 : 0.08 + i * 0.1,
                              duration: 0.4,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="rounded-xl border border-[#D4AF37]/20 bg-gradient-to-br from-[#D4AF37]/[0.06] to-transparent px-4 py-3.5"
                          >
                            <span className="text-xs font-semibold text-[#D4AF37]">
                              {tierLabels[i]}
                            </span>
                            <p className="mt-1.5 text-sm leading-relaxed text-[#e4e1dc]">
                              {text}
                            </p>
                          </motion.li>
                        ))}
                      </ol>
                      <div className="flex flex-wrap gap-3 pt-2">
                        <Link
                          href="/dashboard"
                          className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#e8c547] via-[#D4AF37] to-[#b8941f] px-5 py-2.5 text-sm font-semibold text-[#121212] shadow-[0_0_28px_rgba(212,175,55,0.22)] transition hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
                        >
                          Master 워크스페이스
                        </Link>
                        <Link
                          href="/pricing"
                          className="inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-[#d4d0ca] transition hover:border-white/25 hover:text-[#faf8f5]"
                        >
                          요금제 보기
                        </Link>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Decorative OS grid */}
            <div
              className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 opacity-[0.07]"
              style={{
                backgroundImage: `linear-gradient(${GOLD} 1px, transparent 1px), linear-gradient(90deg, ${GOLD} 1px, transparent 1px)`,
                backgroundSize: "12px 12px",
              }}
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  )
}
