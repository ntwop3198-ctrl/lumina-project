import { buildCompliancePresentation } from "@/core/compliance/creative-guardrail"
import type { ComplianceHit, RiskReport } from "@/core/compliance/risk-analyzer"
import { getRuleById } from "@/core/compliance/risk-analyzer"
import { formatAutomatedEvidenceFooter } from "@/lib/compliance/evidence-footer"
import type { ComplianceSnapshot, FinalRefineResult } from "@/lib/compliance/refine-types"
import {
  getRefinedFromCache,
  isRefineCacheEnabled,
  refineCacheKey,
  setRefinedCache,
} from "@/lib/compliance/refine-result-cache"
import { shouldRunRagRetrieval } from "@/lib/compliance/two-step-gate"
import { createGuidelineRetriever } from "@/lib/compliance/rag"
import corpus from "@/lib/compliance/rag/legal-corpus.json"

export type { ComplianceSnapshot, FinalRefineResult } from "@/lib/compliance/refine-types"

/**
 * Gemini 등 원시 분석 텍스트 → 컴플라이언스 정제 + (조건부) RAG + 감사 푸터.
 * 동일 원문은 Upstash Redis(또는 로컬 LRU)로 재사용 (LUMINA_REFINE_CACHE=0 으로 끔).
 */
export async function runFinalRefineGate(rawAnalysis: string): Promise<FinalRefineResult> {
  if (isRefineCacheEnabled()) {
    const cached = await getRefinedFromCache(refineCacheKey(rawAnalysis))
    if (cached) return cached
  }

  const compliance = buildCompliancePresentation(rawAnalysis)
  const hitRuleIds = Array.from(new Set(compliance.report.hits.map((h) => h.ruleId)))
  const { run: runRag, reason: ragReason } = shouldRunRagRetrieval(rawAnalysis, hitRuleIds)

  const retriever = createGuidelineRetriever()
  const rag = runRag ? await retriever.retrieve(rawAnalysis.slice(0, 8000), 6) : []

  const corpusVersion =
    typeof (corpus as { version?: string }).version === "string"
      ? (corpus as { version: string }).version
      : "1.0"

  const footer = formatAutomatedEvidenceFooter({
    hitRuleIds,
    rag,
    corpusVersion,
    ragSkipped: !runRag,
    ragSkipReason: ragReason,
  })

  const refinedCoreMarkdown = compliance.displayMarkdown.trim()
  const documentForPersistence = `${refinedCoreMarkdown}\n\n${footer}`.trim()

  const snapshot: ComplianceSnapshot = {
    safetyScore: compliance.report.safetyScore,
    riskScore: compliance.report.riskScore,
    emotionalImpact: compliance.emotionalImpact,
    emotionalTargetMet: compliance.emotionalTargetMet,
    alchemicalPasses: compliance.alchemicalPasses,
    hitRuleIds,
    ragCitationIds: rag.map((r) => r.id),
    ragSkipped: !runRag,
    ragSkipReason: ragReason,
  }

  const result: FinalRefineResult = {
    documentForPersistence,
    refinedCoreMarkdown,
    snapshot,
  }

  if (isRefineCacheEnabled()) {
    await setRefinedCache(refineCacheKey(rawAnalysis), result)
  }

  return result
}

export function snapshotToRiskReport(
  snapshot: ComplianceSnapshot,
  displayMarkdown: string,
  originalMarkdown: string,
): RiskReport {
  const hits: ComplianceHit[] = []
  for (const ruleId of snapshot.hitRuleIds) {
    const rule = getRuleById(ruleId)
    const level = rule?.level === "warn" ? "warn" : rule?.level === "block" ? "block" : "warn"
    hits.push({
      ruleId,
      level,
      phrase: "·",
      reason: rule?.reason ?? "서버 Final Refine 시 참조된 규칙",
      suggestion: rule?.safeExamples?.[0],
    })
  }

  return {
    original: originalMarkdown,
    safeText: displayMarkdown,
    hits,
    riskScore: snapshot.riskScore,
    safetyScore: snapshot.safetyScore,
    rewriteIterations: snapshot.alchemicalPasses,
    residualHits: [],
  }
}
