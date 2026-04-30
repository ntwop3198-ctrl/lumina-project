# [LUMINA - Knowledge Engine] 14일 파일럿 실행 마스터플랜 (1Page)

## 목적

창국형(인투스킨) 파일럿을 14일 내 실행해,  
루미나 허브의 **설계/자동화/정산 투명성**을 현장에서 검증한다.

---

## 1) 설계 로직 (Design)

- 공통 철학 앵커 고정: `구소구고구기`, `민용기 본질`, `파트너 상생`, `정산 투명성`
- 인투스킨 기술서 입력 시 출력 2트랙 고정:
  - **본질의 길:** 신뢰·철학·근거 중심 브랜드 스토리/랜딩
  - **효율의 길:** 실행·전환·운영 효율 중심 브랜드 스토리/랜딩
- 검수 단계: `초안 → 검수포인트 → 승인본`

---

## 2) 자동화 프로세스 (Automation)

- 대표 승인 후 `14일 One Action` 자동 생성
- 매일 1개 액션만 완료(운영 피로 최소화)
- 파트너 모바일 확인용 대시보드 구조(Glide) 고정:
  - 오늘 액션
  - 진행상태
  - KPI 스냅샷
  - 정산 상태

---

## 3) 정산 시스템 (Settlement)

- 정산 원칙: line-item 항목별 투명 공개
- 자동 계산식:
  - `platform_fee = gross_revenue × agreed_percent`
  - `net_settlement = gross_revenue - platform_fee + adjustment_amount`
- 지급 규칙:
  - 지급일: 매월 10일
  - 지연 정리: 7일 이내
  - 알림: `-3일`, `당일`, `+7일` 자동 안내

---

## 4) 14일 운영 루틴

- D1~D3: 복제/입력/산출물 초안
- D4~D7: 검수/승인/운영이관/병목제거
- D8~D10: 게시/데이터수집/정산초안
- D11~D14: 정산확정/회고/Go-NoGo

---

## 5) 대표 역할 최소화 원칙

- 대표는 방향·승인·협상만 담당
- 반복 실무(업로드/반복 수정/단순 정리)는 위임
- 의사결정 규칙:
  - “대표 1시간이 실행 10시간 이상을 만들지 못하면 직접 하지 않는다.”

---

## 6) 즉시 실행 체크 (Ready-to-Go)

- [ ] 창국형 킥오프 30분 일정 확정
- [ ] 인투스킨 기술서 입력 완료
- [ ] 본질/효율 2트랙 초안 생성
- [ ] One Action Day-1 실행
- [ ] 정산 샘플 리포트 공유

---

## 7) 연결 파일

- `lib/partners/intoskin-pilot-templates.ts`
- `lib/partners/pilot-one-action.ts`
- `lib/partners/pilot-settlement-automation.ts`
- `LUMINA_HUB_OPERATING_SYSTEM_V1_2_READY.md`

