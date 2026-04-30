import { Header } from "@/components/landing/header"
import { Footer } from "@/components/landing/footer"
import { MarketingAgentPage } from "@/components/landing/marketing-agent-page"

export const metadata = {
  title: "마케팅 에이전트 · LUMINA",
  description:
    "맞춤형 마케팅 전략 및 실행안. 분석·제작 이후 캠페인·채널 제안까지 루미나 전체 여정을 완성합니다.",
}

export default function MarketingAgentRoute() {
  return (
    <main className="min-h-screen bg-[#0a0908] text-foreground">
      <Header />
      <MarketingAgentPage />
      <Footer />
    </main>
  )
}
