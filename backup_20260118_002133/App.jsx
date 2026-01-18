import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

// Pages
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import BrowseCourses from './pages/BrowseCourses'

// Route components
import { PublicRoute, ProtectedRoute, AdminRoute, TeacherRoute, StudentRoute } from './routes'

// Placeholder components for other pages
const Dashboard = () => <div className="p-8">Dashboard Page</div>
const CourseDetail = () => <div className="p-8">Course Detail Page</div>
const Cart = () => <div className="p-8">Cart Page</div>
const Checkout = () => <div className="p-8">Checkout Page</div>
const Profile = () => <div className="p-8">Profile Page</div>
const TeacherDashboard = () => <div className="p-8">Teacher Dashboard</div>
const StudentDashboard = () => <div className="p-8">Student Dashboard</div>
const AdminDashboard = () => <div className="p-8">Admin Dashboard</div>
const NotFound = () => <div className="p-8">404 - Page Not Found</div>

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<BrowseCourses />} />
          
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* Role-based Routes */}
          <Route path="/teacher/dashboard" element={
            <TeacherRoute>
              <TeacherDashboard />
            </TeacherRoute>
          } />
          
          <Route path="/student/dashboard" element={
            <StudentRoute>
              <StudentDashboard />
            </StudentRoute>
          } />
          
          <Route path="/admin/dashboard" element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
