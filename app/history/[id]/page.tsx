import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LANDING_LAYOUT, LANDING_TEXT } from "@/lib/design/tokens"
import { supabase, supabaseAdmin } from "@/lib/supabase"
import { CopyMarketingButton } from "@/components/history/copy-marketing-button"
import { BackgroundGenerator } from "@/components/history/background-generator"
import { AIRLESS_COPY, isAirlessContainer } from "@/lib/airless"
import { ShareLinkButton } from "@/components/history/share-link-button"
import { ExportLaunchBundleButton } from "@/components/history/export-launch-bundle-button"
import { devError } from "@/lib/dev-log"

export const dynamic = "force-dynamic"

type HistoryDetailParams = {
  params: { id: string }
}

export default async function HistoryDetailPage({ params }: HistoryDetailParams) {
  const client = supabaseAdmin ?? supabase
  if (!client) notFound()

  const { data, error } = await client
    .from("product_analyses")
    .select("id, image_url, analysis_text, analysis_style, background_image_url, created_at")
    .eq("id", params.id)
    .maybeSingle()

  if (error || !data) {
    devError("Failed to load product_analyses row:", error)
    notFound()
  }

  const createdAt = new Date(data.created_at).toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })

  const isAirless = isAirlessContainer(data.analysis_text)
  const voiceMode = data.analysis_text.includes("우리는") ? "confession" : "neutral"

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className={`pt-40 md:pt-44 ${LANDING_LAYOUT.sectionY}`}>
        <div className={LANDING_LAYOUT.container}>
          {/* 상단 헤더 */}
          <div className="max-w-4xl mx-auto mb-10 md:mb-14 flex flex-col gap-4">
            <Link
              href="/history"
              className="self-start text-xs md:text-sm text-warm-gray hover:text-rose-gold transition-colors"
            >
              ← 분석 내역 리스트로 돌아가기
            </Link>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-rose-gold mb-3">
                  Analysis Detail
                </p>
                <h1 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
                  한 번 더 천천히 살펴보는 리포트
                </h1>
                <p className="text-xs md:text-sm text-warm-gray">
                  {createdAt} 기준으로 저장된 분석 결과입니다.
                </p>
              </div>
              <ShareLinkButton path={`/history/${data.id}`} />
            </div>
          </div>

          {/* 본문 레이아웃 */}
          <div className="grid lg:grid-cols-[minmax(0,320px),minmax(0,1fr)] gap-8 lg:gap-10 max-w-5xl mx-auto">
            {/* 이미지 영역 */}
            <div className="rounded-3xl border border-rose-gold/20 bg-cream/70 shadow-sm flex items-center justify-center p-6">
              <Image
                src={data.image_url}
                alt="분석에 사용된 제품 사진"
                width={1200}
                height={1600}
                priority
                className="w-full max-h-[420px] h-auto object-contain rounded-2xl bg-white/80 border border-rose-gold/15"
                sizes="(max-width: 1024px) 100vw, 320px"
              />
            </div>

            {/* 분석 리포트 영역 */}
            <div className="rounded-3xl border border-rose-gold/20 bg-white shadow-sm p-6 md:p-7 flex flex-col gap-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold tracking-[0.25em] uppercase text-rose-gold-dark">
                    Full Analysis
                  </p>
                  <span className="inline-flex items-center rounded-full border border-rose-gold/40 bg-rose-gold/5 px-2 py-0.5 text-[10px] font-medium tracking-[0.18em] uppercase text-rose-gold-dark">
                    KR
                  </span>
                </div>
                <CopyMarketingButton text={data.analysis_text} />
                <ExportLaunchBundleButton
                  analysisMarkdown={data.analysis_text}
                  voiceMode={voiceMode}
                  productName={data.id}
                />
              </div>

              {isAirless && (
                <div className="mb-4 flex items-start gap-3 rounded-2xl border border-rose-gold/30 bg-rose-gold/5 px-3 py-2.5">
                  <span className="inline-flex items-center rounded-full border border-rose-gold/60 bg-rose-gold/20 px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-rose-gold-dark">
                    Vacuum Protection
                  </span>
                  <div className="text-left space-y-1">
                    <p className="text-xs font-medium text-charcoal">
                      {AIRLESS_COPY.headline}
                    </p>
                    <p className="text-[11px] text-warm-gray">
                      {AIRLESS_COPY.keyPoint}
                    </p>
                  </div>
                </div>
              )}

              <div className="prose prose-sm md:prose-base max-w-none prose-headings:font-serif prose-headings:text-charcoal prose-p:text-charcoal/90 prose-li:text-charcoal/90 prose-strong:text-charcoal prose-em:text-warm-gray prose-a:text-rose-gold">
                <ReactMarkdown>{data.analysis_text}</ReactMarkdown>
              </div>

              <p className={`text-xs md:text-sm ${LANDING_TEXT.secondary}`}>
                이 리포트는 업로드해 주신 제품 사진을 바탕으로 AI가 생성한 초안입니다. 그대로 복사해
                보고서·제안서·광고 카피에 붙여 쓰되, 마지막 문장은 브랜드 팀의 언어로 한 번만 다듬어
                주세요.
              </p>
            </div>
          </div>

          <BackgroundGenerator
            id={data.id}
            analysisText={data.analysis_text}
            analysisStyle={data.analysis_style ?? null}
            initialBackgroundUrl={data.background_image_url ?? null}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}

