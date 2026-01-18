import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

// Temporary - use local state until context is fixed
const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <button onClick={toggleTheme} className="p-2">
      {isDarkMode ? <FaMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;
