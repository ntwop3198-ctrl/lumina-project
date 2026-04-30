"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useLayoutEffect, useState } from "react"
import { GlobalHeaderBilingual } from "@/components/landing/global-header-bilingual"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  PARTNER_COVENANT,
  type PartnerPrincipleId,
} from "@/lib/lumina/partner-covenant-content"
import { cn } from "@/lib/utils"

const fontSerif =
  "font-['Nanum_Myeongjo','Noto_Serif_KR',var(--font-serif),Georgia,serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

export function PartnerGuideView() {
  const { lang } = useLuminaLanguage()
  const isKo = lang === "ko"
  const reduceMotion = useReducedMotion()
  const copy = isKo ? PARTNER_COVENANT.ko : PARTNER_COVENANT.en
  const [atmosphereRevealed, setAtmosphereRevealed] = useState(false)
  /** 기본으로 두 번째 행(求苦) 깊은 뜻을 펼침 */
  const [principleOpen, setPrincipleOpen] = useState<PartnerPrincipleId | null>(
    "kyugo",
  )

  useLayoutEffect(() => {
    if (reduceMotion) setAtmosphereRevealed(true)
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion) return
    const id = window.setTimeout(() => setAtmosphereRevealed(true), 400)
    return () => window.clearTimeout(id)
  }, [reduceMotion])

  const active = copy.principles.find((p) => p.id === principleOpen)

  return (
    <div
      className={cn(
        "lumina-midnight-landing lumina-midnight-atmosphere-root lumina-partner-guide-shell relative min-h-screen",
        atmosphereRevealed && "lumina-morning-revealed",
      )}
    >
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="lumina-midnight-atmosphere-base absolute inset-0" />
        <div
          className={cn(
            "lumina-morning-storm-layer absolute inset-0",
            atmosphereRevealed && "lumina-morning-storm-layer--cleared",
          )}
        />
      </div>

      <div className="relative z-[1] min-h-screen">
        <GlobalHeaderBilingual variant="midnight" />

        <main className="mx-auto max-w-[1600px] px-6 pb-28 pt-[max(7rem,env(safe-area-inset-top,0px))] sm:px-10 md:px-14 lg:px-20">
          <div className="relative grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-6">
            <div className="relative lg:col-span-7">
              {atmosphereRevealed && !reduceMotion ? (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute -left-6 -top-8 right-0 h-[min(36vh,300px)] overflow-hidden sm:-left-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                >
                  <motion.div
                    className="absolute inset-0 origin-top bg-gradient-to-b from-white/[0.14] via-white/[0.04] to-transparent"
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1.25, ease: easeLux, delay: 0.12 }}
                  />
                </motion.div>
              ) : null}

              <header className="relative pt-6 text-left">
                <p
                  className={cn(
                    "mb-8 text-[10px] tracking-[0.38em] text-liquid-silver/55",
                    fontBody,
                  )}
                >
                  {copy.pageEyebrow}
                </p>
                <h1
                  className={cn(
                    "max-w-[20ch] text-[clamp(2rem,5.5vw,3.25rem)] font-medium leading-[1.22] tracking-[0.02em] text-white",
                    fontSerif,
                  )}
                >
                  {copy.pageTitle}
                </h1>
                <p
                  className={cn(
                    "mt-8 max-w-xl text-[13px] leading-[2.1] tracking-[0.14em] text-white/45 sm:text-[14px]",
                    fontBody,
                  )}
                >
                  {copy.pageSubtitle}
                </p>
              </header>

              <section className="relative mt-24 max-w-xl border-t border-white/[0.07] pt-20 text-left">
                <h2
                  className={cn(
                    "text-[clamp(1.35rem,3.2vw,1.85rem)] font-medium leading-snug tracking-[0.06em] text-[#f0f4f8]",
                    fontSerif,
                  )}
                >
                  {copy.welcomeTitle}
                </h2>
                <p
                  className={cn(
                    "mt-10 text-[14px] leading-[2.15] tracking-[0.1em] text-white/58 sm:text-[15px]",
                    fontBody,
                  )}
                >
                  {copy.welcomeLead}
                </p>
                {copy.welcomeBody.map((para, i) => (
                  <p
                    key={i}
                    className={cn(
                      "mt-8 text-[15px] leading-[2.25] tracking-[0.06em] text-white/72 sm:text-[16px]",
                      fontBody,
                    )}
                  >
                    {para}
                  </p>
                ))}
              </section>

              <section className="relative mt-28 max-w-2xl border-t border-white/[0.07] pt-20 text-left">
                <h2
                  className={cn(
                    "text-[1.15rem] tracking-[0.2em] text-white/88 sm:text-[1.25rem]",
                    fontSerif,
                  )}
                >
                  {copy.principlesTitle}
                </h2>
                <p
                  className={cn(
                    "mt-6 w-full max-w-2xl text-[13px] leading-[2] tracking-[0.08em] text-white/62 [word-break:keep-all]",
                    "md:whitespace-nowrap md:leading-[1.85]",
                    fontBody,
                  )}
                >
                  {isKo ? (
                    (() => {
                      const s = copy.principlesIntro
                      const tail = "펼칩니다."
                      const i = s.lastIndexOf(tail)
                      if (i < 0) return s
                      return (
                        <>
                          {s.slice(0, i)}
                          <span className="whitespace-nowrap">{tail}</span>
                        </>
                      )
                    })()
                  ) : (
                    copy.principlesIntro
                  )}
                </p>
                <p
                  className={cn(
                    "mt-4 text-[11px] tracking-[0.18em] text-[#9eb0c8]",
                    fontBody,
                  )}
                >
                  {copy.tableHint}
                </p>

                <div
                  className="mt-10 border border-white/[0.14] bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(6,12,22,0.92)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  role="table"
                  aria-label={copy.principlesTitle}
                >
                  <div
                    className={cn(
                      "grid grid-cols-12 gap-2 border-b border-white/[0.12] px-4 py-3 text-[10px] tracking-[0.28em] text-[#b4c2d4] sm:px-5",
                      fontBody,
                    )}
                    role="row"
                  >
                    <div className="col-span-12 sm:col-span-2" role="columnheader">
                      {copy.principlesTable.colRule}
                    </div>
                    <div className="col-span-12 sm:col-span-4" role="columnheader">
                      {copy.principlesTable.colCore}
                    </div>
                    <div className="col-span-12 sm:col-span-6" role="columnheader">
                      {copy.principlesTable.colGain}
                    </div>
                  </div>
                  {copy.principles.map((row) => {
                    const isActive = principleOpen === row.id
                    return (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => setPrincipleOpen(row.id)}
                      className={cn(
                        "group grid w-full grid-cols-12 gap-2 border-b border-white/[0.08] border-l-2 px-4 py-5 text-left transition-colors last:border-b-0 sm:px-5 sm:py-6",
                        isActive
                          ? "border-l-[#d4af37]/70 bg-white/[0.09] shadow-[0_0_32px_rgba(212,175,55,0.07)]"
                          : "border-l-transparent hover:bg-white/[0.05]",
                        "focus-visible:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-liquid-silver/40",
                        fontBody,
                      )}
                    >
                      <div
                        className={cn(
                          "col-span-12 text-[13px] tracking-[0.12em] sm:col-span-2 sm:text-[12px]",
                          fontSerif,
                          isActive ? "text-[#f2f6fc]" : "text-[#c8d4e4]",
                        )}
                      >
                        {row.rule}
                      </div>
                      <div
                        className={cn(
                          "col-span-12 text-[14px] leading-[1.75] tracking-[0.07em] sm:col-span-4",
                          isActive ? "text-white" : "text-white/92",
                        )}
                      >
                        {row.core}
                      </div>
                      <div
                        className={cn(
                          "col-span-12 text-[13px] leading-[1.85] tracking-[0.055em] sm:col-span-6 sm:pt-0.5",
                          isActive ? "text-[#dce8f4]" : "text-white/72",
                        )}
                      >
                        {row.gain}
                        <span
                          className={cn(
                            "mt-2 block text-[10px] tracking-[0.22em] transition-opacity sm:mt-3",
                            isActive
                              ? "text-[#d4af37]/80 opacity-100"
                              : "text-liquid-silver/45 opacity-0 group-hover:opacity-100",
                          )}
                        >
                          {isKo ? "자세히" : "More"}
                        </span>
                      </div>
                    </button>
                    )
                  })}
                </div>
              </section>

              <section className="relative mt-28 max-w-xl border-t border-white/[0.07] pt-20 text-left">
                <h2
                  className={cn(
                    "text-[1.15rem] tracking-[0.18em] text-white/88 sm:text-[1.25rem]",
                    fontSerif,
                  )}
                >
                  {copy.roadmapTitle}
                </h2>
                <p
                  className={cn(
                    "mt-4 text-[12px] tracking-[0.32em] text-liquid-silver/50",
                    fontBody,
                  )}
                >
                  {copy.roadmapSubtitle}
                </p>
                <p
                  className={cn(
                    "mt-8 text-[13px] leading-[2] tracking-[0.08em] text-white/48",
                    fontBody,
                  )}
                >
                  {copy.roadmapIntro}
                </p>
                <ol className="mt-14 space-y-14">
                  {copy.roadmap.map((step) => (
                    <li key={step.phase}>
                      <p
                        className={cn(
                          "text-[11px] tracking-[0.26em] text-liquid-silver/55",
                          fontBody,
                        )}
                      >
                        {step.phase}
                      </p>
                      <p
                        className={cn(
                          "mt-4 text-[1.05rem] tracking-[0.08em] text-white/92",
                          fontSerif,
                        )}
                      >
                        {step.name}
                      </p>
                      <p
                        className={cn(
                          "mt-5 text-[14px] leading-[2.1] tracking-[0.06em] text-white/62",
                          fontBody,
                        )}
                      >
                        {step.detail}
                      </p>
                      <p
                        className={cn(
                          "mt-5 border-l border-liquid-silver/25 pl-5 text-[13px] leading-[2] tracking-[0.055em] text-white/48",
                          fontBody,
                        )}
                      >
                        {step.outcome}
                      </p>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="relative mt-28 max-w-xl border-t border-white/[0.07] pt-20 text-left">
                <h2
                  className={cn(
                    "text-[1.15rem] tracking-[0.16em] text-white/88 sm:text-[1.25rem]",
                    fontSerif,
                  )}
                >
                  {copy.benefitsTitle}
                </h2>
                <ul className="mt-12 space-y-10">
                  {copy.benefits.map((b) => (
                    <li key={b.title}>
                      <p
                        className={cn(
                          "text-[15px] font-medium tracking-[0.08em] text-white/90",
                          fontSerif,
                        )}
                      >
                        {b.title}
                      </p>
                      <p
                        className={cn(
                          "mt-3 text-[14px] leading-[2.05] tracking-[0.055em] text-white/55",
                          fontBody,
                        )}
                      >
                        {b.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="relative mt-32 max-w-xl border-t border-white/[0.07] pt-16 text-left">
                <Link
                  href="/pricing?ref=genesis-partner"
                  className={cn(
                    "lumina-partner-star-cta inline-flex min-h-[52px] min-w-[240px] items-center justify-center rounded-full border border-white/[0.18] bg-white/[0.04] px-12 py-3.5 text-[13px] font-medium tracking-[0.2em] text-[#e8eef5] transition-shadow duration-500",
                    fontBody,
                  )}
                >
                  {copy.ctaLabel}
                </Link>
                <p
                  className={cn(
                    "mt-6 text-[12px] leading-[1.9] tracking-[0.08em] text-white/38",
                    fontBody,
                  )}
                >
                  {copy.ctaHint}
                </p>
              </div>
            </div>

            <div
              className="hidden min-h-[40vh] lg:col-span-5 lg:block"
              aria-hidden
            />
          </div>
        </main>
      </div>

      <Dialog
        open={principleOpen !== null}
        onOpenChange={(open) => {
          if (!open) setPrincipleOpen(null)
        }}
      >
        <DialogContent
          overlayClassName="z-[100] bg-black/80 backdrop-blur-[6px]"
          className={cn(
            "z-[101] max-h-[min(88vh,640px)] overflow-y-auto border border-white/[0.12] bg-[#050a12]/96 p-8 text-white shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:max-w-lg",
            fontBody,
          )}
        >
          {active ? (
            <>
              <DialogHeader className="space-y-0 text-left">
                <DialogTitle
                  className={cn(
                    "text-left text-[1.1rem] font-medium leading-snug tracking-[0.1em] text-white",
                    fontSerif,
                  )}
                >
                  {active.deepTitle}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  {active.deepBody.join(" ")}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-8 space-y-6">
                {active.deepBody.map((p, i) => (
                  <p
                    key={i}
                    className="text-[14px] leading-[2.1] tracking-[0.055em] text-white/68"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  )
}
