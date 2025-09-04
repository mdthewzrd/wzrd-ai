import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="text-6xl font-bold text-green-500 mb-4">404</div>
          <CardTitle>Page Not Found</CardTitle>
          <CardDescription>
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="flex items-center gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/social-media">
                <Search className="h-4 w-4" />
                Browse Services
              </Link>
            </Button>
          </div>
          <Button asChild variant="ghost" className="flex items-center gap-2">
            <Link href="javascript:history.back()">
              <ArrowLeft className="h-4 w-4" />
              Go Back
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}