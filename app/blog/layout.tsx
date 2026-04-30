import type { ReactNode } from "react"

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#0a1628] text-[#e8eef6]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_120%_85%_at_50%_0%,#1a5080_0%,#112240_38%,#0e192b_88%)]" aria-hidden />
      <div className="relative z-[1]">{children}</div>
    </div>
  )
}
