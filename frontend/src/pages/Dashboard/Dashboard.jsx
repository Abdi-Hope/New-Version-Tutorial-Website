import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  BookOpen,
  Clock,
  Award,
  Download,
  Calendar,
  Target,
  Users,
  Star,
  Bell,
  Settings,
} from "lucide-react";
import { EnrollmentStatus } from "../../components/enrollment";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("overview");

  // Mock data
  const user = {
    name: "John Doe",
    level: "Intermediate",
    joinDate: "2024-01-01",
    coursesEnrolled: 3,
    coursesCompleted: 1,
    streak: 14,
    points: 1240,
  };

  const enrolledCourses = [
    {
      id: 1,
      title: "Advanced React Development",
      progress: 75,
      instructor: "Sarah Johnson",
      nextLesson: "Performance Optimization",
      dueDate: "2024-01-30",
    },
    {
      id: 2,
      title: "Node.js Backend Mastery",
      progress: 30,
      instructor: "Michael Chen",
      nextLesson: "Authentication & Authorization",
      dueDate: "2024-02-15",
    },
    {
      id: 3,
      title: "UI/UX Design Fundamentals",
      progress: 10,
      instructor: "Emma Wilson",
      nextLesson: "Design Systems",
      dueDate: "2024-02-28",
    },
  ];

  const stats = [
    { label: "Learning Hours", value: "48", icon: <Clock />, change: "+12%" },
    { label: "Courses", value: "3", icon: <BookOpen />, change: "+1" },
    { label: "Certificates", value: "1", icon: <Award />, change: "+100%" },
    { label: "Rank", value: "#124", icon: <TrendingUp />, change: "+15" },
  ];

  const recentActivity = [
    {
      action: "Completed lesson",
      course: "Advanced React",
      time: "2 hours ago",
    },
    { action: "Submitted assignment", course: "Node.js", time: "1 day ago" },
    {
      action: "Earned certificate",
      course: "React Fundamentals",
      time: "3 days ago",
    },
    {
      action: "Started new course",
      course: "UI/UX Design",
      time: "1 week ago",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Welcome back, {user.name}!
              </p>
            </div>
            
            {/* Notification and Settings Buttons */}
            <div className="flex items-center space-x-2">
              {/* Notifications Button with Badge */}
              <Link to="/notifications" className="relative">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 group">
                  <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                  {/* Unread Notification Badge */}
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
                    3
                  </span>
                </button>
              </Link>
              
              {/* Settings Button */}
              <Link to="/settings">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 group">
                  <Settings className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </button>
              </Link>
              
              {/* Optional: User Profile Button */}
              <div className="relative ml-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 hover:shadow-lg active:scale-95">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="font-bold">{user.name.charAt(0)}</span>
                  </div>
                  <span className="font-medium hidden md:inline">Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Header Design (if you prefer buttons on the left) */}
      {/* <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                {user.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Welcome back, {user.name}!
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link to="/notifications" className="relative">
                <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                  <Bell className="w-5 h-5" />
                  <span>Notifications</span>
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </Link>
              
              <Link to="/settings">
                <button className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all duration-200">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div> */}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <div className="text-blue-600 dark:text-blue-400">
                        {stat.icon}
                      </div>
                    </div>
                    <span className="text-green-600 dark:text-green-400 text-sm font-semibold">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Progress */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Learning Progress
                </h2>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                  View all
                </button>
              </div>

              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <div
                    key={course.id}
                    className="border dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors duration-200"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Instructor: {course.instructor}
                        </p>
                      </div>
                      <div className="text-right mt-2 md:mt-0">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {course.progress}%
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Progress
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">
                          Next: {course.nextLesson}
                        </span>
                        <span className="text-gray-600 dark:text-gray-300">
                          Due: {course.dueDate}
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-4">
                      <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-all duration-200 hover:shadow-lg">
                        Continue Learning
                      </button>
                      <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrollment Status */}
            <div className="mb-8">
              <EnrollmentStatus
                enrollment={{
                  id: "ENR-2024-001",
                  courseTitle: "Advanced React Development",
                  status: "in_progress",
                  appliedDate: "2024-01-15",
                  paymentDate: "2024-01-15",
                  accessDate: "2024-01-16",
                  startDate: "2024-01-16",
                  enrolledDate: "2024-01-15",
                  expiryDate: "2025-01-15",
                  amount: 299,
                  paymentMethod: "credit_card",
                  transactionId: "TXN-2024-001-ABCDEF",
                }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {user.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {user.name}
                </h3>
                <div className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium inline-block mt-2">
                  {user.level} Learner
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {user.streak}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Day Streak
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {user.points}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      Points
                    </div>
                  </div>
                </div>

                <button className="w-full mt-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 hover:shadow-lg">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Recent Activity</h3>
                <Bell className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {activity.course} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Upcoming Deadlines</h3>
                <Calendar className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {[
                  {
                    title: "React Assignment",
                    course: "Advanced React",
                    date: "Tomorrow",
                  },
                  {
                    title: "Node.js Project",
                    course: "Backend Mastery",
                    date: "In 3 days",
                  },
                  {
                    title: "Design Review",
                    course: "UI/UX Fundamentals",
                    date: "Next week",
                  },
                ].map((deadline, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10 rounded-lg border border-yellow-200 dark:border-yellow-800/30 hover:border-yellow-300 dark:hover:border-yellow-700 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {deadline.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {deadline.course}
                      </p>
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-sm font-medium">
                      {deadline.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg">Learning Goals</h3>
                <Target className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Weekly Target
                    </span>
                    <span className="text-sm font-semibold">12/20 hours</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Course Completion
                    </span>
                    <span className="text-sm font-semibold">1/3 courses</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-500"
                      style={{ width: "33%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;