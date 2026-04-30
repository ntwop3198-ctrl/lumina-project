"use client"

import Link from "next/link"
import { Eye, Brain, Compass, Lock, Sparkles, Play, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

/** 무료 구간 요약 진단 카피(데모) — 과장 수치·효능 약속 없음 */
const FREE_INSIGHTS = [
  {
    n: "01",
    hook: "첫 노출 구간에서 카테고리 규범과 어긋나는 신뢰 신호가 식별됩니다.",
    tease: "업로드 비주얼 기준 요약 진단. 근거·개선 방향은 상세 리포트(유료 구간)에서 확장합니다.",
  },
  {
    n: "02",
    hook: "가격 이전에 메시지·SKU 간 정합성에서 이탈 리스크가 발생할 수 있습니다.",
    tease: "카피 톤과 제품군 정합 점검 요약. 무료 대시보드에서는 핵심 힌트만 확인할 수 있습니다.",
  },
  {
    n: "03",
    hook: "경쟁·대조 SKU 대비 차별 포지션(한 줄 정의)이 명시되지 않았습니다.",
    tease: "벤치마크 대응 슬로건 후보 전체는 유료 워크스페이스에서 시나리오 형태로 제공됩니다.",
  },
] as const

const PREMIUM_STAGES = [
  {
    icon: Eye,
    title: "비주얼 체계화",
    desc: "에어리스·라이팅·컬러 가이드를 상세 페이지 제작 기준에 맞춰 제안합니다.",
  },
  {
    icon: Brain,
    title: "메시지 설계",
    desc: "노출·신뢰·구매 직전 단계별 카피 레이어(가설)를 정의합니다.",
  },
  {
    icon: Compass,
    title: "채널 연계",
    desc: "채널별 톤·숏폼·영상 훅을 단일 스토리보드 축으로 연결합니다.",
  },
] as const

export function LuminaServicePlans() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <div className="mb-14 text-center lg:mb-20">
        <p className="mb-4 font-sans text-[11px] font-medium uppercase tracking-[0.38em] text-gold">
          Service Plans
        </p>
        <h1 className="font-serif text-3xl font-light tracking-tight text-charcoal sm:text-4xl lg:text-[2.75rem]">
          루미나 서비스 플랜
        </h1>
        <p className="mx-auto mt-5 max-w-2xl font-sans text-sm leading-[1.8] text-charcoal/65 sm:text-base">
          <span className="font-semibold text-charcoal">Insight Free</span>는 입력·업로드 데이터를 바탕으로 핵심 이슈 3건을
          요약합니다.{" "}
          <span className="font-semibold text-charcoal">Lumina Premium</span>은 동일 이슈를 상세 페이지·영상 산출 구조로
          확장합니다.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10 lg:items-stretch">
        {/* Insight Free — 밝은 톤, 텍스트·대시보드 중심 */}
        <section
          className={cn(
            "flex flex-col rounded-3xl border border-charcoal/10 bg-[#faf9f7] p-6 shadow-sm sm:p-8",
            "ring-1 ring-black/[0.03] transition-shadow duration-300 hover:shadow-lg",
          )}
          aria-labelledby="plan-insight-free"
        >
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-charcoal/[0.06] px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal/70">
              무료
            </span>
            <h2 id="plan-insight-free" className="font-serif text-2xl font-normal text-charcoal">
              Insight Free
            </h2>
          </div>

          <p className="font-sans text-sm leading-[1.85] text-charcoal/72">
            업로드 데이터를 전제로 검토 우선순위가 높은{" "}
            <strong className="font-semibold text-charcoal">이슈 3건</strong>을 제안서 수준으로 요약합니다. 자동 매출·전환
            수치 산정이 아니라 판단 근거·가설 정리에 초점을 둡니다.
          </p>

          <div className="mt-8 rounded-2xl border border-charcoal/[0.08] bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-6">
            <div className="mb-4 flex items-center justify-between border-b border-charcoal/[0.06] pb-3">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-charcoal/45">
                Insight Dashboard
              </span>
              <span className="rounded-md bg-amber-500/10 px-2 py-0.5 font-mono text-[10px] text-amber-800/90">
                Preview
              </span>
            </div>
            <ul className="space-y-5">
              {FREE_INSIGHTS.map((item) => (
                <li
                  key={item.n}
                  className="border-l-2 border-rose-gold/35 pl-4 transition-colors hover:border-rose-gold/60"
                >
                  <span className="font-mono text-[10px] tabular-nums text-charcoal/35">{item.n}</span>
                  <p className="mt-1 font-serif text-[15px] leading-snug text-charcoal">{item.hook}</p>
                  <p className="mt-2 font-sans text-[12px] leading-[1.75] text-charcoal/55">{item.tease}</p>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-6 font-sans text-xs italic leading-relaxed text-charcoal/50">
            * 실제 연동 시 입력·분석 결과에 따라 문구·우선순위가 조정될 수 있습니다.
          </p>

          <div className="mt-auto pt-8">
            <Link
              href="/#upload"
              scroll={true}
              className="inline-flex items-center gap-2 font-sans text-sm font-medium text-rose-gold-dark transition hover:gap-3 hover:text-charcoal"
            >
              무료 진단 보기
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* Lumina Premium — 풀 블랙 & 골드 */}
        <section
          className={cn(
            "relative flex flex-col overflow-hidden rounded-3xl border border-[#D4AF37]/35 p-6 sm:p-8",
            "bg-[#121212] text-white shadow-[0_0_0_1px_rgba(212,175,55,0.12)_inset,0_24px_80px_rgba(0,0,0,0.55)]",
            "transition-[box-shadow,transform] duration-300 hover:shadow-[0_0_0_1px_rgba(212,175,55,0.22)_inset,0_32px_100px_rgba(212,175,55,0.12)]",
          )}
          aria-labelledby="plan-lumina-premium"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 20% 0%, rgba(212,175,55,0.35), transparent 50%), radial-gradient(ellipse 60% 40% at 100% 100%, rgba(212,175,55,0.15), transparent 45%)",
            }}
            aria-hidden
          />

          <div className="relative">
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D4AF37]">
                <Sparkles className="h-3 w-3" aria-hidden />
                유료
              </span>
              <h2 id="plan-lumina-premium" className="font-serif text-2xl font-normal text-white">
                Lumina Premium
              </h2>
            </div>

            <p className="font-sans text-sm leading-[1.85] text-white/58">
              무료 구간에서 식별한 이슈를 해소하는{" "}
              <span className="text-[#D4AF37]">산출 구조</span>를 제시합니다. 비주얼·메시지·채널을 단일 흐름으로 묶은{" "}
              <strong className="font-semibold text-white/90">상세 페이지 초안 및 영상 샘플 레이아웃</strong>이 포함됩니다.
            </p>

            {/* 3단계 */}
            <div className="mt-8 space-y-3">
              {PREMIUM_STAGES.map((stage) => (
                <div
                  key={stage.title}
                  className="group flex gap-4 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 transition-colors hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/[0.04]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#D4AF37]/25 bg-[#D4AF37]/[0.08] text-[#D4AF37]">
                    <stage.icon className="h-5 w-5" strokeWidth={1.25} />
                  </div>
                  <div>
                    <p className="font-serif text-base text-white">{stage.title}</p>
                    <p className="mt-1 font-sans text-[12px] leading-[1.75] text-white/48">{stage.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 마스터 상세 + 영상 샘플 레이아웃 */}
            <div className="mt-8 grid gap-4 sm:grid-cols-5">
              <div className="sm:col-span-3">
                <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#D4AF37]/80">
                  Master Detail Page
                </p>
                <div className="space-y-2 rounded-xl border border-[#D4AF37]/20 bg-black/50 p-4">
                  <div className="h-24 rounded-lg bg-gradient-to-br from-[#D4AF37]/15 via-white/[0.04] to-transparent ring-1 ring-inset ring-[#D4AF37]/15" />
                  <div className="h-2 w-3/4 rounded bg-white/10" />
                  <div className="h-2 w-1/2 rounded bg-white/[0.06]" />
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="aspect-square rounded-md bg-white/[0.05] ring-1 ring-[#D4AF37]/10" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <p className="mb-2 font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-[#D4AF37]/80">
                  Video Sample
                </p>
                <div className="relative flex aspect-[9/16] max-h-[220px] flex-col items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-gradient-to-b from-[#1a1a1a] to-black">
                  <div className="absolute inset-0 rounded-xl bg-[#D4AF37]/[0.04]" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/15 text-[#D4AF37]">
                    <Play className="ml-0.5 h-5 w-5" fill="currentColor" />
                  </div>
                  <p className="relative mt-3 px-4 text-center font-sans text-[10px] leading-relaxed text-white/40">
                    숏폼 훅 · 자막 템포 · CTA 오버레이(구조 샘플)
                  </p>
                  <div className="absolute bottom-3 left-3 right-3 flex gap-1">
                    <span className="h-1 flex-1 rounded-full bg-[#D4AF37]/40" />
                    <span className="h-1 flex-1 rounded-full bg-white/10" />
                    <span className="h-1 flex-1 rounded-full bg-white/10" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start gap-2 rounded-lg border border-white/[0.06] bg-black/30 px-3 py-2.5">
              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]/70" aria-hidden />
              <p className="font-sans text-[11px] leading-relaxed text-white/45">
                유료 구간: 전체 카피·영상 스크립트·다운로드 가능 에셋은 결제·계약 범위에 따라 워크스페이스에서 제공됩니다.
              </p>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/dashboard"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-gradient-to-r from-[#e8c547] via-[#D4AF37] to-[#b8941f] px-6 py-3.5 font-sans text-sm font-semibold text-[#121212] shadow-[0_0_28px_rgba(212,175,55,0.25)] transition hover:shadow-[0_0_40px_rgba(212,175,55,0.35)]"
              >
                Premium 시작
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex flex-1 items-center justify-center rounded-full border border-white/20 bg-transparent px-6 py-3.5 font-sans text-sm font-medium text-white/85 transition hover:border-[#D4AF37]/40 hover:text-[#D4AF37]"
              >
                도입 문의
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
