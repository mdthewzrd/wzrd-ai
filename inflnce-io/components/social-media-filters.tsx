"use client"

import { useState } from "react"
import PriceFilter from "./price-filter"

interface SocialMediaFiltersProps {
  accentColor?: string
  trackColor?: string
}

export default function SocialMediaFilters({ accentColor, trackColor }: SocialMediaFiltersProps) {
  const [priceFilter, setPriceFilter] = useState(1000)

  return (
    <div className="mb-6">
      <PriceFilter
        defaultValue={priceFilter}
        onChange={setPriceFilter}
        accentColor={accentColor}
        trackColor={trackColor}
      />
    </div>
  )
}
