"use client"

import { ArrowRight, Users, FileText, Settings } from "lucide-react"
import { AuthLink } from "@/components/auth-link"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AnimatedPageWrapper, FadeInSection, ScaleOnHover } from "@/components/animated-page-wrapper"

export default function SafeHome() {
  const { isAuthenticated, role, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isAuthenticated && role) {
      // Redirect authenticated users to their dashboard
      const dashboardRoutes = {
        admin: '/admin',
        reseller: '/reseller',
        client: '/client'
      }
      router.push(dashboardRoutes[role])
    }
  }, [isAuthenticated, role, isLoading, router])

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-pulse">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
            inflnce
          </h1>
        </div>
      </div>
    )
  }

  // Don't render homepage content if authenticated (will redirect)
  if (isAuthenticated) {
    return null
  }

  return (
    <AnimatedPageWrapper className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <FadeInSection>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
              inflnce
            </h1>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Your complete social media marketing platform
            </p>
            
            {/* Simple buttons that definitely work */}
            <FadeInSection delay={0.2}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <ScaleOnHover>
                  <AuthLink 
                    href="/social-media" 
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
                  >
                    Social Media Services →
                  </AuthLink>
                </ScaleOnHover>
                <ScaleOnHover>
                  <AuthLink 
                    href="/tools" 
                    className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 border border-gray-600 hover:border-gray-500 hover:shadow-lg"
                  >
                    Marketing Tools
                  </AuthLink>
                </ScaleOnHover>
              </div>
            </FadeInSection>
          </div>
        </FadeInSection>

        {/* Animated service grid */}
        <FadeInSection delay={0.4}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <FadeInSection delay={0.5}>
              <ScaleOnHover>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
                  <Users className="h-10 w-10 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Social Media Growth</h3>
                  <p className="text-gray-400 mb-4">
                    Grow your presence on Instagram, YouTube, TikTok, Twitter, LinkedIn, and Spotify.
                  </p>
                  <AuthLink href="/social-media" className="text-green-500 hover:text-green-400 font-medium transition-colors duration-200">
                    Explore Services →
                  </AuthLink>
                </div>
              </ScaleOnHover>
            </FadeInSection>

            <FadeInSection delay={0.6}>
              <ScaleOnHover>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                  <FileText className="h-10 w-10 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Publications</h3>
                  <p className="text-gray-400 mb-4">
                    Get featured in top publications and build your industry authority.
                  </p>
                  <AuthLink href="/publications" className="text-blue-500 hover:text-blue-400 font-medium transition-colors duration-200">
                    View Publications →
                  </AuthLink>
                </div>
              </ScaleOnHover>
            </FadeInSection>

            <FadeInSection delay={0.7}>
              <ScaleOnHover>
                <div className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                  <Settings className="h-10 w-10 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Marketing Tools</h3>
                  <p className="text-gray-400 mb-4">
                    SEO tools, automation, web development, and knowledge panel services.
                  </p>
                  <AuthLink href="/tools" className="text-purple-500 hover:text-purple-400 font-medium transition-colors duration-200">
                    Browse Tools →
                  </AuthLink>
                </div>
              </ScaleOnHover>
            </FadeInSection>
          </div>
        </FadeInSection>

        {/* Animated navigation links */}
        <FadeInSection delay={0.8}>
          <div className="text-center bg-gray-900 p-8 rounded-lg border border-gray-800">
            <h2 className="text-2xl font-bold mb-6">Quick Navigation</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <ScaleOnHover>
                <AuthLink href="/social-media/instagram" className="bg-pink-600 px-4 py-2 rounded font-medium hover:bg-pink-700 transition-all duration-200 hover:shadow-lg hover:shadow-pink-500/25">
                  Instagram
                </AuthLink>
              </ScaleOnHover>
              <ScaleOnHover>
                <AuthLink href="/social-media/youtube" className="bg-red-600 px-4 py-2 rounded font-medium hover:bg-red-700 transition-all duration-200 hover:shadow-lg hover:shadow-red-500/25">
                  YouTube
                </AuthLink>
              </ScaleOnHover>
              <ScaleOnHover>
                <AuthLink href="/social-media/tiktok" className="bg-black px-4 py-2 rounded font-medium hover:bg-gray-800 border border-white transition-all duration-200 hover:shadow-lg">
                  TikTok
                </AuthLink>
              </ScaleOnHover>
              <ScaleOnHover>
                <AuthLink href="/tools/seo" className="bg-orange-600 px-4 py-2 rounded font-medium hover:bg-orange-700 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/25">
                  SEO Tools
                </AuthLink>
              </ScaleOnHover>
              <ScaleOnHover>
                <AuthLink href="/publications" className="bg-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/25">
                  Publications
                </AuthLink>
              </ScaleOnHover>
              <ScaleOnHover>
                <AuthLink href="/orders" className="bg-green-600 px-4 py-2 rounded font-medium hover:bg-green-700 transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25">
                  My Orders
                </AuthLink>
              </ScaleOnHover>
            </div>
          </div>
        </FadeInSection>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p>© 2024 inflnce. Professional social media marketing platform.</p>
        </div>
      </div>
    </AnimatedPageWrapper>
  )
}