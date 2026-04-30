import type { RetrievedGuideline } from "@/lib/compliance/rag/types"
import { isEnCharterEnabled, LUMINA_EN_COMPLIANCE_PRINCIPLE_KO } from "@/lib/lumina/en-charter"
import { isGusoCharterEnabled, LUMINA_GUSO_COMPLIANCE_PRINCIPLE_KO } from "@/lib/lumina/guso-charter"
import { isTrinityCharterEnabled, LUMINA_TRINITY_COMPLIANCE_PRINCIPLE_KO } from "@/lib/lumina/lumina-trinity-charter"
import { isLoveCharterEnabled, LUMINA_LOVE_COMPLIANCE_PRINCIPLE_KO } from "@/lib/lumina/love-charter"
import { isDuCharterEnabled, LUMINA_DU_COMPLIANCE_PRINCIPLE_KO } from "@/lib/lumina/du-charter"
import { isMingCharterEnabled, LUMINA_MING_COMPLIANCE_PRINCIPLE_KO } from "@/lib/lumina/ming-charter"
import {
  isShuangxiCharterEnabled,
  LUMINA_SHUANGXI_COMPLIANCE_PRINCIPLE_KO,
} from "@/lib/lumina/shuangxi-charter"
import { isTanCharterEnabled, LUMINA_TAN_COMPLIANCE_PRINCIPLE_KO } from "@/lib/lumina/tan-charter"
import {
  isIntelligencePriorityCharterEnabled,
  LUMINA_INTELLIGENCE_PRIORITY_COMPLIANCE_PRINCIPLE_KO,
} from "@/lib/lumina/intelligence-priority"
import {
  isDualSynchroCharterEnabled,
  LUMINA_DUAL_SYNCHRO_COMPLIANCE_PRINCIPLE_KO,
} from "@/lib/lumina/dual-synchro-charter"
import {
  isNakedVesselCardCharterEnabled,
  LUMINA_NAKED_VESSEL_CARD_COMPLIANCE_PRINCIPLE_KO,
} from "@/lib/lumina/naked-vessel-card-charter"
import {
  isNarrativeSpearCharterEnabled,
  LUMINA_NARRATIVE_SPEAR_COMPLIANCE_PRINCIPLE_KO,
} from "@/lib/lumina/narrative-spear-charter"
import { isZenCharterEnabled, LUMINA_ZEN_COMPLIANCE_PRINCIPLE_KO } from "@/lib/lumina/zen-charter"
import { isMeiCharterEnabled, LUMINA_MEI_COMPLIANCE_PRINCIPLE_KO } from "@/lib/lumina/mei-charter"
import { isXinCharterEnabled, LUMINA_XIN_COMPLIANCE_PRINCIPLE_KO } from "@/lib/lumina/xin-charter"
import {
  isRawScentNarrativeEnabled,
  isRawScentZeroSyntheticBadgeSubstantiated,
  LUMINA_RAW_SCENT_COMPLIANCE_PRINCIPLE_KO,
  LUMINA_RAW_SCENT_PHILOSOPHY_FOOTER_KO,
  LUMINA_RAW_SCENT_ZERO_SYNTHETIC_BADGE_EN,
  LUMINA_RAW_SCENT_ZERO_SYNTHETIC_BADGE_KO,
} from "@/lib/lumina/raw-scent-charter"
import {
  isYoungNicheTargetingEnabled,
  LUMINA_YOUNG_NICHE_COMPLIANCE_PRINCIPLE_KO,
} from "@/lib/lumina/young-niche-charter"
import {
  isMasterMottoCharterEnabled,
  LUMINA_MASTER_MOTTO_COMPLIANCE_PRINCIPLE_KO,
} from "@/lib/lumina/lumina-master-motto-charter"
import {
  isFirstPrincipleCharterEnabled,
  LUMINA_FIRST_PRINCIPLE_COMPLIANCE_PRINCIPLE_KO,
} from "@/lib/lumina/lumina-first-principle-charter"
import {
  isCustomerImpressionCharterEnabled,
  LUMINA_CUSTOMER_IMPRESSION_COMPLIANCE_PRINCIPLE_KO,
} from "@/lib/lumina/lumina-customer-impression-charter"

export type EvidenceFooterInput = {
  hitRuleIds: string[]
  rag: RetrievedGuideline[]
  corpusVersion: string
  /** 2단계 게이트: 위반·키워드 없으면 RAG 생략 */
  ragSkipped?: boolean
  ragSkipReason?: string
}

/**
 * 상세 하단·감사 추적용 — 짧은 마크다운 (우아하게, 과시하지 않음)
 */
export function formatAutomatedEvidenceFooter(input: EvidenceFooterInput): string {
  const { hitRuleIds, rag, corpusVersion, ragSkipped, ragSkipReason } = input
  const lines: string[] = [
    "",
    "---",
    '<!-- lumina-legal-trace v1 -->',
    "###### Lumina Legal Trace · 자동 생성",
    "",
    `내부 컴플라이언스 엔진·지식 베이스 **v${corpusVersion}** 기준으로 본 문서를 정제했습니다.`,
  ]

  if (hitRuleIds.length > 0) {
    lines.push("", "**검수 시 참조한 내부 규칙 ID:**", hitRuleIds.map((id) => `- \`${id}\``).join("\n"))
  } else {
    lines.push("", "**검수 시 참조한 내부 규칙 ID:** 자동 탐지 위반 없음(원문 기준).")
  }

  if (ragSkipped) {
    lines.push(
      "",
      "**가이드라인 RAG:** 생략됨 (1차 로컬 규칙·키워드 게이트 통과 — 벡터/원격 검색 비용 절감).",
      ragSkipReason ? `_사유: ${ragSkipReason}_` : "",
    )
  } else if (rag.length > 0) {
    lines.push(
      "",
      "**가이드라인 코퍼스 발췌 (RAG / 키워드 검색):**",
      ...rag.map((r) => {
        const ref = r.sourceRef ? ` — *${r.sourceRef}*` : ""
        return `- **${r.title}**${ref}: _${r.excerpt}_`
      }),
    )
  } else {
    lines.push("", "**가이드라인 RAG:** 호출되었으나 일치 청크 없음.")
  }

  if (isGusoCharterEnabled()) {
    lines.push("", `**구소 · ${LUMINA_GUSO_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isTrinityCharterEnabled()) {
    lines.push("", `**三求 · ${LUMINA_TRINITY_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isEnCharterEnabled()) {
    lines.push("", `**恩 · ${LUMINA_EN_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isXinCharterEnabled()) {
    lines.push("", `**心 · ${LUMINA_XIN_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isMeiCharterEnabled()) {
    lines.push("", `**没 · ${LUMINA_MEI_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isLoveCharterEnabled()) {
    lines.push("", `**爱 · ${LUMINA_LOVE_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isZenCharterEnabled()) {
    lines.push("", `**禅 · ${LUMINA_ZEN_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isDuCharterEnabled()) {
    lines.push("", `**赌 · ${LUMINA_DU_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isMingCharterEnabled()) {
    lines.push("", `**名 · ${LUMINA_MING_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isTanCharterEnabled()) {
    lines.push("", `**贪 · ${LUMINA_TAN_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isShuangxiCharterEnabled()) {
    lines.push("", `**囍 · ${LUMINA_SHUANGXI_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isIntelligencePriorityCharterEnabled()) {
    lines.push("", `**지능 우선 · ${LUMINA_INTELLIGENCE_PRIORITY_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isNarrativeSpearCharterEnabled()) {
    lines.push("", `**진실의 창 · ${LUMINA_NARRATIVE_SPEAR_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isDualSynchroCharterEnabled()) {
    lines.push("", `**Dual-Synchro · ${LUMINA_DUAL_SYNCHRO_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isNakedVesselCardCharterEnabled()) {
    lines.push("", `**맨 용기·카드 · ${LUMINA_NAKED_VESSEL_CARD_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isRawScentNarrativeEnabled()) {
    lines.push("", `**후각적 무결성 · ${LUMINA_RAW_SCENT_COMPLIANCE_PRINCIPLE_KO}**`)
    lines.push("", `_철학 문구(참고, 의학 주장 아님): ${LUMINA_RAW_SCENT_PHILOSOPHY_FOOTER_KO}_`)
    if (isRawScentZeroSyntheticBadgeSubstantiated()) {
      lines.push(
        "",
        `**Truth-badge (전성분 등 근거 확인된 SKU만):** ${LUMINA_RAW_SCENT_ZERO_SYNTHETIC_BADGE_KO} / ${LUMINA_RAW_SCENT_ZERO_SYNTHETIC_BADGE_EN}`,
      )
    }
  }
  if (isYoungNicheTargetingEnabled()) {
    lines.push("", `**2030 영-니치 · ${LUMINA_YOUNG_NICHE_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isMasterMottoCharterEnabled()) {
    lines.push("", `**마스터 모토 · ${LUMINA_MASTER_MOTTO_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isFirstPrincipleCharterEnabled()) {
    lines.push("", `**제1 원칙 · ${LUMINA_FIRST_PRINCIPLE_COMPLIANCE_PRINCIPLE_KO}**`)
  }
  if (isCustomerImpressionCharterEnabled()) {
    lines.push("", `**고객 감동 · ${LUMINA_CUSTOMER_IMPRESSION_COMPLIANCE_PRINCIPLE_KO}**`)
  }

  lines.push(
    "",
    "_본 푸터는 법률 자문을 대체하지 않습니다. 최종 심사는 담당 법무·규제팀과 함께 진행하세요._",
  )

  return lines.join("\n")
}
