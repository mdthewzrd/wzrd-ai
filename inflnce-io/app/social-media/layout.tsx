import type React from "react"
import { FilterProvider } from "@/contexts/filter-context"
import MemberLayout from "@/components/member-layout"

export default function SocialMediaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MemberLayout>
      <FilterProvider>{children}</FilterProvider>
    </MemberLayout>
  )
}
