import type { GuidelineRetriever, RetrievedGuideline } from "@/lib/compliance/rag/types"
import { KeywordGuidelineRetriever } from "@/lib/compliance/rag/keyword-retriever"

/**
 * 벡터 DB(Pinecone, pgvector, Supabase Vector 등) 연동용 플레이스홀더.
 * 환경 변수가 없으면 KeywordGuidelineRetriever로 폴백합니다.
 *
 * 향후: OPENAI_API_KEY + 임베딩 → 벡터 업서트/쿼리 구현.
 */
export class VectorGuidelineRetriever implements GuidelineRetriever {
  private fallback = new KeywordGuidelineRetriever()

  async retrieve(queryText: string, topK: number): Promise<RetrievedGuideline[]> {
    const endpoint = process.env.LUMINA_VECTOR_QUERY_URL?.trim()
    const key = process.env.LUMINA_VECTOR_QUERY_KEY?.trim()

    if (!endpoint || !key) {
      return this.fallback.retrieve(queryText, topK)
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({ query: queryText, topK }),
        signal: AbortSignal.timeout(8000),
      })
      if (!res.ok) return this.fallback.retrieve(queryText, topK)
      const data = (await res.json()) as { results?: RetrievedGuideline[] }
      if (!Array.isArray(data.results) || data.results.length === 0) {
        return this.fallback.retrieve(queryText, topK)
      }
      return data.results.slice(0, topK)
    } catch {
      return this.fallback.retrieve(queryText, topK)
    }
  }
}
