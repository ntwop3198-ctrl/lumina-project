"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"

const fontHead = "font-['Nanum_Myeongjo',var(--font-serif),serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

type RoadmapStep = {
  phase: string
  titleKo: string
  titleEn: string
  descKo: string
  descEn: string
  href: string
  ctaKo: string
  ctaEn: string
}

export function ConvictionRoadmapSection() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()

  const steps: RoadmapStep[] = [
    {
      phase: "0 → 1",
      titleKo: "Brand Genesis",
      titleEn: "Brand Genesis",
      descKo: "기원을 설계합니다. 이름, 서사, 시각 문법을 한 흐름으로 고정합니다.",
      descEn: "Design the origin — name, narrative, and visual grammar in one coherent flow.",
      href: "/roadmap/genesis#genesis-eleven-axes",
      ctaKo: "기원의 설계 열기",
      ctaEn: "Open genesis journey",
    },
    {
      phase: "1 → 100",
      titleKo: "Luxury Scaling",
      titleEn: "Luxury Scaling",
      descKo: "글로벌 시장을 위한 비주얼 자산을 무제한에 가깝게 생성·배포합니다.",
      descEn: "Generate and deploy visual assets at scale for global markets.",
      href: "/roadmap/scaling#scaling-expansion-engines",
      ctaKo: "확장 여정 열기",
      ctaEn: "Open scaling journey",
    },
  ]

  return (
    <section
      id="conviction-roadmap"
      className="relative scroll-mt-28 px-5 py-28 sm:px-8 md:px-10 lg:px-12"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <p
            className={cn(
              "mb-3 text-[11px] tracking-[0.28em] text-liquid-silver/70",
              fontBody,
            )}
          >
            ROADMAP
          </p>
          <h2 className={cn("text-[1.5rem] text-white sm:text-[1.85rem]", fontHead)}>
            {isKo ? "브랜드 여정" : "The journey of a brand"}
          </h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:gap-12">
          {steps.map((s, i) => (
            <motion.div
              key={s.phase}
              initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: easeLux }}
            >
              <Link
                href={s.href}
                className={cn(
                  "lumina-midnight-glass group relative block rounded-none border border-white/[0.12] p-8 text-left",
                  "transition-all duration-300 ease-out will-change-transform",
                  !reduceMotion && "hover:-translate-y-1",
                  "hover:border-[#c9a227]/35 hover:shadow-[0_16px_56px_rgba(0,18,36,0.5),0_0_40px_rgba(212,175,55,0.1)]",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C0C0C0]/55",
                )}
                aria-label={isKo ? s.ctaKo : s.ctaEn}
              >
                <p
                  className={cn(
                    "mb-4 inline-block rounded-full border border-liquid-silver/35 px-3 py-1 text-[11px] tracking-[0.2em] text-liquid-silver transition-colors group-hover:border-[#d4af37]/45 group-hover:text-[#e8e4d9]",
                    fontBody,
                  )}
                >
                  {s.phase}
                </p>
                <h3 className={cn("text-[1.2rem] text-white", fontHead)}>
                  {isKo ? s.titleKo : s.titleEn}
                </h3>
                <p className={cn("mt-4 text-[15px] leading-relaxed text-white/65", fontBody)}>
                  {isKo ? s.descKo : s.descEn}
                </p>
                <p
                  className={cn(
                    "mt-6 text-[11px] tracking-[0.22em] text-white/38 transition-colors group-hover:text-[#d4af37]/90",
                    fontBody,
                  )}
                >
                  {isKo ? s.ctaKo : s.ctaEn}
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>
                    →
                  </span>
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: reduceMotion ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: easeLux }}
          className={cn(
            "mx-auto mt-16 max-w-2xl text-center text-[1.05rem] leading-relaxed text-white/88 sm:text-[1.15rem]",
            fontHead,
          )}
        >
          {isKo
            ? "0~1, 1~100. 루미나가 당신의 브랜딩 여정을 동반합니다."
            : "From 0→1 to 1→100 — Lumina walks every step of your branding journey."}
        </motion.p>
      </div>
    </section>
  )
}
