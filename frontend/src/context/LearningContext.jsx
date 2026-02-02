import React, { createContext, useState, useContext, useEffect } from 'react';

const LearningContext = createContext();

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) {
    throw new Error('useLearning must be used within a LearningProvider');
  }
  return context;
};

export const LearningProvider = ({ children }) => {
  const [currentCourse, setCurrentCourse] = useState(null);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [progress, setProgress] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState({});
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [videoQuality, setVideoQuality] = useState('1080p');
  const [showCaptions, setShowCaptions] = useState(true);
  const [studyTime, setStudyTime] = useState(0);
  const [streak, setStreak] = useState(0);
  const [achievements, setAchievements] = useState([]);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('learningProgress');
    const savedBookmarks = localStorage.getItem('learningBookmarks');
    const savedNotes = localStorage.getItem('learningNotes');
    
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('learningProgress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('learningBookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('learningNotes', JSON.stringify(notes));
  }, [notes]);

  const updateProgress = (courseId, lessonId, completed = true, timestamp = Date.now()) => {
    setProgress(prev => ({
      ...prev,
      [courseId]: {
        ...prev[courseId],
        [lessonId]: {
          completed,
          timestamp,
          lastPosition: 0 // You can add video position tracking here
        }
      }
    }));

    // Update study time (mock implementation)
    setStudyTime(prev => prev + 30); // Add 30 minutes per completed lesson
    
    // Update streak (mock implementation)
    const today = new Date().toDateString();
    const lastStudyDate = localStorage.getItem('lastStudyDate');
    if (lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      if (lastStudyDate === yesterday.toDateString()) {
        setStreak(prev => prev + 1);
      } else {
        setStreak(1);
      }
      localStorage.setItem('lastStudyDate', today);
    }
  };

  const toggleBookmark = (courseId, lessonId, note = '') => {
    const bookmarkKey = `${courseId}-${lessonId}`;
    setBookmarks(prev => {
      if (prev.includes(bookmarkKey)) {
        return prev.filter(key => key !== bookmarkKey);
      } else {
        return [...prev, bookmarkKey];
      }
    });

    // If note provided, save it
    if (note) {
      addNote(courseId, lessonId, note);
    }
  };

  const addNote = (courseId, lessonId, content) => {
    const noteKey = `${courseId}-${lessonId}`;
    setNotes(prev => ({
      ...prev,
      [noteKey]: {
        ...prev[noteKey],
        content,
        timestamp: Date.now(),
        updatedAt: Date.now()
      }
    }));
  };

  const getCourseProgress = (courseId) => {
    const courseProgress = progress[courseId] || {};
    const lessons = Object.keys(courseProgress);
    const completedLessons = lessons.filter(lessonId => courseProgress[lessonId]?.completed);
    
    return {
      total: lessons.length,
      completed: completedLessons.length,
      percentage: lessons.length > 0 ? (completedLessons.length / lessons.length) * 100 : 0,
      lastStudied: lessons.length > 0 ? 
        Math.max(...lessons.map(l => courseProgress[l]?.timestamp || 0)) : 0
    };
  };

  const getLessonNotes = (courseId, lessonId) => {
    const noteKey = `${courseId}-${lessonId}`;
    return notes[noteKey] || null;
  };

  const isBookmarked = (courseId, lessonId) => {
    const bookmarkKey = `${courseId}-${lessonId}`;
    return bookmarks.includes(bookmarkKey);
  };

  const isLessonCompleted = (courseId, lessonId) => {
    return progress[courseId]?.[lessonId]?.completed || false;
  };

  const resetCourseProgress = (courseId) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[courseId];
      return newProgress;
    });
  };

  const getStudyStats = () => {
    const totalCourses = Object.keys(progress).length;
    const totalLessons = Object.values(progress).reduce((acc, course) => 
      acc + Object.keys(course).length, 0);
    const completedLessons = Object.values(progress).reduce((acc, course) => 
      acc + Object.values(course).filter(lesson => lesson.completed).length, 0);

    return {
      totalCourses,
      totalLessons,
      completedLessons,
      studyTime, // in minutes
      streak,
      completionRate: totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0
    };
  };

  const value = {
    currentCourse,
    setCurrentCourse,
    currentLesson,
    setCurrentLesson,
    progress,
    updateProgress,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    notes,
    addNote,
    getLessonNotes,
    playbackSpeed,
    setPlaybackSpeed,
    videoQuality,
    setVideoQuality,
    showCaptions,
    setShowCaptions,
    getCourseProgress,
    isLessonCompleted,
    resetCourseProgress,
    getStudyStats,
    studyTime,
    streak,
    achievements
  };

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
};

export default LearningContext;
