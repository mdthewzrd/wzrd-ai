import { ReactNode } from 'react'
import { requireAuth } from '@/lib/auth-dev'
import { redirect } from 'next/navigation'
import DashboardSidebar from '@/components/dashboard/sidebar'
import DashboardHeader from '@/components/dashboard/header'

interface DashboardLayoutProps {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  // Require authentication for all dashboard routes
  const { session, profile } = await requireAuth()

  if (!session || !profile) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Dashboard Header */}
      <DashboardHeader user={profile} />
      
      <div className="flex">
        {/* Sidebar */}
        <DashboardSidebar userRole={profile.role} />
        
        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}