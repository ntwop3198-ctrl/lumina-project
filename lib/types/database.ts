export interface Database {
  public: {
    Tables: {
      lumi_balances: {
        Row: {
          id: string
          user_id: string
          balance: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          created_at?: string
          updated_at?: string
        }
      }
      lumi_transactions: {
        Row: {
          id: string
          user_id: string
          transaction_type: 'earn' | 'spend' | 'transfer'
          amount: number
          description: string | null
          reference_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          transaction_type: 'earn' | 'spend' | 'transfer'
          amount: number
          description?: string | null
          reference_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          transaction_type?: 'earn' | 'spend' | 'transfer'
          amount?: number
          description?: string | null
          reference_id?: string | null
          created_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price_lumi: number
          category: string | null
          image_url: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price_lumi: number
          category?: string | null
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price_lumi?: number
          category?: string | null
          image_url?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      lumina_api_usage_events: {
        Row: {
          id: string
          user_key: string
          feature: string
          estimated_cost_usd: number
          meta: Record<string, unknown>
          created_at: string
        }
        Insert: {
          id?: string
          user_key: string
          feature: string
          estimated_cost_usd?: number
          meta?: Record<string, unknown>
          created_at?: string
        }
        Update: {
          id?: string
          user_key?: string
          feature?: string
          estimated_cost_usd?: number
          meta?: Record<string, unknown>
          created_at?: string
        }
      }
      lumina_api_feature_blocks: {
        Row: {
          id: string
          user_key: string
          feature: string
          blocked_until: string
          reason: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_key: string
          feature: string
          blocked_until: string
          reason?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_key?: string
          feature?: string
          blocked_until?: string
          reason?: string | null
          created_at?: string
        }
      }
    }
  }
}

// 유틸리티 타입들
export type LumiBalance = Database['public']['Tables']['lumi_balances']['Row']
export type LumiTransaction = Database['public']['Tables']['lumi_transactions']['Row']
export type Product = Database['public']['Tables']['products']['Row']

export type NewLumiTransaction = Database['public']['Tables']['lumi_transactions']['Insert']
export type NewProduct = Database['public']['Tables']['products']['Insert']