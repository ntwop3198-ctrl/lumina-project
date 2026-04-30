import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CtaTone = "primary" | "secondary" | "ghost"

type CtaButtonProps = ButtonProps & {
  tone?: CtaTone
}

const toneMap: Record<CtaTone, string> = {
  primary:
    "bg-rose-gold hover:bg-rose-gold-dark text-cream font-semibold shadow-md hover:shadow-lg",
  secondary:
    "bg-sand-beige hover:bg-rose-gold/10 text-charcoal border border-rose-gold/20 hover:border-rose-gold/40",
  ghost:
    "text-charcoal hover:text-rose-gold hover:bg-rose-gold/5",
}

export function CtaButton({
  tone = "primary",
  className,
  ...props
}: CtaButtonProps) {
  return (
    <Button
      className={cn("rounded-full transition-all duration-300", toneMap[tone], className)}
      {...props}
    />
  )
}
