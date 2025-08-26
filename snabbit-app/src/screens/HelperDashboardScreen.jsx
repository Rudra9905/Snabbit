import React, { useState } from 'react'
import { 
  User, Settings, Bell, MapPin, Phone, Mail, Calendar, 
  Clock, Star, DollarSign, Edit, Save, X, Plus, Trash2,
  CheckCircle, AlertCircle, Eye, EyeOff, Camera, Upload,
  Shield, Award, Briefcase, Languages, Wifi, Battery
} from 'lucide-react'

const HelperDashboardScreen = ({ 
  helperProfile, 
  setHelperProfile, 
  activeRequests, 
  services, 
  onEdit, 
  onBackToLogin, 
  onOpenChat,
  darkMode 
}) => {
  const [editMode, setEditMode] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [tempProfile, setTempProfile] = useState({ ...helperProfile })

  const handleProfileUpdate = () => {
    setHelperProfile(tempProfile)
    setEditMode(false)
  }

  const handleServiceUpdate = (serviceName, price) => {
    setHelperProfile(prev => ({
      ...prev,
      customPrices: {
        ...prev.customPrices,
        [serviceName]: price
      }
    }))
    setShowServiceModal(false)
    setEditingService(null)
  }

  const toggleAvailability = () => {
    setHelperProfile(prev => ({
      ...prev,
      isAvailable: !prev.isAvailable
    }))
  }

  const calculateEarnings = () => {
    const totalEarnings = Object.values(helperProfile.customPrices).reduce((sum, price) => sum + (parseInt(price) || 0), 0)
    return {
      daily: Math.round(totalEarnings * 0.3),
      weekly: Math.round(totalEarnings * 1.5),
      monthly: Math.round(totalEarnings * 6)
    }
  }

  const earnings = calculateEarnings()

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">👨‍💼</div>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Helper Dashboard
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Welcome back, {helperProfile.name || 'Helper'}!
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative">
              <Bell size={20} className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
              {activeRequests.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeRequests.length}
                </span>
              )}
            </button>
            <button
              onClick={onBackToLogin}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
            >
              <User size={20} />
            </button>
          </div>
        </div>

        {/* Availability Toggle */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
          <div>
            <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Work Availability</h3>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              {helperProfile.isAvailable ? 'You are accepting requests' : 'You are offline'}
            </p>
          </div>
          <button
            onClick={toggleAvailability}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              helperProfile.isAvailable ? 'bg-green-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                helperProfile.isAvailable ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex space-x-8 px-4">
          {['overview', 'profile', 'requests', 'earnings'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : darkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {activeRequests.length}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Requests</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  ${earnings.weekly}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>This Week</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {helperProfile.rating}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rating</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  {helperProfile.completedJobs}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Jobs Done</div>
              </div>
            </div>

            {/* Services & Pricing */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Your Services & Pricing
                </h3>
                <button
                  onClick={() => setShowServiceModal(true)}
                  className="text-blue-500 text-sm font-medium flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Service
                </button>
              </div>

              <div className="space-y-3">
                {helperProfile.skills.map((skill, index) => {
                  const customPrice = helperProfile.customPrices[skill]
                  const service = services.find((s) => s.name === skill)
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-xl">{service?.icon}</span>
                        <span className="font-medium text-gray-800">{skill}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-green-600 font-semibold">
                          ${customPrice || service?.basePrice}/hr
                        </span>
                        <button
                          onClick={() => {
                            setEditingService({ name: skill, price: customPrice || service?.basePrice })
                            setShowServiceModal(true)
                          }}
                          className="p-1 text-gray-500 hover:text-blue-500"
                        >
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Profile Information
                </h3>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="text-blue-500 text-sm font-medium flex items-center"
                >
                  {editMode ? <X size={16} className="mr-1" /> : <Edit size={16} className="mr-1" />}
                  {editMode ? 'Cancel' : 'Edit Profile'}
                </button>
              </div>

              {editMode ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        First Name
                      </label>
                      <input
                        type="text"
                        value={tempProfile.firstName || ''}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, firstName: e.target.value }))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={tempProfile.lastName || ''}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, lastName: e.target.value }))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Bio
                    </label>
                    <textarea
                      value={tempProfile.bio || ''}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, bio: e.target.value }))}
                      rows="3"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      placeholder="Tell customers about yourself..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={tempProfile.phone || ''}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, phone: e.target.value }))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                      </label>
                      <input
                        type="email"
                        value={tempProfile.email || ''}
                        onChange={(e) => setTempProfile(prev => ({ ...prev, email: e.target.value }))}
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={tempProfile.location || ''}
                      onChange={(e) => setTempProfile(prev => ({ ...prev, location: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                    />
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleProfileUpdate}
                      className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium"
                    >
                      <Save size={16} className="inline mr-2" />
                      Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-4xl">👨‍💼</div>
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {helperProfile.firstName} {helperProfile.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">{helperProfile.bio || 'No bio added yet'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Phone size={16} className="text-gray-400" />
                      <span>{helperProfile.phone || 'No phone added'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail size={16} className="text-gray-400" />
                      <span>{helperProfile.email || 'No email added'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin size={16} className="text-gray-400" />
                      <span>{helperProfile.location || 'No location added'}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star size={16} className="text-yellow-400" />
                      <span>{helperProfile.rating} rating</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            {/* Pending Requests */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Pending Requests ({activeRequests.length})
              </h3>

              {helperProfile.isAvailable ? (
                activeRequests.length > 0 ? (
                  <div className="space-y-3">
                    {activeRequests.map((request) => (
                      <div
                        key={request.id}
                        className="border border-gray-200 rounded-lg p-3"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="font-medium text-gray-800">
                              {request.service.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Customer location received
                            </p>
                            <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                              <span className="flex items-center">
                                <MapPin size={12} className="mr-1" />
                                {request.customerLocation.address}
                              </span>
                              <span className="flex items-center">
                                <Clock size={12} className="mr-1" />
                                Just now
                              </span>
                            </div>
                          </div>
                          <span className="font-bold text-green-600">
                            ${
                              helperProfile.customPrices[request.service.name] ||
                              request.service.basePrice
                            }
                          </span>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={() => onOpenChat()}
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
                          >
                            Chat with Customer
                          </button>
                          <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">
                            View Location
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">⏰</div>
                    <p className="text-gray-600">No requests yet</p>
                    <p className="text-sm text-gray-500">
                      You'll get notified when customers need your services
                    </p>
                  </div>
                )
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">😴</div>
                  <p className="text-gray-600">You're currently offline</p>
                  <p className="text-sm text-gray-500">
                    Turn on availability to receive requests
                  </p>
                </div>
              )}
            </div>

            {/* Custom Requests */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Custom Help Requests
              </h3>
              
              {/* Mock custom requests - in real app these would come from the backend */}
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">Website Design Help</h4>
                      <p className="text-sm text-gray-600">
                        Need help creating a professional website for my small business
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                        <span className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          0.8 miles away
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          Urgent (4 hours)
                        </span>
                        <span className="flex items-center">
                          <DollarSign size={12} className="mr-1" />
                          Budget: $200
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Creative & Design
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
                      Accept Request
                    </button>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
                      Decline
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">Garden Landscaping</h4>
                      <p className="text-sm text-gray-600">
                        Looking for help redesigning my backyard garden area
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                        <span className="flex items-center">
                          <MapPin size={12} className="mr-1" />
                          1.2 miles away
                        </span>
                        <span className="flex items-center">
                          <Clock size={12} className="mr-1" />
                          Normal (24 hours)
                        </span>
                        <span className="flex items-center">
                          <DollarSign size={12} className="mr-1" />
                          Budget: $150
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Home & Garden
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
                      Accept Request
                    </button>
                    <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            {/* Earnings Overview */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  ${earnings.daily}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Today</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  ${earnings.weekly}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>This Week</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                  ${earnings.monthly}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>This Month</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Service Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {editingService ? 'Edit Service Price' : 'Add New Service'}
            </h3>
            
            {editingService ? (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Service
                  </label>
                  <div className="p-3 bg-gray-50 rounded-lg">
                    {editingService.name}
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Price per Hour ($)
                  </label>
                  <input
                    type="number"
                    value={editingService.price}
                    onChange={(e) => setEditingService(prev => ({ ...prev, price: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    placeholder="Enter price"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Select Service
                  </label>
                  <select className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}>
                    {services.map(service => (
                      <option key={service.id} value={service.name}>
                        {service.icon} {service.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Price per Hour ($)
                  </label>
                  <input
                    type="number"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    placeholder="Enter price"
                  />
                </div>
              </div>
            )}

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  if (editingService) {
                    handleServiceUpdate(editingService.name, editingService.price)
                  }
                }}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium"
              >
                {editingService ? 'Update' : 'Add Service'}
              </button>
              <button
                onClick={() => {
                  setShowServiceModal(false)
                  setEditingService(null)
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HelperDashboardScreen


