"use client"

import { ArrowRight, Sparkles, Wand2 } from "lucide-react"
import { Fragment, useState } from "react"
import { LANDING_ICON, LANDING_LAYOUT, LANDING_MOTION, LANDING_SURFACE, LANDING_TYPE } from "@/lib/design/tokens"
import { SectionHeader } from "@/components/landing/ui/section-header"
import { SurfaceCard } from "@/components/landing/ui/surface-card"
import { Chip } from "@/components/landing/ui/chip"
import { SectionShell } from "@/components/landing/ui/section-shell"

type BeforeAfterProps = {
  id?: string
}

const processSteps = [
  { title: "사진 업로드", desc: "제품 용기 사진을 드래그하거나 선택해 올려요." },
  { title: "AI 분석", desc: "재질·톤·텍스트를 읽고 브랜드에 맞게 정리해요." },
  { title: "콘텐츠 생성", desc: "상세페이지·영상 시안을 자동으로 생성해요." },
  { title: "완성", desc: "검수 후 바로 내보내거나 수정해 마무리해요." },
] as const

const sampleTags = ["히알루론산", "세라마이드", "나이아신아마이드", "피부장벽 강화"] as const

export function BeforeAfter({ id }: BeforeAfterProps) {
  const [activeTab, setActiveTab] = useState<"page" | "video">("page")

  return (
    <SectionShell id={id} backgroundClassName="bg-sand-beige" className="!pb-16 md:!pb-20">
        <SectionHeader
          className={LANDING_LAYOUT.headerGap}
          badgeIcon={<Wand2 className={LANDING_ICON.badge} />}
          badgeText="Transformation"
          title={
            <>
              평범한 사진이 <span className="text-rose-gold">프리미엄 콘텐츠</span>로
            </>
          }
          description="단 한 장의 제품 사진으로 고급스러운 상세페이지와 시네마틱 영상을 제작합니다"
        />

        {/* Toggle tabs */}
        <div className={`flex justify-center ${LANDING_LAYOUT.sectionGap}`}>
          <div className="inline-flex p-1.5 rounded-full bg-cream border border-rose-gold/15 shadow-sm">
            <button
              onClick={() => setActiveTab("page")}
              className={`px-7 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "page"
                  ? "bg-rose-gold text-cream shadow-md"
                  : "text-warm-gray hover:text-charcoal"
              }`}
            >
              상세페이지
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`px-7 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === "video"
                  ? "bg-rose-gold text-cream shadow-md"
                  : "text-warm-gray hover:text-charcoal"
              }`}
            >
              광고 영상
            </button>
          </div>
        </div>

        {/* Before/After comparison - vertical editorial layout */}
        <div className="max-w-4xl mx-auto">
          {/* Before */}
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-r from-rose-gold/0 via-rose-gold/20 to-rose-gold/0 blur-lg opacity-60" />
            <SurfaceCard tone="soft" className={`relative overflow-hidden rounded-[20px] border-rose-gold/20 bg-cream/80 ${LANDING_MOTION.normal}`}>
              <div className="absolute top-4 left-4 z-10">
                <Chip tone="muted" size="md">
                  Before
                </Chip>
              </div>
              <div className="aspect-[16/9] md:aspect-[2.3/1] bg-gradient-to-br from-warm-gray/5 to-warm-gray/15 p-6 md:p-8 flex items-center justify-center">
                <div className="w-full max-w-[220px] text-center">
                  <div className="aspect-[1/1.45] rounded-2xl border border-warm-gray/25 bg-gradient-to-b from-warm-gray/20 to-warm-gray/35 shadow-md relative grayscale-[30%] opacity-70">
                    <div className="absolute inset-x-5 top-1/4 h-1/3 bg-cream/45 rounded" />
                    <div className="absolute inset-x-7 bottom-7 h-6 bg-cream/35 rounded-sm" />
                  </div>
                  <p className="mt-4 text-sm text-warm-gray">업로드된 원본 사진</p>
                </div>
              </div>
            </SurfaceCard>
          </div>

          {/* AI Transform button */}
          <div className="relative z-20 -my-4 md:-my-6 flex justify-center">
            <button
              type="button"
              className="group inline-flex items-center gap-2.5 rounded-full border border-rose-gold/30 bg-gradient-to-r from-rose-gold to-rose-gold-dark px-5 md:px-7 py-3 md:py-3.5 text-cream shadow-[0_16px_36px_rgba(139,111,71,0.35)] hover:shadow-[0_20px_44px_rgba(139,111,71,0.45)] transition-all duration-300"
              aria-label="AI 변환"
            >
              <Sparkles className="w-5 h-5 md:w-6 md:h-6 group-hover:scale-110 transition-transform" />
              <span className="text-sm md:text-base font-medium tracking-wide">AI 변환</span>
            </button>
          </div>

          {/* After */}
          <div className="relative mx-auto w-full max-w-2xl">
            <div className="absolute -inset-1 rounded-[24px] bg-gradient-to-r from-rose-gold/15 via-rose-gold/30 to-rose-gold/15 blur-xl opacity-80" />
            <div
              key={activeTab}
              className="relative rounded-[20px] border border-rose-gold/20 bg-white shadow-[0_24px_60px_rgba(139,111,71,0.2)] overflow-hidden transition-all duration-500 ease-out"
            >
              <div className="absolute top-4 left-4 z-10">
                <Chip tone="brand" size="md">
                  After
                </Chip>
              </div>

              {activeTab === "page" ? (
                <div className="pt-12 md:pt-14 pb-6 md:pb-7 px-4 md:px-7">
                  <div className="rounded-2xl border border-rose-gold/15 overflow-hidden bg-cream">
                    {/* Smartstore-like hero visual */}
                    <div className="h-[240px] sm:h-[270px] md:h-[320px] bg-gradient-to-b from-cream via-sand-beige/70 to-sand-beige/40 flex items-end justify-center p-6 md:p-8">
                      <div className="w-[112px] sm:w-[126px] md:w-[148px] aspect-[1/1.9] rounded-[26px] md:rounded-[28px] border border-rose-gold/30 bg-gradient-to-b from-rose-gold/30 via-rose-gold/18 to-rose-gold/10 shadow-[0_14px_34px_rgba(139,111,71,0.28)] relative">
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-rose-gold/35 border border-rose-gold/35" />
                        <div className="absolute inset-x-5 top-10 h-16 rounded-xl bg-cream/55" />
                        <div className="absolute inset-x-6 bottom-10 h-14 rounded-lg bg-cream/45" />
                      </div>
                    </div>

                    <div className="bg-white px-4 md:px-6 py-5 md:py-6 text-left space-y-3.5 md:space-y-4">
                      <p className="text-[11px] tracking-[0.22em] font-semibold lowercase text-rose-gold">lumina beauty</p>
                      <h2 className="font-serif text-[24px] sm:text-[27px] md:text-[30px] leading-[1.22] text-charcoal">
                        수분 앰플 세럼
                        <br />
                        딥 하이드레이션 에센스
                      </h2>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {sampleTags.map((tag) => (
                          <Chip key={tag} tone="soft" size="sm">
                            {tag}
                          </Chip>
                        ))}
                      </div>

                      <p className="text-[13px] md:text-sm text-rose-gold/80 italic leading-relaxed pt-1.5 md:pt-2">
                        &ldquo;피부가 마셔요 — 촉촉함이 속부터 차오르는 느낌&rdquo;
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="pt-12 md:pt-14 pb-6 md:pb-7 px-4 md:px-7">
                  <div className="rounded-2xl border border-rose-gold/20 bg-charcoal relative overflow-hidden shadow-inner h-[340px] sm:h-[390px] md:h-[420px]">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/10 via-transparent to-rose-gold/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-rose-gold flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                        <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[16px] border-l-cream border-b-[10px] border-b-transparent ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-charcoal/90 to-transparent">
                      <div className="h-1.5 bg-cream/20 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-rose-gold rounded-full" />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-cream/70">
                        <span>0:12</span>
                        <span>0:30</span>
                      </div>
                    </div>
                    <div className="absolute top-0 inset-x-0 h-10 bg-charcoal" />
                    <div className="absolute bottom-16 inset-x-0 h-10 bg-charcoal" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Process steps */}
        <div className="mt-10 md:mt-12 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-3 max-w-5xl mx-auto">
          {processSteps.map((step, index) => (
            <Fragment key={step.title}>
              <div className="flex gap-3 items-start w-full md:w-auto max-w-[280px] md:max-w-[min(240px,22vw)]">
                <span className="w-10 h-10 rounded-full bg-cream border border-rose-gold/20 flex items-center justify-center text-sm text-rose-gold font-semibold shadow-sm shrink-0">
                  {index + 1}
                </span>
                <div>
                  <p className="text-charcoal font-medium leading-tight">{step.title}</p>
                  <p className="text-xs text-warm-gray mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
              {index < processSteps.length - 1 && (
                <ArrowRight className={`${LANDING_ICON.processArrow} hidden md:block shrink-0`} aria-hidden />
              )}
            </Fragment>
          ))}
        </div>
    </SectionShell>
  )
}