import rules from "@/compliance_rules.json"

type RuleLevel = "safe" | "warn" | "block"

type RawRule = {
  id: string
  level: RuleLevel
  patterns: string[]
  reason: string
  suggestion?: string
  safeExamples?: string[]
  /** 금지어 대신 쓸 문학적·감성 대체 은유 (순환 적용) */
  poeticAlternatives?: string[]
  /** Evidence linker 블록에 합쳐질 힌트 */
  evidenceLinkerHint?: string
}

export type ComplianceHit = {
  ruleId: string
  level: RuleLevel
  phrase: string
  reason: string
  suggestion?: string
}

export type RiskReport = {
  original: string
  safeText: string
  hits: ComplianceHit[]
  /** 위반 심각도 누적(원문 기준, 참고용) */
  riskScore: number
  /** 100 = 잔여 금지·경고 패턴 없음 */
  safetyScore: number
  /** 자동 치환 반복 횟수 */
  rewriteIterations: number
  residualHits: ComplianceHit[]
}

const parsedRules = (rules as { rules: RawRule[] }).rules

function alternativesForRule(rule: RawRule): string[] {
  const poetic = rule.poeticAlternatives ?? []
  const safe = rule.safeExamples ?? []
  const merged = [...poetic, ...safe]
  if (merged.length > 0) return merged
  if (rule.suggestion) return [rule.suggestion]
  return ["(과장 표현을 완화한 서술로 바꿉니다)"]
}

function compilePattern(pattern: string): RegExp | null {
  try {
    return new RegExp(pattern, "gi")
  } catch {
    return null
  }
}

/** 원문 스캔 — 치환 없이 히트만 수집 */
export function collectHits(text: string): ComplianceHit[] {
  const hits: ComplianceHit[] = []
  for (const rule of parsedRules) {
    for (const pattern of rule.patterns) {
      const re = compilePattern(pattern)
      if (!re) continue
      const scan = text
      let m: RegExpExecArray | null
      while ((m = re.exec(scan))) {
        const pool = alternativesForRule(rule)
        hits.push({
          ruleId: rule.id,
          level: rule.level,
          phrase: m[0],
          reason: rule.reason,
          suggestion: pool[0],
        })
      }
    }
  }
  return hits
}

/** 한 패스: 규칙 순서대로 창의적 대체 풀을 순환 적용 */
function applyOnePassCreative(text: string): string {
  let out = text
  for (const rule of parsedRules) {
    const pool = alternativesForRule(rule)
    for (const pattern of rule.patterns) {
      const re = compilePattern(pattern)
      if (!re) continue
      let i = 0
      out = out.replace(re, () => pool[i++ % pool.length])
    }
  }
  return out
}

/**
 * 식약처·과대광고 패턴이 사라질 때까지 반복 치환.
 * 단순 삭제가 아니라 poeticAlternatives → safeExamples 순으로 은유 대체.
 */
export function rewriteUntilCompliant(
  text: string,
  maxIterations = 16,
): {
  text: string
  safetyScore: number
  iterations: number
  originalHits: ComplianceHit[]
  residualHits: ComplianceHit[]
} {
  const originalHits = collectHits(text)
  let cur = text
  let iter = 0
  for (; iter < maxIterations; iter++) {
    const h = collectHits(cur)
    if (h.length === 0) {
      return {
        text: cur,
        safetyScore: 100,
        iterations: iter,
        originalHits,
        residualHits: [],
      }
    }
    const next = applyOnePassCreative(cur)
    if (next === cur) break
    cur = next
  }

  const residualHits = collectHits(cur)
  if (residualHits.length === 0) {
    return {
      text: cur,
      safetyScore: 100,
      iterations: iter,
      originalHits,
      residualHits: [],
    }
  }

  const blockW = residualHits.filter((x) => x.level === "block").length
  const warnW = residualHits.filter((x) => x.level === "warn").length
  const safetyScore = Math.max(0, Math.min(99, 100 - blockW * 28 - warnW * 14))

  return {
    text: cur,
    safetyScore,
    iterations: iter,
    originalHits,
    residualHits,
  }
}

export function analyzeRisk(text: string): RiskReport {
  const { text: safeText, safetyScore, iterations, originalHits, residualHits } =
    rewriteUntilCompliant(text)

  let riskScore = 0
  for (const hit of originalHits) {
    if (hit.level === "block") riskScore += 28
    else if (hit.level === "warn") riskScore += 12
  }
  riskScore = Math.max(0, Math.min(100, riskScore))

  return {
    original: text,
    safeText,
    hits: originalHits,
    riskScore,
    safetyScore: residualHits.length === 0 ? 100 : safetyScore,
    rewriteIterations: iterations,
    residualHits,
  }
}

export function getRuleById(id: string): RawRule | undefined {
  return parsedRules.find((r) => r.id === id)
}
