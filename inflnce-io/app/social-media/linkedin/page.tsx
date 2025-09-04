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

export default function LinkedInPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 pb-16">
        <AnimatedPageWrapper>
        {/* Platform Header */}
        <FadeInSection>
          <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <LinkedInIcon className="w-6 h-6 text-blue-700" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">LinkedIn Services</h1>
                <p className="text-white/80">Build your professional network with our premium services</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Post Promotions Section */}
        <FadeInSection delay={0.2}>
          <SectionDropdown title="Post Promotions" defaultOpen={true}>
            <div className="space-y-6">
              <PriceFilteredPromotion price={35}>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Basic Post Promotion</h3>
                      <p className="text-gray-400 mb-4">
                        Enhance engagement on a single LinkedIn post with our basic package. Perfect for testing our services.
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">1,000-1,500+</span> views
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">75-150+</span> likes
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">10-25+</span> comments
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">5-15+</span> shares
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-blue-300 mb-1">$35.00</div>
                      <div className="text-blue-200 mb-3">per post</div>
                      <BuyNowButton className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white" />
                    </div>
                  </div>
                </div>
              </PriceFilteredPromotion>

              <PriceFilteredPromotion price={69}>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Professional Post Promotion</h3>
                      <p className="text-gray-400 mb-4">
                        Medium-level engagement boost for a single post. Ideal for professionals building authority.
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">3,000-5,000+</span> views
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">200-400+</span> likes
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">25-50+</span> comments
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-blue-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-blue-300 font-bold">15-30+</span> shares
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-blue-300 mb-1">$69.00</div>
                      <div className="text-blue-200 mb-3">per post</div>
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
                title="Professional Starter"
                price={119}
                description="Perfect for professionals looking to build their network"
                features={[
                  "500 connections per month",
                  "Daily post promotion",
                  "Profile optimization",
                  "Basic analytics"
                ]}
                className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 border-blue-500/30"
              />
              <PackageCard
                title="Business Leader"
                price={229}
                description="Ideal for business leaders and thought leaders"
                features={[
                  "1,200 connections per month",
                  "Premium post promotion",
                  "Article amplification",
                  "Detailed analytics",
                  "Priority support"
                ]}
                className="bg-gradient-to-br from-blue-900/40 to-indigo-800/40 border-blue-500/30"
                popular={true}
              />
              <PackageCard
                title="Enterprise Executive"
                price={449}
                description="Maximum influence for C-level executives and companies"
                features={[
                  "2,500 connections per month",
                  "Premium everything",
                  "All content promotion",
                  "Advanced analytics",
                  "24/7 dedicated support"
                ]}
                className="bg-gradient-to-br from-indigo-900/40 to-blue-800/40 border-indigo-500/30"
              />
            </div>
          </SectionDropdown>
        </FadeInSection>

        {/* Engagement Services Section */}
        <FadeInSection delay={0.6}>
          <SectionDropdown title="Engagement Services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PerUnitService
                title="LinkedIn Connections"
                description="Professional connections to expand your network"
                unit="connections"
                pricing={[
                  { quantity: 100, price: 12.99 },
                  { quantity: 500, price: 54.99 },
                  { quantity: 1000, price: 99.99 },
                  { quantity: 2500, price: 229.99 },
                  { quantity: 5000, price: 429.99 }
                ]}
                color="blue"
              />
              
              <PerUnitService
                title="Post Likes"
                description="Professional likes to boost your content"
                unit="likes"
                pricing={[
                  { quantity: 50, price: 4.99 },
                  { quantity: 250, price: 19.99 },
                  { quantity: 500, price: 34.99 },
                  { quantity: 1000, price: 64.99 },
                  { quantity: 2000, price: 119.99 }
                ]}
                color="indigo"
              />

              <PerUnitService
                title="Profile Views"
                description="Increase your profile visibility and reach"
                unit="views"
                pricing={[
                  { quantity: 500, price: 6.99 },
                  { quantity: 2000, price: 24.99 },
                  { quantity: 5000, price: 54.99 },
                  { quantity: 10000, price: 99.99 },
                  { quantity: 20000, price: 179.99 }
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
                description="Complete LinkedIn profile setup and optimization"
                price="$89"
                features={[
                  "Headline optimization",
                  "Summary writing",
                  "Experience section",
                  "Skills & endorsements"
                ]}
                color="blue"
              />
              
              <ServiceCard
                title="Content Strategy"
                description="Professional LinkedIn content planning and networking"
                price="$169"
                features={[
                  "30-day content calendar",
                  "Industry insights",
                  "Network building strategy",
                  "Thought leadership"
                ]}
                color="indigo"
              />
            </div>
          </SectionDropdown>
        </FadeInSection>
        </AnimatedPageWrapper>
      </div>
    </ProtectedRoute>
  )
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}