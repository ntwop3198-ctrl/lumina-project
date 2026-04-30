import type { GuidelineRetriever } from "@/lib/compliance/rag/types"
import { KeywordGuidelineRetriever } from "@/lib/compliance/rag/keyword-retriever"
import { VectorGuidelineRetriever } from "@/lib/compliance/rag/vector-retriever"

/**
 * LUMINA_RAG_MODE:
 * - `vector` (기본 아님): LUMINA_VECTOR_QUERY_URL + KEY 가 있으면 원격 벡터 검색 시도
 * - 그 외: 키워드 시드 코퍼스 검색
 */
export function createGuidelineRetriever(): GuidelineRetriever {
  const mode = process.env.LUMINA_RAG_MODE?.trim().toLowerCase()
  if (mode === "vector") {
    return new VectorGuidelineRetriever()
  }
  return new KeywordGuidelineRetriever()
}

export type { GuidelineRetriever, RetrievedGuideline } from "@/lib/compliance/rag/types"
