/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const DriverSupportPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    category: "",
    priority: "normal",
    subject: "",
    message: ""
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const supportCategories = [
    { id: "account", title: "Account Issues", icon: "👤", color: "from-blue-500 to-cyan-600" },
    { id: "payment", title: "Payment & Earnings", icon: "💰", color: "from-green-500 to-emerald-600" },
    { id: "technical", title: "Technical Support", icon: "⚙️", color: "from-purple-500 to-pink-600" },
    { id: "safety", title: "Safety & Security", icon: "🛡️", color: "from-red-500 to-orange-600" },
    { id: "vehicle", title: "Vehicle Requirements", icon: "🚗", color: "from-yellow-500 to-amber-600" },
    { id: "other", title: "Other Inquiries", icon: "❓", color: "from-indigo-500 to-purple-600" }
  ];

  const faqData = [
    {
      question: "How do I update my banking information?",
      answer: "Go to Settings > Payment Methods > Bank Account. You can add or update your banking details there. Changes take 1-2 business days to process.",
      category: "payment"
    },
    {
      question: "What should I do if I can't go online?",
      answer: "Check your internet connection first. If the issue persists, try restarting the app. Contact technical support if the problem continues.",
      category: "technical"
    },
    {
      question: "How are surge pricing earnings calculated?",
      answer: "Surge pricing multiplies your base fare by the surge multiplier shown in the app. The total surge amount is added to your earnings.",
      category: "payment"
    },
    {
      question: "What documents do I need to drive?",
      answer: "You need a valid driver's license, vehicle registration, insurance, and vehicle inspection certificate. All documents must be current.",
      category: "vehicle"
    }
  ];

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setShowContactForm(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
    setFormData({
      name: "",
      email: "",
      phone: "",
      category: "",
      priority: "normal",
      subject: "",
      message: ""
    });
  };

  const filteredFAQs = selectedCategory 
    ? faqData.filter(faq => faq.category === selectedCategory)
    : faqData;

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
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">💬</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Driver Support Center</h1>
              <p className="text-gray-300">We're here to help you 24/7</p>
            </div>
          </div>
          
          <button 
            onClick={() => window.history.back()}
            className="bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Quick Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-md p-6 rounded-2xl border border-green-500/30 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📞</span>
              </div>
              <div>
                <p className="text-green-300 text-sm">24/7 Hotline</p>
                <p className="text-white text-xl font-bold">1-800-DRIVER</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">💬</span>
              </div>
              <div>
                <p className="text-blue-300 text-sm">Live Chat</p>
                <p className="text-white text-xl font-bold">Available Now</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📧</span>
              </div>
              <div>
                <p className="text-purple-300 text-sm">Email Support</p>
                <p className="text-white text-lg font-bold">4-6 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Support Categories */}
          <div className="lg:col-span-1">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 mb-6">
              <h3 className="text-xl font-bold text-white mb-4">Support Categories</h3>
              <div className="space-y-3">
                {supportCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(selectedCategory === category.id ? "" : category.id)}
                    className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} shadow-lg scale-105`
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{category.icon}</span>
                      <span className="text-white font-medium">{category.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Contact Form Button */}
            <button
              onClick={() => setShowContactForm(true)}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white p-6 rounded-2xl font-bold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:scale-105"
            >
              <div className="flex items-center justify-center space-x-3">
                <span className="text-2xl">✉️</span>
                <span>Contact Support</span>
              </div>
            </button>
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {selectedCategory ? 'Filtered FAQs' : 'Frequently Asked Questions'}
                </h3>
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory("")}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Show All FAQs
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div key={index} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
                    <h4 className="text-white font-semibold mb-2 flex items-start">
                      <span className="text-blue-400 mr-2">Q:</span>
                      {faq.question}
                    </h4>
                    <p className="text-gray-300 ml-6 leading-relaxed">
                      <span className="text-green-400 mr-2">A:</span>
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-gray-400">No FAQs found for this category.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Emergency Support */}
        <div className="mt-8 bg-gradient-to-r from-red-500/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-red-500/30">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center animate-pulse">
              <span className="text-white text-2xl">🚨</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2">Emergency Support</h3>
              <p className="text-gray-300">For urgent safety issues or emergencies while driving, call our 24/7 emergency line immediately.</p>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-bold transition-colors duration-300">
              Call Emergency
            </button>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Contact Support</h3>
                <button
                  onClick={() => setShowContactForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a category</option>
                      {supportCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.title}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                  <div className="flex space-x-4">
                    {['low', 'normal', 'high', 'urgent'].map((priority) => (
                      <label key={priority} className="flex items-center">
                        <input
                          type="radio"
                          name="priority"
                          value={priority}
                          checked={formData.priority === priority}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        <span className={`capitalize ${
                          priority === 'urgent' ? 'text-red-600 font-bold' :
                          priority === 'high' ? 'text-orange-600' :
                          priority === 'normal' ? 'text-blue-600' : 'text-gray-600'
                        }`}>
                          {priority}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description of your issue"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Please describe your issue in detail..."
                  ></textarea>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-2xl font-semibold hover:bg-gray-400 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 text-center shadow-2xl animate-bounce max-w-md w-full mx-4">
              <div className="text-6xl mb-4">✅</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Request Submitted!</h3>
              <p className="text-gray-600 mb-4">We've received your support request and will respond within 4-6 hours.</p>
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-blue-800">
                  <strong>Ticket ID:</strong> #DRV-{Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        )}
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
        `
      }} />
    </div>
  );
};

export default DriverSupportPage;