"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Trash2, Edit, Plus, Search, Package, DollarSign, Globe, Check, X } from "lucide-react"
import { ProtectedRoute } from "@/components/protected-route"
import { getAllServices, createService, updateService, deleteService, Service } from "@/lib/data-store"
import { AnimatedPageWrapper, FadeInSection, ScaleOnHover } from "@/components/animated-page-wrapper"

export default function AdminServicesPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <ServicesContent />
    </ProtectedRoute>
  )
}

function ServicesContent() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    category: "",
    platform: "",
    active: true,
    stripe_link: "",
    service_type: "social" as 'tools' | 'campaigns' | 'subscriptions' | 'social'
  })

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    setLoading(true)
    const serviceData = await getAllServices()
    setServices(serviceData)
    setLoading(false)
  }

  const handleAddService = async () => {
    if (!formData.name || !formData.description || formData.price <= 0) return
    
    await createService({
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      platform: formData.platform,
      active: formData.active,
      stripe_link: formData.stripe_link,
      service_type: formData.service_type
    })
    
    resetForm()
    setShowAddForm(false)
    loadServices()
  }

  const handleUpdateService = async () => {
    if (!editingService) return
    
    await updateService(editingService.id, {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: formData.category,
      platform: formData.platform,
      active: formData.active,
      stripe_link: formData.stripe_link,
      service_type: formData.service_type
    })
    
    setEditingService(null)
    resetForm()
    loadServices()
  }

  const handleDeleteService = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(id)
      loadServices()
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "",
      platform: "",
      active: true,
      stripe_link: "",
      service_type: "social"
    })
  }

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || service.category === categoryFilter
    const matchesPlatform = platformFilter === "all" || service.platform === platformFilter
    return matchesSearch && matchesCategory && matchesPlatform
  })

  const categories = [...new Set(services.map(s => s.category).filter(Boolean))]
  const platforms = [...new Set(services.map(s => s.platform).filter(Boolean))]

  const serviceStats = {
    total: services.length,
    active: services.filter(s => s.active).length,
    inactive: services.filter(s => !s.active).length,
    avgPrice: services.length > 0 ? (services.reduce((sum, s) => sum + s.price, 0) / services.length) : 0
  }

  return (
    <AnimatedPageWrapper className="container mx-auto p-6 space-y-6">
      <FadeInSection>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-purple-500" />
            <div>
              <h1 className="text-3xl font-bold text-white">Service Management</h1>
              <p className="text-gray-400">Manage service offerings and pricing</p>
            </div>
          </div>
          <Button 
            onClick={() => setShowAddForm(true)}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </FadeInSection>

      {/* Stats Cards */}
      <FadeInSection delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Services</CardTitle>
              <Package className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{serviceStats.total}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Active</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{serviceStats.active}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Inactive</CardTitle>
              <X className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{serviceStats.inactive}</div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Avg Price</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">${serviceStats.avgPrice.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>
      </FadeInSection>

      {/* Search and Filters */}
      <FadeInSection delay={0.2}>
        <Card className="bg-gray-900 border-gray-800">
          <CardContent className="pt-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 bg-gray-800 border-gray-700 text-white"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="all">All Platforms</SelectItem>
                  {platforms.map(platform => (
                    <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </FadeInSection>

      {/* Add/Edit Service Form */}
      {(showAddForm || editingService) && (
        <FadeInSection>
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-200">Service Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="1,000 Instagram Followers"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-200">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) || 0 }))}
                    placeholder="25.99"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-200">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    placeholder="followers, likes, views"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="platform" className="text-gray-200">Platform</Label>
                  <Input
                    id="platform"
                    value={formData.platform}
                    onChange={(e) => setFormData(prev => ({ ...prev, platform: e.target.value }))}
                    placeholder="tiktok, instagram, facebook"
                    className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-200">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe the service offering..."
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stripe_link" className="text-gray-200">Stripe Payment Link</Label>
                <Input
                  id="stripe_link"
                  value={formData.stripe_link}
                  onChange={(e) => setFormData(prev => ({ ...prev, stripe_link: e.target.value }))}
                  placeholder="https://buy.stripe.com/your-product-link"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="service_type" className="text-gray-200">Service Type</Label>
                <Select value={formData.service_type} onValueChange={(value: 'tools' | 'campaigns' | 'subscriptions' | 'social') => setFormData(prev => ({ ...prev, service_type: value }))}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                    <SelectItem value="campaigns">Campaigns</SelectItem>
                    <SelectItem value="subscriptions">Subscriptions</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                />
                <Label className="text-gray-200">Service Active</Label>
              </div>

              <div className="flex space-x-2">
                <Button 
                  onClick={editingService ? handleUpdateService : handleAddService}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {editingService ? 'Update Service' : 'Create Service'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingService(null)
                    resetForm()
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

      {/* Services Table */}
      <FadeInSection delay={0.4}>
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">All Services ({filteredServices.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-gray-400">Loading services...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-300">Service</TableHead>
                    <TableHead className="text-gray-300">Platform</TableHead>
                    <TableHead className="text-gray-300">Category</TableHead>
                    <TableHead className="text-gray-300">Type</TableHead>
                    <TableHead className="text-gray-300">Price</TableHead>
                    <TableHead className="text-gray-300">Stripe Link</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.map((service) => (
                    <TableRow key={service.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell>
                        <div>
                          <div className="font-medium text-white">{service.name}</div>
                          <div className="text-sm text-gray-400">{service.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-300 capitalize">{service.platform || 'General'}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-blue-400 border-blue-400">
                          {service.category || 'General'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-purple-400 border-purple-400">
                          {service.service_type || 'social'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="text-green-500 font-medium">{service.price.toFixed(2)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {service.stripe_link ? (
                          <a
                            href={service.stripe_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-400 hover:text-orange-300 underline text-sm"
                          >
                            View Link
                          </a>
                        ) : (
                          <span className="text-gray-500 text-sm">No link</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          className={
                            service.active 
                              ? "bg-green-500/10 text-green-500 border-green-500"
                              : "bg-red-500/10 text-red-500 border-red-500"
                          }
                        >
                          {service.active ? (
                            <>
                              <Check className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <X className="h-3 w-3 mr-1" />
                              Inactive
                            </>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setEditingService(service)
                              setFormData({
                                name: service.name,
                                description: service.description,
                                price: service.price,
                                category: service.category,
                                platform: service.platform || "",
                                active: service.active,
                                stripe_link: service.stripe_link || "",
                                service_type: service.service_type || "social"
                              })
                            }}
                            className="border-gray-700 text-gray-300 hover:bg-gray-800"
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteService(service.id)}
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
            
            {!loading && filteredServices.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No services found matching your search.
              </div>
            )}
          </CardContent>
        </Card>
      </FadeInSection>
    </AnimatedPageWrapper>
  )
}