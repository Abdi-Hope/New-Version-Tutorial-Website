import React, { useState } from 'react';
import { 
  Users, BookOpen, DollarSign, TrendingUp, 
  Clock, Award, BarChart3, Calendar,
  Download, Filter, MoreVertical, ChevronRight,
  Eye, UserCheck, AlertCircle, CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState('month');

  const stats = [
    {
      title: 'Total Users',
      value: '12,458',
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Total Courses',
      value: '856',
      change: '+5.2%',
      trend: 'up',
      icon: BookOpen,
      color: 'bg-purple-500'
    },
    {
      title: 'Total Revenue',
      value: '$245,890',
      change: '+18.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      title: 'Active Students',
      value: '8,742',
      change: '+8.7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-yellow-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      user: 'Alex Johnson',
      action: 'approved',
      target: 'React Advanced Course',
      time: '5 minutes ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      user: 'Sarah Wilson',
      action: 'registered',
      target: 'as a new student',
      time: '15 minutes ago',
      icon: UserCheck,
      color: 'text-blue-500'
    },
    {
      id: 3,
      user: 'Mike Chen',
      action: 'submitted',
      target: 'Python Course for review',
      time: '1 hour ago',
      icon: AlertCircle,
      color: 'text-yellow-500'
    },
    {
      id: 4,
      user: 'Lisa Rodriguez',
      action: 'completed',
      target: 'Web Development Bootcamp',
      time: '2 hours ago',
      icon: Award,
      color: 'text-purple-500'
    },
    {
      id: 5,
      user: 'David Kim',
      action: 'reported',
      target: 'issue with video playback',
      time: '3 hours ago',
      icon: AlertCircle,
      color: 'text-red-500'
    }
  ];

  const topCourses = [
    { id: 1, title: 'Complete Web Development', students: 1245, revenue: '$89,450', rating: 4.9 },
    { id: 2, title: 'Python for Data Science', students: 987, revenue: '$74,320', rating: 4.8 },
    { id: 3, title: 'Digital Marketing Mastery', students: 856, revenue: '$62,150', rating: 4.7 },
    { id: 4, title: 'Mobile App Development', students: 745, revenue: '$58,920', rating: 4.9 },
    { id: 5, title: 'Cybersecurity Fundamentals', students: 632, revenue: '$47,850', rating: 4.6 }
  ];

  const pendingItems = {
    courses: 8,
    users: 23,
    payments: 12,
    reports: 5
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Overview of platform performance and activities
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 md:mt-0">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.color} rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 ${
                stat.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              }`}>
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">{stat.change}</span>
              </div>
            </div>
            
            <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {stat.title}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2">
          {/* Revenue Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Revenue Overview
              </h2>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <MoreVertical className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            {/* Chart Placeholder */}
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">Revenue chart will appear here</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">This Month</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">$45,890</p>
              </div>
              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Last Month</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">$38,750</p>
              </div>
              <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">This Quarter</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">$128,450</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">This Year</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">$245,890</p>
              </div>
            </div>
          </div>

          {/* Top Courses */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Top Performing Courses
              </h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {topCourses.map((course) => (
                <div key={course.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {course.title.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {course.title}
                      </h4>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span>{course.students.toLocaleString()} students</span>
                        <span>Rating: {course.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">{course.revenue}</p>
                    <button className="mt-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Pending Items */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Pending Actions
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Courses</span>
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pendingItems.courses}
                </p>
                <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Review →
                </button>
              </div>
              
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Users</span>
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pendingItems.users}
                </p>
                <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Verify →
                </button>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Payments</span>
                  <DollarSign className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pendingItems.payments}
                </p>
                <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Process →
                </button>
              </div>
              
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Reports</span>
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {pendingItems.reports}
                </p>
                <button className="mt-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Resolve →
                </button>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
                See All
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className={`p-2 ${activity.color.replace('text', 'bg')}/10 rounded-lg`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.user}</span> {activity.action}{' '}
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Platform Stats
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Average Session Time</span>
                <span className="font-medium text-gray-900 dark:text-white">24m 32s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Completion Rate</span>
                <span className="font-medium text-gray-900 dark:text-white">68%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Active Instructors</span>
                <span className="font-medium text-gray-900 dark:text-white">142</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Support Tickets</span>
                <span className="font-medium text-gray-900 dark:text-white">38</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
