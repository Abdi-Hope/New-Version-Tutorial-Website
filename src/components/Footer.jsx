import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">ae</span>
              </div>
              <h2 className="text-2xl font-bold text-white">AE Platform</h2>
            </div>
            <p className="text-gray-400">
              Transforming education through innovative technology.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-white font-semibold mb-3">Platform</h3>
              <ul className="space-y-2">
                <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
                <li><Link to="/teachers" className="hover:text-white">Teachers</Link></li>
                <li><Link to="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link to="/about" className="hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-3">Support</h3>
              <ul className="space-y-2">
                <li><Link to="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-3">Newsletter</h3>
            <p className="text-gray-400 mb-3">Get updates on new courses and features.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Email"
                className="flex-grow px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {currentYear} AE Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;