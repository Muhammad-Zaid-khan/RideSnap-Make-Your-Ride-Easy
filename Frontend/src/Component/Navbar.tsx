/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  MapPin, 
  User, 
  Bell, 
  Search, 
  Car, 
  Clock, 
  Shield, 
  CreditCard,
  Settings,
  LogOut,
  ChevronDown,
  Star,
  Gift,
  Headphones
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: null,
    rating: 4.8,
    membership: 'Premium',
    rides: 127
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.notification-dropdown')) {
        setIsNotificationOpen(false);
      }
      if (!target.closest('.profile-dropdown')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { 
      name: 'Services', 
      href: '#services', 
      icon: Car,
      hasDropdown: true,
      dropdownItems: [
        { name: 'Book Ride', href: '#book', icon: MapPin, desc: 'Quick & reliable rides' },
        { name: 'Scheduled Rides', href: '#schedule', icon: Clock, desc: 'Plan your trips ahead' },
        { name: 'Premium Cars', href: '#premium', icon: Star, desc: 'Luxury ride experience' },
        { name: 'Delivery', href: '#delivery', icon: Gift, desc: 'Package delivery service' }
      ]
    },
    { name: 'Track Ride', href: '#track', icon: Search },
    { name: 'Safety', href: '#safety', icon: Shield },
    { name: 'Support', href: '#support', icon: Headphones },
  ];

  const notificationItems = [
    { id: 1, type: 'ride', message: 'Your ride is arriving in 3 minutes', time: '2m ago', read: false },
    { id: 2, type: 'promotion', message: 'Get 20% off on your next ride!', time: '1h ago', read: false },
    { id: 3, type: 'update', message: 'Your ride has been completed', time: '2h ago', read: true }
  ];

  const handleNotificationClick = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const markAllAsRead = () => {
    setNotifications(0);
  };

  const navigate = useNavigate();

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-xl border-b border-gray-200' 
        : 'bg-white shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Enhanced Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick = {() => {navigate('/')}}>
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:rotate-6">
                <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center">
                  <Car className="w-4 h-4 text-green-600 cursor-pointer" onClick={() => {navigate('/')}}/>
                </div>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className= "text-2xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                RideSnap
              </h1>
              <p className="text-xs text-gray-500 -mt-1 font-medium">Quick & Reliable</p>
            </div>
          </div>

          {/* Enhanced Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.name} className="relative">
                  <button
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200 group"
                    onMouseEnter={() => item.hasDropdown && setIsServicesOpen(true)}
                    onMouseLeave={() => item.hasDropdown && setIsServicesOpen(false)}
                  >
                    <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span className="font-medium">{item.name}</span>
                    {item.hasDropdown && <ChevronDown className="w-3 h-3 transition-transform duration-200" />}
                  </button>
                  
                  {/* Services Dropdown */}
                  {item.hasDropdown && isServicesOpen && (
                    <div 
                      className="absolute top-full left-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50"
                      onMouseEnter={() => setIsServicesOpen(true)}
                      onMouseLeave={() => setIsServicesOpen(false)}
                    >
                      {item.dropdownItems?.map((dropdownItem) => {
                        const DropdownIcon = dropdownItem.icon;
                        return (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="flex items-center space-x-3 px-4 py-3 hover:bg-green-50 transition-colors duration-200 group"
                          >
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-200">
                              <DropdownIcon className="w-4 h-4 text-green-600" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{dropdownItem.name}</p>
                              <p className="text-xs text-gray-500">{dropdownItem.desc}</p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Enhanced Right Section */}
          <div className="flex items-center space-x-3">
            
            {/* Search Bar (Desktop) */}
            <div className="hidden xl:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64 focus-within:bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:ring-opacity-50 transition-all duration-200">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search destinations..." 
                className="ml-2 bg-transparent outline-none text-sm flex-1 text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Enhanced Notifications */}
            <div className="relative notification-dropdown">
              <button 
                onClick={handleNotificationClick}
                className="p-2 rounded-xl text-gray-600 hover:text-green-700 hover:bg-green-50 transition-all duration-200 relative group"
              >
                <Bell className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                    {notifications}
                  </span>
                )}
              </button>
              
              {/* Notification Dropdown - Only shows when clicked */}
              {isNotificationOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    {notifications > 0 && (
                      <button 
                        onClick={markAllAsRead}
                        className="text-xs text-green-600 hover:text-green-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  {notificationItems.length > 0 ? (
                    notificationItems.map((notification) => (
                      <div 
                        key={notification.id} 
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-2 transition-all duration-200 ${
                          !notification.read 
                            ? 'bg-blue-50 border-l-blue-500' 
                            : 'border-l-transparent hover:border-l-gray-200'
                        }`}
                      >
                        <p className="text-sm text-gray-800">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Bell className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">No notifications</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Enhanced User Profile */}
            <div className="relative profile-dropdown">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center cursor-pointer hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-medium text-gray-800">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.membership} • {currentUser.rides} rides</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-all duration-200" />
              </button>
              
              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{currentUser.name}</p>
                        <p className="text-sm text-gray-500">{currentUser.email}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{currentUser.rating}</span>
                          <span className="text-xs text-gray-400">• {currentUser.membership}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="py-1">
                    <a href="#profile" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">My Profile</span>
                    </a>
                    <a href="#rides" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200">
                      <Car className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">My Rides</span>
                    </a>
                    <a href="#payment" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Payment Methods</span>
                    </a>
                    <a href="#settings" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 transition-colors duration-200">
                      <Settings className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Settings</span>
                    </a>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-1">
                    <button className="flex items-center space-x-3 px-4 py-2 hover:bg-red-50 transition-colors duration-200 w-full text-left">
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-red-600">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Book Now Button */}
            <button className="hidden sm:block bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white px-6 py-2.5 rounded-xl font-medium hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-0.5">
              Book Now
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? 'max-h-screen pb-4' : 'max-h-0'
        }`}>
          <div className="pt-4 space-y-2">
            {/* Mobile Search */}
            <div className="px-4 pb-2">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search destinations..." 
                  className="ml-2 bg-transparent outline-none text-sm flex-1"
                />
              </div>
            </div>
            
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <div key={item.name}>
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-green-700 hover:bg-green-50 transition-all duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </a>
                  
                  {/* Mobile Dropdown Items */}
                  {item.hasDropdown && (
                    <div className="ml-8 space-y-1">
                      {item.dropdownItems?.map((dropdownItem) => {
                        const DropdownIcon = dropdownItem.icon;
                        return (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-600 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <DropdownIcon className="w-4 h-4" />
                            <span className="text-sm">{dropdownItem.name}</span>
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
            
            {/* Enhanced Mobile User Section */}
            <div className="px-4 py-3 border-t border-gray-100 mt-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{currentUser.name}</p>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-600">{currentUser.rating}</span>
                    <span className="text-xs text-gray-400">• {currentUser.membership}</span>
                  </div>
                </div>
              </div>
              
              {/* Mobile Profile Links */}
              <div className="space-y-2 mb-4">
                <a href="#profile" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600">
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </a>
                <a href="#rides" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600">
                  <Car className="w-4 h-4" />
                  <span>My Rides</span>
                </a>
                <a href="#payment" className="flex items-center space-x-2 text-sm text-gray-600 hover:text-green-600">
                  <CreditCard className="w-4 h-4" />
                  <span>Payment Methods</span>
                </a>
              </div>
              
              {/* Mobile Book Now Button */}
              <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg mb-3">
                Book Ride Now
              </button>
              
              <button className="w-full flex items-center justify-center space-x-2 text-red-600 hover:text-red-700 py-2">
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;