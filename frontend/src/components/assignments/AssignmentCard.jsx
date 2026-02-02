import React from 'react';
import { 
  FileText, Calendar, Clock, AlertCircle, 
  CheckCircle, XCircle, Upload, Download,
  Edit, Trash2, Eye, Award, BarChart,
  ChevronRight, Users, Star, BookOpen
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AssignmentCard = ({ 
  assignment,
  onView,
  onEdit,
  onDelete,
  onSubmit,
  onDownload,
  showActions = true,
  compact = false
}) => {
  const { theme } = useTheme();
  
  const {
    id,
    title,
    course,
    description,
    dueDate,
    status = 'pending', // pending, submitted, graded, late
    grade,
    maxGrade = 100,
    submissionDate,
    type = 'assignment', // assignment, quiz, project, exam
    difficulty = 'medium', // easy, medium, hard
    estimatedTime,
    attachments = 0,
    submissions = 0,
    averageGrade,
    instructor,
    feedback
  } = assignment;

  const getStatusConfig = (status) => {
    switch (status) {
      case 'submitted':
        return { 
          color: 'text-green-500', 
          bg: 'bg-green-500/10', 
          border: 'border-green-500/20',
          icon: <CheckCircle className="w-4 h-4" />,
          label: 'Submitted'
        };
      case 'graded':
        return { 
          color: 'text-blue-500', 
          bg: 'bg-blue-500/10', 
          border: 'border-blue-500/20',
          icon: <Award className="w-4 h-4" />,
          label: 'Graded'
        };
      case 'late':
        return { 
          color: 'text-red-500', 
          bg: 'bg-red-500/10', 
          border: 'border-red-500/20',
          icon: <AlertCircle className="w-4 h-4" />,
          label: 'Late'
        };
      default:
        return { 
          color: 'text-yellow-500', 
          bg: 'bg-yellow-500/10', 
          border: 'border-yellow-500/20',
          icon: <Clock className="w-4 h-4" />,
          label: 'Pending'
        };
    }
  };

  const getTypeConfig = (type) => {
    switch (type) {
      case 'quiz':
        return { color: 'bg-purple-500', icon: <BookOpen className="w-4 h-4" /> };
      case 'project':
        return { color: 'bg-indigo-500', icon: <FileText className="w-4 h-4" /> };
      case 'exam':
        return { color: 'bg-red-500', icon: <AlertCircle className="w-4 h-4" /> };
      default:
        return { color: 'bg-blue-500', icon: <FileText className="w-4 h-4" /> };
    }
  };

  const getDifficultyConfig = (difficulty) => {
    switch (difficulty) {
      case 'hard':
        return { color: 'text-red-500', bg: 'bg-red-500/10', label: 'Hard' };
      case 'medium':
        return { color: 'text-yellow-500', bg: 'bg-yellow-500/10', label: 'Medium' };
      default:
        return { color: 'text-green-500', bg: 'bg-green-500/10', label: 'Easy' };
    }
  };

  const statusConfig = getStatusConfig(status);
  const typeConfig = getTypeConfig(type);
  const difficultyConfig = getDifficultyConfig(difficulty);

  const isOverdue = status === 'late' || (dueDate && new Date(dueDate) < new Date());

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const formatTime = (minutes) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${minutes}m`;
  };

  return (
    <div className={`
      rounded-xl border transition-all duration-300
      ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
      hover:shadow-lg hover:-translate-y-1
      ${isOverdue ? 'border-red-500/50' : ''}
      ${compact ? 'p-4' : 'p-6'}
    `}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
        <div className="flex items-start gap-3">
          {/* Type Icon */}
          <div className={`
            p-2 rounded-lg flex-shrink-0
            ${typeConfig.color} text-white
          `}>
            {typeConfig.icon}
          </div>
          
          {/* Title & Course */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg truncate">{title}</h3>
              <div className={`
                px-2 py-1 rounded-full text-xs font-medium
                ${statusConfig.bg} ${statusConfig.color} ${statusConfig.border}
                flex items-center gap-1
              `}>
                {statusConfig.icon}
                <span>{statusConfig.label}</span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{course}</span>
              </div>
              
              <div className={`
                px-2 py-1 rounded-full text-xs
                ${difficultyConfig.bg} ${difficultyConfig.color}
              `}>
                {difficultyConfig.label}
              </div>
              
              {estimatedTime && (
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(estimatedTime)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Grade Display */}
        {grade !== undefined && status === 'graded' && (
          <div className={`
            px-4 py-2 rounded-lg text-center
            ${grade >= 90 ? 'bg-green-500/20 text-green-500' : 
              grade >= 70 ? 'bg-blue-500/20 text-blue-500' : 
              grade >= 50 ? 'bg-yellow-500/20 text-yellow-500' : 
              'bg-red-500/20 text-red-500'}
          `}>
            <div className="text-2xl font-bold">{grade}</div>
            <div className="text-xs opacity-75">/{maxGrade}</div>
          </div>
        )}
      </div>

      {/* Description */}
      {!compact && description && (
        <p className={`
          mb-4 text-sm line-clamp-2
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
        `}>
          {description}
        </p>
      )}

      {/* Stats & Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {/* Due Date */}
        <div className={`
          p-3 rounded-lg
          ${isOverdue 
            ? 'bg-red-500/10 border border-red-500/20' 
            : theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
          }
        `}>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className={`w-4 h-4 ${isOverdue ? 'text-red-500' : 'text-gray-500'}`} />
            <span className={`text-sm font-medium ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
              Due Date
            </span>
          </div>
          <div className={`font-bold ${isOverdue ? 'text-red-500' : ''}`}>
            {formatDate(dueDate)}
          </div>
          {isOverdue && (
            <div className="text-xs text-red-500 mt-1">Overdue</div>
          )}
        </div>

        {/* Submissions */}
        <div className={`
          p-3 rounded-lg
          ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}
        `}>
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-500">Submissions</span>
          </div>
          <div className="font-bold">{submissions}</div>
        </div>

        {/* Average Grade */}
        {averageGrade !== undefined && (
          <div className={`
            p-3 rounded-lg
            ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}
          `}>
            <div className="flex items-center gap-2 mb-1">
              <BarChart className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">Avg Grade</span>
            </div>
            <div className="font-bold">{averageGrade}%</div>
          </div>
        )}

        {/* Attachments */}
        <div className={`
          p-3 rounded-lg
          ${theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}
        `}>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-500">Files</span>
          </div>
          <div className="font-bold">{attachments}</div>
        </div>
      </div>

      {/* Submission Info */}
      {submissionDate && (
        <div className={`
          mb-4 p-3 rounded-lg
          ${status === 'submitted' ? 'bg-green-500/10 border border-green-500/20' : 
            theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'}
        `}>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span className="text-green-500 font-medium">Submitted</span>
            <span className="text-gray-500">on {formatDate(submissionDate)}</span>
          </div>
        </div>
      )}

      {/* Instructor Feedback */}
      {feedback && status === 'graded' && (
        <div className={`
          mb-4 p-3 rounded-lg border
          ${theme === 'dark' ? 'bg-gray-700/30 border-gray-600' : 'bg-blue-50 border-blue-100'}
        `}>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-medium">Instructor Feedback</span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300">{feedback}</p>
        </div>
      )}

      {/* Actions */}
      {showActions && (
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {/* View Button */}
            <button
              onClick={() => onView && onView(id)}
              className={`
                px-4 py-2 rounded-lg font-medium flex items-center gap-2
                transition-all duration-200
                ${theme === 'dark' 
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                hover:scale-105 active:scale-95
              `}
              aria-label="View assignment"
            >
              <Eye className="w-4 h-4" />
              <span>View</span>
            </button>

            {/* Submit Button */}
            {(status === 'pending' || status === 'late') && (
              <button
                onClick={() => onSubmit && onSubmit(id)}
                className={`
                  px-4 py-2 rounded-lg font-medium flex items-center gap-2
                  bg-blue-500 text-white hover:bg-blue-600
                  transition-all duration-200 hover:scale-105 active:scale-95
                `}
                aria-label="Submit assignment"
              >
                <Upload className="w-4 h-4" />
                <span>Submit</span>
              </button>
            )}

            {/* Download Button */}
            {onDownload && (
              <button
                onClick={() => onDownload && onDownload(id)}
                className={`
                  px-4 py-2 rounded-lg font-medium flex items-center gap-2
                  transition-all duration-200
                  ${theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                  hover:scale-105 active:scale-95
                `}
                aria-label="Download assignment"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Edit Button (for instructors) */}
            {onEdit && (
              <button
                onClick={() => onEdit && onEdit(id)}
                className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors"
                aria-label="Edit assignment"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}

            {/* Delete Button (for instructors) */}
            {onDelete && (
              <button
                onClick={() => onDelete && onDelete(id)}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                aria-label="Delete assignment"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            {/* More Details */}
            <button
              onClick={() => onView && onView(id)}
              className={`
                p-2 rounded-lg transition-colors
                ${theme === 'dark' 
                  ? 'text-gray-400 hover:bg-gray-700' 
                  : 'text-gray-500 hover:bg-gray-100'
                }
              `}
              aria-label="More details"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentCard;
