import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Users, Shield, BarChart3, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header - No Clerk components */}
      <header className="border-b bg-gray-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center pl-8 pr-12">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                inflnce.io
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/services/social-media" className="text-gray-300 hover:text-white transition-colors">
                Social Media
              </Link>
              <Link href="/services/publications" className="text-gray-300 hover:text-white transition-colors">
                Publications
              </Link>
              <Link href="/services/tools" className="text-gray-300 hover:text-white transition-colors">
                Tools
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/sign-in">
                <Button variant="ghost" className="text-gray-300 hover:text-white">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 to-gray-900">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/[0.02] via-blue-500/[0.02] to-purple-500/[0.02] animate-pulse"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Scale Your Digital
            <span className="block bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Presence Today
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Premium wholesale platform for digital marketing and social media services. 
            Get authentic growth, professional publications, and cutting-edge tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services">
              <Button size="lg" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg">
                Explore Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-4 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose inflnce.io?</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Professional-grade digital marketing solutions trusted by businesses worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
              <CardHeader className="text-center pb-2">
                <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-white">Authentic Growth</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-400">
                  Real followers, genuine engagement, and sustainable growth across all platforms
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
              <CardHeader className="text-center pb-2">
                <Shield className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <CardTitle className="text-white">Secure & Safe</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-400">
                  Industry-leading security practices and 24/7 monitoring for your peace of mind
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
              <CardHeader className="text-center pb-2">
                <BarChart3 className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                <CardTitle className="text-white">Data-Driven</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-400">
                  Advanced analytics and insights to optimize your digital marketing strategy
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
              <CardHeader className="text-center pb-2">
                <Globe className="h-12 w-12 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-white">Global Reach</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-400">
                  Worldwide services with local expertise in major markets and industries
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to dominate the digital landscape
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border-purple-500/20 hover:from-purple-500/15 hover:to-pink-500/15 transition-all">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Social Media Growth</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Instagram, YouTube, TikTok, Twitter, and Spotify promotion services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/services/social-media">
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">
                    Explore Social Media
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 hover:from-blue-500/15 hover:to-cyan-500/15 transition-all">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Press & Publications</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Get featured in top publications and media outlets worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/services/publications">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">
                    View Publications
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20 hover:from-green-500/15 hover:to-emerald-500/15 transition-all">
              <CardHeader>
                <CardTitle className="text-white text-2xl">Digital Tools</CardTitle>
                <CardDescription className="text-gray-300 text-lg">
                  Advanced automation, SEO, and marketing tools for your business
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/services/tools">
                  <Button className="w-full bg-green-500 hover:bg-green-600">
                    Discover Tools
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gray-950 border-t border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <div className="mb-8">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                inflnce.io
              </Link>
            </div>
            <p className="text-gray-400 mb-8">
              Premium wholesale platform for digital marketing and social media services
            </p>
            <div className="flex justify-center space-x-8">
              <Link href="/services" className="text-gray-400 hover:text-white transition-colors">
                Services
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
              <Link href="/sign-in" className="text-gray-400 hover:text-white transition-colors">
                Sign In
              </Link>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                © 2024 inflnce.io. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}