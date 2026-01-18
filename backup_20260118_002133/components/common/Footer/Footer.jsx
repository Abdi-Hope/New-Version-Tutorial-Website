import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">ae</span>
              </div>
              <span className="text-2xl font-bold">ae Learning</span>
            </div>
            <p className="text-gray-400 mb-6">
              Connecting teachers and students on a single online platform for quality education.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/courses" className="text-gray-400 hover:text-white">Browse Courses</Link></li>
              <li><Link to="/teach" className="text-gray-400 hover:text-white">Become a Teacher</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-6">Categories</h3>
            <ul className="space-y-3">
              <li><Link to="/courses/science" className="text-gray-400 hover:text-white">Science & Math</Link></li>
              <li><Link to="/courses/programming" className="text-gray-400 hover:text-white">Programming</Link></li>
              <li><Link to="/courses/business" className="text-gray-400 hover:text-white">Business</Link></li>
              <li><Link to="/courses/arts" className="text-gray-400 hover:text-white">Arts & Humanities</Link></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates.</p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {Get-Date -Format "yyyy"} ae Learning Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
