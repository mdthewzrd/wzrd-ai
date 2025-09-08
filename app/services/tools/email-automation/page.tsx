import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Bot, MessageSquare, Zap } from "lucide-react";
import Link from "next/link";

export default async function AutomationToolsPage() {

  const automationServices = [
    {
      id: "email-campaigns",
      name: "Email Campaign Automation",
      description: "Set up automated email sequences and drip campaigns",
      icon: <Mail className="h-12 w-12 text-blue-500" />,
      count: "Unlimited campaigns",
      priceRange: "$99 - $999/mo",
      features: ["Welcome series", "Abandoned cart recovery", "Newsletter automation", "Segmented campaigns"]
    },
    {
      id: "chatbot-automation",
      name: "AI Chatbot Integration",
      description: "Deploy intelligent chatbots for customer service and sales",
      icon: <Bot className="h-12 w-12 text-green-500" />,
      count: "24/7 availability",
      priceRange: "$199 - $1,499/mo",
      features: ["Natural language processing", "Multi-platform support", "Lead qualification", "Custom workflows"]
    },
    {
      id: "social-automation",
      name: "Social Media Automation",
      description: "Schedule and automate your social media presence",
      icon: <MessageSquare className="h-12 w-12 text-purple-500" />,
      count: "All major platforms", 
      priceRange: "$79 - $599/mo",
      features: ["Auto-posting", "Content calendar", "Engagement tracking", "Hashtag optimization"]
    },
    {
      id: "workflow-automation",
      name: "Business Workflow Automation",
      description: "Streamline your business processes with custom automation",
      icon: <Zap className="h-12 w-12 text-orange-500" />,
      count: "Custom solutions",
      priceRange: "$299 - $2,999/mo", 
      features: ["CRM integration", "Task automation", "Data synchronization", "Custom triggers"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gray-950/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">Automation Tools</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Streamline your business with our comprehensive suite of automation tools. Save time, increase efficiency, and scale your operations effortlessly.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {automationServices.map((service) => (
            <Card key={service.id} className="relative bg-gray-900/50 border border-gray-800 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-300 overflow-hidden">
              {/* Card background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.02] to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              
              <CardHeader className="relative z-10">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-gray-800/50">
                    {service.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl text-white mb-2">{service.name}</CardTitle>
                    <CardDescription className="text-gray-400">
                      {service.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="relative z-10">
                <div className="flex items-center gap-4 mb-4">
                  <Badge variant="outline" className="text-green-400 border-green-400/30">
                    {service.count}
                  </Badge>
                  <span className="text-sm text-gray-400">{service.priceRange}</span>
                </div>
                
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full green-gradient-bg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                  Get Started
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <Card className="relative bg-gray-900/50 border border-gray-800 hover:border-green-500/30 transition-all duration-300 p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/[0.01] via-transparent to-blue-500/[0.01]"></div>
            <div className="absolute top-4 right-4 w-20 h-20 bg-green-500/[0.03] rounded-full blur-xl"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 bg-blue-500/[0.03] rounded-full blur-xl"></div>
            
            <CardContent className="text-center relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">Need a Custom Solution?</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-lg leading-relaxed">
                We can create tailored automation workflows specifically designed for your business needs. 
                Our experts will help you identify opportunities and implement solutions that drive real results.
              </p>
              <Link href="/contact">
                <Button className="green-gradient-bg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 text-lg px-8 py-3">
                  Contact Our Experts
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}