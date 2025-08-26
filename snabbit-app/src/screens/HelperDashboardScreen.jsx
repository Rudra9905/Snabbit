import React from 'react'
import { Bell, LogOut, Settings, MapPin, Clock } from 'lucide-react'

const HelperDashboardScreen = ({ helperProfile, setHelperProfile, activeRequests, services, onEdit, onLogout, onOpenChat, onLocationEdit, onShowHistory }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Helper Dashboard</h1>
          <p className="text-sm text-gray-600">Welcome back, {helperProfile.name || 'Helper'}!</p>
        </div>
        <div className="flex items-center space-x-3">
          <button onClick={onShowHistory} className="relative">
            <Clock size={20} className="text-gray-500" />
          </button>
          <Bell size={20} className="text-gray-500" />
          <button 
            onClick={onLogout} 
            className="p-2 rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
        <div>
          <h3 className="font-semibold text-gray-800">Work Availability</h3>
          <p className="text-sm text-gray-600">{helperProfile.isAvailable ? 'You are accepting requests' : 'You are offline'}</p>
        </div>
        <button onClick={() => setHelperProfile({ ...helperProfile, isAvailable: !helperProfile.isAvailable })} className={`relative w-12 h-6 rounded-full transition-colors ${helperProfile.isAvailable ? 'bg-green-500' : 'bg-gray-300'}`}>
          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${helperProfile.isAvailable ? 'translate-x-7' : 'translate-x-1'}`} />
        </button>
      </div>
    </div>
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-600">{activeRequests.length}</div>
          <div className="text-xs text-gray-600">Active Requests</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-green-600">${helperProfile.completedJobs * 45}</div>
          <div className="text-xs text-gray-600">Earned This Week</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-yellow-600">{helperProfile.rating}</div>
          <div className="text-xs text-gray-600">Your Rating</div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-800">Your Services & Pricing</h3>
          <button onClick={onEdit} className="text-blue-500 text-sm font-medium flex items-center">
            <Settings size={16} className="mr-1" />
            Edit
          </button>
        </div>
        <div className="space-y-3">
          {helperProfile.skills.map((skill, index) => {
            const customPrice = helperProfile.customPrices[skill]
            const service = services.find((s) => s.name === skill)
            return (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-xl">{service?.icon}</span>
                  <span className="font-medium text-gray-800">{skill}</span>
                </div>
                <span className="text-green-600 font-semibold">${customPrice || service?.basePrice}/hr</span>
              </div>
            )
          })}
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <div className="flex justify-between mb-1">
            <span>Location:</span>
            <button 
              onClick={onLocationEdit}
              className="font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center"
            >
              <MapPin size={14} className="mr-1" />
              {helperProfile.location || 'Downtown NYC'}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Customer Requests</h3>
        {helperProfile.isAvailable ? (
          activeRequests.length > 0 ? (
            <div className="space-y-3">
              {activeRequests.map((request) => (
                <div key={request.id} className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-800">{request.service.name}</h4>
                      <p className="text-sm text-gray-600">Customer location received</p>
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
                    <span className="font-bold text-green-600">${helperProfile.customPrices[request.service.name] || request.service.basePrice}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button onClick={onOpenChat} className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium">Chat with Customer</button>
                    <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium">View Location</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">⏰</div>
              <p className="text-gray-600">No requests yet</p>
              <p className="text-sm text-gray-500">You'll get notified when customers need your services</p>
            </div>
          )
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">😴</div>
            <p className="text-gray-600">You're currently offline</p>
            <p className="text-sm text-gray-500">Turn on availability to receive requests</p>
          </div>
        )}
      </div>
    </div>
  </div>
)

export default HelperDashboardScreen


