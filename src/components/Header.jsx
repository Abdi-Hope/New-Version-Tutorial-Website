import React, { useState } from "react";
import { Link } from "react-router-dom";
import TimerDisplay from "./TimerDisplay";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo/Title and Mobile Menu Button */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ae</span>
              </div>
              <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
                AE Platform
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
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
            <Link to="/courses" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200">
              Courses
            </Link>
            <Link to="/teachers" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200">
              Teachers
            </Link>
            <Link to="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200">
              Dashboard
            </Link>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200">
              About
            </Link>
          </nav>

          {/* Desktop Right side */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Timer Display */}
            <TimerDisplay />
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            {/* Auth buttons */}
            <div className="flex space-x-2">
              <Link to="/login" className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
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
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 py-2 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Courses
                </Link>
                <Link 
                  to="/teachers" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 py-2 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Teachers
                </Link>
                <Link 
                  to="/dashboard" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 py-2 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/about" 
                  className="text-gray-600 dark:text-gray-300 hover:text-blue-600 py-2 transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg px-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
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
                    className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
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