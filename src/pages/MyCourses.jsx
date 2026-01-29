import React, { useState, useContext, useEffect } from 'react';
import { 
  BookOpen, Clock, TrendingUp, Award, Calendar, 
  Play, MoreVertical, Filter, Search, Grid, List,
  CheckCircle, Star, Users, Target, BarChart3
} from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { useLearning } from '../context/LearningContext';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const { theme } = useContext(ThemeContext);
  const { getCourseProgress, getStudyStats } = useLearning();
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [searchQuery, setSearchQuery] = useState('');

  // Mock enrolled courses data
  const [enrolledCourses, setEnrolledCourses] = useState([
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      category: 'Web Development',
      progress: 75,
      lastAccessed: '2 hours ago',
      totalLessons: 24,
      completedLessons: 18,
      duration: '12h 45m',
      difficulty: 'Intermediate',
      rating: 4.8,
      enrolledDate: '2024-01-15',
      nextLesson: 'Performance Optimization',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h-225&fit=crop'
    },
    {
      id: 2,
      title: 'Node.js Backend Mastery',
      instructor: 'Michael Chen',
      category: 'Backend',
      progress: 30,
      lastAccessed: '1 day ago',
      totalLessons: 18,
      completedLessons: 6,
      duration: '10h 30m',
      difficulty: 'Advanced',
      rating: 4.9,
      enrolledDate: '2024-01-20',
      nextLesson: 'Authentication & Authorization',
      thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop'
    },
    {
      id: 3,
      title: 'UI/UX Design Fundamentals',
      instructor: 'Emma Wilson',
      category: 'Design',
      progress: 10,
      lastAccessed: '3 days ago',
      totalLessons: 16,
      completedLessons: 2,
      duration: '8h 15m',
      difficulty: 'Beginner',
      rating: 4.7,
      enrolledDate: '2024-01-25',
      nextLesson: 'Design Systems',
      thumbnail: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=225&fit=crop'
    },
    {
      id: 4,
      title: 'Data Science with Python',
      instructor: 'David Kim',
      category: 'Data Science',
      progress: 100,
      lastAccessed: '1 week ago',
      totalLessons: 32,
      completedLessons: 32,
      duration: '20h 00m',
      difficulty: 'Intermediate',
      rating: 4.6,
      enrolledDate: '2023-12-10',
      nextLesson: null,
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop'
    },
    {
      id: 5,
      title: 'Mobile App Development',
      instructor: 'Alex Rodriguez',
      category: 'Mobile',
      progress: 50,
      lastAccessed: 'Yesterday',
      totalLessons: 20,
      completedLessons: 10,
      duration: '15h 30m',
      difficulty: 'Intermediate',
      rating: 4.5,
      enrolledDate: '2024-01-10',
      nextLesson: 'State Management',
      thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=225&fit=crop'
    },
    {
      id: 6,
      title: 'DevOps & CI/CD',
      instructor: 'Jennifer Lee',
      category: 'DevOps',
      progress: 0,
      lastAccessed: 'Not yet started',
      totalLessons: 14,
      completedLessons: 0,
      duration: '9h 45m',
      difficulty: 'Advanced',
      rating: 4.9,
      enrolledDate: '2024-02-01',
      nextLesson: 'Introduction to DevOps',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop'
    },
  ]);

  const stats = getStudyStats();
  const filteredCourses = enrolledCourses.filter(course => {
    // Filter by status
    if (filter === 'active' && course.progress === 100) return false;
    if (filter === 'completed' && course.progress < 100) return false;
    if (filter === 'not-started' && course.progress > 0) return false;
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        course.title.toLowerCase().includes(query) ||
        course.instructor.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query)
      );
    }
    
    return true;
  });

  const getProgressColor = (progress) => {
    if (progress === 100) return 'bg-green-500';
    if (progress >= 50) return 'bg-blue-500';
    if (progress > 0) return 'bg-yellow-500';
    return 'bg-gray-300 dark:bg-gray-600';
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'intermediate': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'advanced': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}>
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                <span className={theme === 'dark' ? 'text-white' : 'text-gray-900'}>My Learning</span>
              </h1>
              <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>
                Continue your learning journey
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 pr-4 py-2 rounded-lg w-full md:w-64 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-900 border-gray-300'} border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
              
              {/* View Toggle */}
              <div className={`flex rounded-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? (theme === 'dark' ? 'bg-gray-600' : 'bg-white') : ''}`}
                >
                  <Grid size={20} className={viewMode === 'grid' ? 'text-blue-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? (theme === 'dark' ? 'bg-gray-600' : 'bg-white') : ''}`}
                >
                  <List size={20} className={viewMode === 'list' ? 'text-blue-500' : theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className={`rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Enrolled Courses</p>
                <p className="text-3xl font-bold mt-2">{enrolledCourses.length}</p>
              </div>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-blue-900/30' : 'bg-blue-100'}`}>
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>+2 this month</span>
            </div>
          </div>
          
          <div className={`rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Study Time</p>
                <p className="text-3xl font-bold mt-2">{Math.floor(stats.studyTime / 60)}h</p>
              </div>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-green-900/30' : 'bg-green-100'}`}>
                <Clock className="w-6 h-6 text-green-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                <div className="h-full bg-green-500 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
          </div>
          
          <div className={`rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Learning Streak</p>
                <p className="text-3xl font-bold mt-2">{stats.streak} days</p>
              </div>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-yellow-900/30' : 'bg-yellow-100'}`}>
                <Award className="w-6 h-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <Calendar className="w-4 h-4 text-yellow-500 mr-2" />
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Keep it up!</span>
            </div>
          </div>
          
          <div className={`rounded-xl shadow-lg p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Completion Rate</p>
                <p className="text-3xl font-bold mt-2">{Math.round(stats.completionRate)}%</p>
              </div>
              <div className={`p-3 rounded-lg ${theme === 'dark' ? 'bg-purple-900/30' : 'bg-purple-100'}`}>
                <Target className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <BarChart3 className="w-4 h-4 text-purple-500 mr-1" />
              <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                {stats.completedLessons}/{stats.totalLessons} lessons
              </span>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className={`rounded-xl shadow-lg p-4 mb-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <Filter className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
              <div className="flex space-x-2">
                {['all', 'active', 'completed', 'not-started'].map((filterType) => (
                  <button
                    key={filterType}
                    onClick={() => setFilter(filterType)}
                    className={`px-4 py-2 rounded-lg capitalize ${filter === filterType 
                      ? 'bg-blue-600 text-white' 
                      : theme === 'dark' 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    {filterType.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-sm">
              <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Showing {filteredCourses.length} of {enrolledCourses.length} courses
              </span>
            </div>
          </div>
        </div>

        {/* Courses Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
              >
                {/* Course Thumbnail */}
                <div className="relative h-48">
                  <div 
                    className="w-full h-full bg-cover bg-center"
                    style={{ backgroundImage: `url(${course.thumbnail})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <button className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-800/80 hover:bg-gray-700/80' : 'bg-white/80 hover:bg-white'}`}>
                      <MoreVertical size={20} className={theme === 'dark' ? 'text-white' : 'text-gray-800'} />
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
                        {course.difficulty}
                      </span>
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 fill-current mr-1" />
                        <span className="text-white text-sm font-medium">{course.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className={`font-bold text-lg mb-1 line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {course.title}
                      </h3>
                      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {course.instructor}
                      </p>
                    </div>
                    {course.progress === 100 && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        Progress: {course.progress}%
                      </span>
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                        {course.completedLessons}/{course.totalLessons} lessons
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${getProgressColor(course.progress)}`}
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Clock size={14} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{course.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Users size={14} className={`mr-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{course.category}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-700 dark:border-gray-700">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                          Last accessed
                        </div>
                        <div className={`text-sm font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {course.lastAccessed}
                        </div>
                      </div>
                      <Link to={`/course/${course.id}/learn`}>
                        <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg transition-all duration-200 hover:shadow-lg">
                          <Play size={16} />
                          <span>{course.progress === 0 ? 'Start' : 'Continue'}</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className={`rounded-xl shadow-lg overflow-hidden ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={theme === 'dark' ? 'bg-gray-700' : 'bg-gray-50'}>
                  <tr>
                    <th className="py-4 px-6 text-left">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Course</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Progress</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Duration</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Last Accessed</span>
                    </th>
                    <th className="py-4 px-6 text-left">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.map((course) => (
                    <tr 
                      key={course.id} 
                      className={`border-t ${theme === 'dark' ? 'border-gray-700 hover:bg-gray-700/50' : 'border-gray-100 hover:bg-gray-50'}`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-12 h-12 rounded-lg bg-gray-200 dark:bg-gray-700 mr-4 flex-shrink-0"></div>
                          <div>
                            <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                              {course.title}
                            </div>
                            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {course.instructor} • {course.category}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="w-48">
                          <div className="flex justify-between text-sm mb-1">
                            <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                              {course.progress}%
                            </span>
                            <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                              {course.completedLessons}/{course.totalLessons}
                            </span>
                          </div>
                          <div className={`h-2 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <div 
                              className={`h-full rounded-full ${getProgressColor(course.progress)}`}
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <Clock size={16} className={`mr-2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} />
                          <span className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                            {course.duration}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                          {course.lastAccessed}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <Link to={`/course/${course.id}/learn`}>
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg text-sm transition-all duration-200 hover:shadow-lg">
                              {course.progress === 0 ? 'Start' : 'Continue'}
                            </button>
                          </Link>
                          <button className={`p-2 rounded-lg ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
                            <MoreVertical size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className={`rounded-xl shadow-lg p-12 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
            <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              No courses found
            </h3>
            <p className={`mb-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {searchQuery 
                ? 'Try adjusting your search or filter'
                : 'You have no courses matching the current filter'}
            </p>
            <button
              onClick={() => {
                setFilter('all');
                setSearchQuery('');
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-all duration-200 hover:shadow-lg"
            >
              View All Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
