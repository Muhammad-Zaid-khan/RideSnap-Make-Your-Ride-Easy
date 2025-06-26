import { 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Shield, 
  Star, 
  CreditCard,
  Smartphone,
  Download,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  ArrowRight,
  Heart,
  Globe,
  Users,
  Award,
  TrendingUp
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Book a Ride', href: '#book', icon: Car },
    { name: 'Track Ride', href: '#track', icon: MapPin },
    { name: 'Schedule Ride', href: '#schedule', icon: Clock },
    { name: 'Safety Center', href: '#safety', icon: Shield },
    { name: 'Become a Driver', href: '#driver', icon: Users },
    { name: 'Help & Support', href: '#support', icon: Phone }
  ];

  const company = [
    { name: 'About Us', href: '#about' },
    { name: 'Careers', href: '#careers' },
    { name: 'Press', href: '#press' },
    { name: 'Blog', href: '#blog' },
    { name: 'Investor Relations', href: '#investors' },
    { name: 'Gift Cards', href: '#gifts' }
  ];

  const legal = [
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'Accessibility', href: '#accessibility' },
    { name: 'Data Protection', href: '#data' },
    { name: 'Refund Policy', href: '#refunds' }
  ];

  const cities = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 
    'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego',
    'Dallas', 'San Jose', 'Austin', 'Jacksonville'
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#facebook', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#twitter', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#instagram', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: '#linkedin', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: '#youtube', color: 'hover:text-red-600' }
  ];

  const stats = [
    { value: '50M+', label: 'Happy Riders', icon: Users },
    { value: '1M+', label: 'Driver Partners', icon: Car },
    { value: '500+', label: 'Cities Served', icon: Globe },
    { value: '4.8', label: 'Average Rating', icon: Star }
  ];

  return (
    <footer className="bg-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-green-600 to-blue-600"></div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10">
        {/* Stats Section */}
        <div className="border-b border-gray-800 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center group">
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors duration-300">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
              
              {/* Company Info */}
              <div className="lg:col-span-1">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Car className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                      RideSnap
                    </h3>
                    <p className="text-xs text-gray-400">Quick & Reliable</p>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Your trusted ride-hailing partner, connecting millions of riders with reliable drivers worldwide. Experience safe, affordable, and convenient transportation.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Phone className="w-4 h-4 text-green-400" />
                    <span className="text-sm">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <Mail className="w-4 h-4 text-green-400" />
                    <span className="text-sm">support@ridesnap.com</span>
                  </div>
                  <div className="flex items-center space-x-3 text-gray-300">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span className="text-sm">Available 24/7 Worldwide</span>
                  </div>
                </div>

                {/* App Download */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-300">Download Our App</p>
                  <div className="flex flex-col space-y-2">
                    <button className="flex items-center space-x-2 bg-black/50 hover:bg-black/70 px-3 py-2 rounded-lg transition-colors duration-200 border border-gray-700 hover:border-gray-600 group">
                      <Smartphone className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                      <div className="text-left">
                        <div className="text-xs text-gray-400">Download on</div>
                        <div className="text-sm font-medium">App Store</div>
                      </div>
                    </button>
                    <button className="flex items-center space-x-2 bg-black/50 hover:bg-black/70 px-3 py-2 rounded-lg transition-colors duration-200 border border-gray-700 hover:border-gray-600 group">
                      <Download className="w-4 h-4 group-hover:text-green-400 transition-colors" />
                      <div className="text-left">
                        <div className="text-xs text-gray-400">Get it on</div>
                        <div className="text-sm font-medium">Google Play</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <li key={index}>
                        <a 
                          href={link.href}
                          className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors duration-200 group"
                        >
                          <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          <span className="text-sm">{link.name}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Company & Legal */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
                <ul className="space-y-3 mb-8">
                  {company.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>

                <h4 className="text-lg font-semibold mb-6 text-white">Legal</h4>
                <ul className="space-y-3">
                  {legal.map((link, index) => (
                    <li key={index}>
                      <a 
                        href={link.href}
                        className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cities & Newsletter */}
              <div>
                <h4 className="text-lg font-semibold mb-6 text-white">Available Cities</h4>
                <div className="grid grid-cols-2 gap-2 mb-8">
                  {cities.slice(0, 8).map((city, index) => (
                    <a 
                      key={index}
                      href={`#${city.toLowerCase().replace(' ', '-')}`}
                      className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                    >
                      {city}
                    </a>
                  ))}
                </div>
                <a 
                  href="#all-cities" 
                  className="text-green-400 hover:text-green-300 text-sm font-medium flex items-center space-x-1 group"
                >
                  <span>View All Cities</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                </a>

                {/* Newsletter */}
                <div className="mt-8">
                  <h4 className="text-lg font-semibold mb-4 text-white">Stay Updated</h4>
                  <p className="text-gray-400 text-sm mb-4">Get the latest updates and exclusive offers.</p>
                  <div className="flex">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-green-500 transition-colors duration-200"
                    />
                    <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-4 py-2 rounded-r-lg transition-all duration-200 group">
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links & Awards */}
        <div className="border-t border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
              
              {/* Social Links */}
              <div className="flex items-center space-x-6">
                <span className="text-gray-400 text-sm">Follow us:</span>
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`text-gray-400 ${social.color} transition-colors duration-200 transform hover:scale-125`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>

              {/* Awards */}
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Award className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm">Best Transportation App 2024</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm">#1 Ride-Hailing Service</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <span>&copy; {currentYear} RideSnap. All rights reserved.</span>
                <span className="hidden md:inline">•</span>
                <div className="flex items-center space-x-1">
                  <span>Made with</span>
                  <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                  <span>for better transportation</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Secure Payments</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>SSL Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;