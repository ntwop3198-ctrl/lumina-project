"use client"

import { motion } from "framer-motion"
import type { RiskReport } from "@/core/compliance/risk-analyzer"
import { EMOTIONAL_IMPACT_TARGET } from "@/lib/lumina/emotional-impact-meter"

type CompliancePanelProps = {
  sectionTitle: string
  report: RiskReport
  /** 휴리스틱 감성 임팩트 (120 ≈ 목표 ‘120%’) */
  emotionalImpact?: number
  emotionalTargetMet?: boolean
  alchemicalPasses?: number
}

export function CompliancePanel({
  sectionTitle,
  report,
  emotionalImpact,
  emotionalTargetMet,
  alchemicalPasses,
}: CompliancePanelProps) {
  const safe = report.safetyScore >= 100 || report.residualHits.length === 0
  const safety = report.safetyScore

  const borderClass = safe
    ? "border-emerald-500/55"
    : safety >= 72
      ? "border-amber-400/75"
      : "border-red-500/70"

  const safetyLabel =
    safe || safety >= 100
      ? "법적 안전성 100"
      : `법적 안전성 ${Math.round(safety)} / 100`

  return (
    <motion.article
      layout
      className={`rounded-2xl border ${borderClass} bg-black/70 text-cream px-4 py-3 space-y-2`}
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-sm font-medium">{sectionTitle}</h3>
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${
              safe
                ? "bg-emerald-500/25 text-emerald-100"
                : safety >= 72
                  ? "bg-amber-400/20 text-amber-100"
                  : "bg-red-500/20 text-red-100"
            }`}
          >
            {safetyLabel}
          </span>
          {(alchemicalPasses ?? report.rewriteIterations) > 0 ? (
            <span className="text-[10px] text-white/45 tabular-nums">
              {alchemicalPasses != null ? "연금술·가드 루프" : "자동 은유 치환"}{" "}
              {alchemicalPasses ?? report.rewriteIterations}회
            </span>
          ) : null}
          {typeof emotionalImpact === "number" ? (
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full tabular-nums ${
                emotionalTargetMet
                  ? "bg-fuchsia-500/20 text-fuchsia-100"
                  : "bg-white/10 text-white/60"
              }`}
            >
              Emotional Impact {emotionalImpact}
              {emotionalTargetMet ? " ✓" : ` / ${EMOTIONAL_IMPACT_TARGET}`}
            </span>
          ) : null}
        </div>
      </header>

      <p className="text-[10px] text-white/50 leading-relaxed">
        식약처·과대광고 가드레일과 동기화된 God-Class 치환 파이프라인입니다. 100점 미만이면 잔여 패턴을 표시하고,
        가능한 한 즉시 대체 은유로 재작성합니다.
      </p>

      {report.hits.length > 0 && (
        <ul className="space-y-1 text-[11px] text-rose-100/90">
          {report.hits.map((hit, idx) => (
            <li key={`${hit.ruleId}-${idx}`}>
              <span className="font-semibold">“{hit.phrase}”</span> – {hit.reason}
            </li>
          ))}
        </ul>
      )}

      {report.residualHits.length > 0 && (
        <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 px-2 py-2">
          <p className="text-[10px] font-medium text-amber-100/90 mb-1">잔여 검토 권장</p>
          <ul className="space-y-0.5 text-[10px] text-amber-50/85">
            {report.residualHits.map((hit, idx) => (
              <li key={`res-${hit.ruleId}-${idx}`}>
                “{hit.phrase}” → {hit.reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {report.original !== report.safeText && (
        <div className="mt-2 border-t border-white/10 pt-2">
          <p className="text-[11px] text-slate-300 mb-1">루미나 자동 정제 카피 (100점 목표)</p>
          <p className="text-[11px] text-slate-100 leading-relaxed whitespace-pre-line max-h-48 overflow-y-auto">
            {report.safeText.slice(0, 4000)}
            {report.safeText.length > 4000 ? "…" : ""}
          </p>
        </div>
      )}
    </motion.article>
  )
}
