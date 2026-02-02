import React from 'react';

const CourseProgress = ({ 
  progress = 0.65,
  totalLessons = 24,
  completedLessons = 15,
  courseTitle = "React Mastery",
  estimatedTime = "18 hours"
}) => {
  const percentage = Math.round(progress * 100);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Course Progress
      </h3>
      
      {/* Progress Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Background Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
              className="dark:stroke-gray-700"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.83} 283`}
              transform="rotate(-90 50 50)"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white">
                {percentage}%
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Complete
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">Lessons</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {completedLessons}/{totalLessons}
          </span>
        </div>
        
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700 dark:text-gray-300">Estimated Time</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {estimatedTime}
          </span>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Next Lesson
            </span>
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Lesson {completedLessons + 1}
            </span>
          </div>
          <div className="text-sm text-gray-900 dark:text-white">
            Introduction to React Hooks
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
            Continue Learning
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
