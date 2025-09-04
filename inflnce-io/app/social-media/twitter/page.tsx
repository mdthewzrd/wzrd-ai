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

export default function TwitterPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 pb-16">
        <AnimatedPageWrapper>
        {/* Platform Header */}
        <FadeInSection>
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <TwitterIcon className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Twitter/X Services</h1>
                <p className="text-white/80">Amplify your voice on Twitter/X with our premium services</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Tweet Promotions Section */}
        <FadeInSection delay={0.2}>
          <SectionDropdown title="Tweet Promotions" defaultOpen={true}>
            <div className="space-y-6">
              <PriceFilteredPromotion price={19}>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Basic Tweet Promotion</h3>
                      <p className="text-gray-400 mb-4">
                        Enhance engagement on a single tweet with our basic package. Perfect for testing our services.
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">500-1,000+</span> views
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">50-100+</span> likes
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">10-20+</span> retweets
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">5-15+</span> replies
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-blue-300 mb-1">$19.00</div>
                      <div className="text-blue-200 mb-3">per tweet</div>
                      <BuyNowButton className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white" />
                    </div>
                  </div>
                </div>
              </PriceFilteredPromotion>

              <PriceFilteredPromotion price={39}>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Standard Tweet Promotion</h3>
                      <p className="text-gray-400 mb-4">
                        Medium-level engagement boost for a single tweet. Ideal for increasing visibility and reach.
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">2,000-3,000+</span> views
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">150-250+</span> likes
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">30-50+</span> retweets
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">15-30+</span> replies
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-blue-300 mb-1">$39.00</div>
                      <div className="text-blue-200 mb-3">per tweet</div>
                      <BuyNowButton className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white" />
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
                title="Starter Influence"
                price={79}
                description="Perfect for new Twitter accounts looking to build influence"
                features={[
                  "500 followers per month",
                  "Daily tweet promotion",
                  "Engagement boost",
                  "Basic analytics"
                ]}
                className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-500/30"
              />
              <PackageCard
                title="Professional Voice"
                price={159}
                description="Ideal for professionals and businesses building authority"
                features={[
                  "1,500 followers per month",
                  "Premium tweet promotion",
                  "Thread optimization",
                  "Detailed analytics",
                  "Priority support"
                ]}
                className="bg-gradient-to-br from-blue-900/40 to-cyan-800/40 border-blue-500/30"
                popular={true}
              />
              <PackageCard
                title="Thought Leader"
                price={299}
                description="Maximum influence for established voices and brands"
                features={[
                  "3,000 followers per month",
                  "Premium everything",
                  "All content promotion",
                  "Advanced analytics",
                  "24/7 dedicated support"
                ]}
                className="bg-gradient-to-br from-cyan-900/40 to-blue-800/40 border-cyan-500/30"
              />
            </div>
          </SectionDropdown>
        </FadeInSection>

        {/* Engagement Services Section */}
        <FadeInSection delay={0.6}>
          <SectionDropdown title="Engagement Services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PerUnitService
                title="Twitter Followers"
                description="Real, active followers to boost your influence"
                unit="followers"
                pricing={[
                  { quantity: 100, price: 6.99 },
                  { quantity: 500, price: 29.99 },
                  { quantity: 1000, price: 54.99 },
                  { quantity: 2500, price: 129.99 },
                  { quantity: 5000, price: 249.99 }
                ]}
                color="blue"
              />
              
              <PerUnitService
                title="Tweet Likes"
                description="Instant likes to boost your tweet engagement"
                unit="likes"
                pricing={[
                  { quantity: 100, price: 2.99 },
                  { quantity: 500, price: 12.99 },
                  { quantity: 1000, price: 22.99 },
                  { quantity: 2500, price: 49.99 },
                  { quantity: 5000, price: 89.99 }
                ]}
                color="cyan"
              />

              <PerUnitService
                title="Retweets"
                description="Amplify your message with authentic retweets"
                unit="retweets"
                pricing={[
                  { quantity: 25, price: 4.99 },
                  { quantity: 100, price: 16.99 },
                  { quantity: 250, price: 39.99 },
                  { quantity: 500, price: 74.99 },
                  { quantity: 1000, price: 139.99 }
                ]}
                color="purple"
              />
            </div>
          </SectionDropdown>
        </FadeInSection>

        {/* Account Services Section */}
        <FadeInSection delay={0.8}>
          <SectionDropdown title="Account Services">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ServiceCard
                title="Profile Optimization"
                description="Complete Twitter profile setup and optimization"
                price="$59"
                features={[
                  "Bio optimization",
                  "Header design",
                  "Profile picture enhancement",
                  "Pinned tweet strategy"
                ]}
                color="blue"
              />
              
              <ServiceCard
                title="Content Strategy"
                description="Professional Twitter content planning and engagement"
                price="$119"
                features={[
                  "30-day content calendar",
                  "Hashtag strategy",
                  "Thread planning",
                  "Engagement tactics"
                ]}
                color="cyan"
              />
            </div>
          </SectionDropdown>
        </FadeInSection>
        </AnimatedPageWrapper>
      </div>
    </ProtectedRoute>
  )
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}