import React from "react";
import { Link } from "react-router-dom";
import TimerDisplay from "./TimerDisplay"; // Add this import
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo/Title */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ae</span>
            </div>
            <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
              AE Platform
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
              Courses
            </Link>
            <Link to="/teachers" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
              Teachers
            </Link>
            <Link to="/pricing" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
              Pricing
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600">
              About
            </Link>
          </nav>

          {/* Right side: Timer + Theme Toggle */}
          <div className="flex items-center space-x-4">
            {/* Timer Display */}
            <TimerDisplay />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Auth buttons */}
            <div className="flex space-x-2">
              <Link to="/login" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Sign Up
              </Link>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;



