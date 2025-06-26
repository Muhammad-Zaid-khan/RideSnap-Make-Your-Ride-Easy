import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Wallet, 
  Plus, 
  ArrowLeft, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Gift,
  TrendingUp,
  Shield,
  Smartphone,
  DollarSign,
  History,
  Settings,
  Eye,
  EyeOff,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [activeTab, setActiveTab] = useState('wallet');
  const [walletBalance, setWalletBalance] = useState(45.50);
  const [showBalance, setShowBalance] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('card1');
  const [showAddCard, setShowAddCard] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  type Notification = { id: number; message: string; type: 'success' | 'error' };
  const [notifications, setNotifications] = useState<Notification[]>([]);


  const navigate = useNavigate();
  // Mock data
  const paymentMethods = [
    {
      id: 'card1',
      type: 'credit',
      name: 'Credit Card',
      number: '**** **** **** 1234',
      brand: 'Visa',
      isDefault: true,
      color: 'from-blue-600 to-purple-600'
    },
    {
      id: 'card2',
      type: 'debit',
      name: 'Debit Card',
      number: '**** **** **** 5678',
      brand: 'Mastercard',
      isDefault: false,
      color: 'from-green-600 to-teal-600'
    },
    {
      id: 'paypal',
      type: 'paypal',
      name: 'PayPal',
      email: 'user@example.com',
      isDefault: false,
      color: 'from-yellow-600 to-orange-600'
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: 'ride',
      description: 'Ride to Downtown',
      amount: -12.50,
      date: '2024-01-15',
      status: 'completed',
      driver: 'Ahmed Khan',
      rating: 4.8
    },
    {
      id: 2,
      type: 'topup',
      description: 'Wallet Top-up',
      amount: 50.00,
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      type: 'ride',
      description: 'Ride to Airport',
      amount: -28.75,
      date: '2024-01-13',
      status: 'completed',
      driver: 'Hassan Ali',
      rating: 4.9
    },
    {
      id: 4,
      type: 'refund',
      description: 'Ride Refund',
      amount: 15.25,
      date: '2024-01-12',
      status: 'completed'
    }
  ];

  const promotions = [
    {
      id: 1,
      title: 'Add $50, Get $5 Bonus',
      description: 'Top up your wallet and get extra credit',
      bonus: '$5',
      validUntil: '2024-02-15',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 2,
      title: 'Refer a Friend',
      description: 'Get $10 for each friend who signs up',
      bonus: '$10',
      validUntil: '2024-03-01',
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    const notification = {
      id: Date.now(),
      message,
      type
    };
    setNotifications((prev) => [...prev, notification]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
    }, 4000);
  };

  const handleAddMoney = (amount: number) => {
    setWalletBalance(prev => prev + amount);
    showNotification(`$${amount} added to your wallet successfully!`);
  };

  const handleSetDefault = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    showNotification('Default payment method updated!');
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'ride': return <MapPin className="w-5 h-5" />;
      case 'topup': return <Plus className="w-5 h-5" />;
      case 'refund': return <DollarSign className="w-5 h-5" />;
      default: return <CreditCard className="w-5 h-5" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
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

      {/* Dynamic Cursor */}
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
          onClick={ () => {navigate('/ride')}}
           className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Payment
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white/20 transition-all duration-300">
            <Settings className="w-6 h-6 text-white" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-md rounded-3xl p-8 border border-white/20 mb-8 transform hover:scale-105 transition-all duration-500">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Wallet Balance</h2>
                <p className="text-blue-200">Available funds</p>
              </div>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-300"
            >
              {showBalance ? <Eye className="w-6 h-6 text-white" /> : <EyeOff className="w-6 h-6 text-white" />}
            </button>
          </div>
          
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-4">
              {showBalance ? `$${walletBalance.toFixed(2)}` : '••••'}
            </div>
            <div className="flex justify-center space-x-4">
              {[25, 50, 100].map(amount => (
                <button
                  key={amount}
                  onClick={() => handleAddMoney(amount)}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Add ${amount}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 mb-8 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
          {[
            { id: 'wallet', label: 'Wallet', icon: Wallet },
            { id: 'cards', label: 'Cards', icon: CreditCard },
            { id: 'history', label: 'History', icon: History },
            { id: 'promotions', label: 'Offers', icon: Gift }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {/* Wallet Tab */}
          {activeTab === 'wallet' && (
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-green-400" />
                  Quick Add Money
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[10, 20, 50, 100, 200, 500].map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleAddMoney(amount)}
                      className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30 rounded-2xl border border-white/20 text-white font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Shield className="w-6 h-6 mr-3 text-blue-400" />
                  Security Features
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Transaction PIN</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Biometric Lock</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">SMS Alerts</span>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300">
                    Manage Security
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cards Tab */}
          {activeTab === 'cards' && (
            <div className="space-y-6">
              <div className="grid gap-6">
                {paymentMethods.map(method => (
                  <div
                    key={method.id}
                    className={`bg-white/10 backdrop-blur-md rounded-3xl p-6 border transition-all duration-300 transform hover:scale-105 ${
                      selectedPaymentMethod === method.id
                        ? 'border-blue-400 bg-blue-500/20'
                        : 'border-white/20 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 bg-gradient-to-r ${method.color} rounded-2xl flex items-center justify-center`}>
                          {method.type === 'paypal' ? (
                            <Smartphone className="w-8 h-8 text-white" />
                          ) : (
                            <CreditCard className="w-8 h-8 text-white" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-white">{method.name}</h4>
                          <p className="text-gray-300">
                            {method.number || method.email}
                          </p>
                          {method.isDefault && (
                            <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full border border-green-500/30 mt-2">
                              Default
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {!method.isDefault && (
                          <button
                            onClick={() => handleSetDefault(method.id)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300"
                          >
                            Set Default
                          </button>
                        )}
                        <button className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-300">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => setShowAddCard(true)}
                  className="w-full p-6 border-2 border-dashed border-white/30 rounded-3xl text-white hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Plus className="w-6 h-6" />
                  <span className="text-lg font-semibold">Add New Payment Method</span>
                </button>
              </div>
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <History className="w-6 h-6 mr-3 text-blue-400" />
                Transaction History
              </h3>
              <div className="space-y-4">
                {recentTransactions.map(transaction => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${
                        transaction.type === 'ride' ? 'from-blue-500 to-purple-500' :
                        transaction.type === 'topup' ? 'from-green-500 to-emerald-500' :
                        'from-yellow-500 to-orange-500'
                      } rounded-xl flex items-center justify-center`}>
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">{transaction.description}</h4>
                        <p className="text-gray-300 text-sm">{transaction.date}</p>
                        {transaction.driver && (
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-blue-400 text-sm">{transaction.driver}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-yellow-400 text-sm">{transaction.rating}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        transaction.amount > 0 ? 'text-green-400' : 'text-white'
                      }`}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </div>
                      <div className={`text-sm ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Promotions Tab */}
          {activeTab === 'promotions' && (
            <div className="grid gap-6">
              {promotions.map(promo => (
                <div
                  key={promo.id}
                  className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${promo.color} rounded-2xl flex items-center justify-center`}>
                        <Gift className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white">{promo.title}</h4>
                        <p className="text-gray-300">{promo.description}</p>
                        <p className="text-sm text-blue-400 mt-1">Valid until {promo.validUntil}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-green-400">{promo.bonus}</div>
                      <button className="mt-2 px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold rounded-xl transition-all duration-300">
                        Claim Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div className="fixed top-20 right-6 z-50 space-y-2">
        {notifications.map(notification => (
          <div
            key={notification.id}
            className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border border-white/20 transform transition-all duration-500 ${
              notification.type === 'success'
                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                : 'bg-gradient-to-r from-red-600 to-pink-600 text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              {notification.type === 'success' ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <AlertCircle className="w-5 h-5" />
              )}
              <p className="font-semibold">{notification.message}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold text-white mb-6">Add New Card</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                />
              </div>
              <input
                type="text"
                placeholder="Cardholder Name"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
              />
              <div className="flex space-x-4 mt-6">
                <button
                  onClick={() => setShowAddCard(false)}
                  className="flex-1 py-3 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-2xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowAddCard(false);
                    showNotification('Card added successfully!');
                  }}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300"
                >
                  Add Card
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentPage;