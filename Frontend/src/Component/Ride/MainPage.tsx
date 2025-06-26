/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

const MainPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<{ [key: string]: boolean }>({});
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);
  const heroRef = useRef(null);

  // Hero slides data
  const heroSlides = [
    {
      title: "Welcome to RideSnap",
      subtitle: "Your ride, your way. Book a ride now!",
      backgroundImage: "./src/assets/background.avif",
      cta: "Get Started",
      ctaLink: "/ride"
    },
    {
      title: "Safe & Reliable",
      subtitle: "Verified drivers, secure payments, and 24/7 support",
      backgroundImage: "./src/assets/background.avif",
      cta: "Book Now",
      ctaLink: "/ride"
    },
    {
      title: "Affordable Rides",
      subtitle: "Best prices in town with transparent pricing",
      backgroundImage: "./src/assets/background.avif",
      cta: "Book Now",
      ctaLink: "/ride"
    }
  ];

  const features = [
    {
      icon: "🚗",
      title: "Instant Booking",
      description: "Book your ride in just a few taps. No waiting, no hassle.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "🛡️",
      title: "Safety First",
      description: "All drivers are verified and vehicles are regularly inspected.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: "💰",
      title: "Best Prices",
      description: "Competitive rates with no hidden fees. What you see is what you pay.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "📱",
      title: "Easy to Use",
      description: "Intuitive app design that makes booking rides effortless.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "🌍",
      title: "Wide Coverage",
      description: "Available in multiple cities with expanding coverage daily.",
      gradient: "from-indigo-500 to-blue-500"
    },
    {
      icon: "⚡",
      title: "Fast Pickup",
      description: "Average pickup time of 3 minutes. Get where you need to go quickly.",
      gradient: "from-yellow-500 to-orange-500"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular User",
      avatar: "👩‍💼",
      text: "RideSnap has transformed my daily commute. Fast, reliable, and affordable!",
      rating: 5
    },
    {
      name: "Mike Chen",
      role: "Business Traveler",
      avatar: "👨‍💼",
      text: "I travel for work frequently, and RideSnap is always my go-to choice.",
      rating: 5
    },
    {
      name: "Emily Davis",
      role: "Student",
      avatar: "👩‍🎓",
      text: "Perfect for getting around campus and the city. Great student discounts too!",
      rating: 5
    }
  ];

  // Effects
  useEffect(() => {
    setIsLoaded(true);
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Dynamic Mouse Cursor Effect */}
      <div 
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded-full pointer-events-none z-50 mix-blend-difference opacity-50 transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 12}px, ${mousePosition.y - 12}px)`
        }}
      />

      {/* Hero Section with Dynamic Background */}
      <div ref={heroRef} className="relative h-screen w-full overflow-hidden">
        {/* Background Slideshow */}
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `url('${slide.backgroundImage}')`,
                transform: `scale(${index === currentSlide ? 1 : 1.1})`
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60" />
        </div>

        {/* Animated Particles Background */}
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
              <div className="w-2 h-2 bg-white/20 rounded-full" />
            </div>
          ))}
        </div>

        <Navbar />

        {/* Hero Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-4">
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-pulse">
              {heroSlides[currentSlide].title}
            </h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-gray-200">
              {heroSlides[currentSlide].subtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Link
                to={heroSlides[currentSlide].ctaLink}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-full hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25"
              >
                <span className="relative z-10">{heroSlides[currentSlide].cta}</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl" />
              </Link>
              <button
                onClick={() => scrollToSection('features')}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white/30 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
              >
                Learn More
              </button>
              <button
                onClick={() => setShowVideoOverlay(true)}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white/80 hover:text-white transition-colors duration-300"
              >
                <span className="mr-2">▶️</span>
                Watch Demo
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center space-x-3">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? 'bg-green-500 scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-green-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-animate 
            id="features-header"
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['features-header'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Why Choose <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">RideSnap?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the difference with our cutting-edge features designed for modern transportation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                data-animate
                id={`feature-${index}`}
                className={`group bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 ${
                  isVisible[`feature-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                <div className={`w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-full mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Happy Riders", color: "text-green-400" },
              { number: "1000+", label: "Verified Drivers", color: "text-blue-400" },
              { number: "24/7", label: "Customer Support", color: "text-purple-400" },
              { number: "99.9%", label: "Uptime", color: "text-yellow-400" }
            ].map((stat, index) => (
              <div
                key={index}
                data-animate
                id={`stat-${index}`}
                className={`transform transition-all duration-1000 ${
                  isVisible[`stat-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`text-5xl font-bold ${stat.color} mb-2`}>{stat.number}</div>
                <div className="text-gray-300 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-blue-900 to-purple-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            data-animate 
            id="testimonials-header"
            className={`text-center mb-16 transform transition-all duration-1000 ${
              isVisible['testimonials-header'] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              What Our <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">Users Say</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                data-animate
                id={`testimonial-${index}`}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 transform hover:scale-105 ${
                  isVisible[`testimonial-${index}`] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-300 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-200 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made RideSnap their preferred transportation choice.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/ride"
              className="inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-green-600 bg-white rounded-full hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Book Your Ride
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-10 py-4 text-xl font-bold text-white border-2 border-white rounded-full hover:bg-white hover:text-green-600 transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Video Overlay Modal */}
      {showVideoOverlay && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-2xl font-bold text-gray-800">RideSnap Demo</h3>
              <button
                onClick={() => setShowVideoOverlay(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🎬</div>
                  <p className="text-gray-600">Demo video would be embedded here</p>
                  <p className="text-sm text-gray-500 mt-2">Integration with your video platform</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS for advanced animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          @keyframes slideInFromBottom {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          .slide-in-bottom {
            animation: slideInFromBottom 0.8s ease-out forwards;
          }
          
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          .animate-gradient {
            background-size: 400% 400%;
            animation: gradientShift 4s ease infinite;
          }
        `
      }} />
      <div>
        <Footer/>
      </div>
    </div>
  );
};

export default MainPage;