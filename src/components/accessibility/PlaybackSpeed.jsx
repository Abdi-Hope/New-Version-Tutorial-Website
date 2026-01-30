import React, { useState } from 'react';
import { FaTachometerAlt } from 'react-icons/fa';

const PlaybackSpeed = ({ currentRate, onRateChange, buttonClassName = "", showLabel = true, className = "" }) => {
  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  
  const speedOptions = [
    { value: 0.25, label: '0.25x' },
    { value: 0.5, label: '0.5x' },
    { value: 0.75, label: '0.75x' },
    { value: 1, label: 'Normal' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x' },
    { value: 1.75, label: '1.75x' },
    { value: 2, label: '2x' }
  ];

  const handleSpeedSelect = (speed) => {
    if (onRateChange) {
      onRateChange(speed);
    }
    setShowSpeedOptions(false);
  };

  const currentLabel = speedOptions.find(opt => opt.value === currentRate)?.label || `${currentRate}x`;

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setShowSpeedOptions(!showSpeedOptions)}
        className={`flex items-center justify-center ${buttonClassName} text-gray-200 hover:text-white`}
        aria-label={`Playback speed: ${currentLabel}`}
        title="Playback speed (>. for faster, <, for slower)"
      >
        <FaTachometerAlt className="w-4 h-4 sm:w-5 sm:h-5" />
        {showLabel && (
          <span className="ml-2 text-sm hidden sm:inline">{currentLabel}</span>
        )}
      </button>

      {/* Speed Options */}
      {showSpeedOptions && (
        <div className="absolute bottom-full left-0 mb-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-3 min-w-[150px] z-50">
          <div className="text-sm text-gray-300 mb-2 font-medium">Playback Speed</div>
          <div className="space-y-1">
            {speedOptions.map((speed) => (
              <button
                key={speed.value}
                onClick={() => handleSpeedSelect(speed.value)}
                className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${
                  currentRate === speed.value 
                    ? 'bg-blue-600 text-white' 
                    : 'hover:bg-gray-700 text-gray-200'
                }`}
              >
                {speed.label}
              </button>
            ))}
          </div>
          
          <div className="mt-3 pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-400">
              Use <kbd className="px-1.5 py-0.5 bg-gray-700 rounded">.</kbd> for faster, 
              <kbd className="px-1.5 py-0.5 bg-gray-700 rounded mx-1">,</kbd> for slower
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlaybackSpeed;
