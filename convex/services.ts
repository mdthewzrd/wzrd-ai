import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const listByCategory = query({
  args: { 
    category: v.union(v.literal("socialMedia"), v.literal("publication"), v.literal("tool")) 
  },
  handler: async (ctx, args) => {
    const services = await ctx.db
      .query("services")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .filter((q) => q.eq(q.field("active"), true))
      .collect();

    const servicesWithPackages = await Promise.all(
      services.map(async (service) => {
        const packages = await ctx.db
          .query("packages")
          .withIndex("by_service_id", (q) => q.eq("serviceId", service._id))
          .filter((q) => q.eq(q.field("active"), true))
          .collect();
        
        return { ...service, packages };
      })
    );

    return servicesWithPackages;
  },
});

export const getById = query({
  args: { serviceId: v.id("services") },
  handler: async (ctx, args) => {
    const service = await ctx.db.get(args.serviceId);
    if (!service || !service.active) return null;

    const packages = await ctx.db
      .query("packages")
      .withIndex("by_service_id", (q) => q.eq("serviceId", args.serviceId))
      .filter((q) => q.eq(q.field("active"), true))
      .collect();

    return { ...service, packages };
  },
});

export const getAllServices = query({
  args: {},
  handler: async (ctx) => {
    const services = await ctx.db
      .query("services")
      .filter((q) => q.eq(q.field("active"), true))
      .collect();

    const servicesWithPackages = await Promise.all(
      services.map(async (service) => {
        const packages = await ctx.db
          .query("packages")
          .withIndex("by_service_id", (q) => q.eq("serviceId", service._id))
          .filter((q) => q.eq(q.field("active"), true))
          .collect();
        
        return { ...service, packages };
      })
    );

    return servicesWithPackages;
  },
});

export const createService = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    category: v.union(v.literal("socialMedia"), v.literal("publication"), v.literal("tool")),
    platform: v.optional(v.string()),
    type: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const serviceId = await ctx.db.insert("services", {
      ...args,
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return serviceId;
  },
});

export const updateService = mutation({
  args: {
    serviceId: v.id("services"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.union(v.literal("socialMedia"), v.literal("publication"), v.literal("tool"))),
    platform: v.optional(v.string()),
    type: v.optional(v.string()),
    active: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { serviceId, ...updates } = args;
    await ctx.db.patch(serviceId, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteService = mutation({
  args: { serviceId: v.id("services") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.serviceId, {
      active: false,
      updatedAt: Date.now(),
    });
  },
});