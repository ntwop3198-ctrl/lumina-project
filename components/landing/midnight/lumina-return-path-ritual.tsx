"use client"

import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"
import {
  LUMINA_ESSENCE_ALCHEMIST_CTA_EN,
  LUMINA_ESSENCE_ALCHEMIST_CTA_KO,
  LUMINA_ESSENCE_ALCHEMIST_TEASER_EN,
  LUMINA_ESSENCE_ALCHEMIST_TEASER_KO,
  LUMINA_REBIRTH_COMPASSION_LINE_EN,
  LUMINA_REBIRTH_COMPASSION_LINE_KO,
  LUMINA_REBIRTH_SMS_BODY_EN,
  LUMINA_REBIRTH_SMS_BODY_KO,
  LUMINA_REBIRTH_SMS_NOTE_EN,
  LUMINA_REBIRTH_SMS_NOTE_KO,
  LUMINA_REBIRTH_WELCOME_PRIMARY_EN,
  LUMINA_REBIRTH_WELCOME_PRIMARY_KO,
  LUMINA_RETURN_RITUAL_ARIA_LABEL_EN,
  LUMINA_RETURN_RITUAL_ARIA_LABEL_KO,
  LUMINA_RETURN_RITUAL_CONTINUE_EN,
  LUMINA_RETURN_RITUAL_CONTINUE_KO,
} from "@/lib/lumina/return-path-rebirth-copy"

const fontSerif =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

type RitualPhase = "off" | "dim" | "dawn" | "message"

export function LuminaReturnPathRitual({
  active,
  onComplete,
}: {
  active: boolean
  onComplete: () => void
}) {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<RitualPhase>("off")

  useEffect(() => {
    if (!active) {
      setPhase("off")
      return
    }
    if (reduceMotion) {
      setPhase("message")
      return
    }
    setPhase("dim")
    const tDawn = window.setTimeout(() => setPhase("dawn"), 520)
    const tMsg = window.setTimeout(() => setPhase("message"), 520 + 480)
    return () => {
      window.clearTimeout(tDawn)
      window.clearTimeout(tMsg)
    }
  }, [active, reduceMotion])

  const visible = active && phase !== "off"

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={isKo ? LUMINA_RETURN_RITUAL_ARIA_LABEL_KO : LUMINA_RETURN_RITUAL_ARIA_LABEL_EN}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[285] flex items-center justify-center"
        >
          {phase === "dim" ? (
            <motion.div
              className="absolute inset-0 bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: easeLux }}
              aria-hidden
            />
          ) : null}

          {(phase === "dawn" || phase === "message") && !reduceMotion ? (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.55, ease: easeLux }}
              style={{
                background: `radial-gradient(ellipse 90% 70% at 50% 18%, rgba(255,228,236,0.35) 0%, rgba(14,53,96,0.55) 38%, #00040d 72%, #000000 100%)`,
              }}
              aria-hidden
            />
          ) : null}

          {phase === "message" ? (
            <motion.div
              className="relative z-[1] mx-auto max-w-lg px-6 text-center"
              initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.65, ease: easeLux }}
            >
              <p
                className={cn(
                  "text-[10px] uppercase tracking-[0.3em] text-[#f5d0dc]/75",
                  fontBody,
                )}
              >
                LUMINA · REBIRTH
              </p>
              <p className={cn("mt-5 text-[1.05rem] leading-[1.85] text-[#fdf6f8] sm:text-[1.12rem]", fontSerif)}>
                {isKo ? LUMINA_REBIRTH_COMPASSION_LINE_KO : LUMINA_REBIRTH_COMPASSION_LINE_EN}
              </p>
              <p
                className={cn(
                  "mt-6 text-[0.95rem] leading-[2] tracking-[0.04em] text-white/88 sm:text-[1.02rem]",
                  fontSerif,
                )}
                style={{
                  textShadow: "0 0 36px rgba(248,210,220,0.35), 0 0 72px rgba(200,220,245,0.12)",
                }}
              >
                {isKo ? LUMINA_REBIRTH_WELCOME_PRIMARY_KO : LUMINA_REBIRTH_WELCOME_PRIMARY_EN}
              </p>

              <div
                className={cn(
                  "mt-8 rounded-none border border-white/[0.12] bg-black/35 px-4 py-3 text-left text-[10.5px] leading-relaxed text-white/55 sm:text-[11px]",
                  fontBody,
                )}
              >
                <p className="font-medium text-white/65">
                  {isKo ? "알림 미리보기" : "Notification preview"}
                </p>
                <p className="mt-2 text-white/50">
                  {isKo ? LUMINA_REBIRTH_SMS_BODY_KO : LUMINA_REBIRTH_SMS_BODY_EN}
                </p>
                <p className="mt-2 text-white/38">
                  {isKo ? LUMINA_REBIRTH_SMS_NOTE_KO : LUMINA_REBIRTH_SMS_NOTE_EN}
                </p>
              </div>

              <p className={cn("mt-6 text-[11px] leading-[1.75] text-white/48", fontBody)}>
                {isKo ? LUMINA_ESSENCE_ALCHEMIST_TEASER_KO : LUMINA_ESSENCE_ALCHEMIST_TEASER_EN}
              </p>

              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="#alchemist-engine"
                  className={cn(
                    "inline-flex min-h-[44px] items-center justify-center rounded-full border border-[#f5c4d4]/40 px-6 py-2.5 text-[12px] text-[#fce7f3] transition-colors hover:bg-white/[0.06]",
                    fontBody,
                  )}
                  onClick={() => onComplete()}
                >
                  {isKo ? LUMINA_ESSENCE_ALCHEMIST_CTA_KO : LUMINA_ESSENCE_ALCHEMIST_CTA_EN}
                </a>
                <button
                  type="button"
                  onClick={() => onComplete()}
                  className={cn(
                    "inline-flex min-h-[44px] items-center justify-center rounded-full bg-gradient-to-r from-[#f8e8ee]/95 to-[#c0d4e8]/90 px-7 py-2.5 text-[12px] font-semibold text-[#0a1628] transition-opacity hover:opacity-95",
                    fontBody,
                  )}
                >
                  {isKo ? LUMINA_RETURN_RITUAL_CONTINUE_KO : LUMINA_RETURN_RITUAL_CONTINUE_EN}
                </button>
              </div>
            </motion.div>
          ) : null}
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
