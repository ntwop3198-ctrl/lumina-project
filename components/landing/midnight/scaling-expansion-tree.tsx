"use client"

import { ChevronDown } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useCallback, useId, useState } from "react"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  SCALING_AXIS_SYSTEM_LABEL_EN,
  SCALING_AXIS_SYSTEM_LABEL_KO,
  SCALING_AXIS_VALUE_LABEL_EN,
  SCALING_AXIS_VALUE_LABEL_KO,
  SCALING_EXPANSION_ENGINES,
  SCALING_EXPANSION_SECTION_LEAD_EN,
  SCALING_EXPANSION_SECTION_LEAD_KO,
  SCALING_EXPANSION_SECTION_TITLE_EN,
  SCALING_EXPANSION_SECTION_TITLE_KO,
} from "@/lib/lumina/lumina-scaling-expansion-engines-copy"
import { cn } from "@/lib/utils"

const fontSerifKo =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontSerifEn = "font-['Playfair_Display',Georgia,var(--font-serif),serif]"
const fontSans = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

export function ScalingExpansionTree() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()
  const uid = useId().replace(/:/g, "")
  const [open, setOpen] = useState<Record<string, boolean>>({})

  const toggle = useCallback((id: string) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  return (
    <section
      id="scaling-expansion-engines"
      aria-labelledby={`${uid}-scaling-engines-title`}
      className="mt-16 scroll-mt-28 border-t border-white/[0.08] pt-14 sm:mt-20 sm:pt-16"
    >
      <div className="mb-10 max-w-2xl">
        <h2
          id={`${uid}-scaling-engines-title`}
          className={cn(
            "text-[1.15rem] font-semibold tracking-[0.02em] text-[#eef2f8] sm:text-[1.25rem]",
            isKo ? fontSerifKo : fontSerifEn,
          )}
        >
          {isKo ? SCALING_EXPANSION_SECTION_TITLE_KO : SCALING_EXPANSION_SECTION_TITLE_EN}
        </h2>
        <p className={cn("mt-3 text-[0.875rem] leading-[1.75] text-[#9eb0c4]", fontSans)}>
          {isKo ? SCALING_EXPANSION_SECTION_LEAD_KO : SCALING_EXPANSION_SECTION_LEAD_EN}
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        {SCALING_EXPANSION_ENGINES.map((axis, index) => {
          const isOpen = !!open[axis.id]
          const systemLabel = isKo ? SCALING_AXIS_SYSTEM_LABEL_KO : SCALING_AXIS_SYSTEM_LABEL_EN
          const valueLabel = isKo ? SCALING_AXIS_VALUE_LABEL_KO : SCALING_AXIS_VALUE_LABEL_EN

          return (
            <li key={axis.id} className="list-none">
              <div
                className={cn(
                  "overflow-hidden border border-white/[0.1] bg-[#0a1422]/65 backdrop-blur-[6px]",
                  "transition-[border-color,box-shadow] duration-300",
                  isOpen && "border-[#c9a227]/28 shadow-[0_0_36px_rgba(212,175,55,0.06)]",
                )}
              >
                <button
                  type="button"
                  onClick={() => toggle(axis.id)}
                  aria-expanded={isOpen}
                  aria-controls={`${uid}-scaling-panel-${axis.id}`}
                  id={`${uid}-scaling-btn-${axis.id}`}
                  className={cn(
                    "flex w-full items-start justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-white/[0.03] sm:px-5 sm:py-4",
                    fontSans,
                  )}
                >
                  <span className="min-w-0 flex-1">
                    <span className="mr-2 font-mono text-[10px] text-[#6b7d94]">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-[0.95rem] font-semibold text-[#f0f4fa] sm:text-[1rem]",
                        isKo ? fontSerifKo : fontSerifEn,
                      )}
                    >
                      {isKo ? axis.engineKo : axis.engineEn}
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 text-[#8fa6be] transition-transform duration-300",
                      isOpen && "rotate-180 text-[#d4af37]/90",
                    )}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={`${uid}-scaling-panel-${axis.id}`}
                      role="region"
                      aria-labelledby={`${uid}-scaling-btn-${axis.id}`}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: reduceMotion ? 0 : 0.32, ease: easeLux }}
                      className="border-t border-white/[0.06]"
                    >
                      <div className="space-y-0 px-4 pb-4 pt-1 sm:px-5">
                        <div className="relative border-l-2 border-[#c9a227]/45 py-2 pl-4">
                          <p
                            className={cn(
                              "mb-1.5 text-[9px] uppercase tracking-[0.28em] text-[#a8b8cc]/90",
                              fontSans,
                            )}
                          >
                            {systemLabel}
                          </p>
                          <p className={cn("text-[0.8125rem] leading-[1.78] text-[#dce4ee] sm:text-[0.875rem]", fontSans)}>
                            {isKo ? axis.systemKo : axis.systemEn}
                          </p>
                        </div>

                        <div className="mt-3 rounded-sm border border-[#d4af37]/15 bg-[rgba(212,175,55,0.04)] px-3 py-3 sm:px-4">
                          <p
                            className={cn(
                              "mb-1.5 text-[9px] uppercase tracking-[0.28em] text-[#c4ab6a]/95",
                              fontSans,
                            )}
                          >
                            {valueLabel}
                          </p>
                          <p className={cn("text-[0.8125rem] leading-[1.78] text-[#b8c4d4] sm:text-[0.875rem]", fontSans)}>
                            {isKo ? axis.valueKo : axis.valueEn}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
