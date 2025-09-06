#!/bin/bash

# Inflnce Platform Launch Script

echo "🚀 Launching Inflnce Platform..."
echo "================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Kill any existing process on port 3000 or 3001
echo "🔧 Cleaning up ports..."
lsof -ti:3000 | xargs kill -9 2>/dev/null
lsof -ti:3001 | xargs kill -9 2>/dev/null

echo ""
echo "✨ Starting development server..."
echo "================================"
echo ""
echo "📍 The app will open at: http://localhost:3000"
echo ""
echo "📱 Pages you can visit:"
echo "   • Homepage:     http://localhost:3000"
echo "   • Services:     http://localhost:3000/services"
echo "   • Sign In:      http://localhost:3000/sign-in"
echo "   • Sign Up:      http://localhost:3000/sign-up"
echo "   • Dashboard:    http://localhost:3000/dashboard (requires auth)"
echo ""
echo "🔑 Note: Authentication features require Clerk setup"
echo ""
echo "Press Ctrl+C to stop the server"
echo "================================"
echo ""

# Start the dev server
npm run dev