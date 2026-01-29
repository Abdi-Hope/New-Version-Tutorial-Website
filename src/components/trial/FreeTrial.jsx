import React, { useState, useEffect } from 'react';
import {
  CheckCircle, XCircle, Clock, Zap, Shield,
  Award, Users, TrendingUp, Star, LockOpen,
  ChevronRight, Gift, Calendar, Target, Trophy
} from 'lucide-react';

const FreeTrial = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 7,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: LockOpen,
      title: 'Full Course Access',
      description: 'Access all lessons and materials',
      included: true
    },
    {
      icon: Award,
      title: 'Completion Certificate',
      description: 'Earn certificate upon completion',
      included: true
    },
    {
      icon: Users,
      title: 'Community Access',
      description: 'Join student community forums',
      included: true
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Track your learning progress',
      included: true
    },
    {
      icon: Shield,
      title: 'Priority Support',
      description: 'Get help from instructors',
      included: false
    },
    {
      icon: Trophy,
      title: 'Advanced Projects',
      description: 'Access to real-world projects',
      included: false
    }
  ];

  const courses = [
    {
      title: 'Complete Web Development Bootcamp',
      instructor: 'Alex Johnson',
      rating: 4.9,
      students: '12,450',
      lessons: 45,
      thumbnail: '💻'
    },
    {
      title: 'Python for Data Science',
      instructor: 'Sarah Wilson',
      rating: 4.8,
      students: '8,920',
      lessons: 32,
      thumbnail: '🐍'
    },
    {
      title: 'Mobile App Development',
      instructor: 'Mike Chen',
      rating: 4.7,
      students: '6,780',
      lessons: 28,
      thumbnail: '📱'
    }
  ];

  const testimonials = [
    {
      name: 'Emma Rodriguez',
      role: 'Student',
      text: 'The free trial helped me realize the value of this platform. I completed my first course during the trial and immediately upgraded.',
      avatar: 'ER'
    },
    {
      name: 'David Kim',
      role: 'Developer',
      text: 'Access to all courses during the trial period was amazing. I could explore multiple topics before deciding.',
      avatar: 'DK'
    },
    {
      name: 'Lisa Thompson',
      role: 'Designer',
      text: 'The trial convinced me to join. The course quality and community support exceeded my expectations.',
      avatar: 'LT'
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Gift className="w-5 h-5" />
            <span className="font-medium">LIMITED TIME OFFER</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start Your 7-Day Free Trial
          </h1>
          
          <p className="text-xl text-blue-100 mb-8">
            Get full access to all courses, no credit card required. Cancel anytime.
          </p>
          
          {/* Timer */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Clock className="w-6 h-6" />
              <span className="text-lg font-semibold">Trial Ends In:</span>
            </div>
            
            <div className="flex justify-center space-x-4">
              {Object.entries(timeLeft).map(([unit, value]) => (
                <div key={unit} className="text-center">
                  <div className="bg-white/20 rounded-lg p-4 min-w-[80px]">
                    <div className="text-3xl font-bold">{value.toString().padStart(2, '0')}</div>
                    <div className="text-sm text-blue-200 mt-1 uppercase">{unit}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
                  style={{ width: `${((7 - timeLeft.days) / 7) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm text-blue-200 mt-2">
                <span>Day {7 - timeLeft.days} of 7</span>
                <span>{Math.round(((7 - timeLeft.days) / 7) * 100)}% complete</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all transform hover:-translate-y-1">
              Start Free Trial Now
            </button>
            <button className="px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white rounded-xl font-bold text-lg transition-all">
              View All Courses
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          {/* Features Grid */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-4">
              Everything Included in Your Trial
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Experience the full platform with no limitations during your 7-day trial period
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-xl border ${
                      feature.included
                        ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        feature.included
                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold text-gray-900 dark:text-white">
                            {feature.title}
                          </h3>
                          {feature.included ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Popular Courses */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Popular Courses to Explore
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Start learning from these top-rated courses during your trial
                </p>
              </div>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                View All Courses →
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-4xl">{course.thumbnail}</div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        By {course.instructor}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>{course.rating}</span>
                      </span>
                      <span>{course.students} students</span>
                    </div>
                    <span>{course.lessons} lessons</span>
                  </div>
                  
                  <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                    Start Learning
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-12">
              What Students Say About Our Trial
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  q: 'Do I need a credit card to start the free trial?',
                  a: 'No, you can start your 7-day free trial without providing any payment information. We only ask for payment details if you decide to continue after the trial.'
                },
                {
                  q: 'What happens when my trial ends?',
                  a: 'After 7 days, your trial will automatically convert to our Basic plan. You can cancel anytime before the trial ends to avoid being charged.'
                },
                {
                  q: 'Can I access all courses during the trial?',
                  a: 'Yes! Your trial gives you full access to our entire course library, including all lessons, projects, and community features.'
                },
                {
                  q: 'How do I cancel my trial?',
                  a: 'You can cancel anytime from your account settings. We\'ll send you reminders before your trial ends so you don\'t forget.'
                }
              ].map((faq, index) => (
                <div key={index} className="border-b dark:border-gray-700 pb-6">
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3">
                    {faq.q}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-cyan-500 text-white rounded-full px-6 py-3 mb-6">
              <Zap className="w-5 h-5" />
              <span className="font-bold">Limited Spots Available</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Ready to Transform Your Skills?
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of students who started with a free trial and are now building amazing careers.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:-translate-y-1 shadow-lg">
                Start Your Free Trial Now
                <ChevronRight className="w-5 h-5 inline ml-2" />
              </button>
              
              <button className="px-10 py-4 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl font-bold text-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                Schedule a Demo Call
              </button>
            </div>
            
            <p className="mt-6 text-gray-500 dark:text-gray-400 text-sm">
              No credit card required • Cancel anytime • 30-day money-back guarantee
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeTrial;
