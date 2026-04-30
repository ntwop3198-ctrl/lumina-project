/**
 * 구소(求小不求大…) — 루미나 역설 헌장. 본질·정직·己를 택하고 허상(大美净好…)을 걷는다.
 * 법적 방패: 과장·치료 표현 금지는 유지하되, 톤은 ‘완벽한 껍데기’가 아닌 진실 서술을 우선.
 */

export const GUSO_CANONICAL_LINES = [
  "求小不求大，求丑不求美。",
  "求脏不求净，求坏不求好。",
  "求空不求实，求舍不求得。",
  "求四不求八，求死不求生。",
  "你求我不求，求恶不求善。",
  "求地不求天，求错不求对。",
  "求己不求佛。",
] as const

/** UI·주석용 한 줄 요지 */
export const GUSO_CHARTER_GLOSS_KO =
  "큰·아름다움·깨끗함·좋음·얻음·팔(發)·삶·선·하늘·옳음을 쫓는 세상과 달리, 작고 투박하며 지저분해 보일 수 있는 진실·비움·버림·사·죽음·악·땅·그릇됨·己를 택한다. 외부의 부처(佛)가 아니라 스스로(己)를 구한다."

export const LUMINA_GUSO_COMPLIANCE_PRINCIPLE_KO =
  "구소 원칙: ‘완벽한 미학’ 연기보다 과대·치료 표현을 걷어낸 진술이 브랜드와 고객을 동시에 보호한다."

export function isGusoCharterEnabled(): boolean {
  return process.env.LUMINA_GUSO_CHARTER?.trim() !== "0"
}

/** Gemini 제품 분석 프롬프트 부속 */
export function buildGusoCharterPromptAppendix(): string {
  return `
## 루미나 구소 헌장 (역설적 본질 — Essence·법적 톤 정렬)
원문 요지: ${GUSO_CHARTER_GLOSS_KO}
- **1단계(Essence)**: 화려한 장식·완벽한 광고 미학보다 **Raw·여백·정직한 각도·원료의 불완전함이 드러날 수 있는 서술**을 허용한다. 다만 **법적 허위·과대·치료 표현은 금지**이다.
- **법적 완벽함의 방패**: ‘양해 바랍니다’만으로 끝내지 말고, **한계·배치차를 본질의 증거**로 연결할 때는 근거 가능한 범위 안에서만 서술한다.
- 카피는 **己(자기 철학)**에 서 있되, **佛(외부의 만능·요행)**을 연상시키는 단정·기적 서사는 피한다.`
}
