"use client"

import { useAuth } from '@/contexts/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: 'admin' | 'reseller' | 'client'
  redirectTo?: string
}

export function ProtectedRoute({ 
  children, 
  requiredRole,
  redirectTo = '/login'
}: ProtectedRouteProps) {
  const { isAuthenticated, role, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      const redirectUrl = `${redirectTo}?redirectTo=${encodeURIComponent(pathname)}`
      router.push(redirectUrl)
      return
    }

    if (!isLoading && isAuthenticated && requiredRole && role !== requiredRole) {
      // Redirect to appropriate dashboard based on user role
      const dashboardRoutes = {
        admin: '/admin',
        reseller: '/reseller', 
        client: '/client'
      }
      router.push(dashboardRoutes[role as keyof typeof dashboardRoutes] || '/login')
      return
    }
  }, [isAuthenticated, role, isLoading, router, pathname, requiredRole, redirectTo])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-green-500" />
          <span>Loading...</span>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect via useEffect
  }

  if (requiredRole && role !== requiredRole) {
    return null // Will redirect via useEffect
  }

  return <>{children}</>
}