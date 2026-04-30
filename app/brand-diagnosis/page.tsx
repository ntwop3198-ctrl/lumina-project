import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { BrandDiagnosisPage } from "@/components/landing/brand-diagnosis-page"

export const metadata = {
  title: "브랜드 진단 · LUMINA",
  description:
    "기존 브랜드 점수화 및 취약점 분석. 루미나 브랜드 제네시스의 진단 단계입니다.",
}

export default function BrandDiagnosisRoute() {
  return (
    <main className="min-h-screen bg-[#0a0908] text-foreground">
      <Header />
      <BrandDiagnosisPage />
      <Footer />
    </main>
  )
}
