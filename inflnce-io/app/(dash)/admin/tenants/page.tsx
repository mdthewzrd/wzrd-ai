import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { requireAdmin } from "@/lib/auth-dev"
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from "next/link"
import {
  Building2,
  Plus,
  Search,
  Edit,
  MoreVertical,
  Users,
  DollarSign,
  Calendar,
  Globe,
  Settings,
  Eye
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default async function TenantsPage() {
  // Require admin authentication
  const { profile } = await requireAdmin()
  
  // Get tenants from database
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })
  
  const { data: tenants, error } = await supabase
    .from('tenants')
    .select(`
      *,
      users(count),
      services(count)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching tenants:', error)
  }

  // Mock data for demonstration (replace with actual data when database is populated)
  const mockTenants = [
    {
      id: '1',
      name: 'ACME Digital Agency',
      slug: 'acme-digital',
      domain: 'acme.inflnce.io',
      created_at: '2024-01-15T10:00:00Z',
      is_active: true,
      brand_color: '#3b82f6',
      user_count: 12,
      service_count: 8,
      monthly_revenue: 2400
    },
    {
      id: '2',
      name: 'Bluebird Marketing',
      slug: 'bluebird-marketing',
      domain: 'bluebird.inflnce.io',
      created_at: '2024-02-01T14:30:00Z',
      is_active: true,
      brand_color: '#10b981',
      user_count: 8,
      service_count: 6,
      monthly_revenue: 1800
    },
    {
      id: '3',
      name: 'Creative Solutions Pro',
      slug: 'creative-solutions',
      domain: 'creative.inflnce.io',
      created_at: '2024-02-20T09:15:00Z',
      is_active: false,
      brand_color: '#f59e0b',
      user_count: 5,
      service_count: 4,
      monthly_revenue: 0
    },
    {
      id: '4',
      name: 'Digital Growth Hub',
      slug: 'growth-hub',
      domain: 'growth.inflnce.io',
      created_at: '2024-03-05T16:45:00Z',
      is_active: true,
      brand_color: '#8b5cf6',
      user_count: 15,
      service_count: 12,
      monthly_revenue: 3200
    }
  ]

  const displayTenants = tenants || mockTenants

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Tenant Management</h1>
          <p className="text-gray-400 mt-2">Manage reseller accounts and multi-tenant settings</p>
        </div>
        <Button asChild>
          <Link href="/admin/tenants/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Tenant
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Tenants</CardTitle>
            <Building2 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{displayTenants.length}</div>
            <p className="text-xs text-gray-500">
              {displayTenants.filter(t => t.is_active).length} active
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">
              {displayTenants.reduce((sum, t) => sum + (t.user_count || 0), 0)}
            </div>
            <p className="text-xs text-gray-500">Across all tenants</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">
              ${displayTenants.reduce((sum, t) => sum + (t.monthly_revenue || 0), 0).toLocaleString()}
            </div>
            <p className="text-xs text-gray-500">Total MRR</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-400">Active Rate</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">
              {Math.round((displayTenants.filter(t => t.is_active).length / displayTenants.length) * 100)}%
            </div>
            <p className="text-xs text-gray-500">Tenant activity</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Search Tenants</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by name, slug, or domain..." 
                className="pl-8 bg-gray-800 border-gray-700"
              />
            </div>
            <Button variant="outline">
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tenants Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>All Tenants</CardTitle>
          <CardDescription>
            Manage your reseller tenants and their configurations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-800">
                <TableHead>Tenant</TableHead>
                <TableHead>Domain</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {displayTenants.map((tenant) => (
                <TableRow key={tenant.id} className="border-gray-800">
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: tenant.brand_color || '#10b981' }}
                      />
                      <div>
                        <div className="font-medium">{tenant.name}</div>
                        <div className="text-sm text-gray-400">{tenant.slug}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{tenant.domain}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        tenant.is_active 
                          ? "bg-green-500/10 text-green-500 border-green-500"
                          : "bg-gray-500/10 text-gray-500 border-gray-500"
                      }
                    >
                      {tenant.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{tenant.user_count || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Settings className="h-4 w-4 text-gray-400" />
                      <span>{tenant.service_count || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      ${(tenant.monthly_revenue || 0).toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-400">/mo</span>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {new Date(tenant.created_at).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/tenants/${tenant.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/tenants/${tenant.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Tenant
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-gray-800" />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/tenants/${tenant.id}/users`}>
                            <Users className="mr-2 h-4 w-4" />
                            Manage Users
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/tenants/${tenant.id}/services`}>
                            <Settings className="mr-2 h-4 w-4" />
                            Manage Services
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}