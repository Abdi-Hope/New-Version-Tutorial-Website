import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, RotateCw, Target, Clock, BarChart3,
  Flag, Award, TrendingUp, Zap, Coffee, Moon,
  Sun, Bell, BellOff, Settings, CheckCircle
} from 'lucide-react';

const StudyTimer = () => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('study'); // study, break
  const [sessions, setSessions] = useState([]);
  const [studyTime, setStudyTime] = useState(25); // minutes
  const [breakTime, setBreakTime] = useState(5); // minutes
  const [showSettings, setShowSettings] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [autoStartBreak, setAutoStartBreak] = useState(false);
  const [sessionGoal, setSessionGoal] = useState(4);
  const [currentSession, setCurrentSession] = useState(1);

  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const stats = {
    totalStudyTime: sessions.reduce((sum, session) => 
      session.mode === 'study' ? sum + session.duration : sum, 0
    ),
    completedSessions: sessions.filter(s => s.mode === 'study').length,
    totalBreaks: sessions.filter(s => s.mode === 'break').length,
    todayStudyTime: sessions
      .filter(s => s.mode === 'study' && 
        new Date(s.endTime).toDateString() === new Date().toDateString())
      .reduce((sum, session) => sum + session.duration, 0)
  };

  useEffect(() => {
    if (isActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isActive]);

  useEffect(() => {
    if (mode === 'study') {
      setTimeLeft(studyTime * 60);
    } else {
      setTimeLeft(breakTime * 60);
    }
  }, [mode, studyTime, breakTime]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    if (mode === 'study') {
      setTimeLeft(studyTime * 60);
    } else {
      setTimeLeft(breakTime * 60);
    }
  };

  const handleTimerComplete = () => {
    clearInterval(timerRef.current);
    setIsActive(false);

    // Save session
    const session = {
      id: Date.now(),
      mode,
      duration: mode === 'study' ? studyTime : breakTime,
      startTime: new Date(Date.now() - (mode === 'study' ? studyTime * 60000 : breakTime * 60000)),
      endTime: new Date()
    };
    
    setSessions(prev => [session, ...prev]);

    // Play notification
    if (notifications && audioRef.current) {
      audioRef.current.play();
    }

    // Switch mode
    if (mode === 'study') {
      setCurrentSession(prev => prev + 1);
      if (autoStartBreak) {
        setTimeout(() => {
          setMode('break');
          if (currentSession < sessionGoal) {
            setIsActive(true);
          }
        }, 1000);
      } else {
        setMode('break');
      }
    } else {
      if (currentSession < sessionGoal) {
        setMode('study');
        if (autoStartBreak) {
          setTimeout(() => setIsActive(true), 1000);
        }
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSkipBreak = () => {
    if (mode === 'break') {
      handleReset();
      setMode('study');
    }
  };

  const getProgress = () => {
    const totalTime = mode === 'study' ? studyTime * 60 : breakTime * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getModeColor = () => {
    return mode === 'study' 
      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
      : 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
  };

  const getModeIcon = () => {
    return mode === 'study' 
      ? <Brain className="w-6 h-6" /> 
      : <Coffee className="w-6 h-6" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Study Timer
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{formatTime(stats.todayStudyTime * 60)} today</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <Target className="w-4 h-4" />
              <span>{currentSession}/{sessionGoal} sessions</span>
            </span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timer Display */}
        <div className="lg:col-span-2">
          <div className="text-center">
            {/* Mode Indicator */}
            <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full mb-8 ${getModeColor()}`}>
              {getModeIcon()}
              <span className="text-lg font-bold">
                {mode === 'study' ? 'Study Time' : 'Break Time'}
              </span>
              <span className="text-sm">
                Session {currentSession} of {sessionGoal}
              </span>
            </div>

            {/* Timer Circle */}
            <div className="relative w-72 h-72 mx-auto mb-8">
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    className="dark:stroke-gray-700"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={mode === 'study' ? "#3b82f6" : "#10b981"}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * getProgress()) / 100}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {mode === 'study' ? 'Focus on your studies' : 'Take a well-deserved break'}
                </div>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <button
                onClick={isActive ? handlePause : handleStart}
                className={`p-5 rounded-full ${
                  isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isActive ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8" />
                )}
              </button>
              
              <button
                onClick={handleReset}
                className="p-5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full"
              >
                <RotateCw className="w-8 h-8" />
              </button>
              
              {mode === 'break' && (
                <button
                  onClick={handleSkipBreak}
                  className="p-5 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
                >
                  <Zap className="w-8 h-8" />
                </button>
              )}
            </div>

            {/* Session Progress */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Session Progress</span>
                <span>{currentSession}/{sessionGoal} completed</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  style={{ width: `${(currentSession / sessionGoal) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Settings Panel */}
          {showSettings && (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                Timer Settings
              </h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Study Time (min)
                    </label>
                    <input
                      type="number"
                      min="5"
                      max="60"
                      value={studyTime}
                      onChange={(e) => setStudyTime(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Break Time (min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={breakTime}
                      onChange={(e) => setBreakTime(parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Daily Session Goal
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={sessionGoal}
                    onChange={(e) => setSessionGoal(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {notifications ? (
                        <Bell className="w-4 h-4 text-gray-400" />
                      ) : (
                        <BellOff className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300">Notifications</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(e) => setNotifications(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Zap className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Auto-start breaks</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={autoStartBreak}
                      onChange={(e) => setAutoStartBreak(e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Today's Stats
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Study Time</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatTime(stats.todayStudyTime * 60)}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Sessions</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {stats.completedSessions}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Breaks</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {stats.totalBreaks}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Total Time</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatTime((stats.todayStudyTime + stats.totalBreaks * breakTime) * 60)}
                </span>
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Recent Sessions
              </h3>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                View All
              </button>
            </div>
            
            <div className="space-y-3">
              {sessions.slice(0, 3).map(session => (
                <div key={session.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      session.mode === 'study'
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                    }`}>
                      {session.mode === 'study' ? <Brain className="w-4 h-4" /> : <Coffee className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm">
                        {session.mode === 'study' ? 'Study Session' : 'Break'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {session.duration} min • {new Date(session.endTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              ))}
              
              {sessions.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-2">
                  No sessions yet
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setMode('study')}
              className={`p-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                mode === 'study'
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
              }`}
            >
              <Brain className="w-5 h-5" />
              <span>Study Mode</span>
            </button>
            
            <button
              onClick={() => setMode('break')}
              className={`p-3 rounded-lg font-medium flex items-center justify-center space-x-2 ${
                mode === 'break'
                  ? 'bg-green-600 text-white'
                  : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50'
              }`}
            >
              <Coffee className="w-5 h-5" />
              <span>Break Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sound Notification */}
      <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3" />
    </div>
  );
};

export default StudyTimer;
