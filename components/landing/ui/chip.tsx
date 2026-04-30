import { cn } from "@/lib/utils"

type ChipTone = "soft" | "brand" | "muted"
type ChipSize = "sm" | "md"

type ChipProps = {
  children: React.ReactNode
  tone?: ChipTone
  size?: ChipSize
  className?: string
}

const toneMap: Record<ChipTone, string> = {
  soft: "bg-cream text-rose-gold border border-rose-gold/15",
  brand: "bg-rose-gold text-cream border border-rose-gold/30 shadow-md",
  muted: "bg-sand-beige/90 text-warm-gray border border-rose-gold/15",
}

const sizeMap: Record<ChipSize, string> = {
  sm: "px-3 py-1 text-xs font-medium rounded-full",
  md: "px-4 py-1.5 text-sm font-medium rounded-full",
}

export function Chip({
  children,
  tone = "soft",
  size = "sm",
  className,
}: ChipProps) {
  return (
    <span className={cn("inline-flex items-center", toneMap[tone], sizeMap[size], className)}>
      {children}
    </span>
  )
}

type NumberBadgeProps = {
  value: React.ReactNode
  className?: string
}

export function NumberBadge({ value, className }: NumberBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-full border border-rose-gold/20 text-[11px] font-semibold text-rose-gold/80",
        className
      )}
    >
      {value}
    </span>
  )
}
