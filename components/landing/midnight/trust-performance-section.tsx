"use client"

import { useId } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"

const fontHead = "font-['Nanum_Myeongjo',var(--font-serif),serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

const copy = {
  ko: {
    eyebrow: "Trust & Performance",
    headline: "18년의 비즈니스 통찰",
    sub: "수치로 읽히는 확신 — 루미나는 데이터의 정밀함과 서사의 온도를 함께 다룹니다.",
    stat1Label: "누적 인사이트",
    stat2Label: "평균 브랜드 리프트",
    stat3Label: "클라이언트 만족",
    stat3Unit: "/ 5.0",
  },
  en: {
    eyebrow: "Trust & Performance",
    headline: "18 years of business insight",
    sub: "Conviction you can read in the numbers — Lumina pairs analytical precision with narrative warmth.",
    stat1Label: "Cumulative insight",
    stat2Label: "Avg. brand lift",
    stat3Label: "Client satisfaction",
    stat3Unit: "/ 5.0",
  },
} as const

/** 얇은 실버 라인 스파크라인 — 정규화된 Y */
const SPARK = [12, 18, 15, 28, 34, 42, 38, 55, 62, 58, 72, 78, 85, 92, 88, 95, 100]

function SparklineChart({ reduceMotion }: { reduceMotion: boolean | null }) {
  const gid = useId().replace(/:/g, "")
  const w = 120
  const h = 44
  const pad = 4
  const n = SPARK.length
  const xStep = (w - pad * 2) / (n - 1)
  const minV = 0
  const maxV = 100
  const toY = (v: number) => h - pad - ((v - minV) / (maxV - minV)) * (h - pad * 2)
  let d = `M ${pad} ${toY(SPARK[0])}`
  for (let i = 1; i < n; i++) {
    d += ` L ${pad + i * xStep} ${toY(SPARK[i])}`
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-12 w-[7.5rem] shrink-0" aria-hidden>
      <defs>
        <linearGradient id={`tp-spark-grad-${gid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(192,192,192,0.25)" />
          <stop offset="50%" stopColor="#C0C0C0" />
          <stop offset="100%" stopColor="rgba(248,250,252,0.85)" />
        </linearGradient>
      </defs>
      {[0, 1, 2].map((i) => (
        <line
          key={i}
          x1={pad}
          y1={14 + i * 12}
          x2={w - pad}
          y2={14 + i * 12}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.5"
        />
      ))}
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#tp-spark-grad-${gid})`}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: reduceMotion ? 0 : 1.6, ease: easeLux }}
      />
    </svg>
  )
}

function RingMetric({
  value,
  reduceMotion,
}: {
  value: number
  reduceMotion: boolean | null
}) {
  const gid = useId().replace(/:/g, "")
  const size = 72
  const stroke = 3
  const r = (size - stroke) / 2 - 2
  const cx = size / 2
  const cy = size / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - value / 100)

  return (
    <svg width={size} height={size} className="shrink-0" aria-hidden viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={`tp-ring-${gid}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(192,192,192,0.35)" />
          <stop offset="100%" stopColor="#C0C0C0" />
        </linearGradient>
      </defs>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={stroke}
      />
      <motion.circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke={`url(#tp-ring-${gid})`}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        initial={reduceMotion ? { strokeDashoffset: offset } : { strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: easeLux }}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  )
}

export function TrustPerformanceSection() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const t = isKo ? copy.ko : copy.en
  const reduceMotion = useReducedMotion()

  const stats = [
    {
      key: "y18",
      value: "18",
      suffix: isKo ? "년" : " yrs",
      label: t.stat1Label,
      viz: <SparklineChart reduceMotion={reduceMotion} />,
    },
    {
      key: "lift",
      value: "+214",
      suffix: "%",
      label: t.stat2Label,
      viz: <RingMetric value={86} reduceMotion={reduceMotion} />,
    },
    {
      key: "sat",
      value: "4.9",
      suffix: t.stat3Unit,
      label: t.stat3Label,
      viz: <RingMetric value={98} reduceMotion={reduceMotion} />,
    },
  ]

  return (
    <section
      id="trust-performance"
      className="relative scroll-mt-28 overflow-hidden border-t border-white/[0.06] py-20 md:py-28"
      aria-labelledby="trust-performance-heading"
    >
      {/* 미세 그리드 — 데이터 정교함 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_30%,rgba(192,192,192,0.04),transparent_55%)]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 xl:px-20">
        <div className="max-w-[min(56rem,72vw)] text-left">
          <motion.p
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: easeLux }}
            className={cn(
              "mb-4 font-mono text-[10px] uppercase tracking-[0.32em] text-[#C0C0C0]/70",
              fontBody,
            )}
          >
            {t.eyebrow}
          </motion.p>
          <motion.h2
            id="trust-performance-heading"
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.05, ease: easeLux }}
            className={cn(
              "text-[1.65rem] font-semibold leading-tight tracking-[0.02em] text-white sm:text-[2rem] md:text-[2.25rem]",
              fontHead,
            )}
          >
            {t.headline}
          </motion.h2>
          <motion.p
            initial={{ opacity: reduceMotion ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: easeLux }}
            className={cn("mt-5 max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-base", fontBody)}
          >
            {t.sub}
          </motion.p>
        </div>

        {/* 데이터 카드: 모바일 세로 스택, 데스크톱 3열 */}
        <div className="relative mt-14 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-6 lg:gap-8">
          {stats.map((s, i) => (
            <motion.article
              key={s.key}
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: 0.08 * i, ease: easeLux }}
              className={cn(
                "flex min-h-0 flex-col gap-5 rounded-none border border-white/[0.12] bg-white/[0.02] p-6 backdrop-blur-sm md:min-h-[220px] md:p-7",
                "lumina-midnight-glass",
              )}
            >
              <div className="flex flex-wrap items-end justify-between gap-4 sm:flex-nowrap">
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white/45",
                      fontBody,
                    )}
                  >
                    {s.label}
                  </p>
                  <p className="flex flex-wrap items-baseline gap-1">
                    <span
                      className={cn(
                        "text-gradient-liquid-silver bg-[length:200%_auto] text-4xl font-semibold tabular-nums tracking-tight sm:text-[2.75rem]",
                        fontHead,
                      )}
                    >
                      {s.value}
                    </span>
                    <span className={cn("text-lg font-medium text-[#C0C0C0]/90 sm:text-xl", fontHead)}>
                      {s.suffix}
                    </span>
                  </p>
                </div>
                <div className="flex shrink-0 items-center justify-end sm:pl-2">{s.viz}</div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Verified by Lumina — 우측 정렬, 카드와 겹치지 않도록 별도 행 */}
        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0, scale: reduceMotion ? 1 : 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeLux }}
          className="mt-14 flex justify-center sm:mt-16 md:mt-12 md:justify-end"
        >
          <div
            className={cn(
              "flex h-28 w-28 flex-col items-center justify-center rounded-full border border-white/12 bg-white/[0.03] text-center shadow-[0_0_0_1px_rgba(192,192,192,0.08)_inset]",
              fontBody,
            )}
            role="img"
            aria-label={isKo ? "Verified by Lumina 인장" : "Verified by Lumina seal"}
          >
            <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#C0C0C0]/75">
              Verified
            </span>
            <span className="mt-1.5 text-[11px] font-semibold tracking-[0.14em] text-white/90">LUMINA</span>
            <span className="mt-0.5 text-[8px] tracking-[0.08em] text-white/40">Evidence layer</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
