/**
 * 브랜드 빌더 랜딩 — AI 기반 사이트 제작·관리 소개
 */
export function BrandBuilderPage() {
  return (
    <div className="relative pt-40 pb-20 md:pt-44 md:pb-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,162,39,0.12),transparent_55%)]" />
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-gold text-xs sm:text-sm tracking-[0.35em] uppercase mb-4">
          Brand Builder
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-6 leading-tight">
          AI 기반{" "}
          <span className="italic text-gradient-gold">사이트 제작</span>
          <br className="hidden sm:block" />
          그리고 관리
        </h1>
        <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          루미나가 분석한 브랜드 DNA를 바탕으로, 랜딩·상세·캠페인 페이지를 빠르게 구성하고
          카피·비주얼 톤을 일관되게 유지할 수 있습니다. 출시 후에도 AI가 콘텐츠 갱신과 구조
          최적화를 제안합니다.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
          {[
            { t: "스마트 레이아웃", d: "제품·캠페인 목적에 맞는 블록 구성을 자동 제안합니다." },
            { t: "톤 동기화", d: "분석 리포트와 동일한 톤앤매너로 문구를 생성·교정합니다." },
            { t: "운영 인사이트", d: "체류·전환 힌트를 반영해 섹션 순서와 CTA를 다듬습니다." },
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
          본 기능은 순차적으로 공개됩니다. 사전 알림을 원하시면 상단 &ldquo;무료 분석
          체험하기&rdquo;로 먼저 브랜드를 등록해 주세요.
        </p>
      </div>
    </div>
  )
}
