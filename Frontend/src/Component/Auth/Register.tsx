/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Shield, ArrowRight, Car, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentBubble, setCurrentBubble] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    agreeToTerms: false
  });

  type Errors = {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    role?: string;
    agreeToTerms?: string;
    [key: string]: string | undefined;
  };

  const [errors, setErrors] = useState<Errors>({});
  const [focusedField, setFocusedField] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, label: 'Very Weak', color: '#f44336' });

  const floatingElements = [
    { icon: '🚗', delay: '0s', size: 'w-12 h-12' },
    { icon: '🛡️', delay: '2s', size: 'w-10 h-10' },
    { icon: '💰', delay: '4s', size: 'w-14 h-14' },
    { icon: '⚡', delay: '1s', size: 'w-8 h-8' },
    { icon: '🌟', delay: '3s', size: 'w-16 h-16' }
  ];

  const steps = ['Personal Info', 'Account Security', 'Role Selection'];

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

  // Auto-advance stepper based on form completion
  useEffect(() => {
    if (formData.name && formData.email && !errors.name && !errors.email) {
      setActiveStep(1);
    } else if (formData.name || formData.email) {
      setActiveStep(0);
    }

    if (formData.password && formData.confirmPassword && !errors.password && !errors.confirmPassword) {
      setActiveStep(2);
    }
  }, [formData, errors]);

  // Password strength checker
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 6) score += 1;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;

    const strengthMap = {
      0: { label: 'Very Weak', color: '#f44336' },
      1: { label: 'Weak', color: '#ff9800' },
      2: { label: 'Fair', color: '#ff9800' },
      3: { label: 'Good', color: '#4caf50' },
      4: { label: 'Strong', color: '#4caf50' },
      5: { label: 'Very Strong', color: '#2e7d32' }
    };

    return { score, ...strengthMap[score as keyof typeof strengthMap] };
  };

  useEffect(() => {
    if (formData.password) {
      setPasswordStrength(getPasswordStrength(formData.password));
    }
  }, [formData.password]);

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
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'Please accept the terms and conditions';
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
      console.log('Register data:', formData);
      setIsLoading(false);
      // Handle navigation here
    }, 2000);
  };
   
  const navigate = useNavigate()

  // const navigate = (path: string) => {
  //   console.log(`Navigate to: ${path}`);
  // };

  const handleRoleSelect = (role: string) => {
    setFormData(prev => ({ ...prev, role }));
    if (errors.role) {
      setErrors(prev => ({ ...prev, role: '' }));
    }
  };

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
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() =>  navigate('/')}>
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
              onClick={() => {navigate('/login')}}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 cursor-pointer ${
                isScrolled 
                  ? 'text-gray-700 hover:text-green-600 cursor-pointer' 
                  : 'text-white hover:text-green-300 cursor-pointer'
              }`}
            >
              Already have an account?
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side - Welcome Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            <div className="mb-8">
              <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-6">
                Join RideSnap
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                Start your journey with us. Whether you're a rider or driver, we've got you covered.
              </p>
            </div>

            {/* Progress Stepper */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index <= activeStep 
                        ? 'bg-green-400 text-white' 
                        : 'bg-white/20 text-gray-400'
                    }`}>
                      {index < activeStep ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-1 mx-2 transition-all duration-300 ${
                        index < activeStep ? 'bg-green-400' : 'bg-white/20'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-300">
                {steps.map((step, index) => (
                  <span key={index} className={index <= activeStep ? 'text-green-400' : ''}>
                    {step}
                  </span>
                ))}
              </div>
            </div>

            {/* Feature Bubbles */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Shield, title: "Secure Signup", desc: "Your data is protected" },
                { icon: User, title: "Easy Setup", desc: "Quick registration" },
                { icon: Car, title: "Multiple Roles", desc: "Driver or Rider" },
                { icon: Users, title: "Join Community", desc: "50K+ active users" }
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
                <div className="text-gray-400 text-xs">New Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">5min</div>
                <div className="text-gray-400 text-xs">Quick Setup</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-gray-400 text-xs">Support</div>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl max-w-md mx-auto">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2 cursor-pointer">Create Account</h2>
                <p className="text-gray-300">Join our community today</p>
              </div>

              <div className="space-y-6">
                {/* Name Field */}
                <div className="relative">
                  <div className={`relative transition-all duration-300 ${
                    focusedField === 'name' ? 'transform scale-105' : ''
                  }`}>
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                      focusedField === 'name' ? 'text-green-400' : 'text-gray-400'
                    }`} />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Enter your full name"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-2 animate-pulse">{errors.name}</p>
                  )}
                </div>

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
                      placeholder="Create a password"
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
                  
                  {/* Password Strength Indicator */}
                  {formData.password && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
                          <div 
                            className="h-full transition-all duration-300 rounded-full"
                            style={{
                              width: `${(passwordStrength.score / 5) * 100}%`,
                              backgroundColor: passwordStrength.color
                            }}
                          />
                        </div>
                        <span className="text-xs text-gray-300 min-w-20">
                          {passwordStrength.label}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-2 animate-pulse">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="relative">
                  <div className={`relative transition-all duration-300 ${
                    focusedField === 'confirmPassword' ? 'transform scale-105' : ''
                  }`}>
                    <Lock className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                      focusedField === 'confirmPassword' ? 'text-green-400' : 'text-gray-400'
                    }`} />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('confirmPassword')}
                      onBlur={() => setFocusedField('')}
                      placeholder="Confirm your password"
                      className="w-full pl-12 pr-12 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-300 hover:bg-white/10"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                      {formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      )}
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-2 animate-pulse">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Role Selection */}
                <div className="space-y-4">
                  <h3 className="text-white font-semibold">Choose Your Role</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: 'rider', label: 'Rider', icon: Users, desc: 'Book rides' },
                      { value: 'driver', label: 'Driver', icon: Car, desc: 'Drive & earn' }
                    ].map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => handleRoleSelect(role.value)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                          formData.role === role.value
                            ? 'border-green-400 bg-green-400/20'
                            : 'border-white/20 bg-white/5 hover:bg-white/10'
                        }`}
                      >
                        <role.icon className={`w-8 h-8 mx-auto mb-2 ${
                          formData.role === role.value ? 'text-green-400' : 'text-gray-400'
                        }`} />
                        <div className="text-white font-semibold text-sm">{role.label}</div>
                        <div className="text-gray-400 text-xs">{role.desc}</div>
                        {formData.role === role.value && (
                          <div className="mt-2">
                            <div className="bg-green-400 text-white text-xs px-2 py-1 rounded-full">
                              Selected
                            </div>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                  {errors.role && (
                    <p className="text-red-400 text-sm animate-pulse">{errors.role}</p>
                  )}
                </div>

                {/* Terms & Conditions */}
                <div className="space-y-4">
                  <label className="flex items-start cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 mr-3 flex items-center justify-center transition-all duration-300 mt-0.5 ${
                      formData.agreeToTerms 
                        ? 'bg-green-500 border-green-500' 
                        : 'border-gray-400 group-hover:border-green-400'
                    }`}>
                      {formData.agreeToTerms && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="text-gray-300 text-sm group-hover:text-green-400 transition-colors duration-300">
                      I agree to the <span className="text-green-400 underline">Terms & Conditions</span> and <span className="text-green-400 underline">Privacy Policy</span>
                    </span>
                  </label>
                  {errors.agreeToTerms && (
                    <p className="text-red-400 text-sm animate-pulse">{errors.agreeToTerms}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl font-semibold hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Creating Account...
                      </>
                    ) : (
                      <>
                        Create Account
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </button>

                {/* Login Link */}
                <div className="text-center">
                  <span className="text-gray-300">Already have an account? </span>
                  <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-green-400 cursor-pointer hover:text-green-300 font-semibold transition-colors duration-300 hover:underline"
                  >
                    Sign In
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

export default Register;