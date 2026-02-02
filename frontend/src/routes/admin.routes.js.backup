import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from '../components/admin/common/AdminLayout';
import AdminDashboard from '../pages/admin/Dashboard';

// Users
import UsersList from '../pages/admin/Users/index';
import AddUser from '../pages/admin/Users/AddUser';
import EditUser from '../pages/admin/Users/EditUser';
import UserDetails from '../pages/admin/Users/UserDetails';

// Courses
import CoursesList from '../pages/admin/Courses/index';
import AddCourse from '../pages/admin/Courses/AddCourse';
import EditCourse from '../pages/admin/Courses/EditCourse';
import CourseDetails from '../pages/admin/Courses/CourseDetails';
import CourseApprovals from '../pages/admin/Courses/Approvals';

// Analytics
import AnalyticsDashboard from '../pages/admin/Analytics/index';
import RevenueAnalytics from '../pages/admin/Analytics/Revenue';
import UserAnalytics from '../pages/admin/Analytics/Users';
import CourseAnalytics from '../pages/admin/Analytics/Courses';

// Settings
import Settings from '../pages/admin/Settings/index';
import GeneralSettings from '../pages/admin/Settings/General';
import PaymentSettings from '../pages/admin/Settings/Payments';
import EmailSettings from '../pages/admin/Settings/Email';
import SystemSettings from '../pages/admin/Settings/System';

// Content
import ContentManagement from '../pages/admin/Content/index';
import MediaLibrary from '../pages/admin/Content/MediaLibrary';
import ContentCategories from '../pages/admin/Content/Categories';
import BulkUpload from '../pages/admin/Content/BulkUpload';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        
        {/* Users Routes */}
        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path="add" element={<AddUser />} />
          <Route path="edit/:id" element={<EditUser />} />
          <Route path=":id" element={<UserDetails />} />
        </Route>
        
        {/* Courses Routes */}
        <Route path="courses">
          <Route index element={<CoursesList />} />
          <Route path="add" element={<AddCourse />} />
          <Route path="edit/:id" element={<EditCourse />} />
          <Route path=":id" element={<CourseDetails />} />
          <Route path="approvals" element={<CourseApprovals />} />
        </Route>
        
        {/* Analytics Routes */}
        <Route path="analytics">
          <Route index element={<AnalyticsDashboard />} />
          <Route path="revenue" element={<RevenueAnalytics />} />
          <Route path="users" element={<UserAnalytics />} />
          <Route path="courses" element={<CourseAnalytics />} />
        </Route>
        
        {/* Settings Routes */}
        <Route path="settings">
          <Route index element={<Settings />} />
          <Route path="general" element={<GeneralSettings />} />
          <Route path="payments" element={<PaymentSettings />} />
          <Route path="email" element={<EmailSettings />} />
          <Route path="system" element={<SystemSettings />} />
        </Route>
        
        {/* Content Routes */}
        <Route path="content">
          <Route index element={<ContentManagement />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="categories" element={<ContentCategories />} />
          <Route path="bulk-upload" element={<BulkUpload />} />
        </Route>
        
        {/* Catch all redirect to admin dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
