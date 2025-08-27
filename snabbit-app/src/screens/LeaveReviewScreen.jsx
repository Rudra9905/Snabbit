import React, { useState } from 'react'
import { Star, ArrowLeft } from 'lucide-react'

const LeaveReviewScreen = ({ selectedHelper, onBack, onSubmit, darkMode }) => {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmitReview = () => {
    onSubmit?.({ helperId: selectedHelper?.id, rating, comment })
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'} flex flex-col`}>
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4 flex items-center`}>
        <button onClick={onBack} className="mr-4">
          <ArrowLeft size={24} className={darkMode ? 'text-white' : 'text-gray-800'} />
        </button>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Leave a Review</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center p-4">
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8 w-full max-w-md mx-auto text-center`}>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'} mb-2`}>How was your experience?</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            {selectedHelper ? `With ${selectedHelper.name}` : 'With your helper'}
          </p>

          <div className="flex justify-center space-x-2 mb-6">
            {[...Array(5)].map((_, i) => (
              <button key={i} onClick={() => setRating(i + 1)} aria-label={`Rate ${i + 1} star`}>
                <Star size={36} className={i < rating ? 'text-yellow-400' : darkMode ? 'text-gray-600' : 'text-gray-300'} fill="currentColor" />
              </button>
            ))}
          </div>

          <textarea
            rows="4"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-6 ${darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'}`}
          />

          <button
            onClick={handleSubmitReview}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  )
}

export default LeaveReviewScreen