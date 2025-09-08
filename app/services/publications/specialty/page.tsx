import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tv, Podcast, Smartphone, Monitor } from "lucide-react";
import Link from "next/link";

export default async function SpecialtyPublicationsPage() {

  const specialtyPlacements = [
    {
      id: "tv-stations",
      name: "TV Station Placements",
      description: "Get featured on major television networks across the US",
      icon: <Tv className="h-12 w-12 text-red-500" />,
      count: "20+ stations",
      priceRange: "$800 - $31,000",
      features: ["CBS, NBC, Fox, ABC affiliates", "1-2 week turnaround", "Video interviews", "High authority backlinks"]
    },
    {
      id: "digital-magazines",
      name: "Digital Magazine Features",
      description: "Premium placements in digital publications and magazines",
      icon: <Monitor className="h-12 w-12 text-blue-500" />,
      count: "50+ publications",
      priceRange: "$300 - $2,000",
      features: ["Industry-specific magazines", "Featured articles", "Author bylines", "Social media promotion"]
    },
    {
      id: "podcast-features",
      name: "Podcast Placements",
      description: "Guest appearances and sponsored segments on popular podcasts",
      icon: <Podcast className="h-12 w-12 text-purple-500" />,
      count: "100+ podcasts", 
      priceRange: "$200 - $5,000",
      features: ["Business & tech podcasts", "Guest interviews", "Sponsored segments", "Show note mentions"]
    },
    {
      id: "social-media-features",
      name: "Social Media Placements",
      description: "Featured posts and collaborations with influential accounts",
      icon: <Smartphone className="h-12 w-12 text-pink-500" />,
      count: "500+ influencers",
      priceRange: "$100 - $10,000", 
      features: ["Instagram features", "TikTok collaborations", "Twitter mentions", "YouTube placements"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gray-950/50">
        <div className="container relative mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4 text-white">
              Specialty Publications
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Premium placements across TV, digital media, podcasts, and social platforms
            </p>
            
            {/* Navigation Links */}
            <div className="flex justify-center gap-4 mb-12">
              <Link href="/services/publications">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                  All Publications
                </Button>
              </Link>
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Specialty Publications
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Specialty Placements Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {specialtyPlacements.map((placement) => (
            <Card key={placement.id} className="group relative bg-gray-900/50 border border-gray-800 hover:border-green-500/50 hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 overflow-hidden">
              {/* Card background glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="pb-6 relative z-10">
                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                  {placement.icon}
                </div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <CardTitle className="text-2xl text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                      {placement.name}
                    </CardTitle>
                    <div className="flex gap-2 mb-4">
                      <Badge variant="outline" className="text-green-400 border-green-400/30">
                        {placement.count}
                      </Badge>
                      <Badge variant="outline" className="text-blue-400 border-blue-400/30">
                        {placement.priceRange}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="text-gray-400 text-base leading-relaxed">
                  {placement.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-0 relative z-10">
                <div className="space-y-3 mb-6">
                  {placement.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full green-gradient-bg hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                  asChild
                >
                  <Link href={`/services/publications/specialty/${placement.id}`}>
                    Explore {placement.name.split(' ')[0]} Options
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto text-center bg-gray-900/50 rounded-lg p-12 border border-gray-800">
          <h2 className="text-3xl font-bold mb-4 text-white">Need Something Custom?</h2>
          <p className="text-muted-foreground mb-8">
            Don&apos;t see the exact placement you need? We work with hundreds of media partners to create custom campaigns.
          </p>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="green-gradient-bg">
              Contact Us
            </Button>
            <Button size="lg" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
              View All Publications
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}