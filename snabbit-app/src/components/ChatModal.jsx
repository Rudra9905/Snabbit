import React from 'react'
import { X, Send, Phone, Plus } from 'lucide-react'

const ChatModal = ({ userRole, selectedHelper, messages, newMessage, setNewMessage, onSend, onClose, darkMode }) => (
  <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
    <div className="absolute inset-0 bg-black/40" onClick={onClose} />
    <div className={`relative ${darkMode ? 'bg-gray-800' : 'bg-white'} w-full sm:max-w-md sm:rounded-xl sm:shadow-2xl max-h-[80vh] flex flex-col`}>
      <div className={`p-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center justify-between`}>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="text-2xl">{selectedHelper?.avatar || '🗨️'}</div>
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div>
            <div className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{userRole === 'customer' ? selectedHelper?.name : 'Customer'}</div>
            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Online • Responds in ~{selectedHelper?.responseTime || 5} min</div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
            <Phone size={16} />
          </button>
          <button onClick={onClose} className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-700`}>
            <X size={20} />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[80%] ${m.sender === userRole ? 'ml-auto' : 'mr-auto'}`}>
            <div className={`p-3 rounded-2xl text-sm ${m.sender === userRole ? 'bg-blue-500 text-white rounded-br-sm' : darkMode ? 'bg-gray-700 text-gray-200 rounded-bl-sm' : 'bg-gray-100 text-gray-800 rounded-bl-sm'}`}>
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
            <div className={`text-[10px] mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'} ${m.sender === userRole ? 'text-right' : 'text-left'}`}>{m.time}</div>
          </div>
        ))}
      </div>
      <div className={`p-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'} flex items-center space-x-2`}>
        <button className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} p-2`}>
          <Plus size={18} />
        </button>
        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); onSend() } }} placeholder="Type a message..." className={`flex-1 px-3 py-2 border ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`} />
        <button onClick={onSend} className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg">
          <Send size={18} />
        </button>
      </div>
    </div>
  </div>
)

export default ChatModal


