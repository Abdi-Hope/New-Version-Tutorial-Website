// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-9xl font-bold text-blue-600 dark:text-blue-400 mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
          
          <Link
            to="/courses"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium"
          >
            <Search className="w-5 h-5 mr-2" />
            Browse Courses
          </Link>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Check the URL</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Make sure you've typed the correct web address
            </p>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Visit Homepage</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Navigate to our homepage and find what you need
            </p>
          </div>
          
          <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
            <h3 className="font-bold text-lg mb-2">Contact Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Can't find what you need? Our team is here to help
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;