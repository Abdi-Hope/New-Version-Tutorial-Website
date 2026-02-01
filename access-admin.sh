#!/bin/bash
echo "=== Admin Panel Access Test ==="
echo ""

# Check services
echo "1. Checking services..."
if sudo systemctl is-active --quiet mongod; then
    echo "   ✅ MongoDB: Running"
else
    echo "   ❌ MongoDB: Not running"
    echo "     Run: sudo systemctl start mongod"
fi

echo ""
echo "2. Checking backend API..."
BACKEND_PORTS="5000 5001 3000 3001"
BACKEND_URL=""
for port in $BACKEND_PORTS; do
    if curl -s --connect-timeout 2 "http://localhost:$port/api/health" > /dev/null; then
        BACKEND_URL="http://localhost:$port"
        echo "   ✅ Backend: Running on port $port"
        break
    fi
done
if [ -z "$BACKEND_URL" ]; then
    echo "   ❌ Backend: Not running"
    echo "     Run: cd backend && npm run dev"
fi

echo ""
echo "3. Checking frontend..."
FRONTEND_PORTS="5179 3000 5173 5174 5175"
FRONTEND_URL=""
for port in $FRONTEND_PORTS; do
    if curl -s --connect-timeout 2 "http://localhost:$port" > /dev/null; then
        FRONTEND_URL="http://localhost:$port"
        echo "   ✅ Frontend: Running on port $port"
        break
    fi
done
if [ -z "$FRONTEND_URL" ]; then
    echo "   ❌ Frontend: Not running"
    echo "     Run: cd frontend && npm run dev"
fi

echo ""
echo "=== ACCESS LINKS ==="
if [ -n "$FRONTEND_URL" ]; then
    echo "1. Admin Login: $FRONTEND_URL/admin/login"
    echo "2. Admin Dashboard: $FRONTEND_URL/admin"
    echo ""
    echo "Default Credentials:"
    echo "   Email: admin@aeplatform.com"
    echo "   Password: Admin@123"
fi

if [ -n "$BACKEND_URL" ]; then
    echo ""
    echo "3. API Test: $BACKEND_URL/api/health"
    echo "4. Admin API Test: $BACKEND_URL/api/admin/test"
fi

echo ""
echo "=== TROUBLESHOOTING ==="
echo "If you see a blank page or error:"
echo "1. Make sure all 3 services are running (MongoDB, Backend, Frontend)"
echo "2. Clear browser cache: Ctrl+Shift+Delete"
echo "3. Check browser console for errors: F12 → Console"
echo "4. Try incognito mode"
