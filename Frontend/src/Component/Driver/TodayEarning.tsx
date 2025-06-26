import { useState, useEffect } from "react";
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const TodayEarningsDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock data for today
  const todayEarnings = {
    total: 245,
    trips: 8,
    hours: 6.5,
    avgPerTrip: 30.6,
    hourlyRate: 37.7,
    startTime: '08:30',
    endTime: '15:00'
  };

  const hourlyData = [
    { hour: '8 AM', earnings: 32, trips: 1 },
    { hour: '9 AM', earnings: 45, trips: 2 },
    { hour: '10 AM', earnings: 28, trips: 1 },
    { hour: '11 AM', earnings: 38, trips: 1 },
    { hour: '12 PM', earnings: 52, trips: 2 },
    { hour: '1 PM', earnings: 25, trips: 1 },
    { hour: '2 PM', earnings: 25, trips: 0 }
  ];

  const todayBreakdown = [
    { name: 'Base Fare', value: 70, color: '#3B82F6' },
    { name: 'Tips', value: 18, color: '#10B981' },
    { name: 'Surge Pricing', value: 8, color: '#F59E0B' },
    { name: 'Bonuses', value: 4, color: '#8B5CF6' }
  ];

  const todayTrips = [
    { id: 1, time: '14:30', from: 'Downtown Mall', to: 'Airport Terminal 2', fare: 35, tip: 8, duration: '18 min', status: 'completed' },
    { id: 2, time: '13:15', from: 'Hotel Grand', to: 'Business District', fare: 28, tip: 7, duration: '12 min', status: 'completed' },
    { id: 3, time: '12:45', from: 'University Campus', to: 'Shopping Center', fare: 22, tip: 5, duration: '15 min', status: 'completed' },
    { id: 4, time: '11:20', from: 'Residential Area', to: 'Medical Center', fare: 18, tip: 3, duration: '10 min', status: 'completed' },
    { id: 5, time: '10:30', from: 'Train Station', to: 'Office Complex', fare: 32, tip: 6, duration: '20 min', status: 'completed' },
    { id: 6, time: '09:45', from: 'Coffee Shop', to: 'Library', fare: 15, tip: 2, duration: '8 min', status: 'completed' },
    { id: 7, time: '09:10', from: 'Home', to: 'School', fare: 20, tip: 4, duration: '12 min', status: 'completed' },
    { id: 8, time: '08:30', from: 'Hotel Plaza', to: 'Convention Center', fare: 25, tip: 4, duration: '14 min', status: 'completed' }
  ];

  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 1000);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const formatCurrency = (amount: number) => `$${amount.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-emerald-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-500 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-pink-500 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-white font-bold text-2xl">📅</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text">
                Today's Earnings
              </h1>
              <p className="text-gray-300">Real-time daily performance & analytics</p>
            </div>
          </div>
          
          {/* Live Status */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
              <div>
                <p className="text-white font-semibold">Live Status</p>
                <p className="text-gray-300 text-sm">{currentTime}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className={`bg-gradient-to-br from-emerald-500/20 to-emerald-600/30 backdrop-blur-md p-6 rounded-2xl border border-emerald-500/30 transform transition-all duration-500 hover:scale-105 ${isAnimating ? 'animate-bounce' : ''}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm font-medium">Today's Total</p>
                <p className="text-white text-3xl font-bold">{formatCurrency(todayEarnings.total)}</p>
                <p className="text-emerald-400 text-xs mt-1">+15% from yesterday</p>
              </div>
              <div className="w-14 h-14 bg-emerald-500 rounded-xl flex items-center justify-center animate-pulse">
                <span className="text-white text-2xl">💰</span>
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-br from-blue-500/20 to-blue-600/30 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30 transform transition-all duration-500 hover:scale-105 ${isAnimating ? 'animate-bounce' : ''}`} style={{animationDelay: '0.1s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Trips Completed</p>
                <p className="text-white text-3xl font-bold">{todayEarnings.trips}</p>
                <p className="text-blue-400 text-xs mt-1">{formatCurrency(todayEarnings.avgPerTrip)} average</p>
              </div>
              <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center animate-pulse">
                <span className="text-white text-2xl">🚗</span>
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-br from-purple-500/20 to-purple-600/30 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30 transform transition-all duration-500 hover:scale-105 ${isAnimating ? 'animate-bounce' : ''}`} style={{animationDelay: '0.2s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">Hours Active</p>
                <p className="text-white text-3xl font-bold">{todayEarnings.hours}h</p>
                <p className="text-purple-400 text-xs mt-1">{formatCurrency(todayEarnings.hourlyRate)}/hour</p>
              </div>
              <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center animate-pulse">
                <span className="text-white text-2xl">⏰</span>
              </div>
            </div>
          </div>

          <div className={`bg-gradient-to-br from-yellow-500/20 to-orange-600/30 backdrop-blur-md p-6 rounded-2xl border border-yellow-500/30 transform transition-all duration-500 hover:scale-105 ${isAnimating ? 'animate-bounce' : ''}`} style={{animationDelay: '0.3s'}}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-300 text-sm font-medium">Peak Hour</p>
                <p className="text-white text-3xl font-bold">12PM</p>
                <p className="text-yellow-400 text-xs mt-1">{formatCurrency(52)} earned</p>
              </div>
              <div className="w-14 h-14 bg-yellow-500 rounded-xl flex items-center justify-center animate-pulse">
                <span className="text-white text-2xl">📈</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 mb-8">
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'hourly', label: 'Hourly Breakdown', icon: '⏰' },
              { id: 'breakdown', label: 'Income Sources', icon: '🔍' },
              { id: 'trips', label: 'Trip Details', icon: '📋' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-emerald-500 to-blue-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Hourly Earnings Chart */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">📈</span>
                  Today's Hourly Performance
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="hour" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '12px',
                        color: '#fff'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="earnings" 
                      stroke="#10B981" 
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Live Stats */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">🎯</span>
                  Today's Progress
                </h3>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Daily Goal Progress</span>
                      <span className="text-emerald-400 font-bold">82%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-emerald-500 to-blue-500 h-3 rounded-full" style={{width: '82%'}}></div>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{formatCurrency(todayEarnings.total)} / {formatCurrency(300)} goal</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300">Trip Target</span>
                      <span className="text-blue-400 font-bold">80%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{width: '80%'}}></div>
                    </div>
                    <div className="text-gray-400 text-sm mt-1">{todayEarnings.trips} / 10 trips</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl">
                      <div className="text-2xl mb-1">🏁</div>
                      <div className="text-emerald-400 font-bold">{todayEarnings.startTime}</div>
                      <div className="text-gray-300 text-sm">Started</div>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl">
                      <div className="text-2xl mb-1">🚀</div>
                      <div className="text-blue-400 font-bold">Active</div>
                      <div className="text-gray-300 text-sm">Status</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hourly' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">⏰</span>
                  Hourly Breakdown
                </h3>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={hourlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="hour" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '12px',
                        color: '#fff'
                      }} 
                    />
                    <Bar dataKey="earnings" fill="url(#barGradient)" radius={[8, 8, 0, 0]} />
                    <defs>
                      <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" />
                        <stop offset="100%" stopColor="#1D4ED8" />
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">📊</span>
                  Hour Details
                </h3>
                <div className="space-y-3">
                  {hourlyData.map((hour, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                      <div>
                        <div className="text-white font-medium">{hour.hour}</div>
                        <div className="text-gray-400 text-sm">{hour.trips} trips</div>
                      </div>
                      <div className="text-emerald-400 font-bold">{formatCurrency(hour.earnings)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'breakdown' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">🥧</span>
                  Today's Income Sources
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={todayBreakdown}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(props) => {
                        const name = props.name ?? '';
                        const percent = props.percent ?? 0;
                        return `${name} ${(percent * 100).toFixed(0)}%`;
                      }}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {todayBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '12px',
                        color: '#fff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                  <span className="mr-2">💰</span>
                  Income Details
                </h3>
                <div className="space-y-4">
                  {todayBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-white font-medium">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-bold">{item.value}%</div>
                        <div className="text-gray-400 text-sm">
                          ${Math.round(todayEarnings.total * (item.value / 100))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-xl border border-emerald-500/30">
                  <div className="flex justify-between items-center">
                    <span className="text-emerald-300 font-medium">Today's Total</span>
                    <span className="text-white font-bold text-xl">{formatCurrency(todayEarnings.total)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'trips' && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <span className="mr-2">📋</span>
                Today's Trip Details
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Time</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Route</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Duration</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Fare</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Tip</th>
                      <th className="text-left py-3 px-4 text-gray-300 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayTrips.map((trip) => (
                      <tr key={trip.id} className="border-b border-gray-700 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-4 text-white font-medium">{trip.time}</td>
                        <td className="py-4 px-4">
                          <div className="text-white font-medium">{trip.from}</div>
                          <div className="text-gray-400 text-sm flex items-center">
                            <span className="mr-1">→</span>
                            {trip.to}
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-300">{trip.duration}</td>
                        <td className="py-4 px-4 text-white font-medium">${trip.fare}</td>
                        <td className="py-4 px-4 text-emerald-400 font-medium">${trip.tip}</td>
                        <td className="py-4 px-4 text-blue-400 font-bold">${trip.fare + trip.tip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-gray-400 text-sm">
                  {todayTrips.length} trips completed today • {formatCurrency(todayEarnings.total)} total earned
                </div>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-medium hover:scale-105 transition-transform">
                    Export Today's Data
                  </button>
                  <button className="px-4 py-2 bg-white/10 text-white rounded-xl font-medium hover:bg-white/20 transition-colors">
                    View Yesterday
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Today's Summary Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 backdrop-blur-md p-6 rounded-2xl border border-emerald-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-300 text-sm font-medium">Earnings vs Yesterday</p>
                <p className="text-white text-2xl font-bold">+15%</p>
                <p className="text-emerald-400 text-xs mt-1">+${formatCurrency(32)} more</p>
              </div>
              <div className="text-4xl">📈</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300 text-sm font-medium">Best Hour</p>
                <p className="text-white text-2xl font-bold">12:00 PM</p>
                <p className="text-blue-400 text-xs mt-1">{formatCurrency(52)} earned</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm font-medium">Efficiency Rating</p>
                <p className="text-white text-2xl font-bold">94%</p>
                <p className="text-purple-400 text-xs mt-1">Excellent performance</p>
              </div>
              <div className="text-4xl">⚡</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodayEarningsDashboard;