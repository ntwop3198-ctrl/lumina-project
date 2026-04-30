import Link from "next/link"
import { GlobalHeaderBilingual } from "@/components/landing/global-header-bilingual"

/**
 * 404 — 미드나잇 랜딩과 동일 톤. dev에서 `_next` 청크 404 시에도 본문 배경이 흰 화면이 되지 않도록
 * 최소 인라인 스타일을 둡니다(포트 불일치·캐시 stale 시 진단용).
 */
export default function NotFound() {
  return (
    <main
      className="min-h-screen lumina-midnight-landing flex flex-col text-white"
      style={{
        backgroundColor: "#112240",
        minHeight: "100vh",
      }}
    >
      <GlobalHeaderBilingual variant="midnight" />
      <section className="flex flex-1 flex-col justify-center px-5 pb-20 pt-32 sm:px-8 md:px-12 md:pt-40">
        <div className="mx-auto w-full max-w-[min(42rem,70vw)] space-y-6 text-left">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.35em] text-[#C0C0C0]/70"
            style={{ color: "rgba(192, 192, 192, 0.72)" }}
          >
            404 · Not Found
          </p>
          <h1
            className="font-serif text-3xl font-semibold leading-snug tracking-wide sm:text-4xl"
            style={{ fontFamily: "Georgia, 'Noto Serif KR', serif" }}
          >
            루미나의 조명이 아직 닿지 않은 페이지예요
          </h1>
          <p className="text-sm leading-relaxed text-white/70 sm:text-base" style={{ color: "rgba(255,255,255,0.72)" }}>
            주소가 잘못되었거나 준비 중인 페이지일 수 있습니다. 메인 스튜디오로 돌아가 브랜드 여정을 이어가
            보세요.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link
              href="/"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-8 py-3 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:border-[#C0C0C0]/45 hover:text-[#C0C0C0]"
              style={{
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.04)",
                color: "#fafafa",
              }}
            >
              메인 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </section>
      <footer
        className="border-t border-white/[0.08] px-5 py-10 text-center text-[12px] text-white/45"
        style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.45)" }}
      >
        © LUMINA
      </footer>
    </main>
  )
}
