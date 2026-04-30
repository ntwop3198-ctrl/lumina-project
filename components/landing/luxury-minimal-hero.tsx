"use client"

import { motion } from "framer-motion"
import { Boxes, Rocket, Sparkles, Wand2, Gem, Store, Megaphone } from "lucide-react"
import { cn } from "@/lib/utils"
import { DawnMistAtmosphere } from "@/components/landing/dawn-mist-atmosphere"
import { useLuminaLanguage } from "@/components/providers/language-provider"

const fontHead =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif] font-extrabold"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

const leftWing = [
  { icon: Rocket, badge: "START", title: "브랜드 제네시스", desc: "처음부터 명품의 문법으로 시작" },
  { icon: Wand2, badge: "PACK", title: "런칭 패키지", desc: "핵심 자산을 한 번에 세팅" },
  { icon: Boxes, badge: "LAB", title: "루미나 샌드박스", desc: "빠른 실험으로 정답을 압축" },
]

const rightWing = [
  { icon: Store, badge: "BUILD", title: "브랜드 빌더", desc: "브랜드 경험을 사이트로 구현" },
  { icon: Megaphone, badge: "NEW", title: "마케팅 에이전트", desc: "콘텐츠와 퍼널을 자동 최적화" },
  { icon: Sparkles, badge: "SHOW", title: "쇼케이스", desc: "실시간 데모로 신뢰를 증명" },
]

function ModuleCard({
  icon: Icon,
  badge,
  title,
  desc,
  align = "left",
}: {
  icon: typeof Sparkles
  badge: string
  title: string
  desc: string
  align?: "left" | "right"
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-white/[0.1] bg-black/35 p-4 backdrop-blur-xl transition-all duration-300 hover:border-[#D4AF37]/45 hover:shadow-[0_0_26px_rgba(212,175,55,0.14)] sm:p-5",
        align === "right" && "text-right",
      )}
    >
      <div className={cn("mb-2 flex items-center gap-2", align === "right" && "justify-end")}>
        <span className="rounded-full border border-[#D4AF37]/35 px-2 py-0.5 text-[9px] tracking-[0.12em] text-[#D4AF37]">
          {badge}
        </span>
        <Icon className="h-3.5 w-3.5 text-[#e1cc9b]/85" />
      </div>
      <p className={cn("text-sm text-white/88", fontBody)}>{title}</p>
      <p className={cn("mt-1 text-[12px] leading-[1.75] text-white/52", fontBody)}>{desc}</p>
    </div>
  )
}

export function LuxuryMinimalHero() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"

  return (
    <section id="service-intro" className="relative min-h-screen overflow-hidden bg-[#0A0A0A]">
      <div className="absolute inset-0 z-0 bg-[#0A0A0A]" aria-hidden />
      <DawnMistAtmosphere theme="cosmetic" />
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 62% 38% at 50% 46%, rgba(197,160,89,0.14) 0%, rgba(10,10,10,0.88) 72%)",
        }}
      />

      <div className="relative z-[2] mx-auto flex min-h-screen w-full max-w-7xl items-center justify-center px-6 py-28 text-center sm:px-10 md:px-14">
        <div className="w-full">
          <motion.h1
            initial={{ opacity: 0, y: 18, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: easeLux }}
            className={cn(
              "text-[1.7rem] leading-[1.58] tracking-[0.05em] sm:text-[2.05rem] md:text-[2.5rem] lg:text-[2.9rem]",
              !isKo && "tracking-[0.02em] leading-[1.45] sm:text-[1.95rem] md:text-[2.35rem] lg:text-[2.7rem]",
              fontHead,
            )}
          >
            <span className="block text-[#ece6d8]">
              {isKo ? "자본의 한계를 넘어," : "Beyond Capital Limits,"}
            </span>
            <span className="mt-3 block bg-gradient-to-r from-[#f0e6d1] via-[#C5A059] to-[#9f7f42] bg-clip-text text-transparent">
              {isKo
                ? "당신의 비즈니스를 명품의 궤도로."
                : "Elevating Your Business to Luxury Status."}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: easeLux }}
            className={cn(
              "mx-auto mt-14 max-w-3xl text-[14px] leading-[2.05] tracking-[0.01em] text-white/62 sm:mt-16 sm:text-[15px] md:text-base",
              !isKo && "max-w-4xl text-[13.5px] leading-[2]",
              fontBody,
            )}
          >
            {isKo
              ? "루미나는 특화된 고지능의 AI 에이전트를 통해 브랜딩의 문턱을 낮추고 가치의 천장을 높입니다. 코스메틱부터 퍼스널 브랜딩까지 — 당신의 철학을 가장 경제적으로, 가장 화려하게 꽃피우십시오."
              : "Lumina lowers the barrier to premium branding and raises the ceiling of brand value through specialized high-intelligence AI agents. From cosmetics to personal branding, let your philosophy bloom in the most efficient and most luminous way."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease: easeLux }}
            className="relative mx-auto mt-16 max-w-6xl md:mt-20"
          >
            <svg
              className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
              viewBox="0 0 1200 520"
              fill="none"
              aria-hidden
            >
              <path d="M600 262 C470 250 355 225 245 170" stroke="rgba(212,175,55,0.22)" strokeWidth="1" />
              <path d="M600 262 C730 250 845 225 955 170" stroke="rgba(212,175,55,0.22)" strokeWidth="1" />
              <path d="M600 270 C485 300 365 340 245 398" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
              <path d="M600 270 C715 300 835 340 955 398" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />

              <motion.circle
                r="2"
                fill="#d4af37"
                initial={{ opacity: 0.2, cx: 600, cy: 262 }}
                animate={{ opacity: [0.25, 0.9, 0.2], cx: [600, 955], cy: [262, 170] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                r="2"
                fill="#d4af37"
                initial={{ opacity: 0.2, cx: 600, cy: 270 }}
                animate={{ opacity: [0.25, 0.85, 0.2], cx: [600, 245], cy: [270, 398] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
              />
            </svg>

            <div className="grid items-center gap-6 md:grid-cols-[1fr_auto_1fr]">
              <div className="space-y-4">
                {leftWing.map((item) => (
                  <ModuleCard key={item.title} {...item} />
                ))}
              </div>

              <div className="relative mx-auto w-full max-w-[300px] sm:max-w-[340px]">
                <div className="pointer-events-none absolute -inset-12 rounded-full bg-[#C5A059]/25 blur-[60px]" />
                <div className="pointer-events-none absolute -inset-6 rounded-[2rem] border border-[#D4AF37]/25" />
                <motion.div
                  animate={{ boxShadow: ["0 0 35px rgba(212,175,55,0.22)", "0 0 58px rgba(212,175,55,0.35)", "0 0 35px rgba(212,175,55,0.22)"] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                  className="relative rounded-3xl border border-[#D4AF37]/45 bg-black/55 p-6 backdrop-blur-2xl sm:p-7"
                >
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/35 px-2.5 py-1 text-[10px] tracking-[0.14em] text-[#D4AF37]">
                    <Gem className="h-3.5 w-3.5" />
                    CORE
                  </div>
                  <h3 className={cn("text-xl tracking-[0.05em] text-white/94 sm:text-2xl", fontHead)}>보석함</h3>
                  <p className={cn("mt-3 text-[13px] leading-[1.9] text-[#e7d8b8]/82", fontBody)}>
                    당신의 브랜드 자산이 영원히 빛나는 곳
                  </p>
                </motion.div>
              </div>

              <div className="space-y-4">
                {rightWing.map((item) => (
                  <ModuleCard key={item.title} {...item} align="right" />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

