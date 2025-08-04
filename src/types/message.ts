export interface UserMessage {
  type: 'user_message';
  content: string;
  timestamp: string;
  session_id: string;
}

export interface BotResponse {
  content: string;
  timestamp: string;
  session_id: string;
}

export interface SystemMessage {
  type: 'system';
  content: string;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface ErrorMessage {
  type: 'error';
  error_code: string;
  message: string;
  timestamp: string;
  retry_suggested: boolean;
}

export type Message = UserMessage | BotResponse | SystemMessage | ErrorMessage;

export interface DisplayMessage {
  id: string;
  type: 'user' | 'ai' | 'system' | 'error';
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
}
