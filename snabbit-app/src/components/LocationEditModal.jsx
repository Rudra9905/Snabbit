import React, { useState } from 'react'
import { MapPin, X, Navigation, Search } from 'lucide-react'

const LocationEditModal = ({ 
  isOpen, 
  onClose, 
  currentLocation, 
  onSave, 
  darkMode,
  helperProfile = null,
  setHelperProfile = null
}) => {
  const [locationInput, setLocationInput] = useState(
    helperProfile ? helperProfile.location : currentLocation.address
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    if (locationInput.trim()) {
      if (helperProfile && setHelperProfile) {
        // Update helper profile location
        setHelperProfile(prev => ({
          ...prev,
          location: locationInput.trim()
        }))
      } else {
        // Update user location
        const newLocation = {
          ...currentLocation,
          address: locationInput.trim()
        }
        onSave(newLocation)
      }
      onClose()
    }
  }

  const handleUseGPS = () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, you would reverse geocode these coordinates
          // For now, we'll just update the coordinates and use a placeholder address
          const newLocation = {
            address: 'Current Location (GPS)',
            coords: { 
              lat: position.coords.latitude, 
              lng: position.coords.longitude 
            },
            accuracy: 'high'
          }
          onSave(newLocation)
          setIsLoading(false)
        },
        (error) => {
          console.error('GPS error:', error)
          setIsLoading(false)
          // You could show an error message here
        }
      )
    } else {
      setIsLoading(false)
      // You could show an error message here
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl p-6 w-full max-w-md`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Location</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Current Location
            </label>
            <div className={`flex items-center p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <MapPin size={16} className="mr-2 text-blue-500" />
              <span className="text-sm">
                {helperProfile ? helperProfile.location : currentLocation.address}
              </span>
            </div>
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              New Location
            </label>
            <div className="relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
              <input
                type="text"
                value={locationInput}
                onChange={(e) => setLocationInput(e.target.value)}
                placeholder="Enter your address or location"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                }`}
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={handleUseGPS}
              disabled={isLoading}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition ${
                isLoading 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              <Navigation size={16} />
              <span>{isLoading ? 'Getting Location...' : 'Use GPS'}</span>
            </button>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={!locationInput.trim()}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                locationInput.trim()
                  ? 'bg-blue-500 hover:bg-blue-600 text-white'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Save Location
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationEditModal
