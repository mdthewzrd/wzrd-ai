"use client"

import * as React from "react"

export const LinkedinIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
  ({ className, ...props }, ref) => (
    <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" {...props} ref={ref}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
)
LinkedinIcon.displayName = "LinkedinIcon"
