"use client"

import type React from "react"

import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Fragment, useMemo } from "react"

interface BreadcrumbProps {
  homeElement?: React.ReactNode
  separator?: React.ReactNode
  containerClasses?: string
  listClasses?: string
  activeItemClasses?: string
  inactiveItemClasses?: string
}

export function Breadcrumb({
  homeElement = <Home size={16} />,
  separator = <ChevronRight size={16} />,
  containerClasses = "py-3 px-4",
  listClasses = "flex items-center space-x-2 text-sm",
  activeItemClasses = "text-primary font-medium",
  inactiveItemClasses = "text-muted-foreground hover:text-primary transition-colors",
}: BreadcrumbProps) {
  const pathname = usePathname()

  const breadcrumbs = useMemo(() => {
    // Remove any query parameters, hashes, etc.
    const asPathWithoutQuery = pathname?.split("?")[0]

    // Split pathname into segments
    const asPathNestedRoutes = asPathWithoutQuery?.split("/").filter((v) => v.length > 0)

    // Map segments to breadcrumb items
    const crumbList = asPathNestedRoutes?.map((subpath, idx) => {
      // Build the path up to this point
      const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/")

      // Format the label (capitalize, replace hyphens with spaces)
      const label = subpath.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

      return { href, label }
    })

    return [{ href: "/", label: "Home" }, ...(crumbList || [])]
  }, [pathname])

  // If we're on the homepage, don't show breadcrumbs
  if (breadcrumbs.length <= 1) {
    return null
  }

  return (
    <nav aria-label="Breadcrumb" className={containerClasses}>
      <ol className={listClasses}>
        {breadcrumbs.map((breadcrumb, idx) => (
          <Fragment key={breadcrumb.href}>
            <li>
              {idx === breadcrumbs.length - 1 ? (
                <span className={activeItemClasses} aria-current="page">
                  {idx === 0 ? homeElement : breadcrumb.label}
                </span>
              ) : (
                <Link href={breadcrumb.href} className={inactiveItemClasses}>
                  {idx === 0 ? homeElement : breadcrumb.label}
                </Link>
              )}
            </li>
            {idx < breadcrumbs.length - 1 && (
              <li className="text-muted-foreground" aria-hidden="true">
                {separator}
              </li>
            )}
          </Fragment>
        ))}
      </ol>
    </nav>
  )
}
