"use client";

import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import StatCard from "@/components/shared/StatCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Package, DollarSign, ShoppingCart, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";

// Mock data - will be replaced with real data from Convex
const mockStats = {
  totalOrders: 47,
  pendingOrders: 3,
  totalSpent: 15234,
  monthlySpend: 3421,
};

const mockRecentOrders = [
  {
    id: "ORD-001",
    service: "Instagram Monthly Campaign",
    package: "Gold",
    status: "complete",
    date: "2024-01-15",
    amount: 369,
  },
  {
    id: "ORD-002",
    service: "YouTube Post Campaign",
    package: "Platinum",
    status: "inProgress",
    date: "2024-01-14",
    amount: 349.99,
  },
  {
    id: "ORD-003",
    service: "TikTok Growth Package",
    package: "Silver",
    status: "pending",
    date: "2024-01-14",
    amount: 39.99,
  },
];

const statusColors: { [key: string]: string } = {
  pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  inProgress: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  complete: "bg-green-500/10 text-green-500 border-green-500/20",
  canceled: "bg-red-500/10 text-red-500 border-red-500/20",
};

export default function DashboardPage() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here&apos;s an overview of your account.</p>
        </div>
        
        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard
            title="Total Orders"
            value={mockStats.totalOrders}
            description="All time"
            icon={ShoppingCart}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Pending Orders"
            value={mockStats.pendingOrders}
            description="Awaiting processing"
            icon={Package}
          />
          <StatCard
            title="Total Spent"
            value={`$${mockStats.totalSpent.toLocaleString()}`}
            description="All time"
            icon={DollarSign}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Monthly Spend"
            value={`$${mockStats.monthlySpend.toLocaleString()}`}
            description="This month"
            icon={TrendingUp}
            trend={{ value: 24, isPositive: true }}
          />
        </div>
        
        {/* Recent Orders */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Your latest order activity</CardDescription>
            </div>
            <Button variant="outline" asChild>
              <Link href="/dashboard/orders">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead>Order ID</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockRecentOrders.map((order) => (
                  <TableRow key={order.id} className="border-gray-800">
                    <TableCell className="font-mono text-sm">{order.id}</TableCell>
                    <TableCell>{order.service}</TableCell>
                    <TableCell>{order.package}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="outline" 
                        className={statusColors[order.status]}
                      >
                        {order.status === "inProgress" ? "In Progress" : 
                         order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell className="text-right font-semibold">
                      ${order.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Browse Services</CardTitle>
              <CardDescription>
                Explore our catalog of digital marketing services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link href="/services">
                  View Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View and track all your previous orders
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/dashboard/orders">
                  View Orders
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>
                Manage your profile and preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant="outline" asChild>
                <Link href="/dashboard/settings">
                  Manage Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}