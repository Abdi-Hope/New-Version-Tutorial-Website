import React, { useState, useEffect } from 'react';
import {
  ChevronLeft, ChevronRight, RotateCw, CheckCircle,
  XCircle, Plus, Edit, Trash2, Share, Download,
  Star, Filter, Search, BookOpen, Volume2
} from 'lucide-react';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([
    {
      id: 1,
      front: 'What is React?',
      back: 'A JavaScript library for building user interfaces, maintained by Facebook.',
      category: 'Web Development',
      difficulty: 'easy',
      mastered: false,
      lastReviewed: '2024-01-25',
      reviewCount: 3
    },
    {
      id: 2,
      front: 'What is JSX?',
      back: 'JavaScript XML - a syntax extension for JavaScript that looks similar to HTML.',
      category: 'Web Development',
      difficulty: 'medium',
      mastered: true,
      lastReviewed: '2024-01-28',
      reviewCount: 5
    },
    {
      id: 3,
      front: 'What is the virtual DOM?',
      back: 'A lightweight copy of the real DOM that React uses for performance optimization.',
      category: 'Web Development',
      difficulty: 'medium',
      mastered: false,
      lastReviewed: '2024-01-20',
      reviewCount: 2
    },
    {
      id: 4,
      front: 'What are React Hooks?',
      back: 'Functions that let you use state and other React features in functional components.',
      category: 'Web Development',
      difficulty: 'hard',
      mastered: false,
      lastReviewed: '2024-01-22',
      reviewCount: 4
    },
    {
      id: 5,
      front: 'What is useState?',
      back: 'A Hook that lets you add React state to function components.',
      category: 'Web Development',
      difficulty: 'easy',
      mastered: true,
      lastReviewed: '2024-01-29',
      reviewCount: 6
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newCard, setNewCard] = useState({ front: '', back: '', category: '', difficulty: 'medium' });
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const currentCard = flashcards[currentIndex];
  const filteredCards = flashcards.filter(card => {
    const matchesCategory = filterCategory === 'all' || card.category === filterCategory;
    const matchesDifficulty = filterDifficulty === 'all' || card.difficulty === filterDifficulty;
    const matchesSearch = searchQuery === '' || 
      card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.back.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const categories = [...new Set(flashcards.map(card => card.category))];
  const stats = {
    total: flashcards.length,
    mastered: flashcards.filter(card => card.mastered).length,
    dueForReview: flashcards.filter(card => {
      const lastReviewed = new Date(card.lastReviewed);
      const daysSince = (Date.now() - lastReviewed) / (1000 * 60 * 60 * 24);
      return daysSince > 1 && !card.mastered;
    }).length
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    setShowAnswer(!showAnswer);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    setIsFlipped(false);
    setShowAnswer(false);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    setIsFlipped(false);
    setShowAnswer(false);
  };

  const handleMaster = (id) => {
    setFlashcards(prev => prev.map(card =>
      card.id === id ? { ...card, mastered: !card.mastered } : card
    ));
  };

  const handleAddCard = () => {
    if (newCard.front.trim() && newCard.back.trim()) {
      const newCardObj = {
        id: Date.now(),
        ...newCard,
        mastered: false,
        lastReviewed: new Date().toISOString().split('T')[0],
        reviewCount: 0
      };
      setFlashcards([newCardObj, ...flashcards]);
      setNewCard({ front: '', back: '', category: '', difficulty: 'medium' });
      setIsEditing(false);
    }
  };

  const handleDeleteCard = (id) => {
    if (window.confirm('Are you sure you want to delete this flashcard?')) {
      setFlashcards(prev => prev.filter(card => card.id !== id));
      if (currentIndex >= filteredCards.length - 1) {
        setCurrentIndex(Math.max(0, filteredCards.length - 2));
      }
    }
  };

  const handleTextToSpeech = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Study Flashcards
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <span>{stats.total} cards total</span>
            <span>•</span>
            <span className="text-green-600 dark:text-green-400">{stats.mastered} mastered</span>
            <span>•</span>
            <span className="text-yellow-600 dark:text-yellow-400">{stats.dueForReview} due for review</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Card</span>
          </button>
          
          <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
            <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Card Viewer */}
        <div className="lg:col-span-2">
          {isEditing ? (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Create New Flashcard
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Front (Question)
                  </label>
                  <textarea
                    value={newCard.front}
                    onChange={(e) => setNewCard(prev => ({ ...prev, front: e.target.value }))}
                    rows="3"
                    placeholder="Enter the question or term..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Back (Answer)
                  </label>
                  <textarea
                    value={newCard.back}
                    onChange={(e) => setNewCard(prev => ({ ...prev, back: e.target.value }))}
                    rows="4"
                    placeholder="Enter the answer or definition..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newCard.category}
                      onChange={(e) => setNewCard(prev => ({ ...prev, category: e.target.value }))}
                      placeholder="e.g., Web Development"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Difficulty
                    </label>
                    <select
                      value={newCard.difficulty}
                      onChange={(e) => setNewCard(prev => ({ ...prev, difficulty: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCard}
                    disabled={!newCard.front.trim() || !newCard.back.trim()}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      newCard.front.trim() && newCard.back.trim()
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Add Card
                  </button>
                </div>
              </div>
            </div>
          ) : filteredCards.length > 0 ? (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>
                  Card {currentIndex + 1} of {filteredCards.length}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="flex items-center space-x-1">
                    <BookOpen className="w-4 h-4" />
                    <span>{currentCard.reviewCount} reviews</span>
                  </span>
                  <span>•</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(currentCard.difficulty)}`}>
                    {currentCard.difficulty}
                  </span>
                </div>
              </div>

              {/* Flashcard */}
              <div
                className={`relative h-96 cursor-pointer perspective-1000 ${
                  isFlipped ? 'rotate-y-180' : ''
                }`}
                onClick={handleFlip}
              >
                <div className="absolute inset-0 w-full h-full transition-transform duration-500 preserve-3d">
                  {/* Front */}
                  <div className={`absolute inset-0 w-full h-full backface-hidden rounded-xl p-8 flex flex-col justify-center items-center ${
                    isFlipped ? 'opacity-0' : 'opacity-100'
                  } transition-opacity duration-300`}>
                    <div className="text-center">
                      <div className="mb-6">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium">
                          Question
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {currentCard.front}
                      </h3>
                      
                      <p className="text-gray-500 dark:text-gray-400">
                        Click to reveal answer
                      </p>
                    </div>
                  </div>

                  {/* Back */}
                  <div className={`absolute inset-0 w-full h-full backface-hidden rounded-xl p-8 flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rotate-y-180 ${
                    isFlipped ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-300`}>
                    <div className="text-center">
                      <div className="mb-6">
                        <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-sm font-medium">
                          Answer
                        </span>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        {currentCard.back}
                      </h3>
                      
                      <p className="text-gray-500 dark:text-gray-400">
                        Click to show question
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleMaster(currentCard.id)}
                    className={`p-3 rounded-lg flex items-center space-x-2 ${
                      currentCard.mastered
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {currentCard.mastered ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Star className="w-5 h-5" />
                    )}
                    <span>{currentCard.mastered ? 'Mastered' : 'Mark as Mastered'}</span>
                  </button>
                  
                  <button
                    onClick={() => handleTextToSpeech(isFlipped ? currentCard.back : currentCard.front)}
                    className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-lg"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePrev}
                    disabled={currentIndex === 0}
                    className={`p-3 rounded-lg ${
                      currentIndex === 0
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handleFlip}
                    className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    <RotateCw className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={handleNext}
                    disabled={currentIndex === filteredCards.length - 1}
                    className={`p-3 rounded-lg ${
                      currentIndex === filteredCards.length - 1
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteCard(currentCard.id)}
                    className="p-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                No flashcards found
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {searchQuery ? 'Try a different search term' : 'Create your first flashcard to get started'}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
              >
                Create First Card
              </button>
            </div>
          )}
        </div>

        {/* Right Column - Card List & Filters */}
        <div className="space-y-6">
          {/* Search & Filters */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Filters & Search
            </h3>
            
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search flashcards..."
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Difficulty
                </label>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="all">All Difficulties</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </div>

          {/* Card List */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                All Cards ({filteredCards.length})
              </h3>
              <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
                <Share className="w-4 h-4 inline mr-1" />
                Share
              </button>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredCards.map((card, index) => (
                <div
                  key={card.id}
                  onClick={() => {
                    setCurrentIndex(index);
                    setIsFlipped(false);
                    setShowAnswer(false);
                  }}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    index === currentIndex
                      ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                      : 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {card.front}
                        </span>
                        {card.mastered && (
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400">
                        <span className={`px-2 py-1 rounded-full ${getDifficultyColor(card.difficulty)}`}>
                          {card.difficulty}
                        </span>
                        <span>{card.category}</span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-400">
                      {index + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border dark:border-gray-700">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.mastered}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Mastered
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center border dark:border-gray-700">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {stats.dueForReview}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Due Review
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;
