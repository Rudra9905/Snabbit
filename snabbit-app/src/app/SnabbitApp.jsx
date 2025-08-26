import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { MapPin, Clock } from 'lucide-react'

import LoginScreen from '../screens/LoginScreen'
import ServicesScreen from '../screens/ServicesScreen'
import HelpersScreen from '../screens/HelpersScreen'
import BookingScreen from '../screens/BookingScreen'
import BookingConfirmedScreen from '../screens/BookingConfirmedScreen'
import HelperRegistrationScreen from '../screens/HelperRegistrationScreen'
import HelperDashboardScreen from '../screens/HelperDashboardScreen'
import CustomerDashboardScreen from '../screens/CustomerDashboardScreen'
import ChatModal from '../components/ChatModal'

const SnabbitApp = () => {
  const [currentView, setCurrentView] = useState('login')
  const [userRole, setUserRole] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedHelper, setSelectedHelper] = useState(null)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentBooking, setCurrentBooking] = useState(null)
  const [notifications, setNotifications] = useState([])
  const [favorites, setFavorites] = useState([])
  const [reviewMode, setReviewMode] = useState(false)
  const [selectedRating, setSelectedRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [emergencyMode, setEmergencyMode] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([20, 100])
  const [sortBy, setSortBy] = useState('time')
  const [showHistory, setShowHistory] = useState(false)

  // Location and profile state
  const [userLocation, setUserLocation] = useState({
    address: 'Downtown, NYC',
    coords: { lat: 40.7589, lng: -73.9851 },
    accuracy: 'high'
  })

  // Enhanced helper profile
  const [helperProfile, setHelperProfile] = useState({
    name: '',
    location: '',
    coords: null,
    skills: [],
    isAvailable: false,
    customPrices: {},
    bio: '',
    experience: '',
    rating: 4.5,
    completedJobs: 0,
    phone: '',
    email: '',
    profileImage: null,
    verificationStatus: 'pending',
    languages: [],
    workingHours: { start: '09:00', end: '18:00' },
    emergencyService: false,
    responseTime: 15,
    badges: [],
    portfolio: []
  })

  const [helperRegistered, setHelperRegistered] = useState(false)
  const [activeRequests, setActiveRequests] = useState([])
  const [bookingHistory, setBookingHistory] = useState([])
  const [earnings, setEarnings] = useState({ daily: 0, weekly: 0, monthly: 0 })

  // Custom requests state
  const [customRequests, setCustomRequests] = useState([])

  // Enhanced services with categories and emergency options
  const services = useMemo(() => ([
    { id: 1, name: 'Tech Support', icon: '💻', basePrice: 40, time: '30-60 min', category: 'Technology', emergency: true, description: 'Computer repairs, software issues, setup' },
    { id: 2, name: 'Furniture Assembly', icon: '🔧', basePrice: 50, time: '45-90 min', category: 'Home', emergency: false, description: 'IKEA, furniture setup, mounting' },
    { id: 3, name: 'House Cleaning', icon: '🧹', basePrice: 35, time: '60-120 min', category: 'Home', emergency: false, description: 'Deep cleaning, regular maintenance' },
    { id: 4, name: 'Delivery Service', icon: '📦', basePrice: 25, time: '15-45 min', category: 'Logistics', emergency: true, description: 'Same-day delivery, pickup service' },
    { id: 5, name: 'Pet Care', icon: '🐕', basePrice: 30, time: '30-90 min', category: 'Pet Services', emergency: true, description: 'Walking, sitting, emergency care' },
    { id: 6, name: 'Tutoring', icon: '📚', basePrice: 45, time: '45-90 min', category: 'Education', emergency: false, description: 'Academic help, test prep, languages' },
    { id: 7, name: 'Plumbing', icon: '🔧', basePrice: 60, time: '30-120 min', category: 'Home', emergency: true, description: 'Leaks, repairs, installations' },
    { id: 8, name: 'Electrical Work', icon: '⚡', basePrice: 70, time: '30-90 min', category: 'Home', emergency: true, description: 'Wiring, outlets, lighting' },
    { id: 9, name: 'Locksmith', icon: '🔐', basePrice: 80, time: '15-30 min', category: 'Security', emergency: true, description: '24/7 lockout service, key cutting' },
    { id: 10, name: 'Car Help', icon: '🚗', basePrice: 90, time: '30-60 min', category: 'Automotive', emergency: true, description: 'Jump start, flat tire, towing' },
    { id: 11, name: 'Photography', icon: '📸', basePrice: 100, time: '60-180 min', category: 'Creative', emergency: false, description: 'Events, portraits, product photos' },
    { id: 12, name: 'Moving Help', icon: '📦', basePrice: 40, time: '120-240 min', category: 'Logistics', emergency: false, description: 'Packing, loading, small moves' }
  ]), [])

  // Enhanced helpers with more detailed profiles
  const helpers = useMemo(() => ([
    { 
      id: 1, 
      name: 'Sarah Johnson', 
      rating: 4.9, 
      distance: 0.3, 
      price: 45, 
      arrivalTime: 12, 
      avatar: '👩', 
      skills: ['Tech Support', 'Tutoring'], 
      reviews: 127,
      coords: { lat: 40.7580, lng: -73.9855 },
      isAvailable: true,
      phone: '+1-555-0123',
      verified: true,
      badges: ['Fast Response', 'Top Rated'],
      languages: ['English', 'Spanish'],
      responseTime: 5,
      emergencyService: true,
      profileImage: null,
      completedJobs: 234,
      joinedDate: '2023-01-15'
    },
    { 
      id: 2, 
      name: 'Mike Chen', 
      rating: 4.8, 
      distance: 0.5, 
      price: 50, 
      arrivalTime: 15, 
      avatar: '👨', 
      skills: ['Furniture Assembly', 'Delivery Service', 'Moving Help'], 
      reviews: 89,
      coords: { lat: 40.7595, lng: -73.9845 },
      isAvailable: true,
      phone: '+1-555-0124',
      verified: true,
      badges: ['Reliable', 'Strong Helper'],
      languages: ['English', 'Mandarin'],
      responseTime: 8,
      emergencyService: false,
      profileImage: null,
      completedJobs: 156,
      joinedDate: '2023-03-22'
    },
    { 
      id: 3, 
      name: 'Lisa Rodriguez', 
      rating: 4.9, 
      distance: 0.7, 
      price: 35, 
      arrivalTime: 10, 
      avatar: '👩‍🦱', 
      skills: ['House Cleaning', 'Pet Care'], 
      reviews: 156,
      coords: { lat: 40.7600, lng: -73.9840 },
      isAvailable: true,
      phone: '+1-555-0125',
      verified: true,
      badges: ['Super Clean', 'Pet Lover'],
      languages: ['English', 'Spanish'],
      responseTime: 3,
      emergencyService: true,
      profileImage: null,
      completedJobs: 289,
      joinedDate: '2022-11-10'
    },
    { 
      id: 4, 
      name: 'David Kim', 
      rating: 4.7, 
      distance: 1.1, 
      price: 60, 
      arrivalTime: 18, 
      avatar: '👨‍💼', 
      skills: ['Plumbing', 'Electrical Work'], 
      reviews: 73,
      coords: { lat: 40.7620, lng: -73.9820 },
      isAvailable: true,
      phone: '+1-555-0126',
      verified: true,
      badges: ['Licensed Pro', 'Emergency Ready'],
      languages: ['English', 'Korean'],
      responseTime: 12,
      emergencyService: true,
      profileImage: null,
      completedJobs: 98,
      joinedDate: '2023-06-01'
    }
  ]), [])

  // Initialize location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation((prev) => ({
            ...prev,
            coords: { lat: position.coords.latitude, lng: position.coords.longitude },
          }))
        },
        () => {}
      )
    }
  }, [])

  // Mock messages
  const mockMessages = useMemo(
    () => [
      { id: 1, sender: 'helper', text: 'Hi! I can help you with your request. What seems to be the issue?', time: '2:30 PM' },
      { id: 2, sender: 'customer', text: 'I need help with my laptop running slowly.', time: '2:32 PM' },
      { id: 3, sender: 'helper', text: 'No problem! I can be there in 12 minutes with my toolkit.', time: '2:33 PM' },
    ],
    []
  )

  useEffect(() => {
    if (selectedHelper) setMessages(mockMessages)
  }, [selectedHelper, mockMessages])

  const handleLogin = (role, details = null) => {
    setUserRole(role)
    setUserDetails(details)
    
    // If helper is signing up, pre-fill their profile
    if (role === 'helper' && details && details.authMode === 'signup') {
      setHelperProfile(prev => ({
        ...prev,
        name: `${details.firstName} ${details.lastName}`,
        email: details.email,
        phone: details.phone,
        location: details.location
      }))
    }
    
    if (role === 'customer') {
      setCurrentView('customer-dashboard')
    } else {
      setCurrentView(helperRegistered ? 'helper-dashboard' : 'helper-registration')
    }
  }

  const handleServiceSelect = (service) => {
    setSelectedService(service)
    setCurrentView('helpers')
  }

  const handleHelperSelect = (helper) => {
    setSelectedHelper(helper)
    setCurrentView('booking')
  }

  const handleBooking = () => {
    const booking = {
      id: Date.now(),
      service: selectedService,
      helper: selectedHelper,
      customerLocation: userLocation,
      timestamp: new Date(),
      status: 'confirmed',
      paymentMethod,
      customer: userDetails
    }
    setCurrentBooking(booking)
    setBookingHistory((prev) => [booking, ...prev])
    setCurrentView('booking-confirmed')
    setActiveRequests((prev) => [...prev, { ...booking, customerLocation: userLocation }])
  }

  const handleSendMessage = useCallback(() => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        sender: userRole,
        text: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, message])
      setNewMessage('')
    }
  }, [newMessage, messages.length, userRole])

  const availableHelpers = useMemo(() => {
    let filtered = helpers.filter(
      (helper) =>
        helper.isAvailable &&
        selectedService &&
        helper.skills.includes(selectedService.name) &&
        helper.distance <= 5
    )
    switch (sortBy) {
      case 'time':
        filtered = filtered.sort((a, b) => a.arrivalTime - b.arrivalTime)
        break
      case 'price':
        filtered = filtered.sort((a, b) => a.price - b.price)
        break
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'distance':
        filtered = filtered.sort((a, b) => a.distance - b.distance)
        break
      default:
        break
    }
    return filtered
  }, [helpers, selectedService, sortBy])

  return (
    <>
      {currentView === 'login' && (
        <LoginScreen
          onLogin={handleLogin}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setEmergencyMode={setEmergencyMode}
        />
      )}
      {currentView === 'customer-dashboard' && (
        <CustomerDashboardScreen
          userDetails={userDetails}
          bookingHistory={bookingHistory}
          onBackToServices={() => setCurrentView('services')}
          onOpenChat={() => setChatOpen(true)}
          darkMode={darkMode}
        />
      )}
      {currentView === 'services' && (
        <ServicesScreen
          userLocation={userLocation}
          services={services}
          helpers={helpers}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectService={handleServiceSelect}
          darkMode={darkMode}
          emergencyMode={emergencyMode}
          setEmergencyMode={setEmergencyMode}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          notifications={notifications}
          setShowHistory={setShowHistory}
        />
      )}
      {currentView === 'helpers' && (
        <HelpersScreen
          selectedService={selectedService}
          availableHelpers={availableHelpers}
          onBack={() => setCurrentView('services')}
          onSelectHelper={handleHelperSelect}
          onOpenChat={(helper) => {
            setSelectedHelper(helper)
            setChatOpen(true)
          }}
          darkMode={darkMode}
          sortBy={sortBy}
          setSortBy={setSortBy}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      )}
      {currentView === 'booking' && (
        <BookingScreen
          selectedService={selectedService}
          selectedHelper={selectedHelper}
          userLocation={userLocation}
          onBack={() => setCurrentView('helpers')}
          onConfirm={handleBooking}
          onOpenChat={() => setChatOpen(true)}
        />
      )}
      {currentView === 'booking-confirmed' && (
        <BookingConfirmedScreen
          selectedService={selectedService}
          selectedHelper={selectedHelper}
          userLocation={userLocation}
          onNewBooking={() => {
            setSelectedHelper(null)
            setSelectedService(null)
            setCurrentBooking(null)
            setCurrentView('services')
          }}
          onOpenChat={() => setChatOpen(true)}
        />
      )}
      {currentView === 'helper-registration' && (
        <HelperRegistrationScreen
          services={services}
          helperProfile={helperProfile}
          setHelperProfile={setHelperProfile}
          onBack={() => setCurrentView('login')}
          onComplete={() => {
            setHelperRegistered(true)
            setCurrentView('helper-dashboard')
          }}
        />
      )}
      {currentView === 'helper-dashboard' && (
        <HelperDashboardScreen
          helperProfile={helperProfile}
          setHelperProfile={setHelperProfile}
          activeRequests={activeRequests}
          services={services}
          onEdit={() => setCurrentView('helper-registration')}
          onBackToLogin={() => setCurrentView('login')}
          onOpenChat={() => setChatOpen(true)}
          darkMode={darkMode}
        />
      )}

      {chatOpen && (
        <ChatModal
          userRole={userRole}
          selectedHelper={selectedHelper}
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          onSend={handleSendMessage}
          onClose={() => setChatOpen(false)}
          darkMode={darkMode}
        />
      )}
    </>
  )
}

export default SnabbitApp


