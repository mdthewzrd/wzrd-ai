"use client"

import Navigation from "@/components/navigation"
import { PlatformButtons } from "@/components/platform-buttons"
import Link from "next/link"
import ServiceCard from "@/components/service-card"
import TelegramConnect from "@/components/telegram-connect"
import { FilterProvider } from "@/contexts/filter-context"

export default function AccountServicesPage() {
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
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-background-tertiary text-text-secondary hover:text-text-primary"
          >
            Post Promotion
          </Link>
          <Link
            href="/social-media/account-services"
            className="px-4 py-2 rounded-md text-sm font-medium transition-colors bg-green-dark text-white"
          >
            Account Services
          </Link>
        </div>

        <PlatformButtons />

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Account Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ServiceCard
              title="Instagram Account Unban"
              price={{ value: "1,000", retail: "1,500" }}
              description="Get your banned Instagram account recovered with our premium service. Success rate of 85%."
              priority="High"
              processingTime="3-7 days"
              successRate="85%"
            />

            <ServiceCard
              title="Instagram Username Claim"
              price={{ value: "1,500", retail: "2,000" }}
              description="Acquire your desired username for your Instagram account. Available for inactive usernames only."
              priority="Medium"
              processingTime="7-14 days"
              successRate="70%"
            />

            <ServiceCard
              title="TikTok Account Recovery"
              price={{ value: "800", retail: "1,200" }}
              description="Get your banned or locked TikTok account recovered with our specialized service."
              priority="Medium"
              processingTime="5-10 days"
              successRate="75%"
            />

            <ServiceCard
              title="YouTube Channel Monetization"
              price={{ value: "1,200", retail: "1,800" }}
              description="Get your YouTube channel monetized with our premium service. We'll help you meet all requirements."
              priority="Medium"
              processingTime="14-21 days"
              successRate="80%"
            />
          </div>
        </section>

        <TelegramConnect />
      </div>
    </FilterProvider>
  )
}
