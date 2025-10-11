import { globalShortcut, clipboard, Notification } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';
import { DEFAULT_HOTKEY, SERVER_URL } from '../config.js';
import { createMainWindow, getMainWindow, showMainWindow } from '../windows/mainWindow.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new Store();

async function handleHotkeyPress() {
  const hotkey = store.get('hotkey', DEFAULT_HOTKEY);
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
      icon: path.join(__dirname, '../icon.png')
    });
    notification.show();

    // Still open the window so user can type manually
    showMainWindow();
    return;
  }

  try {
    // Call backend server
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

    // Show or create window
    const mainWindow = getMainWindow();
    const windowWasCreated = !mainWindow;

    if (!mainWindow) {
      const newWindow = createMainWindow();
      // Wait for window to load before sending data
      newWindow.webContents.once('did-finish-load', () => {
        console.log('Window loaded, sending data:', { selectedText });
        newWindow.webContents.send('hotkey-triggered', {
          ...data,
          selectedText: selectedText
        });
      });
    } else {
      showMainWindow();
      console.log('Window already exists, sending data immediately:', { selectedText });
      mainWindow.webContents.send('hotkey-triggered', {
        ...data,
        selectedText: selectedText
      });
    }
  } catch (error) {
    console.error('Error calling server:', error);

    // Even if server call fails, still show window with selected text
    const mainWindow = getMainWindow();
    const windowWasCreated = !mainWindow;

    if (!mainWindow) {
      const newWindow = createMainWindow();
      newWindow.webContents.once('did-finish-load', () => {
        console.log('Window loaded (error path), sending data:', { selectedText });
        newWindow.webContents.send('hotkey-triggered', {
          selectedText: selectedText
        });
      });
    } else {
      showMainWindow();
      console.log('Window already exists (error path), sending data immediately:', { selectedText });
      mainWindow.webContents.send('hotkey-triggered', {
        selectedText: selectedText
      });
    }
  }
}

export function registerHotkey() {
  // Unregister all previous shortcuts
  globalShortcut.unregisterAll();

  const hotkey = store.get('hotkey', DEFAULT_HOTKEY);

  const success = globalShortcut.register(hotkey, handleHotkeyPress);

  if (!success) {
    console.error('Failed to register hotkey:', hotkey);
  }

  console.log(`Hotkey registered: ${hotkey}`);
}

export function unregisterAllHotkeys() {
  globalShortcut.unregisterAll();
}
