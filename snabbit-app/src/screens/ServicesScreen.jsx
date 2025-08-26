import React, { useMemo } from 'react'
import { MapPin, Search, Filter, Clock, Bell, AlertCircle } from 'lucide-react'

const ServicesScreen = ({
  userLocation,
  services,
  helpers,
  searchQuery,
  setSearchQuery,
  onSelectService,
  darkMode,
  emergencyMode,
  setEmergencyMode,
  showFilters,
  setShowFilters,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
  notifications,
  setShowHistory,
}) => {
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = service.basePrice >= priceRange[0] && service.basePrice <= priceRange[1]
      const matchesEmergency = emergencyMode ? service.emergency : true
      return matchesSearch && matchesPrice && matchesEmergency
    })
  }, [services, searchQuery, priceRange, emergencyMode])

  const categories = useMemo(() => [...new Set(services.map((s) => s.category))], [services])

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>🐰 Snabbit</h1>
            {emergencyMode && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                <AlertCircle size={12} className="mr-1" />
                Emergency
              </span>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={() => setShowHistory(true)} className="relative">
              <Clock size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            <button className="relative">
              <Bell size={20} className={darkMode ? 'text-gray-300' : 'text-gray-600'} />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </button>
            <div className={`flex items-center text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              <MapPin size={16} className="mr-1" />
              {userLocation.address}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} size={20} />
            <input
              type="text"
              placeholder="What do you need help with?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-10 py-3 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'} rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <button onClick={() => setShowFilters(!showFilters)} className={`absolute right-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`}>
              <Filter size={20} />
            </button>
          </div>
          {showFilters && (
            <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-xl p-4 space-y-4`}>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <div className="flex items-center space-x-4">
                  <input type="range" min="10" max="200" value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} className="flex-1" />
                  <input type="range" min="10" max="200" value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="flex-1" />
                </div>
              </div>
              <div>
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Sort by</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={`w-full p-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg`}>
                  <option value="time">Fastest Response</option>
                  <option value="price">Lowest Price</option>
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Nearest</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={() => setEmergencyMode(!emergencyMode)} className={`px-3 py-1 rounded-full text-sm ${emergencyMode ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
                  Emergency Only
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-blue-50'} rounded-lg p-3 text-center`}>
            <div className={`text-lg font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{helpers.filter((h) => h.isAvailable).length}</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Available</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-green-50'} rounded-lg p-3 text-center`}>
            <div className={`text-lg font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>12 min</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Avg Time</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-yellow-50'} rounded-lg p-3 text-center`}>
            <div className={`text-lg font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>4.8</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Rating</div>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-purple-50'} rounded-lg p-3 text-center`}>
            <div className={`text-lg font-bold ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>24/7</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Support</div>
          </div>
        </div>

        <div className="flex space-x-2 mb-4 overflow-x-auto">
          <button onClick={() => setSearchQuery('')} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${searchQuery === '' ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            All
          </button>
          {categories.map((category) => (
            <button key={category} className={`${darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap`}>
              {category}
            </button>
          ))}
        </div>

        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
          {emergencyMode ? 'Emergency Services' : 'Available Services Near You'}
        </h2>
        <div className="grid grid-cols-2 gap-4">
          {filteredServices.map((service) => {
            const availableCount = helpers.filter((h) => h.isAvailable && h.skills.includes(service.name)).length
            return (
              <div key={service.id} onClick={() => onSelectService(service)} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 shadow-sm border hover:shadow-md transition-all cursor-pointer transform hover:scale-105`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="text-3xl">{service.icon}</div>
                  {service.emergency && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">24/7</span>}
                </div>
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} text-sm mb-1`}>{service.name}</h3>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>${service.basePrice}+ • {service.description}</p>
                <div className="flex items-center justify-between text-xs">
                  <span className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <Clock size={12} className="mr-1" />
                    {service.time}
                  </span>
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">{availableCount} available</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {!emergencyMode && (
        <button onClick={() => { setEmergencyMode(true); setSearchQuery('') }} className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-lg z-10">
          <AlertCircle size={24} />
        </button>
      )}
    </div>
  )
}

export default ServicesScreen


