import React, { useState, useEffect } from 'react';
import { 
  Sparkles, TrendingUp, Target, Clock, Star,
  Filter, RefreshCw, BookOpen, Users, Award,
  Zap, Brain, Briefcase, Heart, Share2,
  ChevronRight, CheckCircle, XCircle, Maximize2,
  Download, ExternalLink, ThumbsUp, ThumbsDown
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const RecommendationEngine = ({
  userProfile,
  onSelectCourse,
  onSaveRecommendation,
  onProvideFeedback,
  showFilters = true,
  limit = 6
}) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    level: 'all',
    duration: 'all',
    category: 'all',
    sortBy: 'relevance'
  });
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [feedback, setFeedback] = useState({});
  const [viewMode, setViewMode] = useState('grid'); // grid, list, detailed
  const { theme } = useTheme();

  // Sample user profile
  const sampleProfile = userProfile || {
    id: 'user-123',
    skills: ['JavaScript', 'HTML', 'CSS'],
    interests: ['web-development', 'frontend', 'react'],
    completedCourses: ['html-basics', 'css-fundamentals'],
    goals: ['Become a frontend developer', 'Learn React', 'Build portfolio'],
    timeCommitment: '10 hours/week',
    learningStyle: 'visual',
    experienceLevel: 'beginner'
  };

  // Sample courses
  const sampleCourses = [
    {
      id: 'course-1',
      title: 'React - The Complete Guide',
      description: 'Dive in and learn React from scratch! Learn Reactjs, Hooks, Redux, React Routing, Animations, Next.js and way more!',
      category: 'web-development',
      subcategory: 'frontend',
      level: 'intermediate',
      duration: '48 hours',
      rating: 4.7,
      students: 185432,
      instructor: 'Maximilian Schwarzmüller',
      price: 94.99,
      originalPrice: 199.99,
      skills: ['React', 'JavaScript', 'Redux', 'Next.js'],
      matchScore: 95,
      reason: 'Matches your interest in React and complements your JavaScript skills'
    },
    {
      id: 'course-2',
      title: 'The Complete JavaScript Course 2024',
      description: 'The modern JavaScript course for everyone! Master JavaScript with projects, challenges and theory.',
      category: 'web-development',
      subcategory: 'frontend',
      level: 'beginner',
      duration: '68 hours',
      rating: 4.8,
      students: 256789,
      instructor: 'Jonas Schmedtmann',
      price: 84.99,
      originalPrice: 189.99,
      skills: ['JavaScript', 'ES6+', 'Async Programming', 'DOM'],
      matchScore: 92,
      reason: 'Builds on your existing JavaScript knowledge and prepares you for advanced concepts'
    },
    {
      id: 'course-3',
      title: 'Advanced CSS and Sass',
      description: 'The most advanced and modern CSS course on the internet. Master flexbox, CSS Grid, responsive design, and so much more.',
      category: 'web-development',
      subcategory: 'frontend',
      level: 'intermediate',
      duration: '28 hours',
      rating: 4.9,
      students: 98765,
      instructor: 'Jonas Schmedtmann',
      price: 74.99,
      originalPrice: 169.99,
      skills: ['CSS3', 'Sass', 'Flexbox', 'CSS Grid', 'Responsive Design'],
      matchScore: 88,
      reason: 'Enhances your CSS skills which you listed as an existing skill'
    },
    {
      id: 'course-4',
      title: 'Node.js - The Complete Guide',
      description: 'Master Node JS & Deno.js, build REST APIs with Node.js, GraphQL APIs, add Authentication, use MongoDB, SQL & much more!',
      category: 'web-development',
      subcategory: 'backend',
      level: 'intermediate',
      duration: '40 hours',
      rating: 4.7,
      students: 123456,
      instructor: 'Maximilian Schwarzmüller',
      price: 94.99,
      originalPrice: 199.99,
      skills: ['Node.js', 'Express', 'MongoDB', 'REST API'],
      matchScore: 75,
      reason: 'Expands your skills to full-stack development based on your web development interest'
    },
    {
      id: 'course-5',
      title: 'Complete React Native in 2024',
      description: 'Learn to build native iOS & Android apps with React Native, Expo, Firebase, and React Navigation.',
      category: 'mobile-development',
      subcategory: 'react-native',
      level: 'intermediate',
      duration: '37 hours',
      rating: 4.8,
      students: 87654,
      instructor: 'Stephen Grider',
      price: 84.99,
      originalPrice: 189.99,
      skills: ['React Native', 'Expo', 'Mobile Development', 'Firebase'],
      matchScore: 70,
      reason: 'Mobile development is a natural progression from web development'
    },
    {
      id: 'course-6',
      title: 'TypeScript - The Complete Developer\'s Guide',
      description: 'Master TypeScript by learning popular design patterns and building complex projects.',
      category: 'web-development',
      subcategory: 'frontend',
      level: 'intermediate',
      duration: '22 hours',
      rating: 4.9,
      students: 65432,
      instructor: 'Stephen Grider',
      price: 74.99,
      originalPrice: 169.99,
      skills: ['TypeScript', 'JavaScript', 'Design Patterns'],
      matchScore: 85,
      reason: 'TypeScript is the next step after mastering JavaScript'
    }
  ];

  useEffect(() => {
    // Simulate API call for recommendations
    setLoading(true);
    const timer = setTimeout(() => {
      const filtered = filterCourses(sampleCourses);
      setRecommendations(filtered.slice(0, limit));
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [filters, limit]);

  const filterCourses = (courses) => {
    return courses.filter(course => {
      // Level filter
      if (filters.level !== 'all' && course.level !== filters.level) {
        return false;
      }
      
      // Duration filter
      if (filters.duration !== 'all') {
        const hours = parseInt(course.duration);
        if (filters.duration === 'short' && hours > 20) return false;
        if (filters.duration === 'medium' && (hours <= 20 || hours > 40)) return false;
        if (filters.duration === 'long' && hours <= 40) return false;
      }
      
      // Category filter
      if (filters.category !== 'all' && course.category !== filters.category) {
        return false;
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by selected criteria
      switch (filters.sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'students':
          return b.students - a.students;
        case 'duration':
          return parseInt(a.duration) - parseInt(b.duration);
        case 'price':
          return a.price - b.price;
        default: // relevance
          return b.matchScore - a.matchScore;
      }
    });
  };

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = filterCourses(sampleCourses);
      setRecommendations(filtered.slice(0, limit));
      setLoading(false);
    }, 800);
  };

  const handleFeedback = (courseId, liked) => {
    setFeedback(prev => ({
      ...prev,
      [courseId]: liked
    }));
    
    if (onProvideFeedback) {
      onProvideFeedback(courseId, liked);
    }
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-500 bg-green-500/10';
    if (score >= 80) return 'text-blue-500 bg-blue-500/10';
    if (score >= 70) return 'text-yellow-500 bg-yellow-500/10';
    return 'text-gray-500 bg-gray-500/10';
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'beginner': return 'text-green-500 bg-green-500/10';
      case 'intermediate': return 'text-yellow-500 bg-yellow-500/10';
      case 'advanced': return 'text-red-500 bg-red-500/10';
      default: return 'text-blue-500 bg-blue-500/10';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'mobile-development', label: 'Mobile Development' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'design', label: 'UI/UX Design' },
    { id: 'devops', label: 'DevOps' }
  ];

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' }
  ];

  const durations = [
    { id: 'all', label: 'Any Duration' },
    { id: 'short', label: 'Short (< 20h)' },
    { id: 'medium', label: 'Medium (20-40h)' },
    { id: 'long', label: 'Long (> 40h)' }
  ];

  const sortOptions = [
    { id: 'relevance', label: 'Most Relevant', icon: <Target className="w-4 h-4" /> },
    { id: 'rating', label: 'Highest Rated', icon: <Star className="w-4 h-4" /> },
    { id: 'students', label: 'Most Popular', icon: <Users className="w-4 h-4" /> },
    { id: 'duration', label: 'Shortest First', icon: <Clock className="w-4 h-4" /> },
    { id: 'price', label: 'Lowest Price', icon: <Award className="w-4 h-4" /> }
  ];

  return (
    <div className={`
      rounded-xl border
      ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
    `}>
      {/* Header */}
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Personalized Recommendations</h2>
              <p className="text-gray-500">
                Based on your skills: {sampleProfile.skills.join(', ')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="p-2 hover:bg-gray-700/50 rounded-lg disabled:opacity-50"
              aria-label="Refresh recommendations"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
            </button>
            
            <button className="p-2 hover:bg-gray-700/50 rounded-lg">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* User Profile Summary */}
        <div className={`
          p-4 rounded-lg mb-6
          ${theme === 'dark' ? 'bg-gray-700/30 border border-gray-600' : 'bg-blue-50 border border-blue-100'}
        `}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm text-gray-500 mb-1">Learning Goals</div>
              <div className="font-medium">{sampleProfile.goals[0]}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Time Commitment</div>
              <div className="font-medium">{sampleProfile.timeCommitment}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 mb-1">Experience Level</div>
              <div className={`px-3 py-1 rounded-full inline-block capitalize ${getLevelColor(sampleProfile.experienceLevel)}`}>
                {sampleProfile.experienceLevel}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center gap-2">
                {['grid', 'list', 'detailed'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-2 rounded-lg capitalize ${viewMode === mode ? 'bg-blue-500 text-white' : 'hover:bg-gray-700/50'}`}
                    aria-label={`${mode} view`}
                  >
                    {mode === 'grid' ? '▦' : mode === 'list' ? '≡' : '☰'}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={filters.level}
                  onChange={(e) => setFilters(prev => ({ ...prev, level: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
                >
                  {levels.map(level => (
                    <option key={level.id} value={level.id}>{level.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={filters.duration}
                  onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
                >
                  {durations.map(duration => (
                    <option key={duration.id} value={duration.id}>{duration.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
                >
                  {sortOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommendations */}
      <div className="p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-4"></div>
            <div className="text-gray-500">Finding the best courses for you...</div>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-12">
            <Brain className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-bold mb-2">No recommendations found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your filters</p>
            <button
              onClick={() => setFilters({ level: 'all', duration: 'all', category: 'all', sortBy: 'relevance' })}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
            {recommendations.map((course) => {
              const isExpanded = expandedCourse === course.id;
              const userFeedback = feedback[course.id];

              return (
                <div
                  key={course.id}
                  className={`
                    rounded-xl border transition-all duration-300 overflow-hidden
                    ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}
                    ${viewMode === 'detailed' || isExpanded ? 'col-span-full' : ''}
                    hover:shadow-xl hover:-translate-y-1
                  `}
                >
                  {/* Course Header */}
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => setExpandedCourse(isExpanded ? null : course.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      {/* Match Score */}
                      <div className="flex-shrink-0">
                        <div className={`
                          w-16 h-16 rounded-xl flex flex-col items-center justify-center
                          ${getMatchColor(course.matchScore)}
                          border-2 ${course.matchScore >= 90 ? 'border-green-500' : 
                            course.matchScore >= 80 ? 'border-blue-500' : 
                            course.matchScore >= 70 ? 'border-yellow-500' : 'border-gray-500'}
                        `}>
                          <div className="text-2xl font-bold">{course.matchScore}</div>
                          <div className="text-xs">match</div>
                        </div>
                      </div>
                      
                      {/* Course Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="text-xl font-bold truncate">{course.title}</h3>
                          <div className="text-right">
                            <div className="text-2xl font-bold">${course.price}</div>
                            {course.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                ${course.originalPrice}
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-500 mb-4 line-clamp-2">
                          {course.description}
                        </p>
                        
                        {/* Course Stats */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className={`px-3 py-1 rounded-full ${getLevelColor(course.level)}`}>
                            {course.level}
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{course.rating}/5</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{formatNumber(course.students)}</span>
                          </div>
                          
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span>{course.instructor}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Match Reason */}
                    <div className={`
                      mt-4 p-3 rounded-lg
                      ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-blue-50'}
                    `}>
                      <div className="flex items-center gap-2 text-sm">
                        <Zap className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">Why we recommend this:</span>
                        <span className="text-gray-500">{course.reason}</span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {(viewMode === 'detailed' || isExpanded) && (
                    <div className="px-6 pb-6 border-t dark:border-gray-700">
                      {/* Skills */}
                      <div className="mt-6">
                        <h4 className="font-bold mb-3 flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          Skills Covered
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {course.skills.map((skill, index) => (
                            <div
                              key={index}
                              className={`
                                px-3 py-2 rounded-lg border
                                ${sampleProfile.skills.includes(skill)
                                  ? 'bg-green-500/10 border-green-500/20 text-green-500'
                                  : theme === 'dark'
                                    ? 'bg-gray-700/50 border-gray-600'
                                    : 'bg-gray-100 border-gray-200'
                                }
                              `}
                            >
                              {skill}
                              {sampleProfile.skills.includes(skill) && (
                                <CheckCircle className="inline-block w-4 h-4 ml-2" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleFeedback(course.id, true)}
                            className={`p-2 rounded-lg ${userFeedback === true ? 'text-green-500 bg-green-500/10' : 'hover:bg-gray-700/50'}`}
                            aria-label="Like recommendation"
                          >
                            <ThumbsUp className="w-5 h-5" />
                          </button>
                          
                          <button
                            onClick={() => handleFeedback(course.id, false)}
                            className={`p-2 rounded-lg ${userFeedback === false ? 'text-red-500 bg-red-500/10' : 'hover:bg-gray-700/50'}`}
                            aria-label="Dislike recommendation"
                          >
                            <ThumbsDown className="w-5 h-5" />
                          </button>
                          
                          <button
                            onClick={() => onSaveRecommendation && onSaveRecommendation(course.id)}
                            className="p-2 rounded-lg hover:bg-gray-700/50"
                            aria-label="Save recommendation"
                          >
                            <Heart className="w-5 h-5" />
                          </button>
                          
                          <button
                            onClick={() => onSelectCourse && onSelectCourse(course.id)}
                            className="p-2 rounded-lg hover:bg-gray-700/50"
                            aria-label="View course"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onSelectCourse && onSelectCourse(course.id)}
                          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium flex items-center gap-2"
                        >
                          <span>View Course</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Quick Actions */}
                  {viewMode !== 'detailed' && !isExpanded && (
                    <div className="p-6 border-t dark:border-gray-700">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleFeedback(course.id, true)}
                            className={`p-2 rounded-lg ${userFeedback === true ? 'text-green-500 bg-green-500/10' : 'hover:bg-gray-700/50'}`}
                            aria-label="Like"
                          >
                            <ThumbsUp className="w-5 h-5" />
                          </button>
                          
                          <button
                            onClick={() => handleFeedback(course.id, false)}
                            className={`p-2 rounded-lg ${userFeedback === false ? 'text-red-500 bg-red-500/10' : 'hover:bg-gray-700/50'}`}
                            aria-label="Dislike"
                          >
                            <ThumbsDown className="w-5 h-5" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => onSelectCourse && onSelectCourse(course.id)}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
                        >
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        {recommendations.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-gray-500 mb-4">
              These recommendations are personalized based on your profile and learning history.
            </p>
            <button
              onClick={handleRefresh}
              className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Show More Recommendations</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecommendationEngine;
