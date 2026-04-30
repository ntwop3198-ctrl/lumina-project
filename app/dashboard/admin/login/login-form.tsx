'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function AdminLoginForm() {
  const router = useRouter()
  const [queryString, setQueryString] = useState("")
  const params = useMemo(() => new URLSearchParams(queryString), [queryString])
  const from = params.get('from') || '/dashboard/admin'
  const reason = params.get('reason')

  useEffect(() => {
    // Keep URL parsing client-only to avoid null search-param edge cases.
    const update = () => setQueryString(window.location.search ?? "")
    update()
    window.addEventListener("popstate", update)
    return () => window.removeEventListener("popstate", update)
  }, [])

  const [secret, setSecret] = useState('')
  const [err, setErr] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr(null)
    setLoading(true)
    try {
      const res = await fetch('/api/admin/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret }),
      })
      if (!res.ok) {
        setErr('비밀번호가 올바르지 않거나 서버 설정이 없습니다.')
        setLoading(false)
        return
      }
      router.push(from.startsWith('/') ? from : '/dashboard/admin')
      router.refresh()
    } catch {
      setErr('로그인 요청에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-4 text-cream">
      <div className="w-full max-w-md rounded-2xl border border-[#c9a227]/25 bg-black/60 p-8 shadow-[inset_0_1px_0_rgba(201,162,39,0.1)]">
        <p className="text-center text-[10px] font-medium uppercase tracking-[0.35em] text-[#c9a227]/80">
          Lumina Admin
        </p>
        <h1 className="mt-2 text-center font-serif text-xl text-white">API 예산 대시보드</h1>
        <p className="mt-2 text-center text-xs text-white/45">
          LUMINA_ADMIN_SECRET 값을 입력하세요. (서버 환경 변수와 동일)
        </p>
        {reason === 'missing_secret' ? (
          <p className="mt-3 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-center text-xs text-amber-100">
            서버에 LUMINA_ADMIN_SECRET 이 설정되어 있지 않습니다.
          </p>
        ) : null}

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="sr-only">Admin secret</span>
            <input
              type="password"
              autoComplete="current-password"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white outline-none ring-[#c9a227]/0 transition focus:border-[#c9a227]/50 focus:ring-2 focus:ring-[#c9a227]/20"
              placeholder="Admin secret"
              required
            />
          </label>
          {err ? <p className="text-center text-xs text-red-400">{err}</p> : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-gradient-to-r from-[#c9a227] to-[#a88b4a] py-3 text-sm font-semibold text-black disabled:opacity-60"
          >
            {loading ? '확인 중…' : '입장'}
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-white/35">
          <Link href="/" className="hover:text-[#c9a227]/90">
            ← 랜딩으로
          </Link>
        </p>
      </div>
    </main>
  )
}
