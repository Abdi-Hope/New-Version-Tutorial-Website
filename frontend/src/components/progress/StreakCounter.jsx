import React, { useState, useEffect } from 'react';

const StreakCounter = ({ 
  currentStreak = 7,
  longestStreak = 14,
  showCalendar = true
}) => {
  const [days, setDays] = useState([]);

  useEffect(() => {
    // Generate last 30 days streak data
    const today = new Date();
    const daysArray = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Mock data - random active days
      const isActive = Math.random() > 0.3;
      const isToday = i === 0;
      
      daysArray.push({
        date: date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0),
        day: date.getDate(),
        isActive,
        isToday
      });
    }
    
    setDays(daysArray);
  }, []);

  const getStreakMessage = () => {
    if (currentStreak >= 30) return "🔥 Legendary Streak!";
    if (currentStreak >= 14) return "🔥 Amazing Consistency!";
    if (currentStreak >= 7) return "🔥 Great Job!";
    if (currentStreak >= 3) return "🔥 Keep Going!";
    return "Start your streak today!";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Learning Streak
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {getStreakMessage()}
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentStreak}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            days
          </div>
        </div>
      </div>

      {showCalendar && (
        <div className="mb-6">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
              <div key={index} className="text-center text-xs text-gray-600 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <div
                key={index}
                className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium
                  ${day.isToday 
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-2 border-blue-500' 
                    : day.isActive
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}
                title={`${day.date}, ${day.day}`}
              >
                {day.day}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">Current Streak</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 dark:text-white">{currentStreak} days</span>
            <div className="flex">
              {[...Array(Math.min(currentStreak, 5))].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-yellow-500 rounded-full mx-0.5"></div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">Longest Streak</span>
          <span className="font-bold text-gray-900 dark:text-white">{longestStreak} days</span>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
            Tips to maintain your streak:
          </div>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Learn at least 15 minutes daily
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Complete one lesson per day
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Set daily reminders
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StreakCounter;
