import { Suspense } from 'react'
import { AdminLoginForm } from './login-form'

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-sm text-white/60">
          로딩…
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  )
}
