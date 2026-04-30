/**
 * 삼求 랜딩 설계 — 클로드·커서 멘토 핸드오프 (마크다운 한 덩어리)
 */

import {
  LUMINA_TRINITY_MAGIC_GUGI_BODY_EN,
  LUMINA_TRINITY_MAGIC_GUGI_BODY_KO,
  LUMINA_TRINITY_MAGIC_GUGO_BODY_EN,
  LUMINA_TRINITY_MAGIC_GUGO_BODY_KO,
  LUMINA_TRINITY_MAGIC_GUSO_BODY_EN,
  LUMINA_TRINITY_MAGIC_GUSO_BODY_KO,
  LUMINA_TRINITY_MAGIC_SECTION_SUB_EN,
  LUMINA_TRINITY_MAGIC_SECTION_SUB_KO,
  LUMINA_TRINITY_MAGIC_SECTION_TITLE_EN,
  LUMINA_TRINITY_MAGIC_SECTION_TITLE_KO,
} from "@/lib/lumina/lumina-landing-trinity-magic-copy"
import { TRINITY_CHARTER_GLOSS_EN, TRINITY_CHARTER_GLOSS_KO } from "@/lib/lumina/lumina-trinity-charter"

const MENTOR_INSTRUCTION_KO = `당신은 루미나 브랜드 편집자다. 위 삼求(求小·求苦·求己)는 다이아몬드 지혜·구소·정직한 한계 서술과 정합해야 한다.
과장 효능·의료 단정·혐오·정치 공격 문구는 넣지 말 것. 영문 카피 다듬기·짧은 슬로건 제안은 환영.`

export function buildLuminaTrinityMagicMentorHandoffMarkdown(): string {
  return [
    "# Lumina · 삼求(求小·求苦·求己) 랜딩 매직 — 멘토 핸드오프",
    "",
    "## 섹션 카피 (랜딩)",
    "",
    `**KO 제목:** ${LUMINA_TRINITY_MAGIC_SECTION_TITLE_KO}`,
    `**KO 보조:** ${LUMINA_TRINITY_MAGIC_SECTION_SUB_KO}`,
    "",
    `**EN title:** ${LUMINA_TRINITY_MAGIC_SECTION_TITLE_EN}`,
    `**EN sub:** ${LUMINA_TRINITY_MAGIC_SECTION_SUB_EN}`,
    "",
    "### 카드 요약",
    "",
    "| 기둥 | KO | EN |",
    "|------|----|----|",
    `| 求小 | ${LUMINA_TRINITY_MAGIC_GUSO_BODY_KO} | ${LUMINA_TRINITY_MAGIC_GUSO_BODY_EN} |`,
    `| 求苦 | ${LUMINA_TRINITY_MAGIC_GUGO_BODY_KO} | ${LUMINA_TRINITY_MAGIC_GUGO_BODY_EN} |`,
    `| 求己 | ${LUMINA_TRINITY_MAGIC_GUGI_BODY_KO} | ${LUMINA_TRINITY_MAGIC_GUGI_BODY_EN} |`,
    "",
    "## 헌장 글로스 (정합용)",
    "",
    TRINITY_CHARTER_GLOSS_KO,
    "",
    TRINITY_CHARTER_GLOSS_EN,
    "",
    "---",
    "",
    "## 멘토 지시",
    "",
    MENTOR_INSTRUCTION_KO,
    "",
  ].join("\n")
}
