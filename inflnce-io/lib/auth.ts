import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import type { User } from '@supabase/auth-helpers-nextjs'

export type UserRole = 'admin' | 'reseller' | 'client'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  tenant_id?: string
  full_name?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface TenantInfo {
  id: string
  slug: string
  name: string
  logo_url?: string
  brand_color?: string
  font_family?: string
  stripe_public_key?: string
  domain?: string
}

// Server-side auth helper
export async function getServerAuth() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    if (!session) {
      return { session: null, user: null, profile: null }
    }

    // Get user profile with tenant info
    const { data: profile, error } = await supabase
      .from('users')
      .select(`
        *,
        tenant:tenants(*)
      `)
      .eq('id', session.user.id)
      .single()

    if (error || !profile) {
      console.error('Error fetching user profile:', error)
      return { session, user: session.user, profile: null }
    }

    return {
      session,
      user: session.user,
      profile: profile as UserProfile & { tenant?: TenantInfo }
    }
  } catch (error) {
    console.error('Error in getServerAuth:', error)
    return { session: null, user: null, profile: null }
  }
}

// Client-side auth helper
export function getClientAuth() {
  const supabase = createClientComponentClient()
  return supabase.auth
}

// Role-based route protection
export async function requireAuth(requiredRole?: UserRole) {
  const { session, profile } = await getServerAuth()
  
  if (!session) {
    redirect('/login')
  }
  
  if (!profile) {
    redirect('/login?error=profile_not_found')
  }
  
  if (requiredRole && profile.role !== requiredRole && profile.role !== 'admin') {
    redirect('/unauthorized')
  }
  
  return { session, profile }
}

// Admin-only protection
export async function requireAdmin() {
  return await requireAuth('admin')
}

// Reseller-only protection
export async function requireReseller() {
  const { profile } = await requireAuth()
  
  if (profile.role !== 'reseller' && profile.role !== 'admin') {
    redirect('/unauthorized')
  }
  
  return { profile }
}

// Client-only protection (includes reseller and admin)
export async function requireClient() {
  return await requireAuth('client')
}

// Check if user has access to tenant
export async function requireTenantAccess(tenantId: string) {
  const { profile } = await requireAuth()
  
  // Admin has access to all tenants
  if (profile.role === 'admin') {
    return { profile }
  }
  
  // Other roles must belong to the tenant
  if (profile.tenant_id !== tenantId) {
    redirect('/unauthorized')
  }
  
  return { profile }
}

// Sign in function
export async function signIn(email: string, password: string) {
  const supabase = createClientComponentClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  return { data, error }
}

// Sign up function
export async function signUp(email: string, password: string, role: UserRole = 'client', tenantId?: string) {
  const supabase = createClientComponentClient()
  
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
        tenant_id: tenantId,
      },
    },
  })
  
  return { data, error }
}

// Sign out function
export async function signOut() {
  const supabase = createClientComponentClient()
  
  const { error } = await supabase.auth.signOut()
  
  if (!error) {
    redirect('/login')
  }
  
  return { error }
}

// Update user profile
export async function updateProfile(updates: Partial<UserProfile>) {
  const supabase = createClientComponentClient()
  const { session } = await getServerAuth()
  
  if (!session) {
    throw new Error('Not authenticated')
  }
  
  const { data, error } = await supabase
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', session.user.id)
    .select()
    .single()
  
  return { data, error }
}

// Get user by email (admin only)
export async function getUserByEmail(email: string) {
  const { profile } = await requireAdmin()
  const supabase = createServerComponentClient({ cookies })
  
  const { data, error } = await supabase
    .from('users')
    .select(`
      *,
      tenant:tenants(*)
    `)
    .eq('email', email)
    .single()
  
  return { data, error }
}