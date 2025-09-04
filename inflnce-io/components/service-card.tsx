"use client"

import type React from "react"

import { Clock, CheckCircle, Star, Shield, Award, TrendingUp } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useFilter } from "@/contexts/filter-context"
import { usePathname } from "next/navigation"

type PriceType = string | { value: string; retail: string }

type ServiceCardProps = {
  title: string
  price: PriceType
  description: string
  priority?: "High" | "Medium"
  processingTime?: string
  successRate?: string
  icon?: React.ReactNode
  platform?: string // Optional platform override
}

export default function ServiceCard({
  title,
  price,
  description,
  priority,
  processingTime,
  successRate,
  icon,
  platform,
}: ServiceCardProps) {
  const isStartingFrom = typeof price !== "string"
  const [isFavorite, setIsFavorite] = useState(false)
  const pathname = usePathname()

  // Determine the platform from the pathname if not provided
  const currentPlatform = platform || pathname?.split("/").filter(Boolean)[1] || "general"
  const platformPath = pathname?.split("/").filter(Boolean)[2] || "general"

  // Create a unique ID that includes the platform
  const serviceId = `${currentPlatform}-${platformPath}-${title.toLowerCase().replace(/\s+/g, "-")}`

  // Use the hook unconditionally
  const { priceFilter: contextPriceFilter } = useFilter()
  const priceFilter = contextPriceFilter !== undefined ? contextPriceFilter : 0

  // Get the price value for comparison
  const priceValue = isStartingFrom
    ? Number.parseFloat(price.value.replace(/,/g, "").replace(/\$/g, ""))
    : Number.parseFloat(String(price).replace(/,/g, "").replace(/\$/g, ""))

  // Check if this service should be hidden based on price filter
  const isHidden = priceFilter > 0 && priceValue > priceFilter

  let accentColor = "text-green-light"
  let buttonClass = "bg-green-medium hover:bg-green-dark"
  let checkColor = "text-green-light"

  if (pathname?.includes("/instagram")) {
    accentColor = "text-pink-500"
    buttonClass = "bg-pink-500 hover:bg-pink-600"
    checkColor = "text-pink-500"
  } else if (pathname?.includes("/youtube")) {
    accentColor = "text-red-500"
    buttonClass = "bg-red-600 hover:bg-red-700"
    checkColor = "text-red-500"
  } else if (pathname?.includes("/tiktok")) {
    accentColor = "text-pink-600"
    buttonClass = "bg-black hover:bg-pink-700"
    checkColor = "text-pink-600"
  } else if (pathname?.includes("/twitter")) {
    accentColor = "text-blue-500"
    buttonClass = "bg-blue-500 hover:bg-blue-600"
    checkColor = "text-blue-500"
  } else if (pathname?.includes("/linkedin")) {
    accentColor = "text-blue-700"
    buttonClass = "bg-blue-700 hover:bg-blue-800"
    checkColor = "text-blue-700"
  } else if (pathname?.includes("/spotify")) {
    accentColor = "text-green-600"
    buttonClass = "bg-green-600 hover:bg-green-700"
    checkColor = "text-green-600"
  } else {
    accentColor = "text-green-light"
    buttonClass = "green-gradient-bg"
    checkColor = "text-green-light"
  }

  useEffect(() => {
    // Only run this effect in the browser
    if (typeof window !== "undefined") {
      // Load favorite status from localStorage
      const favorites = JSON.parse(localStorage.getItem("favorites") || "{}")
      setIsFavorite(!!favorites[serviceId])
    }
  }, [serviceId])

  const toggleFavorite = () => {
    const newStatus = !isFavorite
    setIsFavorite(newStatus)

    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}")
    if (newStatus) {
      favorites[serviceId] = {
        title,
        price: isStartingFrom ? price.value : price,
        type: "service",
        category: currentPlatform.includes("social-media")
          ? "social-media"
          : currentPlatform.includes("publications")
            ? "publications"
            : currentPlatform.includes("tools")
              ? "tools"
              : "social-media",
        platform: currentPlatform,
        platformSpecific: platformPath,
      }
    } else {
      delete favorites[serviceId]
    }
    localStorage.setItem("favorites", JSON.stringify(favorites))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("favoritesUpdated"))
  }

  // Determine which icon to use if none provided
  const defaultIcon = !icon ? (
    title.includes("Verification") ? (
      <Award className="w-5 h-5" />
    ) : title.includes("Recovery") ? (
      <Shield className="w-5 h-5" />
    ) : (
      <TrendingUp className="w-5 h-5" />
    )
  ) : (
    icon
  )

  // If this service should be hidden based on price filter, don't render it
  if (isHidden) {
    return null
  }

  return (
    <div className="relative bg-background-secondary rounded-lg p-4 sm:p-6 border border-border">
      <button
        className={cn("favorite-btn", isFavorite && "active text-yellow-500")}
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star className="w-4 h-4 text-yellow-500" fill={isFavorite ? "currentColor" : "none"} />
      </button>

      <div className="flex items-center gap-3 mb-2">
        <div className="icon-container">{defaultIcon}</div>
        <h3 className="text-base sm:text-lg font-bold">{title}</h3>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
        <div></div>
        {priority && (
          <span
            className={`${priority === "High" ? "priority-high" : "priority-medium"} mt-1 sm:mt-0 inline-block text-xs`}
          >
            {priority} Priority
          </span>
        )}
      </div>

      <p className="text-xs sm:text-sm text-text-secondary mb-4">{description}</p>

      {processingTime && (
        <div className="flex items-center gap-2 text-text-secondary text-xs sm:text-sm mb-2">
          <Clock className="w-4 h-4" />
          <span>{processingTime} processing</span>
        </div>
      )}

      {successRate && (
        <div className="flex items-center gap-2 text-text-secondary text-xs sm:text-sm mb-4">
          <CheckCircle className={`w-4 h-4 ${checkColor}`} />
          <span>{successRate} success rate</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-4 sm:gap-0">
        <div>
          {isStartingFrom ? (
            <div>
              <div className="text-xs text-text-tertiary">Starting from</div>
              <div className={`text-lg sm:text-xl font-bold ${accentColor}`}>${price.value}</div>
              <div className="text-xs text-text-tertiary line-through">Retail: ${price.retail}</div>
            </div>
          ) : (
            <div className={`text-lg sm:text-xl font-bold ${accentColor}`}>${price}</div>
          )}
        </div>
        <button className={`${buttonClass} px-3 py-1.5 rounded-md text-white text-sm`}>View Details</button>
      </div>
    </div>
  )
}
