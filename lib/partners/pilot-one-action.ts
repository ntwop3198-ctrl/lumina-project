export interface PilotOneActionItem {
  day: number
  dateIso: string
  titleKo: string
  doneDefinitionKo: string
}

const DAY_ACTIONS: Array<{ titleKo: string; doneDefinitionKo: string }> = [
  { titleKo: "워크스페이스 복제 생성", doneDefinitionKo: "파트너 계정 로그인/권한 확인 완료" },
  { titleKo: "브랜드 입력 시트 완성", doneDefinitionKo: "필수 입력값 누락 0건" },
  { titleKo: "자동 산출물 3종 생성", doneDefinitionKo: "상세/카피/스크립트 초안 1세트 저장" },
  { titleKo: "준법·톤 검수", doneDefinitionKo: "수정 이슈 목록 확정" },
  { titleKo: "수정 반영 및 승인", doneDefinitionKo: "승인본 1세트 잠금" },
  { titleKo: "운영 이관", doneDefinitionKo: "운영 담당 인수 확인" },
  { titleKo: "주간 병목 제거", doneDefinitionKo: "병목 3건 owner/due 지정" },
  { titleKo: "실제 게시/배포", doneDefinitionKo: "게시 링크 및 첫 반응 데이터 확인" },
  { titleKo: "성과 데이터 수집", doneDefinitionKo: "핵심 KPI 수집 시작" },
  { titleKo: "1차 정산 리포트 생성", doneDefinitionKo: "line-item draft 발행" },
  { titleKo: "정산 확인 반영", doneDefinitionKo: "confirmed 상태 전환" },
  { titleKo: "지급/보류 분리 확정", doneDefinitionKo: "paid/hold 분류 완료" },
  { titleKo: "파일럿 회고", doneDefinitionKo: "개선항목 3건 확정" },
  { titleKo: "Go/No-Go 결정", doneDefinitionKo: "확장 여부 공식 결정" },
]

export function buildPilotOneActionList(startDateIso: string): PilotOneActionItem[] {
  const start = new Date(`${startDateIso}T00:00:00.000Z`)
  if (Number.isNaN(start.getTime())) return []

  return DAY_ACTIONS.map((action, index) => {
    const d = new Date(start)
    d.setUTCDate(start.getUTCDate() + index)
    return {
      day: index + 1,
      dateIso: d.toISOString().slice(0, 10),
      titleKo: action.titleKo,
      doneDefinitionKo: action.doneDefinitionKo,
    }
  })
}

