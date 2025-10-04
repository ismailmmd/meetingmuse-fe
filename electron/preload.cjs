const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getSettings: () => ipcRenderer.invoke('get-settings'),
  setHotkey: (hotkey) => ipcRenderer.invoke('set-hotkey', hotkey),
  onHotkeyTriggered: (callback) => ipcRenderer.on('hotkey-triggered', (event, data) => callback(data))
});
