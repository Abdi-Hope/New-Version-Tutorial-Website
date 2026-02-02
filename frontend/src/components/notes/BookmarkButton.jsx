import React, { useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';

const BookmarkButton = ({ lessonId, lessonTitle, onBookmark }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleBookmark = () => {
    setIsAnimating(true);
    setIsBookmarked(!isBookmarked);
    
    if (onBookmark) {
      onBookmark({
        lessonId,
        lessonTitle,
        bookmarked: !isBookmarked,
        timestamp: new Date().toISOString()
      });
    }

    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <button
      onClick={handleBookmark}
      className={`p-2 rounded-lg transition-all duration-200 ${
        isBookmarked
          ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
      } ${isAnimating ? 'scale-110' : ''}`}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark this lesson'}
    >
      {isBookmarked ? (
        <BookmarkCheck className="w-5 h-5 fill-current" />
      ) : (
        <Bookmark className="w-5 h-5" />
      )}
    </button>
  );
};

export default BookmarkButton;
