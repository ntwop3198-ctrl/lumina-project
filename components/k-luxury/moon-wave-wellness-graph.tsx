"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useAnimationFrame } from "framer-motion"

type MoonWaveWellnessGraphProps = {
  /** 0–100 시각화 값 (흡수율 등) */
  value?: number
  label?: string
}

/**
 * 달 위상 + 물결 파동으로 효능 수치를 시각화. 터치 시 파동 진폭이 커지는 상호작용.
 */
export function MoonWaveWellnessGraph({
  value = 78,
  label = "흡수 체감",
}: MoonWaveWellnessGraphProps) {
  const tRef = useRef(0)
  const [touchBoost, setTouchBoost] = useState(0)
  const touchBoostRef = useRef(0)
  const wave1Ref = useRef<SVGPathElement>(null)
  const wave2Ref = useRef<SVGPathElement>(null)

  touchBoostRef.current = touchBoost

  const onPointerDown = useCallback(() => {
    setTouchBoost((b) => Math.min(1, b + 0.35))
  }, [])

  const onPointerMove = useCallback(() => {
    setTouchBoost((b) => Math.min(1, b + 0.015))
  }, [])

  useEffect(() => {
    const id = setInterval(() => {
      setTouchBoost((b) => Math.max(0, b - 0.035))
    }, 50)
    return () => clearInterval(id)
  }, [])

  const v = Math.min(100, Math.max(0, value))
  /** 수치가 높을수록 밝은 달에 가깝게 — 그림자 원이 옆으로 밀림 */
  const shadowCx = 50 + (1 - v / 100) * 46

  const ampBase = 4 + (v / 100) * 10

  const buildWave = (y0: number, layer: number, t: number, boost: number) => {
    const amp = ampBase + boost * 22
    const freq = 1.15 + boost * 0.85
    const pts: string[] = []
    const steps = 48
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 320
      const w =
        Math.sin((i / steps) * Math.PI * 2 * freq + t * (1.15 + layer * 0.12)) * amp +
        Math.sin((i / steps) * Math.PI * 4 + t * 0.65) * (amp * 0.22)
      const y = y0 + w
      pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`)
    }
    pts.push("L 320 120 L 0 120 Z")
    return pts.join(" ")
  }

  useAnimationFrame((_, delta) => {
    tRef.current += delta * 0.001
    const t = tRef.current
    const b = touchBoostRef.current
    if (wave1Ref.current) {
      wave1Ref.current.setAttribute("d", buildWave(56, 0, t, b))
    }
    if (wave2Ref.current) {
      wave2Ref.current.setAttribute("d", buildWave(61, 1, t, b))
    }
  })

  return (
    <div
      role="img"
      aria-label={`${label} ${v}퍼센트, 물결 애니메이션. 화면을 누르면 파동이 커집니다.`}
      className="relative w-full max-w-md mx-auto rounded-3xl border border-sky-500/20 bg-slate-950/80 px-5 py-8 overflow-hidden touch-manipulation select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      style={{ fontFamily: "'Pretendard', var(--font-sans), system-ui, sans-serif" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(56,189,248,0.2), transparent 55%)",
        }}
      />

      <div className="relative flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-[10px] tracking-[0.25em] text-sky-200/50 uppercase">{label}</p>
          <p className="text-2xl font-semibold tabular-nums text-sky-50 mt-1">{v}%</p>
          <p className="text-[11px] text-slate-500 mt-1">터치 · 파동 확장</p>
        </div>
        <svg width="72" height="72" viewBox="0 0 100 100" className="shrink-0" aria-hidden>
          <defs>
            <linearGradient id="moonLit" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(224,242,254,0.98)" />
              <stop offset="100%" stopColor="rgba(56,189,248,0.55)" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="42" fill="url(#moonLit)" stroke="rgba(56,189,248,0.3)" strokeWidth="0.75" />
          <circle cx={shadowCx} cy="50" r="44" fill="#020617" opacity={0.88} />
        </svg>
      </div>

      <svg viewBox="0 0 320 120" className="w-full h-28 text-sky-400/70" preserveAspectRatio="none" aria-hidden>
        <path ref={wave1Ref} fill="currentColor" opacity={0.32} d="M0 60 L320 60 L320 120 L0 120 Z" />
        <path ref={wave2Ref} fill="currentColor" opacity={0.52} d="M0 65 L320 65 L320 120 L0 120 Z" />
        <path
          d="M0 72 Q 160 68 320 72"
          fill="none"
          stroke="rgba(56,189,248,0.22)"
          strokeWidth="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}
