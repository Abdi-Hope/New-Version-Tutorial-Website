import React from 'react'
import { Link } from 'react-router-dom'
import { FaStar, FaUsers, FaClock, FaPlayCircle } from 'react-icons/fa'

const CourseCard = ({ course }) => {
  const {
    id,
    title,
    instructor,
    rating,
    students,
    duration,
    price,
    image,
    category
  } = course || {
    id: 1,
    title: 'Introduction to React Programming',
    instructor: 'John Doe',
    rating: 4.8,
    students: 1245,
    duration: '12h 30m',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800',
    category: 'Programming'
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Course Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-400 to-indigo-500">
        <div className="absolute inset-0 flex items-center justify-center">
          <FaPlayCircle className="w-16 h-16 text-white/80" />
        </div>
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4">By {instructor}</p>
        
        {/* Rating */}
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={w-4 h-4 }
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">{rating}</span>
          <span className="mx-2 text-gray-300"></span>
          <span className="text-sm text-gray-600">{students.toLocaleString()} students</span>
        </div>
        
        {/* Details */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center">
            <FaClock className="w-4 h-4 mr-2" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="w-4 h-4 mr-2" />
            <span>Beginner</span>
          </div>
        </div>
        
        {/* Price and Action */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <span className="text-2xl font-bold text-gray-800"></span>
            <span className="text-gray-500 line-through ml-2">.99</span>
          </div>
          <Link
            to={/course/}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
