import React from 'react';
import { DisplayMessage } from '../types/message';

interface MessageBubbleProps {
  message: DisplayMessage;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.type === 'user';
  const isError = message.type === 'error';
  const isSystem = message.type === 'system';
  const isProcessing = isSystem && message.content.toLowerCase() === 'processing';
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // Special rendering for all system messages (except processing)
  if (isSystem && !isProcessing) {
    return (
      <div className="flex justify-center mb-3 fade-in">
        <div className="px-3 py-1 bg-gray-100/80 text-gray-500 rounded-full text-xs font-medium">
          <span>{message.content.replace(/_/g, ' ')}</span>
          <span className="ml-2 text-gray-400">{formatTime(message.timestamp)}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 fade-in`}>
      {/* AI Avatar for non-user messages and processing */}
      {(!isUser && !isError && !isSystem) || isProcessing ? (
        <div className="flex-shrink-0 mr-3 mt-1">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            {isProcessing ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            )}
          </div>
        </div>
      ) : null}
      
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg px-5 py-3 rounded-2xl shadow-lg ${
          isUser
            ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white ml-12 rounded-br-md'
            : isError
              ? 'bg-gradient-to-br from-red-50 to-red-100 text-red-700 border border-red-200 rounded-bl-md'
              : isProcessing
                ? 'bg-gradient-to-br from-blue-50 to-blue-100 text-blue-700 border border-blue-200 rounded-bl-md'
                : isSystem
                  ? 'bg-gradient-to-br from-amber-50 to-amber-100 text-amber-700 border border-amber-200 rounded-bl-md'
                  : 'bg-white text-gray-800 border border-gray-200 rounded-bl-md hover:shadow-xl transition-shadow duration-200'
        }`}
      >
        {/* Message Content */}
        <div className={`text-sm leading-relaxed ${isUser ? 'text-white' : isProcessing ? 'text-blue-700' : 'text-gray-800'}`}>
          {isProcessing ? (
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
              <span className="font-medium">Processing your request...</span>
            </div>
          ) : (
            message.content
          )}
        </div>
        
        {/* Timestamp and Status */}
        <div className="flex items-center justify-between mt-2">
          <div
            className={`text-xs ${
              isUser 
                ? 'text-blue-100' 
                : isError 
                  ? 'text-red-500' 
                  : isProcessing
                    ? 'text-blue-600'
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
