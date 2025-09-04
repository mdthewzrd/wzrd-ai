"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

interface PriceRangeSliderProps
  extends Omit<React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>, "value" | "onChange"> {
  accentColor?: string
  trackColor?: string
  value?: number
  onChange?: (value: number) => void
}

const PriceRangeSlider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, PriceRangeSliderProps>(
  ({ className, accentColor, trackColor, value = 0, onChange, ...props }, ref) => {
    const thumbStyle = accentColor ? { backgroundColor: accentColor } : {}
    const rangeStyle = trackColor ? { backgroundColor: trackColor } : {}

    // Convert single value to array for Radix UI Slider
    const sliderValue = React.useMemo(() => [value], [value])

    // Handle value change from array back to single number
    const handleValueChange = (newValue: number[]) => {
      if (onChange && newValue.length > 0) {
        onChange(newValue[0])
      }
    }

    return (
      <SliderPrimitive.Root
        ref={ref}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        value={sliderValue}
        onValueChange={handleValueChange}
        accentColor={accentColor || "hsl(var(--primary))"}
        trackColor={trackColor || "hsl(var(--primary) / 0.2)"}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full" style={rangeStyle} />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          style={thumbStyle}
        />
      </SliderPrimitive.Root>
    )
  },
)
PriceRangeSlider.displayName = SliderPrimitive.Root.displayName

export default PriceRangeSlider
