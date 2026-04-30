"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { cn } from "@/lib/utils"
import { AGENT_MIST_THEMES, type SpecializedAgentId } from "@/lib/specialized-agents"

/** 고정 시드 기반 입자 — 마우스에 따라 미세 패럴랙스 */
const PARTICLE_SEEDS = [
  { x: 12, y: 18, p: 0.35, s: 1.1 },
  { x: 22, y: 42, p: 0.55, s: 0.85 },
  { x: 78, y: 28, p: 0.45, s: 1.2 },
  { x: 88, y: 62, p: 0.5, s: 0.9 },
  { x: 35, y: 72, p: 0.4, s: 1 },
  { x: 58, y: 15, p: 0.6, s: 0.75 },
  { x: 65, y: 55, p: 0.38, s: 1.15 },
  { x: 8, y: 55, p: 0.48, s: 0.95 },
  { x: 45, y: 38, p: 0.52, s: 1.05 },
  { x: 92, y: 38, p: 0.42, s: 0.88 },
  { x: 50, y: 88, p: 0.36, s: 1 },
  { x: 18, y: 82, p: 0.44, s: 0.92 },
  { x: 72, y: 78, p: 0.5, s: 1.08 },
  { x: 38, y: 8, p: 0.58, s: 0.8 },
] as const

type DawnMistAtmosphereProps = {
  className?: string
  /** 히어로 등 섹션 내부 — absolute 기준 */
  variant?: "section" | "fullscreen"
  /** 에이전트 선택에 따른 안개 톤 (기본: 코스메틱 샴페인 골드) */
  theme?: SpecializedAgentId
}

export function DawnMistAtmosphere({
  className,
  variant = "section",
  theme = "cosmetic",
}: DawnMistAtmosphereProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const mist = AGENT_MIST_THEMES[theme]

  const onMove = useCallback((e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2
    const ny = (e.clientY / window.innerHeight - 0.5) * 2
    setOffset({ x: nx, y: ny })
  }, [])

  useEffect(() => {
    window.addEventListener("mousemove", onMove, { passive: true })
    return () => window.removeEventListener("mousemove", onMove)
  }, [onMove])

  const particles = useMemo(() => PARTICLE_SEEDS, [])

  return (
    <div
      className={cn(
        "pointer-events-none select-none overflow-hidden",
        variant === "fullscreen" ? "fixed inset-0 z-[0]" : "absolute inset-0 z-[1]",
        className,
      )}
      aria-hidden
    >
      {/* 부드러운 안개 그라데이션 — 에이전트별 톤 */}
      <div
        className="absolute -left-[20%] top-[-10%] h-[55%] w-[70%] rounded-full blur-[90px] motion-safe:animate-dawn-fog-a motion-safe:transition-[background,opacity] motion-safe:duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${mist.fogA} 0%, transparent 68%)`,
        }}
      />
      <div
        className="absolute -right-[15%] top-[20%] h-[50%] w-[60%] rounded-full blur-[100px] motion-safe:animate-dawn-fog-b motion-safe:transition-[background] motion-safe:duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${mist.fogB} 0%, transparent 65%)`,
        }}
      />
      <div
        className="absolute bottom-[-5%] left-[25%] h-[45%] w-[55%] rounded-full blur-[110px] motion-safe:animate-dawn-fog-c motion-safe:transition-[background] motion-safe:duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${mist.fogC} 0%, transparent 70%)`,
        }}
      />

      {/* 미세 노이즈 / 안개 드리프트 */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay motion-safe:animate-dawn-noise"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px 180px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-soft-light motion-safe:animate-dawn-noise-reverse"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "240px 240px",
        }}
      />

      {/* 골드 미세 입자 */}
      {particles.map((seed, i) => (
        <div
          key={`${theme}-${i}`}
          className="absolute rounded-full blur-[0.6px] motion-safe:animate-dawn-drift motion-safe:transition-[background,box-shadow] motion-safe:duration-700"
          style={{
            left: `${seed.x}%`,
            top: `${seed.y}%`,
            width: `${seed.s}px`,
            height: `${seed.s}px`,
            backgroundColor: mist.particle,
            boxShadow: `0 0 6px ${mist.particle}`,
            transform: `translate3d(${offset.x * 12 * seed.p}px, ${offset.y * 10 * seed.p}px, 0)`,
            animationDelay: `${i * 0.37}s`,
          }}
        />
      ))}
    </div>
  )
}
