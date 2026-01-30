import React, { useState, useEffect, useRef } from 'react';
import {
  Play, Pause, RotateCw, Settings, Bell, BellOff,
  CheckCircle, Coffee, Brain, Target, Clock, PieChart
} from 'lucide-react';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak
  const [cycles, setCycles] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    focusTime: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLongBreak: 4,
    autoStartBreaks: false,
    autoStartPomodoros: false,
    notifications: true
  });

  const timerRef = useRef(null);
  const audioRef = useRef(null);

  const modes = {
    focus: {
      name: 'Focus Time',
      color: 'bg-red-500',
      textColor: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-50 dark:bg-red-900/20',
      icon: Brain,
      time: settings.focusTime * 60
    },
    shortBreak: {
      name: 'Short Break',
      color: 'bg-green-500',
      textColor: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      icon: Coffee,
      time: settings.shortBreak * 60
    },
    longBreak: {
      name: 'Long Break',
      color: 'bg-blue-500',
      textColor: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      icon: Coffee,
      time: settings.longBreak * 60
    }
  };

  const currentMode = modes[mode];

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
    setTimeLeft(currentMode.time);
  }, [mode, settings]);

  const handleTimerComplete = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    
    if (settings.notifications && audioRef.current) {
      audioRef.current.play();
    }

    if (mode === 'focus') {
      const newSessions = completedSessions + 1;
      setCompletedSessions(newSessions);
      
      if (newSessions % settings.sessionsBeforeLongBreak === 0) {
        setMode('longBreak');
      } else {
        setMode('shortBreak');
      }
      
      if (settings.autoStartBreaks) {
        setTimeout(() => setIsActive(true), 1000);
      }
    } else {
      setCycles(prev => prev + 1);
      setMode('focus');
      
      if (settings.autoStartPomodoros) {
        setTimeout(() => setIsActive(true), 1000);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setIsActive(false);
    setTimeLeft(currentMode.time);
  };

  const handleModeChange = (newMode) => {
    if (isActive) {
      if (window.confirm('Timer is running. Switch mode?')) {
        setIsActive(false);
        setMode(newMode);
      }
    } else {
      setMode(newMode);
    }
  };

  const handleSettingsChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const progress = ((currentMode.time - timeLeft) / currentMode.time) * 100;
  const nextLongBreak = settings.sessionsBeforeLongBreak - (completedSessions % settings.sessionsBeforeLongBreak);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Pomodoro Timer
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center space-x-1">
              <Target className="w-4 h-4" />
              <span>{completedSessions} sessions completed</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1">
              <PieChart className="w-4 h-4" />
              <span>{cycles} cycles</span>
            </span>
          </div>
        </div>
        
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timer Display */}
        <div className="lg:col-span-2">
          <div className="text-center">
            {/* Mode Selector */}
            <div className="flex justify-center space-x-4 mb-8">
              {Object.entries(modes).map(([modeKey, modeData]) => {
                const Icon = modeData.icon;
                return (
                  <button
                    key={modeKey}
                    onClick={() => handleModeChange(modeKey)}
                    className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
                      mode === modeKey
                        ? `${modeData.bgColor} ${modeData.textColor}`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{modeData.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Timer Circle */}
            <div className="relative w-64 h-64 mx-auto mb-8">
              <div className="absolute inset-0">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  {/* Background Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    className="dark:stroke-gray-700"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke={currentMode.color}
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="283"
                    strokeDashoffset={283 - (283 * progress) / 100}
                    transform="rotate(-90 50 50)"
                    className="transition-all duration-1000"
                  />
                </svg>
              </div>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className={`text-lg font-medium ${currentMode.textColor}`}>
                  {currentMode.name}
                </div>
              </div>
            </div>

            {/* Timer Controls */}
            <div className="flex items-center justify-center space-x-6 mb-8">
              <button
                onClick={() => setIsActive(!isActive)}
                className={`p-4 rounded-full ${
                  isActive
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isActive ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              
              <button
                onClick={handleReset}
                className="p-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full"
              >
                <RotateCw className="w-6 h-6" />
              </button>
            </div>

            {/* Session Info */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Next Long Break</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {nextLongBreak}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">sessions</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Today's Sessions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedSessions}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">completed</p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Cycle</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {cycles + 1}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">of ∞</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Stats & Settings */}
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
                      Focus Time (min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.focusTime}
                      onChange={(e) => handleSettingsChange('focusTime', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Short Break (min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="30"
                      value={settings.shortBreak}
                      onChange={(e) => handleSettingsChange('shortBreak', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Long Break (min)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="60"
                      value={settings.longBreak}
                      onChange={(e) => handleSettingsChange('longBreak', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Sessions Before Long Break
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={settings.sessionsBeforeLongBreak}
                      onChange={(e) => handleSettingsChange('sessionsBeforeLongBreak', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Play className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Auto-start breaks</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.autoStartBreaks}
                      onChange={(e) => handleSettingsChange('autoStartBreaks', e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Play className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Auto-start pomodoros</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.autoStartPomodoros}
                      onChange={(e) => handleSettingsChange('autoStartPomodoros', e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                  </label>
                  
                  <label className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {settings.notifications ? (
                        <Bell className="w-4 h-4 text-gray-400" />
                      ) : (
                        <BellOff className="w-4 h-4 text-gray-400" />
                      )}
                      <span className="text-gray-700 dark:text-gray-300">Notifications</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications}
                      onChange={(e) => handleSettingsChange('notifications', e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Today's Progress */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Today's Progress
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span>Focus Time</span>
                  <span>{completedSessions * settings.focusTime} min</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-500 rounded-full"
                    style={{ width: `${Math.min(100, (completedSessions / 8) * 100)}%` }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
                  <span>Break Time</span>
                  <span>{cycles * settings.shortBreak + Math.floor(completedSessions / settings.sessionsBeforeLongBreak) * settings.longBreak} min</span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${Math.min(100, (cycles / 4) * 100)}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-3">
              Pomodoro Tips
            </h3>
            
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>One task at a time during focus sessions</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Take breaks away from your workspace</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Adjust times based on your concentration span</span>
              </li>
            </ul>
          </div>

          {/* Sound Notification */}
          <audio ref={audioRef} src="https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3" />
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;
