"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"
import Link from "next/link"
import {
  Users,
  Package,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  Settings,
  BarChart,
  Clock,
  CheckCircle,
  ArrowUp,
  Activity
} from "lucide-react"

export default function ResellerDashboard() {
  
  // Mock data for demonstration
  const mockData = {
    stats: {
      totalClients: 24,
      activeClients: 21,
      totalServices: 45,
      monthlyRevenue: 15400,
      revenueGrowth: 12.5,
      clientGrowth: 8.3,
      serviceGrowth: 15.2
    },
    clients: [
      { id: '1', name: 'John Smith', company: 'Smith Enterprises', status: 'active', monthly_value: 899 },
      { id: '2', name: 'Sarah Johnson', company: 'TechCorp Solutions', status: 'active', monthly_value: 598 },
      { id: '3', name: 'Mike Davis', company: 'StartupXYZ', status: 'pending', monthly_value: 299 }
    ],
    orders: [
      { id: 'ORD-001', client_name: 'John Smith', service: 'Instagram Management', amount: 299, status: 'active' },
      { id: 'ORD-002', client_name: 'Sarah Johnson', service: 'Facebook Advertising', amount: 499, status: 'pending' }
    ]
  }

  const { clients, orders, stats } = mockData

  return (
    <ProtectedRoute requiredRole="reseller">
      <div className="container mx-auto p-6 space-y-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Reseller Dashboard</h1>
          <p className="text-gray-400 mt-2">Manage your clients, services, and revenue</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/reseller/reports">
              <BarChart className="h-4 w-4 mr-2" />
              View Reports
            </Link>
          </Button>
          <Button asChild>
            <Link href="/reseller/clients/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Client
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-400">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.totalClients}</div>
            <p className="text-xs text-blue-300 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +{stats.clientGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-400">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-300 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +{stats.revenueGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-400">Active Services</CardTitle>
            <Package className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{stats.totalServices}</div>
            <p className="text-xs text-purple-300 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +{stats.serviceGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-400">Avg Client Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">
              ${Math.round(stats.monthlyRevenue / stats.totalClients)}
            </div>
            <p className="text-xs text-orange-300">per client/month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-green-500">
              <Users className="h-5 w-5 mr-2" />
              Client Management
            </CardTitle>
            <CardDescription>Manage your client base and relationships</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Active Clients</p>
                <p className="text-sm text-gray-400">{stats.activeClients} of {stats.totalClients}</p>
              </div>
              <Badge className="bg-green-500/10 text-green-500 border-green-500">
                {Math.round((stats.activeClients / stats.totalClients) * 100)}%
              </Badge>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" className="flex-1">
                <Link href="/reseller/clients">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="flex-1">
                <Link href="/reseller/clients/new">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-500">
              <Package className="h-5 w-5 mr-2" />
              Service Catalog
            </CardTitle>
            <CardDescription>Manage available services and pricing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Social Media</span>
                <Badge variant="secondary">12 services</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Advertising</span>
                <Badge variant="secondary">8 services</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Content</span>
                <Badge variant="secondary">6 services</Badge>
              </div>
            </div>
            <Button asChild size="sm" className="w-full">
              <Link href="/reseller/services">
                <Settings className="h-4 w-4 mr-2" />
                Manage Services
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center text-purple-500">
              <BarChart className="h-5 w-5 mr-2" />
              Performance Analytics
            </CardTitle>
            <CardDescription>Track your business performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Client Retention</span>
                <span className="text-sm font-medium text-green-500">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Service Utilization</span>
                <span className="text-sm font-medium text-blue-500">78%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Revenue Growth</span>
                <span className="text-sm font-medium text-purple-500">+12.5%</span>
              </div>
            </div>
            <Button asChild size="sm" variant="outline" className="w-full">
              <Link href="/reseller/analytics">
                <Activity className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Recent Clients</CardTitle>
            <CardDescription>Your newest client acquisitions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-xs">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{client.name}</p>
                      <p className="text-sm text-gray-400">{client.company}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge 
                      className={
                        client.status === 'active' 
                          ? "bg-green-500/10 text-green-500 border-green-500"
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500"
                      }
                    >
                      {client.status}
                    </Badge>
                    <p className="text-sm text-gray-400 mt-1">${client.monthly_value}/mo</p>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/reseller/clients">
                View All Clients
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest service orders and requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{order.service}</p>
                    <p className="text-sm text-gray-400">{order.client_name}</p>
                    <p className="text-xs text-gray-500">{order.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-500">${order.amount}</p>
                    <Badge 
                      className={
                        order.status === 'active' 
                          ? "bg-green-500/10 text-green-500 border-green-500"
                          : "bg-yellow-500/10 text-yellow-500 border-yellow-500"
                      }
                    >
                      {order.status === 'active' ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : (
                        <Clock className="h-3 w-3 mr-1" />
                      )}
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/reseller/orders">
                View All Orders
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      </div>
    </ProtectedRoute>
  )
}