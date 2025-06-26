import { useState, useEffect } from 'react';
import { 
  Shield, 
  Phone, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Eye, 
  Bell, 
  Camera,  
  Navigation,  
  User, 
  Settings, 
  CheckCircle, 
  X, 
  ArrowLeft,
  Zap,
  MessageCircle,
  Volume2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SafetyCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: 'Emergency Services', number: '1122', type: 'emergency' },
    { id: 2, name: 'Mom', number: '+92 300 1234567', type: 'personal' },
    { id: 3, name: 'Best Friend', number: '+92 301 9876543', type: 'personal' }
  ]);
  const [safetySettings, setSafetySettings] = useState({
    shareLocation: true,
    emergencySharing: true,
    rideTracking: true,
    photoVerification: true,
    soundRecording: false,
    nightMode: true
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', number: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const safetyFeatures = [
    {
      icon: Shield,
      title: 'Real-time Protection',
      description: 'Advanced AI monitoring every ride for unusual patterns',
      color: 'from-blue-500 to-cyan-500',
      status: 'Active'
    },
    {
      icon: Eye,
      title: 'Driver Verification',
      description: 'Photo verification and background checks for all drivers',
      color: 'from-green-500 to-emerald-500',
      status: 'Verified'
    },
    {
      icon: MapPin,
      title: 'GPS Tracking',
      description: 'Precise location sharing with trusted contacts',
      color: 'from-purple-500 to-pink-500',
      status: 'Enabled'
    },
    {
      icon: Phone,
      title: 'Emergency Button',
      description: 'One-tap access to emergency services and contacts',
      color: 'from-red-500 to-orange-500',
      status: 'Ready'
    }
  ];

  const safetyTips = [
    {
      icon: CheckCircle,
      tip: 'Always verify driver details match the app before getting in',
      category: 'Verification'
    },
    {
      icon: MapPin,
      tip: 'Share your trip details with trusted contacts',
      category: 'Communication'
    },
    {
      icon: Eye,
      tip: 'Sit behind the driver for optimal safety positioning',
      category: 'Positioning'
    },
    {
      icon: Phone,
      tip: 'Keep your phone charged and emergency contacts updated',
      category: 'Preparation'
    },
    {
      icon: Bell,
      tip: 'Trust your instincts - if something feels wrong, speak up',
      category: 'Awareness'
    },
    {
      icon: Users,
      tip: 'Travel with friends when possible, especially at night',
      category: 'Companionship'
    }
  ];

  const handleSettingToggle = (setting: string) => {
    setSafetySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const addEmergencyContact = () => {
    if (newContact.name && newContact.number) {
      setEmergencyContacts(prev => [...prev, {
        id: Date.now(),
        name: newContact.name,
        number: newContact.number,
        type: 'personal'
      }]);
      setNewContact({ name: '', number: '' });
      setShowAddContact(false);
    }
  };

  const removeContact = (id: number) => {
    setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
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
      <header className="relative z-20 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
          onClick={()=> {navigate('/ride')}}
          className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Safety Center
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 mb-8">
        <div className="flex space-x-2 bg-white/10 backdrop-blur-md rounded-2xl p-2">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'emergency', label: 'Emergency', icon: Phone },
            { id: 'settings', label: 'Settings', icon: Settings },
            { id: 'tips', label: 'Safety Tips', icon: AlertTriangle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-semibold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Safety Status */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Safety Status</h2>
                <div className="flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full border border-green-400/30">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-semibold">All Systems Active</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {safetyFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-sm mb-3">{feature.description}</p>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-sm font-semibold">{feature.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Button */}
            <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 backdrop-blur-md rounded-3xl p-8 border border-red-400/30">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-all duration-300 cursor-pointer group">
                  <Zap className="w-12 h-12 text-white group-hover:animate-pulse" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Emergency Alert</h3>
                <p className="text-gray-300 mb-6">Instantly alert emergency services and your trusted contacts</p>
                <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105">
                  Test Emergency Alert
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Tab */}
        {activeTab === 'emergency' && (
          <div className="space-y-8">
            {/* Emergency Contacts */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Emergency Contacts</h2>
                <button
                  onClick={() => setShowAddContact(true)}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Add Contact
                </button>
              </div>

              <div className="grid gap-4">
                {emergencyContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        contact.type === 'emergency' 
                          ? 'bg-gradient-to-r from-red-500 to-orange-500' 
                          : 'bg-gradient-to-r from-blue-500 to-purple-500'
                      }`}>
                        {contact.type === 'emergency' ? (
                          <AlertTriangle className="w-6 h-6 text-white" />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{contact.name}</h4>
                        <p className="text-gray-300">{contact.number}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-green-600 hover:bg-green-700 rounded-xl transition-all duration-300">
                        <Phone className="w-5 h-5 text-white" />
                      </button>
                      <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300">
                        <MessageCircle className="w-5 h-5 text-white" />
                      </button>
                      {contact.type !== 'emergency' && (
                        <button
                          onClick={() => removeContact(contact.id)}
                          className="p-2 bg-red-600 hover:bg-red-700 rounded-xl transition-all duration-300"
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Phone, label: 'Call 1122', color: 'from-red-500 to-red-600', desc: 'Emergency Services' },
                { icon: MapPin, label: 'Share Location', color: 'from-blue-500 to-blue-600', desc: 'Send current location' },
                { icon: Camera, label: 'Photo Evidence', color: 'from-purple-500 to-purple-600', desc: 'Capture incident' }
              ].map((action, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-105"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{action.label}</h3>
                  <p className="text-gray-300 text-sm">{action.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">Safety Settings</h2>
              
              <div className="space-y-6">
                {[
                  { key: 'shareLocation', label: 'Share Live Location', desc: 'Allow trusted contacts to see your location during rides', icon: MapPin },
                  { key: 'emergencySharing', label: 'Emergency Sharing', desc: 'Automatically share trip details in emergency situations', icon: AlertTriangle },
                  { key: 'rideTracking', label: 'Ride Tracking', desc: 'Monitor route deviations and unusual stops', icon: Navigation },
                  { key: 'photoVerification', label: 'Photo Verification', desc: 'Require driver photo verification before rides', icon: Camera },
                  { key: 'soundRecording', label: 'Audio Recording', desc: 'Record audio during rides for safety purposes', icon: Volume2 },
                  { key: 'nightMode', label: 'Enhanced Night Safety', desc: 'Additional safety measures for nighttime rides', icon: Eye }
                ].map((setting) => (
                  <div
                    key={setting.key}
                    className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                        <setting.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">{setting.label}</h4>
                        <p className="text-gray-300 text-sm">{setting.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSettingToggle(setting.key)}
                      className={`relative w-12 h-6 rounded-full transition-all duration-300 ${
                        safetySettings[setting.key] 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                          : 'bg-gray-600'
                      }`}
                    >
                      <div
                        className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-300 ${
                          safetySettings[setting.key] ? 'left-6' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Safety Tips Tab */}
        {activeTab === 'tips' && (
          <div className="space-y-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-6">Safety Tips & Guidelines</h2>
              
              <div className="grid gap-6">
                {safetyTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <tip.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-semibold rounded-full">
                          {tip.category}
                        </span>
                      </div>
                      <p className="text-white font-medium">{tip.tip}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Resources */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6">Safety Resources</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { title: 'Safety Guidelines', desc: 'Complete guide to safe riding', icon: Shield },
                  { title: 'Emergency Procedures', desc: 'What to do in emergency situations', icon: AlertTriangle },
                  { title: 'Report Issues', desc: 'Report safety concerns or incidents', icon: MessageCircle },
                  { title: 'Safety Community', desc: 'Connect with other safety-conscious riders', icon: Users }
                ].map((resource, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                      <resource.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{resource.title}</h4>
                      <p className="text-gray-300 text-sm">{resource.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Add Emergency Contact</h3>
              <button
                onClick={() => setShowAddContact(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Contact Name"
                value={newContact.name}
                onChange={(e) => setNewContact(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={newContact.number}
                onChange={(e) => setNewContact(prev => ({ ...prev, number: e.target.value }))}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
              <div className="flex space-x-3">
                <button
                  onClick={addEmergencyContact}
                  className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300"
                >
                  Add Contact
                </button>
                <button
                  onClick={() => setShowAddContact(false)}
                  className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-2xl transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
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

export default SafetyCenter;