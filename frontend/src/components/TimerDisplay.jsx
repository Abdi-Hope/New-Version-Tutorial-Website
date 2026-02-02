import React, { useState, useEffect } from "react";

const TimerDisplay = () => {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  // Auto-start and handle tab visibility
  useEffect(() => {
    let interval;
    
    if (running) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    
    // Pause when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(interval);
      } else if (running) {
        interval = setInterval(() => {
          setSeconds(s => s + 1);
        }, 1000);
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [running]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-mono">{formatTime(seconds)}</span>
      <button 
        onClick={() => setRunning(!running)}
        className="px-2 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
      >
        {running ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default TimerDisplay;
