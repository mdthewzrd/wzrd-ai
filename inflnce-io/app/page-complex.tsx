import Link from "next/link"
import { ArrowRight, BarChart3, Globe, Newspaper, ShieldCheck, Sparkles, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HomeClient } from "./page.client.tsx"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-black to-background">
        {/* Abstract background elements */}
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />

        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <HomeClient />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-black relative">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>
        <div className="container px-4 mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <div className="px-3 py-1 rounded-full bg-green-950 text-green-400 text-sm font-medium">Our Services</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Comprehensive Services</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to grow your online presence and reach your target audience effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Social Media Growth */}
            <div className="rounded-xl p-8 bg-gray-800/50 border border-gray-700 transition-all hover:shadow-lg hover:translate-y-[-2px] hover:border-green-500/50">
              <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Social Media Growth</h3>
              <p className="text-gray-400 mb-4">
                Expand your reach across all major platforms including Instagram, TikTok, YouTube, Twitter, LinkedIn,
                and Spotify.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-300">Follower growth campaigns</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-300">Engagement optimization</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-300">Content promotion</span>
                </li>
              </ul>
              <Link
                href="/social-media"
                className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center"
              >
                Explore Social Media <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Publication Features */}
            <div className="rounded-xl p-8 bg-gray-800/50 border border-gray-700 transition-all hover:shadow-lg hover:translate-y-[-2px] hover:border-green-500/50">
              <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-6">
                <Newspaper className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Publication Features</h3>
              <p className="text-gray-400 mb-4">
                Get featured in reputable publications to boost your credibility and reach new audiences.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-300">Press release distribution</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-300">Featured articles</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-300">Industry-specific publications</span>
                </li>
              </ul>
              <Link
                href="/publications"
                className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center"
              >
                Explore Publications <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>

            {/* Digital Marketing Tools */}
            <div className="rounded-xl p-8 bg-gray-800/50 border border-gray-700 transition-all hover:shadow-lg hover:translate-y-[-2px] hover:border-green-500/50">
              <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Digital Marketing Tools</h3>
              <p className="text-gray-400 mb-4">
                Access powerful tools to enhance your online marketing strategy and drive results.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-300">SEO optimization</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-300">Web development</span>
                </li>
                <li className="flex items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm text-gray-300">Knowledge panel creation</span>
                </li>
              </ul>
              <Link href="/tools" className="text-green-500 hover:text-green-400 text-sm font-medium flex items-center">
                Explore Tools <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-900 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,200,2,0.03),transparent_70%)]"></div>
        <div className="container px-4 mx-auto relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <div className="px-3 py-1 rounded-full bg-green-950 text-green-400 text-sm font-medium">
                Why Choose Us
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Why Choose inflnce</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide comprehensive solutions to help businesses and individuals establish a strong online presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-600/30 transition-all hover:shadow-lg hover:shadow-green-900/5">
              <div className="h-10 w-10 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                <Globe className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Global Reach</h3>
              <p className="text-gray-400">
                Connect with audiences worldwide through our extensive network of platforms and publications.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-600/30 transition-all hover:shadow-lg hover:shadow-green-900/5">
              <div className="h-10 w-10 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                <ShieldCheck className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Trusted Results</h3>
              <p className="text-gray-400">
                Our proven strategies deliver measurable outcomes and sustainable growth for your brand.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-600/30 transition-all hover:shadow-lg hover:shadow-green-900/5">
              <div className="h-10 w-10 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                <Sparkles className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Premium Quality</h3>
              <p className="text-gray-400">
                We maintain the highest standards across all our services to ensure exceptional results.
              </p>
            </div>

            <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 hover:border-green-600/30 transition-all hover:shadow-lg hover:shadow-green-900/5">
              <div className="h-10 w-10 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                <BarChart3 className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-white">Data-Driven</h3>
              <p className="text-gray-400">
                Our strategies are backed by analytics and market insights to maximize your ROI.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,200,2,0.05),transparent_70%)]"></div>
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/5 rounded-full blur-3xl"></div>

        <div className="container px-4 mx-auto relative">
          <div className="max-w3xl mx-auto text-center">
            <div className="inline-block mb-3">
              <div className="px-3 py-1 rounded-full bg-green-950 text-green-400 text-sm font-medium">
                Get Started Today
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Elevate Your Online Presence?</h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of businesses and individuals who have transformed their digital footprint with inflnce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-6 h-auto text-lg font-medium rounded-md transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/30 hover:translate-y-[-2px]"
              >
                <Link href="/social-media">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-gradient-to-r from-green-600/10 to-green-500/10 hover:from-green-600/20 hover:to-green-500/20 border-green-500/30 hover:border-green-500/60 text-white px-8 py-6 h-auto text-lg font-medium rounded-md transition-all hover:bg-green-950/30"
              >
                <Link href="/learn">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
