"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion"
import {
  Bot,
  Clapperboard,
  Cpu,
  LayoutTemplate,
  Palette,
  Rocket,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

const easeLux = [0.22, 1, 0.36, 1] as const

function SectionReveal({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: reduceMotion ? 0 : 0.85, ease: easeLux }}
    >
      {children}
    </motion.div>
  )
}

const BG = "#121212"
const GOLD = "#D4AF37"

const fontHead =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif] font-bold"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

const bodyStyle = {
  letterSpacing: "-0.02em",
  lineHeight: 1.8,
} as const

const headlineStyle = {
  letterSpacing: "-0.02em",
  lineHeight: 1.35,
} as const

const INDUSTRIES = [
  "Fashion",
  "Tech",
  "F&B",
  "App",
  "Service",
  "B2B",
  "Lifestyle",
  "Health",
]

const OS_CARDS = [
  {
    title: "Genesis",
    tag: "비즈니스 본질의 서사 설계",
    desc: "모든 산업에서 통하는 ‘왜 우리인가’를 한 축으로 압축합니다.",
    Icon: Sparkles,
  },
  {
    title: "Builder",
    tag: "시각적 신뢰도 구축",
    desc: "산업 맞춤형 텍스처 엔진으로 채널 간 품격을 통일합니다.",
    Icon: Palette,
  },
  {
    title: "Detail Page",
    tag: "고전환 심리 설계",
    desc: "카테고리를 넘어 소비자 무의식을 관통하는 내러티브 구조입니다.",
    Icon: LayoutTemplate,
  },
  {
    title: "Motion Video",
    tag: "스토리텔링 기반 영상",
    desc: "플랫폼 알고리즘에 맞춘 바이럴 리듬으로 설계합니다.",
    Icon: Clapperboard,
  },
  {
    title: "Launching Package",
    tag: "시장 진입 통합 솔루션",
    desc: "아이템이 무엇이든 실행 가능한 런칭 시나리오를 한 번에 맞춥니다.",
    Icon: Rocket,
  },
  {
    title: "Marketing Agent",
    tag: "24/7 AI 마케팅 파트너",
    desc: "캠페인·메시지를 지속 학습하며 성장 곡선을 유지합니다.",
    Icon: Bot,
  },
]

/** 산업 특정 이미지 없이 — 기하학적 도형만 은은하게 이동 */
const ABSTRACT_DRIFT = [
  { left: "5%", top: "10%", w: 120, h: 120, br: 4, rot: 0, dur: 48 },
  { left: "82%", top: "14%", w: 80, h: 80, br: 40, rot: 0, dur: 56 },
  { left: "10%", top: "44%", w: 64, h: 64, br: 32, rot: 0, dur: 42 },
  { left: "78%", top: "40%", w: 96, h: 32, br: 4, rot: 0, dur: 52 },
  { left: "16%", top: "68%", w: 56, h: 56, br: 28, rot: 12, dur: 50 },
  { left: "72%", top: "72%", w: 140, h: 140, br: 70, rot: 0, dur: 60 },
  { left: "45%", top: "22%", w: 40, h: 40, br: 20, rot: 0, dur: 38 },
  { left: "52%", top: "58%", w: 72, h: 72, br: 8, rot: -6, dur: 44 },
] as const

function AbstractDriftLayer({
  scrollYProgress,
  reduceMotion,
}: {
  scrollYProgress: MotionValue<number>
  reduceMotion: boolean
}) {
  const yShift = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [0, -100],
  )
  return (
    <motion.div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
      style={{ y: yShift }}
      aria-hidden
    >
      {ABSTRACT_DRIFT.map((d, i) => (
        <motion.div
          key={i}
          className="absolute border border-[#D4AF37]/[0.14] bg-[#D4AF37]/[0.02]"
          style={{
            left: d.left,
            top: d.top,
            width: d.w,
            height: d.h,
            borderRadius: d.br,
            rotate: d.rot,
          }}
          initial={{ rotate: d.rot, opacity: 0.05 }}
          animate={
            reduceMotion
              ? { rotate: d.rot, opacity: 0.05 }
              : {
                  rotate: [d.rot, d.rot + 6, d.rot],
                  opacity: [0.05, 0.1, 0.06],
                }
          }
          transition={{
            duration: d.dur,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  )
}

function useBarrierProgress(containerRef: React.RefObject<HTMLElement | null>) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.15"],
  })
  return scrollYProgress
}

/** 혼란 → 루미나 만나 정렬 */
function IndustryChaosToOrder({
  alignProgress,
}: {
  alignProgress: MotionValue<number>
}) {
  const chaosOpacity = useTransform(alignProgress, [0, 0.55], [1, 0])
  const orderOpacity = useTransform(alignProgress, [0.35, 0.95], [0, 1])

  return (
    <div className="relative mt-10 min-h-[140px] sm:min-h-[120px]">
      <motion.div
        className="pointer-events-none absolute inset-0 flex flex-wrap content-start gap-2 sm:gap-2.5"
        style={{ opacity: chaosOpacity }}
        aria-hidden
      >
        {INDUSTRIES.map((label, i) => (
          <span
            key={`c-${label}`}
            className={cn(
              "inline-flex rounded-full border border-white/[0.07] bg-[#222]/90 px-2.5 py-1 text-[10px] text-[#6f6d6a] sm:text-[11px]",
              fontBody,
            )}
            style={{
              transform: `translate(${((i * 37) % 40) - 12}px, ${(i * 19) % 28}px) rotate(${-6 + (i % 5) * 2.5}deg)`,
            }}
          >
            {label}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-2 sm:gap-2.5"
        style={{ opacity: orderOpacity }}
      >
        {INDUSTRIES.map((label) => (
          <span
            key={`o-${label}`}
            className={cn(
              "rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/[0.08] px-3 py-1 text-[10px] font-medium text-[#d4cfc6] sm:text-[11px]",
              fontBody,
            )}
          >
            {label}
          </span>
        ))}
        <span
          className={cn(
            "ml-1 self-center text-[10px] font-medium uppercase tracking-[0.2em] text-[#D4AF37]/90 sm:text-[11px]",
            fontBody,
          )}
        >
          → Lumina OS
        </span>
      </motion.div>
    </div>
  )
}

/** 저비용·고효율 상관 — 2축 인포그래픽 */
function CostEfficiencyChart() {
  return (
    <div
      className={cn(
        "mt-8 rounded-2xl border border-white/[0.1] bg-white/[0.03] p-4 backdrop-blur-xl sm:p-5",
        fontBody,
      )}
      style={bodyStyle}
    >
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.22em] text-[#8a8680]">
        Value Map · 비용 × 효율
      </p>
      <div className="relative mx-auto mt-4 aspect-[16/10] w-full max-w-md">
        <svg className="h-full w-full" viewBox="0 0 320 200" aria-hidden>
          <line x1="48" y1="160" x2="300" y2="160" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <line x1="48" y1="160" x2="48" y2="24" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
          <text x="52" y="178" fill="#5c5a57" fontSize="9">
            저비용
          </text>
          <text x="248" y="178" fill="#5c5a57" fontSize="9">
            고비용
          </text>
          <text x="12" y="100" fill="#5c5a57" fontSize="9" transform="rotate(-90 12 100)">
            저효율
          </text>
          <text x="12" y="40" fill="#5c5a57" fontSize="9" transform="rotate(-90 12 40)">
            고효율
          </text>
          <circle cx="248" cy="52" r="10" fill="rgba(90,88,85,0.45)" stroke="rgba(120,118,115,0.5)" />
          <text x="236" y="36" fill="#7a7670" fontSize="8">
            에이전시
          </text>
          <circle cx="78" cy="48" r="10" fill="rgba(212,175,55,0.35)" stroke="rgba(212,175,55,0.65)" />
          <text x="58" y="32" fill="#D4AF37" fontSize="8">
            루미나
          </text>
          <path
            d="M 78 48 Q 160 100 248 52"
            fill="none"
            stroke="rgba(212,175,55,0.15)"
            strokeWidth="1"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
      <p className="mt-2 text-center text-[12px] text-[#9a9690]">
        동일한 브랜드 과제라도, 루미나는{" "}
        <span className="text-[#D4AF37]">낮은 비용</span>에서{" "}
        <span className="text-[#D4AF37]">높은 실행 효율</span>에 가깝게 수렴합니다.
      </p>
    </div>
  )
}

function GlassCompareTable() {
  const rows = [
    { label: "비용 구조", agency: "고비용 · 고정 계약", lumina: "모듈형 · 1/100 수준 부담" },
    { label: "실행 속도", agency: "저속도 · 반복 회의", lumina: "초고속 · AI 병렬 가동" },
    { label: "적용 범위", agency: "단일 카테고리 경험", lumina: "범용 OS · 전 산업 파이프라인" },
  ]
  return (
    <div
      className={cn(
        "mt-6 overflow-hidden rounded-2xl border border-white/[0.12] bg-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl",
        fontBody,
      )}
      style={bodyStyle}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_1fr_1fr] gap-px bg-white/[0.08] text-[12px] sm:text-[13px]">
        <div className="bg-[#141414]/90 px-3 py-3 text-[#8a8680] sm:px-4" />
        <div className="bg-[#1a1815]/95 px-3 py-3 text-center text-[#9a9590] sm:px-4">
          에이전시
        </div>
        <div className="bg-[#1a1610]/95 px-3 py-3 text-center text-[#D4AF37] sm:px-4">
          루미나 OS
        </div>
        {rows.map((r) => (
          <div key={r.label} className="contents">
            <div className="bg-[#141414]/90 px-3 py-3 text-[#a09c96] sm:px-4">
              {r.label}
            </div>
            <div className="bg-[#181818]/95 px-3 py-3 text-[#7a7670] sm:px-4">
              {r.agency}
            </div>
            <div className="bg-[#1c1912]/95 px-3 py-3 text-[#d4cfc6] sm:px-4">
              {r.lumina}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BarrierParticleCanvas({
  progress,
  reduceMotion,
}: {
  progress: MotionValue<number>
  reduceMotion: boolean
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => ({
      x: 0.15 + (i % 8) * 0.1 + Math.random() * 0.04,
      y: 0.12 + Math.floor(i / 8) * 0.12 + Math.random() * 0.05,
      vx: (Math.random() - 0.5) * 2.2,
      vy: -Math.random() * 1.8 - 0.4,
      w: 0.06 + Math.random() * 0.06,
      h: 0.04 + Math.random() * 0.05,
      rot: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.15,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const draw = (p: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const w = rect.width
      const h = rect.height
      if (w < 2 || h < 2) return
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      const burst = reduceMotion ? Math.min(1, p * 1.2) : p

      particles.forEach((pt) => {
        const ox = pt.x * w
        const oy = pt.y * h
        const dx = pt.vx * burst * 80
        const dy = pt.vy * burst * h * 0.5
        const rw = pt.w * w
        const rh = pt.h * h
        const alpha = Math.max(0, 0.55 - burst * 0.35)
        ctx.save()
        ctx.translate(ox + dx, oy + dy)
        ctx.rotate(pt.rot + pt.vr * burst * 4)
        ctx.fillStyle = `rgba(55,55,58,${alpha})`
        ctx.strokeStyle = `rgba(90,88,85,${alpha * 0.6})`
        ctx.fillRect(-rw / 2, -rh / 2, rw, rh)
        ctx.strokeRect(-rw / 2, -rh / 2, rw, rh)
        ctx.restore()
      })

      if (burst > 0.02 && burst < 0.98 && !reduceMotion) {
        ctx.save()
        ctx.globalCompositeOperation = "screen"
        const gx = w * 0.5
        const gy = h * 0.55
        const grd = ctx.createRadialGradient(gx, gy, 0, gx, gy, w * 0.45)
        grd.addColorStop(0, `rgba(212,175,55,${0.22 * burst})`)
        grd.addColorStop(1, "rgba(212,175,55,0)")
        ctx.fillStyle = grd
        ctx.fillRect(0, 0, w, h)
        ctx.restore()
      }
    }

    const readProgress = () => {
      if (!progress || typeof progress.get !== "function") return 0
      const value = progress.get()
      return Number.isFinite(value) ? value : 0
    }

    draw(readProgress())
    const unsub = progress.on("change", () => draw(readProgress()))
    const ro = new ResizeObserver(() => draw(readProgress()))
    ro.observe(canvas)

    return () => {
      ro.disconnect()
      unsub()
    }
  }, [particles, progress, reduceMotion])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden
    />
  )
}

function BloomingFinale({
  children,
  reduceMotion,
}: {
  children: React.ReactNode
  reduceMotion: boolean
}) {
  const [hover, setHover] = useState(false)
  return (
    <motion.div
      className="relative mt-12 overflow-hidden rounded-3xl border border-[#D4AF37]/25 bg-[#0a0a0a] px-6 py-14 shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_100px_rgba(212,175,55,0.1)] sm:py-20"
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.9, ease: easeLux }}
    >
      {[1, 2, 3, 4, 5].map((ring) => (
        <motion.div
          key={ring}
          className="pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#D4AF37]/[0.12]"
          style={{
            width: `${ring * 17 + 8}%`,
            maxWidth: "min(92vw, 640px)",
            aspectRatio: "1",
          }}
          initial={{
            scale: 1,
            opacity: 0.22 - ring * 0.03,
          }}
          animate={{
            scale: hover && !reduceMotion ? 1.03 + ring * 0.004 : 1,
            opacity: 0.22 - ring * 0.03,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
        />
      ))}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[38%] h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/25 blur-[80px]"
        initial={{ scale: 1, opacity: 0.35 }}
        animate={{
          scale: hover && !reduceMotion ? 1.15 : 1,
          opacity: hover ? 0.55 : 0.35,
        }}
        transition={{ duration: 0.6 }}
        aria-hidden
      />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  )
}

export function BrandPainRoadmap() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const step2BarrierRef = useRef<HTMLDivElement>(null)

  const barrierProgress = useBarrierProgress(step2BarrierRef)

  const wallSolid = useTransform(barrierProgress, [0, 0.45], [1, 0])
  const engineGlow = useTransform(barrierProgress, [0.28, 0.72], [0, 1])
  const shardBurst = useTransform(barrierProgress, [0.15, 0.65], [0, 1])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  const alignProgress = useTransform(scrollYProgress, [0.03, 0.2], [0, 1])

  const noiseOpacity = useTransform(
    scrollYProgress,
    [0, 0.4],
    reduceMotion ? [0.15, 0] : [0.5, 0],
  )

  const chaosWash = useTransform(scrollYProgress, [0, 0.32], [1, 0])

  const goldBloom = useTransform(scrollYProgress, [0.45, 0.92], [0, 1])

  const pathLength = useTransform(scrollYProgress, [0.02, 0.94], [0, 1])

  const pathLineOpacity = useTransform(scrollYProgress, [0, 0.06], [0.25, 1])

  const baseLayerOpacity = useTransform(chaosWash, (v) => 0.7 + v * 0.3)

  return (
    <section
      ref={sectionRef}
      id="brand-roadmap"
      className="relative min-h-[min(520vh,4000px)] overflow-hidden"
      aria-labelledby="brand-roadmap-title"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ backgroundColor: BG, opacity: baseLayerOpacity }}
      />
      <motion.div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#2f2f2f] via-[#1a1a1a] to-[#121212]"
        style={{ opacity: chaosWash }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: noiseOpacity,
          backgroundImage: grainSvg,
          mixBlendMode: "overlay",
        }}
      />

      <motion.div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_50%_at_50%_100%,rgba(212,175,55,0.16),transparent_58%)]"
        style={{ opacity: goldBloom }}
      />

      <AbstractDriftLayer
        scrollYProgress={scrollYProgress}
        reduceMotion={!!reduceMotion}
      />

      <div className="pointer-events-none absolute inset-y-0 left-3 w-px sm:left-4 md:left-6 lg:left-10">
        <svg
          className="h-full w-4 -translate-x-1/2 overflow-visible sm:w-5"
          viewBox="0 0 4 1000"
          preserveAspectRatio="none"
          aria-hidden
        >
          <motion.path
            d="M 2 0 L 2 1000"
            fill="none"
            stroke={GOLD}
            strokeWidth="0.4"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            style={{
              pathLength: reduceMotion ? 1 : pathLength,
              opacity: pathLineOpacity,
            }}
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 pb-32 pt-20 pl-9 sm:px-6 sm:pl-12 md:pl-16 lg:pl-24 md:pt-28">
        <SectionReveal className="mb-20 max-w-2xl">
          <p
            className={cn(
              "mb-3 text-xs font-medium uppercase tracking-[0.32em] text-[#888]",
              fontBody,
            )}
            style={bodyStyle}
          >
            Universal Luxury Roadmap
          </p>
          <h2
            id="brand-roadmap-title"
            className={cn(
              "text-2xl text-[#e8e6e3] sm:text-3xl md:text-[2rem]",
              fontHead,
            )}
            style={headlineStyle}
          >
            모든 고민을 끝내는{" "}
            <span className="bg-gradient-to-r from-[#b8941f] via-[#D4AF37] to-[#e8c547] bg-clip-text text-transparent">
              브랜드 로드맵
            </span>
          </h2>
          <p
            className={cn("mt-4 max-w-xl text-[15px] text-[#9a9690]", fontBody)}
            style={bodyStyle}
          >
            패션·앱·식당·테크·서비스 — 분야는 달라도 자본 압박과 기획 공백은
            닮아 있습니다. 루미나 OS가 노이즈를 걷고 명품의 궤도로 올립니다.
          </p>
        </SectionReveal>

        {/* Step 1 · The Noise */}
        <SectionReveal className="relative mb-24 md:mb-32">
          <span
            className={cn(
              "mb-3 inline-block text-[11px] uppercase tracking-[0.28em] text-[#6a6865]",
              fontBody,
            )}
          >
            Step 1 · The Noise
          </span>
          <p
            className={cn(
              "max-w-2xl text-[15px] text-[#7a7670] sm:text-[16px]",
              fontBody,
            )}
            style={bodyStyle}
          >
            패션, 앱, 식당, SaaS… 업종은 달라도{" "}
            <span className="text-[#9a9690]">
              &apos;예산은 부족하고, 기획은 제각각이며, 브랜드는 설명되지
              않는다&apos;
            </span>
            는 고통은 공통입니다. 그 혼란이 곧 노이즈입니다.
          </p>
          <IndustryChaosToOrder alignProgress={alignProgress} />
        </SectionReveal>

        {/* Step 2 · The Breakthrough */}
        <div ref={step2BarrierRef} className="relative mb-24 min-h-[420px] md:mb-32 md:min-h-[480px]">
          <SectionReveal>
            <span
              className={cn(
                "mb-3 inline-block text-[11px] uppercase tracking-[0.28em] text-[#8a8680]",
                fontBody,
              )}
            >
              Step 2 · The Breakthrough
            </span>
            <p
              className={cn(
                "max-w-2xl text-[16px] text-[#D4AF37] sm:text-[17px]",
                fontHead,
              )}
              style={{ ...headlineStyle, fontWeight: 700 }}
            >
              자본의 한계가 브랜드의 한계가 되어서는 안 됩니다.
            </p>
            <p
              className={cn(
                "mt-4 max-w-2xl text-[15px] text-[#b8b4ae] sm:text-[16px]",
                fontHead,
              )}
              style={{ ...headlineStyle, fontWeight: 700 }}
            >
              수천만 원의 에이전시 비용은 이제 선택사항입니다. 루미나는 1/100의
              비용으로 대형 에이전시급 성과를 모든 창업자에게 제공합니다.
            </p>
          </SectionReveal>

          <div className="relative mt-10 h-[min(52vw,320px)] min-h-[240px] w-full overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0f0f0f] sm:h-[280px] md:h-[300px]">
            {!reduceMotion && (
              <BarrierParticleCanvas progress={shardBurst} reduceMotion={!!reduceMotion} />
            )}

            <motion.div
              className="absolute inset-0 z-[2] flex flex-col items-center justify-center bg-gradient-to-b from-[#2a2a2c] to-[#1c1c1e] px-4"
              style={{ opacity: wallSolid }}
            >
              <span
                className={cn(
                  "text-[clamp(1.75rem,8vw,3.5rem)] font-black tracking-[0.12em] text-[#4a4a4e]",
                  fontBody,
                )}
                style={{ letterSpacing: "0.08em" }}
              >
                HIGH COST
              </span>
              <p className={cn("mt-3 text-center text-[12px] text-[#6a6865]", fontBody)} style={bodyStyle}>
                자본 장벽
              </p>
            </motion.div>

            <motion.div
              className="absolute inset-0 z-[3] flex flex-col items-center justify-center px-4"
              style={{ opacity: engineGlow }}
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#D4AF37]/40 bg-[#D4AF37]/10 shadow-[0_0_48px_rgba(212,175,55,0.35)]">
                <Cpu className="h-8 w-8 text-[#D4AF37]" strokeWidth={1.25} />
              </div>
              <p
                className={cn(
                  "mt-4 bg-gradient-to-r from-[#e8c547] via-[#D4AF37] to-[#b8941f] bg-clip-text text-lg font-semibold text-transparent sm:text-xl",
                  fontHead,
                )}
              >
                LUMINA ENGINE
              </p>
              <p className={cn("mt-2 text-center text-[12px] text-[#a8a49c]", fontBody)} style={bodyStyle}>
                저비용 · 고효율 · 범용 파이프라인
              </p>
            </motion.div>
          </div>

          <CostEfficiencyChart />
          <GlassCompareTable />
        </div>

        {/* Step 3 · The 6 Engines */}
        <SectionReveal className="relative mb-24 md:mb-36">
          <span
            className={cn(
              "mb-3 inline-block text-[11px] uppercase tracking-[0.28em] text-[#a8a49c]",
              fontBody,
            )}
          >
            Step 3 · The 6 Engines
          </span>
          <p
            className={cn(
              "max-w-2xl text-[16px] text-[#e4e0d8] sm:text-[17px]",
              fontHead,
            )}
            style={{ ...headlineStyle, fontWeight: 700 }}
          >
            Genesis부터 Marketing Agent까지 — 어떤 분야든 즉시 얹을 수 있는
            6대 범용 모듈이 한 그리드에서 동시에 작동합니다.
          </p>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {OS_CARDS.map(({ title, tag, desc, Icon }) => (
              <motion.div
                key={title}
                className="rounded-xl border border-white/[0.08] bg-[#161616]/85 p-4 transition-colors hover:border-[#D4AF37]/30"
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ duration: 0.55, ease: easeLux }}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/25 bg-[#D4AF37]/[0.07] text-[#D4AF37]">
                    <Icon className="h-5 w-5" strokeWidth={1.5} />
                  </span>
                  <div>
                    <p
                      className={cn("font-['Nanum_Myeongjo'] text-[15px] text-[#f0ebe3]")}
                      style={headlineStyle}
                    >
                      {title}
                    </p>
                    <p className={cn("mt-1 text-[12px] text-[#D4AF37]/95", fontBody)} style={bodyStyle}>
                      {tag}
                    </p>
                    <p className={cn("mt-2 text-[12px] text-[#8f8b85]", fontBody)} style={bodyStyle}>
                      {desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        {/* Step 4 · The Blooming */}
        <div className="relative pb-8">
          <SectionReveal>
            <span
              className={cn(
                "mb-3 inline-block text-[11px] uppercase tracking-[0.28em] text-[#D4AF37]/85",
                fontBody,
              )}
            >
              Step 4 · The Blooming
            </span>
            <p
              className={cn(
                "max-w-2xl text-[16px] text-[#f7f4ee] sm:text-[17px]",
                fontHead,
              )}
              style={{ ...headlineStyle, fontWeight: 700 }}
            >
              당신의 철학이 골드 텍스처로 피어납니다. 아이템이 무엇이든, 루미나
              OS는 동일한 격으로 브랜드를 세울 수 있게 돕습니다.
            </p>
          </SectionReveal>

          <BloomingFinale reduceMotion={!!reduceMotion}>
            <div
              className={cn(
                "relative text-center text-[clamp(2rem,12vw,4rem)] font-bold tracking-[0.06em]",
                fontHead,
              )}
            >
              <span
                className="absolute inset-0 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.5), transparent 65%)",
                }}
                aria-hidden
              />
              <span className="relative bg-gradient-to-br from-[#f2e8c8] via-[#D4AF37] to-[#8a7020] bg-clip-text text-transparent drop-shadow-[0_0_36px_rgba(212,175,55,0.5)]">
                Lumina OS
              </span>
            </div>
            <p className={cn("mt-4 text-center text-[12px] uppercase tracking-[0.35em] text-[#6a665e]", fontBody)}>
              Universal Luxury Branding OS
            </p>
            <div className="flex justify-center">
              <Link
                href="/brand-diagnosis"
                className={cn(
                  "group relative mt-10 inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-4 text-[15px] font-semibold text-[#121212]",
                  fontBody,
                )}
                style={{ letterSpacing: "-0.02em" }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#e8c547] via-[#D4AF37] to-[#b8941f] shadow-[0_0_56px_rgba(212,175,55,0.5)] transition duration-500 group-hover:brightness-110 group-hover:shadow-[0_0_80px_rgba(212,175,55,0.6)]" />
                <span className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                  <span className="absolute -left-1/2 top-0 h-full w-1/2 skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent transition duration-700 group-hover:left-full" />
                </span>
                <span className="relative z-10">지금 무료 진단 시작하기</span>
              </Link>
            </div>
          </BloomingFinale>
        </div>

        <footer className="mt-16 border-t border-[#D4AF37]/20 pt-12">
          <p
            className={cn(
              "max-w-3xl text-[15px] font-medium leading-relaxed text-[#d4cfc6] sm:text-[16px]",
              fontHead,
            )}
            style={{ ...headlineStyle, fontWeight: 700 }}
          >
            자본이 아닌 철학이 승리하는 시대, 루미나가 당신과 함께합니다.
          </p>
          <p
            className={cn("mt-4 max-w-2xl text-[13px] text-[#7a7670] sm:text-[14px]", fontBody)}
            style={bodyStyle}
          >
            범용 OS로 분야의 경계 없이, 브랜드의 서사와 실행을 한 화면에서
            완결하세요.
          </p>
        </footer>
      </div>
    </section>
  )
}
