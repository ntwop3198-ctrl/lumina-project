import { Head, Html, Main, NextScript } from "next/document"

/**
 * Required when `pages/_error` (or other `pages/*`) is present so production
 * builds can resolve the Pages Router document entry.
 */
export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
