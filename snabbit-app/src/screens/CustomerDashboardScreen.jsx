import React, { useState } from 'react'
import { 
  User, Settings, Bell, MapPin, Phone, Mail, Calendar, 
  Clock, Star, DollarSign, Edit, Save, X, Plus, Trash2,
  CheckCircle, AlertCircle, Eye, EyeOff, Camera, Upload,
  Shield, Award, Briefcase, Languages, Wifi, Battery,
  MessageCircle, Search, Filter, Clock3, DollarSign as DollarIcon,
  CreditCard, Wallet, Banknote, Smartphone, QrCode,
  Download, ArrowUpRight, ArrowDownLeft, RefreshCw, Gift, FileText
} from 'lucide-react'
import ExportService from '../services/exportService'

const CustomerDashboardScreen = ({ 
  userDetails, 
  bookingHistory, 
  onBackToServices, 
  onOpenChat,
  darkMode 
}) => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showCustomRequestModal, setShowCustomRequestModal] = useState(false)
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [addMoneyAmount, setAddMoneyAmount] = useState('')
  const [showExportModal, setShowExportModal] = useState(false)
  const [exportType, setExportType] = useState('wallet')
  const [customRequest, setCustomRequest] = useState({
    title: '',
    description: '',
    category: '',
    urgency: 'normal',
    budget: '',
    preferredTime: '',
    location: ''
  })

  const handleCustomRequestSubmit = () => {
    // This would typically send the request to nearby helpers
    console.log('Custom request submitted:', customRequest)
    setShowCustomRequestModal(false)
    setCustomRequest({
      title: '',
      description: '',
      category: '',
      urgency: 'normal',
      budget: '',
      preferredTime: '',
      location: ''
    })
  }

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'emergency': return 'bg-red-100 text-red-800'
      case 'urgent': return 'bg-orange-100 text-orange-800'
      case 'normal': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  // Mock wallet data for export
  const mockWalletData = {
    accountName: 'John Doe',
    period: 'Current Month',
    openingBalance: 0.00,
    totalAdded: 500.00,
    totalSpent: 254.50,
    cashbackEarned: 15.00,
    closingBalance: 245.50,
    transactions: [
      {
        date: 'Today, 2:30 PM',
        description: 'Website Design Service',
        type: 'Payment',
        amount: -150.00,
        balance: 245.50,
        status: 'Completed'
      },
      {
        date: 'Yesterday, 4:15 PM',
        description: 'Wallet Recharge',
        type: 'Recharge',
        amount: 200.00,
        balance: 395.50,
        status: 'Completed'
      },
      {
        date: 'Yesterday, 4:15 PM',
        description: 'Cashback Reward',
        type: 'Reward',
        amount: 15.00,
        balance: 195.50,
        status: 'Reward'
      },
      {
        date: '2 days ago',
        description: 'Garden Landscaping',
        type: 'Payment',
        amount: -200.00,
        balance: 180.50,
        status: 'Completed'
      }
    ]
  }

  // Mock transaction data for export
  const mockTransactions = [
    {
      date: 'Today, 2:30 PM',
      description: 'Website Design Service',
      type: 'Payment',
      amount: -150.00,
      status: 'completed',
      paymentMethod: 'Wallet'
    },
    {
      date: 'Yesterday, 4:15 PM',
      description: 'Wallet Recharge',
      type: 'Recharge',
      amount: 200.00,
      status: 'completed',
      paymentMethod: 'UPI'
    },
    {
      date: 'Yesterday, 4:15 PM',
      description: 'Cashback Reward',
      type: 'Reward',
      amount: 15.00,
      status: 'reward',
      paymentMethod: 'Platform'
    },
    {
      date: '2 days ago',
      description: 'Garden Landscaping',
      type: 'Payment',
      amount: -200.00,
      status: 'completed',
      paymentMethod: 'Wallet'
    }
  ]

  const handleExport = (type) => {
    try {
      console.log('Starting export for type:', type)
      
      switch (type) {
        case 'wallet':
          console.log('Exporting wallet statement...')
          ExportService.downloadWalletStatement(mockWalletData)
          break
        case 'transactions':
          console.log('Exporting transaction report...')
          ExportService.downloadTransactionReport(mockTransactions, 'customer')
          break
        default:
          console.warn('Unknown export type:', type)
          break
      }
      
      console.log('Export completed successfully')
      setShowExportModal(false)
    } catch (error) {
      console.error('Export failed:', error)
      alert(`Export failed: ${error.message || 'Unknown error occurred. Please try again.'}`)
    }
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-4`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">👤</div>
            <div>
              <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Customer Dashboard
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Welcome back, {userDetails?.firstName || 'Customer'}!
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="relative">
              <Bell size={20} className={darkMode ? 'text-gray-300' : 'text-gray-500'} />
            </button>
            <button
              onClick={onBackToServices}
              className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
            >
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3">
          <button
            onClick={() => setShowCustomRequestModal(true)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium transition flex items-center justify-center space-x-2"
          >
            <Plus size={20} />
            <span>Request Custom Help</span>
          </button>
          <button
            onClick={onBackToServices}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-xl font-medium transition flex items-center justify-center space-x-2"
          >
            <Search size={20} />
            <span>Browse Services</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="flex space-x-8 px-4">
          {['overview', 'custom-requests', 'bookings', 'wallet', 'profile'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-1 border-b-2 font-medium text-sm capitalize transition-colors ${
                activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : darkMode ? 'border-transparent text-gray-400 hover:text-gray-300' : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  {bookingHistory?.length || 0}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Bookings</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  {bookingHistory?.filter(b => b.status === 'completed').length || 0}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</div>
              </div>
              <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm text-center`}>
                <div className={`text-2xl font-bold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  {bookingHistory?.filter(b => b.status === 'active').length || 0}
                </div>
                <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Recent Activity
              </h3>
              {bookingHistory && bookingHistory.length > 0 ? (
                <div className="space-y-3">
                  {bookingHistory.slice(0, 3).map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {booking.service.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Helper: {booking.helper.name}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                            <span className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              {booking.customerLocation.address}
                            </span>
                            <span className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {new Date(booking.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-gray-600">No bookings yet</p>
                  <p className="text-sm text-gray-500">
                    Start by requesting help or browsing services
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Custom Requests Tab */}
        {activeTab === 'custom-requests' && (
          <div className="space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Custom Help Requests
                </h3>
                <button
                  onClick={() => setShowCustomRequestModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  <Plus size={16} className="inline mr-2" />
                  New Request
                </button>
              </div>

              <div className="text-center py-8">
                <div className="text-4xl mb-4">💡</div>
                <p className="text-gray-600">No custom requests yet</p>
                <p className="text-sm text-gray-500 mb-4">
                  Create a custom request for specialized help
                </p>
                <button
                  onClick={() => setShowCustomRequestModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                >
                  Create Your First Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Booking History
              </h3>
              {bookingHistory && bookingHistory.length > 0 ? (
                <div className="space-y-3">
                  {bookingHistory.map((booking) => (
                    <div
                      key={booking.id}
                      className="border border-gray-200 rounded-lg p-3"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {booking.service.name}
                          </h4>
                          <p className="text-sm text-gray-600">
                            Helper: {booking.helper.name}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 mt-1 space-x-3">
                            <span className="flex items-center">
                              <MapPin size={12} className="mr-1" />
                              {booking.customerLocation.address}
                            </span>
                            <span className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {new Date(booking.timestamp).toLocaleDateString()}
                            </span>
                            <span className="flex items-center">
                              <DollarIcon size={12} className="mr-1" />
                              ${booking.helper.price}
                            </span>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {booking.status}
                        </span>
                      </div>

                      {booking.status === 'active' && (
                        <div className="flex space-x-2 mt-3">
                          <button
                            onClick={() => onOpenChat()}
                            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm font-medium"
                          >
                            <MessageCircle size={16} className="inline mr-2" />
                            Chat with Helper
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-4xl mb-4">📋</div>
                  <p className="text-gray-600">No bookings yet</p>
                  <p className="text-sm text-gray-500">
                    Start by requesting help or browsing services
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Wallet Tab */}
        {activeTab === 'wallet' && (
          <div className="space-y-6">
            {/* Wallet Balance */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Wallet Balance
                </h3>
                <button
                  onClick={() => setShowAddMoneyModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  <Plus size={16} className="inline mr-2" />
                  Add Money
                </button>
              </div>
              
              <div className="text-center">
                <div className={`text-4xl font-bold ${darkMode ? 'text-green-400' : 'text-green-600'} mb-2`}>
                  $245.50
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Available Balance
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className={`text-lg font-semibold ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                    $500.00
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Added
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-semibold ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                    $254.50
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Total Spent
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-semibold ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                    $15.00
                  </div>
                  <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Cashback
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Payment Methods
                </h3>
                <button
                  onClick={() => setShowWalletModal(true)}
                  className="text-blue-500 text-sm font-medium flex items-center"
                >
                  <Plus size={16} className="mr-1" />
                  Add Payment Method
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* UPI Payment */}
                <div className={`border ${darkMode ? 'border-gray-600' : 'border-gray-200'} rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Smartphone size={20} className="text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">UPI</h4>
                        <p className="text-sm text-gray-600">customer@okicici</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                      <button className="p-1 text-gray-400 hover:text-blue-500">
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>• Instant digital payments</p>
                    <p>• QR code scanning</p>
                    <p>• No transaction fees</p>
                  </div>
                </div>

                {/* Credit/Debit Card */}
                <div className={`border ${darkMode ? 'border-gray-600' : 'border-gray-200'} rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <CreditCard size={20} className="text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Card Payment</h4>
                        <p className="text-sm text-gray-600">**** **** **** 1234</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        Active
                      </span>
                      <button className="p-1 text-gray-400 hover:text-blue-500">
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>• Secure card payments</p>
                    <p>• Visa/Mastercard accepted</p>
                    <p>• 2-3% transaction fee</p>
                  </div>
                </div>

                {/* Digital Wallet */}
                <div className={`border ${darkMode ? 'border-gray-600' : 'border-gray-200'} rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Wallet size={20} className="text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Paytm</h4>
                        <p className="text-sm text-gray-600">+91 98765 43210</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        Active
                      </span>
                      <button className="p-1 text-gray-400 hover:text-blue-500">
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>• Popular digital wallet</p>
                    <p>• Quick payment processing</p>
                    <p>• 1-2% transaction fee</p>
                  </div>
                </div>

                {/* Cash Payment */}
                <div className={`border ${darkMode ? 'border-gray-600' : 'border-gray-200'} rounded-lg p-4`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Banknote size={20} className="text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Cash</h4>
                        <p className="text-sm text-gray-600">Physical cash payment</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        Available
                      </span>
                      <button className="p-1 text-gray-400 hover:text-blue-500">
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p>• Pay with cash</p>
                    <p>• No transaction fees</p>
                    <p>• Immediate settlement</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                  Recent Transactions
                </h3>
                <button 
                  onClick={() => setShowExportModal(true)}
                  className="text-blue-500 text-sm font-medium flex items-center hover:text-blue-600"
                >
                  <Download size={16} className="mr-1" />
                  Export
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <ArrowUpRight size={16} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Website Design Service</h4>
                      <p className="text-sm text-gray-600">Payment to John Doe</p>
                      <p className="text-xs text-gray-500">Today, 2:30 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">-$150.00</div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <ArrowDownLeft size={16} className="text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Wallet Recharge</h4>
                      <p className="text-sm text-gray-600">Added via UPI</p>
                      <p className="text-xs text-gray-500">Yesterday, 4:15 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">+$200.00</div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <Gift size={16} className="text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Cashback Reward</h4>
                      <p className="text-sm text-gray-600">First booking bonus</p>
                      <p className="text-xs text-gray-500">Yesterday, 4:15 PM</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">+$15.00</div>
                    <div className="text-xs text-gray-500">Reward</div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <ArrowUpRight size={16} className="text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">Garden Landscaping</h4>
                      <p className="text-sm text-gray-600">Payment to Sarah Smith</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">-$200.00</div>
                    <div className="text-xs text-gray-500">Completed</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={() => setShowAddMoneyModal(true)}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Plus size={20} className="text-blue-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-800">Add Money</h4>
                    <p className="text-sm text-gray-600">Recharge your wallet</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setShowWalletModal(true)}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition`}
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CreditCard size={20} className="text-green-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-800">Payment Methods</h4>
                    <p className="text-sm text-gray-600">Manage payment options</p>
                  </div>
                </div>
              </button>

              <button className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm border ${darkMode ? 'border-gray-600' : 'border-gray-200'} hover:shadow-md transition`}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Gift size={20} className="text-purple-600" />
                  </div>
                  <div className="text-left">
                    <h4 className="font-medium text-gray-800">Rewards</h4>
                    <p className="text-sm text-gray-600">View cashback & offers</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
              <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-800'} mb-4`}>
                Profile Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="text-4xl">👤</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {userDetails?.firstName} {userDetails?.lastName}
                    </h4>
                    <p className="text-sm text-gray-600">{userDetails?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <Phone size={16} className="text-gray-400" />
                    <span>{userDetails?.phone || 'No phone added'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail size={16} className="text-gray-400" />
                    <span>{userDetails?.email || 'No email added'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{userDetails?.location || 'No location added'}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-gray-400" />
                    <span>{userDetails?.dateOfBirth || 'No date added'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Custom Request Modal */}
      {showCustomRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Request Custom Help
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Request Title
                </label>
                <input
                  type="text"
                  value={customRequest.title}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, title: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Brief title for your request"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Description
                </label>
                <textarea
                  value={customRequest.description}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, description: e.target.value }))}
                  rows="3"
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Describe what you need help with..."
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Category
                </label>
                <select
                  value={customRequest.category}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, category: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a category</option>
                  <option value="home">Home & Garden</option>
                  <option value="tech">Technology</option>
                  <option value="creative">Creative & Design</option>
                  <option value="business">Business & Professional</option>
                  <option value="health">Health & Wellness</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Urgency Level
                </label>
                <select
                  value={customRequest.urgency}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, urgency: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                >
                  <option value="normal">Normal (Within 24 hours)</option>
                  <option value="urgent">Urgent (Within 4 hours)</option>
                  <option value="emergency">Emergency (Immediate)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Budget ($)
                  </label>
                  <input
                    type="number"
                    value={customRequest.budget}
                    onChange={(e) => setCustomRequest(prev => ({ ...prev, budget: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    placeholder="Your budget"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Preferred Time
                  </label>
                  <input
                    type="time"
                    value={customRequest.preferredTime}
                    onChange={(e) => setCustomRequest(prev => ({ ...prev, preferredTime: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Location
                </label>
                <input
                  type="text"
                  value={customRequest.location}
                  onChange={(e) => setCustomRequest(prev => ({ ...prev, location: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Where do you need help?"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={handleCustomRequestSubmit}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium"
              >
                Submit Request
              </button>
              <button
                onClick={() => setShowCustomRequestModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Add Money to Wallet
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Amount ($)
                </label>
                <input
                  type="number"
                  value={addMoneyAmount}
                  onChange={(e) => setAddMoneyAmount(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                  placeholder="Enter amount"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payment Method
                </label>
                <select 
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select payment method</option>
                  <option value="upi">UPI (customer@okicici)</option>
                  <option value="card">Card (**** **** **** 1234)</option>
                  <option value="paytm">Paytm (+91 98765 43210)</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <Shield size={16} className="text-blue-600" />
                <p className="text-sm text-blue-800">
                  Your payment is secure and encrypted
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddMoneyModal(false)
                  setAddMoneyAmount('')
                  setSelectedPaymentMethod('')
                }}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium"
              >
                Add Money
              </button>
              <button
                onClick={() => {
                  setShowAddMoneyModal(false)
                  setAddMoneyAmount('')
                  setSelectedPaymentMethod('')
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Method Modal */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Add Payment Method
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Payment Method
                </label>
                <select 
                  value={selectedPaymentMethod}
                  onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select payment method</option>
                  <option value="upi">UPI</option>
                  <option value="card">Credit/Debit Card</option>
                  <option value="wallet">Digital Wallet</option>
                  <option value="bank">Bank Transfer</option>
                </select>
              </div>

              {selectedPaymentMethod === 'upi' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    UPI ID
                  </label>
                  <input
                    type="text"
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                      darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                    }`}
                    placeholder="e.g., customer@okicici"
                  />
                </div>
              )}

              {selectedPaymentMethod === 'card' && (
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        CVV
                      </label>
                      <input
                        type="text"
                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                          darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                        }`}
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'wallet' && (
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Wallet Type
                  </label>
                  <select className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}>
                    <option value="">Select wallet</option>
                    <option value="paytm">Paytm</option>
                    <option value="phonepe">PhonePe</option>
                    <option value="gpay">Google Pay</option>
                    <option value="amazonpay">Amazon Pay</option>
                  </select>
                </div>
              )}

              {selectedPaymentMethod === 'bank' && (
                <div className="space-y-3">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Bank Name
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      placeholder="Enter bank name"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Account Number
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      placeholder="Enter account number"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      IFSC Code
                    </label>
                    <input
                      type="text"
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                        darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                      }`}
                      placeholder="Enter IFSC code"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                <Shield size={16} className="text-blue-600" />
                <p className="text-sm text-blue-800">
                  Your payment information is encrypted and secure
                </p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowWalletModal(false)
                  setSelectedPaymentMethod('')
                }}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium"
              >
                Add Payment Method
              </button>
              <button
                onClick={() => {
                  setShowWalletModal(false)
                  setSelectedPaymentMethod('')
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 w-full max-w-md`}>
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              Export Documents
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Export Type
                </label>
                <select 
                  value={exportType}
                  onChange={(e) => setExportType(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300'
                  }`}
                >
                  <option value="wallet">Wallet Statement</option>
                  <option value="transactions">Transaction Report</option>
                </select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Wallet size={20} className="text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-800">Wallet Statement</h4>
                    <p className="text-sm text-blue-600">Complete wallet balance and transaction history</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <FileText size={20} className="text-green-600" />
                  <div>
                    <h4 className="font-medium text-green-800">Transaction Report</h4>
                    <p className="text-sm text-green-600">Detailed payment and recharge history</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => handleExport(exportType)}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600"
              >
                <Download size={16} className="inline mr-2" />
                Download PDF
              </button>
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerDashboardScreen
