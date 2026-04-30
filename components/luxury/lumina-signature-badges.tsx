"use client"

import { useId } from "react"
import { motion } from "framer-motion"

export type BadgeKey =
  | "vegan"
  | "hypoallergenic"
  | "ewg"
  | "cruelty"
  | "dermatologist"

export type BadgeTexture = "metal" | "glass"

const BADGE_META: Record<
  BadgeKey,
  { title: string; subtitle: string; short: string }
> = {
  vegan: {
    title: "Vegan",
    subtitle: "비건 인증",
    short: "V",
  },
  hypoallergenic: {
    title: "Hypoallergenic",
    subtitle: "저자극 테스트 완료",
    short: "H",
  },
  ewg: {
    title: "EWG Green",
    subtitle: "EWG 그린 등급",
    short: "E",
  },
  cruelty: {
    title: "Cruelty Free",
    subtitle: "동물실험 없음",
    short: "C",
  },
  dermatologist: {
    title: "Dermatologist",
    subtitle: "피부과 전문 자문",
    short: "D",
  },
}

type LuminaSignatureBadgesProps = {
  texture?: BadgeTexture
  /** 표시할 배지 키 (기본: 전부) */
  active?: BadgeKey[]
  className?: string
}

function MetalDefs({ uid }: { uid: string }) {
  return (
    <defs>
      <linearGradient id={`${uid}-metal-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#f5e6c8" />
        <stop offset="35%" stopColor="#d9c2a9" />
        <stop offset="70%" stopColor="#a68b5b" />
        <stop offset="100%" stopColor="#6b5a3d" />
      </linearGradient>
      <linearGradient id={`${uid}-metal-shine`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.08" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
      <filter id={`${uid}-metal-shadow`} x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity="0.35" />
      </filter>
    </defs>
  )
}

function GlassDefs({ uid }: { uid: string }) {
  return (
    <defs>
      <linearGradient id={`${uid}-glass-face`} x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
        <stop offset="100%" stopColor="rgba(255,255,255,0.12)" />
      </linearGradient>
      <linearGradient id={`${uid}-glass-stroke`} x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(217,194,169,0.9)" />
        <stop offset="100%" stopColor="rgba(217,194,169,0.25)" />
      </linearGradient>
      <filter id={`${uid}-glass-blur`} x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
      </filter>
    </defs>
  )
}

function SignatureBadge({
  k,
  texture,
  index,
}: {
  k: BadgeKey
  texture: BadgeTexture
  index: number
}) {
  const uid = useId().replace(/:/g, "")
  const meta = BADGE_META[k]
  const metal = texture === "metal"

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="flex flex-col items-center gap-2 w-[104px]"
    >
      <svg
        viewBox="0 0 88 88"
        className="w-[88px] h-[88px] drop-shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
        aria-hidden
      >
        {metal ? <MetalDefs uid={uid} /> : <GlassDefs uid={uid} />}
        {metal ? (
          <>
            <circle
              cx="44"
              cy="44"
              r="38"
              fill={`url(#${uid}-metal-gold)`}
              filter={`url(#${uid}-metal-shadow)`}
            />
            <ellipse cx="44" cy="28" rx="28" ry="14" fill={`url(#${uid}-metal-shine)`} />
            <circle
              cx="44"
              cy="44"
              r="36"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1"
            />
            <text
              x="44"
              y="50"
              textAnchor="middle"
              fill="#2d2a26"
              fontSize="20"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              {meta.short}
            </text>
          </>
        ) : (
          <>
            <circle cx="44" cy="44" r="38" fill="rgba(15,14,12,0.5)" />
            <circle
              cx="44"
              cy="44"
              r="36"
              fill={`url(#${uid}-glass-face)`}
              stroke={`url(#${uid}-glass-stroke)`}
              strokeWidth="1.5"
            />
            <ellipse
              cx="44"
              cy="30"
              rx="22"
              ry="10"
              fill="rgba(255,255,255,0.25)"
              filter={`url(#${uid}-glass-blur)`}
            />
            <text
              x="44"
              y="50"
              textAnchor="middle"
              fill="#F9F8F6"
              fontSize="20"
              style={{ fontFamily: "var(--font-serif), Georgia, serif" }}
            >
              {meta.short}
            </text>
          </>
        )}
      </svg>
      <div className="text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase text-rose-gold/90">
          {meta.title}
        </p>
        <p className="text-[11px] text-white/60 mt-0.5 leading-snug">{meta.subtitle}</p>
      </div>
    </motion.div>
  )
}

/**
 * 루미나 톤의 금속/유리 질감 시그니처 엠블럼.
 */
export function LuminaSignatureBadges({
  texture = "metal",
  active = ["vegan", "hypoallergenic", "ewg", "cruelty", "dermatologist"],
  className = "",
}: LuminaSignatureBadgesProps) {
  return (
    <div
      className={`flex flex-wrap justify-center gap-x-8 gap-y-10 ${className}`}
      role="list"
    >
      {active.map((k, i) => (
        <div key={k} role="listitem">
          <SignatureBadge k={k} texture={texture} index={i} />
        </div>
      ))}
    </div>
  )
}

export { BADGE_META }
