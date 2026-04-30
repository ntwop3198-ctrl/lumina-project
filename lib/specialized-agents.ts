export type SpecializedAgentId =
  | "cosmetic"
  | "fashion"
  | "tech"
  | "fnb"
  | "personal"
  | "custom"

export type AgentMistTheme = {
  fogA: string
  fogB: string
  fogC: string
  accent: string
  particle: string
  orb: string
}

export const AGENT_MIST_THEMES: Record<SpecializedAgentId, AgentMistTheme> = {
  cosmetic: {
    fogA: "rgba(197,160,89,0.09)",
    fogB: "rgba(255,255,255,0.06)",
    fogC: "rgba(197,160,89,0.055)",
    accent: "#C5A059",
    particle: "rgba(197,160,89,0.38)",
    orb: "rgba(197,160,89,0.055)",
  },
  fashion: {
    fogA: "rgba(200,165,180,0.085)",
    fogB: "rgba(248,236,240,0.055)",
    fogC: "rgba(175,140,155,0.05)",
    accent: "#c9a8b4",
    particle: "rgba(200,175,188,0.34)",
    orb: "rgba(200,165,180,0.06)",
  },
  tech: {
    fogA: "rgba(130,165,210,0.095)",
    fogB: "rgba(190,210,235,0.065)",
    fogC: "rgba(100,145,195,0.06)",
    accent: "#9eb8d8",
    particle: "rgba(155,190,225,0.36)",
    orb: "rgba(130,165,210,0.065)",
  },
  fnb: {
    fogA: "rgba(210,155,105,0.09)",
    fogB: "rgba(255,225,190,0.055)",
    fogC: "rgba(195,130,85,0.055)",
    accent: "#d4a574",
    particle: "rgba(220,175,125,0.34)",
    orb: "rgba(210,155,105,0.058)",
  },
  personal: {
    fogA: "rgba(175,168,215,0.075)",
    fogB: "rgba(235,232,250,0.055)",
    fogC: "rgba(155,148,195,0.05)",
    accent: "#b8b0d4",
    particle: "rgba(190,185,225,0.32)",
    orb: "rgba(175,168,215,0.055)",
  },
  custom: {
    fogA: "rgba(185,175,160,0.07)",
    fogB: "rgba(175,195,215,0.055)",
    fogC: "rgba(197,180,160,0.055)",
    accent: "#c5b89a",
    particle: "rgba(190,195,205,0.3)",
    orb: "rgba(185,185,195,0.052)",
  },
}

export type SpecializedAgent = {
  id: SpecializedAgentId
  name: string
  nameKo: string
  focus: string
  roadmapTitle: string
  roadmapLines: string[]
}

export const SPECIALIZED_AGENTS: SpecializedAgent[] = [
  {
    id: "cosmetic",
    name: "Cosmetic Agent",
    nameKo: "코스메틱",
    focus: "감성 서사 및 텍스처 특화",
    roadmapTitle: "감각적 정밀 — 재질·루틴·광채의 서사",
    roadmapLines: [
      "성분 스토리와 질감 언어를 한 흐름으로 묶어, ‘덜어냄의 미학’까지 시각화합니다.",
      "채널별 톤을 맞춘 카피·상세·숏폼 시나리오를 동시에 설계합니다.",
    ],
  },
  {
    id: "fashion",
    name: "Fashion Agent",
    nameKo: "패션",
    focus: "페르소나 및 실루엣 설계 특화",
    roadmapTitle: "에디토리얼 리듬 — 컷·시즌·아카이브",
    roadmapLines: [
      "브랜드 페르소나와 실루엣 키워드를 한 축으로 압축해 룩북형 서사를 만듭니다.",
      "드롭·캠페인·채널별 톤을 분리해 ‘한 시즌의 선언’처럼 읽히게 합니다.",
    ],
  },
  {
    id: "tech",
    name: "Tech Agent",
    nameKo: "테크",
    focus: "혁신성 및 데이터 신뢰성 특화",
    roadmapTitle: "신뢰 우선 — 수치·보안·통합 시나리오",
    roadmapLines: [
      "기능은 벡터로, 이점은 사용 시나리오로 번역해 B2B·Saa스 톤을 유지합니다.",
      "가용성·보안·API 스토리를 증거 블록으로 쌓아 ‘과장 없는 프리미엄’을 만듭니다.",
    ],
  },
  {
    id: "fnb",
    name: "F&B Agent",
    nameKo: "F&B",
    focus: "미각적 자극 및 경험 설계 특화",
    roadmapTitle: "경험 설계 — 맛·온도·장소의 기억",
    roadmapLines: [
      "미각·향·질감을 문장 리듬으로 옮기고, 매장·배달·팝업까지 터치포인트를 맞춥니다.",
      "메뉴 스토리와 브랜드 철학을 한 접시처럼 단순하게 겹칩니다.",
    ],
  },
  {
    id: "personal",
    name: "Personal Agent",
    nameKo: "퍼스널",
    focus: "권위 구축 및 퍼스널 서사 특화",
    roadmapTitle: "권위의 얇은 층 — 이력·철학·톤",
    roadmapLines: [
      "전문가·크리에이터·1인 브랜드의 ‘말하는 방식’을 고정해 신뢰의 밀도를 높입니다.",
      "강연·콘텐츠·프로필까지 한 사람의 서사가 끊기지 않게 이어 줍니다.",
    ],
  },
  {
    id: "custom",
    name: "Custom Engine",
    nameKo: "커스텀",
    focus: "산업 융합 및 온디맨드 솔루션",
    roadmapTitle: "융합 엔진 — 온디맨드 모듈 조합",
    roadmapLines: [
      "복수 산업의 톤과 레이아웃 DNA를 브리지해, 하이브리드 포지션을 즉시 조합합니다.",
      "요청에 따라 에이전트 스택을 재배치해 맞춤 파이프라인을 가동합니다.",
    ],
  },
]
