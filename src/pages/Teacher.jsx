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
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Instructors
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn from industry experts with years of experience and passion for teaching
          </p>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teachers.map((teacher) => (
            <div
              key={teacher.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Teacher Header */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                    {teacher.avatar}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{teacher.name}</h3>
                    <p className="opacity-90">{teacher.title}</p>
                  </div>
                </div>
              </div>

              {/* Teacher Info */}
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {teacher.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {teacher.rating}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Rating
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {(teacher.students / 1000).toFixed(1)}k
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Students
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center space-x-1 mb-1">
                      <Book className="w-4 h-4 text-green-500" />
                      <span className="font-bold text-gray-900 dark:text-white">
                        {teacher.courses}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Courses
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Expertise
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {teacher.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Experience */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-600 dark:text-gray-300">
                      {teacher.experience} experience
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Globe className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-300">Online</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3">
                  <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    View Profile
                  </button>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <MessageCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Become a Teacher CTA */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Become an Instructor</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Share your knowledge and reach students around the world
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="text-3xl font-bold mb-2">85%</div>
              <p>Revenue Share</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="text-3xl font-bold mb-2">50k+</div>
              <p>Active Students</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <p>Support</p>
            </div>
          </div>
          <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Teacher;