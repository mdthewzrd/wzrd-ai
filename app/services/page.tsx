"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getServicesByCategory, Service } from "@/lib/services-data";
import { ArrowRight, TrendingUp, Zap, Shield, Star, Instagram, Youtube, Music, Twitter, Headphones, Briefcase, Newspaper, Tv, Globe, Search, Mail, Bot, Smartphone, Package } from "lucide-react";

// Platform configurations
const platforms = {
  socialMedia: [
    { id: "instagram", name: "Instagram", icon: <Instagram className="h-8 w-8" />, href: "/services/social-media/instagram", color: "instagram-gradient" },
    { id: "youtube", name: "YouTube", icon: <Youtube className="h-8 w-8" />, href: "/services/social-media/youtube", color: "youtube-gradient" },
    { id: "tiktok", name: "TikTok", icon: <Music className="h-8 w-8" />, href: "/services/social-media/tiktok", color: "tiktok-gradient" },
    { id: "twitter", name: "Twitter/X", icon: <Twitter className="h-8 w-8" />, href: "/services/social-media/twitter", color: "twitter-gradient" },
    { id: "spotify", name: "Spotify", icon: <Headphones className="h-8 w-8" />, href: "/services/social-media/spotify", color: "spotify-gradient" },
    { id: "linkedin", name: "LinkedIn", icon: <Briefcase className="h-8 w-8" />, href: "/services/social-media/linkedin", color: "linkedin-gradient" }
  ],
  publications: [
    { id: "online", name: "Online Publications", icon: <Newspaper className="h-8 w-8" />, href: "/services/publications/online" },
    { id: "broadcast", name: "Broadcast TV", icon: <Tv className="h-8 w-8" />, href: "/services/publications/broadcast" }
  ],
  tools: [
    { id: "website", name: "Website Design", icon: <Globe className="h-8 w-8" />, href: "/services/tools/website-design" },
    { id: "seo", name: "SEO Services", icon: <Search className="h-8 w-8" />, href: "/services/tools/seo" },
    { id: "knowledge", name: "Google Knowledge Panel", icon: <Shield className="h-8 w-8" />, href: "/services/tools/knowledge-panel" },
    { id: "email", name: "Email Automation", icon: <Mail className="h-8 w-8" />, href: "/services/tools/email-automation" },
    { id: "bot", name: "Content Bot", icon: <Bot className="h-8 w-8" />, href: "/services/tools/content-bot" },
    { id: "app", name: "App Building", icon: <Smartphone className="h-8 w-8" />, href: "/services/tools/app-building" }
  ]
};

function ServicePreviewCard({ service }: { service: Service }) {
  const lowestPrice = Math.min(...service.packages.map((p) => p.price));
  const highestPrice = Math.max(...service.packages.map((p) => p.price));
  
  const getServiceIcon = (icon: string) => {
    switch (icon) {
      case "instagram":
        return <Instagram className="h-8 w-8 text-pink-500" />;
      case "youtube":
        return <Youtube className="h-8 w-8 text-red-500" />;
      case "tiktok":
        return <Music className="h-8 w-8 text-gray-800" />;
      case "twitter":
        return <Twitter className="h-8 w-8 text-blue-500" />;
      case "spotify":
        return <Headphones className="h-8 w-8 text-green-500" />;
      case "linkedin":
        return <Briefcase className="h-8 w-8 text-blue-600" />;
      case "publication":
        return <Newspaper className="h-8 w-8 text-purple-500" />;
      case "broadcast":
        return <Tv className="h-8 w-8 text-purple-500" />;
      case "website":
        return <Globe className="h-8 w-8 text-green-500" />;
      case "seo":
        return <Search className="h-8 w-8 text-green-500" />;
      case "knowledge":
        return <Shield className="h-8 w-8 text-green-500" />;
      case "email":
        return <Mail className="h-8 w-8 text-green-500" />;
      case "bot":
        return <Bot className="h-8 w-8 text-green-500" />;
      case "app":
        return <Smartphone className="h-8 w-8 text-green-500" />;
      default:
        return <Package className="h-8 w-8 text-green-500" />;
    }
  };
  
  return (
    <Card className="group hover:border-green-500/50 transition-all hover:shadow-xl h-full">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div>{getServiceIcon(service.icon || "package")}</div>
          {service.packages.some((p) => p.highlight) && (
            <Badge variant="secondary" className="bg-green-500/10 text-green-500">
              <Star className="h-3 w-3 mr-1" />
              Popular
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg">{service.service}</CardTitle>
        <CardDescription className="text-sm">
          {service.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold">
              ${lowestPrice.toFixed(lowestPrice < 100 ? 2 : 0)}
            </span>
            <span className="text-sm text-muted-foreground">
              to ${highestPrice.toFixed(highestPrice < 100 ? 2 : 0)}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {service.packages.length} packages available
          </p>
        </div>
        <Link href={`/services/${service.category}/${service.platform}/${service.id}`}>
          <Button className="w-full green-gradient-bg border-0" size="sm">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all");
  
  const socialMediaServices = getServicesByCategory("socialMedia");
  const publicationServices = getServicesByCategory("publication");
  const toolServices = getServicesByCategory("tool");
  const allServices = [...socialMediaServices, ...publicationServices, ...toolServices];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-background to-background" />
        <div className="container relative mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent animate-fade-in">
              Premium Digital Services
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-fade-in-up animation-delay-200">
              Comprehensive B2B wholesale solutions for digital marketing agencies and resellers
            </p>
            <div className="flex justify-center gap-4 flex-wrap animate-fade-in-up animation-delay-400">
              <div className="flex items-center gap-2 text-sm bg-card px-4 py-2 rounded-full">
                <Shield className="h-4 w-4 text-green-500" />
                <span>Vetted Quality</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-card px-4 py-2 rounded-full">
                <Zap className="h-4 w-4 text-green-500" />
                <span>24h Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-sm bg-card px-4 py-2 rounded-full">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Professional Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Content */}
      <div className="container mx-auto px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4 mb-12">
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="socialMedia">Social Media</TabsTrigger>
            <TabsTrigger value="publications">Publications</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allServices.map((service) => (
                <ServicePreviewCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="socialMedia" className="mt-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Social Media Services</h2>
              <p className="text-muted-foreground">
                Premium growth and engagement services for all major social media platforms
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {socialMediaServices.map((service) => (
                <ServicePreviewCard key={service.id} service={service} />
              ))}
            </div>
            
            {/* Platform Quick Links */}
            <div className="mt-12 p-6 bg-card rounded-lg border border-border">
              <h3 className="text-lg font-semibold mb-4">Browse by Platform</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {platforms.socialMedia.map((platform) => (
                  <Link key={platform.id} href={platform.href}>
                    <div className={`p-4 text-center rounded-lg border border-border hover:border-green-500 transition-all cursor-pointer ${platform.color}`}>
                      <div className="flex justify-center mb-2">{platform.icon}</div>
                      <p className="mt-2 text-sm font-medium">{platform.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="publications" className="mt-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Publication Services</h2>
              <p className="text-muted-foreground">
                Get featured in top-tier online and broadcast media outlets
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
              {publicationServices.map((service) => (
                <ServicePreviewCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="mt-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Digital Tools & Services</h2>
              <p className="text-muted-foreground">
                Professional tools and automation for scaling your digital presence
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {toolServices.map((service) => (
                <ServicePreviewCard key={service.id} service={service} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center bg-card rounded-lg p-12 border border-border">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Business?</h2>
          <p className="text-muted-foreground mb-8">
            Join hundreds of successful resellers using our premium services
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/sign-up">
              <Button size="lg" className="green-gradient-bg">
                Apply for Access
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}