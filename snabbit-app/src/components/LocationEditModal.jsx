import React, { useState, useEffect, useRef } from 'react'
import { MapPin, X, Navigation, Search, LocateFixed, Crosshair } from 'lucide-react'

const loadGoogleMapsScript = (apiKey) => {
  return new Promise((resolve, reject) => {
    if (window.google && window.google.maps) {
      resolve(window.google)
      return
    }
    const existing = document.getElementById('google-maps-script')
    if (existing) {
      existing.addEventListener('load', () => resolve(window.google))
      existing.addEventListener('error', reject)
      return
    }
    const script = document.createElement('script')
    script.id = 'google-maps-script'
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true
    script.defer = true
    script.onload = () => resolve(window.google)
    script.onerror = reject
    document.body.appendChild(script)
  })
}

const reverseGeocodeFallback = async (lat, lng) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`)
    const data = await res.json()
    return data?.display_name || ''
  } catch (_) {
    return ''
  }
}

const geocodeAddressFallback = async (query) => {
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(query)}`)
    const data = await res.json()
    if (Array.isArray(data) && data.length > 0) {
      const first = data[0]
      return { lat: parseFloat(first.lat), lng: parseFloat(first.lon), address: first.display_name }
    }
    return null
  } catch (_) {
    return null
  }
}

const LocationEditModal = ({ 
  isOpen, 
  onClose, 
  currentLocation, 
  onSave, 
  darkMode,
  helperProfile = null,
  setHelperProfile = null
}) => {
  const initialAddress = helperProfile ? helperProfile.location : currentLocation.address
  const [locationInput, setLocationInput] = useState(initialAddress)
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [mapsReady, setMapsReady] = useState(false)
  const [selectedCoords, setSelectedCoords] = useState(currentLocation?.coords || null)
  const [selectedAddress, setSelectedAddress] = useState(initialAddress || '')
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)
  const geocoderRef = useRef(null)
  const iframeRef = useRef(null)

  const applyCoordsAndAddress = async (lat, lng, viaMap = false) => {
    const latLng = { lat, lng }
    setSelectedCoords(latLng)

    if (mapsReady && window.google && mapInstanceRef.current && markerRef.current) {
      const gLatLng = new window.google.maps.LatLng(lat, lng)
      if (!viaMap) {
        mapInstanceRef.current.setCenter(gLatLng)
        mapInstanceRef.current.setZoom(15)
        markerRef.current.setPosition(gLatLng)
      }
      if (geocoderRef.current) {
        geocoderRef.current.geocode({ location: gLatLng }, (results, status) => {
          if (status === 'OK' && results && results[0]) {
            setSelectedAddress(results[0].formatted_address)
            setLocationInput(results[0].formatted_address)
          }
        })
      }
    } else {
      const addr = await reverseGeocodeFallback(lat, lng)
      if (addr) {
        setSelectedAddress(addr)
        setLocationInput(addr)
      }
      if (iframeRef.current) {
        iframeRef.current.src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`
      }
    }
  }

  const geocodeAddress = async () => {
    const query = locationInput.trim()
    if (!query) return
    setIsSearching(true)
    setSearchError('')

    let located = false

    if (mapsReady && geocoderRef.current && window.google) {
      await new Promise((resolve) => {
        geocoderRef.current.geocode({ address: query }, async (results, status) => {
          if (status === 'OK' && results && results[0]) {
            const result = results[0]
            const loc = result.geometry.location
            await applyCoordsAndAddress(loc.lat(), loc.lng())
            located = true
          }
          resolve()
        })
      })
    }

    if (!located) {
      const res = await geocodeAddressFallback(query)
      if (res) {
        setSelectedAddress(res.address)
        await applyCoordsAndAddress(res.lat, res.lng)
        located = true
      }
    }

    if (!located && iframeRef.current) {
      iframeRef.current.src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed`
    }

    if (!located) {
      setSearchError('Could not find that address. Try a more specific query.')
    }

    setIsSearching(false)
  }

  useEffect(() => {
    if (!isOpen) return

    const apiKey = import.meta?.env?.VITE_GOOGLE_MAPS_API_KEY

    const initMap = async () => {
      if (!apiKey) {
        setMapsReady(false)
      } else {
        try {
          const google = await loadGoogleMapsScript(apiKey)
          geocoderRef.current = new google.maps.Geocoder()
          const center = selectedCoords || { lat: 40.7589, lng: -73.9851 }
          mapInstanceRef.current = new google.maps.Map(mapRef.current, {
            center,
            zoom: 14,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
          })
          markerRef.current = new google.maps.Marker({
            position: center,
            map: mapInstanceRef.current,
            draggable: true,
          })

          const handlePlaceChange = (latLng) => {
            applyCoordsAndAddress(latLng.lat(), latLng.lng(), true)
          }

          google.maps.event.addListener(mapInstanceRef.current, 'click', (e) => {
            markerRef.current.setPosition(e.latLng)
            handlePlaceChange(e.latLng)
          })

          google.maps.event.addListener(markerRef.current, 'dragend', (e) => {
            handlePlaceChange(e.latLng)
          })

          setMapsReady(true)
        } catch (_) {
          setMapsReady(false)
        }
      }

      setIsLoading(true)
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            await applyCoordsAndAddress(pos.coords.latitude, pos.coords.longitude)
            setIsLoading(false)
          },
          async () => {
            if (selectedCoords) {
              await applyCoordsAndAddress(selectedCoords.lat, selectedCoords.lng)
            }
            setIsLoading(false)
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        )
      } else {
        setIsLoading(false)
      }
    }

    initMap()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const handleSave = () => {
    const hasCoords = !!selectedCoords
    const addressToUse = locationInput.trim() || selectedAddress
    if (!addressToUse && !hasCoords) return

    if (helperProfile && setHelperProfile) {
      setHelperProfile(prev => ({
        ...prev,
        location: addressToUse
      }))
    } else {
      const newLocation = {
        ...currentLocation,
        address: addressToUse,
        coords: hasCoords ? selectedCoords : currentLocation.coords,
      }
      onSave(newLocation)
    }
    onClose()
  }

  const handleUseGPS = () => {
    setIsLoading(true)
    if (!navigator.geolocation) {
      setIsLoading(false)
      return
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await applyCoordsAndAddress(position.coords.latitude, position.coords.longitude)
        setIsLoading(false)
      },
      () => {
        setIsLoading(false)
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  const recenterOnMarker = () => {
    if (mapsReady && window.google && mapInstanceRef.current && markerRef.current) {
      mapInstanceRef.current.setCenter(markerRef.current.getPosition())
      mapInstanceRef.current.setZoom(15)
    }
  }

  const googleEmbedSrc = selectedCoords
    ? `https://www.google.com/maps?q=${selectedCoords.lat},${selectedCoords.lng}&z=15&output=embed`
    : `https://www.google.com/maps?q=${encodeURIComponent(locationInput || 'near me')}&z=12&output=embed`

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl p-6 w-full max-w-2xl`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Location</h2>
          <button
            onClick={onClose}
            className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Search or enter address
              </label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={16} />
                <input
                  type="text"
                  value={locationInput}
                  onChange={(e) => setLocationInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isSearching) geocodeAddress()
                  }}
                  placeholder="Enter your address or location"
                  className={`w-full pl-10 pr-24 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-300 bg-white'
                  }`}
                />
                <button
                  onClick={geocodeAddress}
                  disabled={isSearching}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded ${isSearching ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  {isSearching ? 'Searching…' : 'Search'}
                </button>
              </div>
              {searchError && (
                <p className="text-red-500 text-xs mt-1">{searchError}</p>
              )}
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Pick on map
                </label>
                <div className="flex items-center space-x-2">
                  {mapsReady && (
                    <button onClick={recenterOnMarker} className={`inline-flex items-center space-x-1 px-2 py-1 rounded ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}>
                      <Crosshair size={14} />
                      <span>Re-center</span>
                    </button>
                  )}
                  <button
                    onClick={handleUseGPS}
                    disabled={isLoading}
                    className={`inline-flex items-center space-x-1 px-2 py-1 rounded ${isLoading ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                  >
                    <LocateFixed size={14} />
                    <span>{isLoading ? 'Locating…' : 'Use my location'}</span>
                  </button>
                </div>
              </div>
              <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`} style={{ height: 320 }}>
                {mapsReady ? (
                  <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
                ) : (
                  <iframe ref={iframeRef} title="map-preview" src={googleEmbedSrc} style={{ width: '100%', height: '100%', border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                )}
              </div>
              <div className="flex items-center justify-between mt-2 text-xs">
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <MapPin size={14} className="mr-1 text-blue-500" />
                  <span className="truncate max-w-[85%]">{selectedAddress || locationInput || 'No address selected'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-2">
            <button
              onClick={onClose}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`flex-1 py-3 px-4 rounded-lg font-medium transition bg-blue-500 hover:bg-blue-600 text-white`}
            >
              Save Location
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationEditModal

