import type React from "react"

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="py-4 sm:py-6 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {children}
    </main>
  )
}
