/**
 * 개발 환경에서만 stderr 로그 — 클라이언트·서버 공통 (NODE_ENV 인라인).
 */
export function devError(...args: unknown[]): void {
  if (process.env.NODE_ENV !== "development") return
  // 개발 전용 로그 싱크 — 프로덕션 번들에서는 위 분기로 제거됨
  // eslint-disable-next-line no-console -- devError 전용
  console.error(...args)
}
