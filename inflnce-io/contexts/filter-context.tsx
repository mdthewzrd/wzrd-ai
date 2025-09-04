"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type FilterContextType = {
  priceFilter: number
  setPriceFilter: (price: number) => void
}

// Create a default context value
const defaultContextValue: FilterContextType = {
  priceFilter: 0,
  setPriceFilter: () => {},
}

const FilterContext = createContext<FilterContextType>(defaultContextValue)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [priceFilter, setPriceFilter] = useState<number>(0)

  return <FilterContext.Provider value={{ priceFilter, setPriceFilter }}>{children}</FilterContext.Provider>
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider")
  }
  return context
}

// Helper function to check if a price passes the filter
export function passesFilter(price: string | number | { value: string; retail: string }, filterValue: number): boolean {
  if (filterValue <= 0) return true // No filter applied

  let priceValue: number

  if (typeof price === "object" && "value" in price) {
    // Handle object format with value property
    priceValue = Number.parseFloat(price.value.replace(/,/g, "").replace(/\$/g, ""))
  } else if (typeof price === "string") {
    // Handle string format
    priceValue = Number.parseFloat(price.replace(/,/g, "").replace(/\$/g, ""))
  } else {
    // Handle number format
    priceValue = Number(price)
  }

  return !isNaN(priceValue) && priceValue <= filterValue
}
