import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'

type Tenant = Database['public']['Tables']['tenants']['Row']

export interface TenantTheme {
  id: string
  slug: string
  name: string
  logoUrl?: string
  brandColor?: string
  fontFamily?: string
}

export function parseTenantFromHost(host?: string): string | null {
  if (!host) return null
  
  // Remove port if present
  const hostname = host.split(':')[0]
  
  // Check if subdomain exists
  const parts = hostname.split('.')
  if (parts.length >= 3) {
    // Extract subdomain (first part)
    const subdomain = parts[0]
    // Ignore www subdomain
    if (subdomain !== 'www') {
      return subdomain
    }
  }
  
  return null
}

export function parseTenantFromPath(pathname: string): string | null {
  // Check for /t/{slug} pattern
  const match = pathname.match(/^\/t\/([a-z0-9-]+)/)
  return match ? match[1] : null
}

export async function getTenant(slugOrHost: string): Promise<TenantTheme | null> {
  try {
    // Try to find tenant by slug
    const { data: tenantBySlug, error: slugError } = await supabase
      .from('tenants')
      .select('*')
      .eq('slug', slugOrHost)
      .single()
    
    if (tenantBySlug && !slugError) {
      return {
        id: tenantBySlug.id,
        slug: tenantBySlug.slug,
        name: tenantBySlug.name,
        logoUrl: tenantBySlug.logo_url || undefined,
        brandColor: tenantBySlug.brand_color || undefined,
        fontFamily: tenantBySlug.font_family || undefined,
      }
    }
    
    // Try to find tenant by domain
    const { data: tenantByDomain, error: domainError } = await supabase
      .from('tenants')
      .select('*')
      .eq('domain', slugOrHost)
      .single()
    
    if (tenantByDomain && !domainError) {
      return {
        id: tenantByDomain.id,
        slug: tenantByDomain.slug,
        name: tenantByDomain.name,
        logoUrl: tenantByDomain.logo_url || undefined,
        brandColor: tenantByDomain.brand_color || undefined,
        fontFamily: tenantByDomain.font_family || undefined,
      }
    }
    
    return null
  } catch (error) {
    console.error('Error fetching tenant:', error)
    return null
  }
}

export function extractTenantFromRequest(request: Request): string | null {
  const url = new URL(request.url)
  const host = request.headers.get('host')
  
  // First, check subdomain
  const subdomainTenant = parseTenantFromHost(host || undefined)
  if (subdomainTenant) {
    return subdomainTenant
  }
  
  // Then, check path
  const pathTenant = parseTenantFromPath(url.pathname)
  if (pathTenant) {
    return pathTenant
  }
  
  return null
}