"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

type ConversionTrustTriggerProps = {
  strongestTrustData: string
}

/**
 * 결제 CTA 주변에서 커서가 배회하면 신뢰 데이터를 부드럽게 띄웁니다.
 */
export function ConversionTrustTrigger({
  strongestTrustData,
}: ConversionTrustTriggerProps) {
  const ctaRef = useRef<HTMLDivElement>(null)
  const [hesitation, setHesitation] = useState(0)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let raf = 0
    let pointer = { x: -9999, y: -9999 }
    let overButton = false

    const onMove = (event: MouseEvent) => {
      pointer = { x: event.clientX, y: event.clientY }
    }

    const loop = () => {
      const el = ctaRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.hypot(pointer.x - centerX, pointer.y - centerY)
        overButton =
          pointer.x >= rect.left &&
          pointer.x <= rect.right &&
          pointer.y >= rect.top &&
          pointer.y <= rect.bottom

        setHesitation((prev) => {
          if (overButton) return 0
          if (distance < 220) return Math.min(prev + 1, 40)
          return Math.max(prev - 2, 0)
        })
      }
      raf = window.requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove)
    raf = window.requestAnimationFrame(loop)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.cancelAnimationFrame(raf)
    }
  }, [])

  useEffect(() => {
    if (hesitation < 12) return
    setVisible(true)
    const t = window.setTimeout(() => setVisible(false), 2800)
    return () => window.clearTimeout(t)
  }, [hesitation])

  return (
    <div className="relative mx-auto mt-14 w-fit" ref={ctaRef}>
      <Button
        asChild
        className="rounded-full h-11 px-7 bg-gradient-to-r from-[#f3dfb8] via-rose-gold to-[#b99655] text-black hover:opacity-95"
      >
        <Link href="/pricing">지금 상세페이지 완성하고 전환 시작하기</Link>
      </Button>

      <AnimatePresence>
        {visible ? (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="absolute left-1/2 -translate-x-1/2 mt-3 min-w-[280px] rounded-xl border border-rose-gold/35 bg-black/85 px-4 py-3 text-left shadow-[0_18px_36px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-start gap-2">
              <ShieldCheck className="h-4 w-4 text-rose-gold mt-0.5" />
              <div>
                <p className="text-[10px] uppercase tracking-[0.18em] text-rose-gold/80 mb-1">
                  Trust data
                </p>
                <p className="text-xs text-cream/90 leading-relaxed">
                  {strongestTrustData}
                </p>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
