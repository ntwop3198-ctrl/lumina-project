"use client"

import { Gem } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Bilingual headline: 한글(명조·골드) + 영어(산세리프)를 한 행의 디자인 요소처럼 보이게 맞춤.
 * — 동일 시각 무게: clamp로 글자 크기 스케일, leading 고정, baseline 정렬, 자간 보정.
 */
/** 성공 사례 헤드라인(social-proof)과 구분되는 — DNA·타이포 증명용 고유 카피 */
const KO_LINES = ["정밀 분석에서 서사까지,", "한 화면에 담은 브랜드 OS"]
const EN_LINES = ["From signal to narrative,", "one operating layer for your brand"]

const DEMO_SCORES = [
  { label: "프리미엄 지수", value: 94 },
  { label: "브랜드 정체성 일치도", value: 91 },
  { label: "시장 매력도", value: 88 },
] as const

const DNA_MATCH = 96

function DnaRing({ percent }: { percent: number }) {
  const r = 40
  const c = 2 * Math.PI * r
  const offset = c * (1 - percent / 100)
  return (
    <div className="flex items-center gap-5">
      <div>
        <p className="font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-white/45">
          브랜드 DNA 일치도
        </p>
        <p className="mt-1 font-serif text-3xl tabular-nums text-gold md:text-4xl">{percent}%</p>
      </div>
      <div className="relative h-24 w-24 shrink-0 md:h-28 md:w-28">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden>
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="url(#luminaStoriesRing)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
            className="transition-[stroke-dashoffset] duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="luminaStoriesRing" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f0d060" />
              <stop offset="50%" stopColor="#c9a227" />
              <stop offset="100%" stopColor="#8b6914" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  )
}

export function LuminaStoriesSection() {
  return (
    <section
      id="stories"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#060605] py-20 md:py-28 lg:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.2]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,162,39,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,162,39,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "56px 56px",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,162,39,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/90 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* 상단: LUMINA STORIES + 보석 */}
        <div className="flex items-center justify-center gap-2.5 sm:justify-start">
          <Gem
            className="h-4 w-4 text-gold"
            strokeWidth={1.35}
            aria-hidden
          />
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.42em] text-gold/90">
            LUMINA STORIES
          </span>
        </div>

        <div className="mt-14 grid items-start gap-14 lg:mt-16 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* 타이포 + 메시지 */}
          <div className="lg:col-span-7">
            {/*
              수평 이중언어: 같은 baseline 그리드에 얹어 한글(명조·골드)과 영문(Inter·산세리프)의
              광학적 무게를 맞춤 — 한글은 살짝 크게·자간 타이트, 영문은 uppercase·넓은 자간으로 폭 균형.
            */}
            <div className="flex flex-col gap-10 sm:flex-row sm:items-baseline sm:gap-0 sm:divide-x sm:divide-gold/20">
              <div className="sm:min-w-0 sm:flex-1 sm:pr-8 md:pr-10 lg:pr-12">
                <p
                  className={cn(
                    "font-serif font-medium leading-[1.26] text-transparent",
                    "bg-gradient-to-br from-[#f5e6a8] via-[#d4af37] to-[#a67c00] bg-clip-text",
                    "text-[clamp(1.35rem,3.6vw,2.35rem)]",
                    "tracking-[-0.025em]",
                  )}
                  style={{ fontFeatureSettings: '"kern" 1' }}
                >
                  {KO_LINES.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>

              <div className="sm:min-w-0 sm:flex-1 sm:pl-8 md:pl-10 lg:pl-12">
                <p
                  className={cn(
                    "font-sans font-light uppercase text-white/[0.92]",
                    "text-[clamp(0.75rem,1.55vw,0.9375rem)]",
                    "leading-[1.78]",
                    "tracking-[0.14em]",
                  )}
                >
                  {EN_LINES.map((line, i) => (
                    <span key={i} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            </div>

            <p className="mt-10 max-w-xl font-sans text-[13px] leading-[1.72] tracking-[-0.01em] text-white/40 md:text-sm md:leading-[1.75]">
              <span className="text-gold/85">한글은 루미나에게 맡기세요.</span>{" "}
              분석 수치와 서사 카피가 같은 무게로 보이도록, 자간·행간·베이스라인을 한 세트로 다룹니다.
            </p>
          </div>

          {/* DNA 분석 패널 (데모 수치) */}
          <div className="lg:col-span-5">
            <div
              className={cn(
                "rounded-2xl border border-white/[0.08] bg-black/55 p-6 shadow-[0_0_0_1px_rgba(201,162,39,0.06)_inset,0_24px_80px_rgba(0,0,0,0.5)]",
                "backdrop-blur-md md:p-8",
              )}
            >
              <div className="mb-6 flex items-center gap-2 border-b border-white/[0.07] pb-4">
                <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  분석 스냅샷
                </span>
                <span className="rounded-full border border-gold/30 bg-gold/10 px-2 py-0.5 font-sans text-[9px] font-medium uppercase tracking-wider text-gold">
                  Demo
                </span>
              </div>

              <div className="space-y-5">
                {DEMO_SCORES.map((row) => (
                  <div key={row.label}>
                    <div className="mb-2 flex justify-between gap-3 font-sans text-xs">
                      <span className="text-white/55">{row.label}</span>
                      <span className="tabular-nums text-gold">{row.value}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/[0.06]">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-gold/50 via-gold to-amber-600/90 shadow-[0_0_12px_rgba(201,162,39,0.35)]"
                        style={{ width: `${row.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/[0.07] pt-8">
                <DnaRing percent={DNA_MATCH} />
              </div>

              <p className="mt-6 font-sans text-[10px] leading-relaxed text-white/35">
                실제 업로드 분석 시 점수·DNA 일치도는 제품 이미지와 카테고리에 따라 산출됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
