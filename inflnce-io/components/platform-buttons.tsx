"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function PlatformButtons() {
  const pathname = usePathname()

  // Make sure platform buttons only change color for specific platforms
  // Keep the default as green for non-platform specific buttons
  const getButtonClass = (platform?: string) => {
    if (!platform) return "green-gradient-bg"

    switch (platform.toLowerCase()) {
      case "instagram":
        return "instagram-gradient"
      case "youtube":
        return "youtube-gradient"
      case "tiktok":
        return "tiktok-gradient"
      case "twitter":
        return "twitter-gradient"
      case "spotify":
        return "spotify-gradient"
      case "linkedin":
        return "linkedin-gradient"
      default:
        return "green-gradient-bg"
    }
  }

  const platforms = [
    {
      name: "Instagram",
      href: "/social-media/instagram",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
            fill="currentColor"
          />
        </svg>
      ),
      color: "bg-gradient-to-r from-purple-600 to-pink-500",
    },
    {
      name: "YouTube",
      href: "/social-media/youtube",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
            fill="currentColor"
          />
        </svg>
      ),
      color: "bg-gradient-to-r from-red-600 to-red-700",
    },
    {
      name: "TikTok",
      href: "/social-media/tiktok",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"
            fill="currentColor"
          />
        </svg>
      ),
      color: "bg-black",
    },
    {
      name: "Twitter/X",
      href: "/social-media/twitter",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 4.01c-1 .49-1.98.689-3 .99-1.121-1.265-2.783-1.335-4.38-.737S11.977 6.323 12 8v1c-3.245.083-6.135-1.395-8-4 0 0-4.182 7.433 4 11-1.872 1.247-3.739 2.088-6 2 3.308 1.803 6.913 2.423 10.034 1.517 3.58-1.04 6.522-3.723 7.651-7.742a13.84 13.84 0 0 0 .497-3.753C20.18 7.773 21.692 5.25 22 4.009z"
            fill="currentColor"
          />
        </svg>
      ),
      color: "bg-blue-500",
    },
    {
      name: "Spotify",
      href: "/social-media/spotify",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406c-.192.286-.578.381-.864.191-2.376-1.451-5.364-1.779-8.88-.975-.336.078-.671-.131-.748-.467-.078-.336.131-.67.467-.748 3.855-.882 7.156-.501 9.834 1.135.286.191.381.577.191.864zm1.082-2.412c-.241.355-.723.45-1.075.209-2.722-1.672-6.873-2.159-10.093-1.182-.418.127-.859-.108-.987-.526-.127-.417.108-.858.526-.985 3.669-1.115 8.25-.572 11.329 1.409.354.241.45.723.209 1.075zm.094-2.509c-3.26-1.936-8.639-2.115-11.753-1.17-.5.152-1.028-.13-1.18-.63-.151-.5.131-1.028.632-1.18 3.582-1.086 9.543-.876 13.296 1.348.455.27.605.862.334 1.317-.27.455-.862.605-1.317.334l-.012-.019z"
            fill="currentColor"
          />
        </svg>
      ),
      color: "bg-green-600",
    },
    {
      name: "LinkedIn",
      href: "/social-media/linkedin",
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect
            x="2"
            y="9"
            width="4"
            height="12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle
            cx="4"
            cy="4"
            r="2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      color: "bg-blue-700",
    },
  ]

  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {platforms.map((platform) => (
        <Link
          key={platform.href}
          href={platform.href}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${platform.color} text-white font-medium ${
            pathname === platform.href ? "ring-2 ring-offset-2 ring-offset-background-primary ring-white/50" : ""
          }`}
        >
          {platform.icon}
          {platform.name}
        </Link>
      ))}
    </div>
  )
}

export default PlatformButtons
