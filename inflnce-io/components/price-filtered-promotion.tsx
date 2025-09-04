"use client"

import type React from "react"
import { useFilter } from "@/contexts/filter-context"

type PriceFilteredPromotionProps = {
  price: number
  children: React.ReactNode
}

export default function PriceFilteredPromotion({ price, children }: PriceFilteredPromotionProps) {
  // Get the price filter value
  let priceFilter = 0

  try {
    const filterContext = useFilter()
    priceFilter = filterContext?.priceFilter || 0
  } catch (error) {
    // If used outside of FilterProvider, ignore
    priceFilter = 0
  }

  // If price filter is active and this promotion's price exceeds it, don't render
  if (priceFilter > 0 && price > priceFilter) {
    return null
  }

  // Otherwise, render the children
  return <>{children}</>
}
