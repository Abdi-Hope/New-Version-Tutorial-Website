import React, { useState, useRef } from 'react';
import { 
  Upload, FileText, X, Check, AlertCircle,
  Link, Paperclip, Calendar, Clock, Save,
  Maximize2, Minimize2, Code, Image, Video,
  MessageSquare, Send, Eye
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const AssignmentForm = ({
  assignment,
  onSubmit,
  onCancel,
  mode = 'submit' // 'submit' or 'create'
}) => {
  const [formData, setFormData] = useState({
    title: assignment?.title || '',
    description: assignment?.description || '',
    answer: '',
    files: [],
    links: [''],
    comments: '',
    submissionType: 'text', // text, file, link, code
    visibility: 'private' // private, classmates, public
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const { theme } = useTheme();

  const MAX_CHARACTERS = 5000;
  const MAX_FILES = 5;
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleInputChange = (field, value) => {
    if (field === 'answer' && value.length <= MAX_CHARACTERS) {
      setCharacterCount(value.length);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Validate files
    const validFiles = selectedFiles.filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        alert(`File ${file.name} exceeds 10MB limit`);
        return false;
      }
      return true;
    });

    if (formData.files.length + validFiles.length > MAX_FILES) {
      alert(`Maximum ${MAX_FILES} files allowed`);
      return;
    }

    setFormData(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles]
    }));
  };

  const removeFile = (index) => {
    setFormData(prev => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index)
    }));
  };

  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      links: [...prev.links, '']
    }));
  };

  const updateLink = (index, value) => {
    const newLinks = [...formData.links];
    newLinks[index] = value;
    setFormData(prev => ({ ...prev, links: newLinks }));
  };

  const removeLink = (index) => {
    setFormData(prev => ({
      ...prev,
      links: prev.links.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.answer.trim() && formData.files.length === 0 && formData.links.every(l => !l.trim())) {
      newErrors.submission = 'Please provide an answer, upload files, or add links';
    }

    if (formData.answer.length > MAX_CHARACTERS) {
      newErrors.answer = `Answer must be less than ${MAX_CHARACTERS} characters`;
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (onSubmit) {
        onSubmit(formData);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to submit assignment. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'zip':
      case 'rar':
        return <FileText className="w-5 h-5 text-yellow-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="w-5 h-5 text-green-500" />;
      case 'mp4':
      case 'mov':
      case 'avi':
        return <Video className="w-5 h-5 text-purple-500" />;
      case 'js':
      case 'ts':
      case 'jsx':
      case 'tsx':
      case 'py':
      case 'java':
        return <Code className="w-5 h-5 text-indigo-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className={`
      rounded-xl border transition-all duration-300
      ${fullscreen ? 'fixed inset-4 z-50' : 'relative'}
      ${theme === 'dark' 
        ? 'bg-gray-800 border-gray-700' 
        : 'bg-white border-gray-200'
      }
    `}>
      {/* Header */}
      <div className="p-6 border-b dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-500 text-white">
              {mode === 'submit' ? <Upload className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
            </div>
            <div>
              <h2 className="text-xl font-bold">
                {mode === 'submit' ? 'Submit Assignment' : 'Create Assignment'}
              </h2>
              <p className="text-gray-500">
                {mode === 'submit' 
                  ? assignment?.title || 'Submit your work'
                  : 'Create a new assignment'
                }
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              aria-label={previewMode ? "Edit mode" : "Preview mode"}
            >
              <Eye className="w-5 h-5" />
            </button>
            
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
              aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            >
              {fullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
            </button>
            
            {onCancel && (
              <button
                onClick={onCancel}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                aria-label="Cancel"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Assignment Info */}
        {assignment && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-900/30 rounded-lg">
            <div>
              <div className="text-sm text-gray-500">Course</div>
              <div className="font-medium">{assignment.course}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Due Date</div>
              <div className="font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(assignment.dueDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">Status</div>
              <div className="font-medium text-yellow-500 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Pending Submission
              </div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {mode === 'create' && (
          <>
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Assignment Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`
                  w-full p-3 rounded-lg border
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                `}
                placeholder="Enter assignment title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className={`
                  w-full p-3 rounded-lg border
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                `}
                placeholder="Describe the assignment requirements..."
              />
            </div>
          </>
        )}

        {/* Submission Type Selection */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Submission Type
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { value: 'text', label: 'Text', icon: <FileText className="w-5 h-5" /> },
              { value: 'file', label: 'Files', icon: <Upload className="w-5 h-5" /> },
              { value: 'link', label: 'Links', icon: <Link className="w-5 h-5" /> },
              { value: 'code', label: 'Code', icon: <Code className="w-5 h-5" /> }
            ].map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => handleInputChange('submissionType', type.value)}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200
                  ${formData.submissionType === type.value
                    ? 'border-blue-500 bg-blue-500/10 text-blue-500' 
                    : theme === 'dark'
                      ? 'border-gray-700 text-gray-400 hover:border-gray-600'
                      : 'border-gray-300 text-gray-600 hover:border-gray-400'
                  }
                  hover:scale-105 active:scale-95
                `}
              >
                <div className="flex flex-col items-center gap-2">
                  {type.icon}
                  <span className="font-medium">{type.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Answer/Text Submission */}
        {formData.submissionType === 'text' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium">
                Your Answer
              </label>
              <div className="text-sm text-gray-500">
                {characterCount}/{MAX_CHARACTERS} characters
              </div>
            </div>
            
            {previewMode ? (
              <div className={`
                p-4 rounded-lg border min-h-[200px]
                ${theme === 'dark' 
                  ? 'bg-gray-700 border-gray-600 text-white' 
                  : 'bg-white border-gray-300 text-gray-900'
                }
              `}>
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  {formData.answer || <span className="text-gray-500 italic">No answer provided</span>}
                </div>
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                value={formData.answer}
                onChange={(e) => handleInputChange('answer', e.target.value)}
                rows={8}
                className={`
                  w-full p-3 rounded-lg border font-mono
                  ${theme === 'dark' 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                  }
                  focus:ring-2 focus:ring-blue-500 focus:border-transparent
                `}
                placeholder="Type your answer here... You can use Markdown formatting."
              />
            )}
            
            {errors.answer && (
              <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.answer}</span>
              </div>
            )}
          </div>
        )}

        {/* File Upload */}
        {formData.submissionType === 'file' && (
          <div>
            <label className="block text-sm font-medium mb-3">
              Upload Files ({formData.files.length}/{MAX_FILES})
            </label>
            
            {/* Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                transition-all duration-200
                ${theme === 'dark' 
                  ? 'border-gray-600 hover:border-gray-500 bg-gray-900/30' 
                  : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                }
                hover:shadow-lg
              `}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <div className="font-medium mb-2">Click to upload files</div>
              <div className="text-sm text-gray-500">
                Maximum {MAX_FILES} files, 10MB each
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
                aria-label="Upload files"
              />
            </div>

            {/* File List */}
            {formData.files.length > 0 && (
              <div className="mt-4 space-y-2">
                <div className="text-sm font-medium">Selected Files:</div>
                {formData.files.map((file, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center justify-between p-3 rounded-lg
                      ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      {getFileIcon(file.name)}
                      <div>
                        <div className="font-medium truncate max-w-[200px]">
                          {file.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {formatFileSize(file.size)}
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="p-1 text-red-500 hover:bg-red-500/10 rounded-lg"
                      aria-label="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Links Submission */}
        {formData.submissionType === 'link' && (
          <div>
            <label className="block text-sm font-medium mb-3">
              Add Links to Your Work
            </label>
            
            <div className="space-y-3">
              {formData.links.map((link, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Link className="w-5 h-5 text-gray-500 flex-shrink-0" />
                  <input
                    type="url"
                    value={link}
                    onChange={(e) => updateLink(index, e.target.value)}
                    placeholder="https://example.com/your-work"
                    className={`
                      flex-1 p-3 rounded-lg border
                      ${theme === 'dark' 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                      }
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    `}
                  />
                  {formData.links.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg"
                      aria-label="Remove link"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={addLink}
                className="flex items-center gap-2 text-blue-500 hover:text-blue-600"
              >
                <Paperclip className="w-4 h-4" />
                <span>Add another link</span>
              </button>
            </div>
          </div>
        )}

        {/* Additional Comments */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Additional Comments (Optional)
          </label>
          <textarea
            value={formData.comments}
            onChange={(e) => handleInputChange('comments', e.target.value)}
            rows={3}
            className={`
              w-full p-3 rounded-lg border
              ${theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-white border-gray-300 text-gray-900'
              }
              focus:ring-2 focus:ring-blue-500 focus:border-transparent
            `}
            placeholder="Add any comments or notes for the instructor..."
          />
        </div>

        {/* Visibility Settings */}
        {mode === 'submit' && (
          <div>
            <label className="block text-sm font-medium mb-3">
              Visibility
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { value: 'private', label: 'Private', description: 'Only instructor can see' },
                { value: 'classmates', label: 'Classmates', description: 'Visible to course members' },
                { value: 'public', label: 'Public', description: 'Visible to everyone' }
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleInputChange('visibility', option.value)}
                  className={`
                    p-4 rounded-lg border text-left transition-all duration-200
                    ${formData.visibility === option.value
                      ? 'border-blue-500 bg-blue-500/10 text-blue-500' 
                      : theme === 'dark'
                        ? 'border-gray-700 text-gray-400 hover:border-gray-600'
                        : 'border-gray-300 text-gray-600 hover:border-gray-400'
                    }
                    hover:scale-105 active:scale-95
                  `}
                >
                  <div className="font-medium mb-1">{option.label}</div>
                  <div className="text-sm opacity-75">{option.description}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Error Display */}
        {errors.submit && (
          <div className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500">
            <AlertCircle className="w-5 h-5" />
            <span>{errors.submit}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t dark:border-gray-700">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MessageSquare className="w-4 h-4" />
            <span>Your submission will be reviewed by the instructor</span>
          </div>
          
          <div className="flex items-center gap-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
            
            <button
              type="button"
              onClick={() => setFormData({
                title: '',
                description: '',
                answer: '',
                files: [],
                links: [''],
                comments: '',
                submissionType: 'text',
                visibility: 'private'
              })}
              className="px-6 py-3 border dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              Reset
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                px-6 py-3 rounded-lg font-medium flex items-center gap-2
                transition-all duration-200
                ${isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-500 hover:bg-blue-600'
                }
                text-white hover:scale-105 active:scale-95
                disabled:opacity-50
              `}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : mode === 'submit' ? (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Assignment</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Create Assignment</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AssignmentForm;
