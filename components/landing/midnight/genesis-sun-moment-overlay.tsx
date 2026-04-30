"use client"

import { motion } from "framer-motion"
import {
  LUMINA_AWAKENING_MAIN_EN,
  LUMINA_AWAKENING_MAIN_KO,
  LUMINA_AWAKENING_SUB_EN,
  LUMINA_AWAKENING_SUB_KO,
} from "@/lib/lumina/awakening-copy"
import {
  LUMINA_PARADOX_CENTER_A_EN,
  LUMINA_PARADOX_CENTER_A_KO,
  LUMINA_PARADOX_CENTER_B_EN,
  LUMINA_PARADOX_CENTER_B_KO,
} from "@/lib/lumina/paradox-white-suit-copy"
import { cn } from "@/lib/utils"

const fontSerif =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

/** 펄 입자 위치 (퍼센트) — 고정 시드로 레이아웃 안정 */
const AWAKENING_PEARLS = [
  { left: "18%", bottom: "22%", w: 3, h: 3, delay: 0 },
  { left: "42%", bottom: "38%", w: 2, h: 2, delay: 0.35 },
  { left: "58%", bottom: "28%", w: 2.5, h: 2.5, delay: 0.7 },
  { left: "72%", bottom: "44%", w: 2, h: 2, delay: 0.2 },
  { left: "28%", bottom: "52%", w: 2, h: 2, delay: 0.55 },
  { left: "52%", bottom: "18%", w: 2.5, h: 2.5, delay: 0.9 },
  { left: "65%", bottom: "58%", w: 2, h: 2, delay: 0.45 },
] as const

export type GenesisSunPhase = "pause" | "dawn" | "paradox"

export function GenesisSunMomentOverlay({
  phase,
  isKo,
  reduceMotion,
}: {
  phase: GenesisSunPhase
  isKo: boolean
  reduceMotion: boolean | null
}) {
  const main = isKo ? LUMINA_AWAKENING_MAIN_KO : LUMINA_AWAKENING_MAIN_EN
  const sub = isKo ? LUMINA_AWAKENING_SUB_KO : LUMINA_AWAKENING_SUB_EN
  const pA = isKo ? LUMINA_PARADOX_CENTER_A_KO : LUMINA_PARADOX_CENTER_A_EN
  const pB = isKo ? LUMINA_PARADOX_CENTER_B_KO : LUMINA_PARADOX_CENTER_B_EN
  const showLight = phase === "dawn" && !reduceMotion
  const showParadox = phase === "paradox" && !reduceMotion

  return (
    <div
      role="presentation"
      aria-hidden
      className="pointer-events-none flex h-full min-h-0 w-full items-center justify-center px-6 py-16"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,#112240_0%,#0d1828_55%,#080f1a_100%)]"
        aria-hidden
      />

      {showLight ? (
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_72%,rgba(248,180,200,0.12)_0%,rgba(232,160,180,0.04)_28%,transparent_58%)]"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2.4, ease: easeLux }}
        />
      ) : null}

      {/* Passion ember — 항상 동일 motion 노드 유지 (reduceMotion/phase 전환 시 훅 순서 안정) */}
      <motion.div
        className="absolute bottom-[8%] right-[6%] h-[min(42%,220px)] w-[min(55%,280px)] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(255,186,120,0.38)_0%,rgba(255,140,70,0.12)_35%,transparent_70%)] blur-2xl"
        aria-hidden
        initial={false}
        animate={
          reduceMotion
            ? { opacity: 0, scale: 0.9 }
            : phase === "pause"
              ? {
                  opacity: [0.4, 0.58, 0.46, 0.55, 0.42],
                  scale: [1, 1.04, 0.98, 1.03, 1],
                }
              : { opacity: 0, scale: 0.9 }
        }
        transition={
          reduceMotion
            ? { duration: 0.15, ease: easeLux }
            : phase === "pause"
              ? { duration: 4.4, repeat: Infinity, ease: "easeInOut" }
              : { duration: 1.85, ease: easeLux }
        }
      />

      {showLight ? (
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          <motion.div
            className="absolute inset-x-0 top-0 origin-top"
            style={{
              height: "115%",
              background:
                "linear-gradient(185deg, rgba(255,252,253,0.22) 0%, rgba(245,220,230,0.08) 14%, rgba(230,238,250,0.08) 32%, rgba(180,195,215,0.03) 48%, transparent 70%)",
            }}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2.35, ease: easeLux }}
          />
          <motion.div
            className="absolute inset-x-[-20%] top-0 h-[55%] bg-gradient-to-b from-white/[0.14] via-transparent to-transparent"
            initial={{ y: "-30%", opacity: 0 }}
            animate={{ y: "8%", opacity: 1 }}
            transition={{ duration: 2.55, ease: easeLux, delay: 0.1 }}
          />
        </div>
      ) : null}

      <div className="relative z-[2] mx-auto flex max-w-[min(34rem,94vw)] flex-col items-center text-center">
        {showLight ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="flex w-full flex-col items-center"
          >
            {/* 투명 용기 — 벚꽃 엑기스가 차오름 */}
            <div className="relative mb-12 sm:mb-14">
              <div
                className="relative mx-auto h-[8.5rem] w-[4.1rem] overflow-hidden rounded-t-[0.55rem] border border-white/[0.22] border-b-0 bg-gradient-to-b from-white/[0.07] to-white/[0.02] shadow-[0_0_40px_rgba(248,190,210,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] sm:h-[9.25rem] sm:w-[4.35rem]"
                aria-hidden
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-t-[inherit] bg-gradient-to-br from-white/[0.2] via-transparent to-transparent opacity-70"
                  style={{ mixBlendMode: "soft-light" }}
                />
                <div className="absolute inset-x-[9%] bottom-[5%] top-[10%] overflow-hidden rounded-sm">
                  <motion.div
                    className="absolute inset-x-0 bottom-0 rounded-b-[2px]"
                    style={{
                      background: `linear-gradient(0deg,
                        rgba(232, 150, 168, 0.92) 0%,
                        rgba(245, 198, 212, 0.88) 28%,
                        rgba(253, 228, 236, 0.82) 58%,
                        rgba(255, 240, 245, 0.55) 100%)`,
                      boxShadow:
                        "inset 0 -12px 24px rgba(255,182,198,0.35), inset 0 0 20px rgba(255,255,255,0.15)",
                    }}
                    initial={{ height: "0%" }}
                    animate={{ height: "82%" }}
                    transition={{ duration: 2.65, delay: 0.35, ease: easeLux }}
                  />
                  <div className="pointer-events-none absolute inset-0">
                    {AWAKENING_PEARLS.map((p, i) => (
                      <span
                        key={i}
                        className="lumina-awakening-pearl absolute"
                        style={{
                          left: p.left,
                          bottom: p.bottom,
                          width: p.w,
                          height: p.h,
                          animationDelay: `${p.delay}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute inset-0 rounded-t-[inherit] opacity-55"
                  style={{
                    background:
                      "linear-gradient(102deg, transparent 38%, rgba(255,255,255,0.45) 49.5%, rgba(240,248,255,0.25) 50.5%, rgba(255,255,255,0.1) 51.5%, transparent 62%)",
                    mixBlendMode: "overlay",
                  }}
                />
              </div>
            </div>

            <motion.p
              className={cn(
                "max-w-[min(32rem,92vw)] text-[clamp(1.05rem,3.5vw,1.32rem)] font-medium leading-[2.25] tracking-[0.11em] text-[#fdf6f8]",
                fontSerif,
              )}
              style={{
                textShadow:
                  "0 0 40px rgba(248,210,220,0.5), 0 0 80px rgba(220,230,245,0.22), 0 2px 20px rgba(0,0,0,0.35)",
              }}
              initial={{ opacity: 0, filter: "blur(12px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 3.15, delay: 0.2, ease: easeLux }}
            >
              {main}
            </motion.p>
            <motion.p
              className={cn(
                "mt-9 max-w-[min(28rem,90vw)] text-[12.5px] leading-[2.2] tracking-[0.055em] text-white/[0.55] sm:text-[13.5px]",
                fontBody,
              )}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.35, delay: 1.65, ease: easeLux }}
            >
              {sub}
            </motion.p>
          </motion.div>
        ) : null}

        {showParadox ? (
          <div className="flex flex-col items-center gap-12">
            <motion.p
              className={cn(
                "max-w-[20rem] text-[clamp(1.15rem,4vw,1.55rem)] font-medium leading-[2.1] tracking-[0.14em] text-[#fafcff]",
                fontSerif,
              )}
              style={{
                textShadow:
                  "0 0 36px rgba(255,252,248,0.55), 0 0 72px rgba(230,238,255,0.22), 0 2px 20px rgba(0,0,0,0.35)",
              }}
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.05, ease: easeLux }}
            >
              {pA}
            </motion.p>
            <motion.p
              className={cn(
                "max-w-[22rem] text-[clamp(1.05rem,3.4vw,1.35rem)] font-medium leading-[2.05] tracking-[0.12em] text-[#f6f8fc]",
                fontSerif,
              )}
              style={{
                textShadow:
                  "0 0 32px rgba(255,255,255,0.45), 0 0 64px rgba(220,230,245,0.18)",
              }}
              initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.95, ease: easeLux }}
            >
              {pB}
            </motion.p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
