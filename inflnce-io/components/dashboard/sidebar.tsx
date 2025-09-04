"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { UserRole } from '@/lib/auth'
import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  Settings,
  BarChart,
  Shield,
  Activity,
  CreditCard,
  Mail,
  FileText,
  HelpCircle,
  LogOut,
  Crown,
  Briefcase,
  User,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useState } from 'react'

interface DashboardSidebarProps {
  userRole: UserRole
}

interface NavItem {
  title: string
  href: string
  icon: any
  badge?: string
  children?: NavItem[]
  roles?: UserRole[]
}

const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  
  // Admin only sections
  {
    title: 'Administration',
    href: '/admin',
    icon: Crown,
    roles: ['admin'],
    children: [
      {
        title: 'Overview',
        href: '/admin',
        icon: LayoutDashboard,
        roles: ['admin']
      },
      {
        title: 'Tenant Management',
        href: '/admin/tenants',
        icon: Building2,
        roles: ['admin']
      },
      {
        title: 'User Management',
        href: '/admin/users',
        icon: Users,
        roles: ['admin']
      },
      {
        title: 'Service Management',
        href: '/admin/services',
        icon: Package,
        roles: ['admin']
      },
      {
        title: 'System Settings',
        href: '/admin/settings',
        icon: Settings,
        roles: ['admin']
      },
      {
        title: 'Security Center',
        href: '/admin/security',
        icon: Shield,
        roles: ['admin']
      },
      {
        title: 'Activity Logs',
        href: '/admin/activity',
        icon: Activity,
        roles: ['admin']
      }
    ]
  },

  // Reseller sections
  {
    title: 'Reseller Hub',
    href: '/reseller',
    icon: Briefcase,
    roles: ['admin', 'reseller'],
    children: [
      {
        title: 'Overview',
        href: '/reseller',
        icon: LayoutDashboard,
        roles: ['admin', 'reseller']
      },
      {
        title: 'My Clients',
        href: '/reseller/clients',
        icon: Users,
        roles: ['admin', 'reseller']
      },
      {
        title: 'Services',
        href: '/reseller/services',
        icon: Package,
        roles: ['admin', 'reseller']
      },
      {
        title: 'Orders',
        href: '/reseller/orders',
        icon: CreditCard,
        roles: ['admin', 'reseller']
      },
      {
        title: 'Analytics',
        href: '/reseller/analytics',
        icon: BarChart,
        roles: ['admin', 'reseller']
      },
      {
        title: 'Settings',
        href: '/reseller/settings',
        icon: Settings,
        roles: ['admin', 'reseller']
      }
    ]
  },

  // Client sections
  {
    title: 'My Account',
    href: '/client',
    icon: User,
    roles: ['admin', 'reseller', 'client'],
    children: [
      {
        title: 'Dashboard',
        href: '/client',
        icon: LayoutDashboard,
        roles: ['admin', 'reseller', 'client']
      },
      {
        title: 'My Services',
        href: '/client/services',
        icon: Package,
        roles: ['admin', 'reseller', 'client']
      },
      {
        title: 'Orders & Billing',
        href: '/client/orders',
        icon: CreditCard,
        roles: ['admin', 'reseller', 'client']
      },
      {
        title: 'Reports',
        href: '/client/reports',
        icon: BarChart,
        roles: ['admin', 'reseller', 'client']
      },
      {
        title: 'Support',
        href: '/client/support',
        icon: HelpCircle,
        roles: ['admin', 'reseller', 'client']
      }
    ]
  },

  // Shared sections
  {
    title: 'Messages',
    href: '/messages',
    icon: Mail,
    badge: '3',
  },
  {
    title: 'Documentation',
    href: '/docs',
    icon: FileText,
  },
  {
    title: 'Support',
    href: '/support',
    icon: HelpCircle,
  }
]

export default function DashboardSidebar({ userRole }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isItemVisible = (item: NavItem) => {
    return !item.roles || item.roles.includes(userRole)
  }

  const isItemActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  const renderNavItem = (item: NavItem, level = 0) => {
    if (!isItemVisible(item)) return null

    const isActive = isItemActive(item.href)
    const hasChildren = item.children && item.children.length > 0
    const isExpanded = expandedItems.includes(item.title)
    const Icon = item.icon

    if (hasChildren) {
      return (
        <Collapsible
          key={item.title}
          open={isExpanded}
          onOpenChange={() => toggleExpanded(item.title)}
        >
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start h-10 px-4 mb-1",
                level > 0 && "pl-8",
                isActive && "bg-green-600/20 text-green-400 border-r-2 border-green-500"
              )}
            >
              <Icon className="h-4 w-4 mr-3" />
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="ml-2 h-5 text-xs">
                  {item.badge}
                </Badge>
              )}
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 ml-2" />
              ) : (
                <ChevronRight className="h-4 w-4 ml-2" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1">
            {item.children?.map(child => renderNavItem(child, level + 1))}
          </CollapsibleContent>
        </Collapsible>
      )
    }

    return (
      <Link key={item.href} href={item.href}>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start h-10 px-4 mb-1",
            level > 0 && "pl-8",
            isActive && "bg-green-600/20 text-green-400 border-r-2 border-green-500"
          )}
        >
          <Icon className="h-4 w-4 mr-3" />
          <span className="flex-1 text-left">{item.title}</span>
          {item.badge && (
            <Badge variant="secondary" className="ml-2 h-5 text-xs">
              {item.badge}
            </Badge>
          )}
        </Button>
      </Link>
    )
  }

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 border-r border-gray-800 hidden lg:flex lg:flex-col">
      {/* Logo */}
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-800">
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">i</span>
          </div>
          <span className="text-xl font-bold text-green-500">inflnce</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-3 space-y-1">
          {navItems.map(item => renderNavItem(item))}
        </nav>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center justify-center mb-3">
          <Badge 
            className={cn(
              "text-xs",
              userRole === 'admin' && "bg-yellow-500/10 text-yellow-500 border-yellow-500",
              userRole === 'reseller' && "bg-blue-500/10 text-blue-500 border-blue-500",
              userRole === 'client' && "bg-green-500/10 text-green-500 border-green-500"
            )}
          >
            {userRole.charAt(0).toUpperCase() + userRole.slice(1)} Access
          </Badge>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
          asChild
        >
          <Link href="/api/auth/signout">
            <LogOut className="h-4 w-4 mr-3" />
            Sign Out
          </Link>
        </Button>
      </div>
    </div>
  )
}