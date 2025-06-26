/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DriverRatingPage = () => {
  const [currentRating, setCurrentRating] = useState(4.8);
  const [totalRatings, setTotalRatings] = useState(247);
  const [recentRatings, setRecentRatings] = useState([
    { id: 1, rating: 5, comment: "Excellent service! Very professional and friendly driver.", passenger: "Sarah M.", date: "2 hours ago", avatar: "👩" },
    { id: 2, rating: 4, comment: "Good ride, on time pickup. Vehicle was clean.", passenger: "Ahmed K.", date: "1 day ago", avatar: "👨" },
    { id: 3, rating: 5, comment: "Amazing driver! Helped with luggage and very courteous.", passenger: "Maria L.", date: "2 days ago", avatar: "👩‍🦱" },
    { id: 4, rating: 5, comment: "Safe driving and great conversation. Highly recommend!", passenger: "John D.", date: "3 days ago", avatar: "👨‍🦲" },
    { id: 5, rating: 4, comment: "Professional service, arrived exactly on time.", passenger: "Fatima A.", date: "4 days ago", avatar: "👩‍🧕" },
    { id: 6, rating: 5, comment: "Best ride experience I've had! Thank you!", passenger: "Robert C.", date: "5 days ago", avatar: "👨‍🦳" }
  ]);

  const [ratingBreakdown, setRatingBreakdown] = useState<Record<1 | 2 | 3 | 4 | 5, number>>({
    5: 68,
    4: 22,
    3: 7,
    2: 2,
    1: 1
  });

  const [achievements, setAchievements] = useState([
    { title: "5-Star Champion", description: "Maintained 4.8+ rating for 3 months", icon: "🏆", earned: true },
    { title: "Customer Favorite", description: "Received 50+ compliments", icon: "❤️", earned: true },
    { title: "Reliable Driver", description: "99% on-time pickup rate", icon: "⏰", earned: true },
    { title: "Safety Expert", description: "Zero safety incidents", icon: "🛡️", earned: true },
    { title: "Clean Ride Pro", description: "Vehicle cleanliness 5/5", icon: "✨", earned: false },
    { title: "Communication Star", description: "Excellent communication rating", icon: "💬", earned: true }
  ]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span
        key={index}
        className={`text-2xl ${index < rating ? 'text-yellow-400' : 'text-gray-400'}`}
      >
        ⭐
      </span>
    ));
  };

  const getPercentage = (count: number) => {
    return Math.round((count / totalRatings) * 100);
  };

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-40 h-40 bg-yellow-500 rounded-full animate-pulse"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-pink-500 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-blue-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-green-500 rounded-full animate-pulse"></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button 
            onClick={ () => {navigate('/driver')}}
            className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/20 hover:scale-105 transition-transform duration-300">
              <span className="text-white text-xl">←</span>
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white">Your Ratings</h1>
              <p className="text-gray-300">See what passengers think about you</p>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-md p-4 rounded-2xl border border-yellow-500/30">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">⭐</span>
              <div>
                <p className="text-yellow-300 text-sm">Current Rating</p>
                <p className="text-white text-2xl font-bold">{currentRating}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Rating Display */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <div className="text-8xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-4">
                {currentRating}
              </div>
              <div className="flex justify-center mb-4">
                {renderStars(Math.floor(currentRating))}
              </div>
              <p className="text-gray-300 text-lg">Based on {totalRatings} ratings</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center space-x-4">
                  <span className="text-white w-8">{star}★</span>
                  <div className="flex-1 bg-gray-700 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 ${
                        star === 5 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                        star === 4 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                        star === 3 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                        star === 2 ? 'bg-gradient-to-r from-orange-400 to-orange-600' :
                        'bg-gradient-to-r from-red-400 to-red-600'
                      }`}
                      style={{ width: `${getPercentage(ratingBreakdown[star as 1 | 2 | 3 | 4 | 5])}%` }}
                    ></div>
                  </div>
                  <span className="text-gray-300 w-12 text-sm">{getPercentage(ratingBreakdown[star as 1 | 2 | 3 | 4 | 5])}%</span>
                  <span className="text-gray-400 w-8 text-sm">({ratingBreakdown[star as 1 | 2 | 3 | 4 | 5]})</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-md p-6 rounded-2xl border border-green-500/30">
              <div className="text-center">
                <div className="text-3xl mb-2">🏆</div>
                <div className="text-2xl font-bold text-white">{getPercentage(ratingBreakdown[5])}%</div>
                <div className="text-green-300 text-sm">5-Star Ratings</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-600/20 backdrop-blur-md p-6 rounded-2xl border border-blue-500/30">
              <div className="text-center">
                <div className="text-3xl mb-2">📈</div>
                <div className="text-2xl font-bold text-white">+0.2</div>
                <div className="text-blue-300 text-sm">This Month</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 backdrop-blur-md p-6 rounded-2xl border border-purple-500/30">
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <div className="text-2xl font-bold text-white">Top 5%</div>
                <div className="text-purple-300 text-sm">Driver Ranking</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">🏅</span>
            Your Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  achievement.earned
                    ? 'bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border-yellow-500/30'
                    : 'bg-white/5 border-gray-600/30'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`text-3xl ${achievement.earned ? '' : 'grayscale opacity-50'}`}>
                    {achievement.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${achievement.earned ? 'text-white' : 'text-gray-400'}`}>
                      {achievement.title}
                    </h3>
                    <p className={`text-sm ${achievement.earned ? 'text-gray-300' : 'text-gray-500'}`}>
                      {achievement.description}
                    </p>
                  </div>
                </div>
                {achievement.earned && (
                  <div className="mt-2">
                    <span className="inline-block bg-yellow-500/20 text-yellow-300 text-xs px-2 py-1 rounded-full">
                      Earned
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Reviews */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="mr-3">💬</span>
            Recent Reviews
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {recentRatings.map((review) => (
              <div
                key={review.id}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-2xl">
                    {review.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-white">{review.passenger}</h4>
                      <div className="flex">
                        {renderStars(review.rating).slice(0, review.rating)}
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 leading-relaxed">
                      "{review.comment}"
                    </p>
                    <p className="text-gray-400 text-xs">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rating Tips */}
        <div className="mt-8 bg-gradient-to-r from-indigo-500/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 border border-indigo-500/30">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <span className="mr-3">💡</span>
            Tips to Improve Your Rating
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl mb-2">🚗</div>
              <div className="text-white font-medium text-sm">Keep Vehicle Clean</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl mb-2">⏰</div>
              <div className="text-white font-medium text-sm">Arrive On Time</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl mb-2">😊</div>
              <div className="text-white font-medium text-sm">Be Friendly</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-xl">
              <div className="text-2xl mb-2">🛣️</div>
              <div className="text-white font-medium text-sm">Drive Safely</div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          @keyframes shimmer {
            0% { background-position: -200px 0; }
            100% { background-position: calc(200px + 100%) 0; }
          }
          .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            background-size: 200px 100%;
            animation: shimmer 2s infinite;
          }
        `
      }} />
    </div>
  );
};

export default DriverRatingPage;