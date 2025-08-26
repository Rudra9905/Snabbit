import React from 'react'
import { ArrowLeft, Star, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'

const BookingScreen = ({ selectedService, selectedHelper, userLocation, onBack, onConfirm, onOpenChat }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow-sm p-4 flex items-center">
      <button onClick={onBack} className="mr-4">
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-xl font-bold text-gray-800">Book Helper</h1>
    </div>
    <div className="p-4">
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-4xl">{selectedHelper?.avatar}</div>
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{selectedHelper?.name}</h3>
            <div className="flex items-center text-sm text-gray-600">
              <Star className="text-yellow-400 mr-1" size={14} fill="currentColor" />
              <span>
                {selectedHelper?.rating} • {selectedHelper?.distance.toFixed(1)} miles away
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Phone size={12} className="mr-1" />
              <span>{selectedHelper?.phone}</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-blue-600">{selectedHelper?.arrivalTime} min</div>
            <div className="text-xs text-gray-600">Arrival Time</div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-2xl font-bold text-green-600">${selectedHelper?.price}</div>
            <div className="text-xs text-gray-600">Estimated Cost</div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
        <h4 className="font-semibold text-gray-800 mb-3">Service Details</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium">{selectedService?.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{selectedService?.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Your Location:</span>
            <span className="font-medium">{userLocation.address}</span>
          </div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-xl p-4 mb-4">
        <div className="flex items-start space-x-3">
          <MapPin className="text-blue-600 mt-1" size={20} />
          <div>
            <h4 className="font-medium text-blue-800">Location Sharing</h4>
            <p className="text-sm text-blue-600">Your location will be shared with the helper once booking is confirmed</p>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <button onClick={onConfirm} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition duration-300">
          Confirm Booking - ${selectedHelper?.price}
        </button>
        <button onClick={onOpenChat} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center space-x-2">
          <MessageCircle size={20} />
          <span>Message Helper First</span>
        </button>
      </div>
    </div>
  </div>
)

export default BookingScreen


