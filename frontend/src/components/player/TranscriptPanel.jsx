import React, { useState, useRef, useEffect } from 'react';
import { 
  X, Search, Filter, Download, Copy, 
  Volume2, BookOpen, ChevronDown, ChevronUp,
  MessageSquare, User, Clock, Hash
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const TranscriptPanel = ({ 
  transcript = [],
  currentTime = 0,
  onTimeClick,
  onClose,
  searchable = true,
  downloadable = true
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBySpeaker, setFilterBySpeaker] = useState('');
  const [autoScroll, setAutoScroll] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});
  const { theme } = useTheme();
  
  const transcriptContainerRef = useRef(null);
  const activeItemRef = useRef(null);

  // Sample data if none provided
  const sampleTranscript = transcript.length > 0 ? transcript : [
    { time: 0, speaker: 'Instructor', text: 'Welcome to Advanced React Development. In this course, we will cover modern React patterns, hooks, and best practices.' },
    { time: 45, speaker: 'Instructor', text: 'Let\'s start with useState. This hook allows you to add state to functional components.' },
    { time: 90, speaker: 'Student', text: 'How does useState differ from class component state?' },
    { time: 120, speaker: 'Instructor', text: 'Great question! Unlike class components, useState gives you direct access to state variables without using "this".' },
    { time: 180, speaker: 'Instructor', text: 'Here\'s an example: const [count, setCount] = useState(0); This creates a state variable called count with initial value 0.' },
    { time: 240, speaker: 'Student', text: 'Can we use multiple useState hooks in one component?' },
    { time: 270, speaker: 'Instructor', text: 'Absolutely! You can use as many useState hooks as you need. Each one manages its own piece of state independently.' },
  ];

  const speakers = [...new Set(sampleTranscript.map(item => item.speaker))];
  const filteredTranscript = sampleTranscript.filter(item => {
    const matchesSearch = !searchTerm || 
      item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.speaker.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpeaker = !filterBySpeaker || item.speaker === filterBySpeaker;
    
    return matchesSearch && matchesSpeaker;
  });

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleExpand = (index) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
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
    a.download = 'course-transcript.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Auto-scroll to active transcript item
  useEffect(() => {
    if (autoScroll && activeItemRef.current && transcriptContainerRef.current) {
      const container = transcriptContainerRef.current;
      const activeElement = activeItemRef.current;
      
      const containerHeight = container.clientHeight;
      const elementTop = activeElement.offsetTop;
      const elementHeight = activeElement.clientHeight;
      
      container.scrollTo({
        top: elementTop - (containerHeight / 2) + (elementHeight / 2),
        behavior: 'smooth'
      });
    }
  }, [currentTime, autoScroll, filteredTranscript]);

  const getActiveIndex = () => {
    for (let i = 0; i < filteredTranscript.length; i++) {
      const item = filteredTranscript[i];
      const nextItem = filteredTranscript[i + 1];
      
      if (currentTime >= item.time && (!nextItem || currentTime < nextItem.time)) {
        return i;
      }
    }
    return -1;
  };

  const activeIndex = getActiveIndex();

  return (
    <div className={`
      w-full h-96 md:h-80 lg:h-96
      flex flex-col
      bg-gray-900/95 backdrop-blur-sm
      border-t border-gray-800
    `}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Transcript</h3>
            <p className="text-sm text-gray-400">{filteredTranscript.length} lines</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Auto-scroll toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`
              flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors
              ${autoScroll 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-gray-800 text-gray-400 hover:text-gray-300'
              }
            `}
            aria-label={autoScroll ? "Disable auto-scroll" : "Enable auto-scroll"}
          >
            <span className="hidden sm:inline">Auto-scroll</span>
            <div className={`w-3 h-3 rounded-full ${autoScroll ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
          </button>
          
          {/* Close button */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Close transcript"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-b border-gray-800 space-y-3">
        {searchable && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search in transcript..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Search transcript"
            />
          </div>
        )}
        
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <select
              value={filterBySpeaker}
              onChange={(e) => setFilterBySpeaker(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Filter by speaker"
            >
              <option value="">All Speakers</option>
              {speakers.map((speaker, index) => (
                <option key={index} value={speaker}>{speaker}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2">
            {downloadable && (
              <button
                onClick={downloadTranscript}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
                aria-label="Download transcript"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
            )}
            
            <button
              onClick={copyTranscript}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
              aria-label="Copy transcript"
            >
              <Copy className="w-4 h-4" />
              <span className="hidden sm:inline">Copy</span>
            </button>
          </div>
        </div>
      </div>

      {/* Transcript Content */}
      <div 
        ref={transcriptContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3"
      >
        {filteredTranscript.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <div className="font-medium">No transcript found</div>
            <div className="text-sm">Try changing your search or filter</div>
          </div>
        ) : (
          filteredTranscript.map((item, index) => {
            const isActive = index === activeIndex;
            const isExpanded = expandedItems[index] || false;
            
            return (
              <div
                key={index}
                ref={isActive ? activeItemRef : null}
                onClick={() => onTimeClick && onTimeClick(item.time)}
                className={`
                  p-4 rounded-lg cursor-pointer transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-500/10 border-2 border-blue-500/30' 
                    : 'hover:bg-gray-800/50 border border-transparent hover:border-gray-700'
                  }
                  ${onTimeClick ? 'hover:border-blue-500/30' : ''}
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
                <div className="flex gap-4">
                  {/* Time Stamp */}
                  <div className="flex flex-col items-center">
                    <div className={`
                      px-3 py-1 rounded text-sm font-mono font-bold whitespace-nowrap
                      ${isActive 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-800 text-gray-400'
                      }
                    `}>
                      {formatTime(item.time)}
                    </div>
                    
                    {isActive && (
                      <div className="mt-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`
                        px-3 py-1 rounded-full text-xs font-medium flex items-center gap-2
                        ${item.speaker === 'Instructor' 
                          ? 'bg-blue-500/20 text-blue-300' 
                          : 'bg-purple-500/20 text-purple-300'
                        }
                      `}>
                        {item.speaker === 'Instructor' ? (
                          <BookOpen className="w-3 h-3" />
                        ) : (
                          <User className="w-3 h-3" />
                        )}
                        {item.speaker}
                      </div>
                      
                      {item.text.length > 150 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleExpand(index);
                          }}
                          className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3 h-3" />
                              Show less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3 h-3" />
                              Show more
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    
                    <div className={`
                      text-gray-300 leading-relaxed
                      ${!isExpanded && item.text.length > 150 ? 'line-clamp-2' : ''}
                    `}>
                      {item.text}
                    </div>
                    
                    {/* Quick Actions */}
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-800/50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onTimeClick && onTimeClick(item.time);
                        }}
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-400 transition-colors"
                        aria-label="Play from this point"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span>Play from here</span>
                      </button>
                      
                      <div className="text-xs text-gray-500 flex items-center gap-1">
                        <Hash className="w-3 h-3" />
                        <span>Line {index + 1}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 bg-gray-900/50">
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>Instructor</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Student</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span>Current</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {onTimeClick && (
              <div className="text-sm">
                Click any line to jump to that time
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>Total: {formatTime(sampleTranscript[sampleTranscript.length - 1]?.time || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranscriptPanel;
