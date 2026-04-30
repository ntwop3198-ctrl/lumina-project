"use client"

import Image from "next/image"
import { useState } from "react"
import { Sparkles, Loader2 } from "lucide-react"
import { CtaButton } from "@/components/landing/ui/cta-button"
import { LANDING_SURFACE, LANDING_TEXT } from "@/lib/design/tokens"
import { devError } from "@/lib/dev-log"

type BackgroundGeneratorProps = {
  id: string
  analysisText: string
  analysisStyle: string | null
  initialBackgroundUrl?: string | null
}

export function BackgroundGenerator({
  id,
  analysisText,
  analysisStyle,
  initialBackgroundUrl,
}: BackgroundGeneratorProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(initialBackgroundUrl ?? null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGenerate = async () => {
    if (loading) return
    setError(null)
    setLoading(true)

    try {
      const res = await fetch("/api/generate-background", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          product_name: "",
          analysis_text: analysisText,
          analysis_style: analysisStyle,
        }),
      })

      const json = (await res.json()) as { imageUrl?: string; error?: string }
      if (!res.ok || !json.imageUrl) {
        setError(json.error ?? "배경 이미지를 생성하지 못했습니다. 잠시 후 다시 시도해 주세요.")
        return
      }

      setImageUrl(json.imageUrl)
    } catch (e) {
      devError(e)
      setError("처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="mt-10 md:mt-14">
      <div className={`${LANDING_SURFACE.cardSoft} p-5 md:p-6`}>
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-rose-gold" />
            <h2 className="font-serif text-lg text-charcoal">
              AI Mood Board · 마케팅 배경
            </h2>
          </div>
          <CtaButton
            type="button"
            tone="secondary"
            className="px-4 py-2 text-sm"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                생성 중입니다…
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                ✨ AI 마케팅 배경 화보 기획하기
              </>
            )}
          </CtaButton>
        </div>

        {error && (
          <p className="text-sm text-red-600/90 mb-3">
            {error}
          </p>
        )}

        {loading && !imageUrl && (
          <p className={`text-sm ${LANDING_TEXT.secondary}`}>
            AI가 분석 리포트를 바탕으로 프리미엄 배경 화보를 구상하고 있습니다. 잠시만 기다려 주세요.
          </p>
        )}

        {imageUrl && (
          <div className="mt-4 md:mt-6">
            <div className="relative w-full max-h-[520px] aspect-[16/10] rounded-3xl overflow-hidden border border-rose-gold/20 bg-cream/70 shadow-lg">
              <Image
                src={imageUrl}
                alt="AI가 생성한 마케팅 배경 화보"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
            <p className={`mt-3 text-xs md:text-sm ${LANDING_TEXT.secondary}`}>
              생성된 이미지는 제품 컷을 합성하여 상세페이지나 배너에 활용하실 수 있도록, 제품 없이 배경만으로 구성되어 있습니다.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

