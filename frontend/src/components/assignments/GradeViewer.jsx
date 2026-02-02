import React, { useState } from 'react';
import { 
  Award, TrendingUp, TrendingDown, Star, Target,
  BarChart3, PieChart, Download, Share2, Filter,
  ChevronUp, ChevronDown, CheckCircle, XCircle,
  Clock, Users, Trophy, Percent, Zap
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const GradeViewer = ({ 
  grades = [],
  courseName = "Advanced React Development",
  showDetails = true
}) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [viewMode, setViewMode] = useState('overview'); // overview, detailed, comparison
  const [sortBy, setSortBy] = useState('date'); // date, grade, name
  const [sortOrder, setSortOrder] = useState('desc');
  const { theme } = useTheme();

  // Sample grade data
  const sampleGrades = grades.length > 0 ? grades : [
    { id: 1, title: 'React Basics Quiz', type: 'quiz', grade: 92, maxGrade: 100, date: '2024-01-15', weight: 10, classAvg: 85, rank: 8, feedback: 'Excellent understanding of React fundamentals.' },
    { id: 2, title: 'useState Assignment', type: 'assignment', grade: 88, maxGrade: 100, date: '2024-01-20', weight: 15, classAvg: 76, rank: 12, feedback: 'Good implementation, could improve error handling.' },
    { id: 3, title: 'Component Design Project', type: 'project', grade: 95, maxGrade: 100, date: '2024-01-25', weight: 20, classAvg: 82, rank: 5, feedback: 'Outstanding project with excellent UI/UX.' },
    { id: 4, title: 'Midterm Exam', type: 'exam', grade: 84, maxGrade: 100, date: '2024-02-01', weight: 25, classAvg: 78, rank: 15, feedback: 'Solid performance, review hooks section.' },
    { id: 5, title: 'useEffect Exercise', type: 'assignment', grade: 90, maxGrade: 100, date: '2024-02-05', weight: 10, classAvg: 81, rank: 9, feedback: 'Great understanding of side effects.' },
    { id: 6, title: 'Final Project', type: 'project', grade: 96, maxGrade: 100, date: '2024-02-15', weight: 20, classAvg: 85, rank: 3, feedback: 'Exceptional work! Professional quality.' },
  ];

  // Calculate statistics
  const calculateStats = () => {
    const total = sampleGrades.reduce((sum, g) => sum + (g.grade / g.maxGrade * 100 * g.weight), 0);
    const totalWeight = sampleGrades.reduce((sum, g) => sum + g.weight, 0);
    const weightedAverage = total / totalWeight;
    
    const classAverage = sampleGrades.reduce((sum, g) => sum + g.classAvg, 0) / sampleGrades.length;
    const highestGrade = Math.max(...sampleGrades.map(g => g.grade));
    const lowestGrade = Math.min(...sampleGrades.map(g => g.grade));
    const improvement = sampleGrades.length >= 2 ? 
      ((sampleGrades[sampleGrades.length - 1].grade - sampleGrades[0].grade) / sampleGrades[0].grade * 100).toFixed(1) : 0;
    
    const gradeDistribution = {
      A: sampleGrades.filter(g => g.grade >= 90).length,
      B: sampleGrades.filter(g => g.grade >= 80 && g.grade < 90).length,
      C: sampleGrades.filter(g => g.grade >= 70 && g.grade < 80).length,
      D: sampleGrades.filter(g => g.grade >= 60 && g.grade < 70).length,
      F: sampleGrades.filter(g => g.grade < 60).length,
    };

    return {
      weightedAverage: weightedAverage.toFixed(1),
      classAverage: classAverage.toFixed(1),
      highestGrade,
      lowestGrade,
      improvement,
      gradeDistribution,
      totalWeight,
      totalAssignments: sampleGrades.length
    };
  };

  const stats = calculateStats();

  const getGradeColor = (grade) => {
    if (grade >= 90) return 'text-green-500 bg-green-500/10';
    if (grade >= 80) return 'text-blue-500 bg-blue-500/10';
    if (grade >= 70) return 'text-yellow-500 bg-yellow-500/10';
    if (grade >= 60) return 'text-orange-500 bg-orange-500/10';
    return 'text-red-500 bg-red-500/10';
  };

  const getGradeLetter = (grade) => {
    if (grade >= 90) return 'A';
    if (grade >= 80) return 'B';
    if (grade >= 70) return 'C';
    if (grade >= 60) return 'D';
    return 'F';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const sortedGrades = [...sampleGrades].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'grade':
        aValue = a.grade;
        bValue = b.grade;
        break;
      case 'name':
        aValue = a.title.toLowerCase();
        bValue = b.title.toLowerCase();
        break;
      default: // date
        aValue = new Date(a.date);
        bValue = new Date(b.date);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    }
    return aValue < bValue ? 1 : -1;
  });

  return (
    <div className={`
      rounded-xl border
      ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
    `}>
      {/* Header */}
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Grades & Performance</h2>
              <p className="text-gray-500">{courseName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-700/50 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border dark:border-gray-600 hover:bg-gray-700/50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className={`
            p-4 rounded-lg border
            ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-100'}
          `}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Your Average</div>
              <Percent className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-3xl font-bold">{stats.weightedAverage}%</div>
            <div className="text-sm text-gray-500 mt-1">
              {getGradeLetter(stats.weightedAverage)} Grade
            </div>
          </div>
          
          <div className={`
            p-4 rounded-lg border
            ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-gray-50 border-gray-200'}
          `}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Class Average</div>
              <Users className="w-4 h-4 text-gray-500" />
            </div>
            <div className="text-3xl font-bold">{stats.classAverage}%</div>
            <div className="text-sm text-gray-500 mt-1">
              {(stats.weightedAverage - stats.classAverage).toFixed(1)}% above
            </div>
          </div>
          
          <div className={`
            p-4 rounded-lg border
            ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-green-50 border-green-100'}
          `}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Highest Grade</div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-3xl font-bold">{stats.highestGrade}%</div>
            <div className="text-sm text-gray-500 mt-1">
              {stats.improvement > 0 ? `+${stats.improvement}% improvement` : 'Consistent performance'}
            </div>
          </div>
          
          <div className={`
            p-4 rounded-lg border
            ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-yellow-50 border-yellow-100'}
          `}>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-500">Course Rank</div>
              <Trophy className="w-4 h-4 text-yellow-500" />
            </div>
            <div className="text-3xl font-bold">#8</div>
            <div className="text-sm text-gray-500 mt-1">Top 15% of class</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('overview')}
              className={`px-4 py-2 rounded-lg font-medium ${viewMode === 'overview' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700/50'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setViewMode('detailed')}
              className={`px-4 py-2 rounded-lg font-medium ${viewMode === 'detailed' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700/50'}`}
            >
              Detailed
            </button>
            <button
              onClick={() => setViewMode('comparison')}
              className={`px-4 py-2 rounded-lg font-medium ${viewMode === 'comparison' ? 'bg-blue-500 text-white' : 'hover:bg-gray-700/50'}`}
            >
              Comparison
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border dark:border-gray-600 bg-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="grade">Sort by Grade</option>
              <option value="name">Sort by Name</option>
            </select>
            
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="p-2 hover:bg-gray-700/50 rounded-lg"
            >
              {sortOrder === 'asc' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {viewMode === 'overview' ? (
          <div className="space-y-6">
            {/* Grade Distribution */}
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Grade Distribution
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {Object.entries(stats.gradeDistribution).map(([letter, count]) => (
                  <div
                    key={letter}
                    className={`
                      p-4 rounded-lg text-center
                      ${letter === 'A' ? 'bg-green-500/10 text-green-500' :
                        letter === 'B' ? 'bg-blue-500/10 text-blue-500' :
                        letter === 'C' ? 'bg-yellow-500/10 text-yellow-500' :
                        letter === 'D' ? 'bg-orange-500/10 text-orange-500' :
                        'bg-red-500/10 text-red-500'
                      }
                    `}
                  >
                    <div className="text-2xl font-bold">{count}</div>
                    <div className="text-sm">Grade {letter}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Chart */}
            <div>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Performance Trend
              </h3>
              <div className="h-48 flex items-end gap-2">
                {sortedGrades.map((grade, index) => (
                  <div key={grade.id} className="flex-1 flex flex-col items-center">
                    <div className="text-xs text-gray-500 mb-2">{formatDate(grade.date)}</div>
                    <div
                      className={`
                        w-full rounded-t-lg transition-all duration-300
                        ${grade.grade >= 90 ? 'bg-green-500' :
                          grade.grade >= 80 ? 'bg-blue-500' :
                          grade.grade >= 70 ? 'bg-yellow-500' :
                          grade.grade >= 60 ? 'bg-orange-500' :
                          'bg-red-500'
                        }
                        ${selectedAssignment?.id === grade.id ? 'opacity-100' : 'opacity-80'}
                        hover:opacity-100 cursor-pointer
                      `}
                      style={{ height: `${grade.grade}%` }}
                      onClick={() => setSelectedAssignment(grade)}
                      title={`${grade.title}: ${grade.grade}%`}
                    />
                    <div className="text-xs mt-1">{grade.grade}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : viewMode === 'detailed' ? (
          <div className="space-y-4">
            {sortedGrades.map((grade) => (
              <div
                key={grade.id}
                className={`
                  p-4 rounded-lg border transition-all duration-200
                  ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200'}
                  hover:shadow-lg
                  ${selectedAssignment?.id === grade.id ? 'ring-2 ring-blue-500' : ''}
                `}
                onClick={() => setSelectedAssignment(grade)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(grade.grade)}`}>
                        {getGradeLetter(grade.grade)} ({grade.grade}%)
                      </div>
                      <div className="text-sm text-gray-500">
                        {grade.type.toUpperCase()} • {grade.weight}% weight
                      </div>
                    </div>
                    <h4 className="font-bold text-lg">{grade.title}</h4>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(grade.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        <span>Rank: #{grade.rank}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>Class Avg: {grade.classAvg}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold">{grade.grade}/{grade.maxGrade}</div>
                      <div className="text-sm text-gray-500">Your Score</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{grade.classAvg}%</div>
                      <div className="text-sm text-gray-500">Class Avg</div>
                    </div>
                  </div>
                </div>
                
                {grade.feedback && (
                  <div className="mt-4 p-3 rounded-lg bg-gray-800/30 border-l-4 border-blue-500">
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">Instructor Feedback</span>
                    </div>
                    <p className="text-sm text-gray-300">{grade.feedback}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">Comparison view coming soon...</div>
            <div className="text-sm text-gray-500">
              Compare your performance with classmates and track improvement over time.
            </div>
          </div>
        )}

        {/* Selected Assignment Details */}
        {selectedAssignment && showDetails && (
          <div className={`
            mt-6 p-6 rounded-xl border
            ${theme === 'dark' ? 'bg-gray-700/50 border-gray-600' : 'bg-blue-50 border-blue-100'}
          `}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">{selectedAssignment.title} Details</h3>
              <button
                onClick={() => setSelectedAssignment(null)}
                className="p-2 hover:bg-gray-600/50 rounded-lg"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Performance Analysis</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Your Score</span>
                    <span className="font-bold">{selectedAssignment.grade}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Class Average</span>
                    <span className="font-bold">{selectedAssignment.classAvg}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Difference</span>
                    <span className={`font-bold ${selectedAssignment.grade > selectedAssignment.classAvg ? 'text-green-500' : 'text-red-500'}`}>
                      {(selectedAssignment.grade - selectedAssignment.classAvg).toFixed(1)}%
                      {selectedAssignment.grade > selectedAssignment.classAvg ? ' above' : ' below'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Class Rank</span>
                    <span className="font-bold">#{selectedAssignment.rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Weight</span>
                    <span className="font-bold">{selectedAssignment.weight}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Suggestions for Improvement</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Review the feedback provided by your instructor</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Practice similar problems to strengthen weak areas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span className="text-sm">Spend more time on challenging concepts before the next assignment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeViewer;
