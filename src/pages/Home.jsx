import React from 'react'
import MainLayout from '../components/common/Layout/MainLayout'
import TimerDisplay from '../components/common/UI/TimerDisplay'

const Home = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Learn Anything, Anytime with <span className="text-yellow-300">ae</span>
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Connect with expert teachers and access quality education from anywhere.
          </p>
          <div className="space-x-4">
            <button className="px-8 py-3 bg-white text-blue-600 rounded-xl hover:bg-gray-100 text-lg font-semibold">
              Start Learning
            </button>
            <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-xl hover:bg-white/10 text-lg font-semibold">
              Start Teaching
            </button>
          </div>
        </div>
      </section>

      {/* Features & Timer */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card">
                  <h3 className="text-xl font-bold mb-4">Expert Teachers</h3>
                  <p className="text-gray-600 dark:text-gray-400">Learn from certified professionals.</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-bold mb-4">Video Tutorials</h3>
                  <p className="text-gray-600 dark:text-gray-400">High-quality video lessons.</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-bold mb-4">Progress Tracking</h3>
                  <p className="text-gray-600 dark:text-gray-400">Monitor your learning journey.</p>
                </div>
                <div className="card">
                  <h3 className="text-xl font-bold mb-4">Certification</h3>
                  <p className="text-gray-600 dark:text-gray-400">Earn certificates on completion.</p>
                </div>
              </div>
            </div>
            
            <div>
              <TimerDisplay />
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}

export default Home

