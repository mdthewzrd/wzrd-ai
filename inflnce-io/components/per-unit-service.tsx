"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Star, Check, Award } from "lucide-react"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

type PerUnitServiceProps = {
  title: string
  description: string
  pricePerUnit: number
  unit: string
  unitAmount: number
  features?: string[]
  icon?: React.ReactNode
  featured?: boolean
  textColor?: string
  buttonBgColor?: string
}

export default function PerUnitService({
  title,
  description,
  pricePerUnit,
  unit,
  unitAmount,
  features = [],
  icon,
  featured = false,
  textColor = "text-green-500",
  buttonBgColor = "bg-green-500 hover:bg-green-600",
}: PerUnitServiceProps) {
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const pathname = usePathname()

  // Determine the platform from the pathname
  const currentPlatform = pathname?.split("/").filter(Boolean)[1] || "general"
  const platformPath = pathname?.split("/").filter(Boolean)[2] || "general"

  // Create a unique ID that includes the platform
  const serviceId = `${currentPlatform}-${platformPath}-${title.toLowerCase().replace(/\s+/g, "-")}`

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
        price: pricePerUnit.toFixed(2),
        type: "per-unit-service",
        category: "social-media",
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

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value > 0) {
      setQuantity(value)
    } else {
      setQuantity(1)
    }
  }

  // Calculate total price and units
  const totalPrice = (pricePerUnit * quantity).toFixed(2)
  const totalUnits = unitAmount * quantity

  // Extract color name from textColor class for badge background
  const colorClass = buttonBgColor.split(" ")[0]

  return (
    <div
      className={cn(
        "relative bg-background-secondary rounded-lg overflow-hidden border",
        featured ? `border-${textColor.split("-")[1]}-500` : "border-border",
      )}
    >
      {/* Popular badge */}
      {featured && (
        <div
          className={`${colorClass} text-white py-1 px-3 absolute top-0 left-0 right-0 flex items-center justify-center`}
        >
          <Award className="w-4 h-4 mr-1.5" />
          <span className="font-semibold text-xs">POPULAR</span>
        </div>
      )}

      <div className={cn("p-5", featured && "pt-9")}>
        {/* Favorite button */}
        <button
          className="absolute top-3 right-3 z-10"
          onClick={toggleFavorite}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star className="w-5 h-5 text-yellow-500" fill={isFavorite ? "currentColor" : "none"} />
        </button>

        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-center">
            {icon && <span className={`${textColor} mr-2`}>{icon}</span>}
            <h3 className="text-lg font-bold">{title}</h3>
          </div>

          {/* Description */}
          <p className="text-text-secondary text-sm">{description}</p>

          {/* Features */}
          {features.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className={`w-4 h-4 ${textColor} flex-shrink-0`} />
                  <span className="text-text-secondary text-sm">{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Price and quantity */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between pt-2">
            <div className="flex flex-col mb-3 sm:mb-0">
              <div className="flex items-baseline">
                <span className={`text-2xl font-bold ${textColor}`}>${pricePerUnit.toFixed(2)}</span>
                <span className="text-text-tertiary text-sm ml-1">
                  per {unitAmount} {unit}
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-2 mb-2">
                <label htmlFor={`quantity-${serviceId}`} className="text-sm whitespace-nowrap">
                  Quantity:
                </label>
                <div className="flex border border-border rounded-md overflow-hidden">
                  <button
                    onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                    className="px-2 bg-background-tertiary text-text-primary"
                  >
                    -
                  </button>
                  <input
                    id={`quantity-${serviceId}`}
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="w-12 px-0 py-1 bg-background-tertiary border-x border-border text-center"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2 bg-background-tertiary text-text-primary"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-sm mb-3">
                Total: <span className={`font-bold ${textColor}`}>${totalPrice}</span>
                <span className="text-text-tertiary">
                  {" "}
                  for {totalUnits} {unit}
                </span>
              </div>

              <button
                className={`${buttonBgColor} text-white font-semibold py-2 px-6 rounded-md transition-colors w-full sm:w-auto`}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
