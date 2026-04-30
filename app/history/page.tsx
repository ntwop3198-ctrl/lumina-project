import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LANDING_LAYOUT } from "@/lib/design/tokens"
import { supabase, supabaseAdmin } from "@/lib/supabase"
import { devError } from "@/lib/dev-log"

export const dynamic = "force-dynamic"

type HistoryRow = {
  id: string
  image_url: string
  analysis_text: string
  created_at: string
}

type BrandInsight = {
  positioning: string
  tone: string
  persona: string
}

function deriveBrandInsights(text: string | null): BrandInsight {
  if (!text) {
    return {
      positioning: "프리미엄 스킨케어 브랜드",
      tone: "차분하고 신뢰감 있는 전문 톤",
      persona: "성분과 결과를 중시하는 20–30대",
    }
  }

  const lowered = text.toLowerCase()

  const hasAirless = lowered.includes("airless") || text.includes("에어리스")
  const hasCica = lowered.includes("cica") || text.includes("시카")
  const hasBright = lowered.includes("bright") || text.includes("브라이트닝") || text.includes("톤업")
  const hasAntiAge =
    lowered.includes("anti-aging") || text.includes("안티에이징") || text.includes("주름") || text.includes("탄력")

  let positioning = "프리미엄 스킨케어 브랜드"
  if (hasAirless && hasAntiAge) {
    positioning = "고기능 안티에이징 앰플 브랜드"
  } else if (hasBright) {
    positioning = "맑고 투명한 브라이트닝 브랜드"
  } else if (hasCica) {
    positioning = "예민 피부를 위한 진정 케어 브랜드"
  }

  let tone = "차분하고 신뢰감 있는 전문 톤"
  if (hasBright) tone = "맑고 경쾌한 럭셔리 톤"
  if (hasAntiAge) tone = "진중하면서도 강한 설득력을 가진 톤"

  let persona = "성분과 결과를 중시하는 20–30대"
  if (hasAntiAge) persona = "탄력·주름 케어에 민감한 30–40대"
  if (hasCica) persona = "마스크/자극 후 진정 케어가 필요한 민감성 피부"

  return { positioning, tone, persona }
}

function summarize(text: string): string {
  if (!text) return ""
  // 마크다운 기호 제거 및 공백 정리
  const cleaned = text
    .replace(/```/g, "")
    .split(/\r?\n/)
    .map((line) =>
      line
        .replace(/^#{1,6}\s*/g, "") // 제목 기호 제거
        .replace(/^[-*]\s+/g, "") // 리스트 기호 제거
        .trim()
    )
    .filter(Boolean)
    .join(" ")

  const sentences = cleaned
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
  const summary = sentences.slice(0, 2).join(" ").trim()
  return summary || cleaned.slice(0, 220)
}

async function fetchHistory(): Promise<HistoryRow[]> {
  const client = supabaseAdmin ?? supabase
  if (!client) return []

  const { data, error } = await client
    .from("product_analyses")
    .select("id, image_url, analysis_text, created_at")
    .order("created_at", { ascending: false })

  if (error) {
    devError("Failed to load product_analyses:", error)
    return []
  }

  return data ?? []
}

type HistoryPageProps = {
  searchParams?: {
    tag?: string
  }
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  const rows = await fetchHistory()
  const activeTag = searchParams?.tag?.toLowerCase() ?? null
  const filteredRows =
    activeTag && rows.length > 0
      ? rows.filter((row) => row.analysis_text?.toLowerCase().includes(activeTag))
      : rows

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className={`pt-40 md:pt-44 ${LANDING_LAYOUT.sectionY}`}>
        <div className={LANDING_LAYOUT.container}>
          <div className="max-w-3xl mx-auto text-center mb-8 md:mb-10">
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-rose-gold mb-3">
              History
            </p>
            <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-4">
              지금까지 함께 만든 기록들
            </h1>
            <p className="text-sm md:text-base text-warm-gray leading-relaxed">
              업로드해 주신 소중한 제품 사진과 그 위에 쌓인 AI 분석 내역을 한눈에 모아 보실 수
              있는 공간입니다.
            </p>
          </div>

          {/* 프로젝트 / 태그 필터 바 */}
          {filteredRows.length > 0 && (
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="project-filter"
                  className="text-[11px] md:text-xs text-warm-gray whitespace-nowrap"
                >
                  프로젝트
                </label>
                <select
                  id="project-filter"
                  className="text-xs md:text-sm border border-rose-gold/30 rounded-full px-3 py-1.5 bg-white text-charcoal/90 shadow-sm focus:outline-none focus:ring-1 focus:ring-rose-gold/60"
                  aria-label="프로젝트별로 히스토리를 필터링합니다"
                  disabled
                >
                  <option>전체 프로젝트 (곧 업데이트)</option>
                </select>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-[11px] md:text-xs text-warm-gray self-center">
                  태그
                </span>
                <Link
                  href={activeTag === "에어리스" ? "/history" : "/history?tag=에어리스"}
                  className={`text-[11px] md:text-xs px-3 py-1 rounded-full border ${
                    activeTag === "에어리스"
                      ? "border-rose-gold bg-rose-gold/15 text-rose-gold-dark"
                      : "border-rose-gold/25 text-warm-gray bg-cream/60 hover:border-rose-gold/40 hover:text-charcoal"
                  } transition-colors`}
                  aria-label="에어리스 태그로 필터링"
                >
                  #에어리스
                </Link>
              </div>
            </div>
          )}

          {filteredRows.length === 0 ? (
            <div className="max-w-xl mx-auto rounded-2xl border border-rose-gold/15 bg-white/60 shadow-sm px-6 py-10 text-center">
              <p className="text-charcoal font-medium mb-2">
                아직 저장된 분석 내역이 없습니다.
              </p>
              <p className="text-sm text-warm-gray leading-relaxed">
                첫 번째 제품 사진을 업로드해 주시면, 여기에서 차곡차곡 분석 기록을 확인하실 수
                있어요.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:gap-8">
              {filteredRows.map((row) => (
                <Link key={row.id} href={`/history/${row.id}`} className="block">
                  <article className="group rounded-3xl border border-rose-gold/20 bg-white shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <div className="grid md:grid-cols-[220px,1fr] gap-4 md:gap-0">
                      <div className="relative bg-sand-beige/60 border-b md:border-b-0 md:border-r border-rose-gold/15 p-4 md:p-5 flex items-center justify-center min-h-[12rem] md:w-[220px] md:min-h-[12rem]">
                        <Image
                          src={row.image_url}
                          alt="분석에 사용된 제품 사진"
                          width={440}
                          height={384}
                          className="w-full h-48 object-contain rounded-2xl bg-white/70 border border-rose-gold/10"
                          sizes="(max-width: 768px) 100vw, 220px"
                        />
                      </div>
                      <div className="p-5 md:p-7 flex flex-col gap-4">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-rose-gold-dark">
                              Saved Analysis
                            </p>
                            <span className="inline-flex items-center rounded-full border border-rose-gold/40 bg-rose-gold/5 px-2 py-0.5 text-[10px] font-medium tracking-[0.18em] uppercase text-rose-gold-dark">
                              KR
                            </span>
                          </div>
                          <p className="text-xs text-warm-gray">
                            {new Date(row.created_at).toLocaleString("ko-KR", {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="grid gap-2.5 md:grid-cols-3">
                          {(() => {
                            const insights = deriveBrandInsights(row.analysis_text)
                            return (
                              <>
                                <div className="rounded-2xl border border-rose-gold/25 bg-cream/80 px-3 py-2 text-left">
                                  <p className="text-[10px] font-sans tracking-[0.18em] uppercase text-rose-gold-dark mb-1">
                                    브랜드 포지셔닝
                                  </p>
                                  <p className="text-[11px] font-sans text-charcoal/90 leading-snug line-clamp-2">
                                    {insights.positioning}
                                  </p>
                                </div>
                                <div className="rounded-2xl border border-rose-gold/20 bg-cream/70 px-3 py-2 text-left">
                                  <p className="text-[10px] font-sans tracking-[0.18em] uppercase text-rose-gold-dark mb-1">
                                    톤 앤 매너
                                  </p>
                                  <p className="text-[11px] font-sans text-charcoal/90 leading-snug line-clamp-2">
                                    {insights.tone}
                                  </p>
                                </div>
                                <div className="rounded-2xl border border-rose-gold/20 bg-cream/70 px-3 py-2 text-left">
                                  <p className="text-[10px] font-sans tracking-[0.18em] uppercase text-rose-gold-dark mb-1">
                                    타깃 페르소나
                                  </p>
                                  <p className="text-[11px] font-sans text-charcoal/90 leading-snug line-clamp-2">
                                    {insights.persona}
                                  </p>
                                </div>
                              </>
                            )
                          })()}
                        </div>
                        <p className="text-sm md:text-base text-charcoal/90 leading-relaxed">
                          {summarize(row.analysis_text)}
                        </p>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

