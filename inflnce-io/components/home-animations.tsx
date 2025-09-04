"use client"

import { useEffect } from "react"

export function HomeAnimations() {
  // Add animation classes to elements
  const addAnimationClasses = () => {
    const elements = document.querySelectorAll(".animate-fade-in, .animate-fade-in-up")

    elements.forEach((el, index) => {
      if (el.classList.contains("animate-fade-in")) {
        el.classList.add("opacity-0", "animate-in", "fade-in", "duration-700")
      }

      if (el.classList.contains("animate-fade-in-up")) {
        el.classList.add("opacity-0", "animate-in", "fade-in", "slide-in-from-bottom-4", "duration-700")

        // Add delay for sequential animations
        if (el.classList.contains("animation-delay-200")) {
          el.style.animationDelay = "200ms"
        } else if (el.classList.contains("animation-delay-300")) {
          el.style.animationDelay = "300ms"
        }
      }
    })

    // Add float animation to platform icons
    const floatElements = document.querySelectorAll(".animate-float")
    floatElements.forEach((el, index) => {
      el.classList.add("motion-safe:animate-floating")

      if (el.classList.contains("animation-delay-200")) {
        el.style.animationDelay = "200ms"
      } else if (el.classList.contains("animation-delay-300")) {
        el.style.animationDelay = "300ms"
      } else if (el.classList.contains("animation-delay-400")) {
        el.style.animationDelay = "400ms"
      }
    })
  }

  // Run animations once mounted
  useEffect(() => {
    addAnimationClasses()
  }, [])

  return null
}
