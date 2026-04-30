import type { Metadata } from "next"
import { PartnerGuideView } from "@/components/landing/midnight/partner-guide-view"

export const metadata: Metadata = {
  title: "Genesis 파트너 가이드 · LUMINA",
  description:
    "베타 파트너를 위한 확신의 계약. 求의 세 계율, 먹장구름에서 아침 햇살까지의 여정, 그리고 루미나가 약속하는 특권을 안내합니다.",
  openGraph: {
    title: "LUMINA — Genesis Partner Covenant",
    description:
      "The first narrative for partners: three principles, the journey from storm to light, exclusive beta benefits.",
  },
}

export default function PartnerGuidePage() {
  return <PartnerGuideView />
}
