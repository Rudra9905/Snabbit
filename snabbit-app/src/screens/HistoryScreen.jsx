import React, { useState, useMemo } from 'react'
import { ArrowLeft, Search, Filter, Calendar, MapPin, Clock, Star, User, Phone, MessageCircle, Eye } from 'lucide-react'

const HistoryScreen = ({ 
  bookingHistory, 
  onBack, 
  darkMode, 
  onOpenChat, 
  userRole = 'customer' 
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterService, setFilterService] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const statusOptions = ['all', 'completed', 'cancelled', 'in-progress']
  const serviceOptions = ['all', 'Tech Support', 'Furniture Assembly', 'House Cleaning', 'Delivery Service', 'Pet Care', 'Tutoring', 'Plumbing', 'Electrical Work', 'Locksmith', 'Car Help', 'Photography', 'Moving Help']

  const filteredHistory = useMemo(() => {
    let filtered = bookingHistory.filter(booking => {
      const matchesSearch = 
        booking.service?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (userRole === 'customer' ? booking.helper?.name?.toLowerCase() : booking.customer?.name?.toLowerCase()).includes(searchQuery.toLowerCase()) ||
        booking.customerLocation?.address?.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesStatus = filterStatus === 'all' || booking.status === filterStatus
      const matchesService = filterService === 'all' || booking.service?.name === filterService
      
      return matchesSearch && matchesStatus && matchesService
    })

    // Sort by selected criteria
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        break
      case 'service':
        filtered.sort((a, b) => a.service?.name?.localeCompare(b.service?.name))
        break
      case 'helper':
        if (userRole === 'customer') {
          filtered.sort((a, b) => a.helper?.name?.localeCompare(b.helper?.name))
        } else {
          filtered.sort((a, b) => a.customer?.name?.localeCompare(b.customer?.name))
        }
        break
      case 'price':
        filtered.sort((a, b) => (b.service?.basePrice || 0) - (a.service?.basePrice || 0))
        break
      default:
        break
    }

    return filtered
  }, [bookingHistory, searchQuery, filterStatus, filterService, sortBy])

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'cancelled':
        return '❌'
      case 'in-progress':
        return '🔄'
      default:
        return '📋'
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <button
              onClick={onBack}
              className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'} transition-colors`}
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              {userRole === 'helper' ? 'Service History' : 'Booking History'}
            </h1>
          </div>
          <div className="text-sm text-gray-500">
            {filteredHistory.length} {filteredHistory.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
            <input
              type="text"
              placeholder="Search services, helpers, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              }`}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              }`}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className={`p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
              }`}
            >
              {serviceOptions.map(service => (
                <option key={service} value={service}>
                  {service === 'all' ? 'All Services' : service}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-2 overflow-x-auto">
            {['date', 'service', userRole === 'customer' ? 'helper' : 'customer', 'price'].map(sort => (
              <button
                key={sort}
                onClick={() => setSortBy(sort)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  sortBy === sort
                    ? 'bg-blue-500 text-white'
                    : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Sort by {sort.charAt(0).toUpperCase() + sort.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="p-4 space-y-4">
        {filteredHistory.length === 0 ? (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-lg font-semibold mb-2">No history found</h3>
            <p>Try adjusting your search or filters</p>
          </div>
        ) : (
          filteredHistory.map((booking) => (
            <div
              key={booking.id}
              className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 shadow-sm border`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{booking.service?.icon}</div>
                  <div>
                    <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                      {booking.service?.name}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {formatDate(booking.timestamp)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {getStatusIcon(booking.status)} {booking.status}
                  </span>
                  <span className={`font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                    ${booking.service?.basePrice}
                  </span>
                </div>
              </div>

                             {/* Helper/Customer Details */}
               <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-3 mb-3`}>
                 <div className="flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                     <div className="text-xl">
                       {userRole === 'helper' ? booking.customer?.avatar : booking.helper?.avatar}
                     </div>
                     <div>
                       <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                         {userRole === 'helper' ? booking.customer?.name : booking.helper?.name}
                       </h4>
                       {userRole === 'customer' && (
                         <div className="flex items-center space-x-2 text-sm">
                           <span className="flex items-center text-yellow-600">
                             <Star size={14} className="mr-1" />
                             {booking.helper?.rating}
                           </span>
                           <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                             {booking.helper?.reviews} reviews
                           </span>
                         </div>
                       )}
                       {userRole === 'helper' && (
                         <div className="text-sm text-green-600 font-medium">
                           Earned: ${booking.earnings}
                         </div>
                       )}
                     </div>
                   </div>
                   <div className="flex items-center space-x-2">
                     <button
                       onClick={() => onOpenChat(userRole === 'helper' ? booking.customer : booking.helper)}
                       className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'} transition-colors`}
                       title={userRole === 'helper' ? 'Chat with customer' : 'Chat with helper'}
                     >
                       <MessageCircle size={16} />
                     </button>
                     <button
                       className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-600 text-gray-300' : 'hover:bg-gray-200 text-gray-600'} transition-colors`}
                       title={userRole === 'helper' ? 'View customer profile' : 'View helper profile'}
                     >
                       <Eye size={16} />
                     </button>
                   </div>
                 </div>
               </div>

              {/* Service Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {booking.customerLocation?.address}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  <span className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {booking.service?.time}
                  </span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-3 pt-3 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm">
                  <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Payment: {booking.paymentMethod}
                  </span>
                  {booking.status === 'completed' && (
                    <button className="text-blue-500 hover:text-blue-600 font-medium">
                      Leave Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default HistoryScreen
