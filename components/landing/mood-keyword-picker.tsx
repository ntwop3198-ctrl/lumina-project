"use client"

import { cn } from "@/lib/utils"
import {
  DEFAULT_MOOD,
  MOOD_IDS,
  MOOD_KEYWORDS,
  type MoodKeyword,
} from "@/lib/mood-keywords"

type MoodKeywordPickerProps = {
  value: MoodKeyword
  onChange: (m: MoodKeyword) => void
  disabled?: boolean
  className?: string
}

/** Chic · Dreamy · Bold · Minimal — 복잡한 파라미터 대신 감성 키워드만 선택 */
export function MoodKeywordPicker({
  value,
  onChange,
  disabled,
  className,
}: MoodKeywordPickerProps) {
  return (
    <div className={cn("w-full", className)}>
      <p className="text-[10px] md:text-xs uppercase tracking-[0.28em] text-rose-gold/90 mb-3 text-center">
        브랜드 감성 · 한 가지만 고르세요
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
        {MOOD_IDS.map((id) => {
          const m = MOOD_KEYWORDS[id]
          const active = value === id
          return (
            <button
              key={id}
              type="button"
              disabled={disabled}
              onClick={() => onChange(id)}
              className={cn(
                "rounded-2xl border px-3 py-3 md:py-3.5 text-left transition-all duration-300",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-gold/40",
                active
                  ? "border-rose-gold bg-rose-gold/12 shadow-[0_10px_28px_rgba(197,168,141,0.28)]"
                  : "border-rose-gold/18 bg-cream/60 text-warm-gray hover:border-rose-gold/35 hover:bg-cream",
                disabled && "opacity-55 pointer-events-none"
              )}
            >
              <span className="block font-serif text-base md:text-lg text-charcoal tracking-tight">
                {m.labelEn}
              </span>
              <span className="block text-[11px] text-charcoal/55 mt-0.5">{m.labelKo}</span>
              <span className="block text-[10px] md:text-[11px] text-warm-gray mt-1.5 leading-snug">
                {m.hint}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { DEFAULT_MOOD, type MoodKeyword }
