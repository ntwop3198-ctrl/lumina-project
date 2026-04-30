/**
 * Knowledge Engine 상세기획서 `/knowledge-engine/plan` — 실행 확인·로딩·결과 인장 문구.
 * 법적 공인·감사 증명이 아닌, 편집 원칙·추적 참조를 드러내는 표시로 한정한다.
 */

export const LUMINA_PLAN_TRUTH_DIALOG_TITLE = "실행 전 확인"

/** 진실 확인 팝업 본문 — 단일 소스(분할·중복 렌더 금지) */
export const LUMINA_PLAN_TRUTH_DIALOG_BODY =
  "잠시만요. 이 요청에 혹시 사실보다 더 돋보이고 싶은 '욕심'이나 '포장'이 섞여 있지는 않나요? 루미나는 수식어 뒤에 숨은 거짓을 걷어내고, 오직 꾸밈없는 알몸의 진실만을 추출합니다."

export const LUMINA_PLAN_TRUTH_CONFIRM = "예, 본질만 남기겠습니다"

export const LUMINA_PLAN_TRUTH_REVIEW = "다시 검토하겠습니다"

export const LUMINA_PLAN_TRUTH_LOADING_STEPS: readonly string[] = [
  "[Step 1] 형용사와 부사를 제거하는 중입니다…",
  "[Step 2] 2026년 4월 6일의 테스트 원칙에 따라 데이터 무결성을 검증합니다…",
  "[Step 3] 포장지를 뜯어내고 본질(Essence)을 추출하고 있습니다…",
]

export const LUMINA_PLAN_TRUTH_STAMP_HEADING = "Naked Truth — 문서 인장"

export const LUMINA_PLAN_TRUTH_STAMP_BODY =
  "본 결과물은 어떠한 수사적 왜곡도 포함되지 않은 ‘Naked Truth’임을 인증합니다. 사실이 스스로 말하게 하십시오."

/** 인장이 ‘공인’이 아님을 한 줄로 고지 (준법·투명성) */
export const LUMINA_PLAN_TRUTH_STAMP_FOOTNOTE =
  "본 표시는 법적·감사 공인 증명이 아니라, 입력을 바탕으로 생성된 기획서에 적용한 편집·준법 원칙을 나타냅니다."

/**
 * 상세기획서 마크다운 intro에 포함 — UI 진실 확인 팝업과 동일 철학을 문서에 고정한다.
 */
export const LUMINA_PLAN_TRUTH_EDITORIAL_BLOCK_MARKDOWN = `
### 편집 원칙 — Naked Truth (Knowledge Engine)

- **성찰:** 사실보다 돋보이고 싶은 욕심·포장이 요청에 섞이지 않았는지, 확정 전에 스스로 확인한다. (UI **실행** 전 **진실 확인**과 같은 철학.)
- **편집:** 수식어 뒤에 숨은 과장을 걷어내고, 입력·사실·가설·검증 절차로만 서술한다. 근거 없는 매출·전환·효능 **수치**는 생성하지 않는다.
- **출력:** **실행**을 마치면 미리보기 하단에 추적 가능한 **Naked Truth** 인장을 남길 수 있으며, 법적 공인 증명이 아니라 적용 원칙의 표시다.
`.trim()

export function appendNakedTruthStampMarkdown(
  baseMarkdown: string,
  opts: { referenceId: string; generatedAtIso: string },
): string {
  const block = [
    "",
    "---",
    "",
    `## ${LUMINA_PLAN_TRUTH_STAMP_HEADING}`,
    "",
    LUMINA_PLAN_TRUTH_STAMP_BODY,
    "",
    `- 참조 ID: \`${opts.referenceId}\``,
    `- 생성 시각(UTC): ${opts.generatedAtIso}`,
    "",
    LUMINA_PLAN_TRUTH_STAMP_FOOTNOTE,
    "",
  ].join("\n")
  return `${baseMarkdown.trimEnd()}${block}`
}
