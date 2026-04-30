import type { LaunchBundleExport, ViralShortformPlan } from "@/lib/shortform/types"
import type { VoiceMode } from "@/lib/narrative/voice-mode"
import { buildViralShortformPlan } from "@/lib/shortform/retention-editor"

function buildAdBannerText({
  analysisMarkdown,
}: {
  analysisMarkdown: string
}): Array<{ id: string; headline: string; sub: string; cta: string }> {
  const hasAirless = /에어리스|airless/i.test(analysisMarkdown)
  const hasData = /(\d+(\.\d+)?\s*%)/.test(analysisMarkdown)
  const hasWe = analysisMarkdown.includes("우리는")

  const headlineBase = hasAirless
    ? "공기와 분리된 유효감, 오늘부터"
    : "빛과 디테일이 바꾼 사용감"

  const subBase = hasData
    ? "임상 수치로 확인되는 차이 · 스마트한 근거"
    : "디테일은 증거로 말합니다"

  const weLine = hasWe ? "우리가 고집한 이유를 확인하세요" : "당신의 시간을 더 고결하게"

  return [
    {
      id: "ad_banner_1",
      headline: headlineBase,
      sub: `${subBase}`,
      cta: "지금 상세페이지로",
    },
    {
      id: "ad_banner_2",
      headline: "900원 톤이 아닌, 정가의 품격",
      sub: weLine,
      cta: "가격선 확인",
    },
    {
      id: "ad_banner_3",
      headline: "진짜 변화는, 숫자 앞에서 끝납니다",
      sub: hasData ? "포인트 데이터가 상단에서 먼저 보입니다" : "데이터 신호를 더 선명하게",
      cta: "Fact Check 보기",
    },
    {
      id: "ad_banner_4",
      headline: "미세한 빛, 쫀쫀한 감각",
      sub: "영상 도입부 훅부터 전환 장면으로 연결",
      cta: "릴스 스크립트 받기",
    },
    {
      id: "ad_banner_5",
      headline: "루미나 런칭 기념 한정판 증정",
      sub: "파우치 수량 소진 시 자동 종료",
      cta: "한정 혜택 확인",
    },
  ]
}

export function buildLaunchBundleExport({
  analysisMarkdown,
  voiceMode,
}: {
  analysisMarkdown: string
  voiceMode: VoiceMode
}): LaunchBundleExport {
  const shortforms: ViralShortformPlan[] = [
    buildViralShortformPlan({
      analysisMarkdown,
      voiceMode,
      variantName: "instagram_reels_1_hook_punch",
    }),
    buildViralShortformPlan({
      analysisMarkdown,
      voiceMode,
      variantName: "instagram_reels_2_confession_beat",
    }),
    buildViralShortformPlan({
      analysisMarkdown,
      voiceMode,
      variantName: "instagram_reels_3_science_proof",
    }),
  ]

  const adBanners = buildAdBannerText({ analysisMarkdown })

  return { shortforms, adBanners }
}

