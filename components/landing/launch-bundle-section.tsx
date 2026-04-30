"use client"

import Link from "next/link"
import { Film, Heart, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

/** 런칭 패키지: 릴스 9:16 에셋 + 감성 결제 완료 페이지 — 인디 브랜드 기본 포함 */
export function LaunchBundleSection() {
  return (
    <section
      id="launch-bundle"
      className="relative py-24 lg:py-32 overflow-hidden bg-[#0c0a09] text-cream"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[min(100%,1200px)] h-px bg-gradient-to-r from-transparent via-[#c9a227]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[#c9a227] text-xs tracking-[0.4em] uppercase mb-4">Launch Package</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white/95 leading-tight mb-4">
            상세페이지를 넘어,
            <br />
            <span className="italic text-gradient-gold">바이럴까지 한 번에</span>
          </h2>
          <p className="text-white/55 text-sm sm:text-base leading-relaxed">
            모든 플랜에 런칭 패키지가 기본 포함됩니다. 인디 창업자가 첫 주문부터 감각적인 경험을 선사할 수 있도록 설계했습니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-stretch">
          {/* 9:16 Reels */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 text-[#c9a227] mb-6">
              <Film className="w-5 h-5" />
              <span className="text-xs tracking-[0.25em] uppercase">Instagram Reels</span>
            </div>
            <p className="font-serif text-xl text-white/90 mb-2">9:16 비주얼 에셋</p>
            <p className="text-sm text-white/50 mb-8 leading-relaxed">
              제품 히어로 컷·텍스트 안전 영역·모션 가이드가 포함된 세로 프레임 템플릿. 알고리즘에 맞춘 여백과 타이포 스케일로 바로 업로드할 수 있습니다.
            </p>
            <div className="flex justify-center">
              <div className="relative w-[min(100%,220px)] aspect-[9/16] rounded-2xl overflow-hidden border border-[#c9a227]/25 shadow-[0_24px_80px_rgba(0,0,0,0.55)] bg-gradient-to-b from-[#1a1510] to-black">
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/15 via-transparent to-sky-500/10" />
                <div className="absolute top-8 left-0 right-0 text-center px-4">
                  <p className="text-[9px] tracking-[0.35em] text-white/40 uppercase">Lumina</p>
                  <p className="mt-3 font-serif text-lg text-white/90 leading-snug">Your line,
                    <br />
                    in one reel.
                  </p>
                </div>
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-16 h-24 rounded-lg bg-gradient-to-b from-cream/20 to-cream/5 border border-white/10" />
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="w-1 h-1 rounded-full bg-white/30" />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment success */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-sm flex flex-col"
          >
            <div className="flex items-center gap-2 text-[#c9a227] mb-6">
              <Heart className="w-5 h-5" />
              <span className="text-xs tracking-[0.25em] uppercase">Post-purchase</span>
            </div>
            <p className="font-serif text-xl text-white/90 mb-2">감성 결제 완료 페이지</p>
            <p className="text-sm text-white/50 mb-8 leading-relaxed flex-1">
              결제 직후 고객이 마주하는 화면까지 브랜드 톤으로 통일합니다. 감사 카피·다음 액션·보석함 같은 비주얼 리워드로 재방문을 남깁니다.
            </p>
            <Link
              href="/checkout/success"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#c9a227]/40 bg-[#c9a227]/10 px-6 py-3 text-sm text-[#f5e6c8] hover:bg-[#c9a227]/20 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              완료 페이지 미리보기
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
