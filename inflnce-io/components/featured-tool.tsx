import type React from "react"
import BuyNowButton from "./buy-now-button"
import { cn } from "@/lib/utils"
import { Award, PenToolIcon as Tool, Zap } from "lucide-react"

type FeatureItem = {
  text: string
}

type FeatureToolProps = {
  title: string
  description: string
  price: string
  period: string
  features: FeatureItem[]
  tags: string[]
  icon?: React.ReactNode
  imageSrc?: string
}

export default function FeaturedTool({
  title,
  description,
  price,
  period,
  features,
  tags,
  icon,
  imageSrc,
}: FeatureToolProps) {
  // Default icon if none provided
  const defaultIcon = icon || <Tool className="w-5 h-5" />

  return (
    <div className="bg-background-secondary rounded-lg overflow-hidden mb-12">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-4 sm:p-8">
          <div className="featured-tag mb-4 flex items-center gap-1">
            <Award className="w-3 h-3" />
            <span>FEATURED</span>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <div className="icon-container">{defaultIcon}</div>
            <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
          </div>

          <p className="text-xs sm:text-sm text-text-secondary mb-6">{description}</p>

          <div className="space-y-2 sm:space-y-3 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <Zap className="w-4 h-4 text-green-light mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-text-secondary">{feature.text}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <span key={index} className="tag bg-background-tertiary text-text-secondary text-xs">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "bg-background-tertiary flex flex-col",
            imageSrc ? "relative overflow-hidden" : "p-4 sm:p-8 justify-center",
          )}
        >
          {imageSrc ? (
            <>
              <img
                src={imageSrc || "/placeholder.svg"}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />
              <div className="relative z-10 p-4 sm:p-8 flex flex-col justify-center h-full bg-gradient-to-t from-background-tertiary via-background-tertiary/90 to-transparent">
                <div className="text-center mb-6">
                  <div className="text-xs text-text-tertiary mb-1">Starting at</div>
                  <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-dark to-green-light bg-clip-text text-transparent mb-1">
                    ${price}/{period}
                  </div>
                  <div className="text-xs sm:text-sm text-text-secondary">Subscription</div>
                </div>

                <BuyNowButton className="w-full text-sm" />
              </div>
            </>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="text-xs text-text-tertiary mb-1">Starting at</div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-dark to-green-light bg-clip-text text-transparent mb-1">
                  ${price}/{period}
                </div>
                <div className="text-xs sm:text-sm text-text-secondary">Subscription</div>
              </div>

              <BuyNowButton className="w-full text-sm" />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
