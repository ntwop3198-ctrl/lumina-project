import type { PageBlueprint, ROIFeedbackIssue, ROIPrediction, ROIBreakdown } from "@/lib/roi/types"

function clamp01(v: number) {
  return Math.max(0, Math.min(1, v))
}

function severityFromScore(axisScore: number): ROIFeedbackIssue["severity"] {
  if (axisScore < 0.55) return "high"
  if (axisScore < 0.75) return "medium"
  return "low"
}

export class SalesPredictor {
  /**
   * 성공 패턴 스캐너(설계):
   * - dwell time, click heat, conversion rate를 학습 데이터로 받아
   *   - 각 축(visual/copy/trust/bridge) 가중치를 미세 조정하는 구조.
   *
   * 현재는 기본 가중치 기반 휴리스틱 엔진(즉시 동작용)입니다.
   */
  private weights = {
    visual: 0.25,
    copy: 0.35,
    trust: 0.25,
    bridge: 0.15,
  }

  train(_samples: Array<{
    // 미래 확장용: 상위 1% 브랜드의 heatmap 특징/전환율
    dwellTimeSec: number
    clickCoverage: number
    conversionRate: number
    page: PageBlueprint
  }>) {
    // TODO: 샘플 기반으로 weights를 업데이트하는 로직(회귀/베이지안/그라디언트)을 붙일 수 있습니다.
    // 이번 구현은 UI/UX 연결을 우선합니다.
  }

  predict(page: PageBlueprint): ROIPrediction {
    const visual = this.scoreVisual(page)
    const copy = this.scoreCopy(page)
    const trust = this.scoreTrust(page)
    const bridge = this.scoreBridge(page)

    const total01 =
      visual * this.weights.visual +
      copy * this.weights.copy +
      trust * this.weights.trust +
      bridge * this.weights.bridge

    const score = Math.round(clamp01(total01) * 100)

    const breakdown: Omit<ROIBreakdown, "total"> & { total: number } = {
      visual,
      copy,
      trust,
      bridge,
      total: score,
    }

    const issues = this.buildCriticalFeedback({
      page,
      breakdown,
    })

    return {
      score,
      breakdown,
      issues,
    }
  }

  private scoreVisual(page: PageBlueprint): number {
    const base = page.hasVisual ? 0.82 : 0.35
    const stageBoost = page.stageCount >= 4 ? 0.08 : page.stageCount === 2 ? -0.02 : 0.03
    // micro-contrast 같은 디테일은 현재 입력 데이터가 없어서 ‘비주얼 존재’ 신호로만 반영합니다.
    return clamp01(base + stageBoost)
  }

  private scoreCopy(page: PageBlueprint): number {
    const stage =
      page.stageCount >= 4 ? 1 : page.stageCount === 3 ? 0.82 : page.stageCount === 2 ? 0.68 : 0.48
    const honorificBonus = page.hasHonorificTone ? 0.08 : 0
    const confessionBonus = page.voiceMode === "confession" && page.hasWePhrase ? 0.12 : 0
    const lengthScore = clamp01((page.markdownLength - 350) / 900) * 0.05
    return clamp01(stage * 0.82 + honorificBonus + confessionBonus + lengthScore)
  }

  private scoreTrust(page: PageBlueprint): number {
    const base = page.trustPresent ? 0.9 : 0.38
    const clinicalBonus = page.hasClinicalSignal ? 0.07 : -0.03
    return clamp01(base + clinicalBonus)
  }

  private scoreBridge(page: PageBlueprint): number {
    const base = page.hasDataBridgePhrase ? 0.98 : 0.58
    const damp = page.hasClinicalSignal ? 0 : -0.03
    return clamp01(base + damp)
  }

  private buildCriticalFeedback({
    page,
    breakdown,
  }: {
    page: PageBlueprint
    breakdown: Omit<ROIBreakdown, "total"> & { total: number }
  }): ROIFeedbackIssue[] {
    const issues: ROIFeedbackIssue[] = []

    const add = (issue: Omit<ROIFeedbackIssue, "severity"> & { severity?: ROIFeedbackIssue["severity"] }) => {
      const axisScore = breakdown[issue.axis]
      issues.push({
        ...issue,
        severity: issue.severity ?? severityFromScore(axisScore),
      })
    }

    // Requested example #1
    if (breakdown.visual < 0.62) {
      add({
        id: "visual-dark",
        axis: "visual",
        title: "이미지 대비(비주얼 신호) 보강",
        message: "이 부분의 이미지가 너무 어두워 이탈이 예상됩니다. 초반 배경 레이어의 대비(글로우/그라데이션)를 한 단계 높이세요.",
      })
    }

    // Requested example #2
    if (breakdown.copy < 0.72) {
      add({
        id: "copy-data-top",
        axis: "copy",
        title: "데이터 계층(상단 배치) 최적화",
        message: "데이터 수치가 더 상단에 배치되어야 합니다. Fact Check 브릿지를 Discovery 직후로 당겨, ‘읽는 즉시 근거를 확인’하도록 구성하세요.",
      })
    }

    if (breakdown.bridge < 0.72) {
      add({
        id: "bridge-missing",
        axis: "bridge",
        title: "감성-이성 브릿지 고정",
        message: "과학-감성 브릿지 문장이 약합니다. 임상 수치가 보이기 직전 ‘진심의 기록’ 문장을 고정 템플릿으로 유지해 주세요.",
      })
    }

    if (page.voiceMode === "confession" && !page.hasWePhrase) {
      add({
        id: "confession-we",
        axis: "copy",
        title: "Confession Mode 문장 강화",
        message: "‘우리는’이 충분히 배치되지 않았습니다. 인디 창업자의 고백체 리듬을 강화해, 감정의 설득력을 높이세요.",
      })
    }

    if (breakdown.trust < 0.75) {
      add({
        id: "trust-low",
        axis: "trust",
        title: "신뢰 데이터 밀도 향상",
        message: "임상/지표 신호가 약해 보입니다. 숫자(%)·기간(주)·비교(대조군) 표기를 Fact Check 영역에 더 선명하게 배치해 보세요.",
      })
    }

    // 점수가 높다면 최소 1개는 안내(전환 마찰 감소)
    if (issues.length === 0) {
      add({
        id: "green-path",
        axis: "trust",
        title: "현재 구성은 전환 친화적입니다",
        message: "시각·카피·신뢰 데이터의 흐름이 매끄럽습니다. 다음 단계로 ‘문장 길이의 균형(짧은 절)’만 미세 조정하면 전환이 더 안정화됩니다.",
      })
    }

    // 같은 축 중복을 줄이기 위한 정렬
    return issues.sort((a, b) => {
      const order = { high: 0, medium: 1, low: 2 } as const
      return order[a.severity] - order[b.severity]
    })
  }
}

