import { BrandGenesisPage } from "@/components/landing/brand-genesis-page"
import { GlobalHeaderBilingual } from "@/components/landing/global-header-bilingual"
import { MidnightFooterCta } from "@/components/landing/midnight/midnight-footer-cta"

export const metadata = {
  title: "브랜드 제네시스 · LUMINA",
  description:
    "아이디어를 브랜드로, 0 to 1 설계. 루미나에서 브랜드의 시작점을 정의합니다.",
}

export default function BrandGenesisRoute() {
  return (
    <main className="min-h-screen lumina-midnight-landing text-foreground">
      <GlobalHeaderBilingual variant="midnight" />
      <BrandGenesisPage />
      <MidnightFooterCta />
    </main>
  )
}
