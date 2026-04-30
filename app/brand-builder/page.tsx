import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { BrandBuilderPage } from "@/components/landing/brand-builder-page"

export const metadata = {
  title: "브랜드 빌더 · LUMINA",
  description:
    "AI 기반 사이트 제작 및 관리. 루미나 브랜드 DNA와 연동된 랜딩·상세 페이지 구성과 운영 인사이트.",
}

export default function BrandBuilderRoute() {
  return (
    <main className="min-h-screen bg-[#0a0908] text-foreground">
      <Header />
      <BrandBuilderPage />
      <Footer />
    </main>
  )
}
