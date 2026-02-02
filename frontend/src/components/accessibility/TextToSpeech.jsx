import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Pause, Play, Type } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const TextToSpeech = ({ text = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voice, setVoice] = useState(null);
  const [voices, setVoices] = useState([]);
  const utteranceRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      if (availableVoices.length > 0 && !voice) {
        setVoice(availableVoices[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if (window.speechSynthesis.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [voice]);

  const speak = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    if (!text.trim()) {
      alert('No text available to read');
      return;
    }

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    if (voice) utteranceRef.current.voice = voice;
    utteranceRef.current.rate = rate;
    utteranceRef.current.pitch = pitch;

    utteranceRef.current.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
    };

    utteranceRef.current.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current.onerror = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utteranceRef.current);
  };

  const pauseSpeech = () => {
    if (window.speechSynthesis.speaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleRateChange = (newRate) => {
    setRate(newRate);
    if (isPlaying || isPaused) {
      stopSpeech();
      setTimeout(speak, 100);
    }
  };

  const handlePitchChange = (newPitch) => {
    setPitch(newPitch);
    if (isPlaying || isPaused) {
      stopSpeech();
      setTimeout(speak, 100);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`
            p-2 rounded-lg
            bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300
          `}>
            <Volume2 className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold text-lg">Text-to-Speech</div>
            <div className="text-sm opacity-75">Listen to content</div>
          </div>
        </div>
        <div className={`
          px-3 py-1 rounded-full text-sm font-medium
          ${isPlaying ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 
            isPaused ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300' : 
            'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}
        `}>
          {isPlaying ? 'Playing' : isPaused ? 'Paused' : 'Ready'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3 justify-center">
        <button
          onClick={speak}
          disabled={isPlaying}
          className={`
            flex items-center gap-2 px-5 py-3 rounded-xl font-medium
            transition-all duration-200
            ${isPlaying 
              ? 'bg-green-500 dark:bg-green-600 text-white' 
              : 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700'
            }
            hover:shadow-lg active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            min-w-[140px]
          `}
          aria-label={isPaused ? "Resume speech" : "Start speech"}
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
          {isPaused ? 'Resume' : isPlaying ? 'Listening...' : 'Start Reading'}
        </button>

        <button
          onClick={pauseSpeech}
          disabled={!isPlaying || isPaused}
          className={`
            flex items-center gap-2 px-5 py-3 rounded-xl font-medium
            bg-yellow-500 dark:bg-yellow-600 text-white
            hover:bg-yellow-600 dark:hover:bg-yellow-700
            hover:shadow-lg active:scale-95
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            min-w-[140px]
          `}
          aria-label="Pause speech"
        >
          <Pause className="w-5 h-5" />
          Pause
        </button>

        <button
          onClick={stopSpeech}
          disabled={!isPlaying && !isPaused}
          className={`
            flex items-center gap-2 px-5 py-3 rounded-xl font-medium
            bg-red-500 dark:bg-red-600 text-white
            hover:bg-red-600 dark:hover:bg-red-700
            hover:shadow-lg active:scale-95
            transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            min-w-[140px]
          `}
          aria-label="Stop speech"
        >
          <VolumeX className="w-5 h-5" />
          Stop
        </button>
      </div>

      {/* Settings */}
      <div className="space-y-4 pt-4 border-t dark:border-gray-700">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium flex items-center gap-2">
              <Type className="w-4 h-4" />
              Voice Speed: {rate.toFixed(1)}x
            </span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={rate}
            onChange={(e) => handleRateChange(parseFloat(e.target.value))}
            className={`
              w-full h-2 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 dark:[&::-webkit-slider-thumb]:bg-purple-400
              [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white dark:[&::-webkit-slider-thumb]:border-gray-800
              bg-gradient-to-r from-purple-200 dark:from-purple-900/50 to-gray-200 dark:to-gray-700
            `}
            aria-label="Adjust speech rate"
          />
        </div>

        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Voice Pitch: {pitch.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={pitch}
            onChange={(e) => handlePitchChange(parseFloat(e.target.value))}
            className={`
              w-full h-2 rounded-lg appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500 dark:[&::-webkit-slider-thumb]:bg-purple-400
              [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white dark:[&::-webkit-slider-thumb]:border-gray-800
              bg-gradient-to-r from-purple-200 dark:from-purple-900/50 to-gray-200 dark:to-gray-700
            `}
            aria-label="Adjust speech pitch"
          />
        </div>

        {voices.length > 0 && (
          <div>
            <div className="text-sm font-medium mb-2">Select Voice</div>
            <select
              value={voice ? voice.name : ''}
              onChange={(e) => {
                const selectedVoice = voices.find(v => v.name === e.target.value);
                setVoice(selectedVoice);
              }}
              className={`
                w-full p-3 rounded-lg border
                bg-white dark:bg-gray-800
                border-gray-300 dark:border-gray-700
                text-gray-900 dark:text-gray-100
                focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 focus:border-transparent
              `}
              aria-label="Select voice for text-to-speech"
            >
              {voices.map((v, index) => (
                <option key={index} value={v.name}>
                  {v.name} ({v.lang})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Sample Text Preview */}
      {text && (
        <div className={`
          p-4 rounded-lg mt-4 text-sm
          bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700
        `}>
          <div className="font-medium mb-2 flex items-center gap-2">
            <Type className="w-4 h-4" />
            Text Preview
          </div>
          <div className="max-h-32 overflow-y-auto leading-relaxed">
            {text.length > 300 ? `${text.substring(0, 300)}...` : text}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            {text.length} characters available for reading
          </div>
        </div>
      )}
    </div>
  );
};

export default TextToSpeech;
