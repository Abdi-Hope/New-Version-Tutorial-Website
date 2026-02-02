import React, { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Maximize, Settings, BookOpen, Clock, CheckCircle } from 'lucide-react';

const CoursePlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration] = useState(3600); // 1 hour in seconds
  const [volume, setVolume] = useState(80);
  const [activeChapter, setActiveChapter] = useState(1);

  const chapters = [
    {
      id: 1,
      title: 'React Fundamentals',
      description: 'Learn the basics of React components and JSX',
      duration: '2h 15m',
      stats: {
        lessons: 5,
        completed: 3,
      },
      lessonList: [
        { id: '1-1', title: 'Introduction to React', duration: '15:30', type: 'video', completed: true },
        { id: '1-2', title: 'JSX Syntax', duration: '22:45', type: 'video', completed: true },
        { id: '1-3', title: 'Components & Props', duration: '30:15', type: 'video', completed: true },
        { id: '1-4', title: 'State & Lifecycle', duration: '35:20', type: 'video', completed: false },
        { id: '1-5', title: 'Handling Events', duration: '25:40', type: 'video', completed: false },
      ],
    },
    {
      id: 2,
      title: 'React Hooks',
      description: 'Master modern React hooks for state and side effects',
      duration: '3h 30m',
      stats: {
        lessons: 6,
        completed: 2,
      },
      lessonList: [
        { id: '2-1', title: 'useState Hook', duration: '25:15', type: 'video', completed: true },
        { id: '2-2', title: 'useEffect Hook', duration: '32:40', type: 'video', completed: true },
        { id: '2-3', title: 'Custom Hooks', duration: '40:25', type: 'video', completed: false },
        { id: '2-4', title: 'useContext Hook', duration: '35:50', type: 'video', completed: false },
        { id: '2-5', title: 'useReducer Hook', duration: '38:15', type: 'video', completed: false },
        { id: '2-6', title: 'Hook Rules & Best Practices', duration: '28:30', type: 'reading', completed: false },
      ],
    },
    {
      id: 3,
      title: 'Advanced Patterns',
      description: 'Learn advanced React patterns and optimization techniques',
      duration: '4h 20m',
      stats: {
        lessons: 7,
        completed: 0,
      },
      lessonList: [
        { id: '3-1', title: 'Higher-Order Components', duration: '30:25', type: 'video', completed: false },
        { id: '3-2', title: 'Render Props', duration: '35:40', type: 'video', completed: false },
        { id: '3-3', title: 'React.memo & useMemo', duration: '42:15', type: 'video', completed: false },
        { id: '3-4', title: 'Code Splitting', duration: '38:50', type: 'video', completed: false },
        { id: '3-5', title: 'Error Boundaries', duration: '28:30', type: 'video', completed: false },
        { id: '3-6', title: 'Performance Optimization', duration: '45:20', type: 'video', completed: false },
        { id: '3-7', title: 'Portals & Refs', duration: '33:45', type: 'reading', completed: false },
      ],
    },
  ];

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTimeChange = (e) => {
    setCurrentTime(parseInt(e.target.value));
  };

  const handleVolumeChange = (e) => {
    setVolume(parseInt(e.target.value));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleChapterClick = (chapterId) => {
    setActiveChapter(chapterId);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Advanced React Masterclass
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-300">
            <div className="flex items-center space-x-1">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm">12 Chapters</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span className="text-sm">15h 30m Total</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-sm">5/12 Completed</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-black rounded-xl overflow-hidden">
              {/* Video Placeholder */}
              <div className="aspect-video bg-gray-800 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="text-white text-4xl mb-4">🎬</div>
                  <p className="text-white/80">Video Player</p>
                </div>
                
                {/* Play Button Overlay */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {isPlaying ? (
                    <Pause className="w-16 h-16 text-white/90" />
                  ) : (
                    <Play className="w-16 h-16 text-white/90" />
                  )}
                </button>
              </div>

              {/* Player Controls */}
              <div className="bg-gray-900 p-4">
                {/* Progress Bar */}
                <div className="mb-4">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleTimeChange}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                  />
                  <div className="flex justify-between text-sm text-gray-400 mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <SkipBack className="w-5 h-5" />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 text-white" />
                      ) : (
                        <Play className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <SkipForward className="w-5 h-5" />
                    </button>
                    
                    {/* Volume Control */}
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-5 h-5 text-gray-400" />
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Chapter Info */}
            <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-xl">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {chapters.find(c => c.id === activeChapter)?.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {chapters.find(c => c.id === activeChapter)?.description}
              </p>
              <div className="flex items-center space-x-4 text-sm">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full">
                  {chapters.find(c => c.id === activeChapter)?.stats.completed}/{chapters.find(c => c.id === activeChapter)?.stats.lessons} lessons
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {chapters.find(c => c.id === activeChapter)?.duration}
                </span>
              </div>
            </div>
          </div>

          {/* Chapters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Course Chapters
              </h3>
              
              <div className="space-y-3">
                {chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className={`p-4 rounded-lg cursor-pointer transition-all ${
                      activeChapter === chapter.id
                        ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                        : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleChapterClick(chapter.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activeChapter === chapter.id
                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                        }`}>
                          {chapter.id}
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          {chapter.title}
                        </h4>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {chapter.duration}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {chapter.description}
                    </p>
                    
                    {/* Lessons Preview */}
                    <div className="space-y-2">
                      {chapter.lessonList.slice(0, 2).map((lesson) => (
                        <div key={lesson.id} className="flex items-center justify-between text-sm">
                          <div className="flex items-center space-x-2">
                            {lesson.completed ? (
                              <CheckCircle className="w-4 h-4 text-green-500" />
                            ) : (
                              <div className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"></div>
                            )}
                            <span className={`${lesson.completed ? 'text-gray-500 dark:text-gray-400 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                              {lesson.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {lesson.duration}
                          </span>
                        </div>
                      ))}
                      {chapter.lessonList.length > 2 && (
                        <div className="text-xs text-blue-600 dark:text-blue-400 pl-6">
                          +{chapter.lessonList.length - 2} more lessons
                        </div>
                      )}
                    </div>
                    
                    {/* Progress */}
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-500 dark:text-gray-400">
                          Progress: {chapter.stats.completed}/{chapter.stats.lessons}
                        </span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {Math.round((chapter.stats.completed / chapter.stats.lessons) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                          className="bg-green-500 h-1.5 rounded-full"
                          style={{ width: `${(chapter.stats.completed / chapter.stats.lessons) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Course Stats */}
              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Course Progress
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">42%</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Overall</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">5</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">7</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Remaining</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;