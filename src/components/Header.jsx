import React, { useState } from "react";
import { Link } from "react-router-dom";
import TimerDisplay from "./TimerDisplay";
import ThemeToggle from "./ThemeToggle";
import AIAssistant from "./AIAssistant"; // Keep this import

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo/Title and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-200">
                <span className="text-white font-bold text-xl">ae</span>
              </div>
              <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                AE Platform
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="group">
              <Link to="/courses" className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-3 py-2 rounded-lg">
                Courses
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            </div>
            <div className="group">
              <Link to="/teachers" className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-3 py-2 rounded-lg">
                Teachers
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            </div>
            <div className="group">
              <Link to="/dashboard" className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-3 py-2 rounded-lg">
                Dashboard
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            </div>
            <div className="group">
              <Link to="/about" className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 px-3 py-2 rounded-lg">
                About
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            </div>
          </nav>

          {/* Desktop Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* AI Assistant Button */}
            <AIAssistant />
            
            {/* Timer Display */}
            <TimerDisplay />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Auth buttons */}
            <div className="flex space-x-2">
              <Link to="/login" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg border border-gray-300 dark:border-gray-700 hover:border-blue-400">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg">
                Sign Up
              </Link>
            </div>
          </div>

        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t dark:border-gray-700 pt-4 animate-fadeIn">
            <div className="flex flex-col space-y-4">
              {/* Mobile Navigation Links */}
              <div className="flex flex-col space-y-3">
                <Link 
                  to="/courses" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Courses
                </Link>
                <Link 
                  to="/teachers" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Teachers
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-3 px-4 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </div>

              {/* Mobile AI Assistant (Simplified) */}
              <div className="py-3 border-t dark:border-gray-700">
                <div className="px-4">
                  <button
                    onClick={() => {
                      alert("AI Assistant feature coming soon for mobile!");
                      setIsMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <span className="font-medium">AI Assistant</span>
                  </button>
                </div>
              </div>

              {/* Mobile Timer Display */}
              <div className="py-3 border-t dark:border-gray-700">
                <TimerDisplay />
              </div>

              {/* Mobile Theme Toggle and Auth */}
              <div className="flex items-center justify-between pt-3 border-t dark:border-gray-700">
                <ThemeToggle />
                <div className="flex space-x-2">
                  <Link 
                    to="/login" 
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 rounded-lg border border-gray-300 dark:border-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;