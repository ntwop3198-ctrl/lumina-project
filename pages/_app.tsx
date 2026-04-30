import type { AppProps } from "next/app"

/**
 * Minimal Pages Router shell — only used for `pages/_error` fallback.
 * Primary UI lives in `app/` (App Router).
 */
export default function PagesApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
