import React, { useState, useEffect } from 'react';
import { RefreshCw, CheckCircle, AlertCircle, Cloud, CloudOff, Upload } from 'lucide-react';

const SyncManager = () => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState('2024-01-28T10:30:00');
  const [syncItems, setSyncItems] = useState([
    { id: 1, name: 'Course Progress', status: 'synced', type: 'progress' },
    { id: 2, name: 'Notes & Highlights', status: 'synced', type: 'notes' },
    { id: 3, name: 'Quiz Attempts', status: 'pending', type: 'quizzes' },
    { id: 4, name: 'Bookmarks', status: 'synced', type: 'bookmarks' },
    { id: 5, name: 'Assignment Submissions', status: 'failed', type: 'assignments' },
  ]);

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleSync = () => {
    if (!isOnline || isSyncing) return;

    setIsSyncing(true);
    
    // Simulate sync process
    setTimeout(() => {
      const updatedItems = syncItems.map(item => ({
        ...item,
        status: Math.random() > 0.2 ? 'synced' : 'failed'
      }));
      
      setSyncItems(updatedItems);
      setLastSync(new Date().toISOString());
      setIsSyncing(false);
    }, 2000);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <RefreshCw className="w-5 h-5 text-yellow-500 animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'synced':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const formatLastSync = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  const pendingItems = syncItems.filter(item => item.status !== 'synced').length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Cloud className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Sync Manager
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Keep your data synchronized
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isOnline ? (
            <Cloud className="w-5 h-5 text-green-500" />
          ) : (
            <CloudOff className="w-5 h-5 text-red-500" />
          )}
          <span className="text-sm font-medium">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>

      {/* Sync Status */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">Last Sync</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {formatLastSync(lastSync)}
            </p>
          </div>
          
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-300">Pending</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {pendingItems} items
            </p>
          </div>
        </div>

        {/* Sync Button */}
        <button
          onClick={handleSync}
          disabled={!isOnline || isSyncing}
          className={`w-full py-3 rounded-lg font-medium flex items-center justify-center space-x-2 transition-all ${
            !isOnline
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : isSyncing
              ? 'bg-blue-500 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isSyncing ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Syncing...</span>
            </>
          ) : !isOnline ? (
            <>
              <CloudOff className="w-5 h-5" />
              <span>Offline - Cannot Sync</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              <span>Sync Now</span>
            </>
          )}
        </button>
      </div>

      {/* Sync Items */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Sync Status
        </h4>
        
        {syncItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              {getStatusIcon(item.status)}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </p>
              </div>
            </div>
            
            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </span>
          </div>
        ))}
      </div>

      {/* Auto Sync Settings */}
      <div className="mt-6 pt-6 border-t dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 dark:text-white">Auto Sync</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sync automatically when online
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Sync Info */}
      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <div className="flex items-start space-x-2">
          <Upload className="w-4 h-4 text-blue-500 dark:text-blue-400 mt-0.5" />
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Your progress, notes, and bookmarks are automatically backed up to the cloud when online.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SyncManager;
