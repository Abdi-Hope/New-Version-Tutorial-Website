import React, { useState } from 'react';
import {
  Play, Pause, Volume2, VolumeX, SkipBack, SkipForward,
  Maximize2, Settings, Captions, Download, RotateCcw,
  FastForward, Rewind
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const PlayerControls = ({
  playing,
  volume,
  muted,
  played,
  playbackRate,
  duration = 0,
  currentTime = 0,
  onPlayPause,
  onVolumeChange,
  onToggleMute,
  onSeekChange,
  onSeekMouseUp,
  onPlaybackRateChange,
  onSkipForward,
  onSkipBackward,
  onFullscreen,
  onToggleCaptions,
  onDownload,
  compact = false
}) => {
  const [showVolume, setShowVolume] = useState(false);
  const [showSpeed, setShowSpeed] = useState(false);
  const { theme } = useTheme();

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

  const playbackRates = [
    { value: 0.5, label: '0.5x', icon: '🐢' },
    { value: 0.75, label: '0.75x', icon: '⏪' },
    { value: 1, label: '1x', icon: '▶️' },
    { value: 1.25, label: '1.25x', icon: '⏩' },
    { value: 1.5, label: '1.5x', icon: '🐇' },
    { value: 2, label: '2x', icon: '🚀' },
  ];

  return (
    <div className={`
      rounded-xl p-4
      bg-gray-900/95 backdrop-blur-sm border border-gray-800
      ${compact ? 'space-y-3' : 'space-y-4'}
    `}>
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-300">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={played}
          onChange={onSeekChange}
          onMouseUp={onSeekMouseUp}
          onTouchEnd={onSeekMouseUp}
          className={`
            w-full h-2 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white
            [&::-webkit-slider-thumb]:shadow-lg
            bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
          `}
          aria-label="Video progress"
        />
      </div>

      {/* Main Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Play/Pause */}
          <button
            onClick={onPlayPause}
            className={`
              p-3 rounded-full transition-all duration-200
              ${playing 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-green-500 hover:bg-green-600 text-white'
              }
              hover:scale-105 active:scale-95
            `}
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>

          {/* Skip Backward */}
          <button
            onClick={onSkipBackward}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Skip back 10 seconds"
          >
            <SkipBack className="w-5 h-5" />
          </button>

          {/* Skip Forward */}
          <button
            onClick={onSkipForward}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Skip forward 10 seconds"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Volume Control */}
          <div className="relative flex items-center">
            <button
              onClick={onToggleMute}
              onMouseEnter={() => setShowVolume(true)}
              onMouseLeave={() => setShowVolume(false)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            
            {showVolume && (
              <div className="absolute bottom-full left-0 mb-2 bg-gray-900/95 backdrop-blur-sm rounded-lg p-3 shadow-xl border border-gray-800">
                <div className="flex items-center gap-2">
                  <VolumeX className="w-4 h-4 text-gray-400" />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step="0.01"
                    value={volume}
                    onChange={onVolumeChange}
                    className="w-32 h-2 bg-gray-700 rounded-lg appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                    aria-label="Volume"
                  />
                  <Volume2 className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            )}
          </div>

          {/* Playback Speed */}
          <div className="relative">
            <button
              onClick={() => setShowSpeed(!showSpeed)}
              className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Playback speed"
            >
              <FastForward className="w-5 h-5" />
            </button>
            
            {showSpeed && (
              <div className="absolute bottom-full left-0 mb-2 bg-gray-900/95 backdrop-blur-sm rounded-lg p-2 min-w-[120px] shadow-xl border border-gray-800">
                <div className="text-gray-300 text-sm font-medium mb-2 px-2">Speed</div>
                <div className="space-y-1">
                  {playbackRates.map((rate) => (
                    <button
                      key={rate.value}
                      onClick={() => {
                        onPlaybackRateChange(rate.value);
                        setShowSpeed(false);
                      }}
                      className={`
                        w-full flex items-center justify-between px-3 py-2 rounded text-sm transition-colors
                        ${playbackRate === rate.value 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : 'text-gray-300 hover:bg-gray-800'
                        }
                      `}
                    >
                      <span>{rate.icon}</span>
                      <span>{rate.label}</span>
                      {playbackRate === rate.value && (
                        <span className="text-green-400">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Current Speed Display */}
          {!compact && (
            <div className="px-3 py-1 bg-gray-800 rounded-lg text-sm text-gray-300">
              {playbackRate}x
            </div>
          )}

          {/* Captions */}
          <button
            onClick={onToggleCaptions}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle captions"
          >
            <Captions className="w-5 h-5" />
          </button>

          {/* Fullscreen */}
          <button
            onClick={onFullscreen}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle fullscreen"
          >
            <Maximize2 className="w-5 h-5" />
          </button>

          {/* Download */}
          <button
            onClick={onDownload}
            className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Download"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Quick Actions for Compact Mode */}
      {compact && (
        <div className="flex items-center justify-center gap-4 pt-3 border-t border-gray-800">
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <RotateCcw className="w-4 h-4" />
            <span>Replay</span>
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
            <Rewind className="w-4 h-4" />
            <span>Bookmark</span>
          </button>
        </div>
      )}

      {/* Stats Display */}
      {!compact && (
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-gray-800 text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span>Live</span>
            </div>
            <div>Quality: 1080p</div>
            <div>Audio: Stereo</div>
          </div>
          <div className="flex items-center gap-4">
            <div>Buffer: 100%</div>
            <div>Bitrate: 5 Mbps</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayerControls;
