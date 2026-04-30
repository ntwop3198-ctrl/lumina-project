"use client"

import type { CSSProperties } from "react"
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CosmeticPrmShowcase } from "@/components/landing/cosmetic-prm-showcase"
import { CosmeticSpecializedTech } from "@/components/landing/cosmetic-specialized-tech"
import {
  AGENT_MIST_THEMES,
  SPECIALIZED_AGENTS,
  type SpecializedAgentId,
} from "@/lib/specialized-agents"

const easeLux = [0.22, 1, 0.36, 1] as const

const fontHeadThin =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif] font-light"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"

type SpecializedAiAgentsProps = {
  activeId: SpecializedAgentId
  onAgentChange: (id: SpecializedAgentId) => void
  className?: string
}

export function SpecializedAiAgents({
  activeId,
  onAgentChange,
  className,
}: SpecializedAiAgentsProps) {
  const reduceMotion = useReducedMotion()
  const active = SPECIALIZED_AGENTS.find((a) => a.id === activeId) ?? SPECIALIZED_AGENTS[0]
  const theme = AGENT_MIST_THEMES[activeId]

  return (
    <LayoutGroup>
      <div className={cn("relative w-full", className)}>
        <p
          className={cn(
            "mb-4 text-[10px] font-medium uppercase tracking-[0.28em] text-white/38 sm:mb-5",
            fontBody,
          )}
        >
          6 Specialized AI Agents
        </p>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:grid-cols-3 lg:grid-cols-6">
          {SPECIALIZED_AGENTS.map((agent) => {
            const isActive = agent.id === activeId
            const mist = AGENT_MIST_THEMES[agent.id]
            return (
              <motion.button
                key={agent.id}
                type="button"
                layout
                onClick={() => onAgentChange(agent.id)}
                className={cn(
                  "group relative flex min-h-[5.5rem] flex-col items-stretch overflow-hidden rounded-2xl border px-2.5 py-3 text-left transition-[box-shadow,border-color] duration-500 sm:min-h-[5.75rem] sm:px-3 sm:py-3.5",
                  "border-white/[0.14] bg-white/[0.035] backdrop-blur-xl",
                  "hover:border-white/25",
                  isActive &&
                    "border-[color:var(--agent-accent)] shadow-[0_0_32px_var(--agent-glow),0_0_0_1px_var(--agent-accent-soft)_inset]",
                )}
                style={
                  {
                    ["--agent-accent"]: mist.accent,
                    ["--agent-glow"]: `${mist.accent}55`,
                    ["--agent-accent-soft"]: `${mist.accent}44`,
                  } as CSSProperties
                }
                whileHover={reduceMotion ? {} : { scale: 1.01 }}
                whileTap={reduceMotion ? {} : { scale: 0.99 }}
              >
                {isActive ? (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.28, ease: easeLux }}
                    className={cn(
                      "absolute -top-5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#C5A059]/35 bg-black/65 px-3 py-1 text-[10px] tracking-[0.12em] text-[#d8c49a]",
                      fontHeadThin,
                    )}
                  >
                    감성과 이성의 완벽한 조화
                  </motion.span>
                ) : null}
                {/* Hover: 액센트 안개가 아래에서 차오름 */}
                <div
                  className="pointer-events-none absolute bottom-0 left-0 right-0 h-0 opacity-0 transition-all duration-500 ease-out group-hover:h-[82%] group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(to top, transparent 0%, ${mist.accent}45 100%)`,
                  }}
                  aria-hidden
                />

                <span
                  className={cn(
                    "relative z-[1] text-[9px] font-semibold uppercase tracking-[0.14em] text-white/55 sm:text-[10px]",
                    fontBody,
                  )}
                >
                  {agent.nameKo}
                </span>
                <span
                  className={cn(
                    "relative z-[1] mt-1 flex-1 line-clamp-2 text-[10px] leading-snug text-white/42 sm:text-[11px]",
                    fontBody,
                  )}
                >
                  {agent.focus}
                </span>

                <div className="relative z-[1] mt-auto min-h-[1.15rem] pt-2">
                  {isActive ? (
                    <motion.span
                      initial={{ opacity: 0, y: 3 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.28, ease: easeLux }}
                      className={cn(
                        "block text-[7px] font-medium uppercase tracking-[0.2em] text-white/35 sm:text-[8px]",
                        fontBody,
                      )}
                    >
                      AI Agent Activated
                    </motion.span>
                  ) : null}
                </div>
              </motion.button>
            )
          })}
        </div>

        <motion.div
          layout
          className="relative mt-8 overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5 backdrop-blur-xl sm:p-6 md:mt-10 md:p-8"
          transition={{ layout: { duration: 0.45, ease: easeLux } }}
        >
          <motion.div
            className="pointer-events-none absolute -right-16 top-0 h-48 w-48 rounded-full opacity-40 blur-3xl"
            animate={{ background: `radial-gradient(circle, ${theme.accent}35 0%, transparent 70%)` }}
            transition={{ duration: 0.6 }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              role="region"
              aria-live="polite"
              aria-label={`${active.name} 로드맵`}
              initial={
                reduceMotion
                  ? { opacity: 1, y: 0, filter: "blur(0px)" }
                  : { opacity: 0, y: 14, filter: "blur(10px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10, filter: "blur(8px)" }}
              transition={{ duration: 0.4, ease: easeLux }}
              className="relative z-[1] text-left"
            >
              <p
                className={cn(
                  "mb-2 text-[10px] font-medium uppercase tracking-[0.22em] text-white/40",
                  fontBody,
                )}
              >
                Agent roadmap · {active.name}
              </p>
              <h3
                className={cn(
                  "mb-4 text-base tracking-[0.04em] text-white/92 sm:text-lg md:text-xl",
                  fontHeadThin,
                )}
                style={{ lineHeight: 1.65 }}
              >
                {active.roadmapTitle}
              </h3>
              <ul className="space-y-3">
                {active.roadmapLines.map((line) => (
                  <li
                    key={line}
                    className={cn(
                      "border-l border-white/[0.12] pl-4 text-[13px] leading-relaxed text-white/52 sm:text-sm",
                      fontBody,
                    )}
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {activeId === "cosmetic" ? (
            <motion.div
              key="cosmetic-specialized-tech"
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.4, ease: easeLux }}
              className="relative mt-8 md:mt-10"
            >
              <CosmeticPrmShowcase />
              <CosmeticSpecializedTech />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  )
}
