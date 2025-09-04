export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tenants: {
        Row: {
          id: string
          slug: string
          name: string
          logo_url: string | null
          brand_color: string | null
          font_family: string | null
          stripe_public_key: string | null
          domain: string | null
        }
        Insert: {
          id?: string
          slug: string
          name: string
          logo_url?: string | null
          brand_color?: string | null
          font_family?: string | null
          stripe_public_key?: string | null
          domain?: string | null
        }
        Update: {
          id?: string
          slug?: string
          name?: string
          logo_url?: string | null
          brand_color?: string | null
          font_family?: string | null
          stripe_public_key?: string | null
          domain?: string | null
        }
      }
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'reseller' | 'client'
          tenant_id: string | null
        }
        Insert: {
          id: string
          email: string
          role: 'admin' | 'reseller' | 'client'
          tenant_id?: string | null
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'reseller' | 'client'
          tenant_id?: string | null
        }
      }
      services: {
        Row: {
          id: string
          tenant_id: string
          name: string
          image_url: string | null
          description: string | null
          price_display: string | null
          stripe_checkout_url: string
          is_active: boolean
        }
        Insert: {
          id?: string
          tenant_id: string
          name: string
          image_url?: string | null
          description?: string | null
          price_display?: string | null
          stripe_checkout_url: string
          is_active?: boolean
        }
        Update: {
          id?: string
          tenant_id?: string
          name?: string
          image_url?: string | null
          description?: string | null
          price_display?: string | null
          stripe_checkout_url?: string
          is_active?: boolean
        }
      }
      orders: {
        Row: {
          id: string
          tenant_id: string
          service_id: string
          email: string
          stripe_session_id: string
          amount: number
          currency: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          tenant_id: string
          service_id: string
          email: string
          stripe_session_id: string
          amount: number
          currency: string
          status: string
          created_at?: string
        }
        Update: {
          id?: string
          tenant_id?: string
          service_id?: string
          email?: string
          stripe_session_id?: string
          amount?: number
          currency?: string
          status?: string
          created_at?: string
        }
      }
    }
    Views: {}
    Functions: {}
    Enums: {}
  }
}