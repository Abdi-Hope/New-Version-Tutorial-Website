import React, { useState, useEffect } from 'react';
import {
  Clock, AlertCircle, Calendar, Zap, CheckCircle,
  XCircle, RefreshCw, TrendingUp, Target, Gift,
  ChevronRight, DollarSign, Users, Award, Download
} from 'lucide-react';

const TrialTimer = ({ trialEndDate = '2024-02-05T23:59:59' }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isExpired, setIsExpired] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const endDate = new Date(trialEndDate);
      const now = new Date();
      const difference = endDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
      } else {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
    };

    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [trialEndDate]);

  const progress = ((7 - timeLeft.days) / 7) * 100;
  const formatNumber = (num) => num.toString().padStart(2, '0');

  const usageStats = {
    coursesAccessed: 3,
    totalLessons: 12,
    completionRate: 45,
    timeSpent: '8h 30m'
  };

  const upgradePlans = [
    {
      name: 'Monthly',
      price: '$29',
      period: 'per month',
      popular: false,
      features: ['All courses', 'Community access', 'Basic support']
    },
    {
      name: 'Annual',
      price: '$299',
      period: 'per year',
      popular: true,
      features: ['All courses', 'Community access', 'Priority support', 'Download courses', 'Certificate included'],
      discount: 'Save 15%'
    },
    {
      name: 'Lifetime',
      price: '$899',
      period: 'one-time',
      popular: false,
      features: ['All courses forever', 'All future courses', 'Premium support', 'Download courses', 'All certificates', 'Early access']
    }
  ];

  const handleExtendTrial = () => {
    if (window.confirm('Extend your trial by 3 days?')) {
      // In a real app, this would call an API
      alert('Trial extended by 3 days!');
    }
  };

  const handleUpgrade = (plan) => {
    setShowUpgradeModal(false);
    alert(`Upgrading to ${plan.name} plan...`);
  };

  if (isExpired) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your Trial Has Ended
          </h2>
          
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            Your 7-day free trial has expired. Upgrade now to continue accessing all courses and features.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {upgradePlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 border-2 ${
                  plan.popular
                    ? 'border-blue-500 shadow-lg'
                    : 'border-gray-200 dark:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                
                <div className="mb-4">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">
                      {plan.period}
                    </span>
                  </div>
                  {plan.discount && (
                    <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                      {plan.discount}
                    </p>
                  )}
                </div>
                
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handleUpgrade(plan)}
                  className={`w-full py-3 rounded-lg font-bold ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                  }`}
                >
                  Upgrade Now
                </button>
              </div>
            ))}
          </div>
          
          <button
            onClick={handleExtendTrial}
            className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Need more time? Request trial extension</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              Your Free Trial is Active! 🎉
            </h2>
            <p className="text-blue-100">
              Full access to all courses and features
            </p>
          </div>
          
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
            <Gift className="w-5 h-5" />
            <span className="font-medium">7-DAY FREE TRIAL</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Timer & Progress */}
          <div className="lg:col-span-2">
            {/* Timer */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-8">
              <div className="flex items-center space-x-2 mb-6">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Time Remaining
                </h3>
              </div>
              
              <div className="grid grid-cols-4 gap-4 mb-8">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                        {formatNumber(value)}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 uppercase">
                        {unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>Trial Progress</span>
                  <span>{7 - timeLeft.days} of 7 days used</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-full transition-all duration-1000"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>Day 1</span>
                  <span>Day 4</span>
                  <span>Day 7</span>
                </div>
              </div>
            </div>

            {/* Usage Stats */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Your Trial Usage
                </h3>
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                >
                  Upgrade Now
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border dark:border-gray-700">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {usageStats.coursesAccessed}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Courses Accessed
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border dark:border-gray-700">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {usageStats.totalLessons}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Lessons Completed
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border dark:border-gray-700">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {usageStats.completionRate}%
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Completion Rate
                  </div>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border dark:border-gray-700">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {usageStats.timeSpent}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Time Spent
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Info */}
          <div className="space-y-6">
            {/* Trial Benefits */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-green-200 dark:border-green-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-green-600 dark:text-green-400" />
                Trial Benefits
              </h3>
              
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Full course access</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Download resources</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Community access</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-gray-700 dark:text-gray-300">Progress tracking</span>
                </li>
              </ul>
            </div>

            {/* Upgrade CTA */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Continue Learning
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Upgrade now to keep your progress and continue learning without interruption.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold flex items-center justify-center space-x-2"
                >
                  <DollarSign className="w-5 h-5" />
                  <span>Upgrade to Full Access</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={handleExtendTrial}
                  className="w-full py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Extend Trial (3 Days)
                </button>
              </div>
            </div>

            {/* Reminders */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-2">
                    Trial Ending Soon
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Your trial ends on{' '}
                    <span className="font-semibold">
                      {new Date(trialEndDate).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                    . Upgrade before then to avoid losing access.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 hover:bg-white dark:hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Download Resources</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 hover:bg-white dark:hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Join Community</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
                
                <button className="w-full flex items-center justify-between p-3 hover:bg-white dark:hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Target className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">Set Learning Goals</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Choose Your Plan
                </h3>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <XCircle className="w-6 h-6 text-gray-400" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {upgradePlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border-2 ${
                      plan.popular
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    {plan.popular && (
                      <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium mb-4">
                        Most Popular
                      </div>
                    )}
                    
                    <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {plan.name}
                    </h4>
                    
                    <div className="mb-4">
                      <div className="flex items-baseline">
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {plan.price}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 ml-2">
                          {plan.period}
                        </span>
                      </div>
                      {plan.discount && (
                        <p className="text-green-600 dark:text-green-400 text-sm mt-1">
                          {plan.discount}
                        </p>
                      )}
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    
                    <button
                      onClick={() => handleUpgrade(plan)}
                      className={`w-full py-3 rounded-lg font-bold ${
                        plan.popular
                          ? 'bg-blue-600 hover:bg-blue-700 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white'
                      }`}
                    >
                      Choose Plan
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  30-day money-back guarantee • Cancel anytime • Support included
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrialTimer;
