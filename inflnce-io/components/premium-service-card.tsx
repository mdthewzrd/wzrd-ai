"use client"

import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { globalConfig } from "@/lib/config"
import { cn } from "@/lib/utils"

type PriceType = string | { value: string; period?: string; retail?: string }

type ServiceCardProps = {
  title: string
  description: string
  price: PriceType
  tags?: { text: string; color: string }[]
  icon?: React.ReactNode
  buttonText?: string
  buttonLink?: string
  graphicType?: "network" | "wave" | "particles" | "grid"
}

export default function PremiumServiceCard({
  title,
  description,
  price,
  tags,
  icon,
  buttonText,
  buttonLink,
  graphicType = "network",
}: ServiceCardProps) {
  const isStartingFrom = typeof price !== "string" && price.period
  const priceValue = typeof price === "string" ? price : price.value
  const pricePeriod = typeof price === "string" ? "" : price.period
  const priceRetail = typeof price === "string" ? "" : price.retail

  const handleButtonClick = () => {
    if (buttonLink) {
      window.location.href = buttonLink
    }
  }

  return (
    <Card className="bg-background-secondary border border-border overflow-hidden h-full group hover:border-green-medium/30 transition-all duration-300">
      <CardContent className="p-0">
        {/* Graphic header */}
        <div className="h-48 relative overflow-hidden">
          {graphicType === "network" && <NetworkGraphic />}
          {graphicType === "wave" && <WaveGraphic />}
          {graphicType === "particles" && <ParticlesGraphic />}
          {graphicType === "grid" && <GridGraphic />}
        </div>

        <div className="p-6">
          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag, index) => (
                <span key={index} className={`tag ${tag.color} text-xs px-2 py-1 rounded-md`}>
                  {tag.text}
                </span>
              ))}
            </div>
          )}

          {/* Title and icon */}
          <div className="flex items-start gap-3 mb-3">
            {icon && <div className="icon-container mt-1">{icon}</div>}
            <h3 className="text-xl font-bold">{title}</h3>
          </div>

          {/* Description */}
          <p className="text-text-secondary mb-6">{description}</p>

          {/* Price and button */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 gap-4 sm:gap-0">
            <div>
              {isStartingFrom ? (
                <div>
                  <div className="text-xs text-text-tertiary">Starting from</div>
                  <div className="text-xl font-bold bg-gradient-to-r from-green-dark to-green-light bg-clip-text text-transparent">
                    {priceValue}
                    {pricePeriod && <span className="text-sm text-text-secondary">/{pricePeriod}</span>}
                  </div>
                  {priceRetail && <div className="text-xs text-text-tertiary line-through">Retail: {priceRetail}</div>}
                </div>
              ) : (
                <div className="text-xl font-bold bg-gradient-to-r from-green-dark to-green-light bg-clip-text text-transparent">
                  {priceValue}
                </div>
              )}
            </div>
            <button
              onClick={handleButtonClick}
              className={cn("green-gradient-bg px-4 py-2 rounded-md font-medium", "text-sm")}
            >
              {buttonText || globalConfig.defaultButtonText}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Graphic components
function NetworkGraphic() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-background-tertiary to-background-secondary">
      <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Network nodes and connections */}
        <g className="nodes">
          {[...Array(10)].map((_, i) => (
            <circle
              key={i}
              cx={20 + Math.random() * 60}
              cy={20 + Math.random() * 60}
              r={1 + Math.random() * 2}
              fill="#4ADE80"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </g>
        <g className="connections">
          {[...Array(15)].map((_, i) => (
            <line
              key={i}
              x1={10 + Math.random() * 30}
              y1={10 + Math.random() * 30}
              x2={60 + Math.random() * 30}
              y2={60 + Math.random() * 30}
              stroke="#4ADE80"
              strokeWidth="0.2"
              strokeOpacity="0.6"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

function WaveGraphic() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-background-tertiary to-background-secondary">
      <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Wave paths */}
        {[...Array(5)].map((_, i) => (
          <path
            key={i}
            d={`M 0 ${50 + i * 5} C 20 ${40 + i * 3}, 40 ${60 + i * 2}, 100 ${45 + i * 4}`}
            fill="none"
            stroke="#4ADE80"
            strokeWidth="0.5"
            strokeOpacity={0.3 + i * 0.1}
            className="animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </svg>
    </div>
  )
}

function ParticlesGraphic() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-background-tertiary to-background-secondary">
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-green-medium/30 animate-pulse"
            style={{
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

function GridGraphic() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-background-tertiary to-background-secondary">
      <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Grid lines */}
        <g className="grid-lines">
          {[...Array(10)].map((_, i) => (
            <line
              key={`h-${i}`}
              x1="0"
              y1={i * 10}
              x2="100"
              y2={i * 10}
              stroke="#4ADE80"
              strokeWidth="0.2"
              strokeOpacity="0.4"
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <line
              key={`v-${i}`}
              x1={i * 10}
              y1="0"
              x2={i * 10}
              y2="100"
              stroke="#4ADE80"
              strokeWidth="0.2"
              strokeOpacity="0.4"
            />
          ))}
        </g>
        {/* Highlight points */}
        <g className="highlights">
          {[...Array(8)].map((_, i) => (
            <circle
              key={i}
              cx={(i % 4) * 25 + 12.5}
              cy={Math.floor(i / 4) * 30 + 20}
              r="1.5"
              fill="#4ADE80"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}
