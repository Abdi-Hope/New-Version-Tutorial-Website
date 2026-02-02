import React, { createContext, useContext, useReducer, useEffect } from 'react';

const EnrollmentContext = createContext();

const enrollmentReducer = (state, action) => {
  switch (action.type) {
    case 'ENROLL_COURSE':
      if (state.enrolledCourses.some(course => course.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        enrolledCourses: [...state.enrolledCourses, action.payload]
      };
      
    case 'UNENROLL_COURSE':
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.filter(
          course => course.id !== action.payload
        )
      };
      
    case 'UPDATE_PROGRESS':
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.map(course =>
          course.id === action.payload.courseId
            ? {
                ...course,
                progress: action.payload.progress,
                completedLessons: action.payload.completedLessons,
                lastAccessed: action.payload.lastAccessed
              }
            : course
        )
      };
      
    case 'MARK_COMPLETE':
      return {
        ...state,
        enrolledCourses: state.enrolledCourses.map(course =>
          course.id === action.payload.courseId
            ? {
                ...course,
                completed: true,
                completedDate: new Date().toISOString(),
                progress: 100
              }
            : course
        )
      };
      
    case 'LOAD_ENROLLMENTS':
      return { ...state, enrolledCourses: action.payload };
      
    default:
      return state;
  }
};

export const EnrollmentProvider = ({ children }) => {
  const [enrollmentState, dispatch] = useReducer(enrollmentReducer, {
    enrolledCourses: []
  });

  // Load enrollments from localStorage
  useEffect(() => {
    const savedEnrollments = localStorage.getItem('eLearningEnrollments');
    if (savedEnrollments) {
      dispatch({ type: 'LOAD_ENROLLMENTS', payload: JSON.parse(savedEnrollments) });
    }
  }, []);

  // Save enrollments to localStorage
  useEffect(() => {
    localStorage.setItem('eLearningEnrollments', JSON.stringify(enrollmentState.enrolledCourses));
  }, [enrollmentState.enrolledCourses]);

  const enrollCourse = (course) => {
    dispatch({
      type: 'ENROLL_COURSE',
      payload: {
        id: course.id,
        title: course.title,
        instructor: course.instructor,
        thumbnail: course.thumbnail,
        totalLessons: course.lessons || 0,
        totalDuration: course.duration,
        enrolledDate: new Date().toISOString(),
        progress: 0,
        completedLessons: [],
        completed: false,
        category: course.category,
        level: course.level
      }
    });
  };

  const unenrollCourse = (courseId) => {
    dispatch({ type: 'UNENROLL_COURSE', payload: courseId });
  };

  const updateCourseProgress = (courseId, lessonId, completed = true) => {
    const course = enrollmentState.enrolledCourses.find(c => c.id === courseId);
    
    if (!course) return;

    let completedLessons = [...(course.completedLessons || [])];
    
    if (completed && !completedLessons.includes(lessonId)) {
      completedLessons.push(lessonId);
    } else if (!completed) {
      completedLessons = completedLessons.filter(id => id !== lessonId);
    }

    const progress = course.totalLessons > 0 
      ? Math.round((completedLessons.length / course.totalLessons) * 100)
      : 0;

    dispatch({
      type: 'UPDATE_PROGRESS',
      payload: {
        courseId,
        progress,
        completedLessons,
        lastAccessed: new Date().toISOString()
      }
    });

    // Mark as complete if all lessons are completed
    if (progress === 100 && !course.completed) {
      dispatch({
        type: 'MARK_COMPLETE',
        payload: { courseId }
      });
    }
  };

  const markCourseComplete = (courseId) => {
    dispatch({
      type: 'MARK_COMPLETE',
      payload: { courseId }
    });
  };

  const isEnrolled = (courseId) => {
    return enrollmentState.enrolledCourses.some(course => course.id === courseId);
  };

  const getEnrolledCourse = (courseId) => {
    return enrollmentState.enrolledCourses.find(course => course.id === courseId);
  };

  const getCompletedCourses = () => {
    return enrollmentState.enrolledCourses.filter(course => course.completed);
  };

  const getInProgressCourses = () => {
    return enrollmentState.enrolledCourses.filter(
      course => !course.completed && course.progress > 0
    );
  };

  const getEnrollmentCount = () => {
    return enrollmentState.enrolledCourses.length;
  };

  const getTotalLearningHours = () => {
    return enrollmentState.enrolledCourses.reduce((total, course) => {
      const durationMatch = course.totalDuration?.match(/(\d+)/);
      const hours = durationMatch ? parseInt(durationMatch[1]) : 0;
      return total + hours;
    }, 0);
  };

  const value = {
    enrolledCourses: enrollmentState.enrolledCourses,
    enrollCourse,
    unenrollCourse,
    updateCourseProgress,
    markCourseComplete,
    isEnrolled,
    getEnrolledCourse,
    getCompletedCourses,
    getInProgressCourses,
    getEnrollmentCount,
    getTotalLearningHours
  };

  return (
    <EnrollmentContext.Provider value={value}>
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => {
  const context = useContext(EnrollmentContext);
  if (!context) {
    throw new Error('useEnrollment must be used within an EnrollmentProvider');
  }
  return context;
};
export default EnrollmentContext;