/**
 * 지능 우선 — 창시자 결정: LLM 품질·마스터 지시문(헌장)·컴플라이언스를 인프라 확장보다 앞세운다.
 * `LUMINA_INTELLIGENCE_PRIORITY_CHARTER=0` 이면 프롬프트 부록·Legal Trace·철학 블록 비활성.
 */

export const LUMINA_INTELLIGENCE_PRIORITY_HEADLINE_KO = "지능 우선"
export const LUMINA_INTELLIGENCE_PRIORITY_HEADLINE_EN = "Intelligence first"

export const LUMINA_INTELLIGENCE_PRIORITY_BODY_KO =
  "루미나는 **응답의 질·헌장·법적 테두리**를 먼저 세우고, 그다음에 규모와 장식을 맞춘다. 최신 API·모델 가용성과 마스터 지시문이 합의한 품질 바를 통과하는지, 배포 전에 스모크 테스트로 확인한다."

export const LUMINA_INTELLIGENCE_PRIORITY_BODY_EN =
  "Lumina sets **answer quality, charters, and legal guardrails first**, then scales infra and surface area. Before ship: verify API/model access and smoke-test outputs against the agreed quality bar."

/** 월요일·온보딩용 짧은 체크리스트(문자열) */
export const LUMINA_INTELLIGENCE_HANDOFF_CHECKLIST_KO = `1. **API·모델**: Google AI / 기타 LLM 키·쿼터·호출 모델명이 운영 환경에서 유효한지 확인한다.
2. **마스터 지시문**: \`lib/lumina/*-charter.ts\`·취약점 정직 블록 등이 분석·생성 경로에 붙는지 확인한다.
3. **품질 스모크**: 동일 제품 입력으로 스타일별(럭셔리·미니멀 등) 샘플을 뽑아, 허위·과장·헌장 위반이 없는지 본다.`

export const LUMINA_INTELLIGENCE_HANDOFF_CHECKLIST_EN = `1. **API / model**: Confirm keys, quotas, and model IDs in the target environment.
2. **Master instructions**: Ensure \`lib/lumina/*-charter.ts\` and honesty blocks attach to analysis/generation paths.
3. **Quality smoke**: Run fixed inputs across styles; check for false claims, hype violations, and charter drift.`

export const LUMINA_INTELLIGENCE_PRIORITY_COMPLIANCE_PRINCIPLE_KO =
  "지능 우선: **모델·프롬프트·검수 품질**을 인프라 과시보다 앞세우고, 법적·헌장 테두리 안에서만 응답한다."

export function isIntelligencePriorityCharterEnabled(): boolean {
  return process.env.LUMINA_INTELLIGENCE_PRIORITY_CHARTER?.trim() !== "0"
}

export function buildIntelligencePriorityPromptAppendix(): string {
  return `
## 루미나 운영 원칙: 지능 우선 (창시자 결정)
${LUMINA_INTELLIGENCE_PRIORITY_BODY_KO}
- **정심(心)과 연동**: 말(출력)이 바로 서야 제품 서술도 바로 선다. 근거 없는 권위·과장을 **품질 결함**으로 본다.
- **방패와 창**: 컴플라이언스(방패)와 브랜드 서사(창)를 **대립이 아니라 동일 품질 바** 아래 둔다 — 둘 중 하나를 희생해 다른 하나를 만들지 않는다.
- **금지**: “최고의 AI” 등 **검증 불가 자기 선전**을 분석 본문에 섞지 않는다(플랫폼이 아니라 **클라이언트 제품**이 주인공).`
}
