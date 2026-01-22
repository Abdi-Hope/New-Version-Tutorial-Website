// src/routes/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import Home from '../pages/Home';
import BrowseCourses from '../pages/BrowseCourses';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CourseDetail from '../pages/Course/CourseDetail';
import Dashboard from '../pages/Dashboard/Dashboard';
import Payment from '../pages/Payment';
import Teacher from '../pages/Teacher';
import NotFound from '../pages/NotFound'; // You need to create this

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {/* Routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<BrowseCourses />} />
          <Route path="course/:courseId" element={<CourseDetail />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="teachers" element={<Teacher />} />
          <Route path="payment" element={<Payment />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
          {/* Redirect old routes */}
          <Route path="about" element={<Navigate to="/" />} />
          <Route path="pricing" element={<Navigate to="/courses" />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;