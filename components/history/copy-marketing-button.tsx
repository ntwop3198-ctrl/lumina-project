"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { CtaButton } from "@/components/landing/ui/cta-button"

type CopyMarketingButtonProps = {
  text: string
}

export function CopyMarketingButton({ text }: CopyMarketingButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <CtaButton
      type="button"
      tone="secondary"
      className="inline-flex items-center gap-2 px-4 py-2 text-sm"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          복사되었습니다
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          마케팅 카피 복사하기
        </>
      )}
    </CtaButton>
  )
}

