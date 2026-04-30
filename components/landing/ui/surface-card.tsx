import { cn } from "@/lib/utils"
import { LANDING_MOTION, LANDING_SURFACE } from "@/lib/design/tokens"

type SurfaceCardProps = {
  children: React.ReactNode
  tone?: "soft" | "strong" | "glass" | "panel"
  hover?: boolean
  className?: string
}

const toneMap = {
  soft: LANDING_SURFACE.cardSoft,
  strong: LANDING_SURFACE.cardStrong,
  glass: LANDING_SURFACE.cardGlass,
  panel: LANDING_SURFACE.panelSoft,
} as const

export function SurfaceCard({
  children,
  tone = "soft",
  hover = false,
  className,
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "relative",
        toneMap[tone],
        hover ? LANDING_SURFACE.cardSoftHover : "",
        hover ? LANDING_MOTION.fast : "",
        className
      )}
    >
      {children}
    </div>
  )
}
