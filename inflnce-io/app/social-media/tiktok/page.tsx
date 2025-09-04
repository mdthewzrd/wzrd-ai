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

export default function TikTokPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 pb-16">
        <AnimatedPageWrapper>
        {/* Platform Header */}
        <FadeInSection>
          <div className="bg-gradient-to-r from-black to-pink-600 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <TikTokIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">TikTok Services</h1>
                <p className="text-white/80">Boost your TikTok presence with our premium services</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Video Promotions Section */}
        <FadeInSection delay={0.2}>
          <SectionDropdown title="Video Promotions" defaultOpen={true}>
          <div className="space-y-6">
            <PriceFilteredPromotion price={39}>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Basic Video Promotion</h3>
                    <p className="text-gray-400 mb-4">
                      Enhance engagement on a single TikTok video with our basic package. Perfect for testing our services.
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500 font-bold">✓</span>
                        <span className="text-white font-medium">
                          <span className="text-pink-300 font-bold">1,000-2,000+</span> views
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500 font-bold">✓</span>
                        <span className="text-white font-medium">
                          <span className="text-pink-300 font-bold">100-200+</span> likes
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500 font-bold">✓</span>
                        <span className="text-white font-medium">
                          <span className="text-pink-300 font-bold">10-20+</span> comments
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500 font-bold">✓</span>
                        <span className="text-white font-medium">
                          <span className="text-pink-300 font-bold">5-10+</span> shares
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                    <div className="text-2xl font-bold text-pink-300 mb-1">$39.00</div>
                    <div className="text-pink-200 mb-3">per video</div>
                    <BuyNowButton className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white" />
                  </div>
                </div>
              </div>
            </PriceFilteredPromotion>

            <PriceFilteredPromotion price={79}>
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Standard Video Promotion</h3>
                    <p className="text-gray-400 mb-4">
                      Medium-level engagement boost for a single video. Ideal for content creators wanting to increase visibility.
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500 font-bold">✓</span>
                        <span className="text-white font-medium">
                          <span className="text-pink-300 font-bold">3,000-5,000+</span> views
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500 font-bold">✓</span>
                        <span className="text-white font-medium">
                          <span className="text-pink-300 font-bold">300-500+</span> likes
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500 font-bold">✓</span>
                        <span className="text-white font-medium">
                          <span className="text-pink-300 font-bold">30-50+</span> comments
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-pink-500 font-bold">✓</span>
                        <span className="text-white font-medium">
                          <span className="text-pink-300 font-bold">15-30+</span> shares
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                    <div className="text-2xl font-bold text-pink-300 mb-1">$79.00</div>
                    <div className="text-pink-200 mb-3">per video</div>
                    <BuyNowButton className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600 text-white" />
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
              description="Starter package for small TikTok accounts looking to establish a presence."
              featured={true}
              features={[
                "<span class='text-pink-300 font-bold'>10</span> videos per month",
                "<span class='text-pink-300 font-bold'>1,000-2,000+</span> views per video",
                "<span class='text-pink-300 font-bold'>100-200+</span> likes per video",
                "<span class='text-pink-300 font-bold'>10-20+</span> comments per video",
                "<span class='text-pink-300 font-bold'>5-10+</span> shares per video",
                "Monthly analytics report",
              ]}
              priceColor="text-pink-300"
              checkColor="text-pink-300"
              buttonClassName="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
            />

            <PackageCard
              title="Influencer"
              price="399.00"
              retailPrice="599.00"
              description="Intermediate package for growing TikTok accounts seeking consistent engagement."
              features={[
                "<span class='text-pink-300 font-bold'>15</span> videos per month",
                "<span class='text-pink-300 font-bold'>3,000-5,000+</span> views per video",
                "<span class='text-pink-300 font-bold'>300-500+</span> likes per video",
                "<span class='text-pink-300 font-bold'>30-50+</span> comments per video",
                "<span class='text-pink-300 font-bold'>15-30+</span> shares per video",
                "Monthly analytics report",
                "Basic trend analysis",
              ]}
              priceColor="text-pink-300"
              checkColor="text-pink-300"
              buttonClassName="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
            />

            <PackageCard
              title="Viral"
              price="799.00"
              retailPrice="1,199.00"
              description="Advanced package for established TikTokers seeking substantial growth and viral potential."
              features={[
                "<span class='text-pink-300 font-bold'>20</span> videos per month",
                "<span class='text-pink-300 font-bold'>10,000-15,000+</span> views per video",
                "<span class='text-pink-300 font-bold'>1,000-1,500+</span> likes per video",
                "<span class='text-pink-300 font-bold'>100-150+</span> comments per video",
                "<span class='text-pink-300 font-bold'>50-100+</span> shares per video",
                "Algorithm optimization",
                "Advanced trend analysis",
                "Viral potential strategy",
              ]}
              priceColor="text-pink-300"
              checkColor="text-pink-300"
              buttonClassName="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
            />
          </div>
        </SectionDropdown>
        </FadeInSection>

        {/* Engagement Services Section */}
        <FadeInSection delay={0.4}>
          <SectionDropdown title="Engagement Services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerUnitService
              title="TikTok Followers"
              description="Grow your audience with high-quality followers"
              pricePerUnit={8.99}
              unit="followers"
              unitAmount={1000}
              icon={<TikTokIcon className="w-5 h-5 text-pink-300" />}
              textColor="text-pink-300"
              buttonBgColor="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
              featured={true}
            />

            <PerUnitService
              title="TikTok Views"
              description="Increase view count on your videos"
              pricePerUnit={1.49}
              unit="views"
              unitAmount={1000}
              icon={<TikTokIcon className="w-5 h-5 text-pink-300" />}
              textColor="text-pink-300"
              buttonBgColor="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
            />

            <PerUnitService
              title="TikTok Likes"
              description="Boost engagement with high-quality likes"
              pricePerUnit={1.99}
              unit="likes"
              unitAmount={100}
              icon={<TikTokIcon className="w-5 h-5 text-pink-300" />}
              textColor="text-pink-300"
              buttonBgColor="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
            />

            <PerUnitService
              title="TikTok Comments"
              description="Add authentic comments to your videos"
              pricePerUnit={2.99}
              unit="comments"
              unitAmount={10}
              icon={<TikTokIcon className="w-5 h-5 text-pink-300" />}
              textColor="text-pink-300"
              buttonBgColor="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
            />
          </div>
        </SectionDropdown>
        </FadeInSection>

        {/* Account Services Section */}
        <FadeInSection delay={0.5}>
          <SectionDropdown title="Account Services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              title="TikTok Verification"
              price={{ value: "1,500", retail: "2,500" }}
              description="Get the verified badge for your TikTok account to enhance credibility and visibility."
              priority="High"
              processingTime="30-45 days"
              successRate="70%"
              accentColor="pink"
              priceColor="text-pink-300"
              buttonClassName="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
            />

            <ServiceCard
              title="TikTok Creator Fund Eligibility"
              price={{ value: "999", retail: "1,499" }}
              description="Get your TikTok account eligible for the Creator Fund to start monetizing your content."
              priority="Medium"
              processingTime="14-30 days"
              successRate="85%"
              accentColor="pink"
              priceColor="text-pink-300"
              buttonClassName="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
            />
          </div>
        </SectionDropdown>
        </FadeInSection>
        </AnimatedPageWrapper>
      </div>
    </ProtectedRoute>
  )
}

function TikTokIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
    </svg>
  )
}