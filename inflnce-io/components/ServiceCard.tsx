"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type ServiceCardProps = {
  name: string
  imageUrl?: string
  description?: string
  priceDisplay?: string
  checkoutUrl: string
}

export function ServiceCard({ 
  name, 
  imageUrl, 
  description, 
  priceDisplay, 
  checkoutUrl 
}: ServiceCardProps) {
  const handleBuyNow = () => {
    // Validate that it's a Stripe checkout URL
    if (checkoutUrl.startsWith('https://checkout.stripe.com/')) {
      window.open(checkoutUrl, '_blank', 'noopener,noreferrer')
    } else {
      console.error('Invalid checkout URL')
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {imageUrl && (
        <div className="aspect-video relative overflow-hidden bg-muted">
          <img 
            src={imageUrl} 
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
      )}
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        {priceDisplay && (
          <div className="text-2xl font-bold text-primary">
            {priceDisplay}
          </div>
        )}
      </CardHeader>
      {description && (
        <CardContent>
          <CardDescription>{description}</CardDescription>
        </CardContent>
      )}
      <CardFooter>
        <Button 
          onClick={handleBuyNow}
          className="w-full"
          size="lg"
        >
          Buy Now
        </Button>
      </CardFooter>
    </Card>
  )
}