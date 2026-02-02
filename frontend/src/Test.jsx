import React from 'react'

export default function Test() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-red-500 to-yellow-500 flex items-center justify-center">
      <div className="text-center bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          🚨 TEST PAGE 🚨
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          If this is styled (red background, white card), Tailwind works.
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="h-16 bg-blue-500 rounded-lg"></div>
          <div className="h-16 bg-green-500 rounded-lg"></div>
          <div className="h-16 bg-purple-500 rounded-lg"></div>
        </div>
        <button className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-bold hover:scale-105 transition-transform">
          Test Button
        </button>
      </div>
    </div>
  )
}
