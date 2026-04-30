/**
 * 역설의 엔진 (Paradox Engine) — Genesis 핵심 가치
 * 求小 Essentialism · 求死 Transformation · 求己 Self-Reliance · 求忘 The Void
 */

/** 求死 — 낡은 브랜딩 관습을 깨는 카피/제안용 Gemini generationConfig */
export const GENESIS_TRANSFORMATION_GENERATION_CONFIG = {
  temperature: 0.92,
  topP: 0.93,
  topK: 64,
} as const

export const GENESIS_TRANSFORMATION_SYSTEM_APPEND_KO = `
## 역설 모드 (求死 · Transformation)
- 낡은 K-뷰티·명품 카피 클리셰를 **의도적으로 깨는** 대안을 1안 제시해도 된다.
- 과장 효능·허위 수치는 금지. **구조·비유·리듬**으로 낡은 틀을 벗어난다.
- 안전한 평문 나열보다, 한 번의 **과감한 재프레이밍**을 우선한다.`

/**
 * 求小 (Essentialism) — 수식어·장황함이 많을수록 Diamond 시그널 가중을 살짝 낮춤.
 * 짧고 밀도 높은 본질 서술에는 미세 보너스.
 */
export function essentialismDiamondMultiplier(diamondEssence: string): number {
  const t = diamondEssence.trim()
  if (!t) return 1

  const len = t.length
  const fillerKo =
    t.match(
      /아주|매우|정말|너무|되게|진짜|완전|엄청|굉장히|상당히|참으로|굳이|되게나|한없이|지극히/g,
    ) ?? []
  const fillerEn =
    t.match(/\b(very|really|quite|rather|extremely|incredibly|absolutely|totally)\b/gi) ??
    []

  const filler = fillerKo.length + fillerEn.length
  let m = 1
  m -= Math.min(0.22, filler * 0.035)
  if (len > 300) m -= 0.08
  if (len > 420) m -= 0.06

  if (len >= 12 && len <= 160 && filler <= 1) m += 0.1
  if (len >= 8 && len <= 90 && filler === 0) m += 0.05

  return Math.max(0.72, Math.min(1.18, m))
}
