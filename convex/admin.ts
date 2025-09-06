import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listUsers = query({
  args: {},
  handler: async (ctx) => {
    // TODO: Add admin role check when auth is connected
    const users = await ctx.db.query("users").collect();
    
    const usersWithOrderCount = await Promise.all(
      users.map(async (user) => {
        const orders = await ctx.db
          .query("orders")
          .withIndex("by_user_id", (q) => q.eq("userId", user._id))
          .collect();
        
        return {
          ...user,
          orderCount: orders.length,
          totalSpent: orders.reduce((sum, o) => sum + o.totalPrice, 0),
        };
      })
    );

    return usersWithOrderCount;
  },
});

export const updateUserStatus = mutation({
  args: {
    userId: v.id("users"),
    status: v.union(v.literal("pending"), v.literal("active"), v.literal("suspended")),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin role check when auth is connected
    await ctx.db.patch(args.userId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const listAllOrders = query({
  args: {
    status: v.optional(v.union(
      v.literal("pending"),
      v.literal("inProgress"),
      v.literal("complete"),
      v.literal("canceled")
    )),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin role check when auth is connected
    let ordersQuery = ctx.db.query("orders");
    
    const orders = await ordersQuery.order("desc").collect();
    
    const filteredOrders = args.status 
      ? orders.filter(o => o.status === args.status)
      : orders;

    const ordersWithDetails = await Promise.all(
      filteredOrders.map(async (order) => {
        const user = await ctx.db.get(order.userId);
        const pkg = await ctx.db.get(order.packageId);
        if (!pkg) return { ...order, user, package: null, service: null };
        
        const service = await ctx.db.get(pkg.serviceId);
        return { ...order, user, package: pkg, service };
      })
    );

    return ordersWithDetails;
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("pending"),
      v.literal("inProgress"),
      v.literal("complete"),
      v.literal("canceled")
    ),
  },
  handler: async (ctx, args) => {
    // TODO: Add admin role check when auth is connected
    const updates: any = {
      status: args.status,
      updatedAt: Date.now(),
    };

    if (args.status === "complete") {
      updates.completedAt = Date.now();
    }

    await ctx.db.patch(args.orderId, updates);
  },
});

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    // TODO: Add admin role check when auth is connected
    const orders = await ctx.db.query("orders").collect();
    const users = await ctx.db.query("users").collect();
    const services = await ctx.db.query("services").filter((q) => q.eq(q.field("active"), true)).collect();

    const now = Date.now();
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

    const recentOrders = orders.filter(o => o.createdAt > thirtyDaysAgo);
    const pendingOrders = orders.filter(o => o.status === "pending");
    const completedOrders = orders.filter(o => o.status === "complete");
    
    const totalRevenue = completedOrders.reduce((sum, o) => sum + o.totalPrice, 0);
    const monthlyRevenue = recentOrders
      .filter(o => o.status === "complete")
      .reduce((sum, o) => sum + o.totalPrice, 0);

    const activeUsers = users.filter(u => u.status === "active");
    const pendingUsers = users.filter(u => u.status === "pending");

    return {
      stats: {
        totalUsers: users.length,
        activeUsers: activeUsers.length,
        pendingUsers: pendingUsers.length,
        totalOrders: orders.length,
        pendingOrders: pendingOrders.length,
        completedOrders: completedOrders.length,
        totalServices: services.length,
        totalRevenue,
        monthlyRevenue,
      },
      recentOrders: recentOrders.slice(0, 10),
      recentUsers: users.slice(-10).reverse(),
    };
  },
});