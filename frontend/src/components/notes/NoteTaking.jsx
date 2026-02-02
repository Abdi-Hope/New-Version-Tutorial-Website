import React, { useState, useEffect } from 'react';
import { useNotes } from '../../context/NotesContext';
import NotesSidebar from './NotesSidebar';
import NoteEditor from './NoteEditor';
import Highlighter from './Highlighter';
import BookmarkButton from './BookmarkButton';

const NoteTaking = ({ lessonContent, lessonId, lessonTitle }) => {
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [activeNote, setActiveNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [viewMode, setViewMode] = useState('split'); // split, editor, preview

  // Filter notes for this lesson
  const lessonNotes = notes.filter(note => note.lessonId === lessonId);

  const handleCreateNote = () => {
    setActiveNote(null);
    setIsEditing(true);
  };

  const handleSelectNote = (note) => {
    setActiveNote(note);
    setIsEditing(false);
  };

  const handleSaveNote = (noteData) => {
    if (activeNote) {
      updateNote(activeNote.id, {
        ...noteData,
        lessonId,
        lessonTitle,
        updatedAt: new Date().toISOString()
      });
    } else {
      addNote({
        ...noteData,
        lessonId,
        lessonTitle,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        starred: false,
        tags: []
      });
    }
    setIsEditing(false);
  };

  const handleDeleteNote = (noteId) => {
    deleteNote(noteId);
    if (activeNote && activeNote.id === noteId) {
      setActiveNote(null);
      setIsEditing(false);
    }
  };

  const handleHighlight = (highlightData) => {
    addNote({
      title: `Highlight from "${lessonTitle}"`,
      content: `"${highlightData.text}"`,
      type: 'highlight',
      color: highlightData.color,
      context: highlightData.context,
      lessonId,
      lessonTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      starred: false,
      tags: ['highlight']
    });
  };

  const handleBookmark = (bookmarkData) => {
    addNote({
      title: `Bookmark: ${lessonTitle}`,
      content: `Bookmarked at ${new Date(bookmarkData.timestamp).toLocaleTimeString()}`,
      type: 'bookmark',
      lessonId,
      lessonTitle,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      starred: bookmarkData.bookmarked,
      tags: ['bookmark']
    });
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              Notes for: {lessonTitle}
            </h2>
            <BookmarkButton
              lessonId={lessonId}
              lessonTitle={lessonTitle}
              onBookmark={handleBookmark}
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
              {['split', 'editor', 'preview'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize ${
                    viewMode === mode
                      ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow'
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
            
            <button
              onClick={handleCreateNote}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              New Note
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500 dark:text-gray-400">
          <span>{lessonNotes.length} notes for this lesson</span>
          <span>•</span>
          <span>{lessonNotes.filter(n => n.type === 'highlight').length} highlights</span>
          <span>•</span>
          <span>{lessonNotes.filter(n => n.type === 'bookmark').length} bookmarks</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Always visible */}
        <div className="w-80 border-r dark:border-gray-700">
          <NotesSidebar
            notes={lessonNotes}
            onSelectNote={handleSelectNote}
            onCreateNote={handleCreateNote}
            onDeleteNote={handleDeleteNote}
          />
        </div>

        {/* Main Editor/Preview Area */}
        <div className="flex-1 overflow-auto p-6">
          {viewMode === 'split' ? (
            <div className="grid grid-cols-2 gap-6 h-full">
              {/* Left: Lesson Content with Highlighter */}
              <div className="overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 pb-4 mb-4 border-b dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Lesson Content
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Select text to highlight
                  </p>
                </div>
                <Highlighter
                  text={lessonContent}
                  onHighlight={handleHighlight}
                />
              </div>

              {/* Right: Note Editor/Viewer */}
              <div className="overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 pb-4 mb-4 border-b dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isEditing ? (activeNote ? 'Edit Note' : 'New Note') : 'Note Viewer'}
                  </h3>
                  {activeNote && !isEditing && (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      Edit this note
                    </button>
                  )}
                </div>
                
                {isEditing ? (
                  <NoteEditor
                    initialContent={activeNote?.content || ''}
                    onSave={handleSaveNote}
                    onCancel={() => {
                      setIsEditing(false);
                      if (!activeNote) setActiveNote(null);
                    }}
                    autoFocus={!activeNote}
                  />
                ) : activeNote ? (
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                        {activeNote.title}
                      </h4>
                      {activeNote.type === 'highlight' && (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          activeNote.color === 'yellow' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                          activeNote.color === 'blue' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                          activeNote.color === 'green' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                          'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          Highlight
                        </span>
                      )}
                    </div>
                    
                    <div 
                      className="prose prose-lg dark:prose-invert max-w-none mb-6"
                      dangerouslySetInnerHTML={{ __html: activeNote.content }}
                    />
                    
                    {activeNote.context && (
                      <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Context:</p>
                        <p className="text-gray-700 dark:text-gray-300 italic">
                          "...{activeNote.context}..."
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-6 pt-6 border-t dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex justify-between">
                        <span>Created: {new Date(activeNote.createdAt).toLocaleDateString()}</span>
                        <span>Updated: {new Date(activeNote.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📝</span>
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No note selected
                    </h4>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Select a note from the sidebar or create a new one
                    </p>
                    <button
                      onClick={handleCreateNote}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                    >
                      Create your first note
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : viewMode === 'editor' ? (
            <NoteEditor
              initialContent={activeNote?.content || ''}
              onSave={handleSaveNote}
              onCancel={() => setIsEditing(false)}
              autoFocus={true}
            />
          ) : (
            <Highlighter
              text={lessonContent}
              onHighlight={handleHighlight}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteTaking;
