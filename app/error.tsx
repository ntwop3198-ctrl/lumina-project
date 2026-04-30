"use client"

import { useEffect } from "react"
import { devError } from "@/lib/dev-log"

/**
 * 레이아웃 내부 에러 UI — Header/Footer 등 무거운 의존성 없음.
 * _next 청크 404 시에도 이 파일만 로드되면 Next의 "Missing required error components" 루프를 막을 수 있습니다.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    devError(error)
  }, [error])

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#fafafa",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "#c9a227", marginBottom: "0.75rem" }}>
        LUMINA
      </p>
      <h1 style={{ fontSize: "1.35rem", fontWeight: 600, margin: 0 }}>일시적인 오류가 났습니다</h1>
      <p style={{ marginTop: "0.75rem", maxWidth: "28rem", opacity: 0.72, fontSize: "0.9rem", lineHeight: 1.6 }}>
        {error.message || "페이지를 불러오지 못했습니다. 개발 중이라면 터미널에서 npm run dev:clean 후 다시 시도해 주세요."}
      </p>
      <div style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem", justifyContent: "center" }}>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: "0.6rem 1.25rem",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            background: "linear-gradient(135deg, #d4af37, #c9a227)",
            color: "#0a0a0a",
            fontWeight: 600,
            fontSize: "0.875rem",
          }}
        >
          다시 시도하기
        </button>
        <a
          href="/"
          style={{
            padding: "0.6rem 1.25rem",
            borderRadius: "9999px",
            border: "1px solid rgba(255,255,255,0.25)",
            color: "#fafafa",
            textDecoration: "none",
            fontSize: "0.875rem",
          }}
        >
          메인으로
        </a>
      </div>
    </main>
  )
}
