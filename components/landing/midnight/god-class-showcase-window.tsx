"use client"

import Image from "next/image"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useLuminaLanguage } from "@/components/providers/language-provider"
import { buildMasterPlanHref } from "@/lib/lumina/showcase-tiers"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const fontHead = "font-['Nanum_Myeongjo',var(--font-serif),serif]"
const fontBody = "font-['Pretendard',var(--font-sans),system-ui,sans-serif]"
const easeLux = [0.22, 1, 0.36, 1] as const

/** 가격 등급 라벨 — 티어별 고유 톤(다크 배경 가독성 유지) */
const PRICE_TIER_LABEL_CLASS: Record<string, string> = {
  Starter: "text-[#94A3B8]",
  Standard: "text-[#7DD3FC]",
  Pro: "text-[#D4AF37]",
  Luxury: "text-[#E8C4A8]",
  Exclusive: "text-[#F5E6C8]",
}

function priceLabelClass(priceKey: string) {
  return cn(
    fontHead,
    "text-xs font-semibold leading-none tracking-[0.03em]",
    "antialiased [text-rendering:optimizeLegibility]",
    PRICE_TIER_LABEL_CLASS[priceKey] ?? "text-[#D4AF37]",
  )
}

/** 설계 기준 합계 — 퍼센트로 환산해 w-full에서 동일 비율 유지 (가격 헤더 한 줄·본문 줄바꿈 여유) */
const TIER_COL_PX = 184
const VISUAL_COL_PX = 170
const LOGIC_COL_PX = 170
const PRICE_COL_PX = 176
const CTA_COL_PX = 248
const TIER_TABLE_TOTAL = TIER_COL_PX + VISUAL_COL_PX + LOGIC_COL_PX + PRICE_COL_PX + CTA_COL_PX

function colWidthPct(px: number) {
  return `${(px / TIER_TABLE_TOTAL) * 100}%`
}

/** 0..1 across five visual stops (continuous) */
type VisualStop = {
  contrast: number
  saturate: number
  grayscale: number
  brightness: number
  blurPx: number
  jewelMix: number
  fluidMix: number
}

const STOPS: VisualStop[] = [
  { contrast: 1.38, saturate: 0.78, grayscale: 0.42, brightness: 0.9, blurPx: 1.1, jewelMix: 0, fluidMix: 0 },
  { contrast: 1.1, saturate: 1.52, grayscale: 0, brightness: 1.06, blurPx: 0, jewelMix: 0, fluidMix: 0 },
  { contrast: 1.02, saturate: 1.04, grayscale: 0, brightness: 1, blurPx: 0, jewelMix: 0.06, fluidMix: 0 },
  { contrast: 1.08, saturate: 1.14, grayscale: 0, brightness: 1.03, blurPx: 0, jewelMix: 0.52, fluidMix: 0.12 },
  { contrast: 1.06, saturate: 1.18, grayscale: 0, brightness: 1.05, blurPx: 0, jewelMix: 0.72, fluidMix: 1 },
]

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function lerpStop(a: VisualStop, b: VisualStop, t: number): VisualStop {
  return {
    contrast: lerp(a.contrast, b.contrast, t),
    saturate: lerp(a.saturate, b.saturate, t),
    grayscale: lerp(a.grayscale, b.grayscale, t),
    brightness: lerp(a.brightness, b.brightness, t),
    blurPx: lerp(a.blurPx, b.blurPx, t),
    jewelMix: lerp(a.jewelMix, b.jewelMix, t),
    fluidMix: lerp(a.fluidMix, b.fluidMix, t),
  }
}

function stopAtProgress(p: number): VisualStop {
  const x = Math.min(1, Math.max(0, p)) * (STOPS.length - 1)
  const i = Math.min(STOPS.length - 2, Math.floor(x))
  const t = x - i
  return lerpStop(STOPS[i], STOPS[i + 1], t)
}

const PRODUCT_SRC =
  "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=1200&auto=format&fit=crop"

const TIERS = [
  { id: 1, nameKo: "에센스", nameEn: "Essence", priceKo: "Starter", priceEn: "Starter" },
  { id: 2, nameKo: "소셜", nameEn: "Social", priceKo: "Standard", priceEn: "Standard" },
  { id: 3, nameKo: "시그니처", nameEn: "Signature", priceKo: "Pro", priceEn: "Pro" },
  { id: 4, nameKo: "마스터피스", nameEn: "Masterpiece", priceKo: "Luxury", priceEn: "Luxury" },
  { id: 5, nameKo: "제네시스", nameEn: "Genesis", priceKo: "Exclusive", priceEn: "Exclusive" },
] as const

const copy = {
  ko: {
    eyebrow: "God-Class Showcase",
    title: "가격표 + 비주얼 쇼케이스 창구",
    sub: "슬라이더가 흐를수록 동일 제품이 스케치에서 신화로 변합니다. 마지막 구간에서는 첼로와 오라가 공명합니다.",
    sliderLabel: "티어 스펙트럼",
    genesisHint: "Genesis 구간 · 첼로 · 오라 입자",
    launchCta: "이 등급으로 업그레이드하기",
    roiTitle: "예상 ROI 리포트",
    roiDisclaimer: "본 수치는 루미나 내부 벤치마크·시뮬레이션을 바탕으로 한 참고용 예시이며, 실제 결과를 보장하지 않습니다.",
    roiClose: "확인",
    cols: ["티어", "시각적 정점", "전략 메커니즘", "가격 (Investment)"],
    visual: [
      "감각적 첫인상 · 고대비 · 화보 구도",
      "바이럴 생동감 · 숏폼 고채도",
      "정제된 권위 · 왜곡 없는 3D",
      "S급 Jewel-Tex · 미세 그림자",
      "God-Class · 유체·시선 공명",
    ],
    logic: [
      "언더프라미스: 기본형인데 이 정도?",
      "0.5초 미학으로 피드 정지",
      "자사몰 무결점 품격",
      "촉각 유도 — 만지고 싶은 질감",
      "브랜드 영혼을 새기는 마스터피스",
    ],
  },
  en: {
    eyebrow: "God-Class Showcase",
    title: "Pricing + visual showcase window",
    sub: "Drag the spectrum: one product moves from sketch to myth. In Genesis, cello resonance and aura particles answer your cursor.",
    sliderLabel: "Tier spectrum",
    genesisHint: "Genesis zone · cello · aura particles",
    launchCta: "Upgrade at this tier",
    roiTitle: "Estimated ROI report",
    roiDisclaimer:
      "Figures are illustrative benchmarks from Lumina simulations—not a guarantee of actual performance.",
    roiClose: "Done",
    cols: ["Tier", "Visual peak", "Strategic mechanism", "Price (Investment)"],
    visual: [
      "First impression · high contrast · editorial",
      "Viral vitality · short-form saturation",
      "Quiet authority · clean 3D truth",
      "Jewel-Tex S-grade · micro shadow",
      "God-Class · fluid & gaze resonance",
    ],
    logic: [
      "Under-promise shock: baseline this strong?",
      "0.5s aesthetics that stop the feed",
      "Flawless D2C presence",
      "Tactile desire — touchable texture",
      "A single myth carved for the brand soul",
    ],
  },
} as const

function roiLinesForTier(tierId: number, lang: "ko" | "en"): string[] {
  const base = 12 + tierId * 7
  const conv = 1.8 + tierId * 0.35
  const payback = Math.max(2, 9 - tierId)
  if (lang === "ko") {
    return [
      `브랜드 인지 리프트(12주): +${base}% ~ +${base + 14}% (모델 가정)`,
      `전환율 시나리오: 기준 대비 ×${conv.toFixed(2)} 배까지 시뮬레이션`,
      `손익분기까지 예상: 약 ${payback}~${payback + 4}주 (채널·SKU 가정)`,
    ]
  }
  return [
    `Brand lift (12w): +${base}%–+${base + 14}% (model assumption)`,
    `Conversion scenario: up to ×${conv.toFixed(2)} vs. baseline`,
    `Break-even horizon: ~${payback}–${payback + 4} weeks (channel/SKU assumptions)`,
  ]
}

type Particle = { x: number; y: number; vx: number; vy: number; life: number; r: number }

export function GodClassShowcaseWindow({ id = "god-showcase" }: { id?: string }) {
  const router = useRouter()
  const { lang } = useLuminaLanguage()
  const lg = lang === "ko" ? "ko" : "en"
  const c = copy[lg]
  const reduceMotion = useReducedMotion()

  const [progress, setProgress] = useState(0.42)
  const [roiOpen, setRoiOpen] = useState(false)
  const [roiTier, setRoiTier] = useState(1)

  const visual = useMemo(() => stopAtProgress(progress), [progress])
  const filterStr = useMemo(() => {
    return `contrast(${visual.contrast.toFixed(3)}) saturate(${visual.saturate.toFixed(3)}) grayscale(${visual.grayscale.toFixed(3)}) brightness(${visual.brightness.toFixed(3)}) blur(${visual.blurPx.toFixed(2)}px)`
  }, [visual])

  const genesisActive = progress >= 0.75 && !reduceMotion
  const activeTierIndex = Math.min(4, Math.round(progress * 4))

  const wrapRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef(0)

  const spawnParticle = useCallback((cx: number, cy: number) => {
    for (let i = 0; i < 3; i++) {
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        life: 1,
        r: 1.2 + Math.random() * 2.2,
      })
    }
  }, [])

  useEffect(() => {
    if (!genesisActive) {
      particlesRef.current = []
      return
    }
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx2 = canvas.getContext("2d")
    if (!ctx2) return

    const tick = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = Math.max(1, Math.floor(rect.width * dpr))
      const h = Math.max(1, Math.floor(rect.height * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      ctx2.clearRect(0, 0, w, h)
      const parts = particlesRef.current
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i]
        p.life -= 0.018
        p.x += p.vx * dpr
        p.y += p.vy * dpr
        p.vx *= 0.985
        p.vy *= 0.985
        if (p.life <= 0) {
          parts.splice(i, 1)
          continue
        }
        ctx2.beginPath()
        ctx2.fillStyle = `rgba(212,175,55,${p.life * 0.45})`
        ctx2.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2)
        ctx2.fill()
        ctx2.fillStyle = `rgba(248,250,252,${p.life * 0.2})`
        ctx2.beginPath()
        ctx2.arc(p.x - 0.4 * dpr, p.y - 0.4 * dpr, p.r * 0.35 * dpr, 0, Math.PI * 2)
        ctx2.fill()
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [genesisActive])

  const onPointerMove = (e: React.PointerEvent) => {
    if (!genesisActive || !wrapRef.current) return
    const rect = wrapRef.current.getBoundingClientRect()
    const dpr = Math.min(2, window.devicePixelRatio || 1)
    const x = (e.clientX - rect.left) * dpr
    const y = (e.clientY - rect.top) * dpr
    spawnParticle(x, y)
  }

  const goToTier = useCallback((tierIndex: number) => {
    const t = Math.min(4, Math.max(0, tierIndex))
    setProgress(t / 4)
  }, [])

  /** 상세(마스터) 기획서 — 결제 전에도 미리보기 진입 가능 */
  const navigateToMasterPlan = useCallback(
    (tierIndex: number) => {
      const t = Math.min(4, Math.max(0, tierIndex))
      goToTier(t)
      const tierId = TIERS[t].id
      router.push(buildMasterPlanHref(tierId))
    },
    [goToTier, router],
  )

  const openRoi = (tierId: number) => {
    setRoiTier(tierId)
    setRoiOpen(true)
  }

  const snapProgress = reduceMotion ? (ti: number) => setProgress(ti / 4) : undefined

  return (
    <section
      id={id}
      className={cn("relative border-t border-white/[0.08] bg-[#0a0a0c] py-20 md:py-28", fontBody)}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.07), transparent 55%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(148,163,184,0.06), transparent 50%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.65, ease: easeLux }}
          className="mb-10 md:mb-14"
        >
          <p className={cn("mb-2 text-[10px] font-medium uppercase tracking-[0.32em] text-[#C0C0C0]/90", fontBody)}>
            {c.eyebrow}
          </p>
          <h2 className={cn("text-2xl text-white/[0.96] sm:text-3xl md:text-[2rem] tracking-tight", fontHead)}>
            {c.title}
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/55">{c.sub}</p>
        </motion.div>

        <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1.5fr)] lg:items-stretch">
          <div className="flex min-h-0 w-full min-w-0 flex-col gap-6 lg:h-full">
            <div
              ref={wrapRef}
              onPointerMove={onPointerMove}
              className="relative aspect-[4/5] w-full min-h-[240px] overflow-hidden rounded-none border border-white/12 bg-black shadow-none lg:aspect-auto lg:min-h-0 lg:flex-1"
            >
              <Image
                src={PRODUCT_SRC}
                alt=""
                fill
                className="object-cover select-none"
                style={{ filter: filterStr }}
                sizes="(min-width: 1024px) 28vw, 100vw"
                priority={false}
                unoptimized
              />
              <div
                className="pointer-events-none absolute inset-0 mix-blend-screen"
                style={{
                  opacity: visual.jewelMix * 0.85,
                  background:
                    "radial-gradient(ellipse 70% 55% at 62% 38%, rgba(255,232,176,0.45), transparent 55%), repeating-linear-gradient(125deg, rgba(255,255,255,0.04) 0px, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 6px)",
                }}
                aria-hidden
              />
              <motion.div
                className="pointer-events-none absolute inset-0"
                animate={{
                  opacity: visual.fluidMix * (reduceMotion ? 0.35 : 0.55),
                  backgroundPosition: reduceMotion ? "50% 50%" : ["20% 30%", "80% 70%", "50% 40%", "20% 30%"],
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { duration: 14, repeat: Infinity, ease: "linear" }
                }
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 30% 20%, rgba(120,160,255,0.12), transparent 40%), radial-gradient(circle at 70% 80%, rgba(212,175,55,0.14), transparent 42%)",
                  backgroundSize: "140% 140%",
                }}
                aria-hidden
              />
              <canvas
                ref={canvasRef}
                className="pointer-events-none absolute inset-0 h-full w-full"
                aria-hidden
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4 md:p-5">
                <p
                  className={cn(
                    "text-[11px] font-extrabold uppercase leading-snug tracking-[0.2em] text-[#D4AF37] sm:text-xs",
                    fontHead,
                    "antialiased [text-rendering:optimizeLegibility]",
                  )}
                >
                  {TIERS[activeTierIndex][lg === "ko" ? "nameKo" : "nameEn"]} ·{" "}
                  {TIERS[activeTierIndex][lg === "ko" ? "priceKo" : "priceEn"]}
                </p>
                {genesisActive ? (
                  <p className="mt-1 text-[11px] text-white/50">{c.genesisHint}</p>
                ) : null}
              </div>
            </div>

            <div className="shrink-0">
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className={cn("text-[10px] uppercase tracking-[0.25em] text-white/45", fontBody)}>
                  {c.sliderLabel}
                </span>
                <span className="text-[11px] text-[#D4AF37]/90 tabular-nums">
                  {Math.round(progress * 100)}%
                </span>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-white/15 bg-black shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] sm:h-16 sm:w-16">
                  <Image
                    src={PRODUCT_SRC}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                    unoptimized
                  />
                </div>
                <div className="relative min-w-0 flex-1 py-2">
                  <div className="h-2.5 overflow-hidden rounded-full bg-white/[0.08] ring-1 ring-white/[0.06]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#8B6914] via-[#D4AF37] to-[#F2E8C8] shadow-[0_0_12px_rgba(212,175,55,0.35)] transition-[width] duration-150 ease-out"
                      style={{ width: `${progress * 100}%` }}
                      aria-hidden
                    />
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    step={reduceMotion ? 25 : 0.35}
                    value={progress * 100}
                    onChange={(e) => setProgress(Number(e.target.value) / 100)}
                    className={cn(
                      "absolute inset-0 h-12 w-full cursor-ew-resize",
                      reduceMotion ? "opacity-90 accent-[#D4AF37]" : "opacity-0",
                    )}
                    aria-label={c.sliderLabel}
                  />
                  <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-0.5">
                    {TIERS.map((t) => (
                      <div key={t.id} className="h-3 w-px bg-white/20" aria-hidden />
                    ))}
                  </div>
                </div>
              </div>
              {reduceMotion ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {TIERS.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        snapProgress?.(i)
                        navigateToMasterPlan(i)
                      }}
                      className="rounded-full border border-white/15 px-3 py-1 text-[11px] text-white/70 hover:border-[#D4AF37]/40 hover:text-white"
                    >
                      {t[lg === "ko" ? "nameKo" : "nameEn"]}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex min-h-0 w-full min-w-0 max-w-none flex-col self-stretch overflow-hidden rounded-lg border border-white/15 bg-black shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <table
                className="w-full min-w-0 table-fixed border-collapse text-left text-[12.5px] antialiased [text-rendering:optimizeLegibility]"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <colgroup>
                  <col style={{ width: colWidthPct(TIER_COL_PX) }} />
                  <col style={{ width: colWidthPct(VISUAL_COL_PX) }} />
                  <col style={{ width: colWidthPct(LOGIC_COL_PX) }} />
                  <col style={{ width: colWidthPct(PRICE_COL_PX) }} />
                  <col style={{ width: colWidthPct(CTA_COL_PX) }} />
                </colgroup>
                <thead>
                  <tr className="border-b border-white/25 bg-black">
                    {c.cols.map((h, colIdx) => {
                      const isPriceHeader = colIdx === 3
                      return (
                      <th
                        key={h}
                        className={cn(
                          "px-2 py-3 align-bottom font-bold text-white sm:px-3 sm:py-3.5",
                          fontBody,
                          lg === "ko"
                            ? "text-[12px] tracking-[0.03em]"
                            : "text-[10px] uppercase tracking-[0.12em] sm:tracking-[0.14em]",
                          isPriceHeader && "min-w-0",
                        )}
                      >
                        <span
                          className={cn(
                            "block w-full leading-snug text-white",
                            isPriceHeader
                              ? "whitespace-nowrap"
                              : "whitespace-normal break-words [word-break:keep-all]",
                          )}
                        >
                          {h}
                        </span>
                      </th>
                    )
                    })}
                    <th className={cn("px-2 py-3 align-bottom sm:px-3 sm:py-3.5", fontBody)}>
                      <span className="sr-only">Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-black text-white">
                  {TIERS.map((t, i) => {
                    const active = i === activeTierIndex
                    const priceKey = t[lg === "ko" ? "priceKo" : "priceEn"] as string
                    const tierName = t[lg === "ko" ? "nameKo" : "nameEn"]
                    return (
                      <tr
                        key={t.id}
                        className={cn(
                          "transition-[background-color] duration-200",
                          active ? "bg-[#D4AF37]/[0.12]" : "hover:bg-white/[0.045]",
                        )}
                      >
                        <td
                          className={cn(
                            "align-middle border-b border-white/[0.1] px-2 py-3 sm:px-3",
                            active ? "border-l-[3px] border-l-[#D4AF37]" : "border-l-[3px] border-l-transparent",
                          )}
                        >
                          <div className="flex min-w-0 items-center gap-2 py-0.5">
                            <span className="shrink-0 text-[11px] font-bold tabular-nums leading-none text-[#D4AF37] sm:text-[13px]">
                              {t.id}.
                            </span>
                            <span
                              className={cn(
                                "min-w-0 flex-1 whitespace-nowrap text-[11px] font-bold leading-none text-white sm:text-[12.5px] md:text-[13px]",
                                fontHead,
                              )}
                            >
                              {tierName}
                            </span>
                          </div>
                        </td>
                        <td className="border-b border-white/[0.1] px-2 py-3 align-top text-[12.5px] sm:px-3">
                          <p className="whitespace-normal break-words [word-break:keep-all] font-medium leading-relaxed text-white/90">
                            {c.visual[i]}
                          </p>
                        </td>
                        <td className="border-b border-white/[0.1] px-2 py-3 align-top text-[12.5px] sm:px-3">
                          <p className="whitespace-normal break-words [word-break:keep-all] font-medium leading-relaxed text-white/85">
                            {c.logic[i]}
                          </p>
                        </td>
                        <td className="border-b border-white/[0.1] px-2 py-3 align-middle sm:px-3">
                          <span className={cn("whitespace-nowrap font-medium", priceLabelClass(priceKey))}>
                            {priceKey}
                          </span>
                        </td>
                        <td className="border-b border-white/[0.1] px-1.5 py-3 align-middle">
                          <div className="flex w-full items-center justify-stretch px-0.5">
                            <button
                              type="button"
                              onClick={() => navigateToMasterPlan(i)}
                              className={cn(
                                "inline-flex min-h-[36px] w-full items-center justify-center whitespace-nowrap rounded-full border border-[#B8860B]/90 bg-gradient-to-b from-[#F0E4C4] via-[#D4AF37] to-[#8B6914] px-2.5 py-2 text-[11px] font-semibold leading-tight text-[#0a0a0c] shadow-[0_2px_14px_rgba(212,175,55,0.28)] transition hover:brightness-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]",
                              )}
                            >
                              {c.launchCta}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            <div className="flex justify-end border-t border-white/[0.08] bg-black/40 px-3 py-2.5 sm:px-4">
              <button
                type="button"
                onClick={() => openRoi(activeTierIndex + 1)}
                className="text-[11px] text-white/45 underline decoration-white/25 underline-offset-2 transition hover:text-[#D4AF37]/90 hover:decoration-[#D4AF37]/50"
              >
                {c.roiTitle}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={roiOpen} onOpenChange={setRoiOpen}>
        <DialogContent
          className={cn(
            "max-w-md border-white/10 bg-[#111114] text-white sm:max-w-lg",
            fontBody,
          )}
          overlayClassName="bg-black/70"
        >
          <DialogHeader>
            <DialogTitle className={cn("text-lg text-white", fontHead)}>
              {c.roiTitle} — {TIERS[roiTier - 1][lg === "ko" ? "nameKo" : "nameEn"]}
            </DialogTitle>
            <DialogDescription className="text-white/55">{c.roiDisclaimer}</DialogDescription>
          </DialogHeader>
          <ul className="mt-2 space-y-3 text-sm leading-relaxed text-white/80">
            {roiLinesForTier(roiTier, lg).map((line) => (
              <li key={line} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]" aria-hidden />
                {line}
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </section>
  )
}
