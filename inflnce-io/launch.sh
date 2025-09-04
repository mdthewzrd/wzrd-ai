#!/bin/bash

# Inflnce.io Launch Script
echo "🚀 Launching Inflnce.io Platform..."
echo ""

# Check if .env.local exists and is configured
if [ ! -f .env.local ]; then
    echo "❌ .env.local file not found!"
    echo "Please create .env.local with your Supabase and Stripe credentials"
    exit 1
fi

# Check if Supabase URL is configured
if grep -q "placeholder" .env.local; then
    echo "⚠️  WARNING: .env.local contains placeholder values"
    echo "Please update with your actual Supabase and Stripe credentials"
    echo ""
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Clear any existing processes
echo "🧹 Clearing existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

echo ""
echo "🌐 Starting development server..."
echo ""
echo "Available after login:"
echo "  • Admin Dashboard: http://localhost:3000/admin"
echo "  • Reseller Dashboard: http://localhost:3000/reseller" 
echo "  • Client Dashboard: http://localhost:3000/client"
echo ""
echo "Public pages:"
echo "  • Homepage: http://localhost:3000/"
echo "  • Login: http://localhost:3000/login"
echo "  • Social Media: http://localhost:3000/social-media"
echo "  • Tools: http://localhost:3000/tools"
echo "  • Publications: http://localhost:3000/publications"
echo ""
echo "To stop the server: Ctrl+C"
echo "═══════════════════════════════════════════════════════"

# Start the development server
npm run dev