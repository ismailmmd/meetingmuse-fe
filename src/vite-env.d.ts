/// <reference types="vite/client" />

declare const __VITE_API_URL__: string;
declare const __VITE_WS_URL__: string;

interface Window {
  electronAPI?: {
    getSettings: () => Promise<{ hotkey: string; serverUrl: string }>;
    setHotkey: (hotkey: string) => Promise<{ success: boolean; error?: string }>;
    onHotkeyTriggered: (callback: (data: { selectedText?: string; [key: string]: any }) => void) => void;
  };
}
