import React, { createContext, useContext, useReducer, useEffect } from 'react';

const ProgressContext = createContext();

const progressReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_LESSON_PROGRESS':
      const existingCourseIndex = state.coursesProgress.findIndex(
        cp => cp.courseId === action.payload.courseId
      );

      if (existingCourseIndex >= 0) {
        const updatedCourses = [...state.coursesProgress];
        const existingCourse = updatedCourses[existingCourseIndex];
        
        // Check if lesson already exists in completedLessons
        const lessonExists = existingCourse.completedLessons.includes(
          action.payload.lessonId
        );

        let updatedLessons;
        if (action.payload.completed && !lessonExists) {
          updatedLessons = [...existingCourse.completedLessons, action.payload.lessonId];
        } else if (!action.payload.completed && lessonExists) {
          updatedLessons = existingCourse.completedLessons.filter(
            id => id !== action.payload.lessonId
          );
        } else {
          updatedLessons = existingCourse.completedLessons;
        }

        const progress = existingCourse.totalLessons > 0
          ? Math.round((updatedLessons.length / existingCourse.totalLessons) * 100)
          : 0;

        updatedCourses[existingCourseIndex] = {
          ...existingCourse,
          completedLessons: updatedLessons,
          progress,
          lastUpdated: new Date().toISOString(),
          completed: progress === 100
        };

        return { ...state, coursesProgress: updatedCourses };
      }
      
      return state;
      
    case 'INIT_COURSE_PROGRESS':
      if (state.coursesProgress.some(cp => cp.courseId === action.payload.courseId)) {
        return state;
      }
      
      return {
        ...state,
        coursesProgress: [
          ...state.coursesProgress,
          {
            courseId: action.payload.courseId,
            courseTitle: action.payload.courseTitle,
            totalLessons: action.payload.totalLessons,
            completedLessons: [],
            progress: 0,
            startedDate: new Date().toISOString(),
            lastUpdated: new Date().toISOString(),
            completed: false
          }
        ]
      };
      
    case 'UPDATE_COURSE_PROGRESS':
      return {
        ...state,
        coursesProgress: state.coursesProgress.map(cp =>
          cp.courseId === action.payload.courseId
            ? {
                ...cp,
                progress: action.payload.progress,
                completedLessons: action.payload.completedLessons,
                completed: action.payload.progress === 100,
                lastUpdated: new Date().toISOString()
              }
            : cp
        )
      };
      
    case 'LOAD_PROGRESS':
      return { ...state, coursesProgress: action.payload };
      
    case 'RESET_COURSE_PROGRESS':
      return {
        ...state,
        coursesProgress: state.coursesProgress.map(cp =>
          cp.courseId === action.payload
            ? {
                ...cp,
                completedLessons: [],
                progress: 0,
                completed: false,
                lastUpdated: new Date().toISOString()
              }
            : cp
        )
      };
      
    default:
      return state;
  }
};

export const ProgressProvider = ({ children }) => {
  const [progressState, dispatch] = useReducer(progressReducer, {
    coursesProgress: []
  });

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('eLearningProgress');
    if (savedProgress) {
      dispatch({ type: 'LOAD_PROGRESS', payload: JSON.parse(savedProgress) });
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('eLearningProgress', JSON.stringify(progressState.coursesProgress));
  }, [progressState.coursesProgress]);

  const initCourseProgress = (courseId, courseTitle, totalLessons) => {
    dispatch({
      type: 'INIT_COURSE_PROGRESS',
      payload: { courseId, courseTitle, totalLessons }
    });
  };

  const updateLessonProgress = (courseId, lessonId, completed = true) => {
    dispatch({
      type: 'UPDATE_LESSON_PROGRESS',
      payload: { courseId, lessonId, completed }
    });
  };

  const updateCourseProgress = (courseId, progress, completedLessons) => {
    dispatch({
      type: 'UPDATE_COURSE_PROGRESS',
      payload: { courseId, progress, completedLessons }
    });
  };

  const resetCourseProgress = (courseId) => {
    dispatch({ type: 'RESET_COURSE_PROGRESS', payload: courseId });
  };

  const getCourseProgress = (courseId) => {
    return progressState.coursesProgress.find(
      cp => cp.courseId === courseId
    ) || null;
  };

  const getOverallProgress = () => {
    if (progressState.coursesProgress.length === 0) return 0;
    
    const totalProgress = progressState.coursesProgress.reduce(
      (sum, course) => sum + course.progress, 0
    );
    
    return Math.round(totalProgress / progressState.coursesProgress.length);
  };

  const getCompletedCoursesCount = () => {
    return progressState.coursesProgress.filter(course => course.completed).length;
  };

  const getTotalLessonsCompleted = () => {
    return progressState.coursesProgress.reduce(
      (total, course) => total + course.completedLessons.length, 0
    );
  };

  const getLearningStreak = () => {
    // Simple streak calculation based on lastUpdated dates
    const today = new Date();
    const lastSevenDays = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      return date.toDateString();
    });

    const activeDates = progressState.coursesProgress
      .map(course => new Date(course.lastUpdated).toDateString())
      .filter(date => lastSevenDays.includes(date));

    return new Set(activeDates).size; // Unique days in last 7 days
  };

  const getRecentActivity = (limit = 10) => {
    return [...progressState.coursesProgress]
      .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
      .slice(0, limit);
  };

  const value = {
    coursesProgress: progressState.coursesProgress,
    initCourseProgress,
    updateLessonProgress,
    updateCourseProgress,
    resetCourseProgress,
    getCourseProgress,
    getOverallProgress,
    getCompletedCoursesCount,
    getTotalLessonsCompleted,
    getLearningStreak,
    getRecentActivity
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

export default ProgressContext;