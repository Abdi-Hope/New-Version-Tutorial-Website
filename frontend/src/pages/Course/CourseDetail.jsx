import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ModuleCard from "../../components/learning/ModuleCard";
import TutorialVideo from "../../components/learning/TutorialVideo";
import ExamQuiz from "../../components/learning/ExamQuiz";
import { ReviewCard, ReviewForm } from "../../components/reviews";
import { EnrollmentForm } from "../../components/enrollment";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [showEnrollment, setShowEnrollment] = useState(false);

  // Inline SVG icons
  const PlayIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const DownloadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  );

  const BookOpenIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );

  const AwardIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const GlobeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );

  const ClockIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const StarIcon = ({ filled = false }) => (
    <svg className="w-5 h-5" fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );

  const UsersIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0H21" />
    </svg>
  );

  const TargetIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const BarChartIcon = () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );

  // Mock data - FIXED: Separate reviewCount from reviewList
  const course = {
    id: courseId,
    title: "Advanced React Development",
    instructor: "Sarah Johnson",
    rating: 4.8,
    reviewCount: 1247, // Number of reviews
    students: 15420,
    duration: "8 weeks",
    level: "Intermediate",
    price: 299,
    description: "Master React with hooks, context API, and advanced patterns. Build real-world applications with modern React ecosystem.",
    category: "Web Development",
    language: "English",
    lastUpdated: "2024-01-15",
    certificate: true,
    access: "Lifetime",
    
    modules: [
      { id: 1, order: 1, title: "React Fundamentals", description: "Learn core React concepts", progress: 100, videoCount: 12, resourceCount: 8 },
      { id: 2, order: 2, title: "Hooks & State Management", description: "Master useState, useEffect, and custom hooks", progress: 75, videoCount: 15, resourceCount: 10 },
      { id: 3, order: 3, title: "Advanced Patterns", description: "Learn render props, HOCs, and compound components", progress: 25, videoCount: 10, resourceCount: 6 },
      { id: 4, order: 4, title: "Performance Optimization", description: "Memoization, code splitting, and lazy loading", progress: 0, videoCount: 8, resourceCount: 7 },
      { id: 5, order: 5, title: "Testing & Deployment", description: "Jest, React Testing Library, and deployment strategies", progress: 0, videoCount: 6, resourceCount: 5 },
    ],

    reviewList: [ // Array of review objects
      {
        id: 1,
        authorName: "Alex Chen",
        rating: 5,
        date: "2024-01-10",
        content: "This course transformed my React skills. The instructor explains complex concepts in a simple way. The projects are industry-relevant.",
        likes: 42,
        comments: 5,
        verifiedPurchase: true,
        courseTitle: "Advanced React Development",
        tags: ["Comprehensive", "Well Structured", "Great Instructor"]
      },
      {
        id: 2,
        authorName: "Maria Garcia",
        rating: 4,
        date: "2024-01-08",
        content: "Good course overall. Some sections could be more detailed, but the practical exercises are very helpful.",
        likes: 18,
        comments: 2,
        verifiedPurchase: true,
        courseTitle: "Advanced React Development",
        tags: ["Practical", "Useful Exercises"]
      }
    ],

    features: [
      { icon: <PlayIcon />, text: "48 hours of video content" },
      { icon: <DownloadIcon />, text: "Downloadable resources" },
      { icon: <BookOpenIcon />, text: "Hands-on projects" },
      { icon: <AwardIcon />, text: "Certificate of completion" },
      { icon: <GlobeIcon />, text: "Access on mobile and TV" },
      { icon: <ClockIcon />, text: "Lifetime access" }
    ]
  };

  // Mock exam questions
  const examQuestions = [
    {
      id: 1,
      question: "What is the purpose of React.memo()?",
      description: "Select the most accurate description",
      options: [
        { id: "a", text: "To memoize expensive calculations" },
        { id: "b", text: "To prevent unnecessary re-renders of functional components" },
        { id: "c", text: "To cache API responses" },
        { id: "d", text: "To memoize component state" }
      ],
      correctAnswer: "b"
    },
    {
      id: 2,
      question: "Which hook is used for side effects in functional components?",
      options: [
        { id: "a", text: "useState" },
        { id: "b", text: "useEffect" },
        { id: "c", text: "useContext" },
        { id: "d", text: "useReducer" }
      ],
      correctAnswer: "b"
    }
  ];

  const videoData = {
    url: "https://example.com/video.mp4",
    title: "React Hooks Introduction",
    description: "Learn how to use useState and useEffect hooks"
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            <div className="lg:w-2/3">
              <nav className="text-sm mb-4">
                <Link to="/" className="hover:underline">Home</Link>
                <span className="mx-2">/</span>
                <Link to="/courses" className="hover:underline">Courses</Link>
                <span className="mx-2">/</span>
                <span>Advanced React Development</span>
              </nav>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl mb-6 opacity-90">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <span className="font-bold">SJ</span>
                  </div>
                  <div>
                    <p className="font-semibold">Instructor</p>
                    <p>{course.instructor}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <StarIcon filled />
                  <span className="font-bold">{course.rating}</span>
                  <span className="opacity-80">({course.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <UsersIcon />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <ClockIcon />
                  <span>{course.duration}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-white/20 rounded-full">#{course.category}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full">{course.level}</span>
                <span className="px-3 py-1 bg-white/20 rounded-full">{course.language}</span>
                {course.certificate && (
                  <span className="px-3 py-1 bg-green-500/20 rounded-full">Certificate</span>
                )}
              </div>
            </div>
            
            <div className="lg:w-1/3 mt-8 lg:mt-0">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-3xl font-bold mb-4">${course.price}</div>
                
                <button
                  onClick={() => setShowEnrollment(true)}
                  className="w-full py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors mb-4"
                >
                  Enroll Now
                </button>
                
                <button className="w-full py-3 border-2 border-white text-white rounded-lg hover:bg-white/10 transition-colors">
                  Add to Wishlist
                </button>
                
                <div className="mt-6 space-y-3">
                  <p className="font-semibold">This course includes:</p>
                  {course.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="text-white">
                        {feature.icon}
                      </div>
                      <span>{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="border-b dark:border-gray-700 mb-8">
          <nav className="flex space-x-8">
            {["overview", "curriculum", "instructor", "reviews", "exam"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === tab
                    ? "border-blue-600 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Course Description</h2>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Take your React skills to the next level with this comprehensive course. 
                    You'll learn advanced patterns, performance optimization techniques, 
                    and modern React ecosystem tools.
                  </p>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">What You'll Learn</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Master React hooks and custom hooks",
                      "Implement advanced state management patterns",
                      "Optimize React application performance",
                      "Write comprehensive tests",
                      "Deploy React applications to production",
                      "Build scalable component architectures"
                    ].map((item, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <TargetIcon />
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sample Video */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Preview Course</h2>
                  <TutorialVideo {...videoData} />
                </div>
              </div>
            )}

            {activeTab === "curriculum" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Course Curriculum</h2>
                  <div className="text-gray-600 dark:text-gray-400">
                    {course.modules.length} modules • 48 lessons • 12 hours
                  </div>
                </div>
                
                <div className="space-y-4">
                  {course.modules.map((module) => (
                    <ModuleCard 
                      key={module.id} 
                      module={module} 
                      courseId={courseId} 
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Student Reviews</h2>
                      <div className="flex items-center space-x-2 mt-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} filled={i < Math.floor(course.rating)} />
                          ))}
                        </div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">{course.rating}</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          ({course.reviewCount} reviews)
                        </span>
                      </div>
                    </div>
                    <BarChartIcon />
                  </div>

                  <div className="space-y-6">
                    {/* FIXED: Use .map() to render each review */}
                    {course.reviewList.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                </div>

                {/* Review Form */}
                <ReviewForm 
                  onSubmit={(review) => console.log("Review submitted:", review)}
                  courseTitle={course.title}
                />
              </div>
            )}

            {activeTab === "exam" && (
              <div>
                <ExamQuiz 
                  questions={examQuestions}
                  timeLimit={60} // 60 minutes
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Course Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Course Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Completion Rate</span>
                    <span className="font-semibold text-gray-900 dark:text-white">78%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: "78%" }} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Student Satisfaction</span>
                    <span className="font-semibold text-gray-900 dark:text-white">94%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: "94%" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Requirements</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Basic JavaScript knowledge</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Familiarity with HTML & CSS</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Node.js installed on your computer</span>
                </li>
              </ul>
            </div>

            {/* Share Course */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-4">Share this course</h3>
              <div className="flex space-x-3">
                {["twitter", "facebook", "linkedin", "link"].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{social.charAt(0).toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Modal */}
      {showEnrollment && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Enroll in Course</h3>
                <button
                  onClick={() => setShowEnrollment(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              </div>
              <EnrollmentForm 
                course={course}
                onEnroll={(data) => {
                  console.log("Enrollment data:", data);
                  setShowEnrollment(false);
                  // Redirect to payment page
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;