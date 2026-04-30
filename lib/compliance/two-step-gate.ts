/**
 * 2단계 법무 검증: 1차 규칙 스캔(로컬) 후, 필요할 때만 RAG/벡터 검색.
 * LUMINA_RAG_ALWAYS=1 이면 항상 RAG (감사·디버그).
 */

const RISK_KEYWORDS =
  /치료|완치|의학|의사|부작용\s*없|100%\s*치료|주름을\s*지|기미를\s*없|시간을\s*멈|노화를\s*멈|미백된다|보장합니다/i

export function shouldRunRagRetrieval(
  rawAnalysis: string,
  hitRuleIds: string[],
): { run: boolean; reason: "hits" | "keywords" | "forced" | "skipped_clean" } {
  if (process.env.LUMINA_RAG_ALWAYS?.trim() === "1") {
    return { run: true, reason: "forced" }
  }
  if (hitRuleIds.length > 0) {
    return { run: true, reason: "hits" }
  }
  if (RISK_KEYWORDS.test(rawAnalysis)) {
    return { run: true, reason: "keywords" }
  }
  return { run: false, reason: "skipped_clean" }
}
