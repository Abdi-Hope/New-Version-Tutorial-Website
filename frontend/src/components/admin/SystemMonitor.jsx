import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SystemMonitor = ({ status, onAction }) => {
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 45,
    memory: 68,
    disk: 42,
    requests: 1250
  });
  const [logs, setLogs] = useState([]);
  const [apiHealth, setApiHealth] = useState([]);

  useEffect(() => {
    fetchSystemMetrics();
    fetchApiHealth();
    // Simulate logs
    setLogs([
      { id: 1, time: '10:30:45', level: 'info', message: 'Backend server started' },
      { id: 2, time: '10:31:20', level: 'info', message: 'Database connection established' },
      { id: 3, time: '10:32:15', level: 'warning', message: 'High memory usage detected' },
      { id: 4, time: '10:33:00', level: 'info', message: 'User login: admin@example.com' },
      { id: 5, time: '10:34:30', level: 'error', message: 'Payment gateway timeout' },
    ]);
  }, []);

  const fetchSystemMetrics = async () => {
    // In real app, this would call a system metrics endpoint
    setSystemMetrics({
      cpu: Math.floor(Math.random() * 100),
      memory: Math.floor(Math.random() * 100),
      disk: Math.floor(Math.random() * 100),
      requests: Math.floor(Math.random() * 2000)
    });
  };

  const fetchApiHealth = async () => {
    const endpoints = [
      { name: 'Auth API', url: '/api/auth/login' },
      { name: 'User API', url: '/api/users/profile' },
      { name: 'Courses API', url: '/api/courses' },
      { name: 'Dashboard API', url: '/api/admin/dashboard/overview' },
      { name: 'Payment API', url: '/api/payments/verify' }
    ];

    const healthChecks = endpoints.map(async (endpoint) => {
      try {
        await axios.get(`http://localhost:5000${endpoint.url}`);
        return { ...endpoint, status: 'up', responseTime: Math.floor(Math.random() * 300) };
      } catch (error) {
        return { ...endpoint, status: 'down', error: error.message };
      }
    });

    const results = await Promise.all(healthChecks);
    setApiHealth(results);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
      case 'up':
        return '#2ecc71';
      case 'offline':
      case 'down':
        return '#e74c3c';
      default:
        return '#f39c12';
    }
  };

  const systemActions = [
    { id: 'restart_backend', label: 'Restart Backend', icon: '🔄', color: '#3498db' },
    { id: 'clear_cache', label: 'Clear Cache', icon: '🧹', color: '#9b59b6' },
    { id: 'backup_database', label: 'Backup Database', icon: '💾', color: '#1abc9c' },
    { id: 'run_migrations', label: 'Run Migrations', icon: '⚙️', color: '#f39c12' },
    { id: 'send_notifications', label: 'Send Notifications', icon: '📢', color: '#e74c3c' },
    { id: 'generate_reports', label: 'Generate Reports', icon: '📊', color: '#34495e' }
  ];

  return (
    <div className="system-monitor">
      <div className="system-overview">
        <div className="system-status-card">
          <h3>System Status</h3>
          <div className="status-grid">
            <div className="status-item">
              <div className="status-label">Backend</div>
              <div className="status-value">
                <span className="status-dot" style={{ backgroundColor: getStatusColor(status.backend) }}></span>
                {status.backend}
              </div>
            </div>
            <div className="status-item">
              <div className="status-label">Database</div>
              <div className="status-value">
                <span className="status-dot" style={{ backgroundColor: getStatusColor(status.database) }}></span>
                {status.database}
              </div>
            </div>
            <div className="status-item">
              <div className="status-label">Frontend</div>
              <div className="status-value">
                <span className="status-dot" style={{ backgroundColor: getStatusColor(status.frontend) }}></span>
                {status.frontend}
              </div>
            </div>
            <div className="status-item">
              <div className="status-label">API Gateway</div>
              <div className="status-value">
                <span className="status-dot" style={{ backgroundColor: getStatusColor(status.api) }}></span>
                {status.api}
              </div>
            </div>
          </div>
        </div>

        <div className="metrics-card">
          <h3>System Metrics</h3>
          <div className="metrics-grid">
            <div className="metric">
              <div className="metric-label">CPU Usage</div>
              <div className="metric-value">{systemMetrics.cpu}%</div>
              <div className="metric-bar">
                <div 
                  className="metric-fill" 
                  style={{ 
                    width: `${systemMetrics.cpu}%`,
                    backgroundColor: systemMetrics.cpu > 80 ? '#e74c3c' : systemMetrics.cpu > 60 ? '#f39c12' : '#2ecc71'
                  }}
                ></div>
              </div>
            </div>
            <div className="metric">
              <div className="metric-label">Memory</div>
              <div className="metric-value">{systemMetrics.memory}%</div>
              <div className="metric-bar">
                <div 
                  className="metric-fill" 
                  style={{ 
                    width: `${systemMetrics.memory}%`,
                    backgroundColor: systemMetrics.memory > 80 ? '#e74c3c' : systemMetrics.memory > 60 ? '#f39c12' : '#2ecc71'
                  }}
                ></div>
              </div>
            </div>
            <div className="metric">
              <div className="metric-label">Disk</div>
              <div className="metric-value">{systemMetrics.disk}%</div>
              <div className="metric-bar">
                <div 
                  className="metric-fill" 
                  style={{ 
                    width: `${systemMetrics.disk}%`,
                    backgroundColor: systemMetrics.disk > 80 ? '#e74c3c' : systemMetrics.disk > 60 ? '#f39c12' : '#2ecc71'
                  }}
                ></div>
              </div>
            </div>
            <div className="metric">
              <div className="metric-label">Requests/min</div>
              <div className="metric-value">{systemMetrics.requests}</div>
              <div className="metric-trend">↑ 12%</div>
            </div>
          </div>
        </div>
      </div>

      <div className="system-actions">
        <h3>Quick Actions</h3>
        <div className="actions-grid">
          {systemActions.map((action) => (
            <button
              key={action.id}
              className="system-action-btn"
              style={{ backgroundColor: action.color }}
              onClick={() => onAction(action.id)}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="system-logs">
        <h3>System Logs</h3>
        <div className="logs-container">
          {logs.map((log) => (
            <div key={log.id} className={`log-entry log-${log.level}`}>
              <span className="log-time">{log.time}</span>
              <span className="log-level">{log.level.toUpperCase()}</span>
              <span className="log-message">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="api-health">
        <h3>API Health Check</h3>
        <table className="health-table">
          <thead>
            <tr>
              <th>Service</th>
              <th>Status</th>
              <th>Response Time</th>
              <th>Last Checked</th>
            </tr>
          </thead>
          <tbody>
            {apiHealth.map((api, index) => (
              <tr key={index}>
                <td>{api.name}</td>
                <td>
                  <span className={`health-status health-${api.status}`}>
                    {api.status.toUpperCase()}
                  </span>
                </td>
                <td>{api.responseTime ? `${api.responseTime}ms` : 'N/A'}</td>
                <td>{new Date().toLocaleTimeString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SystemMonitor;
