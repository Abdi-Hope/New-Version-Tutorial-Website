import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, CheckCircle, Circle,
  Plus, Edit, Trash2, ChevronLeft, ChevronRight,
  Target, TrendingUp, AlertCircle, MoreVertical,
  BookOpen, GraduationCap, Coffee, Brain
} from 'lucide-react';

const StudyPlanner = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Complete React Hooks Module',
      course: 'Advanced React',
      duration: 120,
      priority: 'high',
      completed: true,
      date: '2024-01-29',
      time: '09:00',
      tags: ['react', 'hooks']
    },
    {
      id: 2,
      title: 'Practice Algorithm Problems',
      course: 'Data Structures',
      duration: 90,
      priority: 'medium',
      completed: false,
      date: '2024-01-29',
      time: '14:00',
      tags: ['algorithms', 'practice']
    },
    {
      id: 3,
      title: 'Review Database Design',
      course: 'Database Systems',
      duration: 60,
      priority: 'low',
      completed: false,
      date: '2024-01-29',
      time: '16:30',
      tags: ['database', 'theory']
    },
    {
      id: 4,
      title: 'Web Development Project',
      course: 'Full Stack Development',
      duration: 180,
      priority: 'high',
      completed: false,
      date: '2024-01-30',
      time: '10:00',
      tags: ['project', 'web']
    },
    {
      id: 5,
      title: 'Read JavaScript Patterns',
      course: 'JavaScript Mastery',
      duration: 45,
      priority: 'medium',
      completed: false,
      date: '2024-01-30',
      time: '19:00',
      tags: ['reading', 'javascript']
    }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    course: '',
    duration: 60,
    priority: 'medium',
    date: selectedDate,
    time: '09:00',
    tags: []
  });

  const [showNewTask, setShowNewTask] = useState(false);

  // Get days in current month
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getTasksForDate = (date) => {
    return tasks.filter(task => task.date === date);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        completed: false,
        tags: newTask.tags
      };
      setTasks([...tasks, task]);
      setNewTask({
        title: '',
        course: '',
        duration: 60,
        priority: 'medium',
        date: selectedDate,
        time: '09:00',
        tags: []
      });
      setShowNewTask(false);
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const todayTasks = getTasksForDate(selectedDate);
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const totalStudyTime = tasks.reduce((sum, task) => sum + task.duration, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Study Planner
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Plan and track your study sessions
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowNewTask(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Task</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Calendar */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {dayNames.map(day => (
                <div
                  key={day}
                  className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Empty cells for days before first day of month */}
              {Array.from({ length: firstDayOfMonth }).map((_, index) => (
                <div key={`empty-${index}`} className="h-24 rounded-lg"></div>
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const date = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
                  .toString()
                  .padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
                const dayTasks = getTasksForDate(date);
                const isToday = date === new Date().toISOString().split('T')[0];
                const isSelected = date === selectedDate;

                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDate(date)}
                    className={`h-24 rounded-lg p-2 text-left transition-colors ${
                      isSelected
                        ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                        : isToday
                        ? 'bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className={`text-lg font-bold ${
                        isSelected
                          ? 'text-blue-700 dark:text-blue-400'
                          : isToday
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-700 dark:text-gray-300'
                      }`}>
                        {day}
                      </span>
                      {dayTasks.length > 0 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {dayTasks.length}
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-1 overflow-hidden">
                      {dayTasks.slice(0, 2).map(task => (
                        <div
                          key={task.id}
                          className={`text-xs px-1 py-0.5 rounded truncate ${
                            task.completed
                              ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                              : getPriorityColor(task.priority)
                          }`}
                        >
                          {task.title.substring(0, 15)}...
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                          +{dayTasks.length - 2} more
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* New Task Form */}
          {showNewTask && (
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow p-6 border dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Add New Study Task
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Task Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What do you need to study?"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Course/Subject
                    </label>
                    <input
                      type="text"
                      value={newTask.course}
                      onChange={(e) => setNewTask(prev => ({ ...prev, course: e.target.value }))}
                      placeholder="e.g., Advanced React"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newTask.date}
                      onChange={(e) => setNewTask(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={newTask.time}
                      onChange={(e) => setNewTask(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Duration (minutes)
                    </label>
                    <input
                      type="number"
                      min="15"
                      max="240"
                      step="15"
                      value={newTask.duration}
                      onChange={(e) => setNewTask(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Priority
                    </label>
                    <select
                      value={newTask.priority}
                      onChange={(e) => setNewTask(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => setShowNewTask(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    disabled={!newTask.title.trim()}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      newTask.title.trim()
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Task List & Stats */}
        <div className="space-y-6">
          {/* Selected Date Info */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {selectedDate === new Date().toISOString().split('T')[0] ? "Today's Tasks" : 
                 new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {todayTasks.length} tasks
              </span>
            </div>
            
            {todayTasks.length > 0 ? (
              <div className="space-y-3">
                {todayTasks.map(task => (
                  <div
                    key={task.id}
                    className="p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-start space-x-3">
                        <button
                          onClick={() => handleToggleComplete(task.id)}
                          className="mt-1"
                        >
                          {task.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <Circle className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <div>
                          <h4 className={`font-medium ${
                            task.completed
                              ? 'text-gray-500 dark:text-gray-400 line-through'
                              : 'text-gray-900 dark:text-white'
                          }`}>
                            {task.title}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {task.course} • {task.time} • {formatDuration(task.duration)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {task.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <Calendar className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
                <p className="text-gray-500 dark:text-gray-400">
                  No tasks scheduled for this day
                </p>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Study Statistics
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Total Tasks</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {tasks.length}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Completed</span>
                <span className="font-bold text-green-600 dark:text-green-400">
                  {completedTasks}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Pending</span>
                <span className="font-bold text-yellow-600 dark:text-yellow-400">
                  {pendingTasks}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600 dark:text-gray-300">Total Study Time</span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatDuration(totalStudyTime)}
                </span>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
                <span>Weekly Progress</span>
                <span>{Math.round((completedTasks / tasks.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  style={{ width: `${(completedTasks / tasks.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Upcoming Tasks */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Upcoming Tasks
            </h3>
            
            <div className="space-y-3">
              {tasks
                .filter(task => !task.completed && task.date > selectedDate)
                .slice(0, 3)
                .map(task => (
                  <div key={task.id} className="p-3 bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                          {task.title}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {task.date} • {task.time}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                ))}
              
              {tasks.filter(task => !task.completed && task.date > selectedDate).length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-2">
                  No upcoming tasks
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;
