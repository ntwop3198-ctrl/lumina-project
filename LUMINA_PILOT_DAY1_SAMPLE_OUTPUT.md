# [LUMINA - Knowledge Engine] 파일럿 Day1 샘플 출력 (JSON + Markdown)

본 문서는 **데모용 샘플**입니다.  
실제 금액·성분·효능은 파트너 데이터와 계약 조건에 맞게 교체해야 합니다.

---

## 1) 입력 가정 (샘플)

- 브랜드: `INTOSKIN`
- 핵심 성분 힌트: `동해 심층수`, `토타롤(기술 메모 기반)`
- 기술 메모 요약: `기술서 문장이 딱딱함 → 고객 언어로 번역 필요`
- 타깃: `성분 근거를 중시하는 고객`

---

## 2) Day1 One Action (JSON)

```json
{
  "day1Action": {
    "day": 1,
    "dateIso": "2026-04-30",
    "titleKo": "워크스페이스 복제 생성",
    "doneDefinitionKo": "파트너 계정 로그인/권한 확인 완료"
  }
}
```

---

## 3) 정산 샘플 (draft, JSON)

아래 숫자는 **예시**입니다.

```json
{
  "sampleSettlementDraft": {
    "partnerId": "changguk-intoskin-pilot",
    "periodStart": "2026-04-30",
    "periodEnd": "2026-05-13",
    "status": "draft",
    "lines": [
      {
        "key": "gross_revenue",
        "labelKo": "총매출",
        "amountWon": 125000000,
        "explanationKo": "해당 기간 총매출 원금액"
      },
      {
        "key": "platform_fee",
        "labelKo": "플랫폼 배분금",
        "amountWon": 8750000,
        "explanationKo": "사전 합의된 배분율 7% 적용"
      },
      {
        "key": "adjustment_amount",
        "labelKo": "조정금액",
        "amountWon": 0,
        "explanationKo": "반품/오류/합의조정 항목 반영"
      },
      {
        "key": "net_settlement",
        "labelKo": "최종 정산액",
        "amountWon": 116250000,
        "explanationKo": "총매출 - 플랫폼 배분금 + 조정금액"
      }
    ],
    "summary": {
      "grossRevenueWon": 125000000,
      "platformFeeWon": 8750000,
      "adjustmentWon": 0,
      "netSettlementWon": 116250000
    }
  }
}
```

---

## 4) 정산 알림 초안 (JSON)

```json
{
  "alertDraft": {
    "dueDayOfMonth": 10,
    "gracePeriodDays": 7,
    "reminders": [
      {
        "offsetDaysFromDue": -3,
        "messageKo": "정산 지급일 3일 전입니다. draft 상태 항목을 confirmed로 확정해 주세요."
      },
      {
        "offsetDaysFromDue": 0,
        "messageKo": "오늘은 정산 지급일(매월 10일)입니다. 지급 처리 여부를 업데이트해 주세요."
      },
      {
        "offsetDaysFromDue": 7,
        "messageKo": "지급일+7일 경과 알림입니다. 미지급 항목은 사유와 예정일을 기록해 주세요."
      }
    ]
  }
}
```

---

## 5) 인투스킨 2트랙 조끼 (Markdown 출력 샘플)

### [본질의 길] 브랜드 스토리 (초안)

INTOSKIN은 화려한 장식을 덜어내고 성분의 본질을 먼저 보여준다.  
핵심 성분(동해 심층수, 토타롤)과 기술 메모를 바탕으로 신뢰 가능한 언어만 남긴다.  
루미나 철학(구소구고구기, 덧칠하지 않아도 예쁜 본질, 파트너 상생과 정산 투명성)에 맞춰 고객의 안심과 파트너의 지속 가능성을 함께 설계한다.

### [본질의 길] 랜딩 히어로

INTOSKIN, 본질이 먼저 보이는 스킨 솔루션

### [효율의 길] 브랜드 스토리 (초안)

INTOSKIN은 현장 실행 속도를 높이기 위해 정보 구조를 단순화한다.  
핵심 성분(동해 심층수, 토타롤)과 기술 포인트를 한 번에 이해되도록 정리해 의사결정 시간을 줄인다.  
성분 근거를 중시하는 고객이 빠르게 비교·선택할 수 있도록 메시지와 화면 흐름을 최적화한다.

### [효율의 길] 랜딩 히어로

INTOSKIN, 빠르게 이해되고 바로 선택되는 구조

---

## 6) 코드 연결

- `lib/partners/pilot-one-action.ts`
- `lib/partners/pilot-settlement-automation.ts`
- `lib/partners/intoskin-pilot-templates.ts`
