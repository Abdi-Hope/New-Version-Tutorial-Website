import React, { useState } from 'react';
import { 
  BookOpen, Clock, Award, TrendingUp,
  Filter, Search, Grid, List
} from 'lucide-react';
import { AssignmentCard } from '../components/assignments';
import { BundleCard } from '../components/bundles';
import { useTheme } from '../context/ThemeContext';

const MyCourses = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [activeTab, setActiveTab] = useState('enrolled');
  const { theme } = useTheme();

  // Sample data
  const enrolledCourses = [
    {
      id: 1,
      title: 'Advanced React Development',
      instructor: 'Sarah Johnson',
      progress: 75,
      duration: '40 hours',
      lastAccessed: '2 hours ago',
      thumbnail: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      title: 'Node.js Backend Mastery',
      instructor: 'Michael Chen',
      progress: 30,
      duration: '35 hours',
      lastAccessed: '1 day ago',
      thumbnail: 'https://via.placeholder.com/300x200'
    }
  ];

  const assignments = [
    {
      id: 1,
      title: 'React Hooks Assignment',
      course: 'Advanced React',
      dueDate: '2024-02-15',
      status: 'pending',
      points: 100
    }
  ];

  const bundles = [
    {
      id: 1,
      title: 'Full-Stack Developer Bundle',
      courses: 8,
      price: 299,
      originalPrice: 599,
      progress: 40
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                My Learning
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Continue your learning journey
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search my courses..."
                  className="pl-10 pr-4 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
                />
              </div>
              
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b dark:border-gray-700 mb-6">
          {['enrolled', 'assignments', 'bundles', 'completed', 'saved'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize ${activeTab === tab ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-gray-500">Courses</div>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">42%</div>
                <div className="text-gray-500">Avg Progress</div>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">156</div>
                <div className="text-gray-500">Learning Hours</div>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-gray-500">Certificates</div>
              </div>
              <Award className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'enrolled' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {enrolledCourses.map(course => (
              <div key={course.id} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <div className="flex items-start gap-4">
                  <div className="w-24 h-24 rounded-lg bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{course.title}</h3>
                    <p className="text-gray-500">{course.instructor}</p>
                    
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                        <div 
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-500">
                        Last accessed: {course.lastAccessed}
                      </div>
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'assignments' && (
          <div className="space-y-4">
            {assignments.map(assignment => (
              <AssignmentCard 
                key={assignment.id}
                assignment={assignment}
                onView={() => {}}
                onSubmit={() => {}}
              />
            ))}
          </div>
        )}

        {activeTab === 'bundles' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {bundles.map(bundle => (
              <BundleCard 
                key={bundle.id}
                bundle={bundle}
                onEnroll={() => {}}
                compact
              />
            ))}
          </div>
        )}

        {/* View Toggle */}
        <div className="flex justify-end mt-8">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white dark:bg-gray-700' : ''}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-700' : ''}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
