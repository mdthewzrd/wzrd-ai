"use client"

import { usePathname } from "next/navigation"

type BuyNowButtonProps = {
  className?: string
  buttonBgColor?: string
}

export default function BuyNowButton({ className, buttonBgColor }: BuyNowButtonProps) {
  const pathname = usePathname()

  let platformStyle = ""

  if (pathname?.includes("/instagram")) {
    platformStyle = "pink"
  } else if (pathname?.includes("/youtube")) {
    platformStyle = "red"
  } else if (pathname?.includes("/tiktok")) {
    platformStyle = "black"
  } else if (pathname?.includes("/twitter")) {
    platformStyle = "blue"
  } else if (pathname?.includes("/linkedin")) {
    platformStyle = "linkedin-blue"
  } else if (pathname?.includes("/spotify")) {
    platformStyle = "spotify-green"
  }

  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-all ${
        platformStyle ? `${platformStyle}-gradient` : "green-gradient-bg"
      } ${className}`}
    >
      Buy Now
    </button>
  )
}
