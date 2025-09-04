"use client"

import Navigation from "@/components/navigation"
import { PlatformButtons } from "@/components/platform-buttons"
import Link from "next/link"
import TelegramConnect from "@/components/telegram-connect"
import { FilterProvider } from "@/contexts/filter-context"
import PriceFilteredPromotion from "@/components/price-filtered-promotion"

export default function PostPromosPage() {
  return (
    <FilterProvider>
      <div>
        <Navigation />

        {/* Social Media Sub Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/social-media"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-background-tertiary text-text-secondary hover:text-text-primary"
          >
            Monthly Packages
          </Link>
          <Link
            href="/social-media/post-promos"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-green-dark text-white"
          >
            Post Promotion
          </Link>
          <Link
            href="/social-media/account-services"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-background-tertiary text-text-secondary hover:text-text-primary"
          >
            Account Services
          </Link>
        </div>

        <PlatformButtons />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Post Promotions</h2>

          <div className="space-y-6">
            <PriceFilteredPromotion price={39}>
              <div className="bg-background-secondary rounded-lg p-6 border border-border">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Professional Post Campaign</h3>
                    <p className="text-text-secondary mb-4">
                      Enhance engagement on a single post with our professional package. Perfect for testing our
                      services or promoting specific content.
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">300-400+ likes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">3,000-4,000+ views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">30-50+ saves</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">10-20+ shares</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                    <div className="text-2xl font-bold text-green-light mb-1">$39.00</div>
                    <div className="text-text-tertiary mb-3">per post</div>
                    <button className="bg-green-medium hover:bg-green-dark text-white font-semibold py-2 px-6 rounded-md transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </PriceFilteredPromotion>

            <PriceFilteredPromotion price={69}>
              <div className="bg-background-secondary rounded-lg p-6 border border-border">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Business Post Campaign</h3>
                    <p className="text-text-secondary mb-4">
                      Medium-level engagement boost for a single post. Ideal for businesses wanting to highlight
                      important announcements or promotions.
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">700-1,000+ likes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">5,000-10,000+ views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">50-100+ saves</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">25-50+ shares</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                    <div className="text-2xl font-bold text-green-light mb-1">$69.00</div>
                    <div className="text-text-tertiary mb-3">per post</div>
                    <button className="bg-green-medium hover:bg-green-dark text-white font-semibold py-2 px-6 rounded-md transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </PriceFilteredPromotion>

            <PriceFilteredPromotion price={99}>
              <div className="bg-background-secondary rounded-lg p-6 border border-border">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Executive Post Campaign</h3>
                    <p className="text-text-secondary mb-4">
                      High-level engagement boost for a single post. Perfect for influencers and brands wanting to
                      maximize reach and interaction.
                    </p>

                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">1,500-2,000+ likes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">7,500-15,000+ views</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">100-200+ saves</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-light">✓</span>
                        <span className="text-text-secondary">50-100+ shares</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-center mt-4 md:mt-0">
                    <div className="text-2xl font-bold text-green-light mb-1">$99.00</div>
                    <div className="text-text-tertiary mb-3">per post</div>
                    <button className="bg-green-medium hover:bg-green-dark text-white font-semibold py-2 px-6 rounded-md transition-colors">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </PriceFilteredPromotion>
          </div>
        </section>

        <TelegramConnect />
      </div>
    </FilterProvider>
  )
}
