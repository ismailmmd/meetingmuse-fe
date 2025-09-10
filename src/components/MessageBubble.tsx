import React from 'react';
import { DisplayMessage } from '../types/message';

interface MessageBubbleProps {
  message: DisplayMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';
  const isSystem = message.type === 'system';

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 fade-in`}>
      {/* AI Avatar for non-user messages */}
      {!isUser && !isError && !isSystem && (
        <div className="flex-shrink-0 mr-3 mt-1">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
        </div>
      )}
      
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-5 py-3 rounded-2xl shadow-lg ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-12 rounded-br-md'
            : isError
              ? 'bg-gradient-to-br from-red-50 to-red-100 text-red-700 border border-red-200 rounded-bl-md'
              : isSystem
                ? 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 border border-amber-200 rounded-bl-md'
                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md hover:shadow-xl transition-shadow duration-200'
        }`}
      >
        {/* Message Content */}
        <div className={`text-sm leading-relaxed ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {message.content}
        </div>
        
        {/* Timestamp and Status */}
        <div className="flex items-center justify-between mt-2">
          <div
            className={`text-xs ${
              isUser 
                ? 'text-blue-100' 
                : isError 
                  ? 'text-red-500' 
                  : isSystem 
                    ? 'text-amber-600' 
                    : 'text-gray-500'
            }`}
          >
            {formatTime(message.timestamp)}
          </div>
          
          {/* Message Status Indicators */}
          {message.status && (
            <div className="flex items-center space-x-1">
              {message.status === 'sending' && (
                <>
                  <div className="w-1 h-1 bg-blue-200 rounded-full animate-pulse"></div>
                  <span className="text-xs text-blue-200">Sending</span>
                </>
              )}
              {message.status === 'sent' && isUser && (
                <svg className="w-3 h-3 text-blue-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                </svg>
              )}
              {message.status === 'error' && (
                <>
                  <svg className="w-3 h-3 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-xs text-red-400">Failed</span>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* User Avatar for user messages */}
      {isUser && (
        <div className="flex-shrink-0 ml-3 mt-1">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center shadow-md">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
