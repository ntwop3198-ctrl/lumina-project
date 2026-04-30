/**
 * Choice of Soul — 이원화 브랜딩 엔진 (본질의 길 vs 효율의 길)
 */

export type BrandSoulPathId = "natural" | "conventional"

export const LUMINA_BRAND_SOUL_STORAGE_KEY = "lumina.brandSoulPath.v1"

export const LUMINA_NATURAL_PATH_COPY_KEYWORDS_KO = [
  "본질",
  "건강",
  "안도감",
  "정직",
  "투명",
  "벚꽃",
  "미드나잇",
  "알몸",
] as const

export const LUMINA_NATURAL_PATH_COPY_KEYWORDS_EN = [
  "essence",
  "health",
  "relief",
  "honesty",
  "transparency",
  "sakura",
  "midnight",
  "bare",
] as const

export const LUMINA_CONVENTIONAL_PATH_COPY_KEYWORDS_KO = [
  "화려함",
  "즉각적 변화",
  "트렌드",
  "압도적 시선",
  "네온",
  "임팩트",
] as const

export const LUMINA_CONVENTIONAL_PATH_COPY_KEYWORDS_EN = [
  "glamour",
  "instant change",
  "trend",
  "attention",
  "neon",
  "impact",
] as const

/** 게이트 — Option 1 */
export const LUMINA_SOUL_GATE_NATURAL_TITLE_KO = "The Soul of Nature · 본질의 길"
export const LUMINA_SOUL_GATE_NATURAL_TITLE_EN = "The Soul of Nature"

export const LUMINA_SOUL_GATE_NATURAL_DESC_KO =
  "100% 순자연 유래 지향, 인공 색소·방부 최소화. 흰 수트와 투명 용기, 본연색. 고단가 하이엔드."

export const LUMINA_SOUL_GATE_NATURAL_DESC_EN =
  "Natural-origin lane, minimal synthetic dye & preservatives. White suit, clear glass, intrinsic hue — premium honesty."

export const LUMINA_SOUL_GATE_NATURAL_MESSAGE_KO =
  "당신의 건강한 본질이 곧 가장 큰 아름다움입니다."

export const LUMINA_SOUL_GATE_NATURAL_MESSAGE_EN =
  "Your healthy essence is your greatest beauty."

/** 게이트 — Option 2 */
export const LUMINA_SOUL_GATE_CONVENTIONAL_TITLE_KO = "The Glamour of Science · 효율의 길"
export const LUMINA_SOUL_GATE_CONVENTIONAL_TITLE_EN = "The Glamour of Science"

export const LUMINA_SOUL_GATE_CONVENTIONAL_DESC_KO =
  "고효능 화학 배합·인공 색소·방부 활용. 네온·강한 그래픽. 빠른 소비·대중 시장."

export const LUMINA_SOUL_GATE_CONVENTIONAL_DESC_EN =
  "High-performance conventional chemistry, synthetic color and preservation, neon graphics — fast beauty."

export const LUMINA_SOUL_GATE_CONVENTIONAL_MESSAGE_KO =
  "완벽한 포장이 선사하는 즉각적인 환상."

export const LUMINA_SOUL_GATE_CONVENTIONAL_MESSAGE_EN =
  "The instant fantasy perfect packaging promises."

export const LUMINA_SOUL_GATE_HEADLINE_KO = "진실의 문"
export const LUMINA_SOUL_GATE_HEADLINE_EN = "The First Gate"

export const LUMINA_SOUL_GATE_SUB_KO =
  "루미나가 가동할 브랜딩 알고리즘을 선택하세요. 언제든 경로를 바꿀 수 있습니다."

export const LUMINA_SOUL_GATE_SUB_EN =
  "Choose the branding algorithm Lumina will run. You can switch paths anytime."

/** 2번 경로 리포트 하단 경고 */
export const LUMINA_CONVENTIONAL_PATH_WARNING_KO =
  "화려한 포장은 시선을 끌지만, 영원한 신뢰는 본질에서 옵니다."

export const LUMINA_CONVENTIONAL_PATH_WARNING_EN =
  "Glamour captures attention; enduring trust still grows from essence."

/** 회귀의 통로 — 효율 → 본질 전환 초대 */
export const LUMINA_SOUL_RETURN_PATH_TITLE_KO = "본질의 길로 돌아오기"
export const LUMINA_SOUL_RETURN_PATH_TITLE_EN = "Return to the path of essence"

export const LUMINA_SOUL_RETURN_PATH_BODY_KO =
  "포장과 속도를 택했다가도, 나중에 독성·왜곡을 발견하고 정직한 알맹이로 옮기고 싶다면 루미나는 처음부터 다시 진단·포뮬·비주얼을 본질 모드로 재구성하는 회귀 루틴을 제공합니다. 수수료 없이 경로만 바꾸는 것이 아니라, 데이터와 캔버스를 함께 갈아엎는 ‘구원용 리프레시’입니다."

export const LUMINA_SOUL_RETURN_PATH_BODY_EN =
  "If you chose speed and shells but later want bare truth, Lumina offers a return routine: re-run diagnosis, formulation hints, and visual engine in Natural mode — a deliberate refresh of data and canvas, not a cosmetic toggle."

export function buildBrandSoulCopyEngineHint(path: BrandSoulPathId, lang: "ko" | "en" | "zh"): string {
  if (path === "natural") {
    return lang === "ko"
      ? `COPY ENGINE · NATURAL: weave ${LUMINA_NATURAL_PATH_COPY_KEYWORDS_KO.join(", ")}.`
      : `COPY ENGINE · NATURAL: weave ${LUMINA_NATURAL_PATH_COPY_KEYWORDS_EN.join(", ")}.`
  }
  return lang === "ko"
    ? `COPY ENGINE · CONVENTIONAL: weave ${LUMINA_CONVENTIONAL_PATH_COPY_KEYWORDS_KO.join(", ")}.`
    : `COPY ENGINE · CONVENTIONAL: weave ${LUMINA_CONVENTIONAL_PATH_COPY_KEYWORDS_EN.join(", ")}.`
}

export function parseBrandSoulPath(raw: string | null): BrandSoulPathId | null {
  if (raw === "natural" || raw === "conventional") return raw
  return null
}
