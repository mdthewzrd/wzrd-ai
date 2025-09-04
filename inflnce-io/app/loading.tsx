import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-screen flex items-center justify-center">
      <Card className="max-w-md mx-auto">
        <CardContent className="p-8 text-center">
          <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-green-500" />
          <h3 className="text-lg font-semibold mb-2">Loading...</h3>
          <p className="text-muted-foreground">
            Please wait while we prepare your content.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}