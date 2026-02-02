import React, { useState } from 'react';
import {
  TrendingUp, Star, Clock, Users, BookOpen,
  Target, Zap, ChevronRight, Bookmark, Play,
  Award, CheckCircle, Heart, Share2
} from 'lucide-react';

const Recommendations = ({ 
  userId = null,
  basedOn = 'popular',
  limit = 6
}) => {
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [bookmarkedCourses, setBookmarkedCourses] = useState([2, 4]);

  const recommendations = [
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Alex Johnson',
      category: 'Web Development',
      level: 'Advanced',
      rating: 4.9,
      students: 12450,
      duration: '12 hours',
      price: '$89.99',
      originalPrice: '$129.99',
      discount: 30,
      thumbnail: '⚛️',
      tags: ['React', 'Hooks', 'Patterns'],
      isNew: true,
      isHot: true,
      progress: null // null if not started, 0-100 if in progress
    },
    {
      id: 2,
      title: 'Python for Data Science',
      instructor: 'Sarah Wilson',
      category: 'Data Science',
      level: 'Intermediate',
      rating: 4.8,
      students: 8920,
      duration: '18 hours',
      price: '$99.99',
      originalPrice: '$149.99',
      discount: 33,
      thumbnail: '🐍',
      tags: ['Python', 'Data', 'ML'],
      isNew: false,
      isHot: true,
      progress: 45
    },
    {
      id: 3,
      title: 'Complete JavaScript Course',
      instructor: 'Mike Chen',
      category: 'Web Development',
      level: 'Beginner',
      rating: 4.7,
      students: 15680,
      duration: '24 hours',
      price: '$79.99',
      originalPrice: '$119.99',
      discount: 33,
      thumbnail: '📜',
      tags: ['JavaScript', 'ES6+', 'Fundamentals'],
      isNew: false,
      isHot: false,
      progress: null
    },
    {
      id: 4,
      title: 'Mobile App Development with Flutter',
      instructor: 'Lisa Rodriguez',
      category: 'Mobile',
      level: 'Intermediate',
      rating: 4.6,
      students: 7450,
      duration: '15 hours',
      price: '$89.99',
      originalPrice: '$129.99',
      discount: 30,
      thumbnail: '📱',
      tags: ['Flutter', 'Dart', 'Mobile'],
      isNew: true,
      isHot: false,
      progress: 20
    },
    {
      id: 5,
      title: 'Machine Learning Fundamentals',
      instructor: 'David Kim',
      category: 'AI/ML',
      level: 'Intermediate',
      rating: 4.9,
      students: 10320,
      duration: '20 hours',
      price: '$119.99',
      originalPrice: '$179.99',
      discount: 33,
      thumbnail: '🤖',
      tags: ['ML', 'Python', 'TensorFlow'],
      isNew: false,
      isHot: true,
      progress: null
    },
    {
      id: 6,
      title: 'UI/UX Design Masterclass',
      instructor: 'Emma Wilson',
      category: 'Design',
      level: 'Advanced',
      rating: 4.8,
      students: 5670,
      duration: '16 hours',
      price: '$94.99',
      originalPrice: '$139.99',
      discount: 32,
      thumbnail: '🎨',
      tags: ['UI', 'UX', 'Figma'],
      isNew: false,
      isHot: false,
      progress: 80
    }
  ];

  const recommendationTypes = [
    { id: 'popular', name: 'Most Popular', icon: TrendingUp },
    { id: 'trending', name: 'Trending Now', icon: Zap },
    { id: 'rated', name: 'Highest Rated', icon: Star },
    { id: 'new', name: 'New Releases', icon: Clock },
    { id: 'personalized', name: 'For You', icon: Target }
  ];

  const stats = {
    totalCourses: 856,
    averageRating: 4.7,
    totalStudents: '250K+',
    completionRate: '89%'
  };

  const toggleBookmark = (courseId) => {
    setBookmarkedCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleCourseClick = (courseId) => {
    console.log('Course clicked:', courseId);
    // In a real app, navigate to course detail page
  };

  const RecommendationCard = ({ course }) => {
    const isBookmarked = bookmarkedCourses.includes(course.id);
    const isInProgress = course.progress !== null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 group">
        {/* Thumbnail & Badges */}
        <div className="relative">
          <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <div className="text-6xl">{course.thumbnail}</div>
          </div>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col space-y-2">
            {course.isNew && (
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                NEW
              </span>
            )}
            {course.isHot && (
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                HOT
              </span>
            )}
            {course.discount && (
              <span className="px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full">
                -{course.discount}%
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => toggleBookmark(course.id)}
              className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-600'}`} />
            </button>
            <button className="p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          {/* Progress Bar */}
          {isInProgress && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
              <div className="flex items-center justify-between text-white text-xs mb-1">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-1 bg-gray-600 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Course Info */}
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                {course.category}
              </span>
              <span className="ml-2 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded">
                {course.level}
              </span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="font-bold text-gray-900 dark:text-white">
                {course.rating}
              </span>
            </div>
          </div>
          
          <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {course.title}
          </h3>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            By {course.instructor}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.tags.map(tag => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Stats */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
            <span className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{course.duration}</span>
            </span>
            <span className="flex items-center space-x-1">
              <Users className="w-4 h-4" />
              <span>{course.students.toLocaleString()}</span>
            </span>
          </div>
          
          {/* Price & Action */}
          <div className="flex items-center justify-between">
            <div>
              {course.originalPrice && (
                <span className="text-sm text-gray-400 dark:text-gray-500 line-through mr-2">
                  {course.originalPrice}
                </span>
              )}
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {course.price}
              </span>
            </div>
            
            <button
              onClick={() => handleCourseClick(course.id)}
              className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
                isInProgress
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInProgress ? (
                <>
                  <Play className="w-4 h-4" />
                  <span>Continue</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-4 h-4" />
                  <span>Enroll</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const RecommendationList = ({ course }) => {
    const isBookmarked = bookmarkedCourses.includes(course.id);
    const isInProgress = course.progress !== null;

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow group">
        <div className="flex items-start space-x-6">
          {/* Thumbnail */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <div className="text-4xl">{course.thumbnail}</div>
            </div>
            
            {course.isNew && (
              <span className="absolute -top-2 -left-2 px-2 py-1 bg-green-500 text-white text-xs font-bold rounded">
                NEW
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  By {course.instructor} • {course.category} • {course.level}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => toggleBookmark(course.id)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} />
                </button>
                
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {course.rating}
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              Master {course.tags.join(', ')} with this comprehensive course designed for {course.level.toLowerCase()} learners.
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students.toLocaleString()} students</span>
                </span>
                <div className="flex items-center space-x-2">
                  {course.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  {course.originalPrice && (
                    <p className="text-sm text-gray-400 dark:text-gray-500 line-through">
                      {course.originalPrice}
                    </p>
                  )}
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    {course.price}
                  </p>
                </div>
                
                <button
                  onClick={() => handleCourseClick(course.id)}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    isInProgress
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {isInProgress ? 'Continue' : 'Enroll Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recommended For You
            </h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            Based on your interests and learning history
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
            >
              <div className="w-5 h-5 grid grid-cols-2 gap-1">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-600 dark:bg-gray-300 rounded"></div>
                ))}
              </div>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
            >
              <div className="w-5 h-5 flex flex-col space-y-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-1 bg-gray-600 dark:bg-gray-300 rounded"></div>
                ))}
              </div>
            </button>
          </div>
          
          <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium flex items-center">
            View All
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>

      {/* Recommendation Types */}
      <div className="mb-8">
        <div className="flex space-x-2 overflow-x-auto pb-4">
          {recommendationTypes.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-medium whitespace-nowrap ${
                  basedOn === type.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Courses</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalCourses}
              </p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Rating</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.averageRating}
              </p>
            </div>
            <Star className="w-8 h-8 text-yellow-500 fill-current" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Students</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.totalStudents}
              </p>
            </div>
            <Users className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Completion</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.completionRate}
              </p>
            </div>
            <Award className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Courses */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.slice(0, limit).map(course => (
            <RecommendationCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {recommendations.slice(0, limit).map(course => (
            <RecommendationList key={course.id} course={course} />
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-8 border-t dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-yellow-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Personalized recommendations improve over time
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                The more you learn, the better our recommendations become
              </p>
            </div>
          </div>
          
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
            Explore More Courses
          </button>
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
