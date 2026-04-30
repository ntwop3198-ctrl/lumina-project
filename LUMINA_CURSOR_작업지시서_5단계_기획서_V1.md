# [LUMINA - Knowledge Engine] Cursor·개발 작업지시서 V1  
**대상:** Cursor Agent / 프론트엔드 담당  
**주제:** 5단계(결핍·존재·가치·약속·소통) UI 버튼 및 상세기획서 출력 흐름  
**작성 기준일:** 2026-04-18  

---

## 1. 목적

1. 사용자가 **Knowledge Engine 5단계**를 한눈에 인지하고, 미리보기·다운로드까지 **한 흐름**으로 쓸 수 있게 한다.  
2. Cursor에 넣을 때 **파일 경로·수용 기준·금지 사항**이 분명해, 반복 질문 없이 구현 가능하게 한다.

---

## 2. 용어 정리 (혼동 방지)

| 구분 | 의미 | 코드·경로 |
|------|------|-----------|
| **5단계 기획서** | 결핍(Void) → 존재(Existence) → 가치(Value) → 약속(Covenant) → 소통(Resonance) 구조의 **상세기획서 초안** | `lib/lumina/knowledge-engine-plan.ts`의 `buildLuminaDetailPlanMarkdown` |
| **Genesis 진단** | 랜딩 `#persona-genesis`의 **6단계** 퀴즈(5 choice + Diamond) — 본 작업지시서의 “5단계 기획서”와 **별개** | `components/landing/midnight/persona-genesis-wizard.tsx`의 `GENESIS_STEPS` |

본 지시서의 “5단계 버튼”은 **상세기획서 5단계**를 가리킨다.

---

## 3. 현재 구현 상태 (앵커)

- **기획서 생성·출력 로직:** `buildLuminaDetailPlanMarkdown` — 마크다운 본문에 H2로 `## 1) 결핍(Void)` … `## 5) 소통(Resonance)` 형태가 포함됨.  
- **페이지:** `app/knowledge-engine/plan/page.tsx`  
  - 입력 폼 + 미리보기(`#lumina-plan-output`) + **Markdown 다운로드** + **인쇄/PDF** 버튼 존재.  
- **부족할 수 있는 UX (본 지시서의 구현 대상):**  
  - 5단계 각각으로 **미리보기 스크롤** 또는 **현재 단계 하이라이트**를 돕는 **5개의 단계 버튼(또는 스텝 네비)**.

---

## 4. 작업 범위

### 4.1 5단계 버튼 UI

**요구사항**

1. `app/knowledge-engine/plan/page.tsx` (또는 분리된 클라이언트 컴포넌트)에 **5개 버튼**을 둔다.  
   - 라벨(한글 권장): `결핍` · `존재` · `가치` · `약속` · `소통`  
   - 각 버튼 클릭 시 미리보기 영역에서 해당 **섹션 제목이 보이도록** 스크롤한다.  
2. 스크롤 대상은 마크다운 렌더 결과 내 **안정적인 앵커**로 연결한다.  
   - 권장: `buildLuminaDetailPlanMarkdown` 출력의 각 `##` 제목에 대응하는 `id`를 미리보기 쪽에 부여하거나, `pre` 대신 **제목 단위로 쪼갠 구조** + `id`를 부여해 `scrollIntoView({ behavior: "smooth", block: "start" })` 호출.  
3. 접근성: 버튼은 `type="button"`, 키보드 포커스 가능, `aria-current` 또는 `aria-pressed`로 현재 단계 표시(선택).  
4. 반응형: 모바일에서 5버튼이 한 줄에 넘치면 줄바꿈 또는 가로 스크롤.

**구현 힌트 (Cursor에 그대로 전달 가능)**

- 변경 전 `buildLuminaDetailPlanMarkdown`의 섹션 제목 문자열을 읽고, 동일한 앵커 `id` 규칙을 정한다(예: `void`, `existence`, `value`, `covenant`, `resonance`).  
- 미리보기만 `id`가 있어야 하므로, 필요 시 `lib/lumina/knowledge-engine-plan.ts`에 **앵커용 상수**를 두고 제목과 동기화한다.

### 4.2 기획서 “출력” 완결

**이미 있는 동작 유지**

- **Markdown 파일 다운로드** — 기존 `downloadTextFile(..., markdown)` 패턴 유지.  
- **인쇄 / PDF** — `window.print()` + 인쇄용 스타일(`print:`) 유지.

**추가 점검 (필요 시)**

- 인쇄 시 5단계 버튼 영역은 `print:hidden` 처리해 **본문만 PDF**에 나오게 한다.  
- 파일명: 기존처럼 브랜드명 기반 `*_plan.md` 규칙 유지.

---

## 5. 수용 기준 (Definition of Done)

- [ ] 5개 단계 버튼이 보이고, 클릭 시 해당 단계 제목이 미리보기에서 확인 가능하다.  
- [ ] Markdown 다운로드 파일 내용이 화면 미리보기와 **동일**하다(동일 `buildLuminaDetailPlanMarkdown` 소스).  
- [ ] 인쇄/PDF에서 불필요한 네비게이션은 숨긴다.  
- [ ] `npm run lint` 통과, 타입 오류 없음.  
- [ ] 근거 없는 매출·전환율·효능 **수치를 새로 생성하거나 약속하는 UI/카피를 추가하지 않는다** (기존 `knowledge-engine-plan` 원칙 유지).

---

## 6. 준수·금지 (루미나 공통)

- **파트너 상생·정산 투명성:** 기획서 본문 및 새 카피는 `lib/partners/settlement-transparency.ts` 등과 모순되지 않게 서술한다.  
- **Diamond / Essentialism:** 장식용 문구 남발 없이, 단계 라벨은 짧게 유지한다.  
- **허위 효능·실시간 수치 과장 금지.**

---

## 7. Cursor 사용 방법 (멘토 → 개발자 전달용)

1. 저장소 루트에서 Cursor 채팅 또는 Agent에 **본 문서 전체**를 붙인다.  
2. 다음 한 줄을 덧붙인다:  
   > `app/knowledge-engine/plan/page.tsx`와 `lib/lumina/knowledge-engine-plan.ts`만 수정하고, 4.1·4.2·5절 수용 기준을 만족시켜라.  
3. 구현 후 **수동 확인:** `/knowledge-engine/plan` 접속 → 5버튼 클릭 → 다운로드 → 인쇄 미리보기.

---

## 8. 참고 경로 요약

| 항목 | 경로 |
|------|------|
| 기획서 마크다운 빌더 | `lib/lumina/knowledge-engine-plan.ts` |
| 상세기획서 페이지 | `app/knowledge-engine/plan/page.tsx` |
| 레이아웃 메타 | `app/knowledge-engine/plan/layout.tsx` |
| 브랜드 5단계 정의(문맥) | `.cursorrules` — Knowledge Engine 5단계 |

---

**문서 끝 — V1**
