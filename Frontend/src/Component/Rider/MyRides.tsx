import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Star, 
  Car, 
  Filter, 
  Search, 
  Calendar, 
  Download, 
  RefreshCw,
  Navigation,
  Phone,
  MessageCircle,
  CheckCircle,
  XCircle,
  AlertCircle,
  Receipt,
  Repeat,
  Heart,
  MoreVertical
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyRidesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRide, setSelectedRide] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mock ride data
  const mockRides = [
    {
      id: 'R001',
      date: '2024-06-24',
      time: '14:30',
      pickup: 'Blue Area, Islamabad',
      dropoff: 'F-8 Markaz, Islamabad',
      driver: 'Ahmed Khan',
      driverRating: 4.8,
      driverPhoto: '👨‍💼',
      car: 'Honda Civic - ABC 123',
      fare: 450,
      distance: '8.5 km',
      duration: '22 mins',
      status: 'completed',
      paymentMethod: 'Card',
      tripRating: 5,
      receipt: 'RC-2024-001'
    },
    {
      id: 'R002',
      date: '2024-06-23',
      time: '09:15',
      pickup: 'Saddar, Rawalpindi',
      dropoff: 'PWD, Islamabad',
      driver: 'Sarah Ali',
      driverRating: 4.9,
      driverPhoto: '👩‍💼',
      car: 'Toyota Corolla - XYZ 789',
      fare: 380,
      distance: '12.3 km',
      duration: '35 mins',
      status: 'completed',
      paymentMethod: 'Cash',
      tripRating: 4,
      receipt: 'RC-2024-002'
    },
    {
      id: 'R003',
      date: '2024-06-22',
      time: '18:45',
      pickup: 'DHA Phase 2, Islamabad',
      dropoff: 'Centaurus Mall, Islamabad',
      driver: 'Muhammad Hassan',
      driverRating: 4.7,
      driverPhoto: '👨‍🦱',
      car: 'Suzuki Swift - DEF 456',
      fare: 320,
      distance: '6.2 km',
      duration: '18 mins',
      status: 'completed',
      paymentMethod: 'Card',
      tripRating: 5,
      receipt: 'RC-2024-003'
    },
    {
      id: 'R004',
      date: '2024-06-21',
      time: '12:00',
      pickup: 'G-9 Markaz, Islamabad',
      dropoff: 'Islamabad Airport',
      driver: 'Fatima Sheikh',
      driverRating: 4.8,
      driverPhoto: '👩‍💻',
      car: 'Honda City - GHI 789',
      fare: 850,
      distance: '18.7 km',
      duration: '45 mins',
      status: 'cancelled',
      paymentMethod: 'Card',
      receipt: 'RC-2024-004'
    },
    {
      id: 'R005',
      date: '2024-06-24',
      time: '16:20',
      pickup: 'F-10 Markaz, Islamabad',
      dropoff: 'Saidpur Village, Islamabad',
      driver: 'Ali Raza',
      driverRating: 4.6,
      driverPhoto: '👨‍🚗',
      car: 'Suzuki Cultus - JKL 012',
      fare: 290,
      distance: '7.8 km',
      duration: '25 mins',
      status: 'ongoing',
      paymentMethod: 'Card'
    }
  ];

  const [rides, setRides] = useState(mockRides);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-400" />;
      case 'ongoing':
        return <AlertCircle className="w-5 h-5 text-blue-400" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-400/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-400/30';
      case 'ongoing':
        return 'bg-blue-500/20 text-blue-400 border-blue-400/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-400/30';
    }
  };

  const filteredRides = rides.filter(ride => {
    const matchesSearch = ride.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ride.dropoff.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ride.driver.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || ride.status === activeTab;
    
    const matchesStatus = statusFilter === 'all' || ride.status === statusFilter;
    
    const matchesDate = dateFilter === 'all' || 
                       (dateFilter === 'today' && ride.date === '2024-06-24') ||
                       (dateFilter === 'week' && new Date(ride.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesTab && matchesStatus && matchesDate;
  });

 const navigate = useNavigate();

  const handleRideAction = (action, rideId) => {
    switch (action) {
      case 'repeat':
        console.log('Repeat ride:', rideId);
        break;
      case 'receipt':
        console.log('Download receipt:', rideId);
        break;
      case 'favorite':
        console.log('Add to favorites:', rideId);
        break;
      default:
        break;
    }
  };

  const RideCard = ({ ride }) => (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{ride.driverPhoto}</div>
          <div>
            <h3 className="text-white font-semibold">{ride.driver}</h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-300">{ride.driverRating}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(ride.status)}`}>
            {ride.status.charAt(0).toUpperCase() + ride.status.slice(1)}
          </div>
          <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200">
            <MoreVertical className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-3 h-3 bg-green-500 rounded-full mt-1.5"></div>
          <div>
            <p className="text-white font-medium">{ride.pickup}</p>
            <p className="text-sm text-gray-400">{ride.date} • {ride.time}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 ml-6">
          <div className="w-0.5 h-6 bg-gradient-to-b from-green-500 to-red-500"></div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-3 h-3 bg-red-500 rounded-full mt-1.5"></div>
          <div>
            <p className="text-white font-medium">{ride.dropoff}</p>
            <p className="text-sm text-gray-400">{ride.distance} • {ride.duration}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Car className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-300">{ride.car}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="text-2xl font-bold text-green-400">₹{ride.fare}</span>
          {ride.status === 'completed' && (
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < ride.tripRating ? 'text-yellow-400 fill-current' : 'text-gray-500'}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {ride.status === 'ongoing' && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex space-x-3">
            <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2" />
              Call
            </button>
            <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center">
              <Navigation className="w-4 h-4 mr-2" />
              Track
            </button>
          </div>
        </div>
      )}

      {ride.status === 'completed' && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="flex space-x-2">
            <button 
              onClick={() => handleRideAction('repeat', ride.id)}
              className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center"
            >
              <Repeat className="w-4 h-4 mr-2" />
              Repeat
            </button>
            <button 
              onClick={() => handleRideAction('receipt', ride.id)}
              className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-colors duration-200 flex items-center justify-center"
            >
              <Receipt className="w-4 h-4 mr-2" />
              Receipt
            </button>
            <button 
              onClick={() => handleRideAction('favorite', ride.id)}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors duration-200"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div className="w-2 h-2 bg-blue-400/30 rounded-full" />
          </div>
        ))}
      </div>

      {/* Dynamic Mouse Cursor */}
      <div 
        className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-screen opacity-70 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`
        }}
      />

      {/* Header */}
      <header className="relative z-20 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
           onClick={() => navigate('/ride')}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
            <ArrowLeft className="w-6 h-6 text-white " />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              My Rides
            </h1>
            <p className="text-gray-300 text-sm">{filteredRides.length} rides found</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <Filter className="w-6 h-6 text-white" />
          </button>
          <button className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
            <Download className="w-6 h-6 text-white" />
          </button>
          <button className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
            <RefreshCw className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Rides', value: mockRides.length, icon: Car, color: 'from-blue-500 to-cyan-500' },
            { label: 'Completed', value: mockRides.filter(r => r.status === 'completed').length, icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
            { label: 'Total Spent', value: `₹${mockRides.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.fare, 0)}`, icon: Receipt, color: 'from-purple-500 to-pink-500' },
            { label: 'Avg Rating', value: '4.8', icon: Star, color: 'from-yellow-500 to-orange-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search rides by location, driver, or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
            </div>

            {/* Tab Filters */}
            <div className="flex space-x-2">
              {['all', 'completed', 'ongoing', 'cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Date Range</label>
                  <select
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50"
                  >
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                  <select className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50">
                    <option value="recent">Most Recent</option>
                    <option value="fare">Highest Fare</option>
                    <option value="distance">Longest Distance</option>
                    <option value="rating">Highest Rating</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rides List */}
        <div className="space-y-6 mb-12">
          {filteredRides.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
              <div className="text-6xl mb-4">🚗</div>
              <h3 className="text-2xl font-bold text-white mb-2">No rides found</h3>
              <p className="text-gray-300">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            filteredRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} />
            ))
          )}
        </div>

        {/* Load More Button */}
        {filteredRides.length > 0 && (
          <div className="text-center mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105">
              Load More Rides
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRidesPage;