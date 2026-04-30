#!/usr/bin/env python3
"""
Lumina Family Trust Framework — 관계 성품 관찰 (상징 코드)
Cursor 멘토 공유본

의도: 장기적으로 ‘존중·책임·일관성’을 보는 틀. 강요·폭음·모욕은 지양.
참고: 술은 건강·동의·상황에 따라 다르며, 단일 기준으로 사람을 재단하지 않습니다.
민속에 ‘귀한 밥상’ 이야기가 있듯, 여기서는 **식탁 예의·감사·배려**를 상징 신호로만 담습니다.
(실제 닭·음식을 시험 도구로 쓰라는 뜻이 아닙니다.)

실행: python scripts/lumina_family_trust_framework.py
"""

from __future__ import annotations

from dataclasses import dataclass
from enum import Enum


class Verdict(Enum):
    PASS = "PASS — 존중과 책임의 기울기가 안정적입니다."
    WATCH = "WATCH — 더 두고 봅니다(시간·상황 다양화)."
    FAIL = "FAIL — 존중·안전·책임 중 하나 이상이 흔들립니다."


@dataclass
class CandidateSignals:
    """관찰 신호(예시). True=긍정, False=우려."""

    respects_vulnerable: bool  # 아이·어르신·서비스 직원 등에 대한 태도
    crisis_problem_solves: bool  # 일이 꼬였을 때 불평보다 해결 시도
    keeps_promises_small: bool  # 작은 약속의 이행
    emotional_stability: bool  # 과도한 폭발·모욕 없음
    admits_fault: bool  # 잘못 인정·사과 가능


@dataclass
class MealTableSignals:
    """식탁·대접 상황(상징). 민속의 ‘밥상에서 사람됨이 보인다’를 현대적으로 번역."""

    thanks_host: bool  # 정성에 감사 표현
    elders_first: bool  # 어른·주인 먼저 권하거나 배려
    no_hogging: bool  # 좋은 것만 독차지하지 않음
    calm_pace: bool  # 허겁지겁 먹지 않음, 대화와 호흡
    conversation_kind: bool  # 하대·비아냥 없이 말의 온도 유지


def evaluate_signals(s: CandidateSignals) -> Verdict:
    """단정이 아니라 ‘관찰 누적’ 프레임."""
    positives = sum(
        [
            s.respects_vulnerable,
            s.crisis_problem_solves,
            s.keeps_promises_small,
            s.emotional_stability,
            s.admits_fault,
        ]
    )
    if positives >= 5:
        return Verdict.PASS
    if positives >= 3:
        return Verdict.WATCH
    return Verdict.FAIL


def evaluate_meal_signals(m: MealTableSignals) -> Verdict:
    """식탁 신호만으로 단정하지 않고, 가족 맥락의 보조 지표로 씁니다."""
    positives = sum(
        [
            m.thanks_host,
            m.elders_first,
            m.no_hogging,
            m.calm_pace,
            m.conversation_kind,
        ]
    )
    if positives >= 5:
        return Verdict.PASS
    if positives >= 3:
        return Verdict.WATCH
    return Verdict.FAIL


def father_legacy_note() -> str:
    return (
        "옛말에 ‘술자리에서 본심이 드러난다’는 이야기가 있지만, "
        "오늘은 ‘강요 없이, 시간을 두고, 약자 앞 태도와 위기 대응’을 함께 봅니다."
    )


def main() -> None:
    print("[Lumina Family Trust Framework]\n")
    print(father_legacy_note())
    print()

    # 예시: 긍정 시나리오
    good = CandidateSignals(
        respects_vulnerable=True,
        crisis_problem_solves=True,
        keeps_promises_small=True,
        emotional_stability=True,
        admits_fault=True,
    )
    print("예시 A:", evaluate_signals(good).value)

    mixed = CandidateSignals(
        respects_vulnerable=True,
        crisis_problem_solves=False,
        keeps_promises_small=True,
        emotional_stability=True,
        admits_fault=False,
    )
    print("예시 B:", evaluate_signals(mixed).value)

    meal_ok = MealTableSignals(
        thanks_host=True,
        elders_first=True,
        no_hogging=True,
        calm_pace=True,
        conversation_kind=True,
    )
    print("식탁 예시(보조):", evaluate_meal_signals(meal_ok).value)

    print("\n원칙: 폭음·강요·모욕은 합격 기준이 아니라 ‘즉시 중단·재검토’ 신호입니다.")
    print(
        "식탁: 귀한 대접에 대한 감사·겸손·배려 — 옛 씨암닭 이야기의 ‘마음’만 담았습니다."
    )


if __name__ == "__main__":
    main()
