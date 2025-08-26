import React from 'react'
import { ArrowLeft, MessageCircle, Star, MapPin, Clock, CheckCircle2, Shield, Eye } from 'lucide-react'

const HelpersScreen = ({ selectedService, availableHelpers, onBack, onSelectHelper, onOpenChat, darkMode, sortBy, setSortBy, favorites, setFavorites }) => (
  <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
    <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 flex items-center`}>
      <button onClick={onBack} className="mr-4">
        <ArrowLeft size={24} className={darkMode ? 'text-white' : 'text-gray-800'} />
      </button>
      <div>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedService?.name}</h1>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{availableHelpers.length} helpers nearby • Sorted by {sortBy}</p>
      </div>
    </div>
    <div className="p-4">
      <div className="flex space-x-2 mb-4 overflow-x-auto">
        {['time', 'price', 'rating', 'distance'].map((option) => (
          <button key={option} onClick={() => setSortBy(option)} className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${sortBy === option ? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {availableHelpers.length > 0 ? (
          availableHelpers.map((helper) => (
            <div key={helper.id} onClick={() => onSelectHelper(helper)} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 shadow-sm border hover:shadow-md transition-all cursor-pointer`}>
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="text-3xl">{helper.avatar}</div>
                  {helper.verified && <CheckCircle2 className="absolute -top-1 -right-1 text-blue-500 bg-white rounded-full" size={16} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} flex items-center`}>
                        {helper.name}
                        {helper.verified && <Shield className="ml-1 text-blue-500" size={14} />}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 mt-1">
                        <span>Joined {new Date(helper.joinedDate).getFullYear()}</span>
                        <span>•</span>
                        <span>{helper.completedJobs} jobs</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold text-green-600">${helper.price}</span>
                      <button onClick={(e) => { e.stopPropagation(); setFavorites((prev) => (prev.includes(helper.id) ? prev.filter((id) => id !== helper.id) : [...prev, helper.id])) }} className="ml-2">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill={favorites.includes(helper.id) ? 'red' : 'none'} stroke={favorites.includes(helper.id) ? 'red' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-heart">
                          <path d="M20.8 4.6c-1.5-1.4-3.9-1.4-5.4 0L12 8l-3.4-3.4c-1.5-1.4-3.9-1.4-5.4 0-1.7 1.6-1.7 4.3 0 5.9L12 21l8.8-10.5c1.7-1.6 1.7-4.3 0-5.9z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm mb-3">
                    <div className="flex items-center">
                      <Star className="text-yellow-400 mr-1" size={14} fill="currentColor" />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {helper.rating} ({helper.reviews})
                      </span>
                    </div>
                    <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      <MapPin className="mr-1" size={14} />
                      <span>{helper.distance.toFixed(1)} mi</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 text-green-600" size={14} />
                      <span className="text-green-600 font-medium">{helper.arrivalTime} min</span>
                    </div>
                    {helper.emergencyService && <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">24/7</span>}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {helper.badges.map((badge, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>
                    <span>Languages: {helper.languages.join(', ')}</span>
                    <span className="mx-2">•</span>
                    <span>Responds in ~{helper.responseTime} min</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition">Book Now</button>
                    <button onClick={(e) => { e.stopPropagation(); onOpenChat(helper) }} className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 py-2 px-4 rounded-lg text-sm font-medium flex items-center transition`}>
                      <MessageCircle size={16} className="mr-1" />
                      Chat
                    </button>
                    <button className={`${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'} hover:bg-gray-200 p-2 rounded-lg transition`}>
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😔</div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>No helpers available</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>Try adjusting your filters or try again later</p>
            <button onClick={onBack} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg">Browse Other Services</button>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default HelpersScreen


