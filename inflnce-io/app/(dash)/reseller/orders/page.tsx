import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireReseller } from "@/lib/auth-dev"
import Link from "next/link"
import {
  ShoppingCart,
  Search,
  Filter,
  Calendar,
  DollarSign,
  Package,
  Users,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  Eye,
  Download,
  RefreshCw
} from "lucide-react"

export default async function ResellerOrdersPage() {
  const { profile } = await requireReseller()
  
  // Mock data for demonstration
  const orders = [
    {
      id: 'ORD-001',
      client_name: 'John Smith',
      client_company: 'Smith Enterprises',
      service: 'Instagram Management',
      amount: 299,
      status: 'active',
      created_at: '2024-12-01',
      start_date: '2024-12-01',
      next_billing: '2025-01-01',
      payment_method: 'stripe',
      stripe_subscription_id: 'sub_1234567890'
    },
    {
      id: 'ORD-002',
      client_name: 'Sarah Johnson',
      client_company: 'TechCorp Solutions',
      service: 'Facebook Advertising',
      amount: 499,
      status: 'pending',
      created_at: '2024-12-15',
      start_date: '2025-01-01',
      next_billing: '2025-01-01',
      payment_method: 'stripe',
      stripe_subscription_id: null
    },
    {
      id: 'ORD-003',
      client_name: 'Mike Davis',
      client_company: 'StartupXYZ',
      service: 'SEO Optimization',
      amount: 799,
      status: 'active',
      created_at: '2024-11-20',
      start_date: '2024-12-01',
      next_billing: '2025-01-01',
      payment_method: 'invoice',
      stripe_subscription_id: null
    },
    {
      id: 'ORD-004',
      client_name: 'Lisa Chen',
      client_company: 'Creative Studio',
      service: 'TikTok Management',
      amount: 399,
      status: 'cancelled',
      created_at: '2024-10-15',
      start_date: '2024-11-01',
      next_billing: null,
      payment_method: 'stripe',
      stripe_subscription_id: 'sub_cancelled123'
    },
    {
      id: 'ORD-005',
      client_name: 'David Wilson',
      client_company: 'Local Biz Suite',
      service: 'Google Ads Management',
      amount: 599,
      status: 'payment_failed',
      created_at: '2024-11-01',
      start_date: '2024-11-01',
      next_billing: '2024-12-01',
      payment_method: 'stripe',
      stripe_subscription_id: 'sub_payment_failed'
    }
  ]

  const totalOrders = orders.length
  const activeOrders = orders.filter(o => o.status === 'active').length
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const monthlyRevenue = orders.filter(o => o.status === 'active').reduce((sum, o) => sum + o.amount, 0)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Order Management</h1>
          <p className="text-gray-400 mt-2">Track and manage all client orders and subscriptions</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/reseller/orders/export">
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Link>
          </Button>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Sync Stripe
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-400">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{totalOrders}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-400">Active Orders</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{activeOrders}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-400">Pending Orders</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-500">{pendingOrders}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-400">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">${monthlyRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Order History</CardTitle>
              <CardDescription>All client orders and subscription details</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search orders..." className="pl-8 w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="payment_failed">Payment Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Next Billing</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <div className="flex items-center text-sm text-gray-400">
                        <Calendar className="h-3 w-3 mr-1" />
                        {order.created_at}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{order.client_name}</p>
                      <p className="text-sm text-gray-400">{order.client_company}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-blue-500" />
                      <span>{order.service}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-500">
                      ${order.amount}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {order.status === 'active' ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                          <Badge className="bg-green-500/10 text-green-500 border-green-500">
                            Active
                          </Badge>
                        </>
                      ) : order.status === 'pending' ? (
                        <>
                          <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
                            Pending
                          </Badge>
                        </>
                      ) : order.status === 'cancelled' ? (
                        <>
                          <XCircle className="h-4 w-4 mr-2 text-gray-500" />
                          <Badge className="bg-gray-500/10 text-gray-500 border-gray-500">
                            Cancelled
                          </Badge>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                          <Badge className="bg-red-500/10 text-red-500 border-red-500">
                            Payment Failed
                          </Badge>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {order.payment_method === 'stripe' ? 'Card' : 'Invoice'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {order.next_billing ? (
                      <div className="flex items-center text-sm">
                        <Calendar className="h-3 w-3 mr-1" />
                        {order.next_billing}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/reseller/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      {order.status === 'payment_failed' && (
                        <Button variant="ghost" size="sm" className="text-yellow-500 hover:text-yellow-400">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
            <CardDescription>Order breakdown by payment status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  <span>Active Orders</span>
                </div>
                <Badge className="bg-green-500 text-white">{activeOrders}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-yellow-500" />
                  <span>Pending Setup</span>
                </div>
                <Badge className="bg-yellow-500 text-gray-900">{pendingOrders}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2 text-red-500" />
                  <span>Payment Issues</span>
                </div>
                <Badge className="bg-red-500 text-white">
                  {orders.filter(o => o.status === 'payment_failed').length}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Revenue Tracking</CardTitle>
            <CardDescription>Monthly recurring revenue</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Current MRR</span>
                <span className="font-medium text-green-500">${monthlyRevenue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Pending MRR</span>
                <span className="font-medium text-yellow-500">
                  ${orders.filter(o => o.status === 'pending').reduce((sum, o) => sum + o.amount, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">At Risk MRR</span>
                <span className="font-medium text-red-500">
                  ${orders.filter(o => o.status === 'payment_failed').reduce((sum, o) => sum + o.amount, 0)}
                </span>
              </div>
            </div>
            <Button asChild variant="outline" className="w-full">
              <Link href="/reseller/analytics?view=revenue">
                View Revenue Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common order management tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href="/reseller/clients/new">
                <Users className="h-4 w-4 mr-2" />
                Create New Order
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/orders?status=payment_failed">
                <AlertCircle className="h-4 w-4 mr-2" />
                Review Failed Payments
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/orders?status=pending">
                <Clock className="h-4 w-4 mr-2" />
                Setup Pending Orders
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/reports?type=billing">
                <Download className="h-4 w-4 mr-2" />
                Billing Reports
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}