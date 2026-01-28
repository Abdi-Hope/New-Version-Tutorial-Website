import React, { useState, useRef, useEffect } from 'react';
import { 
  FiMessageSquare, 
  FiSend, 
  FiX, 
  FiHelpCircle, 
  FiCode, 
  FiSearch, 
  FiBook, 
  FiStar,
  FiChevronRight,
  FiZap,
  FiClock,
  FiFileText,
  FiUser,
  FiCopy
} from 'react-icons/fi';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI learning assistant. How can I help you today?", sender: 'ai', time: 'Just now' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsExpanded(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (messagesEndRef.current && isExpanded) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isExpanded, isTyping]);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: message,
      sender: 'user',
      time: 'Just now'
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI typing (to be replaced with actual backend)
    setTimeout(() => {
      const aiMessage = {
        id: messages.length + 2,
        text: "I understand your question. This is where the AI response would appear when connected to a backend service.",
        sender: 'ai',
        time: 'Just now'
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (title) => {
    const prompt = `I need help with: ${title}`;
    setMessage(prompt);
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      { id: 1, text: "Hello! I'm your AI learning assistant. How can I help you today?", sender: 'ai', time: 'Just now' }
    ]);
  };

  const copyLastResponse = () => {
    const lastAiMessage = messages.filter(msg => msg.sender === 'ai').pop();
    if (lastAiMessage) {
      navigator.clipboard.writeText(lastAiMessage.text);
      alert('Response copied to clipboard!');
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* AI Assistant Button - Desktop */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setIsExpanded(false);
          }
        }}
        className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        aria-label="Open AI Assistant"
      >
        <FiMessageSquare className="text-xs" />
        <span className="text-xs font-medium">AI Assistant</span>
      </button>

      {/* AI Assistant Button - Mobile */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen) {
            setIsExpanded(false);
          }
        }}
        className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        aria-label="Open AI Assistant"
      >
        <FiMessageSquare className="text-sm" />
      </button>

      {/* Desktop Dropdown - 80% of body width */}
      {isOpen && (
        <div className="hidden md:block fixed inset-0 z-50">
          {/* Backdrop for desktop */}
          <div 
            className="absolute inset-0 bg-black/20"
            onClick={() => {
              setIsOpen(false);
              setIsExpanded(false);
            }}
          ></div>

          {/* Dropdown positioned to the right */}
          <div className="absolute right-0 top-16 h-[calc(100vh-5rem)] w-4/5 max-w-[1200px] flex items-start justify-end p-3">
            <div className="w-full max-w-[1000px] h-full bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200/20 dark:border-gray-700/20 overflow-hidden flex flex-col">
              {/* Desktop Header - Reduced padding */}
              <div className="p-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-b border-gray-200/20 dark:border-gray-700/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <FiMessageSquare className="text-white text-sm" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-gray-800 dark:text-white">AI Learning Assistant</h2>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Ready to help</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setIsExpanded(false);
                    }}
                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <FiX className="text-gray-600 dark:text-gray-400 text-sm" />
                  </button>
                </div>
              </div>

              {/* Desktop Content - More space for chat */}
              <div className="flex-1 overflow-hidden">
                {!isExpanded ? (
                  <div className="h-full overflow-y-auto p-4">
                    <div className="max-w-3xl mx-auto space-y-5">
                      {/* Quick Actions - Compact */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Quick Actions</h3>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                          {[
                            { icon: <FiCode className="text-xs" />, title: "Code", desc: "Explain code" },
                            { icon: <FiSearch className="text-xs" />, title: "Resources", desc: "Find materials" },
                            { icon: <FiBook className="text-xs" />, title: "Course", desc: "Lesson help" },
                            { icon: <FiHelpCircle className="text-xs" />, title: "Debug", desc: "Fix issues" }
                          ].map((action, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickAction(action.title)}
                              className="p-2.5 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-all hover:scale-[1.02] active:scale-95 group"
                            >
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                    {action.icon}
                                  </div>
                                  <span className="text-xs font-medium">{action.title}</span>
                                </div>
                                <span className="text-[10px] text-gray-500 dark:text-gray-400">{action.desc}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Features - Compact */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {[
                            { icon: <FiZap className="text-xs" />, title: "Fast", desc: "Instant answers" },
                            { icon: <FiStar className="text-xs" />, title: "Personalized", desc: "Tailored help" },
                            { icon: <FiClock className="text-xs" />, title: "24/7", desc: "Always available" },
                            { icon: <FiFileText className="text-xs" />, title: "Plans", desc: "Study guidance" }
                          ].map((feature, index) => (
                            <div 
                              key={index} 
                              className="flex items-center gap-2 p-2 rounded-lg bg-gray-50/30 dark:bg-gray-800/30"
                            >
                              <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                {feature.icon}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-medium text-gray-800 dark:text-white truncate">{feature.title}</p>
                                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{feature.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Start Chat Button */}
                      <div className="pt-2">
                        <button
                          onClick={() => setIsExpanded(true)}
                          className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all active:scale-95 text-sm"
                        >
                          <FiMessageSquare className="text-xs" />
                          Start Conversation
                          <FiChevronRight className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Desktop Chat Interface - Maximized space */
                  <div className="h-full flex flex-col">
                    {/* Chat Messages - More space */}
                    <div className="flex-1 overflow-y-auto p-3">
                      <div className="space-y-3 max-w-3xl mx-auto">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-xl p-3 ${
                                msg.sender === 'user'
                                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-bl-none'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                                  msg.sender === 'user' 
                                    ? 'bg-white/20' 
                                    : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                }`}>
                                  {msg.sender === 'user' ? <FiUser className="text-xs" /> : <FiMessageSquare className="text-xs" />}
                                </div>
                                <div className="flex-1">
                                  <span className="text-xs font-medium opacity-80">
                                    {msg.sender === 'user' ? 'You' : 'AI Assistant'}
                                  </span>
                                  <span className="text-[10px] opacity-60 ml-2">{msg.time}</span>
                                </div>
                              </div>
                              <p className="text-sm whitespace-pre-line">{msg.text}</p>
                            </div>
                          </div>
                        ))}
                        
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-xl rounded-bl-none p-3">
                              <div className="flex items-center gap-2">
                                <div className="flex gap-1">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">AI is thinking...</span>
                              </div>
                            </div>
                          </div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>
                    </div>

                    {/* Input Area - Compact */}
                    <div className="p-3 border-t border-gray-200/20 dark:border-gray-700/20">
                      <div className="max-w-3xl mx-auto">
                        <div className="flex gap-2">
                          <textarea
                            ref={inputRef}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type your question here... (Enter to send)"
                            className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all"
                            rows="2"
                          />
                          <button
                            onClick={handleSendMessage}
                            disabled={!message.trim()}
                            className={`self-end px-3 py-2 rounded-lg flex items-center justify-center transition-all ${
                              message.trim()
                                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 hover:scale-105 active:scale-95'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                            }`}
                          >
                            <FiSend className="text-sm" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <button
                            onClick={() => setIsExpanded(false)}
                            className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1"
                          >
                            <FiChevronRight className="rotate-180 text-xs" />
                            Back to menu
                          </button>
                          
                          <div className="flex gap-3">
                            <button
                              onClick={copyLastResponse}
                              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
                            >
                              <FiCopy className="text-xs" />
                              Copy
                            </button>
                            <button
                              onClick={clearChat}
                              className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center gap-1"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Modal - Also compact */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40"
            onClick={() => {
              setIsOpen(false);
              setIsExpanded(false);
            }}
          ></div>

          {/* Mobile Modal Content */}
          <div className="absolute inset-0 flex items-center justify-center p-2">
            <div 
              className="relative w-full h-full bg-white dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Header - Compact */}
              <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border-b border-gray-200/20 dark:border-gray-700/20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <FiMessageSquare className="text-white text-sm" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-gray-800 dark:text-white">AI Assistant</h2>
                    <p className="text-[10px] text-gray-600 dark:text-gray-400">Learning helper</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsExpanded(false);
                  }}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <FiX className="text-gray-600 dark:text-gray-400 text-sm" />
                </button>
              </div>

              {/* Mobile Content */}
              <div className="flex-1 overflow-hidden">
                {!isExpanded ? (
                  <div className="h-full overflow-y-auto p-3">
                    <div className="space-y-4">
                      {/* Quick Actions - Mobile */}
                      <div>
                        <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { icon: <FiCode className="text-xs" />, title: "Code" },
                            { icon: <FiSearch className="text-xs" />, title: "Resources" },
                            { icon: <FiBook className="text-xs" />, title: "Course" },
                            { icon: <FiHelpCircle className="text-xs" />, title: "Debug" }
                          ].map((action, index) => (
                            <button
                              key={index}
                              onClick={() => handleQuickAction(action.title)}
                              className="p-3 rounded-lg bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all active:scale-95"
                            >
                              <div className="flex flex-col items-center text-center">
                                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-1">
                                  {action.icon}
                                </div>
                                <span className="text-xs font-medium text-gray-800 dark:text-white">{action.title}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Start Chat Button - Mobile */}
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="w-full py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium flex items-center justify-center gap-2 hover:from-blue-600 hover:to-purple-600 transition-all active:scale-95 text-sm"
                      >
                        <FiMessageSquare className="text-xs" />
                        Start Conversation
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Mobile Chat Interface - Compact */
                  <div className="h-full flex flex-col">
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[85%] rounded-lg p-2.5 ${
                              msg.sender === 'user'
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-bl-none'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-1">
                              <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                                msg.sender === 'user' 
                                  ? 'bg-white/20' 
                                  : 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                              }`}>
                                {msg.sender === 'user' ? <FiUser /> : <FiMessageSquare />}
                              </div>
                              <span className="text-xs font-medium opacity-80">
                                {msg.sender === 'user' ? 'You' : 'AI'}
                              </span>
                            </div>
                            <p className="text-xs">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg rounded-bl-none p-2.5">
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              </div>
                              <span className="text-xs text-gray-500 dark:text-gray-400">Thinking...</span>
                            </div>
                          </div>
                        </div>
                      )}
                      <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-gray-200/20 dark:border-gray-700/20">
                      <div className="flex gap-2">
                        <input
                          ref={inputRef}
                          type="text"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type question..."
                          className="flex-1 px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500/30"
                        />
                        <button
                          onClick={handleSendMessage}
                          disabled={!message.trim()}
                          className={`px-3 py-2 rounded-lg transition-all ${
                            message.trim()
                              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                          }`}
                        >
                          <FiSend className="text-sm" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => setIsExpanded(false)}
                        className="w-full mt-2 text-xs text-blue-600 dark:text-blue-400 text-center"
                      >
                        ← Back to menu
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;