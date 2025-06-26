import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Trip {
  id: string;
  date: string;
  time: string;
  pickup: string;
  dropoff: string;
  distance: string;
  duration: string;
  fare: number;
  rating: number;
  passengerName: string;
  paymentMethod: string;
  status: 'completed' | 'cancelled';
  tips: number;
}

const TripHistory = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  // Mock trip data
  const trips: Trip[] = [
    {
      id: 'T001',
      date: '2025-06-26',
      time: '14:30',
      pickup: 'Downtown Mall',
      dropoff: 'Airport Terminal 2',
      distance: '12.5 km',
      duration: '18 min',
      fare: 85,
      rating: 5,
      passengerName: 'Ahmed Khan',
      paymentMethod: 'Credit Card',
      status: 'completed',
      tips: 15
    },
    {
      id: 'T002',
      date: '2025-06-26',
      time: '12:15',
      pickup: 'University Gate',
      dropoff: 'Saddar Bazaar',
      distance: '8.2 km',
      duration: '15 min',
      fare: 65,
      rating: 4,
      passengerName: 'Fatima Ali',
      paymentMethod: 'Cash',
      status: 'completed',
      tips: 10
    },
    {
      id: 'T003',
      date: '2025-06-26',
      time: '10:45',
      pickup: 'Clifton Beach',
      dropoff: 'Gulshan-e-Iqbal',
      distance: '15.8 km',
      duration: '25 min',
      fare: 120,
      rating: 5,
      passengerName: 'Bilal Sheikh',
      paymentMethod: 'Digital Wallet',
      status: 'completed',
      tips: 20
    },
    {
      id: 'T004',
      date: '2025-06-26',
      time: '09:20',
      pickup: 'Defence Housing',
      dropoff: 'Tariq Road',
      distance: '7.3 km',
      duration: '12 min',
      fare: 55,
      rating: 3,
      passengerName: 'Sara Malik',
      paymentMethod: 'Credit Card',
      status: 'completed',
      tips: 5
    },
    {
      id: 'T005',
      date: '2025-06-25',
      time: '22:30',
      pickup: 'Boat Basin',
      dropoff: 'North Nazimabad',
      distance: '11.4 km',
      duration: '20 min',
      fare: 90,
      rating: 4,
      passengerName: 'Hassan Raza',
      paymentMethod: 'Cash',
      status: 'completed',
      tips: 0
    },
    {
      id: 'T006',
      date: '2025-06-25',
      time: '18:45',
      pickup: 'Packages Mall',
      dropoff: 'Johar Town',
      distance: '9.7 km',
      duration: '16 min',
      fare: 75,
      rating: 5,
      passengerName: 'Ayesha Noor',
      paymentMethod: 'Digital Wallet',
      status: 'completed',
      tips: 25
    }
  ];

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.pickup.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.dropoff.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         trip.passengerName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    switch (selectedPeriod) {
      case 'today':
        return matchesSearch && trip.date === today;
      case 'yesterday':
        return matchesSearch && trip.date === yesterday;
      case 'week':
        { const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
        return matchesSearch && trip.date >= weekAgo; }
      default:
        return matchesSearch;
    }
  });

  const totalEarnings = filteredTrips.reduce((sum, trip) => sum + trip.fare + trip.tips, 0);
  const avgRating = filteredTrips.length > 0 ? 
    filteredTrips.reduce((sum, trip) => sum + trip.rating, 0) / filteredTrips.length : 0;

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowDetails(true);
  };

  const getStatusColor = (status: string) => {
    return status === 'completed' ? 'text-green-400' : 'text-red-400';
  };

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
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
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">📊</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Trip History</h1>
              <p className="text-gray-300">Track your completed rides and earnings</p>
            </div>
          </div>
          
          <button 
          onClick={() => {navigate('/driver')}}
          className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300">
            <span className="text-xl">🔙</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-md p-6 rounded-2xl border border-green-500/30 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">💰</span>
              </div>
              <div>
                <p className="text-green-300 text-sm">Total Earnings</p>
                <p className="text-white text-2xl font-bold">${totalEarnings}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🚗</span>
              </div>
              <div>
                <p className="text-blue-300 text-sm">Total Trips</p>
                <p className="text-white text-2xl font-bold">{filteredTrips.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
              <div>
                <p className="text-purple-300 text-sm">Avg Rating</p>
                <p className="text-white text-2xl font-bold">{avgRating.toFixed(1)}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-red-600/20 backdrop-blur-md p-6 rounded-2xl border border-orange-500/30 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🎯</span>
              </div>
              <div>
                <p className="text-orange-300 text-sm">Tips Earned</p>
                <p className="text-white text-2xl font-bold">${filteredTrips.reduce((sum, trip) => sum + trip.tips, 0)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex space-x-2">
              {['today', 'yesterday', 'week', 'all'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input
                type="text"
                placeholder="Search trips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-2 pl-10 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
            </div>
          </div>
        </div>

        {/* Trip List */}
        <div className="space-y-4">
          {filteredTrips.map((trip) => (
            <div
              key={trip.id}
              onClick={() => handleTripClick(trip)}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer transform hover:scale-[1.02]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl">🚗</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-semibold">{trip.passengerName}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-gray-300">{trip.time}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-green-400 text-sm">📍</span>
                      <span className="text-gray-300 text-sm">{trip.pickup}</span>
                      <span className="text-gray-400">→</span>
                      <span className="text-red-400 text-sm">🎯</span>
                      <span className="text-gray-300 text-sm">{trip.dropoff}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2">
                    <span className="text-green-400 font-bold text-lg">${trip.fare}</span>
                    {trip.tips > 0 && (
                      <span className="text-yellow-400 text-sm">+${trip.tips} tip</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-gray-300 text-sm">{trip.distance}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-300 text-sm">{trip.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-sm">{getRatingStars(trip.rating)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(trip.status)} bg-white/10`}>
                      {trip.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTrips.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚫</div>
            <h3 className="text-2xl font-bold text-white mb-2">No trips found</h3>
            <p className="text-gray-400">Try adjusting your filters or search terms</p>
          </div>
        )}

        {/* Trip Details Modal */}
        {showDetails && selectedTrip && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-white to-gray-100 rounded-3xl p-8 max-w-lg w-full shadow-2xl transform animate-pulse">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Trip Details</h3>
                <button
                  onClick={() => setShowDetails(false)}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-6">
                {/* Trip ID and Status */}
                <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                  <div>
                    <p className="text-sm text-gray-500">Trip ID</p>
                    <p className="font-bold text-gray-800">{selectedTrip.id}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedTrip.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {selectedTrip.status}
                    </span>
                  </div>
                </div>

                {/* Route */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-xl">
                    <span className="text-green-500 text-xl">📍</span>
                    <div>
                      <p className="text-sm text-gray-500">Pickup Location</p>
                      <p className="font-semibold text-gray-800">{selectedTrip.pickup}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-xl">
                    <span className="text-red-500 text-xl">🎯</span>
                    <div>
                      <p className="text-sm text-gray-500">Drop-off Location</p>
                      <p className="font-semibold text-gray-800">{selectedTrip.dropoff}</p>
                    </div>
                  </div>
                </div>

                {/* Trip Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <p className="text-sm text-gray-500">Distance</p>
                    <p className="font-bold text-blue-600 text-lg">{selectedTrip.distance}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-bold text-purple-600 text-lg">{selectedTrip.duration}</p>
                  </div>
                </div>

                {/* Passenger Info */}
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">👤</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{selectedTrip.passengerName}</p>
                      <p className="text-sm text-gray-500">Passenger</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Rating:</span>
                    <span className="text-sm">{getRatingStars(selectedTrip.rating)}</span>
                    <span className="text-sm font-semibold">({selectedTrip.rating}/5)</span>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="p-4 bg-green-50 rounded-xl">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Fare</span>
                    <span className="font-bold text-green-600">${selectedTrip.fare}</span>
                  </div>
                  {selectedTrip.tips > 0 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-600">Tips</span>
                      <span className="font-bold text-yellow-600">${selectedTrip.tips}</span>
                    </div>
                  )}
                  <div className="border-t pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Total Earned</span>
                      <span className="font-bold text-green-600 text-lg">${selectedTrip.fare + selectedTrip.tips}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-500">
                    Payment: {selectedTrip.paymentMethod}
                  </div>
                </div>

                {/* Trip Time */}
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-500">Trip Completed</p>
                  <p className="font-bold text-gray-800">{selectedTrip.date} at {selectedTrip.time}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripHistory;