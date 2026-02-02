import React, { useState } from 'react';
import { 
  Map, Target, Flag, CheckCircle, Lock,
  ChevronRight, Zap, Award, BookOpen,
  Clock, Users, TrendingUp, Star,
  PlayCircle, PauseCircle, Download,
  Share2, Maximize2, Minimize2
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const LearningPath = ({
  path,
  currentProgress = 0,
  onSelectCourse,
  onToggleComplete,
  onDownload,
  onShare
}) => {
  const [expandedModules, setExpandedModules] = useState({});
  const [fullscreen, setFullscreen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [viewMode, setViewMode] = useState('timeline'); // timeline, list, grid
  const { theme } = useTheme();

  // Sample learning path data
  const samplePath = path || {
    id: 'path-1',
    title: 'Full-Stack Web Developer',
    description: 'Become a professional full-stack developer with this comprehensive learning path',
    duration: '6 months',
    level: 'Beginner to Advanced',
    courses: 12,
    hours: 240,
    completion: currentProgress,
    skills: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'Git', 'Deployment'],
    modules: [
      {
        id: 'module-1',
        title: 'Web Fundamentals',
        description: 'Learn the basics of web development',
        duration: '40 hours',
        totalCourses: 3,
        completed: 2,
        items: [
          { id: 'course-1', title: 'HTML & CSS Basics', duration: '15h', completed: true, type: 'course' },
          { id: 'course-2', title: 'Responsive Design', duration: '12h', completed: true, type: 'course' },
          { id: 'course-3', title: 'JavaScript Fundamentals', duration: '13h', completed: false, type: 'course' },
        ]
      },
      {
        id: 'module-2',
        title: 'Frontend Development',
        description: 'Master modern frontend frameworks',
        duration: '60 hours',
        totalCourses: 3,
        completed: 1,
        items: [
          { id: 'course-4', title: 'React Fundamentals', duration: '20h', completed: true, type: 'course' },
          { id: 'course-5', title: 'Advanced React Patterns', duration: '25h', completed: false, type: 'course' },
          { id: 'course-6', title: 'State Management', duration: '15h', completed: false, type: 'course' },
        ]
      },
      {
        id: 'module-3',
        title: 'Backend Development',
        description: 'Build robust backend systems',
        duration: '70 hours',
        totalCourses: 3,
        completed: 0,
        items: [
          { id: 'course-7', title: 'Node.js & Express', duration: '25h', completed: false, type: 'course' },
          { id: 'course-8', title: 'Database Design', duration: '20h', completed: false, type: 'course' },
          { id: 'course-9', title: 'API Development', duration: '25h', completed: false, type: 'course' },
        ]
      },
      {
        id: 'module-4',
        title: 'Full-Stack Projects',
        description: 'Build real-world applications',
        duration: '70 hours',
        totalCourses: 3,
        completed: 0,
        items: [
          { id: 'course-10', title: 'E-commerce Platform', duration: '30h', completed: false, type: 'project' },
          { id: 'course-11', title: 'Social Media App', duration: '25h', completed: false, type: 'project' },
          { id: 'course-12', title: 'Final Capstone', duration: '15h', completed: false, type: 'project' },
        ]
      }
    ],
    prerequisites: ['Basic computer skills', 'Internet access'],
    outcomes: [
      'Build full-stack web applications',
      'Deploy applications to production',
      'Work with modern development tools',
      'Collaborate using Git and GitHub'
    ],
    instructor: {
      name: 'Sarah Johnson',
      role: 'Senior Full-Stack Developer',
      experience: '10+ years',
      students: '50,000+',
      rating: 4.9
    }
  };

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleId]: !prev[moduleId]
    }));
  };

  const calculateProgress = () => {
    const totalCourses = samplePath.modules.reduce((sum, module) => sum + module.courses.length, 0);
    const completedCourses = samplePath.modules.reduce((sum, module) => 
      sum + module.courses.filter(course => course.completed).length, 0
    );
    return (completedCourses / totalCourses) * 100;
  };

  const overallProgress = calculateProgress();

  const getCourseTypeColor = (type) => {
    switch (type) {
      case 'project':
        return 'bg-purple-500 text-white';
      case 'quiz':
        return 'bg-yellow-500 text-white';
      case 'assignment':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-green-500 text-white';
    }
  };

  const formatDuration = (hours) => {
    const days = Math.floor(hours / 8);
    const remainingHours = hours % 8;
    
    if (days > 0) {
      return `${days} week${days > 1 ? 's' : ''}${remainingHours > 0 ? ` ${remainingHours}h` : ''}`;
    }
    return `${hours}h`;
  };

  const estimatedCompletion = () => {
    const remainingHours = samplePath.hours * (1 - overallProgress / 100);
    const weeks = Math.ceil(remainingHours / 20); // Assuming 20h/week
    
    if (weeks === 0) return 'Complete';
    if (weeks === 1) return '1 week';
    return `${weeks} weeks`;
  };

  return (
    <div className={`
      rounded-xl border transition-all duration-300
      ${fullscreen ? 'fixed inset-4 z-50' : 'relative'}
      ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
    `}>
      {/* Header */}
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Map className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{samplePath.title}</h2>
              <p className="text-gray-500">{samplePath.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onDownload}
              className="p-2 hover:bg-gray-700/50 rounded-lg"
              aria-label="Download path"
            >
              <Download className="w-5 h-5" />
            </button>
            <button
              onClick={onShare}
              className="p-2 hover:bg-gray-700/50 rounded-lg"
              aria-label="Share path"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-2 hover:bg-gray-700/50 rounded-lg"
              aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {fullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className={`
            p-4 rounded-lg border
            ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-blue-50 border-blue-100'}
          `}>
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-blue-500" />
              <span className="text-sm text-gray-500">Progress</span>
            </div>
            <div className="text-2xl font-bold">{overallProgress.toFixed(1)}%</div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
          
          <div className={`
            p-4 rounded-lg border
            ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-green-50 border-green-100'}
          `}>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen className="w-4 h-4 text-green-500" />
              <span className="text-sm text-gray-500">Courses</span>
            </div>
            <div className="text-2xl font-bold">{samplePath.courses}</div>
            <div className="text-sm text-gray-500">{samplePath.hours} hours</div>
          </div>
          
          <div className={`
            p-4 rounded-lg border
            ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-yellow-50 border-yellow-100'}
          `}>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-gray-500">Time Left</span>
            </div>
            <div className="text-2xl font-bold">{estimatedCompletion()}</div>
            <div className="text-sm text-gray-500">{samplePath.duration} total</div>
          </div>
          
          <div className={`
            p-4 rounded-lg border
            ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-purple-50 border-purple-100'}
          `}>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-gray-500">Level</span>
            </div>
            <div className="text-2xl font-bold">{samplePath.level}</div>
            <div className="text-sm text-gray-500">{samplePath.skills.length} skills</div>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center gap-4">
          {['timeline', 'list', 'grid'].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-lg font-medium capitalize ${viewMode === mode ? 'bg-blue-500 text-white' : 'hover:bg-gray-700/50'}`}
            >
              {mode} View
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {viewMode === 'timeline' ? (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
            
            {/* Modules */}
            <div className="space-y-8">
              {samplePath.modules.map((module, moduleIndex) => (
                <div key={module.id} className="relative">
                  {/* Module Node */}
                  <div className="absolute left-6 -translate-x-1/2">
                    <div className={`
                      w-5 h-5 rounded-full border-4
                      ${module.completed === module.courses.length 
                        ? 'bg-green-500 border-green-300' 
                        : module.completed > 0
                          ? 'bg-yellow-500 border-yellow-300'
                          : 'bg-gray-500 border-gray-700'
                      }
                    `} />
                  </div>
                  
                  {/* Module Card */}
                  <div className={`
                    ml-16 p-6 rounded-xl border transition-all duration-300
                    ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}
                    hover:shadow-lg hover:-translate-y-1
                  `}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{module.title}</h3>
                          <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-500 text-xs font-medium">
                            Module {moduleIndex + 1}
                          </div>
                        </div>
                        <p className="text-gray-500 mb-2">{module.description}</p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            <span>{module.courses.length} courses</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{module.duration}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4" />
                            <span>{module.completed}/{module.courses.length} completed</span>
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => toggleModule(module.id)}
                        className="p-2 hover:bg-gray-700/50 rounded-lg"
                        aria-label={expandedModules[module.id] ? "Collapse module" : "Expand module"}
                      >
                        <ChevronRight className={`w-5 h-5 transition-transform ${expandedModules[module.id] ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Module Progress</span>
                        <span>{Math.round((module.completed / module.courses.length) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-1000"
                          style={{ width: `${(module.completed / module.courses.length) * 100}%` }}
                        />
                      </div>
                    </div>
                    
                    {/* Courses (Expanded) */}
                    {expandedModules[module.id] && (
                      <div className="mt-4 space-y-3">
                        {module.courses.map((course, courseIndex) => (
                          <div
                            key={course.id}
                            onClick={() => {
                              setSelectedCourse(course);
                              if (onSelectCourse) onSelectCourse(course);
                            }}
                            className={`
                              p-4 rounded-lg border cursor-pointer transition-all duration-200
                              ${course.completed 
                                ? 'bg-green-500/10 border-green-500/20' 
                                : theme === 'dark' 
                                  ? 'bg-gray-700/50 border-gray-600 hover:border-gray-500' 
                                  : 'bg-gray-100 border-gray-200 hover:border-gray-300'
                              }
                              hover:shadow-md hover:-translate-y-1
                              ${selectedCourse?.id === course.id ? 'ring-2 ring-blue-500' : ''}
                            `}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={`
                                  w-8 h-8 rounded-lg flex items-center justify-center
                                  ${getCourseTypeColor(course.type)}
                                `}>
                                  {course.type === 'project' ? <Award className="w-4 h-4" /> : 
                                   course.type === 'quiz' ? <Zap className="w-4 h-4" /> : 
                                   <BookOpen className="w-4 h-4" />}
                                </div>
                                
                                <div>
                                  <div className="font-medium">{course.title}</div>
                                  <div className="text-sm text-gray-500">{course.duration}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                {course.completed ? (
                                  <div className="flex items-center gap-1 text-green-500">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="text-sm">Completed</span>
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (onToggleComplete) onToggleComplete(course.id);
                                      }}
                                      className="p-2 hover:bg-gray-700/50 rounded-lg"
                                      aria-label="Mark as complete"
                                    >
                                      <CheckCircle className="w-5 h-5 text-gray-500" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        if (onSelectCourse) onSelectCourse(course);
                                      }}
                                      className="p-2 hover:bg-gray-700/50 rounded-lg"
                                      aria-label="Start course"
                                    >
                                      <PlayCircle className="w-5 h-5" />
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* End Node */}
            <div className="relative mt-8">
              <div className="absolute left-6 -translate-x-1/2">
                <div className="w-5 h-5 rounded-full bg-gradient-to-r from-pink-500 to-red-500 border-4 border-pink-300" />
              </div>
              <div className="ml-16 p-6 rounded-xl bg-gradient-to-r from-pink-500/10 to-red-500/10 border border-pink-500/20">
                <div className="flex items-center gap-3">
                  <Flag className="w-6 h-6 text-pink-500" />
                  <div>
                    <h3 className="font-bold">Path Completion</h3>
                    <p className="text-gray-500">Earn your certificate upon completing all modules</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-4">
            {samplePath.modules.map((module) => (
              <div key={module.id} className="border rounded-lg overflow-hidden">
                <div className={`
                  p-4 font-medium flex items-center justify-between
                  ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}
                `}>
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5" />
                    <span>{module.title}</span>
                  </div>
                  <div className="text-sm text-gray-500">
                    {module.completed}/{module.courses.length} completed
                  </div>
                </div>
                <div className="p-4">
                  {module.courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center justify-between p-3 hover:bg-gray-700/30 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {course.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-gray-500" />
                        )}
                        <span>{course.title}</span>
                      </div>
                      <div className="text-sm text-gray-500">{course.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {samplePath.modules.flatMap(module => 
              module.courses.map(course => (
                <div
                  key={course.id}
                  className={`
                    p-4 rounded-lg border
                    ${course.completed 
                      ? 'bg-green-500/10 border-green-500/20' 
                      : theme === 'dark' 
                        ? 'bg-gray-700/30 border-gray-600' 
                        : 'bg-gray-50 border-gray-200'
                    }
                  `}
                >
                  <div className="font-medium mb-2">{course.title}</div>
                  <div className="text-sm text-gray-500 mb-3">{course.duration}</div>
                  <div className="text-xs text-gray-500">{module.title}</div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Skills & Outcomes */}
      <div className="p-6 border-t dark:border-gray-700">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Skills You'll Gain
            </h3>
            <div className="flex flex-wrap gap-2">
              {samplePath.skills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-2 rounded-lg bg-gray-700/50 border border-gray-600"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Learning Outcomes
            </h3>
            <ul className="space-y-2">
              {samplePath.outcomes.map((outcome, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;
