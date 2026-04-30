"use client"

import { motion, useReducedMotion } from "framer-motion"

/**
 * Visual-Text Synchro-Shield: 시간·리추얼 메타포 카피와 동기화된 배경 아우라.
 * 법적으로 말하지 못한 ‘느려짐·정지감’을 빛의 밀도로 암시합니다.
 */
export function TemporalMetaphorAura({ active }: { active: boolean }) {
  const reduceMotion = useReducedMotion()
  if (!active) return null

  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-[5] overflow-hidden rounded-3xl opacity-[0.09]"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(201,162,39,0.2), transparent 55%)",
        }}
        aria-hidden
      />
    )
  }

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[5] overflow-hidden rounded-3xl"
      aria-hidden
    >
      <motion.div
        className="absolute inset-[-24%] opacity-[0.11]"
        style={{
          background:
            "radial-gradient(circle at 48% 42%, rgba(201,162,39,0.22), transparent 52%), repeating-conic-gradient(from 0deg at 50% 50%, rgba(0,0,0,0.04) 0deg, transparent 1.2deg, rgba(255,255,255,0.05) 2.4deg, transparent 3.6deg)",
        }}
        animate={{ rotate: [0, 1.5, -1.2, 0], scale: [1, 1.015, 1] }}
        transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 28% 18%, rgba(255,250,240,0.14) 0%, transparent 2.5%), radial-gradient(circle at 72% 58%, rgba(255,255,255,0.1) 0%, transparent 2%)",
        }}
        animate={{ opacity: [0.32, 0.52, 0.38] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  )
}
