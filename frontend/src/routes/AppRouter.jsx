import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // Only these imports

// Import MainLayout
import MainLayout from '../components/MainLayout';
import AdminLayout from '../components/admin/common/AdminLayout';

// Public pages
import Home from '../pages/Home';
import BrowseCourses from '../pages/BrowseCourses';
import CourseDetail from '../pages/Course/CourseDetail';
import Login from '../pages/Login';
import Register from '../pages/Register';
import NotFound from '../pages/NotFound';
import Teacher from '../pages/Teacher';
import About from '../pages/About';

// Protected pages (require authentication)
import Dashboard from '../pages/Dashboard/Dashboard';
import MyCourses from '../pages/MyCourses';
import CoursePlayerPage from '../pages/Course/CoursePlayerPage';
import LearningPath from '../pages/LearningPath';
import Certificates from '../pages/Certificates';
import NotificationsPage from '../pages/NotificationsPage';
import SettingsPage from '../pages/SettingsPage';
import StudyGroups from '../pages/StudyGroups';

// Instructor pages
import InstructorDashboard from '../pages/Instructor/Dashboard';
import CourseManagement from '../pages/Instructor/CourseManagement';
import StudentAnalytics from '../pages/Instructor/StudentAnalytics';
import RevenueAnalytics from '../pages/Instructor/RevenueAnalytics';
import ContentLibrary from '../pages/Instructor/ContentLibrary';

// Admin pages
import AdminDashboard from '../pages/admin/Dashboard';
import UserManagement from '../pages/admin/Users/index';
import CourseApproval from '../pages/admin/Courses/Approvals';
import SystemSettings from '../pages/admin/Settings/System';

// Course pages
import AssignmentPage from '../pages/Course/AssignmentPage';
import CertificatePage from '../pages/Course/CertificatePage';
import ResourcesPage from '../pages/Course/ResourcesPage';

// Simple auth check - reads from localStorage directly
const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  if (!user) return false;
  
  try {
    const userData = JSON.parse(user);
    return !!userData; // Return true if user exists (any role)
  } catch {
    return false;
  }
};

// Check if user has specific role
const hasRole = (requiredRoles) => {
  const user = localStorage.getItem('user');
  if (!user) return false;
  
  try {
    const userData = JSON.parse(user);
    return requiredRoles.includes(userData.role);
  } catch {
    return false;
  }
};

// Protected Route component - for any authenticated user
const ProtectedRoute = ({ children, roles = [] }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  
  // Check roles if specified
  if (roles.length > 0 && !hasRole(roles)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

const AppRouter = () => {
  return (
    // REMOVE <Router> - just use <Routes>
    <Routes>
      {/* Main Layout Routes (with Header/Footer) */}
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<BrowseCourses />} />
        <Route path="/course/:courseId" element={<CourseDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/teachers" element={<Teacher />} />
        <Route path="/about" element={<About />} />
        <Route path="/free-trial" element={<Home />} />

        {/* Student Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn/:courseId"
          element={
            <ProtectedRoute>
              <CoursePlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-paths"
          element={
            <ProtectedRoute>
              <LearningPath />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates"
          element={
            <ProtectedRoute>
              <Certificates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-groups"
          element={
            <ProtectedRoute>
              <StudyGroups />
            </ProtectedRoute>
          }
        />

        {/* Course Sub-routes */}
        <Route
          path="/course/:courseId/assignment/:assignmentId"
          element={
            <ProtectedRoute>
              <AssignmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/certificate"
          element={
            <ProtectedRoute>
              <CertificatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/resources"
          element={
            <ProtectedRoute>
              <ResourcesPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Instructor Routes with AdminLayout */}
      <Route element={<AdminLayout />}>
        <Route
          path="/instructor/dashboard"
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses"
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <CourseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/students"
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <StudentAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/revenue"
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <RevenueAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/content"
          element={
            <ProtectedRoute roles={['instructor', 'admin']}>
              <ContentLibrary />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Admin Routes with AdminLayout */}
      <Route element={<AdminLayout />}>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute roles={['admin']}>
              <UserManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <ProtectedRoute roles={['admin']}>
              <CourseApproval />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute roles={['admin']}>
              <SystemSettings />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;