import React, { useState } from 'react';
import { Captions, CaptionsOff } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const CaptionToggle = ({ onToggle, initialEnabled = false }) => {
  const [enabled, setEnabled] = useState(initialEnabled);
  const { theme } = useTheme();

  const handleToggle = () => {
    const newState = !enabled;
    setEnabled(newState);
    if (onToggle) onToggle(newState);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        flex items-center justify-center gap-2 px-4 py-3 rounded-lg
        transition-all duration-200 ease-in-out
        ${enabled 
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-2 border-blue-300 dark:border-blue-700' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
        }
        hover:shadow-md active:scale-95
        w-full sm:w-auto
      `}
      aria-label={enabled ? "Disable captions" : "Enable captions"}
      aria-pressed={enabled}
    >
      {enabled ? (
        <>
          <Captions className="w-5 h-5" />
          <span className="font-medium">Captions: ON</span>
        </>
      ) : (
        <>
          <CaptionsOff className="w-5 h-5" />
          <span className="font-medium">Captions: OFF</span>
        </>
      )}
      
      {/* Toggle indicator */}
      <div className="relative ml-2">
        <div className={`
          w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200
          ${enabled ? 'bg-blue-500 dark:bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
        `}>
          <div className={`
            bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200
            ${enabled ? 'translate-x-6' : 'translate-x-0'}
          `} />
        </div>
      </div>
    </button>
  );
};

export default CaptionToggle;
