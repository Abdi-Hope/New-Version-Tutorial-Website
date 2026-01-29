import React, { useState, useEffect } from 'react';
import { 
  PlayCircle, BookOpen, CheckCircle, Clock, Download,
  ChevronRight, ChevronLeft, Bookmark, Share2, Menu,
  FileText, MessageSquare, HelpCircle, Award, Star,
  Users, BarChart3, Target, Zap
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import VideoPlayer from './VideoPlayer';
import PlayerControls from './PlayerControls';
import TranscriptPanel from './TranscriptPanel';

const CoursePlayer = ({ 
  courseId,
  lessonId,
  courseTitle = "Advanced React Development",
  lessonTitle = "Introduction to React Hooks"
}) => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState('content');
  const [completedLessons, setCompletedLessons] = useState(['1', '2']);
  const [bookmarks, setBookmarks] = useState([]);
  const [playbackStats, setPlaybackStats] = useState({
    timeWatched: 1250,
    completionRate: 65,
    avgWatchTime: 45,
    lastWatched: '2 hours ago'
  });
  const { theme } = useTheme();

  // Sample course modules and lessons
  const modules = [
    {
      id: '1',
      title: 'Module 1: React Fundamentals',
      duration: '2h 15m',
      lessons: 5,
      completed: 3,
      lessons: [
        { id: '1-1', title: 'Introduction to React', duration: '15:30', type: 'video', completed: true },
        { id: '1-2', title: 'JSX Syntax', duration: '22:45', type: 'video', completed: true },
        { id: '1-3', title: 'Components & Props', duration: '28:20', type: 'video', completed: true },
        { id: '1-4', title: 'State & Lifecycle', duration: '35:10', type: 'video', completed: false },
        { id: '1-5', title: 'Quiz: React Basics', duration: '10:00', type: 'quiz', completed: false },
      ]
    },
    {
      id: '2',
      title: 'Module 2: React Hooks',
      duration: '3h 30m',
      lessons: 6,
      completed: 2,
      lessons: [
        { id: '2-1', title: 'useState Hook', duration: '25:15', type: 'video', completed: true },
        { id: '2-2', title: 'useEffect Hook', duration: '32:40', type: 'video', completed: true },
        { id: '2-3', title: 'useContext Hook', duration: '28:50', type: 'video', completed: false },
        { id: '2-4', title: 'Custom Hooks', duration: '40:20', type: 'video', completed: false },
        { id: '2-5', title: 'Practice Exercise', duration: '45:00', type: 'exercise', completed: false },
        { id: '2-6', title: 'Assignment: Todo App', duration: '60:00', type: 'assignment', completed: false },
      ]
    },
    {
      id: '3',
      title: 'Module 3: Advanced Patterns',
      duration: '4h 20m',
      lessons: 7,
      completed: 0,
      lessons: [
        { id: '3-1', title: 'Higher-Order Components', duration: '30:25', type: 'video', completed: false },
        { id: '3-2', title: 'Render Props', duration: '35:40', type: 'video', completed: false },
        { id: '3-3', title: 'Performance Optimization', duration: '42:15', type: 'video', completed: false },
        { id: '3-4', title: 'Code Splitting', duration: '38:50', type: 'video', completed: false },
        { id: '3-5', title: 'Error Boundaries', duration: '25:30', type: 'video', completed: false },
        { id: '3-6', title: 'Testing React Apps', duration: '50:20', type: 'video', completed: false },
        { id: '3-7', title: 'Final Project', duration: '120:00', type: 'project', completed: false },
      ]
    }
  ];

  // Resources for the current lesson
  const resources = [
    { type: 'pdf', title: 'React Hooks Cheatsheet', size: '2.4 MB', downloads: 1245 },
    { type: 'code', title: 'Example Code Files', size: '1.8 MB', downloads: 892 },
    { type: 'slides', title: 'Presentation Slides', size: '3.2 MB', downloads: 567 },
    { type: 'link', title: 'Official React Documentation', url: 'https://reactjs.org' },
  ];

  // Related questions/discussions
  const discussions = [
    { user: 'Sarah Johnson', question: 'When should I use useCallback vs useMemo?', answers: 12, votes: 45 },
    { user: 'Mike Chen', question: 'Best practices for custom hook dependencies?', answers: 8, votes: 32 },
    { user: 'Emma Wilson', question: 'How to test hooks with Jest?', answers: 15, votes: 67 },
  ];

  const toggleLessonCompletion = (lessonId) => {
    if (completedLessons.includes(lessonId)) {
      setCompletedLessons(completedLessons.filter(id => id !== lessonId));
    } else {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const toggleBookmark = (lessonId) => {
    if (bookmarks.includes(lessonId)) {
      setBookmarks(bookmarks.filter(id => id !== lessonId));
    } else {
      setBookmarks([...bookmarks, lessonId]);
    }
  };

  return (
    <div className={`
      min-h-screen
      ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}
    `}>
      {/* Main Layout */}
      <div className="flex">
        {/* Sidebar */}
        <div className={`
          fixed lg:relative z-40 h-screen overflow-y-auto transition-all duration-300
          ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
          border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
          w-80 lg:w-96
        `}>
          <div className="p-6">
            {/* Course Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-xl font-bold truncate">{courseTitle}</h1>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="lg:hidden p-2 hover:bg-gray-700/50 rounded-lg"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>10h 15m total</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>{completedLessons.length}/18 lessons</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{Math.round((completedLessons.length / 18) * 100)}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${(completedLessons.length / 18) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-6">
              {['content', 'resources', 'discussions', 'notes'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    flex-1 py-3 text-sm font-medium transition-colors
                    ${activeTab === tab 
                      ? 'border-b-2 text-blue-500 border-blue-500' 
                      : 'text-gray-500 hover:text-gray-300'
                    }
                  `}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === 'content' && (
                <div className="space-y-4">
                  {modules.map((module) => (
                    <div key={module.id} className="border rounded-lg overflow-hidden">
                      <div className={`
                        p-4 font-medium flex items-center justify-between
                        ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}
                      `}>
                        <div className="flex items-center gap-3">
                          <ChevronRight className="w-4 h-4" />
                          <span>{module.title}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {module.completed}/{module.lessons.length} lessons
                        </div>
                      </div>
                      
                      <div className="p-2">
                        {module.lessons.map((lesson) => (
                          <div
                            key={lesson.id}
                            className={`
                              p-3 rounded-lg mb-2 cursor-pointer transition-colors
                              ${lesson.id === lessonId 
                                ? 'bg-blue-500/20 border border-blue-500/30' 
                                : theme === 'dark' 
                                  ? 'hover:bg-gray-700/50' 
                                  : 'hover:bg-gray-100'
                              }
                            `}
                            onClick={() => console.log('Navigate to lesson:', lesson.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {lesson.type === 'video' ? (
                                  <PlayCircle className="w-5 h-5 text-blue-500" />
                                ) : lesson.type === 'quiz' ? (
                                  <HelpCircle className="w-5 h-5 text-yellow-500" />
                                ) : lesson.type === 'exercise' ? (
                                  <Target className="w-5 h-5 text-green-500" />
                                ) : (
                                  <FileText className="w-5 h-5 text-purple-500" />
                                )}
                                
                                <div className="flex-1 min-w-0">
                                  <div className="font-medium truncate">{lesson.title}</div>
                                  <div className="text-sm text-gray-500 flex items-center gap-2">
                                    <Clock className="w-3 h-3" />
                                    {lesson.duration}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleBookmark(lesson.id);
                                  }}
                                  className={`p-1 ${bookmarks.includes(lesson.id) ? 'text-yellow-500' : 'text-gray-500'}`}
                                >
                                  <Bookmark className={`w-4 h-4 ${bookmarks.includes(lesson.id) ? 'fill-current' : ''}`} />
                                </button>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLessonCompletion(lesson.id);
                                  }}
                                  className={`p-1 ${completedLessons.includes(lesson.id) ? 'text-green-500' : 'text-gray-500'}`}
                                >
                                  <CheckCircle className={`w-4 h-4 ${completedLessons.includes(lesson.id) ? 'fill-current' : ''}`} />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'resources' && (
                <div className="space-y-3">
                  <h3 className="font-medium mb-3">Lesson Resources</h3>
                  {resources.map((resource, index) => (
                    <div
                      key={index}
                      className={`
                        p-4 rounded-lg border transition-colors
                        ${theme === 'dark' 
                          ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-500" />
                          <div>
                            <div className="font-medium">{resource.title}</div>
                            <div className="text-sm text-gray-500">
                              {resource.size || 'External link'}
                            </div>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-600/50 rounded-lg">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'discussions' && (
                <div className="space-y-3">
                  <h3 className="font-medium mb-3">Related Questions</h3>
                  {discussions.map((discussion, index) => (
                    <div
                      key={index}
                      className={`
                        p-4 rounded-lg border transition-colors
                        ${theme === 'dark' 
                          ? 'bg-gray-700/50 border-gray-600 hover:bg-gray-700' 
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }
                      `}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-medium">{discussion.question}</div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Star className="w-4 h-4" />
                          {discussion.votes}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="text-gray-500">By {discussion.user}</div>
                        <div className="text-gray-500">{discussion.answers} answers</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          {/* Top Bar */}
          <div className={`
            sticky top-0 z-30 p-4 border-b
            ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          `}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="lg:hidden p-2 hover:bg-gray-700/50 rounded-lg"
                >
                  <Menu className="w-5 h-5" />
                </button>
                
                <div>
                  <h1 className="text-xl font-bold">{lessonTitle}</h1>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{courseTitle}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-700/50 rounded-lg">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-700/50 rounded-lg">
                  <Award className="w-5 h-5" />
                </button>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                  Next Lesson
                </button>
              </div>
            </div>
          </div>

          {/* Video Player */}
          <div className="p-4 lg:p-6">
            <div className="rounded-2xl overflow-hidden shadow-xl mb-6">
              <VideoPlayer 
                title={lessonTitle}
                duration={1800} // 30 minutes in seconds
              />
            </div>

            {/* Lesson Info */}
            <div className={`
              rounded-xl p-6 mb-6
              ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
              border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
            `}>
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-3">{lessonTitle}</h2>
                  <p className="text-gray-500 mb-4">
                    In this lesson, we'll dive deep into React hooks. You'll learn how to use useState, useEffect, 
                    and other essential hooks to build modern React applications. We'll cover best practices, 
                    common pitfalls, and practical examples.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-500" />
                      <span className="font-medium">Duration: 30:15</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-green-500" />
                      <span className="font-medium">2,458 students watched</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      <span className="font-medium">4.8/5 rating</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium">
                    Mark as Complete
                  </button>
                  <button className="px-6 py-3 border border-blue-500 text-blue-500 hover:bg-blue-500/10 rounded-lg font-medium">
                    Save for Later
                  </button>
                  <button className="px-6 py-3 border border-gray-500 text-gray-500 hover:bg-gray-500/10 rounded-lg font-medium">
                    Ask Question
                  </button>
                </div>
              </div>
            </div>

            {/* Stats & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className={`
                rounded-xl p-6
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
              `}>
                <div className="flex items-center gap-3 mb-4">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                  <h3 className="font-bold">Your Stats</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-500">Time Watched</span>
                      <span className="font-medium">{Math.floor(playbackStats.timeWatched / 60)} min</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500" style={{ width: '75%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-500">Completion Rate</span>
                      <span className="font-medium">{playbackStats.completionRate}%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500" style={{ width: '65%' }} />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`
                rounded-xl p-6
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
              `}>
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-yellow-500" />
                  <h3 className="font-bold">Quick Actions</h3>
                </div>
                <div className="space-y-3">
                  <button className="w-full p-3 text-left rounded-lg hover:bg-gray-700/50 transition-colors">
                    <div className="font-medium">Take Notes</div>
                    <div className="text-sm text-gray-500">Jot down important points</div>
                  </button>
                  <button className="w-full p-3 text-left rounded-lg hover:bg-gray-700/50 transition-colors">
                    <div className="font-medium">Review Quiz</div>
                    <div className="text-sm text-gray-500">Test your understanding</div>
                  </button>
                  <button className="w-full p-3 text-left rounded-lg hover:bg-gray-700/50 transition-colors">
                    <div className="font-medium">Download Resources</div>
                    <div className="text-sm text-gray-500">Get lesson materials</div>
                  </button>
                </div>
              </div>
              
              <div className={`
                rounded-xl p-6
                ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}
                border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}
              `}>
                <div className="flex items-center gap-3 mb-4">
                  <MessageSquare className="w-6 h-6 text-purple-500" />
                  <h3 className="font-bold">Community</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-gray-700/30">
                    <div className="font-medium mb-1">Active Discussion</div>
                    <div className="text-sm text-gray-500">45 students discussing this lesson</div>
                  </div>
                  <button className="w-full p-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium">
                    Join Discussion
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Toggle */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className="fixed bottom-6 left-6 z-50 p-3 bg-blue-500 text-white rounded-full shadow-lg lg:hidden"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default CoursePlayer;
