import { cn } from "@/lib/utils"
import { LANDING_TYPE } from "@/lib/design/tokens"

type SectionHeaderProps = {
  badgeIcon?: React.ReactNode
  badgeText?: string
  title: React.ReactNode
  description?: React.ReactNode
  className?: string
}

export function SectionHeader({
  badgeIcon,
  badgeText,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center", className)}>
      {badgeText ? (
        <span className={`${LANDING_TYPE.sectionBadge} mb-4`}>
          {badgeIcon}
          {badgeText}
        </span>
      ) : null}
      <h2 className={`${LANDING_TYPE.sectionTitle} mb-4`}>{title}</h2>
      {description ? <p className={LANDING_TYPE.sectionBody}>{description}</p> : null}
    </div>
  )
}
