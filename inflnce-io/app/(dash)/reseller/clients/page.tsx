import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { requireReseller } from "@/lib/auth-dev"
import Link from "next/link"
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  DollarSign,
  Calendar,
  Building,
  Mail,
  Phone
} from "lucide-react"

export default async function ResellerClientsPage() {
  const { profile } = await requireReseller()
  
  // Mock data for demonstration
  const clients = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@smithenterprises.com',
      phone: '+1 (555) 123-4567',
      company: 'Smith Enterprises',
      status: 'active',
      monthly_value: 899,
      total_spent: 8990,
      services_count: 3,
      created_at: '2024-01-15',
      last_activity: '2024-12-28'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@techcorp.com',
      phone: '+1 (555) 987-6543',
      company: 'TechCorp Solutions',
      status: 'active',
      monthly_value: 598,
      total_spent: 5380,
      services_count: 2,
      created_at: '2024-02-20',
      last_activity: '2024-12-27'
    },
    {
      id: '3',
      name: 'Mike Davis',
      email: 'mike@startupxyz.com',
      phone: '+1 (555) 456-7890',
      company: 'StartupXYZ',
      status: 'pending',
      monthly_value: 299,
      total_spent: 299,
      services_count: 1,
      created_at: '2024-12-01',
      last_activity: '2024-12-01'
    },
    {
      id: '4',
      name: 'Lisa Chen',
      email: 'lisa@creativestudio.com',
      phone: '+1 (555) 234-5678',
      company: 'Creative Studio',
      status: 'active',
      monthly_value: 1299,
      total_spent: 12990,
      services_count: 5,
      created_at: '2023-11-10',
      last_activity: '2024-12-29'
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david@localbizsuite.com',
      phone: '+1 (555) 345-6789',
      company: 'Local Biz Suite',
      status: 'suspended',
      monthly_value: 0,
      total_spent: 2990,
      services_count: 0,
      created_at: '2024-03-15',
      last_activity: '2024-11-15'
    }
  ]

  const totalClients = clients.length
  const activeClients = clients.filter(c => c.status === 'active').length
  const totalRevenue = clients.reduce((sum, c) => sum + c.total_spent, 0)

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-green-500">Client Management</h1>
          <p className="text-gray-400 mt-2">Manage your client relationships and accounts</p>
        </div>
        <Button asChild>
          <Link href="/reseller/clients/new">
            <Plus className="h-4 w-4 mr-2" />
            Add New Client
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-400">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{totalClients}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-500/10 to-green-600/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-400">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{activeClients}</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-400">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-500">${totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Client Directory</CardTitle>
              <CardDescription>Manage and view all your clients</CardDescription>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search clients..." className="pl-8 w-64" />
              </div>
              <Select>
                <SelectTrigger className="w-32">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Monthly Value</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Services</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-xs">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium">{client.name}</p>
                        <p className="text-sm text-gray-400 flex items-center">
                          <Building className="h-3 w-3 mr-1" />
                          {client.company}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <p className="text-sm flex items-center">
                        <Mail className="h-3 w-3 mr-1" />
                        {client.email}
                      </p>
                      <p className="text-sm text-gray-400 flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {client.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        client.status === 'active' 
                          ? "bg-green-500/10 text-green-500 border-green-500"
                          : client.status === 'pending'
                          ? "bg-yellow-500/10 text-yellow-500 border-yellow-500"
                          : "bg-red-500/10 text-red-500 border-red-500"
                      }
                    >
                      {client.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-green-500">
                      ${client.monthly_value}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      ${client.total_spent.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {client.services_count} services
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {client.last_activity}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/reseller/clients/${client.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="ghost" size="sm">
                        <Link href={`/reseller/clients/${client.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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