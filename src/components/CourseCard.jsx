import React from "react";
import { Link } from "react-router-dom";
import { FaStar, FaUsers, FaClock } from "react-icons/fa";

const CourseCard = ({ course }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {course.category.toUpperCase()}
        </div>
      </div>

      {/* Course Content */}
      <div className="p-6">
        {/* Title and Description */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {course.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
          {course.description}
        </p>

        {/* Instructor */}
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            {course.instructor.charAt(0)}
          </div>
          <span className="ml-3 text-gray-700 dark:text-gray-300 font-medium">
            {course.instructor}
          </span>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-6">
          {/* Rating */}
          <div className="flex items-center">
            <FaStar className="text-yellow-500 mr-1" />
            <span className="font-semibold">{course.rating}</span>
            <span className="text-gray-500 dark:text-gray-400 ml-1">/5.0</span>
          </div>

          {/* Students */}
          <div className="flex items-center">
            <FaUsers className="text-gray-400 dark:text-gray-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-400">{course.students.toLocaleString()}</span>
          </div>

          {/* Duration */}
          <div className="flex items-center">
            <FaClock className="text-gray-400 dark:text-gray-500 mr-2" />
            <span className="text-gray-600 dark:text-gray-400">{course.duration}</span>
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
          <div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {course.price}
            </span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">one-time</span>
          </div>
          <Link
            to={`/course/${course.id}`}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
