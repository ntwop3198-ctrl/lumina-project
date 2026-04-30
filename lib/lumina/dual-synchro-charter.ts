/**
 * Dual-Synchro — 비주얼의 정직한 질감·굴절과 텍스트의 팩트·톤을 맞춘다 (톱니 동기화 은유).
 * 조작적 확신·뇌리 낙인·허위 자연 서사 금지. 반박 재프레임은 **사실 가능한 범위**와 취약점 정직 블록과만 정합.
 * `LUMINA_DUAL_SYNCHRO_CHARTER=0` 비활성. 클라이언트 번들에서는 해당 env가 비어 있으면 기본 활성.
 */

export const LUMINA_DUAL_SYNCHRO_COMPLIANCE_PRINCIPLE_KO =
  "Dual-Synchro: **이미지에 없는 질감·입자·색차**를 글로 지어내지 않는다. 반박 대응은 **허위·의료 약속 없이** 정직한 한계·팩트로만 재프레임한다."

export function isDualSynchroCharterEnabled(): boolean {
  return process.env.LUMINA_DUAL_SYNCHRO_CHARTER?.trim() !== "0"
}

/** 비주얼(Imagen·Gemini 이미지 등)용 — 영문 프래그먼트 */
export function buildDualSynchroImagePromptAppendix(): string {
  if (!isDualSynchroCharterEnabled()) return ""
  return [
    "DUAL-SYNCHRO VISUAL MODULE — Jewel-Tex honesty: when depicting suspensions or oils, allow soft natural variance in particle scale and distribution (perfect imperfection) rather than artificial uniform plastic gloss; keep reads physically plausible.",
    "Naked refraction: prioritize truthful transmission through glass and meniscus — sharp, honest clarity of inner hue; avoid carnival speculars that hide the formula.",
    "Sync rule: do not invent visible grit, bubbles, or batch-to-batch color drama unless the brief explicitly requests it; stay consistent with the product class described.",
  ].join(" ")
}

/** 제품 분석·카피 다듬기용 — 한국어 지시 */
export function buildDualSynchroLanguagePromptAppendix(): string {
  if (!isDualSynchroCharterEnabled()) return ""
  return `
## 루미나 Dual-Synchro (비주얼–언어 동기화)
- **촉각적 진실(비유)**: 사진·렌더에 보이는 질감·제형·투명도만 언급한다. 보이지 않는 **입자 분포·배치 색 차**를 마케팅 내러티브로 **추측해 만들지 않는다** (브랜드가 제출한 팩트가 있을 때만).
- **논리적 위엄(비유)**: 방어적 변명 대신 **정심(心)**에 맞는 담담한 문장. 고객 반박에는, 사실이 허용할 때만 **역설적 재프레임**(예: 유통기한 → 신선도·보존 체계는 **과장·치료 약속 없이**).
- **Sync Check**: 같은 출력 안에서 이미지 분석 문단과 카피 초안이 **서로 모순**되지 않게 한다 (앞서 말한 질감·색과 뒤 카피가 같은 제품을 가리킴).
- **금지**: “이것이 진짜다” 식 **세뇌·각인** 수사; 근거 없는 **자연의 지문** 서사; 배치 차이를 원료 탓으로 단정 (확인되지 않은 경우).`
}
