"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";

export default function AdminPage() {
  const { user, isLoaded } = useUser();
  const users = useQuery(api.users.getAllUsers);
  const orders = useQuery(api.orders.listAll);
  const services = useQuery(api.services.getAllServices);

  // Check if user is admin
  if (isLoaded && (!user || user.primaryEmailAddress?.emailAddress !== "mikedurante13@gmail.com")) {
    redirect("/");
  }

  const stats = {
    totalUsers: users?.length || 0,
    activeOrders: orders?.filter((o: { status: string }) => o.status === "inProgress").length || 0,
    completedOrders: orders?.filter((o: { status: string }) => o.status === "complete").length || 0,
    totalRevenue: orders?.reduce((acc: number, order: { totalPrice: number }) => acc + order.totalPrice, 0) || 0,
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, orders, and services</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Orders</CardTitle>
              <Clock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Orders</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Management Tabs */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders?.slice(0, 10).map((order) => (
                    <div key={order._id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">Order #{order._id.slice(-8)}</p>
                        <p className="text-sm text-gray-400">${order.totalPrice}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant={order.status === "complete" ? "default" : order.status === "canceled" ? "destructive" : "secondary"}
                          className={
                            order.status === "complete" ? "bg-green-500/20 text-green-400" :
                            order.status === "canceled" ? "bg-red-500/20 text-red-400" :
                            order.status === "inProgress" ? "bg-yellow-500/20 text-yellow-400" :
                            "bg-blue-500/20 text-blue-400"
                          }
                        >
                          {order.status}
                        </Badge>
                        <Button size="sm" variant="outline">View</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users?.map((user) => (
                    <div key={user._id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant="outline"
                          className={user.role === "admin" ? "border-purple-500 text-purple-400" : ""}
                        >
                          {user.role}
                        </Badge>
                        <Badge 
                          variant={user.status === "active" ? "default" : "secondary"}
                          className={user.status === "active" ? "bg-green-500/20 text-green-400" : ""}
                        >
                          {user.status}
                        </Badge>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services?.map((service) => (
                    <div key={service._id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <p className="font-medium">{service.name}</p>
                        <p className="text-sm text-gray-400">{service.platform} • {service.category}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge 
                          variant={service.active ? "default" : "secondary"}
                          className={service.active ? "bg-green-500/20 text-green-400" : ""}
                        >
                          {service.active ? "Active" : "Inactive"}
                        </Badge>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
}