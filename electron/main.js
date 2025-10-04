import { app, BrowserWindow, Tray, Menu, globalShortcut, ipcMain, nativeImage, clipboard, Notification } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new Store();
let tray = null;
let mainWindow = null;
let settingsWindow = null;

// Default settings
const DEFAULT_HOTKEY = 'CommandOrControl+Shift+M';
const SERVER_URL = process.env.VITE_API_URL || 'http://localhost:8000';

function createTray() {
  // Create a simple tray icon (you can replace with custom icon later)
  const icon = nativeImage.createFromPath(path.join(__dirname, 'icon.png')).resize({ width: 16, height: 16 });
  tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'MeetingMuse',
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Open App',
      click: () => {
        if (mainWindow) {
          mainWindow.show();
        } else {
          createMainWindow();
        }
      }
    },
    {
      label: 'Settings',
      click: () => createSettingsWindow()
    },
    { type: 'separator' },
    {
      label: `Hotkey: ${store.get('hotkey', DEFAULT_HOTKEY)}`,
      enabled: false
    },
    { type: 'separator' },
    {
      label: 'Quit',
      click: () => {
        app.isQuitting = true;
        app.quit();
      }
    }
  ]);

  tray.setToolTip('MeetingMuse - Press hotkey to activate');
  tray.setContextMenu(contextMenu);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    },
    show: false
  });

  // Load the app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.on('close', (event) => {
    if (!app.isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
}

function createSettingsWindow() {
  if (settingsWindow) {
    settingsWindow.focus();
    return;
  }

  settingsWindow = new BrowserWindow({
    width: 500,
    height: 400,
    resizable: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.cjs')
    }
  });

  settingsWindow.loadFile(path.join(__dirname, 'settings.html'));

  settingsWindow.on('closed', () => {
    settingsWindow = null;
  });
}

function registerHotkey() {
  // Unregister all previous shortcuts
  globalShortcut.unregisterAll();

  const hotkey = store.get('hotkey', DEFAULT_HOTKEY);

  const success = globalShortcut.register(hotkey, async () => {
    console.log(`Hotkey ${hotkey} pressed!`);

    // Read selected text from clipboard
    const selectedText = clipboard.readText();
    console.log('Selected text from clipboard:', selectedText);

    // If no text in clipboard, show notification
    if (!selectedText || selectedText.trim() === '') {
      console.log('No text in clipboard, showing notification');
      const notification = new Notification({
        title: 'MeetingMuse',
        body: 'Please select and copy text (⌘C) before using the hotkey',
        icon: path.join(__dirname, 'icon.png')
      });
      notification.show();

      // Still open the window so user can type manually
      if (!mainWindow) {
        createMainWindow();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }
      return;
    }

    try {
      // Call your backend server
      const response = await fetch(`${SERVER_URL}/api/hotkey-trigger`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          user: store.get('user'),
          selectedText: selectedText
        })
      });

      const data = await response.json();
      console.log('Server response:', data);

      // Show the main window if it exists, otherwise create it
      const windowWasCreated = !mainWindow;
      if (!mainWindow) {
        createMainWindow();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }

      // Send both server data and selected text to the renderer
      if (mainWindow) {
        // If window was just created, wait for it to be ready
        if (windowWasCreated) {
          mainWindow.webContents.once('did-finish-load', () => {
            console.log('Window loaded, sending data:', { selectedText });
            mainWindow.webContents.send('hotkey-triggered', {
              ...data,
              selectedText: selectedText
            });
          });
        } else {
          console.log('Window already exists, sending data immediately:', { selectedText });
          mainWindow.webContents.send('hotkey-triggered', {
            ...data,
            selectedText: selectedText
          });
        }
      }
    } catch (error) {
      console.error('Error calling server:', error);

      // Even if server call fails, still show window with selected text
      const windowWasCreated = !mainWindow;
      if (!mainWindow) {
        createMainWindow();
      } else {
        mainWindow.show();
        mainWindow.focus();
      }

      if (mainWindow) {
        // If window was just created, wait for it to be ready
        if (windowWasCreated) {
          mainWindow.webContents.once('did-finish-load', () => {
            console.log('Window loaded (error path), sending data:', { selectedText });
            mainWindow.webContents.send('hotkey-triggered', {
              selectedText: selectedText
            });
          });
        } else {
          console.log('Window already exists (error path), sending data immediately:', { selectedText });
          mainWindow.webContents.send('hotkey-triggered', {
            selectedText: selectedText
          });
        }
      }
    }
  });

  if (!success) {
    console.error('Failed to register hotkey:', hotkey);
  }

  console.log(`Hotkey registered: ${hotkey}`);
}

// IPC handlers for settings
ipcMain.handle('get-settings', () => {
  return {
    hotkey: store.get('hotkey', DEFAULT_HOTKEY),
    serverUrl: SERVER_URL
  };
});

ipcMain.handle('set-hotkey', (event, newHotkey) => {
  try {
    store.set('hotkey', newHotkey);
    registerHotkey();

    // Update tray menu
    createTray();

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

app.whenReady().then(() => {
  createTray();
  registerHotkey();

  // Don't create window immediately, wait for user action
  // createMainWindow();

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
    // app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

console.log('MeetingMuse desktop app started');
