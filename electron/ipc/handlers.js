import { ipcMain } from 'electron';
import Store from 'electron-store';
import { DEFAULT_HOTKEY, SERVER_URL } from '../config.js';
import { registerHotkey } from '../hotkey/hotkeyManager.js';
import { updateTrayMenu } from '../tray/trayManager.js';

const store = new Store();

export function setupIPCHandlers() {
  // Get settings handler
  ipcMain.handle('get-settings', () => {
    return {
      hotkey: store.get('hotkey', DEFAULT_HOTKEY),
      serverUrl: SERVER_URL
    };
  });

  // Set hotkey handler
  ipcMain.handle('set-hotkey', (event, newHotkey) => {
    try {
      store.set('hotkey', newHotkey);
      registerHotkey();

      // Update tray menu to show new hotkey
      updateTrayMenu();

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  });
}
