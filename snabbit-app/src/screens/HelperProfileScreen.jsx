import React from 'react'
import { ArrowLeft, Star, MapPin, Clock } from 'lucide-react'

const HelperProfileScreen = ({ selectedHelper, onBack, onBook, darkMode }) => {
  if (!selectedHelper) {
    return (
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex items-center justify-center`}>
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl p-6 shadow`}>No helper selected.</div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 flex items-center`}>
        <button onClick={onBack} className="mr-4">
          <ArrowLeft size={24} className={darkMode ? 'text-white' : 'text-gray-800'} />
        </button>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Helper Profile</h1>
      </div>

      <div className="p-4">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm mb-4 text-center`}>
          <div className="text-6xl mx-auto mb-2">{selectedHelper.avatar}</div>
          <h3 className={`font-bold text-2xl ${darkMode ? 'text-white' : 'text-gray-800'}`}>{selectedHelper.name}</h3>
          <div className={`flex items-center justify-center text-md mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            <Star className="text-yellow-400 mr-1" size={18} fill="currentColor" />
            <span>{selectedHelper.rating} ({selectedHelper.reviews} reviews)</span>
          </div>
          <p className={`text-sm mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{selectedHelper.skills.join(', ')}</p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm mb-4`}>
          <h4 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>About {selectedHelper.name.split(' ')[0]}</h4>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{selectedHelper.bio || 'No bio provided.'}</p>
        </div>

        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm mb-28`}>
          <h4 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Recent Reviews</h4>
          <div className="space-y-4">
            {(selectedHelper.detailedReviews || []).map((review, index) => (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-b-0">
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'} fill="currentColor" />
                  ))}
                  <span className="ml-2 font-semibold text-sm">{review.name}</span>
                </div>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm`}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} fixed bottom-0 left-0 right-0 p-4 border-t`}>
        <button
          onClick={onBook}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-xl transition duration-300"
        >
          Book Now (${selectedHelper.price})
        </button>
      </div>
    </div>
  )
}

export default HelperProfileScreen