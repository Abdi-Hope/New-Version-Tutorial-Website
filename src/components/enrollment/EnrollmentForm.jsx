import React, { useState } from "react";
import { User, Mail, Calendar, Book, CreditCard } from "lucide-react";

const EnrollmentForm = ({ course, onEnroll }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    startDate: new Date().toISOString().split('T')[0],
    paymentMethod: "credit_card",
    agreeTerms: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onEnroll(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Enroll in {course.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Complete the form below to start your learning journey
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Personal Information</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        {/* Course Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Book className="w-5 h-5" />
            <span>Course Details</span>
          </h3>
          
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-300">Course</span>
              <span className="font-semibold text-gray-900 dark:text-white">{course.title}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 dark:text-gray-300">Duration</span>
              <span className="text-gray-900 dark:text-white">{course.duration}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-300">Price</span>
              <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${course.price}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>Preferred Start Date</span>
              </div>
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Payment Method</span>
          </h3>
          
          <div className="space-y-3">
            {[
              { id: "credit_card", label: "Credit/Debit Card", icon: "💳" },
              { id: "paypal", label: "PayPal", icon: "🌐" },
              { id: "bank_transfer", label: "Bank Transfer", icon: "🏦" },
              { id: "crypto", label: "Cryptocurrency", icon: "₿" }
            ].map((method) => (
              <label
                key={method.id}
                className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.paymentMethod === method.id
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={formData.paymentMethod === method.id}
                  onChange={handleChange}
                  className="w-5 h-5 text-blue-600"
                />
                <span className="text-2xl">{method.icon}</span>
                <span className="text-gray-900 dark:text-white">{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Terms and Conditions */}
        <div>
          <label className="flex items-start space-x-3">
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              required
              className="w-5 h-5 mt-1 text-blue-600 rounded"
            />
            <span className="text-gray-700 dark:text-gray-300 text-sm">
              I agree to the Terms and Conditions and Privacy Policy. I understand that I will receive course materials and updates via email.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all transform hover:-translate-y-0.5"
        >
          Enroll Now - ${course.price}
        </button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400">
          You'll be redirected to the payment gateway to complete your enrollment
        </p>
      </form>
    </div>
  );
};

export default EnrollmentForm;