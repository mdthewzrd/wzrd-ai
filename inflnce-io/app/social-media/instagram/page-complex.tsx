"use client"

import PackageCard from "@/components/package-card"
import ServiceCard from "@/components/service-card"
import TelegramConnect from "@/components/telegram-connect"
import SectionDropdown from "@/components/section-dropdown"
import SocialMediaFilters from "@/components/social-media-filters"
import type React from "react"
import PriceFilteredPromotion from "@/components/price-filtered-promotion"
import PlatformButtons from "@/components/platform-buttons"
import PerUnitService from "@/components/per-unit-service"

export default function InstagramPage() {
  // Define Instagram colors
  const accentColor = "#ec4899" // pink-500
  const trackColor = "#f9a8d4" // pink-300

  return (
    <>
      {/* Platform Buttons */}
      <PlatformButtons />

      {/* Platform Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg p-6 mb-6 flex items-center gap-4">
        <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center">
          <InstagramIcon className="w-8 h-8 text-pink-500" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Instagram Services</h1>
          <p className="text-white text-opacity-90">Boost your Instagram presence with our premium services</p>
        </div>
      </div>

      {/* Simplified Price Filter */}
      <SocialMediaFilters accentColor={accentColor} trackColor={trackColor} />

      {/* Monthly Packages Section */}
      <SectionDropdown title="Monthly Packages">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PackageCard
            title="Instagram Professional"
            price="199.00"
            description="Starter package for individuals and small businesses looking to establish a presence on Instagram."
            bestValue={true}
            features={[
              "1,000-2,000+ followers per month",
              "5,000-10,000+ likes per month",
              "100-200+ comments per month",
              "5-10+ saves per post",
              "30 day campaign",
              "Up to 15 posts",
            ]}
            textColor="text-pink-500"
            buttonBgColor="bg-pink-500 hover:bg-pink-600"
            checkColor="text-pink-500"
          />

          <PackageCard
            title="Instagram Business"
            price="399.00"
            description="Intermediate package for growing brands and established influencers."
            features={[
              "5,000-10,000+ followers per month",
              "20,000-50,000+ likes per month",
              "500-1,000+ comments per month",
              "50-100+ saves per post",
              "30 day campaign",
              "Up to 30 posts",
            ]}
            textColor="text-pink-500"
            buttonBgColor="bg-pink-500 hover:bg-pink-600"
            checkColor="text-pink-500"
          />

          <PackageCard
            title="Instagram Executive"
            price="799.00"
            description="Advanced package for professional brands and public figures seeking substantial growth."
            features={[
              "20,000-50,000+ followers per month",
              "100,000-200,000+ likes per month",
              "2,000-5,000+ comments per month",
              "200-500+ saves per post",
              "30 day campaign",
              "Up to 60 posts",
            ]}
            textColor="text-pink-500"
            buttonBgColor="bg-pink-500 hover:bg-pink-600"
            checkColor="text-pink-500"
          />
        </div>
      </SectionDropdown>

      {/* Post Promotions Section */}
      <SectionDropdown title="Post Promotions">
        <div className="space-y-6">
          <PriceFilteredPromotion price={49}>
            <div className="bg-background-secondary rounded-lg p-6 border border-border">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Instagram Post Boost</h3>
                  <p className="text-text-secondary mb-4">
                    Enhance engagement for a single Instagram post with our professional package. Perfect for product
                    launches and announcements.
                  </p>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span className="text-text-secondary">1,000-2,000+ likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span className="text-text-secondary">100-200+ comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span className="text-text-secondary">50-100+ saves</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span className="text-text-secondary">500-1,000+ profile visits</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                  <div className="text-2xl font-bold text-pink-500 mb-1">$49.00</div>
                  <div className="text-text-tertiary mb-3">per post</div>
                  <div className="flex gap-2">
                    <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-md transition-colors">
                      Buy Now
                    </button>
                    <button className="border border-border hover:bg-background-tertiary text-text-primary font-semibold py-2 px-3 rounded-md transition-colors">
                      ★
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </PriceFilteredPromotion>

          <PriceFilteredPromotion price={79}>
            <div className="bg-background-secondary rounded-lg p-6 border border-border">
              <div className="flex flex-col md:flex-row justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Instagram Reel Promotion</h3>
                  <p className="text-text-secondary mb-4">
                    Boost your Instagram Reel with our specialized promotion package. Increase views and engagement.
                  </p>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span className="text-text-secondary">10,000-20,000+ views</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span className="text-text-secondary">1,000-2,000+ likes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span className="text-text-secondary">100-300+ comments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pink-500">✓</span>
                      <span className="text-text-secondary">50-100+ shares</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                  <div className="text-2xl font-bold text-pink-500 mb-1">$79.00</div>
                  <div className="text-text-tertiary mb-3">per reel</div>
                  <div className="flex gap-2">
                    <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-md transition-colors">
                      Buy Now
                    </button>
                    <button className="border border-border hover:bg-background-tertiary text-text-primary font-semibold py-2 px-3 rounded-md transition-colors">
                      ★
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </PriceFilteredPromotion>
        </div>
      </SectionDropdown>

      {/* Engagement Services Section */}
      <SectionDropdown title="Engagement Services">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PerUnitService
            title="Instagram Followers"
            description="Grow your audience with high-quality followers"
            pricePerUnit={9.99}
            unit="followers"
            unitAmount={1000}
            icon={<InstagramIcon className="w-5 h-5 text-pink-500" />}
            textColor="text-pink-500"
            buttonBgColor="bg-pink-500 hover:bg-pink-600"
            featured={true}
          />

          <PerUnitService
            title="Instagram Likes"
            description="Increase engagement with high-quality likes"
            pricePerUnit={1.25}
            unit="likes"
            unitAmount={100}
            icon={<InstagramIcon className="w-5 h-5 text-pink-500" />}
            textColor="text-pink-500"
            buttonBgColor="bg-pink-500 hover:bg-pink-600"
          />

          <PerUnitService
            title="Instagram Comments"
            description="Add authentic comments to your posts"
            pricePerUnit={2.5}
            unit="comments"
            unitAmount={10}
            icon={<InstagramIcon className="w-5 h-5 text-pink-500" />}
            textColor="text-pink-500"
            buttonBgColor="bg-pink-500 hover:bg-pink-600"
          />

          <PerUnitService
            title="Instagram Views"
            description="Increase view count on your content"
            pricePerUnit={0.98}
            unit="views"
            unitAmount={1000}
            icon={<InstagramIcon className="w-5 h-5 text-pink-500" />}
            textColor="text-pink-500"
            buttonBgColor="bg-pink-500 hover:bg-pink-600"
          />

          <PerUnitService
            title="Instagram Saves"
            description="Boost algorithm ranking with saves"
            pricePerUnit={0.3}
            unit="saves"
            unitAmount={10}
            icon={<InstagramIcon className="w-5 h-5 text-pink-500" />}
            textColor="text-pink-500"
            buttonBgColor="bg-pink-500 hover:bg-pink-600"
          />
        </div>
      </SectionDropdown>

      {/* Account Services Section */}
      <SectionDropdown title="Account Services">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ServiceCard
            title="Instagram Verification"
            price={{ value: "2,500", retail: "4,000" }}
            description="Get the blue verification badge for your Instagram profile. Enhance credibility and visibility."
            priority="High"
            processingTime="14-30 days"
            successRate="70%"
          />

          <ServiceCard
            title="Instagram Account Recovery"
            price={{ value: "800", retail: "1,200" }}
            description="Recover your suspended or disabled Instagram account with our specialized service."
            priority="Medium"
            processingTime="7-14 days"
            successRate="75%"
          />

          <ServiceCard
            title="Instagram Algorithm Boost"
            price={{ value: "1,500", retail: "2,500" }}
            description="Improve your visibility in Instagram's algorithm for better reach and engagement."
            priority="Medium"
            processingTime="14-21 days"
            successRate="80%"
          />

          <ServiceCard
            title="Instagram Analytics Setup"
            price={{ value: "400", retail: "700" }}
            description="Professional setup of Instagram Analytics for your account with custom reporting."
            priority="Low"
            processingTime="3-5 days"
            successRate="95%"
          />
        </div>
      </SectionDropdown>

      <TelegramConnect />
    </>
  )
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}
