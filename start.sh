#!/bin/bash

echo "Starting inflnce.io site..."
echo "================================"

# Kill any existing Next.js processes
pkill -f "next dev" 2>/dev/null
pkill -f "next start" 2>/dev/null

# Clear Next.js cache
rm -rf .next/cache 2>/dev/null

echo "✓ Cleaned up old processes"

# Start in production mode for stability
echo "Building production version..."
npm run build

echo "Starting server..."
npm start

echo "================================"
echo "Site is now running at http://localhost:3000"