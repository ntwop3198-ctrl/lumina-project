/**
 * 마케팅 에이전트 랜딩 — 맞춤 전략·실행안 소개
 */
export function MarketingAgentPage() {
  return (
    <div className="relative pt-40 pb-20 md:pt-44 md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,162,39,0.12),transparent_55%)]" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gold text-xs sm:text-sm tracking-[0.35em] uppercase mb-4">
          Marketing Agent
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
          맞춤형{" "}
          <span className="italic text-gradient-gold">마케팅 전략</span>
          <br className="hidden sm:block" />
          그리고 실행안
        </h1>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          브랜드 빌더로 만든 자산과 분석 리포트를 연결해, 채널·메시지·캠페인 흐름을 AI가
          제안하고 초안 실행안까지 정리합니다. 분석 → 제작 → 마케팅의 마지막 고리를
          한 플랫폼에서 이어 갑니다.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
          {[
            {
              t: "전략 맵",
              d: "타깃·포지셔닝·채널 믹스를 데이터 기반으로 우선순위화합니다.",
            },
            {
              t: "캠페인 초안",
              d: "카피 훅, 랜딩 연계, 콘텐츠 캘린더 형태로 실행안을 뽑아냅니다.",
            },
            {
              t: "성과 루프",
              d: "분석 지표와 연동해 다음 액션을 제안하는 순환 구조를 지향합니다.",
            },
          ].map((item) => (
            <div
              key={item.t}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
            >
              <p className="text-gold text-[11px] tracking-wider uppercase mb-2">{item.t}</p>
              <p className="text-white/55 text-sm leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-white/40 text-sm">
          본 기능은 순차적으로 공개됩니다. 먼저 무료 분석으로 브랜드 프로필을 등록하면
          이후 베타 알림을 받을 수 있습니다.
        </p>
      </div>
    </div>
  )
}
