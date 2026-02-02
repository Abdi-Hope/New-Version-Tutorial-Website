import React, { useState } from "react";
import { Star, Send, Image, Smile } from "lucide-react";

const ReviewForm = ({ onSubmit, courseTitle }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    anonymous: false,
    allowComments: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      rating,
      courseTitle,
      date: new Date().toISOString()
    });
    setRating(0);
    setFormData({
      title: "",
      content: "",
      anonymous: false,
      allowComments: true
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
        Write a Review
      </h3>
      {courseTitle && (
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Share your experience with {courseTitle}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Overall Rating *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="p-1"
              >
                <Star
                  className={`w-8 h-8 transition-transform hover:scale-110 ${
                    star <= (hoverRating || rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              </button>
            ))}
            <span className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">
              {rating}.0
            </span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
            <span>Poor</span>
            <span>Excellent</span>
          </div>
        </div>

        {/* Review Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Review Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Summarize your experience"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Review Content */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Detailed Review *
          </label>
          <div className="relative">
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="5"
              required
              placeholder="What did you like or dislike? What did the instructor do well? Is there anything that could be improved?"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="absolute right-3 bottom-3 flex items-center space-x-2">
              <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                <Smile className="w-5 h-5 text-gray-400" />
              </button>
              <button type="button" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg">
                <Image className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Minimum 50 characters. Share honest feedback to help others.
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">Post anonymously</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Your name won't be shown
            </span>
          </label>

          <label className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="allowComments"
                checked={formData.allowComments}
                onChange={handleChange}
                className="w-5 h-5 text-blue-600 rounded"
              />
              <span className="text-gray-700 dark:text-gray-300">Allow comments</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Others can comment on your review
            </span>
          </label>
        </div>

        {/* Review Guidelines */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            Review Guidelines
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
            <li>• Be respectful and constructive</li>
            <li>• Focus on the course content and instruction</li>
            <li>• Avoid personal attacks or offensive language</li>
            <li>• Share specific examples from your experience</li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={rating === 0 || formData.content.length < 50}
          className={`w-full py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all ${
            rating === 0 || formData.content.length < 50
              ? "bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transform hover:-translate-y-0.5"
          }`}
        >
          <Send className="w-5 h-5" />
          <span>Submit Review</span>
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;