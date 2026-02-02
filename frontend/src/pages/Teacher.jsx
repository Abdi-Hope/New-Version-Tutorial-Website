import React from "react";
import { Star, Users, Book, Award, MessageCircle, Globe } from "lucide-react";

const Teacher = () => {
  const teachers = [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior React Developer",
      rating: 4.9,
      students: 25480,
      courses: 8,
      experience: "10+ years",
      bio: "Frontend architect with expertise in React, TypeScript, and modern web development.",
      avatar: "SJ",
      skills: ["React", "TypeScript", "Next.js", "GraphQL"]
    },
    {
      id: 2,
      name: "Michael Chen",
      title: "Backend Engineer",
      rating: 4.8,
      students: 18760,
      courses: 6,
      experience: "8+ years",
      bio: "Specializes in Node.js, microservices, and cloud architecture.",
      avatar: "MC",
      skills: ["Node.js", "AWS", "Docker", "MongoDB"]
    },
    {
      id: 3,
      name: "Emma Wilson",
      title: "UI/UX Designer",
      rating: 4.7,
      students: 12450,
      courses: 5,
      experience: "6+ years",
      bio: "Product designer focused on creating beautiful and functional user experiences.",
      avatar: "EW",
      skills: ["Figma", "UI Design", "UX Research", "Prototyping"]
    },
    {
      id: 4,
      name: "David Kim",
      title: "Data Scientist",
      rating: 4.9,
      students: 18920,
      courses: 7,
      experience: "7+ years",
      bio: "Machine learning expert with focus on Python, TensorFlow, and data visualization.",
      avatar: "DK",
      skills: ["Python", "TensorFlow", "SQL", "Data Viz"]
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      title: "DevOps Engineer",
      rating: 4.8,
      students: 14560,
      courses: 6,
      experience: "9+ years",
      bio: "Infrastructure specialist with expertise in Kubernetes, CI/CD, and cloud automation.",
      avatar: "LR",
      skills: ["Kubernetes", "AWS", "CI/CD", "Terraform"]
    },
    {
      id: 6,
      name: "James Park",
      title: "Mobile Developer",
      rating: 4.7,
      students: 16540,
      courses: 5,
      experience: "5+ years",
      bio: "Cross-platform mobile developer specializing in React Native and Flutter.",
      avatar: "JP",
      skills: ["React Native", "Flutter", "iOS", "Android"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 md:py-10">
      <div className="container mx-auto px-4">
        {/* Header - Optimized */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Expert Instructors
          </h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            Learn from industry professionals with real-world experience
          </p>
        </div>

        {/* Teachers Grid - More compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-12">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden"
            >
              {/* Teacher Header - Compact */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 md:p-5">
                <div className="flex items-center space-x-3">
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center text-lg font-bold shrink-0">
                    {teacher.avatar}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-white truncate">
                      {teacher.name}
                    </h3>
                    <p className="text-white/90 text-sm truncate">{teacher.title}</p>
                  </div>
                </div>
              </div>

              {/* Teacher Info - Compact */}
              <div className="p-4 md:p-5">
                {/* Compact Bio */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {teacher.bio}
                </p>

                {/* Compact Stats */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {teacher.rating}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Rating
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Users className="w-3 h-3 text-blue-500" />
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {(teacher.students / 1000).toFixed(0)}k
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Students
                    </div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Book className="w-3 h-3 text-green-500" />
                      <span className="font-semibold text-gray-900 dark:text-white text-sm">
                        {teacher.courses}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Courses
                    </div>
                  </div>
                </div>

                {/* Compact Skills */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {teacher.skills.slice(0, 3).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                    {teacher.skills.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded text-xs">
                        +{teacher.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Compact Experience & Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5">
                    <Award className="w-4 h-4 text-purple-500" />
                    <span className="text-gray-600 dark:text-gray-300 text-sm">
                      {teacher.experience}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                      Profile
                    </button>
                    <button 
                      className="p-1.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      title="Message"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Teacher CTA - Optimized */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 md:p-8 text-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Teach with Us</h2>
            <p className="text-white/90 max-w-lg mx-auto">
              Share your expertise and impact thousands of learners worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold mb-1">85%</div>
              <p className="text-sm text-white/90">Revenue Share</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold mb-1">50k+</div>
              <p className="text-sm text-white/90">Active Students</p>
            </div>
            <div className="bg-white/10 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold mb-1">24/7</div>
              <p className="text-sm text-white/90">Support</p>
            </div>
          </div>
          
          <div className="text-center">
            <button className="px-6 py-2.5 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              Start Teaching
            </button>
          </div>
        </div>

        {/* Filter/Stats Bar - Added for better UX */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 text-sm">
          <div className="text-gray-600 dark:text-gray-300">
            Showing {teachers.length} expert instructors
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-blue-600 dark:text-blue-400 hover:underline">
              Sort by: Popular
            </button>
            <button className="text-gray-600 dark:text-gray-300 hover:underline">
              Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;