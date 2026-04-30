"use client"

import { useEffect, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import { cn } from "@/lib/utils"

const fontHead = "font-['Nanum_Myeongjo',var(--font-serif),serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

type PioneerPayload = {
  remainingSlots: number
  totalSlots: number
  discountPercent: number
  updatedAt: string
}

type FreemiumPayload = {
  essence: {
    unlimitedFree: boolean
    freeUsesCap: number
    lumiPerUseIfPaid: number
  }
  essenceUsesRemaining: number | null
}

const copy = {
  ko: {
    eyebrow: "Lumina 1000 · Genesis Alliance",
    headline: "문턱은 땅바닥에, 감동은 하늘 끝까지",
    pioneerTitle: "Pioneer 100 — Genesis 90% 할인",
    pioneerSub: "선착순 브랜드 슬롯 실시간 현황",
    slotsLabel: "잔여 슬롯",
    totalLabel: "전체",
    essenceTitle: "The Free Essence",
    essenceSub: "1단계(Essence) 렌더 — 가입 직후 체감 가능한 무료 크레딧",
    essenceUnlimited: "Tier 1 무제한 무료 운영 중",
    essenceMeter: (n: number) => `남은 무료 횟수: ${n}회`,
    shareTitle: "Success-Share",
    shareSub: "쇼핑몰 매출 연동 API로 1–3% 정산 — 파트너 정산 모듈 기초 연동 가능",
    tagline:
      "당신의 브랜드가 빛나지 않는다면, 루미나는 단 1원도 받지 않겠습니다. 우리는 당신의 성공 위에 집을 짓습니다.",
  },
  en: {
    eyebrow: "Lumina 1000 · Genesis Alliance",
    headline: "Zero floor. Sky-high delight.",
    pioneerTitle: "Pioneer 100 — 90% off Genesis",
    pioneerSub: "Live remaining slots for founding brands",
    slotsLabel: "Slots left",
    totalLabel: "Total",
    essenceTitle: "The Free Essence",
    essenceSub: "Tier 1 (Essence) render — free credits so the first result lands instantly",
    essenceUnlimited: "Tier 1 unlimited free mode is on",
    essenceMeter: (n: number) => `Free uses left: ${n}`,
    shareTitle: "Success-Share",
    shareSub: "Shop revenue API → 1–3% settlement. Foundation for partner ledger is live.",
    tagline:
      "If your brand doesn’t shine, Lumina won’t take a won. We build our house on your success.",
  },
} as const

export function GenesisAlliancePromoSection() {
  const { lang } = useLuminaLanguage()
  const reduceMotion = useReducedMotion()
  const t = lang === "ko" ? copy.ko : copy.en
  const [pioneer, setPioneer] = useState<PioneerPayload | null>(null)
  const [freemium, setFreemium] = useState<FreemiumPayload | null>(null)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    const demoUser =
      typeof window !== "undefined"
        ? process.env.NEXT_PUBLIC_LUMINA_DEMO_USER_ID?.trim()
        : undefined
    const q = demoUser ? `?userId=${encodeURIComponent(demoUser)}` : ""

    void (async () => {
      try {
        const [pRes, fRes] = await Promise.all([
          fetch("/api/promotion/pioneer-slots", { cache: "no-store" }),
          fetch(`/api/promotion/freemium-status${q}`, { cache: "no-store" }),
        ])
        if (!pRes.ok) throw new Error(`pioneer ${pRes.status}`)
        if (!fRes.ok) throw new Error(`freemium ${fRes.status}`)
        const pJson = (await pRes.json()) as PioneerPayload
        const fJson = (await fRes.json()) as FreemiumPayload
        if (!cancelled) {
          setPioneer(pJson)
          setFreemium(fJson)
          setErr(null)
        }
      } catch (e) {
        if (!cancelled) setErr(e instanceof Error ? e.message : "load failed")
      }
    })()

    const id = setInterval(() => {
      void fetch("/api/promotion/pioneer-slots", { cache: "no-store" })
        .then((r) => r.json())
        .then((j: PioneerPayload) => {
          if (!cancelled) setPioneer(j)
        })
        .catch(() => {})
    }, 12_000)

    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  const remaining = pioneer?.remainingSlots ?? null
  const fillPct =
    pioneer && pioneer.totalSlots > 0
      ? Math.round((1 - remaining! / pioneer.totalSlots) * 100)
      : 0

  return (
    <section
      className={cn(
        "relative overflow-hidden border-y border-white/[0.07] bg-[#050508]",
        fontBody,
      )}
      aria-labelledby="genesis-alliance-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(180,200,255,0.12), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p
            className={cn(
              "mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-slate-500",
              fontBody,
            )}
          >
            {t.eyebrow}
          </p>
          <h2
            id="genesis-alliance-heading"
            className={cn(
              "text-2xl tracking-tight text-slate-100 sm:text-3xl md:text-4xl",
              fontHead,
            )}
          >
            {t.headline}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
            {t.tagline}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <motion.div
            className="relative rounded-none border border-amber-500/25 bg-gradient-to-br from-amber-500/[0.07] to-transparent p-6 shadow-none"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: easeLux }}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-amber-200/80">
              {t.pioneerTitle}
            </p>
            <p className="mt-2 text-xs text-slate-400">{t.pioneerSub}</p>
            {err && (
              <p className="mt-4 text-xs text-red-300/90" role="status">
                {err}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-end gap-3">
              <motion.span
                className={cn("text-5xl font-semibold tabular-nums text-amber-100 sm:text-6xl", fontHead)}
                key={remaining ?? "—"}
                initial={reduceMotion ? false : { scale: 0.92, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                {remaining ?? "—"}
              </motion.span>
              <div className="pb-2 text-left text-xs text-slate-500">
                <div className="font-medium text-slate-300">{t.slotsLabel}</div>
                {pioneer != null && (
                  <div>
                    {t.totalLabel}: {pioneer.totalSlots} · −{pioneer.discountPercent}%
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-300"
                initial={{ width: 0 }}
                whileInView={{ width: `${fillPct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: easeLux }}
              />
            </div>
            <p className="mt-3 text-[0.65rem] text-slate-600">
              {pioneer?.updatedAt
                ? new Date(pioneer.updatedAt).toLocaleTimeString(
                    lang === "ko" ? "ko-KR" : "en-US",
                    { hour: "2-digit", minute: "2-digit", second: "2-digit" },
                  )
                : ""}
            </p>
          </motion.div>

          <motion.div
            className="rounded-none border border-white/[0.12] bg-white/[0.02] p-6"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.06, ease: easeLux }}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-sky-300/80">
              {t.essenceTitle}
            </p>
            <p className="mt-2 text-xs text-slate-400">{t.essenceSub}</p>
            <div className="mt-6 rounded-none border border-sky-500/20 bg-sky-500/[0.06] px-4 py-3 text-sm text-sky-100/90">
              {freemium?.essence.unlimitedFree
                ? t.essenceUnlimited
                : freemium?.essenceUsesRemaining != null
                  ? t.essenceMeter(freemium.essenceUsesRemaining)
                  : lang === "ko"
                    ? `기본 ${freemium?.essence.freeUsesCap ?? 10}회 무료 · 가입 후 즉시 Tier 1 체험`
                    : `${freemium?.essence.freeUsesCap ?? 10} free Tier 1 uses on signup`}
            </div>
          </motion.div>

          <motion.div
            className="rounded-none border border-white/[0.12] bg-white/[0.02] p-6"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12, ease: easeLux }}
          >
            <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-emerald-300/80">
              {t.shareTitle}
            </p>
            <p className="mt-2 text-xs text-slate-400">{t.shareSub}</p>
            <code className="mt-6 block rounded-none bg-black/40 px-3 py-2 text-[0.7rem] text-slate-500">
              POST /api/partners/revenue-share/report
            </code>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
