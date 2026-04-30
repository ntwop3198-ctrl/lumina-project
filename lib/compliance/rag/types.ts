/** RAG · 식약처/가이드라인 검색 공통 타입 (벡터 DB 연동 시 동일 스키마 유지) */

export type LegalCorpusChunk = {
  id: string
  title: string
  body: string
  tags?: string[]
  /** 예: MFDS-COSMETICS-LABEL-2024 (실제 문서 연결 시) */
  sourceRef?: string
}

export type RetrievedGuideline = {
  id: string
  title: string
  excerpt: string
  score: number
  sourceRef?: string
}

export type GuidelineRetriever = {
  retrieve(queryText: string, topK: number): Promise<RetrievedGuideline[]>
}
