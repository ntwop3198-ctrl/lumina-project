import { Sparkles } from "lucide-react"
import { LANDING_ICON } from "@/lib/design/tokens"
import { cn } from "@/lib/utils"

type BrandLogoProps = {
  href?: string
  className?: string
  /** 헤더(밝은 배경)는 기본, 푸터(어두운 배경)는 onDark */
  theme?: "default" | "onDark"
}

export function BrandLogo({ href = "#", className, theme = "default" }: BrandLogoProps) {
  const textClass = theme === "onDark" ? "text-cream" : "text-charcoal"
  return (
    <a href={href} className={cn("flex items-center gap-2.5", className)}>
      <div className="w-10 h-10 rounded-full bg-rose-gold flex items-center justify-center shadow-sm shrink-0">
        <Sparkles className={LANDING_ICON.logo} />
      </div>
      <span className={cn("font-serif text-2xl font-semibold", textClass)}>LUMINA</span>
    </a>
  )
}
