import React from 'react';

const CompletionCertificate = ({
  courseTitle = "React Mastery",
  studentName = "Alex Johnson",
  completionDate = "January 30, 2024",
  instructor = "Sarah Wilson",
  hoursCompleted = "45",
  grade = "A+",
  certificateId = "CERT-2024-001234"
}) => {
  const handleDownload = () => {
    alert('Certificate downloaded!');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`I completed "${courseTitle}" with grade ${grade}!`);
    alert('Certificate link copied to clipboard!');
  };

  const handleVerify = () => {
    window.open(`/verify/${certificateId}`, '_blank');
  };

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-2xl p-8 border-4 border-yellow-200 dark:border-yellow-800 shadow-lg">
      <div className="text-center mb-8">
        <div className="text-4xl mb-2">🎓</div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Certificate of Completion
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          This certifies that
        </p>
      </div>

      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-4 border-b-4 border-yellow-400 dark:border-yellow-600 pb-4">
          {studentName}
        </div>
        <p className="text-gray-700 dark:text-gray-300">
          has successfully completed the course
        </p>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          "{courseTitle}"
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          with distinction
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Date Completed
          </div>
          <div className="font-bold text-gray-900 dark:text-white">
            {completionDate}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Hours Completed
          </div>
          <div className="font-bold text-gray-900 dark:text-white">
            {hoursCompleted} hours
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Final Grade
          </div>
          <div className="font-bold text-green-600 dark:text-green-400 text-xl">
            {grade}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            Certificate ID
          </div>
          <div className="font-mono text-sm text-gray-900 dark:text-white">
            {certificateId}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end mb-8 pt-8 border-t-2 border-gray-300 dark:border-gray-600">
        <div className="text-center">
          <div className="font-bold text-gray-900 dark:text-white mb-1">
            {instructor}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Course Instructor
          </div>
          <div className="mt-4 border-t-2 border-gray-400 w-32 mx-auto"></div>
        </div>
        <div className="text-center">
          <div className="text-2xl mb-2">🏫</div>
          <div className="font-bold text-gray-900 dark:text-white">
            Tutorial Academy
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Online Learning Platform
          </div>
          <div className="mt-4 border-t-2 border-gray-400 w-32 mx-auto"></div>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleDownload}
          className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download PDF
        </button>
        <button
          onClick={handleShare}
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default CompletionCertificate;
