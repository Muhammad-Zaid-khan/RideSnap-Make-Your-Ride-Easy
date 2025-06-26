/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  ArrowLeft, 
  MapPin, 
   
  Star, 
  CreditCard, 
  Gift, 
  AlertTriangle, 
  CheckCircle,  
  Heart,
  DollarSign,
  Calendar,
  Shield,
  Trash2,
  MoreVertical,
  Filter,
  Search,
  X,
  Settings
} from 'lucide-react';

type Notification = {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: React.FC<any>;
  color: string;
  actionText: string;
  priority: string;
};

const NotificationsPage = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [selectedNotifications, setSelectedNotifications] = useState<number[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mock notifications data
  const mockNotifications = [
    {
      id: 1,
      type: 'ride_completed',
      title: 'Ride Completed Successfully',
      message: 'Your ride with Ahmed Khan has been completed. Hope you enjoyed your journey!',
      time: '2 minutes ago',
      read: false,
      icon: CheckCircle,
      color: 'from-green-500 to-emerald-500',
      actionText: 'Rate Driver',
      priority: 'high'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Processed',
      message: 'Payment of $12.50 has been successfully processed for your last ride.',
      time: '15 minutes ago',
      read: false,
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-500',
      actionText: 'View Receipt',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'driver_arrived',
      title: 'Driver Has Arrived',
      message: 'Ahmed Khan has arrived at your pickup location. Please come outside.',
      time: '1 hour ago',
      read: true,
      icon: MapPin,
      color: 'from-purple-500 to-pink-500',
      actionText: 'View Details',
      priority: 'high'
    },
    {
      id: 4,
      type: 'promo',
      title: 'Special Offer Just for You!',
      message: 'Get 20% off your next 3 rides. Use code SAVE20 before it expires.',
      time: '3 hours ago',
      read: false,
      icon: Gift,
      color: 'from-yellow-500 to-orange-500',
      actionText: 'Use Promo',
      priority: 'low'
    },
    {
      id: 5,
      type: 'safety',
      title: 'Safety Check Complete',
      message: 'Your safety check has been completed. All emergency contacts are updated.',
      time: '1 day ago',
      read: true,
      icon: Shield,
      color: 'from-red-500 to-pink-500',
      actionText: 'View Safety',
      priority: 'medium'
    },
    {
      id: 6,
      type: 'ride_scheduled',
      title: 'Ride Scheduled Successfully',
      message: 'Your ride for tomorrow at 9:00 AM has been scheduled successfully.',
      time: '1 day ago',
      read: false,
      icon: Calendar,
      color: 'from-indigo-500 to-purple-500',
      actionText: 'View Schedule',
      priority: 'medium'
    },
    {
      id: 7,
      type: 'driver_rating',
      title: 'Thank You for Your Rating',
      message: 'Your 5-star rating for Ahmed Khan has been submitted. Thank you for your feedback!',
      time: '2 days ago',
      read: true,
      icon: Star,
      color: 'from-yellow-500 to-amber-500',
      actionText: 'View Profile',
      priority: 'low'
    },
    {
      id: 8,
      type: 'alert',
      title: 'Service Update',
      message: 'Due to high demand, wait times may be slightly longer in your area.',
      time: '3 days ago',
      read: false,
      icon: AlertTriangle,
      color: 'from-orange-500 to-red-500',
      actionText: 'Learn More',
      priority: 'medium'
    },
    {
      id: 9,
      type: 'favorite',
      title: 'New Favorite Added',
      message: 'Office Complex has been added to your favorite destinations.',
      time: '1 week ago',
      read: true,
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      actionText: 'View Favorites',
      priority: 'low'
    },
    {
      id: 10,
      type: 'earnings',
      title: 'Cashback Earned',
      message: 'You earned $2.50 cashback on your recent ride. Total savings: $25.00',
      time: '1 week ago',
      read: true,
      icon: DollarSign,
      color: 'from-green-500 to-teal-500',
      actionText: 'View Earnings',
      priority: 'low'
    }
  ];

  const filterOptions = [
    { key: 'all', label: 'All Notifications', count: mockNotifications.length },
    { key: 'unread', label: 'Unread', count: mockNotifications.filter(n => !n.read).length },
    { key: 'ride_completed', label: 'Ride Updates', count: mockNotifications.filter(n => n.type.includes('ride')).length },
    { key: 'payment', label: 'Payments', count: mockNotifications.filter(n => n.type === 'payment').length },
    { key: 'promo', label: 'Promotions', count: mockNotifications.filter(n => n.type === 'promo').length },
    { key: 'safety', label: 'Safety', count: mockNotifications.filter(n => n.type === 'safety').length }
  ];

  useEffect(() => {
    setNotifications(mockNotifications);
    setFilteredNotifications(mockNotifications);
  }, []);

  useEffect(() => {
    interface MousePosition {
      x: number;
      y: number;
    }

    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    let filtered = notifications;

    // Apply filter
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'unread') {
        filtered = filtered.filter(n => !n.read);
      } else {
        filtered = filtered.filter(n => n.type === selectedFilter || n.type.includes(selectedFilter));
      }
    }

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.message.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  }, [selectedFilter, searchQuery, notifications]);

  const handleNotificationClick = (notification: { id: any; type?: string; title?: string; message?: string; time?: string; read: any; icon?: FC<any>; color?: string; actionText?: string; priority?: string; }) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const markAsRead = (id: any) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleNotificationSelection = (id: number) => {
    setSelectedNotifications(prev => 
      prev.includes(id) 
        ? prev.filter(nId => nId !== id)
        : [...prev, id]
    );
  };

  const deleteSelectedNotifications = () => {
    setNotifications(prev => prev.filter(n => !selectedNotifications.includes(n.id)));
    setSelectedNotifications([]);
    setShowBulkActions(false);
  };

  const getNotificationIcon = (notification: { id?: number; type?: string; title?: string; message?: string; time?: string; read?: boolean; icon: any; color?: string; actionText?: string; priority?: string; }) => {
    const IconComponent = notification.icon;
    return <IconComponent className="w-6 h-6 text-white" />;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400/50 bg-red-400/10';
      case 'medium': return 'border-yellow-400/50 bg-yellow-400/10';
      case 'low': return 'border-green-400/50 bg-green-400/10';
      default: return 'border-gray-400/50 bg-gray-400/10';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Dynamic Mouse Cursor */}
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-screen opacity-70 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`
        }}
      />

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

      {/* Header */}
      <header className="relative z-20 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/ride')}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Notifications</h1>
            <p className="text-blue-200">Stay updated with your ride activities</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/setting')}
            className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group"
          >
            <Settings className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            Mark All Read
          </button>
        </div>
      </header>

      <div className="relative z-10 max-w-4xl mx-auto px-6 pb-8">
        {/* Search and Filter Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-all duration-300"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              )}
            </div>

            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterMenu(!showFilterMenu)}
                className="flex items-center space-x-2 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300"
              >
                <Filter className="w-5 h-5" />
                <span>Filter</span>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              </button>

              {/* Filter Dropdown */}
              {showFilterMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-black/95 backdrop-blur-xl rounded-2xl border border-white/20 p-4 z-30">
                  <h3 className="text-white font-semibold mb-3">Filter by Category</h3>
                  <div className="space-y-2">
                    {filterOptions.map((option) => (
                      <button
                        key={option.key}
                        onClick={() => {
                          setSelectedFilter(option.key);
                          setShowFilterMenu(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                          selectedFilter === option.key 
                            ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-blue-500/50' 
                            : 'bg-white/5 hover:bg-white/10 border border-transparent'
                        }`}
                      >
                        <span className="text-white">{option.label}</span>
                        <span className="text-blue-400 font-semibold">{option.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bulk Actions */}
            {selectedNotifications.length > 0 && (
              <button
                onClick={() => setShowBulkActions(!showBulkActions)}
                className="flex items-center space-x-2 px-4 py-3 bg-red-600/20 border border-red-500/50 rounded-xl text-red-400 hover:bg-red-600/30 transition-all duration-300"
              >
                <Trash2 className="w-5 h-5" />
                <span>Delete ({selectedNotifications.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 text-center">
              <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Notifications Found</h3>
              <p className="text-gray-400">
                {searchQuery ? 'Try adjusting your search terms' : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer group transform hover:scale-[1.02] ${
                  !notification.read ? 'ring-2 ring-blue-500/50' : ''
                } ${getPriorityColor(notification.priority)}`}
              >
                <div className="flex items-start space-x-4">
                  {/* Selection Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedNotifications.includes(notification.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleNotificationSelection(notification.id);
                      }}
                      className="w-4 h-4 text-blue-600 bg-transparent border-2 border-white/30 rounded focus:ring-blue-500 focus:ring-2"
                    />
                  </div>

                  {/* Notification Icon */}
                  <div className={`w-12 h-12 bg-gradient-to-r ${notification.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                    {getNotificationIcon(notification)}
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold ${!notification.read ? 'text-white' : 'text-gray-300'} group-hover:text-white transition-colors duration-300`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        )}
                        <span className="text-sm text-gray-400">{notification.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-3 group-hover:text-gray-300 transition-colors duration-300">
                      {notification.message}
                    </p>
                    {notification.actionText && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle action click
                        }}
                        className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105"
                      >
                        {notification.actionText}
                      </button>
                    )}
                  </div>

                  {/* Actions Menu */}
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Handle menu toggle
                      }}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 opacity-0 group-hover:opacity-100"
                    >
                      <MoreVertical className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More Button */}
        {filteredNotifications.length > 0 && (
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
              Load More Notifications
            </button>
          </div>
        )}
      </div>

      {/* Bulk Delete Confirmation */}
      {showBulkActions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-white mb-4">Delete Notifications</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete {selectedNotifications.length} selected notifications? This action cannot be undone.
            </p>
            <div className="flex space-x-4">
              <button
                onClick={deleteSelectedNotifications}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all duration-300"
              >
                Delete
              </button>
              <button
                onClick={() => setShowBulkActions(false)}
                className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInFromTop {
            0% { transform: translateY(-100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          
          .animate-slideInFromTop {
            animation: slideInFromTop 0.5s ease-out;
          }
          
          @keyframes bounce {
            0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
            40%, 43% { transform: translateY(-10px); }
            70% { transform: translateY(-5px); }
            90% { transform: translateY(-2px); }
          }
          
          .animate-bounce-gentle {
            animation: bounce 2s infinite;
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

export default NotificationsPage;