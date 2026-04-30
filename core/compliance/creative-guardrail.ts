import type { ComplianceHit, RiskReport } from "@/core/compliance/risk-analyzer"
import { analyzeRisk, collectHits, getRuleById } from "@/core/compliance/risk-analyzer"
import {
  EMOTIONAL_IMPACT_TARGET,
  emotionalImpactScore,
} from "@/lib/lumina/emotional-impact-meter"
import { applyLinguisticBridge } from "@/lib/lumina/linguistic-bridge"

export type CompliancePresentation = {
  displayMarkdown: string
  report: RiskReport
  evidenceNotes: string[]
  emotionalImpact: number
  emotionalTargetMet: boolean
  alchemicalPasses: number
}

function uniqueRuleIds(hits: ComplianceHit[]): string[] {
  return Array.from(new Set(hits.map((h) => h.ruleId)))
}

function riskScoreFromHits(hits: ComplianceHit[]): number {
  let riskScore = 0
  for (const hit of hits) {
    if (hit.level === "block") riskScore += 28
    else if (hit.level === "warn") riskScore += 12
  }
  return Math.min(100, riskScore)
}

const SAFE_FLOURISHES = [
  "\n\n이 리추얼은 언어의 결을 바꾸지 않고, 당신의 피부 서사만 고요히 정돈합니다.",
  "\n\n블랙 오닉스처럼 깊게 가라앉은 아우라만이, 오늘의 정점을 말없이 기록합니다.",
  "\n\n시간의 표면이 잠시 얇아지는 듯한 순간—빛의 입자가 천천히 내려앉는 상상을 남깁니다.",
  "\n\n고결한 터치는 결과를 외치지 않고, 경외심을 천천히 쌓아 올립니다.",
]

export function composeEvidenceAppendix(originalHits: ComplianceHit[]): string {
  if (originalHits.length === 0) return ""

  const ids = uniqueRuleIds(originalHits)
  const hints: string[] = []
  for (const id of ids) {
    const rule = getRuleById(id)
    if (rule?.evidenceLinkerHint) hints.push(rule.evidenceLinkerHint)
  }

  const lines: string[] = [
    "",
    "---",
    "### 근거 연계 (Evidence linker)",
    "강한 체감·효능 인상을 주는 문장에는 **측정 가능한 근거**를 인접 배치해 과대광고가 아닌 ‘사실적 확신’으로 포지셔닝합니다.",
    "",
    "- **예시(데모)**: 저자극 패치 테스트에서 수분 증가 +18% (n=32, 평균 4주 사용) · 만족도 설문 상위 92% 응답",
    "- **권장**: 루미나 Clinical 카드의 **실제 입력 지표**를 해당 문단 바로 아래에 노출",
  ]

  if (hints.length > 0) {
    lines.push("", "**이번 초안에서 완화된 포인트별 가이드:**")
    hints.forEach((h) => lines.push(`- ${h}`))
  }

  return lines.join("\n")
}

/**
 * 컴플라이언스 잔여 0 + 감성 점수 ≥ 120까지 안전 문장만 순환 추가.
 */
function refineAlchemicalLoop(seed: string, maxPasses = 14): {
  text: string
  passes: number
  emotionalImpact: number
  emotionalTargetMet: boolean
} {
  let working = applyLinguisticBridge(seed)
  let report = analyzeRisk(working)
  working = report.safeText
  let passes = 1
  let impact = emotionalImpactScore(working)
  let fi = 0

  while (passes < maxPasses) {
    const clean = report.residualHits.length === 0

    if (clean && impact >= EMOTIONAL_IMPACT_TARGET) {
      return {
        text: working,
        passes,
        emotionalImpact: impact,
        emotionalTargetMet: true,
      }
    }

    if (!clean) {
      working = report.safeText
      report = analyzeRisk(working)
      working = report.safeText
      impact = emotionalImpactScore(working)
      passes += 1
      continue
    }

    const tryText = working + (SAFE_FLOURISHES[fi % SAFE_FLOURISHES.length] ?? "")
    fi += 1
    const next = analyzeRisk(tryText)
    if (next.residualHits.length > 0) {
      passes += 1
      continue
    }
    working = next.safeText
    report = next
    impact = emotionalImpactScore(working)
    passes += 1
  }

  return {
    text: working,
    passes,
    emotionalImpact: impact,
    emotionalTargetMet: impact >= EMOTIONAL_IMPACT_TARGET,
  }
}

export function buildCompliancePresentation(markdown: string): CompliancePresentation {
  const rawHits = collectHits(markdown)
  const loop = refineAlchemicalLoop(markdown)
  const finalScan = analyzeRisk(loop.text)

  const report: RiskReport = {
    ...finalScan,
    original: markdown,
    safeText: loop.text,
    hits: rawHits,
    riskScore: riskScoreFromHits(rawHits),
    safetyScore: finalScan.residualHits.length === 0 ? 100 : finalScan.safetyScore,
  }

  const appendix = composeEvidenceAppendix(rawHits)
  const displayMarkdown =
    appendix && rawHits.length > 0 ? `${loop.text}${appendix}` : loop.text

  const evidenceNotes = uniqueRuleIds(rawHits)
    .map((id) => getRuleById(id)?.evidenceLinkerHint)
    .filter((x): x is string => Boolean(x))

  return {
    displayMarkdown,
    report,
    evidenceNotes,
    emotionalImpact: loop.emotionalImpact,
    emotionalTargetMet: loop.emotionalTargetMet,
    alchemicalPasses: loop.passes,
  }
}
