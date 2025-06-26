import { useState, useEffect } from 'react';
import { 
 Camera, Star, Shield, CreditCard, MapPin, Phone, Mail, 
  Calendar, Clock, Award, Heart, Settings, ChevronRight, Edit3,
  Trophy, Target, Zap, Crown, ArrowLeft, Save, X, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+92 300 1234567",
    location: "Islamabad, Pakistan",
    joinDate: "January 2023",
    profilePicture: "👨‍💼"
  });
  const [editData, setEditData] = useState(profileData);

  // Stats data
  const userStats = {
    totalRides: 127,
    rating: 4.9,
    memberSince: "2 years",
    favoriteDestinations: 8,
    carbonSaved: "45 kg",
    totalSpent: "$1,247"
  };

  // Achievement data
  const achievements = [
    { icon: Crown, title: "VIP Member", description: "Gold tier status", color: "from-yellow-500 to-orange-500" },
    { icon: Star, title: "5-Star Rider", description: "Excellent ratings", color: "from-blue-500 to-purple-500" },
    { icon: Target, title: "Eco Warrior", description: "50+ green rides", color: "from-green-500 to-emerald-500" },
    { icon: Zap, title: "Speed Demon", description: "Quick booker", color: "from-red-500 to-pink-500" }
  ];

  // Recent activity
  const recentActivity = [
    { type: "ride", destination: "Blue Area", time: "2 hours ago", amount: "$8.50" },
    { type: "payment", destination: "Card ending ***4", time: "1 day ago", amount: "$25.00" },
    { type: "rating", destination: "Rated Ahmed Khan", time: "2 days ago", amount: "5 stars" },
    { type: "ride", destination: "F-10 Markaz", time: "3 days ago", amount: "$12.30" }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSaveProfile = () => {
    setProfileData(editData);
    setIsEditing(false);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancelEdit = () => {
    setEditData(profileData);
    setIsEditing(false);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'ride': return MapPin;
      case 'payment': return CreditCard;
      case 'rating': return Star;
      default: return Clock;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'ride': return 'text-blue-400';
      case 'payment': return 'text-green-400';
      case 'rating': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const handleNavigation = (route: string) => {
    console.log(`Navigating to: ${route}`);
    // In a real app, this would use react-router navigation
  };
 
  const navigate = useNavigate();

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
            <div className="w-1 h-1 bg-blue-400/40 rounded-full" />
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
            onClick={ () => {navigate('/ride')}}
            className="p-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            My Profile
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancelEdit}
                className="p-3 rounded-xl bg-red-500/20 backdrop-blur-md hover:bg-red-500/30 transition-all duration-300 group border border-red-500/30"
              >
                <X className="w-5 h-5 text-red-400 group-hover:scale-110 transition-transform duration-300" />
              </button>
              <button
                onClick={handleSaveProfile}
                className="p-3 rounded-xl bg-green-500/20 backdrop-blur-md hover:bg-green-500/30 transition-all duration-300 group border border-green-500/30"
              >
                <Save className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform duration-300" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group"
            >
              <Edit3 className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-500">
              <div className="text-center">
                {/* Profile Picture */}
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto shadow-2xl">
                    {profileData.profilePicture}
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 group">
                      <Camera className="w-4 h-4 text-white group-hover:scale-110 transition-transform duration-300" />
                    </button>
                  )}
                </div>

                {/* Profile Details */}
                <div className="space-y-4">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => setEditData({...editData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-center font-bold text-xl placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      />
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => setEditData({...editData, email: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-center placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      />
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => setEditData({...editData, phone: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-center placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      />
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => setEditData({...editData, location: e.target.value})}
                        className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white text-center placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                      />
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
                      <div className="flex items-center justify-center space-x-2 text-gray-300">
                        <Mail className="w-4 h-4" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-gray-300">
                        <Phone className="w-4 h-4" />
                        <span>{profileData.phone}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span>{profileData.location}</span>
                      </div>
                      <div className="flex items-center justify-center space-x-2 text-blue-400">
                        <Calendar className="w-4 h-4" />
                        <span>Member since {profileData.joinDate}</span>
                      </div>
                    </>
                  )}
                </div>

                {/* Rating Display */}
                <div className="mt-6 p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-2xl border border-yellow-400/30">
                  <div className="flex items-center justify-center space-x-2">
                    <Star className="w-6 h-6 text-yellow-400 fill-current" />
                    <span className="text-2xl font-bold text-white">{userStats.rating}</span>
                    <span className="text-gray-300">/ 5.0</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-1">Passenger Rating</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Trophy className="w-6 h-6 mr-3 text-yellow-400" />
                Quick Stats
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400">{userStats.totalRides}</div>
                  <div className="text-xs text-gray-300">Total Rides</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-green-400">{userStats.carbonSaved}</div>
                  <div className="text-xs text-gray-300">CO₂ Saved</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-purple-400">{userStats.favoriteDestinations}</div>
                  <div className="text-xs text-gray-300">Favorites</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl">
                  <div className="text-2xl font-bold text-orange-400">{userStats.totalSpent}</div>
                  <div className="text-xs text-gray-300">Total Spent</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activity & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Achievements */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-yellow-400" />
                Achievements
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <achievement.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{achievement.title}</h4>
                        <p className="text-gray-300 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-3 text-blue-400" />
                Recent Activity
              </h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const IconComponent = getActivityIcon(activity.type);
                  const iconColor = getActivityColor(activity.type);
                  
                  return (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-white/10 rounded-lg">
                          <IconComponent className={`w-5 h-5 ${iconColor}`} />
                        </div>
                        <div>
                          <p className="text-white font-medium">{activity.destination}</p>
                          <p className="text-gray-400 text-sm">{activity.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-bold">{activity.amount}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <button 
                onClick={() => handleNavigation('/activity')}
                className="w-full mt-6 py-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 text-white font-medium rounded-2xl border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 flex items-center justify-center group"
              >
                View All Activity
                <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>

            {/* Settings Quick Access */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Settings className="w-6 h-6 mr-3 text-gray-400" />
                Quick Settings
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button 
                  onClick={() => handleNavigation('/payment')}
                  className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="text-white font-medium">Payment Methods</h4>
                      <p className="text-gray-400 text-sm">Manage cards & wallets</p>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleNavigation('/safety')}
                  className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Shield className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="text-white font-medium">Safety & Security</h4>
                      <p className="text-gray-400 text-sm">Privacy & safety settings</p>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleNavigation('/favorites')}
                  className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <Heart className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                    <div>
                      <h4 className="text-white font-medium">Favorite Places</h4>
                      <p className="text-gray-400 text-sm">Saved destinations</p>
                    </div>
                  </div>
                </button>
                
                <button 
                  onClick={() => handleNavigation('/notifications')}
                  className="p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group text-left"
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Settings className="w-6 h-6 text-gray-400 group-hover:scale-110 transition-transform duration-300" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Notifications</h4>
                      <p className="text-gray-400 text-sm">Alerts & preferences</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Membership Status */}
            <div className="bg-gradient-to-r from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-md rounded-3xl p-8 border border-yellow-400/30">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                    <Crown className="w-7 h-7 mr-3 text-yellow-400" />
                    Gold Member
                  </h3>
                  <p className="text-gray-200 mb-4">Enjoy exclusive benefits and priority support</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-300">
                    <span>✓ Priority booking</span>
                    <span>✓ 24/7 support</span>
                    <span>✓ Exclusive offers</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl text-yellow-400 mb-2">👑</div>
                  <button className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-105">
                    Upgrade
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 transform transition-all duration-500 animate-pulse">
          <div className="flex items-center space-x-3">
            <Check className="w-5 h-5" />
            <p className="font-semibold">Profile updated successfully!</p>
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

export default ProfilePage;