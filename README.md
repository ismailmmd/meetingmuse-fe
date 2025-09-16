# MeetingMuse Frontend

A modern, responsive web-based chat application for MeetingMuse, an AI-powered meeting scheduling assistant. Built with React + Vite, TypeScript, and Tailwind CSS.

Webserver - https://github.com/thisisarjun/meetingmuse

Visit the app at https://meetingmuse.vercel.app/

## Features

- **Real-time Chat Interface**: WebSocket-based communication with the MeetingMuse AI assistant
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with message bubbles and status indicators
- **TypeScript**: Full type safety for better development experience
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development

## Prerequisites

- Node.js 18+ installed
- MeetingMuse WebSocket server running on `localhost:8000`

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 3. Start MeetingMuse Backend Server

Make sure your MeetingMuse WebSocket server is running:

```bash
# In your meetingmuse project directory
poetry run python -m src.server.main
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatApp.tsx     # Main chat application
│   ├── MessageList.tsx # Message display container
│   ├── MessageBubble.tsx # Individual message bubbles
│   └── MessageInput.tsx # Message input field
├── services/           # Service layer
│   └── WebSocketService.ts # WebSocket connection management
├── types/              # TypeScript type definitions
│   └── message.ts      # Message-related types
├── App.tsx            # Root application component
├── main.tsx           # Application entry point
└── index.css          # Global styles (Tailwind CSS)
```

## WebSocket Integration

The frontend connects to your MeetingMuse backend via WebSocket at `ws://localhost:8000/ws/{client_id}`.

### Message Format

**Sending to Backend:**
```json
{
  "type": "user_message",
  "content": "I want to schedule a meeting",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "session_id": "client-12345"
}
```

**Receiving from Backend:**
```json
{
  "content": "I'd be happy to help you schedule a meeting...",
  "timestamp": "2024-01-01T12:00:01.000Z",
  "session_id": "client-12345"
}
```

## Testing the Connection

1. Start the MeetingMuse backend server
2. Start the frontend development server
3. Open your browser to `http://localhost:3000`
4. Look for "Connected" status in the top-right corner
5. Send a test message: "Hello, I want to schedule a meeting"

## Development

### Code Quality

This project uses:
- **ESLint** for code linting
- **Prettier** for code formatting
- **TypeScript** for type checking

### Adding New Features

1. Create new components in `src/components/`
2. Add service logic in `src/services/`
3. Define types in `src/types/`
4. Follow existing patterns and conventions

## Troubleshooting

### Connection Issues

- Ensure MeetingMuse backend is running on `localhost:8000`
- Check browser console for WebSocket errors
- Verify firewall settings aren't blocking connections

### Build Issues

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility (18+)
- Run `npm run lint` to check for code issues

## Next Steps

This MVP provides:
- ✅ Working WebSocket connection
- ✅ Real-time message exchange
- ✅ Professional UI design
- ✅ Mobile-responsive layout
- ✅ TypeScript type safety

Future enhancements (as per PRD):
- Message persistence
- System message handling
- Meeting details panel
- Enhanced error handling
- Offline support
