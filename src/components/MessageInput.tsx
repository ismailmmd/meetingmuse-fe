import React, { useState, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  disabled = false,
}) => {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-100 p-6 bg-gray-50/50">
      <div className="flex space-x-4 items-end">
        {/* Input Container */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              disabled
                ? 'Connecting to MeetingMuse...'
                : 'Ask me anything about scheduling meetings...'
            }
            disabled={disabled}
            className={`
              w-full px-4 py-3 pr-12 resize-none rounded-2xl border-2 transition-all duration-200 font-medium
              ${disabled 
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white border-gray-200 text-gray-800 focus:border-blue-400 focus:bg-white'
              }
              focus:outline-none focus:ring-0 shadow-sm hover:shadow-md focus:shadow-lg
              placeholder:text-gray-400 placeholder:font-normal
            `}
            rows={1}
            style={{ 
              minHeight: '52px', 
              maxHeight: '120px',
              lineHeight: '1.5'
            }}
          />
          
          {/* Character Count or Status */}
          {message.length > 0 && !disabled && (
            <div className="absolute bottom-2 right-3 text-xs text-gray-400">
              {message.length > 200 && (
                <span className="text-amber-500">{message.length}/500</span>
              )}
            </div>
          )}
        </div>
        
        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className={`
            relative px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-200 shadow-lg
            flex items-center space-x-2 min-w-[100px] justify-center
            ${disabled || !message.trim()
              ? 'bg-gray-300 cursor-not-allowed shadow-sm'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl transform hover:scale-105 active:scale-95'
            }
          `}
        >
          {disabled ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Wait</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
              <span className="text-sm">Send</span>
            </>
          )}
        </button>
      </div>
      
      {/* Subtle Help Text */}
      <div className="mt-3 text-xs text-gray-500 text-center">
        Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono">Enter</kbd> to send • <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono">Shift + Enter</kbd> for new line
      </div>
    </div>
  );
};
