/**
 * 제2호 브랜딩 — 나눔형 연동 API 초안 (draft v0.1)
 * 소상공인·파트너가 AI 에이전트 기능을 저비용·저마찰로 연동하기 위한 구조 합의안.
 * 실제 경로·인증·과금은 배포 환경·정책에 맞게 확정한다.
 */

export const LUMINA_SHARING_API_VERSION = "0.1-draft" as const

export type SharingIntegrationTier = "community" | "growth" | "scale"

/** 게이트웨이 베이스 (예: https://api.lumina.example/v1) */
export type SharingApiBaseUrl = string

export interface SharingTierLimits {
  tier: SharingIntegrationTier
  /** 분당 호출 상한 (초안; 실제는 키·계약별) */
  requestsPerMinute: number
  /** 월 단위 크레딧 또는 무료 호출 (원화 병행 가능) */
  monthlyIncludedUnits: number
  /** 파트너 대면 설명용 한 줄 */
  positioningKo: string
}

export const LUMINA_SHARING_TIER_DRAFT: SharingTierLimits[] = [
  {
    tier: "community",
    requestsPerMinute: 30,
    monthlyIncludedUnits: 500,
    positioningKo: "검증·소규모 매장용 — 핵심 에이전트만 저비용으로.",
  },
  {
    tier: "growth",
    requestsPerMinute: 120,
    monthlyIncludedUnits: 5000,
    positioningKo: "성장 브랜드 — 브랜딩·카피·렌더 큐를 묶어 쓰는 나눔형 패키지.",
  },
  {
    tier: "scale",
    requestsPerMinute: 400,
    monthlyIncludedUnits: 25000,
    positioningKo: "다점포·고빈도 — SLA·전담 온보딩(별도 계약).",
  },
]

/** 공개 REST 성격 초안 — 실제 구현 시 OpenAPI로 승격 */
export const LUMINA_SHARING_API_ROUTES_DRAFT = {
  health: "GET /v1/health",
  capabilities: "GET /v1/capabilities",
  /** 단발 작업 (브랜드 카피 초안, 이미지 작업 큐 등) */
  agentInvoke: "POST /v1/agents/{agentId}/invoke",
  /** 비동기 작업 상태 (job id) */
  jobStatus: "GET /v1/jobs/{jobId}",
  /** 크레딧·한도 조회 (투명성) */
  usage: "GET /v1/usage/summary",
} as const

export type SharingApiKeyHeader = "Authorization: Bearer <partner_api_key>"

export interface SharingWebhookDraft {
  /** 파트너가 결과를 받을 콜백 (서명 HMAC 권장) */
  callbackUrl?: string
  /** 멱등 키 — 중복 청구 방지 */
  idempotencyKey: string
}
