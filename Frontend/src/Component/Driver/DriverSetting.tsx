import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DriverSettings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    rideRequests: true,
    messages: true,
    earnings: false,
    promotions: true,
    maintenance: true
  });
  const [preferences, setPreferences] = useState({
    language: "english",
    currency: "USD",
    theme: "dark",
    soundEffects: true,
    voiceNavigation: true,
    autoAccept: false
  });
  const [privacy, setPrivacy] = useState({
    shareLocation: true,
    showRating: true,
    allowMessages: true,
    dataCollection: false
  });
  const [profile, setProfile] = useState({
    name: "Ahmed Khan",
    phone: "+92-300-1234567",
    email: "ahmed.driver@example.com",
    license: "KHI-2024-001234",
    vehicleModel: "Toyota Corolla 2020",
    plateNumber: "ABC-123"
  });

  const navigate = useNavigate();
  const tabs = [
    { id: "profile", name: "Profile", icon: "👤" },
    { id: "notifications", name: "Notifications", icon: "🔔" },
    { id: "preferences", name: "Preferences", icon: "⚙️" },
    { id: "privacy", name: "Privacy", icon: "🔒" },
    { id: "help", name: "Help", icon: "❓" }
  ];

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePreferenceChange = (key: string, value: string | boolean) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key: string) => {
    setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProfileChange = (key: string, value: string) => {
    setProfile(prev => ({ ...prev, [key]: value }));
  };

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">📝</span>
          Personal Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => handleProfileChange("name", e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-xl p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => handleProfileChange("phone", e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-xl p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter your phone number"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => handleProfileChange("email", e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-xl p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Driver License</label>
            <input
              type="text"
              value={profile.license}
              onChange={(e) => handleProfileChange("license", e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-xl p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="License number"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">🚗</span>
          Vehicle Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Vehicle Model</label>
            <input
              type="text"
              value={profile.vehicleModel}
              onChange={(e) => handleProfileChange("vehicleModel", e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-xl p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="e.g., Toyota Corolla 2020"
            />
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">License Plate</label>
            <input
              type="text"
              value={profile.plateNumber}
              onChange={(e) => handleProfileChange("plateNumber", e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-xl p-3 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              placeholder="Enter plate number"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl hover:scale-105 transition-transform duration-300 shadow-lg font-semibold">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">🔔</span>
          Notification Preferences
        </h3>
        
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div>
                <h4 className="text-white font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-gray-400 text-sm">
                  {key === 'rideRequests' && 'Get notified when new ride requests come in'}
                  {key === 'messages' && 'Receive passenger messages and updates'}
                  {key === 'earnings' && 'Daily and weekly earnings summaries'}
                  {key === 'promotions' && 'Special offers and bonus opportunities'}
                  {key === 'maintenance' && 'Vehicle maintenance reminders'}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange(key)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                  value ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  value ? 'transform translate-x-7' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">⚙️</span>
          App Preferences
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Language</label>
            <select
              value={preferences.language}
              onChange={(e) => handlePreferenceChange("language", e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="english" className="bg-gray-800">English</option>
              <option value="urdu" className="bg-gray-800">اردو (Urdu)</option>
              <option value="sindhi" className="bg-gray-800">سنڌي (Sindhi)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Currency</label>
            <select
              value={preferences.currency}
              onChange={(e) => handlePreferenceChange("currency", e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="PKR" className="bg-gray-800">PKR (Pakistani Rupee)</option>
              <option value="USD" className="bg-gray-800">USD (US Dollar)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Theme</label>
            <select
              value={preferences.theme}
              onChange={(e) => handlePreferenceChange("theme", e.target.value)}
              className="w-full bg-white/20 border border-white/30 rounded-xl p-3 text-white focus:border-blue-500 focus:outline-none transition-colors"
            >
              <option value="dark" className="bg-gray-800">Dark Mode</option>
              <option value="light" className="bg-gray-800">Light Mode</option>
              <option value="auto" className="bg-gray-800">Auto</option>
            </select>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div>
              <h4 className="text-white font-medium">Sound Effects</h4>
              <p className="text-gray-400 text-sm">Play sounds for notifications and actions</p>
            </div>
            <button
              onClick={() => handlePreferenceChange("soundEffects", !preferences.soundEffects)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                preferences.soundEffects ? 'bg-green-500' : 'bg-gray-400'
              }`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                preferences.soundEffects ? 'transform translate-x-7' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div>
              <h4 className="text-white font-medium">Voice Navigation</h4>
              <p className="text-gray-400 text-sm">Enable voice-guided navigation</p>
            </div>
            <button
              onClick={() => handlePreferenceChange("voiceNavigation", !preferences.voiceNavigation)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                preferences.voiceNavigation ? 'bg-green-500' : 'bg-gray-400'
              }`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                preferences.voiceNavigation ? 'transform translate-x-7' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
            <div>
              <h4 className="text-white font-medium">Auto Accept Rides</h4>
              <p className="text-gray-400 text-sm">Automatically accept ride requests</p>
            </div>
            <button
              onClick={() => handlePreferenceChange("autoAccept", !preferences.autoAccept)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                preferences.autoAccept ? 'bg-green-500' : 'bg-gray-400'
              }`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                preferences.autoAccept ? 'transform translate-x-7' : 'translate-x-0.5'
              }`}></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">🔒</span>
          Privacy & Security
        </h3>
        
        <div className="space-y-4">
          {Object.entries(privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div>
                <h4 className="text-white font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-gray-400 text-sm">
                  {key === 'shareLocation' && 'Share your location with passengers during rides'}
                  {key === 'showRating' && 'Display your rating publicly to passengers'}
                  {key === 'allowMessages' && 'Allow passengers to send you messages'}
                  {key === 'dataCollection' && 'Allow collection of data for service improvement'}
                </p>
              </div>
              <button
                onClick={() => handlePrivacyChange(key)}
                className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                  value ? 'bg-green-500' : 'bg-gray-400'
                }`}
              >
                <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full transition-transform duration-300 ${
                  value ? 'transform translate-x-7' : 'translate-x-0.5'
                }`}></div>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-red-500/20 rounded-xl border border-red-500/30">
          <h4 className="text-red-300 font-medium mb-2">Account Actions</h4>
          <div className="flex flex-wrap gap-3">
            <button className="bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 px-4 py-2 rounded-lg hover:bg-yellow-500/30 transition-colors">
              Change Password
            </button>
            <button className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-2 rounded-lg hover:bg-red-500/30 transition-colors">
              Deactivate Account
            </button>
            <button className="bg-gray-500/20 border border-gray-500/30 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-500/30 transition-colors">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHelp = () => (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center">
          <span className="mr-3">❓</span>
          Help & Support
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/30 p-6 rounded-xl hover:scale-105 transition-transform duration-300 text-left">
            <div className="text-3xl mb-3">📚</div>
            <h4 className="text-white font-semibold mb-2">User Guide</h4>
            <p className="text-gray-300 text-sm">Learn how to use the app effectively</p>
          </button>

          <button className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 p-6 rounded-xl hover:scale-105 transition-transform duration-300 text-left">
            <div className="text-3xl mb-3">💬</div>
            <h4 className="text-white font-semibold mb-2">Live Chat</h4>
            <p className="text-gray-300 text-sm">Chat with our support team</p>
          </button>

          <button className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 p-6 rounded-xl hover:scale-105 transition-transform duration-300 text-left">
            <div className="text-3xl mb-3">📞</div>
            <h4 className="text-white font-semibold mb-2">Call Support</h4>
            <p className="text-gray-300 text-sm">+92-21-111-RIDE (7433)</p>
          </button>

          <button className="bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/30 p-6 rounded-xl hover:scale-105 transition-transform duration-300 text-left">
            <div className="text-3xl mb-3">🐛</div>
            <h4 className="text-white font-semibold mb-2">Report Bug</h4>
            <p className="text-gray-300 text-sm">Report technical issues</p>
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-500/20 rounded-xl border border-blue-500/30">
          <h4 className="text-blue-300 font-medium mb-3">Frequently Asked Questions</h4>
          <div className="space-y-3">
            <details className="group">
              <summary className="cursor-pointer text-white hover:text-blue-300 transition-colors">
                How do I update my vehicle information?
              </summary>
              <p className="text-gray-400 text-sm mt-2 ml-4">
                Go to Profile tab in Settings, scroll to Vehicle Information section, and update your details.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-white hover:text-blue-300 transition-colors">
                Why am I not receiving ride requests?
              </summary>
              <p className="text-gray-400 text-sm mt-2 ml-4">
                Make sure you're online, in a high-demand area, and check your notification settings.
              </p>
            </details>
            <details className="group">
              <summary className="cursor-pointer text-white hover:text-blue-300 transition-colors">
                How do I withdraw my earnings?
              </summary>
              <p className="text-gray-400 text-sm mt-2 ml-4">
                Visit the earnings section in your dashboard to set up withdrawal methods.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-green-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-500 rounded-full animate-pulse"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">⚙️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Settings</h1>
              <p className="text-gray-300">Customize your driver experience</p>
            </div>
          </div>
          
          <button
          onClick={()=>{navigate('/driver')}}
          className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white hover:bg-white/20 transition-colors">
            <span className="text-xl">←</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="font-medium">{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl">
          {activeTab === "profile" && renderProfile()}
          {activeTab === "notifications" && renderNotifications()}
          {activeTab === "preferences" && renderPreferences()}
          {activeTab === "privacy" && renderPrivacy()}
          {activeTab === "help" && renderHelp()}
        </div>
      </div>

      {/* Custom Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
            50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
          details summary::-webkit-details-marker {
            display: none;
          }
          details summary::before {
            content: '▶';
            margin-right: 8px;
            transition: transform 0.2s;
          }
          details[open] summary::before {
            transform: rotate(90deg);
          }
        `
      }} />
    </div>
  );
};

export default DriverSettings;