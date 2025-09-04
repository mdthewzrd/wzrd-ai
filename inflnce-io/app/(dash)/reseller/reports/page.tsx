import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { requireReseller } from "@/lib/auth-dev"
import Link from "next/link"
import {
  FileText,
  Download,
  Calendar,
  BarChart,
  PieChart,
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Clock,
  Mail,
  Printer,
  Share
} from "lucide-react"

export default async function ResellerReportsPage() {
  const { profile } = await requireReseller()
  
  // Mock reports data
  const availableReports = [
    {
      id: 'monthly-revenue',
      name: 'Monthly Revenue Report',
      description: 'Detailed breakdown of monthly revenue by service and client',
      category: 'Financial',
      last_generated: '2024-12-29',
      format: ['PDF', 'Excel', 'CSV'],
      icon: DollarSign,
      color: 'green'
    },
    {
      id: 'client-performance',
      name: 'Client Performance Report',
      description: 'Client acquisition, retention, and value analysis',
      category: 'Client Management',
      last_generated: '2024-12-28',
      format: ['PDF', 'Excel'],
      icon: Users,
      color: 'blue'
    },
    {
      id: 'service-analytics',
      name: 'Service Analytics Report',
      description: 'Performance metrics for each service offering',
      category: 'Operations',
      last_generated: '2024-12-27',
      format: ['PDF', 'PowerPoint'],
      icon: Package,
      color: 'purple'
    },
    {
      id: 'growth-trends',
      name: 'Growth Trends Report',
      description: 'Historical growth data and future projections',
      category: 'Strategic',
      last_generated: '2024-12-26',
      format: ['PDF', 'Excel'],
      icon: TrendingUp,
      color: 'orange'
    },
    {
      id: 'billing-summary',
      name: 'Billing & Collections Report',
      description: 'Payment status, failed transactions, and collections',
      category: 'Financial',
      last_generated: '2024-12-25',
      format: ['PDF', 'Excel', 'CSV'],
      icon: BarChart,
      color: 'cyan'
    },
    {
      id: 'operational-metrics',
      name: 'Operational Metrics Report',
      description: 'Service delivery, support tickets, and operational KPIs',
      category: 'Operations',
      last_generated: '2024-12-24',
      format: ['PDF'],
      icon: Clock,
      color: 'indigo'
    }
  ]

  const reportCategories = [...new Set(availableReports.map(r => r.category))]
  
  const quickStats = {
    reports_generated_month: 24,
    automated_reports: 8,
    custom_reports: 3,
    avg_generation_time: 2.3
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Reports Center</h1>
          <p className="text-gray-400 mt-2">Generate and download business reports and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/reseller/reports/schedule">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Reports
            </Link>
          </Button>
          <Button asChild>
            <Link href="/reseller/reports/custom">
              <FileText className="h-4 w-4 mr-2" />
              Custom Report
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-400">Reports This Month</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{quickStats.reports_generated_month}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-400">Automated Reports</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{quickStats.automated_reports}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-400">Custom Reports</CardTitle>
            <PieChart className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">{quickStats.custom_reports}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-400">Avg Gen Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{quickStats.avg_generation_time}s</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {reportCategories.map(category => {
          const categoryReports = availableReports.filter(r => r.category === category)
          
          return (
            <Card key={category} className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-green-500">{category} Reports</CardTitle>
                <CardDescription>{categoryReports.length} available reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryReports.map((report) => {
                    const IconComponent = report.icon
                    
                    return (
                      <div key={report.id} className="p-3 bg-gray-800 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <IconComponent className={`h-4 w-4 text-${report.color}-500`} />
                            <span className="font-medium text-sm">{report.name}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {report.format.length} formats
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-400 mb-3">{report.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-400">
                          <span>Last: {report.last_generated}</span>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              <Download className="h-3 w-3" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 px-2">
                              <Mail className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Generate New Report</CardTitle>
          <CardDescription>Create custom reports with specific parameters</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Report Type</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Analysis</SelectItem>
                  <SelectItem value="client">Client Performance</SelectItem>
                  <SelectItem value="service">Service Metrics</SelectItem>
                  <SelectItem value="growth">Growth Analysis</SelectItem>
                  <SelectItem value="operational">Operational Summary</SelectItem>
                  <SelectItem value="custom">Custom Report</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Time Period</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="6m">Last 6 Months</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Output Format</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF Document</SelectItem>
                  <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                  <SelectItem value="csv">CSV Data</SelectItem>
                  <SelectItem value="powerpoint">PowerPoint Slides</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-end">
              <Button className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Scheduled Reports</CardTitle>
            <CardDescription>Automatically generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">Weekly Revenue Summary</p>
                  <p className="text-sm text-gray-400">Every Monday at 9:00 AM</p>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">Monthly Client Report</p>
                  <p className="text-sm text-gray-400">1st of every month</p>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">Quarterly Business Review</p>
                  <p className="text-sm text-gray-400">End of each quarter</p>
                </div>
                <Badge className="bg-green-500/10 text-green-500 border-green-500">Active</Badge>
              </div>
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link href="/reseller/reports/schedule">
                Manage Schedules
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Recent Downloads</CardTitle>
            <CardDescription>Your latest report downloads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">December 2024 Revenue</p>
                  <p className="text-sm text-gray-400">Downloaded 2 hours ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">PDF</Badge>
                  <Button size="sm" variant="ghost">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">Client Performance Q4</p>
                  <p className="text-sm text-gray-400">Downloaded yesterday</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Excel</Badge>
                  <Button size="sm" variant="ghost">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div>
                  <p className="font-medium">Service Analytics Nov</p>
                  <p className="text-sm text-gray-400">Downloaded 3 days ago</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">PDF</Badge>
                  <Button size="sm" variant="ghost">
                    <Download className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle>Report Library</CardTitle>
          <CardDescription>All available reports and templates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableReports.map((report) => {
              const IconComponent = report.icon
              
              return (
                <Card key={report.id} className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-2 bg-${report.color}-500/10 rounded-lg`}>
                        <IconComponent className={`h-5 w-5 text-${report.color}-500`} />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {report.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{report.name}</CardTitle>
                    <CardDescription className="text-sm">{report.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Last generated:</span>
                        <span>{report.last_generated}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {report.format.map(format => (
                          <Badge key={format} variant="secondary" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button size="sm" className="w-full">
                          <Download className="h-3 w-3 mr-1" />
                          Generate
                        </Button>
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <Share className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Pre-built report configurations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full justify-start">
              <Link href="/reseller/reports/templates/executive">
                <BarChart className="h-4 w-4 mr-2" />
                Executive Summary Template
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/reports/templates/financial">
                <DollarSign className="h-4 w-4 mr-2" />
                Financial Performance Template
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/reports/templates/client">
                <Users className="h-4 w-4 mr-2" />
                Client Analysis Template
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/reseller/reports/templates/operational">
                <Package className="h-4 w-4 mr-2" />
                Operational Report Template
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle>Export & Share</CardTitle>
            <CardDescription>Report distribution options</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <Download className="h-4 w-4 mr-2 text-blue-500" />
                  <span className="text-sm">Direct Download</span>
                </div>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm">Email Delivery</span>
                </div>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <Share className="h-4 w-4 mr-2 text-purple-500" />
                  <span className="text-sm">Client Portal Share</span>
                </div>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center">
                  <Printer className="h-4 w-4 mr-2 text-orange-500" />
                  <span className="text-sm">Print-Ready Format</span>
                </div>
                <Button size="sm" variant="outline">Configure</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}