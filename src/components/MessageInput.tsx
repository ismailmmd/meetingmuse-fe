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
    <div className="border-t border-gray-200/50 p-3 sm:p-4 bg-white/60 backdrop-blur-sm">
      <div className="flex space-x-2 sm:space-x-3 items-end max-w-4xl mx-auto">
        {/* Input Container */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={
              disabled
                ? 'Connecting...'
                : 'Ask me anything about scheduling...'
            }
            disabled={disabled}
            className={`
              w-full px-3 py-2 sm:px-4 sm:py-3 resize-none rounded-xl sm:rounded-2xl border-2 transition-all duration-200
              min-h-[44px] max-h-[100px] sm:min-h-[52px] sm:max-h-[120px]
              ${disabled 
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white border-gray-200 text-gray-800 focus:border-blue-400 focus:bg-white'
              }
              focus:outline-none focus:ring-0 shadow-sm hover:shadow-md focus:shadow-lg
              placeholder:text-gray-400 text-sm sm:text-base
            `}
            rows={1}
            style={{ 
              lineHeight: '1.4'
            }}
          />
        </div>
        
        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className={`
            px-3 py-2 sm:px-4 sm:py-3 rounded-xl sm:rounded-2xl font-medium text-white transition-all duration-200 shadow-lg
            flex items-center justify-center min-w-[60px] sm:min-w-[80px]
            ${disabled || !message.trim()
              ? 'bg-gray-300 cursor-not-allowed shadow-sm'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl active:scale-95'
            }
          `}
        >
          {disabled ? (
            <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          )}
        </button>
      </div>
      
      {/* Help Text - Only show on larger screens */}
      <div className="mt-2 text-xs text-gray-500 text-center hidden sm:block">
        Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono">Enter</kbd> to send • <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-mono">Shift + Enter</kbd> for new line
      </div>
    </div>
  );
};
