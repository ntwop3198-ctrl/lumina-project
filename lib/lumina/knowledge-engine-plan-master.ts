import {
  buildLuminaDetailPlanMarkdown,
  type LuminaPlanAlgorithm,
  type LuminaPlanFields,
} from "@/lib/lumina/knowledge-engine-plan"
import { applyPlanCopyGuards } from "@/lib/lumina/plan-document-standards"

function trimLines(s: string) {
  return s
    .split("\n")
    .map((l) => l.trimEnd())
    .join("\n")
    .trim()
}

/**
 * B2B 마스터플랜 — 사용자·파트너가 채우는 실측·협의 값.
 * 시스템은 근거 없는 단가·MOQ·관세·효능 수치를 생성하지 않는다.
 */
export type LuminaMasterExtraFields = {
  /** [제조] OEM/ODM·충진·용기·리드타임 */
  manufacturingNotes?: string
  /** [원가] MOQ 구간·용기·부자재·물류·관세 (견적·실측 후) */
  costSimulationNotes?: string
  /** [인증] 국내 책임판매·기능성·HS·수출국 인증 */
  complianceGlobalNotes?: string
  /** [마케팅] 채널별 런칭·상세페이지·예산 (실측 기반) */
  marketingLaunchNotes?: string
  /** 런칭 전후 90일 */
  roadmap90?: string
  /** 이전 필드명 호환 (supplyChain → manufacturing) */
  supplyChain?: string
  moqMargin?: string
  kpiTargets?: string
  compliance?: string
}

function blockOrPlaceholder(value: string | undefined, fallback: string) {
  const v = trimLines(value ?? "")
  if (v) return v
  return `*(${fallback})*`
}

function resolveManufacturing(e: LuminaMasterExtraFields) {
  return blockOrPlaceholder(
    e.manufacturingNotes ?? e.supplyChain,
    "OEM/ODM 후보, 충진 방식, 용기(에어리스·펌프 등) 결합, 예상 생산 리드타임 — 견적·실측 후 기재.",
  )
}

function resolveCost(e: LuminaMasterExtraFields) {
  return blockOrPlaceholder(
    e.costSimulationNotes ?? e.moqMargin,
    "수량별(MOQ) 단가·마진은 견적서로 확정. 용기 수입·부자재(단상자·라벨)·물류·관세는 항목별 단가를 넣은 뒤 합산(자동 추정 수치 없음).",
  )
}

function resolveCompliance(e: LuminaMasterExtraFields) {
  return blockOrPlaceholder(
    e.complianceGlobalNotes ?? e.compliance,
    "화장품 책임판매업·품목별 기능성 심사 필요 여부, 수출 HS Code, 목적국(중국·동남아 등) 인증·표시 요건 — 담당 행정·법률 자문과 확인 후 기재. 본란은 법률 자문이 아님.",
  )
}

function resolveMarketing(e: LuminaMasterExtraFields) {
  return blockOrPlaceholder(
    e.marketingLaunchNotes,
    "자사몰·오프라인 입점(예: 올리브영)·SNS·공구 등 타깃이 머무는 채널별 입점·메시지·초기 상세페이지 기획 방향·마케팅 예산 배분(실측·협의 후).",
  )
}

function resolveRoadmap(e: LuminaMasterExtraFields) {
  return blockOrPlaceholder(
    e.roadmap90,
    "런칭 전후 90일: 주차별 마일스톤·담당·의존 리소스.",
  )
}

function guardMasterExtra(extra: LuminaMasterExtraFields): LuminaMasterExtraFields {
  const g = (s?: string) => (s ? applyPlanCopyGuards(s) : s)
  return {
    manufacturingNotes: g(extra.manufacturingNotes),
    costSimulationNotes: g(extra.costSimulationNotes),
    complianceGlobalNotes: g(extra.complianceGlobalNotes),
    marketingLaunchNotes: g(extra.marketingLaunchNotes),
    roadmap90: g(extra.roadmap90),
    supplyChain: g(extra.supplyChain),
    moqMargin: g(extra.moqMargin),
    kpiTargets: g(extra.kpiTargets),
    compliance: g(extra.compliance),
  }
}

const SECTION_CONFIRM =
  "> **확인:** 본 절의 표·수치는 **견적·실측·내부 검토 후** 기재합니다. 자동 생성·추정치 없음."

/**
 * 무료 초안(5단계) 아래에 붙는 [전문] B2B 마스터플랜 본문.
 */
export function buildLuminaMasterExecutionAnnexMarkdown(
  extra: LuminaMasterExtraFields,
): string {
  const ex = guardMasterExtra(extra)
  const mfg = resolveManufacturing(ex)
  const cost = resolveCost(ex)
  const legal = resolveCompliance(ex)
  const mkt = resolveMarketing(ex)
  const road = resolveRoadmap(ex)

  return trimLines(`
# [전문] B2B 마스터플랜

> **문서 목적:** 실행·투자 검토용 **마스터 플랜** 템플릿. 단가·일정·수치는 **견적·실측·계약**으로 확정하며, 본 엔진은 추정치를 생성하지 않는다. 파트너 **정산·데이터 투명성**을 원칙으로 한다.  
> **제외:** 근거 없는 매출·전환·효능·최상급 수사.

---

## 5단계 ↔ 실행 연계 (요약)

| 단계 | 마스터플랜에서 다룰 초점 |
|------|-------------------------|
| 결핍·존재 | 제조·원가 가정이 맞는지 **시장·샘플**로 재확인 |
| 가치·약속 | 로트·QC·정산 **추적 단위**와 KPI 담당 |
| 소통 | 아래 **[마케팅]** 채널 메시지·검수와 연결 |

---

## 1. [제조] 파트너 매칭 및 공정 상세

- **제품·주체**: 국내외 **OEM / ODM** 후보, 담당 범위(처방·충진·포장).
- **공정**: 충진 방식, **용기 결합 구조**(에어리스·펌프·캡 등), 호환성 리스크.
- **일정**: 예상 **생산 리드타임**(시험 생산 → 양산), 병목 구간 명시.

${SECTION_CONFIRM}

### 제조 체크리스트 (기입)

| 구분 | 확인 항목 | 후보 / 결정 | 비고 |
|:---|:---|:---|:---|
| OEM·ODM | 처방·충진·포장 범위 | | |
| 용기 | 에어리스·펌프·재질 | | |
| 공정 | 충진·멸균·검사 | | |
| 일정 | 시험 생산 → 양산 리드타임 | | |

### 파트너·공정 메모 (실측)

${mfg}

---

## 2. [원가] 정밀 비용 시뮬레이션

- 무료 초안의 가격대·채널 가정을 넘어, **수량별(MOQ 구간)** 단가·마진을 표로 정리한다.
- **용기·부자재**: 수입 단가(또는 국내 조달), 단상자·라벨·기타 부자재.
- **물류·관세**: 컨테이너·항목·HS 연계 예상 비용은 **견적·인보이스** 기준으로만 기재.
- *최종 원가·손익분기*: 항목별 합산 후 검토(시스템이 임의 수치를 채우지 않음).

${SECTION_CONFIRM}

### 원가 산출 표 (견적·실측 기입)

| 구분 | 세부 항목 | 수량·구간 | 단가(통화) | 소계 | 근거(견적·INVOICE·내부 전표) |
|:---|:---|:---|:---|:---|:---|
| 완제품 | MOQ 구간 A | | | | |
| 완제품 | MOQ 구간 B | | | | |
| 용기·캡 | | | | | |
| 부자재 | 단상자·라벨 등 | | | | |
| 물류 | 국내·수입 | | | | |
| 관세·통관 | 목적국별 | | | | |
| **합계** | *(참고)* | | | | *내부·전문가 확인 후 사용* |

### 원가·MOQ 추가 메모

${cost}

---

## 3. [인증] 법적·행정·글로벌 유통 가이드

- **국내**: 화장품 **책임판매업** 등록, 품목별 **기능성 화장품** 해당 시 심사·표시.
- **수출**: 품목별 **HS Code** 확인, 목적국 **인증·라벨·통관**(중국·동남아 등) 절차를 국가별로 정리.
- 본 절은 **행정·법률 전문가 확인** 전제이며, 법률 자문을 대체하지 않습니다.

> **면책:** 법규·인증 해석은 **자격 있는 내부·외부 전문가 확인 후** 기재합니다.

### 인증·수출 체크리스트 (기입)

| 구분 | 항목 | 해당 여부 | 담당·일정 | 비고 |
|:---|:---|:---|:---|:---|
| 국내 | 책임판매업·신고 | | | |
| 국내 | 기능성 심사·표시 | | | |
| 수출 | HS Code | | | |
| 수출 | 목적국 인증·라벨 | | | |

### 인증·수출 메모

${legal}

---

## 4. [마케팅] 채널별 상세 런칭 전략

- 타깃이 **실제 머무는 채널**(자사몰, 오픈마켓, 입점 채널, 인스타·공구 등)별 **입점·메시지·캠페인** 개요.
- **상세페이지·랜딩** 기획 방향(톤·증빙·면책), 초기 **마케팅 예산 배분**(실측·협의 후).

${SECTION_CONFIRM}

### 채널·예산 표 (기입)

| 채널 | 목표 | 입점·운영 상태 | 초기 예산(비율 또는 금액) | 비고 |
|:---|:---|:---|:---|:---|
| 자사몰 | | | | |
| 오픈마켓·입점 | | | | |
| SNS·공구 등 | | | | |
| **합계** | | | | *실측·협의 후* |

### 채널·런칭 메모

${mkt}

---

## 부록) 런칭 전후 90일 로드맵

- **0–30일**: 제품·포장 확정, 시험 생산, 표시기재 초안, 채널 계약 착수
- **31–60일**: 콘텐츠·채널 예열, 소량 판매/테스트, 인증·수출 서류 정비
- **61–90일**: 본 런칭, 재고·CS·KPI 리뷰, 파트너 정산 점검

${road}

---

## 문서 공통 — 면책 · 확인 절차

- 본 문서의 **수치·단가·일정·법규·인증 해석**은 **내부 담당자 및 자격을 갖춘 전문가 확인 후** 기재합니다.
- **인쇄·PDF** 배포본도 동일하며, 최종 계약·등록·신고 전 반드시 **최신 법령·행정 지침**과 대조합니다.
- 루미나 Knowledge Engine 출력물은 **구조화 템플릿**이며, 개별 사안에 대한 법률·세무·인증 **대리·보증을 하지 않습니다.**

`)
}

export function buildLuminaMasterPlanMarkdown(
  fields: LuminaPlanFields,
  extra: LuminaMasterExtraFields,
  opts?: { algorithm?: LuminaPlanAlgorithm; generatedAtIso?: string },
) {
  const base = buildLuminaDetailPlanMarkdown(fields, opts)
  const annex = buildLuminaMasterExecutionAnnexMarkdown(extra)
  return trimLines(`
${base}

---

${annex}
`)
}
