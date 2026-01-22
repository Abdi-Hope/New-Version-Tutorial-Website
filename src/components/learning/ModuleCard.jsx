import React from "react";
import { Link } from "react-router-dom";
import { Play, FileText, CheckCircle } from "lucide-react";

const ModuleCard = ({ module, courseId }) => {
  const progress = module.progress || 0;
  const isCompleted = progress === 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <div className={`p-2 rounded-lg ${isCompleted ? 'bg-green-100 dark:bg-green-900' : 'bg-blue-100 dark:bg-blue-900'}`}>
              {isCompleted ? (
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
              ) : (
                <Play className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              )}
            </div>
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Module {module.order}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {module.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {module.description}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Progress
          </span>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {progress}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className={`h-full ${isCompleted ? 'bg-green-500' : 'bg-blue-500'}`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4 text-gray-500 dark:text-gray-400">
            <span className="flex items-center space-x-1">
              <Play className="w-4 h-4" />
              <span>{module.videoCount || 0} videos</span>
            </span>
            <span className="flex items-center space-x-1">
              <FileText className="w-4 h-4" />
              <span>{module.resourceCount || 0} resources</span>
            </span>
          </div>
          <Link
            to={`/course/${courseId}/module/${module.id}`}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            {isCompleted ? 'Review' : 'Continue'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ModuleCard;