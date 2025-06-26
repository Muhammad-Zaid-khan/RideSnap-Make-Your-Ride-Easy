/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState, useEffect, } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  MapPin, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Car, 
  Users, 
  CreditCard, 
  Bell,
  CheckCircle,
  X,
  Repeat,
  Settings,
  User,
  Menu,
  Home,
  History,
  Heart,
  Shield,
  HelpCircle,
  LogOut
} from 'lucide-react';

const ScheduleRide = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [rideType, setRideType] = useState('standard');
  const [passengers, setPassengers] = useState(1);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringDays, setRecurringDays] = useState<string[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [notifications, setNotifications] = useState(true);
  type ScheduledRide = {
    id: number;
    pickup: string;
    dropoff: string;
    date: string;
    time: string;
    type: string;
    status: string;
    recurring: boolean;
    recurringDays?: string[];
    fare?: string;
  };

  const [scheduledRides, setScheduledRides] = useState<ScheduledRide[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('schedule'); // schedule, upcoming, history

  // Navigation menu items
  const navigationItems = [
    { icon: Home, label: "Dashboard", route: "/home", color: "text-blue-400" },
    { icon: MapPin, label: "Book Ride", route: "/ride", color: "text-green-400" },
    { icon: History, label: "My Rides", route: "/myrides", color: "text-purple-400" },
    { icon: Calendar, label: "Schedule Ride", route: "/schedule", color: "text-orange-400" },
    { icon: CreditCard, label: "Payment", route: "/payment", color: "text-emerald-400" },
    { icon: Heart, label: "Favorites", route: "/favorites", color: "text-pink-400" },
    { icon: Shield, label: "Safety Center", route: "/safety", color: "text-red-400" },
    { icon: Bell, label: "Notifications", route: "/notifications", color: "text-yellow-400" },
    { icon: HelpCircle, label: "Help & Support", route: "/support", color: "text-cyan-400" },
    { icon: Settings, label: "Settings", route: "/setting", color: "text-gray-400" }
  ];

  const rideTypes = [
    { id: 'economy', name: 'Economy', icon: '🚗', price: '$8-12', description: 'Affordable rides', seats: 4 },
    { id: 'standard', name: 'Standard', icon: '🚙', price: '$12-18', description: 'Comfortable rides', seats: 4 },
    { id: 'premium', name: 'Premium', icon: '🚖', price: '$18-25', description: 'Luxury experience', seats: 4 },
    { id: 'xl', name: 'RideXL', icon: '🚐', price: '$15-22', description: 'Extra space', seats: 6 }
  ];

  const weekDays = [
    { id: 'monday', name: 'Mon', full: 'Monday' },
    { id: 'tuesday', name: 'Tue', full: 'Tuesday' },
    { id: 'wednesday', name: 'Wed', full: 'Wednesday' },
    { id: 'thursday', name: 'Thu', full: 'Thursday' },
    { id: 'friday', name: 'Fri', full: 'Friday' },
    { id: 'saturday', name: 'Sat', full: 'Saturday' },
    { id: 'sunday', name: 'Sun', full: 'Sunday' }
  ];

  // Mock scheduled rides data
  const mockScheduledRides = [
    {
      id: 1,
      pickup: 'Home - 123 Main St',
      dropoff: 'Office - Business District',
      date: '2025-06-26',
      time: '08:30',
      type: 'standard',
      status: 'scheduled',
      recurring: true,
      recurringDays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
    },
    {
      id: 2,
      pickup: 'Airport Terminal 1',
      dropoff: 'Downtown Hotel',
      date: '2025-06-28',
      time: '14:15',
      type: 'premium',
      status: 'scheduled',
      recurring: false
    }
  ];

  useEffect(() => {
    setScheduledRides(mockScheduledRides);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavigation = (route: string) => {
    setSidebarOpen(false);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRecurringDayToggle = (dayId: string) => {
    setRecurringDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleScheduleRide = async () => {
    if (!pickup || !dropoff || !selectedDate || !selectedTime) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newRide = {
        id: Date.now(),
        pickup,
        dropoff,
        date: selectedDate,
        time: selectedTime,
        type: rideType,
        status: 'scheduled',
        recurring: isRecurring,
        recurringDays: isRecurring ? recurringDays : []
      };

      setScheduledRides(prev => [...prev, newRide]);
      setShowSuccessModal(true);
      setIsLoading(false);

      // Reset form
      setPickup('');
      setDropoff('');
      setSelectedDate('');
      setSelectedTime('');
      setIsRecurring(false);
      setRecurringDays([]);
    }, 2000);
  };

  const handleDeleteRide = (rideId: number) => {
    setScheduledRides(prev => prev.filter(ride => ride.id !== rideId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

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
            <div className="w-2 h-2 bg-orange-400/30 rounded-full" />
          </div>
        ))}
      </div>

      {/* Dynamic Mouse Cursor */}
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-orange-400 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-screen opacity-70 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`
        }}
      />

      {/* Header */}
      <header className="relative z-20 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group"
          >
            <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
          <button
            onClick={() => navigate('/ride')}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-purple-500 bg-clip-text text-transparent">
            Schedule Ride
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/notifications')}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 relative group"
          >
            <Bell className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group"
          >
            <User className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-80 bg-black/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 overflow-y-auto">
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-white">Navigation</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                >
                  <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>
            <nav className="p-6 space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.route)}
                  className="w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20"
                >
                  <div className="p-2 rounded-lg bg-white/10">
                    <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <span className="text-gray-200 group-hover:text-white transition-colors duration-300 font-medium">
                    {item.label}
                  </span>
                </button>
              ))}
            </nav>
            <div className="p-6 border-t border-white/10 mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center space-x-4 p-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/40 transition-all duration-300 group"
              >
                <LogOut className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-red-400 font-medium group-hover:text-red-300 transition-colors duration-300">
                  Logout
                </span>
              </button>
            </div>
          </div>
          <div
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
            {[
              { id: 'schedule', label: 'Schedule New', icon: Plus },
              { id: 'upcoming', label: 'Upcoming', icon: Calendar },
              { id: 'history', label: 'History', icon: History }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule New Ride Tab */}
        {activeTab === 'schedule' && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Ride Details */}
            <div className="space-y-6">
              {/* Location Inputs */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <MapPin className="w-6 h-6 mr-3 text-orange-400" />
                  Trip Details
                </h3>
                
                <div className="space-y-6">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <input
                      type="text"
                      placeholder="Pickup location"
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    </div>
                    <input
                      type="text"
                      placeholder="Drop-off location"
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 backdrop-blur-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-orange-400" />
                  Schedule
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-gray-300 mb-2">Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={getTodayDate()}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-300 mb-2">Time</label>
                    <input
                      type="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Recurring Options */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium flex items-center">
                      <Repeat className="w-5 h-5 mr-2 text-orange-400" />
                      Recurring Ride
                    </label>
                    <button
                      onClick={() => setIsRecurring(!isRecurring)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        isRecurring ? 'bg-orange-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                        isRecurring ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>

                  {isRecurring && (
                    <div className="grid grid-cols-7 gap-2">
                      {weekDays.map((day) => (
                        <button
                          key={day.id}
                          onClick={() => handleRecurringDayToggle(day.id)}
                          className={`p-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                            recurringDays.includes(day.id)
                              ? 'bg-gradient-to-r from-orange-500 to-purple-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:bg-white/20'
                          }`}
                        >
                          {day.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Ride Options */}
            <div className="space-y-6">
              {/* Ride Type Selection */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <Car className="w-6 h-6 mr-3 text-orange-400" />
                  Choose Ride Type
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {rideTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => setRideType(type.id)}
                      className={`p-4 rounded-2xl border transition-all duration-300 ${
                        rideType === type.id
                          ? 'bg-gradient-to-r from-orange-500/20 to-purple-500/20 border-orange-500'
                          : 'bg-white/5 border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <h4 className="text-white font-bold">{type.name}</h4>
                      <p className="text-gray-300 text-sm">{type.description}</p>
                      <p className="text-orange-400 font-semibold">{type.price}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Options */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6">Options</h3>
                
                <div className="space-y-6">
                  {/* Passengers */}
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium flex items-center">
                      <Users className="w-5 h-5 mr-2 text-orange-400" />
                      Passengers
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      >
                        <span className="text-white font-bold">-</span>
                      </button>
                      <span className="text-white font-bold text-xl w-8 text-center">{passengers}</span>
                      <button
                        onClick={() => setPassengers(Math.min(6, passengers + 1))}
                        className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                      >
                        <span className="text-white font-bold">+</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="text-white font-medium mb-3 block flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-orange-400" />
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all duration-300"
                    >
                      <option value="card">Credit Card **** 1234</option>
                      <option value="cash">Cash</option>
                      <option value="wallet">Digital Wallet</option>
                    </select>
                  </div>

                  {/* Notifications */}
                  <div className="flex items-center justify-between">
                    <label className="text-white font-medium flex items-center">
                      <Bell className="w-5 h-5 mr-2 text-orange-400" />
                      Ride Notifications
                    </label>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        notifications ? 'bg-orange-500' : 'bg-gray-600'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                        notifications ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                  </div>
                </div>

                {/* Schedule Button */}
                <button
                  onClick={handleScheduleRide}
                  disabled={isLoading}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-orange-500/25"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      Scheduling Ride...
                    </div>
                  ) : (
                    'Schedule Ride'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upcoming Rides Tab */}
        {activeTab === 'upcoming' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">Upcoming Rides</h2>
              <p className="text-gray-300">Manage your scheduled rides</p>
            </div>

            <div className="space-y-6">
              {scheduledRides.filter(ride => ride.status === 'scheduled').map((ride) => (
                <div key={ride.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-3xl">
                          {rideTypes.find(t => t.id === ride.type)?.icon || '🚗'}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {formatDate(ride.date)} at {ride.time}
                          </h3>
                          <p className="text-gray-300 capitalize">
                            {rideTypes.find(t => t.id === ride.type)?.name || ride.type} Ride
                          </p>
                        </div>
                        {ride.recurring && (
                          <div className="bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/40">
                            <span className="text-orange-400 text-sm font-medium flex items-center">
                              <Repeat className="w-4 h-4 mr-1" />
                              Recurring
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-300">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <span className="font-medium">From:</span>
                          <span className="ml-2">{ride.pickup}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                          <span className="font-medium">To:</span>
                          <span className="ml-2">{ride.dropoff}</span>
                        </div>
                      </div>

                      {ride.recurring && (ride.recurringDays ?? []).length > 0 && (
                        <div className="mt-4 flex items-center space-x-2">
                          <span className="text-gray-300 text-sm">Repeats on:</span>
                          {(ride.recurringDays ?? []).map(dayId => {
                            const day = weekDays.find(d => d.id === dayId);
                            return (
                              <span key={dayId} className="bg-white/10 px-2 py-1 rounded text-xs text-gray-300">
                                {day?.name}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 transition-all duration-300 group">
                        <Edit3 className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                      </button>
                      <button 
                        onClick={() => handleDeleteRide(ride.id)}
                        className="p-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 transition-all duration-300 group"
                      >
                        <Trash2 className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {scheduledRides.filter(ride => ride.status === 'scheduled').length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">📅</div>
                  <h3 className="text-2xl font-bold text-white mb-2">No Upcoming Rides</h3>
                  <p className="text-gray-300 mb-6">You don't have any scheduled rides yet</p>
                  <button
                    onClick={() => setActiveTab('schedule')}
                    className="px-6 py-3 bg-gradient-to-r from-orange-600 to-purple-600 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    Schedule Your First Ride
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-4">Ride History</h2>
              <p className="text-gray-300">View your past scheduled rides</p>
            </div>

            <div className="space-y-6">
              {/* Mock completed rides */}
              {[
                {
                  id: 'history_1',
                  pickup: 'Airport Terminal 2',
                  dropoff: 'City Center Mall',
                  date: '2025-06-20',
                  time: '16:30',
                  type: 'premium',
                  status: 'completed',
                  fare: '$22.50'
                },
                {
                  id: 'history_2',
                  pickup: 'Home - 456 Oak Street',
                  dropoff: 'University Campus',
                  date: '2025-06-18',
                  time: '09:15',
                  type: 'standard',
                  status: 'completed',
                  fare: '$15.75'
                },
                {
                  id: 'history_3',
                  pickup: 'Downtown Office',
                  dropoff: 'Shopping District',
                  date: '2025-06-15',
                  time: '18:45',
                  type: 'economy',
                  status: 'cancelled',
                  fare: '$0.00'
                }
              ].map((ride) => (
                <div key={ride.id} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="text-3xl">
                          {rideTypes.find(t => t.id === ride.type)?.icon || '🚗'}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">
                            {formatDate(ride.date)} at {ride.time}
                          </h3>
                          <p className="text-gray-300 capitalize">
                            {rideTypes.find(t => t.id === ride.type)?.name || ride.type} Ride
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full border ${
                          ride.status === 'completed' 
                            ? 'bg-green-500/20 border-green-500/40 text-green-400'
                            : 'bg-red-500/20 border-red-500/40 text-red-400'
                        }`}>
                          <span className="text-sm font-medium capitalize">{ride.status}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center text-gray-300">
                          <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                          <span className="font-medium">From:</span>
                          <span className="ml-2">{ride.pickup}</span>
                        </div>
                        <div className="flex items-center text-gray-300">
                          <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                          <span className="font-medium">To:</span>
                          <span className="ml-2">{ride.dropoff}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-2xl font-bold text-white mb-2">{ride.fare}</div>
                      {ride.status === 'completed' && (
                        <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/40 text-yellow-400 rounded-xl transition-all duration-300 flex items-center space-x-2">
                          <Star className="w-4 h-4" />
                          <span className="text-sm">Rate</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-md w-full mx-4 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Ride Scheduled!</h3>
              <p className="text-gray-300 mb-6">
                Your ride has been successfully scheduled. We'll send you a notification before your pickup time.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    setActiveTab('upcoming');
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300"
                >
                  View Rides
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setActiveTab('schedule')}
          className="w-16 h-16 bg-gradient-to-r from-orange-600 to-purple-600 hover:from-orange-700 hover:to-purple-700 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 group"
        >
          <Plus className="w-8 h-8 text-white group-hover:rotate-180 transition-transform duration-300" />
        </button>
      </div>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          
          .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            background-size: 200px 100%;
            animation: shimmer 2s infinite;
          }

          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          input[type="date"]::-webkit-calendar-picker-indicator,
          input[type="time"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
          }
        `
      }} />
    </div>
  );
};

export default ScheduleRide;