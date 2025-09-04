"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"
import Link from "next/link"
import {
  Users,
  Building2,
  Settings,
  Package,
  TrendingUp,
  Shield,
  Database,
  Mail,
  CreditCard,
  Plus,
  Activity
} from "lucide-react"
import { AnimatedPageWrapper, FadeInSection, ScaleOnHover } from "@/components/animated-page-wrapper"

export default function AdminDashboard() {
  return (
    <ProtectedRoute requiredRole="admin">
      <AnimatedPageWrapper className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <FadeInSection>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-green-500">Admin Dashboard</h1>
              <p className="text-gray-400 mt-2">Manage tenants, users, and platform settings</p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/admin/tenants/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Tenant
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/admin/users/new">
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </Link>
          </Button>
        </div>
          </div>
        </FadeInSection>

        {/* Quick Stats */}
        <FadeInSection delay={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScaleOnHover>
              <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-blue-400">Total Tenants</CardTitle>
                  <Building2 className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-500">12</div>
                  <p className="text-xs text-blue-300">+2 this month</p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover>
              <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20 hover:border-green-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-green-400">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">247</div>
                  <p className="text-xs text-green-300">+18 this week</p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover>
              <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-purple-400">Services</CardTitle>
                  <Package className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-500">15</div>
                  <p className="text-xs text-purple-300">8 categories</p>
                </CardContent>
              </Card>
            </ScaleOnHover>

            <ScaleOnHover>
              <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20 hover:border-orange-400/40 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-orange-400">Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-500">$52.4k</div>
                  <p className="text-xs text-orange-300">+12% from last month</p>
                </CardContent>
              </Card>
            </ScaleOnHover>
          </div>
        </FadeInSection>

        {/* Management Sections */}
        <FadeInSection delay={0.3}>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Tenant Management */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-green-500">
              <Building2 className="h-5 w-5 mr-2" />
              Tenant Management
            </CardTitle>
            <CardDescription>
              Manage reseller accounts and tenant settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Active Tenants</p>
                <p className="text-sm text-gray-400">12 organizations</p>
              </div>
              <Badge variant="outline" className="text-green-500 border-green-500">
                All Active
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" className="flex-1">
                <Link href="/admin/tenants">
                  <Building2 className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link href="/admin/tenants/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-500">
              <Users className="h-5 w-5 mr-2" />
              User Management
            </CardTitle>
            <CardDescription>
              Manage user accounts, roles, and permissions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Admins</span>
                <Badge variant="secondary">3</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Resellers</span>
                <Badge variant="secondary">24</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Clients</span>
                <Badge variant="secondary">220</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" className="flex-1">
                <Link href="/admin/users">
                  <Users className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link href="/admin/users/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Service Management */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-500">
              <Package className="h-5 w-5 mr-2" />
              Service Catalog
            </CardTitle>
            <CardDescription>
              Manage available services and pricing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Social Media</span>
                <Badge variant="secondary">6 services</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Content</span>
                <Badge variant="secondary">4 services</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Analytics</span>
                <Badge variant="secondary">5 services</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" className="flex-1">
                <Link href="/admin/services">
                  <Package className="h-4 w-4 mr-2" />
                  Manage
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link href="/admin/services/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Settings */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-orange-500">
              <Settings className="h-5 w-5 mr-2" />
              System Settings
            </CardTitle>
            <CardDescription>
              Platform configuration and integrations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Database className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Database</span>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500">Connected</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <CreditCard className="h-4 w-4 mr-2 text-yellow-500" />
                  <span className="text-sm">Stripe</span>
                </div>
                <Badge variant="outline" className="text-yellow-500 border-yellow-500">Setup Required</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Email</span>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500">Active</Badge>
              </div>
            </div>
            <Button asChild size="sm" className="w-full">
              <Link href="/admin/settings">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Security & Monitoring */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-red-500">
              <Shield className="h-5 w-5 mr-2" />
              Security Center
            </CardTitle>
            <CardDescription>
              Monitor security and system health
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Failed Logins (24h)</span>
                <Badge variant="outline">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Active Sessions</span>
                <Badge variant="outline">142</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">System Health</span>
                <Badge className="bg-green-500/10 text-green-500 border-green-500">Good</Badge>
              </div>
            </div>
            <Button asChild size="sm" className="w-full" variant="outline">
              <Link href="/admin/security">
                <Activity className="h-4 w-4 mr-2" />
                View Logs
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest platform activities and changes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">New tenant created</p>
                  <p className="text-xs text-gray-400">Digital Solutions Pro</p>
                </div>
                <span className="text-xs text-gray-400">2h ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">User role updated</p>
                  <p className="text-xs text-gray-400">john@example.com</p>
                </div>
                <span className="text-xs text-gray-400">4h ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-white">Service added</p>
                  <p className="text-xs text-gray-400">Instagram Management</p>
                </div>
                <span className="text-xs text-gray-400">6h ago</span>
              </div>
            </div>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href="/admin/activity">
                View All Activity
              </Link>
            </Button>
          </CardContent>
        </Card>
          </div>
        </FadeInSection>

        {/* Content Management Section */}
        <FadeInSection delay={0.4}>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-purple-400 flex items-center">
              <Package className="h-6 w-6 mr-2" />
              Content Management
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Manage Pages */}
          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Site Pages
              </CardTitle>
              <CardDescription>Manage homepage, service pages, and site content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                  <Link href="/admin/content/pages">Edit Pages</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href="/admin/content/homepage">Homepage Settings</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Manage Services */}
          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Services & Pricing
              </CardTitle>
              <CardDescription>Configure service offerings and pricing tiers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                  <Link href="/admin/content/services">Manage Services</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href="/admin/content/pricing">Edit Pricing</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Text & Copy Management */}
          <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                Text & Copy
              </CardTitle>
              <CardDescription>Edit site copy, descriptions, and messaging</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild size="sm" className="w-full bg-green-600 hover:bg-green-700">
                  <Link href="/admin/content/copy">Edit Copy</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href="/admin/content/templates">Email Templates</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Publications Management */}
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Publications DB
              </CardTitle>
              <CardDescription>Manage publication database and partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild size="sm" className="w-full bg-orange-600 hover:bg-orange-700">
                  <Link href="/admin/publications">Manage Publications</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href="/admin/publications/add">Add Publication</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* TikTok Services */}
          <Card className="bg-gradient-to-br from-pink-500/10 to-pink-600/10 border-pink-500/20">
            <CardHeader>
              <CardTitle className="text-pink-400 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                TikTok Services
              </CardTitle>
              <CardDescription>Configure TikTok service offerings and packages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild size="sm" className="w-full bg-pink-600 hover:bg-pink-700">
                  <Link href="/admin/services/tiktok">TikTok Config</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href="/admin/services/social">All Social</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Analytics & Reports */}
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center">
                <Activity className="h-5 w-5 mr-2" />
                Analytics & Reports
              </CardTitle>
              <CardDescription>Platform analytics and performance reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button asChild size="sm" className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900">
                  <Link href="/admin/analytics">View Analytics</Link>
                </Button>
                <Button asChild size="sm" variant="outline" className="w-full">
                  <Link href="/admin/reports">Generate Reports</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
            </div>
          </div>
        </FadeInSection>
      </AnimatedPageWrapper>
    </ProtectedRoute>
  )
}