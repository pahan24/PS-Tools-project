#!/bin/bash

echo "================================================"
echo "       PS Tools - Quick Start Script          "
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Navigate to backend directory
cd "$(dirname "$0")/backend"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

echo "🚀 Starting PS Tools server..."
echo ""
echo "Server will be available at:"
echo "  - Website: http://localhost:3000"
echo "  - Admin: http://localhost:3000/admin/login.html"
echo ""
echo "Admin Credentials:"
echo "  - Username: admin"
echo "  - Password: admin123"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""
echo "================================================"
echo ""

# Start the server
npm start
