import React, { useState } from 'react';
import { 
  Search, Filter, Clock, Tag, Trash2, Edit3, 
  ChevronRight, BookOpen, Star, MoreVertical 
} from 'lucide-react';

const NotesSidebar = ({ notes = [], onSelectNote, onCreateNote, onDeleteNote }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, recent, starred, tagged
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const filteredNotes = notes
    .filter(note => {
      if (!searchQuery) return true;
      return note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             note.content.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .filter(note => {
      switch (filter) {
        case 'recent':
          const noteDate = new Date(note.updatedAt);
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return noteDate > weekAgo;
        case 'starred':
          return note.starred;
        case 'tagged':
          return note.tags && note.tags.length > 0;
        default:
          return true;
      }
    });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

  const handleNoteClick = (note) => {
    setSelectedNoteId(note.id);
    if (onSelectNote) onSelectNote(note);
  };

  const handleDeleteNote = (noteId, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      if (onDeleteNote) onDeleteNote(noteId);
    }
  };

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r dark:border-gray-700">
      {/* Sidebar Header */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Notes
          </h2>
          <button
            onClick={onCreateNote}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            title="Create new note"
          >
            <Edit3 className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-none rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All', icon: null },
            { id: 'recent', label: 'Recent', icon: <Clock className="w-3 h-3" /> },
            { id: 'starred', label: 'Starred', icon: <Star className="w-3 h-3" /> },
            { id: 'tagged', label: 'Tagged', icon: <Tag className="w-3 h-3" /> },
          ].map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${
                filter === filterItem.id
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filterItem.icon && <span className="mr-1">{filterItem.icon}</span>}
              <span>{filterItem.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes List */}
      <div className="flex-1 overflow-y-auto">
        {filteredNotes.length === 0 ? (
          <div className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 mb-2">
              {searchQuery ? 'No notes found' : 'No notes yet'}
            </p>
            {!searchQuery && (
              <button
                onClick={onCreateNote}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
              >
                Create your first note
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y dark:divide-gray-700">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => handleNoteClick(note)}
                className={`p-4 cursor-pointer transition-colors ${
                  selectedNoteId === note.id
                    ? 'bg-blue-50 dark:bg-blue-900/20'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                    {note.title || 'Untitled Note'}
                  </h3>
                  <div className="flex items-center space-x-1">
                    {note.starred && (
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    )}
                    <button
                      onClick={(e) => handleDeleteNote(note.id, e)}
                      className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400" />
                    </button>
                    <ChevronRight className={`w-4 h-4 text-gray-400 ${
                      selectedNoteId === note.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">
                  {note.content.replace(/<[^>]*>/g, '')}
                </p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{formatDate(note.updatedAt)}</span>
                  
                  {note.tags && note.tags.length > 0 && (
                    <div className="flex items-center space-x-1">
                      <Tag className="w-3 h-3" />
                      <span>{note.tags.length} tags</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Stats Footer */}
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-300">
            {notes.length} notes
          </span>
          <span className="text-gray-500 dark:text-gray-400">
            {filteredNotes.length} shown
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotesSidebar;
