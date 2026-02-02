import React, { useState } from 'react';
import { 
  Target, Filter, Search, TrendingUp, Users,
  Clock, Award, Zap, Star, ChevronRight,
  CheckCircle, BookOpen, Briefcase, Code,
  Palette, BarChart, Smartphone, Cloud,
  Heart, Share2, Download, Maximize2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const PathSelector = ({
  paths = [],
  selectedPathId,
  onSelectPath,
  onCompare,
  onSave,
  onShare,
  filters = {}
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    level: filters.level || 'all',
    duration: filters.duration || 'all',
    category: filters.category || 'all',
    sortBy: filters.sortBy || 'popularity'
  });
  const [expandedPath, setExpandedPath] = useState(null);
  const [compareMode, setCompareMode] = useState(false);
  const [comparePaths, setComparePaths] = useState([]);
  const { theme } = useTheme();

  // Sample learning paths
  const samplePaths = paths.length > 0 ? paths : [
    {
      id: 'path-1',
      title: 'Full-Stack Web Developer',
      description: 'Become a professional web developer with frontend and backend skills',
      duration: '6 months',
      level: 'Beginner to Advanced',
      courses: 12,
      hours: 240,
      students: '15,234',
      rating: 4.8,
      price: 299,
      originalPrice: 499,
      category: 'web-development',
      skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'MongoDB'],
      outcomes: ['Build full-stack apps', 'Deploy to production', 'Work in teams'],
      instructor: 'Sarah Johnson',
      popular: true,
      new: false,
      bestValue: true
    },
    {
      id: 'path-2',
      title: 'Data Science & Machine Learning',
      description: 'Master data analysis, visualization, and machine learning algorithms',
      duration: '8 months',
      level: 'Intermediate to Advanced',
      courses: 15,
      hours: 320,
      students: '8,567',
      rating: 4.9,
      price: 399,
      originalPrice: 699,
      category: 'data-science',
      skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow'],
      outcomes: ['Build ML models', 'Analyze big data', 'Create data visualizations'],
      instructor: 'Michael Chen',
      popular: true,
      new: true,
      bestValue: false
    },
    {
      id: 'path-3',
      title: 'Mobile App Development',
      description: 'Build native and cross-platform mobile applications',
      duration: '5 months',
      level: 'Beginner to Intermediate',
      courses: 10,
      hours: 200,
      students: '12,891',
      rating: 4.7,
      price: 249,
      originalPrice: 399,
      category: 'mobile',
      skills: ['React Native', 'Flutter', 'iOS', 'Android', 'Firebase'],
      outcomes: ['Build mobile apps', 'Publish to app stores', 'Monetize apps'],
      instructor: 'Emma Wilson',
      popular: false,
      new: false,
      bestValue: true
    },
    {
      id: 'path-4',
      title: 'UI/UX Design Mastery',
      description: 'Learn user-centered design principles and prototyping tools',
      duration: '4 months',
      level: 'Beginner to Advanced',
      courses: 8,
      hours: 160,
      students: '9,456',
      rating: 4.6,
      price: 199,
      originalPrice: 349,
      category: 'design',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'Design Systems'],
      outcomes: ['Design digital products', 'Conduct user research', 'Create design systems'],
      instructor: 'Alex Rivera',
      popular: true,
      new: false,
      bestValue: false
    },
    {
      id: 'path-5',
      title: 'DevOps & Cloud Engineering',
      description: 'Master infrastructure, deployment, and cloud technologies',
      duration: '7 months',
      level: 'Intermediate to Advanced',
      courses: 14,
      hours: 280,
      students: '6,789',
      rating: 4.8,
      price: 349,
      originalPrice: 599,
      category: 'devops',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Terraform'],
      outcomes: ['Deploy scalable apps', 'Manage cloud infrastructure', 'Automate workflows'],
      instructor: 'David Kim',
      popular: false,
      new: true,
      bestValue: true
    },
    {
      id: 'path-6',
      title: 'Cybersecurity Specialist',
      description: 'Learn to protect systems and networks from cyber threats',
      duration: '9 months',
      level: 'Intermediate to Expert',
      courses: 18,
      hours: 360,
      students: '4,321',
      rating: 4.9,
      price: 449,
      originalPrice: 799,
      category: 'security',
      skills: ['Network Security', 'Ethical Hacking', 'Cryptography', 'Risk Assessment'],
      outcomes: ['Secure networks', 'Conduct penetration tests', 'Implement security policies'],
      instructor: 'James Wilson',
      popular: true,
      new: false,
      bestValue: false
    }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: <Target className="w-4 h-4" /> },
    { id: 'web-development', label: 'Web Development', icon: <Code className="w-4 h-4" /> },
    { id: 'data-science', label: 'Data Science', icon: <BarChart className="w-4 h-4" /> },
    { id: 'mobile', label: 'Mobile Development', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'design', label: 'UI/UX Design', icon: <Palette className="w-4 h-4" /> },
    { id: 'devops', label: 'DevOps & Cloud', icon: <Cloud className="w-4 h-4" /> },
    { id: 'security', label: 'Cybersecurity', icon: <Zap className="w-4 h-4" /> },
  ];

  const levels = [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'expert', label: 'Expert' }
  ];

  const durations = [
    { id: 'all', label: 'Any Duration' },
    { id: 'short', label: '< 3 months' },
    { id: 'medium', label: '3-6 months' },
    { id: 'long', label: '> 6 months' }
  ];

  const sortOptions = [
    { id: 'popularity', label: 'Most Popular', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'rating', label: 'Highest Rated', icon: <Star className="w-4 h-4" /> },
    { id: 'students', label: 'Most Students', icon: <Users className="w-4 h-4" /> },
    { id: 'duration', label: 'Shortest First', icon: <Clock className="w-4 h-4" /> },
    { id: 'price', label: 'Lowest Price', icon: <Award className="w-4 h-4" /> }
  ];

  const filteredPaths = samplePaths.filter(path => {
    // Search filter
    const matchesSearch = !searchTerm || 
      path.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      path.category.toLowerCase().includes(searchTerm.toLowerCase());

    // Category filter
    const matchesCategory = selectedFilters.category === 'all' || 
      path.category === selectedFilters.category;

    // Level filter
    const matchesLevel = selectedFilters.level === 'all' || 
      path.level.toLowerCase().includes(selectedFilters.level);

    // Duration filter
    const matchesDuration = selectedFilters.duration === 'all' ||
      (selectedFilters.duration === 'short' && parseInt(path.duration) < 3) ||
      (selectedFilters.duration === 'medium' && parseInt(path.duration) >= 3 && parseInt(path.duration) <= 6) ||
      (selectedFilters.duration === 'long' && parseInt(path.duration) > 6);

    return matchesSearch && matchesCategory && matchesLevel && matchesDuration;
  });

  // Sort paths
  const sortedPaths = [...filteredPaths].sort((a, b) => {
    switch (selectedFilters.sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'students':
        return parseInt(b.students.replace(/,/g, '')) - parseInt(a.students.replace(/,/g, ''));
      case 'duration':
        return parseInt(a.duration) - parseInt(b.duration);
      case 'price':
        return a.price - b.price;
      default: // popularity
        return b.popular ? 1 : -1;
    }
  });

  const toggleCompare = (pathId) => {
    if (comparePaths.includes(pathId)) {
      setComparePaths(comparePaths.filter(id => id !== pathId));
    } else {
      if (comparePaths.length < 3) {
        setComparePaths([...comparePaths, pathId]);
      }
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'web-development':
        return <Code className="w-5 h-5 text-blue-500" />;
      case 'data-science':
        return <BarChart className="w-5 h-5 text-green-500" />;
      case 'mobile':
        return <Smartphone className="w-5 h-5 text-purple-500" />;
      case 'design':
        return <Palette className="w-5 h-5 text-pink-500" />;
      case 'devops':
        return <Cloud className="w-5 h-5 text-orange-500" />;
      case 'security':
        return <Zap className="w-5 h-5 text-red-500" />;
      default:
        return <Briefcase className="w-5 h-5 text-gray-500" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'text-green-500 bg-green-500/10';
      case 'intermediate':
        return 'text-yellow-500 bg-yellow-500/10';
      case 'advanced':
        return 'text-orange-500 bg-orange-500/10';
      case 'expert':
        return 'text-red-500 bg-red-500/10';
      default:
        return 'text-blue-500 bg-blue-500/10';
    }
  };

  return (
    <div className={`
      rounded-xl border
      ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
    `}>
      {/* Header */}
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Choose Your Learning Path</h2>
              <p className="text-gray-500">{sortedPaths.length} career paths available</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCompareMode(!compareMode)}
              className={`
                px-4 py-2 rounded-lg font-medium flex items-center gap-2
                ${compareMode 
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-700/50'
                }
              `}
            >
              <span>Compare ({comparePaths.length}/3)</span>
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search learning paths..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border dark:border-gray-600 bg-transparent"
              aria-label="Search learning paths"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm font-medium mb-2 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <span>Category</span>
              </div>
              <select
                value={selectedFilters.category}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Level</div>
              <select
                value={selectedFilters.level}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, level: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
              >
                {levels.map(level => (
                  <option key={level.id} value={level.id}>{level.label}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Duration</div>
              <select
                value={selectedFilters.duration}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
              >
                {durations.map(duration => (
                  <option key={duration.id} value={duration.id}>{duration.label}</option>
                ))}
              </select>
            </div>

            <div>
              <div className="text-sm font-medium mb-2">Sort By</div>
              <select
                value={selectedFilters.sortBy}
                onChange={(e) => setSelectedFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                className="w-full px-3 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Category Quick Filters */}
      <div className="p-4 border-b dark:border-gray-700 overflow-x-auto">
        <div className="flex space-x-2 min-w-max">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedFilters(prev => ({ ...prev, category: category.id }))}
              className={`
                px-4 py-2 rounded-lg flex items-center gap-2 whitespace-nowrap
                transition-all duration-200
                ${selectedFilters.category === category.id
                  ? 'bg-blue-500 text-white' 
                  : 'hover:bg-gray-700/50'
                }
                hover:scale-105 active:scale-95
              `}
            >
              {category.icon}
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Compare View */}
      {compareMode && comparePaths.length > 0 && (
        <div className="p-6 border-b dark:border-gray-700 bg-gray-900/50">
          <h3 className="font-bold mb-4">Compare Paths ({comparePaths.length}/3)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparePaths.map(pathId => {
              const path = samplePaths.find(p => p.id === pathId);
              if (!path) return null;
              
              return (
                <div key={path.id} className={`
                  p-4 rounded-lg border
                  ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}
                `}>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-bold">{path.title}</h4>
                    <button
                      onClick={() => toggleCompare(path.id)}
                      className="p-1 text-red-500 hover:bg-red-500/10 rounded-lg"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price:</span>
                      <span className="font-bold">${path.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span>{path.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Courses:</span>
                      <span>{path.courses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rating:</span>
                      <span>{path.rating}/5</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {comparePaths.length > 1 && (
            <div className="mt-4 text-center">
              <button
                onClick={() => onCompare && onCompare(comparePaths)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium"
              >
                Compare Selected
              </button>
            </div>
          )}
        </div>
      )}

      {/* Paths Grid */}
      <div className="p-6">
        {sortedPaths.length === 0 ? (
          <div className="text-center py-12">
            <Target className="w-16 h-16 mx-auto mb-4 text-gray-500" />
            <h3 className="text-xl font-bold mb-2">No paths found</h3>
            <p className="text-gray-500">Try adjusting your filters or search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedPaths.map(path => {
              const isExpanded = expandedPath === path.id;
              const isCompared = comparePaths.includes(path.id);
              const isSelected = selectedPathId === path.id;

              return (
                <div
                  key={path.id}
                  className={`
                    rounded-xl border transition-all duration-300 overflow-hidden
                    ${theme === 'dark' ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'}
                    ${isSelected ? 'ring-2 ring-blue-500' : ''}
                    ${isExpanded ? 'shadow-xl' : 'hover:shadow-lg'}
                  `}
                >
                  {/* Path Header */}
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => setExpandedPath(isExpanded ? null : path.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {getCategoryIcon(path.category)}
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-bold">{path.title}</h3>
                            {path.new && (
                              <div className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                                NEW
                              </div>
                            )}
                            {path.popular && (
                              <div className="px-2 py-1 rounded-full bg-yellow-500 text-white text-xs font-bold">
                                POPULAR
                              </div>
                            )}
                            {path.bestValue && (
                              <div className="px-2 py-1 rounded-full bg-blue-500 text-white text-xs font-bold">
                                BEST VALUE
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-500 mb-4 line-clamp-2">
                          {path.description}
                        </p>

                        {/* Quick Stats */}
                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span>{path.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4 text-gray-500" />
                            <span>{path.courses} courses</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4 text-gray-500" />
                            <span>{path.students} students</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>{path.rating}/5</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-2xl font-bold mb-1">${path.price}</div>
                        {path.originalPrice && (
                          <div className="text-sm text-gray-500 line-through">
                            ${path.originalPrice}
                          </div>
                        )}
                        <div className="text-sm text-green-500">
                          Save ${path.originalPrice - path.price}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {isExpanded && (
                    <div className="px-6 pb-6 border-t dark:border-gray-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {/* Skills */}
                        <div>
                          <h4 className="font-bold mb-3 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            Skills You'll Learn
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {path.skills.map((skill, index) => (
                              <div
                                key={index}
                                className="px-3 py-1 rounded-lg bg-gray-700/50 border border-gray-600"
                              >
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Outcomes */}
                        <div>
                          <h4 className="font-bold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            Career Outcomes
                          </h4>
                          <ul className="space-y-2">
                            {path.outcomes.map((outcome, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span>{outcome}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Level & Instructor */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div className={`
                          p-4 rounded-lg
                          ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}
                        `}>
                          <div className="text-sm text-gray-500 mb-1">Level</div>
                          <div className={`px-3 py-1 rounded-full inline-block ${getLevelColor(path.level)}`}>
                            {path.level}
                          </div>
                        </div>
                        
                        <div className={`
                          p-4 rounded-lg
                          ${theme === 'dark' ? 'bg-gray-700/30' : 'bg-gray-50'}
                        `}>
                          <div className="text-sm text-gray-500 mb-1">Instructor</div>
                          <div className="font-medium">{path.instructor}</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="p-6 border-t dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleCompare(path.id)}
                          className={`
                            p-2 rounded-lg transition-colors
                            ${isCompared 
                              ? 'text-blue-500 bg-blue-500/10' 
                              : 'hover:bg-gray-700/50'
                            }
                          `}
                          aria-label={isCompared ? "Remove from comparison" : "Add to comparison"}
                        >
                          {isCompared ? '✓' : '🔄'}
                        </button>
                        
                        <button
                          onClick={() => onSave && onSave(path.id)}
                          className="p-2 rounded-lg hover:bg-gray-700/50"
                          aria-label="Save path"
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                        
                        <button
                          onClick={() => onShare && onShare(path.id)}
                          className="p-2 rounded-lg hover:bg-gray-700/50"
                          aria-label="Share path"
                        >
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onSelectPath && onSelectPath(path.id)}
                          className={`
                            px-6 py-2 rounded-lg font-medium flex items-center gap-2
                            transition-all duration-200
                            ${isSelected
                              ? 'bg-green-500 text-white' 
                              : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                            }
                            hover:scale-105 active:scale-95
                          `}
                        >
                          <span>{isSelected ? 'Selected' : 'Select Path'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6 border-t dark:border-gray-700 bg-gray-900/30">
        <div className="text-center text-gray-500">
          <div className="font-medium mb-2">Need help choosing?</div>
          <p className="text-sm mb-4">Take our career assessment quiz to find the perfect path for you</p>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium">
            Take Career Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default PathSelector;
