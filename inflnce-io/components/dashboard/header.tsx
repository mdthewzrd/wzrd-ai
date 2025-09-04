"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Bell,
  Search,
  Settings,
  User,
  LogOut,
  Menu,
  HelpCircle,
  Moon,
  Sun,
  Globe,
  Crown,
  Briefcase
} from 'lucide-react'
import { UserProfile } from '@/lib/auth'
import { cn } from '@/lib/utils'

interface DashboardHeaderProps {
  user: UserProfile
}

export default function DashboardHeader({ user }: DashboardHeaderProps) {
  const [notifications] = useState([
    {
      id: '1',
      title: 'New service request',
      description: 'Instagram management package requested',
      time: '5m ago',
      unread: true
    },
    {
      id: '2',
      title: 'Payment processed',
      description: 'Monthly subscription payment received',
      time: '1h ago',
      unread: true
    },
    {
      id: '3',
      title: 'System maintenance',
      description: 'Scheduled maintenance completed',
      time: '2h ago',
      unread: false
    }
  ])

  const unreadCount = notifications.filter(n => n.unread).length

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-3 w-3 text-yellow-500" />
      case 'reseller':
        return <Briefcase className="h-3 w-3 text-blue-500" />
      default:
        return <User className="h-3 w-3 text-green-500" />
    }
  }

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500"
      case 'reseller':
        return "bg-blue-500/10 text-blue-500 border-blue-500"
      case 'client':
        return "bg-green-500/10 text-green-500 border-green-500"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500"
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-gray-800 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Mobile menu button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="lg:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-gray-900 border-gray-800">
            {/* Mobile sidebar content would go here */}
            <div className="p-4">
              <h2 className="text-lg font-semibold">Navigation</h2>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo - visible on mobile */}
        <div className="lg:hidden ml-4">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">i</span>
            </div>
            <span className="text-lg font-bold text-green-500">inflnce</span>
          </Link>
        </div>

        {/* Search */}
        <div className="flex-1 flex justify-center max-w-md mx-auto lg:mx-8">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full bg-gray-800 border-gray-700 pl-8 text-center"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 lg:space-x-4">
          {/* Theme toggle */}
          <Button variant="ghost" size="sm" className="hidden sm:flex">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-4 w-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500 text-white border-0">
                    {unreadCount}
                  </Badge>
                )}
                <span className="sr-only">View notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-gray-900 border-gray-800">
              <DropdownMenuLabel className="flex items-center justify-between">
                Notifications
                <Badge variant="secondary" className="text-xs">
                  {unreadCount} new
                </Badge>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              {notifications.slice(0, 3).map((notification) => (
                <DropdownMenuItem 
                  key={notification.id} 
                  className="flex flex-col items-start p-4 space-y-1 focus:bg-gray-800"
                >
                  <div className="flex w-full items-start justify-between">
                    <div className="font-medium">{notification.title}</div>
                    <div className="text-xs text-gray-400">{notification.time}</div>
                  </div>
                  <div className="text-sm text-gray-400">{notification.description}</div>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1" />
                  )}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem asChild>
                <Link href="/notifications" className="w-full text-center">
                  View all notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} alt={user.full_name || user.email} />
                  <AvatarFallback>
                    {user.full_name?.split(' ').map(n => n[0]).join('').toUpperCase() || user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-gray-900 border-gray-800" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm font-medium leading-none">
                      {user.full_name || 'User'}
                    </p>
                    <Badge className={cn("text-xs", getRoleBadge(user.role))}>
                      <div className="flex items-center space-x-1">
                        {getRoleIcon(user.role)}
                        <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                      </div>
                    </Badge>
                  </div>
                  <p className="text-xs leading-none text-gray-400">
                    {user.email}
                  </p>
                  {user.tenant && (
                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                      <Globe className="h-3 w-3" />
                      <span>{user.tenant.name}</span>
                    </div>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/help" className="cursor-pointer">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="text-red-400 focus:text-red-300" asChild>
                <Link href="/api/auth/signout" className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}