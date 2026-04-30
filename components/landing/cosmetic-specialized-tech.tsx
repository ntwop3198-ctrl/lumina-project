"use client"

import { useId, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const easeLux = [0.22, 1, 0.36, 1] as const

const fontHeadThin =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif] font-light"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"

const DAWN_GOLD = "#C5A059"

const COSMETIC_TECH = [
  {
    id: "tactile",
    title: "시각적 촉각 합성 엔진",
    description:
      "제형의 점도와 광채를 데이터로 재구성하여 고객의 촉각을 깨웁니다.",
    index: 96,
  },
  {
    id: "objection",
    title: "심리적 반박 대응 모델",
    description:
      "구매 결정 직전의 미세한 망설임까지 예측하여 논리적으로 방어합니다.",
    index: 92,
  },
  {
    id: "bridge",
    title: "성분-서사 브릿지 알고리즘",
    description:
      "무미건조한 성분표를 브랜드의 영혼이 담긴 철학적 서사로 번역합니다.",
    index: 94,
  },
] as const

function DataScanLayer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-[0.4]",
        className,
      )}
      aria-hidden
    >
      <div
        className="absolute inset-0 motion-safe:animate-cosmetic-scan-lines"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 44px,
            rgba(197, 160, 89, 0.08) 44px,
            rgba(197, 160, 89, 0.08) 45px
          )`,
          backgroundSize: "90px 100%",
        }}
      />
      <div
        className="absolute inset-0 motion-safe:animate-cosmetic-scan-lines-rev opacity-50"
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 62px,
            rgba(255, 255, 255, 0.035) 62px,
            rgba(255, 255, 255, 0.035) 63px
          )`,
          backgroundSize: "120px 100%",
        }}
      />
    </div>
  )
}

function CircuitLayer({ isHovered, gradId }: { isHovered: boolean; gradId: string }) {
  const reduceMotion = useReducedMotion()
  const pathD =
    "M 8 52 L 32 52 L 32 28 L 58 28 L 58 48 L 88 48 L 88 22 L 118 22 L 118 42 L 142 42"
  const show = isHovered && !reduceMotion

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 150 64"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={DAWN_GOLD} stopOpacity="0" />
          <stop offset="50%" stopColor={DAWN_GOLD} stopOpacity="0.9" />
          <stop offset="100%" stopColor={DAWN_GOLD} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={pathD}
        fill="none"
        stroke="rgba(197,160,89,0.3)"
        strokeWidth="0.55"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0.4, opacity: 0.28 }}
        animate={{ pathLength: show ? 1 : 0.4, opacity: show ? 0.85 : 0.28 }}
        transition={{ duration: 0.5, ease: easeLux }}
      />
      <motion.path
        d={pathD}
        fill="none"
        stroke={`url(#${gradId})`}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 14"
        initial={{ strokeDashoffset: 0, opacity: 0 }}
        animate={
          show
            ? {
                strokeDashoffset: [0, -72],
                opacity: [0.35, 0.95, 0.35],
              }
            : { strokeDashoffset: 0, opacity: 0 }
        }
        transition={
          show
            ? {
                strokeDashoffset: { duration: 2.4, repeat: Infinity, ease: "linear" },
                opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              }
            : { duration: 0.3 }
        }
      />
      {[24, 56, 96].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy={40 - (i % 3) * 6}
          r="2"
          fill={DAWN_GOLD}
          initial={{ opacity: 0.2, scale: 1 }}
          animate={
            show
              ? { opacity: [0.25, 1, 0.25], scale: [1, 1.15, 1] }
              : { opacity: 0.2, scale: 1 }
          }
          transition={{
            duration: 1.4,
            delay: i * 0.12,
            repeat: show ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      ))}
    </svg>
  )
}

function TechIndexBar({ value }: { value: number }) {
  const reduceMotion = useReducedMotion()
  return (
    <div className="mt-5 space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className={cn("text-[9px] uppercase tracking-[0.2em] text-white/38", fontBody)}>
          기술력 지수
        </span>
        <span
          className={cn("font-mono text-[11px] tabular-nums text-[#C5A059]/90", fontBody)}
        >
          {value}
        </span>
      </div>
      <div className="h-[3px] w-full overflow-hidden rounded-full bg-white/[0.08]">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#8a7340]/80 via-[#C5A059] to-[#e8d9b8]"
          initial={reduceMotion ? { width: `${value}%` } : { width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: reduceMotion ? 0 : 1.1, delay: 0.12, ease: easeLux }}
          style={{ boxShadow: "0 0 12px rgba(197,160,89,0.45)" }}
        />
      </div>
    </div>
  )
}

function TechCard({
  item,
  index,
}: {
  item: (typeof COSMETIC_TECH)[number]
  index: number
}) {
  const [hovered, setHovered] = useState(false)
  const circuitGradId = useId().replace(/:/g, "")

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.42, ease: easeLux }}
      className={cn(
        "group relative flex min-h-[13rem] flex-col overflow-hidden rounded-2xl border px-4 py-5 sm:min-h-[14rem] sm:px-5 sm:py-6",
        "border-[#C5A059]/22 bg-white/[0.035] backdrop-blur-xl",
        "shadow-[0_0_0_1px_rgba(197,160,89,0.08)_inset,0_12px_40px_rgba(0,0,0,0.35)]",
        "transition-[box-shadow,border-color] duration-500",
        "hover:border-[#C5A059]/45 hover:shadow-[0_0_36px_rgba(197,160,89,0.18),0_0_0_1px_rgba(197,160,89,0.22)_inset]",
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <DataScanLayer />
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#C5A059]/[0.07] blur-2xl" />
      <div className="relative z-[2] flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2">
          <h4
            className={cn(
              "text-[0.95rem] tracking-[0.03em] text-white/[0.93] sm:text-base",
              fontHeadThin,
            )}
            style={{ lineHeight: 1.55 }}
          >
            {item.title}
          </h4>
          {item.id === "objection" ? (
            <span
              className={cn(
                "rounded border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-1.5 py-px text-[6.5px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]",
                fontBody,
              )}
            >
              PRM Core
            </span>
          ) : null}
        </div>
        <p
          className={cn(
            "mt-3 flex-1 text-[12px] leading-relaxed text-white/48 sm:text-[13px]",
            fontBody,
          )}
        >
          {item.description}
        </p>
        <TechIndexBar value={item.index} />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] h-28 opacity-50 transition-opacity duration-500 group-hover:opacity-100">
        <CircuitLayer isHovered={hovered} gradId={circuitGradId} />
      </div>
    </motion.article>
  )
}

export function CosmeticSpecializedTech() {
  return (
    <div className="relative">
      <p
        className={cn(
          "mb-5 text-[10px] font-medium uppercase tracking-[0.26em] text-[#C5A059]/65",
          fontBody,
        )}
      >
        Cosmetic Agent · Specialized Tech
      </p>
      <div className="grid gap-4 md:grid-cols-3 md:gap-5">
        {COSMETIC_TECH.map((item, i) => (
          <TechCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}
