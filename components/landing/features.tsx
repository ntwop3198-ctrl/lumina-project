"use client"

import { Scan, Film, Globe, FlaskRound, ArrowUpRight, Sparkles } from "lucide-react"
import { LANDING_ICON, LANDING_LAYOUT, LANDING_MOTION, LANDING_SURFACE, LANDING_TYPE } from "@/lib/design/tokens"
import { SectionHeader } from "@/components/landing/ui/section-header"
import { SurfaceCard } from "@/components/landing/ui/surface-card"
import { Chip, NumberBadge } from "@/components/landing/ui/chip"
import { SectionShell } from "@/components/landing/ui/section-shell"

const features = [
  {
    icon: Scan,
    title: "High-Strategy · 데이터 기반 기획",
    description:
      "단순 생성이 아닙니다. 5년간의 뷰티 트렌드와 소비자 리뷰를 분석하여 ‘팔리는’ 마케팅 카피를 도출합니다.",
    highlights: ["뷰티 트렌드 데이터 학습", "소비자 리뷰 인사이트", "전환 중심 카피 추천"],
  },
  {
    icon: Film,
    title: "High-Premium · 하이엔드 비주얼",
    description:
      "명품 브랜드의 디자인 문법을 학습한 AI가 클릭 한 번으로 백화점 브랜드급 고감도 레이아웃을 구현합니다.",
    highlights: ["럭셔리 레이아웃 추천", "브랜드 톤 일관성 유지", "에디토리얼 스타일 연출"],
  },
  {
    icon: Globe,
    title: "High-Conversion · 구매 전환 최적화",
    description:
      "SNS 알고리즘에 최적화된 컷 구성으로 광고 효율(ROAS)을 극대화하는 숏폼 영상을 자동 추출합니다.",
    highlights: ["SNS 알고리즘 최적화", "숏폼 컷 자동 추출", "ROAS 개선 리포트"],
  },
  {
    icon: FlaskRound,
    title: "성분 스토리텔링 AI",
    description:
      "전성분을 분석해 효능을 감성적인 언어로 풀어내고, 구매욕을 자극하는 K-뷰티 감성 홍보 문구를 자동 생성합니다.",
    highlights: ["전성분 자동 분석", "감성 카피 생성", "성분 스토리텔링"],
  },
] as const

type FeaturesProps = {
  id?: string
}

export function Features({ id }: FeaturesProps) {
  return (
    <SectionShell id={id} backgroundClassName="bg-cream relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-rose-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-60 h-60 bg-rose-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <SectionHeader
          className={LANDING_LAYOUT.headerGap}
          badgeIcon={<Film className={LANDING_ICON.badge} />}
          badgeText="Core Features"
          title={
            <>
              <span className="text-rose-gold">4가지</span> 핵심 기술
            </>
          }
          description="K-뷰티의 아름다움을 담아내는 최첨단 AI 기술"
        />

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r from-rose-gold/0 via-rose-gold/20 to-rose-gold/0 rounded-[1.7rem] blur-lg opacity-0 group-hover:opacity-100 ${LANDING_MOTION.fade}`} />
              <SurfaceCard tone="soft" hover className={`h-full ${LANDING_LAYOUT.cardPaddingLg} ${LANDING_MOTION.normal}`}>
                <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-rose-gold/40 to-transparent" />
                <NumberBadge value={index + 1} className="absolute right-5 top-5" />
                {/* Icon */}
                <div className="relative w-16 h-16 rounded-2xl bg-rose-gold/10 border border-rose-gold/15 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                  <div className={`absolute -inset-1 rounded-2xl bg-rose-gold/20 blur-md opacity-0 group-hover:opacity-100 ${LANDING_MOTION.fast}`} />
                  <feature.icon className={LANDING_ICON.card} />
                </div>

                {/* Title */}
                <h3 className={`${LANDING_TYPE.cardTitle} ${LANDING_LAYOUT.titleGap} flex items-center ${LANDING_LAYOUT.chipGap}`}>
                  {feature.title}
                  <ArrowUpRight className={`${LANDING_ICON.cardArrow} opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300`} />
                </h3>

                {/* Description */}
                <p className={`${LANDING_TYPE.cardBody} ${LANDING_LAYOUT.bodyGap}`}>
                  {feature.description}
                </p>

                {/* Highlights */}
                <div className={`flex flex-wrap ${LANDING_LAYOUT.chipGap}`}>
                  {feature.highlights.map((highlight, hIndex) => (
                    <Chip key={hIndex} tone="soft" size="sm">
                      {highlight}
                    </Chip>
                  ))}
                </div>
              </SurfaceCard>
            </div>
          ))}
        </div>
      </div>
    </SectionShell>
  )
}