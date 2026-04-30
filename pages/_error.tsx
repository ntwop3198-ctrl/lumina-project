import type { NextPageContext } from "next"

/**
 * Pages Router fallback for `/_error` when the App Router dev bundle is corrupted
 * (e.g. `.next` deleted while `next dev` is running). Helps avoid the dev-only
 * "missing required error components" loop where even the error UI cannot load.
 */
export default function LegacyErrorPage({
  statusCode,
}: {
  statusCode?: number
}) {
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
          LUMINA · Error
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
          루미나의 조명이 잠시 흔들렸어요 {statusCode != null ? `(${statusCode})` : ""}
        </h1>
        <p style={{ opacity: 0.8, lineHeight: 1.72, fontSize: "0.95rem", marginTop: "1rem", maxWidth: "36rem" }}>
          잠시 후 새로고침하면 대부분 복구됩니다. 개발 중이라면 아래 점검 순서로 안정화할 수 있습니다.
        </p>
        <div
          style={{
            marginTop: "0.9rem",
            padding: "0.95rem 1rem",
            borderRadius: "0.75rem",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            lineHeight: 1.7,
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.86)",
          }}
        >
          <div>1) 모든 터미널을 닫고</div>
          <div>
            2) <code style={{ color: "#93c5fd" }}>npm run dev:fresh</code> 실행
          </div>
          <div>
            3) 주소를 <code style={{ color: "#93c5fd" }}>http://127.0.0.1:3001</code> 로 열기
          </div>
        </div>
      </div>
      <p style={{ marginTop: "5rem", textAlign: "center", color: "rgba(255,255,255,0.42)", fontSize: "0.75rem" }}>
        © LUMINA
      </p>
    </main>
  )
}

LegacyErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? (err as { statusCode?: number } | undefined)?.statusCode
  return { statusCode: statusCode ?? 500 }
}
