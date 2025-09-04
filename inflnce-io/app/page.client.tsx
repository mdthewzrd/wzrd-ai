"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HomeClient() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <>
      <div className="inline-block mb-6">
        <div className="px-3 py-1 rounded-full border border-green-500/30 text-green-400 text-sm font-medium">
          Premium Social Media Marketing Platform
        </div>
      </div>
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-400">
        Boost Your Online Presence with <span className="text-green-400">inflnce</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto">
        Your one-stop platform for social media growth, publications, and digital marketing tools.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          asChild
          size="lg"
          className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-6 h-auto text-lg font-medium rounded-md transition-all shadow-lg shadow-green-900/20 hover:shadow-green-900/30 hover:translate-y-[-2px]"
        >
          <Link href="/social-media">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          size="lg"
          className="bg-gradient-to-r from-green-600/10 to-green-500/10 hover:from-green-600/20 hover:to-green-500/20 border-green-500/30 hover:border-green-500/60 text-white px-8 py-6 h-auto text-lg font-medium rounded-md transition-all"
        >
          <Link href="/learn">Learn More</Link>
        </Button>
      </div>

    </>
  )
}
