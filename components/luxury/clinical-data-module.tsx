"use client"

import { useMemo } from "react"
import { Plus, Trash2 } from "lucide-react"
import {
  type ClinicalMetric,
  createId,
  DEFAULT_CLINICAL_METRICS,
} from "@/lib/clinical/types"
import { LuxuryDataCard } from "@/components/luxury/luxury-data-card"
import { Button } from "@/components/ui/button"

type ClinicalDataModuleProps = {
  metrics: ClinicalMetric[]
  onChange: (next: ClinicalMetric[]) => void
  /** Fact Check 다크 존에서 카드 미리보기 */
  previewVariant?: "light" | "dark"
  className?: string
}

function emptyMetric(): ClinicalMetric {
  return {
    id: createId(),
    label: "지표 이름",
    value: "0",
    unit: "%",
    footnote: "",
  }
}

/**
 * 임상 수치 입력 → Luxury Data Card 그리드로 즉시 반영.
 */
export function ClinicalDataModule({
  metrics,
  onChange,
  previewVariant = "dark",
  className = "",
}: ClinicalDataModuleProps) {
  const safeMetrics = useMemo(
    () => (metrics.length > 0 ? metrics : DEFAULT_CLINICAL_METRICS),
    [metrics]
  )

  function patch(id: string, patch: Partial<ClinicalMetric>) {
    onChange(
      safeMetrics.map((m) => (m.id === id ? { ...m, ...patch } : m))
    )
  }

  function addRow() {
    onChange([...safeMetrics, emptyMetric()])
  }

  function removeRow(id: string) {
    if (safeMetrics.length <= 1) return
    onChange(safeMetrics.filter((m) => m.id !== id))
  }

  return (
    <div className={className}>
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
          <p className="text-[10px] tracking-[0.28em] uppercase text-rose-gold/80">
            입력
          </p>
          <p className="text-sm text-white/65 leading-relaxed">
            흡수도·탄력·수분 등 수치를 넣으면 아래 카드가 즉시 갱신됩니다.
          </p>
          <div className="space-y-3 max-h-[min(52vh,420px)] overflow-y-auto pr-1">
            {safeMetrics.map((m) => (
              <div
                key={m.id}
                className="rounded-xl border border-white/10 bg-charcoal/40 p-3 grid gap-2 sm:grid-cols-2"
              >
                <label className="block sm:col-span-2">
                  <span className="text-[10px] uppercase tracking-wider text-white/45">
                    지표명
                  </span>
                  <input
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-cream placeholder:text-white/30 focus:border-rose-gold/40 focus:outline-none focus:ring-1 focus:ring-rose-gold/30"
                    value={m.label}
                    onChange={(e) => patch(m.id, { label: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-wider text-white/45">
                    수치
                  </span>
                  <input
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-cream tabular-nums placeholder:text-white/30 focus:border-rose-gold/40 focus:outline-none focus:ring-1 focus:ring-rose-gold/30"
                    value={m.value}
                    onChange={(e) => patch(m.id, { value: e.target.value })}
                  />
                </label>
                <label className="block">
                  <span className="text-[10px] uppercase tracking-wider text-white/45">
                    단위
                  </span>
                  <input
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-cream placeholder:text-white/30 focus:border-rose-gold/40 focus:outline-none focus:ring-1 focus:ring-rose-gold/30"
                    value={m.unit}
                    onChange={(e) => patch(m.id, { unit: e.target.value })}
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[10px] uppercase tracking-wider text-white/45">
                    부가 설명 (기간·대조 등)
                  </span>
                  <input
                    className="mt-1 w-full rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-sm text-cream/90 placeholder:text-white/30 focus:border-rose-gold/40 focus:outline-none focus:ring-1 focus:ring-rose-gold/30"
                    value={m.footnote ?? ""}
                    onChange={(e) =>
                      patch(m.id, { footnote: e.target.value || undefined })
                    }
                    placeholder="예: 4주 사용 후, 플라세보 대비"
                  />
                </label>
                <div className="sm:col-span-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeRow(m.id)}
                    className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1 text-[11px] text-white/55 hover:border-rose-gold/30 hover:text-white"
                    aria-label="행 삭제"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            className="w-full border-white/15 bg-white/5 text-cream hover:bg-white/10 hover:text-cream"
            onClick={addRow}
          >
            <Plus className="h-4 w-4 mr-2" />
            지표 추가
          </Button>
        </div>

        <div>
          <p className="text-[10px] tracking-[0.28em] uppercase text-rose-gold/80 mb-4">
            Luxury Data Card
          </p>
          <div className="grid gap-4 sm:grid-cols-1">
            {safeMetrics.map((m, i) => (
              <LuxuryDataCard
                key={m.id}
                metric={m}
                index={i}
                variant={previewVariant}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
