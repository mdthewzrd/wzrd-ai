"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Star, Database } from "lucide-react"
import { usePathname } from "next/navigation"

type NavItem = {
  name: string
  href: string
}

const mainNavItems: NavItem[] = [
  { name: "Social Media", href: "/social-media" },
  { name: "Publications", href: "/publications" },
  { name: "Tools", href: "/tools" },
]

export default function Navigation() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<string | null>(null)

  useEffect(() => {
    if (pathname?.includes("/social-media")) setActiveTab("Social Media")
    else if (pathname?.includes("/publications")) setActiveTab("Publications")
    else if (pathname?.includes("/tools")) setActiveTab("Tools")
    else setActiveTab("Social Media") // Default
  }, [pathname])

  return (
    <nav className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-8 py-4 text-base font-medium transition-colors border-b-2 relative",
                activeTab === item.name
                  ? "border-green-medium text-white"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-green-medium/50",
              )}
              onClick={() => setActiveTab(item.name)}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/publications/database"
            className={cn(
              "flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md",
              pathname === "/publications/database"
                ? "bg-background-secondary text-text-primary"
                : "text-text-secondary hover:text-text-primary hover:bg-background-secondary",
            )}
          >
            <Database className="h-4 w-4" />
            <span>Publications Database</span>
          </Link>
        </div>

        <Link
          href="/favorites"
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-md text-base font-medium transition-colors",
            pathname === "/favorites"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-background-tertiary text-text-secondary hover:text-text-primary",
          )}
        >
          <Star className="w-5 h-5" />
          <span className="hidden sm:inline">Favorites</span>
        </Link>
      </div>
    </nav>
  )
}
