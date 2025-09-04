"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface SubNavigationProps {
  items: {
    name: string
    href: string
  }[]
  active?: string
}

export default function SubNavigation({ items, active }: SubNavigationProps) {
  const pathname = usePathname()

  return (
    <div className="border-b border-border mb-6">
      <div className="container mx-auto px-4">
        <div className="flex overflow-x-auto pb-2 -mb-px space-x-6">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap py-2 border-b-2 font-medium text-sm transition-colors ${
                pathname === item.href || active === item.href
                  ? "border-green-medium text-text-primary"
                  : "border-transparent text-text-secondary hover:text-text-primary hover:border-green-medium/50"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
