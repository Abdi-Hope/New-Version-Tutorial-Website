import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

// Core Pages
import Home from '../pages/Home';
import BrowseCourses from '../pages/BrowseCourses';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CourseDetail from '../pages/Course/CourseDetail';
import Dashboard from '../pages/Dashboard/Dashboard';
import Payment from '../pages/Payment';
import Teacher from '../pages/Teacher';
import NotFound from '../pages/NotFound';
import SettingsPage from '../pages/SettingsPage';
import NotificationsPage from '../pages/NotificationsPage';

// User Pages
import MyCourses from '../pages/MyCourses';
import Certificates from '../pages/Certificates';
import LearningPath from '../pages/LearningPath';
import Achievements from '../pages/Achievements';
import StudyGroups from '../pages/StudyGroups';

// Course Pages
import CoursePlayerPage from '../pages/Course/CoursePlayerPage';
import AssignmentPage from '../pages/Course/AssignmentPage';
import CertificatePage from '../pages/Course/CertificatePage';
import ResourcesPage from '../pages/Course/ResourcesPage';

// Instructor Pages
import InstructorDashboard from '../pages/Instructor/Dashboard';
import CourseManagement from '../pages/Instructor/CourseManagement';
import StudentAnalytics from '../pages/Instructor/StudentAnalytics';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Core Pages */}
          <Route index element={<Home />} />
          <Route path="courses" element={<BrowseCourses />} />
          <Route path="course/:courseId" element={<CourseDetail />} />
          
          {/* Course Learning Pages */}
          <Route path="course/:courseId/learn" element={<CoursePlayerPage />} />
          <Route path="course/:courseId/assignment/:assignmentId" element={<AssignmentPage />} />
          <Route path="course/:courseId/certificate" element={<CertificatePage />} />
          <Route path="course/:courseId/resources" element={<ResourcesPage />} />
          
          {/* User Pages */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="learning-path" element={<LearningPath />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="study-groups" element={<StudyGroups />} />
          
          {/* Instructor Pages */}
          <Route path="instructor">
            <Route index element={<InstructorDashboard />} />
            <Route path="dashboard" element={<InstructorDashboard />} />
            <Route path="courses" element={<CourseManagement />} />
            <Route path="analytics" element={<StudentAnalytics />} />
          </Route>
          
          {/* System Pages */}
          <Route path="payment" element={<Payment />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="teachers" element={<Teacher />} />
          
          {/* Redirects */}
          <Route path="about" element={<Navigate to="/" />} />
          <Route path="pricing" element={<Navigate to="/courses" />} />
          
          {/* 404 - MUST BE LAST */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
