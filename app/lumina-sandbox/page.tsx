import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LuminaSandboxPage } from "@/components/landing/lumina-sandbox-page"

export const metadata = {
  title: "루미나 샌드박스 · LUMINA",
  description:
    "가상 창업 시뮬레이션 및 리스크 진단. 디지털 트윈 시장에서 브랜드 아이디어를 시험합니다.",
}

export default function LuminaSandboxRoute() {
  return (
    <main className="min-h-screen bg-[#040303] pb-32 text-foreground md:pb-36">
      <Header />
      <LuminaSandboxPage />
      <Footer />
    </main>
  )
}
