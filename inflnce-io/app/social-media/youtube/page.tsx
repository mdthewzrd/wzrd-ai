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

export default function YouTubePage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 pb-16">
        <AnimatedPageWrapper>
        {/* Platform Header */}
        <FadeInSection>
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <YouTubeIcon className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">YouTube Services</h1>
                <p className="text-white/80">Grow your YouTube channel with our premium services</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Video Promotions Section */}
        <FadeInSection delay={0.2}>
          <SectionDropdown title="Video Promotions" defaultOpen={true}>
            <div className="space-y-6">
              <PriceFilteredPromotion price={49}>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Basic Video Promotion</h3>
                      <p className="text-gray-400 mb-4">
                        Enhance engagement on a single YouTube video with our basic package. Perfect for testing our services.
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-red-300 font-bold">2,000-3,000+</span> views
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-red-300 font-bold">100-200+</span> likes
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-red-300 font-bold">15-30+</span> comments
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-red-300 font-bold">20-40+</span> subscribers
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-red-300 mb-1">$49.00</div>
                      <div className="text-red-200 mb-3">per video</div>
                      <BuyNowButton className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white" />
                    </div>
                  </div>
                </div>
              </PriceFilteredPromotion>

              <PriceFilteredPromotion price={99}>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Standard Video Promotion</h3>
                      <p className="text-gray-400 mb-4">
                        Medium-level engagement boost for a single video. Ideal for content creators wanting to increase visibility.
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-red-300 font-bold">5,000-8,000+</span> views
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-red-300 font-bold">300-500+</span> likes
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-red-300 font-bold">40-80+</span> comments
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-red-300 font-bold">80-120+</span> subscribers
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-red-300 mb-1">$99.00</div>
                      <div className="text-red-200 mb-3">per video</div>
                      <BuyNowButton className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white" />
                    </div>
                  </div>
                </div>
              </PriceFilteredPromotion>
            </div>
          </SectionDropdown>
        </FadeInSection>

        {/* Monthly Packages Section */}
        <FadeInSection delay={0.3}>
          <SectionDropdown title="Monthly Packages">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <PackageCard
              title="Creator"
              price="199.00"
              retailPrice="299.00"
              description="Starter package for new YouTube channels looking to establish presence."
              featured={true}
              features={[
                "<span class='text-red-300 font-bold'>6</span> videos per month",
                "<span class='text-red-300 font-bold'>2,000-3,000+</span> views per video",
                "<span class='text-red-300 font-bold'>100-200+</span> likes per video",
                "<span class='text-red-300 font-bold'>15-30+</span> comments per video",
                "<span class='text-red-300 font-bold'>20-40+</span> subscribers per video",
                "Monthly analytics report",
              ]}
              priceColor="text-red-300"
              checkColor="text-red-300"
              buttonClassName="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
            />

            <PackageCard
              title="Professional"
              price="399.00"
              retailPrice="599.00"
              description="Intermediate package for growing YouTube channels seeking consistent growth."
              features={[
                "<span class='text-red-300 font-bold'>10</span> videos per month",
                "<span class='text-red-300 font-bold'>5,000-8,000+</span> views per video",
                "<span class='text-red-300 font-bold'>300-500+</span> likes per video",
                "<span class='text-red-300 font-bold'>40-80+</span> comments per video",
                "<span class='text-red-300 font-bold'>80-120+</span> subscribers per video",
                "Monthly analytics report",
                "Shorts optimization",
              ]}
              priceColor="text-red-300"
              checkColor="text-red-300"
              buttonClassName="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
            />

            <PackageCard
              title="Enterprise"
              price="799.00"
              retailPrice="1,199.00"
              description="Advanced package for established YouTube channels seeking substantial growth and viral potential."
              features={[
                "<span class='text-red-300 font-bold'>15</span> videos per month",
                "<span class='text-red-300 font-bold'>20,000-30,000+</span> views per video",
                "<span class='text-red-300 font-bold'>1,000-1,500+</span> likes per video",
                "<span class='text-red-300 font-bold'>100-150+</span> comments per video",
                "<span class='text-red-300 font-bold'>200-300+</span> subscribers per video",
                "Algorithm optimization",
                "Advanced analytics",
                "Viral potential strategy",
              ]}
              priceColor="text-red-300"
              checkColor="text-red-300"
              buttonClassName="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
            />
          </div>
        </SectionDropdown>
        </FadeInSection>

        {/* Engagement Services Section */}
        <FadeInSection delay={0.4}>
          <SectionDropdown title="Engagement Services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerUnitService
              title="YouTube Subscribers"
              description="Grow your channel with high-quality subscribers"
              pricePerUnit={9.99}
              unit="subscribers"
              unitAmount={1000}
              icon={<YouTubeIcon className="w-5 h-5 text-red-300" />}
              textColor="text-red-300"
              buttonBgColor="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
              featured={true}
            />

            <PerUnitService
              title="YouTube Views"
              description="Increase view count on your videos"
              pricePerUnit={1.99}
              unit="views"
              unitAmount={1000}
              icon={<YouTubeIcon className="w-5 h-5 text-red-300" />}
              textColor="text-red-300"
              buttonBgColor="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
            />

            <PerUnitService
              title="YouTube Likes"
              description="Boost engagement with high-quality likes"
              pricePerUnit={3.99}
              unit="likes"
              unitAmount={100}
              icon={<YouTubeIcon className="w-5 h-5 text-red-300" />}
              textColor="text-red-300"
              buttonBgColor="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
            />

            <PerUnitService
              title="YouTube Comments"
              description="Add authentic comments to your videos"
              pricePerUnit={4.99}
              unit="comments"
              unitAmount={10}
              icon={<YouTubeIcon className="w-5 h-5 text-red-300" />}
              textColor="text-red-300"
              buttonBgColor="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
            />
          </div>
        </SectionDropdown>
        </FadeInSection>

        {/* Channel Services Section */}
        <FadeInSection delay={0.5}>
          <SectionDropdown title="Channel Services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              title="YouTube Monetization Setup"
              price={{ value: "1,499", retail: "2,499" }}
              description="Get your YouTube channel ready for monetization with proper setup and optimization."
              priority="High"
              processingTime="30-45 days"
              successRate="85%"
              accentColor="red"
              priceColor="text-red-300"
              buttonClassName="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
            />

            <ServiceCard
              title="YouTube Partner Program Eligibility"
              price={{ value: "999", retail: "1,499" }}
              description="Meet YouTube Partner Program requirements for ad revenue and creator features."
              priority="Medium"
              processingTime="14-30 days"
              successRate="90%"
              accentColor="red"
              priceColor="text-red-300"
              buttonClassName="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600"
            />
          </div>
        </SectionDropdown>
        </FadeInSection>
        </AnimatedPageWrapper>
      </div>
    </ProtectedRoute>
  )
}

function YouTubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}