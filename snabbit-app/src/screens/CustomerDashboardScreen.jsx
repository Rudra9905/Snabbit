import React, { useState } from 'react'
import { 
  User, Settings, Bell, MapPin, Phone, Mail, Calendar, 
  Clock, Star, DollarSign, Edit, Save, X, Plus, Trash2,
  CheckCircle, AlertCircle, Eye, EyeOff, Camera, Upload,
  Shield, Award, Briefcase, Languages, Wifi, Battery,
  MessageCircle, Search, Filter, Clock3, DollarSign as DollarIcon
} from 'lucide-react'

const CustomerDashboardScreen = ({ 
  userDetails, 
  bookingHistory, 
  onBackToServices, 
  onOpenChat,
  darkMode 
}) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showCustomRequestModal, setShowCustomRequestModal] = useState(false)
  const [customRequest, setCustomRequest] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'normal',
    budget: '',
    preferredTime: '',
    location: ''
  })

  const handleCustomRequestSubmit = () => {
    // This would typically send the request to nearby helpers
    console.log('Custom request submitted:', customRequest)
    setShowCustomRequestModal(false)
    setCustomRequest({
      title: '',
      description: '',
      category: '',
      urgency: 'normal',
      budget: '',
      preferredTime: '',
      location: ''
    })
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-800'
      case 'urgent': return 'bg-orange-100 text-orange-800'
      case 'normal': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">👤</div>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Customer Dashboard
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Welcome back, {userDetails?.firstName || 'Customer'}!
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative">
              <Bell size={20} className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
            </button>
            <button
              onClick={onBackToServices}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCustomRequestModal(true)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium transition flex items-center justify-center space-x-2"
          >
            <Plus size={20} />
            <span>Request Custom Help</span>
          </button>
          <button
            onClick={onBackToServices}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium transition flex items-center justify-center space-x-2"
          >
            <Search size={20} />
            <span>Browse Services</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex space-x-8 px-4">
          {['overview', 'custom-requests', 'bookings', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : darkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.replace('-', ' ')}
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
            <div className="grid grid-cols-3 gap-4">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {bookingHistory?.length || 0}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Bookings</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {bookingHistory?.filter(b => b.status === 'completed').length || 0}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {bookingHistory?.filter(b => b.status === 'active').length || 0}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Recent Activity
              </h3>
              {bookingHistory && bookingHistory.length > 0 ? (
                <div className="space-y-3">
                  {bookingHistory.slice(0, 3).map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {booking.service.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Helper: {booking.helper.name}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                            <span className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              {booking.customerLocation.address}
                            </span>
                            <span className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {new Date(booking.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-gray-600">No bookings yet</p>
                  <p className="text-sm text-gray-500">
                    Start by requesting help or browsing services
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Custom Requests Tab */}
        {activeTab === 'custom-requests' && (
          <div className="space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Custom Help Requests
                </h3>
                <button
                  onClick={() => setShowCustomRequestModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  <Plus size={16} className="inline mr-2" />
                  New Request
                </button>
              </div>

              <div className="text-center py-8">
                <div className="text-4xl mb-4">💡</div>
                <p className="text-gray-600">No custom requests yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Create a custom request for specialized help
                </p>
                <button
                  onClick={() => setShowCustomRequestModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Create Your First Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Booking History
              </h3>
              {bookingHistory && bookingHistory.length > 0 ? (
                <div className="space-y-3">
                  {bookingHistory.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {booking.service.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Helper: {booking.helper.name}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                            <span className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              {booking.customerLocation.address}
                            </span>
                            <span className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {new Date(booking.timestamp).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <DollarIcon size={12} className="mr-1" />
                              ${booking.helper.price}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      {booking.status === 'active' && (
                        <div className="flex space-x-2 mt-3">
                          <button
                            onClick={() => onOpenChat()}
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
                          >
                            <MessageCircle size={16} className="inline mr-2" />
                            Chat with Helper
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-gray-600">No bookings yet</p>
                  <p className="text-sm text-gray-500">
                    Start by requesting help or browsing services
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Profile Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">👤</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {userDetails?.firstName} {userDetails?.lastName}
                    </h4>
                    <p className="text-sm text-gray-600">{userDetails?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{userDetails?.phone || 'No phone added'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-400" />
                    <span>{userDetails?.email || 'No email added'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{userDetails?.location || 'No location added'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{userDetails?.dateOfBirth || 'No date added'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Request Modal */}
      {showCustomRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Request Custom Help
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Request Title
                </label>
                <input
                  type="text"
                  value={customRequest.title}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Brief title for your request"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  value={customRequest.description}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Describe what you need help with..."
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category
                </label>
                <select
                  value={customRequest.category}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, category: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="home">Home & Garden</option>
                  <option value="tech">Technology</option>
                  <option value="creative">Creative & Design</option>
                  <option value="business">Business & Professional</option>
                  <option value="health">Health & Wellness</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Urgency Level
                </label>
                <select
                  value={customRequest.urgency}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, urgency: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                >
                  <option value="normal">Normal (Within 24 hours)</option>
                  <option value="urgent">Urgent (Within 4 hours)</option>
                  <option value="emergency">Emergency (Immediate)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Budget ($)
                  </label>
                  <input
                    type="number"
                    value={customRequest.budget}
                    onChange={(e) => setCustomRequest(prev => ({ ...prev, budget: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    placeholder="Your budget"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={customRequest.preferredTime}
                    onChange={(e) => setCustomRequest(prev => ({ ...prev, preferredTime: e.target.value }))}
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
                  value={customRequest.location}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, location: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Where do you need help?"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCustomRequestSubmit}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium"
              >
                Submit Request
              </button>
              <button
                onClick={() => setShowCustomRequestModal(false)}
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

export default CustomerDashboardScreen
