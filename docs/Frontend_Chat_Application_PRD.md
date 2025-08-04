# MeetingMuse Frontend Chat Application - Product Requirements Document

## Executive Summary

This PRD outlines the development of a modern, responsive web-based chat application for MeetingMuse, an AI-powered meeting scheduling assistant. The frontend will be built using React + Vite, TypeScript, Tailwind CSS, with ESLint, Prettier, and Husky for development quality assurance.

The application will provide users with an intuitive chat interface to interact with the MeetingMuse AI assistant for scheduling meetings, checking availability, and managing calendar events through natural conversation.

## Business Objectives

### Primary Goals
1. **Intuitive User Experience**: Provide a modern, responsive chat interface for meeting scheduling
2. **Real-time Communication**: Seamless WebSocket integration with immediate feedback
3. **Conversation Continuity**: Maintain chat history and context across sessions
4. **Multi-platform Access**: Responsive design working across desktop, tablet, and mobile
5. **Professional Interface**: Clean, modern UI suitable for business environments

### Success Metrics
- User engagement: Average session duration > 3 minutes
- Task completion: >85% successful meeting scheduling completion rate
- Performance: Initial load time < 2 seconds, message response time < 200ms
- User satisfaction: NPS score > 70
- Adoption: Daily active users growth of 20% month-over-month

## Technical Architecture

### Technology Stack
```
Frontend Framework: React 18+ with Vite
Language: TypeScript 5+
Styling: Tailwind CSS 3+
Code Quality: ESLint + @typescript-eslint, Prettier
Git Hooks: Husky + lint-staged
State Management: React Context + useReducer / Zustand
WebSocket Client: Native WebSocket API with reconnection logic
Build Tool: Vite 5+
Package Manager: npm/yarn/pnpm
```

### Architecture Overview
```
┌─────────────────────────────────────────────────────┐
│                Frontend Application                  │
├─────────────────────────────────────────────────────┤
│  UI Layer (React Components)                        │
│  ├── ChatInterface                                  │
│  ├── MessageList                                    │
│  ├── MessageInput                                   │
│  ├── StatusIndicators                               │
│  └── MeetingDetails                                 │
├─────────────────────────────────────────────────────┤
│  State Management Layer                             │
│  ├── Chat State (messages, typing indicators)       │
│  ├── Connection State (WebSocket status)            │
│  ├── User State (session, preferences)              │
│  └── Meeting State (current meeting details)        │
├─────────────────────────────────────────────────────┤
│  Service Layer                                      │
│  ├── WebSocket Service (connection management)      │
│  ├── Message Service (parsing, validation)          │
│  ├── Storage Service (local persistence)            │
│  └── Notification Service (browser notifications)   │
├─────────────────────────────────────────────────────┤
│  Utility Layer                                      │
│  ├── Date/Time Utilities                           │
│  ├── Validation Helpers                            │
│  ├── Theme Management                              │
│  └── Error Handling                                │
└─────────────────────────────────────────────────────┘
                          │
                   WebSocket Connection
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│            MeetingMuse Backend Server                │
│         (ws://localhost:8000/ws/{client_id})        │
└─────────────────────────────────────────────────────┘
```

## Feature Specifications

### 1. Core Chat Interface

#### 1.1 Message Display System
**Description**: Display chat messages in a conversational format with proper styling and metadata.

**Requirements**:
- Message bubbles with distinct styling for user/AI messages
- Timestamp display (relative time: "2 minutes ago")
- Message status indicators (sending, sent, delivered, error)
- Support for rich text formatting in AI responses
- Auto-scroll to latest message with manual scroll override
- Message grouping by time periods (Today, Yesterday, etc.)

**Technical Implementation**:
```typescript
interface Message {
  id: string;
  type: 'user' | 'ai' | 'system' | 'error';
  content: string;
  timestamp: string;
  sessionId: string;
  status?: 'sending' | 'sent' | 'delivered' | 'error';
  metadata?: Record<string, any>;
}

interface MessageListProps {
  messages: Message[];
  isTyping: boolean;
  onRetry: (messageId: string) => void;
}
```

#### 1.2 Message Input System
**Description**: Input interface for users to send messages with enhanced UX features.

**Requirements**:
- Multi-line text input with auto-resize (max 5 lines)
- Send button with keyboard shortcut (Enter to send, Shift+Enter for new line)
- Character counter (optional, based on backend limits)
- Draft message persistence (localStorage)
- Typing indicator transmission
- File attachment support (future enhancement)
- Quick reply suggestions for common responses

**Technical Implementation**:
```typescript
interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled: boolean;
  placeholder?: string;
  maxLength?: number;
  suggestions?: string[];
}
```

#### 1.3 Real-time Status Indicators
**Description**: Visual feedback for connection status and AI processing state.

**Requirements**:
- Connection status indicator (connected, connecting, disconnected)
- AI typing/processing indicator with animated dots
- System message display (non-intrusive notifications)
- Error state indicators with retry options
- Conversation resumed notifications
- Network connectivity warnings

### 2. WebSocket Integration

#### 2.1 Connection Management
**Description**: Robust WebSocket connection handling with automatic reconnection.

**Requirements**:
- Automatic connection establishment on app load
- Unique client ID generation and persistence
- Graceful reconnection with exponential backoff
- Connection health monitoring
- Offline/online state detection
- Connection error handling with user feedback

**Technical Implementation**:
```typescript
interface WebSocketConfig {
  url: string;
  clientId: string;
  reconnectAttempts: number;
  reconnectInterval: number;
  heartbeatInterval: number;
}

class WebSocketService {
  connect(config: WebSocketConfig): Promise<void>;
  disconnect(): void;
  sendMessage(message: UserMessage): void;
  onMessage(callback: (message: Message) => void): void;
  onConnectionChange(callback: (status: ConnectionStatus) => void): void;
}
```

#### 2.2 Message Protocol Implementation
**Description**: Handle all message types defined in the backend protocol.

**Message Types Support**:

**User Messages**:
```typescript
interface UserMessage {
  type: 'user_message';
  content: string;
  timestamp: string;
  session_id: string;
}
```

**AI Responses**:
```typescript
interface BotResponse {
  content: string;
  timestamp: string;
  session_id: string;
}
```

**System Messages**:
```typescript
interface SystemMessage {
  type: 'system';
  content: 'processing' | 'conversation_resumed' | 'waiting_for_input' | 'processing_step';
  timestamp: string;
  metadata?: {
    conversation_summary?: string;
    prompt?: string;
    suggestions?: string[];
    next_step?: string;
  };
}
```

**Error Messages**:
```typescript
interface ErrorMessage {
  type: 'error';
  error_code: string;
  message: string;
  timestamp: string;
  retry_suggested: boolean;
  metadata?: Record<string, any>;
}
```

### 3. Conversation Management

#### 3.1 Chat History Persistence
**Description**: Maintain conversation history across browser sessions.

**Requirements**:
- LocalStorage/IndexedDB persistence for offline access
- Session restoration on page reload
- Message synchronization with backend state
- Conversation export functionality (JSON, PDF)
- History search and filtering
- Privacy controls (clear history option)

#### 3.2 Session Management
**Description**: Handle user sessions and conversation context.

**Requirements**:
- Automatic session initialization
- Session ID persistence across browser sessions
- Multi-tab synchronization
- Session cleanup on explicit logout
- Session timeout handling

### 4. Meeting Context Display

#### 4.1 Meeting Details Panel
**Description**: Visual representation of meeting information being collected/scheduled.

**Requirements**:
- Collapsible side panel or modal overlay
- Real-time updates as AI collects meeting details
- Visual representation of meeting status (incomplete, complete, scheduled)
- Meeting details summary (title, participants, date/time, duration, location)
- Calendar integration preview (future enhancement)
- Meeting edit/modify capabilities

**Technical Implementation**:
```typescript
interface MeetingDetails {
  title?: string;
  participants?: string[];
  dateTime?: string;
  duration?: string;
  location?: string;
  status: 'collecting' | 'ready' | 'scheduled' | 'error';
}

interface MeetingPanelProps {
  meeting: MeetingDetails;
  isVisible: boolean;
  onToggle: () => void;
  onEdit: (field: keyof MeetingDetails, value: any) => void;
}
```

#### 4.2 Input Collection Interface
**Description**: Specialized UI for handling AI interrupts and input collection.

**Requirements**:
- Modal/overlay for focused input collection
- Form fields based on AI prompt requirements
- Input validation and formatting
- Quick selection options (suggested times, durations)
- Progress indicator for multi-step collection
- Cancel/back navigation options

### 5. User Experience Features

#### 5.1 Responsive Design
**Description**: Mobile-first responsive design for all screen sizes.

**Requirements**:
- Mobile optimization (320px - 768px)
- Tablet optimization (768px - 1024px)
- Desktop optimization (1024px+)
- Touch-friendly interface elements
- Adaptive text sizing
- Optimized message density for different screens

#### 5.2 Accessibility Features
**Description**: WCAG 2.1 AA compliance for inclusive user experience.

**Requirements**:
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management
- ARIA labels and descriptions
- Reduced motion preferences support

#### 5.3 Theme and Customization
**Description**: Visual customization options for different user preferences.

**Requirements**:
- Light/dark theme toggle
- Color scheme customization
- Font size adjustment
- Message density options
- Corporate branding support (future)

### 6. Performance Features

#### 6.1 Message Virtualization
**Description**: Efficient rendering for long chat histories.

**Requirements**:
- Virtual scrolling for 1000+ messages
- Lazy loading of message history
- Message caching strategy
- Memory optimization techniques
- Smooth scrolling performance

#### 6.2 Offline Support
**Description**: Basic functionality when network is unavailable.

**Requirements**:
- Offline message queuing
- Cached conversation history access
- Offline status indicators
- Auto-sync on reconnection
- Draft message persistence

## Component Architecture

### 1. Core Components

#### App Component (Root)
```typescript
interface AppProps {}

export const App: React.FC<AppProps> = () => {
  // Global state management
  // Theme provider
  // Error boundary
  // WebSocket provider
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <WebSocketProvider>
          <ChatApplication />
        </WebSocketProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};
```

#### ChatApplication (Main Layout)
```typescript
interface ChatApplicationProps {}

export const ChatApplication: React.FC<ChatApplicationProps> = () => {
  // Layout management
  // State orchestration
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <ChatInterface />
      <MeetingPanel />
    </div>
  );
};
```

#### ChatInterface (Core Chat)
```typescript
interface ChatInterfaceProps {}

export const ChatInterface: React.FC<ChatInterfaceProps> = () => {
  return (
    <div className="flex flex-col flex-1">
      <ChatHeader />
      <MessageList />
      <MessageInput />
    </div>
  );
};
```

### 2. Message Components

#### MessageList
```typescript
interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onRetry: (messageId: string) => void;
  onLoadMore: () => void;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoading,
  onRetry,
  onLoadMore
}) => {
  // Virtual scrolling implementation
  // Message grouping logic
  // Auto-scroll management
};
```

#### MessageBubble
```typescript
interface MessageBubbleProps {
  message: Message;
  onRetry?: () => void;
  showTimestamp?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  onRetry,
  showTimestamp
}) => {
  // Message rendering based on type
  // Status indicators
  // Retry functionality
};
```

#### MessageInput
```typescript
interface MessageInputProps {
  onSend: (content: string) => void;
  disabled: boolean;
  placeholder?: string;
  suggestions?: string[];
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSend,
  disabled,
  placeholder,
  suggestions
}) => {
  // Auto-resize textarea
  // Send button state
  // Quick reply suggestions
  // Draft persistence
};
```

### 3. System Components

#### ConnectionIndicator
```typescript
interface ConnectionIndicatorProps {
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  onReconnect?: () => void;
}
```

#### TypingIndicator
```typescript
interface TypingIndicatorProps {
  isVisible: boolean;
  message?: string;
}
```

#### SystemMessage
```typescript
interface SystemMessageProps {
  message: SystemMessage;
  onAction?: (action: string) => void;
}
```

### 4. Meeting Components

#### MeetingPanel
```typescript
interface MeetingPanelProps {
  meeting: MeetingDetails;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (updates: Partial<MeetingDetails>) => void;
}
```

#### MeetingDetailsCard
```typescript
interface MeetingDetailsCardProps {
  meeting: MeetingDetails;
  editable: boolean;
  onEdit: (field: string, value: any) => void;
}
```

#### InputCollectionModal
```typescript
interface InputCollectionModalProps {
  isOpen: boolean;
  prompt: string;
  inputType: 'text' | 'select' | 'datetime' | 'duration';
  suggestions?: string[];
  onSubmit: (value: string) => void;
  onCancel: () => void;
}
```

## State Management Architecture

### 1. Global State Structure
```typescript
interface AppState {
  // Connection state
  connection: {
    status: ConnectionStatus;
    clientId: string;
    lastConnected: string | null;
    reconnectAttempts: number;
  };
  
  // Chat state
  chat: {
    messages: Message[];
    isTyping: boolean;
    inputDraft: string;
    activeConversation: string | null;
  };
  
  // Meeting state
  meeting: {
    current: MeetingDetails | null;
    history: MeetingDetails[];
    inputCollection: {
      isActive: boolean;
      prompt: string;
      type: string;
      suggestions: string[];
    };
  };
  
  // UI state
  ui: {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
    meetingPanelOpen: boolean;
    notifications: Notification[];
  };
  
  // User state
  user: {
    preferences: UserPreferences;
    sessionId: string;
  };
}
```

### 2. Action Types
```typescript
// Connection actions
type ConnectionAction =
  | { type: 'CONNECTION_CONNECTING' }
  | { type: 'CONNECTION_CONNECTED'; clientId: string }
  | { type: 'CONNECTION_DISCONNECTED' }
  | { type: 'CONNECTION_ERROR'; error: string }
  | { type: 'CONNECTION_RECONNECT_ATTEMPT'; attempt: number };

// Chat actions  
type ChatAction =
  | { type: 'MESSAGE_SEND'; message: UserMessage }
  | { type: 'MESSAGE_RECEIVE'; message: Message }
  | { type: 'MESSAGE_UPDATE_STATUS'; messageId: string; status: MessageStatus }
  | { type: 'TYPING_START' }
  | { type: 'TYPING_STOP' }
  | { type: 'DRAFT_UPDATE'; content: string };

// Meeting actions
type MeetingAction =
  | { type: 'MEETING_UPDATE'; updates: Partial<MeetingDetails> }
  | { type: 'MEETING_COMPLETE'; meeting: MeetingDetails }
  | { type: 'INPUT_COLLECTION_START'; prompt: string; type: string; suggestions: string[] }
  | { type: 'INPUT_COLLECTION_SUBMIT'; value: string }
  | { type: 'INPUT_COLLECTION_CANCEL' };
```

### 3. Context Providers
```typescript
// Main app context
export const AppContext = createContext<{
  state: AppState;
  dispatch: Dispatch<AppAction>;
} | null>(null);

// WebSocket context
export const WebSocketContext = createContext<{
  sendMessage: (message: UserMessage) => void;
  connectionStatus: ConnectionStatus;
  reconnect: () => void;
} | null>(null);

// Theme context
export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
} | null>(null);
```

## Service Layer Architecture

### 1. WebSocket Service
```typescript
export class WebSocketService {
  private ws: WebSocket | null = null;
  private clientId: string;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectInterval = 1000;
  private messageQueue: UserMessage[] = [];
  
  constructor(clientId: string) {
    this.clientId = clientId;
  }
  
  async connect(url: string): Promise<void> {
    // Connection establishment
    // Event listeners setup
    // Heartbeat initialization
  }
  
  disconnect(): void {
    // Clean disconnect
    // Clear timers
    // Reset state
  }
  
  sendMessage(message: UserMessage): void {
    // Queue message if disconnected
    // Send immediately if connected
    // Update message status
  }
  
  private handleMessage(event: MessageEvent): void {
    // Parse incoming message
    // Route to appropriate handler
    // Trigger callbacks
  }
  
  private handleReconnection(): void {
    // Exponential backoff
    // Queue message handling
    // State recovery
  }
}
```

### 2. Message Service
```typescript
export class MessageService {
  static parseMessage(data: string): Message | null {
    // JSON parsing with error handling
    // Message validation
    // Type-specific processing
  }
  
  static createUserMessage(content: string, sessionId: string): UserMessage {
    // Message creation with proper formatting
    // Timestamp generation
    // Validation
  }
  
  static formatMessageForDisplay(message: Message): DisplayMessage {
    // Rich text processing
    // Link detection
    // Timestamp formatting
  }
}
```

### 3. Storage Service
```typescript
export class StorageService {
  private static readonly MESSAGES_KEY = 'meetingmuse_messages';
  private static readonly SESSION_KEY = 'meetingmuse_session';
  private static readonly PREFERENCES_KEY = 'meetingmuse_preferences';
  
  static saveMessages(messages: Message[]): void {
    // localStorage persistence
    // Compression for large histories
    // Error handling
  }
  
  static loadMessages(): Message[] {
    // Retrieve from localStorage
    // Parsing and validation
    // Migration handling
  }
  
  static saveSession(sessionData: SessionData): void {
    // Session persistence
    // Encryption for sensitive data
  }
  
  static clearAllData(): void {
    // Complete data cleanup
    // User confirmation
  }
}
```

### 4. Notification Service
```typescript
export class NotificationService {
  static async requestPermission(): Promise<boolean> {
    // Browser notification permission
    // Fallback handling
  }
  
  static showNotification(title: string, options?: NotificationOptions): void {
    // Browser notification display
    // Fallback to in-app notification
  }
  
  static showInAppNotification(notification: AppNotification): void {
    // Toast/banner notifications
    // Auto-dismiss timers
  }
}
```

## API Integration Specifications

### 1. WebSocket Endpoint
**URL**: `ws://localhost:8000/ws/{client_id}`
**Protocol**: WebSocket with JSON message format

### 2. Message Flow Patterns

#### Standard Chat Flow
```
User Input → Frontend Validation → WebSocket Send → Backend Processing → AI Response → Frontend Display
```

#### Interrupt Handling Flow
```
User Input → WebSocket Send → Backend Processing → Interrupt Signal → Input Collection UI → User Response → Resume Processing
```

#### Reconnection Flow
```
Connection Lost → Reconnection Attempt → State Recovery → Message Queue Flush → Normal Operation
```

### 3. Error Handling Patterns

#### Connection Errors
```typescript
interface ConnectionError {
  type: 'connection_failed' | 'authentication_failed' | 'network_error';
  message: string;
  retryable: boolean;
  retryAfter?: number;
}
```

#### Message Errors
```typescript
interface MessageError {
  type: 'invalid_format' | 'processing_error' | 'timeout';
  originalMessage: Message;
  suggestedAction: 'retry' | 'rephrase' | 'contact_support';
}
```

## Styling and Design System

### 1. Design Tokens
```scss
// Colors
$primary-blue: #2563eb;
$primary-blue-light: #3b82f6;
$primary-blue-dark: #1e40af;

$gray-50: #f9fafb;
$gray-100: #f3f4f6;
$gray-200: #e5e7eb;
$gray-300: #d1d5db;
$gray-400: #9ca3af;
$gray-500: #6b7280;
$gray-600: #4b5563;
$gray-700: #374151;
$gray-800: #1f2937;
$gray-900: #111827;

// Typography
$font-family-sans: 'Inter', system-ui, sans-serif;
$font-size-xs: 0.75rem;
$font-size-sm: 0.875rem;
$font-size-base: 1rem;
$font-size-lg: 1.125rem;
$font-size-xl: 1.25rem;

// Spacing
$spacing-1: 0.25rem;
$spacing-2: 0.5rem;
$spacing-3: 0.75rem;
$spacing-4: 1rem;
$spacing-6: 1.5rem;
$spacing-8: 2rem;

// Shadows
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

// Borders
$border-radius-sm: 0.25rem;
$border-radius-md: 0.375rem;
$border-radius-lg: 0.5rem;
$border-radius-xl: 0.75rem;
```

### 2. Component Styling Patterns

#### Message Bubbles
```scss
.message-bubble {
  @apply max-w-sm p-3 rounded-lg shadow-sm;
  
  &--user {
    @apply bg-blue-500 text-white ml-auto;
    border-bottom-right-radius: 0.25rem;
  }
  
  &--ai {
    @apply bg-white text-gray-900 border border-gray-200;
    border-bottom-left-radius: 0.25rem;
  }
  
  &--system {
    @apply bg-yellow-50 text-yellow-800 border border-yellow-200 mx-auto text-center;
  }
  
  &--error {
    @apply bg-red-50 text-red-800 border border-red-200;
  }
}
```

#### Input Styling
```scss
.message-input {
  @apply w-full p-3 border border-gray-300 rounded-lg resize-none;
  @apply focus:ring-2 focus:ring-blue-500 focus:border-transparent;
  @apply placeholder-gray-500;
  
  &:disabled {
    @apply bg-gray-50 text-gray-500 cursor-not-allowed;
  }
}
```

### 3. Responsive Design Patterns

#### Mobile-First Approach
```scss
// Mobile (default)
.chat-container {
  @apply flex flex-col h-screen;
}

.message-list {
  @apply flex-1 p-4 overflow-y-auto;
}

.message-input-container {
  @apply p-4 border-t border-gray-200;
}

// Tablet and up
@screen md {
  .chat-container {
    @apply max-w-4xl mx-auto;
  }
  
  .message-list {
    @apply px-6;
  }
}

// Desktop
@screen lg {
  .chat-container {
    @apply grid grid-cols-4 gap-6;
  }
  
  .chat-main {
    @apply col-span-3;
  }
  
  .meeting-panel {
    @apply col-span-1;
  }
}
```

## Development Workflow

### 1. Project Setup
```bash
# Initialize Vite + React + TypeScript project
npm create vite@latest meetingmuse-frontend -- --template react-ts

# Navigate to project directory
cd meetingmuse-frontend

# Install dependencies
npm install

# Install additional dependencies
npm install @types/node tailwindcss postcss autoprefixer
npm install @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install prettier eslint-config-prettier eslint-plugin-prettier
npm install husky lint-staged

# Install development dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev @testing-library/user-event vitest jsdom

# Setup Tailwind CSS
npx tailwindcss init -p

# Setup Husky
npx husky-init && npm run prepare
```

### 2. Configuration Files

#### Tailwind Config
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        }
      }
    },
  },
  plugins: [],
}
```

#### ESLint Config
```javascript
// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tsparser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/explicit-function-return-type': ['warn'],
    },
  },
]
```

#### Prettier Config
```javascript
// .prettierrc
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false
}
```

#### Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md}\"",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,md}": [
      "prettier --write"
    ]
  }
}
```

### 3. Folder Structure
```
meetingmuse-frontend/
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts
│   │   ├── chat/
│   │   │   ├── ChatInterface.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   ├── TypingIndicator.tsx
│   │   │   └── index.ts
│   │   ├── meeting/
│   │   │   ├── MeetingPanel.tsx
│   │   │   ├── MeetingDetailsCard.tsx
│   │   │   ├── InputCollectionModal.tsx
│   │   │   └── index.ts
│   │   ├── system/
│   │   │   ├── ConnectionIndicator.tsx
│   │   │   ├── SystemMessage.tsx
│   │   │   ├── ErrorBoundary.tsx
│   │   │   └── index.ts
│   │   └── layout/
│   │       ├── Header.tsx
│   │       ├── Sidebar.tsx
│   │       ├── Layout.tsx
│   │       └── index.ts
│   ├── hooks/
│   │   ├── useWebSocket.ts
│   │   ├── useChat.ts
│   │   ├── useMeeting.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   ├── services/
│   │   ├── WebSocketService.ts
│   │   ├── MessageService.ts
│   │   ├── StorageService.ts
│   │   ├── NotificationService.ts
│   │   └── index.ts
│   ├── context/
│   │   ├── AppContext.tsx
│   │   ├── WebSocketContext.tsx
│   │   ├── ThemeContext.tsx
│   │   └── index.ts
│   ├── types/
│   │   ├── message.ts
│   │   ├── meeting.ts
│   │   ├── connection.ts
│   │   ├── api.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── dateTime.ts
│   │   ├── validation.ts
│   │   ├── formatting.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   ├── styles/
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── utilities.css  
│   ├── __tests__/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .eslintrc.js
├── .prettierrc
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Testing Strategy

### 1. Unit Testing
**Framework**: Vitest + React Testing Library

**Test Coverage Goals**:
- Components: >90%
- Hooks: >95%
- Services: >95%
- Utilities: >95%

**Test Categories**:
```typescript
// Component Tests
describe('MessageBubble', () => {
  it('renders user message correctly', () => {});
  it('renders AI message correctly', () => {});
  it('shows retry button on error state', () => {});
  it('formats timestamp correctly', () => {});
});

// Hook Tests
describe('useWebSocket', () => {
  it('establishes connection on mount', () => {});
  it('handles reconnection on connection loss', () => {});
  it('queues messages when disconnected', () => {});
});

// Service Tests
describe('WebSocketService', () => {
  it('connects to WebSocket server', () => {});
  it('handles message sending', () => {});
  it('implements exponential backoff', () => {});
});
```

### 2. Integration Testing
**Framework**: Playwright + MSW (Mock Service Worker)

**Test Scenarios**:
```typescript
// End-to-End Chat Flow
test('complete conversation flow', async ({ page }) => {
  // Navigate to chat
  // Send message
  // Verify AI response
  // Check message persistence
});

// WebSocket Integration
test('WebSocket reconnection', async ({ page }) => {
  // Establish connection
  // Simulate network interruption
  // Verify automatic reconnection
  // Check message queue flush
});
```

### 3. Performance Testing
**Tools**: Lighthouse CI, Web Vitals

**Metrics**:
- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms

### 4. Accessibility Testing
**Tools**: axe-core, WAVE

**Requirements**:
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratio > 4.5:1

## Deployment Strategy

### 1. Build Configuration

#### Production Build
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          utils: ['date-fns', 'lodash']
        }
      }
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/ws': {
        target: 'ws://localhost:8000',
        ws: true,
        changeOrigin: true
      }
    }
  }
})
```

#### Environment Configuration
```typescript
// src/config/environment.ts
interface Config {
  wsUrl: string;
  apiUrl: string;
  environment: 'development' | 'staging' | 'production';
  enableLogging: boolean;
  maxReconnectAttempts: number;
}

const config: Config = {
  wsUrl: import.meta.env.VITE_WS_URL || 'ws://localhost:8000',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  environment: (import.meta.env.VITE_ENV as Config['environment']) || 'development',
  enableLogging: import.meta.env.VITE_ENABLE_LOGGING === 'true',
  maxReconnectAttempts: Number(import.meta.env.VITE_MAX_RECONNECT_ATTEMPTS) || 5,
};

export default config;
```

### 2. Docker Configuration
```dockerfile
# Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3. CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy Frontend

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - run: npm ci
      - run: npm run lint
      - run: npm run test:coverage
      - run: npm run build
  
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to production
        run: |
          # Deployment commands
```

## Security Considerations

### 1. Input Validation
```typescript
// Input sanitization
const sanitizeMessage = (content: string): string => {
  return content
    .trim()
    .substring(0, 1000) // Limit message length
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
    .replace(/javascript:/gi, ''); // Remove javascript: URLs
};

// Message validation
const validateMessage = (message: unknown): message is UserMessage => {
  return (
    typeof message === 'object' &&
    message !== null &&
    'type' in message &&
    'content' in message &&
    'timestamp' in message &&
    'session_id' in message
  );
};
```

### 2. XSS Prevention
```typescript
// Content Security Policy
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  connect-src 'self' ws://localhost:8000 wss://localhost:8000;
  img-src 'self' data: https:;
  font-src 'self';
`;

// HTML sanitization for AI responses
import DOMPurify from 'dompurify';

const sanitizeAIResponse = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: []
  });
};
```

### 3. Data Privacy
```typescript
// Local storage encryption
import CryptoJS from 'crypto-js';

const encryptData = (data: string, key: string): string => {
  return CryptoJS.AES.encrypt(data, key).toString();
};

const decryptData = (ciphertext: string, key: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, key);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Sensitive data handling
const handleSensitiveData = (data: any): any => {
  // Remove or mask sensitive information
  const sanitized = { ...data };
  delete sanitized.password;
  delete sanitized.token;
  return sanitized;
};
```

## Performance Optimization

### 1. Code Splitting
```typescript
// Route-based code splitting
import { lazy, Suspense } from 'react';

const ChatInterface = lazy(() => import('./components/chat/ChatInterface'));
const MeetingPanel = lazy(() => import('./components/meeting/MeetingPanel'));

export const App = (): JSX.Element => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <Routes>
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/meeting" element={<MeetingPanel />} />
        </Routes>
      </Router>
    </Suspense>
  );
};
```

### 2. Message Virtualization
```typescript
// Virtual scrolling for large message lists
import { FixedSizeList as List } from 'react-window';

interface MessageListProps {
  messages: Message[];
  height: number;
}

export const VirtualizedMessageList: React.FC<MessageListProps> = ({ 
  messages, 
  height 
}) => {
  const renderMessage = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <MessageBubble message={messages[index]} />
    </div>
  );

  return (
    <List
      height={height}
      itemCount={messages.length}
      itemSize={80}
      width="100%"
    >
      {renderMessage}
    </List>
  );
};
```

### 3. State Optimization
```typescript
// Memoization for expensive computations
import { useMemo } from 'react';

export const useOptimizedMessages = (messages: Message[]) => {
  const groupedMessages = useMemo(() => {
    return messages.reduce((groups, message) => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    }, {} as Record<string, Message[]>);
  }, [messages]);

  return groupedMessages;
};
```

## Monitoring and Analytics

### 1. Error Tracking
```typescript
// Error boundary with reporting
import * as Sentry from '@sentry/react';

export const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Sentry.ErrorBoundary fallback={ErrorFallback}>
      {children}
    </Sentry.ErrorBoundary>
  );
};

// Performance monitoring
const trackPerformance = (metric: string, value: number) => {
  // Send to analytics service
  if (typeof gtag !== 'undefined') {
    gtag('event', 'timing_complete', {
      name: metric,
      value: Math.round(value)
    });
  }
};
```

### 2. User Analytics
```typescript
// User interaction tracking
export const trackUserAction = (action: string, data?: any) => {
  // Analytics implementation
  if (typeof gtag !== 'undefined') {
    gtag('event', action, {
      event_category: 'user_interaction',
      event_label: action,
      custom_data: data
    });
  }
};

// Usage metrics
export const trackMessageSent = (messageLength: number) => {
  trackUserAction('message_sent', { length: messageLength });
};

export const trackConversationCompleted = (duration: number, messageCount: number) => {
  trackUserAction('conversation_completed', { duration, messageCount });
};
```

## Implementation Timeline

### MVP Phase: Quick Start (Week 1)
**Goal**: Get a working chat interface connected to your actual WebSocket server in minimum time.

**Day 1-2: Project Setup & Basic Structure**
- [ ] Initialize Vite + React + TypeScript project
- [ ] Install essential dependencies (Tailwind CSS, basic tooling)
- [ ] Create minimal folder structure
- [ ] Setup basic development environment

**Day 3-4: Core Chat Components**
- [ ] Create basic App component with chat layout
- [ ] Implement simple MessageList component (no virtualization)
- [ ] Create MessageBubble for user/AI message display
- [ ] Build MessageInput with send functionality

**Day 5-7: WebSocket Integration & Testing**
- [ ] Implement WebSocket connection service
- [ ] Connect to your actual server (`ws://localhost:8000/ws/{client_id}`)
- [ ] Handle message sending/receiving with proper JSON format
- [ ] Add basic error handling and connection status
- [ ] Test real conversations with your MeetingMuse AI

**MVP Deliverables**:
- ✅ Working chat interface that connects to your WebSocket server
- ✅ Send/receive messages in correct JSON format
- ✅ Basic UI with user/AI message bubbles
- ✅ Connection status indicator
- ✅ Local testing with your actual backend

**MVP Folder Structure**:
```
meetingmuse-frontend/
├── src/
│   ├── components/
│   │   ├── ChatApp.tsx
│   │   ├── MessageList.tsx
│   │   ├── MessageBubble.tsx
│   │   ├── MessageInput.tsx
│   │   └── ConnectionStatus.tsx
│   ├── services/
│   │   └── WebSocketService.ts
│   ├── types/
│   │   └── message.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

**MVP Component Examples**:

```typescript
// Simple WebSocket service for MVP
export class SimpleWebSocketService {
  private ws: WebSocket | null = null;
  private clientId: string;
  
  constructor() {
    this.clientId = `client-${Date.now()}`;
  }
  
  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ws = new WebSocket(`ws://localhost:8000/ws/${this.clientId}`);
      this.ws.onopen = () => resolve();
      this.ws.onerror = (error) => reject(error);
    });
  }
  
  sendMessage(content: string): void {
    if (this.ws?.readyState === WebSocket.OPEN) {
      const message = {
        type: "user_message",
        content,
        timestamp: new Date().toISOString(),
        session_id: this.clientId
      };
      this.ws.send(JSON.stringify(message));
    }
  }
  
  onMessage(callback: (message: any) => void): void {
    if (this.ws) {
      this.ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        callback(data);
      };
    }
  }
}

// Basic chat interface for MVP
export const ChatApp: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [connected, setConnected] = useState(false);
  const wsService = useRef(new SimpleWebSocketService());
  
  useEffect(() => {
    wsService.current.connect()
      .then(() => setConnected(true))
      .catch(console.error);
      
    wsService.current.onMessage((message) => {
      setMessages(prev => [...prev, message]);
    });
  }, []);
  
  const handleSend = (content: string) => {
    const userMessage = {
      type: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage]);
    wsService.current.sendMessage(content);
  };
  
  return (
    <div className="h-screen flex flex-col">
      <div className="bg-blue-600 text-white p-4">
        <h1>MeetingMuse Chat</h1>
        <div className={`text-sm ${connected ? 'text-green-200' : 'text-red-200'}`}>
          {connected ? '● Connected' : '● Disconnected'}
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.type === 'user' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-800'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      
      <MessageInput onSend={handleSend} disabled={!connected} />
    </div>
  );
};
```

### Phase 1: Foundation (Weeks 2-3)
**Building on MVP success**

**Week 2**:
- [ ] Enhance WebSocket service with reconnection logic
- [ ] Add proper TypeScript interfaces for all message types
- [ ] Implement system message handling (processing, error states)
- [ ] Add message status indicators (sending, sent, error)

**Week 3**:
- [ ] Create proper state management (Context + useReducer)
- [ ] Add conversation persistence (localStorage)
- [ ] Implement connection recovery and message queuing
- [ ] Enhanced error handling with retry mechanisms

### Phase 2: Core Features (Weeks 4-5)
**Week 4**:
- [ ] Meeting details panel integration
- [ ] Handle interrupt messages and input collection
- [ ] Add typing indicators and real-time feedback
- [ ] Implement proper message threading

**Week 5**:
- [ ] Message search and filtering
- [ ] Export conversation functionality
- [ ] Enhanced UI with better styling
- [ ] Mobile responsiveness

### Phase 3: Enhancement (Weeks 6-7)
**Week 6**:
- [ ] Performance optimizations (virtualization for long chats)
- [ ] Accessibility features (WCAG compliance)
- [ ] Offline support and message queuing
- [ ] Advanced UI animations and transitions

**Week 7**:
- [ ] Theme system (light/dark modes)
- [ ] Notification system integration
- [ ] Advanced WebSocket features (heartbeat, health checks)
- [ ] Polish and user experience refinements

### Phase 4: Testing & Deployment (Week 8)
**Week 8**:
- [ ] Comprehensive testing suite
- [ ] Performance testing and optimization
- [ ] Production build configuration
- [ ] Deployment setup and documentation

## MVP Quick Start Guide

### Prerequisites
- Node.js 18+ installed
- Your MeetingMuse WebSocket server running on `localhost:8000`
- Basic knowledge of React and TypeScript

### Step-by-Step MVP Setup

#### Step 1: Initialize Project (15 minutes)
```bash
# Create new Vite project
npm create vite@latest meetingmuse-frontend -- --template react-ts
cd meetingmuse-frontend

# Install dependencies
npm install

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Install additional dependencies
npm install @types/node
```

#### Step 2: Configure Tailwind (5 minutes)
```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

```css
/* src/index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### Step 3: Create Message Types (10 minutes)
```typescript
// src/types/message.ts
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
  metadata?: any;
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
```

#### Step 4: Create WebSocket Service (20 minutes)
```typescript
// src/services/WebSocketService.ts
import { UserMessage, Message } from '../types/message';

export class WebSocketService {
  private ws: WebSocket | null = null;
  private clientId: string;
  private messageCallbacks: ((message: any) => void)[] = [];
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
            this.messageCallbacks.forEach(callback => callback(data));
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
        type: "user_message",
        content,
        timestamp: new Date().toISOString(),
        session_id: this.clientId
      };
      
      console.log('Sending message:', message);
      this.ws.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not connected');
    }
  }

  onMessage(callback: (message: any) => void): void {
    this.messageCallbacks.push(callback);
  }

  onStatusChange(callback: (connected: boolean) => void): void {
    this.statusCallbacks.push(callback);
  }

  private notifyStatusChange(connected: boolean): void {
    this.statusCallbacks.forEach(callback => callback(connected));
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
```

#### Step 5: Create Message Components (30 minutes)
```typescript
// src/components/MessageBubble.tsx
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
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
        isUser 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : isError
          ? 'bg-red-100 text-red-800 border border-red-300'
          : isSystem
          ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
          : 'bg-gray-200 text-gray-800 rounded-bl-none'
      }`}>
        <div className="text-sm">{message.content}</div>
        <div className={`text-xs mt-1 ${
          isUser ? 'text-blue-100' : 'text-gray-500'
        }`}>
          {formatTime(message.timestamp)}
          {message.status === 'sending' && ' • Sending...'}
          {message.status === 'error' && ' • Failed'}
        </div>
      </div>
    </div>
  );
};
```

```typescript
// src/components/MessageInput.tsx
import React, { useState, KeyboardEvent } from 'react';

interface MessageInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const MessageInput: React.FC<MessageInputProps> = ({ onSend, disabled = false }) => {
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
    <div className="border-t border-gray-200 p-4">
      <div className="flex space-x-3">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={disabled ? "Connecting..." : "Type your message... (Enter to send, Shift+Enter for new line)"}
          disabled={disabled}
          className="flex-1 border border-gray-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          rows={1}
          style={{ minHeight: '40px', maxHeight: '120px' }}
        />
        <button
          onClick={handleSend}
          disabled={disabled || !message.trim()}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </div>
    </div>
  );
};
```

```typescript
// src/components/MessageList.tsx
import React, { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { DisplayMessage } from '../types/message';

interface MessageListProps {
  messages: DisplayMessage[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-500">
          <div className="text-center">
            <div className="text-lg mb-2">👋 Welcome to MeetingMuse!</div>
            <div>Start a conversation to schedule your meetings</div>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </>
      )}
    </div>
  );
};
```

#### Step 6: Create Main Chat App (20 minutes)
```typescript
// src/components/ChatApp.tsx
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
    // Initialize WebSocket service
    wsService.current = new WebSocketService();

    // Setup connection status listener
    wsService.current.onStatusChange((status) => {
      setConnected(status);
      setConnecting(false);
    });

    // Setup message listener
    wsService.current.onMessage((data) => {
      console.log('Received data:', data);
      
      // Convert backend message to display message
      const displayMessage: DisplayMessage = {
        id: `msg-${Date.now()}-${Math.random()}`,
        type: data.type === 'error' ? 'error' : 
              data.type === 'system' ? 'system' : 'ai',
        content: data.content || data.message || 'Unknown message',
        timestamp: data.timestamp || new Date().toISOString(),
      };

      setMessages(prev => [...prev, displayMessage]);
    });

    // Connect to WebSocket
    wsService.current.connect()
      .catch((error) => {
        console.error('Connection failed:', error);
        setConnecting(false);
        setConnected(false);
      });

    // Cleanup on unmount
    return () => {
      wsService.current?.disconnect();
    };
  }, []);

  const handleSend = (content: string) => {
    if (!wsService.current || !connected) return;

    // Add user message to display immediately
    const userMessage: DisplayMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date().toISOString(),
      status: 'sending'
    };

    setMessages(prev => [...prev, userMessage]);

    // Send to WebSocket
    wsService.current.sendMessage(content);

    // Update status to sent after a brief delay
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
      {/* Header */}
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

      {/* Messages */}
      <MessageList messages={messages} />

      {/* Input */}
      <MessageInput 
        onSend={handleSend} 
        disabled={!connected} 
      />
    </div>
  );
};
```

#### Step 7: Update Main App (5 minutes)
```typescript
// src/App.tsx
import React from 'react';
import { ChatApp } from './components/ChatApp';
import './index.css';

function App() {
  return <ChatApp />;
}

export default App;
```

#### Step 8: Test with Your Server (10 minutes)

1. **Start your MeetingMuse server**:
```bash
# In your meetingmuse project directory
poetry run python src/meetingmuse_server/main.py
```

2. **Start the frontend**:
```bash
# In your meetingmuse-frontend directory
npm run dev
```

3. **Open browser** to `http://localhost:5173`

4. **Test the connection**:
   - You should see "Connected" status
   - Try sending: "Hello, I want to schedule a meeting"
   - You should get an AI response back

#### Troubleshooting Common Issues

**Connection Failed**:
- Ensure your backend server is running on `localhost:8000`
- Check browser console for WebSocket errors
- Verify the WebSocket endpoint is accessible

**Messages Not Displaying**:
- Check browser console for JSON parsing errors
- Verify message format matches your backend protocol
- Ensure message callbacks are properly set up

**CORS Issues**:
- WebSocket connections typically don't have CORS issues
- If you encounter problems, check your backend CORS configuration

### MVP Testing Checklist

- [ ] ✅ Frontend connects to WebSocket server
- [ ] ✅ Can send messages in correct JSON format
- [ ] ✅ Receives and displays AI responses
- [ ] ✅ Shows connection status
- [ ] ✅ Handles basic errors gracefully
- [ ] ✅ Messages display with proper styling
- [ ] ✅ Input field works with Enter key
- [ ] ✅ Auto-scrolls to newest messages

### Next Steps After MVP

Once your MVP is working:

1. **Test with different conversation flows**:
   - Meeting scheduling requests
   - Follow-up questions
   - Error scenarios

2. **Add system message handling**:
   - Processing indicators
   - Interrupt notifications
   - Error messages with retry options

3. **Enhance the UI**:
   - Better styling and animations
   - Loading states
   - Message timestamps

4. **Add persistence**:
   - Save conversations to localStorage
   - Restore on page reload

This MVP gives you a solid foundation to build upon while ensuring you can immediately test with your actual WebSocket server and AI backend.

## Success Metrics and KPIs

### Technical Metrics
- **Performance**: Page load time < 2s, message response time < 200ms
- **Reliability**: 99.9% uptime, error rate < 0.1%
- **Compatibility**: Support for Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Accessibility**: WCAG 2.1 AA compliance score > 95%

### User Experience Metrics
- **Engagement**: Average session duration > 3 minutes
- **Completion**: Task completion rate > 85%
- **Satisfaction**: User satisfaction score > 4.5/5
- **Retention**: Weekly active users growth > 15%

### Business Metrics
- **Adoption**: Monthly active users growth > 20%
- **Efficiency**: Meeting scheduling success rate > 90%
- **Support**: Support ticket reduction by 30%
- **Conversion**: User onboarding completion rate > 80%

## Risk Assessment and Mitigation

### Technical Risks

#### High Priority
1. **WebSocket Connection Stability**
   - **Risk**: Frequent disconnections affecting user experience
   - **Mitigation**: Robust reconnection logic, connection health monitoring, fallback mechanisms
   - **Timeline**: Week 2

2. **Performance with Large Message History**
   - **Risk**: App becomes slow with long conversation histories
   - **Mitigation**: Message virtualization, lazy loading, memory management
   - **Timeline**: Week 5

3. **Cross-browser Compatibility**
   - **Risk**: Inconsistent behavior across different browsers
   - **Mitigation**: Comprehensive browser testing, polyfills, feature detection
   - **Timeline**: Week 7

#### Medium Priority
1. **State Management Complexity**
   - **Risk**: Complex state updates leading to bugs
   - **Mitigation**: Immutable updates, state validation, comprehensive testing
   - **Timeline**: Week 3

2. **Security Vulnerabilities**
   - **Risk**: XSS attacks through message content
   - **Mitigation**: Input sanitization, CSP headers, security audit
   - **Timeline**: Week 7

### Business Risks

#### High Priority
1. **User Adoption**
   - **Risk**: Low user engagement with new interface
   - **Mitigation**: User testing, iterative design, feedback collection
   - **Timeline**: Week 6

2. **Integration Issues**
   - **Risk**: Problems integrating with existing backend
   - **Mitigation**: Early integration testing, API contract validation
   - **Timeline**: Week 2

## Future Enhancements

### Phase 2 Features (3-6 months)
1. **Calendar Integration**
   - Google Calendar, Outlook integration
   - Real-time availability checking
   - Meeting conflict detection

2. **Advanced AI Features**
   - Voice message support
   - Meeting transcript display
   - Smart scheduling suggestions

3. **Collaboration Features**
   - Multi-user conversation support
   - Meeting invitation management
   - Team calendar integration

### Phase 3 Features (6-12 months)
1. **Mobile Application**
   - React Native implementation
   - Push notifications
   - Offline synchronization

2. **Enterprise Features**
   - SSO integration
   - Admin dashboard
   - Usage analytics

3. **AI Enhancements**
   - Meeting preparation assistance
   - Follow-up task generation
   - Smart rescheduling

## Conclusion

This comprehensive PRD provides a detailed roadmap for building a modern, responsive, and feature-rich frontend chat application for MeetingMuse. The proposed solution leverages React + Vite, TypeScript, and Tailwind CSS to create a professional-grade user interface that seamlessly integrates with the existing WebSocket backend.

Key highlights of the proposed solution:

1. **Robust Architecture**: Modular component design with clear separation of concerns
2. **Real-time Communication**: Efficient WebSocket integration with reconnection handling
3. **User Experience**: Modern, responsive design with accessibility compliance
4. **Performance**: Optimized for large message histories and concurrent users
5. **Quality Assurance**: Comprehensive testing strategy and code quality tools
6. **Future-Ready**: Extensible architecture supporting future enhancements

The 8-week implementation timeline provides a structured approach to delivery, with clear milestones and risk mitigation strategies. The success metrics and KPIs ensure measurable outcomes and continuous improvement.

This frontend application will transform the MeetingMuse experience, providing users with an intuitive and powerful interface for AI-assisted meeting scheduling while maintaining the robust backend capabilities already established.