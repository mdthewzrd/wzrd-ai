import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Code, Globe, Smartphone, Server, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function WebDevelopmentPage() {
  const services = [
    {
      id: 1,
      title: "Custom Website Development",
      description: "Full-stack web development with modern frameworks and responsive design",
      price: "$1,999",
      features: ["Custom design", "Responsive layout", "SEO optimized", "Performance optimized"],
      popular: true
    },
    {
      id: 2,
      title: "E-commerce Solutions",
      description: "Complete online store setup with payment integration and inventory management",
      price: "$2,999",
      features: ["Shopping cart", "Payment gateway", "Inventory system", "Admin dashboard"],
      popular: false
    },
    {
      id: 3,
      title: "Web Application Development",
      description: "Interactive web applications with advanced functionality and user management",
      price: "$3,999",
      features: ["User authentication", "Database integration", "API development", "Real-time features"],
      popular: false
    },
    {
      id: 4,
      title: "Website Maintenance",
      description: "Ongoing website updates, security patches, and performance monitoring",
      price: "$199/month",
      features: ["Regular updates", "Security monitoring", "Backup service", "Technical support"],
      popular: false
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
            <Code className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Web Development Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Custom web solutions designed to elevate your online presence with modern technology and best practices.
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
                <span className="text-2xl font-bold text-blue-500">{service.price}</span>
              </CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                Get Quote
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center">
          <CardHeader>
            <Smartphone className="h-10 w-10 mx-auto mb-4 text-blue-500" />
            <CardTitle>Mobile Responsive</CardTitle>
            <CardDescription>All websites optimized for perfect viewing on any device</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Zap className="h-10 w-10 mx-auto mb-4 text-indigo-500" />
            <CardTitle>Fast Performance</CardTitle>
            <CardDescription>Optimized for speed with cutting-edge performance techniques</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Shield className="h-10 w-10 mx-auto mb-4 text-blue-600" />
            <CardTitle>Secure & Reliable</CardTitle>
            <CardDescription>Built with security best practices and reliable hosting</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-indigo-900/20 border-blue-500/30">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your Website?</h2>
          <p className="text-muted-foreground mb-6">
            Transform your ideas into a powerful web presence with our expert development team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Start Project
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