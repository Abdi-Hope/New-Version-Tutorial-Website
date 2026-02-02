import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Get user from localStorage directly
  const getUser = () => {
    try {
      const userStr = localStorage.getItem('user');
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  };

  const user = getUser();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {user?.name || 'Admin'}!
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg">
            Role: {user?.role || 'admin'}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-blue-800">Total Users</h3>
            <div className="text-2xl">📊</div>
          </div>
          <p className="text-3xl font-bold">1,254</p>
          <p className="text-sm text-blue-600 mt-2">↑ 12.5% from last month</p>
        </div>

        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-green-800">Total Courses</h3>
            <div className="text-2xl">📚</div>
          </div>
          <p className="text-3xl font-bold">48</p>
          <p className="text-sm text-green-600 mt-2">↑ 5.2% from last month</p>
        </div>

        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-purple-800">Revenue</h3>
            <div className="text-2xl">💰</div>
          </div>
          <p className="text-3xl font-bold">$12,540</p>
          <p className="text-sm text-purple-600 mt-2">↑ 18.3% from last month</p>
        </div>

        <div className="bg-orange-50 rounded-xl p-6 border border-orange-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-orange-800">Active Sessions</h3>
            <div className="text-2xl">👥</div>
          </div>
          <p className="text-3xl font-bold">234</p>
          <p className="text-sm text-orange-600 mt-2">Currently online</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/users"
            className="bg-blue-100 hover:bg-blue-200 text-blue-800 p-4 rounded-lg text-center transition"
          >
            <div className="text-2xl mb-2">👥</div>
            <h3 className="font-medium">Manage Users</h3>
            <p className="text-sm text-blue-600 mt-1">View, add, or edit users</p>
          </Link>
          
          <Link
            to="/admin/courses"
            className="bg-green-100 hover:bg-green-200 text-green-800 p-4 rounded-lg text-center transition"
          >
            <div className="text-2xl mb-2">📚</div>
            <h3 className="font-medium">Manage Courses</h3>
            <p className="text-sm text-green-600 mt-1">Approve and manage courses</p>
          </Link>
          
          <Link
            to="/admin/settings"
            className="bg-purple-100 hover:bg-purple-200 text-purple-800 p-4 rounded-lg text-center transition"
          >
            <div className="text-2xl mb-2">⚙️</div>
            <h3 className="font-medium">System Settings</h3>
            <p className="text-sm text-purple-600 mt-1">Configure platform settings</p>
          </Link>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-blue-600">👤</span>
              </div>
              <div>
                <p className="font-medium">New user registered</p>
                <p className="text-sm text-gray-600">John Doe (john@example.com)</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">2 minutes ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-green-600">📚</span>
              </div>
              <div>
                <p className="font-medium">Course published</p>
                <p className="text-sm text-gray-600">React Advanced Patterns</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">1 hour ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <span className="text-purple-600">💰</span>
              </div>
              <div>
                <p className="font-medium">Payment received</p>
                <p className="text-sm text-gray-600">$49.99 from Jane Smith</p>
              </div>
            </div>
            <span className="text-sm text-gray-500">3 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
