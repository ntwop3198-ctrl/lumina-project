"use client"

import { motion, useReducedMotion } from "framer-motion"
import { CheckCircle2, Droplets, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const easeLux = [0.22, 1, 0.36, 1] as const

const fontMyeongjo =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"

/** 24시간 보습 유지 추세 — 정규화된 Y (0–100) */
const MOISTURE_SERIES = [
  42, 48, 55, 62, 68, 74, 79, 83, 86, 88, 90, 91, 92, 93, 94, 94.5, 95, 95.2, 95.4, 95.5, 95.6, 95.7, 95.8, 96,
]

function buildLinePath(width: number, height: number, values: number[], pad = 8) {
  const n = values.length
  const xStep = (width - pad * 2) / (n - 1)
  const toY = (v: number) => height - pad - ((v - 40) / 60) * (height - pad * 2)
  let d = `M ${pad} ${toY(values[0])}`
  for (let i = 1; i < n; i++) {
    const x = pad + i * xStep
    const y = toY(values[i])
    d += ` L ${x} ${y}`
  }
  return d
}

function AnimatedLineChart() {
  const reduceMotion = useReducedMotion()
  const w = 400
  const h = 140
  const pathD = buildLinePath(w, h, MOISTURE_SERIES)

  return (
    <div className="lumina-glass-frost relative overflow-hidden rounded-2xl border border-white/[0.08] p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#C0C0C0]/75">
          24시간 보습 곡선
        </span>
        <span className="font-mono text-[11px] text-white/45">0h — 24h</span>
      </div>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full max-h-[160px]"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <linearGradient id="clinical-line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(192,192,192,0.18)" />
            <stop offset="45%" stopColor="#C0C0C0" />
            <stop offset="100%" stopColor="rgba(248,250,252,0.92)" />
          </linearGradient>
          <filter id="clinical-mist-trail" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
            </feMerge>
          </filter>
          <filter id="clinical-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.25" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1={8}
            y1={28 + i * 28}
            x2={w - 8}
            y2={28 + i * 28}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.75"
          />
        ))}
        <motion.path
          d={pathD}
          fill="none"
          stroke="rgba(192,192,192,0.35)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.14}
          filter="url(#clinical-mist-trail)"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduceMotion ? 0 : 2.4, ease: easeLux }}
        />
        <motion.path
          d={pathD}
          fill="none"
          stroke="url(#clinical-line-grad)"
          strokeWidth="1.05"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#clinical-glow)"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduceMotion ? 0 : 2.4, ease: easeLux }}
        />
        <motion.circle
          cx={w - 8}
          cy={
            h -
            8 -
            ((MOISTURE_SERIES[MOISTURE_SERIES.length - 1] - 40) / 60) * (h - 16)
          }
          r="5"
          fill="#C0C0C0"
          stroke="rgba(0,0,0,0.35)"
          strokeWidth="1"
          initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: reduceMotion ? 0 : 2.1, duration: 0.45, ease: easeLux }}
          style={{ filter: "drop-shadow(0 0 6px rgba(192,192,192,0.65))" }}
        />
      </svg>
      <p className="mt-3 text-left text-[11px] tracking-wide text-white/45">
        시간이 지날수록 유지되는 수분 밀도 — 실험실 기준 시뮬레이션
      </p>
    </div>
  )
}

function RadialGauge({ value, label }: { value: number; label: string }) {
  const reduceMotion = useReducedMotion()
  const size = 200
  const stroke = 8
  const r = (size - stroke) / 2 - 4
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - value / 100)

  return (
    <div className="lumina-glass-frost flex flex-col items-start justify-center rounded-2xl border border-white/[0.08] p-6 md:p-8">
      <span className="mb-5 text-left text-[10px] font-medium uppercase tracking-[0.22em] text-[#C0C0C0]/75">
        {label}
      </span>
      <div className="relative self-center md:self-start" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute inset-0"
          aria-hidden
        >
          <defs>
            <linearGradient id="gauge-silver" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#5c6670" />
              <stop offset="50%" stopColor="#C0C0C0" />
              <stop offset="100%" stopColor="#e8eef5" />
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
            stroke="url(#gauge-silver)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={reduceMotion ? { strokeDashoffset: offset } : { strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: reduceMotion ? 0 : 2, ease: easeLux }}
            transform={`rotate(-90 ${cx} ${cy})`}
            style={{ filter: "drop-shadow(0 0 5px rgba(192,192,192,0.35))" }}
          />
        </svg>
        <motion.div
          className={cn(
            fontMyeongjo,
            "absolute inset-0 flex flex-col items-center justify-center text-4xl font-bold tabular-nums text-white md:text-5xl",
          )}
          initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6, ease: easeLux }}
        >
          <span>
            {value}
            <span className="text-2xl text-[#C0C0C0]/90 md:text-3xl">%</span>
          </span>
        </motion.div>
      </div>
      <p className="mt-6 max-w-[14rem] text-left text-[11px] leading-relaxed text-white/50">
        피부 장벽 개선 지표 — 패널 평균
      </p>
    </div>
  )
}

const DATA_CARDS = [
  {
    icon: Shield,
    title: "피부 장벽 개선율",
    stat: "98%",
    sub: "임상 패널 · 4주 적용 후",
    accent: "border-white/10",
  },
  {
    icon: Droplets,
    title: "24시간 보습 유지력",
    stat: "상위 구간",
    sub: "코르네오미터 기준 유지 곡선",
    accent: "border-white/[0.1]",
  },
  {
    icon: CheckCircle2,
    title: "저자극 테스트",
    stat: "완료",
    sub: "피부 자극 패널 · 무자극 판정",
    accent: "border-white/[0.1]",
  },
] as const

export function BrandGenesisClinicalProof() {
  return (
    <section
      className="relative border-t border-white/[0.06] bg-[#112240] py-20 md:py-28"
      aria-labelledby="clinical-proof-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_55%_at_15%_0%,rgba(255,255,255,0.06),transparent_50%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-6 md:px-12 lg:px-16 xl:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px", amount: 0.2 }}
          transition={{ duration: 0.8, ease: easeLux }}
          className="mb-12 max-w-[min(42rem,70vw)] text-left md:mb-16"
        >
          <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-[#C0C0C0]/65">
            Lumina Clinical Proof
          </p>
          <h2
            id="clinical-proof-heading"
            className={cn(
              fontMyeongjo,
              "text-2xl font-light leading-snug tracking-[0.12em] text-white/95 md:text-3xl lg:text-[2rem]",
            )}
            style={{ lineHeight: 1.65 }}
          >
            데이터로 증명된 본질의 힘
          </h2>
        </motion.div>

        <div className="mb-14 grid gap-4 sm:grid-cols-3">
          {DATA_CARDS.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-5% 0px" }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: easeLux }}
                className={cn(
                  "lumina-glass-frost rounded-2xl border p-5 text-left md:p-6",
                  card.accent,
                )}
              >
                <Icon className="mb-4 h-5 w-5 text-[#C0C0C0]/85" strokeWidth={1.5} aria-hidden />
                <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                  {card.title}
                </p>
                <p className={cn(fontMyeongjo, "mb-2 text-2xl font-bold tracking-wide text-white md:text-[1.65rem]")}>
                  {card.stat}
                </p>
                <p className="text-xs leading-relaxed text-white/45">{card.sub}</p>
              </motion.div>
            )
          })}
        </div>

        <div className="grid items-stretch gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ delay: 0.15, duration: 0.75, ease: easeLux }}
          >
            <AnimatedLineChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-6% 0px" }}
            transition={{ delay: 0.25, duration: 0.75, ease: easeLux }}
          >
            <RadialGauge value={98} label="장벽 회복 지수" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className={cn(
            fontMyeongjo,
            "mt-14 max-w-[min(42rem,70vw)] text-left text-sm font-normal leading-[2.05] tracking-[0.06em] text-white/55 md:text-base",
          )}
        >
          감성은 약속이지만, 수치는 증명입니다. 루미나 OS는 단 1%의 오차도 허용하지 않는 정밀한 데이터를
          기반으로 당신의 신뢰를 구축합니다.
        </motion.p>
      </div>
    </section>
  )
}
