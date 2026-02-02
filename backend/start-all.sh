#!/bin/bash

echo "🚀 Starting AE Platform..."

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Function to check port
check_port() {
    if nc -z localhost $1 2>/dev/null; then
        echo -e "${GREEN}✅ Port $1 is open${NC}"
        return 0
    else
        echo -e "${RED}❌ Port $1 is closed${NC}"
        return 1
    fi
}

# 1. Check MongoDB
echo -e "\n${YELLOW}1. Checking MongoDB...${NC}"
if mongosh --eval "db.runCommand({ping: 1})" --quiet 2>/dev/null; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
else
    echo -e "${RED}❌ MongoDB is not running${NC}"
    echo "Starting MongoDB..."
    sudo systemctl start mongodb 2>/dev/null || \
    sudo service mongodb start 2>/dev/null || \
    echo "Please start MongoDB manually"
    sleep 2
fi

# 2. Start Backend
echo -e "\n${YELLOW}2. Starting Backend...${NC}"
cd /home/abdihope/AE-Platform/backend

# Kill existing backend
pkill -f "node.*server.js" 2>/dev/null && echo "Killed existing backend"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing backend dependencies..."
    npm install
fi

# Check .env
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cat > .env << 'ENVEOF'
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ae_platform
JWT_SECRET=your-super-secret-jwt-key-change-in-production
FRONTEND_URL=http://localhost:5178
ENVEOF
fi

# Start backend
echo "Starting backend server on port 5000..."
npm run dev &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"

# Wait and check
sleep 5
if check_port 5000; then
    echo -e "${GREEN}✅ Backend is running at http://localhost:5000${NC}"
    echo "Health check:"
    curl -s http://localhost:5000/api/health | head -5
else
    echo -e "${RED}❌ Backend failed to start${NC}"
    echo "Check backend logs above for errors"
fi

# 3. Start Frontend
echo -e "\n${YELLOW}3. Starting Frontend...${NC}"
cd /home/abdihope/AE-Platform/frontend

# Kill existing frontend
pkill -f "vite" 2>/dev/null && echo "Killed existing frontend"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Check frontend .env
if [ ! -f ".env" ]; then
    echo "Creating frontend .env..."
    echo "VITE_API_URL=http://localhost:5000/api" > .env
fi

# Start frontend
echo "Starting frontend server..."
npm run dev &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

# Wait and check
sleep 8
if check_port 5178; then
    echo -e "${GREEN}✅ Frontend is running at http://localhost:5178${NC}"
else
    # Try to find which port frontend is using
    FRONTEND_PORT=$(netstat -tulpn 2>/dev/null | grep vite | head -1 | awk '{print $4}' | cut -d: -f2)
    if [ ! -z "$FRONTEND_PORT" ]; then
        echo -e "${GREEN}✅ Frontend is running at http://localhost:$FRONTEND_PORT${NC}"
    else
        echo -e "${RED}❌ Frontend failed to start${NC}"
    fi
fi

# 4. Summary
echo -e "\n${YELLOW}📊 Summary:${NC}"
echo "MongoDB: $(mongosh --eval "db.runCommand({ping: 1})" --quiet 2>/dev/null && echo '✅' || echo '❌')"
echo "Backend (5000): $(check_port 5000 >/dev/null && echo '✅' || echo '❌')"
echo "Frontend (5178): $(check_port 5178 >/dev/null && echo '✅' || echo '❌')"

echo -e "\n${GREEN}🌐 Access URLs:${NC}"
echo "Frontend: http://localhost:5178"
echo "Backend API: http://localhost:5000/api"
echo "API Health: http://localhost:5000/api/health"

echo -e "\n${YELLOW}🔧 Test Accounts:${NC}"
echo "Admin: admin@test.com / admin123"
echo "Instructor: instructor@test.com / instructor123"
echo "Student: student@test.com / student123"

echo -e "\n${YELLOW}🛑 To stop: kill $BACKEND_PID $FRONTEND_PID${NC}"
echo "Or press Ctrl+C in this terminal"

# Keep running
wait
