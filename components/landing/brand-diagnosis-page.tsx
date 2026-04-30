/**
 * 브랜드 진단 — 기존 브랜드 점수·취약점 분석
 */
export function BrandDiagnosisPage() {
  return (
    <div className="relative pb-20 pt-40 md:pb-28 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(201,162,39,0.12),transparent_55%)]" />
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-gold sm:text-sm">Brand Diagnosis</p>
        <h1 className="mb-6 font-serif text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
          기존 브랜드의{" "}
          <span className="italic text-gradient-gold">건강도</span>를 점검합니다
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
          포지셔닝·비주얼·카피·채널 일관성을 기준으로 점수화하고, 우선 보완할 취약점을 AI가
          정리합니다. 이미 운영 중인 브랜드의 &ldquo;지금&rdquo;을 데이터로 읽는 단계입니다.
        </p>
        <div className="mx-auto grid max-w-2xl gap-4 text-left sm:grid-cols-3">
          {[
            { t: "스코어카드", d: "브랜드 키 축별 가중 점수와 벤치마크 힌트를 제공합니다." },
            { t: "취약점 맵", d: "이탈·혼선을 유발하는 요인을 우선순위로 나열합니다." },
            { t: "액션 힌트", d: "다음 단계 가치 재창조로 넘길 수 있는 과제를 묶어 줍니다." },
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
          본 기능은 순차적으로 공개됩니다. 무료 분석으로 먼저 제품·브랜드 맥락을 등록해 주세요.
        </p>
      </div>
    </div>
  )
}
