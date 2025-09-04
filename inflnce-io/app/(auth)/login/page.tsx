"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { UserRole } from "@/lib/auth-dev"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')
  const { login } = useAuth()

  const handleDemoLogin = async (role: UserRole) => {
    setLoading(true)
    setMessage(`Logging in as ${role}...`)
    
    // Simulate login process
    setTimeout(() => {
      login(role)
      setMessage('Login successful! Redirecting...')
      
      setTimeout(() => {
        // Redirect to the original requested page or default dashboard
        if (redirectTo) {
          router.push(redirectTo)
        } else {
          const dashboardRoutes = {
            admin: '/admin',
            reseller: '/reseller',
            client: '/client'
          }
          router.push(dashboardRoutes[role])
        }
      }, 500)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center text-green-500 hover:text-green-400 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-green-500 mb-2">inflnce</h1>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Welcome Back</CardTitle>
            <CardDescription className="text-gray-300">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {message && (
                <Alert className="border-green-500 bg-green-950/50">
                  <AlertDescription className="text-green-400">{message}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-200">Email (Development Mode)</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  disabled
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-200">Password (Development Mode)</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Not required in dev mode"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                  disabled
                />
              </div>

              <div className="text-center text-sm text-gray-400 bg-blue-900/20 border border-blue-500/20 rounded p-3">
                <p>🚧 Development Mode - No Supabase Required</p>
                <p>Use the demo buttons below to access different dashboards</p>
              </div>

              {/* Demo Logins */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <p className="text-sm text-gray-400 mb-3 text-center">Quick Demo Access</p>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('admin')}
                    disabled={loading}
                    className="bg-purple-900/20 border-purple-700 hover:bg-purple-800/30"
                  >
                    Admin
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('reseller')}
                    disabled={loading}
                    className="bg-blue-900/20 border-blue-700 hover:bg-blue-800/30"
                  >
                    Reseller
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDemoLogin('client')}
                    disabled={loading}
                    className="bg-green-900/20 border-green-700 hover:bg-green-800/30"
                  >
                    Client
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Use these for testing the platform
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-green-500 hover:text-green-400">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}