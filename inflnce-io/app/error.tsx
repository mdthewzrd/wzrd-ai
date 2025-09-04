"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Home, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Global error:", error)
  }, [error])

  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle>Oops! Something went wrong</CardTitle>
          <CardDescription>
            We encountered an unexpected error. Don't worry - let's get you back on track!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={reset}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>
            <Button asChild className="flex items-center gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
          </div>
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded text-xs">
              <summary className="cursor-pointer font-medium mb-2">Error Details (Dev Mode)</summary>
              <pre className="whitespace-pre-wrap break-words">
                {error.message}
                {error.digest && `\nDigest: ${error.digest}`}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  )
}