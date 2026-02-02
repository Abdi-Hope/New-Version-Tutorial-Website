import React, { createContext, useContext, useReducer, useState, useEffect, useRef } from 'react';

const PlayerContext = createContext();

const playerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LESSON':
      return {
        ...state,
        currentLesson: action.payload.lesson,
        currentCourseId: action.payload.courseId,
        isPlaying: true,
        lastPosition: 0
      };
      
    case 'PLAY':
      return { ...state, isPlaying: true };
      
    case 'PAUSE':
      return { ...state, isPlaying: false };
      
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying };
      
    case 'SET_VOLUME':
      return { ...state, volume: Math.max(0, Math.min(1, action.payload)) };
      
    case 'SET_PLAYBACK_RATE':
      return { ...state, playbackRate: action.payload };
      
    case 'SET_CURRENT_TIME':
      return { ...state, currentTime: action.payload };
      
    case 'SET_DURATION':
      return { ...state, duration: action.payload };
      
    case 'SET_LAST_POSITION':
      return { ...state, lastPosition: action.payload };
      
    case 'TOGGLE_MUTE':
      return { ...state, isMuted: !state.isMuted };
      
    case 'TOGGLE_FULLSCREEN':
      return { ...state, isFullscreen: !state.isFullscreen };
      
    case 'SET_QUALITY':
      return { ...state, quality: action.payload };
      
    case 'SET_SUBTITLES':
      return { ...state, subtitlesEnabled: action.payload };
      
    case 'NEXT_LESSON':
      return {
        ...state,
        currentLesson: action.payload.nextLesson,
        lastPosition: 0,
        currentTime: 0
      };
      
    case 'PREVIOUS_LESSON':
      return {
        ...state,
        currentLesson: action.payload.prevLesson,
        lastPosition: 0,
        currentTime: 0
      };
      
    case 'RESET_PLAYER':
      return {
        ...state,
        currentLesson: null,
        currentCourseId: null,
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        lastPosition: 0
      };
      
    default:
      return state;
  }
};

export const PlayerProvider = ({ children }) => {
  const [playerState, dispatch] = useReducer(playerReducer, {
    currentLesson: null,
    currentCourseId: null,
    isPlaying: false,
    isMuted: false,
    isFullscreen: false,
    volume: 1,
    playbackRate: 1,
    currentTime: 0,
    duration: 0,
    lastPosition: 0,
    quality: 'auto',
    subtitlesEnabled: false,
    playerRef: null
  });

  const [playerHistory, setPlayerHistory] = useState([]);
  const videoRef = useRef(null);

  // Save playback position to localStorage
  useEffect(() => {
    if (playerState.currentLesson && playerState.currentTime > 0) {
      const saveData = {
        courseId: playerState.currentCourseId,
        lessonId: playerState.currentLesson.id,
        position: playerState.currentTime,
        timestamp: new Date().toISOString()
      };
      
      // Update history
      setPlayerHistory(prev => {
        const filtered = prev.filter(
          item => !(item.courseId === saveData.courseId && item.lessonId === saveData.lessonId)
        );
        return [saveData, ...filtered].slice(0, 50); // Keep last 50 entries
      });
      
      // Save to localStorage
      localStorage.setItem(
        `player_${playerState.currentCourseId}_${playerState.currentLesson.id}`,
        JSON.stringify(saveData)
      );
    }
  }, [playerState.currentTime, playerState.currentLesson, playerState.currentCourseId]);

  // Load saved position for current lesson
  useEffect(() => {
    if (playerState.currentLesson && playerState.currentCourseId) {
      const savedData = localStorage.getItem(
        `player_${playerState.currentCourseId}_${playerState.currentLesson.id}`
      );
      
      if (savedData) {
        const { position } = JSON.parse(savedData);
        dispatch({ type: 'SET_LAST_POSITION', payload: position });
      }
    }
  }, [playerState.currentLesson, playerState.currentCourseId]);

  const setCurrentLesson = (lesson, courseId) => {
    dispatch({
      type: 'SET_CURRENT_LESSON',
      payload: { lesson, courseId }
    });
    
    // Add to recent lessons
    const recentLessons = JSON.parse(localStorage.getItem('recentLessons') || '[]');
    const newEntry = {
      lessonId: lesson.id,
      courseId,
      title: lesson.title,
      thumbnail: lesson.thumbnail,
      timestamp: new Date().toISOString()
    };
    
    const filtered = recentLessons.filter(
      item => !(item.courseId === courseId && item.lessonId === lesson.id)
    );
    localStorage.setItem('recentLessons', JSON.stringify([newEntry, ...filtered].slice(0, 20)));
  };

  const play = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
    dispatch({ type: 'PLAY' });
  };

  const pause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    dispatch({ type: 'PAUSE' });
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (playerState.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    dispatch({ type: 'TOGGLE_PLAY' });
  };

  const setVolume = (volume) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;
    }
    dispatch({ type: 'SET_VOLUME', payload: volume });
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !playerState.isMuted;
    }
    dispatch({ type: 'TOGGLE_MUTE' });
  };

  const setPlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
    }
    dispatch({ type: 'SET_PLAYBACK_RATE', payload: rate });
  };

  const setCurrentTime = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
    dispatch({ type: 'SET_CURRENT_TIME', payload: time });
  };

  const seek = (time) => {
    setCurrentTime(time);
  };

  const toggleFullscreen = () => {
    const element = videoRef.current;
    if (!element) return;

    if (!playerState.isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    
    dispatch({ type: 'TOGGLE_FULLSCREEN' });
  };

  const nextLesson = (lessons) => {
    if (!playerState.currentLesson || !lessons) return null;
    
    const currentIndex = lessons.findIndex(
      lesson => lesson.id === playerState.currentLesson.id
    );
    
    if (currentIndex < lessons.length - 1) {
      const nextLesson = lessons[currentIndex + 1];
      dispatch({
        type: 'NEXT_LESSON',
        payload: { nextLesson }
      });
      return nextLesson;
    }
    return null;
  };

  const previousLesson = (lessons) => {
    if (!playerState.currentLesson || !lessons) return null;
    
    const currentIndex = lessons.findIndex(
      lesson => lesson.id === playerState.currentLesson.id
    );
    
    if (currentIndex > 0) {
      const prevLesson = lessons[currentIndex - 1];
      dispatch({
        type: 'PREVIOUS_LESSON',
        payload: { prevLesson }
      });
      return prevLesson;
    }
    return null;
  };

  const resetPlayer = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    dispatch({ type: 'RESET_PLAYER' });
  };

  const getSavedPosition = (courseId, lessonId) => {
    const savedData = localStorage.getItem(`player_${courseId}_${lessonId}`);
    return savedData ? JSON.parse(savedData).position : 0;
  };

  const getRecentLessons = () => {
    return JSON.parse(localStorage.getItem('recentLessons') || '[]');
  };

  const clearHistory = () => {
    setPlayerHistory([]);
    // Clear all saved positions
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('player_')) {
        localStorage.removeItem(key);
      }
    });
    localStorage.removeItem('recentLessons');
  };

  const value = {
    ...playerState,
    playerRef: videoRef,
    playerHistory,
    setCurrentLesson,
    play,
    pause,
    togglePlay,
    setVolume,
    toggleMute,
    setPlaybackRate,
    setCurrentTime,
    seek,
    toggleFullscreen,
    nextLesson,
    previousLesson,
    resetPlayer,
    getSavedPosition,
    getRecentLessons,
    clearHistory
  };

  return (
    <PlayerContext.Provider value={value}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
export default PlayerContext;

