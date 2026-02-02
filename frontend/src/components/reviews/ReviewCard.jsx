import React from "react";
import { Star, ThumbsUp, MessageCircle, MoreVertical } from "lucide-react";

const ReviewCard = ({ review }) => {
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(review.likes || 0);
  const [showFullReview, setShowFullReview] = React.useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setIsLiked(!isLiked);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  const shouldTruncate = review.content.length > 200;
  const displayContent = shouldTruncate && !showFullReview
    ? review.content.slice(0, 200) + "..."
    : review.content;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
            {review.authorName.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {review.authorName}
            </h4>
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex">
                {renderStars(review.rating)}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(review.date)}
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Review Content */}
      <div className="mb-4">
        <p className="text-gray-700 dark:text-gray-300">
          {displayContent}
        </p>
        {shouldTruncate && (
          <button
            onClick={() => setShowFullReview(!showFullReview)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm mt-2"
          >
            {showFullReview ? "Show less" : "Read more"}
          </button>
        )}
      </div>

      {/* Course Info */}
      {review.courseTitle && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Review for: <span className="font-semibold text-gray-900 dark:text-white">{review.courseTitle}</span>
          </p>
        </div>
      )}

      {/* Verified Purchase Badge */}
      {review.verifiedPurchase && (
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-sm font-medium mb-4">
          ✓ Verified Purchase
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
              isLiked
                ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400"
                : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            <span>{likeCount}</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span>{review.comments || 0} comments</span>
          </button>
        </div>
        <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm font-medium">
          Report
        </button>
      </div>

      {/* Tags */}
      {review.tags && review.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {review.tags.map((tag, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReviewCard;