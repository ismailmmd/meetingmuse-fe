import React, { useState, useEffect, useRef } from 'react';
import { WebSocketService } from '../services/WebSocketService';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useAuth } from '../contexts/AuthContext';
import { DisplayMessage } from '../types/message';

export const ChatApp: React.FC = () => {
  const { user, session, logout } = useAuth();
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(true);
  const wsService = useRef<WebSocketService | null>(null);

  useEffect(() => {
    if (!user || !session?.sessionId || !session.clientId) return;
    
    wsService.current = new WebSocketService(session.clientId, session.sessionId);

    wsService.current.onStatusChange((status) => {
      setConnected(status);
      setConnecting(false);
    });

    wsService.current.onMessage((data) => {
      console.log('Received data:', data);

      const displayMessage: DisplayMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        type:
          'type' in data && data.type === 'error'
            ? 'error'
            : 'type' in data && data.type === 'system'
              ? 'system'
              : 'ai',
        content: 
          'content' in data ? data.content : 
          'message' in data ? data.message : 
          'Unknown message',
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages((prev) => {
        // Remove any existing processing messages when a new message arrives
        const filteredMessages = prev.filter(msg => 
          !(msg.type === 'system' && msg.content.toLowerCase() === 'processing')
        );
        return [...filteredMessages, displayMessage];
      });
    });

    wsService.current.connect().catch((error) => {
      console.error('Connection failed:', error);
      setConnecting(false);
      setConnected(false);
    });

    return () => {
      wsService.current?.disconnect();
    };
  }, [user, session]);

  const handleSend = (content: string) => {
    if (!wsService.current || !connected) return;

    const userMessage: DisplayMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date().toISOString(),
      status: 'sending',
    };

    setMessages((prev) => [...prev, userMessage]);

    wsService.current.sendMessage(content);

    setTimeout(() => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === userMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
    }, 100);
  };

  const getStatusText = () => {
    if (connecting) return 'Connecting...';
    if (connected) return 'Connected';
    return 'Disconnected';
  };

  const getStatusColor = () => {
    if (connecting) return 'text-yellow-200';
    if (connected) return 'text-green-200';
    return 'text-red-200';
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Responsive Header */}
      <div className="relative">
        <div className="blue-gradient px-4 py-3 sm:px-6 sm:py-4 shadow-lg">
          <div className="flex justify-between items-center">
            {/* Logo and Title - Responsive */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
              </div>
              
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">MeetingMuse</h1>
                <p className="text-blue-100 text-xs sm:text-sm font-medium hidden sm:block">AI Meeting Assistant</p>
              </div>
            </div>
            
            {/* Right side controls - Responsive */}
            <div className="flex items-center space-x-2">
              {/* Connection indicator */}
              <div className={`flex items-center space-x-1 sm:space-x-2 px-2 py-1 sm:px-3 sm:py-2 rounded-full bg-white/20 backdrop-blur-sm ${getStatusColor()}`}>
                <div
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                    connecting
                      ? 'bg-yellow-300 animate-pulse'
                      : connected
                        ? 'bg-green-300'
                        : 'bg-red-300'
                  }`}
                ></div>
                <span className="text-white font-medium text-xs sm:text-sm hidden sm:inline">
                  {getStatusText()}
                </span>
              </div>
              
              {/* User info - hidden on small screens */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-full bg-white/15 backdrop-blur-sm">
                <div className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-white text-sm font-medium">Anonymous</span>
              </div>
              
              {/* Logout Button */}
              <button
                onClick={logout}
                className="p-2 sm:px-3 sm:py-2 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm transition-all duration-200 group"
                title="Logout"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-red-200 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span className="hidden lg:inline ml-2 text-white text-sm font-medium group-hover:text-red-200">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container - Mobile optimized */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col bg-white/80 backdrop-blur-sm border-t border-white/20">
          <MessageList messages={messages} />
          <MessageInput onSend={handleSend} disabled={!connected} />
        </div>
      </div>
    </div>
  );
};
