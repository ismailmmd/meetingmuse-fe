import { globalShortcut, clipboard, Notification } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';
import { DEFAULT_HOTKEY } from '../config.js';
import { createMainWindow, getMainWindow, showMainWindow } from '../windows/mainWindow.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new Store();

function handleHotkeyPress() {
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

  // Show or create window and send clipboard text directly
  const mainWindow = getMainWindow();

  if (!mainWindow) {
    const newWindow = createMainWindow();
    // Wait for window to load before sending data
    newWindow.webContents.once('did-finish-load', () => {
      console.log('Window loaded, sending clipboard text:', { selectedText });
      newWindow.webContents.send('hotkey-triggered', {
        selectedText: selectedText
      });
    });
  } else {
    showMainWindow();
    console.log('Window already exists, sending clipboard text immediately:', { selectedText });
    mainWindow.webContents.send('hotkey-triggered', {
      selectedText: selectedText
    });
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
