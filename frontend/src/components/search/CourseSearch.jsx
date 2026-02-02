import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Filter, ChevronDown, Clock, Star, Users, BookOpen, TrendingUp } from 'lucide-react';

const CourseSearch = ({ courses = [], onSearch, onFilterChange, placeholder = "Search courses..." }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState(['React', 'JavaScript', 'Python', 'Web Development']);
  const [popularTags, setPopularTags] = useState(['Beginner', 'Advanced', 'Free', 'Popular', 'New']);
  const searchRef = useRef(null);

  // Sample course data if none provided
  const sampleCourses = courses.length > 0 ? courses : [
    { id: 1, title: 'Complete React Developer Course', instructor: 'Alex Johnson', category: 'Web Development', rating: 4.9, students: 12450 },
    { id: 2, title: 'Python for Data Science', instructor: 'Sarah Wilson', category: 'Data Science', rating: 4.8, students: 8920 },
    { id: 3, title: 'JavaScript Fundamentals', instructor: 'Mike Chen', category: 'Web Development', rating: 4.7, students: 15680 },
    { id: 4, title: 'Mobile App Development', instructor: 'Lisa Rodriguez', category: 'Mobile', rating: 4.6, students: 7450 },
    { id: 5, title: 'Machine Learning Basics', instructor: 'David Kim', category: 'AI/ML', rating: 4.9, students: 10320 },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setSuggestions([]);
      return;
    }

    const filtered = sampleCourses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 5);

    setSuggestions(filtered);
  }, [searchTerm, sampleCourses]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim() && !recentSearches.includes(term)) {
      setRecentSearches(prev => [term, ...prev.slice(0, 4)]);
    }
    if (onSearch) {
      onSearch(term);
    }
    setShowSuggestions(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    setSuggestions([]);
    if (onSearch) {
      onSearch('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleSearch(searchTerm);
    }
  };

  const handleSuggestionClick = (course) => {
    setSearchTerm(course.title);
    handleSearch(course.title);
  };

  const handleTagClick = (tag) => {
    setSearchTerm(tag);
    handleSearch(tag);
  };

  const handleRecentSearchClick = (search) => {
    setSearchTerm(search);
    handleSearch(search);
  };

  const removeRecentSearch = (searchToRemove, e) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(s => s !== searchToRemove));
  };

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyPress={handleKeyPress}
          onFocus={() => setShowSuggestions(true)}
          placeholder={placeholder}
          className="w-full pl-12 pr-12 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 dark:focus:border-blue-500 transition-colors text-lg"
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute right-12 top-1/2 transform -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        )}
        
        <button
          onClick={() => handleSearch(searchTerm)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Search
        </button>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
          {/* Recent Searches */}
          {searchTerm === '' && recentSearches.length > 0 && (
            <div className="p-4 border-b dark:border-gray-700">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Recent Searches
                </h3>
                <button
                  onClick={() => setRecentSearches([])}
                  className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="group relative px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {search}
                    <button
                      onClick={(e) => removeRecentSearch(search, e)}
                      className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 p-1 bg-gray-300 dark:bg-gray-600 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Tags */}
          {searchTerm === '' && (
            <div className="p-4 border-b dark:border-gray-700">
              <h3 className="font-medium text-gray-900 dark:text-white flex items-center mb-3">
                <TrendingUp className="w-4 h-4 mr-2" />
                Popular Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, index) => (
                  <button
                    key={index}
                    onClick={() => handleTagClick(tag)}
                    className="px-3 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50 rounded-lg text-sm font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Suggestions */}
          {suggestions.length > 0 && (
            <div className="p-2">
              <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Courses ({suggestions.length})
              </div>
              {suggestions.map((course) => (
                <button
                  key={course.id}
                  onClick={() => handleSuggestionClick(course)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg transition-colors group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                      {course.title.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {course.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {course.instructor} • {course.category}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-yellow-600 dark:text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No Results */}
          {searchTerm && suggestions.length === 0 && (
            <div className="p-8 text-center">
              <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                No courses found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try different keywords or browse popular categories
              </p>
            </div>
          )}

          {/* Quick Filters */}
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 border-t dark:border-gray-700">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Quick filters:
              </span>
              <div className="flex items-center space-x-2">
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Free Courses
                </button>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Best Rated
                </button>
                <span className="text-gray-300 dark:text-gray-600">•</span>
                <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                  Newest
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Advanced Search Toggle */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onFilterChange && onFilterChange({ showAdvanced: true })}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <Filter className="w-4 h-4" />
            <span>Advanced Filters</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {sampleCourses.length.toLocaleString()} courses available
          </span>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <BookOpen className="w-4 h-4" />
          <span>Browse by:</span>
          <button className="hover:text-gray-700 dark:hover:text-gray-300">Category</button>
          <span>•</span>
          <button className="hover:text-gray-700 dark:hover:text-gray-300">Level</button>
          <span>•</span>
          <button className="hover:text-gray-700 dark:hover:text-gray-300">Duration</button>
        </div>
      </div>
    </div>
  );
};

export default CourseSearch;
