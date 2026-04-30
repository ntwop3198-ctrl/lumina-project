import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Add them to .env.local.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim()
const hasServiceRole =
  serviceRoleKey &&
  serviceRoleKey !== 'your_service_role_key_here'

/** 서버 전용 관리자 클라이언트. SUPABASE_SERVICE_ROLE_KEY 가 없으면 null. */
export const supabaseAdmin: SupabaseClient | null = hasServiceRole
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null