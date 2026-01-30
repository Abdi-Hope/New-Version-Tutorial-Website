import React, { useState, useRef, useEffect } from 'react';
import { Highlighter as HighlighterIcon, X, Palette } from 'lucide-react';

const Highlighter = ({ text, onHighlight }) => {
  const [isHighlighting, setIsHighlighting] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionRange, setSelectionRange] = useState(null);
  const [color, setColor] = useState('yellow');
  const textRef = useRef(null);

  const colors = {
    yellow: 'bg-yellow-200 dark:bg-yellow-900/50',
    blue: 'bg-blue-200 dark:bg-blue-900/50',
    green: 'bg-green-200 dark:bg-green-900/50',
    pink: 'bg-pink-200 dark:bg-pink-900/50',
    purple: 'bg-purple-200 dark:bg-purple-900/50'
  };

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection.toString().trim() && textRef.current?.contains(selection.anchorNode)) {
        setSelectedText(selection.toString());
        setSelectionRange(selection.getRangeAt(0));
        setIsHighlighting(true);
      } else {
        setIsHighlighting(false);
      }
    };

    document.addEventListener('selectionchange', handleSelection);
    return () => document.removeEventListener('selectionchange', handleSelection);
  }, []);

  const handleHighlight = () => {
    if (selectionRange && selectedText.trim()) {
      const span = document.createElement('span');
      span.className = `px-1 rounded ${colors[color]} cursor-pointer`;
      span.textContent = selectedText;
      span.onclick = () => handleRemoveHighlight(span);
      
      selectionRange.deleteContents();
      selectionRange.insertNode(span);

      if (onHighlight) {
        onHighlight({
          text: selectedText,
          color,
          timestamp: new Date().toISOString(),
          context: text.substring(
            Math.max(0, selectionRange.startOffset - 50),
            Math.min(text.length, selectionRange.endOffset + 50)
          )
        });
      }

      setSelectedText('');
      setSelectionRange(null);
      setIsHighlighting(false);
      window.getSelection().removeAllRanges();
    }
  };

  const handleRemoveHighlight = (element) => {
    if (window.confirm('Remove this highlight?')) {
      const textNode = document.createTextNode(element.textContent);
      element.parentNode.replaceChild(textNode, element);
    }
  };

  const handleClearSelection = () => {
    setSelectedText('');
    setSelectionRange(null);
    setIsHighlighting(false);
    window.getSelection().removeAllRanges();
  };

  return (
    <div className="relative">
      <div ref={textRef} className="prose prose-lg dark:prose-invert max-w-none">
        {text}
      </div>

      {isHighlighting && (
        <div className="fixed z-50 bg-white dark:bg-gray-800 shadow-xl rounded-lg p-3 border dark:border-gray-700 flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-gray-400" />
            {Object.entries(colors).map(([colorName, colorClass]) => (
              <button
                key={colorName}
                onClick={() => setColor(colorName)}
                className={`w-6 h-6 rounded-full ${colorClass} ${
                  color === colorName ? 'ring-2 ring-offset-1 ring-gray-400' : ''
                }`}
                title={`Highlight with ${colorName}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleHighlight}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center space-x-2"
          >
            <HighlighterIcon className="w-4 h-4" />
            <span>Highlight</span>
          </button>
          
          <button
            onClick={handleClearSelection}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
          
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {selectedText.length > 50 ? `${selectedText.substring(0, 50)}...` : selectedText}
          </div>
        </div>
      )}
    </div>
  );
};

export default Highlighter;
