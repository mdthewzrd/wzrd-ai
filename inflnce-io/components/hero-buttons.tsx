"use client"

import Link from "next/link"
import { ArrowRight, BarChart3 } from "lucide-react"
import { cn } from "@/lib/utils"

export function HeroButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <Link
        href="/social-media"
        className={cn(
          "group relative overflow-hidden rounded-lg bg-gradient-to-r from-[#007B01] to-[#4DFF4F] px-6 py-4 text-white shadow-lg transition-all hover:opacity-90 hover:shadow-green-500/25 hover:shadow-xl",
        )}
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold">Explore Services</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
        <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-white/10 blur-xl transition-all group-hover:bg-white/20" />
        <div className="absolute -bottom-4 -left-4 h-16 w-16 rounded-full bg-white/10 blur-lg transition-all group-hover:bg-white/20" />
      </Link>

      <Link
        href="/orders"
        className="group relative overflow-hidden rounded-lg bg-background-tertiary px-6 py-4 text-text-primary shadow-md transition-all hover:bg-background-tertiary/90 hover:shadow-lg"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold">View Orders</span>
          <BarChart3 className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
        <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-white/5 blur-xl transition-all group-hover:bg-white/10" />
      </Link>
    </div>
  )
}
