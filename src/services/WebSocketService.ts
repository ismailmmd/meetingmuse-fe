import { UserMessage, Message } from '../types/message';

export class WebSocketService {
  private ws: WebSocket | null = null;
  private clientId: string;
  private messageCallbacks: ((message: Message) => void)[] = [];
  private statusCallbacks: ((status: boolean) => void)[] = [];

  constructor() {
    this.clientId = `client-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  async connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(`ws://localhost:8000/ws/${this.clientId}`);

        this.ws.onopen = () => {
          console.log('Connected to WebSocket server');
          this.notifyStatusChange(true);
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('Received message:', data);
            this.messageCallbacks.forEach((callback) => callback(data));
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('WebSocket connection closed');
          this.notifyStatusChange(false);
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          this.notifyStatusChange(false);
          reject(error);
        };
      } catch (error) {
        reject(error);
      }
    });
  }

  sendMessage(content: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const message: UserMessage = {
        type: 'user_message',
        content,
        timestamp: new Date().toISOString(),
        session_id: this.clientId,
      };

      console.log('Sending message:', message);
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  onMessage(callback: (message: Message) => void): void {
    this.messageCallbacks.push(callback);
  }

  onStatusChange(callback: (connected: boolean) => void): void {
    this.statusCallbacks.push(callback);
  }

  private notifyStatusChange(connected: boolean): void {
    this.statusCallbacks.forEach((callback) => callback(connected));
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
