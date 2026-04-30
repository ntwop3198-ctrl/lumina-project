import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { LuminaServicePlans } from "@/components/landing/lumina-service-plans"

export const metadata = {
  title: "서비스 플랜 · LUMINA",
  description:
    "Insight Free는 핵심 이슈를 요약 진단하고, Lumina Premium은 상세·영상 산출 구조로 확장합니다. 플랜별 범위를 확인하세요.",
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-cream text-foreground">
      <Header />

      <section className="border-b border-charcoal/5 bg-cream pb-20 pt-40 lg:pb-28 lg:pt-44">
        <LuminaServicePlans />
      </section>

      <Footer />
    </main>
  )
}
