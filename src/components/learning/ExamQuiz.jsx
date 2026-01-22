import React, { useState } from "react";
import { Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";

const ExamQuiz = ({ questions, timeLimit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60); // Convert to seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(null);

  // Timer effect
  React.useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswerSelect = (questionId, optionId) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Calculate score
    let correct = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    setScore({
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100)
    });
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Exam Header */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Final Exam</h2>
            <p className="text-gray-600 dark:text-gray-300">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-lg">
              <Clock className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-red-600 dark:text-red-400 font-medium">
                {formatTime(timeLeft)}
              </span>
            </div>
            
            {!isSubmitted && (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Submit Exam
              </button>
            )}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mt-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
        </div>
      </div>

      {!isSubmitted ? (
        /* Question Card */
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="mb-6">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center font-bold">
                {currentQuestion + 1}
              </span>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {question.question}
                </h3>
                {question.description && (
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {question.description}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(question.id, option.id)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                  answers[question.id] === option.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    answers[question.id] === option.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">{option.text}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-lg ${
                currentQuestion === 0
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              Previous
            </button>
            
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
              disabled={currentQuestion === questions.length - 1}
              className={`px-6 py-2 rounded-lg ${
                currentQuestion === questions.length - 1
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Next Question
            </button>
          </div>
        </div>
      ) : (
        /* Results Card */
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 text-center">
          {score.percentage >= 70 ? (
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
          ) : (
            <XCircle className="w-20 h-20 text-red-500 mx-auto mb-4" />
          )}
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {score.percentage >= 70 ? 'Congratulations!' : 'Keep Practicing!'}
          </h3>
          
          <div className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {score.percentage}%
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {score.correct}/{score.total}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Correct Answers</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl font-bold text-gray-800 dark:text-white">
                {score.total - score.correct}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Incorrect Answers</div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {score.percentage >= 70 ? 'PASS' : 'FAIL'}
              </div>
              <div className="text-gray-600 dark:text-gray-300">Result</div>
            </div>
          </div>
          
          <div className="space-x-4">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setIsSubmitted(false);
                setTimeLeft(timeLimit * 60);
                setScore(null);
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Retake Exam
            </button>
            <button className="px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-300 rounded-lg transition-colors">
              Review Answers
            </button>
          </div>
        </div>
      )}

      {/* Question Navigation */}
      {!isSubmitted && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Questions</h4>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  currentQuestion === index
                    ? 'bg-blue-500 text-white'
                    : answers[q.id]
                    ? 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamQuiz;