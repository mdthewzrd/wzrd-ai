"use client"
import Link from "next/link"
import { Instagram, Youtube, TrendingUp } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { Badge } from "@/components/ui/badge"
import { ProtectedRoute } from "@/components/protected-route"
import { AnimatedPageWrapper, FadeInSection, ScaleOnHover } from "@/components/animated-page-wrapper"

export default function SocialMediaPage() {
  return (
    <ProtectedRoute>
      <SocialMediaContent />
    </ProtectedRoute>
  )
}

function SocialMediaContent() {
  const { role, user } = useAuth()
  
  const getRoleSpecificPricing = () => {
    if (role === 'admin') return 'Admin pricing: Full access to all services'
    if (role === 'reseller') return 'Reseller pricing: Wholesale rates available'
    return 'Client pricing: Retail rates'
  }
  
  const showAdvancedFeatures = role === 'admin' || role === 'reseller'

  return (
    <AnimatedPageWrapper>
      {/* Hero Section */}
      <div className="bg-background-secondary py-8 mb-8">
        <div className="container mx-auto px-4">
          <FadeInSection>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Social Media Services</h1>
                <p className="text-text-secondary max-w-3xl">
                  Boost your social media presence with our comprehensive range of services. Select a platform below to
                  explore platform-specific services or browse our featured offerings.
                </p>
              </div>
              <div className="flex flex-col items-end">
                <Badge className={`
                  ${role === 'admin' ? 'bg-purple-500/10 text-purple-500 border-purple-500' : ''}
                  ${role === 'reseller' ? 'bg-blue-500/10 text-blue-500 border-blue-500' : ''}
                  ${role === 'client' ? 'bg-green-500/10 text-green-500 border-green-500' : ''}
                `}>
                  {role?.toUpperCase()} ACCESS
                </Badge>
                <p className="text-xs text-gray-400 mt-1">{getRoleSpecificPricing()}</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>

      {/* Select a Platform section */}
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-xl font-semibold mb-4">Select a Platform</h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/social-media/instagram"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-medium"
          >
            <Instagram className="w-4 h-4" />
            Instagram
          </Link>
          <Link
            href="/social-media/youtube"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-700 text-white font-medium"
          >
            <Youtube className="w-4 h-4" />
            YouTube
          </Link>
          <Link
            href="/social-media/tiktok"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white font-medium"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                fill="currentColor"
              />
            </svg>
            TikTok
          </Link>
          <Link
            href="/social-media/twitter"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500 text-white font-medium"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"
                fill="currentColor"
              />
            </svg>
            Twitter/X
          </Link>
          <Link
            href="/social-media/spotify"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600 text-white font-medium"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406c-.192.286-.578.381-.864.191-2.376-1.451-5.364-1.779-8.88-.975-.336.078-.671-.131-.748-.467-.078-.336.131-.67.467-.748 3.855-.882 7.156-.501 9.834 1.135.286.191.381.577.191.864zm1.082-2.412c-.241.355-.723.45-1.075.209-2.722-1.672-6.873-2.159-10.093-1.182-.418.127-.859-.108-.987-.526-.127-.417.108-.858.526-.985 3.669-1.115 8.25-.572 11.329 1.409.354.241.45.723.209 1.075zm.094-2.509c-3.26-1.936-8.639-2.115-11.753-1.17-.5.152-1.028-.13-1.18-.63-.151-.5.131-1.028.632-1.18 3.582-1.086 9.543-.876 13.296 1.348.455.27.605.862.334 1.317-.27.455-.862.605-1.317.334l-.012-.019z"
                fill="currentColor"
              />
            </svg>
            Spotify
          </Link>
          <Link
            href="/social-media/linkedin"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-700 text-white font-medium"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <rect
                x="2"
                y="9"
                width="4"
                height="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="4"
                cy="4"
                r="2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            LinkedIn
          </Link>
        </div>
      </div>

      {/* Featured Platforms */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-xl font-semibold mb-6">Featured Platforms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Instagram */}
          <Link
            href="/social-media/instagram"
            className="bg-gradient-to-br from-purple-600 to-orange-500 rounded-xl p-1 group"
          >
            <div className="bg-background-secondary rounded-lg p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Instagram className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-bold">Instagram</h3>
              </div>
              <p className="text-text-secondary mb-4 flex-grow">
                Boost your Instagram presence with likes, followers, views, and more. Perfect for influencers and
                brands.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-green-light group-hover:translate-x-1 transition-transform">Explore →</span>
              </div>
            </div>
          </Link>

          {/* TikTok */}
          <Link href="/social-media/tiktok" className="bg-gradient-to-br from-black to-gray-800 rounded-xl p-1 group">
            <div className="bg-background-secondary rounded-lg p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
                    fill="currentColor"
                  />
                </svg>
                <h3 className="text-xl font-bold">TikTok</h3>
              </div>
              <p className="text-text-secondary mb-4 flex-grow">
                Grow your TikTok following with real, engaged followers. Ideal for viral content creators.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-green-light group-hover:translate-x-1 transition-transform">Explore →</span>
              </div>
            </div>
          </Link>

          {/* YouTube */}
          <Link href="/social-media/youtube" className="bg-gradient-to-br from-red-600 to-red-700 rounded-xl p-1 group">
            <div className="bg-background-secondary rounded-lg p-6 h-full flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <Youtube className="w-6 h-6 text-red-500" />
                <h3 className="text-xl font-bold">YouTube</h3>
              </div>
              <p className="text-text-secondary mb-4 flex-grow">
                Increase your YouTube channel's visibility with subscribers, views, likes, and comments.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-green-light group-hover:translate-x-1 transition-transform">Explore →</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Services */}
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-xl font-semibold mb-6">Featured Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Monthly Packages - Fixed link */}
          <div className="bg-background-secondary rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-6 h-6 text-green-light" />
              <h3 className="text-xl font-bold">Monthly Growth Packages</h3>
            </div>
            <p className="text-text-secondary mb-4">
              Consistent growth for your social media accounts with our monthly packages. Available for all platforms.
            </p>
            <div className="flex justify-between items-center">
              <Link href="/social-media/post-promos" className="text-green-light hover:underline">
                View Packages →
              </Link>
            </div>
          </div>

          {/* Account Verification */}
          <div className="bg-background-secondary rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-9.618 5.04L12 21.012l9.618-13.028z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h3 className="text-xl font-bold">Account Verification</h3>
            </div>
            <p className="text-text-secondary mb-4">
              Get the verified badge for your social media profiles. Enhance credibility and visibility.
            </p>
            <div className="flex justify-between items-center">
              <Link href="/social-media/account-services" className="text-green-light hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-background-secondary py-12 mb-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Why Choose Our Social Media Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-dark/30 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-light"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16 12l-4 4-4-4M12 8v8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Real Engagement</h3>
              <p className="text-text-secondary">
                All our services provide real engagement from active accounts, not bots or fake profiles.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-dark/30 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-light"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Safe & Secure</h3>
              <p className="text-text-secondary">
                Our methods comply with platform guidelines to keep your accounts safe and secure.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-green-dark/30 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-light"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 12h8M12 16V8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">24/7 Support</h3>
              <p className="text-text-secondary">
                Our team is available around the clock to assist you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Admin/Reseller Only Features */}
      {showAdvancedFeatures && (
        <div className="container mx-auto px-4 mb-12">
          <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
              </svg>
              {role === 'admin' ? 'Administrator Features' : 'Reseller Tools'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {role === 'admin' && (
                <div className="bg-purple-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-400 mb-2">Platform Management</h3>
                  <p className="text-sm text-gray-300">Configure services, pricing, and platform-wide settings</p>
                </div>
              )}
              <div className="bg-blue-500/10 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-400 mb-2">Bulk Operations</h3>
                <p className="text-sm text-gray-300">Manage multiple client accounts and services efficiently</p>
              </div>
              <div className="bg-green-500/10 p-4 rounded-lg">
                <h3 className="font-semibold text-green-400 mb-2">White-label Options</h3>
                <p className="text-sm text-gray-300">Custom branding and reseller-specific features</p>
              </div>
              {role === 'admin' && (
                <div className="bg-orange-500/10 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-400 mb-2">Analytics & Reporting</h3>
                  <p className="text-sm text-gray-300">Platform-wide insights and performance metrics</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AnimatedPageWrapper>
  )
}
