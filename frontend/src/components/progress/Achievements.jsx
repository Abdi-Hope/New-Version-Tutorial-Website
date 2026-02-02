import React from 'react';

const Achievements = ({ 
  achievements = null,
  showAll = false
}) => {
  const defaultAchievements = [
    {
      id: 1,
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🚀',
      earned: true,
      date: '2024-01-15',
      points: 100
    },
    {
      id: 2,
      title: 'Quick Learner',
      description: 'Complete 5 lessons in one week',
      icon: '⚡',
      earned: true,
      date: '2024-01-18',
      points: 250
    },
    {
      id: 3,
      title: 'Week Warrior',
      description: 'Maintain a 7-day learning streak',
      icon: '🔥',
      earned: true,
      date: '2024-01-22',
      points: 500
    },
    {
      id: 4,
      title: 'Project Master',
      description: 'Complete your first project',
      icon: '🏆',
      earned: false,
      date: null,
      points: 750
    },
    {
      id: 5,
      title: 'Perfect Score',
      description: 'Score 100% on a quiz',
      icon: '💯',
      earned: false,
      date: null,
      points: 300
    },
    {
      id: 6,
      title: 'Course Conqueror',
      description: 'Complete an entire course',
      icon: '🎓',
      earned: false,
      date: null,
      points: 1000
    },
    {
      id: 7,
      title: 'Helper',
      description: 'Help 5 other students',
      icon: '🤝',
      earned: true,
      date: '2024-01-20',
      points: 400
    },
    {
      id: 8,
      title: 'Night Owl',
      description: 'Learn between 10 PM - 4 AM',
      icon: '🦉',
      earned: false,
      date: null,
      points: 200
    }
  ];

  const achievementsToShow = achievements || defaultAchievements;
  const earnedAchievements = achievementsToShow.filter(a => a.earned);
  const lockedAchievements = achievementsToShow.filter(a => !a.earned);
  
  const displayAchievements = showAll 
    ? achievementsToShow 
    : [...earnedAchievements, ...lockedAchievements.slice(0, 4 - earnedAchievements.length)];

  const totalPoints = earnedAchievements.reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Achievements
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {earnedAchievements.length}/{achievementsToShow.length} unlocked
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
            {totalPoints}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            total points
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {displayAchievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`p-4 rounded-xl text-center transition-all ${
              achievement.earned
                ? 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800'
                : 'bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 opacity-60'
            }`}
          >
            <div className="text-3xl mb-2">{achievement.icon}</div>
            <h4 className={`font-medium text-sm mb-1 ${
              achievement.earned 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {achievement.title}
            </h4>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
              {achievement.description}
            </p>
            <div className={`text-xs font-medium ${
              achievement.earned
                ? 'text-green-600 dark:text-green-400'
                : 'text-gray-500 dark:text-gray-500'
            }`}>
              {achievement.earned ? `+${achievement.points} pts` : `${achievement.points} pts`}
            </div>
            {achievement.earned && achievement.date && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(achievement.date).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Next milestone
            </div>
            <div className="font-medium text-gray-900 dark:text-white">
              {lockedAchievements[0]?.title || 'All achievements unlocked!'}
            </div>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
