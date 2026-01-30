import React, { useState } from 'react';
import { HardDrive, Trash2, FolderOpen, AlertTriangle, CheckCircle } from 'lucide-react';

const StorageManager = () => {
  const [storage, setStorage] = useState({
    used: 2.1, // GB
    total: 5, // GB
    items: [
      { id: 1, name: 'React Course', size: 850, type: 'course', date: '2024-01-20' },
      { id: 2, name: 'JavaScript Fundamentals', size: 420, type: 'course', date: '2024-01-18' },
      { id: 3, name: 'Project Files', size: 320, type: 'resources', date: '2024-01-15' },
      { id: 4, name: 'Lecture Notes', size: 180, type: 'notes', date: '2024-01-12' },
      { id: 5, name: 'Video Tutorials', size: 330, type: 'videos', date: '2024-01-10' },
    ]
  });

  const [selectedItems, setSelectedItems] = useState([]);

  const percentage = (storage.used / storage.total) * 100;
  const remaining = storage.total - storage.used;

  const toggleItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  const deleteSelected = () => {
    const newItems = storage.items.filter(item => !selectedItems.includes(item.id));
    const deletedSize = storage.items
      .filter(item => selectedItems.includes(item.id))
      .reduce((sum, item) => sum + item.size, 0);
    
    setStorage(prev => ({
      ...prev,
      items: newItems,
      used: prev.used - (deletedSize / 1024) // Convert MB to GB
    }));
    setSelectedItems([]);
  };

  const getTypeColor = (type) => {
    const colors = {
      course: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      videos: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
      notes: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      resources: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
    };
    return colors[type] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <HardDrive className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Storage Manager
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your downloaded content
            </p>
          </div>
        </div>
        
        {selectedItems.length > 0 && (
          <button
            onClick={deleteSelected}
            className="flex items-center space-x-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete Selected ({selectedItems.length})</span>
          </button>
        )}
      </div>

      {/* Storage Overview */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
          <span>Storage Usage</span>
          <span>{storage.used.toFixed(1)} GB of {storage.total} GB used</span>
        </div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>{remaining.toFixed(1)} GB remaining</span>
          <span>{percentage.toFixed(0)}% used</span>
        </div>
      </div>

      {/* Storage Status */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-300">Status</span>
            {remaining < 1 ? (
              <AlertTriangle className="w-5 h-5 text-yellow-500" />
            ) : (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {remaining < 1 ? 'Low Storage' : 'Good'}
          </p>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <span className="text-sm text-gray-600 dark:text-gray-300">Downloads</span>
          <p className="text-lg font-bold text-gray-900 dark:text-white mt-1">
            {storage.items.length} items
          </p>
        </div>
      </div>

      {/* Downloads List */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
          Downloaded Items
        </h4>
        
        {storage.items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center justify-between p-3 rounded-lg border ${
              selectedItems.includes(item.id)
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-200 dark:border-gray-700'
            }`}
          >
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={selectedItems.includes(item.id)}
                onChange={() => toggleItem(item.id)}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <FolderOpen className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {item.name}
                </p>
                <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                  <span>{(item.size / 1024).toFixed(1)} GB</span>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 dark:bg-gray-700">
                    {item.type}
                  </span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => toggleItem(item.id)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <Trash2 className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex space-x-3 mt-6">
        <button className="flex-1 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium">
          Clear Cache
        </button>
        <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
          Free Up Space
        </button>
      </div>
    </div>
  );
};

export default StorageManager;
