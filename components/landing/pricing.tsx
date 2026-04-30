"use client"

import { Check, Zap, Crown, Building2, Sparkles, ArrowRight } from "lucide-react"
import { LANDING_ICON, LANDING_LAYOUT, LANDING_MOTION, LANDING_SURFACE, LANDING_TYPE } from "@/lib/design/tokens"
import { SectionHeader } from "@/components/landing/ui/section-header"
import { SurfaceCard } from "@/components/landing/ui/surface-card"
import { CtaButton } from "@/components/landing/ui/cta-button"
import { Chip } from "@/components/landing/ui/chip"
import { SectionShell } from "@/components/landing/ui/section-shell"

const plans = [
  {
    name: "Starter",
    icon: Zap,
    lumi: 100,
    price: "49,000",
    period: "월",
    description: "소규모 유통업체를 위한 시작 플랜",
    features: [
      "런칭 패키지 기본 포함 (릴스 9:16 + 결제 완료 페이지)",
      "월 100 Lumi 제공",
      "상세페이지 10개 생성",
      "영상 5개 생성",
      "기본 재질 분석",
      "한국어/영어 지원",
      "이메일 지원",
    ],
    popular: false,
  },
  {
    name: "Business",
    icon: Crown,
    lumi: 500,
    price: "199,000",
    period: "월",
    description: "성장하는 비즈니스를 위한 추천 플랜",
    features: [
      "런칭 패키지 기본 포함 (릴스 9:16 + 결제 완료 페이지)",
      "월 500 Lumi 제공",
      "상세페이지 무제한 생성",
      "영상 30개 생성",
      "프리미엄 재질 분석",
      "10개 언어 지원",
      "우선 고객 지원",
      "브랜드 템플릿 5개",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    icon: Building2,
    lumi: "무제한",
    price: "별도 문의",
    period: "",
    description: "대규모 유통사 맞춤 솔루션",
    features: [
      "런칭 패키지 · 커스텀 납품 (릴스 9:16 + 결제 완료 페이지)",
      "무제한 Lumi 제공",
      "모든 기능 무제한",
      "4K 시네마틱 영상",
      "AI 모델 커스터마이징",
      "35개 언어 지원",
      "전담 매니저 배정",
      "API 액세스",
      "온프레미스 설치 가능",
    ],
    popular: false,
  },
]

type PricingProps = {
  id?: string
}

export function Pricing({ id }: PricingProps) {
  return (
    <SectionShell id={id} backgroundClassName="bg-sand-beige">
        <SectionHeader
          className={LANDING_LAYOUT.headerGap}
          badgeIcon={<Sparkles className={LANDING_ICON.badge} />}
          badgeText="Energy System"
          title={
            <>
              <span className="text-rose-gold">Lumi</span> 에너지 충전소
            </>
          }
          description="Lumi는 Lumina의 에너지 단위입니다. 상세페이지 1개 생성에 10 Lumi, 영상 1개 생성에 20 Lumi가 사용됩니다."
        />

        {/* Lumi visualization */}
        <div className={`flex justify-center ${LANDING_LAYOUT.sectionGap}`}>
          <div className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-cream/80 border border-rose-gold/15 shadow-sm w-full max-w-md sm:max-w-none">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-gold/10 flex items-center justify-center">
                <Zap className={LANDING_ICON.meter} />
              </div>
              <div>
                <div className="text-sm text-warm-gray">상세페이지</div>
                <div className="text-charcoal font-semibold">10 Lumi</div>
              </div>
            </div>
            <div className="h-px sm:h-12 sm:w-px bg-rose-gold/20" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-rose-gold/10 flex items-center justify-center">
                <Zap className={LANDING_ICON.meter} />
              </div>
              <div>
                <div className="text-sm text-warm-gray">광고 영상</div>
                <div className="text-charcoal font-semibold">20 Lumi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-3 gap-5 md:gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group ${plan.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Chip tone="brand" size="md" className="font-semibold">
                    Most Popular
                  </Chip>
                </div>
              )}

              <SurfaceCard
                tone={plan.popular ? "strong" : "soft"}
                hover={!plan.popular}
                className={`h-full p-6 md:p-8 ${LANDING_MOTION.fast} ${plan.popular ? "ring-4 ring-rose-gold/10" : ""}`}
              >
                {!plan.popular && (
                  <Chip tone="muted" size="sm" className="absolute top-4 right-4">
                    {plan.name}
                  </Chip>
                )}
                {/* Icon & Name */}
                <div className="flex items-center gap-3 mb-4 md:mb-5">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    plan.popular 
                      ? 'bg-gradient-to-br from-rose-gold to-rose-gold-dark' 
                      : 'bg-rose-gold/10'
                  }`}>
                    <plan.icon className={`${LANDING_ICON.plan} ${plan.popular ? 'text-cream' : 'text-rose-gold'}`} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-charcoal">{plan.name}</h3>
                    <p className="text-[13px] md:text-sm text-warm-gray leading-relaxed">{plan.description}</p>
                  </div>
                </div>

                {/* Lumi amount */}
                <div className="mb-5 md:mb-6 p-4 rounded-2xl bg-sand-beige/50 border border-rose-gold/10">
                  <div className={`flex items-center ${LANDING_LAYOUT.chipGap} ${LANDING_LAYOUT.statGap}`}>
                    <Zap className={LANDING_ICON.badge} />
                    <span className="text-sm text-rose-gold font-medium">Lumi 에너지</span>
                  </div>
                  <div className="text-2xl font-serif font-bold text-charcoal">
                    {typeof plan.lumi === 'number' ? plan.lumi.toLocaleString() : plan.lumi}
                    {typeof plan.lumi === 'number' && <span className="text-sm text-warm-gray font-normal ml-1">/ 월</span>}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-5 md:mb-6">
                  <div className={`flex items-baseline ${LANDING_LAYOUT.splitGap}`}>
                    {plan.price !== "별도 문의" && <span className="text-lg text-warm-gray">&#x20A9;</span>}
                    <span className="text-[30px] md:text-3xl font-serif font-bold text-charcoal">{plan.price}</span>
                    {plan.period && <span className="text-warm-gray">/{plan.period}</span>}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 md:space-y-3 mb-6 md:mb-8">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? "bg-rose-gold/15" : "bg-rose-gold/10"}`}>
                        <Check className={LANDING_ICON.list} />
                      </div>
                      <span className="text-sm text-warm-gray">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <CtaButton
                  tone={plan.popular ? "primary" : "secondary"}
                  className="w-full min-h-[46px] py-4 md:py-6"
                >
                  {plan.price === "별도 문의" ? "상담 신청" : "시작하기"}
                  <ArrowRight className={LANDING_ICON.cta} />
                </CtaButton>
              </SurfaceCard>
            </div>
          ))}
        </div>
    </SectionShell>
  )
}