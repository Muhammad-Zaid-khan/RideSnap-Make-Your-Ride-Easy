/* eslint-disable @typescript-eslint/no-unused-vars */
import  { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const EarningsDashboard = () => {
  const [timeFilter, setTimeFilter] = useState('week');
  const [totalEarnings, setTotalEarnings] = useState(3420);
  const [todayEarnings, setTodayEarnings] = useState(245);
  const [weeklyEarnings, setWeeklyEarnings] = useState(1680);
  const [monthlyEarnings, setMonthlyEarnings] = useState(6240);
  const [showDetails, setShowDetails] = useState(false);

  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', earnings: 180, rides: 8, hours: 6 },
    { day: 'Tue', earnings: 220, rides: 10, hours: 7.5 },
    { day: 'Wed', earnings: 195, rides: 9, hours: 6.5 },
    { day: 'Thu', earnings: 260, rides: 12, hours: 8 },
    { day: 'Fri', earnings: 310, rides: 15, hours: 9 },
    { day: 'Sat', earnings: 270, rides: 13, hours: 8.5 },
    { day: 'Sun', earnings: 245, rides: 11, hours: 7 }
  ];

  const hourlyData = [
    { hour: '6AM', earnings: 25 },
    { hour: '8AM', earnings: 45 },
    { hour: '10AM', earnings: 35 },
    { hour: '12PM', earnings: 55 },
    { hour: '2PM', earnings: 40 },
    { hour: '4PM', earnings: 65 },
    { hour: '6PM', earnings: 75 },
    { hour: '8PM', earnings: 50 },
    { hour: '10PM', earnings: 35 }
  ];

  const earningsBreakdown = [
    { name: 'Rides', value: 85, color: '#10B981' },
    { name: 'Tips', value: 12, color: '#3B82F6' },
    { name: 'Bonus', value: 8, color: '#8B5CF6' },
    { name: 'Surge', value: 15, color: '#F59E0B' }
  ];

  const recentRides = [
    { id: 1, from: 'Downtown Mall', to: 'Airport', fare: 85, time: '2:30 PM', tip: 8 },
    { id: 2, from: 'Hotel Plaza', to: 'University', fare: 45, time: '1:15 PM', tip: 5 },
    { id: 3, from: 'Central Station', to: 'Business District', fare: 65, time: '12:45 PM', tip: 7 },
    { id: 4, from: 'Shopping Center', to: 'Residence Area', fare: 35, time: '11:30 AM', tip: 3 },
    { id: 5, from: 'Park Avenue', to: 'City Center', fare: 55, time: '10:20 AM', tip: 6 }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setShowDetails(true), 300);
    return () => clearTimeout(timer);
  }, []);

  type StatCardProps = {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    percentage?: string | number;
    trend?: 'up' | 'down';
  };

  const StatCard = ({ title, value, icon, color, percentage, trend }: StatCardProps) => (
    <div className={`bg-gradient-to-r ${color} backdrop-blur-md p-6 rounded-2xl border border-white/20 hover:scale-105 transition-all duration-300 shadow-lg`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-white text-3xl font-bold">${value}</p>
          {percentage && (
            <div className="flex items-center mt-2">
              <span className={`text-sm ${trend === 'up' ? 'text-green-300' : 'text-red-300'}`}>
                {trend === 'up' ? '↗' : '↘'} {percentage}%
              </span>
              <span className="text-white/60 text-xs ml-2">vs last week</span>
            </div>
          )}
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-green-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-yellow-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-purple-500 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">💰</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Earnings Dashboard</h1>
              <p className="text-gray-300">Track your financial progress</p>
            </div>
          </div>
          
          {/* Time Filter */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20">
            <div className="flex space-x-2">
              {['today', 'week', 'month'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                    timeFilter === filter
                      ? 'bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 transition-all duration-700 ${showDetails ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
          <StatCard
            title="Today's Earnings"
            value={todayEarnings}
            icon="🌟"
            color="from-green-500/20 to-emerald-600/20"
            percentage="12.5"
            trend="up"
          />
          <StatCard
            title="Weekly Earnings"
            value={weeklyEarnings}
            icon="📈"
            color="from-blue-500/20 to-cyan-600/20"
            percentage="8.3"
            trend="up"
          />
          <StatCard
            title="Monthly Earnings"
            value={monthlyEarnings}
            icon="💵"
            color="from-purple-500/20 to-pink-600/20"
            percentage="15.7"
            trend="up"
          />
          <StatCard
            title="Total Earnings"
            value={totalEarnings}
            icon="🏆"
            color="from-orange-500/20 to-red-600/20"
            percentage="22.1"
            trend="up"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Earnings Chart */}
          <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-700 delay-200 ${showDetails ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">📊</span>
                Weekly Performance
              </h3>
              <div className="text-green-400 font-semibold">+12.5%</div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="earnings" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Earnings */}
          <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-700 delay-300 ${showDetails ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white flex items-center">
                <span className="mr-2">🕐</span>
                Peak Hours
              </h3>
              <div className="text-blue-400 font-semibold">Best: 6-8 PM</div>
            </div>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="hour" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
                <Bar dataKey="earnings" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="100%" stopColor="#1E40AF" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Earnings Breakdown */}
          <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-700 delay-400 ${showDetails ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="mr-2">🥧</span>
              Income Sources
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={earningsBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {earningsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: 'none', 
                    borderRadius: '12px',
                    color: 'white'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {earningsBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300 text-sm">{item.name}</span>
                  </div>
                  <span className="text-white font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Rides */}
          <div className={`lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 transition-all duration-700 delay-500 ${showDetails ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <span className="mr-2">🚗</span>
              Recent Rides
            </h3>
            <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar">
              {recentRides.map((ride, index) => (
                <div key={ride.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold">#{ride.id}</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold">{ride.from} → {ride.to}</p>
                      <p className="text-gray-400 text-sm">{ride.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-green-400 font-bold text-lg">${ride.fare}</p>
                    <p className="text-gray-400 text-sm">+${ride.tip} tip</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 space-y-4">
          <button className="w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-pulse">
            <span className="text-white text-xl">📊</span>
          </button>
          <button className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <span className="text-white text-xl">📋</span>
          </button>
          <button className="w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
            <span className="text-white text-xl">⚙️</span>
          </button>
        </div>
      </div>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .custom-scrollbar::-webkit-scrollbar {
            width: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
          }
          @keyframes slideInUp {
            from { transform: translateY(30px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          @keyframes fadeInScale {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-slideInUp {
            animation: slideInUp 0.6s ease-out;
          }
          .animate-fadeInScale {
            animation: fadeInScale 0.5s ease-out;
          }
        `
      }} />
    </div>
  );
};

export default EarningsDashboard;