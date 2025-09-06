# 🚀 Convex Setup Instructions

Your Convex URL is already configured! Now we need to authenticate and deploy.

## Step 1: Authenticate with Convex

Open a new terminal in this directory and run:

```bash
npx convex login
```

This will open your browser to authenticate. Log in with the same account you used to create the project.

## Step 2: Deploy Your Functions

After logging in, run:

```bash
npx convex deploy
```

This will:
- Connect to your project (precise-echidna-398)
- Upload all the database schema
- Deploy all the functions we created
- Generate TypeScript types

## Step 3: Keep Convex Running (for development)

During development, run:

```bash
npx convex dev
```

This will watch for changes and auto-deploy.

## What You Should See

When successful, you'll see:
```
✓ Deployed functions to https://precise-echidna-398.convex.cloud
  Query: admin:getDashboardStats
  Query: admin:listAllOrders
  Query: admin:listUsers
  Query: orders:getById
  Query: orders:getStats
  Query: orders:listAll
  Query: orders:listMine
  Query: packages:getById
  Query: packages:getByServiceId
  Query: services:getAllServices
  Query: services:getById
  Query: services:listByCategory
  Query: users:getAllUsers
  Query: users:getUserByClerkId
  Mutation: admin:updateOrderStatus
  Mutation: admin:updateUserStatus
  Mutation: orders:create
  Mutation: orders:updateStatus
  Mutation: packages:createPackage
  Mutation: packages:deletePackage
  Mutation: packages:updatePackage
  Mutation: services:createService
  Mutation: services:deleteService
  Mutation: services:updateService
  Mutation: users:getOrCreateUser
  Mutation: users:updateUserRole
  Mutation: users:updateUserStatus
```

## Step 4: Restart Your Next.js Server

After Convex is connected, restart your Next.js server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Your Credentials

✅ **Convex URL:** `https://precise-echidna-398.convex.cloud`
✅ **Deployment Name:** `precise-echidna-398`

These are already in your `.env.local` file!