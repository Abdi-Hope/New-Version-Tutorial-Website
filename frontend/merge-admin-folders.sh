#!/bin/bash
echo "=== COMPLETE ADMIN FOLDER MERGE ==="
echo ""

echo "1. Navigating to pages directory..."
cd src/pages

echo "2. Checking folders..."
if [ -d "Admin" ] && [ -d "admin" ]; then
  echo "   ✅ Both Admin and admin folders exist"
  echo "   Admin files: $(ls Admin/*.jsx 2>/dev/null | wc -l)"
  echo "   admin files: $(find admin -name "*.jsx" | wc -l)"
  
  echo ""
  echo "3. Moving Admin files to appropriate admin subfolders..."
  
  # Move Dashboard.jsx
  if [ -f "Admin/Dashboard.jsx" ]; then
    if [ ! -f "admin/Dashboard.jsx" ]; then
      mv "Admin/Dashboard.jsx" "admin/Dashboard.jsx"
      echo "   Moved: Dashboard.jsx"
    else
      # Keep the better one
      admin_lines=$(wc -l < "admin/Dashboard.jsx")
      Admin_lines=$(wc -l < "Admin/Dashboard.jsx")
      if [ $Admin_lines -gt $admin_lines ]; then
        mv "admin/Dashboard.jsx" "admin/Dashboard_backup.jsx"
        mv "Admin/Dashboard.jsx" "admin/Dashboard.jsx"
        echo "   Replaced: Dashboard.jsx (Admin version was better)"
      else
        echo "   Kept: admin/Dashboard.jsx (was better)"
        rm "Admin/Dashboard.jsx"
      fi
    fi
  fi
  
  # Move other files
  for file in Admin/*.jsx; do
    if [ -f "$file" ]; then
      filename=$(basename "$file")
      case $filename in
        "CourseApproval.jsx")
          dest="admin/Courses/Approvals.jsx"
          ;;
        "UserManagement.jsx")
          dest="admin/Users/index.jsx"
          ;;
        "SystemSettings.jsx")
          dest="admin/Settings/System.jsx"
          ;;
        *)
          dest="admin/$filename"
          ;;
      esac
      
      if [ ! -f "$dest" ]; then
        mv "$file" "$dest"
        echo "   Moved: $filename → $dest"
      else
        echo "   Skipped: $filename (destination exists: $dest)"
        # Move to backup
        mv "$file" "admin/${filename%.jsx}_backup.jsx"
      fi
    fi
  done
  
  # Remove Admin folder
  rmdir Admin 2>/dev/null && echo "   ✅ Removed Admin folder" || echo "   ⚠️ Could not remove Admin folder"
  
elif [ -d "Admin" ] && [ ! -d "admin" ]; then
  echo "   Only Admin folder exists, renaming to admin..."
  mv Admin admin
  echo "   ✅ Renamed Admin to admin"
else
  echo "   ✅ Only admin folder exists (good!)"
fi

echo ""
echo "4. Updating imports..."
cd ../..
find src -name "*.jsx" -o -name "*.js" | xargs sed -i 's|/pages/Admin/|/pages/admin/|gi' 2>/dev/null || true

# Fix specific imports
find src -name "*.jsx" -o -name "*.js" | xargs sed -i '
  s|from.*\.\./pages/admin/CourseApproval|from ../pages/admin/Courses/Approvals|g;
  s|from.*pages/admin/CourseApproval|from pages/admin/Courses/Approvals|g;
  s|from.*\.\./pages/admin/UserManagement|from ../pages/admin/Users/index|g;
  s|from.*pages/admin/UserManagement|from pages/admin/Users/index|g;
  s|from.*\.\./pages/admin/SystemSettings|from ../pages/admin/Settings/System|g;
  s|from.*pages/admin/SystemSettings|from pages/admin/Settings/System|g;
' 2>/dev/null || true

echo ""
echo "5. Verifying structure..."
cd src/pages/admin
echo "   Total admin files: $(find . -name "*.jsx" | wc -l)"
echo "   Main files:"
ls *.jsx 2>/dev/null || echo "   No root .jsx files"
echo "   Subfolders:"
ls -d */

echo ""
echo "✅ MERGE COMPLETE!"
echo "   Restart your server and access:"
echo "   - http://localhost:5179/admin/dashboard"
echo "   - http://localhost:5179/admin/users"
echo "   - http://localhost:5179/admin/courses"
echo "   - http://localhost:5179/admin/settings"
