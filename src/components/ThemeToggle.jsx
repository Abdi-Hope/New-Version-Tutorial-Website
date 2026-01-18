import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [dark, setDark] = useState(false);
  
  const toggleTheme = () => {
    setDark(!dark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <button 
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {dark ? <FaMoon className="text-white" /> : <FaSun className="text-yellow-500" />}
    </button>
  );
};

export default ThemeToggle;
