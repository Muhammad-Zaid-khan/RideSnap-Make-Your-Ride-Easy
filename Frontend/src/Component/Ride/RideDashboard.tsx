/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, To } from 'react-router-dom';
import { MapPin, Navigation, Clock, Star, Phone, MessageCircle, Shield, CreditCard, User, Settings, Menu, X, Home, Calendar, History, Heart, Bell, HelpCircle, LogOut } from 'lucide-react';

const RideDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [driverLocation, setDriverLocation] = useState({ lat: 0, lng: 0 });
  const [rideStatus, setRideStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [estimatedTime, setEstimatedTime] = useState("");
  const [estimatedFare, setEstimatedFare] = useState("");
  type DriverInfo = {
    name: string;
    rating: number;
    car: string;
    photo: string;
    phone: string;
    arrivalTime: string;
  };
  const [driverInfo, setDriverInfo] = useState<DriverInfo | null>(null);
  const [rideStep, setRideStep] = useState('request'); // request, searching, found, ongoing, completed
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showNotification, setShowNotification] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const mapRef = useRef(null);

  // Mock driver data
  const mockDriver = {
    name: "Ahmed Khan",
    rating: 4.8,
    car: "Honda Civic - ABC 123",
    photo: "👨‍💼",
    phone: "+92 300 1234567",
    arrivalTime: "3 mins"
  };

  // Navigation menu items with routes
  const navigationItems = [
    {
      icon: Home,
      label: "Dashboard",
      route: "/home",
      color: "text-blue-400",
      description: "Main dashboard overview"
    },
    {
      icon: MapPin,
      label: "Book Ride",
      route: "/ride",
      color: "text-green-400",
      description: "Request a new ride"
    },
    {
      icon: History,
      label: "My Rides",
      route: "/myrides",
      color: "text-purple-400",
      description: "View ride history"
    },
    {
      icon: Calendar,
      label: "Schedule Ride",
      route: "/schedule",
      color: "text-orange-400",
      description: "Plan future rides"
    },
    {
      icon: CreditCard,
      label: "Payment",
      route: "/payment",
      color: "text-emerald-400",
      description: "Manage payment methods"
    },
    {
      icon: Heart,
      label: "Favorites",
      route: "/favorites",
      color: "text-pink-400",
      description: "Saved destinations"
    },
    {
      icon: Shield,
      label: "Safety Center",
      route: "/safety",
      color: "text-red-400",
      description: "Safety features & support"
    },
    {
      icon: Bell,
      label: "Notifications",
      route: "/notifications",
      color: "text-yellow-400",
      description: "Alerts & updates"
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      route: "/support",
      color: "text-cyan-400",
      description: "Get help with rides"
    },
    {
      icon: Settings,
      label: "Settings",
      route: "/setting",
      color: "text-gray-400",
      description: "Account preferences"
    }
  ];

  // Quick action items
  const quickActions = [
    {
      icon: MapPin,
      label: "Saved Places",
      color: "from-blue-500 to-cyan-500",
      route: "/favorites",
      description: "Quick access to saved locations"
    },
    {
      icon: Clock,
      label: "Schedule Ride",
      color: "from-purple-500 to-pink-500",
      route: "/schedule",
      description: "Book rides in advance"
    },
    {
      icon: Star,
      label: "Rate Driver",
      color: "from-yellow-500 to-orange-500",
      route: "/rate-driver",
      description: "Share your experience"
    },
    {
      icon: Shield,
      label: "Safety Center",
      color: "from-green-500 to-emerald-500",
      route: "/safety",
      description: "Emergency features"
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getPassengerId = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        return decodedToken.id;
      } catch (error) {
        console.error("Token decode error:", error);
        return null;
      }
    }
    return "passenger_123"; // Mock ID for demo
  };

  const handleNavigation = (route: To) => {
    setSidebarOpen(false);
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleRequestRide = async () => {
    if (!pickup || !dropoff) {
      showNotificationMessage("Please enter both pickup and dropoff locations");
      return;
    }

    setIsLoading(true);
    setRideStep('searching');

    // Simulate API call
    setTimeout(() => {
      setRideStep('found');
      setDriverInfo(mockDriver);
      setEstimatedTime("15 mins");
      setEstimatedFare("$12.50");
      setDriverLocation({ lat: 33.6844, lng: 73.0479 });
      setShowMap(true);
      setIsLoading(false);
      showNotificationMessage("Driver found! Ahmed is on the way.");
    }, 3000);
  };

  const showNotificationMessage = (message: string) => {
    setRideStatus(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleCancelRide = () => {
    setRideStep('request');
    setDriverInfo(null);
    setShowMap(false);
    setRideStatus(null);
    showNotificationMessage("Ride cancelled successfully");
  };

  const confirmRide = () => {
    setRideStep('ongoing');
    showNotificationMessage("Ride confirmed! Enjoy your journey.");
  };

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
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
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group"
          >
            <Menu className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            RideSnap
          </h1>
          <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white">Online</span>
          </div>
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
            onClick={() => navigate('/profile')}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group"
          >
            <User className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>
      </header>

      {/* Enhanced Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-80 bg-black/95 backdrop-blur-xl border-r border-white/10 transform transition-transform duration-300 overflow-y-auto">
            {/* Sidebar Header */}
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
              <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl border border-white/10">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">John Doe</h3>
                  <p className="text-gray-300 text-sm">Premium Member</p>
                </div>
              </div>
            </div>

            {/* Navigation Items */}
            <nav className="p-6 space-y-2">
              {navigationItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(item.route)}
                  className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group ${isActiveRoute(item.route)
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50'
                      : 'bg-white/5 hover:bg-white/10 border border-transparent hover:border-white/20'
                    }`}
                >
                  <div className={`p-2 rounded-lg ${isActiveRoute(item.route) ? 'bg-white/20' : 'bg-white/10'}`}>
                    <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h4 className={`font-medium ${isActiveRoute(item.route) ? 'text-white' : 'text-gray-200'} group-hover:text-white transition-colors duration-300`}>
                      {item.label}
                    </h4>
                    <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                  {isActiveRoute(item.route) && (
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  )}
                </button>
              ))}
            </nav>

            {/* Sidebar Footer */}
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
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-pulse">
            Where to?
          </h2>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            Your journey starts here. Safe, reliable, and affordable rides at your fingertips.
          </p>
        </div>

        {/* Ride Request Form */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MapPin className="w-6 h-6 mr-3 text-blue-400" />
              Book Your Ride
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
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 backdrop-blur-sm"
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
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 backdrop-blur-sm"
                />
              </div>

              {estimatedTime && estimatedFare && (
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/30">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    <span className="text-white">{estimatedTime}</span>
                  </div>
                  <div className="text-2xl font-bold text-green-400">{estimatedFare}</div>
                </div>
              )}

              <button
                onClick={handleRequestRide}
                disabled={isLoading || rideStep !== 'request'}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl hover:shadow-blue-500/25"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Finding Driver...
                  </div>
                ) : (
                  'Request Ride'
                )}
              </button>
            </div>
          </div>

          {/* Driver Info / Status */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            {rideStep === 'request' && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚗</div>
                <h3 className="text-2xl font-bold text-white mb-2">Ready to Go?</h3>
                <p className="text-gray-300">Enter your destinations and we'll find you the perfect ride</p>
              </div>
            )}

            {rideStep === 'searching' && (
              <div className="text-center py-12">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-6"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Finding Your Driver</h3>
                <p className="text-gray-300">Searching for the best driver nearby...</p>
              </div>
            )}

            {driverInfo && (rideStep === 'found' || rideStep === 'ongoing') && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Your Driver</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="text-white font-bold">{driverInfo.rating}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-4xl">{driverInfo.photo}</div>
                  <div>
                    <h4 className="text-xl font-bold text-white">{driverInfo.name}</h4>
                    <p className="text-gray-300">{driverInfo.car}</p>
                    <p className="text-blue-400 font-semibold">Arriving in {driverInfo.arrivalTime}</p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center group">
                    <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Call
                  </button>
                  <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center group">
                    <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                    Message
                  </button>
                </div>

                {rideStep === 'found' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={confirmRide}
                      className="flex-1 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300"
                    >
                      Confirm Ride
                    </button>
                    <button
                      onClick={handleCancelRide}
                      className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Map Section */}
        {showMap && (
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 mb-12">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Navigation className="w-6 h-6 mr-3 text-blue-400" />
              Live Tracking
            </h3>
            <div className="h-80 bg-gradient-to-br from-blue-900/50 to-purple-900/50 rounded-2xl flex items-center justify-center border border-white/10">
              <div className="text-center">
                <div className="text-6xl mb-4">🗺️</div>
                <p className="text-white text-lg">Interactive Map</p>
                <p className="text-gray-300">Real-time driver location tracking</p>
                <div className="mt-4 w-32 h-2 bg-white/20 rounded-full mx-auto overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => navigate(action.route)}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group transform hover:scale-105"
            >
              <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-white font-semibold text-sm mb-1">{action.label}</h4>
              <p className="text-gray-400 text-xs">{action.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Notification */}
      {showNotification && rideStatus && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 transform transition-all duration-500 animate-pulse">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <p className="font-semibold">{rideStatus}</p>
          </div>
        </div>
      )}

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
        `
      }} />
    </div>
  );
};

export default RideDashboard;