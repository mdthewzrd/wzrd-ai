"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

// Enhanced error handling for ResizeObserver
if (typeof window !== "undefined") {
  // Handle ResizeObserver errors
  const errorHandler = (e: ErrorEvent) => {
    if (
      e.message.includes("ResizeObserver") ||
      e.message.includes("ResizeObserver loop completed with undelivered notifications") ||
      e.message.includes("ResizeObserver loop limit exceeded")
    ) {
      e.stopImmediatePropagation()
      console.warn("ResizeObserver error suppressed:", e.message)
      return false
    }
  }

  // Add event listeners for both error types
  window.addEventListener("error", errorHandler)
  window.addEventListener("unhandledrejection", (e) => {
    if (e.reason?.message?.includes("ResizeObserver")) {
      e.preventDefault()
      console.warn("ResizeObserver promise rejection suppressed:", e.reason.message)
      return false
    }
  })

  // Create a more robust ResizeObserver if needed
  const originalResizeObserver = window.ResizeObserver
  if (originalResizeObserver) {
    window.ResizeObserver = class ResizeObserverWrapper extends originalResizeObserver {
      constructor(callback: ResizeObserverCallback) {
        const wrappedCallback: ResizeObserverCallback = (entries, observer) => {
          // Wrap the callback in requestAnimationFrame to throttle notifications
          window.requestAnimationFrame(() => {
            try {
              callback(entries, observer)
            } catch (error) {
              console.warn("ResizeObserver callback error suppressed:", error)
            }
          })
        }
        super(wrappedCallback)
      }
    }
  }
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
