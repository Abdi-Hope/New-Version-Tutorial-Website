import React, { useState, useEffect, useRef } from 'react';
import { 
  Clock, CheckCircle, XCircle, AlertCircle,
  ChevronLeft, ChevronRight, Flag, HelpCircle,
  BookOpen, Calculator, Brain, Zap,
  PauseCircle, PlayCircle, RefreshCw, CheckSquare
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const QuizInterface = ({
  quiz,
  onComplete,
  onExit,
  timed = true,
  showReview = true
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60); // seconds
  const [isPaused, setIsPaused] = useState(false);
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const timerRef = useRef(null);
  const { theme } = useTheme();

  // Sample quiz data
  const sampleQuiz = quiz || {
    id: 'quiz-1',
    title: 'React Fundamentals Quiz',
    description: 'Test your knowledge of React basics',
    duration: 30, // minutes
    questions: [
      {
        id: 1,
        type: 'multiple-choice',
        question: 'What is the correct syntax for creating a functional component in React?',
        options: [
          'function MyComponent() { return <div>Hello</div>; }',
          'class MyComponent extends React.Component { render() { return <div>Hello</div>; } }',
          'const MyComponent = () => <div>Hello</div>;',
          'Both 1 and 3 are correct'
        ],
        correctAnswer: 3,
        explanation: 'Both function declaration and arrow function syntax are valid for creating functional components.',
        points: 5,
        difficulty: 'easy'
      },
      {
        id: 2,
        type: 'true-false',
        question: 'React components must always return a single JSX element.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'React components can return multiple elements using Fragments (<>...</>) or arrays.',
        points: 3,
        difficulty: 'medium'
      },
      {
        id: 3,
        type: 'multiple-choice',
        question: 'Which hook is used to perform side effects in functional components?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useEffect hook is specifically designed for side effects like data fetching, subscriptions, etc.',
        points: 5,
        difficulty: 'easy'
      },
      {
        id: 4,
        type: 'multiple-select',
        question: 'Which of the following are React lifecycle methods? (Select all that apply)',
        options: ['componentDidMount', 'render', 'useState', 'shouldComponentUpdate'],
        correctAnswer: [0, 1, 3],
        explanation: 'render and shouldComponentUpdate are lifecycle methods in class components. componentDidMount is also a lifecycle method.',
        points: 8,
        difficulty: 'hard'
      }
    ],
    passingScore: 70,
    maxScore: 100
  };

  // Timer effect
  useEffect(() => {
    if (!timed || isPaused || submitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [isPaused, submitted, timed]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    if (submitted) return;
    
    setAnswers(prev => {
      const currentAnswer = prev[questionId];
      
      // Handle multiple-select questions
      if (Array.isArray(sampleQuiz.questions.find(q => q.id === questionId)?.correctAnswer)) {
        const currentArray = Array.isArray(currentAnswer) ? currentAnswer : [];
        
        if (currentArray.includes(answerIndex)) {
          return {
            ...prev,
            [questionId]: currentArray.filter(idx => idx !== answerIndex)
          };
        } else {
          return {
            ...prev,
            [questionId]: [...currentArray, answerIndex]
          };
        }
      }
      
      // Handle single-select questions
      return {
        ...prev,
        [questionId]: currentAnswer === answerIndex ? null : answerIndex
      };
    });
  };

  const handleSubmit = () => {
    if (submitted) return;
    
    clearInterval(timerRef.current);
    setSubmitted(true);
    
    // Calculate score
    let score = 0;
    let totalPoints = 0;
    
    sampleQuiz.questions.forEach(question => {
      totalPoints += question.points;
      
      if (answers[question.id] !== undefined) {
        if (Array.isArray(question.correctAnswer)) {
          // For multiple-select questions
          const correctAnswers = question.correctAnswer;
          const userAnswers = Array.isArray(answers[question.id]) ? answers[question.id] : [];
          
          // Check if all correct answers are selected and no incorrect ones
          const isCorrect = correctAnswers.length === userAnswers.length && 
            correctAnswers.every(ans => userAnswers.includes(ans));
          
          if (isCorrect) {
            score += question.points;
          }
        } else if (answers[question.id] === question.correctAnswer) {
          score += question.points;
        }
      }
    });
    
    const percentage = (score / totalPoints) * 100;
    
    if (onComplete) {
      onComplete({
        score,
        totalPoints,
        percentage,
        passed: percentage >= sampleQuiz.passingScore,
        answers,
        timeSpent: quiz.duration * 60 - timeLeft
      });
    }
  };

  const toggleFlag = (questionId) => {
    setFlaggedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestionData = sampleQuiz.questions[currentQuestion];
  const totalQuestions = sampleQuiz.questions.length;
  const answeredQuestions = Object.keys(answers).length;
  const progress = (currentQuestion + 1) / totalQuestions * 100;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'hard': return 'text-red-500 bg-red-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  return (
    <div className={`
      rounded-xl border min-h-screen
      ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
    `}>
      {/* Quiz Header */}
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{sampleQuiz.title}</h2>
              <p className="text-gray-500">{sampleQuiz.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {timed && (
              <div className={`
                px-4 py-2 rounded-lg font-bold text-lg flex items-center gap-2
                ${timeLeft < 300 ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}
              `}>
                <Clock className="w-5 h-5" />
                <span>{formatTime(timeLeft)}</span>
              </div>
            )}
            
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-2 hover:bg-gray-700/50 rounded-lg"
              aria-label={isPaused ? "Resume quiz" : "Pause quiz"}
            >
              {isPaused ? <PlayCircle className="w-5 h-5" /> : <PauseCircle className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Question {currentQuestion + 1} of {totalQuestions}</span>
            <span>{answeredQuestions} answered</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Navigation */}
        <div className="flex flex-wrap gap-2">
          {sampleQuiz.questions.map((question, index) => {
            const isAnswered = answers[question.id] !== undefined;
            const isFlagged = flaggedQuestions.includes(question.id);
            const isCurrent = index === currentQuestion;
            
            return (
              <button
                key={question.id}
                onClick={() => setCurrentQuestion(index)}
                className={`
                  w-10 h-10 rounded-lg flex items-center justify-center
                  transition-all duration-200
                  ${isCurrent 
                    ? 'bg-blue-500 text-white ring-2 ring-blue-300' 
                    : isAnswered
                      ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                      : theme === 'dark'
                        ? 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                  hover:scale-110 active:scale-95
                `}
                aria-label={`Question ${index + 1}${isAnswered ? ' (answered)' : ''}${isFlagged ? ' (flagged)' : ''}`}
              >
                {index + 1}
                {isFlagged && (
                  <div className="absolute -top-1 -right-1">
                    <Flag className="w-3 h-3 text-red-500" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Area */}
      <div className="p-6">
        {isPaused ? (
          <div className="text-center py-12">
            <PauseCircle className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h3 className="text-xl font-bold mb-2">Quiz Paused</h3>
            <p className="text-gray-500 mb-6">Take a break, then resume when ready</p>
            <button
              onClick={() => setIsPaused(false)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
            >
              Resume Quiz
            </button>
          </div>
        ) : submitted ? (
          <div className="text-center py-12">
            <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
            <h3 className="text-xl font-bold mb-2">Quiz Submitted!</h3>
            <p className="text-gray-500 mb-6">Your answers have been submitted for grading</p>
            {showReview && (
              <button
                onClick={() => setShowExplanation(true)}
                className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium"
              >
                Review Answers
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Question Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestionData.difficulty)}`}>
                    {currentQuestionData.difficulty.toUpperCase()}
                  </div>
                  <div className="text-sm text-gray-500">
                    {currentQuestionData.points} points
                  </div>
                </div>
                
                <button
                  onClick={() => toggleFlag(currentQuestionData.id)}
                  className={`p-2 rounded-lg ${flaggedQuestions.includes(currentQuestionData.id) ? 'text-red-500 bg-red-500/10' : 'hover:bg-gray-700/50'}`}
                  aria-label={flaggedQuestions.includes(currentQuestionData.id) ? "Unflag question" : "Flag question"}
                >
                  <Flag className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="text-lg font-bold mb-4">
                {currentQuestionData.question}
              </h3>
              
              {currentQuestionData.type === 'multiple-select' && (
                <div className="flex items-center gap-2 text-sm text-blue-500 mb-4">
                  <AlertCircle className="w-4 h-4" />
                  <span>Select all that apply</span>
                </div>
              )}
            </div>

            {/* Options */}
            <div className="space-y-3 mb-8">
              {currentQuestionData.options.map((option, index) => {
                const isSelected = Array.isArray(answers[currentQuestionData.id]) 
                  ? answers[currentQuestionData.id]?.includes(index)
                  : answers[currentQuestionData.id] === index;
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(currentQuestionData.id, index)}
                    className={`
                      w-full p-4 rounded-lg border text-left transition-all duration-200
                      ${isSelected
                        ? 'border-blue-500 bg-blue-500/10 ring-2 ring-blue-500/20'
                        : theme === 'dark'
                          ? 'border-gray-700 hover:border-gray-600 hover:bg-gray-700/30'
                          : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }
                      hover:scale-[1.02] active:scale-[0.98]
                    `}
                    disabled={submitted}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-6 h-6 rounded flex items-center justify-center flex-shrink-0
                        ${isSelected 
                          ? 'bg-blue-500 text-white' 
                          : theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
                        }
                      `}>
                        {isSelected && <CheckCircle className="w-4 h-4" />}
                      </div>
                      <div className="font-medium">{option}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation (if reviewing) */}
            {showExplanation && submitted && currentQuestionData.explanation && (
              <div className={`
                mb-6 p-4 rounded-lg border
                ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-blue-50 border-blue-100'}
              `}>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <h4 className="font-bold">Explanation</h4>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {currentQuestionData.explanation}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer Controls */}
      <div className="p-6 border-t dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className={`
                px-4 py-2 rounded-lg flex items-center gap-2
                ${currentQuestion === 0
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-700/50'
                }
              `}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))}
              disabled={currentQuestion === totalQuestions - 1}
              className={`
                px-4 py-2 rounded-lg flex items-center gap-2
                ${currentQuestion === totalQuestions - 1
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-gray-700/50'
                }
              `}
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setAnswers(prev => ({ ...prev, [currentQuestionData.id]: undefined }));
                if (Array.isArray(answers[currentQuestionData.id])) {
                  setAnswers(prev => ({ ...prev, [currentQuestionData.id]: [] }));
                }
              }}
              className="px-4 py-2 rounded-lg hover:bg-gray-700/50 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Clear</span>
            </button>
            
            {onExit && (
              <button
                onClick={onExit}
                className="px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-700/50"
              >
                Exit
              </button>
            )}
            
            {currentQuestion === totalQuestions - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitted}
                className={`
                  px-6 py-2 rounded-lg font-medium flex items-center gap-2
                  ${submitted
                    ? 'bg-green-500 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                  }
                  text-white
                `}
              >
                <CheckSquare className="w-4 h-4" />
                <span>{submitted ? 'Submitted' : 'Submit Quiz'}</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
              >
                Skip & Continue
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      {!submitted && !isPaused && (
        <div className={`
          p-4 border-t dark:border-gray-700
          ${theme === 'dark' ? 'bg-gray-900/50' : 'bg-gray-50'}
        `}>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{answeredQuestions}</div>
              <div className="text-xs text-gray-500">Answered</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{totalQuestions - answeredQuestions}</div>
              <div className="text-xs text-gray-500">Remaining</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{flaggedQuestions.length}</div>
              <div className="text-xs text-gray-500">Flagged</div>
            </div>
            <div>
              <div className="text-2xl font-bold">
                {Math.round((answeredQuestions / totalQuestions) * 100)}%
              </div>
              <div className="text-xs text-gray-500">Progress</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizInterface;
