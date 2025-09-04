#!/bin/bash

# Navigate to the correct directory
cd "$(dirname "$0")"

echo "🚀 Starting Inflnce.io Development Server..."
echo "📁 Current directory: $(pwd)"

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

echo ""
echo "✅ Server will be available at:"
echo "   🌐 http://localhost:3000 (or next available port)"
echo ""
echo "📍 Available pages:"
echo "   • Homepage: /"
echo "   • Social Media: /social-media"  
echo "   • Publications: /publications"
echo "   • Tools: /tools"
echo "   • My Orders: /orders"
echo "   • Settings: /settings"
echo "   • Learn More: /learn"
echo ""
echo "🛑 Press Ctrl+C to stop the server"
echo ""

# Start the development server
npm run dev