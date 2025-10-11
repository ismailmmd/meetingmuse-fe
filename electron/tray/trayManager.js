import { Tray, Menu, nativeImage, app } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import Store from 'electron-store';
import { DEFAULT_HOTKEY } from '../config.js';
import { showMainWindow, createMainWindow, getMainWindow } from '../windows/mainWindow.js';
import { createSettingsWindow } from '../windows/settingsWindow.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const store = new Store();
let tray = null;

export function createTray() {
  const icon = nativeImage
    .createFromPath(path.join(__dirname, '../icon.png'))
    .resize({ width: 16, height: 16 });

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
        const mainWindow = getMainWindow();
        if (mainWindow) {
          showMainWindow();
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

  return tray;
}

export function getTray() {
  return tray;
}

export function updateTrayMenu() {
  if (tray) {
    createTray();
  }
}
