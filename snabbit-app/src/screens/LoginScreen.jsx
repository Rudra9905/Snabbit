import React, { useState } from 'react'
import { User, Plus, Eye, EyeOff, Zap, Shield, Award, AlertCircle, Globe, Mail, Lock, Phone, MapPin, Calendar, Briefcase, CheckCircle } from 'lucide-react'

const LoginScreen = ({ onLogin, darkMode, setDarkMode, setEmergencyMode }) => {
  const [authMode, setAuthMode] = useState('login') // 'login' or 'signup'
  const [userType, setUserType] = useState('customer') // 'customer' or 'helper'
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    dateOfBirth: '',
    occupation: '',
    agreeToTerms: false
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (authMode === 'signup') {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required'
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required'
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required'
      if (!formData.location.trim()) newErrors.location = 'Location is required'
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required'
      if (userType === 'helper' && !formData.occupation.trim()) newErrors.occupation = 'Occupation is required'
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to terms and conditions'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (authMode === 'signup' && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    const userDetails = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      location: formData.location,
      dateOfBirth: formData.dateOfBirth,
      occupation: formData.occupation,
      userType,
      authMode
    }

    onLogin(userType, userDetails)
  }

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      location: '',
      dateOfBirth: '',
      occupation: '',
      agreeToTerms: false
    })
    setErrors({})
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-500 to-purple-600'} flex items-center justify-center p-4 relative`}>
      {/* Settings Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white"
      >
        {darkMode ? <Eye size={20} /> : <EyeOff size={20} />}
      </button>

      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-2xl shadow-xl p-8 w-full max-w-md`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">🐰 Snabbit</h1>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Quick help when you need it</p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <span className="flex items-center text-green-600">
              <Zap size={16} className="mr-1" />
              10-15 min
            </span>
            <span className="flex items-center text-blue-600">
              <Shield size={16} className="mr-1" />
              Verified helpers
            </span>
            <span className="flex items-center text-purple-600">
              <Award size={16} className="mr-1" />
              Top rated
            </span>
          </div>
        </div>

        {/* User Type Selection */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => {
              setUserType('customer')
              resetForm()
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition ${
              userType === 'customer'
                ? 'bg-blue-500 text-white'
                : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <User size={16} className="inline mr-2" />
            Customer
          </button>
          <button
            onClick={() => {
              setUserType('helper')
              resetForm()
            }}
            className={`flex-1 py-3 px-4 rounded-xl font-medium transition ${
              userType === 'helper'
                ? 'bg-green-500 text-white'
                : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Plus size={16} className="inline mr-2" />
            Helper
          </button>
        </div>

        {/* Auth Mode Toggle */}
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => {
              setAuthMode('login')
              resetForm()
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              authMode === 'login'
                ? 'bg-blue-500 text-white'
                : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setAuthMode('signup')
              resetForm()
            }}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition ${
              authMode === 'signup'
                ? 'bg-blue-500 text-white'
                : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Email Address
            </label>
            <div className="relative">
              <Mail size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                } ${errors.email ? 'border-red-500' : ''}`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Password
            </label>
            <div className="relative">
              <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                } ${errors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password (Signup only) */}
          {authMode === 'signup' && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                  } ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
            </div>
          )}

          {/* Additional fields for signup */}
          {authMode === 'signup' && (
            <>
              {/* Name fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                    } ${errors.firstName ? 'border-red-500' : ''}`}
                    placeholder="First name"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                    } ${errors.lastName ? 'border-red-500' : ''}`}
                    placeholder="Last name"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                    } ${errors.phone ? 'border-red-500' : ''}`}
                    placeholder="Enter your phone number"
                  />
                </div>
                {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
              </div>

              {/* Location */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Location
                </label>
                <div className="relative">
                  <MapPin size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                    } ${errors.location ? 'border-red-500' : ''}`}
                    placeholder="City, State or ZIP"
                  />
                </div>
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>

              {/* Date of Birth */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Date of Birth
                </label>
                <div className="relative">
                  <Calendar size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <input
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                    } ${errors.dateOfBirth ? 'border-red-500' : ''}`}
                  />
                </div>
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
              </div>

              {/* Occupation (Helper only) */}
              {userType === 'helper' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Occupation
                  </label>
                  <div className="relative">
                    <Briefcase size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <input
                      type="text"
                      value={formData.occupation}
                      onChange={(e) => handleInputChange('occupation', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                      } ${errors.occupation ? 'border-red-500' : ''}`}
                      placeholder="What do you do for work?"
                    />
                  </div>
                  {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
                </div>
              )}

              {/* Terms and Conditions */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="agreeToTerms" className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  I agree to the{' '}
                  <a href="#" className="text-blue-500 hover:underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                </label>
              </div>
              {errors.agreeToTerms && <p className="text-red-500 text-sm">{errors.agreeToTerms}</p>}
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-300 transform hover:scale-105"
          >
            {authMode === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Emergency and Guest Options */}
        <div className="mt-6 space-y-3">
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setEmergencyMode(true)
                onLogin('customer', { emergency: true })
              }}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center space-x-2"
            >
              <AlertCircle size={18} />
              <span>Emergency</span>
            </button>
            <button className="flex-1 border border-gray-300 hover:bg-gray-50 font-medium py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center space-x-2">
              <Globe size={18} />
              <span>Guest</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {authMode === 'login' ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setAuthMode(authMode === 'login' ? 'signup' : 'login')
                resetForm()
              }}
              className="text-blue-500 hover:underline font-medium"
            >
              {authMode === 'login' ? 'Sign up here' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen


