import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
  args: {
    userId: v.id("users"),
    packageId: v.id("packages"),
    inputData: v.object({
      url: v.optional(v.string()),
      notes: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user || user.status !== "active") {
      throw new Error("User not active");
    }

    const pkg = await ctx.db.get(args.packageId);
    if (!pkg || !pkg.active) {
      throw new Error("Package not available");
    }

    const orderId = await ctx.db.insert("orders", {
      userId: args.userId,
      packageId: args.packageId,
      status: "pending",
      inputData: args.inputData,
      totalPrice: pkg.price,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return orderId;
  },
});

export const listMine = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_user_id", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();

    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
        const pkg = await ctx.db.get(order.packageId);
        if (!pkg) return { ...order, package: null, service: null };
        
        const service = await ctx.db.get(pkg.serviceId);
        return { ...order, package: pkg, service };
      })
    );

    return ordersWithDetails;
  },
});

export const listAll = query({
  args: {},
  handler: async (ctx) => {
    const orders = await ctx.db
      .query("orders")
      .order("desc")
      .collect();

    const ordersWithDetails = await Promise.all(
      orders.map(async (order) => {
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

export const getById = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) return null;

    const user = await ctx.db.get(order.userId);
    const pkg = await ctx.db.get(order.packageId);
    if (!pkg) return { ...order, user, package: null, service: null };
    
    const service = await ctx.db.get(pkg.serviceId);
    return { ...order, user, package: pkg, service };
  },
});

export const updateStatus = mutation({
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

export const getStats = query({
  args: {},
  handler: async (ctx) => {
    const orders = await ctx.db.query("orders").collect();
    const users = await ctx.db.query("users").collect();

    const pendingOrders = orders.filter(o => o.status === "pending").length;
    const completedOrders = orders.filter(o => o.status === "complete").length;
    const totalRevenue = orders
      .filter(o => o.status === "complete")
      .reduce((sum, o) => sum + o.totalPrice, 0);

    const activeUsers = users.filter(u => u.status === "active").length;
    const pendingUsers = users.filter(u => u.status === "pending").length;

    return {
      orders: {
        total: orders.length,
        pending: pendingOrders,
        completed: completedOrders,
      },
      users: {
        total: users.length,
        active: activeUsers,
        pending: pendingUsers,
      },
      revenue: {
        total: totalRevenue,
        monthly: totalRevenue, // Placeholder - would need date filtering
      },
    };
  },
});