import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Home, ArrowLeft, LogOut } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle>Access Denied</CardTitle>
          <CardDescription>
            You don't have permission to access this page. Please check your account role or contact support.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3 justify-center">
            <Button asChild className="flex items-center gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/login">
                <LogOut className="h-4 w-4" />
                Sign In as Different User
              </Link>
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-sm text-amber-800 dark:text-amber-200">
              <strong>Need access?</strong> Contact your administrator to request the appropriate permissions for your account.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}