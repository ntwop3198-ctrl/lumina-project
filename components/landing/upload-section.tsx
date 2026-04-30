"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { Upload, Cloud, Sparkles, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  MoodKeywordPicker,
  DEFAULT_MOOD,
  type MoodKeyword,
} from "@/components/landing/mood-keyword-picker";
import type { SentimentMode } from "@/lib/k-beauty/k-beauty-sentiment";
import type { VoiceMode } from "@/lib/narrative/voice-mode";
import { CompliancePanel } from "@/components/dashboard/compliance-panel";
import { buildCompliancePresentation } from "@/core/compliance/creative-guardrail";
import {
  type ComplianceSnapshot,
  snapshotToRiskReport,
} from "@/lib/compliance/final-refine-gate";
import { DetailProofSection } from "@/components/storytelling/detail-proof-section";
import { ROIFeedbackPanel } from "@/components/roi/roi-feedback-panel";
import { supabase } from "@/lib/supabase";
import { devError } from "@/lib/dev-log";
import { SalesPredictor } from "@/lib/roi/sales-predictor";
import { extractPageBlueprintFromAnalysis } from "@/lib/roi/page-feature-extractor";
import {
  MAX_IMAGE_BYTES,
  PRODUCT_IMAGES_BUCKET,
  sanitizeUploadFileName,
} from "@/lib/storage-config";

const ACCEPT = "image/jpeg,image/png,image/webp,image/gif";

type UploadPhase = "idle" | "uploading" | "analyzing" | "done";

type Scores = {
  premium: number;
  consistency: number;
  market: number;
};

type ChannelView = "detail" | "sns" | "short";

function parseComplianceSnapshot(x: unknown): ComplianceSnapshot | null {
  if (!x || typeof x !== "object") return null;
  const o = x as Record<string, unknown>;
  if (typeof o.safetyScore !== "number" || typeof o.riskScore !== "number") return null;
  return {
    safetyScore: o.safetyScore,
    riskScore: o.riskScore,
    emotionalImpact: typeof o.emotionalImpact === "number" ? o.emotionalImpact : 0,
    emotionalTargetMet: Boolean(o.emotionalTargetMet),
    alchemicalPasses: typeof o.alchemicalPasses === "number" ? o.alchemicalPasses : 0,
    hitRuleIds: Array.isArray(o.hitRuleIds)
      ? o.hitRuleIds.filter((id): id is string => typeof id === "string")
      : [],
    ragCitationIds: Array.isArray(o.ragCitationIds)
      ? o.ragCitationIds.filter((id): id is string => typeof id === "string")
      : [],
    ragSkipped: typeof o.ragSkipped === "boolean" ? o.ragSkipped : undefined,
    ragSkipReason: typeof o.ragSkipReason === "string" ? o.ragSkipReason : undefined,
  };
}

async function resizeImage(file: File, maxSize = 1600): Promise<Blob | File> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve(file);
        return;
      }

      const { width, height } = img;
      const scale = Math.min(1, maxSize / Math.max(width, height));
      const targetWidth = Math.round(width * scale);
      const targetHeight = Math.round(height * scale);

      canvas.width = targetWidth;
      canvas.height = targetHeight;
      ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else resolve(file);
        },
        file.type || "image/jpeg",
        0.9
      );
    };

    img.onerror = () => reject(new Error("이미지를 불러오지 못했습니다."));
    reader.readAsDataURL(file);
  });
}

function deriveScores(analysisText: string | null): Scores {
  if (!analysisText) {
    return { premium: 0, consistency: 0, market: 0 };
  }

  const text = analysisText.toLowerCase();

  let premium = 80;
  let consistency = 80;
  let market = 80;

  if (text.includes("airless") || text.includes("에어리스")) {
    premium += 10;
    market += 5;
  }
  if (text.includes("프리미엄") || text.includes("luxury") || text.includes("럭셔리")) {
    premium += 5;
    consistency += 5;
  }
  if (text.includes("브랜드") || text.includes("brand")) {
    consistency += 5;
  }
  if (text.includes("매출") || text.includes("sales")) {
    market += 5;
  }

  const clamp = (v: number) => Math.max(0, Math.min(99, v));
  return {
    premium: clamp(premium),
    consistency: clamp(consistency),
    market: clamp(market),
  };
}

export function UploadSection() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [phase, setPhase] = useState<UploadPhase>("idle");
  const [error, setError] = useState<string | null>(null);
  const [hasResult, setHasResult] = useState(false);
  const [historyId, setHistoryId] = useState<string | null>(null);
  const [scores, setScores] = useState<Scores>({
    premium: 0,
    consistency: 0,
    market: 0,
  });
  const [displayScores, setDisplayScores] = useState<Scores>({
    premium: 0,
    consistency: 0,
    market: 0,
  });
  const [channel, setChannel] = useState<ChannelView>("detail");
  const [selectedMood, setSelectedMood] = useState<MoodKeyword>(DEFAULT_MOOD);
  const [sentimentMode, setSentimentMode] = useState<SentimentMode>("empathy");
  const [narrativeStructure, setNarrativeStructure] = useState(true);
  const [voiceMode, setVoiceMode] = useState<VoiceMode>("neutral");
  const [analysisMarkdown, setAnalysisMarkdown] = useState<string | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [serverCompliance, setServerCompliance] = useState<ComplianceSnapshot | null>(null);

  const predictor = useMemo(() => new SalesPredictor(), []);

  const roiPrediction = useMemo(() => {
    if (!hasResult || !analysisMarkdown) return null
    return predictor.predict(
      extractPageBlueprintFromAnalysis({
        analysisMarkdown,
        productImageUrl: previewImageUrl,
        voiceMode,
        trustPresent: true,
      })
    )
  }, [analysisMarkdown, hasResult, previewImageUrl, predictor, voiceMode])

  const compliancePresentation = useMemo(() => {
    if (!analysisMarkdown) return null;
    if (serverCompliance) {
      return {
        displayMarkdown: analysisMarkdown,
        report: snapshotToRiskReport(
          serverCompliance,
          analysisMarkdown,
          analysisMarkdown,
        ),
        evidenceNotes: [] as string[],
        emotionalImpact: serverCompliance.emotionalImpact,
        emotionalTargetMet: serverCompliance.emotionalTargetMet,
        alchemicalPasses: serverCompliance.alchemicalPasses,
      };
    }
    return buildCompliancePresentation(analysisMarkdown);
  }, [analysisMarkdown, serverCompliance]);

  function openPicker() {
    inputRef.current?.click();
  }

  async function handleAnalyze(imageUrl: string) {
    setPhase("analyzing");
    setError(null);

    try {
      const res = await fetch("/api/analyze-product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl,
          mood: selectedMood,
          sentimentMode,
          narrativeStructure,
          voiceMode,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "AI 분석 호출에 실패했어요.");
      }

      const data = await res.json();
      const analysisText =
        typeof data === "string"
          ? data
          : data.analysis_text || data.analysis || data.result || "";

      setAnalysisMarkdown(analysisText || null);
      setPreviewImageUrl(imageUrl);
      setServerCompliance(parseComplianceSnapshot(data.compliance));

      const nextHistoryId =
        typeof data.historyId === "string"
          ? data.historyId
          : typeof data.id === "string"
          ? data.id
          : null;

      const nextScores = deriveScores(analysisText);

      setScores(nextScores);
      setHasResult(true);
      setHistoryId(nextHistoryId);

      // 애니메이션 효과를 위해 0에서 목표값으로 부드럽게 전환
      setDisplayScores({ premium: 0, consistency: 0, market: 0 });
      requestAnimationFrame(() => {
        setDisplayScores(nextScores);
      });

      setPhase("done");
    } catch (e) {
      devError(e);
      setError(
        "AI 분석이 잠시 지연되고 있어요.\n잠시 후 다시 시도해 보거나, 다른 사진으로 한 번만 더 테스트해 주세요."
      );
      setPhase("idle");
      setHistoryId(null);
      setAnalysisMarkdown(null);
      setPreviewImageUrl(null);
      setServerCompliance(null);
    }
  }

  async function handleFile(file: File) {
    setError(null);
    setHasResult(false);
    setHistoryId(null);
    setAnalysisMarkdown(null);
    setPreviewImageUrl(null);
    setServerCompliance(null);
    setScores({ premium: 0, consistency: 0, market: 0 });
    setDisplayScores({ premium: 0, consistency: 0, market: 0 });

    if (!file.type.startsWith("image/")) {
      setError("이미지 파일만 올릴 수 있어요 (JPG, PNG, WEBP, GIF).");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("파일이 10MB보다 커요. 더 작은 사진을 선택해 주세요.");
      return;
    }

    setPhase("uploading");
    try {
      const optimized = await resizeImage(file);
      const safeName = sanitizeUploadFileName(file.name);
      const path = `uploads/${Date.now()}-${crypto.randomUUID().slice(0, 8)}-${safeName}`;

      const { error: upErr } = await supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .upload(path, optimized, {
          cacheControl: "3600",
          upsert: false,
          contentType: file.type,
        });

      if (upErr) {
        devError(upErr);
        setError(
          upErr.message.includes("Bucket not found")
            ? `Storage에 '${PRODUCT_IMAGES_BUCKET}' 버킷이 없어요. Supabase에서 스토리지 초기 설정 SQL을 실행했는지 확인해 주세요.`
            : `업로드에 실패했어요: ${upErr.message}`
        );
        setPhase("idle");
        return;
      }

      const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
      const url = data.publicUrl;

      await handleAnalyze(url);
    } catch (e) {
      devError(e);
      setError("처리 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.");
      setPhase("idle");
    }
  }

  const premiumWidth = `${displayScores.premium}%`;
  const consistencyWidth = `${displayScores.consistency}%`;
  const marketWidth = `${displayScores.market}%`;

  return (
    <section id="upload" className="bg-cream py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-gold text-sm tracking-[0.3em] mb-4 uppercase">
            제품 사진 업로드 및 AI 분석
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl text-charcoal mb-6">
            제품 사진 업로드 및{" "}
            <span className="italic text-gradient-gold">AI 분석</span>
          </h2>
          <p className="text-charcoal/60 max-w-2xl mx-auto text-lg">
            Chic · Dreamy · Bold · Minimal 중 감성만 고르고 사진을 올리세요. 루미나가 그 톤에 맞춰 패키징 인사이트와 카피를 설계합니다.
          </p>
        </div>

        {/* Upload Interface — lg에서 두 열 높이 동일, 오른쪽 검정 박스가 아래까지 채움 */}
        <div className="grid lg:grid-cols-2 gap-8 lg:items-stretch">
          {/* Upload Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-cream-dark/50 overflow-hidden lg:h-full lg:flex lg:flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-dark/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <Upload className="w-5 h-5 text-gold" />
                <span className="font-medium text-charcoal">제품 사진 올리기</span>
              </div>
              <span className="text-xs text-gold bg-gold/10 px-3 py-1 rounded-full">
                {phase === "uploading"
                  ? "제품 사진을 깨끗하게 다듬는 중입니다…"
                  : phase === "analyzing"
                  ? "AI가 패키지와 브랜드 분위기를 읽고 있어요…"
                  : "AI 분석 준비가 완료되었습니다"}
              </span>
            </div>

            {/* Hidden input */}
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                e.target.value = "";
                if (file) {
                  void handleFile(file);
                }
              }}
            />

            {/* Upload Area */}
            <div className="p-6 space-y-6">
              <MoodKeywordPicker
                value={selectedMood}
                onChange={setSelectedMood}
                disabled={phase === "uploading" || phase === "analyzing"}
              />
              <div className="rounded-2xl border border-cream-dark/40 bg-cream/50 px-4 py-3">
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-charcoal/55 mb-2">
                  카피 톤
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={phase === "uploading" || phase === "analyzing"}
                    onClick={() => setSentimentMode("direct")}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                      sentimentMode === "direct"
                        ? "bg-charcoal text-cream"
                        : "bg-white text-charcoal/70 border border-cream-dark/50 hover:border-gold/30"
                    }`}
                  >
                    Direct · 정보
                  </button>
                  <button
                    type="button"
                    disabled={phase === "uploading" || phase === "analyzing"}
                    onClick={() => setSentimentMode("empathy")}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                      sentimentMode === "empathy"
                        ? "bg-charcoal text-cream"
                        : "bg-white text-charcoal/70 border border-cream-dark/50 hover:border-gold/30"
                    }`}
                  >
                    Empathy · 공감
                  </button>
                </div>
                <p className="text-[11px] text-charcoal/45 mt-2 leading-relaxed">
                  {sentimentMode === "direct"
                    ? "성분·기능을 명확히 전달하는 톤입니다."
                    : "통점·리추얼을 건드리는 서정적 톤입니다. K-커뮤니티 어휘를 자연스럽게 녹입니다."}
                </p>
              </div>
              <div className="rounded-2xl border border-cream-dark/40 bg-cream/50 px-4 py-3 space-y-3">
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-charcoal/55">
                  서사 · 목소리
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={phase === "uploading" || phase === "analyzing"}
                    onClick={() => setNarrativeStructure(true)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                      narrativeStructure
                        ? "bg-charcoal text-cream"
                        : "bg-white text-charcoal/70 border border-cream-dark/50 hover:border-gold/30"
                    }`}
                  >
                    4단계 서사
                  </button>
                  <button
                    type="button"
                    disabled={phase === "uploading" || phase === "analyzing"}
                    onClick={() => setNarrativeStructure(false)}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                      !narrativeStructure
                        ? "bg-charcoal text-cream"
                        : "bg-white text-charcoal/70 border border-cream-dark/50 hover:border-gold/30"
                    }`}
                  >
                    짧은 카피만
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={phase === "uploading" || phase === "analyzing"}
                    onClick={() => setVoiceMode("neutral")}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                      voiceMode === "neutral"
                        ? "bg-charcoal text-cream"
                        : "bg-white text-charcoal/70 border border-cream-dark/50 hover:border-gold/30"
                    }`}
                  >
                    중립 서술
                  </button>
                  <button
                    type="button"
                    disabled={phase === "uploading" || phase === "analyzing"}
                    onClick={() => setVoiceMode("confession")}
                    className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                      voiceMode === "confession"
                        ? "bg-charcoal text-cream"
                        : "bg-white text-charcoal/70 border border-cream-dark/50 hover:border-gold/30"
                    }`}
                  >
                    Confession · 우리는
                  </button>
                </div>
                <p className="text-[11px] text-charcoal/45 leading-relaxed">
                  {narrativeStructure
                    ? "발견 → 정제 → 치유 → 약속 순으로 상세페이지가 읽힙니다."
                    : "기존처럼 짧은 상세 카피 블록만 요청합니다."}{" "}
                  {voiceMode === "confession"
                    ? "브랜드 철학을 ‘우리는’으로 고백합니다."
                    : ""}
                </p>
              </div>
              <div
                role="button"
                tabIndex={0}
                onClick={openPicker}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openPicker();
                  }
                }}
                className="w-full border-2 border-dashed border-cream-dark rounded-xl p-12 text-center hover:border-gold/50 transition-colors cursor-pointer group bg-cream/40"
              >
                <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/10 transition-colors">
                  <Cloud className="w-8 h-8 text-gold" />
                </div>
                <p className="text-charcoal font-medium mb-2">
                  이곳에 제품 이미지를 끌어다 놓거나 클릭하여 선택하세요
                </p>
                <p className="text-charcoal/50 text-sm mb-4">
                  PNG, JPG, WEBP · 최대 10MB
                </p>
                <Button
                  type="button"
                  className="bg-gradient-gold hover:bg-gradient-gold-hover text-black font-medium shadow-gold"
                  onClick={openPicker}
                >
                  파일 선택하기
                </Button>
              </div>

              {error && (
                <p className="mt-4 text-sm text-red-600/90" role="alert">
                  {error}
                </p>
              )}
            </div>
          </div>

          {/* Analysis Preview Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-cream-dark/50 overflow-hidden lg:h-full lg:flex lg:flex-col lg:min-h-0">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-cream-dark/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-gold" />
                <span className="font-medium text-charcoal">AI 브랜드 DNA 분석 결과</span>
              </div>
            </div>

            {/* Analysis Content */}
            <div className="p-6 flex-1 flex flex-col min-h-0">
              <div className="bg-charcoal rounded-xl p-6 text-white flex-1 flex flex-col min-h-0">
                {/* Preview Header */}
                <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-gold" />
                  <span className="text-gold text-sm">
                    {phase === "analyzing"
                      ? "AI가 제품 이미지를 분석하고 있습니다…"
                      : hasResult
                      ? "AI 분석이 완료되었습니다!"
                      : "분석을 시작하면 결과가 여기 표시됩니다"}
                  </span>
                </div>

                {/* Analysis Results */}
                <div className="space-y-4 flex-shrink-0">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">프리미엄 지수</span>
                      <span className="text-gold">
                        {hasResult ? `${scores.premium}%` : "--"}
                      </span>
                    </div>
                    <div className="h-2 bg-charcoal-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-gold rounded-full transition-all duration-700 ease-out"
                        style={{ width: hasResult ? premiumWidth : "0%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">브랜드 정체성 일치도</span>
                      <span className="text-gold">
                        {hasResult ? `${scores.consistency}%` : "--"}
                      </span>
                    </div>
                    <div className="h-2 bg-charcoal-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-gold rounded-full transition-all duration-700 ease-out"
                        style={{ width: hasResult ? consistencyWidth : "0%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-white/60">시장 매력도(매출 기대치)</span>
                      <span className="text-gold">
                        {hasResult ? `${scores.market}%` : "--"}
                      </span>
                    </div>
                    <div className="h-2 bg-charcoal-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-gold rounded-full transition-all duration-700 ease-out"
                        style={{ width: hasResult ? marketWidth : "0%" }}
                      />
                    </div>
                  </div>

                  {hasResult && compliancePresentation ? (
                    <div className="pt-2">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-white/60">법적 안전성 점수</span>
                        <span
                          className={
                            compliancePresentation.report.safetyScore >= 100
                              ? "text-emerald-300"
                              : "text-amber-200"
                          }
                        >
                          {compliancePresentation.report.residualHits.length === 0
                            ? "100"
                            : `${Math.round(compliancePresentation.report.safetyScore)}`}
                          <span className="text-white/40 text-xs"> / 100</span>
                        </span>
                      </div>
                      <div className="h-2 bg-charcoal-light rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ease-out ${
                            compliancePresentation.report.safetyScore >= 100
                              ? "bg-emerald-400/90"
                              : "bg-amber-400/90"
                          }`}
                          style={{
                            width: hasResult
                              ? `${Math.min(100, Math.round(compliancePresentation.report.safetyScore))}%`
                              : "0%",
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                </div>

                {hasResult && compliancePresentation ? (
                  <div className="mt-4 flex-shrink-0">
                    <CompliancePanel
                      sectionTitle="Shield & Sword · 실시간 컴플라이언스"
                      report={compliancePresentation.report}
                      emotionalImpact={compliancePresentation.emotionalImpact}
                      emotionalTargetMet={compliancePresentation.emotionalTargetMet}
                      alchemicalPasses={compliancePresentation.alchemicalPasses}
                    />
                  </div>
                ) : null}

                {/* Brand DNA Insights (static for Upload preview) */}
                <div className="mt-6 grid gap-2.5 md:grid-cols-3 flex-shrink-0">
                  <div className="rounded-2xl border border-gold/30 bg-white/5 px-3 py-2.5 text-left">
                    <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-gold mb-1.5">
                      브랜드 포지셔닝
                    </p>
                    <p className="font-sans text-[12px] text-white/85 leading-snug">
                      프리미엄 스킨케어 브랜드
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gold/25 bg-white/5 px-3 py-2.5 text-left">
                    <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-gold mb-1.5">
                      톤 앤 매너
                    </p>
                    <p className="font-sans text-[12px] text-white/85 leading-snug">
                      차분하고 신뢰감 있는 전문 톤
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gold/25 bg-white/5 px-3 py-2.5 text-left">
                    <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-gold mb-1.5">
                      타깃 페르소나
                    </p>
                    <p className="font-sans text-[12px] text-white/85 leading-snug">
                      성분과 결과를 중시하는 20–30대
                    </p>
                  </div>
                </div>

                {/* Channel Tabs */}
                <div className="mt-4 mb-2 flex flex-wrap gap-2 flex-shrink-0">
                  {[
                    { id: "detail" as ChannelView, label: "상세페이지용 리포트" },
                    { id: "sns" as ChannelView, label: "SNS 광고용 카피" },
                    { id: "short" as ChannelView, label: "숏폼 영상 스크립트" },
                  ].map((tab) => {
                    const active = channel === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setChannel(tab.id)}
                        className={`rounded-full border px-3 py-1 text-[11px] font-sans transition-all ${
                          active
                            ? "border-gold bg-gold/20 text-black"
                            : "border-white/15 bg-white/5 text-white/70 hover:border-gold/50 hover:text-white"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>

                {/* Channel Content (static preview) */}
                {channel === "detail" && (
                  <div className="mt-2 text-left flex-shrink-0">
                    <p className="font-sans text-[12px] text-white/90 leading-relaxed">
                      이 이미지를 기반으로 한 브랜드 스토리, 성분 설명, 사용감 묘사까지 한 번에 정리된
                      상세페이지 초안을 받아보실 수 있습니다.
                    </p>
                  </div>
                )}

                {channel === "sns" && (
                  <div className="mt-1 text-left space-y-1.5 flex-shrink-0">
                    <p className="font-sans text-[12px] text-white/80 leading-relaxed">
                      “한 번의 펌핑으로 마지막 한 방울까지 신선하게, 프리미엄 에어리스 앰플”
                    </p>
                    <p className="font-sans text-[12px] text-white/80 leading-relaxed">
                      “빛과 공기에서 완전히 분리된 진짜 유효성분, 오늘 밤 피부에만 허락하세요”
                    </p>
                    <p className="font-sans text-[11px] text-white/60">
                      #에어리스앰플 #럭셔리스킨케어 #AI브랜딩
                    </p>
                  </div>
                )}

                {channel === "short" && (
                  <div className="mt-1 text-left space-y-1.5 flex-shrink-0">
                    <p className="font-sans text-[12px] text-white/80 leading-relaxed">
                      0–3초 · 공기 중에 노출된 일반 용기와, 진공 상태를 유지하는 에어리스 용기를 대비 컷으로 보여줍니다.
                    </p>
                    <p className="font-sans text-[12px] text-white/80 leading-relaxed">
                      4–10초 · 내용물이 보호되는 단면 그래픽과 함께 한 줄 카피를 오버레이합니다.
                    </p>
                    <p className="font-sans text-[12px] text-white/80 leading-relaxed">
                      11–15초 · 실제 사용 장면과 함께 브랜드 슬로건으로 마무리합니다.
                    </p>
                  </div>
                )}

                {/* 왼쪽 열 높이만큼 검정 영역이 내려오도록 여백 확장 */}
                <div className="flex-1 min-h-4" aria-hidden />

                {/* Recommendations */}
                <div className="pt-6 border-t border-white/10 flex-shrink-0">
                  <p className="font-sans text-white/60 text-xs mb-3">AI 분석 제안</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="font-sans bg-gold/20 text-gold text-xs px-[14px] py-1 rounded-full">
                      패키징 고도화
                    </span>
                    <span className="font-sans bg-white/10 text-white/70 text-xs px-[14px] py-1 rounded-full">
                      타이포 정교화
                    </span>
                    <span className="font-sans bg-white/10 text-white/70 text-xs px-[14px] py-1 rounded-full">
                      컬러 최적화
                    </span>
                  </div>
                </div>

                {hasResult && historyId && (
                  <div className="mt-4 flex justify-end flex-shrink-0">
                    <Link
                      href={`/history/${historyId}`}
                      className="inline-flex items-center rounded-full bg-white text-charcoal px-4 py-1.5 text-[11px] font-medium hover:bg-gold/10 hover:text-white transition-colors"
                    >
                      히스토리에서 자세히 보기
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {hasResult && analysisMarkdown && (
          <div className="mt-16 lg:mt-24 max-w-4xl mx-auto">
            {roiPrediction ? <ROIFeedbackPanel prediction={roiPrediction} /> : null}
            <p className="text-center text-gold text-xs tracking-[0.35em] mb-3 uppercase">
              Scroll-Storytelling
            </p>
            <h3 className="font-serif text-2xl md:text-3xl text-center text-charcoal mb-2">
              발견에서 약속까지
            </h3>
            <p className="text-center text-sm text-charcoal/55 mb-10 max-w-xl mx-auto leading-relaxed">
              시네마틱 페이드인과 제품 컷 배경으로 서사를 읽은 뒤, Fact Check로 전환되어 임상 수치와 시그니처 배지가 이어집니다.
            </p>
            <DetailProofSection
              markdown={
                compliancePresentation?.displayMarkdown ?? analysisMarkdown
              }
              productImageUrl={previewImageUrl}
            />
          </div>
        )}
      </div>
    </section>
  );
}
