"use client"

import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const fontHeadThin =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif] font-light"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"

const GOLD = "#C5A059"
const easeLux = [0.22, 1, 0.36, 1] as const

type ArchetypeId = "authority" | "sincerity" | "artisan"

type Archetype = {
  id: ArchetypeId
  title: string
  subtitle: string
  mode: string
  exemplar: string
  generated: string
}

const ARCHETYPES: Archetype[] = [
  {
    id: "authority",
    title: "The Authority",
    subtitle: "전문가의 과학적 신뢰 · Clinical / Expert",
    mode: "Evidence-first Protocol",
    exemplar: "임상·전문성 중심 성공 패턴 (예: 더마·메디컬 계열)",
    generated:
      "임상으로 확인된 성분 배합과 검증된 흡수 메커니즘을 근거로, 고객의 의심을 데이터로 잠재웁니다. 루미나가 당신의 전문성을 명품의 신뢰 체계로 구조화합니다.",
  },
  {
    id: "sincerity",
    title: "The Sincerity",
    subtitle: "소중한 사람을 향한 진심 · Family / Gift",
    mode: "Emotional Safety Protocol",
    exemplar: "진심·가족 서사 중심 성공 패턴 (예: 선물형 스토리 브랜드)",
    generated:
      "내 가족이 쓸 수 없는 성분은 0.1%도 담지 않았습니다. 루미나가 당신의 진심을 명품의 언어로 번역합니다.",
  },
  {
    id: "artisan",
    title: "The Artisan",
    subtitle: "장인의 타협 없는 고집 · Craftmanship",
    mode: "Craft Integrity Protocol",
    exemplar: "장인정신·공정 투명성 중심 성공 패턴 (예: 핸드메이드 프리미엄)",
    generated:
      "단 하나의 공정도 타협하지 않는 기준이 고객의 신뢰를 완성합니다. 루미나는 장인의 집요함을 브랜드의 권위로 격상시킵니다.",
  },
]

export function TrustArchetypeEngine() {
  const reduceMotion = useReducedMotion()
  const [selected, setSelected] = useState<ArchetypeId>("sincerity")
  const active = useMemo(
    () => ARCHETYPES.find((a) => a.id === selected) ?? ARCHETYPES[1],
    [selected],
  )

  return (
    <section
      className="relative overflow-hidden rounded-3xl border border-white/[0.09] bg-[#0b0b0a]/90 px-5 py-8 shadow-[inset_0_1px_0_rgba(197,160,89,0.16),0_28px_90px_rgba(0,0,0,0.5)] sm:px-7 sm:py-10 md:px-9 md:py-12"
      aria-label="Trust Archetype Engine"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          background:
            "radial-gradient(120% 90% at 50% 0%, rgba(197,160,89,0.12) 0%, rgba(10,10,10,0.25) 45%, rgba(10,10,10,0.9) 100%)",
        }}
      />

      <motion.div
        className="pointer-events-none absolute right-8 top-7 h-28 w-28 rounded-full border border-[#C5A059]/35"
        initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.75 }}
        animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: [0.65, 1, 0.72], scale: [0.95, 1.02, 1] }}
        transition={{ duration: 2.8, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
        style={{
          boxShadow: "0 0 40px rgba(197,160,89,0.35), inset 0 0 24px rgba(197,160,89,0.2)",
        }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute right-[3.1rem] top-[3.1rem] h-[3.2rem] w-[3.2rem] rounded-full border border-[#d7c28e]/70"
        initial={{ opacity: 0.2, scale: 1 }}
        animate={reduceMotion ? { opacity: 0.5, scale: 1 } : { opacity: [0.25, 0.72, 0.25], scale: [0.9, 1.15, 0.95] }}
        transition={{ duration: 1.9, repeat: reduceMotion ? 0 : Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div className="relative z-[1]">
        <p className={cn("text-[10px] uppercase tracking-[0.3em] text-[#C5A059]/85", fontBody)}>
          Trust Archetype Engine
        </p>
        <h3
          className={cn(
            "mt-3 text-[1.35rem] leading-[1.6] tracking-[0.05em] text-white/92 sm:text-[1.5rem]",
            fontHeadThin,
          )}
        >
          창업자의 진심을 신뢰의 페르소나로 번역합니다.
        </h3>

        <div className="mt-6 grid gap-2.5 md:grid-cols-3">
          {ARCHETYPES.map((arch) => {
            const activeBtn = arch.id === selected
            return (
              <button
                key={arch.id}
                type="button"
                onClick={() => setSelected(arch.id)}
                className={cn(
                  "rounded-2xl border px-4 py-4 text-left transition-all duration-300",
                  activeBtn
                    ? "border-[#C5A059]/55 bg-[#C5A059]/[0.12] shadow-[0_0_24px_rgba(197,160,89,0.2)]"
                    : "border-white/[0.14] bg-white/[0.02] hover:border-[#C5A059]/35",
                )}
              >
                <p className={cn("text-xs uppercase tracking-[0.18em]", activeBtn ? "text-[#e6d2a0]" : "text-white/62", fontBody)}>
                  [{arch.title}]
                </p>
                <p className={cn("mt-2 text-[12px] leading-relaxed", activeBtn ? "text-white/90" : "text-white/52", fontBody)}>
                  {arch.subtitle}
                </p>
              </button>
            )
          })}
        </div>

        <motion.div
          key={active.id}
          initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: easeLux }}
          className="mt-7 rounded-2xl border border-white/[0.12] bg-black/30 p-5 sm:p-6"
        >
          <p className={cn("text-[10px] uppercase tracking-[0.24em] text-[#C5A059]/85", fontBody)}>
            Psychological Rebuttal Model · {active.mode}
          </p>
          <p className={cn("mt-2 text-xs text-white/45", fontBody)}>
            성공 사례 데이터 매칭: {active.exemplar}
          </p>
          <p
            className={cn(
              "mt-4 text-[14px] leading-[1.95] tracking-[0.03em] text-white/86 sm:text-[15px]",
              fontHeadThin,
            )}
          >
            {active.generated}
          </p>
        </motion.div>

        <motion.p
          className={cn("mx-auto mt-7 max-w-4xl text-center text-sm leading-[1.95] text-white/72 sm:text-[15px]", fontHeadThin)}
          initial={{ opacity: 0.4, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: easeLux }}
          style={{ color: "#e8e1cf" }}
        >
          당신이 가진 진심의 온도를 루미나가 &apos;신뢰의 권위&apos;로 격상시킵니다. 이제 고객은 의심이 아닌 확신으로 당신을 만납니다.
        </motion.p>
      </div>
    </section>
  )
}
