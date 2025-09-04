import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireReseller } from "@/lib/auth-dev"
import Link from "next/link"
import {
  Package,
  Plus,
  Search,
  Filter,
  Settings,
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Edit,
  ToggleLeft
} from "lucide-react"

export default async function ResellerServicesPage() {
  const { profile } = await requireReseller()
  
  // Mock data for demonstration
  const services = [
    {
      id: '1',
      name: 'Instagram Management',
      category: 'Social Media',
      price: 299,
      billing_cycle: 'monthly',
      active_clients: 12,
      total_revenue: 3588,
      status: 'active',
      description: 'Complete Instagram account management including content creation, posting, and engagement',
      features: ['Content Creation', 'Daily Posting', 'Story Management', 'Engagement', 'Analytics']
    },
    {
      id: '2',
      name: 'Facebook Advertising',
      category: 'Advertising',
      price: 499,
      billing_cycle: 'monthly',
      active_clients: 8,
      total_revenue: 3992,
      status: 'active',
      description: 'Facebook and Instagram ad campaign management and optimization',
      features: ['Campaign Setup', 'Ad Creation', 'Targeting', 'Budget Optimization', 'Reporting']
    },
    {
      id: '3',
      name: 'Google Ads Management',
      category: 'Advertising',
      price: 599,
      billing_cycle: 'monthly',
      active_clients: 6,
      total_revenue: 3594,
      status: 'active',
      description: 'Google Ads campaign creation, management, and optimization',
      features: ['Keyword Research', 'Ad Copy', 'Landing Pages', 'Bid Management', 'ROI Tracking']
    },
    {
      id: '4',
      name: 'TikTok Management',
      category: 'Social Media',
      price: 399,
      billing_cycle: 'monthly',
      active_clients: 4,
      total_revenue: 1596,
      status: 'active',
      description: 'TikTok content creation and account growth strategies',
      features: ['Viral Content', 'Trend Analysis', 'Hashtag Strategy', 'Creator Outreach']
    },
    {
      id: '5',
      name: 'SEO Optimization',
      category: 'Web Development',
      price: 799,
      billing_cycle: 'monthly',
      active_clients: 5,
      total_revenue: 3995,
      status: 'active',
      description: 'Complete SEO audit, optimization, and ongoing monitoring',
      features: ['Technical SEO', 'Content Optimization', 'Link Building', 'Rank Tracking']
    },
    {
      id: '6',
      name: 'Email Marketing',
      category: 'Marketing',
      price: 199,
      billing_cycle: 'monthly',
      active_clients: 15,
      total_revenue: 2985,
      status: 'paused',
      description: 'Email campaign design, automation, and performance tracking',
      features: ['Campaign Design', 'Automation', 'List Management', 'A/B Testing']
    }
  ]

  const categories = [...new Set(services.map(s => s.category))]
  const totalRevenue = services.reduce((sum, s) => sum + s.total_revenue, 0)
  const totalClients = services.reduce((sum, s) => sum + s.active_clients, 0)
  const activeServices = services.filter(s => s.status === 'active').length

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Service Catalog</h1>
          <p className="text-gray-400 mt-2">Manage your service offerings and pricing</p>
        </div>
        <Button asChild>
          <Link href="/reseller/services/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Service
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-400">Active Services</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{activeServices}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-400">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-400">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{totalClients}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-400">Avg Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              ${Math.round(totalRevenue / activeServices)}
            </div>
            <p className="text-xs text-orange-300">per service</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Service Management</CardTitle>
              <CardDescription>Configure pricing, availability, and service details</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search services..." className="pl-8 w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Active Clients</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-gray-400 max-w-md">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {service.features.slice(0, 3).map((feature, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {service.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{service.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{service.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <span className="font-medium text-green-500">
                        ${service.price}
                      </span>
                      <span className="text-sm text-gray-400">/{service.billing_cycle}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="font-medium">{service.active_clients}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-500">
                      ${service.total_revenue.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {service.status === 'active' ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          <Badge className="bg-green-500/10 text-green-500 border-green-500">
                            Active
                          </Badge>
                        </>
                      ) : service.status === 'paused' ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
                            Paused
                          </Badge>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                          <Badge className="bg-red-500/10 text-red-500 border-red-500">
                            Inactive
                          </Badge>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/reseller/services/${service.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/reseller/services/${service.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-yellow-500 hover:text-yellow-400">
                        <ToggleLeft className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Service Categories</CardTitle>
            <CardDescription>Breakdown by service type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {categories.map(category => {
                const categoryServices = services.filter(s => s.category === category)
                const categoryRevenue = categoryServices.reduce((sum, s) => sum + s.total_revenue, 0)
                const categoryClients = categoryServices.reduce((sum, s) => sum + s.active_clients, 0)
                
                return (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="font-medium">{category}</p>
                      <p className="text-sm text-gray-400">{categoryServices.length} services</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-500">${categoryRevenue.toLocaleString()}</p>
                      <p className="text-sm text-gray-400">{categoryClients} clients</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common service management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href="/reseller/services/new">
                <Plus className="h-4 w-4 mr-2" />
                Create New Service
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/services/bulk-edit">
                <Settings className="h-4 w-4 mr-2" />
                Bulk Edit Pricing
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/services/templates">
                <Package className="h-4 w-4 mr-2" />
                Service Templates
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/analytics?view=services">
                <DollarSign className="h-4 w-4 mr-2" />
                Revenue Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}