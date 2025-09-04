"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ProtectedRoute } from "@/components/protected-route" 
import { 
  FileEdit, 
  Settings, 
  Mail, 
  Database,
  Video,
  BarChart,
  Globe,
  PlusCircle
} from "lucide-react"
import Link from "next/link"

export default function AdminContentManagementPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Content Management</h1>
            <p className="text-gray-400">Manage all site content and configurations</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Site Pages */}
          <Card className="bg-gray-900 border-purple-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/20 rounded-lg">
                  <FileEdit className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <CardTitle className="text-purple-400">Site Pages</CardTitle>
                  <CardDescription>Manage homepage, service pages, and site content</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-purple-600/10 border-purple-500/30 text-purple-300 hover:bg-purple-600/20">
                Edit Pages
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
                Homepage Settings
              </Button>
            </CardContent>
          </Card>

          {/* Services & Pricing */}
          <Card className="bg-gray-900 border-blue-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600/20 rounded-lg">
                  <Settings className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-blue-400">Services & Pricing</CardTitle>
                  <CardDescription>Configure service offerings and pricing tiers</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/services">
                <Button variant="outline" className="w-full justify-start bg-blue-600/10 border-blue-500/30 text-blue-300 hover:bg-blue-600/20">
                  Manage Services
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
                Edit Pricing
              </Button>
            </CardContent>
          </Card>

          {/* Text & Copy */}
          <Card className="bg-gray-900 border-green-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600/20 rounded-lg">
                  <Mail className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <CardTitle className="text-green-400">Text & Copy</CardTitle>
                  <CardDescription>Edit site copy, descriptions, and messaging</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-green-600/10 border-green-500/30 text-green-300 hover:bg-green-600/20">
                Edit Copy
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
                Email Templates
              </Button>
            </CardContent>
          </Card>

          {/* Publications DB */}
          <Card className="bg-gray-900 border-orange-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-600/20 rounded-lg">
                  <Database className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <CardTitle className="text-orange-400">Publications DB</CardTitle>
                  <CardDescription>Manage publication database and partnerships</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-orange-600/10 border-orange-500/30 text-orange-300 hover:bg-orange-600/20">
                Manage Publications
              </Button>
              <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Publication
              </Button>
            </CardContent>
          </Card>

          {/* TikTok Services */}
          <Card className="bg-gray-900 border-pink-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-600/20 rounded-lg">
                  <Video className="h-6 w-6 text-pink-400" />
                </div>
                <div>
                  <CardTitle className="text-pink-400">TikTok Services</CardTitle>
                  <CardDescription>Configure TikTok service offerings and packages</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-pink-600/10 border-pink-500/30 text-pink-300 hover:bg-pink-600/20">
                TikTok Config
              </Button>
              <Link href="/social-media">
                <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
                  All Social
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Analytics & Reports */}
          <Card className="bg-gray-900 border-yellow-500/30">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-600/20 rounded-lg">
                  <BarChart className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <CardTitle className="text-yellow-400">Analytics & Reports</CardTitle>
                  <CardDescription>Platform analytics and performance reports</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/reseller/analytics">
                <Button variant="outline" className="w-full justify-start bg-yellow-600/10 border-yellow-500/30 text-yellow-300 hover:bg-yellow-600/20">
                  View Analytics
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800">
                Generate Reports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Live Editing Notice */}
        <Card className="bg-gray-900 border-gray-800 mt-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-500" />
              Live Content Management
            </CardTitle>
            <CardDescription>
              Edit site content in real-time while browsing the live site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
              <p className="text-green-300 text-sm">
                <strong>Live Editing Mode:</strong> When enabled, you can click on any text or content element 
                while browsing the site to edit it in real-time. Changes are automatically saved and reflected 
                immediately across the platform.
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <Button className="bg-green-600 hover:bg-green-700">
                Enable Live Editing
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                View Tutorial
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}