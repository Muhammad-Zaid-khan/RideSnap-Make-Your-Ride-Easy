import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Shield, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBubble, setCurrentBubble] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  type Errors = {
    email?: string;
    password?: string;
    [key: string]: string | undefined;
  };
  const [errors, setErrors] = useState<Errors>({});
  const [focusedField, setFocusedField] = useState('');

  const floatingElements = [
    { icon: '🚗', delay: '0s', size: 'w-12 h-12' },
    { icon: '🛡️', delay: '2s', size: 'w-10 h-10' },
    { icon: '💰', delay: '4s', size: 'w-14 h-14' },
    { icon: '⚡', delay: '1s', size: 'w-8 h-8' },
    { icon: '🌟', delay: '3s', size: 'w-16 h-16' }
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBubble(prev => (prev + 1) % 4);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Errors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Login data:', formData);
      setIsLoading(false);
      // Handle navigation here
    }, 2000);
  };

 const navigate = useNavigate()

  // const navigate = (path: string) => {
  //   console.log(`Navigate to: ${path}`);
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.size} bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse`}
            style={{
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
              animationDelay: element.delay,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-2xl">
              {element.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Header */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-xl">R</span>
              </div>
              <span className={`text-2xl font-bold transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}>
                RideSnap
              </span>
            </div>
            <button 
              onClick={() => navigate('/signup')}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-green-600' 
                  : 'text-white hover:text-green-300'
              }`}
            >
              Don't have an account?
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-6">
                Welcome Back
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Continue your journey with RideSnap. Fast, secure, and reliable rides await you.
              </p>
            </div>

            {/* Feature Bubbles */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Shield, title: "Secure Login", desc: "256-bit encryption" },
                { icon: User, title: "Quick Access", desc: "Remember your session" },
                { icon: ArrowRight, title: "Fast Booking", desc: "Instant ride requests" },
                { icon: Mail, title: "Email Verified", desc: "Trusted accounts only" }
              ].map((item, index) => (
                <div
                  key={index}
                  className={`bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 transition-all duration-500 hover:bg-white/20 hover:scale-105 ${
                    currentBubble === index ? 'ring-2 ring-green-400 bg-white/20' : ''
                  }`}
                >
                  <item.icon className="w-8 h-8 text-green-400 mb-2 mx-auto lg:mx-0" />
                  <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-gray-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">50K+</div>
                <div className="text-gray-400 text-xs">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">99.9%</div>
                <div className="text-gray-400 text-xs">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-gray-400 text-xs">Support</div>
              </div>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Sign In</h2>
                <p className="text-gray-300">Enter your credentials to continue</p>
              </div>

              <div className="space-y-6">
                {/* Email Field */}
                <div className="relative">
                  <div className={`relative transition-all duration-300 ${
                    focusedField === 'email' ? 'transform scale-105' : ''
                  }`}>
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                      focusedField === 'email' ? 'text-green-400' : 'text-gray-400'
                    }`} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-2 animate-pulse">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <div className={`relative transition-all duration-300 ${
                    focusedField === 'password' ? 'transform scale-105' : ''
                  }`}>
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                      focusedField === 'password' ? 'text-green-400' : 'text-gray-400'
                    }`} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Enter your password"
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-400 transition-colors duration-300"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-2 animate-pulse">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-300 ${
                      formData.rememberMe 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-400 group-hover:border-green-400'
                    }`}>
                      {formData.rememberMe && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-300 text-sm group-hover:text-green-400 transition-colors duration-300">
                      Remember me
                    </span>
                  </label>
                  <button
                    type="button"
                    className="text-green-400 hover:text-green-300 text-sm transition-colors duration-300"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>

                {/* Sign Up Link */}
                <div className="text-center">
                  <span className="text-gray-300">Don't have an account? </span>
                  <button
                    type="button"
                    onClick={() => navigate('/signup')}
                    className="text-green-400 hover:text-green-300 font-semibold transition-colors duration-300 hover:underline"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-10px) rotate(5deg); }
            66% { transform: translateY(5px) rotate(-3deg); }
          }
          
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          
          @keyframes glow {
            0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.3); }
            50% { box-shadow: 0 0 40px rgba(34, 197, 94, 0.6); }
          }
          
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
        `
      }} />
    </div>
  );
};

export default Login;