import React, { useState } from 'react';
import { FileText, Search, Filter, Download, Copy, Maximize2 } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const Transcript = ({ 
  transcript = [], 
  currentTime = 0,
  onTimeClick 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBySpeaker, setFilterBySpeaker] = useState('');
  const [expanded, setExpanded] = useState(false);
  const { theme } = useTheme();

  // Sample transcript data if none provided
  const sampleTranscript = transcript.length > 0 ? transcript : [
    { time: 0, speaker: 'Instructor', text: 'Welcome to this course on React development.' },
    { time: 30, speaker: 'Instructor', text: 'Today we will be learning about React hooks.' },
    { time: 60, speaker: 'Instructor', text: 'Hooks are functions that let you use state and other React features.' },
    { time: 90, speaker: 'Instructor', text: 'The most common hooks are useState and useEffect.' },
    { time: 120, speaker: 'Instructor', text: 'Let me show you an example of useState.' },
    { time: 150, speaker: 'Student', text: 'How do we handle multiple state variables?' },
    { time: 180, speaker: 'Instructor', text: 'Great question! You can use multiple useState calls.' },
  ];

  const speakers = [...new Set(sampleTranscript.map(item => item.speaker))];

  const filteredTranscript = sampleTranscript.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpeaker = filterBySpeaker === '' || item.speaker === filterBySpeaker;
    
    return matchesSearch && matchesSpeaker;
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyTranscript = () => {
    const text = filteredTranscript.map(item => 
      `[${formatTime(item.time)}] ${item.speaker}: ${item.text}`
    ).join('\n');
    
    navigator.clipboard.writeText(text)
      .then(() => alert('Transcript copied to clipboard!'))
      .catch(() => alert('Failed to copy transcript'));
  };

  const downloadTranscript = () => {
    const text = filteredTranscript.map(item => 
      `[${formatTime(item.time)}] ${item.speaker}: ${item.text}`
    ).join('\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`
      rounded-xl border transition-all duration-300
      ${expanded ? 'fixed inset-4 z-50 p-6 bg-white dark:bg-gray-900 shadow-2xl' : 'p-4 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700'}
    `}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
          <div className={`
            p-2 rounded-lg
            bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300
          `}>
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="font-semibold text-lg">Transcript</div>
            <div className="text-sm opacity-75">{filteredTranscript.length} lines available</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={copyTranscript}
            className={`
              p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
              text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300
              transition-colors
            `}
            aria-label="Copy transcript"
          >
            <Copy className="w-5 h-5" />
          </button>
          
          <button
            onClick={downloadTranscript}
            className={`
              p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
              text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300
              transition-colors
            `}
            aria-label="Download transcript"
          >
            <Download className="w-5 h-5" />
          </button>
          
          <button
            onClick={() => setExpanded(!expanded)}
            className={`
              p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
              text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300
              transition-colors
            `}
            aria-label={expanded ? "Minimize transcript" : "Maximize transcript"}
          >
            <Maximize2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search in transcript..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`
              w-full pl-10 pr-4 py-3 rounded-lg border
              bg-white dark:bg-gray-800
              border-gray-300 dark:border-gray-700
              text-gray-900 dark:text-gray-100
              focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent
              placeholder-gray-500 dark:placeholder-gray-400
            `}
            aria-label="Search transcript"
          />
        </div>
        
        <select
          value={filterBySpeaker}
          onChange={(e) => setFilterBySpeaker(e.target.value)}
          className={`
            px-4 py-3 rounded-lg border
            bg-white dark:bg-gray-800
            border-gray-300 dark:border-gray-700
            text-gray-900 dark:text-gray-100
            focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-transparent
          `}
          aria-label="Filter by speaker"
        >
          <option value="">All Speakers</option>
          {speakers.map((speaker, index) => (
            <option key={index} value={speaker}>{speaker}</option>
          ))}
        </select>
      </div>

      {/* Transcript Content */}
      <div className={`
        rounded-lg border overflow-hidden
        ${expanded ? 'h-[calc(100vh-200px)]' : 'max-h-96'}
      `}>
        <div className={`
          overflow-y-auto h-full
          bg-white dark:bg-gray-900
          ${expanded ? 'p-4' : 'p-2'}
        `}>
          {filteredTranscript.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <div className="font-medium">No transcript found</div>
              <div className="text-sm">Try changing your search or filter</div>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredTranscript.map((item, index) => {
                const isActive = currentTime >= item.time && 
                  (index === filteredTranscript.length - 1 || currentTime < filteredTranscript[index + 1].time);
                
                return (
                  <div
                    key={index}
                    onClick={() => onTimeClick && onTimeClick(item.time)}
                    className={`
                      p-3 rounded-lg cursor-pointer transition-all duration-200
                      ${isActive 
                        ? 'bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                      }
                      ${onTimeClick ? 'hover:border-green-300 dark:hover:border-green-700' : ''}
                    `}
                    role="button"
                    tabIndex={0}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && onTimeClick) {
                        onTimeClick(item.time);
                      }
                    }}
                    aria-label={`Jump to ${formatTime(item.time)} - ${item.speaker}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                      <div className={`
                        px-2 py-1 rounded text-sm font-mono font-bold whitespace-nowrap
                        ${isActive 
                          ? 'bg-green-500 dark:bg-green-600 text-white' 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }
                      `}>
                        {formatTime(item.time)}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`
                            px-2 py-1 rounded text-xs font-medium
                            ${item.speaker === 'Instructor' 
                              ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                              : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                            }
                          `}>
                            {item.speaker}
                          </div>
                          {isActive && (
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          )}
                        </div>
                        <div className="text-gray-800 dark:text-gray-200 leading-relaxed">
                          {item.text}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex flex-wrap items-center justify-between gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Instructor</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Student</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div>Click on any line to jump to that time</div>
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
            <span>Current position</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transcript;
