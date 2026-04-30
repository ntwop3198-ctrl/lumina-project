import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "LUMINA Knowledge Engine — 상세기획서",
  description:
    "최소 입력으로 루미나 5단계(결핍·존재·가치·약속·소통) 구조의 상세기획서 초안을 생성합니다.",
}

export default function KnowledgeEnginePlanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
