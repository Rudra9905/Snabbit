import React from 'react'
import { User, Plus, Eye, EyeOff, Zap, Shield, Award, AlertCircle, Globe } from 'lucide-react'

const LoginScreen = ({ onLogin, darkMode, setDarkMode, setEmergencyMode }) => (
  <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-500 to-purple-600'} flex items-center justify-center p-4 relative`}>
    <button onClick={() => setDarkMode(!darkMode)} className="absolute top-4 right-4 p-2 rounded-full bg-white/20 text-white">
      {darkMode ? <Eye size={20} /> : <EyeOff size={20} />}
    </button>
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-2xl shadow-xl p-8 w-full max-w-md`}>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">🐰 Snabbit</h1>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>Quick help when you need it</p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="flex items-center text-green-600"><Zap size={16} className="mr-1" />10-15 min</span>
          <span className="flex items-center text-blue-600"><Shield size={16} className="mr-1" />Verified helpers</span>
          <span className="flex items-center text-purple-600"><Award size={16} className="mr-1" />Top rated</span>
        </div>
      </div>
      <div className="space-y-4">
        <button onClick={() => onLogin('customer')} className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center space-x-3 transform hover:scale-105">
          <User size={24} />
          <span>I need help (Customer)</span>
        </button>
        <button onClick={() => onLogin('helper')} className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-4 px-6 rounded-xl transition duration-300 flex items-center justify-center space-x-3 transform hover:scale-105">
          <Plus size={24} />
          <span>I want to help (Helper)</span>
        </button>
        <div className="flex space-x-2">
          <button onClick={() => { setEmergencyMode(true); onLogin('customer') }} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center space-x-2">
            <AlertCircle size={18} />
            <span>Emergency</span>
          </button>
          <button className="flex-1 border border-gray-300 hover:bg-gray-50 font-medium py-3 px-4 rounded-xl transition duration-300 flex items-center justify-center space-x-2">
            <Globe size={18} />
            <span>Guest</span>
          </button>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>By continuing, you agree to our Terms & Privacy Policy</p>
      </div>
    </div>
  </div>
)

export default LoginScreen


