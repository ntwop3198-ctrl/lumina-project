import type { VoiceMode } from '@/lib/narrative/voice-mode'

/** 4단계 서사 — 상세페이지를 영화·수필처럼 읽히게 하는 구조 지시 */
export function buildNarrativeStructurePrompt(): string {
  return `
## 상세페이지 서사 (4단계 — 반드시 이 순서·소제목·괄호 영문 유지)
단순 스펙 나열이 아니라 **[발견 → 정제 → 치유 → 약속]**의 여정으로 쓴다. 한 편의 짧은 영화나 수필처럼 호흡을 나누고, 고객이 끝까지 읽게 만든다.

### 발견 (Discovery)
제품·용기·첫 시각적 인상. "처음 마주했을 때"의 장면. 2~4문장.

### 정제 (Refining)
원료·패키징 기술·제형이 어떻게 정교해졌는지. 과학·디테일. 2~4문장.

### 치유 (Healing)
피부·감각·일상에 닿는 위로·회복·리추얼. 2~4문장.

### 약속 (Promise)
브랜드가 고객과 맺는 신뢰·지속 가능한 관계·재방문 욕구. 2~4문장.

(위 네 절 **앞**에는 반드시 \`### 발견 (Discovery)\` 형식의 헤더를 사용한다.)
`
}

export function buildConfessionVoiceBlock(): string {
  return `
## 목소리: Confession Mode (고백체)
- 인디 브랜드 창업자의 목소리로, **"우리는"**으로 시작하는 문장을 **4단계 서사 전체에서 최소 2회** 포함한다.
- 브랜드 철학·집착·선택의 이유를 **고백**하듯 서술한다. 과장·허위 효능은 금지.
- '당사', '본 제품은' 같은 건조한 표현 대신, 사람이 말하는 듯한 호흡을 유지한다.
`
}

export function buildVoiceModeAppendix(mode: VoiceMode): string {
  return mode === 'confession' ? buildConfessionVoiceBlock() : ''
}
