"use client"

import Image, { type ImageProps } from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { useVisualTheme } from "@/hooks/use-visual-theme"

type VisualSynchroImageProps = {
  luxurySrc: ImageProps["src"]
  scienceSrc: ImageProps["src"]
  baseSrc: ImageProps["src"]
  alt: string
  width: number
  height: number
  queryParamKey?: string
  className?: string
}

export function VisualSynchroImage({
  luxurySrc,
  scienceSrc,
  baseSrc,
  alt,
  width,
  height,
  queryParamKey = "q",
  className,
}: VisualSynchroImageProps) {
  const { mode } = useVisualTheme(queryParamKey)

  const currentSrc =
    mode === "luxury" ? luxurySrc : mode === "science" ? scienceSrc : baseSrc

  return (
    <div className={className}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl border border-rose-gold/30 bg-charcoal/90"
        >
          <Image
            src={currentSrc}
            alt={alt}
            width={width}
            height={height}
            priority
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

