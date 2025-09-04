import Image from "next/image"
import { cn } from "@/lib/utils"

interface CompactLogoProps {
  className?: string
}

export function CompactLogo({ className }: CompactLogoProps) {
  return (
    <div className={cn("flex items-center", className)}>
      <Image src="/images/inflnce-logo.png" alt="inflnce.io" width={120} height={38} className="h-auto" priority />
    </div>
  )
}
