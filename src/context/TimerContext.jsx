import React, { createContext, useContext, useState } from "react";

const TimerContext = createContext();

export const TimerProvider = ({ children }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => setTime(0);
  
  const formatTime = () => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <TimerContext.Provider value={{
      time,
      isRunning,
      formattedTime: formatTime(),
      startTimer,
      pauseTimer,
      resetTimer
    }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => {
  const context = useContext(TimerContext);
  if (!context) throw new Error("useTimer must be within TimerProvider");
  return context;
};
