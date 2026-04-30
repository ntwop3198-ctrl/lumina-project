"use client";

import { Check, CreditCard, Clock, BookOpen, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const benefits = [
  { icon: CreditCard, text: "회원등록 없이 바로 시작" },
  { icon: Clock, text: "1분 내로 끝나는 간편 설정" },
  { icon: BookOpen, text: "AI 기반 실시간 정밀 진단 리포트" },
];

export function CTASection() {
  return (
    <section className="bg-charcoal py-24 lg:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-gold/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-gold/10 to-transparent" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <p className="text-gold text-sm tracking-[0.3em] mb-4 uppercase">
              BRAND TRANSFORMATION
            </p>
            <h2 className="font-serif text-4xl lg:text-5xl text-white mb-6 leading-tight">
              브랜드를 명품으로 만들
              <br />
              준비가 되셨나요?
            </h2>
            <p className="text-white/60 mb-10 text-lg">
              이미 수많은 코스메틱 브랜드가 루미나와 함께 프리미엄 시장을 선점하고 있습니다.
            </p>

            {/* Benefits */}
            <div className="space-y-5">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3.5 leading-relaxed"
                >
                  <div className="w-6 h-6 mt-0.5 bg-gold/20 rounded-full flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-gold" />
                  </div>
                  <span className="font-sans text-white/80 text-sm md:text-base">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="bg-charcoal-light/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="font-serif text-2xl text-white mb-6">
              무료 분석 신청
            </h3>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    이름
                  </label>
                  <Input
                    type="text"
                    placeholder="이름을 입력해 주세요"
                    className="bg-charcoal border-white/10 text-white placeholder:text-white/30 focus:border-gold"
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm mb-2 block">
                    성
                  </label>
                  <Input
                    type="text"
                    placeholder="성을 입력해 주세요"
                    className="bg-charcoal border-white/10 text-white placeholder:text-white/30 focus:border-gold"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">
                  업무용 이메일
                </label>
                <Input
                  type="email"
                  placeholder="you@company.com"
                  className="bg-charcoal border-white/10 text-white placeholder:text-white/30 focus:border-gold"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">
                  회사명
                </label>
                <Input
                  type="text"
                  placeholder="회사명을 입력해 주세요"
                  className="bg-charcoal border-white/10 text-white placeholder:text-white/30 focus:border-gold"
                />
              </div>

              <div>
                <label className="text-white/60 text-sm mb-2 block">
                  AI 카피라이팅 관심도
                </label>
                <div className="relative">
                  <select
                    className="w-full bg-charcoal border border-white/10 text-white rounded-md px-3 py-2 appearance-none focus:border-gold focus:outline-none focus:bg-charcoal focus:ring-0"
                  >
                    <option value="">선택해 주세요</option>
                    <option value="copy-interest">관심 있어서 검토 중</option>
                    <option value="copy-serious">도입을 적극적으로 검토 중</option>
                    <option value="copy-explore">일단 둘러보고 있어요</option>
                    <option value="detail-page">AI 상세페이지 자동 생성</option>
                    <option value="video-shortform">AI 홍보 영상 및 숏폼 제작</option>
                    <option value="airless-branding">에어리스(Airless) 비주얼 스토리텔링</option>
                    <option value="eco-packaging">친환경(PCR/PLA) 브랜드 스토리 설계</option>
                    <option value="premium-pack">프리미엄 디지털 브랜드 자산 생성</option>
                    <option value="dual-chamber">이중 챔버(Dual) 기능성 설계</option>
                    <option value="global-positioning">글로벌 시장 포지셔닝 분석</option>
                    <option value="brand-dna">브랜드 DNA 정밀 진단</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
                </div>
              </div>

              <Button className="w-full bg-gradient-gold hover:bg-gradient-gold-hover text-black font-bold py-6 text-base shadow-gold mt-4">
                무료 분석 체험하기
              </Button>

              <p className="text-white/40 text-xs text-center mt-4">
                신청 시 서비스 이용약관과 개인정보처리방침에 동의하신 것으로 간주됩니다.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
