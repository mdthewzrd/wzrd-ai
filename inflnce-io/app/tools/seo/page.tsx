import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, BarChart, Target, Zap, TrendingUp, Globe } from "lucide-react"
import Link from "next/link"

export default function SEOPage() {
  const services = [
    {
      id: 1,
      title: "SEO Audit & Strategy",
      description: "Comprehensive analysis of your website's SEO performance with actionable recommendations",
      price: "$299",
      features: ["Technical SEO analysis", "Keyword research", "Competitor analysis", "Custom strategy plan"],
      popular: true
    },
    {
      id: 2,
      title: "Local SEO Optimization",
      description: "Optimize your business for local search results and Google My Business",
      price: "$199",
      features: ["Google My Business optimization", "Local citations", "Review management", "Local keyword targeting"],
      popular: false
    },
    {
      id: 3,
      title: "Content SEO Package",
      description: "SEO-optimized content creation and existing content optimization",
      price: "$399",
      features: ["SEO content writing", "On-page optimization", "Meta descriptions", "Schema markup"],
      popular: false
    },
    {
      id: 4,
      title: "Link Building Campaign",
      description: "High-quality backlink acquisition from authoritative websites",
      price: "$499",
      features: ["Authority link building", "Guest posting", "Outreach campaigns", "Monthly reporting"],
      popular: false
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-orange-500 to-red-500 rounded-full">
            <Search className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">SEO Tools & Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Boost your website's visibility and rankings with our professional SEO tools and optimization services.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
        {services.map((service) => (
          <Card key={service.id} className={`relative ${service.popular ? 'ring-2 ring-green-500' : ''}`}>
            {service.popular && (
              <Badge className="absolute -top-3 left-6 bg-green-500 text-white">
                Most Popular
              </Badge>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {service.title}
                <span className="text-2xl font-bold text-orange-500">{service.price}</span>
              </CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                Get Started
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center">
          <CardHeader>
            <BarChart className="h-10 w-10 mx-auto mb-4 text-orange-500" />
            <CardTitle>Data-Driven Results</CardTitle>
            <CardDescription>All strategies backed by comprehensive analytics and performance data</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Target className="h-10 w-10 mx-auto mb-4 text-red-500" />
            <CardTitle>Targeted Keywords</CardTitle>
            <CardDescription>Strategic keyword research and optimization for maximum impact</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <TrendingUp className="h-10 w-10 mx-auto mb-4 text-orange-600" />
            <CardTitle>Ranking Improvement</CardTitle>
            <CardDescription>Proven techniques to boost your search engine rankings</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Improve Your SEO?</h2>
          <p className="text-muted-foreground mb-6">
            Join hundreds of businesses that have improved their search rankings with our professional SEO services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
              Start SEO Audit
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/tools">
                Browse All Tools
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}