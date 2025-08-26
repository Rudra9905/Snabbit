import React from 'react'
import { MapPin, MessageCircle } from 'lucide-react'

const BookingConfirmedScreen = ({ selectedService, selectedHelper, userLocation, onNewBooking, onOpenChat }) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
      <div className="text-6xl mb-4">✅</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
      <p className="text-gray-600 mb-6">
        {selectedHelper?.name} is on the way for {selectedService?.name}. Estimated arrival in {selectedHelper?.arrivalTime} minutes.
      </p>
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 mb-2">
          <MapPin size={16} />
          <span>Helper has your location</span>
        </div>
        <p className="text-xs text-gray-500">{userLocation.address}</p>
      </div>
      <div className="space-y-3">
        <button onClick={onOpenChat} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition flex items-center justify-center space-x-2">
          <MessageCircle size={20} />
          <span>Chat with Helper</span>
        </button>
        <button onClick={onNewBooking} className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition">
          Book Another Service
        </button>
      </div>
    </div>
  </div>
)

export default BookingConfirmedScreen


