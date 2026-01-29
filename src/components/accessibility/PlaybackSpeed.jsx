import React, { useState } from 'react';
import { FastForward, Rabbit, Turtle } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const PlaybackSpeed = ({ currentSpeed = 1, onSpeedChange }) => {
  const [speed, setSpeed] = useState(currentSpeed);
  const { theme } = useTheme();
  
  const speedOptions = [
    { value: 0.5, label: '0.5x', icon: <Turtle className="w-4 h-4" />, description: 'Slow' },
    { value: 0.75, label: '0.75x', icon: null, description: 'Slightly Slow' },
    { value: 1, label: '1x', icon: null, description: 'Normal' },
    { value: 1.25, label: '1.25x', icon: null, description: 'Slightly Fast' },
    { value: 1.5, label: '1.5x', icon: <Rabbit className="w-4 h-4" />, description: 'Fast' },
    { value: 2, label: '2x', icon: <FastForward className="w-4 h-4" />, description: 'Very Fast' },
  ];

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (onSpeedChange) onSpeedChange(newSpeed);
  };

  const getSpeedIcon = (speedValue) => {
    if (speedValue === 0.5) return <Turtle className="w-5 h-5" />;
    if (speedValue === 1.5) return <Rabbit className="w-5 h-5" />;
    if (speedValue === 2) return <FastForward className="w-5 h-5" />;
    return <span className="text-lg font-mono">{speedValue}x</span>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`
            p-2 rounded-lg
            bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300
          `}>
            <FastForward className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold text-lg">Playback Speed</div>
            <div className="text-sm opacity-75">Adjust video playback rate</div>
          </div>
        </div>
        <div className={`
          px-4 py-2 rounded-lg font-bold text-lg
          bg-blue-500 dark:bg-blue-600 text-white
        `}>
          {speed}x
        </div>
      </div>

      {/* Speed Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        {speedOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSpeedChange(option.value)}
            className={`
              flex flex-col items-center justify-center p-4 rounded-xl
              transition-all duration-200 ease-in-out
              ${speed === option.value 
                ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-lg transform scale-105' 
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
              hover:shadow-md active:scale-95
              min-h-[100px]
            `}
            aria-label={`Set playback speed to ${option.label} (${option.description})`}
            aria-pressed={speed === option.value}
          >
            <div className="mb-2">
              {option.icon || <span className="text-xl font-mono">{option.label}</span>}
            </div>
            <div className="font-medium">{option.label}</div>
            <div className="text-xs mt-1 opacity-75">{option.description}</div>
          </button>
        ))}
      </div>

      {/* Speed Slider */}
      <div className="pt-4 border-t dark:border-gray-700">
        <div className="mb-2 flex justify-between">
          <span className="text-sm font-medium">Custom Speed</span>
          <span className="text-sm font-mono">{speed.toFixed(2)}x</span>
        </div>
        <input
          type="range"
          min="0.25"
          max="3"
          step="0.05"
          value={speed}
          onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
          className={`
            w-full h-2 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 dark:[&::-webkit-slider-thumb]:bg-blue-400
            [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white dark:[&::-webkit-slider-thumb]:border-gray-800
            [&::-webkit-slider-thumb]:shadow-lg
            bg-gradient-to-r from-blue-200 dark:from-blue-900/50 to-gray-200 dark:to-gray-700
          `}
          aria-label="Adjust playback speed"
        />
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
          <span>0.25x</span>
          <span>1x</span>
          <span>2x</span>
          <span>3x</span>
        </div>
      </div>
    </div>
  );
};

export default PlaybackSpeed;
