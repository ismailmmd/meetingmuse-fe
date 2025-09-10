import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { DisplayMessage } from '../types/message';

interface MessageListProps {
  messages: DisplayMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center max-w-md slide-up">
            {/* Welcome Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
            
            {/* Welcome Message */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">
                Welcome to MeetingMuse! 👋
              </h3>
              <p className="text-gray-600 leading-relaxed">
                I'm your AI meeting assistant. I can help you schedule meetings, 
                manage your calendar, and coordinate with your team.
              </p>
              
              {/* Quick Start Suggestions */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-700 mb-4">Try asking me:</p>
                <div className="space-y-2">
                  {[
                    "Schedule a meeting with my team tomorrow",
                    "Find a time that works for everyone",
                    "What meetings do I have this week?",
                    "Help me plan a quarterly review meeting"
                  ].map((suggestion, index) => (
                    <div 
                      key={index}
                      className="px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm hover:bg-blue-100 transition-colors cursor-pointer"
                    >
                      "{suggestion}"
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 space-y-1">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};
