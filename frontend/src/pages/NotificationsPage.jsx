import React, { useState } from "react";
import {
  Bell, CheckCircle, AlertCircle, Info, Award,
  Calendar, BookOpen, MessageSquare, TrendingUp,
  Filter, Archive, Trash2, Settings, X, Check,
  Mail, Star, Users, Zap, Clock, ArrowLeft, Home
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "course",
      title: "New Content Available",
      message: "New module added to Advanced React Development course",
      course: "Advanced React",
      time: "2 minutes ago",
      read: false,
      important: true,
      icon: <BookOpen className="w-5 h-5 text-blue-500" />
    },
    {
      id: 2,
      type: "achievement",
      title: "Achievement Unlocked!",
      message: "You've earned the 'Fast Learner' badge",
      time: "1 hour ago",
      read: false,
      important: true,
      icon: <Award className="w-5 h-5 text-yellow-500" />
    },
    {
      id: 3,
      type: "deadline",
      title: "Assignment Due Tomorrow",
      message: "React Performance Optimization assignment is due",
      course: "Advanced React",
      time: "3 hours ago",
      read: true,
      important: true,
      icon: <Calendar className="w-5 h-5 text-red-500" />
    },
    {
      id: 4,
      type: "system",
      title: "System Maintenance",
      message: "Platform maintenance scheduled for January 20, 2:00 AM",
      time: "5 hours ago",
      read: true,
      important: false,
      icon: <Info className="w-5 h-5 text-gray-500" />
    },
    {
      id: 5,
      type: "message",
      title: "New Message",
      message: "Sarah Johnson replied to your question in Node.js course",
      course: "Node.js Backend",
      time: "1 day ago",
      read: true,
      important: false,
      icon: <MessageSquare className="w-5 h-5 text-green-500" />
    },
    {
      id: 6,
      type: "progress",
      title: "Weekly Progress Report",
      message: "You're 75% through the Advanced React course",
      course: "Advanced React",
      time: "2 days ago",
      read: true,
      important: false,
      icon: <TrendingUp className="w-5 h-5 text-purple-500" />
    },
    {
      id: 7,
      type: "announcement",
      title: "New Course Available",
      message: "Check out the new AI Fundamentals course",
      time: "3 days ago",
      read: true,
      important: false,
      icon: <Bell className="w-5 h-5 text-orange-500" />
    },
    {
      id: 8,
      type: "community",
      title: "Community Update",
      message: "Join the React Developer meetup this Friday",
      time: "1 week ago",
      read: true,
      important: false,
      icon: <Users className="w-5 h-5 text-pink-500" />
    }
  ]);

  const notificationTypes = [
    { id: "all", label: "All", count: notifications.length, icon: <Bell size={16} /> },
    { id: "unread", label: "Unread", count: notifications.filter(n => !n.read).length, icon: <Mail size={16} /> },
    { id: "important", label: "Important", count: notifications.filter(n => n.important).length, icon: <Star size={16} /> },
    { id: "course", label: "Courses", count: notifications.filter(n => n.type === "course").length, icon: <BookOpen size={16} /> },
    { id: "achievement", label: "Achievements", count: notifications.filter(n => n.type === "achievement").length, icon: <Award size={16} /> },
    { id: "deadline", label: "Deadlines", count: notifications.filter(n => n.type === "deadline").length, icon: <Calendar size={16} /> }
  ];

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === "all") return true;
    if (filter === "unread") return !notification.read;
    if (filter === "important") return notification.important;
    return notification.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with Back Button */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Back</span>
              </button>
              
              {/* Home Button */}
              <Link to="/">
                <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Home size={20} />
                  <span className="hidden sm:inline">Home</span>
                </button>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                <CheckCircle size={18} />
                <span>Mark all as read</span>
              </button>
              <Link to="/settings">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Settings className="w-6 h-6" />
                </button>
              </Link>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              <p className="text-gray-600 dark:text-gray-300">
                {notifications.filter(n => !n.read).length} unread notifications
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 mb-6">
              <h3 className="font-semibold mb-4 flex items-center space-x-2">
                <Filter size={18} />
                <span>Filters</span>
              </h3>
              <div className="space-y-2">
                {notificationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setFilter(type.id)}
                    className={`flex items-center justify-between w-full p-3 rounded-lg text-left transition-colors ${
                      filter === type.id
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-500'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {type.icon}
                      <span>{type.label}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      filter === type.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {type.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={markAllAsRead}
                  className="flex items-center space-x-2 w-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <CheckCircle size={16} />
                  <span>Mark all as read</span>
                </button>
                <button className="flex items-center space-x-2 w-full p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <Archive size={16} />
                  <span>Archive all read</span>
                </button>
                <button
                  onClick={clearAll}
                  className="flex items-center space-x-2 w-full p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                  <span>Clear all notifications</span>
                </button>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-16">
                  <Bell className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {filter === "all"
                      ? "You're all caught up!"
                      : `No ${filter} notifications`}
                  </p>
                  <button
                    onClick={() => navigate(-1)}
                    className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all"
                  >
                    Go Back
                  </button>
                </div>
              ) : (
                <div className="divide-y dark:divide-gray-700">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                        !notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            {notification.icon}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                {notification.title}
                              </h4>
                              <p className="text-gray-600 dark:text-gray-300 mt-1">
                                {notification.message}
                              </p>
                              {notification.course && (
                                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm mt-2">
                                  {notification.course}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center space-x-2">
                              {!notification.read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                              )}
                              {notification.important && (
                                <AlertCircle className="w-4 h-4 text-yellow-500" />
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                              <Clock size={14} />
                              <span>{notification.time}</span>
                            </div>

                            <div className="flex items-center space-x-3">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                                >
                                  Mark as read
                                </button>
                              )}
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
                    <p className="text-2xl font-bold">{notifications.length}</p>
                  </div>
                  <Bell className="w-8 h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Unread</p>
                    <p className="text-2xl font-bold">
                      {notifications.filter(n => !n.read).length}
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Important</p>
                    <p className="text-2xl font-bold">
                      {notifications.filter(n => n.important).length}
                    </p>
                  </div>
                  <Star className="w-8 h-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Courses</p>
                    <p className="text-2xl font-bold">
                      {notifications.filter(n => n.type === "course").length}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
