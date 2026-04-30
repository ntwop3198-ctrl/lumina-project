"use client"

import { motion } from "framer-motion"
import type { ROIFeedbackIssue, ROIPrediction } from "@/lib/roi/types"

const AXIS_LABEL: Record<ROIFeedbackIssue["axis"], string> = {
  visual: "비주얼",
  copy: "카피",
  trust: "신뢰 데이터",
  bridge: "브릿지",
}

export function ROIFeedbackPanel({
  prediction,
}: {
  prediction: ROIPrediction
}) {
  const { score, breakdown, issues } = prediction

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mt-10 rounded-3xl border border-rose-gold/15 bg-white/[0.02] p-5 md:p-7 overflow-hidden"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <p className="text-[10px] tracking-[0.32em] uppercase text-rose-gold/85 mb-2">
            ROI Predictor · 예상 전환
          </p>
          <div className="flex items-end gap-3">
            <div className="font-serif text-5xl md:text-6xl text-charcoal/95 tabular-nums">
              {score}
            </div>
            <div className="pb-2 text-sm text-charcoal/55">
              / 100 점
              <div className="text-[10px] mt-1 tracking-[0.18em] text-charcoal/45 uppercase">
                Conversion Confidence
              </div>
            </div>
          </div>
        </div>

        <div className="w-full md:max-w-md space-y-3">
          <Bar
            label="Visual"
            value={breakdown.visual}
            hint="빛·대비·시선 유도"
          />
          <Bar label="Copy" value={breakdown.copy} hint="리듬·구조·절제" />
          <Bar label="Trust" value={breakdown.trust} hint="임상·인증 밀도" />
          <Bar label="Bridge" value={breakdown.bridge} hint="감성-이성 접착" />
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-rose-gold/10">
        <p className="text-xs text-charcoal/60 mb-4">
          Critical Point Feedback
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {issues.slice(0, 4).map((issue) => (
            <div
              key={issue.id}
              className={[
                "rounded-2xl border p-4",
                issue.severity === "high"
                  ? "border-rose-gold/30 bg-rose-gold/10"
                  : issue.severity === "medium"
                    ? "border-rose-gold/20 bg-white/[0.03]"
                    : "border-white/10 bg-white/[0.02]",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-3 mb-2">
                <p className="text-sm font-medium text-charcoal/90">
                  {issue.title}
                </p>
                <span className="text-[10px] uppercase tracking-[0.18em] text-rose-gold/80">
                  {issue.severity}
                </span>
              </div>
              <p className="text-sm text-charcoal/60 leading-relaxed">
                {issue.message}
              </p>
              <div className="mt-3 text-[11px] text-charcoal/45">
                Axis: {AXIS_LABEL[issue.axis]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

function Bar({
  label,
  value,
  hint,
}: {
  label: string
  value: number
  hint: string
}) {
  const pct = Math.round(value * 100)
  return (
    <div>
      <div className="flex justify-between text-xs text-charcoal/55 mb-1">
        <span className="font-medium">{label}</span>
        <span className="tabular-nums text-charcoal/70">{pct}</span>
      </div>
      <div className="h-2 bg-charcoal/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="h-full bg-gradient-to-r from-rose-gold/70 to-rose-gold/15"
        />
      </div>
      <div className="text-[11px] mt-1 text-charcoal/45">{hint}</div>
    </div>
  )
}

