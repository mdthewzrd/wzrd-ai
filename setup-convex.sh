#!/bin/bash

echo "🔧 Convex Database Setup"
echo "========================"
echo ""
echo "📋 Prerequisites:"
echo "1. You need a Convex account (https://convex.dev)"
echo "2. You need your deployment URL"
echo ""
echo "🚀 Steps to complete:"
echo ""
echo "1. First, make sure you've added your Convex URL to .env.local:"
echo "   NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud"
echo ""
echo "2. Run this command to login to Convex:"
echo "   npx convex login"
echo ""
echo "3. Then run this to initialize your project:"
echo "   npx convex dev"
echo ""
echo "This will:"
echo "✓ Connect to your Convex project"
echo "✓ Upload the database schema"
echo "✓ Deploy all the functions we created"
echo "✓ Generate TypeScript types"
echo ""
echo "Press Enter to continue..."
read

echo "Running Convex login..."
npx convex login

echo ""
echo "Now initializing Convex..."
npx convex dev