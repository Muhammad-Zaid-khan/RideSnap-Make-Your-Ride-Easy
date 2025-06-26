import  { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Star, 
  Phone, 
  MessageCircle, 
  Shield, 
  CreditCard, 
  User, 
  Settings, 
  Menu, 
  X, 
  ArrowLeft,
  Heart,
  Home,
  Briefcase,
  Coffee,
  ShoppingBag,
  Plus,
  Edit3,
  Trash2,
  Search,
  Filter,
  MoreVertical,
  Navigation2,
  Calendar,
  TrendingUp
} from 'lucide-react';

const FavoritesPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('places');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newFavorite, setNewFavorite] = useState({ name: '', address: '', category: 'home' });

  // Mock data for favorites
  const [favoritePlaces] = useState([
    {
      id: 1,
      name: 'Home',
      address: 'House 123, Street 45, F-8/2, Islamabad',
      category: 'home',
      icon: Home,
      color: 'from-blue-500 to-cyan-500',
      visits: 45,
      lastVisit: '2 hours ago'
    },
    {
      id: 2,
      name: 'Office',
      address: 'Plot 67, Blue Area, G-7, Islamabad',
      category: 'work',
      icon: Briefcase,
      color: 'from-purple-500 to-pink-500',
      visits: 32,
      lastVisit: '1 day ago'
    },
    {
      id: 3,
      name: 'Cafe Mocha',
      address: 'F-7 Markaz, Islamabad',
      category: 'dining',
      icon: Coffee,
      color: 'from-yellow-500 to-orange-500',
      visits: 18,
      lastVisit: '3 days ago'
    },
    {
      id: 4,
      name: 'Centaurus Mall',
      address: 'F-8, Islamabad',
      category: 'shopping',
      icon: ShoppingBag,
      color: 'from-green-500 to-emerald-500',
      visits: 12,
      lastVisit: '1 week ago'
    }
  ]);

  const [favoriteDrivers] = useState([
    {
      id: 1,
      name: 'Ahmed Khan',
      rating: 4.9,
      car: 'Honda Civic - ABC 123',
      photo: '👨‍💼',
      totalRides: 23,
      lastRide: '2 days ago',
      specialties: ['Airport runs', 'Night rides'],
      phone: '+92 300 1234567'
    },
    {
      id: 2,
      name: 'Muhammad Ali',
      rating: 4.8,
      car: 'Toyota Corolla - XYZ 789',
      photo: '👨‍🦱',
      totalRides: 18,
      lastRide: '5 days ago',
      specialties: ['Long distance', 'Careful driving'],
      phone: '+92 301 2345678'
    },
    {
      id: 3,
      name: 'Hassan Sheikh',
      rating: 4.7,
      car: 'Suzuki Swift - DEF 456',
      photo: '🧔',
      totalRides: 15,
      lastRide: '1 week ago',
      specialties: ['City tours', 'Friendly service'],
      phone: '+92 302 3456789'
    }
  ]);

  const [recentRides] = useState([
    {
      id: 1,
      from: 'Home',
      to: 'Office',
      date: '2025-06-24',
      time: '09:15 AM',
      driver: 'Ahmed Khan',
      fare: '$8.50',
      rating: 5,
      status: 'completed'
    },
    {
      id: 2,
      from: 'Office',
      to: 'Cafe Mocha',
      date: '2025-06-23',
      time: '01:30 PM',
      driver: 'Muhammad Ali',
      fare: '$5.20',
      rating: 5,
      status: 'completed'
    },
    {
      id: 3,
      from: 'Centaurus Mall',
      to: 'Home',
      date: '2025-06-22',
      time: '07:45 PM',
      driver: 'Hassan Sheikh',
      fare: '$12.30',
      rating: 4,
      status: 'completed'
    }
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleAddFavorite = () => {
    if (newFavorite.name && newFavorite.address) {
      setShowAddModal(false);
      setNewFavorite({ name: '', address: '', category: 'home' });
      // In real app, this would save to backend
    }
  };

  const filteredPlaces = favoritePlaces.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', label: 'All', icon: MapPin },
    { id: 'home', label: 'Home', icon: Home },
    { id: 'work', label: 'Work', icon: Briefcase },
    { id: 'dining', label: 'Dining', icon: Coffee },
    { id: 'shopping', label: 'Shopping', icon: ShoppingBag }
  ];

  const tabs = [
    { id: 'places', label: 'Places', icon: MapPin },
    { id: 'drivers', label: 'Drivers', icon: User },
    { id: 'routes', label: 'Routes', icon: Navigation2 },
    { id: 'history', label: 'History', icon: Clock }
  ];

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
            <div className="w-2 h-2 bg-yellow-400/30 rounded-full" />
          </div>
        ))}
      </div>

      {/* Dynamic Mouse Cursor */}
      <div 
        className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full pointer-events-none z-50 mix-blend-screen opacity-70 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`
        }}
      />

      {/* Header */}
      <header className="relative z-20 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Heart className="w-8 h-8 mr-3 text-yellow-400 fill-current animate-pulse" />
            Favorites
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="p-2 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-80 bg-black/90 backdrop-blur-xl p-6 transform transition-transform duration-300">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            <nav className="space-y-4">
              {[
                { icon: MapPin, label: "My Rides", color: "text-blue-400" },
                { icon: CreditCard, label: "Payment", color: "text-green-400" },
                { icon: Star, label: "Favorites", color: "text-yellow-400", active: true },
                { icon: Shield, label: "Safety", color: "text-red-400" },
                { icon: Settings, label: "Settings", color: "text-gray-400" }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-4 p-3 rounded-xl transition-all duration-300 cursor-pointer group ${
                    item.active ? 'bg-yellow-500/20 border border-yellow-400/30' : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform duration-300`} />
                  <span className="text-white group-hover:text-yellow-300 transition-colors duration-300">{item.label}</span>
                </div>
              ))}
            </nav>
          </div>
          <div 
            className="flex-1 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Search and Filter Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search favorites..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300 backdrop-blur-sm"
              />
            </div>
            <button className="px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all duration-300 flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Places Tab */}
        {activeTab === 'places' && (
          <div>
            {/* Category Filter */}
            <div className="flex space-x-2 mb-6 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-yellow-500/20 border border-yellow-400/30 text-yellow-300'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              ))}
            </div>

            {/* Places Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredPlaces.map((place) => (
                <div
                  key={place.id}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${place.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <place.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white">{place.name}</h3>
                        <p className="text-gray-300 text-sm">{place.address}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-300">
                      <span className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4" />
                        <span>{place.visits} visits</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{place.lastVisit}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center">
                      <Navigation className="w-4 h-4 mr-2" />
                      Go Here
                    </button>
                    <button className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all duration-300">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Drivers Tab */}
        {activeTab === 'drivers' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteDrivers.map((driver) => (
              <div
                key={driver.id}
                className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105"
              >
                <div className="text-center mb-4">
                  <div className="text-4xl mb-3">{driver.photo}</div>
                  <h3 className="text-xl font-bold text-white">{driver.name}</h3>
                  <p className="text-gray-300 text-sm">{driver.car}</p>
                </div>

                <div className="flex items-center justify-center space-x-1 mb-4">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="text-white font-bold">{driver.rating}</span>
                  <span className="text-gray-300 text-sm">({driver.totalRides} rides)</span>
                </div>

                <div className="space-y-2 mb-4">
                  {driver.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 text-xs rounded-full mr-2"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>

                <div className="text-center text-sm text-gray-300 mb-4">
                  Last ride: {driver.lastRide}
                </div>

                <div className="flex space-x-2">
                  <button className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </button>
                  <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛣️</div>
              <h3 className="text-2xl font-bold text-white mb-2">Favorite Routes</h3>
              <p className="text-gray-300">Your most traveled paths will appear here</p>
              <button className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300">
                Plan a Route
              </button>
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {recentRides.map((ride) => (
              <div
                key={ride.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
                      <Navigation className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{ride.from} → {ride.to}</h4>
                      <p className="text-gray-300 text-sm">with {ride.driver}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-green-400">{ride.fare}</div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < ride.rating ? 'text-yellow-400 fill-current' : 'text-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4 text-sm text-gray-300">
                  <span className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{ride.date} at {ride.time}</span>
                  </span>
                  <button className="text-yellow-400 hover:text-yellow-300 transition-colors duration-300">
                    Book Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Favorite Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-slate-900 rounded-3xl p-8 border border-white/20 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Add Favorite Place</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Place name"
                value={newFavorite.name}
                onChange={(e) => setNewFavorite({...newFavorite, name: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Address"
                value={newFavorite.address}
                onChange={(e) => setNewFavorite({...newFavorite, address: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300"
              />
              <select
                value={newFavorite.category}
                onChange={(e) => setNewFavorite({...newFavorite, category: e.target.value})}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/50 transition-all duration-300"
              >
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="dining">Dining</option>
                <option value="shopping">Shopping</option>
              </select>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFavorite}
                className="flex-1 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300"
              >
                Add Favorite
              </button>
            </div>
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
        `
      }} />
    </div>
  );
};

export default FavoritesPage;