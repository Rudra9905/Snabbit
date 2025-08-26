import React from 'react'
import { ArrowLeft, DollarSign } from 'lucide-react'

const HelperRegistrationScreen = ({ services, helperProfile, setHelperProfile, onBack, onComplete }) => (
  <div className="min-h-screen bg-gray-50">
    <div className="bg-white shadow-sm p-4 flex items-center">
      <button onClick={onBack} className="mr-4">
        <ArrowLeft size={24} />
      </button>
      <div>
        <h1 className="text-xl font-bold text-gray-800">Helper Registration</h1>
        <p className="text-sm text-gray-600">Set up your helper profile</p>
      </div>
    </div>
    <div className="p-4 space-y-6">
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Basic Information</h3>
        <div className="space-y-4">
          <input type="text" placeholder="Full Name" value={helperProfile.name} onChange={(e) => setHelperProfile({ ...helperProfile, name: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <input type="text" placeholder="Location (e.g., Downtown NYC, Brooklyn, etc.)" value={helperProfile.location} onChange={(e) => setHelperProfile({ ...helperProfile, location: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <input type="tel" placeholder="Phone Number" value={helperProfile.phone} onChange={(e) => setHelperProfile({ ...helperProfile, phone: e.target.value })} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          <textarea placeholder="Brief bio about yourself and your experience..." value={helperProfile.bio} onChange={(e) => setHelperProfile({ ...helperProfile, bio: e.target.value })} rows="3" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">Select Your Services & Set Prices</h3>
        <div className="space-y-3">
          {services.map((service) => {
            const selected = helperProfile.skills.includes(service.name)
            return (
              <div key={service.id} className="border border-gray-200 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <button onClick={() => { setHelperProfile((prev) => ({ ...prev, skills: selected ? prev.skills.filter((s) => s !== service.name) : [...prev.skills, service.name], })) }} className={`flex items-center space-x-3 ${selected ? 'text-blue-600' : 'text-gray-600'}`}>
                    <div className="text-xl">{service.icon}</div>
                    <div>
                      <div className="font-medium">{service.name}</div>
                      <div className="text-xs text-gray-500">Base: ${service.basePrice}</div>
                    </div>
                  </button>
                  {selected && (
                    <div className="flex items-center space-x-2">
                      <DollarSign size={16} className="text-gray-400" />
                      <input type="number" placeholder={service.basePrice.toString()} value={helperProfile.customPrices[service.name] || ''} onChange={(e) => setHelperProfile((prev) => ({ ...prev, customPrices: { ...prev.customPrices, [service.name]: e.target.value, }, }))} className="w-20 px-2 py-1 border border-gray-300 rounded text-sm" />
                    </div>
                  )}
                </div>
                <div className={`w-full h-1 rounded ${selected ? 'bg-blue-500' : 'bg-gray-200'}`} />
              </div>
            )
          })}
        </div>
      </div>
      <button onClick={onComplete} disabled={!helperProfile.name || !helperProfile.location || helperProfile.skills.length === 0} className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-xl transition duration-300">
        Complete Registration
      </button>
    </div>
  </div>
)

export default HelperRegistrationScreen


