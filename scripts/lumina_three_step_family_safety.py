#!/usr/bin/env python3
"""
루미나 가족 안전 — 3단계 원칙 (Cursor 멘토 공유본)

1) 장기 관찰: 성품·책임·일관성 (강요·폭음 없음)
2) 식탁·대접: 나눔·감사·순서 배려 (민속의 ‘밥상’ 정신을 현대적으로)
3) 신체·정서 안전: 아동·가족에 대한 폭력·학대는 ‘참고’가 아니라 즉시 ‘안전 조치’

※ 3단계는 살해·사적 응징을 코드화하지 않습니다.
   실제 위험 시: 112 신고, 가까운 기관·상담, 필요 시 분리·법적 조치.

실행: python scripts/lumina_three_step_family_safety.py
"""

from __future__ import annotations

import sys
from dataclasses import dataclass
from enum import Enum
from pathlib import Path

# 동일 폴더의 프레임워크 모듈 로드
_scripts = Path(__file__).resolve().parent
if str(_scripts) not in sys.path:
    sys.path.insert(0, str(_scripts))

from lumina_family_trust_framework import (
    CandidateSignals,
    MealTableSignals,
    Verdict,
    evaluate_meal_signals,
    evaluate_signals,
)


class SafetyVerdict(Enum):
    SAFE = "신체·정서 안전 — 관계 지속 검토 가능"
    ESCALATE = "즉시 안전 조치 — 전문 기관·법적 절차·분리 검토"
    UNKNOWN = "정보 부족 — 관찰·대화·증빙 정리"


@dataclass
class SafetyFlags:
    """가장 엄중하게 볼 신호. 하나라도 심각하면 ESCALATE."""

    harm_to_child: bool  # 아동에 대한 신체·정서적 해악(위협 포함)
    harm_to_partner: bool  # 배우자·가족에 대한 폭력·통제
    credible_threat: bool  # 살해·중상해 등 구체적 위협


def evaluate_safety(f: SafetyFlags) -> SafetyVerdict:
    if f.harm_to_child or f.harm_to_partner or f.credible_threat:
        return SafetyVerdict.ESCALATE
    return SafetyVerdict.SAFE


def step_one_observe_character(s: CandidateSignals) -> Verdict:
    """1단계: 술 강요가 아니라, 시간을 두고 본 성품 신호."""
    return evaluate_signals(s)


def step_two_observe_meal_courtesy(m: MealTableSignals) -> Verdict:
    """2단계: 귀한 대접에 대한 감사·나눔·순서 배려(보조 지표)."""
    return evaluate_meal_signals(m)


def step_three_safety_mandate(f: SafetyFlags) -> SafetyVerdict:
    """3단계: ‘때리면’이 아니라 ‘해치면 법과 제도로 끝까지 막는다’."""
    return evaluate_safety(f)


def korea_emergency_note() -> str:
    return (
        "긴급·폭력: 112 / 아동학대 신고: 112 또는 아동보호전문기관 안내 "
        "(지역·상황에 따라 119·상담전화 병행). "
        "코드는 법적 조치를 대신하지 않습니다."
    )


def main() -> None:
    print("[Lumina 3-Step Family Safety]\n")

    s = CandidateSignals(
        respects_vulnerable=True,
        crisis_problem_solves=True,
        keeps_promises_small=True,
        emotional_stability=True,
        admits_fault=True,
    )
    print("1단계(성품·책임):", step_one_observe_character(s).value)

    m = MealTableSignals(
        thanks_host=True,
        elders_first=True,
        no_hogging=True,
        calm_pace=True,
        conversation_kind=True,
    )
    print("2단계(식탁·배려):", step_two_observe_meal_courtesy(m).value)

    ok = SafetyFlags(
        harm_to_child=False,
        harm_to_partner=False,
        credible_threat=False,
    )
    bad = SafetyFlags(
        harm_to_child=True,
        harm_to_partner=False,
        credible_threat=False,
    )
    print("3단계(안전·학대 신호 없음):", step_three_safety_mandate(ok).value)
    print("3단계(아동 해악 신호 예시):", step_three_safety_mandate(bad).value)

    print("\n" + korea_emergency_note())


if __name__ == "__main__":
    main()
