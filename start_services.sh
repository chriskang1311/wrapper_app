#!/bin/bash

echo "🚀 Starting ChatGPT Wrapper Services..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Stopping services..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend
echo "📡 Starting Flask backend on port 5001..."
cd "$(dirname "$0")"
python app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🌐 Starting React frontend on port 3000..."
cd wrapper_frontend
npm start &
FRONTEND_PID=$!

echo "✅ Services started!"
echo "   Backend: http://localhost:5001"
echo "   Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for both processes
wait 