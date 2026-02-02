import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { authAPI } from '../services/api'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      
      if (!token) {
        setIsAuthenticated(false)
        setIsLoading(false)
        return
      }

      try {
        // Verify token with backend
        const response = await authAPI.getMe()
        setUser(response.user)
        
        // Check if stored user matches backend user
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser)
          if (parsedUser.id !== response.user.id) {
            // Token doesn't match stored user, clear and redirect
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            setIsAuthenticated(false)
          } else {
            setIsAuthenticated(true)
          }
        } else {
          setIsAuthenticated(true)
        }
      } catch (error) {
        // Token invalid or expired
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check role authorization
  if (allowedRoles.length > 0 && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    switch(user.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />
      case 'instructor':
        return <Navigate to="/instructor/dashboard" replace />
      default:
        return <Navigate to="/dashboard" replace />
    }
  }

  return children
}

export default ProtectedRoute
