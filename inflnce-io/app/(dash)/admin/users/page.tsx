"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trash2, Edit, Plus, Search, Users, Crown, Briefcase, User, UserCheck, UserX, Building2, Calendar } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { getAllUsers, createUser, updateUser, deleteUser } from "@/lib/data-store"
import { UserProfile, UserRole } from "@/lib/auth-dev"
import { AnimatedPageWrapper, FadeInSection, ScaleOnHover } from "@/components/animated-page-wrapper"

export default function AdminUsersPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <UsersContent />
    </ProtectedRoute>
  )
}

function UsersContent() {
  const [users, setUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    role: "client" as UserRole
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    const userData = await getAllUsers()
    setUsers(userData)
    setLoading(false)
  }

  const handleAddUser = async () => {
    if (!formData.email || !formData.name) return
    
    await createUser({
      email: formData.email,
      name: formData.name,
      role: formData.role,
      avatar_url: null,
      tenant_id: 'inflnce-main',
      permissions: getDefaultPermissions(formData.role)
    })
    
    setFormData({ email: "", name: "", role: "client" })
    setShowAddForm(false)
    loadUsers()
  }

  const handleUpdateUser = async () => {
    if (!editingUser) return
    
    await updateUser(editingUser.id, {
      name: formData.name,
      role: formData.role,
      permissions: getDefaultPermissions(formData.role)
    })
    
    setEditingUser(null)
    setFormData({ email: "", name: "", role: "client" })
    loadUsers()
  }

  const handleDeleteUser = async (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      await deleteUser(id)
      loadUsers()
    }
  }

  const getDefaultPermissions = (role: UserRole): string[] => {
    switch (role) {
      case 'admin':
        return ['manage_users', 'manage_services', 'view_analytics']
      case 'reseller':
        return ['manage_clients', 'view_services']
      case 'client':
        return ['view_services']
      default:
        return []
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="h-4 w-4 text-yellow-500" />
      case 'reseller':
        return <Briefcase className="h-4 w-4 text-blue-500" />
      case 'client':
        return <User className="h-4 w-4 text-green-500" />
      default:
        return <User className="h-4 w-4 text-gray-500" />
    }
  }

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500"
      case 'reseller':
        return "bg-blue-500/10 text-blue-500 border-blue-500"
      case 'client':
        return "bg-green-500/10 text-green-500 border-green-500"
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500"
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  const roleStats = {
    admin: users.filter(u => u.role === 'admin').length,
    reseller: users.filter(u => u.role === 'reseller').length,
    client: users.filter(u => u.role === 'client').length,
    total: users.length
  }

  return (
    <AnimatedPageWrapper className="container mx-auto p-6 space-y-6">
      <FadeInSection>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-purple-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">User Management</h1>
              <p className="text-gray-400">Manage user accounts and permissions</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </FadeInSection>

      {/* Stats Cards */}
      <FadeInSection delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Users</CardTitle>
              <Users className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{roleStats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Admins</CardTitle>
              <Crown className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">{roleStats.admin}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Resellers</CardTitle>
              <Briefcase className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-500">{roleStats.reseller}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Clients</CardTitle>
              <User className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{roleStats.client}</div>
            </CardContent>
          </Card>
        </div>
      </FadeInSection>

      {/* Search and Filters */}
      <FadeInSection delay={0.2}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="reseller">Reseller</SelectItem>
                  <SelectItem value="client">Client</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* Add/Edit User Form */}
      {(showAddForm || editingUser) && (
        <FadeInSection>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">
                {editingUser ? 'Edit User' : 'Add New User'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-200">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!!editingUser}
                    placeholder="user@example.com"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="John Doe"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-gray-200">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value: UserRole) => setFormData(prev => ({ ...prev, role: value }))}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-900 border-gray-700">
                    <SelectItem value="client">Client</SelectItem>
                    <SelectItem value="reseller">Reseller</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <Button 
                  onClick={editingUser ? handleUpdateUser : handleAddUser}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {editingUser ? 'Update User' : 'Create User'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingUser(null)
                    setFormData({ email: "", name: "", role: "client" })
                  }}
                  className="border-gray-700 text-gray-300 hover:bg-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </FadeInSection>
      )}

      {/* Users Table */}
      <FadeInSection delay={0.4}>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">All Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading users...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-300">User</TableHead>
                    <TableHead className="text-gray-300">Role</TableHead>
                    <TableHead className="text-gray-300">Created</TableHead>
                    <TableHead className="text-gray-300 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={`https://avatar.vercel.sh/${user.email}`} />
                            <AvatarFallback className="bg-gray-800 text-white">
                              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-white">{user.name}</div>
                            <div className="text-sm text-gray-400">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          {getRoleIcon(user.role)}
                          <Badge className={getRoleBadgeColor(user.role)}>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-300">
                            {user.created_at}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingUser(user)
                              setFormData({
                                email: user.email,
                                name: user.name,
                                role: user.role
                              })
                            }}
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="border-red-700 text-red-400 hover:bg-red-900/20"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
            
            {!loading && filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No users found matching your search.
              </div>
            )}
          </CardContent>
        </Card>
      </FadeInSection>
    </AnimatedPageWrapper>
  )
}