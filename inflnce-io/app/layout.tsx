import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ClientLayout } from "@/components/client-layout"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "inflnce - Social Media Marketing Platform",
  description: "Your one-stop platform for social media growth, publications, and digital marketing tools.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}