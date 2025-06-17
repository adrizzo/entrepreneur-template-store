import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create mock client for development when Supabase is not configured
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createMockClient = (): any => {
  const mockQuery = {
    select: function() { return Promise.resolve({ data: [], error: null, count: 0 }) },
    insert: function() { return Promise.resolve({ data: null, error: null }) },
    update: function() { return Promise.resolve({ data: null, error: null }) },
    delete: function() { return Promise.resolve({ data: null, error: null }) },
    eq: function() { return Promise.resolve({ data: null, error: null }) },
    single: function() { return Promise.resolve({ data: null, error: null }) },
    limit: function() { return Promise.resolve({ data: [], error: null, count: 0 }) },
    order: function() { return Promise.resolve({ data: [], error: null, count: 0 }) },
  }
  
  return {
    from: () => mockQuery,
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signUp: () => Promise.resolve({ data: null, error: null }),
      signIn: () => Promise.resolve({ data: null, error: null }),
    }
  }
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createMockClient()

export const supabaseAdmin = (supabaseUrl && serviceRoleKey)
  ? createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : createMockClient()

// Database types for TypeScript
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string | null
          image: string | null
          role: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name?: string | null
          image?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string | null
          image?: string | null
          role?: string
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          images: string[]
          category: string
          tags: string[]
          is_active: boolean
          stripe_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          images?: string[]
          category: string
          tags?: string[]
          is_active?: boolean
          stripe_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          images?: string[]
          category?: string
          tags?: string[]
          is_active?: boolean
          stripe_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          stripe_session_id: string | null
          status: string
          total: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          stripe_session_id?: string | null
          status?: string
          total: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          stripe_session_id?: string | null
          status?: string
          total?: number
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
        }
      }
      site_config: {
        Row: {
          id: string
          site_name: string
          description: string
          logo: string
          primary_color: string
          accent_color: string
          font_family: string
          email: string | null
          phone: string | null
          address: string | null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          social_links: any | null
          meta_title: string | null
          meta_description: string | null
          allow_registration: boolean
          require_approval: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          site_name?: string
          description?: string
          logo?: string
          primary_color?: string
          accent_color?: string
          font_family?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          social_links?: any | null
          meta_title?: string | null
          meta_description?: string | null
          allow_registration?: boolean
          require_approval?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          site_name?: string
          description?: string
          logo?: string
          primary_color?: string
          accent_color?: string
          font_family?: string
          email?: string | null
          phone?: string | null
          address?: string | null
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          social_links?: any | null
          meta_title?: string | null
          meta_description?: string | null
          allow_registration?: boolean
          require_approval?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
} 