"use client"

import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { AuthLink } from '@/components/auth-link'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Settings, LogOut } from "lucide-react"
import { useRouter } from 'next/navigation'

export function AuthHeader() {
  const { isAuthenticated, user, role, logout } = useAuth()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getDashboardLink = () => {
    if (role === 'admin') return '/admin'
    if (role === 'reseller') return '/reseller'
    if (role === 'client') return '/client'
    return '/login'
  }

  const getRoleColor = () => {
    if (role === 'admin') return 'text-purple-400'
    if (role === 'reseller') return 'text-blue-400'
    if (role === 'client') return 'text-green-400'
    return 'text-gray-400'
  }

  return (
    <header className="border-b border-gray-800 bg-black">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-green-500">
          inflnce
        </Link>
        
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-green-400 transition-colors">
            Home
          </Link>
          <AuthLink href="/social-media" className="hover:text-green-400 transition-colors">
            Social Media
          </AuthLink>
          <AuthLink href="/tools" className="hover:text-green-400 transition-colors">
            Tools
          </AuthLink>
          <AuthLink href="/publications" className="hover:text-green-400 transition-colors">
            Publications
          </AuthLink>
          {isAuthenticated && (
            <Link href={getDashboardLink()} className="hover:text-green-400 transition-colors">
              Dashboard
            </Link>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-600 text-white">
                      {user?.full_name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-medium">{user?.full_name}</span>
                    <span className={`text-xs ${getRoleColor()}`}>
                      {role?.toUpperCase()}
                    </span>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-gray-900 border-gray-700">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={getDashboardLink()} className="flex items-center">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline">
              <Link href="/login">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}