"use client"

import { useCallback, useState, type ReactNode } from "react"
import { motion } from "framer-motion"
import { UploadCloud, Diamond } from "lucide-react"
import { cn } from "@/lib/utils"

const BG = "#121212"

/** 나눔명조 우선 — 레이아웃에서 로드된 폰트 스택 */
const fontMyeongjo = "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
}

const stagger = {
  show: { transition: { staggerChildren: 0.14 } },
}

const grainSvg = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`

function scrollToUpload() {
  document.getElementById("upload")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function scrollToShowcase() {
  document.getElementById("showcase")?.scrollIntoView({ behavior: "smooth", block: "start" })
}

function GoldWord({ children }: { children: ReactNode }) {
  return (
    <span
      className="bg-gradient-to-r from-[#f2e8c8] via-[#D4AF37] to-[#b8941f] bg-clip-text font-normal text-transparent"
      style={{ textShadow: "0 0 40px rgba(212, 175, 55, 0.28)" }}
    >
      {children}
    </span>
  )
}

export function LuminaPremiumShowcase() {
  const [zoneActive, setZoneActive] = useState(false)
  const [droppedNames, setDroppedNames] = useState<string[]>([])

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setZoneActive(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setZoneActive(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setZoneActive(false)
    const list = Array.from(e.dataTransfer.files).filter(
      (f) => /^image\//.test(f.type) || /\.(png|jpe?g|webp)$/i.test(f.name),
    )
    if (list.length) {
      setDroppedNames(list.slice(0, 5).map((f) => f.name))
      setTimeout(() => scrollToUpload(), 400)
    }
  }, [])

  const shell = cn("relative mx-auto w-full max-w-3xl md:max-w-4xl", fontMyeongjo)

  return (
    <div
      className="relative overflow-hidden text-[#FFFFFF]"
      style={{ backgroundColor: BG }}
    >
      {/* Grain + ambient gradient */}
      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.045] mix-blend-overlay"
        style={{ backgroundImage: grainSvg }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `radial-gradient(ellipse 100% 60% at 0% 0%, rgba(212,175,55,0.07), transparent 45%),
            radial-gradient(ellipse 80% 50% at 100% 40%, rgba(212,175,55,0.05), transparent 50%),
            linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 30%, rgba(0,0,0,0.2) 100%)`,
        }}
        aria-hidden
      />

      <div className="relative z-10">
        {/* 섹션 1 */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-72px" }}
          variants={stagger}
          className={cn(shell, "px-5 py-24 text-left sm:px-8 sm:py-28 md:py-36 lg:py-40")}
        >
          <motion.div variants={fadeUp}>
            <p className="mb-8 text-[10px] font-medium uppercase tracking-[0.48em] text-white/38 sm:mb-10 sm:text-[11px]">
              Lumina
            </p>
            <h2 className="text-[1.5rem] font-light leading-[1.62] tracking-[-0.02em] text-[#FFFFFF] sm:text-[1.85rem] sm:leading-[1.64] md:text-[2.125rem] md:leading-[1.66] lg:text-[2.35rem] lg:leading-[1.68]">
              <span
                className="block"
                style={{
                  textShadow: "0 0 48px rgba(255,255,255,0.06), 0 0 96px rgba(212,175,55,0.08)",
                }}
              >
                정밀 분석에서 서사까지,
                <br className="hidden sm:block" />
                <span className="sm:ml-1">한 화면에 담은 </span>
                <GoldWord>브랜드 OS</GoldWord>
              </span>
            </h2>
            <p className="mt-10 max-w-xl text-[0.9375rem] font-light leading-[1.82] tracking-[-0.01em] text-white/52 sm:mt-12 sm:text-base sm:leading-[1.85]">
              분석·카피·채널을 한 레이어에 두고, 브랜드 서사가 끊기지 않도록 설계합니다.
            </p>
          </motion.div>
        </motion.section>

        <div className={cn(shell, "px-5 sm:px-8")}>
          <div className="h-px w-full bg-gradient-to-r from-[#D4AF37]/20 via-white/10 to-transparent" />
        </div>

        {/* 섹션 2 */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-72px" }}
          variants={stagger}
          className={cn(shell, "px-5 py-24 text-left sm:px-8 sm:py-28 md:py-32")}
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-[1.45rem] font-light leading-[1.58] tracking-[-0.018em] text-white sm:text-[1.8rem] sm:leading-[1.6] md:text-[2rem] md:leading-[1.62]">
              상세페이지를 넘어,{" "}
              <span
                className="text-[#D4AF37]"
                style={{ textShadow: "0 0 32px rgba(212,175,55,0.35)" }}
              >
                바이럴까지 한 번에
              </span>
            </h2>
            <p className="mt-10 max-w-xl text-[0.9375rem] font-light leading-[1.82] text-white/48 sm:mt-11 sm:leading-[1.85]">
              상세·SNS·숏폼까지 톤을 맞춘 출력으로, 캠페인 리듬을 이어 갑니다.
            </p>
          </motion.div>
        </motion.section>

        <div className={cn(shell, "px-5 sm:px-8")}>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-[#D4AF37]/15" />
        </div>

        {/* 섹션 3 */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-72px" }}
          variants={stagger}
          className={cn(shell, "px-5 py-24 text-left sm:px-8 sm:py-28 md:py-32")}
        >
          <motion.div variants={fadeUp}>
            <h2 className="text-[1.4rem] font-light leading-[1.55] tracking-[-0.02em] text-white sm:text-[1.75rem] sm:leading-[1.58] md:text-[1.95rem]">
              제품 사진 업로드 및 <GoldWord>AI 분석</GoldWord>
            </h2>
            <p className="mt-6 max-w-lg text-[0.9375rem] font-light leading-[1.8] text-white/45 sm:leading-[1.82]">
              이미지를 놓으면 영역이 반응합니다. 전체 플로우는 아래 업로드 섹션에서 이어집니다.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-12 sm:mt-14">
            <motion.div
              whileHover={{ boxShadow: "0 0 56px rgba(212, 175, 55, 0.12)" }}
              transition={{ duration: 0.35 }}
              className="rounded-2xl"
            >
              <div
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && scrollToUpload()}
                onClick={() => scrollToUpload()}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={cn(
                  "group relative cursor-pointer rounded-2xl border border-dashed px-6 py-14 transition-all duration-500 sm:px-10 sm:py-16 md:py-[4.5rem]",
                  "border-[#D4AF37]/40 bg-white/[0.025]",
                  "shadow-[0_0_0_1px_rgba(212,175,55,0.08)_inset,0_0_40px_rgba(212,175,55,0.07)]",
                  zoneActive &&
                    "border-[#D4AF37] bg-[#D4AF37]/[0.08] shadow-[0_0_0_1px_rgba(212,175,55,0.25)_inset,0_0_72px_rgba(212,175,55,0.18)]",
                )}
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.1] transition group-hover:shadow-[0_0_24px_rgba(212,175,55,0.25)]">
                  <UploadCloud className="h-7 w-7 text-[#D4AF37]" strokeWidth={1.2} />
                </div>
                <p className="mt-7 text-center text-sm font-light leading-[1.8] tracking-[-0.01em] text-white/85 sm:text-base">
                  드래그 앤 드롭하거나 클릭해 업로드 섹션으로 이동
                </p>
                <p className="mt-2 text-center text-xs font-light text-white/35">PNG, JPG, WEBP</p>
                {droppedNames.length > 0 ? (
                  <p className="mt-4 text-center text-[11px] text-[#D4AF37]/90">
                    {droppedNames.length}개 파일 인식 — 이동 중…
                  </p>
                ) : null}
              </div>
            </motion.div>
          </motion.div>
        </motion.section>

        <div className={cn(shell, "px-5 sm:px-8")}>
          <div className="h-px w-full bg-gradient-to-r from-[#D4AF37]/15 via-white/10 to-transparent" />
        </div>

        {/* 섹션 4 — LUMINA STORIES & CTA */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-72px" }}
          variants={stagger}
          className={cn(shell, "px-5 pb-28 pt-24 text-left sm:px-8 sm:pb-32 sm:pt-28 md:pb-36")}
        >
          <motion.div variants={fadeUp}>
            <div className="mb-10 flex items-center gap-2.5 text-[10px] font-medium uppercase tracking-[0.42em] text-white/32 sm:mb-12 sm:text-[11px] sm:tracking-[0.46em]">
              <Diamond className="h-3.5 w-3.5 shrink-0 text-white/40" strokeWidth={1.35} aria-hidden />
              LUMINA STORIES
            </div>

            <h2 className="text-[1.55rem] font-light leading-[1.58] tracking-[-0.02em] text-white sm:text-[1.9rem] sm:leading-[1.6] md:text-[2.15rem] md:leading-[1.62]">
              루미나로 탄생한 브랜드,
              <span className="mt-[0.55em] block">
                <span className="text-[#D4AF37]" style={{ textShadow: "0 0 36px rgba(212,175,55,0.3)" }}>
                  다음은 당신의 차례
                </span>
              </span>
            </h2>

            <div className="mt-14 flex flex-col items-center gap-4 sm:mt-16 sm:flex-row sm:justify-center sm:gap-5">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02, boxShadow: "0 0 48px rgba(212, 175, 55, 0.35)" }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.25 }}
                onClick={scrollToUpload}
                className={cn(
                  "w-full max-w-[280px] rounded-full border border-[#D4AF37]/55 px-9 py-4 text-sm font-medium tracking-wide text-[#121212]",
                  "bg-gradient-to-r from-[#e8c547] via-[#D4AF37] to-[#b8941f]",
                  "shadow-[0_0_28px_rgba(212,175,55,0.3)] sm:w-auto",
                )}
              >
                브랜드 분석 시작하기
              </motion.button>
              <motion.button
                type="button"
                whileHover={{
                  borderColor: "rgba(212, 175, 55, 0.45)",
                  boxShadow: "0 0 32px rgba(212, 175, 55, 0.12)",
                }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.25 }}
                onClick={scrollToShowcase}
                className="w-full max-w-[280px] rounded-full border border-white/18 bg-transparent px-9 py-4 text-sm font-light tracking-wide text-white/92 transition-colors sm:w-auto"
              >
                명품 브랜드 만들기
              </motion.button>
            </div>
          </motion.div>
        </motion.section>
      </div>
    </div>
  )
}
