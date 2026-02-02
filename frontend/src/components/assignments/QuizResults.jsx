import React, { useState } from 'react';
import { 
  Award, Trophy, TrendingUp, TrendingDown,
  CheckCircle, XCircle, Clock, BarChart3,
  Share2, Download, RefreshCw, BookOpen,
  Star, Target, Zap, HelpCircle, ChevronRight
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const QuizResults = ({ 
  results,
  quiz,
  onRetake,
  onReview,
  onExit
}) => {
  const [detailedView, setDetailedView] = useState(false);
  const { theme } = useTheme();

  // Sample results data
  const sampleResults = results || {
    score: 76,
    totalPoints: 100,
    percentage: 76,
    passed: true,
    passingScore: 70,
    timeSpent: 1250, // seconds
    answers: {
      1: 3, // Question 1, answered option 3 (correct)
      2: 0, // Question 2, answered option 0 (incorrect)
      3: 1, // Question 3, answered option 1 (correct)
      4: [0, 3] // Question 4, answered options 0 and 3 (partial)
    },
    rank: 8,
    totalParticipants: 45,
    date: new Date().toISOString()
  };

  const sampleQuiz = quiz || {
    id: 'quiz-1',
    title: 'React Fundamentals Quiz',
    questions: [
      {
        id: 1,
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
        question: 'React components must always return a single JSX element.',
        options: ['True', 'False'],
        correctAnswer: 0,
        explanation: 'React components can return multiple elements using Fragments (<>...</>) or arrays.',
        points: 3,
        difficulty: 'medium'
      },
      {
        id: 3,
        question: 'Which hook is used to perform side effects in functional components?',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useEffect hook is specifically designed for side effects like data fetching, subscriptions, etc.',
        points: 5,
        difficulty: 'easy'
      },
      {
        id: 4,
        question: 'Which of the following are React lifecycle methods? (Select all that apply)',
        options: ['componentDidMount', 'render', 'useState', 'shouldComponentUpdate'],
        correctAnswer: [0, 1, 3],
        explanation: 'render and shouldComponentUpdate are lifecycle methods in class components. componentDidMount is also a lifecycle method.',
        points: 8,
        difficulty: 'hard'
      }
    ]
  };

  const calculatePerformance = () => {
    let correct = 0;
    let partiallyCorrect = 0;
    let incorrect = 0;
    let totalPossible = 0;
    let earnedPoints = 0;

    sampleQuiz.questions.forEach(question => {
      totalPossible += question.points;
      const userAnswer = sampleResults.answers[question.id];
      
      if (userAnswer !== undefined) {
        if (Array.isArray(question.correctAnswer)) {
          // Multiple-select question
          const correctAnswers = new Set(question.correctAnswer);
          const userAnswers = new Set(Array.isArray(userAnswer) ? userAnswer : [userAnswer]);
          
          // Calculate intersection
          const intersection = [...correctAnswers].filter(x => userAnswers.has(x));
          
          if (intersection.length === correctAnswers.size && intersection.length === userAnswers.size) {
            correct++;
            earnedPoints += question.points;
          } else if (intersection.length > 0) {
            partiallyCorrect++;
            earnedPoints += (intersection.length / correctAnswers.size) * question.points;
          } else {
            incorrect++;
          }
        } else {
          // Single-select question
          if (userAnswer === question.correctAnswer) {
            correct++;
            earnedPoints += question.points;
          } else {
            incorrect++;
          }
        }
      } else {
        incorrect++;
      }
    });

    const accuracy = (correct / sampleQuiz.questions.length) * 100;
    const timePerQuestion = sampleResults.timeSpent / sampleQuiz.questions.length;

    return {
      correct,
      partiallyCorrect,
      incorrect,
      totalQuestions: sampleQuiz.questions.length,
      earnedPoints,
      totalPossible,
      accuracy: accuracy.toFixed(1),
      timePerQuestion: Math.round(timePerQuestion),
      percentageCorrect: (correct / sampleQuiz.questions.length * 100).toFixed(1)
    };
  };

  const performance = calculatePerformance();
  const passed = sampleResults.percentage >= sampleResults.passingScore;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-green-500 bg-green-500/10';
    if (percentage >= 80) return 'text-blue-500 bg-blue-500/10';
    if (percentage >= 70) return 'text-yellow-500 bg-yellow-500/10';
    if (percentage >= 60) return 'text-orange-500 bg-orange-500/10';
    return 'text-red-500 bg-red-500/10';
  };

  const getGradeLetter = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  return (
    <div className={`
      rounded-xl border
      ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
    `}>
      {/* Header */}
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className={`
              p-3 rounded-lg
              ${passed 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                : 'bg-gradient-to-r from-red-500 to-orange-500'
              }
              text-white
            `}>
              {passed ? <Award className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold">{sampleQuiz.title} - Results</h2>
              <p className="text-gray-500">Completed on {new Date(sampleResults.date).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-700/50 rounded-lg">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-700/50 rounded-lg">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Score Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className={`
            p-6 rounded-xl border text-center
            ${passed 
              ? 'bg-green-500/10 border-green-500/20' 
              : 'bg-red-500/10 border-red-500/20'
            }
          `}>
            <div className="text-5xl font-bold mb-2">{sampleResults.percentage}%</div>
            <div className={`text-xl font-bold mb-2 ${passed ? 'text-green-500' : 'text-red-500'}`}>
              {getGradeLetter(sampleResults.percentage)} - {passed ? 'PASSED' : 'FAILED'}
            </div>
            <div className="text-gray-500">
              {performance.earnedPoints}/{performance.totalPossible} points
            </div>
          </div>
          
          <div className={`
            p-6 rounded-xl border
            ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-blue-50 border-blue-100'}
          `}>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">{performance.correct}</div>
                <div className="text-sm text-gray-500">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-500">{performance.partiallyCorrect}</div>
                <div className="text-sm text-gray-500">Partial</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">{performance.incorrect}</div>
                <div className="text-sm text-gray-500">Incorrect</div>
              </div>
            </div>
            <div className="mt-4">
              <div className="text-sm text-gray-500 mb-1">Accuracy</div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-green-500 transition-all duration-1000"
                  style={{ width: `${performance.accuracy}%` }}
                />
              </div>
              <div className="text-right text-sm mt-1">{performance.accuracy}%</div>
            </div>
          </div>
          
          <div className={`
            p-6 rounded-xl border
            ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-purple-50 border-purple-100'}
          `}>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Time Spent</span>
                <span className="font-bold flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatTime(sampleResults.timeSpent)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Time per Question</span>
                <span className="font-bold">{performance.timePerQuestion}s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Class Rank</span>
                <span className="font-bold flex items-center gap-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  #{sampleResults.rank} of {sampleResults.totalParticipants}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Passing Score</span>
                <span className="font-bold">{sampleResults.passingScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Analysis */}
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Analysis
          </h3>
          <button
            onClick={() => setDetailedView(!detailedView)}
            className="text-sm text-blue-500 hover:text-blue-600"
          >
            {detailedView ? 'Hide Details' : 'Show Details'}
          </button>
        </div>

        {detailedView ? (
          <div className="space-y-4">
            {sampleQuiz.questions.map((question, index) => {
              const userAnswer = sampleResults.answers[question.id];
              const isCorrect = Array.isArray(question.correctAnswer)
                ? JSON.stringify([...new Set(question.correctAnswer)].sort()) === JSON.stringify([...new Set(Array.isArray(userAnswer) ? userAnswer : [])].sort())
                : userAnswer === question.correctAnswer;
              
              const isAnswered = userAnswer !== undefined;
              const isPartiallyCorrect = Array.isArray(question.correctAnswer) && 
                userAnswer && 
                Array.isArray(userAnswer) && 
                userAnswer.some(ans => question.correctAnswer.includes(ans)) &&
                !isCorrect;

              return (
                <div
                  key={question.id}
                  className={`
                    p-4 rounded-lg border
                    ${isCorrect 
                      ? 'bg-green-500/10 border-green-500/20' 
                      : isPartiallyCorrect
                        ? 'bg-yellow-500/10 border-yellow-500/20'
                        : 'bg-red-500/10 border-red-500/20'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${isCorrect 
                        ? 'bg-green-500 text-white' 
                        : isPartiallyCorrect
                          ? 'bg-yellow-500 text-white'
                          : 'bg-red-500 text-white'
                      }
                    `}>
                      {isCorrect ? <CheckCircle className="w-4 h-4" /> : 
                       isPartiallyCorrect ? <HelpCircle className="w-4 h-4" /> : 
                       <XCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <div className="font-bold">Question {index + 1}</div>
                      <div className="text-sm text-gray-500">{question.points} points</div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="font-medium mb-2">{question.question}</div>
                    {question.explanation && (
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        <span className="font-medium">Explanation: </span>
                        {question.explanation}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Your Answer</div>
                      <div className="font-medium">
                        {isAnswered ? (
                          Array.isArray(userAnswer) ? (
                            userAnswer.map(ans => question.options[ans]).join(', ')
                          ) : (
                            question.options[userAnswer]
                          )
                        ) : (
                          <span className="text-red-500">Not answered</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Correct Answer</div>
                      <div className="font-medium">
                        {Array.isArray(question.correctAnswer) ? (
                          question.correctAnswer.map(ans => question.options[ans]).join(', ')
                        ) : (
                          question.options[question.correctAnswer]
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={`
              p-6 rounded-lg border
              ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}
            `}>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-blue-500" />
                <h4 className="font-bold">Strengths</h4>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Excellent understanding of React hooks</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Strong knowledge of component syntax</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>Above average time management</span>
                </li>
              </ul>
            </div>
            
            <div className={`
              p-6 rounded-lg border
              ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}
            `}>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-6 h-6 text-yellow-500" />
                <h4 className="font-bold">Areas for Improvement</h4>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>Review React lifecycle methods</span>
                </li>
                <li className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-500" />
                  <span>Practice multiple-select questions</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingDown className="w-4 h-4 text-red-500" />
                  <span>Work on reading questions carefully</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Star className="w-4 h-4 text-yellow-500" />
            <span>You scored higher than {Math.round((sampleResults.totalParticipants - sampleResults.rank) / sampleResults.totalParticipants * 100)}% of participants</span>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <button
              onClick={onExit}
              className="px-6 py-3 rounded-lg border dark:border-gray-600 hover:bg-gray-700/50 transition-colors"
            >
              Exit
            </button>
            
            <button
              onClick={onReview}
              className="px-6 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Review Questions</span>
            </button>
            
            <button
              onClick={onRetake}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex items-center gap-2 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
        
        {/* Next Steps */}
        <div className={`
          mt-6 p-4 rounded-lg border
          ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-green-50 border-green-100'}
        `}>
          <div className="flex items-center gap-3 mb-2">
            <ChevronRight className="w-5 h-5 text-green-500" />
            <h4 className="font-bold">Next Steps</h4>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {passed 
              ? 'Congratulations! You have passed this quiz. Consider moving on to the next module or exploring advanced topics.'
              : 'Review the questions you missed and consider retaking the quiz after studying the material again.'
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;
