'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/** 서버 컴포넌트 데이터를 주기적으로 router.refresh()로 갱신 (관리자 예산 위젯) */
export function DashboardBudgetRefresh({ intervalMs = 20_000 }: { intervalMs?: number }) {
  const router = useRouter()
  useEffect(() => {
    const id = window.setInterval(() => {
      router.refresh()
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [router, intervalMs])
  return null
}
