import Link from "next/link"

/**
 * Pages Router dedicated 404 page.
 * Keeps Next from warning when `_error` exists without `/404`,
 * and aligns copy tone with App Router `not-found`.
 */
export default function LegacyNotFoundPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "7rem 1.25rem 5rem",
        fontFamily: "system-ui, sans-serif",
        background: "radial-gradient(90% 120% at 50% 0%, #173a63 0%, #112240 46%, #081228 100%)",
        color: "#fafafa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: "42rem", margin: "0 auto" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", color: "rgba(192,192,192,0.72)" }}>
          404 · Not Found
        </p>
        <h1
          style={{
            fontSize: "2rem",
            lineHeight: 1.28,
            fontWeight: 600,
            margin: "0.9rem 0 0",
            letterSpacing: "0.01em",
            fontFamily: "Georgia, 'Noto Serif KR', serif",
          }}
        >
          루미나의 조명이 아직 닿지 않은 페이지예요
        </h1>
        <p style={{ opacity: 0.8, lineHeight: 1.72, fontSize: "0.95rem", marginTop: "1rem", maxWidth: "34rem" }}>
          주소가 잘못되었거나 준비 중인 페이지일 수 있습니다. 메인 스튜디오로 돌아가 브랜드 여정을 이어가
          보세요.
        </p>
        <div style={{ marginTop: "1.4rem" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              minWidth: "200px",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.04)",
              color: "#fafafa",
              textDecoration: "none",
              padding: "0.72rem 1.5rem",
              fontSize: "0.88rem",
              fontWeight: 500,
            }}
          >
            메인 페이지로 돌아가기
          </Link>
        </div>
      </div>
      <p style={{ marginTop: "5rem", textAlign: "center", color: "rgba(255,255,255,0.42)", fontSize: "0.75rem" }}>
        © LUMINA
      </p>
    </main>
  )
}
