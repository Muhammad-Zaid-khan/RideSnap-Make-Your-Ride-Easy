/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, SetStateAction } from 'react';
import { 
  ArrowLeft, User, Bell, Shield, CreditCard, MapPin, Moon, Sun, 
  Volume2, VolumeX, Smartphone, Mail, Phone, Lock, 
  Eye, EyeOff, Camera, Edit3, Trash2, Plus, Check, X,
  Settings as SettingsIcon, HelpCircle, LogOut, Star,
   Car, Palette, Zap, Languages, 
  Clock, Gift, Award, AlertTriangle, FileText,
} from 'lucide-react';

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: false,
    marketing: false,
    driverUpdates: true,
    promos: false
  });
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [profileData, setProfileData] = useState({
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+92 300 1234567',
    photo: '👨‍💼',
    emergencyContact: '+92 301 9876543',
    dateOfBirth: '1990-05-15'
  });

  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: 'card', name: 'Visa ****1234', isDefault: true, expiry: '12/25' },
    { id: 2, type: 'card', name: 'MasterCard ****5678', isDefault: false, expiry: '08/26' },
    { id: 3, type: 'wallet', name: 'JazzCash Wallet', isDefault: false, balance: 'Rs. 2,500' },
    { id: 4, type: 'wallet', name: 'EasyPaisa', isDefault: false, balance: 'Rs. 1,800' }
  ]);

  const [savedPlaces, setSavedPlaces] = useState([
    { id: 1, name: 'Home', address: '123 Main Street, Islamabad, Pakistan', icon: '🏠', isDefault: true },
    { id: 2, name: 'Work', address: '456 Business Avenue, Rawalpindi, Pakistan', icon: '🏢', isDefault: false },
    { id: 3, name: 'Gym', address: '789 Fitness Center, F-8 Islamabad', icon: '💪', isDefault: false },
    { id: 4, name: 'Airport', address: 'Islamabad International Airport', icon: '✈️', isDefault: false }
  ]);

  const [privacySettings, setPrivacySettings] = useState({
    twoFactor: false,
    locationSharing: true,
    tripHistory: true,
    dataAnalytics: false,
    profileVisibility: 'private',
    rideSharing: true
  });

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const showNotificationMessage = (message: SetStateAction<string>) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const sections = [
    { id: 'profile', name: 'Profile', icon: User, color: 'from-blue-500 to-cyan-500', desc: 'Manage your personal information' },
    { id: 'notifications', name: 'Notifications', icon: Bell, color: 'from-purple-500 to-pink-500', desc: 'Control your notification preferences' },
    { id: 'privacy', name: 'Privacy & Security', icon: Shield, color: 'from-green-500 to-emerald-500', desc: 'Keep your account secure' },
    { id: 'payment', name: 'Payment Methods', icon: CreditCard, color: 'from-yellow-500 to-orange-500', desc: 'Manage payment options' },
    { id: 'places', name: 'Saved Places', icon: MapPin, color: 'from-red-500 to-rose-500', desc: 'Quick access to frequent locations' },
    { id: 'preferences', name: 'App Preferences', icon: SettingsIcon, color: 'from-indigo-500 to-purple-500', desc: 'Customize your app experience' },
    { id: 'help', name: 'Help & Support', icon: HelpCircle, color: 'from-teal-500 to-cyan-500', desc: 'Get help and contact support' }
  ];

  const handleProfileSave = () => {
    setEditingProfile(false);
    showNotificationMessage('Profile updated successfully! ✨');
  };

  const handleNotificationToggle = (type: string) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
    showNotificationMessage(`${type} notifications ${notifications[type] ? 'disabled' : 'enabled'} 🔔`);
  };

  const handlePrivacyToggle = (setting: string) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
    showNotificationMessage(`${setting} setting updated 🔒`);
  };

  const handlePaymentMethodToggle = (id: number) => {
    setPaymentMethods(prev => 
      prev.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    showNotificationMessage('Default payment method updated! 💳');
  };

  const deletePaymentMethod = (id: number) => {
    setPaymentMethods(prev => prev.filter(method => method.id !== id));
    showNotificationMessage('Payment method removed 🗑️');
  };

  const deleteSavedPlace = (id: number) => {
    setSavedPlaces(prev => prev.filter(place => place.id !== id));
    showNotificationMessage('Location removed from saved places 📍');
  };

  const renderProfileSection = () => (
    <div className="space-y-8">
      <div className="text-center">
        <div className="relative inline-block group">
          <div className="w-32 h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-6xl mb-4 relative overflow-hidden shadow-2xl group-hover:scale-105 transition-all duration-300">
            {profileData.photo}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer backdrop-blur-sm">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </div>
          <button className="absolute bottom-2 right-2 p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg transform hover:scale-110">
            <Edit3 className="w-4 h-4 text-white" />
          </button>
        </div>
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-white">{profileData.name}</h2>
          <p className="text-blue-300">Premium Rider Since 2023</p>
          <div className="flex items-center justify-center mt-2">
            <Star className="w-5 h-5 text-yellow-400 fill-current" />
            <span className="text-white ml-1 font-semibold">4.9</span>
            <span className="text-gray-300 ml-1">(127 rides)</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2 flex items-center">
              <User className="w-4 h-4 mr-2 text-blue-400" />
              Full Name
            </label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
              disabled={!editingProfile}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-60 backdrop-blur-sm"
            />
          </div>

          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2 flex items-center">
              <Mail className="w-4 h-4 mr-2 text-blue-400" />
              Email Address
            </label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
              disabled={!editingProfile}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-60 backdrop-blur-sm"
            />
          </div>

          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2 flex items-center">
              <Phone className="w-4 h-4 mr-2 text-blue-400" />
              Phone Number
            </label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
              disabled={!editingProfile}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-60 backdrop-blur-sm"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2 flex items-center">
              <AlertTriangle className="w-4 h-4 mr-2 text-red-400" />
              Emergency Contact
            </label>
            <input
              type="tel"
              value={profileData.emergencyContact}
              onChange={(e) => setProfileData(prev => ({ ...prev, emergencyContact: e.target.value }))}
              disabled={!editingProfile}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/50 transition-all duration-300 disabled:opacity-60 backdrop-blur-sm"
            />
          </div>

          <div className="relative">
            <label className="block text-white text-sm font-medium mb-2 flex items-center">
              <Gift className="w-4 h-4 mr-2 text-purple-400" />
              Date of Birth
            </label>
            <input
              type="date"
              value={profileData.dateOfBirth}
              onChange={(e) => setProfileData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
              disabled={!editingProfile}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 disabled:opacity-60 backdrop-blur-sm"
            />
          </div>

          <div className="p-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl border border-green-400/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold">Account Status</h4>
                <p className="text-green-300 text-sm">Verified Premium</p>
              </div>
              <Award className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        {!editingProfile ? (
          <button
            onClick={() => setEditingProfile(true)}
            className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-xl"
          >
            <Edit3 className="w-5 h-5 mr-2" />
            Edit Profile
          </button>
        ) : (
          <>
            <button
              onClick={handleProfileSave}
              className="flex-1 py-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-xl"
            >
              <Check className="w-5 h-5 mr-2" />
              Save Changes
            </button>
            <button
              onClick={() => setEditingProfile(false)}
              className="flex-1 py-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105 shadow-xl"
            >
              <X className="w-5 h-5 mr-2" />
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );

  const renderNotificationsSection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Notification Preferences</h3>
        <p className="text-gray-300">Stay informed about your rides and account</p>
      </div>

      <div className="grid gap-4">
        {Object.entries({
          push: { label: 'Push Notifications', desc: 'Receive ride updates and alerts instantly', icon: Smartphone, color: 'from-blue-500 to-cyan-500' },
          email: { label: 'Email Notifications', desc: 'Get receipts and important updates via email', icon: Mail, color: 'from-green-500 to-emerald-500' },
          sms: { label: 'SMS Notifications', desc: 'Receive text messages for ride confirmations', icon: Phone, color: 'from-yellow-500 to-orange-500' },
          driverUpdates: { label: 'Driver Updates', desc: 'Real-time updates about your driver arrival', icon: Car, color: 'from-purple-500 to-pink-500' },
          marketing: { label: 'Marketing Communications', desc: 'Promotions and special offers', icon: Star, color: 'from-red-500 to-rose-500' },
          promos: { label: 'Promotional Offers', desc: 'Discount codes and seasonal deals', icon: Gift, color: 'from-indigo-500 to-purple-500' }
        }).map(([key, config]) => (
          <div key={key} className="group">
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-white/20">
              <div className="flex items-center space-x-4">
                <div className={`p-3 bg-gradient-to-r ${config.color} rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <config.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{config.label}</h4>
                  <p className="text-gray-400 text-sm">{config.desc}</p>
                </div>
              </div>
              <button
                onClick={() => handleNotificationToggle(key)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                  notifications[key] ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                    notifications[key] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl border border-blue-400/30">
        <h4 className="text-white font-semibold mb-2 flex items-center">
          <Bell className="w-5 h-5 mr-2 text-blue-400" />
          Notification Schedule
        </h4>
        <p className="text-gray-300 text-sm mb-4">Set quiet hours to avoid notifications during specific times</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-white text-sm mb-2">Quiet Hours Start</label>
            <input
              type="time"
              defaultValue="22:00"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-white text-sm mb-2">Quiet Hours End</label>
            <input
              type="time"
              defaultValue="07:00"
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Privacy & Security</h3>
        <p className="text-gray-300">Keep your account safe and secure</p>
      </div>

      <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
        <h4 className="text-white font-semibold mb-4 flex items-center">
          <Lock className="w-5 h-5 mr-2 text-blue-400" />
          Change Password
        </h4>
        <div className="space-y-4">
          <div className="relative">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 pr-12 backdrop-blur-sm"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Confirm New Password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 backdrop-blur-sm"
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
            Update Password
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {[
          { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account', icon: Shield, color: 'text-green-400' },
          { key: 'locationSharing', label: 'Location Sharing', desc: 'Share your location during rides for safety', icon: MapPin, color: 'text-blue-400' },
          { key: 'tripHistory', label: 'Trip History', desc: 'Keep a record of all your rides', icon: Clock, color: 'text-purple-400' },
          { key: 'dataAnalytics', label: 'Data Analytics', desc: 'Help improve our service with anonymized data', icon: Zap, color: 'text-yellow-400' },
          { key: 'rideSharing', label: 'Allow Ride Sharing', desc: 'Enable shared rides with other passengers', icon: Car, color: 'text-cyan-400' }
        ].map((item) => (
          <div key={item.key} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-white/10 rounded-lg group-hover:scale-110 transition-transform duration-300">
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <h4 className="text-white font-semibold">{item.label}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            </div>
            <button
              onClick={() => handlePrivacyToggle(item.key)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                privacySettings[item.key] ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                  privacySettings[item.key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="p-6 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl border border-red-400/30">
        <h4 className="text-white font-semibold mb-2 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-red-400" />
          Account Deletion
        </h4>
        <p className="text-gray-300 text-sm mb-4">Permanently delete your account and all associated data</p>
        <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-300">
          Delete Account
        </button>
      </div>
    </div>
  );

  const renderPaymentSection = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Payment Methods</h3>
          <p className="text-gray-300">Manage your payment options</p>
        </div>
        <button className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="grid gap-4">
        {paymentMethods.map((method) => (
          <div key={method.id} className="group">
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-white/20">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{method.name}</h4>
                  <p className="text-gray-400 text-sm">
                    {method.type === 'card' ? `Expires ${method.expiry}` : `Balance: ${method.balance}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {method.isDefault && (
                  <span className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm rounded-full font-semibold shadow-lg">
                    Default
                  </span>
                )}
                <button
                  onClick={() => handlePaymentMethodToggle(method.id)}
                  className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-300 shadow-lg hover:scale-110"
                >
                  <Check className="w-4 h-4 text-white" />
                </button>
                <button 
                  onClick={() => deletePaymentMethod(method.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300 shadow-lg hover:scale-110"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-6 border-2 border-dashed border-white/30 rounded-2xl text-white hover:border-blue-500 hover:bg-white/5 transition-all duration-300 flex items-center justify-center group">
        <Plus className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
        <span className="text-lg font-semibold">Add Payment Method</span>
      </button>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl border border-green-400/30">
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-green-400" />
            Payment Security
          </h4>
          <p className="text-gray-300 text-sm">All payments are encrypted and secured with industry-standard protection</p>
        </div>
        <div className="p-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-400/30">
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-400" />
            Transaction History
          </h4>
          <p className="text-gray-300 text-sm">View and download your complete payment history</p>
          <button className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors duration-300">
            View History
          </button>
        </div>
      </div>
    </div>
  );

  const renderPlacesSection = () => (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-white">Saved Places</h3>
          <p className="text-gray-300">Quick access to your frequent destinations</p>
        </div>
        <button className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 shadow-lg">
          <Plus className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="grid gap-4">
        {savedPlaces.map((place) => (
          <div key={place.id} className="group">
            <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-white/20">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{place.icon}</div>
                <div>
                  <h4 className="text-white font-semibold text-lg">{place.name}</h4>
                  <p className="text-gray-400 text-sm">{place.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {place.isDefault && (
                  <span className="px-3 py-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white text-sm rounded-full font-semibold shadow-lg">
                    Default
                  </span>
                )}
                <button 
                  onClick={() => deleteSavedPlace(place.id)}
                  className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-300 shadow-lg hover:scale-110"
                >
                  <Trash2 className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full py-6 border-2 border-dashed border-white/30 rounded-2xl text-white hover:border-blue-500 hover:bg-white/5 transition-all duration-300 flex items-center justify-center group">
        <Plus className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform" />
        <span className="text-lg font-semibold">Add New Place</span>
      </button>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">App Preferences</h3>
        <p className="text-gray-300">Customize your app experience</p>
      </div>

      <div className="grid gap-6">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h4 className="text-white font-semibold mb-4 flex items-center">
            <Palette className="w-5 h-5 mr-2 text-purple-400" />
            Theme Settings
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {darkMode ? <Moon className="w-6 h-6 text-blue-400" /> : <Sun className="w-6 h-6 text-yellow-400" />}
              <div>
                <h5 className="text-white font-medium">Dark Mode</h5>
                <p className="text-gray-400 text-sm">Switch between light and dark themes</p>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                darkMode ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h4 className="text-white font-semibold mb-4 flex items-center">
            <Volume2 className="w-5 h-5 mr-2 text-green-400" />
            Sound Settings
          </h4>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {soundEnabled ? <Volume2 className="w-6 h-6 text-green-400" /> : <VolumeX className="w-6 h-6 text-red-400" />}
              <div>
                <h5 className="text-white font-medium">Sound Effects</h5>
                <p className="text-gray-400 text-sm">Enable app sounds and notifications</p>
              </div>
            </div>
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-300 ${
                soundEnabled ? 'bg-gradient-to-r from-green-600 to-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h4 className="text-white font-semibold mb-4 flex items-center">
            <Languages className="w-5 h-5 mr-2 text-cyan-400" />
            Language & Region
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-white text-sm mb-2">Language</label>
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-blue-500 transition-colors">
                <option value="en">English</option>
                <option value="ur">اردو (Urdu)</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="ar">العربية (Arabic)</option>
              </select>
            </div>
            <div>
              <label className="block text-white text-sm mb-2">Region</label>
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-blue-500 transition-colors">
                <option value="pk">Pakistan</option>
                <option value="in">India</option>
                <option value="bd">Bangladesh</option>
                <option value="ae">UAE</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h4 className="text-white font-semibold mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-yellow-400" />
            Performance
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-white font-medium">High Quality Maps</h5>
                <p className="text-gray-400 text-sm">Use more data for better map quality</p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                <span className="inline-block h-5 w-5 transform rounded-full bg-white translate-x-6 transition-transform duration-300 shadow-lg" />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-white font-medium">Auto-Refresh Location</h5>
                <p className="text-gray-400 text-sm">Continuously update your location</p>
              </div>
              <button className="relative inline-flex h-7 w-12 items-center rounded-full bg-gradient-to-r from-green-600 to-blue-600">
                <span className="inline-block h-5 w-5 transform rounded-full bg-white translate-x-6 transition-transform duration-300 shadow-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelpSection = () => (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Help & Support</h3>
        <p className="text-gray-300">Get assistance and contact our support team</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">FAQ</h4>
              <p className="text-gray-400 text-sm">Frequently asked questions</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">Find answers to common questions about rides, payments, and account management.</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">Call Support</h4>
              <p className="text-gray-400 text-sm">24/7 phone support</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">Speak directly with our support team for immediate assistance.</p>
          <p className="text-blue-400 font-semibold mt-2">+92 21 111 RIDE (7433)</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">Email Support</h4>
              <p className="text-gray-400 text-sm">Written support requests</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">Send us detailed questions and we'll respond within 24 hours.</p>
          <p className="text-blue-400 font-semibold mt-2">support@ridesnap.com</p>
        </div>

        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-lg">Report Issue</h4>
              <p className="text-gray-400 text-sm">Submit bug reports</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm">Help us improve by reporting any issues or bugs you encounter.</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl p-6 border border-red-400/30">
        <h4 className="text-white font-semibold mb-4 flex items-center">
          <LogOut className="w-5 h-5 mr-2 text-red-400" />
          Account Actions
        </h4>
        <div className="space-y-3">
          <button className="w-full py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-xl transition-colors duration-300">
            Deactivate Account
          </button>
          <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors duration-300">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'notifications':
        return renderNotificationsSection();
      case 'privacy':
        return renderPrivacySection();
      case 'payment':
        return renderPaymentSection();
      case 'places':
        return renderPlacesSection();
      case 'preferences':
        return renderPreferencesSection();
      case 'help':
        return renderHelpSection();
      default:
        return renderProfileSection();
    }
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
      <header className="relative z-20 p-6 flex items-center justify-between backdrop-blur-md bg-white/5">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.history.back()}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Settings
          </h1>
        </div>
        <div className="text-white text-sm opacity-60">
          {new Date().toLocaleDateString('en-PK', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 sticky top-6">
              <h2 className="text-xl font-bold text-white mb-6">Settings Menu</h2>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 group ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl transform scale-105'
                        : 'bg-white/5 hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    <div className={`p-2 rounded-xl bg-gradient-to-r ${section.color} group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <section.icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-white font-semibold text-sm">{section.name}</h3>
                      <p className="text-gray-300 text-xs">{section.desc}</p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 min-h-[600px]">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Notification Toast */}
      {showNotification && notificationMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 transform transition-all duration-500 animate-bounce">
          <p className="font-semibold flex items-center">
            <div className="w-2 h-2 bg-white rounded-full mr-3 animate-pulse" />
            {notificationMessage}
          </p>
        </div>
      )}

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          .animate-slide-in-right {
            animation: slideInRight 0.5s ease-out;
          }
          
          @keyframes fadeInUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }
          
          .backdrop-blur-custom {
            backdrop-filter: blur(20px) saturate(180%);
          }
        `
      }} />
    </div>
  );
};

export default SettingsPage;