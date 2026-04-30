"use client"

import NextImage from "next/image"
import { Upload, Play, ArrowRight, Sparkles, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { useMemo, useRef, useState } from "react"
import { supabase } from "@/lib/supabase"
import { MoodKeywordPicker, DEFAULT_MOOD, type MoodKeyword } from "@/components/landing/mood-keyword-picker"
import { AIRLESS_COPY, isAirlessContainer } from "@/lib/airless"
import {
  LANDING_ICON,
  LANDING_LAYOUT,
  LANDING_LINK,
  LANDING_MOTION,
  LANDING_SURFACE,
  LANDING_TEXT,
  LANDING_TYPE,
} from "@/lib/design/tokens"
import { CtaButton } from "@/components/landing/ui/cta-button"
import { CopyMarketingButton } from "@/components/history/copy-marketing-button"
import {
  MAX_IMAGE_BYTES,
  PRODUCT_IMAGES_BUCKET,
  sanitizeUploadFileName,
} from "@/lib/storage-config"
import { devError } from "@/lib/dev-log"

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif"

type UploadPhase = "idle" | "uploading" | "analyzing"
type AnalysisSection = { title: string; lines: string[] }
type ChannelView = "detail" | "sns" | "short"

const ANALYZE_STEPS = [
  "제품 용기의 공학적 메커니즘 분석 중입니다…",
  "5만 건의 최신 뷰티 트렌드 데이터를 매칭하고 있습니다…",
  "브랜드의 가치를 극대화할 럭셔리 카피를 집필하는 중입니다…",
] as const

const EXPERT_TIPS = [
  "광택이 있는 용기는 정면보다 살짝 45도 각도로 촬영하면 입체감이 더 잘 살아납니다.",
  "성분 카피에는 기능성 성분 1~2개만 골라 깊게 설명해 주는 편이 설득력이 높아집니다.",
  "용기 색과 내용물 색이 비슷할수록, 배경은 한 톤 더 밝게 두면 제품이 또렷해집니다.",
  "SNS용 카피에서는 첫 문장에 공감되는 상황을 적어 주면 스크롤이 멈춥니다.",
  "상세페이지 첫 화면에서 '누구를 위한 제품인지' 한 줄로 설명해 주면 이탈율이 줄어듭니다.",
] as const

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

async function resizeImage(file: File, maxSize = 1600): Promise<Blob | File> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (e) => {
      img.src = e.target?.result as string
    }
    reader.onerror = reject

    img.onload = () => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      if (!ctx) {
        resolve(file)
        return
      }

      const { width, height } = img
      const scale = Math.min(1, maxSize / Math.max(width, height))
      const targetWidth = Math.round(width * scale)
      const targetHeight = Math.round(height * scale)

      canvas.width = targetWidth
      canvas.height = targetHeight
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight)

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob)
          else resolve(file)
        },
        file.type || "image/jpeg",
        0.9
      )
    }

    img.onerror = () => reject(new Error("이미지를 불러오지 못했습니다."))
    reader.readAsDataURL(file)
  })
}

export function Hero() {
  const [isHovered, setIsHovered] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [phase, setPhase] = useState<UploadPhase>("idle")
  const [error, setError] = useState<string | null>(null)
  const [publicUrl, setPublicUrl] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<string | null>(null)
  const [selectedMood, setSelectedMood] = useState<MoodKeyword>(DEFAULT_MOOD)
  const [loadingStep, setLoadingStep] = useState(0)
  const [expertTip, setExpertTip] = useState<string | null>(null)
  const analyzeTimersRef = useRef<number[]>([])
  const [channel, setChannel] = useState<ChannelView>("detail")

  const busy = phase !== "idle"
  const sections = useMemo<AnalysisSection[]>(() => {
    if (!analysis) return []
    const lines = analysis.split("\n")
    const parsed: AnalysisSection[] = []
    let current: AnalysisSection | null = null

    for (const rawLine of lines) {
      const line = rawLine.trim()
      if (!line) continue
      if (line.startsWith("## ")) {
        if (current) parsed.push(current)
        current = { title: line.replace(/^## /, ""), lines: [] }
      } else if (current) {
        current.lines.push(line)
      } else {
        current = { title: "분석 메모", lines: [line] }
      }
    }
    if (current) parsed.push(current)
    return parsed
  }, [analysis])

  const isAirless = useMemo(() => isAirlessContainer(analysis), [analysis])
  const brandInsights = useMemo(() => deriveBrandInsights(analysis), [analysis])

  const detailCopyText = useMemo(() => {
    if (!sections.length) return ""
    return sections
      .map((section) => [section.title, ...section.lines].join("\n"))
      .join("\n\n")
  }, [sections])

  const snsCopyText =
    [
      "진공 에어리스 구조로 마지막 한 방울까지 신선하게 유지되는 프리미엄 앰플. 피부가 필요로 할 때마다 산소에 노출되지 않은 유효성분을 그대로 전달합니다.",
      "한눈에 들어오는 미니멀 패키지와 촉촉한 텍스처가 온라인 피드에서도 가격 이상의 가치를 느끼게 합니다.",
      "#에어리스앰플 #럭셔리스킨케어 #AI브랜딩",
    ].join("\n")

  const shortCopyText =
    [
      "0–3초 · 탁한 공기 속에 노출된 일반 용기와, 진공 상태를 유지하는 에어리스 앰플을 대비 컷으로 보여줍니다.",
      "4–10초 · 내용물이 산소와 빛으로부터 보호되는 단면 그래픽과 함께, “당신의 앰플은 지금 이 순간에도 죽어가고 있습니다.” 카피를 오버레이합니다.",
      "11–15초 · 실제 사용 장면과 함께 “1분 안에 완성되는 명품의 정수, AI 브랜드 마스터플랜” 슬로건으로 마무리합니다.",
    ].join("\n")

  const activeCopyText =
    channel === "detail"
      ? detailCopyText
      : channel === "sns"
      ? snsCopyText
      : shortCopyText

  async function handleAnalyze(imageUrl: string) {
    if (!imageUrl) return
    setError(null)
    setAnalysis(null)
    setExpertTip(EXPERT_TIPS[Math.floor(Math.random() * EXPERT_TIPS.length)])
    setLoadingStep(0)
    analyzeTimersRef.current.forEach((id) => window.clearTimeout(id))
    analyzeTimersRef.current = []

    ANALYZE_STEPS.forEach((_, idx) => {
      const id = window.setTimeout(
        () => setLoadingStep((prev) => (prev < idx + 1 ? idx + 1 : prev)),
        (idx + 1) * 1500
      )
      analyzeTimersRef.current.push(id)
    })

    setPhase("analyzing")

    try {
      // MOCK: 실제 AI 호출 대신 에어리스 용기 특화 카피를 바로 표시
      const mock = [
        "## 제품으로 추정되는 유형",
        "에어리스 타입 앰플 세럼",
        "",
        "## 패키징 & 무드",
        "진공 펌프 구조의 에어리스 용기로, 산소와 빛을 최대한 차단하는 고급 패키징입니다. 미니멀한 실루엣과 매트한 질감이 프리미엄 스킨케어 무드를 강조합니다.",
        "",
        "## 사진에서 읽히는 텍스트",
        "브랜드명과 기능성 성분이 전면에 배치되어 있으며, ‘에어리스(airless)’ 구조를 강조하는 키워드가 눈에 띕니다.",
        "",
        "## 상세페이지용 초안 카피 (2~3문장)",
        AIRLESS_COPY.headline,
        AIRLESS_COPY.keyPoint,
      ].join("\n")

      // 스트리밍처럼 단계적으로 채워 넣는 느낌만 유지
      setTimeout(() => {
        setAnalysis(mock)
      }, 800)
    } finally {
      setPhase("idle")
      analyzeTimersRef.current.forEach((id) => window.clearTimeout(id))
      analyzeTimersRef.current = []
    }
  }

  async function handleFile(file: File) {
    setError(null)
    setPublicUrl(null)
    setAnalysis(null)

    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 올릴 수 있어요 (JPG, PNG, WEBP, GIF).")
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("파일이 10MB보다 커요. 더 작은 사진을 선택해 주세요.")
      return
    }

    setPhase("uploading")
    try {
      const optimized = await resizeImage(file)
      const safeName = sanitizeUploadFileName(file.name)
      const path = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}`

      const { error: upErr } = await supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .upload(path, optimized, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        })

      if (upErr) {
        devError(upErr)
        setError(
          upErr.message.includes("Bucket not found")
            ? `Storage에 '${PRODUCT_IMAGES_BUCKET}' 버킷이 없어요. 프로젝트의 supabase/storage-product-images.sql 을 Supabase에서 실행했는지 확인해 주세요.`
            : `업로드에 실패했어요: ${upErr.message}`
        )
        return
      }

      const { data } = supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .getPublicUrl(path)

      const url = data.publicUrl
      setPublicUrl(url)

      // 업로드 직후 자동 분석도 수행
      await handleAnalyze(url)
    } catch (e) {
      devError(e)
      setError("처리 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.")
    } finally {
      setPhase("idle")
    }
  }

  function openPicker() {
    inputRef.current?.click()
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-sand-beige">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream/50 via-transparent to-sand-beige/80" />
      
      {/* Soft decorative elements */}
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] bg-rose-gold/5 rounded-full blur-[100px]" />
      <div className="absolute bottom-20 left-1/4 w-[300px] h-[300px] bg-rose-gold/5 rounded-full blur-[80px]" />
      
      <div className={`relative z-10 ${LANDING_LAYOUT.heroContainer} text-center pt-32 md:pt-44`}>
        {/* Brand badge */}
        <div className={`${LANDING_TYPE.sectionBadge} ${LANDING_LAYOUT.heroBadgePadding} rounded-full border border-rose-gold/20 bg-cream/80 ${LANDING_LAYOUT.heroBadgeGap}`}>
          <Sparkles className={LANDING_ICON.badge} />
          <span className={LANDING_TYPE.heroBadgeLabel}>K-Beauty AI Platform</span>
        </div>

        {/* Main headline */}
        <h1
          className={`
            font-serif 
            mb-7 
            text-4xl md:text-6xl lg:text-7xl 
            font-extrabold 
            leading-snug 
            tracking-tight
            text-charcoal
          `}
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-gold-dark via-rose-gold to-rose-gold-light">
            60초
          </span>
          , 평범한 제품이{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-gold-dark via-rose-gold to-rose-gold-light">
            럭셔리 브랜드
          </span>
          로 탈바꿈하는 시간
        </h1>

        {/* Subheadline */}
        <p
          className={`
            text-xl 
            mb-14 
            max-w-2xl 
            mx-auto 
            leading-relaxed
            text-charcoal/90
          `}
        >
          기획비 0원, 제작 기간 1분. 데이터가 증명하는 초격차 매출 성과를 직접 확인하세요.
        </p>

        {/* Glass Bottle Upload Area */}
        <div 
          className={`relative max-w-lg mx-auto ${LANDING_LAYOUT.heroBottomGap}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Outer glow */}
          <div className={`absolute -inset-2 bg-gradient-to-r from-rose-gold/15 via-rose-gold/25 to-rose-gold/15 rounded-[2rem] blur-xl ${LANDING_MOTION.fade} ${isHovered ? 'opacity-100' : 'opacity-40'}`} />
          
          {/* Glass bottle effect container */}
          <div className={`relative ${LANDING_SURFACE.cardGlass} p-6 sm:p-8 md:p-10 overflow-hidden`}>
            {/* Glass reflection effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-rose-gold/5 via-transparent to-rose-gold/10 rounded-[2rem]" />
            <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-rose-gold/30 to-transparent" />
            <div className="absolute bottom-0 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-rose-gold/15 to-transparent" />
            
            {/* Inner curved highlight */}
            <div className="absolute top-4 left-8 right-8 h-16 bg-gradient-to-b from-rose-gold/8 to-transparent rounded-full blur-md" />
            
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              className="sr-only"
              aria-hidden
              tabIndex={-1}
              onChange={(e) => {
                const file = e.target.files?.[0]
                e.target.value = ""
                if (file) void handleFile(file)
              }}
            />

            <div className="relative flex flex-col items-center gap-4 md:gap-5">
              <button
                type="button"
                onClick={openPicker}
                disabled={busy}
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-rose-gold via-rose-gold-light to-rose-gold-dark flex items-center justify-center shadow-lg shadow-rose-gold/20 ${LANDING_MOTION.fast} disabled:opacity-60 ${isHovered ? 'scale-110 shadow-xl shadow-rose-gold/30' : ''}`}
                aria-label="이미지 파일 선택"
              >
                {busy ? (
                  <Loader2 className={`${LANDING_ICON.primaryHero} animate-spin`} />
                ) : (
                  <Upload className={LANDING_ICON.primaryHero} />
                )}
              </button>

              <div className="text-center">
                <p className={`${LANDING_TEXT.brand} font-medium mb-1 text-[15px] md:text-base`}>용기 사진을 업로드하세요</p>
                <p className={`text-xs md:text-sm ${LANDING_TEXT.brandMuted}`}>PNG, JPG, WEBP (최대 10MB)</p>
                <p className={`text-xs ${LANDING_TEXT.secondary} ${LANDING_LAYOUT.helperTopGap} max-w-xs mx-auto leading-relaxed`}>
                  저장 후 서버에서 Gemini가 용기 사진을 분석해 요약·카피 초안을 만들어요.
                </p>
              </div>

              {/* 1-2-3 온보딩 가이드 */}
              <div className="w-full max-w-md mt-2">
                <div className="rounded-2xl border border-rose-gold/20 bg-cream/70 px-4 py-3 text-left">
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-rose-gold mb-2">
                    How to use
                  </p>
                  <ol className="space-y-1.5 text-[11px] md:text-xs text-warm-gray">
                    <li>
                      <span className="font-semibold text-charcoal">1.</span> 용기 사진을 업로드하면 Storage에 안전하게 저장돼요.
                    </li>
                    <li>
                      <span className="font-semibold text-charcoal">2.</span> Gemini가 이미지를 분석해 브랜드 인사이트와 채널별 카피 초안을 만듭니다.
                    </li>
                    <li>
                      <span className="font-semibold text-charcoal">3.</span> 결과는 히스토리에서 다시 열어보고, 복사·공유 버튼으로 바로 활용할 수 있어요.
                    </li>
                  </ol>
                </div>
              </div>

              <div className="w-full max-w-xl">
                <MoodKeywordPicker
                  value={selectedMood}
                  onChange={setSelectedMood}
                  disabled={busy}
                />
              </div>

              <CtaButton
                type="button"
                size="lg"
                disabled={busy}
                onClick={() => {
                  if (busy) return
                  if (!publicUrl) {
                    openPicker()
                  } else {
                    void handleAnalyze(publicUrl)
                  }
                }}
                tone="primary"
                className={`${LANDING_LAYOUT.ctaTopGap} px-6 md:px-8 py-4 md:py-5 text-sm md:text-base disabled:opacity-60`}
              >
                {phase === "uploading" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    소중한 제품 사진을 안전하게 업로드하고 있어요…
                  </>
                ) : phase === "analyzing" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    용기 사진을 기반으로 AI 분석을 준비하고 있습니다…
                  </>
                ) : (
                  <>
                    {publicUrl ? "AI 분석 시작" : "이미지 업로드"}
                    <ArrowRight className={`${LANDING_ICON.cta} ml-2`} />
                  </>
                )}
              </CtaButton>

              {error ? (
                <p className="text-sm text-red-600/90 max-w-sm leading-snug" role="alert">
                  {error}
                </p>
              ) : null}

              {phase !== "idle" && !error && (
                <div className="flex flex-col items-center gap-3 mt-4">
                  <div className="flex items-center gap-2">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="w-2 h-2 rounded-full bg-rose-gold/70"
                        initial={{ y: 0, opacity: 0.4 }}
                        animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.18,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                  {phase === "analyzing" && (
                    <div className="text-center space-y-1">
                      <p className="text-xs text-warm-gray">
                        {ANALYZE_STEPS[Math.min(loadingStep, ANALYZE_STEPS.length - 1)]}
                      </p>
                      {expertTip && (
                        <p className="text-[11px] text-warm-gray/80 max-w-xs mx-auto leading-relaxed">
                          전문가 팁 · {expertTip}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {publicUrl ? (
                <div className="w-full max-w-3xl text-left rounded-2xl border border-rose-gold/20 bg-cream/60 shadow-lg overflow-hidden">
                  <div className="grid md:grid-cols-[260px,minmax(0,1.4fr)] gap-0">
                    <div className="p-4 border-b md:border-b-0 md:border-r border-rose-gold/15 bg-sand-beige/40">
                      <p className={`${LANDING_TYPE.reportLabel} mb-2`}>업로드 완료</p>
                      <NextImage
                        src={publicUrl}
                        alt="업로드된 제품 사진 미리보기"
                        width={520}
                        height={176}
                        className="w-full h-44 object-contain rounded-lg border border-rose-gold/10 bg-white/60"
                        sizes="(max-width: 768px) 100vw, 260px"
                      />
                      <a
                        href={publicUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-2 text-xs ${LANDING_TEXT.brand} hover:underline break-all block`}
                      >
                        Storage 링크 열기
                      </a>
                    </div>

                    <div className="p-4 md:p-6 space-y-4">
                      <div className="flex items-center justify-between mb-1">
                        <p className={LANDING_TYPE.reportLabel}>Gemini 분석 리포트</p>
                        <span className={LANDING_TYPE.heroStatLabel}>Auto Generated</span>
                      </div>

                      {/* Brand DNA Insights */}
                      <div className="grid gap-2.5 md:grid-cols-3">
                        <div className="rounded-2xl border border-rose-gold/25 bg-cream/80 px-3 py-2.5 text-left">
                          <p className="text-[10px] font-sans tracking-[0.18em] uppercase text-rose-gold-dark mb-1.5">
                            브랜드 포지셔닝
                          </p>
                          <p className="text-[12px] font-sans text-charcoal/90 leading-snug">
                            {brandInsights.positioning}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-rose-gold/20 bg-cream/70 px-3 py-2.5 text-left">
                          <p className="text-[10px] font-sans tracking-[0.18em] uppercase text-rose-gold-dark mb-1.5">
                            톤 앤 매너
                          </p>
                          <p className="text-[12px] font-sans text-charcoal/90 leading-snug">
                            {brandInsights.tone}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-rose-gold/20 bg-cream/70 px-3 py-2.5 text-left">
                          <p className="text-[10px] font-sans tracking-[0.18em] uppercase text-rose-gold-dark mb-1.5">
                            타깃 페르소나
                          </p>
                          <p className="text-[12px] font-sans text-charcoal/90 leading-snug">
                            {brandInsights.persona}
                          </p>
                        </div>
                      </div>

                      {isAirless && (
                        <div className="flex items-start gap-3 rounded-2xl border border-rose-gold/30 bg-rose-gold/5 px-3 py-3">
                          <span className="inline-flex items-center rounded-full border border-rose-gold/60 bg-rose-gold/20 px-2 py-0.5 text-[10px] font-semibold tracking-[0.18em] uppercase text-rose-gold-dark">
                            Vacuum Protection
                          </span>
                          <div className="text-left space-y-1.5 max-w-md">
                            <p className="text-sm font-medium text-charcoal leading-relaxed">
                              {AIRLESS_COPY.headline}
                            </p>
                            <p className="text-[12px] text-warm-gray leading-relaxed">
                              {AIRLESS_COPY.keyPoint}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Channel Tabs + Copy Button */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-1 mb-2">
                        <div className="flex flex-wrap gap-2">
                          {[
                            { id: "detail" as ChannelView, label: "상세페이지용 리포트" },
                            { id: "sns" as ChannelView, label: "SNS 광고용 카피" },
                            { id: "short" as ChannelView, label: "숏폼 영상 스크립트" },
                          ].map((tab) => {
                            const active = channel === tab.id
                            return (
                              <button
                                key={tab.id}
                                type="button"
                                onClick={() => setChannel(tab.id)}
                                className={`rounded-full border px-3 py-1 text-[11px] font-sans transition-all ${
                                  active
                                    ? "border-rose-gold bg-rose-gold/15 text-rose-gold-dark"
                                    : "border-rose-gold/25 bg-cream/70 text-warm-gray hover:border-rose-gold/40 hover:text-charcoal"
                                }`}
                              >
                                {tab.label}
                              </button>
                            )
                          })}
                        </div>
                        {activeCopyText && <CopyMarketingButton text={activeCopyText} />}
                      </div>

                      {channel === "detail" &&
                        (sections.length > 0 ? (
                          <div className="space-y-3 max-h-72 overflow-auto pr-1">
                            {sections.map((section, sectionIndex) => (
                              <div
                                key={`${section.title}-${sectionIndex}`}
                                className={`${LANDING_SURFACE.panelSoft} p-3`}
                              >
                                <h3 className={`font-serif text-sm ${LANDING_TEXT.brand} mb-1.5`}>
                                  {section.title}
                                </h3>
                                <div className="space-y-1.5">
                                  {section.lines.map((line, lineIndex) => (
                                    <p
                                      key={`${sectionIndex}-${lineIndex}`}
                                      className={`text-sm ${LANDING_TEXT.body} leading-relaxed`}
                                    >
                                      {line}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className={`text-sm ${LANDING_TEXT.secondary}`}>
                            분석을 마무리하는 중입니다. 곧 정리된 리포트를 보여드릴게요.
                          </p>
                        ))}

                      {channel === "sns" && (
                        <div className={`${LANDING_SURFACE.panelSoft} p-3 space-y-1.5`}>
                          <h3 className={`font-serif text-sm ${LANDING_TEXT.brand} mb-1.5`}>
                            SNS 광고용 핵심 카피
                          </h3>
                          <p className={`text-sm ${LANDING_TEXT.body} leading-relaxed`}>
                            진공 에어리스 구조로 마지막 한 방울까지 신선하게 유지되는 프리미엄 앰플. 피부가
                            필요로 할 때마다 산소에 노출되지 않은 유효성분을 그대로 전달합니다.
                          </p>
                          <p className={`text-sm ${LANDING_TEXT.body} leading-relaxed`}>
                            한눈에 들어오는 미니멀 패키지와 촉촉한 텍스처가 온라인 피드에서도 가격 이상의
                            가치를 느끼게 합니다.
                          </p>
                          <p className="text-[12px] text-warm-gray mt-1">
                            #에어리스앰플 #럭셔리스킨케어 #AI브랜딩
                          </p>
                        </div>
                      )}

                      {channel === "short" && (
                        <div className={`${LANDING_SURFACE.panelSoft} p-3 space-y-1.5`}>
                          <h3 className={`font-serif text-sm ${LANDING_TEXT.brand} mb-1.5`}>
                            15초 숏폼 영상 시나리오
                          </h3>
                          <p className={`text-sm ${LANDING_TEXT.body} leading-relaxed`}>
                            0–3초 · 탁한 공기 속에 노출된 일반 용기와, 진공 상태를 유지하는 에어리스 앰플을
                            대비 컷으로 보여줍니다.
                          </p>
                          <p className={`text-sm ${LANDING_TEXT.body} leading-relaxed`}>
                            4–10초 · 내용물이 산소와 빛으로부터 보호되는 단면 그래픽과 함께, “당신의
                            앰플은 지금 이 순간에도 죽어가고 있습니다.” 카피를 오버레이합니다.
                          </p>
                          <p className={`text-sm ${LANDING_TEXT.body} leading-relaxed`}>
                            11–15초 · 실제 사용 장면과 함께 “1분 안에 완성되는 명품의 정수, AI 브랜드
                            마스터플랜” 슬로건으로 마무리합니다.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {/* Bottom links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <CtaButton
            tone="ghost"
            variant="ghost"
            className="hover:bg-transparent group"
          >
            <Play className={`${LANDING_ICON.cta} mr-2 ${LANDING_TEXT.brand} group-hover:text-rose-gold-dark`} />
            데모 영상 보기
          </CtaButton>
          
          <span className={`hidden sm:block ${LANDING_TEXT.divider}`}>|</span>
          
          <a 
            href="#" 
            className={LANDING_LINK.subtle}
          >
            신용카드 없이 무료 체험
          </a>
        </div>

        {/* Stats — 가로 3단 + 구분선 */}
        <div className={`mt-14 md:mt-20 ${LANDING_LAYOUT.heroStatGrid}`}>
          {[
            { value: "10,000+", label: "생성된 콘텐츠" },
            { value: "98%", label: "고객 만족도" },
            { value: "60초", label: "평균 제작 시간" },
          ].map((stat, index) => (
            <div key={index} className="flex flex-1 flex-col justify-center text-center px-2 sm:px-8 py-2 min-w-0">
              <div className={`${LANDING_TYPE.heroStatValue} mb-1`}>
                {stat.value}
              </div>
              <div className={LANDING_TYPE.heroStatLabel}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className={`${LANDING_TYPE.heroStatLabel} tracking-widest uppercase`}>Scroll</span>
        <div className="w-px h-6 bg-gradient-to-b from-rose-gold/40 to-transparent animate-pulse" />
      </div>
    </section>
  )
}