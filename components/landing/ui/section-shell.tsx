import { cn } from "@/lib/utils"
import { LANDING_LAYOUT } from "@/lib/design/tokens"

type SectionShellProps = {
  id?: string
  withAnchorOffset?: boolean
  backgroundClassName?: string
  className?: string
  containerClassName?: string
  children: React.ReactNode
}

export function SectionShell({
  id,
  withAnchorOffset = true,
  backgroundClassName,
  className,
  containerClassName,
  children,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        LANDING_LAYOUT.sectionY,
        id && withAnchorOffset ? "scroll-mt-24 md:scroll-mt-28" : "",
        backgroundClassName,
        className
      )}
    >
      <div className={cn(LANDING_LAYOUT.container, containerClassName)}>{children}</div>
    </section>
  )
}
