# Deployment Guide for inflnce.io

## Current Status
✅ **Local Development Working** - Site runs on http://localhost:3001  
⚠️ **Production Build Issues** - Requires valid Clerk authentication keys

## Quick Start (Local Development)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```
   Site will be available at http://localhost:3001

## Environment Variables Required

Create a `.env.local` file with these variables:

```env
# Clerk Authentication (get from https://dashboard.clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key
CLERK_SECRET_KEY=sk_test_your_actual_secret_key

# Convex Backend (get from https://dashboard.convex.dev)
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Optional Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

## To Deploy to Vercel

1. **Get Real API Keys:**
   - Sign up at [Clerk](https://clerk.com) for authentication
   - Sign up at [Convex](https://convex.dev) for backend
   - Copy your API keys

2. **Update .env.local with real keys**

3. **Test production build locally:**
   ```bash
   npm run build
   npm start
   ```

4. **Deploy to Vercel:**
   - Push to GitHub
   - Connect repo to Vercel
   - Add environment variables in Vercel dashboard
   - Deploy

## Current Issues

The site requires valid Clerk authentication keys to build for production. Without them, you'll see:
- Error: "@clerk/clerk-react: The publishableKey passed to Clerk is invalid"

## Two Options to Fix

### Option 1: Get Real API Keys (Recommended)
1. Sign up for free Clerk account
2. Create a new application
3. Copy the API keys to .env.local
4. Sign up for Convex and get URL

### Option 2: Remove Authentication (Quick Testing)
If you just want to see the site without auth, I can create a simplified version that removes Clerk/Convex temporarily.

## Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (requires valid keys)
- `npm start` - Run production build
- `npm run lint` - Run linter

## Tech Stack
- Next.js 15.5.2
- React 19
- TypeScript
- Tailwind CSS
- Clerk (authentication)
- Convex (backend)