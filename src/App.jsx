import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { TimerProvider } from './context/TimerContext'

// Pages
import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

function App() {
  return (
    <ThemeProvider>
      <TimerProvider>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">404</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">Page not found</p>
                    <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Go Home
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </AuthProvider>
        </Router>
      </TimerProvider>
    </ThemeProvider>
  )
}

export default App
