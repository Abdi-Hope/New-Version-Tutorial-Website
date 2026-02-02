import React from "react";
import { CheckCircle, Clock, AlertCircle, XCircle, Download } from "lucide-react";

const EnrollmentStatus = ({ enrollment }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "in_progress":
        return <Clock className="w-6 h-6 text-blue-500" />;
      case "pending":
        return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case "cancelled":
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300";
      case "in_progress":
        return "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300";
      case "pending":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300";
      case "cancelled":
        return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300";
      default:
        return "bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-300";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Enrollment Status
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Course: {enrollment.courseTitle}
          </p>
        </div>
        <div className={`px-4 py-2 rounded-lg ${getStatusColor(enrollment.status)}`}>
          <div className="flex items-center space-x-2">
            {getStatusIcon(enrollment.status)}
            <span className="font-semibold capitalize">{enrollment.status.replace("_", " ")}</span>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Enrollment Progress
        </h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
          
          <div className="space-y-8 relative">
            {[
              { step: 1, title: "Application Submitted", date: enrollment.appliedDate, completed: true },
              { step: 2, title: "Payment Processed", date: enrollment.paymentDate, completed: enrollment.status !== "pending" },
              { step: 3, title: "Access Granted", date: enrollment.accessDate, completed: ["in_progress", "completed"].includes(enrollment.status) },
              { step: 4, title: "Course Started", date: enrollment.startDate, completed: ["in_progress", "completed"].includes(enrollment.status) },
              { step: 5, title: "Course Completed", date: enrollment.completionDate, completed: enrollment.status === "completed" }
            ].map((step) => (
              <div key={step.step} className="flex items-start space-x-4">
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  step.completed
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}>
                  {step.completed ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span>{step.step}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {step.date ? formatDate(step.date) : "Pending"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enrollment Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Enrollment Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Enrollment ID</span>
              <span className="font-mono text-gray-900 dark:text-white">{enrollment.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Enrolled On</span>
              <span className="text-gray-900 dark:text-white">{formatDate(enrollment.enrolledDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Access Expires</span>
              <span className="text-gray-900 dark:text-white">{formatDate(enrollment.expiryDate)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Payment Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Amount Paid</span>
              <span className="text-gray-900 dark:text-white">${enrollment.amount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Payment Method</span>
              <span className="text-gray-900 dark:text-white capitalize">{enrollment.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-300">Transaction ID</span>
              <span className="font-mono text-sm text-gray-900 dark:text-white">{enrollment.transactionId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-8 pt-6 border-t dark:border-gray-700 flex flex-wrap gap-3">
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          Access Course
        </button>
        <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300 rounded-lg transition-colors flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Download Invoice</span>
        </button>
        <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
          Share Certificate
        </button>
        <button className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
          Cancel Enrollment
        </button>
      </div>
    </div>
  );
};

export default EnrollmentStatus;