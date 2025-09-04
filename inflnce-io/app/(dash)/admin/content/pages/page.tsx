"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProtectedRoute } from "@/components/protected-route"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, Eye, Edit } from "lucide-react"
import Link from "next/link"

export default function AdminContentPagesPage() {
  const [editingPage, setEditingPage] = useState<string | null>(null)
  const [pageContent, setPageContent] = useState({
    homepage_hero_title: "inflnce",
    homepage_hero_subtitle: "Your complete social media marketing platform",
    homepage_hero_description: "Boost your social media presence with our comprehensive range of services.",
    social_media_title: "Social Media Services",
    social_media_description: "Boost your social media presence with our comprehensive range of services.",
    publications_title: "Publication Services", 
    publications_description: "Get featured in top publications and build your industry authority.",
    tiktok_title: "TikTok Services",
    tiktok_description: "Boost your TikTok presence with our premium services"
  })

  const pages = [
    {
      id: "homepage",
      name: "Homepage",
      status: "Published",
      lastModified: "2 hours ago"
    },
    {
      id: "social-media",
      name: "Social Media Services",
      status: "Published",
      lastModified: "1 day ago"
    },
    {
      id: "publications",
      name: "Publications",
      status: "Published", 
      lastModified: "3 days ago"
    },
    {
      id: "tiktok",
      name: "TikTok Services",
      status: "Published",
      lastModified: "5 hours ago"
    }
  ]

  const handleSave = (pageId: string) => {
    console.log(`Saving ${pageId} content:`, pageContent)
    setEditingPage(null)
    // In a real app, this would make an API call to save the content
  }

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin Dashboard
            </Link>
          </Button>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-purple-400">Content Management</h1>
          <p className="text-gray-400 mt-2">Edit site pages, content, and messaging</p>
        </div>

        {/* Pages List */}
        <div className="grid gap-4">
          {pages.map((page) => (
            <Card key={page.id} className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      {page.name}
                      <Badge className="bg-green-600/20 text-green-400 border-green-500/30">
                        {page.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>Last modified: {page.lastModified}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-blue-400 border-blue-500/50">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() => setEditingPage(editingPage === page.id ? null : page.id)}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      {editingPage === page.id ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              {editingPage === page.id && (
                <CardContent className="space-y-4 border-t border-gray-800 pt-6">
                  {/* Page-specific editing form */}
                  {page.id === "homepage" && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-gray-200">Hero Title</Label>
                        <Input
                          value={pageContent.homepage_hero_title}
                          onChange={(e) => setPageContent({...pageContent, homepage_hero_title: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-200">Hero Subtitle</Label>
                        <Input
                          value={pageContent.homepage_hero_subtitle}
                          onChange={(e) => setPageContent({...pageContent, homepage_hero_subtitle: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-200">Hero Description</Label>
                        <Textarea
                          value={pageContent.homepage_hero_description}
                          onChange={(e) => setPageContent({...pageContent, homepage_hero_description: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white"
                          rows={3}
                        />
                      </div>
                    </>
                  )}
                  
                  {page.id === "social-media" && (
                    <>
                      <div className="space-y-2">
                        <Label className="text-gray-200">Page Title</Label>
                        <Input
                          value={pageContent.social_media_title}
                          onChange={(e) => setPageContent({...pageContent, social_media_title: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-gray-200">Page Description</Label>
                        <Textarea
                          value={pageContent.social_media_description}
                          onChange={(e) => setPageContent({...pageContent, social_media_description: e.target.value})}
                          className="bg-gray-800 border-gray-700 text-white"
                          rows={3}
                        />
                      </div>
                    </>
                  )}

                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditingPage(null)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleSave(page.id)}
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-500/20">
          <CardHeader>
            <CardTitle className="text-purple-400">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button className="bg-purple-600 hover:bg-purple-700">
                Bulk Edit Services
              </Button>
              <Button variant="outline" className="border-blue-500/50 text-blue-400">
                Import Content
              </Button>
              <Button variant="outline" className="border-green-500/50 text-green-400">
                Export Content
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  )
}