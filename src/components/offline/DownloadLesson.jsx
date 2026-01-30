import React, { useState } from 'react';
import { Download, Check, CloudOff, HardDrive, WifiOff } from 'lucide-react';

const DownloadLesson = ({ lessonId, title, size = "1.2 GB", duration = "45:30" }) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDownload = () => {
    if (isDownloaded) {
      setIsDownloaded(false);
      return;
    }

    setIsDownloading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDownloading(false);
          setIsDownloaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Download for Offline Viewing
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Watch without internet connection
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <CloudOff className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-500 dark:text-gray-400">Offline</span>
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">{title}</h4>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <HardDrive className="w-4 h-4" />
              <span>{size}</span>
            </span>
            <span>•</span>
            <span>{duration}</span>
          </div>
          <span className="text-green-600 dark:text-green-400 font-medium">
            {isDownloaded ? 'Downloaded' : 'Available'}
          </span>
        </div>
      </div>

      {isDownloading && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
            <span>Downloading...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`w-full py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all ${
          isDownloaded
            ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
            : isDownloading
            ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        {isDownloaded ? (
          <>
            <Check className="w-5 h-5" />
            <span>Remove Download</span>
          </>
        ) : isDownloading ? (
          <>
            <div className="w-5 h-5 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <Download className="w-5 h-5" />
            <span>Download Lesson</span>
          </>
        )}
      </button>

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          <span className="font-medium">2.1 GB</span> of 5 GB storage used
        </p>
        <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: '42%' }} />
        </div>
      </div>
    </div>
  );
};

export default DownloadLesson;
