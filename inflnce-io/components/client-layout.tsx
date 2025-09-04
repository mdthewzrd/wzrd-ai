"use client"

import { AuthProvider } from '@/contexts/auth-context'
import { AuthHeader } from '@/components/auth-header'
import { ReactNode } from 'react'

export function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-black text-white">
        <AuthHeader />
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t border-gray-800 bg-black py-8">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>© 2024 inflnce. Professional social media marketing platform.</p>
          </div>
        </footer>
      </div>
    </AuthProvider>
  )
}