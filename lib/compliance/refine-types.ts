export type ComplianceSnapshot = {
  safetyScore: number
  riskScore: number
  emotionalImpact: number
  emotionalTargetMet: boolean
  alchemicalPasses: number
  hitRuleIds: string[]
  ragCitationIds: string[]
  /** 2단계 게이트: RAG 미호출 시 */
  ragSkipped?: boolean
  ragSkipReason?: string
}

export type FinalRefineResult = {
  documentForPersistence: string
  refinedCoreMarkdown: string
  snapshot: ComplianceSnapshot
}
