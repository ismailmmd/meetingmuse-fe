# MeetingMuse Desktop App

## 🚀 Quick Start

### Development

```bash
# Terminal 1: Start the web dev server
npm run dev

# Terminal 2: Start Electron
npm run electron:dev
```

### Building

```bash
# Build for macOS (creates .dmg)
npm run electron:build:mac

# Build for Windows
npm run electron:build:win

# Build for Linux
npm run electron:build:linux
```

## 📦 What Gets Built

- **macOS**: `dist-electron/MeetingMuse.dmg` and `MeetingMuse.app.zip`
- **Windows**: `dist-electron/MeetingMuse Setup.exe`
- **Linux**: `dist-electron/MeetingMuse.AppImage`

## ⌨️ Features

### Global Hotkey
- Default: `Cmd+Shift+M` (macOS) / `Ctrl+Shift+M` (Windows/Linux)
- Configurable in Settings
- Works even when app is in background

### System Tray
- Lives in menu bar (macOS) or system tray (Windows/Linux)
- Right-click for menu options:
  - Open App
  - Settings
  - View current hotkey
  - Quit

### Settings Window
- Configure custom hotkey
- Press keys to record combination
- Examples provided

## 🔧 How It Works

1. **Background Process**: App runs in system tray, doesn't quit when window closes
2. **Hotkey Listener**: Global shortcut registered via Electron's `globalShortcut` API
3. **Server Call**: When hotkey pressed, sends POST to `/api/hotkey-trigger`
4. **Response Handling**: Can show notification or trigger UI update

## 📝 Customization

### Change Server URL
Edit `electron/main.js`:
```javascript
const SERVER_URL = 'https://your-server.com';
```

### Add Custom Icon
1. Create/find a 512x512 PNG icon
2. Save as `electron/icon.png`
3. Rebuild: `npm run electron:build:mac`

### Modify Hotkey Behavior
Edit the `globalShortcut.register()` callback in `electron/main.js`

## 🐛 Troubleshooting

### "Failed to register hotkey"
- Hotkey might be in use by another app
- Try a different combination in Settings

### Icon not showing
- Add a proper `electron/icon.png` file (16x16 for tray, 512x512 for app)

### App won't quit
- Use tray menu → Quit (don't just close window)
- App is designed to run in background

## 📚 API Integration

The app expects your backend to have an endpoint:

```javascript
POST /api/hotkey-trigger
Content-Type: application/json

{
  "timestamp": "2024-01-01T12:00:00.000Z",
  "user": {...}
}
```

Customize this in `electron/main.js` around line 115.

## 🎨 Next Steps

1. Add proper app icon
2. Customize server endpoint
3. Build and test: `npm run electron:build:mac`
4. Distribute the .dmg file!

## 📄 License

Same as parent project
