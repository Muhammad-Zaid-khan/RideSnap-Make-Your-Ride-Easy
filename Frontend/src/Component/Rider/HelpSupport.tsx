/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  Shield, 
  CreditCard, 
  MapPin, 
  User, 
  AlertCircle, 
  CheckCircle, 
  ChevronDown,
  ChevronUp,
  Search,
  Headphones,
  BookOpen,
  Video,
  FileText,
  ThumbsUp,
  Send,
  X,
  HelpCircle,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HelpSupport = () => {
  const navigate = (path: any) => {
    // Replace with your navigation logic, e.g., useNavigate from react-router-dom
    console.log('Navigate to:', path);
  };

  const navigater = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: '',
    message: ''
  });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const supportCategories = [
    {
      id: 'rides',
      title: 'Ride Issues',
      icon: MapPin,
      color: 'from-blue-500 to-cyan-500',
      description: 'Problems with booking, cancellations, or ongoing rides'
    },
    {
      id: 'payment',
      title: 'Payment & Billing',
      icon: CreditCard,
      color: 'from-green-500 to-emerald-500',
      description: 'Payment methods, billing issues, and refunds'
    },
    {
      id: 'account',
      title: 'Account Management',
      icon: User,
      color: 'from-purple-500 to-pink-500',
      description: 'Profile settings, account security, and preferences'
    },
    {
      id: 'safety',
      title: 'Safety & Security',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      description: 'Safety features, incident reports, and security concerns'
    },
    {
      id: 'app',
      title: 'App Technical Issues',
      icon: AlertCircle,
      color: 'from-yellow-500 to-orange-500',
      description: 'App crashes, login problems, and technical difficulties'
    },
    {
      id: 'general',
      title: 'General Inquiries',
      icon: HelpCircle,
      color: 'from-indigo-500 to-blue-500',
      description: 'General questions and other support needs'
    }
  ];

  const quickActions = [
    {
      title: 'Live Chat',
      description: 'Get instant help from our support team',
      icon: MessageCircle,
      color: 'from-blue-600 to-purple-600',
      action: () => setShowContactForm(true)
    },
    {
      title: 'Call Support',
      description: '24/7 phone support available',
      icon: Phone,
      color: 'from-green-600 to-blue-600',
      action: () => window.open('tel:+92-300-RIDESNAP')
    },
    {
      title: 'Email Us',
      description: 'Send us a detailed message',
      icon: Mail,
      color: 'from-purple-600 to-pink-600',
      action: () => window.open('mailto:support@ridesnap.com')
    },
    {
      title: 'Video Guides',
      description: 'Watch helpful tutorial videos',
      icon: Video,
      color: 'from-orange-600 to-red-600',
      action: () => console.log('Open video guides')
    }
  ];

  const faqs = [
    {
      id: 1,
      category: 'rides',
      question: 'How do I cancel a ride?',
      answer: 'You can cancel your ride by opening the app, going to your active ride, and tapping the "Cancel Ride" button. Please note that cancellation fees may apply depending on the timing.',
      helpful: 156
    },
    {
      id: 2,
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit/debit cards, digital wallets like JazzCash and EasyPaisa, and cash payments. You can manage your payment methods in the app settings.',
      helpful: 203
    },
    {
      id: 3,
      category: 'rides',
      question: 'Why is my driver taking a different route?',
      answer: 'Drivers may take alternative routes to avoid traffic, construction, or to ensure the safest and most efficient journey. Our navigation system provides real-time route optimization.',
      helpful: 142
    },
    {
      id: 4,
      category: 'safety',
      question: 'What safety features does RideSnap offer?',
      answer: 'We offer real-time ride tracking, emergency contact sharing, driver verification, in-app emergency button, and 24/7 safety support. Your safety is our top priority.',
      helpful: 284
    },
    {
      id: 5,
      category: 'account',
      question: 'How do I update my profile information?',
      answer: 'Go to Settings > Profile in the app to update your name, phone number, email, and other profile details. Some changes may require verification.',
      helpful: 178
    },
    {
      id: 6,
      category: 'payment',
      question: 'How do refunds work?',
      answer: 'Refunds are processed within 3-5 business days to your original payment method. For cash payments, refunds are credited to your RideSnap wallet.',
      helpful: 167
    },
    {
      id: 7,
      category: 'app',
      question: 'The app keeps crashing, what should I do?',
      answer: 'Try restarting the app, clearing cache, or reinstalling. Make sure you have the latest version. If issues persist, contact our technical support team.',
      helpful: 134
    },
    {
      id: 8,
      category: 'general',
      question: 'How do I rate my driver?',
      answer: 'After completing your ride, you\'ll automatically be prompted to rate your driver on a 5-star scale and leave optional feedback to help us improve our service.',
      helpful: 192
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Simulate form submission
    setShowNotification(true);
    setShowContactForm(false);
    setFormData({ name: '', email: '', category: '', message: '' });
    setTimeout(() => setShowNotification(false), 4000);
  };

  const toggleFAQ = (faqId: number) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
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
            <div className="w-1 h-1 bg-blue-400/40 rounded-full" />
          </div>
        ))}
      </div>

      {/* Dynamic Mouse Cursor */}
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-screen opacity-70 transition-transform duration-75 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`
        }}
      />

      {/* Header */}
      <header className="relative z-20 p-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {navigater('/ride')}}
            className="p-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300" />
          </button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Help & Support
            </h1>
            <p className="text-blue-200 text-sm">We're here to help you 24/7</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-white">Support Online</span>
        </div>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group transform hover:scale-105"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto`}>
                <action.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{action.title}</h3>
              <p className="text-gray-300 text-sm">{action.description}</p>
            </button>
          ))}
        </div>

        {/* Support Categories */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            What can we help you with?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportCategories.map((category) => (
              <div
                key={category.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group cursor-pointer transform hover:scale-105"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">{category.title}</h3>
                <p className="text-gray-300 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <h2 className="text-3xl font-bold text-white mb-4 lg:mb-0">
              Frequently Asked Questions
            </h2>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 w-full sm:w-64"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              >
                <option value="all">All Categories</option>
                {supportCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredFAQs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white/10 rounded-2xl border border-white/20 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-all duration-300"
                >
                  <h3 className="text-white font-semibold text-lg pr-4">{faq.question}</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1 text-gray-400">
                      <ThumbsUp className="w-4 h-4" />
                      <span className="text-sm">{faq.helpful}</span>
                    </div>
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-6 h-6 text-blue-400" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                </button>
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6 border-t border-white/10">
                    <p className="text-gray-300 leading-relaxed mt-4">{faq.answer}</p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
                      <span className="text-sm text-gray-400">Was this helpful?</span>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg text-sm transition-all duration-300 flex items-center space-x-1">
                          <ThumbsUp className="w-4 h-4" />
                          <span>Yes</span>
                        </button>
                        <button className="px-3 py-1 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg text-sm transition-all duration-300">
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">No results found</h3>
              <p className="text-gray-300">Try adjusting your search terms or category filter</p>
            </div>
          )}
        </div>

        {/* Contact Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Headphones className="w-6 h-6 mr-3 text-blue-400" />
              Contact Information
            </h3>
            <div className="space-y-6">
              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Phone Support</h4>
                  <p className="text-gray-300">+92-300-RIDESNAP</p>
                  <p className="text-sm text-blue-400">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Email Support</h4>
                  <p className="text-gray-300">support@ridesnap.com</p>
                  <p className="text-sm text-green-400">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-semibold">Response Time</h4>
                  <p className="text-gray-300">Average: 5 minutes</p>
                  <p className="text-sm text-purple-400">Live chat & phone</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
              <BookOpen className="w-6 h-6 mr-3 text-green-400" />
              Additional Resources
            </h3>
            <div className="space-y-4">
              <button className="w-full flex items-center space-x-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-white font-semibold group-hover:text-blue-400 transition-colors duration-300">User Guide</h4>
                  <p className="text-gray-400 text-sm">Complete app usage guide</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Video className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-white font-semibold group-hover:text-purple-400 transition-colors duration-300">Video Tutorials</h4>
                  <p className="text-gray-400 text-sm">Step-by-step video guides</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-white font-semibold group-hover:text-green-400 transition-colors duration-300">Safety Guidelines</h4>
                  <p className="text-gray-400 text-sm">Important safety information</p>
                </div>
              </button>

              <button className="w-full flex items-center space-x-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-300 group">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-white font-semibold group-hover:text-orange-400 transition-colors duration-300">Troubleshooting</h4>
                  <p className="text-gray-400 text-sm">Common issues & solutions</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form Modal */}
      {showContactForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-slate-900/95 backdrop-blur-xl rounded-3xl p-8 border border-white/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Contact Support</h3>
              <button
                onClick={() => setShowContactForm(false)}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-white font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Issue Category</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                >
                  <option value="">Select a category</option>
                  {supportCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-white font-semibold mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 resize-none"
                  placeholder="Describe your issue in detail..."
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 transform transition-all duration-500">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-6 h-6 text-white" />
            <div>
              <p className="font-semibold">Message Sent Successfully!</p>
              <p className="text-sm opacity-90">We'll get back to you within 2 hours</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;