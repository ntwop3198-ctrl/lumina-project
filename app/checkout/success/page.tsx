import Link from "next/link"
import { Heart, Sparkles } from "lucide-react"

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-[#080706] text-[#f5f0e8] relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#c9a227]/[0.07] blur-[100px]" />

      <div className="relative z-10 max-w-md w-full text-center">
        <div className="mx-auto mb-8 w-20 h-20 rounded-2xl border border-[#c9a227]/30 bg-gradient-to-br from-[#c9a227]/20 to-transparent flex items-center justify-center shadow-[0_0_60px_rgba(201,162,39,0.15)]">
          <Heart className="w-9 h-9 text-[#c9a227]" strokeWidth={1.25} />
        </div>
        <p className="text-[11px] tracking-[0.45em] uppercase text-[#c9a227]/80 mb-4">Thank you</p>
        <h1 className="font-serif text-3xl sm:text-4xl leading-snug mb-4">
          당신의 브랜드가
          <br />
          <span className="italic text-[#e8d5a3]">보석함</span>에 안겼어요
        </h1>
        <p className="text-white/50 text-sm leading-relaxed mb-10">
          결제가 완료되었습니다. 루미나가 곧 첫 번째 마스터플랜과 릴스용 9:16 에셋을 같은 톤으로 묶어 드릴게요. 조금만 기다려 주세요.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-left mb-10">
          <div className="flex items-center gap-2 text-[#c9a227] text-xs tracking-[0.2em] uppercase mb-2">
            <Sparkles className="w-4 h-4" />
            Next
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            이메일로 영수증과 함께 온보딩 링크를 보내 드립니다. 대시보드의 <strong className="text-white/90 font-medium">보석함</strong>에서 다른 창업자 사례도 둘러보세요.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-full bg-gradient-gold hover:bg-gradient-gold-hover text-black font-semibold px-8 py-3 text-sm shadow-gold transition-colors"
          >
            보석함 열기
          </Link>
          <Link
            href="/#upload"
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3 text-sm text-white/80 hover:bg-white/5 transition-colors"
          >
            홈으로
          </Link>
        </div>
      </div>
    </main>
  )
}
