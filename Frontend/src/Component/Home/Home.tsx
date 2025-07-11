/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import Footer from '../Footer';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [currentFeature, setCurrentFeature] = useState(0);
    const [showRoleModal, setShowRoleModal] = useState(false);

    const features = [
        { title: "Quick Rides", desc: "Book rides in seconds", icon: "🚗" },
        { title: "Safe & Secure", desc: "Verified drivers only", icon: "🛡️" },
        { title: "Best Prices", desc: "Affordable for everyone", icon: "💰" },
        { title: "24/7 Support", desc: "We're always here", icon: "🔧" }
    ];

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentFeature((prev) => (prev + 1) % features.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const navigate = useNavigate();

    const handleGetStarted = () => {
        setShowRoleModal(true);
    };

    const handleRoleSelection = (role: string) => {
        setShowRoleModal(false);
        if (role === 'driver') {
            navigate('/driver');
        } else if (role === 'rider') {
            navigate('/home');
        }
    };

    const closeModal = () => {
        setShowRoleModal(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-yellow-400 rounded-full animate-ping"></div>
                <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            {/* Navigation Header */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled ? 'bg-white/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">R</span>
                            </div>
                            <span className={`text-2xl font-bold transition-colors ${
                                isScrolled ? 'text-gray-800' : 'text-white'
                            }`}>
                                RideSnap
                            </span>
                        </div>
                        <div className="flex space-x-4">
                            <button 
                                onClick={() => navigate('/login')}
                                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                                    isScrolled 
                                        ? 'text-gray-700 hover:text-green-600' 
                                        : 'text-white hover:text-green-300'
                                }`}
                            >
                                Login
                            </button>
                            <button 
                                onClick={() => navigate('/signup')}
                                className="px-6 py-2 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-full font-medium hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative min-h-screen flex items-center justify-center px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-8">
                        <h1 className="text-6xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 mb-6 animate-pulse">
                            RideSnap
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Experience the future of transportation. Fast, reliable, and affordable rides at your fingertips.
                        </p>
                    </div>

                    {/* Feature Showcase */}
                    <div className="mb-12">
                        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto border border-white/20 hover:bg-white/20 transition-all duration-300">
                            <div className="text-6xl mb-4 transform hover:scale-110 transition-transform duration-300">
                                {features[currentFeature].icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {features[currentFeature].title}
                            </h3>
                            <p className="text-gray-300">
                                {features[currentFeature].desc}
                            </p>
                        </div>
                        <div className="flex justify-center mt-6 space-x-2">
                            {features.map((_, index) => (
                                <div 
                                    key={index}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                                        index === currentFeature ? 'bg-green-500 scale-125' : 'bg-white/30 hover:bg-white/50'
                                    }`}
                                    onClick={() => setCurrentFeature(index)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button 
                            onClick={handleGetStarted}
                            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-green-500 to-blue-600 rounded-full hover:from-green-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25"
                        >
                            <span className="relative z-10">Get Started Now</span>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
                        </button>
                        <button 
                            onClick={() => navigate('/home')}
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white border-2 border-white/30 rounded-full hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
                        >
                            Continue to App
                        </button>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="text-3xl font-bold text-green-400 mb-2">50K+</div>
                            <div className="text-gray-300">Happy Riders</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
                            <div className="text-gray-300">Verified Drivers</div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                            <div className="text-gray-300">Service Available</div>
                        </div>
                    </div>
                </div>

                {/* Floating Elements with Custom Animation */}
                <div className="absolute bottom-20 left-20" style={{
                    animation: 'float 6s ease-in-out infinite'
                }}>
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20"></div>
                </div>
                <div className="absolute top-1/4 right-20" style={{
                    animation: 'floatDelayed 4s ease-in-out infinite'
                }}>
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-20"></div>
                </div>
            </div>

            {/* Role Selection Modal */}
            {showRoleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md w-full mx-4 border border-white/20 shadow-2xl">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-white mb-2">Choose Your Role</h2>
                            <p className="text-gray-300">How would you like to use RideSnap?</p>
                        </div>
                        
                        <div className="space-y-4">
                            <button
                                onClick={() => handleRoleSelection('driver')}
                                className="w-full group relative overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25"
                            >
                                <div className="flex items-center justify-center space-x-4">
                                    <span className="text-4xl">🚗</span>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold">Driver</h3>
                                        <p className="text-blue-100">Start earning by giving rides</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </button>
                            
                            <button
                                onClick={() => handleRoleSelection('rider')}
                                className="w-full group relative overflow-hidden bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white rounded-xl p-6 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
                            >
                                <div className="flex items-center justify-center space-x-4">
                                    <span className="text-4xl">🏃‍♂️</span>
                                    <div className="text-left">
                                        <h3 className="text-xl font-bold">Rider</h3>
                                        <p className="text-green-100">Book rides quickly and safely</p>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                            </button>
                        </div>
                        
                        <button
                            onClick={closeModal}
                            className="w-full mt-6 px-6 py-3 text-gray-300 border border-white/30 rounded-xl hover:border-white hover:bg-white/10 transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}

            {/* Custom CSS for animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes float {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-20px); }
                    }
                    @keyframes floatDelayed {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                    }
                `
            }} />

            <div className='mt-6'>
                <Footer/>
            </div>
        </div>
    );
};

export default Home;