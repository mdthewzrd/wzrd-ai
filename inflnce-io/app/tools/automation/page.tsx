import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Settings, Bot, Workflow, Zap, Clock, Cpu } from "lucide-react"
import Link from "next/link"

export default function AutomationPage() {
  const services = [
    {
      id: 1,
      title: "Workflow Automation",
      description: "Automate repetitive tasks and streamline your business processes",
      price: "$399",
      features: ["Custom workflows", "Task automation", "Email integration", "Performance tracking"],
      popular: true
    },
    {
      id: 2,
      title: "Social Media Automation",
      description: "Schedule and automate your social media posts across all platforms",
      price: "$199",
      features: ["Multi-platform posting", "Content scheduling", "Analytics dashboard", "Auto-engagement"],
      popular: false
    },
    {
      id: 3,
      title: "Email Marketing Automation",
      description: "Automated email campaigns with personalized content and targeting",
      price: "$299",
      features: ["Drip campaigns", "Segmentation", "A/B testing", "Performance analytics"],
      popular: false
    },
    {
      id: 4,
      title: "Lead Generation Bot",
      description: "AI-powered chatbot for automatic lead capture and qualification",
      price: "$599",
      features: ["24/7 availability", "Lead qualification", "CRM integration", "Custom responses"],
      popular: false
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full">
            <Settings className="h-12 w-12 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">Automation Tools</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Streamline your workflow and boost productivity with our advanced automation solutions that save time and increase efficiency.
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
                <span className="text-2xl font-bold text-purple-500">{service.price}</span>
              </CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
                Automate Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center">
          <CardHeader>
            <Clock className="h-10 w-10 mx-auto mb-4 text-purple-500" />
            <CardTitle>Save Time</CardTitle>
            <CardDescription>Automate repetitive tasks and focus on what matters most</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Bot className="h-10 w-10 mx-auto mb-4 text-violet-500" />
            <CardTitle>AI-Powered</CardTitle>
            <CardDescription>Smart automation that learns and adapts to your business</CardDescription>
          </CardHeader>
        </Card>

        <Card className="text-center">
          <CardHeader>
            <Workflow className="h-10 w-10 mx-auto mb-4 text-purple-600" />
            <CardTitle>Custom Workflows</CardTitle>
            <CardDescription>Tailored automation solutions for your specific needs</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-violet-900/20 border-purple-500/30">
        <CardContent className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Automate Your Business?</h2>
          <p className="text-muted-foreground mb-6">
            Join thousands of businesses that have transformed their operations with our automation tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700">
              Get Started
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