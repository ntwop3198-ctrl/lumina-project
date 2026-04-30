"use client";

import Link from "next/link";
import { Target, Sparkles, TrendingUp, ArrowRight, Zap } from "lucide-react";

const strategies = [
  {
    icon: Target,
    category: "초정밀 전략 설계",
    title: "초정밀 전략",
    description:
      "브랜드의 현재 포지셔닝과 타깃 고객 데이터를 정교하게 분석해, 프리미엄 인식을 높이는 가장 효율적인 전략만 추려 제안합니다.",
    features: ["경쟁 브랜드 인사이트", "트렌드 맵핑", "타깃 고객 DNA 분석"],
  },
  {
    icon: Sparkles,
    category: "HAUTE VISUAL AESTHETICS",
    title: "하이-프리미엄 미학",
    description:
      "조명, 컬러, 질감을 세밀하게 제어해 제품이 가장 고급스럽게 보이는 시점을 포착합니다. 럭셔리 브랜드가 사용하는 미학 언어를 그대로 구현합니다.",
    features: ["프리미엄 톤 앤 매너", "자동 컬러 그레이딩", "브랜드 일관성 유지"],
  },
  {
    icon: TrendingUp,
    category: "PERFORMANCE OPTIMIZATION",
    title: "압도적 성과",
    description:
      "단순히 예쁜 화면이 아니라, 실제 구매 전환까지 이어지는 화면을 설계합니다. 클릭, 체류, 구매 데이터를 기반으로 성과가 검증된 패턴만 남깁니다.",
    features: ["매출 중심 설계", "A/B 테스트 제안", "채널별 최적화 전략"],
  },
  {
    icon: Zap,
    category: "HIGH-ENERGY STATION",
    title: "에너지충전소",
    description:
      "정체된 브랜드에 새로운 활력을 불어넣는 창의적인 영감과 비주얼 솔루션을 제안합니다. 캠페인 전반에 에너지가 흐르도록 설계합니다.",
    features: ["콘셉트 리프레시", "크리에이티브 무드보드", "캠페인 아이디어 부스팅"],
  },
];

export function StrategySection() {
  return (
    <section id="features" className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <p className="text-gold text-sm tracking-[0.3em] mb-4 uppercase">
            THE LUMINA METHOD
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-14">
            The <span className="italic text-gradient-gold">3-High</span> Strategy
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg leading-relaxed lg:leading-loose">
            AI와 럭셔리 브랜딩 심리를 결합해, 코스메틱 브랜드의 매출 성장을 검증된 방식으로 이끄는 루미나만의 전략 프레임워크입니다.
          </p>
        </div>

        {/* Strategy Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {strategies.map((strategy, index) => (
            <Link
              key={index}
              href={strategy.title === "에너지충전소" ? "/energy-system" : "/pricing"}
              className="group block bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-cream-dark/50 hover:border-gold/30 hover:-translate-y-1 cursor-pointer"
            >
              {/* Icon */}
              <div className="w-14 h-14 bg-cream rounded-xl flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors">
                <strategy.icon className="w-7 h-7 text-gold" />
              </div>

              {/* Category */}
              <p className="text-xs text-charcoal/50 tracking-wider mb-2">
                {strategy.category}
              </p>

              {/* Title */}
              <h3 className="font-serif text-2xl text-charcoal mb-4">
                {strategy.title}
              </h3>

              {/* Description */}
              <p className="font-sans text-charcoal/70 text-sm leading-relaxed mb-6">
                {strategy.description}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {strategy.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-charcoal/70 font-sans">
                    <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Learn More */}
              <span className="inline-flex items-center gap-2 text-gold text-sm font-medium group-hover:gap-3 transition-all">
                LEARN MORE
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
