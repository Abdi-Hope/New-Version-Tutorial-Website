import React, { useState, useEffect } from 'react';
import { Contrast, Eye } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const HighContrastToggle = () => {
  const [highContrast, setHighContrast] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    // Check localStorage for saved preference
    const saved = localStorage.getItem('highContrast');
    if (saved) {
      const isHighContrast = JSON.parse(saved);
      setHighContrast(isHighContrast);
      applyHighContrast(isHighContrast);
    }
  }, []);

  const applyHighContrast = (enabled) => {
    if (enabled) {
      document.documentElement.classList.add('high-contrast');
      document.documentElement.style.setProperty('--text-color', '#FFFFFF');
      document.documentElement.style.setProperty('--bg-color', '#000000');
      document.documentElement.style.setProperty('--primary-color', '#FFFF00');
      document.documentElement.style.setProperty('--secondary-color', '#00FFFF');
    } else {
      document.documentElement.classList.remove('high-contrast');
      document.documentElement.style.removeProperty('--text-color');
      document.documentElement.style.removeProperty('--bg-color');
      document.documentElement.style.removeProperty('--primary-color');
      document.documentElement.style.removeProperty('--secondary-color');
    }
  };

  const toggleHighContrast = () => {
    const newState = !highContrast;
    setHighContrast(newState);
    localStorage.setItem('highContrast', JSON.stringify(newState));
    applyHighContrast(newState);
  };

  return (
    <div className="space-y-4">
      <button
        onClick={toggleHighContrast}
        className={`
          flex items-center justify-between w-full p-4 rounded-xl
          transition-all duration-300 ease-in-out
          ${highContrast 
            ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200 border-2 border-yellow-400 dark:border-yellow-600 shadow-lg' 
            : 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }
          hover:shadow-md active:scale-[0.98]
        `}
        aria-label={highContrast ? "Disable high contrast mode" : "Enable high contrast mode"}
        aria-pressed={highContrast}
      >
        <div className="flex items-center gap-3">
          <div className={`
            p-2 rounded-lg
            ${highContrast 
              ? 'bg-yellow-500 dark:bg-yellow-600 text-white' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
            }
          `}>
            {highContrast ? <Contrast className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
          </div>
          <div className="text-left">
            <div className="font-semibold text-lg">
              {highContrast ? 'High Contrast: ON' : 'High Contrast: OFF'}
            </div>
            <div className="text-sm opacity-75">
              {highContrast ? 'Enhanced visibility mode active' : 'Improves visibility for low vision'}
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className={`
            w-14 h-7 flex items-center rounded-full p-1 transition-colors duration-300
            ${highContrast 
              ? 'bg-yellow-500 dark:bg-yellow-600' 
              : 'bg-gray-300 dark:bg-gray-600'
            }
          `}>
            <div className={`
              bg-white w-5 h-5 rounded-full shadow-lg transform transition-transform duration-300
              ${highContrast ? 'translate-x-7' : 'translate-x-0'}
            `} />
          </div>
        </div>
      </button>
      
      {highContrast && (
        <div className={`
          p-3 rounded-lg text-sm
          bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800
          text-yellow-800 dark:text-yellow-300
        `}>
          <div className="font-medium mb-1">High Contrast Mode Active</div>
          <div>Colors are optimized for maximum visibility and readability.</div>
        </div>
      )}
    </div>
  );
};

export default HighContrastToggle;
