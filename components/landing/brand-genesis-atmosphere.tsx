"use client"

/** 브랜드 제네시스 — 메인 랜딩과 동일한 미드나잇 블루 대기 레이어 */
export function BrandGenesisAtmosphere() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#112240]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_80%_at_28%_35%,#1a5080_0%,#112240_45%,#0d1828_82%,#080f1a_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_18%_32%,rgba(192,192,192,0.06)_0%,transparent_52%)]" />
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
