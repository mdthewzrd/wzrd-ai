"use client"

import Link from 'next/link'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { ReactNode, MouseEvent } from 'react'

interface AuthLinkProps {
  href: string
  children: ReactNode
  className?: string
  requireAuth?: boolean
}

export function AuthLink({ href, children, className, requireAuth = true }: AuthLinkProps) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (requireAuth && !isAuthenticated) {
      e.preventDefault()
      router.push(`/login?redirectTo=${encodeURIComponent(href)}`)
    }
  }

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  )
}