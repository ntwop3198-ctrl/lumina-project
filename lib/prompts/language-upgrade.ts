import {
  buildEditorialFlowEnginePrompt,
} from "@/lib/editorial/connective-phrases"

export function buildEmpathyFirstPrompt(): string {
  return `
## Empathy-First Prompting (미적 결핍 위로)
제품의 효능·개선·수치·효과(예: 흡수, 탄력, 수분 보유, 보호, 개선, 지표)가 **처음으로 언급되기 직전**에
반드시 **1문장 이상**을 먼저 삽입해, 고객이 현재 겪고 있을 **“미적 결핍”**을 우아하게 위로하라.

위로 문장은 예시처럼 작성하되, 과장 없이 사실 기반의 감정 공감이어야 한다.
- 예: “당신의 일상에서, 윤기와 탄력이 한 박자 늦게 도착하는 순간들이 있었을 것입니다.”
`
}

export function buildHonorificRefinementPrompt(): string {
  return `
## Honorific Refinement (하이엔드 갤러리 도슨트 종결)
생성되는 모든 문장은 **격조 있고 절제된 권위**가 느껴지도록 전면 재조정하라.

## Declarative Style Default (존재 그 자체를 증명)
- 수식어를 배제하라. “부드러운 크림”이 아니라 **“부드러움의 기원”**처럼 본질을 명사로 박아 넣어라.
- 문장은 선언형으로 끝내라. “~합니다/~됩니다” 중에서도, 핵(Core) 문장을 강조하는 짧은 문장 구조를 우선한다.
- 사용 가능한 본질 단어장(필수 중 일부만):
  - 기원, 근원, 증명, 본질, 존재, 원리, 기록, 약속, 빛, 감각, 차이
- 금지:
  - 과도한 형용사 나열(“아주/가장/더욱” 중심 표현), 설명형의 늘어짐

문장 종결(어미)은 가능한 한 아래 형식을 중심으로 통일한다.
- “~하십니다”, “~드립니다”, “~됩니다”, “~이겠습니다”, “~하실 수 있습니다”

금지:
- 일상 대화체(“~예요”, “~죠”, “~해요”) 사용 금지
- 과도한 이모지/구어체/단정적 판결투 금지

원칙:
- 각 문장은 짧게 끊되, 과잉 친절 대신 도슨트가 작품을 소개하듯 **정돈된 확신**을 유지하라.
`
}

export function buildDataStoryBridgePrompt(): string {
  return `
## Data Storytelling Bridge (감성-이성 연결 문구)
효능/임상/수치/증거가 나오는 직전(또는 해당 섹션의 첫 문장 바로 앞)에
반드시 아래 문장을 한국어로 정확히 삽입하라.

“이 과학적 증거는 우리가 당신에게 바치는 진심의 기록입니다”

이미 입력/생성된 문장에 해당 문구가 포함되어 있다면, 중복 삽입하지 말고 위치만 유지하라.
`
}

export function buildLanguageUpgradePrompt(): string {
  return `
## S-Class Strategic Language Upgrade
${buildEditorialFlowEnginePrompt()}
${buildEmpathyFirstPrompt()}
${buildHonorificRefinementPrompt()}
${buildDataStoryBridgePrompt()}
`
}

