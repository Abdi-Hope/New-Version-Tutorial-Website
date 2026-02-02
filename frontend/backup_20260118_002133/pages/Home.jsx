import React from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../../components/common/Layout/MainLayout'
import CourseCard from '../../components/courses/CourseCard'
import { FaGraduationCap, FaPlay, FaChartLine, FaUsers, FaCertificate, FaLaptopCode } from 'react-icons/fa'

const Home = () => {
  const features = [
    {
      icon: <FaGraduationCap className="w-8 h-8" />,
      title: 'Expert Teachers',
      description: 'Learn from certified professionals with industry experience',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <FaPlay className="w-8 h-8" />,
      title: 'Video Tutorials',
      description: 'High-quality video lessons with downloadable materials',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: 'Progress Tracking',
      description: 'Monitor your learning journey with detailed analytics',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <FaUsers className="w-8 h-8" />,
      title: 'Community Support',
      description: 'Connect with peers and teachers in discussion forums',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: <FaCertificate className="w-8 h-8" />,
      title: 'Certification',
      description: 'Earn certificates upon course completion',
      color: 'from-red-500 to-red-600'
    },
    {
      icon: <FaLaptopCode className="w-8 h-8" />,
      title: 'Interactive Learning',
      description: 'Hands-on projects and coding exercises',
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

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
    },
    {
      id: 3,
      title: 'Data Science Fundamentals',
      instructor: 'Dr. Emily Davis',
      rating: 4.7,
      students: 3124,
      duration: '32h 45m',
      price: 99.99,
      category: 'Data Science'
    },
    {
      id: 4,
      title: 'UI/UX Design Principles',
      instructor: 'Alex Rodriguez',
      rating: 4.6,
      students: 1567,
      duration: '15h 20m',
      price: 64.99,
      category: 'Design'
    }
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Learn Anything, Anytime with <span className="text-yellow-300">ae</span>
            </h1>
            <p className="text-xl mb-10 text-blue-100">
              Connect with expert teachers and access quality education from anywhere in the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/courses"
                className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 text-lg font-semibold transition-colors shadow-lg"
              >
                Start Learning
              </Link>
              <Link
                to="/teach"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 text-lg font-semibold transition-colors"
              >
                Start Teaching
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Why Choose <span className="text-blue-600">ae Learning</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide the best learning experience with modern tools and expert guidance
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className={inline-flex p-3 rounded-lg bg-gradient-to-r  text-white mb-4}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">Popular Courses</h2>
              <p className="text-gray-600 mt-2">Learn from our most popular courses</p>
            </div>
            <Link
              to="/courses"
              className="text-blue-600 hover:text-blue-700 font-semibold flex items-center"
            >
              View All Courses
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sampleCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-blue-100 text-xl mb-10 max-w-2xl mx-auto">
            Join thousands of students and teachers already using ae Learning Platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 text-lg font-semibold"
            >
              Get Started Free
            </Link>
            <Link
              to="/courses"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 text-lg font-semibold"
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default Home


