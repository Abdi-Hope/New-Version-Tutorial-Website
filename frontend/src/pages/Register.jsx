import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  User, Mail, Lock, Eye, EyeOff, CheckCircle, 
  AlertCircle, BookOpen, Users, Loader2,
  GraduationCap, Sparkles, Briefcase
} from 'lucide-react'
import { authAPI } from '../services/api'

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user', // Changed from 'student' to match backend (user/instructor)
    specialization: '', // For instructor role
    experience: '' // For instructor role
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [step, setStep] = useState(1)
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [shake, setShake] = useState(false)

  // Password strength calculator
  useEffect(() => {
    const strength = calculatePasswordStrength(formData.password)
    setPasswordStrength(strength)
    
    if (formData.password && formData.confirmPassword && formData.password === formData.confirmPassword) {
      setErrors(prev => ({ ...prev, confirmPassword: '' }))
    }
  }, [formData.password, formData.confirmPassword])

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    return strength
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength >= 75) return 'bg-green-500'
    if (passwordStrength >= 50) return 'bg-yellow-500'
    if (passwordStrength >= 25) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength >= 75) return 'Strong'
    if (passwordStrength >= 50) return 'Good'
    if (passwordStrength >= 25) return 'Weak'
    return 'Very Weak'
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  // Role selection handler
  const handleRoleSelect = (role) => {
    setFormData(prev => ({
      ...prev,
      role,
      // Clear instructor-specific fields when switching to user
      ...(role === 'user' ? { specialization: '', experience: '' } : {})
    }))
  }

  const validateStep = (stepNumber) => {
    const newErrors = {}
    
    if (stepNumber === 1) {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required'
      } else if (formData.name.length < 2) {
        newErrors.name = 'Name must be at least 2 characters'
      }
      
      if (!formData.email) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
    }
    
    if (stepNumber === 2) {
      if (!formData.password) {
        newErrors.password = 'Password is required'
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters'
      } else if (passwordStrength < 50) {
        newErrors.password = 'Please choose a stronger password'
      }
      
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password'
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
      
      if (!termsAccepted) {
        newErrors.terms = 'You must accept the terms and conditions'
      }
    }
    
    return newErrors
  }

  const handleNextStep = () => {
    const stepErrors = validateStep(step)
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    
    if (step < 3) {
      setStep(step + 1)
      setErrors({})
      setSuccessMessage('')
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      setErrors({})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all steps
    const step1Errors = validateStep(1)
    const step2Errors = validateStep(2)
    const step3Errors = formData.role === 'instructor' && !formData.specialization ? 
      { specialization: 'Please enter your specialization' } : {}
    
    const allErrors = { ...step1Errors, ...step2Errors, ...step3Errors }
    
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }

    setIsLoading(true)
    setErrors({})
    setSuccessMessage('')
    
    try {
      // Prepare data for backend
      const registrationData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      }
      
      // Add instructor-specific data
      if (formData.role === 'instructor') {
        registrationData.specialization = formData.specialization.split(',').map(s => s.trim())
        registrationData.experience = parseInt(formData.experience) || 0
      }
      
      // Call backend API
      const response = await authAPI.register(registrationData)
      
      if (response.success) {
        // Store token and user data
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
        
        setSuccessMessage(`Welcome ${formData.name}! Account created successfully.`)
        
        // Redirect based on role after short delay
        setTimeout(() => {
          switch(response.user.role) {
            case 'admin':
              navigate('/admin/dashboard')
              break
            case 'instructor':
              navigate('/instructor/dashboard')
              break
            default:
              navigate('/dashboard')
          }
        }, 2000)
      } else {
        throw new Error(response.error || 'Registration failed')
      }
      
    } catch (error) {
      console.error('Registration error:', error)
      
      // Handle specific error cases
      if (error.response?.data?.error === 'Email already registered') {
        setErrors({ 
          email: 'This email is already registered. Please use a different email or login.'
        })
      } else if (error.response?.data?.error?.includes('role')) {
        setErrors({ 
          role: error.response.data.error 
        })
      } else {
        setErrors({ 
          form: error.response?.data?.error || 'Registration failed. Please try again.' 
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const renderStepIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-center items-center space-x-4">
        {[1, 2, 3].map((stepNumber) => (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col items-center">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center
                ${step === stepNumber 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-2 border-blue-500' 
                  : step > stepNumber 
                    ? 'bg-green-500 text-white border-2 border-green-500'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 border-2 border-gray-300 dark:border-gray-600'
                }
                transition-all duration-300
              `}>
                {step > stepNumber ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{stepNumber}</span>
                )}
              </div>
              <span className="text-xs mt-2 text-gray-600 dark:text-gray-400">
                {stepNumber === 1 ? 'Account' : stepNumber === 2 ? 'Security' : 'Role'}
              </span>
            </div>
            {stepNumber < 3 && (
              <div className={`
                w-16 h-1 rounded-full
                ${step > stepNumber ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )

  const renderStepContent = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300  items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                } dark:bg-gray-700 dark:text-gray-100 transition-all duration-200`}
              />
              {errors.name && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300  items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                } dark:bg-gray-700 dark:text-gray-100 transition-all duration-200`}
              />
              {errors.email && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Continue to Security
                <Lock className="w-5 h-5" />
              </button>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300  items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                    errors.password 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } dark:bg-gray-700 dark:text-gray-100 transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {/* Password strength indicator */}
              {formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Password strength:</span>
                    <span className={`font-semibold ${
                      passwordStrength >= 75 ? 'text-green-600' :
                      passwordStrength >= 50 ? 'text-yellow-600' :
                      passwordStrength >= 25 ? 'text-orange-600' : 'text-red-600'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <span className={`${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                      • 8+ chars
                    </span>
                    <span className={`${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      • Uppercase
                    </span>
                    <span className={`${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      • Number
                    </span>
                    <span className={`${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}>
                      • Special
                    </span>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                    errors.confirmPassword 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                  } dark:bg-gray-700 dark:text-gray-100 transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {/* Password match indicator */}
              {formData.password && formData.confirmPassword && (
                <div className={`flex items-center gap-2 text-sm ${
                  formData.password === formData.confirmPassword ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formData.password === formData.confirmPassword ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Passwords match
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-4 h-4" />
                      Passwords do not match
                    </>
                  )}
                </div>
              )}

              {errors.confirmPassword && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="terms"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Terms of Service
                  </button>{' '}
                  and{' '}
                  <button type="button" className="text-blue-600 hover:text-blue-500 dark:text-blue-400">
                    Privacy Policy
                  </button>
                </label>
              </div>
              {errors.terms && (
                <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.terms}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                Choose Role
              </button>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                Select Your Role
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Choose how you want to use our platform
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Student/User Role */}
              <button
                type="button"
                onClick={() => handleRoleSelect('user')}
                className={`p-6 border-2 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  formData.role === 'user'
                    ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 shadow-lg'
                    : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    formData.role === 'user'
                      ? 'bg-blue-100 dark:bg-blue-900/30'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <BookOpen className={`w-6 h-6 ${
                      formData.role === 'user'
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Student
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Join courses, learn new skills, and track your progress
                  </div>
                  {formData.role === 'user' && (
                    <div className="mt-4 text-blue-600 dark:text-blue-400">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </button>

              {/* Instructor/Teacher Role */}
              <button
                type="button"
                onClick={() => handleRoleSelect('instructor')}
                className={`p-6 border-2 rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                  formData.role === 'instructor'
                    ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-900/10 shadow-lg'
                    : 'border-gray-300 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    formData.role === 'instructor'
                      ? 'bg-purple-100 dark:bg-purple-900/30'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    <GraduationCap className={`w-6 h-6 ${
                      formData.role === 'instructor'
                        ? 'text-purple-600 dark:text-purple-400'
                        : 'text-gray-600 dark:text-gray-400'
                    }`} />
                  </div>
                  <div className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Instructor
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                    Create courses, share knowledge, and manage students
                  </div>
                  {formData.role === 'instructor' && (
                    <div className="mt-4 text-purple-600 dark:text-purple-400">
                      <CheckCircle className="w-6 h-6" />
                    </div>
                  )}
                </div>
              </button>
            </div>

            {/* Instructor-specific fields */}
            {formData.role === 'instructor' && (
              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300 items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    Specialization
                  </label>
                  <input
                    type="text"
                    name="specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    placeholder="e.g., Web Development, Data Science"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Enter your main area of expertise (comma-separated if multiple)
                  </p>
                  {errors.specialization && (
                    <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.specialization}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="flex text-sm font-medium text-gray-700 dark:text-gray-300 items-center gap-2">
                    <Users className="w-4 h-4" />
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    min="0"
                    max="50"
                    placeholder="e.g., 5"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-100 transition-all duration-200"
                  />
                </div>
              </div>
            )}

            {/* Role description */}
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  formData.role === 'user' 
                    ? 'bg-blue-100 dark:bg-blue-900/30' 
                    : 'bg-purple-100 dark:bg-purple-900/30'
                }`}>
                  <Sparkles className={`w-4 h-4 ${
                    formData.role === 'user' 
                      ? 'text-blue-600 dark:text-blue-400' 
                      : 'text-purple-600 dark:text-purple-400'
                  }`} />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200">
                    As a {formData.role === 'user' ? 'student' : 'instructor'}, you can:
                  </h4>
                  <ul className="mt-2 space-y-1 text-sm text-gray-600 dark:text-gray-400">
                    {formData.role === 'user' ? (
                      <>
                        <li>• Access thousands of courses</li>
                        <li>• Track learning progress</li>
                        <li>• Get certificates upon completion</li>
                        <li>• Join student communities</li>
                      </>
                    ) : (
                      <>
                        <li>• Create and sell courses</li>
                        <li>• Manage student enrollments</li>
                        <li>• Track course analytics</li>
                        <li>• Receive payments</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-3 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-medium transition-all duration-300 ${
                  isLoading ? 'opacity-90 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
                    Creating Account...
                  </>
                ) : (
                  'Complete Registration'
                )}
              </button>
            </div>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className={`max-w-2xl w-full ${shake ? 'animate-shake' : ''}`}>
        {/* Animated header */}
        <div className="text-center mb-4 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl mb-4 animate-pulse-slow">
            <span className="text-white text-3xl font-bold">ae</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
            Create Your Account
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Join thousands of learners and educators
          </p>
        </div>

        {/* Success message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3 animate-slide-down">
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="text-green-700 dark:text-green-300">{successMessage}</span>
          </div>
        )}

        {/* Error message */}
        {errors.form && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3 animate-slide-down">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-red-700 dark:text-red-300">{errors.form}</span>
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 transition-all duration-300 hover:shadow-3xl">
          <form onSubmit={handleSubmit}>
            {/* Step indicator */}
            {renderStepIndicator()}
            
            {/* Step content */}
            {renderStepContent()}
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
