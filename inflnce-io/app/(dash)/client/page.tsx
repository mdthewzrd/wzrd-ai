"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"
import Link from "next/link"
import {
  Package,
  Calendar,
  DollarSign,
  Activity,
  MessageCircle,
  Bell,
  Download,
  Settings,
  CheckCircle,
  Clock,
  AlertCircle,
  BarChart3,
  TrendingUp,
  Eye,
  Star
} from "lucide-react"

export default function ClientDashboard() {
  
  // Mock client data
  const clientData = {
    profile: {
      name: 'John Smith',
      company: 'Smith Enterprises',
      plan: 'Professional',
      member_since: '2024-01-15'
    },
    services: [
      {
        id: '1',
        name: 'Instagram Management',
        status: 'active',
        monthly_fee: 299,
        next_billing: '2025-01-15',
        performance: {
          followers: 15420,
          engagement: 4.8,
          posts_this_month: 24,
          growth: 12.5
        }
      },
      {
        id: '2',
        name: 'Facebook Advertising',
        status: 'active',
        monthly_fee: 499,
        next_billing: '2025-01-15',
        performance: {
          reach: 45000,
          ctr: 2.3,
          conversions: 87,
          roas: 4.2
        }
      },
      {
        id: '3',
        name: 'SEO Optimization',
        status: 'setup',
        monthly_fee: 799,
        next_billing: '2025-01-15',
        performance: {
          keywords: 'Initial audit in progress',
          rank_improvements: 'Not yet tracked',
          organic_traffic: 'Baseline being established'
        }
      }
    ],
    billing: {
      current_balance: 0,
      next_payment_date: '2025-01-15',
      total_monthly: 1597,
      ytd_spent: 14373
    },
    support: {
      open_tickets: 1,
      last_response: '2024-12-28',
      satisfaction_rating: 4.9
    }
  }

  const totalServices = clientData.services.length
  const activeServices = clientData.services.filter(s => s.status === 'active').length
  const monthlyTotal = clientData.services.reduce((sum, s) => sum + s.monthly_fee, 0)

  return (
    <ProtectedRoute requiredRole="client">
      <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Welcome back, {clientData.profile.name}</h1>
          <p className="text-gray-400 mt-2">
            {clientData.profile.company} • {clientData.profile.plan} Plan • 
            Member since {clientData.profile.member_since}
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/client/support">
              <MessageCircle className="h-4 w-4 mr-2" />
              Support
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/client/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-400">Active Services</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{activeServices}</div>
            <p className="text-xs text-blue-300">of {totalServices} total</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-400">Monthly Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${monthlyTotal.toLocaleString()}</div>
            <p className="text-xs text-green-300">Next billing: {clientData.billing.next_payment_date}</p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-400">YTD Investment</CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">${clientData.billing.ytd_spent.toLocaleString()}</div>
            <p className="text-xs text-purple-300">Total this year</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-400">Support Rating</CardTitle>
            <Star className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{clientData.support.satisfaction_rating}</div>
            <p className="text-xs text-orange-300">out of 5.0</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Active Services</CardTitle>
            <CardDescription>Your current service subscriptions and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {clientData.services.map((service) => (
                <div key={service.id} className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-gray-400">${service.monthly_fee}/month</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {service.status === 'active' ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <Badge className="bg-green-500/10 text-green-500 border-green-500">
                            Active
                          </Badge>
                        </>
                      ) : service.status === 'setup' ? (
                        <>
                          <Clock className="h-4 w-4 text-yellow-500" />
                          <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
                            Setting Up
                          </Badge>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-4 w-4 text-red-500" />
                          <Badge className="bg-red-500/10 text-red-500 border-red-500">
                            Issue
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>
                  
                  {service.status === 'active' && (
                    <div className="space-y-2 text-sm">
                      {service.name === 'Instagram Management' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-400">Followers:</span>
                            <span className="ml-2 font-medium">{service.performance.followers?.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Engagement:</span>
                            <span className="ml-2 font-medium text-green-500">{service.performance.engagement}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Posts:</span>
                            <span className="ml-2 font-medium">{service.performance.posts_this_month} this month</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Growth:</span>
                            <span className="ml-2 font-medium text-green-500">+{service.performance.growth}%</span>
                          </div>
                        </div>
                      )}
                      
                      {service.name === 'Facebook Advertising' && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <span className="text-gray-400">Reach:</span>
                            <span className="ml-2 font-medium">{service.performance.reach?.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">CTR:</span>
                            <span className="ml-2 font-medium text-green-500">{service.performance.ctr}%</span>
                          </div>
                          <div>
                            <span className="text-gray-400">Conversions:</span>
                            <span className="ml-2 font-medium">{service.performance.conversions}</span>
                          </div>
                          <div>
                            <span className="text-gray-400">ROAS:</span>
                            <span className="ml-2 font-medium text-green-500">{service.performance.roas}x</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {service.status === 'setup' && (
                    <div className="text-sm text-yellow-500">
                      <p>Service setup in progress. You'll receive an email once complete.</p>
                    </div>
                  )}
                  
                  <div className="flex gap-2 mt-3">
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <Link href={`/client/services/${service.id}`}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Link>
                    </Button>
                    <Button asChild size="sm" variant="outline" className="flex-1">
                      <Link href={`/client/services/${service.id}/reports`}>
                        <Download className="h-4 w-4 mr-2" />
                        Reports
                      </Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>Billing, support, and account status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-green-500">Billing Status</h3>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Balance:</span>
                  <span className="font-medium">${clientData.billing.current_balance}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Payment:</span>
                  <span className="font-medium">{clientData.billing.next_payment_date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Total:</span>
                  <span className="font-medium text-green-500">${clientData.billing.total_monthly}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Support & Communication</h3>
                <MessageCircle className="h-4 w-4 text-blue-500" />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Open Tickets:</span>
                  <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
                    {clientData.support.open_tickets}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Response:</span>
                  <span className="font-medium">{clientData.support.last_response}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Satisfaction:</span>
                  <div className="flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="font-medium">{clientData.support.satisfaction_rating}/5.0</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button asChild variant="outline" className="w-full">
                <Link href="/client/billing">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Billing
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/client/support">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Support
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Service Performance Dashboard</CardTitle>
          <CardDescription>Track the performance of your active services</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {clientData.services.filter(s => s.status === 'active').map((service) => (
              <Card key={service.id} className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Package className="h-5 w-5 mr-2 text-green-500" />
                    {service.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {service.name === 'Instagram Management' && (
                    <>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                          <div className="font-bold text-blue-500 text-xl">
                            {service.performance.followers?.toLocaleString()}
                          </div>
                          <div className="text-blue-300">Followers</div>
                        </div>
                        <div className="text-center p-3 bg-green-500/10 rounded-lg">
                          <div className="font-bold text-green-500 text-xl">
                            {service.performance.engagement}%
                          </div>
                          <div className="text-green-300">Engagement</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                          <div className="font-bold text-purple-500 text-xl">
                            {service.performance.posts_this_month}
                          </div>
                          <div className="text-purple-300">Posts This Month</div>
                        </div>
                        <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                          <div className="font-bold text-orange-500 text-xl">
                            +{service.performance.growth}%
                          </div>
                          <div className="text-orange-300">Growth</div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {service.name === 'Facebook Advertising' && (
                    <>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-blue-500/10 rounded-lg">
                          <div className="font-bold text-blue-500 text-xl">
                            {service.performance.reach?.toLocaleString()}
                          </div>
                          <div className="text-blue-300">Reach</div>
                        </div>
                        <div className="text-center p-3 bg-green-500/10 rounded-lg">
                          <div className="font-bold text-green-500 text-xl">
                            {service.performance.ctr}%
                          </div>
                          <div className="text-green-300">Click Rate</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-3 bg-purple-500/10 rounded-lg">
                          <div className="font-bold text-purple-500 text-xl">
                            {service.performance.conversions}
                          </div>
                          <div className="text-purple-300">Conversions</div>
                        </div>
                        <div className="text-center p-3 bg-orange-500/10 rounded-lg">
                          <div className="font-bold text-orange-500 text-xl">
                            {service.performance.roas}x
                          </div>
                          <div className="text-orange-300">ROAS</div>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <Button asChild size="sm" className="w-full">
                    <Link href={`/client/services/${service.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Report
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and requests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/client/services/add">
                <Package className="h-4 w-4 mr-2" />
                Add New Service
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/client/reports">
                <Download className="h-4 w-4 mr-2" />
                Download Reports
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/client/billing/history">
                <Calendar className="h-4 w-4 mr-2" />
                Billing History
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/client/support/new">
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Instagram report generated</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <TrendingUp className="h-4 w-4 text-blue-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Facebook campaign optimized</p>
                  <p className="text-xs text-gray-400">6 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-gray-800 rounded-lg">
                <MessageCircle className="h-4 w-4 text-purple-500 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-white">Support ticket updated</p>
                  <p className="text-xs text-gray-400">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Account Health</CardTitle>
            <CardDescription>Overall account status and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Service Performance</span>
                <Badge className="bg-green-500/10 text-green-500 border-green-500">
                  Excellent
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Account Standing</span>
                <Badge className="bg-green-500/10 text-green-500 border-green-500">
                  Good Standing
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm">Support Response</span>
                <Badge className="bg-blue-500/10 text-blue-500 border-blue-500">
                  Fast
                </Badge>
              </div>

              <div className="pt-2">
                <p className="text-xs text-green-400 mb-2">✓ All services running smoothly</p>
                <p className="text-xs text-green-400 mb-2">✓ Payments up to date</p>
                <p className="text-xs text-green-400">✓ Strong performance metrics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      </div>
    </ProtectedRoute>
  )
}