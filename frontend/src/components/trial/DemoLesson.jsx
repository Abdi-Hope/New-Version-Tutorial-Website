import React, { useState } from 'react';
import {
  Play, Pause, Maximize2, Volume2, VolumeX,
  BookOpen, CheckCircle, Lock, Clock, Download,
  Star, Share2, Bookmark, ChevronRight, Info
} from 'lucide-react';

const DemoLesson = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const lessons = [
    { id: 1, title: 'Introduction to React', duration: '5:30', locked: false },
    { id: 2, title: 'JSX Fundamentals', duration: '8:15', locked: false },
    { id: 3, title: 'Components & Props', duration: '12:45', locked: true },
    { id: 4, title: 'State & Lifecycle', duration: '15:20', locked: true },
    { id: 5, title: 'Handling Events', duration: '10:10', locked: true },
    { id: 6, title: 'Conditional Rendering', duration: '7:30', locked: true },
  ];

  const features = [
    'Full course access',
    'Downloadable resources',
    'Certificate of completion',
    'Community support',
    'Lifetime updates',
    'Mobile app access'
  ];

  const transcript = [
    { time: '0:00', text: 'Welcome to this demo lesson on React fundamentals.' },
    { time: '0:30', text: 'Today we will learn about the basics of React components.' },
    { time: '1:15', text: 'React is a JavaScript library for building user interfaces.' },
    { time: '2:30', text: 'It allows you to create reusable UI components.' },
    { time: '3:45', text: 'Each component manages its own state and renders UI.' },
    { time: '4:20', text: 'This is just the beginning of what you can learn!' },
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const value = parseFloat(e.target.value);
    setCurrentTime(value);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // In a real app, you would use the Fullscreen API
    if (!isFullscreen) {
      alert('Entering fullscreen mode');
    }
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <div className="bg-black rounded-xl overflow-hidden shadow-lg mb-4">
              <div className="relative aspect-video">
                {/* Video Placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <p className="text-white text-lg font-medium">React Fundamentals Demo</p>
                    <p className="text-gray-300">Watch this preview lesson</p>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={handlePlayPause}
                        className="p-2 bg-white/20 hover:bg-white/30 text-white rounded-full"
                      >
                        {isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </button>
                      
                      <span className="text-white text-sm font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 hover:bg-white/20 text-white rounded"
                      >
                        {isMuted ? (
                          <VolumeX className="w-5 h-5" />
                        ) : (
                          <Volume2 className="w-5 h-5" />
                        )}
                      </button>
                      
                      <button
                        onClick={() => setShowTranscript(!showTranscript)}
                        className="p-2 hover:bg-white/20 text-white rounded"
                      >
                        <BookOpen className="w-5 h-5" />
                      </button>
                      
                      <button
                        onClick={handleFullscreen}
                        className="p-2 hover:bg-white/20 text-white rounded"
                      >
                        <Maximize2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max={duration}
                      value={currentTime}
                      onChange={handleSeek}
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 ${progress}%, #374151 ${progress}%)`
                      }}
                    />
                    <div
                      className="absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-white rounded-full"
                      style={{ left: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Introduction to React - Demo Lesson
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>5:30 min</span>
                    </span>
                    <span>•</span>
                    <span>Part of: Complete React Course</span>
                    <span>•</span>
                    <span className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span>4.9 (1,234 reviews)</span>
                    </span>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <Bookmark className={`w-5 h-5 ${isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-400'}`} />
                </button>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                This is a preview of our React fundamentals course. Learn the basics of React components,
                JSX syntax, and how to build your first React application. This demo lesson covers the
                essential concepts you need to get started.
              </p>
            </div>
          </div>

          {/* Transcript */}
          {showTranscript && (
            <div className="mb-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Lesson Transcript
              </h3>
              
              <div className="space-y-3">
                {transcript.map((line, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-3 hover:bg-white dark:hover:bg-gray-700 rounded-lg cursor-pointer"
                    onClick={() => setCurrentTime(parseInt(line.time.split(':')[0]) * 60)}
                  >
                    <span className="text-blue-600 dark:text-blue-400 font-mono text-sm min-w-[40px]">
                      {line.time}
                    </span>
                    <p className="text-gray-700 dark:text-gray-300">
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Course Features */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              What You Get with Full Access
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Course Lessons */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Course Lessons
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                2/6 unlocked
              </span>
            </div>
            
            <div className="space-y-3">
              {lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={`p-3 rounded-lg border ${
                    lesson.locked
                      ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                      : 'border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        lesson.locked
                          ? 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                          : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      }`}>
                        {lesson.locked ? (
                          <Lock className="w-4 h-4" />
                        ) : lesson.id === 1 ? (
                          <Play className="w-4 h-4" />
                        ) : (
                          <CheckCircle className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <h4 className={`font-medium ${
                          lesson.locked
                            ? 'text-gray-500 dark:text-gray-400'
                            : 'text-gray-900 dark:text-white'
                        }`}>
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {lesson.duration}
                        </p>
                      </div>
                    </div>
                    
                    {!lesson.locked && (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                  Demo Limitations
                </p>
              </div>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                This demo gives you access to the first 2 lessons. Upgrade to unlock all 6 lessons
                and full course features.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
            <h3 className="text-xl font-bold mb-2">
              Ready to Continue Learning?
            </h3>
            <p className="text-blue-100 mb-6">
              Upgrade now to get full access to this course and 100+ other courses.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">$89</span>
                <span className="text-blue-200 ml-2">one-time payment</span>
              </div>
              
              <div className="space-y-3">
                <button className="w-full py-3 bg-white text-blue-600 rounded-lg font-bold hover:bg-blue-50 transition-colors">
                  Upgrade to Full Course
                </button>
                
                <button className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white rounded-lg font-medium">
                  Start Free Trial (7 Days)
                </button>
              </div>
              
              <div className="text-center text-blue-200 text-sm">
                <p>30-day money-back guarantee</p>
                <p className="mt-1">Join 10,000+ satisfied students</p>
              </div>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Share This Demo
            </h3>
            
            <div className="flex items-center space-x-3">
              <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                <Share2 className="w-5 h-5 inline mr-2" />
                Share
              </button>
              
              <button className="flex-1 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium">
                <Download className="w-5 h-5 inline mr-2" />
                Save
              </button>
            </div>
            
            <div className="mt-4 pt-4 border-t dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Help others discover this course
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoLesson;
