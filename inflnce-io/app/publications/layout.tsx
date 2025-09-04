import type React from "react"
import SubNavigation from "@/components/sub-navigation"

export default function PublicationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const navigationItems = [
    {
      title: "All Publications",
      href: "/publications",
    },
    {
      title: "Specialty Publications",
      href: "/publications/specialty",
    },
    {
      title: "Publications Database",
      href: "/publications/database",
    },
  ]

  return (
    <main className="py-4 sm:py-6">
      <SubNavigation items={navigationItems} />
      {children}
    </main>
  )
}
