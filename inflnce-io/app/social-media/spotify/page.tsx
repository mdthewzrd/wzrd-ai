"use client"

import { ProtectedRoute } from "@/components/protected-route"
import SectionDropdown from "@/components/section-dropdown"
import PackageCard from "@/components/package-card"
import ServiceCard from "@/components/service-card"
import PerUnitService from "@/components/per-unit-service"
import BuyNowButton from "@/components/buy-now-button"
import PriceFilteredPromotion from "@/components/price-filtered-promotion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import type React from "react"
import { AnimatedPageWrapper, FadeInSection, ScaleOnHover } from "@/components/animated-page-wrapper"

export default function SpotifyPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 pb-16">
        <AnimatedPageWrapper>
        {/* Platform Header */}
        <FadeInSection>
          <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center">
                <SpotifyIcon className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Spotify Services</h1>
                <p className="text-white/80">Amplify your music reach with our premium services</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Track Promotions Section */}
        <FadeInSection delay={0.2}>
          <SectionDropdown title="Track Promotions" defaultOpen={true}>
            <div className="space-y-6">
              <PriceFilteredPromotion price={45}>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Basic Track Promotion</h3>
                      <p className="text-gray-400 mb-4">
                        Enhance plays on a single Spotify track with our basic package. Perfect for testing our services.
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-green-300 font-bold">2,000-3,000+</span> plays
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-green-300 font-bold">100-200+</span> saves
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-green-300 font-bold">50-100+</span> followers
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-green-300 font-bold">25-50+</span> playlist adds
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-green-300 mb-1">$45.00</div>
                      <div className="text-green-200 mb-3">per track</div>
                      <BuyNowButton className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white" />
                    </div>
                  </div>
                </div>
              </PriceFilteredPromotion>

              <PriceFilteredPromotion price={89}>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Professional Track Promotion</h3>
                      <p className="text-gray-400 mb-4">
                        Medium-level engagement boost for a single track. Ideal for artists building their fanbase.
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-green-300 font-bold">5,000-8,000+</span> plays
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-green-300 font-bold">300-500+</span> saves
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-green-300 font-bold">150-250+</span> followers
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-green-300 font-bold">75-125+</span> playlist adds
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-green-300 mb-1">$89.00</div>
                      <div className="text-green-200 mb-3">per track</div>
                      <BuyNowButton className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white" />
                    </div>
                  </div>
                </div>
              </PriceFilteredPromotion>
            </div>
          </SectionDropdown>
        </FadeInSection>

        {/* Monthly Packages Section */}
        <FadeInSection delay={0.4}>
          <SectionDropdown title="Monthly Packages">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PackageCard
                title="Rising Artist"
                price={129}
                description="Perfect for emerging artists looking to build fanbase"
                features={[
                  "10,000 plays per month",
                  "Daily track promotion",
                  "Playlist placements",
                  "Basic analytics"
                ]}
                className="bg-gradient-to-br from-green-900/40 to-green-800/40 border-green-500/30"
              />
              <PackageCard
                title="Professional Artist"
                price={249}
                description="Ideal for established artists seeking growth"
                features={[
                  "25,000 plays per month",
                  "Premium track promotion",
                  "Editorial playlist pitching",
                  "Detailed analytics",
                  "Priority support"
                ]}
                className="bg-gradient-to-br from-green-900/40 to-emerald-800/40 border-green-500/30"
                popular={true}
              />
              <PackageCard
                title="Label Artist"
                price={499}
                description="Maximum exposure for signed artists and labels"
                features={[
                  "50,000 plays per month",
                  "Premium everything",
                  "All track promotion",
                  "Advanced analytics",
                  "24/7 dedicated support"
                ]}
                className="bg-gradient-to-br from-emerald-900/40 to-green-800/40 border-emerald-500/30"
              />
            </div>
          </SectionDropdown>
        </FadeInSection>

        {/* Engagement Services Section */}
        <FadeInSection delay={0.6}>
          <SectionDropdown title="Engagement Services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PerUnitService
                title="Spotify Plays"
                description="High-quality plays to boost your tracks"
                unit="plays"
                pricing={[
                  { quantity: 1000, price: 8.99 },
                  { quantity: 5000, price: 34.99 },
                  { quantity: 10000, price: 64.99 },
                  { quantity: 25000, price: 149.99 },
                  { quantity: 50000, price: 279.99 }
                ]}
                color="green"
              />
              
              <PerUnitService
                title="Monthly Listeners"
                description="Unique listeners to grow your audience"
                unit="listeners"
                pricing={[
                  { quantity: 500, price: 15.99 },
                  { quantity: 2000, price: 54.99 },
                  { quantity: 5000, price: 124.99 },
                  { quantity: 10000, price: 229.99 },
                  { quantity: 20000, price: 419.99 }
                ]}
                color="emerald"
              />

              <PerUnitService
                title="Followers"
                description="Artist followers to build your fanbase"
                unit="followers"
                pricing={[
                  { quantity: 100, price: 9.99 },
                  { quantity: 500, price: 39.99 },
                  { quantity: 1000, price: 74.99 },
                  { quantity: 2500, price: 174.99 },
                  { quantity: 5000, price: 329.99 }
                ]}
                color="teal"
              />
            </div>
          </SectionDropdown>
        </FadeInSection>

        {/* Artist Services Section */}
        <FadeInSection delay={0.8}>
          <SectionDropdown title="Artist Services">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ServiceCard
                title="Artist Profile Setup"
                description="Complete Spotify artist profile optimization"
                price="$109"
                features={[
                  "Profile bio writing",
                  "Artist images",
                  "Playlist creation",
                  "Verified artist setup"
                ]}
                color="green"
              />
              
              <ServiceCard
                title="Music Marketing"
                description="Comprehensive music promotion strategy"
                price="$199"
                features={[
                  "Release strategy",
                  "Playlist pitching",
                  "Social media integration",
                  "Fan engagement"
                ]}
                color="emerald"
              />
            </div>
          </SectionDropdown>
        </FadeInSection>
        </AnimatedPageWrapper>
      </div>
    </ProtectedRoute>
  )
}

function SpotifyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}