import { BrowserWindow, app } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { IS_DEV, DEV_SERVER_URL } from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;

export function createMainWindow(route = '/') {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, '../preload.cjs')
    },
    show: false
  });

  // Load the app
  if (IS_DEV) {
    mainWindow.loadURL(`${DEV_SERVER_URL}${route}`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../../dist/index.html'));
    // For production, navigate after load
    if (route !== '/') {
      mainWindow.webContents.once('did-finish-load', () => {
        mainWindow.webContents.executeJavaScript(`window.location.hash = '${route}'`);
      });
    }
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

  return mainWindow;
}

export function getMainWindow() {
  return mainWindow;
}

export function showMainWindow(route = '/') {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  } else {
    createMainWindow(route);
  }
}

export function sendToMainWindow(channel, data) {
  if (mainWindow) {
    mainWindow.webContents.send(channel, data);
  }
}
