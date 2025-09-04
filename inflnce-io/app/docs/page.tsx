"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Search, BookOpen, Users, Settings, BarChart, HelpCircle, Download } from "lucide-react"
import Link from "next/link"

export default function DocumentationPage() {
  const documentationSections = [
    {
      title: "Getting Started",
      icon: BookOpen,
      description: "Quick start guide and basic setup",
      articles: [
        { title: "Platform Overview", time: "5 min read", new: true },
        { title: "Setting Up Your Account", time: "10 min read", new: false },
        { title: "First Campaign Setup", time: "15 min read", new: true },
        { title: "Understanding Pricing", time: "8 min read", new: false }
      ],
      color: "bg-blue-600"
    },
    {
      title: "User Management",
      icon: Users,
      description: "Managing users, roles, and permissions",
      articles: [
        { title: "User Roles Explained", time: "7 min read", new: false },
        { title: "Adding Team Members", time: "5 min read", new: false },
        { title: "Permission Settings", time: "12 min read", new: true },
        { title: "Client Management", time: "10 min read", new: false }
      ],
      color: "bg-green-600"
    },
    {
      title: "Services & Campaigns", 
      icon: Settings,
      description: "Campaign management and service configuration",
      articles: [
        { title: "Creating Services", time: "8 min read", new: false },
        { title: "Campaign Optimization", time: "15 min read", new: true },
        { title: "Pricing Strategies", time: "12 min read", new: false },
        { title: "Performance Tracking", time: "10 min read", new: true }
      ],
      color: "bg-purple-600"
    },
    {
      title: "Analytics & Reports",
      icon: BarChart,
      description: "Understanding metrics and generating reports",
      articles: [
        { title: "Dashboard Analytics", time: "6 min read", new: false },
        { title: "Custom Reports", time: "9 min read", new: true },
        { title: "Export Options", time: "4 min read", new: false },
        { title: "Performance Insights", time: "11 min read", new: false }
      ],
      color: "bg-orange-600"
    }
  ]

  const quickLinks = [
    { title: "API Documentation", href: "/docs/api", icon: FileText },
    { title: "Video Tutorials", href: "/docs/videos", icon: BookOpen },
    { title: "FAQ", href: "/docs/faq", icon: HelpCircle },
    { title: "Download Resources", href: "/docs/downloads", icon: Download }
  ]

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Documentation</h1>
          <p className="text-gray-400">Everything you need to know about using inflnce</p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documentation..."
            className="bg-gray-800 border-gray-700 pl-10 text-white"
          />
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {quickLinks.map((link, index) => (
          <Link key={index} href={link.href}>
            <Card className="bg-gray-900 border-gray-800 hover:border-green-600 transition-colors cursor-pointer">
              <CardContent className="flex items-center gap-3 p-4">
                <link.icon className="h-5 w-5 text-green-500" />
                <span className="text-white font-medium">{link.title}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Documentation Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {documentationSections.map((section, index) => (
          <Card key={index} className="bg-gray-900 border-gray-800">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${section.color}`}>
                  <section.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">{section.title}</CardTitle>
                  <CardDescription className="text-gray-400">
                    {section.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {section.articles.map((article, articleIndex) => (
                <div
                  key={articleIndex}
                  className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{article.title}</span>
                        {article.new && (
                          <Badge className="bg-green-500 text-white text-xs">NEW</Badge>
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{article.time}</span>
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                View All Articles
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Help Section */}
      <Card className="bg-gray-900 border-gray-800 mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <HelpCircle className="h-5 w-5 text-orange-500" />
            Need Additional Help?
          </CardTitle>
          <CardDescription>
            Can't find what you're looking for? Our support team is here to help.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button className="bg-orange-600 hover:bg-orange-700">
            Contact Support
          </Button>
          <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
            Schedule Demo
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}