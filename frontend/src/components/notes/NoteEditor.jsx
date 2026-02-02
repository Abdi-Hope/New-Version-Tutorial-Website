import React, { useState, useRef } from 'react';
import { Save, X, Bold, Italic, List, Link, Paperclip, Smile } from 'lucide-react';

const NoteEditor = ({ 
  initialContent = '', 
  onSave, 
  onCancel, 
  placeholder = 'Type your notes here...',
  autoFocus = false 
}) => {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const editorRef = useRef(null);

  const handleSave = () => {
    if (content.trim() || title.trim()) {
      onSave({
        title: title.trim() || `Note ${new Date().toLocaleTimeString()}`,
        content: content.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setContent('');
      setTitle('');
    }
  };

  const handleFormat = (format) => {
    if (!editorRef.current) return;
    
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const selectedText = selection.toString();
    
    if (selectedText) {
      const span = document.createElement('span');
      
      switch (format) {
        case 'bold':
          span.style.fontWeight = isBold ? 'normal' : 'bold';
          setIsBold(!isBold);
          break;
        case 'italic':
          span.style.fontStyle = isItalic ? 'normal' : 'italic';
          setIsItalic(!isItalic);
          break;
      }
      
      span.textContent = selectedText;
      range.deleteContents();
      range.insertNode(span);
      
      // Update content state
      if (editorRef.current) {
        setContent(editorRef.current.innerHTML);
      }
    }
  };

  const handleInsertList = () => {
    if (!editorRef.current) return;
    
    const listItem = document.createElement('li');
    listItem.textContent = '• New list item';
    
    const list = document.createElement('ul');
    list.style.paddingLeft = '20px';
    list.appendChild(listItem);
    
    editorRef.current.appendChild(list);
    setContent(editorRef.current.innerHTML);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden">
      {/* Editor Header */}
      <div className="border-b dark:border-gray-700 p-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note title (optional)"
          className="w-full text-lg font-semibold bg-transparent border-none focus:outline-none text-gray-900 dark:text-white placeholder-gray-400"
          autoFocus={autoFocus}
        />
      </div>

      {/* Formatting Toolbar */}
      <div className="border-b dark:border-gray-700 p-3 bg-gray-50 dark:bg-gray-700/50 flex items-center space-x-2">
        <button
          onClick={() => handleFormat('bold')}
          className={`p-2 rounded ${isBold ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
          title="Bold"
        >
          <Bold className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        
        <button
          onClick={() => handleFormat('italic')}
          className={`p-2 rounded ${isItalic ? 'bg-gray-200 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-600'}`}
          title="Italic"
        >
          <Italic className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
        
        <button
          onClick={handleInsertList}
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
          title="Insert list"
        >
          <List className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        
        <button
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
          title="Insert link"
        >
          <Link className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        
        <button
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
          title="Add attachment"
        >
          <Paperclip className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
        
        <button
          className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
          title="Add emoji"
        >
          <Smile className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="p-4">
        <div
          ref={editorRef}
          contentEditable
          dangerouslySetInnerHTML={{ __html: content }}
          onInput={(e) => setContent(e.currentTarget.innerHTML)}
          className="min-h-[200px] max-h-[400px] overflow-y-auto prose prose-lg dark:prose-invert max-w-none focus:outline-none text-gray-700 dark:text-gray-300"
          placeholder={placeholder}
          style={{ 
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}
        />
        
        {!content && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            {placeholder}
          </div>
        )}
      </div>

      {/* Editor Footer */}
      <div className="border-t dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {content.length} characters
        </div>
        
        <div className="flex items-center space-x-3">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 font-medium"
            >
              <X className="w-4 h-4 inline mr-2" />
              Cancel
            </button>
          )}
          
          <button
            onClick={handleSave}
            disabled={!content.trim() && !title.trim()}
            className={`px-4 py-2 rounded-lg font-medium flex items-center space-x-2 ${
              content.trim() || title.trim()
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Note</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
