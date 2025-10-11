import { app, BrowserWindow } from 'electron';
import { createTray } from './tray/trayManager.js';
import { registerHotkey, unregisterAllHotkeys } from './hotkey/hotkeyManager.js';
import { createMainWindow } from './windows/mainWindow.js';
import { setupIPCHandlers } from './ipc/handlers.js';
import { isUserAuthenticated } from './utils/authChecker.js';

console.log('MeetingMuse desktop app started');

// Setup IPC handlers
setupIPCHandlers();

// App lifecycle events
app.whenReady().then(async () => {
  createTray();
  registerHotkey();

  // Check if user is authenticated
  const authenticated = await isUserAuthenticated();
  console.log('User authenticated:', authenticated);

  // Show window on launch if user is not authenticated
  if (!authenticated) {
    console.log('User not authenticated, showing login window');
    createMainWindow('/login');
  } else {
    console.log('User authenticated, staying in tray');
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // Don't quit on macOS when all windows are closed
  // App stays in tray
  if (process.platform !== 'darwin') {
    // Uncomment to quit when all windows closed:
    // app.quit();
  }
});

app.on('will-quit', () => {
  unregisterAllHotkeys();
});
