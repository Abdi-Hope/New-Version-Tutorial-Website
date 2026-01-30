import React, { createContext, useContext, useState, useEffect } from 'react';

const NotesContext = createContext();

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within NotesProvider');
  }
  return context;
};

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('eLearningNotes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('eLearningNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    const newNote = {
      ...note,
      id: Date.now().toString(),
    };
    setNotes(prev => [newNote, ...prev]);
    return newNote;
  };

  const updateNote = (id, updates) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const starNote = (id) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, starred: !note.starred } : note
    ));
  };

  const addTagToNote = (id, tag) => {
    setNotes(prev => prev.map(note => {
      if (note.id === id) {
        const tags = note.tags || [];
        if (!tags.includes(tag)) {
          return { ...note, tags: [...tags, tag] };
        }
      }
      return note;
    }));
  };

  const value = {
    notes,
    addNote,
    updateNote,
    deleteNote,
    starNote,
    addTagToNote
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
    </NotesContext.Provider>
  );
};
