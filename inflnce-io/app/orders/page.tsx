"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Package, Clock, CheckCircle, XCircle, AlertCircle, ExternalLink } from "lucide-react"

interface Order {
  id: string
  service: string
  platform: string
  status: "pending" | "processing" | "completed" | "cancelled"
  amount: number
  date: string
  description: string
  estimatedCompletion?: string
  trackingUrl?: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading orders
    setTimeout(() => {
      setOrders([
        {
          id: "ORD-001",
          service: "Instagram Followers",
          platform: "Instagram",
          status: "processing",
          amount: 29.99,
          date: "2024-01-15",
          description: "1000 High Quality Followers",
          estimatedCompletion: "2024-01-18",
          trackingUrl: "#"
        },
        {
          id: "ORD-002", 
          service: "YouTube Views",
          platform: "YouTube",
          status: "completed",
          amount: 19.99,
          date: "2024-01-10",
          description: "5000 Real Views",
          trackingUrl: "#"
        },
        {
          id: "ORD-003",
          service: "TikTok Likes",
          platform: "TikTok", 
          status: "pending",
          amount: 15.99,
          date: "2024-01-16",
          description: "2000 Organic Likes",
          estimatedCompletion: "2024-01-19"
        }
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "processing":
        return <AlertCircle className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const filterOrders = (status?: string) => {
    if (!status) return orders
    return orders.filter(order => order.status === status)
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground animate-pulse" />
            <p className="text-muted-foreground">Loading your orders...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground">Track and manage your service orders</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All Orders</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="processing">Processing</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {orders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                <p className="text-muted-foreground text-center mb-4">
                  You haven't placed any orders yet. Browse our services to get started.
                </p>
                <Button asChild>
                  <a href="/social-media">Browse Services</a>
                </Button>
              </CardContent>
            </Card>
          ) : (
            filterOrders().map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {order.service}
                      </CardTitle>
                      <CardDescription>Order #{order.id} • {order.platform}</CardDescription>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{order.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <CalendarDays className="h-4 w-4" />
                      Ordered: {new Date(order.date).toLocaleDateString()}
                    </div>
                    {order.estimatedCompletion && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Est. completion: {new Date(order.estimatedCompletion).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-lg font-semibold">${order.amount}</div>
                  <div className="flex gap-2">
                    {order.trackingUrl && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Track Order
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>

        {["pending", "processing", "completed", "cancelled"].map((status) => (
          <TabsContent key={status} value={status} className="space-y-4 mt-6">
            {filterOrders(status).length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Package className="h-12 w-12 mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No {status} orders</h3>
                  <p className="text-muted-foreground text-center">
                    You don't have any {status} orders at the moment.
                  </p>
                </CardContent>
              </Card>
            ) : (
              filterOrders(status).map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          {order.service}
                        </CardTitle>
                        <CardDescription>Order #{order.id} • {order.platform}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{order.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarDays className="h-4 w-4" />
                        Ordered: {new Date(order.date).toLocaleDateString()}
                      </div>
                      {order.estimatedCompletion && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Est. completion: {new Date(order.estimatedCompletion).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex items-center justify-between">
                    <div className="text-lg font-semibold">${order.amount}</div>
                    <div className="flex gap-2">
                      {order.trackingUrl && (
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Track Order
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}