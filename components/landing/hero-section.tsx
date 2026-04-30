"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Gem,
  HeartHandshake,
  Shirt,
  Cpu,
  UtensilsCrossed,
  UserRound,
  Wand2,
} from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { DawnMistAtmosphere } from "@/components/landing/dawn-mist-atmosphere"
import { SpecializedAiAgents } from "@/components/landing/specialized-ai-agents"
import { TrustArchetypeEngine } from "@/components/landing/trust-archetype-engine"
import { AGENT_MIST_THEMES, type SpecializedAgentId } from "@/lib/specialized-agents"

const stats = [
  { value: "4M+", label: "누적 분석" },
  { value: "500K+", label: "브랜드 벤치마크" },
  { value: "99.2%", label: "분석 정확도" },
]

/** 새벽안개 — 얇은 세리프, 여백의 미 */
const fontHeadThin =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif] font-light"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"

const DAWN_GOLD = "#C5A059"

const bodyTextStyle = {
  letterSpacing: "-0.02em",
  lineHeight: 1.8,
} as const

const easeLux = [0.22, 1, 0.36, 1] as const

const INDUSTRY_ICONS = [HeartHandshake, Shirt, Cpu, UtensilsCrossed, UserRound, Wand2]

function fadeUp(delay: number, reduceMotion: boolean) {
  return {
    initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : 0.85,
      delay: reduceMotion ? 0 : delay,
      ease: easeLux,
    },
  }
}

function fadeUpBlur(delay: number, reduceMotion: boolean) {
  return {
    initial: reduceMotion
      ? { opacity: 1, y: 0, filter: "blur(0px)" }
      : { opacity: 0, y: 28, filter: "blur(16px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: {
      duration: reduceMotion ? 0 : 1.15,
      delay: reduceMotion ? 0 : delay,
      ease: easeLux,
    },
  }
}

/** 성장 곡선 — 추상 골드 라인 (제품 이미지 없음) */
function HeroGrowthCurve() {
  return (
    <svg
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[min(55vh,520px)] w-full opacity-[0.12] md:h-[min(50vh,480px)] md:opacity-[0.16]"
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMax slice"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="heroLuxFill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor={DAWN_GOLD} stopOpacity="0" />
          <stop offset="55%" stopColor={DAWN_GOLD} stopOpacity="0.05" />
          <stop offset="100%" stopColor={DAWN_GOLD} stopOpacity="0.09" />
        </linearGradient>
        <linearGradient id="heroLuxStroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={DAWN_GOLD} stopOpacity="0.1" />
          <stop offset="50%" stopColor="#d8c49a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
        </linearGradient>
        <filter id="hero-mist-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="b" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M -40 380 Q 180 360 320 300 Q 520 220 720 200 Q 960 175 1120 120 Q 1280 72 1480 20 L 1480 420 L -40 420 Z"
        fill="url(#heroLuxFill)"
      />
      <path
        d="M -40 380 Q 180 360 320 300 Q 520 220 720 200 Q 960 175 1120 120 Q 1280 72 1480 20"
        stroke={DAWN_GOLD}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
        opacity="0.12"
        filter="url(#hero-mist-glow)"
      />
      <path
        d="M -40 380 Q 180 360 320 300 Q 520 220 720 200 Q 960 175 1120 120 Q 1280 72 1480 20"
        stroke="url(#heroLuxStroke)"
        strokeWidth="0.85"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function JewelChestObject({ className }: { className?: string }) {
  return (
    <div className={cn("relative shrink-0", className)} aria-hidden>
      <div className="absolute -inset-10 rounded-full bg-[#C5A059]/[0.1] blur-3xl md:-inset-14" />
      <div className="relative flex h-[5.5rem] w-[5.5rem] items-center justify-center md:h-[6.75rem] md:w-[6.75rem] lg:h-[7.25rem] lg:w-[7.25rem]">
        <div className="absolute inset-0 rotate-3 rounded-2xl border border-[#C5A059]/30 bg-gradient-to-br from-[#C5A059]/18 via-[#0f0f0f] to-[#0a0a0a] shadow-[0_0_0_1px_rgba(197,160,89,0.15)_inset,0_28px_72px_rgba(0,0,0,0.55)]" />
        <div className="absolute inset-[10%] -rotate-3 rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.08] to-transparent" />
        <Gem className="relative z-[1] h-10 w-10 text-[#C5A059] md:h-11 md:w-11 lg:h-12 lg:w-12" strokeWidth={1.25} />
      </div>
    </div>
  )
}

function genesisPathClasses() {
  return cn(
    "lumina-glass-frost group relative flex min-h-[17rem] flex-col rounded-3xl border border-white/[0.08] p-7 text-left",
    "transition-all duration-500 hover:border-[#C5A059]/35 hover:bg-white/[0.04] hover:shadow-[0_32px_80px_rgba(0,0,0,0.45)]",
    "md:min-h-[19rem] md:p-8 lg:min-h-[20rem]",
  )
}

function scalingPathClasses() {
  return genesisPathClasses()
}

function InlineIndustryBurst() {
  const [hover, setHover] = useState(false)
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    if (!hover) return
    const id = window.setInterval(() => {
      setIdx((v) => (v + 1) % INDUSTRY_ICONS.length)
    }, 120)
    return () => window.clearInterval(id)
  }, [hover])

  const Icon = INDUSTRY_ICONS[idx]

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative z-[2]">당신의</span>
      <AnimatePresence mode="wait">
        {hover ? (
          <motion.span
            key={idx}
            initial={{ opacity: 0, y: 6, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.9 }}
            transition={{ duration: 0.16 }}
            className="pointer-events-none absolute -top-7 left-1/2 z-[3] -translate-x-1/2 rounded-full border border-[#C5A059]/45 bg-black/75 p-1.5 shadow-[0_0_16px_rgba(197,160,89,0.35)]"
            aria-hidden
          >
            <Icon className="h-3.5 w-3.5 text-[#d8c49a]" strokeWidth={1.8} />
          </motion.span>
        ) : null}
      </AnimatePresence>
    </span>
  )
}

export function HeroSection() {
  const reduceMotion = useReducedMotion()
  const [agentTheme, setAgentTheme] = useState<SpecializedAgentId>("cosmetic")
  const mistOrb = AGENT_MIST_THEMES[agentTheme].orb

  return (
    <section
      className="relative min-h-screen overflow-hidden bg-[#0A0A0A] pt-0 lumina-hero-gallery"
      data-specialized-agent={agentTheme}
    >
      <div className="absolute inset-0 z-0 bg-[#0A0A0A]" aria-hidden />
      <DawnMistAtmosphere theme={agentTheme} />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-[min(48vh,26rem)] bg-gradient-to-b from-[#0A0A0A] from-0% via-[#0A0A0A]/92 via-[38%] to-transparent to-[100%] md:h-[min(44vh,28rem)]"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute right-[6%] top-[min(34vh,15rem)] z-[1] h-[min(480px,52vw)] w-[min(480px,52vw)] rounded-full blur-[130px] md:top-[min(30vh,14rem)] lg:top-[min(28vh,13rem)]"
        animate={{ backgroundColor: mistOrb }}
        transition={{ duration: 0.75, ease: easeLux }}
      />
      <div className="absolute bottom-0 left-0 z-[2] h-52 w-[72%] bg-gradient-to-t from-[#f5f0e6]/95 to-transparent md:h-56" />

      <HeroGrowthCurve />

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-28 pt-52 text-center sm:px-6 md:pt-60 lg:max-w-[1200px] lg:px-10 lg:pb-36 xl:max-w-[1280px]">
        <motion.p
          className={cn(
            "mb-9 text-[10px] font-medium uppercase tracking-[0.36em] text-[#C5A059]/85 sm:mb-11 sm:text-[11px] sm:tracking-[0.38em]",
            fontBody,
          )}
          {...fadeUp(0, !!reduceMotion)}
        >
          The Dawn Mist · Lumina OS
        </motion.p>

        <div className="relative mx-auto max-w-4xl">
          {/* 새벽 수평선 글로우 — 낮은 채도 골드 */}
          <div
            className="pointer-events-none absolute left-1/2 top-[42%] h-[min(280px,48vw)] w-[min(100%,720px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C5A059]/[0.09] blur-[110px]"
            aria-hidden
          />
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[200px] w-[min(90%,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#C5A059]/18 via-[#c9b896]/10 to-[#C5A059]/14 blur-[72px]"
            aria-hidden
            initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.05, ease: easeLux }}
          />

          <motion.h1
            className={cn(
              "relative mx-auto max-w-[24rem] text-[1.55rem] font-extrabold leading-[1.5] tracking-[0.04em] text-[#eceae6] sm:max-w-3xl sm:text-[1.9rem] md:max-w-4xl md:text-[2.15rem] lg:text-[2.35rem]",
              "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]",
            )}
            {...fadeUpBlur(0.06, !!reduceMotion)}
          >
            <span className="block">자본의 한계를 넘어,</span>
            <span className="mt-4 block bg-gradient-to-r from-[#f2ead7] via-[#C5A059] to-[#9f8042] bg-clip-text text-transparent">
              <span className="relative inline-block">
                <span
                  className="pointer-events-none absolute inset-0 blur-[8px]"
                  style={{ textShadow: "0 0 22px rgba(197,160,89,0.35)" }}
                  aria-hidden
                >
                  당신의 비즈니스를
                </span>
                당신의 비즈니스를
              </span>{" "}
              명품의 궤도로.
            </span>
          </motion.h1>

          <motion.p
            className={cn(
              "relative mx-auto mt-10 max-w-[34rem] text-[0.9375rem] font-light leading-[2] tracking-[0.04em] text-white/[0.58] sm:mt-11 sm:max-w-3xl sm:text-base md:text-[1.05rem]",
              fontHeadThin,
            )}
            {...fadeUpBlur(0.2, !!reduceMotion)}
          >
            새벽안개가 대지를 감싸듯, 루미나는 당신의 철학을 가장 고요하고 화려하게 꽃피웁니다.
          </motion.p>
        </div>

        <motion.div
          className="relative z-[2] mx-auto mt-12 w-full max-w-5xl px-0 sm:mt-14 lg:max-w-6xl"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, delay: 0.05, ease: easeLux }}
        >
          <SpecializedAiAgents activeId={agentTheme} onAgentChange={setAgentTheme} />
        </motion.div>

        <div className="relative z-[2] mx-auto mt-10 max-w-4xl text-center sm:mt-12">
          <motion.p
            lang="en"
            className={cn(
              "relative text-[10px] font-light uppercase tracking-[0.34em] text-white/32 sm:text-[11px]",
              fontBody,
            )}
            {...fadeUp(0.28, !!reduceMotion)}
          >
            The Universal Luxury Branding OS
          </motion.p>
        </div>

        <motion.p
          className={cn(
            "relative mx-auto mt-12 max-w-[44rem] text-sm text-[#a3a09a] sm:mt-14 sm:max-w-3xl sm:text-[0.95rem] md:text-base",
            fontBody,
          )}
          style={bodyTextStyle}
          {...fadeUp(0.34, !!reduceMotion)}
        >
          루미나는 특화된 고지능의 AI 에이전트를 통해 브랜딩의 문턱을 낮추고 가치의 천장을 높입니다.
          코스메틱부터 퍼스널 브랜딩까지 — <InlineIndustryBurst /> 철학을 가장 경제적으로, 가장 화려하게
          꽃피우십시오.
        </motion.p>

        <motion.div
          className="mt-16 w-full sm:mt-20 md:mt-24 lg:mt-28"
          {...fadeUp(0.32, !!reduceMotion)}
        >
          <div className="hidden items-stretch justify-center gap-8 xl:gap-14 lg:grid lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
            <Link href="/brand-genesis" className={genesisPathClasses()}>
              <span className={cn("text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C5A059]/90", fontBody)}>
                Genesis · 0 → 1
              </span>
              <span className={cn("mt-4 text-xl font-normal leading-[1.32] tracking-[0.02em] text-white md:text-2xl", fontHeadThin)}>
                브랜드 제네시스
              </span>
              <p className={cn("mt-4 flex-1 text-[13px] leading-[1.72] text-white/50 md:text-sm md:leading-[1.75]", fontBody)}>
                0 to 1, 성공 확률을 시뮬레이션하고 아이디어를 현실로 만드세요.
              </p>
              <p className={cn("mt-5 text-[11px] text-white/32", fontBody)}>신규 창업자 · 아이디어 보유자</p>
              <span className="mt-6 flex items-center gap-2 border-t border-white/[0.07] pt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/28 transition-colors group-hover:border-[#C5A059]/25 group-hover:text-[#C5A059]/80">
                Genesis path
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>

            <div className="flex flex-col items-center justify-center px-2">
              <JewelChestObject />
            </div>

            <Link href="/brand-diagnosis" className={scalingPathClasses()}>
              <span className={cn("text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C5A059]/90", fontBody)}>
                Scaling · 1 → 100
              </span>
              <span className={cn("mt-4 text-xl font-normal leading-[1.32] tracking-[0.02em] text-white md:text-2xl", fontHeadThin)}>
                브랜드 스케일링
              </span>
              <p className={cn("mt-4 flex-1 text-[13px] leading-[1.72] text-white/50 md:text-sm md:leading-[1.75]", fontBody)}>
                1 to 100, 정체된 브랜드를 진단하고 AI로 가치를 재창조하여 성장시키세요.
              </p>
              <p className={cn("mt-5 text-[11px] text-white/32", fontBody)}>기존 사업자 · 리브랜딩이 필요한 기업</p>
              <span className="mt-6 flex items-center gap-2 border-t border-white/[0.07] pt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/28 transition-colors group-hover:border-[#C5A059]/25 group-hover:text-[#C5A059]/80">
                진단 · 재창조
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>

          <div className="flex flex-col items-stretch gap-14 sm:gap-16 lg:hidden">
            <Link href="/brand-genesis" className={genesisPathClasses()}>
              <span className={cn("text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C5A059]/90", fontBody)}>
                Genesis · 0 → 1
              </span>
              <span className={cn("mt-4 text-xl font-normal leading-[1.32] text-white", fontHeadThin)}>브랜드 제네시스</span>
              <p className={cn("mt-4 text-[13px] leading-[1.72] text-white/50", fontBody)}>
                0 to 1, 성공 확률을 시뮬레이션하고 아이디어를 현실로 만드세요.
              </p>
              <p className={cn("mt-5 text-[11px] text-white/32", fontBody)}>신규 창업자 · 아이디어 보유자</p>
              <span className={cn("mt-6 flex items-center gap-2 border-t border-white/[0.07] pt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/28", fontBody)}>
                Genesis path
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>

            <JewelChestObject className="mx-auto" />

            <Link href="/brand-diagnosis" className={scalingPathClasses()}>
              <span className={cn("text-[10px] font-semibold uppercase tracking-[0.24em] text-[#C5A059]/90", fontBody)}>
                Scaling · 1 → 100
              </span>
              <span className={cn("mt-4 text-xl font-normal leading-[1.32] text-white", fontHeadThin)}>브랜드 스케일링</span>
              <p className={cn("mt-4 text-[13px] leading-[1.72] text-white/50", fontBody)}>
                1 to 100, 정체된 브랜드를 진단하고 AI로 가치를 재창조하여 성장시키세요.
              </p>
              <p className={cn("mt-5 text-[11px] text-white/32", fontBody)}>기존 사업자 · 리브랜딩이 필요한 기업</p>
              <span className={cn("mt-6 flex items-center gap-2 border-t border-white/[0.07] pt-5 text-[10px] font-medium uppercase tracking-[0.22em] text-white/28", fontBody)}>
                진단 · 재창조
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="relative z-[2] mx-auto mt-20 w-full max-w-5xl"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, ease: easeLux }}
        >
          <TrustArchetypeEngine />
        </motion.div>

        <motion.div
          className="mx-auto mt-20 grid w-full max-w-lg grid-cols-3 gap-8 border-t border-white/[0.08] pt-12 sm:mt-24 sm:max-w-2xl sm:gap-10 sm:pt-14 md:mt-28"
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.75, delay: reduceMotion ? 0 : 0.1, ease: easeLux }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className={cn(
                  "text-xl tabular-nums text-transparent bg-clip-text bg-gradient-to-r from-[#dcc9a0] via-[#C5A059] to-[#9a7d42] sm:text-2xl",
                  fontHeadThin,
                )}
              >
                {stat.value}
              </div>
              <div className={cn("mt-2 text-[9px] uppercase leading-tight tracking-[0.15em] text-white/34 sm:text-[10px]", fontBody)}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
