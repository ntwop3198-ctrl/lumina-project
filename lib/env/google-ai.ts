/**
 * Google Generative AI (Gemini) API key — server-side only.
 * Prefer GOOGLE_GENERATIVE_AI_API_KEY or GEMINI_API_KEY in .env / deployment secrets.
 * NEXT_PUBLIC_* is supported only as a backward-compatible fallback (exposes key to client bundle if misused).
 */
export function getGoogleGenerativeAiApiKey(): string | null {
  const fromServer =
    process.env.GOOGLE_GENERATIVE_AI_API_KEY?.trim() ||
    process.env.GEMINI_API_KEY?.trim()
  if (fromServer) return fromServer

  const legacy = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY?.trim()
  if (legacy && process.env.NODE_ENV === 'development') {
    console.warn(
      '[lumina] Using NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY is deprecated for server routes. Set GOOGLE_GENERATIVE_AI_API_KEY instead.',
    )
  }
  return legacy || null
}
