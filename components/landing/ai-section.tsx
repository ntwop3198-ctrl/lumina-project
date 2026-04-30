"use client";

import { Brain, Package, Languages, Globe } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "제형 인텔리전스",
    description:
      "성분 배합, 제형 질감, 사용감까지 데이터로 해석해 브랜드가 약속해야 할 효능과 감성을 한 문장으로 정리합니다.",
  },
  {
    icon: Package,
    title: "비주얼 정체성 진단",
    description:
      "색감, 구도, 레이아웃을 데이터로 해석해 브랜드가 전달하고자 하는 정체성이 시각적으로 얼마나 잘 구현되었는지 정밀하게 진단합니다.",
  },
  {
    icon: Languages,
    title: "감각 언어 매핑",
    description:
      "향, 텍스처, 사용 후 느낌을 감각적인 언어로 번역해, 소비자가 화면만 보고도 제품을 떠올릴 수 있게 만듭니다.",
  },
  {
    icon: Globe,
    title: "글로벌 마켓 포지셔닝",
    description:
      "지역별 럭셔리 인식 차이를 반영해, 파리·서울·도쿄 어디에서나 통하는 브랜드 메시지를 설계합니다.",
  },
];

const stats = [
  { value: "4M+", label: "누적 분석 제품" },
  { value: "500K+", label: "브랜드 벤치마크" },
  { value: "47", label: "글로벌 네트워크" },
  { value: "99.2%", label: "분석 정확도" },
];

export function AISection() {
  return (
    <section id="expertise" className="bg-charcoal py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-gold text-sm tracking-[0.3em] mb-4 uppercase">
            COSMETIC DNA INTELLIGENCE
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6 max-w-3xl">
            AI That Speaks{" "}
            <span className="italic text-gradient-gold">Fluent Cosmetics</span>
          </h2>
          <p className="text-white/60 max-w-3xl text-lg">
            루미나는 일반적인 AI 도구가 아니라, 15년간 축적된 럭셔리 코스메틱 데이터(제형 과학, 패키징 엔지니어링, 소비자 심리, 트렌드 히스토리)를 기반으로 학습된 전문 엔진입니다. 제품을 단순히 설명하는 수준을 넘어, 브랜드의 맥락과 포지셔닝까지 깊이 이해합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-charcoal-light/50 rounded-xl p-6 border border-white/5 hover:border-gold/20 transition-colors"
              >
                <div className="w-10 h-10 bg-gold/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-serif text-white mb-2 text-lg">
                  {feature.title}
                </h3>
                <p className="font-sans text-white/60 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Product Image Showcase */}
          <div className="relative">
            <div className="bg-gradient-to-br from-charcoal-light to-black rounded-2xl p-8 border border-white/10">
              {/* Product display */}
              <div className="aspect-square bg-gradient-to-br from-gold/10 to-transparent rounded-xl flex items-center justify-center relative overflow-hidden">
                {/* Serum bottle illustration */}
                <div className="relative w-32 h-48">
                  {/* Bottle body */}
                  <div className="absolute bottom-0 w-full h-3/4 bg-gradient-to-b from-amber-600/90 to-amber-800 rounded-b-xl rounded-t-sm">
                    {/* Liquid level */}
                    <div className="absolute bottom-2 left-2 right-2 top-1/4 bg-gradient-to-t from-amber-500/40 to-amber-400/20 rounded" />
                    {/* Label */}
                    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 h-1/3 bg-white/10 rounded flex items-center justify-center">
                      <span className="font-serif text-white/60 text-xs">LUMINA</span>
                    </div>
                  </div>
                  {/* Dropper cap */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/4">
                    <div className="w-full h-3/4 bg-gold rounded-t-full" />
                    <div className="w-full h-1/4 bg-gold-dark" />
                  </div>
                </div>

                {/* AI Analysis overlay */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 border border-gold/30">
                  <p className="font-sans text-gold text-xs font-medium mb-1">AI 정밀 분석</p>
                  <p className="font-sans text-white/80 text-xs">
                    프리미엄 지수: <span className="font-serif">94%</span>
                  </p>
                </div>

                {/* Feature tags */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  <span className="font-sans bg-gold/20 text-gold text-xs px-2 py-1 rounded">
                    럭셔리 등급
                  </span>
                  <span className="font-sans bg-white/10 text-white/70 text-xs px-2 py-1 rounded">
                    안티에이징
                  </span>
                  <span className="font-sans bg-white/10 text-white/70 text-xs px-2 py-1 rounded">
                    비타민 C
                  </span>
                </div>
              </div>

              {/* Accuracy indicator */}
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="font-sans text-white/50 text-xs">브랜드 DNA 일치도</p>
                  <p className="text-gold font-serif text-2xl">99.2%</p>
                </div>
                <div className="w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#3a3a3a"
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#c9a227"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="font-serif text-3xl lg:text-4xl text-gradient-gold mb-2">
                {stat.value}
              </div>
              <div className="font-sans text-white/60 text-xs md:text-sm tracking-[0.18em] font-light uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
