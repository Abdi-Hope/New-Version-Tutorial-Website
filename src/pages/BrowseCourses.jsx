import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CourseCard from "../components/CourseCard";

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock course data
  const mockCourses = [
    {
      id: 1,
      title: "React Fundamentals",
      description: "Learn React from scratch with hands-on projects",
      instructor: "John Doe",
      price: "$49.99",
      rating: 4.8,
      students: 1250,
      duration: "12 hours",
      category: "web",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400"
    },
    {
      id: 2,
      title: "Advanced JavaScript",
      description: "Master modern JavaScript concepts and patterns",
      instructor: "Jane Smith",
      price: "$59.99",
      rating: 4.9,
      students: 980,
      duration: "15 hours",
      category: "web",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w-400"
    },
    {
      id: 3,
      title: "UI/UX Design Principles",
      description: "Learn to create beautiful and user-friendly interfaces",
      instructor: "Alex Johnson",
      price: "$39.99",
      rating: 4.7,
      students: 2100,
      duration: "10 hours",
      category: "design",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400"
    },
    {
      id: 4,
      title: "Python for Data Science",
      description: "Python programming with focus on data analysis",
      instructor: "Michael Chen",
      price: "$69.99",
      rating: 4.9,
      students: 3200,
      duration: "20 hours",
      category: "data",
      image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec3?w=400"
    },
    {
      id: 5,
      title: "Mobile App Development",
      description: "Build cross-platform mobile apps with React Native",
      instructor: "Sarah Williams",
      price: "$79.99",
      rating: 4.6,
      students: 870,
      duration: "18 hours",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400"
    },
    {
      id: 6,
      title: "DevOps & CI/CD",
      description: "Modern DevOps practices and continuous deployment",
      instructor: "Robert Brown",
      price: "$89.99",
      rating: 4.8,
      students: 650,
      duration: "16 hours",
      category: "devops",
      image: "https://images.unsplash.com/photo-1457305237443-44c3d5a30b89?w=400"
    }
  ];

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "web", name: "Web Development" },
    { id: "mobile", name: "Mobile Development" },
    { id: "data", name: "Data Science" },
    { id: "design", name: "UI/UX Design" },
    { id: "devops", name: "DevOps" }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCourses(mockCourses);
      setLoading(false);
    }, 500);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Browse Our Courses
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Discover the perfect course to advance your skills and career. 
          Learn from industry experts with hands-on projects.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-4 top-3.5 text-gray-400">
                
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Filter by:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-gray-600 dark:text-gray-400">
          Showing {filteredCourses.length} of {courses.length} courses
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4"></div>
          <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No courses found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
            }}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Can't find what you're looking for?
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
          Suggest a course topic or contact our team for custom learning paths.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
        >
          Contact Our Team
          <span className="ml-2"></span>
        </Link>
      </div>
    </div>
  );
};

export default BrowseCourses;
