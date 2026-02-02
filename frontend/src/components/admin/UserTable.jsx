import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users');
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    switch (action) {
      case 'delete':
        if (window.confirm('Are you sure you want to delete this user?')) {
          alert(`User ${userId} would be deleted`);
          // await axios.delete(`/api/admin/users/${userId}`);
          fetchUsers();
        }
        break;
      case 'suspend':
        alert(`User ${userId} would be suspended`);
        // await axios.put(`/api/admin/users/${userId}/suspend`);
        break;
      case 'promote':
        alert(`User ${userId} would be promoted to admin`);
        // await axios.put(`/api/admin/users/${userId}/promote`);
        break;
      default:
        break;
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(search.toLowerCase()) || 
                         user.email?.toLowerCase().includes(search.toLowerCase());
    const matchesRole = !roleFilter || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="user-management">
      <div className="user-filters">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select 
          value={roleFilter} 
          onChange={(e) => setRoleFilter(e.target.value)}
          className="filter-select"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="instructor">Instructor</option>
          <option value="student">Student</option>
        </select>
        <button className="btn-primary" onClick={fetchUsers}>
          Refresh
        </button>
      </div>

      <div className="table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={user._id || index}>
                <td>{index + 1}</td>
                <td>
                  <div className="user-info">
                    <span className="user-name">{user.name || 'Unknown'}</span>
                  </div>
                </td>
                <td>{user.email || 'No email'}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {user.role || 'student'}
                  </span>
                </td>
                <td>
                  <span className={`status-badge status-${user.status || 'active'}`}>
                    {user.status || 'active'}
                  </span>
                </td>
                <td>
                  {user.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Unknown'}
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn-action btn-view"
                      onClick={() => alert(`View user: ${user.email}`)}
                    >
                      👁️
                    </button>
                    <button 
                      className="btn-action btn-edit"
                      onClick={() => alert(`Edit user: ${user.email}`)}
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-action btn-delete"
                      onClick={() => handleUserAction(user._id || index, 'delete')}
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-info">
        <span>Showing {filteredUsers.length} of {users.length} users</span>
        <button className="btn-secondary" onClick={() => alert('Export users to CSV')}>
          📥 Export CSV
        </button>
      </div>
    </div>
  );
};

export default UserTable;
