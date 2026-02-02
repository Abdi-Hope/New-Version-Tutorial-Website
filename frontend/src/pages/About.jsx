import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About AE Platform</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
            Welcome to AE Platform – your gateway to modern, accessible, and engaging education.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            At AE Platform, we believe that everyone deserves access to high-quality education. 
            Our mission is to break down barriers to learning by providing comprehensive, 
            interactive courses taught by industry experts.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
            <li className="mb-2">Industry-relevant courses in technology, business, and creative fields</li>
            <li className="mb-2">Expert instructors with real-world experience</li>
            <li className="mb-2">Interactive learning with hands-on projects</li>
            <li className="mb-2">Flexible learning schedules to fit your life</li>
            <li className="mb-2">Personalized learning paths based on your goals</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            To become the leading platform for skill development, empowering millions of learners 
            worldwide to achieve their career and personal growth goals.
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mt-8 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Stats</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50K+</div>
                <div className="text-gray-600 dark:text-gray-400">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 dark:text-green-400">200+</div>
                <div className="text-gray-600 dark:text-gray-400">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">100+</div>
                <div className="text-gray-600 dark:text-gray-400">Teachers</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">95%</div>
                <div className="text-gray-600 dark:text-gray-400">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
