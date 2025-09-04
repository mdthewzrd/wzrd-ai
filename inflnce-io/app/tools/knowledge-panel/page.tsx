import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, Award, Users, Globe, TrendingUp, Star } from "lucide-react"
import Link from "next/link"

export default function KnowledgePanelPage() {
  const services = [
    {
      id: 1,
      title: "Personal Knowledge Panel",
      description: "Establish your personal brand with a Google Knowledge Panel",
      price: "$1,999",
      features: ["Identity verification", "Brand establishment", "Authority building", "Ongoing monitoring"],
      popular: true
    },
    {
      id: 2,
      title: "Business Knowledge Panel",
      description: "Create a professional business presence on Google search results",
      price: "$2,499",
      features: ["Business verification", "Entity creation", "Review management", "Local optimization"],
      popular: false
    },
    {
      id: 3,
      title: "Knowledge Panel Optimization",
      description: "Enhance and optimize your existing Knowledge Panel",
      price: "$999",
      features: ["Content enhancement", "Image optimization", "Information updates", "Performance tracking"],
      popular: false
    },
    {
      id: 4,
      title: "Knowledge Panel Recovery",
      description: "Restore or fix issues with your existing Knowledge Panel",
      price: "$1,499",
      features: ["Issue diagnosis", "Recovery strategy", "Technical fixes", "Prevention measures"],
      popular: false
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full">
            <Brain className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Knowledge Panel Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Establish your authority and enhance your online presence with a Google Knowledge Panel that showcases your expertise.
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
                <span className="text-2xl font-bold text-green-500">{service.price}</span>
              </CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                Get Panel
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center">
          <CardHeader>
            <Award className="h-10 w-10 mx-auto mb-4 text-green-500" />
            <CardTitle>Build Authority</CardTitle>
            <CardDescription>Establish credibility and trust with your audience</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <TrendingUp className="h-10 w-10 mx-auto mb-4 text-emerald-500" />
            <CardTitle>Increase Visibility</CardTitle>
            <CardDescription>Stand out in Google search results with rich information</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Star className="h-10 w-10 mx-auto mb-4 text-green-600" />
            <CardTitle>Professional Presence</CardTitle>
            <CardDescription>Create a polished, professional online identity</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Establish Your Authority?</h2>
          <p className="text-muted-foreground mb-6">
            Join industry leaders who have enhanced their online presence with a professional Knowledge Panel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              Start Process
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