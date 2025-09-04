import Link from "next/link"
import { ArrowRight, BookOpen, Users, TrendingUp, Target, Globe, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function LearnPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-black to-background">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl" />

        <div className="container px-4 mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-6">
              <div className="px-3 py-1 rounded-full border border-green-500/30 text-green-400 text-sm font-medium">
                Learn & Grow
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400">
              Master Digital Marketing with <span className="text-green-400">inflnce</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Discover how to grow your online presence, reach your target audience, and achieve your digital marketing goals.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-6 h-auto text-lg font-medium rounded-md transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/30 hover:translate-y-[-2px]"
            >
              <Link href="/social-media">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className="py-24 bg-background">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <div className="px-3 py-1 rounded-full bg-green-950 text-green-400 text-sm font-medium">
                <BookOpen className="inline h-4 w-4 mr-1" />
                Learning Path
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What You'll Learn</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive knowledge to build and grow your digital presence across all platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border/50 hover:border-green-500/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Social Media Growth</CardTitle>
                <CardDescription>
                  Learn proven strategies to grow your followers, increase engagement, and build a loyal community.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Organic growth techniques</li>
                  <li>• Content strategy optimization</li>
                  <li>• Platform-specific best practices</li>
                  <li>• Engagement rate improvement</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-green-500/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Analytics & Insights</CardTitle>
                <CardDescription>
                  Understand your audience and measure your success with data-driven insights.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Performance tracking</li>
                  <li>• Audience demographics</li>
                  <li>• ROI measurement</li>
                  <li>• Growth forecasting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-green-500/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Target Marketing</CardTitle>
                <CardDescription>
                  Reach the right audience with precision targeting and personalized campaigns.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Audience research</li>
                  <li>• Demographic targeting</li>
                  <li>• Interest-based campaigns</li>
                  <li>• Conversion optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-green-500/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Multi-Platform Strategy</CardTitle>
                <CardDescription>
                  Master the art of cross-platform marketing and maintain consistent brand presence.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Platform optimization</li>
                  <li>• Cross-promotion tactics</li>
                  <li>• Content adaptation</li>
                  <li>• Brand consistency</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-green-500/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Automation Tools</CardTitle>
                <CardDescription>
                  Streamline your marketing efforts with powerful automation and scheduling tools.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Content scheduling</li>
                  <li>• Automated responses</li>
                  <li>• Workflow optimization</li>
                  <li>• Time-saving techniques</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-green-500/50 transition-all hover:shadow-lg">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-600/20 flex items-center justify-center mb-4">
                  <BookOpen className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle>Publication Strategy</CardTitle>
                <CardDescription>
                  Get featured in top publications and build authority in your industry.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Media outreach</li>
                  <li>• Press release writing</li>
                  <li>• Authority building</li>
                  <li>• Relationship management</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-black">
        <div className="container px-4 mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-3">
              <div className="px-3 py-1 rounded-full bg-green-950 text-green-400 text-sm font-medium">Success Stories</div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Real Results from Real Users</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See how businesses and individuals have transformed their online presence with inflnce.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">250% Growth</CardTitle>
                <CardDescription className="text-gray-400">
                  E-commerce brand increased Instagram followers and doubled their sales
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  "inflnce helped us reach our target audience effectively. Our engagement rates skyrocketed, 
                  and we saw immediate impact on our revenue."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">1M+ Impressions</CardTitle>
                <CardDescription className="text-gray-400">
                  Tech startup gained massive visibility through strategic publication placement
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  "The publication services opened doors we never knew existed. We're now recognized 
                  as thought leaders in our industry."
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">500% ROI</CardTitle>
                <CardDescription className="text-gray-400">
                  Personal brand achieved remarkable growth across all platforms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-sm">
                  "The comprehensive approach and expert guidance transformed my personal brand. 
                  The results exceeded all expectations."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.png')] bg-repeat opacity-5"></div>
        <div className="container px-4 mx-auto relative text-center">
          <div className="inline-block mb-3">
            <div className="px-3 py-1 rounded-full bg-green-950 text-green-400 text-sm font-medium">
              Ready to Start?
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Begin Your Growth Journey Today</h2>
          <p className="text-xl text-gray-400 mb-8">
            Join thousands who have already transformed their digital presence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-6 h-auto text-lg font-medium rounded-md transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/30 hover:translate-y-[-2px]"
            >
              <Link href="/social-media">
                Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-gradient-to-r from-green-600/10 to-green-500/10 hover:from-green-600/20 hover:to-green-500/20 border-green-500/30 hover:border-green-500/60 text-white px-8 py-6 h-auto text-lg font-medium rounded-md transition-all"
            >
              <Link href="/tools">Explore Tools</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}