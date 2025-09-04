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

export default function InstagramPage() {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8 pb-16">
        <AnimatedPageWrapper>
        {/* Platform Header */}
        <FadeInSection>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                <InstagramIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Instagram Services</h1>
                <p className="text-white/80">Grow your Instagram presence with our premium services</p>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* Post Promotions Section */}
        <FadeInSection delay={0.2}>
          <SectionDropdown title="Post Promotions" defaultOpen={true}>
            <div className="space-y-6">
              <PriceFilteredPromotion price={29}>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Basic Post Promotion</h3>
                      <p className="text-gray-400 mb-4">
                        Enhance engagement on a single Instagram post with our basic package. Perfect for testing our services.
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-purple-300 font-bold">500-1,000+</span> likes
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-purple-300 font-bold">50-100+</span> comments
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-purple-300 font-bold">2,000-3,000+</span> views
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-purple-300 font-bold">10-20+</span> saves
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-purple-300 mb-1">$29.00</div>
                      <div className="text-purple-200 mb-3">per post</div>
                      <BuyNowButton className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white" />
                    </div>
                  </div>
                </div>
              </PriceFilteredPromotion>

              <PriceFilteredPromotion price={59}>
                <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-white">Standard Post Promotion</h3>
                      <p className="text-gray-400 mb-4">
                        Medium-level engagement boost for a single post. Ideal for content creators wanting to increase visibility.
                      </p>
                      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        <div className="flex items-center gap-2">
                          <span className="text-purple-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-purple-300 font-bold">1,500-2,500+</span> likes
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-purple-300 font-bold">150-250+</span> comments
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-purple-300 font-bold">5,000-8,000+</span> views
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-purple-500 font-bold">✓</span>
                          <span className="text-white font-medium">
                            <span className="text-purple-300 font-bold">25-50+</span> saves
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                      <div className="text-2xl font-bold text-purple-300 mb-1">$59.00</div>
                      <div className="text-purple-200 mb-3">per post</div>
                      <BuyNowButton className="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white" />
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
              title="Starter"
              price="149.00"
              retailPrice="249.00"
              description="Starter package for new Instagram accounts looking to establish presence."
              featured={true}
              features={[
                "<span class='text-purple-300 font-bold'>8</span> posts per month",
                "<span class='text-purple-300 font-bold'>500-1,000+</span> likes per post",
                "<span class='text-purple-300 font-bold'>50-100+</span> comments per post",
                "<span class='text-purple-300 font-bold'>2,000-3,000+</span> views per post",
                "<span class='text-purple-300 font-bold'>10-20+</span> saves per post",
                "Monthly analytics report",
              ]}
              priceColor="text-purple-300"
              checkColor="text-purple-300"
              buttonClassName="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            />

            <PackageCard
              title="Professional"
              price="299.00"
              retailPrice="449.00"
              description="Intermediate package for growing Instagram accounts seeking consistent engagement."
              features={[
                "<span class='text-purple-300 font-bold'>12</span> posts per month",
                "<span class='text-purple-300 font-bold'>1,500-2,500+</span> likes per post",
                "<span class='text-purple-300 font-bold'>150-250+</span> comments per post",
                "<span class='text-purple-300 font-bold'>5,000-8,000+</span> views per post",
                "<span class='text-purple-300 font-bold'>25-50+</span> saves per post",
                "Monthly analytics report",
                "Story promotion included",
              ]}
              priceColor="text-purple-300"
              checkColor="text-purple-300"
              buttonClassName="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            />

            <PackageCard
              title="Enterprise"
              price="599.00"
              retailPrice="899.00"
              description="Advanced package for established Instagram accounts seeking substantial growth and viral potential."
              features={[
                "<span class='text-purple-300 font-bold'>15</span> posts per month",
                "<span class='text-purple-300 font-bold'>5,000-8,000+</span> likes per post",
                "<span class='text-purple-300 font-bold'>500-800+</span> comments per post",
                "<span class='text-purple-300 font-bold'>20,000-30,000+</span> views per post",
                "<span class='text-purple-300 font-bold'>100-200+</span> saves per post",
                "Algorithm optimization",
                "Advanced analytics",
                "Viral potential strategy",
              ]}
              priceColor="text-purple-300"
              checkColor="text-purple-300"
              buttonClassName="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            />
          </div>
        </SectionDropdown>
        </FadeInSection>

        {/* Engagement Services Section */}
        <FadeInSection delay={0.4}>
          <SectionDropdown title="Engagement Services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PerUnitService
              title="Instagram Followers"
              description="Grow your audience with high-quality followers"
              pricePerUnit={6.99}
              unit="followers"
              unitAmount={1000}
              icon={<InstagramIcon className="w-5 h-5 text-purple-300" />}
              textColor="text-purple-300"
              buttonBgColor="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
              featured={true}
            />

            <PerUnitService
              title="Instagram Likes"
              description="Increase likes on your posts"
              pricePerUnit={1.99}
              unit="likes"
              unitAmount={100}
              icon={<InstagramIcon className="w-5 h-5 text-purple-300" />}
              textColor="text-purple-300"
              buttonBgColor="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            />

            <PerUnitService
              title="Instagram Views"
              description="Boost views on your video content"
              pricePerUnit={0.99}
              unit="views"
              unitAmount={1000}
              icon={<InstagramIcon className="w-5 h-5 text-purple-300" />}
              textColor="text-purple-300"
              buttonBgColor="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            />

            <PerUnitService
              title="Instagram Comments"
              description="Add authentic comments to your posts"
              pricePerUnit={2.49}
              unit="comments"
              unitAmount={10}
              icon={<InstagramIcon className="w-5 h-5 text-purple-300" />}
              textColor="text-purple-300"
              buttonBgColor="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            />
          </div>
        </SectionDropdown>
        </FadeInSection>

        {/* Account Services Section */}
        <FadeInSection delay={0.5}>
          <SectionDropdown title="Account Services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              title="Instagram Verification"
              price={{ value: "1,200", retail: "2,000" }}
              description="Get the verified badge for your Instagram account to enhance credibility and visibility."
              priority="High"
              processingTime="21-35 days"
              successRate="75%"
              accentColor="purple"
              priceColor="text-purple-300"
              buttonClassName="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            />

            <ServiceCard
              title="Instagram Creator Fund Eligibility"
              price={{ value: "899", retail: "1,299" }}
              description="Get your Instagram account eligible for monetization features and creator programs."
              priority="Medium"
              processingTime="14-28 days"
              successRate="80%"
              accentColor="purple"
              priceColor="text-purple-300"
              buttonClassName="bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600"
            />
          </div>
        </SectionDropdown>
        </FadeInSection>
        </AnimatedPageWrapper>
      </div>
    </ProtectedRoute>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  )
}