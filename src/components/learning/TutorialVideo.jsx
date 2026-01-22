import React, { useState, useRef, useEffect } from "react";

const TutorialVideo = ({ videoUrl, title, description }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [showVolume, setShowVolume] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const videoRef = useRef(null);

  // Cleanup effect
  useEffect(() => {
    const videoElement = videoRef.current;
    
    return () => {
      if (videoElement) {
        videoElement.pause();
        videoElement.src = "";
        videoElement.load();
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    
    try {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        const playPromise = videoRef.current.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
            })
            .catch((error) => {
              console.log("Playback failed:", error);
              setIsPlaying(false);
            });
        }
      }
    } catch (error) {
      console.log("Play/Pause error:", error);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsReady(true);
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
    }
  };

  const handlePlaybackRate = () => {
    if (!videoRef.current) return;
    const rates = [0.5, 0.75, 1, 1.25, 1.5, 2];
    const currentIndex = rates.indexOf(playbackRate);
    const nextIndex = (currentIndex + 1) % rates.length;
    const nextRate = rates[nextIndex];
    
    videoRef.current.playbackRate = nextRate;
    setPlaybackRate(nextRate);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleError = (e) => {
    console.error("Video error:", e);
    setIsPlaying(false);
  };

  const toggleFullscreen = () => {
    const videoContainer = videoRef.current?.parentElement?.parentElement;
    if (!videoContainer) return;

    if (!document.fullscreenElement) {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else if (videoContainer.webkitRequestFullscreen) {
        videoContainer.webkitRequestFullscreen();
      } else if (videoContainer.msRequestFullscreen) {
        videoContainer.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg w-full">
      {/* Video Container */}
      <div className="relative pt-[56.25%] bg-black">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          onError={handleError}
          controls={false}
          preload="metadata"
          src={videoUrl}
          playsInline
          onClick={handlePlayPause}
        />
        
        {/* Play/Pause overlay for mobile */}
        {!isPlaying && (
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={handlePlayPause}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all hover:scale-105">
              <svg className="w-8 h-8 md:w-12 md:h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}
        
        {/* Video Controls - Mobile Optimized */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-2 sm:p-3 md:p-4">
          {/* Progress Bar */}
          <div className="mb-2 sm:mb-3">
            <input
              type="range"
              min="0"
              max={duration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 sm:h-1.5 md:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white sm:[&::-webkit-slider-thumb]:h-4 sm:[&::-webkit-slider-thumb]:w-4 md:[&::-webkit-slider-thumb]:h-5 md:[&::-webkit-slider-thumb]:w-5"
            />
          </div>
          
          {/* Controls Container */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            {/* Left Controls */}
            <div className="flex items-center justify-between sm:justify-start space-x-2 sm:space-x-3 md:space-x-4">
              {/* Play/Pause Button */}
              <button
                onClick={handlePlayPause}
                className="p-1.5 sm:p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              
              {/* Time Display */}
              <div className="text-white text-xs sm:text-sm md:text-base font-medium min-w-[80px] sm:min-w-[100px] text-center">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
              
              {/* Volume Control */}
              <div className="relative">
                <button
                  onClick={() => setShowVolume(!showVolume)}
                  className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Volume"
                >
                  {volume === 0 ? (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
                
                {/* Volume Slider (Desktop: always visible, Mobile: dropdown) */}
                <div className={`${
                  showVolume ? 'flex' : 'hidden'
                } sm:flex absolute bottom-full left-0 sm:relative sm:bottom-auto sm:left-auto items-center space-x-2 bg-black/90 sm:bg-transparent p-2 sm:p-0 rounded-lg sm:rounded-none mb-2 sm:mb-0`}>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-20 sm:w-16 md:w-24 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white sm:[&::-webkit-slider-thumb]:h-3 sm:[&::-webkit-slider-thumb]:w-3"
                  />
                </div>
              </div>
            </div>
            
            {/* Right Controls */}
            <div className="flex items-center justify-end space-x-2 sm:space-x-3">
              {/* Playback Speed */}
              <button
                onClick={handlePlaybackRate}
                className="px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                aria-label="Playback speed"
              >
                {playbackRate}x
              </button>
              
              {/* Fullscreen */}
              <button
                onClick={toggleFullscreen}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-lg transition-colors"
                aria-label="Fullscreen"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Video Info */}
      <div className="p-4 sm:p-6 bg-gray-800">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2">{title}</h3>
        {description && (
          <p className="text-gray-300 text-sm sm:text-base">{description}</p>
        )}
      </div>
    </div>
  );
};

export default TutorialVideo;