"use client"

import Link from "next/link"
import Image from "next/image"
import { Gem, Sparkles, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const BRANDS = [
  {
    name: "오트리브",
    tag: "클린 뷰티",
    metric: "첫 달 전환율 +42%",
    detail: "루미나 감성 키워드 Minimal + 상세 카피로 톤 통일",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "누아르 벨",
    tag: "프래그런스",
    metric: "릴스 조회 120만+",
    detail: "9:16 에셋 패키지로 출시 캠페인 단일 톤 유지",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "루미에르 랩",
    tag: "스킨케어",
    metric: "재구매율 38%",
    detail: "Dreamy 키워드 기반 스토리텔링 + 결제 완료 감성 페이지",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "벨 에 크루",
    tag: "메이크업",
    metric: "카트 이탈 −22%",
    detail: "Bold 톤 SNS 카피 + 숏폼 스크립트 동시 생성",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=900&auto=format&fit=crop",
  },
]

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(() => {
    let mounted = true
    async function loadUser() {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      setUserEmail(data.user?.email ?? null)
      setLoadingUser(false)
    }
    loadUser()
    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-cream">
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
              <Gem className="w-5 h-5 text-black" />
            </div>
            <div>
              <h1 className="font-serif text-xl text-white tracking-wide">보석함</h1>
              <p className="text-xs text-white/45 tracking-[0.2em] uppercase">Lumina · Indie brands</p>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm text-[#c9a227]/90 hover:text-[#c9a227] transition-colors"
          >
            ← 랜딩으로
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
        <div className="mb-8 rounded-2xl border border-[#c9a227]/20 bg-white/[0.03] px-5 py-4">
          <p className="text-[11px] tracking-[0.24em] uppercase text-[#c9a227]/80">Logged in user</p>
          {loadingUser ? (
            <p className="mt-1.5 text-sm text-white/60">사용자 정보를 확인 중입니다…</p>
          ) : userEmail ? (
            <p className="mt-1.5 text-sm text-white/85">{userEmail}</p>
          ) : (
            <p className="mt-1.5 text-sm text-white/65">
              로그인 정보가 없습니다.{" "}
              <Link href="/auth/login" className="text-[#c9a227] hover:text-[#d4af37]">
                로그인하기
              </Link>
            </p>
          )}
        </div>

        <div className="mb-12 max-w-2xl">
          <p className="text-[#c9a227] text-xs tracking-[0.35em] uppercase mb-3">Social proof</p>
          <p className="text-2xl sm:text-3xl font-serif text-white/95 leading-snug">
            루미나가 함께 빚은 브랜드들의
            <span className="italic text-[#c9a227]"> 성장 기록</span>입니다.
          </p>
          <p className="mt-4 text-white/50 text-sm leading-relaxed">
            창업자 한 명 한 명의 제품이 어떻게 ‘보석 같은’ 인상을 남겼는지, 수치와 함께 정리했습니다. 당신의 라인도 다음 사례가 될 수 있어요.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {BRANDS.map((b) => (
            <article
              key={b.name}
              className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-[#c9a227]/25 transition-colors"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={b.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-white/50">{b.tag}</p>
                    <p className="font-serif text-xl text-white">{b.name}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#c9a227] text-xs font-medium shrink-0">
                    <TrendingUp className="w-4 h-4" />
                    {b.metric}
                  </div>
                </div>
              </div>
              <div className="p-5 flex gap-3">
                <Sparkles className="w-5 h-5 text-[#c9a227]/70 shrink-0 mt-0.5" />
                <p className="text-sm text-white/60 leading-relaxed">{b.detail}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  )
}
