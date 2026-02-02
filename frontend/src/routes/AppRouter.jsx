import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

// Import MainLayout
import MainLayout from "../components/MainLayout";
import AdminLayout from "../components/admin/common/AdminLayout";

// Public pages
import Home from "../pages/Home";
import BrowseCourses from "../pages/BrowseCourses";
import CourseDetail from "../pages/Course/CourseDetail";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Teacher from "../pages/Teacher";
import About from "../pages/About";

// Protected pages (require authentication)
import Dashboard from "../pages/Dashboard/Dashboard";
import MyCourses from "../pages/MyCourses";
import CoursePlayerPage from "../pages/Course/CoursePlayerPage";
import LearningPath from "../pages/LearningPath";
import Certificates from "../pages/Certificates";
import NotificationsPage from "../pages/NotificationsPage";
import SettingsPage from "../pages/SettingsPage";
import StudyGroups from "../pages/StudyGroups";

// Instructor pages
import InstructorDashboard from "../pages/Instructor/Dashboard";
import CourseManagement from "../pages/Instructor/CourseManagement";
import StudentAnalytics from "../pages/Instructor/StudentAnalytics";
import RevenueAnalytics from "../pages/Instructor/RevenueAnalytics";
import ContentLibrary from "../pages/Instructor/ContentLibrary";

// Admin pages
import AdminDashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/Users/index";
import CourseApproval from "../pages/admin/Courses/Approvals";
import SystemSettings from "../pages/admin/Settings/System";

// Course pages
import AssignmentPage from "../pages/Course/AssignmentPage";
import CertificatePage from "../pages/Course/CertificatePage";
import ResourcesPage from "../pages/Course/ResourcesPage";

// Loader component for auth check
const AuthLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

// Protected Route component with API verification
const ProtectedRoute = ({ children, roles = [] }) => {
  const [authState, setAuthState] = useState({ 
    isAuthenticated: false, 
    user: null, 
    isLoading: true 
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyAuth = async () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (!token || !storedUser) {
        setAuthState({ isAuthenticated: false, user: null, isLoading: false });
        navigate('/login', { 
          state: { from: location.pathname },
          replace: true 
        });
        return;
      }

      try {
        // Import api dynamically
        const { authAPI } = await import('../services/api');
        const response = await authAPI.getMe();
        
        if (response.success && response.user.id === JSON.parse(storedUser).id) {
          setAuthState({ 
            isAuthenticated: true, 
            user: response.user, 
            isLoading: false 
          });
        } else {
          throw new Error('Invalid user data');
        }
      } catch (error) {
        console.error('Auth verification failed:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuthState({ isAuthenticated: false, user: null, isLoading: false });
        navigate('/login', { 
          state: { from: location.pathname },
          replace: true 
        });
      }
    };

    verifyAuth();
  }, [location.pathname, navigate]);

  // Show loading state
  if (authState.isLoading) {
    return <AuthLoader />;
  }

  // If not authenticated, nothing will render (already redirected)
  if (!authState.isAuthenticated) {
    return null;
  }

  // Check roles if specified
  if (roles.length > 0 && !roles.includes(authState.user.role)) {
    // Redirect to appropriate dashboard based on role
    switch(authState.user.role) {
      case 'admin':
        navigate('/admin/dashboard', { replace: true });
        break;
      case 'instructor':
        navigate('/instructor/dashboard', { replace: true });
        break;
      default:
        navigate('/dashboard', { replace: true });
    }
    return null;
  }

  return children;
};

// Quick auth check for conditional rendering
const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user:', error);
      }
    }
  }, []);

  return { user };
};

const AppRouter = () => {
  const { user } = useAuth();
  
  return (
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

        {/* Student/User Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={['user']}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute roles={['user']}>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learn/:courseId"
          element={
            <ProtectedRoute roles={['user']}>
              <CoursePlayerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/learning-paths"
          element={
            <ProtectedRoute roles={['user']}>
              <LearningPath />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificates"
          element={
            <ProtectedRoute roles={['user']}>
              <Certificates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute roles={['user']}>
              <NotificationsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute roles={['user']}>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/study-groups"
          element={
            <ProtectedRoute roles={['user']}>
              <StudyGroups />
            </ProtectedRoute>
          }
        />

        {/* Course Sub-routes */}
        <Route
          path="/course/:courseId/assignment/:assignmentId"
          element={
            <ProtectedRoute roles={['user']}>
              <AssignmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/certificate"
          element={
            <ProtectedRoute roles={['user']}>
              <CertificatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/course/:courseId/resources"
          element={
            <ProtectedRoute roles={['user']}>
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
            <ProtectedRoute roles={['instructor']}>
              <InstructorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/courses"
          element={
            <ProtectedRoute roles={['instructor']}>
              <CourseManagement />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/students"
          element={
            <ProtectedRoute roles={['instructor']}>
              <StudentAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/revenue"
          element={
            <ProtectedRoute roles={['instructor']}>
              <RevenueAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/content"
          element={
            <ProtectedRoute roles={['instructor']}>
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