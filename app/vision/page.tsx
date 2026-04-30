import type { Metadata } from "next"
import { VisionPageView } from "@/components/landing/midnight/vision-page-view"
import { GlobalHeaderBilingual } from "@/components/landing/global-header-bilingual"
import { MidnightFooterCta } from "@/components/landing/midnight/midnight-footer-cta"

export const metadata: Metadata = {
  title: "비전 · LUMINA",
  description:
    "본질을 비추는 확신. 穩·準·快의 기준, 파트너 상생과 정산 투명성, AI를 조력으로 두는 루미나의 방향을 설명합니다.",
  openGraph: {
    title: "LUMINA — Vision",
    description:
      "Principle, partner symbiosis, and technology as co-pilot — how Lumina translates conviction into the market.",
  },
}

export default function VisionPage() {
  return (
    <main className="min-h-screen lumina-midnight-landing text-foreground">
      <GlobalHeaderBilingual variant="midnight" />
      <VisionPageView />
      <MidnightFooterCta />
    </main>
  )
}
