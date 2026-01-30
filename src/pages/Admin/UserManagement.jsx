import React, { useState } from 'react';
import {
  Search, Filter, UserPlus, Mail, Phone, Calendar,
  Shield, CheckCircle, XCircle, MoreVertical, Edit,
  Trash2, Eye, Lock, AlertCircle, ChevronRight,
  Download, RefreshCw, UserCheck, UserX
} from 'lucide-react';

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Alex Johnson',
      email: 'alex@example.com',
      role: 'student',
      status: 'active',
      joined: '2024-01-15',
      lastActive: '2 hours ago',
      courses: 5,
      country: 'USA',
      verified: true
    },
    {
      id: 2,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'instructor',
      status: 'active',
      joined: '2024-01-10',
      lastActive: '1 day ago',
      courses: 12,
      country: 'Canada',
      verified: true
    },
    {
      id: 3,
      name: 'Mike Chen',
      email: 'mike@example.com',
      role: 'student',
      status: 'inactive',
      joined: '2024-01-05',
      lastActive: '1 week ago',
      courses: 2,
      country: 'UK',
      verified: false
    },
    {
      id: 4,
      name: 'Lisa Rodriguez',
      email: 'lisa@example.com',
      role: 'admin',
      status: 'active',
      joined: '2024-01-01',
      lastActive: 'Just now',
      courses: 0,
      country: 'Spain',
      verified: true
    },
    {
      id: 5,
      name: 'David Kim',
      email: 'david@example.com',
      role: 'student',
      status: 'suspended',
      joined: '2023-12-28',
      lastActive: '2 weeks ago',
      courses: 3,
      country: 'South Korea',
      verified: true
    },
    {
      id: 6,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      role: 'instructor',
      status: 'active',
      joined: '2023-12-20',
      lastActive: '3 hours ago',
      courses: 8,
      country: 'Australia',
      verified: true
    },
    {
      id: 7,
      name: 'Robert Brown',
      email: 'robert@example.com',
      role: 'student',
      status: 'active',
      joined: '2023-12-15',
      lastActive: '1 hour ago',
      courses: 7,
      country: 'Germany',
      verified: false
    },
    {
      id: 8,
      name: 'Maria Garcia',
      email: 'maria@example.com',
      role: 'student',
      status: 'inactive',
      joined: '2023-12-10',
      lastActive: '3 weeks ago',
      courses: 1,
      country: 'Mexico',
      verified: true
    }
  ]);

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: users.length,
    students: users.filter(u => u.role === 'student').length,
    instructors: users.filter(u => u.role === 'instructor').length,
    admins: users.filter(u => u.role === 'admin').length,
    active: users.filter(u => u.status === 'active').length,
    inactive: users.filter(u => u.status === 'inactive').length,
    suspended: users.filter(u => u.status === 'suspended').length
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const updateUserStatus = (userId, newStatus) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const updateUserRole = (userId, newRole) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const deleteUsers = (userIds) => {
    if (window.confirm(`Are you sure you want to delete ${userIds.length} user(s)?`)) {
      setUsers(prev => prev.filter(user => !userIds.includes(user.id)));
      setSelectedUsers([]);
      if (selectedUser && userIds.includes(selectedUser.id)) {
        setSelectedUser(null);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'inactive': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'suspended': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      case 'instructor': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'student': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              User Management
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage users, roles, and permissions
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium">
              <Download className="w-4 h-4 inline mr-2" />
              Export
            </button>
            
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2">
              <UserPlus className="w-4 h-4" />
              <span>Add User</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, color: 'bg-gray-500' },
            { label: 'Students', value: stats.students, color: 'bg-blue-500' },
            { label: 'Instructors', value: stats.instructors, color: 'bg-green-500' },
            { label: 'Admins', value: stats.admins, color: 'bg-purple-500' },
            { label: 'Active', value: stats.active, color: 'bg-green-500' },
            { label: 'Inactive', value: stats.inactive, color: 'bg-yellow-500' },
            { label: 'Suspended', value: stats.suspended, color: 'bg-red-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            {/* Header */}
            <div className="p-6 border-b dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search users by name or email..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              
              {selectedUsers.length > 0 && (
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-blue-700 dark:text-blue-400 font-medium">
                    {selectedUsers.length} user(s) selected
                  </span>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateUserStatus(selectedUsers[0], 'active')}
                      className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-lg text-sm font-medium hover:bg-green-200 dark:hover:bg-green-900/50"
                    >
                      Activate
                    </button>
                    <button
                      onClick={() => updateUserStatus(selectedUsers[0], 'suspended')}
                      className="px-3 py-1.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-200 dark:hover:bg-red-900/50"
                    >
                      Suspend
                    </button>
                    <button
                      onClick={() => deleteUsers(selectedUsers)}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left p-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-blue-600 rounded"
                      />
                    </th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500 dark:text-gray-400">User</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Role</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Joined</th>
                    <th className="text-left p-4 text-sm font-medium text-gray-500 dark:text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className={`border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 ${
                        selectedUser?.id === user.id ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                      }`}
                      onClick={() => setSelectedUser(user)}
                    >
                      <td className="p-4" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedUsers.includes(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">
                              {user.name}
                              {user.verified && (
                                <CheckCircle className="w-4 h-4 text-green-500 inline ml-2" />
                              )}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-500 dark:text-gray-400">
                        {user.joined}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Edit user
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                          >
                            <Edit className="w-4 h-4 text-gray-400" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteUsers([user.id]);
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* User Details Panel */}
        <div className="lg:col-span-1">
          {selectedUser ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  User Details
                </h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedUser(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <XCircle className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* User Info */}
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {selectedUser.name}
                  </h4>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {selectedUser.email}
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getRoleColor(selectedUser.role)}`}>
                      {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                    </span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedUser.status)}`}>
                      {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Joined</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedUser.joined}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Last Active</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedUser.lastActive}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Courses</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedUser.courses}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Country</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {selectedUser.country}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Email Verified</span>
                    {selectedUser.verified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Quick Actions
                  </h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => updateUserStatus(selectedUser.id, 'active')}
                      className="p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 flex items-center justify-center space-x-2"
                    >
                      <UserCheck className="w-4 h-4" />
                      <span>Activate</span>
                    </button>
                    
                    <button
                      onClick={() => updateUserStatus(selectedUser.id, 'suspended')}
                      className="p-3 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 flex items-center justify-center space-x-2"
                    >
                      <UserX className="w-4 h-4" />
                      <span>Suspend</span>
                    </button>
                    
                    <button
                      onClick={() => updateUserRole(selectedUser.id, selectedUser.role === 'student' ? 'instructor' : 'student')}
                      className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 flex items-center justify-center space-x-2"
                    >
                      <Shield className="w-4 h-4" />
                      <span>Change Role</span>
                    </button>
                    
                    <button className="p-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span>Message</span>
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="pt-6 border-t dark:border-gray-700">
                  <h4 className="font-semibold text-red-700 dark:text-red-400 mb-3">
                    Danger Zone
                  </h4>
                  <button
                    onClick={() => deleteUsers([selectedUser.id])}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete User</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-12 text-center">
              <UserPlus className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a User
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Click on a user from the list to view details and manage their account
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
