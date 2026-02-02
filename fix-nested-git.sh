#!/bin/bash

cd /home/abdihope/AE-Platform

echo "🔧 Fixing nested git repository issue..."

echo "1. Checking for nested .git in frontend..."
if [ -d "frontend/.git" ]; then
    echo "   ❌ Found: frontend/.git"
    echo "   Removing nested git repository..."
    rm -rf frontend/.git
    rm -f frontend/.gitmodules 2>/dev/null
    echo "   ✅ Removed nested git"
else
    echo "   ✅ No nested .git found"
fi

echo "2. Checking for other nested repos..."
find . -name ".git" -type d ! -path "./.git/*" ! -path "./.git" | while read git_dir; do
    if [ "$git_dir" != "./.git" ]; then
        echo "   ❌ Found nested git: $git_dir"
        echo "   Removing..."
        rm -rf "$git_dir"
    fi
done

echo "3. Removing frontend from .gitmodules if exists..."
if [ -f ".gitmodules" ]; then
    echo "   Found .gitmodules file"
    # Remove frontend section from .gitmodules
    sed -i '/\[submodule "frontend"\]/,+2d' .gitmodules 2>/dev/null
    # If .gitmodules is empty, remove it
    if [ ! -s ".gitmodules" ]; then
        rm -f .gitmodules
    fi
fi

echo "4. Updating git index..."
git rm --cached frontend 2>/dev/null || true
git add frontend/

echo "5. Files to be committed:"
git status --porcelain | head -20

echo "6. Committing changes..."
git commit -m "fix: Add frontend as regular folder (not submodule)

- Removed nested .git repository from frontend/
- Frontend is now properly integrated into main repo
- All frontend files will show normally on GitHub"

echo "7. Pushing to GitHub..."
git push origin master

echo ""
echo "✅ Fixed! Frontend should now show as a normal folder on GitHub."
echo "📁 Check: https://github.com/$(git remote -v | grep origin | head -1 | sed 's/.*github.com[:/]\([^/]*\)\/\([^.]*\).*/\1\/\2/')"
