"use client"

import { useState } from "react"
import { Link as LinkIcon, Check } from "lucide-react"
import { CtaButton } from "@/components/landing/ui/cta-button"

type ShareLinkButtonProps = {
  path: string
}

export function ShareLinkButton({ path }: ShareLinkButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      const origin =
        typeof window !== "undefined" && window.location.origin
          ? window.location.origin
          : ""
      const url = `${origin}${path}`
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <CtaButton
      type="button"
      tone="ghost"
      variant="ghost"
      className="inline-flex items-center gap-2 px-3 py-2 text-xs md:text-sm"
      onClick={handleCopy}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          링크 복사 완료
        </>
      ) : (
        <>
          <LinkIcon className="w-4 h-4" />
          공유 링크 복사
        </>
      )}
    </CtaButton>
  )
}

