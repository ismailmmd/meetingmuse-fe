import React, { useState, useEffect, useRef } from 'react';
import { WebSocketService } from '../services/WebSocketService';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { DisplayMessage } from '../types/message';

export const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(true);
  const wsService = useRef<WebSocketService | null>(null);

  useEffect(() => {
    wsService.current = new WebSocketService();

    wsService.current.onStatusChange((status) => {
      setConnected(status);
      setConnecting(false);
    });

    wsService.current.onMessage((data) => {
      console.log('Received data:', data);
      
      const displayMessage: DisplayMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        type: data.type === 'error' ? 'error' : 
              data.type === 'system' ? 'system' : 'ai',
        content: data.content || data.message || 'Unknown message',
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages(prev => [...prev, displayMessage]);
    });

    wsService.current.connect()
      .catch((error) => {
        console.error('Connection failed:', error);
        setConnecting(false);
        setConnected(false);
      });

    return () => {
      wsService.current?.disconnect();
    };
  }, []);

  const handleSend = (content: string) => {
    if (!wsService.current || !connected) return;

    const userMessage: DisplayMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date().toISOString(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);

    wsService.current.sendMessage(content);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === userMessage.id 
            ? { ...msg, status: 'sent' }
            : msg
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
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="bg-blue-600 text-white p-4 shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">MeetingMuse Chat</h1>
          <div className={`text-sm flex items-center ${getStatusColor()}`}>
            <div className={`w-2 h-2 rounded-full mr-2 ${
              connecting ? 'bg-yellow-400 animate-pulse' :
              connected ? 'bg-green-400' : 'bg-red-400'
            }`}></div>
            {getStatusText()}
          </div>
        </div>
      </div>

      <MessageList messages={messages} />

      <MessageInput 
        onSend={handleSend} 
        disabled={!connected} 
      />
    </div>
  );
};