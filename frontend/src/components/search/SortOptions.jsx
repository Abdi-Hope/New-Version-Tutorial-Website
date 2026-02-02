import React, { useState } from 'react';
import {
  Filter, ArrowUpDown, TrendingUp, Star, Clock,
  DollarSign, Users, Zap, ChevronDown, Check
} from 'lucide-react';

const SortOptions = ({ 
  sortBy = 'popular', 
  onSortChange,
  showFilters = false,
  onToggleFilters,
  resultCount = 245,
  viewMode = 'grid',
  onViewModeChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    {
      id: 'popular',
      label: 'Most Popular',
      icon: TrendingUp,
      description: 'Sorted by number of enrollments'
    },
    {
      id: 'rating',
      label: 'Highest Rated',
      icon: Star,
      description: 'Sorted by average rating'
    },
    {
      id: 'newest',
      label: 'Newest',
      icon: Clock,
      description: 'Sorted by release date'
    },
    {
      id: 'price-low',
      label: 'Price: Low to High',
      icon: DollarSign,
      description: 'Sorted by price ascending'
    },
    {
      id: 'price-high',
      label: 'Price: High to Low',
      icon: DollarSign,
      description: 'Sorted by price descending'
    },
    {
      id: 'trending',
      label: 'Trending Now',
      icon: Zap,
      description: 'Sorted by recent popularity'
    },
    {
      id: 'students',
      label: 'Most Students',
      icon: Users,
      description: 'Sorted by total enrollments'
    }
  ];

  const selectedSort = sortOptions.find(option => option.id === sortBy) || sortOptions[0];

  const handleSortSelect = (optionId) => {
    setIsOpen(false);
    if (onSortChange) {
      onSortChange(optionId);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Left Section - Results Count */}
        <div className="flex items-center space-x-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{resultCount}</span> results
            </p>
          </div>
          
          {/* View Mode Toggle */}
          <div className="hidden md:flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">View:</span>
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => onViewModeChange && onViewModeChange('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                title="Grid view"
              >
                <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`rounded-sm ${viewMode === 'grid' ? 'bg-blue-600' : 'bg-gray-400 dark:bg-gray-300'}`}></div>
                  ))}
                </div>
              </button>
              <button
                onClick={() => onViewModeChange && onViewModeChange('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
                title="List view"
              >
                <div className="w-4 h-4 flex flex-col space-y-1">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className={`h-1 rounded ${viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-400 dark:bg-gray-300'}`}></div>
                  ))}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Sort & Filter */}
        <div className="flex items-center space-x-3">
          {/* Filter Button */}
          {showFilters && onToggleFilters && (
            <button
              onClick={onToggleFilters}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          )}

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg min-w-[180px] justify-between"
            >
              <div className="flex items-center space-x-2">
                <ArrowUpDown className="w-4 h-4" />
                <span>Sort: {selectedSort.label}</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden">
                <div className="p-3 border-b dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Sort By</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {selectedSort.description}
                  </p>
                </div>
                
                <div className="max-h-80 overflow-y-auto">
                  {sortOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = option.id === sortBy;
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => handleSortSelect(option.id)}
                        className={`w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${
                          isSelected ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`p-2 rounded-lg ${
                            isSelected
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className={`font-medium ${
                              isSelected
                                ? 'text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300'
                            }`}>
                              {option.label}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {option.description}
                            </p>
                          </div>
                        </div>
                        
                        {isSelected && (
                          <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Sort Chips */}
      <div className="mt-4 pt-4 border-t dark:border-gray-700">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Quick sort:
          </span>
          <div className="flex space-x-2">
            {sortOptions.slice(0, 4).map((option) => {
              const Icon = option.icon;
              const isSelected = option.id === sortBy;
              
              return (
                <button
                  key={option.id}
                  onClick={() => handleSortSelect(option.id)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                    isSelected
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
