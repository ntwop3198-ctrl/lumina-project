"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (signInError) {
        setError(signInError.message || "로그인에 실패했습니다.")
        setLoading(false)
        return
      }
      router.push("/dashboard")
      router.refresh()
    } catch (err) {
      void err
      setError("로그인 요청 중 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-14 text-[#f5f0e6]">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(14,25,43,0.85),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_100%,rgba(201,162,39,0.06),transparent_50%)]"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-2xl border border-[#c9a227]/25 bg-[#0f1419]/90 p-8 shadow-[inset_0_1px_0_rgba(201,162,39,0.12),0_24px_48px_rgba(0,0,0,0.45)] backdrop-blur-sm">
          <p className="text-center text-[10px] font-medium uppercase tracking-[0.35em] text-[#c9a227]/85">
            LUMINA
          </p>
          <h1 className="mt-2 text-center font-serif text-2xl tracking-tight text-white">로그인</h1>
          <p className="mt-2 text-center text-sm text-white/50">
            이메일과 비밀번호로 계정에 로그인하세요.
          </p>

          <form onSubmit={onSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="login-email" className="mb-1.5 block text-xs font-medium text-white/70">
                이메일
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-[#c9a227]/45 focus:ring-2 focus:ring-[#c9a227]/15"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="mb-1.5 block text-xs font-medium text-white/70">
                비밀번호
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-white/12 bg-black/35 px-4 py-3 text-sm text-white outline-none transition focus:border-[#c9a227]/45 focus:ring-2 focus:ring-[#c9a227]/15"
                placeholder="••••••••"
              />
            </div>

            {error ? (
              <p className="rounded-lg border border-red-500/25 bg-red-500/10 px-3 py-2 text-center text-xs text-red-200">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-gradient-to-r from-[#c9a227] to-[#a88b4a] py-3 text-sm font-semibold text-[#0a0a0a] shadow-lg shadow-black/30 transition hover:brightness-105 disabled:opacity-60"
            >
              {loading ? "로그인 중…" : "로그인"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/45">
            계정이 없으신가요?{" "}
            <Link href="/auth/signup" className="font-medium text-[#c9a227] hover:text-[#d4af37]">
              회원가입
            </Link>
          </p>

          <p className="mt-6 text-center text-xs text-white/35">
            <Link href="/" className="transition hover:text-[#c9a227]/90">
              ← 랜딩으로
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
