import type { GuidelineRetriever, LegalCorpusChunk, RetrievedGuideline } from "@/lib/compliance/rag/types"
import corpus from "@/lib/compliance/rag/legal-corpus.json"

const chunks = (corpus as { chunks: LegalCorpusChunk[] }).chunks

function tokenize(s: string): string[] {
  const m = s.toLowerCase().match(/[\u3131-\u318e\uac00-\ud7a3a-z0-9]+/gi)
  return m ?? []
}

function unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr))
}

/** 로컬 시드 코퍼스 기반 BM25 유사(간이 TF 가중) 검색 — 벡터 DB 도입 전 기본 구현 */
export class KeywordGuidelineRetriever implements GuidelineRetriever {
  async retrieve(queryText: string, topK: number): Promise<RetrievedGuideline[]> {
    const qTokens = unique(tokenize(queryText))
    if (qTokens.length === 0) return []

    const scored = chunks.map((c) => {
      const hay = `${c.title} ${c.body} ${(c.tags ?? []).join(" ")}`.toLowerCase()
      let score = 0
      for (const t of qTokens) {
        if (t.length < 2) continue
        if (hay.includes(t)) score += t.length >= 3 ? 3 : 2
      }
      const tagBonus = (c.tags ?? []).some((tag) =>
        qTokens.some((qt) => tag.toLowerCase().includes(qt) || qt.includes(tag.toLowerCase())),
      )
        ? 2
        : 0
      score += tagBonus
      return { c, score }
    })

    return scored
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, topK)
      .map(({ c, score }) => ({
        id: c.id,
        title: c.title,
        excerpt: c.body.slice(0, 220) + (c.body.length > 220 ? "…" : ""),
        score,
        sourceRef: c.sourceRef,
      }))
  }
}
