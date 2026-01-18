import React from 'react'
import MainLayout from '../../components/common/Layout/MainLayout'
import CourseCard from '../../components/courses/CourseCard'

const BrowseCourses = () => {
  const sampleCourses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      instructor: 'Sarah Johnson',
      rating: 4.9,
      students: 2543,
      duration: '24h 15m',
      price: 89.99,
      category: 'Programming'
    },
    {
      id: 2,
      title: 'Advanced JavaScript Patterns',
      instructor: 'Michael Chen',
      rating: 4.8,
      students: 1876,
      duration: '18h 30m',
      price: 74.99,
      category: 'Web Development'
    }
  ]

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Browse Courses</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default BrowseCourses
