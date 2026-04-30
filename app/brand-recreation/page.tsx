import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { BrandRecreationPage } from "@/components/landing/brand-recreation-page"

export const metadata = {
  title: "가치 재창조 · LUMINA",
  description:
    "분석 결과 기반 브랜드 가치 AI 재설계. 루미나 브랜드 제네시스의 재창조 단계입니다.",
}

export default function BrandRecreationRoute() {
  return (
    <main className="min-h-screen bg-[#0a0908] text-foreground">
      <Header />
      <BrandRecreationPage />
      <Footer />
    </main>
  )
}
