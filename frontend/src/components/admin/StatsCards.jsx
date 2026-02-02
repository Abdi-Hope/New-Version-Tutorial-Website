import React from 'react';

const StatsCards = ({ data }) => {
  const stats = data || {
    totalUsers: 0,
    activeUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
    newUsersLast7Days: 0
  };

  const cardData = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      change: '+12%',
      icon: '👥',
      color: '#3498db'
    },
    {
      title: 'Active Users',
      value: stats.activeUsers,
      change: '+8%',
      icon: '✅',
      color: '#2ecc71'
    },
    {
      title: 'Total Courses',
      value: stats.totalCourses,
      change: '+3',
      icon: '📚',
      color: '#9b59b6'
    },
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue?.toLocaleString()}`,
      change: '+15%',
      icon: '💰',
      color: '#f39c12'
    },
    {
      title: 'Monthly Revenue',
      value: `$${stats.monthlyRevenue?.toLocaleString()}`,
      change: '+18%',
      icon: '📈',
      color: '#e74c3c'
    },
    {
      title: 'New Users (7d)',
      value: stats.newUsersLast7Days,
      change: '+5%',
      icon: '🆕',
      color: '#1abc9c'
    }
  ];

  return (
    <div className="stats-cards">
      {cardData.map((card, index) => (
        <div key={index} className="stat-card" style={{ borderLeftColor: card.color }}>
          <div className="stat-header">
            <span className="stat-icon">{card.icon}</span>
            <h3>{card.title}</h3>
          </div>
          <div className="stat-content">
            <div className="stat-value">{card.value}</div>
            <div className="stat-change" style={{ color: card.change.startsWith('+') ? '#2ecc71' : '#e74c3c' }}>
              {card.change}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
