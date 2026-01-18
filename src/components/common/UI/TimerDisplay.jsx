import React from "react";

// Temporary local version without context
const TimerDisplay = () => {
  const [time, setTime] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="p-4">
      <div className="text-2xl font-mono">{formatTime(time)}</div>
      <div className="flex space-x-2 mt-2">
        <button onClick={() => setIsRunning(!isRunning)} className="px-4 py-2 bg-blue-500 text-white rounded">
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={() => setTime(0)} className="px-4 py-2 bg-red-500 text-white rounded">
          Reset
        </button>
      </div>
    </div>
  );
};

export default TimerDisplay;
