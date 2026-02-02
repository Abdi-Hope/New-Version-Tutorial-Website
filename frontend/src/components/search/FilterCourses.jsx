import React, { useState } from 'react';
import {
  Filter, X, Sliders, DollarSign, Clock, Star,
  Users, Award, TrendingUp, BookOpen, ChevronDown,
  CheckCircle, Circle, Minus, Plus
} from 'lucide-react';

const FilterCourses = ({ 
  filters = {}, 
  onFilterChange,
  onClose 
}) => {
  const [localFilters, setLocalFilters] = useState({
    categories: [],
    levels: [],
    priceRange: [0, 100],
    duration: 'any',
    rating: 0,
    language: 'english',
    features: [],
    sortBy: 'popular',
    ...filters
  });

  const categories = [
    { id: 'web-dev', name: 'Web Development', count: 245 },
    { id: 'data-science', name: 'Data Science', count: 189 },
    { id: 'mobile', name: 'Mobile Development', count: 156 },
    { id: 'design', name: 'UI/UX Design', count: 132 },
    { id: 'business', name: 'Business', count: 98 },
    { id: 'marketing', name: 'Digital Marketing', count: 87 },
    { id: 'ai-ml', name: 'AI & Machine Learning', count: 76 },
    { id: 'cybersecurity', name: 'Cybersecurity', count: 54 }
  ];

  const levels = [
    { id: 'beginner', name: 'Beginner', count: 423 },
    { id: 'intermediate', name: 'Intermediate', count: 312 },
    { id: 'advanced', name: 'Advanced', count: 198 }
  ];

  const features = [
    { id: 'certificate', name: 'Certificate', icon: Award },
    { id: 'subtitles', name: 'Subtitles', icon: BookOpen },
    { id: 'exercises', name: 'Exercises', icon: TrendingUp },
    { id: 'downloadable', name: 'Downloadable', icon: Download },
    { id: 'quizzes', name: 'Quizzes', icon: Star }
  ];

  const durations = [
    { id: 'any', name: 'Any Duration' },
    { id: 'short', name: 'Short (< 2 hours)', max: 2 },
    { id: 'medium', name: 'Medium (2-10 hours)', min: 2, max: 10 },
    { id: 'long', name: 'Long (> 10 hours)', min: 10 }
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular', icon: TrendingUp },
    { id: 'rating', name: 'Highest Rated', icon: Star },
    { id: 'newest', name: 'Newest', icon: Clock },
    { id: 'price-low', name: 'Price: Low to High', icon: DollarSign },
    { id: 'price-high', name: 'Price: High to Low', icon: DollarSign }
  ];

  const languages = [
    { id: 'english', name: 'English', count: 856 },
    { id: 'spanish', name: 'Spanish', count: 142 },
    { id: 'french', name: 'French', count: 98 },
    { id: 'german', name: 'German', count: 76 }
  ];

  const handleCategoryToggle = (categoryId) => {
    setLocalFilters(prev => {
      const newCategories = prev.categories.includes(categoryId)
        ? prev.categories.filter(id => id !== categoryId)
        : [...prev.categories, categoryId];
      return { ...prev, categories: newCategories };
    });
  };

  const handleLevelToggle = (levelId) => {
    setLocalFilters(prev => {
      const newLevels = prev.levels.includes(levelId)
        ? prev.levels.filter(id => id !== levelId)
        : [...prev.levels, levelId];
      return { ...prev, levels: newLevels };
    });
  };

  const handleFeatureToggle = (featureId) => {
    setLocalFilters(prev => {
      const newFeatures = prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId];
      return { ...prev, features: newFeatures };
    });
  };

  const handlePriceChange = (index, value) => {
    const newPriceRange = [...localFilters.priceRange];
    newPriceRange[index] = parseInt(value);
    
    // Ensure min <= max
    if (index === 0 && newPriceRange[0] > newPriceRange[1]) {
      newPriceRange[1] = newPriceRange[0];
    } else if (index === 1 && newPriceRange[1] < newPriceRange[0]) {
      newPriceRange[0] = newPriceRange[1];
    }
    
    setLocalFilters(prev => ({ ...prev, priceRange: newPriceRange }));
  };

  const handleRatingChange = (rating) => {
    setLocalFilters(prev => ({ ...prev, rating }));
  };

  const handleSortChange = (sortId) => {
    setLocalFilters(prev => ({ ...prev, sortBy: sortId }));
  };

  const handleDurationChange = (durationId) => {
    setLocalFilters(prev => ({ ...prev, duration: durationId }));
  };

  const handleLanguageChange = (languageId) => {
    setLocalFilters(prev => ({ ...prev, language: languageId }));
  };

  const handleApplyFilters = () => {
    if (onFilterChange) {
      onFilterChange(localFilters);
    }
    if (onClose) {
      onClose();
    }
  };

  const handleResetFilters = () => {
    const resetFilters = {
      categories: [],
      levels: [],
      priceRange: [0, 100],
      duration: 'any',
      rating: 0,
      language: 'english',
      features: [],
      sortBy: 'popular'
    };
    setLocalFilters(resetFilters);
    if (onFilterChange) {
      onFilterChange(resetFilters);
    }
  };

  const activeFilterCount = Object.entries(localFilters).reduce((count, [key, value]) => {
    if (key === 'priceRange') {
      return count + (value[0] > 0 || value[1] < 100 ? 1 : 0);
    }
    if (key === 'rating') {
      return count + (value > 0 ? 1 : 0);
    }
    if (Array.isArray(value)) {
      return count + (value.length > 0 ? 1 : 0);
    }
    if (key === 'duration' || key === 'language' || key === 'sortBy') {
      return count + (value !== 'any' && value !== 'english' && value !== 'popular' ? 1 : 0);
    }
    return count;
  }, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <Filter className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Filter Courses
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {activeFilterCount > 0 ? `${activeFilterCount} active filters` : 'No filters applied'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          {activeFilterCount > 0 && (
            <button
              onClick={handleResetFilters}
              className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Reset All
            </button>
          )}
          
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-gray-400" />
              Categories
            </h3>
            
            <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryToggle(category.id)}
                  className="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg group"
                >
                  <div className="flex items-center space-x-3">
                    {localFilters.categories.includes(category.id) ? (
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-400" />
                    )}
                    <span className="text-gray-700 dark:text-gray-300">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {category.count.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-gray-400" />
              Price Range
            </h3>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                  <span>${localFilters.priceRange[0]}</span>
                  <span>${localFilters.priceRange[1]}+</span>
                </div>
                <div className="relative h-2">
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div
                    className="absolute top-0 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    style={{
                      left: `${localFilters.priceRange[0]}%`,
                      right: `${100 - localFilters.priceRange[1]}%`
                    }}
                  ></div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={localFilters.priceRange[0]}
                    onChange={(e) => handlePriceChange(0, e.target.value)}
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={localFilters.priceRange[1]}
                    onChange={(e) => handlePriceChange(1, e.target.value)}
                    className="absolute top-0 w-full h-2 opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => handlePriceChange(0, 0)}
                  className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
                >
                  Free
                </button>
                <button
                  onClick={() => handlePriceChange(0, 0) && handlePriceChange(1, 50)}
                  className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
                >
                  Under $50
                </button>
                <button
                  onClick={() => handlePriceChange(0, 0) && handlePriceChange(1, 100)}
                  className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg"
                >
                  All Prices
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Features
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {features.map(feature => {
                const Icon = feature.icon;
                const isSelected = localFilters.features.includes(feature.id);
                
                return (
                  <button
                    key={feature.id}
                    onClick={() => handleFeatureToggle(feature.id)}
                    className={`p-3 rounded-lg border flex flex-col items-center justify-center space-y-2 transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${
                      isSelected
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-400'
                    }`} />
                    <span className={`text-sm font-medium ${
                      isSelected
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {feature.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Level */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Level
            </h3>
            
            <div className="grid grid-cols-3 gap-3">
              {levels.map(level => {
                const isSelected = localFilters.levels.includes(level.id);
                
                return (
                  <button
                    key={level.id}
                    onClick={() => handleLevelToggle(level.id)}
                    className={`p-4 rounded-lg border flex flex-col items-center justify-center space-y-2 ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isSelected
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                    }`}>
                      {level.name.charAt(0)}
                    </div>
                    <div className="text-center">
                      <span className={`font-medium ${
                        isSelected
                          ? 'text-blue-700 dark:text-blue-300'
                          : 'text-gray-600 dark:text-gray-300'
                      }`}>
                        {level.name}
                      </span>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {level.count} courses
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Rating */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Star className="w-5 h-5 mr-2 text-gray-400" />
              Minimum Rating
            </h3>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {[4.5, 4.0, 3.5, 3.0, 0].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleRatingChange(rating)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${
                        localFilters.rating === rating
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {rating > 0 ? `${rating}+` : 'Any'}
                    </button>
                  ))}
                </div>
                
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="font-bold text-gray-900 dark:text-white">
                    {localFilters.rating > 0 ? localFilters.rating.toFixed(1) : 'Any'}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-center space-x-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => handleRatingChange(star - 0.5)}
                    className={`p-1 ${
                      star <= localFilters.rating
                        ? 'text-yellow-500'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  >
                    <Star className={`w-6 h-6 ${
                      star <= localFilters.rating ? 'fill-current' : ''
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-gray-400" />
              Duration
            </h3>
            
            <div className="space-y-2">
              {durations.map(duration => (
                <button
                  key={duration.id}
                  onClick={() => handleDurationChange(duration.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                    localFilters.duration === duration.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <span className={`font-medium ${
                    localFilters.duration === duration.id
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {duration.name}
                  </span>
                  {localFilters.duration === duration.id && (
                    <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Language
            </h3>
            
            <div className="space-y-2">
              {languages.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => handleLanguageChange(lang.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg border ${
                    localFilters.language === lang.id
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className={`font-medium ${
                      localFilters.language === lang.id
                        ? 'text-blue-700 dark:text-blue-300'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {lang.name}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {lang.count.toLocaleString()} courses
                    </span>
                    {localFilters.language === lang.id && (
                      <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-8 border-t dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sliders className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {activeFilterCount} filters active
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 font-medium"
            >
              Clear All
            </button>
            
            <button
              onClick={handleApplyFilters}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCourses;
