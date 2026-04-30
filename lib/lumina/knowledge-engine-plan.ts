import {
  applyPlanCopyGuards,
  normalizePlanFields,
} from "@/lib/lumina/plan-document-standards"
import { LUMINA_PLAN_TRUTH_EDITORIAL_BLOCK_MARKDOWN } from "@/lib/lumina/knowledge-plan-naked-truth-copy"

/**
 * 기획서 마크다운 파이프라인: `normalizePlanFields` → 단계 조립 → 각 블록·단계는
 * `guardPlanMarkdown`(trim + `applyPlanCopyGuards`) → 최종 `buildLuminaDetailPlanMarkdown`에서 문서 전체 재가드.
 */

export type LuminaPlanFields = {
  brandName: string
  targetAudience: string
  priceRange: string
  channel: string
  /** 주력 품목 1~2 (자유 서술) */
  products: string
  /** 차별점·한 줄 포지션 (선택) */
  differentiator: string
}

/** 본질의 길: 미학·질감·여백 중심 / 효율의 길: 채널·실험·측정 루프 중심 (근거 없는 수치·효능 금지는 공통) */
export type LuminaPlanAlgorithm = "essence" | "efficiency"

export type LuminaPlanStepId =
  | "void"
  | "existence"
  | "value"
  | "covenant"
  | "resonance"

/** 랜딩 등에서 `/knowledge-engine/plan` 앵커로 연결할 때 사용 (미리보기 `id`와 동일) */
export const LUMINA_PLAN_STEP_NAV: ReadonlyArray<{
  anchorId: string
  shortLabelKo: string
}> = [
  { anchorId: "lumina-step-void", shortLabelKo: "결핍" },
  { anchorId: "lumina-step-existence", shortLabelKo: "존재" },
  { anchorId: "lumina-step-value", shortLabelKo: "가치" },
  { anchorId: "lumina-step-covenant", shortLabelKo: "약속" },
  { anchorId: "lumina-step-resonance", shortLabelKo: "소통" },
]

export type LuminaPlanStep = {
  id: LuminaPlanStepId
  /** 미리보기 스크롤 앵커 (DOM id) */
  anchorId: string
  /** 버튼·목차용 짧은 라벨 */
  shortLabelKo: string
  /** 마크다운 ## 제목 한 줄 */
  headingLine: string
  /** 제목 아래 본문(마크다운) */
  body: string
}

function trimLines(s: string) {
  return s
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim()
}

function guardPlanMarkdown(text: string): string {
  return applyPlanCopyGuards(trimLines(text))
}

function guardPlanStep(step: LuminaPlanStep): LuminaPlanStep {
  return {
    ...step,
    headingLine: guardPlanMarkdown(step.headingLine),
    body: guardPlanMarkdown(step.body),
  }
}

type BuildOpts = {
  generatedAtIso?: string
  algorithm?: LuminaPlanAlgorithm
}

/**
 * 알고리즘별 톤 — 본질: `LUMINA_AESTHETIC_CORE.md` / 효율: 이 모듈에서 정의.
 * 근거 없는 매출·전환·효능 수치는 넣지 않는다.
 */
function algorithmPreamble(algorithm: LuminaPlanAlgorithm): string {
  if (algorithm === "essence") {
    return guardPlanMarkdown(`
### 기획 톤: 본질의 길 (Essence)

- **참고:** \`LUMINA_AESTHETIC_CORE.md\` — 여백·재질감·중립 톤·측면 조명 기준에 맞춘 시각·카피 방향.
- **운영:** 재료·공정 서술을 구체적으로 하고, 효능 과장·원색 과밀·정보 과밀은 피한다.
`)
  }
  return guardPlanMarkdown(`
### 기획 톤: 효율의 길 (Efficiency)

- **초점:** 채널·메시지·크리에이티브 실험과 전환 퍼널·측정 설계.
- **수치:** 근거 없는 전환·효능 수치는 기재하지 않는다. KPI는 가설·검증 절차·담당으로만 정의한다.
`)
}

function buildSteps(
  fields: LuminaPlanFields,
  algorithm: LuminaPlanAlgorithm,
): LuminaPlanStep[] {
  const brand = fields.brandName.trim() || "(브랜드명 미입력)"
  const target = fields.targetAudience.trim() || "(타깃 미입력)"
  const price = fields.priceRange.trim() || "(가격대 미입력)"
  const channel = fields.channel.trim() || "(채널 미입력)"
  const products = trimLines(fields.products) || "(주력 품목 미입력)"
  const diff =
    trimLines(fields.differentiator) || "(차별점은 운영 과제로 추가 정의)"

  const voidExtra =
    algorithm === "essence"
      ? "- 시각·카피는 **단일 초점**(Diamond / Essentialism)을 유지한다."
      : "- 채널별 **첫 노출 메시지**와 CTA를 분리해 검증한다. 수치 목표는 실측 후 기재한다."

  const existenceExtra =
    algorithm === "essence"
      ? `**포지션:** ${brand}는 ${target}을(를) 핵심 고객으로 하며, 차별 축은 ${diff}이다. 제품·공정·정산·소통에서 동일한 신호를 유지해 선택 이유를 명확히 한다. 단기 유행보다 질감·빛·재현 가능한 품질에 기반한다.`
      : `**포지션:** ${brand}는 ${target} 대상으로 ${diff}를 중심 축에 둔다. 채널별 첫 노출 메시지와 CTA를 분리한 실험으로 포지션을 정제하고, 실행 속도는 메시지 정밀도와 실험 주기로 확보한다.`

  const valueExtra =
    algorithm === "essence"
      ? "- **제공 가치:** 브랜딩·포뮬레이션·콘텐츠 중 핵심을 한 장의 논리로 정리할 수 있는 축을 선택한다.\n- **파트너:** 연동·정산을 라인아이템 단위로 투명화해 협업 비용을 낮춘다."
      : "- **제공 가치:** 채널별 메시지·에셋을 템플릿화해 재사용 가능한 운영 체계로 만든다.\n- **파트너:** 동일한 투명성 원칙으로 협업·커뮤니케이션 비용을 줄인다."

  const covenantExtra =
    algorithm === "essence"
      ? "- **품질·안전:** Human-Safety 톤, 효능 과장 금지, 성분·공정 표기 원칙 준수\n- **데이터·정산:** 추적 가능한 단위로 설명·감사가 가능한 구조"
      : "- **품질·안전:** 효율 경로에서도 준법·안전을 우선한다.\n- **데이터·정산:** 이벤트·캠페인 단위로 기록해 병목을 식별한다. 수치는 실측값만 사용한다."

  const resonanceExtra =
    algorithm === "essence"
      ? "- **필수:** 정산·본질·신뢰(온·준·쾌)의 균형\n- **문체:** 짧고 밀도 있게. 장식적 수식 남용을 피한다.\n- **금지 예:** 「최고」「혁명」「압도」「시대를 선도」 등 근거 없는 상급 수사. 사실·약속·측정 가능한 표현만 사용한다."
      : "- **필수:** 측정·공개 가능한 약속만 기재한다.\n- **문체:** 채널별 훅은 달라도 브랜드 한 줄 약속은 하나로 수렴한다.\n- **금지 예:** 상기와 동일. 효율 경로도 가설·실측·검증으로 서술하고, 허구의 성과 문구는 쓰지 않는다."

  const raw: LuminaPlanStep[] = [
    {
      id: "void",
      anchorId: "lumina-step-void",
      shortLabelKo: "결핍",
      headingLine: "## 1) 결핍(Void) — 시장·현장 과제를 사실로 정의",
      body: trimLines(`
- **대상 고객:** ${target}
- **접점·유통:** ${channel}
- **반복 과제(가설):** 품질 편차, 정보 비대칭, 반품·클레임 비용, 재구매 설계 미비 등 — 현장 데이터로 교체·검증

${voidExtra}

### 주력 품목(입력값)

${products}
`),
    },
    {
      id: "existence",
      anchorId: "lumina-step-existence",
      shortLabelKo: "존재",
      headingLine: "## 2) 존재(Existence) — 대체 불가 포지션(한 문단)",
      body: existenceExtra,
    },
    {
      id: "value",
      anchorId: "lumina-step-value",
      shortLabelKo: "가치",
      headingLine: "## 3) 가치(Value) — 지식·시스템이 현금흐름으로 연결되는 경로",
      body: trimLines(`
${valueExtra}
- **수익 모델(가설):** 제품·구독·마진·서비스 중 선택 — 근거 없는 숫자는 넣지 않는다.
`),
    },
    {
      id: "covenant",
      anchorId: "lumina-step-covenant",
      shortLabelKo: "약속",
      headingLine: "## 4) 약속(Covenant) — 측정·공개·추적 가능한 약속만",
      body: trimLines(`
아래는 보증이 아니라 **운영 규칙**으로 고정한다.

${covenantExtra}
- **KPI(초기 30일, 예시 항목):** 유입→구매, 재구매, 반품·클레임, CAC — 실측값으로만 기재
`),
    },
    {
      id: "resonance",
      anchorId: "lumina-step-resonance",
      shortLabelKo: "소통",
      headingLine: "## 5) 소통(Resonance) — 메시지 밀도(간결·일관)",
      body: trimLines(`
- **한 줄 포지션:** ${diff}
- **금지:** 과한 수식어, 근거 없는 수치, 불투명한 수수료, 근거 없는 상급·선동적 서사

${resonanceExtra}
`),
    },
  ]
  return raw.map(guardPlanStep)
}

/**
 * 5단계 섹션 배열 — 미리보기 앵커·버튼에 사용
 */
export function buildLuminaPlanSteps(
  fields: LuminaPlanFields,
  opts?: BuildOpts,
): LuminaPlanStep[] {
  const algorithm = opts?.algorithm ?? "essence"
  return buildSteps(fields, algorithm)
}

function buildLuminaPlanAppendixMarkdown() {
  return guardPlanMarkdown(`
## 부록) 후속 액션(체크리스트)

- [ ] 입력값 검증: 타깃·채널·가격대 현실성
- [ ] 경쟁·대체재 3건 명시
- [ ] 랜딩·상세·정책 문서 간 메시지 정합성
- [ ] 제2호 브랜딩: 파트너에게 이로운 구조인지 검토
`)
}

/** 무료 초안 vs 유료 실행·마스터 플랜 경계 — 과장·확정 약속 없이 명시 */
function buildLuminaPlanServiceScopeMarkdown() {
  return guardPlanMarkdown(`
## 안내) 서비스 범위 및 유료 전환

- 본 문서는 입력값을 바탕으로 **구조화한 기획 초안**이다. 법적·재무·제조 조건에 대한 **확정 의견·보장**을 의미하지 않는다.
- **인쇄·PDF 저장**은 검토·공유용이며, 정확성은 입력·실측에 따른다.
- 현장 실측 반영, 상세 컨설팅, 제조·ODM 파트너 매칭, **로트 단위 QC 기록** 등 실행 중심 **마스터 플랜** 지원은 **별도 유료**로 제공될 수 있다. 범위·조건은 별도 안내·계약을 따른다.
- 최종 의사결정 전 관련 전문가 검토를 권장한다.
`)
}

/** 미리보기·다운로드 동일 소스 — intro + steps + appendix */
export function buildLuminaPlanDocumentParts(
  fields: LuminaPlanFields,
  opts?: BuildOpts,
) {
  const f = normalizePlanFields(fields)
  /** SSR·하이드레이션 불일치 방지: 미리보기 기본값은 고정 문구. 실제 시각은 `generatedAtIso` 전달 또는 다운로드 시 주입. */
  const generatedAt =
    opts?.generatedAtIso ??
    "(미리보기 — Markdown 다운로드 시 UTC 시각으로 확정)"
  const algorithm = opts?.algorithm ?? "essence"
  const brand = f.brandName.trim() || "(브랜드명 미입력)"
  const target = f.targetAudience.trim() || "(타깃 미입력)"
  const price = f.priceRange.trim() || "(가격대 미입력)"
  const channel = f.channel.trim() || "(채널 미입력)"

  const steps = buildSteps(f, algorithm)
  const preamble = algorithmPreamble(algorithm)

  const toneLine =
    algorithm === "essence"
      ? "> **기획 톤(알고리즘): 본질의 길 (Essence)** — `LUMINA_AESTHETIC_CORE.md` 기준의 여백·질감·본연 서술"
      : "> **기획 톤(알고리즘): 효율의 길 (Efficiency)** — 채널·메시지·실험·측정 중심. 근거 없는 수치·효능 금지"

  const intro = guardPlanMarkdown(`
[LUMINA - Knowledge Engine]
# 상세 기획서 초안: ${brand}

- 생성 시각(UTC): ${generatedAt}
- 입력 요약: 타깃 ${target} · 가격대 ${price} · 채널 ${channel}

${toneLine}

> 본 문서는 입력값을 구조화한 **초안**이다. 매출·전환·효능 **수치**는 근거 데이터가 있을 때만 기재하고, 없으면 KPI 설계·측정 계획으로 대체한다.

${preamble}

${LUMINA_PLAN_TRUTH_EDITORIAL_BLOCK_MARKDOWN}
`)

  const appendix = buildLuminaPlanAppendixMarkdown()
  const serviceScope = buildLuminaPlanServiceScopeMarkdown()

  return { intro, steps, appendix, serviceScope, algorithm }
}

/**
 * [LUMINA - Knowledge Engine] 상세 기획서 초안 (마크다운)
 * - 근거 없는 매출·전환·효능 수치는 생성하지 않는다.
 * - 출력 전 `applyPlanCopyGuards` 일괄 적용.
 */
export function buildLuminaDetailPlanMarkdown(
  fields: LuminaPlanFields,
  opts?: BuildOpts,
) {
  const { intro, steps, appendix, serviceScope } = buildLuminaPlanDocumentParts(
    fields,
    opts,
  )

  const body = steps
    .map((s) => `${s.headingLine}\n\n${s.body}`)
    .join("\n\n---\n\n")

  return guardPlanMarkdown(`
${intro}

---

${body}

---

${appendix}

---

${serviceScope}
`)
}
