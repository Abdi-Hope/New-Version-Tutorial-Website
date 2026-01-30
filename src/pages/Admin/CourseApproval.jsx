import React, { useState } from 'react';
import { 
  CheckCircle, XCircle, Eye, Search, Filter, 
  Calendar, User, Clock, BookOpen, ChevronRight,
  Download, Mail, MoreVertical, AlertCircle
} from 'lucide-react';

const CourseApproval = () => {
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Advanced React Patterns',
      instructor: 'Alex Johnson',
      category: 'Web Development',
      submittedDate: '2024-01-28',
      status: 'pending',
      price: '$89.99',
      duration: '12 hours',
      students: 0,
      rating: null,
      description: 'Learn advanced React patterns and best practices for building scalable applications.'
    },
    {
      id: 2,
      title: 'Machine Learning Fundamentals',
      instructor: 'Sarah Williams',
      category: 'Data Science',
      submittedDate: '2024-01-27',
      status: 'pending',
      price: '$129.99',
      duration: '20 hours',
      students: 0,
      rating: null,
      description: 'Introduction to machine learning concepts with Python and scikit-learn.'
    },
    {
      id: 3,
      title: 'Digital Marketing Mastery',
      instructor: 'Mike Chen',
      category: 'Marketing',
      submittedDate: '2024-01-26',
      status: 'approved',
      price: '$69.99',
      duration: '15 hours',
      students: 245,
      rating: 4.8,
      description: 'Complete guide to digital marketing strategies and tools.'
    },
    {
      id: 4,
      title: 'Mobile App Development with Flutter',
      instructor: 'David Kim',
      category: 'Mobile Development',
      submittedDate: '2024-01-25',
      status: 'rejected',
      price: '$99.99',
      duration: '18 hours',
      students: 0,
      rating: null,
      rejectionReason: 'Course content needs more practical examples and projects.'
    },
    {
      id: 5,
      title: 'Cybersecurity Essentials',
      instructor: 'Lisa Rodriguez',
      category: 'Security',
      submittedDate: '2024-01-24',
      status: 'pending',
      price: '$149.99',
      duration: '25 hours',
      students: 0,
      rating: null,
      description: 'Fundamentals of cybersecurity for beginners.'
    }
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [rejectionReason, setRejectionReason] = useState('');

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || course.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: courses.length,
    pending: courses.filter(c => c.status === 'pending').length,
    approved: courses.filter(c => c.status === 'approved').length,
    rejected: courses.filter(c => c.status === 'rejected').length
  };

  const handleApprove = (courseId) => {
    setCourses(prev => prev.map(course =>
      course.id === courseId ? { ...course, status: 'approved' } : course
    ));
    setSelectedCourse(null);
  };

  const handleReject = (courseId) => {
    if (!rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    
    setCourses(prev => prev.map(course =>
      course.id === courseId ? { 
        ...course, 
        status: 'rejected',
        rejectionReason 
      } : course
    ));
    setRejectionReason('');
    setSelectedCourse(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'rejected': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Course Approval
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Review and approve course submissions from instructors
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Courses', value: stats.total, color: 'bg-blue-500' },
          { label: 'Pending Review', value: stats.pending, color: 'bg-yellow-500' },
          { label: 'Approved', value: stats.approved, color: 'bg-green-500' },
          { label: 'Rejected', value: stats.rejected, color: 'bg-red-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <BookOpen className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course List */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            {/* Header */}
            <div className="p-6 border-b dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search courses or instructors..."
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  
                  <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Course List */}
            <div className="divide-y dark:divide-gray-700">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className={`p-6 cursor-pointer transition-colors ${
                    selectedCourse?.id === course.id
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                  }`}
                  onClick={() => setSelectedCourse(course)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {course.title}
                        </h3>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(course.status)}`}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center space-x-1">
                          <User className="w-4 h-4" />
                          <span>{course.instructor}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{course.category}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{course.submittedDate}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{course.duration}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        {course.price}
                      </span>
                      <ChevronRight className={`w-5 h-5 text-gray-400 ${
                        selectedCourse?.id === course.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Course Details Panel */}
        <div className="lg:col-span-1">
          {selectedCourse ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Course Details
                </h3>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <XCircle className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Course Info */}
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {selectedCourse.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {selectedCourse.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Instructor</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedCourse.instructor}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Category</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedCourse.category}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Price</span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {selectedCourse.price}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Duration</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedCourse.duration}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 dark:text-gray-400">Submitted</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {selectedCourse.submittedDate}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Status</span>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedCourse.status)}`}>
                      {selectedCourse.status.charAt(0).toUpperCase() + selectedCourse.status.slice(1)}
                    </span>
                  </div>
                  
                  {selectedCourse.status === 'rejected' && selectedCourse.rejectionReason && (
                    <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-red-800 dark:text-red-400 mb-1">
                            Rejection Reason
                          </p>
                          <p className="text-sm text-red-700 dark:text-red-300">
                            {selectedCourse.rejectionReason}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                {selectedCourse.status === 'pending' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Rejection Reason (Optional)
                      </label>
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        rows="3"
                        placeholder="Provide feedback if rejecting the course..."
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApprove(selectedCourse.id)}
                        className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>Approve Course</span>
                      </button>
                      
                      <button
                        onClick={() => handleReject(selectedCourse.id)}
                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium flex items-center justify-center space-x-2"
                      >
                        <XCircle className="w-5 h-5" />
                        <span>Reject Course</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Additional Actions */}
                <div className="pt-6 border-t dark:border-gray-700">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Additional Actions
                  </h4>
                  <div className="space-y-2">
                    <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left">
                      <Eye className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Preview Course</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left">
                      <Mail className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">Contact Instructor</span>
                    </button>
                    <button className="w-full flex items-center space-x-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-left">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700 dark:text-gray-300">More Options</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Select a Course
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Click on a course from the list to view details and take action
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseApproval;
