/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import type { Library } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

const libraries: Library[] = ["marker"];

interface RideRequest {
  passengerId: number;
  pickup: string;
  dropoff: string;
  lat: number;
  lng: number;
  fare: number;
  distance: string;
  estimatedTime: string;
}

const DriverDashboard = () => {
  const [available, setAvailable] = useState(false);
  const [location, setLocation] = useState({ lat: 24.8607, lng: 67.0011 });
  const [rideRequest, setRideRequest] = useState<RideRequest | null>(null);
  const [rideAccepted, setRideAccepted] = useState(false);
  const [earnings, setEarnings] = useState({ today: 245, total: 3420 });
  const [stats, setStats] = useState({ rides: 12, rating: 4.8, hours: 6.5 });
  const [isOnline, setIsOnline] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBQpc_YiCPcUweWtftDBcReE55vhz9i7Fs",
    libraries,
  });

  const navigate = useNavigate();
  // Mock ride request for demo
  useEffect(() => {
    if (available && !rideRequest) {
      const timer = setTimeout(() => {
        setRideRequest({
          passengerId: 12345,
          pickup: "Downtown Mall",
          dropoff: "Airport Terminal 2",
          lat: 24.8707,
          lng: 67.0111,
          fare: 85,
          distance: "12.5 km",
          estimatedTime: "18 min"
        });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [available]);

  const handleAvailabilityToggle = () => {
    setAvailable(!available);
    setIsOnline(!isOnline);
    if (rideRequest) setRideRequest(null);
  };

  const acceptRide = () => {
    if (!rideRequest) return;
    setRideAccepted(true);
    setRideRequest(null);
    setStats(prev => ({ ...prev, rides: prev.rides + 1 }));
    setEarnings(prev => ({ ...prev, today: prev.today + 85 }));
  };

  const rejectRide = () => {
    setRideRequest(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-green-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-500 rounded-full animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">🚗</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Welcome back, Driver!</h1>
              <p className="text-gray-300">Ready to start earning?</p>
            </div>
          </div>
          
          {/* Online Status Toggle */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="flex items-center space-x-3">
              <span className="text-white font-medium">Go Online</span>
              <button
                onClick={handleAvailabilityToggle}
                className={`relative w-16 h-8 rounded-full transition-all duration-300 ${
                  isOnline ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  isOnline ? 'transform translate-x-8' : 'translate-x-1'
                }`}></div>
              </button>
              <div className={`w-3 h-3 rounded-full animate-pulse ${
                isOnline ? 'bg-green-400' : 'bg-gray-400'
              }`}></div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
           onClick={()=>{navigate('/todayearning')}}
           className="bg-gradient-to-r from-green-500/20 cursor-pointer to-emerald-600/20 backdrop-blur-md p-6 rounded-2xl border border-green-500/30 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">💰</span>
              </div>
              <div
               onClick={()=>{navigate('/todayearning')}}
              >
                <p className="text-green-300 text-sm">Today's Earnings</p>
                <p className="text-white text-2xl font-bold">${earnings.today}</p>
              </div>
            </div>
          </div>

          <div 
          onClick={()=>{navigate('/todayrides')}}
          className="bg-gradient-to-r from-blue-500/20 cursor-pointer to-cyan-600/20 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🚙</span>
              </div>
              <div>
                <p className="text-blue-300 text-sm">Rides Today</p>
                <p className="text-white text-2xl font-bold">{stats.rides}</p>
              </div>
            </div>
          </div>

          <div
          onClick={()=>{navigate('/rating')}}
          className="bg-gradient-to-r cursor-pointer from-purple-500/20 to-pink-600/20 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
              <div>
                <p className="text-purple-300 text-sm">Rating</p>
                <p className="text-white text-2xl font-bold">{stats.rating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <span className="mr-2">📍</span>
              Your Location
            </h3>
            {isLoaded && (
              <div className="rounded-xl overflow-hidden">
                <GoogleMap
                  center={location}
                  zoom={14}
                  mapContainerStyle={{ height: "300px", width: "100%" }}
                  onLoad={(map) => {
                    mapRef.current = map;
                  }}
                  options={{
                    styles: [
                      {
                        featureType: "all",
                        elementType: "geometry",
                        stylers: [{ color: "#1f2937" }]
                      },
                      {
                        featureType: "water",
                        elementType: "all",
                        stylers: [{ color: "#374151" }]
                      }
                    ]
                  }}
                />
              </div>
            )}
          </div>

          {/* Status Panel */}
          <div className="space-y-6">
            {/* Current Status */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Current Status</h3>
              <div className="flex items-center space-x-4">
                <div className={`w-4 h-4 rounded-full animate-pulse ${
                  isOnline ? 'bg-green-400' : 'bg-gray-400'
                }`}></div>
                <span className="text-white text-lg">
                  {isOnline ? 'Online & Available' : 'Offline'}
                </span>
              </div>
              {isOnline && (
                <div className="mt-4 p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                  <p className="text-green-300 text-sm">Searching for nearby ride requests...</p>
                  <div className="mt-2 w-full bg-green-900/50 rounded-full h-2">
                    <div 
                      className="bg-green-400 h-2 rounded-full animate-pulse"
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                onClick={()=>{navigate('/viewearning')}}
                className="bg-gradient-to-r cursor-pointer from-blue-500 to-blue-600 text-white p-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="text-2xl mb-2">📊</div>
                  <div className="text-sm">View Earnings</div>
                </button>
                <button 
                onClick={()=>{navigate('/trips')}}
                className="bg-gradient-to-r cursor-pointer from-purple-500 to-purple-600 text-white p-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="text-sm">Trip History</div>
                </button>
                <button
                onClick={()=>{navigate('/driversetting')}}
                className="bg-gradient-to-r cursor-pointer from-green-500 to-green-600 text-white p-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="text-2xl mb-2">⚙️</div>
                  <div className="text-sm">Settings</div>
                </button>
                <button
                onClick={()=>{navigate('/driversupport')}}
                className="bg-gradient-to-r cursor-pointer from-orange-500 to-orange-600 text-white p-4 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg">
                  <div className="text-2xl mb-2">💬</div>
                  <div className="text-sm">Support</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Ride Request Modal */}
        {rideRequest && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-pulse">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <span className="text-white text-3xl">🚗</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">New Ride Request!</h3>
                <p className="text-gray-600">A passenger needs a ride</p>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-green-500">📍</span>
                  <div>
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-semibold text-gray-800">{rideRequest.pickup}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                  <span className="text-red-500">🎯</span>
                  <div>
                    <p className="text-sm text-gray-500">Destination</p>
                    <p className="font-semibold text-gray-800">{rideRequest.dropoff}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Fare</p>
                    <p className="font-bold text-green-600">${rideRequest.fare}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Distance</p>
                    <p className="font-bold text-blue-600">{rideRequest.distance}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <p className="text-sm text-gray-500">Time</p>
                    <p className="font-bold text-purple-600">{rideRequest.estimatedTime}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={rejectRide}
                  className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-400 transition-colors duration-300"
                >
                  Decline
                </button>
                <button
                  onClick={acceptRide}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-blue-700 transition-all duration-300 shadow-lg"
                >
                  Accept Ride
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Animation */}
        {rideAccepted && (
          <div className="fixed inset-0 bg-green-500/20 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounce">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Ride Accepted!</h3>
              <p className="text-gray-600">Heading to pickup location...</p>
            </div>
          </div>
        )}
      </div>

      {/* Custom Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `
      }} />
    </div>
  );
};

export default DriverDashboard;