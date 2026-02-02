import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaUsers, FaClock } from "react-icons/fa";

const CourseCard = ({ course }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return num.toString();
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 overflow-hidden h-full flex flex-col">
      {/* Course Image */}
      <div className="relative h-32 sm:h-36 md:h-40 overflow-hidden flex-shrink-0">
        {/* Loading skeleton */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 animate-pulse" />
        )}
        
        {/* Course Image */}
        <img 
          src={course.image}
          alt={course.title}
          className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        
        {/* Fallback if image fails to load */}
        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">
              {course.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
          {course.category}
        </div>
      </div>

      {/* Course Content - Reduced padding */}
      <div className="p-3 flex-1 flex flex-col">
        {/* Title and Description - Very compact */}
        <div className="flex-1 mb-2">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1 line-clamp-2 leading-tight">
            {course.title}
          </h3>
          <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Instructor - Compact */}
        <div className="flex items-center mb-2">
          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            {course.instructor.charAt(0)}
          </div>
          <span className="ml-2 text-xs text-gray-700 dark:text-gray-300 truncate">
            {course.instructor}
          </span>
        </div>

        {/* Course Stats - Ultra compact */}
        <div className="grid grid-cols-3 gap-1 mb-3">
          {/* Rating */}
          <div className="flex items-center justify-center">
            <FaStar className="text-yellow-500 text-xs mr-1" />
            <span className="text-xs font-semibold text-gray-900 dark:text-white">
              {course.rating}
            </span>
          </div>

          {/* Students */}
          <div className="flex items-center justify-center">
            <FaUsers className="text-gray-400 dark:text-gray-500 text-xs mr-1" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {formatNumber(course.students)}
            </span>
          </div>

          {/* Duration */}
          <div className="flex items-center justify-center">
            <FaClock className="text-gray-400 dark:text-gray-500 text-xs mr-1" />
            <span className="text-xs text-gray-600 dark:text-gray-400">
              {course.duration}
            </span>
          </div>
        </div>

        {/* Price and Action - Minimal */}
        <div className="mt-auto pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {/* Price */}
            <div>
              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {course.price}
              </span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 ml-1">
                one-time
              </span>
            </div>
            
            {/* Action Button - Very compact */}
            <Link
              to={`/course/${course.id}`}
              className="px-2.5 py-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium rounded hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;