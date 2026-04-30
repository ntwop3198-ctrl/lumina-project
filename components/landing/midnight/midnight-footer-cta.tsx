"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  BrandSoulReturnLink,
  useBrandSoulChoice,
} from "@/components/providers/brand-soul-choice-provider"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  LUMINA_CONSTITUTION_ARTICLE_1_EN,
  LUMINA_CONSTITUTION_ARTICLE_1_KO,
  LUMINA_FINALE_BODY_LINE_1_EN,
  LUMINA_FINALE_BODY_LINE_1_KO,
  LUMINA_FINALE_BODY_LINE_2_EN,
  LUMINA_FINALE_BODY_LINE_2_KO,
  LUMINA_FINALE_HEADLINE_EN,
  LUMINA_FINALE_HEADLINE_KO,
  LUMINA_TRUTH_COVENANT_ACK_EN,
  LUMINA_TRUTH_COVENANT_ACK_KO,
  LUMINA_TRUTH_COVENANT_CTA_EN,
  LUMINA_TRUTH_COVENANT_CTA_KO,
} from "@/lib/lumina/law-of-essential-beauty-copy"
import {
  LUMINA_SOUL_RETURN_PATH_BODY_EN,
  LUMINA_SOUL_RETURN_PATH_BODY_KO,
} from "@/lib/lumina/choice-of-soul"
import { tryLuminaCovenantHaptic } from "@/lib/lumina/lumina-covenant-haptic"
import { cn } from "@/lib/utils"

const fontHead = "font-['Nanum_Myeongjo',var(--font-serif),serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

const COVENANT_NAV_MS = 2200
const COVENANT_NAV_MS_REDUCED = 450

export function MidnightFooterCta() {
  const router = useRouter()
  const { lang } = useLuminaLanguage()
  const { isConventional } = useBrandSoulChoice()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()
  const [covenantAck, setCovenantAck] = useState(false)
  const navTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const covenantNavLock = useRef(false)

  const clearNavTimer = useCallback(() => {
    if (navTimerRef.current != null) {
      clearTimeout(navTimerRef.current)
      navTimerRef.current = null
    }
  }, [])

  useEffect(() => () => clearNavTimer(), [clearNavTimer])

  const onCovenantClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      if (covenantNavLock.current) {
        e.preventDefault()
        return
      }
      e.preventDefault()
      covenantNavLock.current = true
      setCovenantAck(true)
      if (!reduceMotion) tryLuminaCovenantHaptic()
      clearNavTimer()
      const ms = reduceMotion ? COVENANT_NAV_MS_REDUCED : COVENANT_NAV_MS
      navTimerRef.current = setTimeout(() => {
        navTimerRef.current = null
        router.push("/brand-genesis")
      }, ms)
    },
    [clearNavTimer, reduceMotion, router],
  )

  return (
    <footer className="border-t border-white/[0.07] px-5 py-20 sm:px-8 md:px-10 lg:px-12">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: easeLux }}
        >
          <p
            className={cn(
              "mx-auto mb-10 max-w-2xl text-[0.78rem] leading-[2] tracking-[0.055em] text-[#b8c6d6] sm:text-[0.82rem]",
              fontHead,
            )}
            style={{
              textShadow: "0 0 28px rgba(180,195,210,0.15)",
            }}
          >
            {isKo ? LUMINA_CONSTITUTION_ARTICLE_1_KO : LUMINA_CONSTITUTION_ARTICLE_1_EN}
          </p>
          <div className="mx-auto mb-14 max-w-xl border-t border-white/[0.08] pt-10">
            <p className={cn("text-[1.05rem] leading-[1.75] text-white/88 sm:text-[1.12rem]", fontHead)}>
              {isKo ? LUMINA_FINALE_HEADLINE_KO : LUMINA_FINALE_HEADLINE_EN}
            </p>
            <p className={cn("mt-6 text-[13px] leading-[2] text-white/52 sm:text-[14px]", fontBody)}>
              {isKo ? LUMINA_FINALE_BODY_LINE_1_KO : LUMINA_FINALE_BODY_LINE_1_EN}
            </p>
            <p className={cn("mt-3 text-[13px] leading-[2] text-white/52 sm:text-[14px]", fontBody)}>
              {isKo ? LUMINA_FINALE_BODY_LINE_2_KO : LUMINA_FINALE_BODY_LINE_2_EN}
            </p>
          </div>
          <p
            className={cn(
              "mb-4 text-[11px] tracking-[0.28em] text-liquid-silver/65",
              fontBody,
            )}
          >
            CONVICTION
          </p>
          <h2
            className={cn(
              "text-[1.35rem] text-white sm:text-[1.55rem]",
              fontHead,
            )}
          >
            {isKo ? "당신만의 명품 브랜딩을 시작하세요." : "Begin your own luxury branding."}
          </h2>
          <p className={cn("mx-auto mt-4 max-w-lg text-[12px] leading-[1.95] text-[#d9e2ec]/88 sm:text-[13px]", fontBody)}>
            {isKo
              ? "루미나는 설득보다 실천으로 확신을 만듭니다."
              : "Lumina builds conviction through practice, not persuasion."}
          </p>
          <p className={cn("mx-auto mt-5 max-w-lg text-[15px] leading-relaxed text-white/58", fontBody)}>
            {isKo
              ? "확신을 시장 언어로 번역하는 순간, 루미나가 함께합니다."
              : "The moment conviction becomes market language, Lumina is with you."}
          </p>

          {isConventional ? (
            <div
              id="lumina-return-path-dashboard"
              className="mx-auto mt-10 max-w-lg rounded-none border border-[#a855f7]/20 bg-[#120818]/40 px-5 py-4 text-left"
            >
              <p className={cn("text-[11px] leading-[1.85] text-white/55", fontBody)}>
                {isKo ? LUMINA_SOUL_RETURN_PATH_BODY_KO : LUMINA_SOUL_RETURN_PATH_BODY_EN}
              </p>
              <div className="mt-3">
                <BrandSoulReturnLink className="inline-block" />
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex flex-col items-center gap-5">
            <Link
              href="/brand-genesis"
              onClick={onCovenantClick}
              className={cn(
                "lumina-origin-card-light group mx-auto block w-full max-w-xl rounded-none px-6 py-8 text-center sm:px-10 sm:py-9",
                "border-neutral-300/90 bg-white transition-[box-shadow] duration-500",
                "hover:shadow-[0_0_0_1px_rgba(10,22,40,0.14)_inset]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-liquid-silver/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#112240]",
                covenantAck && "pointer-events-none opacity-90",
              )}
            >
              <span
                className={cn(
                  fontHead,
                  "block text-[0.92rem] font-medium leading-[1.9] text-neutral-800 sm:text-[1.02rem]",
                  "tracking-[0.1em] sm:tracking-[0.14em]",
                  "transition-[color,text-shadow] duration-500 ease-out",
                  "group-hover:text-[#0a1628]",
                  "group-hover:[text-shadow:0_0_22px_rgba(17,34,64,0.12),0_0_1px_rgba(10,22,40,0.25)]",
                )}
              >
                {isKo ? LUMINA_TRUTH_COVENANT_CTA_KO : LUMINA_TRUTH_COVENANT_CTA_EN}
              </span>
            </Link>
            {covenantAck ? (
              <p
                role="status"
                aria-live="polite"
                className={cn(
                  "max-w-xl px-2 text-center text-[0.82rem] leading-[1.85] text-[#c8d4e4]/88 sm:text-[0.88rem]",
                  "motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500",
                  fontHead,
                )}
                style={{
                  textShadow: "0 0 20px rgba(180,195,210,0.12)",
                }}
              >
                {isKo ? LUMINA_TRUTH_COVENANT_ACK_KO : LUMINA_TRUTH_COVENANT_ACK_EN}
              </p>
            ) : null}
            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link
                href="/pricing"
                className={cn(
                  "text-[14px] font-semibold text-[#dce6f0] antialiased [text-rendering:optimizeLegibility] underline-offset-8 transition-colors hover:text-white",
                  fontBody,
                )}
              >
                {isKo ? "요금제 보기" : "View pricing"}
              </Link>
              <Link
                href="/partner-guide"
                className={cn(
                  "text-[14px] font-semibold text-[#c5d4e4] antialiased [text-rendering:optimizeLegibility] underline-offset-8 transition-colors hover:text-white",
                  fontBody,
                )}
              >
                {isKo ? "파트너 가이드" : "Partner guide"}
              </Link>
              <Link
                href="/knowledge-engine/plan"
                className={cn(
                  "text-[14px] font-semibold text-[#c5d4e4] antialiased [text-rendering:optimizeLegibility] underline-offset-8 transition-colors hover:text-white",
                  fontBody,
                )}
              >
                {isKo ? "상세기획서 초안" : "Planning draft"}
              </Link>
            </div>
          </div>
        </motion.div>

        <div
          className={cn(
            "mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/[0.1] pt-10 text-[13px] text-[#b8c9d9] antialiased [text-rendering:optimizeLegibility] sm:flex-row sm:text-[13px]",
            fontBody,
          )}
        >
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded border border-liquid-silver/45 bg-white/[0.06] text-[11px] font-bold tracking-tighter text-[#e2eaf2]">
              L
            </span>
            <span className="font-semibold tracking-[0.22em] text-[#e8eef5]">LUMINA</span>
          </div>
          <p className="font-medium text-[#c4d2e0]">
            {isKo ? "© 루미나. 모든 권리 보유." : "© Lumina. All rights reserved."}
          </p>
          <div className="flex gap-7 font-medium">
            <Link
              href="/partner-guide"
              className="text-[#b8c9d9] transition-colors hover:text-[#e8eef5]"
            >
              {isKo ? "개인정보" : "Privacy"}
            </Link>
            <Link
              href="/pricing"
              className="text-[#b8c9d9] transition-colors hover:text-[#e8eef5]"
            >
              {isKo ? "약관" : "Terms"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
