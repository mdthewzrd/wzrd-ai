import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Seed initial data including admin user and services
export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if already seeded
    const existingServices = await ctx.db.query("services").first();
    if (existingServices) {
      return { message: "Database already seeded" };
    }

    // Create admin user for mikedurante13@gmail.com
    const adminUser = await ctx.db.insert("users", {
      clerkId: "admin_mikedurante13", // Will be updated when real user signs in
      email: "mikedurante13@gmail.com",
      name: "Mike Durante",
      status: "active",
      role: "admin",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create test user MattyO
    const testUser = await ctx.db.insert("users", {
      clerkId: "test_mattyo",
      email: "mattyo@test.com",
      name: "MattyO",
      status: "active",
      role: "user",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create Instagram services
    const igMonthly = await ctx.db.insert("services", {
      name: "Instagram Monthly Campaign",
      description: "Complete monthly growth package with likes, views, saves, and follower growth",
      category: "socialMedia",
      platform: "Instagram",
      type: "monthly",
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Add packages for Instagram Monthly
    const igPackages = [
      { tier: "Bronze" as const, price: 169, deliverables: ["300-400+ likes/post", "3k-4k views/post", "30-50+ saves", "10-20+ shares", "10 comments×15 posts", "+500 followers"] },
      { tier: "Silver" as const, price: 249, deliverables: ["700-1k+ likes", "5k-10k views", "50-100 saves", "25-50 shares", "+1k followers"] },
      { tier: "Gold" as const, price: 369, deliverables: ["1.5k-3k likes", "7.5k-15k views", "100-200 saves", "50-100 shares", "+2k followers"] },
      { tier: "Emerald" as const, price: 499, deliverables: ["3k-4k likes", "10k-25k views", "200-400 saves", "100-200 shares", "+4k followers"] },
      { tier: "Platinum" as const, price: 749, deliverables: ["5k-8k likes", "25k-50k views", "400-600 saves", "200-400 shares", "+10k intl followers"] },
      { tier: "Diamond" as const, price: 999, deliverables: ["8k-12k likes", "50k-100k views", "600-1k saves", "300-500 shares", "+20k intl followers"] },
    ];

    for (const pkg of igPackages) {
      await ctx.db.insert("packages", {
        serviceId: igMonthly,
        name: `${pkg.tier} Package`,
        tier: pkg.tier,
        price: pkg.price,
        deliverables: pkg.deliverables,
        active: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    // Create YouTube service
    const youtube = await ctx.db.insert("services", {
      name: "YouTube Post Campaign",
      description: "Boost your YouTube videos with views, likes, shares, and comments",
      category: "socialMedia",
      platform: "YouTube",
      type: "post",
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Add YouTube packages
    const ytPackages = [
      { tier: "Bronze" as const, price: 39.99, deliverables: ["2.5k views", "200-300 likes", "20-30 shares", "5-10 comments"] },
      { tier: "Silver" as const, price: 69.99, deliverables: ["5k views", "400-500 likes", "50-60 shares", "10-15 comments"] },
      { tier: "Gold" as const, price: 109.99, deliverables: ["10k views", "700-800 likes", "100-150 shares", "20-30 comments"] },
      { tier: "Emerald" as const, price: 199.99, deliverables: ["25k views", "1k-1.5k likes", "300-400 shares", "40-50 comments"] },
      { tier: "Platinum" as const, price: 349.99, deliverables: ["50k views", "2k-3k likes", "800-1k shares", "80-100 comments"] },
      { tier: "Diamond" as const, price: 499.99, deliverables: ["100k views", "4k-5k likes", "1.5k-2k shares", "140-160 comments"] },
    ];

    for (const pkg of ytPackages) {
      await ctx.db.insert("packages", {
        serviceId: youtube,
        name: `${pkg.tier} Package`,
        tier: pkg.tier,
        price: pkg.price,
        deliverables: pkg.deliverables,
        active: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    // Create TikTok service
    const tiktok = await ctx.db.insert("services", {
      name: "TikTok Growth Package",
      description: "Comprehensive TikTok growth with views, likes, comments, and followers",
      category: "socialMedia",
      platform: "TikTok",
      type: "growth",
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Add TikTok packages
    const tiktokPackages = [
      { tier: "Bronze" as const, price: 24.99, deliverables: ["25k views", "200 likes", "10-20 comments", "10 saves"] },
      { tier: "Silver" as const, price: 39.99, deliverables: ["50k views", "400 likes", "30 comments", "40 saves"] },
      { tier: "Gold" as const, price: 69.99, deliverables: ["100k views", "1k likes", "50+ comments", "100+ saves"] },
      { tier: "Platinum" as const, price: 99.99, deliverables: ["250k views", "2.5k likes", "100+ comments", "200+ saves"] },
      { tier: "Emerald" as const, price: 149.99, deliverables: ["500k views", "5k likes", "200+ comments", "500+ saves"] },
    ];

    for (const pkg of tiktokPackages) {
      await ctx.db.insert("packages", {
        serviceId: tiktok,
        name: `${pkg.tier} Package`,
        tier: pkg.tier,
        price: pkg.price,
        deliverables: pkg.deliverables,
        active: true,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }

    // Create a Digital Tools service
    const webDesign = await ctx.db.insert("services", {
      name: "Professional Website Design",
      description: "Custom website design and development with SEO optimization",
      category: "tool",
      platform: "Web Development",
      type: "design",
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Add website packages
    await ctx.db.insert("packages", {
      serviceId: webDesign,
      name: "Bronze Package",
      tier: "Bronze",
      price: 999,
      deliverables: ["5-page website", "Mobile responsive", "Basic SEO", "Contact form", "1 month support"],
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.insert("packages", {
      serviceId: webDesign,
      name: "Silver Package",
      tier: "Silver",
      price: 2499,
      deliverables: ["10-page website", "Mobile responsive", "Advanced SEO", "CMS integration", "3 months support"],
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    await ctx.db.insert("packages", {
      serviceId: webDesign,
      name: "Gold Package",
      tier: "Gold",
      price: 4999,
      deliverables: ["Unlimited pages", "Mobile responsive", "Full SEO suite", "E-commerce ready", "6 months support"],
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    // Create sample orders for MattyO
    const igPackage = await ctx.db.query("packages")
      .withIndex("by_service_id", q => q.eq("serviceId", igMonthly))
      .filter(q => q.eq(q.field("tier"), "Gold"))
      .first();

    if (igPackage) {
      await ctx.db.insert("orders", {
        userId: testUser,
        packageId: igPackage._id,
        status: "complete",
        inputData: { url: "https://instagram.com/mattyo_test", notes: "Test order" },
        totalPrice: igPackage.price,
        createdAt: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
        updatedAt: Date.now(),
        completedAt: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
      });
    }

    const ytPackage = await ctx.db.query("packages")
      .withIndex("by_service_id", q => q.eq("serviceId", youtube))
      .filter(q => q.eq(q.field("tier"), "Platinum"))
      .first();

    if (ytPackage) {
      await ctx.db.insert("orders", {
        userId: testUser,
        packageId: ytPackage._id,
        status: "inProgress",
        inputData: { url: "https://youtube.com/watch?v=test123", notes: "Urgent delivery needed" },
        totalPrice: ytPackage.price,
        createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
        updatedAt: Date.now(),
      });
    }

    return {
      message: "Database seeded successfully",
      data: {
        users: 2,
        services: 4,
        packages: 20,
        orders: 2,
      }
    };
  },
});

// Update user to admin when they sign in with the correct email
export const updateUserRole = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    // If this is the admin email, make them admin
    if (args.email === "mikedurante13@gmail.com") {
      const user = await ctx.db.query("users")
        .withIndex("by_clerk_id", q => q.eq("clerkId", args.clerkId))
        .first();
      
      if (user) {
        await ctx.db.patch(user._id, {
          role: "admin",
          status: "active",
          updatedAt: Date.now(),
        });
        return { success: true, message: "User promoted to admin" };
      }
    }
    return { success: false };
  },
});