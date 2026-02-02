import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { 
  Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, 
  SkipBack, SkipForward, Settings, Download, Captions,
  RotateCcw, Clock, CheckCircle, Bookmark
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import PlayerControls from './PlayerControls';
import TranscriptPanel from './TranscriptPanel';

const VideoPlayer = ({ 
  url, 
  title = "Course Lesson",
  duration = 0,
  onProgress,
  onEnded,
  captionsUrl,
  thumbnailUrl
}) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  
  const playerRef = useRef(null);
  const playerContainerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const { theme } = useTheme();

  // Sample transcript data
  const transcriptData = [
    { time: 0, speaker: 'Instructor', text: 'Welcome to this React course.' },
    { time: 30, speaker: 'Instructor', text: 'Today we learn about React hooks.' },
    { time: 60, speaker: 'Instructor', text: 'UseState is the most fundamental hook.' },
    { time: 90, speaker: 'Instructor', text: 'Let me show you a practical example.' },
  ];

  // Toggle play/pause
  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  // Toggle mute
  const handleToggleMute = () => {
    setMuted(!muted);
  };

  // Handle progress
  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
      setCurrentTime(state.playedSeconds);
      if (onProgress) onProgress(state);
    }
  };

  // Handle seek change
  const handleSeekChange = (e) => {
    const newPlayed = parseFloat(e.target.value);
    setPlayed(newPlayed);
    setSeeking(true);
  };

  // Handle seek mouse up
  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    if (playerRef.current) {
      playerRef.current.seekTo(parseFloat(e.target.value));
    }
  };

  // Handle playback rate change
  const handlePlaybackRateChange = (rate) => {
    setPlaybackRate(rate);
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      playerContainerRef.current.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable fullscreen: ${err.message}`);
      });
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  // Skip forward/backward
  const skipForward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 10, 'seconds');
    }
  };

  const skipBackward = () => {
    if (playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime - 10, 'seconds');
    }
  };

  // Format time
  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds();
    
    if (hh > 0) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
    }
    return `${mm}:${ss.toString().padStart(2, '0')}`;
  };

  // Show/hide controls on mouse movement
  useEffect(() => {
    const handleMouseMove = () => {
      setShowControls(true);
      
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
      
      controlsTimeoutRef.current = setTimeout(() => {
        if (playing) {
          setShowControls(false);
        }
      }, 3000);
    };

    const container = playerContainerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [playing]);

  // Handle fullscreen change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <div 
      ref={playerContainerRef}
      className={`
        relative rounded-2xl overflow-hidden
        bg-black
        ${fullscreen ? 'fixed inset-0 z-50' : 'w-full'}
        ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-900'}
      `}
      style={{ 
        aspectRatio: fullscreen ? 'auto' : '16/9',
        height: fullscreen ? '100vh' : 'auto'
      }}
    >
      {/* Video Player */}
      <div className="relative w-full h-full">
        <ReactPlayer
          ref={playerRef}
          url={url || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'} // Fallback URL
          playing={playing}
          volume={volume}
          muted={muted}
          playbackRate={playbackRate}
          width="100%"
          height="100%"
          onProgress={handleProgress}
          onEnded={onEnded}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          config={{
            youtube: {
              playerVars: { 
                showinfo: 0,
                rel: 0,
                modestbranding: 1,
                controls: 0
              }
            },
            file: {
              attributes: {
                controlsList: 'nodownload'
              }
            }
          }}
        />

        {/* Overlay Controls */}
        <div className={`
          absolute inset-0 transition-opacity duration-300
          ${showControls ? 'opacity-100' : 'opacity-0'}
          bg-gradient-to-t from-black/70 via-transparent to-transparent
          pointer-events-none
        `}>
          {/* Top Bar */}
          <div className="absolute top-0 left-0 right-0 p-4 pointer-events-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.history.back()}
                  className={`
                    p-2 rounded-lg backdrop-blur-sm
                    bg-black/50 text-white
                    hover:bg-black/70 transition-colors
                  `}
                  aria-label="Back to course"
                >
                  ←
                </button>
                <div>
                  <h2 className="text-white font-semibold text-lg truncate">
                    {title}
                  </h2>
                  <div className="flex items-center gap-2 text-sm text-white/80">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(currentTime)} / {formatTime(duration || 0)}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  className={`
                    p-2 rounded-lg backdrop-blur-sm transition-colors
                    ${bookmarked 
                      ? 'bg-yellow-500/90 text-white' 
                      : 'bg-black/50 text-white hover:bg-black/70'
                    }
                  `}
                  aria-label={bookmarked ? "Remove bookmark" : "Bookmark this moment"}
                >
                  <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
                </button>
                
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-lg backdrop-blur-sm bg-black/50 text-white hover:bg-black/70 transition-colors"
                  aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {fullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Center Play Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <button
              onClick={handlePlayPause}
              className={`
                p-4 rounded-full backdrop-blur-sm transition-all duration-300
                bg-black/50 text-white
                hover:bg-black/70 hover:scale-110
                ${!playing ? 'opacity-100' : 'opacity-0'}
              `}
              aria-label={playing ? "Pause" : "Play"}
            >
              <Play className="w-10 h-10" />
            </button>
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pointer-events-auto">
            {/* Progress Bar */}
            <div className="mb-3">
              <input
                type="range"
                min={0}
                max={1}
                step="any"
                value={played}
                onChange={handleSeekChange}
                onMouseUp={handleSeekMouseUp}
                onTouchEnd={handleSeekMouseUp}
                className={`
                  w-full h-2 rounded-lg appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                  [&::-webkit-slider-thumb]:shadow-lg
                  bg-gradient-to-r from-white to-gray-400
                `}
                aria-label="Video progress"
              />
              <div className="flex justify-between text-sm text-white/80 mt-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration || 0)}</span>
              </div>
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePlayPause}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  aria-label={playing ? "Pause" : "Play"}
                >
                  {playing ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                </button>
                
                <button
                  onClick={skipBackward}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Skip back 10 seconds"
                >
                  <SkipBack className="w-6 h-6" />
                </button>
                
                <button
                  onClick={skipForward}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Skip forward 10 seconds"
                >
                  <SkipForward className="w-6 h-6" />
                </button>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleToggleMute}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted || volume === 0 ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
                  </button>
                  
                  <div className="w-24 hidden sm:block">
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className={`
                        w-full h-2 rounded-lg appearance-none cursor-pointer
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
                        [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
                        bg-gradient-to-r from-white to-gray-400
                      `}
                      aria-label="Volume control"
                    />
                  </div>
                </div>

                {/* Playback Rate */}
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(!showSettings)}
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                    aria-label="Playback settings"
                  >
                    <Settings className="w-6 h-6" />
                  </button>
                  
                  {showSettings && (
                    <div className="absolute bottom-full left-0 mb-2 bg-black/90 backdrop-blur-sm rounded-lg p-2 min-w-[120px]">
                      <div className="text-white text-sm font-medium mb-2">Speed</div>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => {
                            handlePlaybackRateChange(rate);
                            setShowSettings(false);
                          }}
                          className={`
                            w-full text-left px-3 py-2 rounded text-sm transition-colors
                            ${playbackRate === rate 
                              ? 'bg-white/20 text-white' 
                              : 'text-white/70 hover:bg-white/10'
                            }
                          `}
                        >
                          {rate}x {rate === 1 ? '(Normal)' : ''}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {captionsUrl && (
                  <button
                    className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                    aria-label="Toggle captions"
                  >
                    <Captions className="w-6 h-6" />
                  </button>
                )}
                
                <button
                  onClick={() => setShowTranscript(!showTranscript)}
                  className={`
                    p-2 rounded-lg transition-colors
                    ${showTranscript 
                      ? 'bg-blue-500 text-white' 
                      : 'text-white hover:bg-white/20'
                    }
                  `}
                  aria-label={showTranscript ? "Hide transcript" : "Show transcript"}
                >
                  <span className="hidden sm:inline">Transcript</span>
                  <span className="sm:hidden">TXT</span>
                </button>
                
                <button
                  onClick={() => alert('Download feature coming soon!')}
                  className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
                  aria-label="Download video"
                >
                  <Download className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Panel */}
      {showTranscript && (
        <div className={`
          absolute bottom-0 left-0 right-0
          bg-black/90 backdrop-blur-sm border-t border-white/20
          transition-transform duration-300
          ${showTranscript ? 'translate-y-0' : 'translate-y-full'}
        `}>
          <TranscriptPanel
            transcript={transcriptData}
            currentTime={currentTime}
            onTimeClick={(time) => {
              if (playerRef.current) {
                playerRef.current.seekTo(time, 'seconds');
              }
            }}
            onClose={() => setShowTranscript(false)}
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
