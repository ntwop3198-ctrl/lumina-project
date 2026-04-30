"use client"

import type { CSSProperties } from "react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { CosmeticPrmShowcase } from "@/components/landing/cosmetic-prm-showcase"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  AGENT_MIST_THEMES,
  SPECIALIZED_AGENTS,
  type SpecializedAgentId,
} from "@/lib/specialized-agents"

const fontHead =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif] font-light"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

const summaries: Record<SpecializedAgentId, string> = {
  cosmetic: "심리적 반박 대응(PRM)과 임상 신뢰 스토리로 가격 저항을 확신으로 전환합니다.",
  fashion: "룩·실루엣·시즌 리듬을 하나의 서사로 엮어 감도 높은 구매 동기를 만듭니다.",
  tech: "기능 설명을 사용 시나리오 중심으로 재구성해 신뢰 가능한 혁신 이미지를 완성합니다.",
  fnb: "맛과 향의 감각 언어를 브랜드 체험으로 변환해 재방문 욕구를 강화합니다.",
  personal: "창업자의 철학을 권위 있는 톤으로 정교화해 사람 자체가 브랜드가 되게 만듭니다.",
  custom: "업종 간 문법을 교차 학습해 어떤 비즈니스든 맞춤형 명품 서사로 압축합니다.",
}

const summariesEn: Record<SpecializedAgentId, string> = {
  cosmetic:
    "PRM-driven objection handling and clinical trust narrative convert price resistance into conviction.",
  fashion:
    "Silhouette, season rhythm, and editorial tone merge into one high-conversion luxury storyline.",
  tech:
    "Complex capabilities are reframed into trusted use-case narratives for premium innovation.",
  fnb: "Taste, aroma, and sensory language are translated into memorable brand experiences.",
  personal:
    "Founder philosophy is elevated into authority-driven language so the person becomes the brand.",
  custom:
    "Cross-industry brand grammar is fused into a tailored luxury narrative for any business.",
}

export function AgentDynamicSection() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const [activeId, setActiveId] = useState<SpecializedAgentId>("cosmetic")
  const active = SPECIALIZED_AGENTS.find((a) => a.id === activeId) ?? SPECIALIZED_AGENTS[0]
  const mist = AGENT_MIST_THEMES[activeId]

  return (
    <section
      id="agent-dynamic"
      className="relative min-h-screen bg-[#0A0A0A] px-6 pb-24 pt-32 sm:px-10 md:px-14 md:pb-28 md:pt-36"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="sticky top-20 z-30 rounded-2xl border border-white/[0.1] bg-black/55 p-3 backdrop-blur-xl">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-6">
            {SPECIALIZED_AGENTS.map((agent) => {
              const isActive = agent.id === activeId
              return (
                <button
                  key={agent.id}
                  type="button"
                  onClick={() => setActiveId(agent.id)}
                  className={cn(
                    "rounded-xl border px-3 py-3 text-left transition-all duration-300",
                    "bg-white/[0.02] border-white/[0.12]",
                    isActive &&
                      "border-[color:var(--agent-accent)] bg-[color:var(--agent-accent-soft)] shadow-[0_0_24px_var(--agent-glow)]",
                  )}
                  style={
                    {
                      ["--agent-accent" as string]: mist.accent,
                      ["--agent-glow" as string]: `${mist.accent}66`,
                      ["--agent-accent-soft" as string]: `${mist.accent}20`,
                    } as CSSProperties
                  }
                >
                  <p className={cn("text-[10px] uppercase tracking-[0.14em]", fontBody)}>
                    {isKo ? agent.nameKo : agent.name}
                  </p>
                  <p className={cn("mt-1 text-[11px] text-white/58", fontBody)}>
                    {isKo ? agent.name : agent.focus}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
              transition={{ duration: 0.38, ease: easeLux }}
              className="rounded-3xl border border-white/[0.1] bg-white/[0.02] p-8 sm:p-10 md:p-14"
            >
              <p className={cn("text-[11px] uppercase tracking-[0.32em] text-white/35", fontBody)}>
                {isKo ? "한 화면 · 하나의 메시지" : "One Screen · One Message"}
              </p>
              <h2 className={cn("mt-6 text-2xl leading-[1.65] text-white/92 sm:text-3xl", fontHead)}>
                {isKo ? active.roadmapTitle : active.name}
              </h2>
              <p className={cn("mt-10 max-w-3xl text-[15px] leading-[2] text-white/62", fontBody)}>
                {isKo ? summaries[activeId] : summariesEn[activeId]}
              </p>

              {activeId === "cosmetic" ? (
                <div className="mt-16">
                  <CosmeticPrmShowcase />
                </div>
              ) : (
                <div className="mt-16 grid gap-8 md:grid-cols-2">
                  {active.roadmapLines.map((line, idx) => (
                    <div
                      key={`${line}-${idx}`}
                      className="rounded-2xl border border-white/[0.1] bg-black/35 p-7 text-white/60"
                    >
                      <p className={cn("text-[14px] leading-[1.9]", fontBody)}>
                        {isKo ? line : active.roadmapLines[Math.min(idx, active.roadmapLines.length - 1)]}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

