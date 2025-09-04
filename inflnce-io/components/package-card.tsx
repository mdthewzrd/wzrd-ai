"use client"

import { useState, useEffect } from "react"
import { Check, Star } from "lucide-react"
import BuyNowButton from "./buy-now-button"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { useFilter, passesFilter } from "@/contexts/filter-context"

type PackageCardProps = {
  title: string
  description: string
  price: string
  retailPrice: string
  features: string[]
  featured?: boolean
  platform?: string // Optional platform override
  accentColor?: string
  priceColor?: string
  buttonClassName?: string
  checkColor?: string
}

export default function PackageCard({
  title,
  description,
  price,
  retailPrice,
  features,
  featured = false,
  platform,
  accentColor,
  priceColor,
  buttonClassName,
  checkColor,
}: PackageCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)
  const pathname = usePathname()

  // Determine the platform from the pathname if not provided
  const currentPlatform = platform || pathname?.split("/").filter(Boolean)[1] || "general"
  const platformPath = pathname?.split("/").filter(Boolean)[2] || "general"

  // Create a unique ID that includes the platform
  const packageId = `${currentPlatform}-${platformPath}-${title.toLowerCase().replace(/\s+/g, "-")}`

  // Use the filter context
  const { priceFilter } = useFilter()

  // Check if this package should be hidden based on price filter
  const isHidden = !passesFilter(price, priceFilter)

  let gradientColor = "from-green-dark to-green-light"
  let borderColor = "border-green-dark"
  let defaultCheckColor = "text-green-light"
  let defaultButtonClass = "bg-green-medium hover:bg-green-dark"
  let defaultPriceColor = ""

  if (pathname?.includes("/instagram")) {
    gradientColor = "from-purple-600 to-pink-500"
    borderColor = "border-pink-500"
    defaultCheckColor = "text-pink-500"
    defaultButtonClass = "bg-pink-500 hover:bg-pink-600"
    defaultPriceColor = "text-pink-500"
  } else if (pathname?.includes("/youtube")) {
    gradientColor = "from-red-600 to-red-500"
    borderColor = "border-red-600"
    defaultCheckColor = "text-red-500"
    defaultButtonClass = "bg-red-600 hover:bg-red-700"
    defaultPriceColor = "text-red-500"
  } else if (pathname?.includes("/tiktok")) {
    gradientColor = "from-pink-500 to-pink-400"
    borderColor = "border-pink-500"
    defaultCheckColor = "text-pink-300"
    defaultButtonClass = "bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-700 hover:to-pink-600"
    defaultPriceColor = "text-pink-300"
  } else if (pathname?.includes("/twitter")) {
    gradientColor = "from-blue-500 to-sky-400"
    borderColor = "border-blue-500"
    defaultCheckColor = "text-blue-500"
    defaultButtonClass = "bg-blue-500 hover:bg-blue-600"
    defaultPriceColor = "text-blue-500"
  } else if (pathname?.includes("/linkedin")) {
    gradientColor = "from-blue-700 to-blue-500"
    borderColor = "border-blue-700"
    defaultCheckColor = "text-blue-700"
    defaultButtonClass = "bg-blue-700 hover:bg-blue-800"
    defaultPriceColor = "text-blue-700"
  } else if (pathname?.includes("/spotify")) {
    gradientColor = "from-green-600 to-green-400"
    borderColor = "border-green-600"
    defaultCheckColor = "text-green-600"
    defaultButtonClass = "bg-green-600 hover:bg-green-700"
    defaultPriceColor = "text-green-600"
  }

  // Use provided colors or defaults
  const finalCheckColor = checkColor || defaultCheckColor
  const finalButtonClass = buttonClassName || defaultButtonClass
  const finalPriceColor = priceColor || defaultPriceColor

  useEffect(() => {
    // Only run this effect in the browser
    if (typeof window !== "undefined") {
      // Load favorite status from localStorage
      const favorites = JSON.parse(localStorage.getItem("favorites") || "{}")
      setIsFavorite(!!favorites[packageId])
    }
  }, [packageId])

  const toggleFavorite = () => {
    const newStatus = !isFavorite
    setIsFavorite(newStatus)

    // Save to localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites") || "{}")
    if (newStatus) {
      favorites[packageId] = {
        title,
        price,
        type: "package",
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
      delete favorites[packageId]
    }
    localStorage.setItem("favorites", JSON.stringify(favorites))

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("favoritesUpdated"))
  }

  // If this package should be hidden based on price filter, don't render it
  if (isHidden) {
    return null
  }

  return (
    <div
      className={cn(
        "relative bg-background-secondary rounded-lg p-4 sm:p-6 border border-border",
        featured && borderColor,
      )}
    >
      {featured && (
        <div
          className={`absolute -top-3 left-1/2 transform -translate-x-1/2 ${finalButtonClass} text-white text-xs py-1 px-3 rounded-full`}
        >
          POPULAR
        </div>
      )}

      <button
        className={cn("favorite-btn", isFavorite && "active text-yellow-500")}
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Star className="w-4 h-4 text-yellow-500" fill={isFavorite ? "currentColor" : "none"} />
      </button>

      <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-text-secondary mb-4">{description}</p>

      <div className="mb-4">
        {finalPriceColor ? (
          <div className={`text-lg sm:text-xl font-bold ${finalPriceColor}`}>${price}</div>
        ) : (
          <div
            className={`text-lg sm:text-xl font-bold bg-gradient-to-r ${gradientColor} bg-clip-text text-transparent`}
          >
            ${price}
          </div>
        )}
        <div className="text-xs text-text-tertiary line-through">Retail: ${retailPrice}</div>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-semibold mb-2">Features:</h4>
        <ul className="space-y-2">
          {features.map((feature, index) => {
            const isAnalytics = feature.toLowerCase().includes('analytics')
            return (
              <li key={index} className={cn(
                "flex items-start gap-2 text-xs sm:text-sm",
                isAnalytics && "p-2 border border-cyan-500 rounded-md bg-cyan-500/5"
              )}>
                <Check className={`w-4 h-4 ${finalCheckColor} mt-0.5`} />
                <span dangerouslySetInnerHTML={{ __html: feature }} />
              </li>
            )
          })}
        </ul>
      </div>

      {buttonClassName ? (
        <button className={`${buttonClassName} w-full py-2 rounded-md text-white font-medium`}>Buy Now</button>
      ) : (
        <BuyNowButton />
      )}
    </div>
  )
}
