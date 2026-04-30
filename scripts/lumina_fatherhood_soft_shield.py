#!/usr/bin/env python3
"""
LUMINA FATHERHOOD — Soft Shield (부성애 기반 가동 코드)
Cursor 멘토 공유본

의도: 강인함은 가족 앞에서는 부드러운 수호로 전환한다(상징).
대상: 가족의 거실 — 아이의 안식처

실행: python scripts/lumina_fatherhood_soft_shield.py
"""

from __future__ import annotations

import math


class SoftLumina:
    """이중 보안(은유): 대외·내면의 강함은 낮추고, 가족 향하는 온기만 상단에 둔다."""

    def __init__(self) -> None:
        self.warrior_mode = "Reserved — 필요할 때만, 가족 밖에서"
        self.father_mode = "Active — 가족 앞에서는 부드럽고 분명하게"
        self.fear_factor = 0.0
        self.love_factor = math.inf

    def transform_energy(self) -> str:
        """과거의 상처·종결은 흙이 되고, 앞으로의 생(生)·빛만 전달한다(은유)."""
        print(
            ">>> [TRANSFORM] 과거의 무거움은 정리하고, "
            "아이에게는 안전·희망·온기만 전달합니다."
        )
        return "현재 에너지 상태: Lumina for Family (Soft Output)"

    def guardian_protocol(self) -> list[str]:
        return [
            "자비로운 시선 — 말과 표정의 온도 유지",
            "유연한 대화 — 비난보다 경청과 확인",
            "따뜻한 존재감 — 함께 있음 자체가 안전 신호",
            "든든한 경계 — 가족의 평안을 지키는 책임",
        ]

    def final_output(self) -> str:
        return "우리 아이, 아빠가 세상에서 제일 사랑해."


def print_fatherhood_charter_ko() -> None:
    """TypeScript `fatherhood-dedication-copy.ts`와 같은 뜻의 CLI용 요약."""
    print(
        "\n[Lumina · 딸바보 아빠들을 위한 헌사]\n"
        "가족 신뢰를 세우는 이 세 기준을, 세상의 모든 딸바보 아빠들에게 바칩니다.\n\n"
        "우리는 전사이기 전에 아빠이며, 수호자이기 전에 사랑이다. "
        "단호함이 필요할 때도 법과 질서 안에서 움직인다.\n\n"
        "제1조 — 본심의 관찰: 술잔으로 사람을 시험하지 않는다. "
        "평소의 약속·말과 행동의 일치·어려울 때의 태도에서 성품을 본다.\n"
        "제2조 — 순리의 실천: 감사·나눔·연약한 이와 어른 배려의 순서.\n"
        "제3조 — 안전의 의무: 해악·위협에는 침묵하지 않고 안전 조치·신고·전문 기관·법적 절차.\n"
        "(상세·영문: lib/lumina/fatherhood-dedication-copy.ts · 3단계 데모: lumina_three_step_family_safety.py)\n"
    )


def main() -> None:
    soft = SoftLumina()
    print(f"시스템 가동: {soft.transform_energy()}")
    print("\n[가족 수호 프로토콜]")
    for layer in soft.guardian_protocol():
        print(f"  · {layer}")
    print(f"\n[최종 승인 문장]: {soft.final_output()}")
    print_fatherhood_charter_ko()
    print("STATUS: FATHER MODE — SOFT SHIELD ENABLED _()_")


if __name__ == "__main__":
    main()
