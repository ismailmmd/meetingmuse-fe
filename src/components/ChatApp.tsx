import React, { useState, useEffect, useRef } from 'react';
import { WebSocketService } from '../services/WebSocketService';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { useAuth } from '../contexts/AuthContext';
import { DisplayMessage } from '../types/message';

export const ChatApp: React.FC = () => {
  const { user, session } = useAuth();
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
    <div className="h-screen flex flex-col">
      {/* Elegant Header with Gradient and Glass Effect */}
      <div className="relative">
        <div className="blue-gradient p-6 shadow-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              {/* Logo/Icon */}
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
              </div>
              
              <div>
                <h1 className="text-2xl font-bold text-white tracking-tight">MeetingMuse</h1>
                <p className="text-blue-100 text-sm font-medium">AI Meeting Assistant</p>
              </div>
            </div>
            
            {/* Connection Status */}
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm ${getStatusColor()}`}>
                <div
                  className={`w-3 h-3 rounded-full ${
                    connecting
                      ? 'bg-yellow-300 animate-pulse shadow-lg shadow-yellow-300/50'
                      : connected
                        ? 'bg-green-300 shadow-lg shadow-green-300/50'
                        : 'bg-red-300 shadow-lg shadow-red-300/50'
                  }`}
                ></div>
                <span className="text-white font-medium text-sm">
                  {getStatusText()}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-sm">
                <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                </div>
                <span className="text-white text-sm font-medium">Anonymous</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle shadow gradient */}
        <div className="absolute inset-x-0 top-full h-4 bg-gradient-to-b from-black/10 to-transparent pointer-events-none"></div>
      </div>

      {/* Chat Container with Glass Effect */}
      <div className="flex-1 p-4 overflow-hidden">
        <div className="h-full glass-effect rounded-2xl shadow-2xl overflow-hidden flex flex-col">
          <MessageList messages={messages} />
          <MessageInput onSend={handleSend} disabled={!connected} />
        </div>
      </div>
    </div>
  );
};
