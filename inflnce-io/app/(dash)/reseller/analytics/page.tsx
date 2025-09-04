import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { requireReseller } from "@/lib/auth-dev"
import Link from "next/link"
import {
  BarChart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Package,
  Calendar,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Activity,
  AlertCircle
} from "lucide-react"

export default async function ResellerAnalyticsPage() {
  const { profile } = await requireReseller()
  
  // Mock analytics data
  const analytics = {
    revenue: {
      current_month: 15400,
      last_month: 13650,
      growth: 12.8,
      ytd: 168500,
      projection: 185000
    },
    clients: {
      total: 24,
      new_this_month: 3,
      churned_this_month: 1,
      retention_rate: 94.2,
      lifetime_value: 7020
    },
    services: {
      most_popular: 'Instagram Management',
      highest_revenue: 'SEO Optimization',
      total_active: 45,
      avg_price: 456
    },
    performance: {
      conversion_rate: 68.5,
      avg_onboarding_time: 3.2,
      client_satisfaction: 4.7,
      support_tickets: 12
    }
  }

  const monthlyTrends = [
    { month: 'Aug', revenue: 11200, clients: 18, services: 32 },
    { month: 'Sep', revenue: 12100, clients: 20, services: 38 },
    { month: 'Oct', revenue: 12800, clients: 21, services: 41 },
    { month: 'Nov', revenue: 13650, clients: 21, services: 43 },
    { month: 'Dec', revenue: 15400, clients: 24, services: 45 }
  ]

  const topServices = [
    { name: 'Instagram Management', clients: 12, revenue: 3588, growth: 15.2 },
    { name: 'Facebook Advertising', clients: 8, revenue: 3992, growth: 8.7 },
    { name: 'SEO Optimization', clients: 5, revenue: 3995, growth: 22.1 },
    { name: 'Google Ads Management', clients: 6, revenue: 3594, growth: -5.3 },
    { name: 'TikTok Management', clients: 4, revenue: 1596, growth: 45.8 }
  ]

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Analytics Dashboard</h1>
          <p className="text-gray-400 mt-2">Track your business performance and growth metrics</p>
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-40">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="1y">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border-2 border-cyan-500 rounded-lg bg-cyan-500/5">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-400">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${analytics.revenue.current_month.toLocaleString()}</div>
            <p className="text-xs text-green-300 flex items-center">
              <ArrowUp className="h-3 w-3 mr-1" />
              +{analytics.revenue.growth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-400">Client Retention</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{analytics.clients.retention_rate}%</div>
            <p className="text-xs text-blue-300">Monthly retention rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-400">Avg Client Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">${analytics.clients.lifetime_value.toLocaleString()}</div>
            <p className="text-xs text-purple-300">Lifetime value</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-400">Conversion Rate</CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{analytics.performance.conversion_rate}%</div>
            <p className="text-xs text-orange-300">Lead to client</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
            <CardDescription>Monthly revenue and growth over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyTrends.map((month, i) => (
                <div key={month.month} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <p className="font-medium">{month.month} 2024</p>
                    <p className="text-sm text-gray-400">{month.clients} clients, {month.services} services</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-500">${month.revenue.toLocaleString()}</p>
                    {i > 0 && (
                      <div className="flex items-center text-xs">
                        {month.revenue > monthlyTrends[i-1].revenue ? (
                          <>
                            <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                            <span className="text-green-500">
                              +{Math.round(((month.revenue - monthlyTrends[i-1].revenue) / monthlyTrends[i-1].revenue) * 100)}%
                            </span>
                          </>
                        ) : (
                          <>
                            <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                            <span className="text-red-500">
                              {Math.round(((month.revenue - monthlyTrends[i-1].revenue) / monthlyTrends[i-1].revenue) * 100)}%
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Top Performing Services</CardTitle>
            <CardDescription>Services by revenue and growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topServices.map((service, i) => (
                <div key={service.name} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">#{i + 1}</Badge>
                      <p className="font-medium">{service.name}</p>
                    </div>
                    <p className="text-sm text-gray-400">{service.clients} active clients</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-green-500">${service.revenue.toLocaleString()}</p>
                    <div className="flex items-center text-xs">
                      {service.growth > 0 ? (
                        <>
                          <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                          <span className="text-green-500">+{service.growth}%</span>
                        </>
                      ) : (
                        <>
                          <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                          <span className="text-red-500">{service.growth}%</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild variant="outline" className="w-full mt-4">
              <Link href="/reseller/services">
                View All Services
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Client Metrics</CardTitle>
            <CardDescription>Customer acquisition and retention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">New Clients (This Month)</span>
                <Badge className="bg-green-500 text-white">{analytics.clients.new_this_month}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Client Churn Rate</span>
                <Badge variant="secondary">{((analytics.clients.churned_this_month / analytics.clients.total) * 100).toFixed(1)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Onboarding Time</span>
                <Badge variant="secondary">{analytics.performance.avg_onboarding_time} days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Client Satisfaction</span>
                <Badge className="bg-green-500 text-white">
                  {analytics.performance.client_satisfaction}/5.0
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Revenue Projections</CardTitle>
            <CardDescription>Growth forecasts and targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">YTD Revenue</span>
                <span className="font-medium text-green-500">
                  ${analytics.revenue.ytd.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Year-End Projection</span>
                <span className="font-medium text-blue-500">
                  ${analytics.revenue.projection.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Growth to Target</span>
                <div className="flex items-center">
                  <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">
                    +{Math.round(((analytics.revenue.projection - analytics.revenue.ytd) / analytics.revenue.ytd) * 100)}%
                  </span>
                </div>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${(analytics.revenue.ytd / analytics.revenue.projection) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-400 text-center">
                {Math.round((analytics.revenue.ytd / analytics.revenue.projection) * 100)}% of year target
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Critical business metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Monthly Recurring Revenue</span>
                <span className="font-medium text-green-500">
                  ${analytics.revenue.current_month.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Average Revenue Per User</span>
                <span className="font-medium text-blue-500">
                  ${Math.round(analytics.revenue.current_month / analytics.clients.total)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Cost Per Acquisition</span>
                <span className="font-medium text-purple-500">$127</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Payback Period</span>
                <span className="font-medium text-orange-500">2.1 months</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Service Performance Analysis</CardTitle>
          <CardDescription>Detailed breakdown of each service offering</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-2">Service</th>
                  <th className="text-center py-3 px-2">Clients</th>
                  <th className="text-center py-3 px-2">Revenue</th>
                  <th className="text-center py-3 px-2">Growth</th>
                  <th className="text-center py-3 px-2">Performance</th>
                </tr>
              </thead>
              <tbody>
                {topServices.map((service, i) => (
                  <tr key={service.name} className="border-b border-gray-800">
                    <td className="py-4 px-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">#{i + 1}</Badge>
                        <span className="font-medium">{service.name}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2">
                      <div className="flex items-center justify-center">
                        <Users className="h-4 w-4 mr-1 text-blue-500" />
                        <span>{service.clients}</span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-2">
                      <span className="font-medium text-green-500">
                        ${service.revenue.toLocaleString()}
                      </span>
                    </td>
                    <td className="text-center py-4 px-2">
                      <div className="flex items-center justify-center">
                        {service.growth > 0 ? (
                          <>
                            <ArrowUp className="h-3 w-3 mr-1 text-green-500" />
                            <span className="text-green-500">+{service.growth}%</span>
                          </>
                        ) : (
                          <>
                            <ArrowDown className="h-3 w-3 mr-1 text-red-500" />
                            <span className="text-red-500">{service.growth}%</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="text-center py-4 px-2">
                      <Badge 
                        className={
                          service.growth > 15 
                            ? "bg-green-500/10 text-green-500 border-green-500"
                            : service.growth > 0
                            ? "bg-blue-500/10 text-blue-500 border-blue-500"
                            : "bg-red-500/10 text-red-500 border-red-500"
                        }
                      >
                        {service.growth > 15 ? 'Excellent' : service.growth > 0 ? 'Good' : 'Needs Attention'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Growth Insights</CardTitle>
            <CardDescription>Key growth opportunities and recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center mb-2">
                  <TrendingUp className="h-4 w-4 mr-2 text-green-500" />
                  <span className="font-medium text-green-500">High Growth Opportunity</span>
                </div>
                <p className="text-sm">TikTok Management is showing 45.8% growth. Consider expanding this service offering.</p>
              </div>
              
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center mb-2">
                  <Activity className="h-4 w-4 mr-2 text-yellow-500" />
                  <span className="font-medium text-yellow-500">Attention Needed</span>
                </div>
                <p className="text-sm">Google Ads Management showing -5.3% decline. Review pricing and competitive positioning.</p>
              </div>
              
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <div className="flex items-center mb-2">
                  <Users className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="font-medium text-blue-500">Client Retention</span>
                </div>
                <p className="text-sm">Excellent 94.2% retention rate. Current client satisfaction strategies are working well.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Action Items</CardTitle>
            <CardDescription>Recommended next steps based on data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href="/reseller/services?filter=growth">
                <TrendingUp className="h-4 w-4 mr-2" />
                Review High-Growth Services
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/clients?filter=at-risk">
                <AlertCircle className="h-4 w-4 mr-2" />
                Check At-Risk Clients
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/reports?type=monthly">
                <BarChart className="h-4 w-4 mr-2" />
                Generate Monthly Report
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/services/pricing">
                <DollarSign className="h-4 w-4 mr-2" />
                Review Pricing Strategy
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}