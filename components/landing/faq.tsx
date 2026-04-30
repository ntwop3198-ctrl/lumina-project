"use client"

import { useRef, useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { SectionShell } from "@/components/landing/ui/section-shell"
import { SectionHeader } from "@/components/landing/ui/section-header"
import { SurfaceCard } from "@/components/landing/ui/surface-card"
import { LANDING_ICON, LANDING_LAYOUT, LANDING_MOTION, LANDING_TEXT, LANDING_TYPE } from "@/lib/design/tokens"

const faqItems = [
  {
    q: "업로드한 제품 이미지는 어디에 저장되나요?",
    a: "이미지는 Supabase Storage에 저장되며, 현재 설정한 버킷 정책(RLS)에 따라 접근 권한이 관리됩니다.",
  },
  {
    q: "AI 분석 결과는 어느 정도 시간이 걸리나요?",
    a: "일반적으로 수 초 내에 완료되며, 이미지 크기와 모델 응답 속도에 따라 차이가 있을 수 있습니다.",
  },
  {
    q: "분석 결과를 바로 상세페이지 카피로 써도 되나요?",
    a: "초안으로는 매우 유용하지만, 브랜드 톤과 제품 사실관계는 최종 검수 후 반영하는 것을 권장합니다.",
  },
  {
    q: "루미나는 단순한 디자인 툴인가요?",
    a: "루미나는 화장품 산업의 전문 데이터를 학습한 ‘브랜딩 솔루션’입니다. 제품의 특성을 가장 잘 살리는 상세페이지와 영상을 만들어 매출 상승을 돕습니다.",
  },
]

type FaqProps = {
  id?: string
}

export function Faq({ id }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number>(0)
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

  const toggleItem = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "Escape") {
      setOpenIndex(-1)
      return
    }

    if (event.key === "ArrowDown") {
      event.preventDefault()
      const nextIndex = (index + 1) % faqItems.length
      buttonRefs.current[nextIndex]?.focus()
      return
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      const prevIndex = (index - 1 + faqItems.length) % faqItems.length
      buttonRefs.current[prevIndex]?.focus()
      return
    }

    if (event.key === "Home") {
      event.preventDefault()
      buttonRefs.current[0]?.focus()
      return
    }

    if (event.key === "End") {
      event.preventDefault()
      buttonRefs.current[faqItems.length - 1]?.focus()
    }
  }

  return (
    <SectionShell id={id} backgroundClassName="bg-cream">
      <SectionHeader
        className={LANDING_LAYOUT.headerGap}
        badgeIcon={<HelpCircle className={LANDING_ICON.badge} />}
        badgeText="FAQ"
        title="자주 묻는 질문"
        description="런칭 직전에 가장 많이 물어보는 질문만 빠르게 정리했습니다."
      />

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        {faqItems.map((item, index) => (
          <SurfaceCard key={item.q} tone="soft" hover className="p-0 overflow-hidden">
            <button
              type="button"
              className="w-full px-4 py-4 md:px-6 md:py-5 text-left"
              onClick={() => toggleItem(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
              ref={(el) => {
                buttonRefs.current[index] = el
              }}
              aria-expanded={openIndex === index}
              aria-controls={`faq-answer-${index}`}
            >
              <div className={`flex items-start justify-between ${LANDING_LAYOUT.cardInnerGap}`}>
                <h3 className={`${LANDING_TYPE.faqQuestion} text-[15px] md:text-lg`}>{item.q}</h3>
                <ChevronDown
                  className={`w-4 h-4 ${LANDING_TEXT.brand} ${LANDING_LAYOUT.iconTopGap} shrink-0 ${LANDING_MOTION.fast} ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>
            <div
              id={`faq-answer-${index}`}
              className={`px-4 md:px-6 overflow-hidden ${LANDING_MOTION.fast} ${
                openIndex === index
                  ? "max-h-40 pb-4 md:pb-6 opacity-100"
                  : "max-h-0 pb-0 opacity-0"
              }`}
            >
              <p className={`${LANDING_TYPE.faqAnswer} text-[13px] md:text-sm`}>{item.a}</p>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </SectionShell>
  )
}
