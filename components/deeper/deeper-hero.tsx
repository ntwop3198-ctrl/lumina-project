"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

type DeeperHeroProps = {
  imageSrc?: string
}

export function DeeperHero({ imageSrc = "/deeper/deeper-magnesium-sapphire.png" }: DeeperHeroProps) {
  const cardRef = useRef<HTMLDivElement | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const [isHovering, setIsHovering] = useState(false)

  const rotateX = useTransform(my, [-80, 80], [10, -10])
  const rotateY = useTransform(mx, [-80, 80], [-10, 10])
  const glintX = useTransform(mx, [-80, 80], [10, 90])

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  })

  const liquidWave = useTransform(scrollYProgress, [0, 1], [0, 16])
  const hoverBoost = useTransform(scrollYProgress, [0, 1], [0.06, 0.12])
  const causticIntensity = useTransform(scrollYProgress, (p) =>
    isHovering ? 0.25 + p * 0.2 : 0.18 + p * 0.17
  )

  const glintBackground = useTransform(glintX, (x) => {
    return `conic-gradient(from 160deg at ${x}% 10%, rgba(56,189,248,0.22), rgba(148,163,184,0.08), transparent, rgba(56,189,248,0.32))`
  })

  const causticBackground = useTransform(causticIntensity, (alpha) => {
    return `radial-gradient(circle at 50% 0%, rgba(56,189,248,${alpha}) 0%, transparent 55%)`
  })

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    mx.set(x)
    my.set(y)
  }

  const handleLeave = () => {
    mx.set(0)
    my.set(0)
    setIsHovering(false)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] text-cream">
      {/* Sapphire‑inspired background depth layers */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        initial={false}
        animate={{
          background:
            "radial-gradient(circle at 10% 0%, rgba(15,23,42,0.9) 0%, #020617 45%, #000000 100%)",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      />

      {/* Subtle sapphire beam */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(120deg, transparent 0%, rgba(56,189,248,0.12) 40%, transparent 80%)",
        }}
      />

      {/* Deep parallax layer for extra depth */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(circle at 80% 80%, rgba(15,118,178,0.4) 0%, transparent 55%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 grid md:grid-cols-[1.3fr,1fr] gap-10 md:gap-16 items-center">
        <div>
          <p className="text-[11px] tracking-[0.32em] uppercase text-slate-300 mb-3">
            Deep:er · Liquid Jewel Series
          </p>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream mb-6 leading-tight">
            마시는 사파이어,
            <span className="block mt-1">Deep:er 마그네슘 앰플</span>
          </h1>
          <p className="font-sans text-sm md:text-base text-cream/70 leading-relaxed max-w-xl">
            사파이어처럼 맑고 깊은 블루 제형 안에, 하루 컨디션을 결정하는 마그네슘 밸런스를
            정교하게 담았습니다. 과장된 장식 대신, 고요한 조명 아래에서만 드러나는 굴절과
            투명도가 이 제품의 모든 것을 설명합니다.
          </p>
        </div>

        <motion.div
          ref={cardRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onMouseEnter={() => setIsHovering(true)}
          style={{ rotateX, rotateY }}
          className="relative h-80 md:h-[420px] rounded-[2.5rem] border border-rose-gold/35 bg-black/90 shadow-[0_30px_90px_rgba(8,47,73,1)] overflow-hidden will-change-transform md:mt-4"
        >
          {/* Base liquid jewel plate */}
          <Image
            src={imageSrc}
            alt="Deep:er 마그네슘 액상 — 사파이어처럼 맑은 앰플 제형"
            fill
            priority
            className="object-cover"
          />

          {/* Backlight halo directly behind the ampoule */}
          <motion.div
            className="pointer-events-none absolute inset-0"
            animate={{
              opacity: isHovering ? 1 : 0.85,
            }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                "radial-gradient(circle at 50% 45%, rgba(56,189,248,0.55) 0%, rgba(15,23,42,0.0) 55%)",
            }}
          />

          {/* Hyper‑real glass ampoule core */}
          <motion.div
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            style={{ scale: isHovering ? 1.03 : 1 }}
            transition={{ type: "spring", stiffness: 160, damping: 18 }}
          >
            <svg
              width="200"
              height="260"
              viewBox="0 0 200 260"
              className="drop-shadow-[0_0_40px_rgba(148,197,255,0.55)]"
            >
              <defs>
                <linearGradient id="ampouleGlass" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(248,250,252,0.0)" />
                  <stop offset="18%" stopColor="rgba(248,250,252,0.95)" />
                  <stop offset="50%" stopColor="rgba(148,163,184,0.65)" />
                  <stop offset="82%" stopColor="rgba(248,250,252,0.9)" />
                  <stop offset="100%" stopColor="rgba(15,23,42,0.0)" />
                </linearGradient>
                <linearGradient id="sapphireFill" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(125,211,252,0.98)" />
                  <stop offset="42%" stopColor="rgba(56,189,248,0.98)" />
                  <stop offset="72%" stopColor="rgba(30,64,175,1)" />
                  <stop offset="100%" stopColor="rgba(10,16,64,1)" />
                </linearGradient>
                <radialGradient id="innerGlow" cx="50%" cy="20%" r="60%">
                  <stop offset="0%" stopColor="rgba(191,219,254,0.9)" />
                  <stop offset="40%" stopColor="rgba(56,189,248,0.4)" />
                  <stop offset="100%" stopColor="rgba(15,23,42,0)" />
                </radialGradient>
              </defs>
              {/* Liquid core with subtle inner motion */}
              <motion.rect
                x="62"
                y="70"
                width="76"
                height="140"
                rx="22"
                fill="url(#sapphireFill)"
                style={{ translateY: liquidWave }}
              />
              {/* Inner SSS glow */}
              <motion.ellipse
                cx="100"
                cy="96"
                rx="28"
                ry="18"
                fill="url(#innerGlow)"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Glass outline with sharp edges */}
              <rect
                x="56"
                y="30"
                width="88"
                height="196"
                rx="26"
                fill="none"
                stroke="url(#ampouleGlass)"
                strokeWidth="3"
              />
              {/* Thin specular edge on the right for glass thickness */}
              <path
                d="M138 40 Q146 128 138 220"
                stroke="rgba(248,250,252,0.9)"
                strokeWidth="1.1"
                strokeLinecap="round"
                fill="none"
              />
              {/* Neck highlight */}
              <rect
                x="78"
                y="40"
                width="44"
                height="32"
                rx="14"
                fill="rgba(248,250,252,0.35)"
              />

              {/* Micro bubbles as tiny luminous points */}
              <motion.circle
                cx="92"
                cy="120"
                r="3"
                fill="rgba(226,232,240,0.9)"
                stroke="rgba(59,130,246,0.7)"
                strokeWidth="0.6"
                animate={{ opacity: [0.6, 1, 0.6], cy: [118, 116, 118] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.circle
                cx="116"
                cy="150"
                r="2"
                fill="rgba(191,219,254,0.95)"
                stroke="rgba(59,130,246,0.6)"
                strokeWidth="0.5"
                animate={{ opacity: [0.4, 0.9, 0.4], cy: [148, 146, 148] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </motion.div>

          {/* Iridescent glint that follows cursor */}
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{
              background: glintBackground,
              opacity: 0.9,
            }}
          />

          {/* Liquid caustics reacting to scroll */}
          <motion.div
            className="pointer-events-none absolute inset-x-[-10%] bottom-[-20%] h-2/3 mix-blend-screen"
            style={{
              background: causticBackground,
              translateY: liquidWave,
            }}
          />

          {/* Secondary caustic net for stronger spatial feel */}
          <motion.div
            className="pointer-events-none absolute inset-x-[-20%] bottom-[-25%] h-2/3 mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at 30% 0%, rgba(56,189,248,0.24) 0%, transparent 55%), radial-gradient(circle at 70% 5%, rgba(129,140,248,0.28) 0%, transparent 60%)",
              opacity: isHovering ? 0.85 : 0.55,
            }}
          />

          {/* Soft top glass highlight */}
          <div className="pointer-events-none absolute inset-x-6 top-4 h-16 bg-gradient-to-b from-white/22 via-transparent to-transparent rounded-[2rem]" />
        </motion.div>
      </div>
    </section>
  )
}

