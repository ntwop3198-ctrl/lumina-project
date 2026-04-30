# [LUMINA - Knowledge Engine] Glide Dashboard Structure V1 (창국형 파일럿)

## 목적

창국형이 모바일에서 파일럿 진행상태를 실시간 확인할 수 있도록  
최소 테이블 구조와 화면 구성을 고정한다.

---

## 1) 테이블 구조

### `pilot_actions`
- `id`
- `day`
- `date_iso`
- `title_ko`
- `done_definition_ko`
- `status` (`todo` | `doing` | `done`)
- `owner`
- `updated_at`

### `pilot_kpi_daily`
- `date_iso`
- `onboarding_progress_percent`
- `rework_rate_percent`
- `approval_count`
- `settlement_status`
- `notes`

### `pilot_settlement_lines`
- `period_start`
- `period_end`
- `key` (`gross_revenue` | `platform_fee` | `adjustment_amount` | `net_settlement`)
- `label_ko`
- `amount_won`
- `status`

---

## 2) 화면 구성

### Screen A: Today
- 오늘 Day 액션 1개
- 완료조건 1줄
- 상태 버튼(todo/doing/done)

### Screen B: KPI
- 온보딩 진행률
- 재작업률
- 승인본 개수
- 정산 상태

### Screen C: Settlement
- period 선택
- line-item 4개 항목 표시
- 지급일/지연정리 상태 배지

### Screen D: Notes
- 이슈/결정/다음액션 기록

---

## 3) 운영 규칙

- 하루 액션은 1개만 `doing` 상태 허용
- `done` 전환 시 `updated_at` 자동 갱신
- 정산 데이터는 확정 전 `draft` 표시 유지

