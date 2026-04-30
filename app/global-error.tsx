"use client"

"use client"

import { useEffect } from "react"
import { devError } from "@/lib/dev-log"

/**
 * Root 레이아웃까지 대체하는 글로벌 에러 UI.
 * Next.js 요구사항: `error` + `reset` props, 그리고 `<html>` / `<body>` 필수.
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/global-error
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const pathname = typeof window !== "undefined" ? window.location.pathname : ""

  useEffect(() => {
    devError(error)
  }, [error])

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>오류 · LUMINA</title>
        <style>{`
          * { box-sizing: border-box; }
          body {
            margin: 0;
            font-family: ui-sans-serif, system-ui, sans-serif;
            padding: 2rem;
            background: #fafafa;
            color: #171717;
            font-size: 14px;
            min-height: 100vh;
          }
          .error-container { max-width: 560px; }
          .error-header { display: flex; align-items: center; gap: 12px; }
          .error-icon {
            width: 20px; height: 20px; border-radius: 50%;
            background: #fef2f2; color: #b91c1c;
            display: flex; align-items: center; justify-content: center;
            font-weight: 600; font-size: 12px; flex-shrink: 0;
          }
          .error-message { margin: 0; font-weight: 500; line-height: 1.5; }
          .error-message code { background: #e5e5e5; padding: 0.1em 0.3em; }
          .error-summary { margin: 0.5rem 0 0 2rem; font-size: 13px; color: #b91c1c; line-height: 1.5; }
          .actions { margin-top: 1.25rem; display: flex; flex-wrap: wrap; gap: 0.5rem; }
          button, a.btn {
            cursor: pointer;
            border: 1px solid #d4d4d4;
            background: #fff;
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
            font-size: 13px;
          }
          button.primary { background: #171717; color: #fff; border-color: #171717; }
          pre.stack {
            margin-top: 1rem; padding: 1rem; background: #f5f5f5; overflow: auto;
            font-size: 11px; line-height: 1.5; max-height: 240px;
          }
        `}</style>
      </head>
      <body>
        <div className="error-container">
          <div className="error-header">
            <div className="error-icon">!</div>
            <div>
              <p className="error-message">
                페이지를 불러오는 중 오류가 발생했습니다{" "}
                <code>{pathname || "/"}</code>
              </p>
            </div>
          </div>
          <div className="error-summary">{error.message || "Unknown error"}</div>
          <div className="actions">
            <button type="button" className="primary" onClick={() => reset()}>
              다시 시도
            </button>
            <a className="btn" href="/">
              메인으로
            </a>
          </div>
          {error.stack ? <pre className="stack">{error.stack}</pre> : null}
        </div>
      </body>
    </html>
  )
}
