import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  linkWrapper?: boolean
}

export function Logo({ className, linkWrapper = false }: LogoProps) {
  return (
    <div className={cn("relative flex items-center", className)}>
      <Image src="/images/inflnce-logo.png" alt="inflnce.io" width={150} height={47} className="h-auto" priority />
    </div>
  )
}
