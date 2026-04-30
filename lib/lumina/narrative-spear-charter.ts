/**
 * Genesis 서사 · 진실의 창 — 창시자 결정: 속임이 아닌 정직한 서사로 신뢰를 연다.
 * 플래그십 브랜드 시드: `LUMINA_FLAGSHIP_BRAND_NAMES`(쉼표 또는 | 구분).
 * `LUMINA_NARRATIVE_SPEAR_CHARTER=0` 이면 부록·Legal Trace·철학 블록(연동 시) 비활성.
 */

/** 창시자 로드맵 상의 1차 서사 검증 슬롯 수 */
export const LUMINA_GENESIS_FLAGSHIP_SLOT_COUNT = 10

export const LUMINA_NARRATIVE_SPEAR_HEADLINE_KO = "진실의 창"
export const LUMINA_NARRATIVE_SPEAR_HEADLINE_EN = "The spear of sincerity"

export const LUMINA_NARRATIVE_SPEAR_BODY_KO =
  "루미나의 **첫 서사**는 ‘더 잘난 척’이 아니라 **팩트·본질·정직한 공감**으로 쓴다. **구소·爱**와 맞닿게: 작은 진실과 브랜드(你) 중심 서술을 우선한다. **Genesis** 단계에서는 플래그십 브랜드의 메인 메시지·Essence급 카피를 먼저 스모크 검증한다."

export const LUMINA_NARRATIVE_SPEAR_BODY_EN =
  "Lumina’s **first narratives** lead with **facts, essence, and honest empathy** — not empty one-upmanship. Align with **Guso and Ài**: small truths and brand-first voice. In **Genesis**, smoke-test flagship slogans and Essence-tier copy first."

export function parseFlagshipBrandNamesFromEnv(): string[] {
  const raw = process.env.LUMINA_FLAGSHIP_BRAND_NAMES?.trim()
  if (!raw) return []
  return raw
    .split(/[|,]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function buildGenesisFlagshipContextLine(): string {
  const names = parseFlagshipBrandNamesFromEnv()
  if (names.length === 0) {
    return `창시자 로드맵: **플래그십 브랜드 ${LUMINA_GENESIS_FLAGSHIP_SLOT_COUNT}곳**의 1차 서사(슬로건·Essence 단계 카피)를 우선 검증한다. 브랜드명은 서버 환경 변수 \`LUMINA_FLAGSHIP_BRAND_NAMES\`(쉼표 또는 | 구분)로 주입한다.`
  }
  return `우선 서사 시드 브랜드(환경 변수): **${names.join(" · ")}**`
}

export const LUMINA_NARRATIVE_SPEAR_COMPLIANCE_PRINCIPLE_KO =
  "진실의 창: **허위·과장·공포 조장 없이** 정직한 서사로 신뢰를 연다. 플래그십 시드는 **합의한 품질 바·법적 테두리** 안에서만 생성한다."

export function isNarrativeSpearCharterEnabled(): boolean {
  return process.env.LUMINA_NARRATIVE_SPEAR_CHARTER?.trim() !== "0"
}

export function buildNarrativeSpearPromptAppendix(): string {
  const flagship = buildGenesisFlagshipContextLine()
  return `
## 루미나 Genesis 서사 — 진실의 창 (창시자 결정 · 서사 우선)
${flagship}
- **창의 정의**: 화려한 속임이 아니라 **정직한 공감·팩트·본질**로 마케팅 피로를 덜고 신뢰를 쌓는다. **구소(小)·爱(너·브랜드 중심)**와 정합: “업계 1위”류 **빈 슈퍼라티브**보다 **사용 맥락·한계를 포함한 정직**을 허용한다.
- **날것의 미학**: 형용사·미사여구 남발보다 **사실·재질·관찰 근거**가 앞에 서게 쓴다. “완벽한 젊음·영구적 역전” 등 **허위·의료 약속** 금지; 세월·개인차는 **존중**한다.
- **공명**: 공감은 **위로·동행**이지, 결핍·외모 불안을 이용한 **기만**이 아니다.
- **금지**: 신체·외모 혐오 유도, 타사·타인 비하, 근거 없는 최상급 표현, **치료·치유 보장** 식 문구.`
}
