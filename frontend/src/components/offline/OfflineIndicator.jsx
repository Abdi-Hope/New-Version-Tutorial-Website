import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [show, setShow] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setTimeout(() => setShow(false), 3000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setShow(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`fixed bottom-4 right-4 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 z-50 transition-all duration-300 ${
      isOnline 
        ? 'bg-green-500 text-white' 
        : 'bg-yellow-500 text-white'
    }`}>
      {isOnline ? (
        <>
          <Wifi className="w-5 h-5" />
          <span>You are back online!</span>
        </>
      ) : (
        <>
          <WifiOff className="w-5 h-5" />
          <div>
            <p className="font-medium">You are offline</p>
            <p className="text-sm opacity-90">Some features may be limited</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="ml-4 p-1 hover:bg-white/20 rounded"
            title="Retry connection"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </>
      )}
    </div>
  );
};

export default OfflineIndicator;
