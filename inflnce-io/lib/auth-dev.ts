// Development-only auth that works without Supabase
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

// Mock admin profile for development
const mockAdminProfile: UserProfile = {
  id: 'dev-admin-1',
  email: 'admin@inflnce.io',
  role: 'admin',
  full_name: 'Development Admin',
  is_active: true,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z'
}

// Mock reseller profile for development
const mockResellerProfile: UserProfile = {
  id: 'dev-reseller-1',
  email: 'reseller@inflnce.io',
  role: 'reseller',
  tenant_id: 'tenant-1',
  full_name: 'Development Reseller',
  is_active: true,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z'
}

// Mock client profile for development
const mockClientProfile: UserProfile = {
  id: 'dev-client-1',
  email: 'client@inflnce.io',
  role: 'client',
  tenant_id: 'tenant-1',
  full_name: 'Development Client',
  is_active: true,
  created_at: '2024-01-01T00:00:00.000Z',
  updated_at: '2024-01-01T00:00:00.000Z'
}

// Development auth functions that return mock data
export async function requireAdmin() {
  return { profile: mockAdminProfile }
}

export async function requireReseller() {
  return { profile: mockResellerProfile }
}

export async function requireClient() {
  return { profile: mockClientProfile }
}

export async function getServerAuth() {
  return { 
    session: { user: { id: 'dev-user', email: 'dev@inflnce.io' } }, 
    user: { id: 'dev-user', email: 'dev@inflnce.io' }, 
    profile: mockAdminProfile 
  }
}

export async function requireAuth() {
  return {
    session: { user: { id: 'dev-user', email: 'dev@inflnce.io' } },
    profile: mockAdminProfile
  }
}