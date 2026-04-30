import Link from "next/link"
import { DetailProofSection } from "@/components/storytelling/detail-proof-section"

const DEMO = `## 제품으로 추정되는 유형
에센스형 앰플

## 패키징 & 무드
에어리스 펌프, 무광 실버 캡.

## 사진에서 읽히는 텍스트
브랜드명 일부 확인.

### 발견 (Discovery)
거울 앞 조명 아래, 처음 펌프를 눌렀을 때 제형이 손바닥에 머무는 짧은 순간이 있습니다. 투명에 가까운 블루가 빛의 각도마다 다른 얼굴을 보여 줍니다.

### 정제 (Refining)
우리는 산소와의 접촉을 끊기 위해 펌프의 각 밀리미터를 다듬었습니다. 내용물이 공기를 만나기 전까지의 경로만큼은, 숫자로 증명하고 싶었습니다.

### 치유 (Healing)
밤이 길어질수록 피부는 더 많은 말을 필요로 합니다. 스며드는 쪽으로, 당김 없이 가라앉는 쪽으로, 하루의 끝을 정리하는 리추얼에 얹어 보세요.

### 약속 (Promise)
우리는 같은 용기를 다시 집어들게 만드는 것을 약속의 기준으로 삼습니다. 한 통이 비워질 때까지, 첫 펌프와 같은 마음으로 머물 수 있게.
`

export default function StorytellingDemoPage() {
  return (
    <main className="min-h-screen bg-cream py-16 px-4">
      <div className="max-w-3xl mx-auto mb-10 text-center">
        <Link href="/" className="text-sm text-rose-gold hover:underline">
          ← 홈
        </Link>
        <h1 className="font-serif text-3xl text-charcoal mt-6 mb-2">
          서사 · Fact Check · 임상 카드
        </h1>
        <p className="text-charcoal/60 text-sm">
          4단계 서사 → 브릿지 전환 → 임상 입력·루미나 배지까지 한 흐름 데모입니다.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <DetailProofSection markdown={DEMO} productImageUrl="/placeholder.svg" />
      </div>
    </main>
  )
}
