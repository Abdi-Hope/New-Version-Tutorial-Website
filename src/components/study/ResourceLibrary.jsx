import React, { useState } from 'react';
import {
  Search, Filter, Download, Eye, Star, FolderOpen,
  FileText, Video, Link, Image, Music, Archive,
  MoreVertical, Share, BookOpen, Clock, User,
  ChevronRight, Grid, List
} from 'lucide-react';

const ResourceLibrary = () => {
  const [resources, setResources] = useState([
    {
      id: 1,
      title: 'React Cheat Sheet',
      description: 'Complete reference guide for React hooks, components, and patterns.',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2024-01-28',
      downloads: 124,
      rating: 4.8,
      category: 'Web Development',
      tags: ['react', 'cheatsheet', 'reference'],
      starred: true,
      url: '#'
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals Video',
      description: 'Video tutorial covering JavaScript basics and modern ES6+ features.',
      type: 'video',
      size: '145 MB',
      uploadDate: '2024-01-27',
      downloads: 89,
      rating: 4.9,
      category: 'Web Development',
      tags: ['javascript', 'video', 'tutorial'],
      starred: false,
      url: '#'
    },
    {
      id: 3,
      title: 'Python Data Science Resources',
      description: 'Collection of Jupyter notebooks and datasets for data science.',
      type: 'zip',
      size: '85 MB',
      uploadDate: '2024-01-25',
      downloads: 67,
      rating: 4.7,
      category: 'Data Science',
      tags: ['python', 'data-science', 'notebooks'],
      starred: true,
      url: '#'
    },
    {
      id: 4,
      title: 'UI Design System Template',
      description: 'Figma file with complete design system components.',
      type: 'figma',
      size: '12 MB',
      uploadDate: '2024-01-24',
      downloads: 42,
      rating: 4.6,
      category: 'Design',
      tags: ['design', 'figma', 'ui'],
      starred: false,
      url: '#'
    },
    {
      id: 5,
      title: 'Database Design Guide',
      description: 'Comprehensive guide to relational database design principles.',
      type: 'pdf',
      size: '3.1 MB',
      uploadDate: '2024-01-22',
      downloads: 56,
      rating: 4.5,
      category: 'Database',
      tags: ['database', 'sql', 'design'],
      starred: false,
      url: '#'
    },
    {
      id: 6,
      title: 'API Documentation Template',
      description: 'Swagger/OpenAPI template for API documentation.',
      type: 'yaml',
      size: '0.8 MB',
      uploadDate: '2024-01-20',
      downloads: 38,
      rating: 4.8,
      category: 'Backend',
      tags: ['api', 'documentation', 'swagger'],
      starred: true,
      url: '#'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [sortBy, setSortBy] = useState('date'); // date, downloads, rating, name

  const categories = ['all', ...new Set(resources.map(r => r.category))];
  const types = ['all', ...new Set(resources.map(r => r.type))];

  const filteredResources = resources
    .filter(resource => {
      const matchesSearch = searchQuery === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.tags.some(tag => tag.includes(searchQuery.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;
      const matchesType = filterType === 'all' || resource.type === filterType;
      return matchesSearch && matchesCategory && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'downloads':
          return b.downloads - a.downloads;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.title.localeCompare(b.title);
        default: // date
          return new Date(b.uploadDate) - new Date(a.uploadDate);
      }
    });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5 text-red-500" />;
      case 'video': return <Video className="w-5 h-5 text-blue-500" />;
      case 'zip': return <Archive className="w-5 h-5 text-yellow-500" />;
      case 'figma': return <Image className="w-5 h-5 text-purple-500" />;
      case 'yaml': return <FileText className="w-5 h-5 text-green-500" />;
      default: return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const handleStar = (id) => {
    setResources(prev => prev.map(resource =>
      resource.id === id ? { ...resource, starred: !resource.starred } : resource
    ));
  };

  const handleDownload = (resource) => {
    // Simulate download
    alert(`Downloading: ${resource.title}`);
  };

  const stats = {
    total: resources.length,
    totalSize: resources.reduce((sum, r) => {
      const size = parseFloat(r.size);
      const unit = r.size.split(' ')[1];
      if (unit === 'GB') return sum + size * 1024;
      return sum + size;
    }, 0).toFixed(1) + ' MB',
    starred: resources.filter(r => r.starred).length,
    downloads: resources.reduce((sum, r) => sum + r.downloads, 0)
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Resource Library
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Access study materials, templates, and reference guides
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2">
              <FolderOpen className="w-4 h-4" />
              <span>Upload Resource</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.total}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Resources
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.totalSize}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Size
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.starred}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Starred
            </p>
          </div>
          
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {stats.downloads}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Total Downloads
            </p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources by title, description, or tags..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
              >
                <Grid className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-600 shadow' : ''}`}
              >
                <List className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
            >
              <option value="date">Sort by Date</option>
              <option value="downloads">Sort by Downloads</option>
              <option value="rating">Sort by Rating</option>
              <option value="name">Sort by Name</option>
            </select>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
          >
            {types.map(type => (
              <option key={type} value={type}>
                {type === 'all' ? 'All Types' : type.toUpperCase()}
              </option>
            ))}
          </select>
          
          <div className="flex flex-wrap gap-2">
            {['react', 'javascript', 'python', 'design', 'database'].map(tag => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`px-3 py-1 text-sm rounded-full ${
                  searchQuery === tag
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Grid/List */}
      {filteredResources.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-white dark:bg-gray-800 rounded-lg">
                      {getTypeIcon(resource.type)}
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                        {resource.type}
                      </span>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {resource.size}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStar(resource.id)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <Star className={`w-4 h-4 ${resource.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                    </button>
                    <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {resource.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {resource.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">
                    {resource.category}
                  </span>
                  {resource.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Download className="w-3 h-3" />
                      <span>{resource.downloads}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>{resource.rating}</span>
                    </span>
                    <span>{resource.uploadDate}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDownload(resource)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                      {getTypeIcon(resource.type)}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {resource.title}
                        </h3>
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs rounded">
                          {resource.category}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        {resource.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          {getTypeIcon(resource.type)}
                          <span>{resource.type.toUpperCase()} • {resource.size}</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Download className="w-3 h-3" />
                          <span>{resource.downloads} downloads</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span>{resource.rating}</span>
                        </span>
                        <span>•</span>
                        <span>{resource.uploadDate}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-3">
                        {resource.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStar(resource.id)}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
                    >
                      <Star className={`w-5 h-5 ${resource.starred ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                    </button>
                    <button
                      onClick={() => handleDownload(resource)}
                      className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      ) : (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No resources found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Recent Activity */}
      <div className="mt-8 pt-8 border-t dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
          Recent Activity
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Download className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  React Cheat Sheet
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Downloaded 2 hours ago
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Star className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Python Resources
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Starred yesterday
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Eye className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Design Template
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Viewed 2 days ago
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceLibrary;
