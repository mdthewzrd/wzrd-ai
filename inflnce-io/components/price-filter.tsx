"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"

interface PriceFilterProps {
  defaultValue?: number
  onChange: (value: number) => void
  max?: number
}

export default function PriceFilter({ defaultValue = 0, onChange, max = 5000 }: PriceFilterProps) {
  const [value, setValue] = useState(defaultValue)
  const [displayValue, setDisplayValue] = useState(defaultValue)

  // Update the filter when the value changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange(value)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [value, onChange])

  // Format the price for display
  const formatPrice = (price: number) => {
    if (price === 0) return "No limit"
    return `$${price.toLocaleString()}`
  }

  // Calculate the percentage for the slider
  const calculatePercentage = (value: number) => {
    return (value / max) * 100
  }

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <label htmlFor="price-filter" className="text-sm font-medium">
          Price Filter
        </label>
        <span className="text-sm font-medium text-green-light">{formatPrice(displayValue)}</span>
      </div>

      <div className="relative">
        <Slider
          id="price-filter"
          min={0}
          max={max}
          step={50}
          value={[value]}
          onValueChange={(values) => {
            setValue(values[0])
            setDisplayValue(values[0])
          }}
          className="py-4"
        />

        {/* Price markers */}
        <div className="flex justify-between mt-1">
          <span className="text-xs text-text-secondary">$0</span>
          <span className="text-xs text-text-secondary">${Math.floor(max / 2).toLocaleString()}</span>
          <span className="text-xs text-text-secondary">${max.toLocaleString()}</span>
        </div>

        {/* Active range indicator */}
        {value > 0 && (
          <div
            className="absolute h-1 bg-gradient-to-r from-green-dark to-green-light rounded-full"
            style={{
              width: `${calculatePercentage(value)}%`,
              bottom: "calc(1.5rem + 2px)",
              left: 0,
            }}
          ></div>
        )}
      </div>
    </div>
  )
}
