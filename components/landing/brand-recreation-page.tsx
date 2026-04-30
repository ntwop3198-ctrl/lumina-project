/**
 * 가치 재창조 — 분석 기반 브랜드 가치 AI 재설계
 */
export function BrandRecreationPage() {
  return (
    <div className="relative pb-20 pt-40 md:pb-28 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,162,39,0.12),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold sm:text-sm">Value Re-creation</p>
        <h1 className="mb-6 font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
          분석을 바탕으로{" "}
          <span className="italic text-gradient-gold">가치</span>를 다시 설계합니다
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          진단 리포트의 인사이트를 입력으로, 톤·메시지·오퍼·스토리라인을 AI가 재구성합니다.
          신규 런칭과 기존 브랜드 리프레시 모두 같은 파이프라인에서 다룹니다.
        </p>
        <div className="mx-auto grid max-w-2xl gap-4 text-left sm:grid-cols-3">
          {[
            { t: "가치 프레임", d: "핵심 베네핏과 감성 훅을 한 프레임으로 재정의합니다." },
            { t: "카피 시스템", d: "채널별 톤 가이드와 문장 세트를 초안으로 뽑아냅니다." },
            { t: "실행 로드맵", d: "캠페인·콘텐츠 순서를 제안해 바로 제작 단계로 연결합니다." },
          ].map((x) => (
            <div
              key={x.t}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
            >
              <p className="mb-2 text-[11px] uppercase tracking-wider text-gold">{x.t}</p>
              <p className="text-sm leading-relaxed text-white/55">{x.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-12 text-sm text-white/40">
          본 기능은 순차적으로 공개됩니다. 브랜드 진단 후 이어서 활용할 수 있도록 설계됩니다.
        </p>
      </div>
    </div>
  )
}
