"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { UserProfile, UserRole } from '@/lib/auth-dev'

interface AuthContextType {
  user: UserProfile | null
  role: UserRole | null
  isAuthenticated: boolean
  login: (role: UserRole) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('dev-user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = (role: UserRole) => {
    const mockUsers = {
      admin: {
        id: 'dev-admin-1',
        email: 'admin@inflnce.io',
        role: 'admin' as UserRole,
        full_name: 'Development Admin',
        is_active: true,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z'
      },
      reseller: {
        id: 'dev-reseller-1',
        email: 'reseller@inflnce.io',
        role: 'reseller' as UserRole,
        tenant_id: 'tenant-1',
        full_name: 'Development Reseller',
        is_active: true,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z'
      },
      client: {
        id: 'dev-client-1',
        email: 'client@inflnce.io',
        role: 'client' as UserRole,
        tenant_id: 'tenant-1',
        full_name: 'Development Client',
        is_active: true,
        created_at: '2024-01-01T00:00:00.000Z',
        updated_at: '2024-01-01T00:00:00.000Z'
      }
    }

    const userProfile = mockUsers[role]
    setUser(userProfile)
    localStorage.setItem('dev-user', JSON.stringify(userProfile))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('dev-user')
  }

  const value = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}