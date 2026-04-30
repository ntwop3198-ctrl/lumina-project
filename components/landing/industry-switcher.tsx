"use client"

import { Sparkles, Lock } from "lucide-react"
import { cn } from "@/lib/utils"
import { listIndustryModules, type IndustryId } from "@/lib/industry"
import { useIndustry } from "@/components/providers/industry-provider"

type IndustrySwitcherProps = {
  /** 헤더 상단바용 컴팩트 모드 */
  compact?: boolean
  className?: string
}

export function IndustrySwitcher({ compact = false, className }: IndustrySwitcherProps) {
  const { industryId, setIndustryId, module } = useIndustry()
  const modules = listIndustryModules()

  return (
    <div
      className={cn("flex flex-col gap-1.5", className)}
      role="group"
      aria-label="산업 모듈 선택"
    >
      {!compact ? (
        <span className="text-[9px] font-medium uppercase tracking-[0.2em] text-white/40">
          Industry Engine
        </span>
      ) : null}
      <div
        className={cn(
          "flex rounded-lg border border-white/[0.1] bg-black/40 p-0.5 backdrop-blur-sm",
          compact ? "inline-flex max-w-full" : "w-full flex-wrap sm:w-auto",
        )}
      >
        {modules.map((m) => {
          const selected = m.id === industryId
          const locked = m.activation === "coming_soon"
          const selectable = !locked

          return (
            <button
              key={m.id}
              type="button"
              disabled={locked}
              title={
                locked
                  ? `${m.label} — 준비 중`
                  : `${m.label}${selected ? " (선택됨)" : ""}`
              }
              onClick={() => {
                if (selectable) setIndustryId(m.id as IndustryId)
              }}
              className={cn(
                "relative flex min-h-[30px] items-center justify-center gap-1 rounded-md px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors",
                compact ? "shrink-0" : "flex-1 sm:flex-none",
                selected && !locked
                  ? "bg-gold/20 text-gold shadow-[inset_0_0_0_1px_rgba(212,175,55,0.35)]"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white/80",
                locked && "cursor-not-allowed opacity-45 hover:bg-transparent hover:text-white/55",
              )}
            >
              {m.id === "cosmetic" && !locked ? (
                <Sparkles className="h-3 w-3 text-gold/80" strokeWidth={2} aria-hidden />
              ) : null}
              {locked ? <Lock className="h-3 w-3 text-white/35" strokeWidth={2} aria-hidden /> : null}
              <span className="whitespace-nowrap">{m.shortLabel}</span>
            </button>
          )
        })}
      </div>
      {!compact ? (
        <p className="max-w-[14rem] text-[9px] leading-snug text-white/38">
          코어 엔진은 동일 ·{" "}
          <span className="text-gold/70">{module.tone.label}</span> 톤 적용
        </p>
      ) : null}
    </div>
  )
}
