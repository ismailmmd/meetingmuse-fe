export interface UserMessage {
  type: 'user_message';
  content: string;
  timestamp: string;
  session_id: string;
  timezone: string;
}

export interface UIButton {
  action_type: string;
  label: string;
  value: string;
  variant: 'primary' | 'secondary' | 'danger';
}

export interface UIElements {
  buttons?: UIButton[];
}

export interface BotResponse {
  type: 'bot_response';
  content: string;
  timestamp: string;
  session_id: string;
  metadata?: Record<string, unknown> | null;
  ui_elements?: UIElements;
}

export interface SystemMessage {
  type: 'system_message';
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
  type: 'bot_response' | 'user_message' | 'system_message' | 'error';
  content: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
  ui_elements?: UIElements;
}
