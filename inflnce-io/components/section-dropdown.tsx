"use client"

import type React from "react"
import { ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useFilter } from "@/contexts/filter-context"

interface SectionDropdownProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export default function SectionDropdown({ title, children, defaultOpen = false }: SectionDropdownProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [hasVisibleChildren, setHasVisibleChildren] = useState(true)

  // Get the filter context
  const { priceFilter: contextPriceFilter } = useFilter() || { priceFilter: 0 }
  const priceFilter = contextPriceFilter || 0

  // Check if any children are visible after filtering
  useEffect(() => {
    if (priceFilter > 0) {
      // We'll set this to true initially and let the children components
      // update it if they're visible
      setHasVisibleChildren(true)
    } else {
      setHasVisibleChildren(true)
    }
  }, [priceFilter, children])

  // If no children are visible due to filtering, hide the section
  if (!hasVisibleChildren && priceFilter > 0) {
    return null
  }

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 px-4 text-left font-medium"
      >
        {title}
        <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen ? "transform rotate-180" : "")} />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="p-4 pt-0">{children}</div>
      </div>
    </div>
  )
}
