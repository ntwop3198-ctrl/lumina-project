"use client"

import { motion } from "framer-motion"
import type { ClinicalMetric } from "@/lib/clinical/types"

type LuxuryDataCardProps = {
  metric: ClinicalMetric
  index?: number
  /** 다크 배경 Fact Check 영역용 */
  variant?: "light" | "dark"
}

/**
 * 임상·실험 수치를 하이엔드 리포트 카드로 표현.
 */
export function LuxuryDataCard({
  metric,
  index = 0,
  variant = "dark",
}: LuxuryDataCardProps) {
  const isDark = variant === "dark"
  const n = Number(metric.value.replace(/[^0-9.-]/g, ""))
  const pulseIntensity = Number.isFinite(n) ? Math.max(0.18, Math.min(n / 100, 0.7)) : 0.28

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className={[
        "relative overflow-hidden rounded-2xl border p-6 md:p-7",
        "shadow-[0_24px_64px_rgba(0,0,0,0.28)]",
        isDark
          ? "border-rose-gold/25 bg-gradient-to-br from-white/[0.07] via-charcoal to-[#1a1816]"
          : "border-rose-gold/20 bg-white shadow-[0_20px_50px_rgba(45,42,38,0.08)]",
      ].join(" ")}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        animate={{ opacity: [0.15, 0.45 * pulseIntensity + 0.2, 0.15] }}
        transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background:
            "radial-gradient(circle at 50% 48%, rgba(201,162,39,0.3), transparent 52%)",
        }}
      />
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-40 blur-2xl"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(201,162,39,0.35) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(201,162,39,0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-rose-gold/50 to-transparent"
        aria-hidden
      />

      <p
        className={`text-[10px] md:text-[11px] tracking-[0.32em] uppercase mb-4 ${
          isDark ? "text-rose-gold/85" : "text-rose-gold"
        }`}
      >
        Clinical signal
      </p>
      <h4
        className={`font-serif text-lg md:text-xl tracking-tight mb-6 ${
          isDark ? "text-cream/95" : "text-charcoal"
        }`}
      >
        {metric.label}
      </h4>

      <motion.div
        className="flex items-baseline gap-1.5 flex-wrap"
        animate={{ scale: [1, 1 + pulseIntensity * 0.018, 1] }}
        transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
      >
        <span
          className={`font-serif text-5xl md:text-[3.25rem] leading-none tabular-nums ${
            isDark
              ? "bg-gradient-to-br from-[#f5e6c8] via-rose-gold to-[#a68b5b] bg-clip-text text-transparent"
              : "bg-gradient-to-br from-charcoal via-charcoal to-charcoal/70 bg-clip-text text-transparent"
          }`}
        >
          {metric.value}
        </span>
        <span
          className={`text-xl md:text-2xl font-medium ${
            isDark ? "text-rose-gold/90" : "text-rose-gold"
          }`}
        >
          {metric.unit}
        </span>
      </motion.div>

      {metric.footnote ? (
        <p
          className={`mt-5 text-[12px] leading-relaxed border-t pt-4 ${
            isDark ? "text-white/50 border-white/10" : "text-charcoal/50 border-charcoal/10"
          }`}
        >
          {metric.footnote}
        </p>
      ) : null}

      <div
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/25 to-transparent opacity-60"
        aria-hidden
      />
    </motion.article>
  )
}
