import { useState } from "react";

type Ride = {
  id: number;
  time: string;
  pickup: string;
  dropoff: string;
  passenger: string;
  rating: number;
  fare: number;
  distance: string;
  duration: string;
  status: string;
  paymentMethod: string;
  tips: number;
};

const TodayRidesDashboard = () => {
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  const [timeFilter, setTimeFilter] = useState("all");
  const [showStats, setShowStats] = useState(true);

  // Mock data for today's rides
  const [rides] = useState([
    {
      id: 1,
      time: "08:15 AM",
      pickup: "Downtown Mall",
      dropoff: "Business District",
      passenger: "Sarah M.",
      rating: 5,
      fare: 45,
      distance: "8.2 km",
      duration: "12 min",
      status: "completed",
      paymentMethod: "Card",
      tips: 5
    },
    {
      id: 2,
      time: "09:30 AM",
      pickup: "Airport Terminal 1",
      dropoff: "City Center Hotel",
      passenger: "John D.",
      rating: 4,
      fare: 65,
      distance: "15.3 km",
      duration: "22 min",
      status: "completed",
      paymentMethod: "Cash",
      tips: 10
    },
    {
      id: 3,
      time: "11:45 AM",
      pickup: "University Campus",
      dropoff: "Shopping Plaza",
      passenger: "Emma K.",
      rating: 5,
      fare: 32,
      distance: "6.1 km",
      duration: "9 min",
      status: "completed",
      paymentMethod: "Card",
      tips: 3
    },
    {
      id: 4,
      time: "02:20 PM",
      pickup: "Hospital Complex",
      dropoff: "Residential Area",
      passenger: "Mike R.",
      rating: 5,
      fare: 28,
      distance: "4.8 km",
      duration: "8 min",
      status: "completed",
      paymentMethod: "Digital Wallet",
      tips: 2
    },
    {
      id: 5,
      time: "04:10 PM",
      pickup: "Train Station",
      dropoff: "Office Complex",
      passenger: "Lisa W.",
      rating: 4,
      fare: 38,
      distance: "7.5 km",
      duration: "15 min",
      status: "completed",
      paymentMethod: "Card",
      tips: 4
    },
    {
      id: 6,
      time: "06:35 PM",
      pickup: "Restaurant District",
      dropoff: "Apartment Complex",
      passenger: "David L.",
      rating: 5,
      fare: 42,
      distance: "9.1 km",
      duration: "14 min",
      status: "completed",
      paymentMethod: "Cash",
      tips: 8
    }
  ]);

  const totalEarnings = rides.reduce((sum, ride) => sum + ride.fare + ride.tips, 0);
  const totalRides = rides.length;
  const totalDistance = rides.reduce((sum, ride) => sum + parseFloat(ride.distance), 0);
  const averageRating = (rides.reduce((sum, ride) => sum + ride.rating, 0) / rides.length).toFixed(1);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "text-green-400 bg-green-500/20";
      case "cancelled": return "text-red-400 bg-red-500/20";
      default: return "text-gray-400 bg-gray-500/20";
    }
  };

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-400"}>
        ⭐
      </span>
    ));
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

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <button className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all duration-300">
              <span className="text-white text-xl">←</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Today's Rides</h1>
              <p className="text-gray-300">Track your daily performance</p>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="flex space-x-2">
            {["all", "morning", "afternoon", "evening"].map((filter) => (
              <button
                key={filter}
                onClick={() => setTimeFilter(filter)}
                className={`px-4 py-2 rounded-xl capitalize transition-all duration-300 ${
                  timeFilter === filter
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 hover:bg-white/20"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Overview */}
        {showStats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-md p-6 rounded-2xl border border-green-500/30 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm">Total Earnings</p>
                  <p className="text-white text-2xl font-bold">${totalEarnings}</p>
                </div>
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">💰</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm">Total Rides</p>
                  <p className="text-white text-2xl font-bold">{totalRides}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🚗</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm">Distance</p>
                  <p className="text-white text-2xl font-bold">{totalDistance.toFixed(1)} km</p>
                </div>
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📍</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-md p-6 rounded-2xl border border-yellow-500/30 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-300 text-sm">Avg Rating</p>
                  <p className="text-white text-2xl font-bold">{averageRating}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">⭐</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rides List */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
          <div className="p-6 border-b border-white/20">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Ride History</h2>
              <button
                onClick={() => setShowStats(!showStats)}
                className="px-4 py-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
              >
                {showStats ? "Hide Stats" : "Show Stats"}
              </button>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            {rides.map((ride, index) => (
              <div
                key={ride.id}
                className="p-6 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedRide(ride)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-white font-semibold">{ride.time}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(ride.status)}`}>
                          {ride.status}
                        </span>
                      </div>
                      <div className="text-gray-300 text-sm">
                        <span className="text-green-400">📍</span> {ride.pickup}
                        <span className="mx-2">→</span>
                        <span className="text-red-400">🎯</span> {ride.dropoff}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-white font-bold text-lg">${ride.fare + ride.tips}</div>
                    <div className="text-gray-300 text-sm">{ride.distance} • {ride.duration}</div>
                    <div className="flex items-center justify-end mt-1">
                      {getRatingStars(ride.rating)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Summary */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 border border-indigo-500/30">
          <h3 className="text-xl font-bold text-white mb-4">Daily Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🕒</div>
              <p className="text-gray-300 text-sm">Hours Online</p>
              <p className="text-white text-xl font-bold">8.5 hrs</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💵</div>
              <p className="text-gray-300 text-sm">Tips Earned</p>
              <p className="text-white text-xl font-bold">${rides.reduce((sum, ride) => sum + ride.tips, 0)}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-gray-300 text-sm">Efficiency</p>
              <p className="text-white text-xl font-bold">92%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ride Details Modal */}
      {selectedRide && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 max-w-md w-full shadow-2xl transform animate-pulse">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">Ride Details</h3>
              <button
                onClick={() => setSelectedRide(null)}
                className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-600">Passenger</span>
                  <span className="font-semibold">{selectedRide.passenger}</span>
                </div>
                <div className="flex items-center justify-center space-x-1">
                  {getRatingStars(selectedRide.rating)}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-500">📍</span>
                    <div>
                      <p className="text-sm text-gray-500">Pickup</p>
                      <p className="font-semibold">{selectedRide.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-red-500">🎯</span>
                    <div>
                      <p className="text-sm text-gray-500">Destination</p>
                      <p className="font-semibold">{selectedRide.dropoff}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-500">Trip Time</p>
                  <p className="font-bold text-blue-600">{selectedRide.time}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-500">Duration</p>
                  <p className="font-bold text-purple-600">{selectedRide.duration}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-500">Distance</p>
                  <p className="font-bold text-indigo-600">{selectedRide.distance}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-center">
                  <p className="text-sm text-gray-500">Payment</p>
                  <p className="font-bold text-orange-600">{selectedRide.paymentMethod}</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Fare</p>
                    <p className="font-bold text-lg">${selectedRide.fare}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tips</p>
                    <p className="font-bold text-lg text-green-600">+${selectedRide.tips}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-bold text-xl text-blue-600">${selectedRide.fare + selectedRide.tips}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
          }
          .animate-slideIn {
            animation: slideIn 0.5s ease-out;
          }
        `
      }} />
    </div>
  );
};

export default TodayRidesDashboard;