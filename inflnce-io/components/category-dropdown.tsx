"use client"

import type React from "react"

import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CategoryDropdownProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function CategoryDropdown({ title, children, defaultOpen = false }: CategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-3 text-left font-medium"
      >
        {title}
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen ? "transform rotate-180" : "")} />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="py-2">{children}</div>
      </div>
    </div>
  )
}
