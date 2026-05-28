// =========================================================================
// Configuración centralizada de aplicaciones del sistema SerOS
// Elimina duplicación entre Start Menu, Dock y App.tsx
// =========================================================================

export interface AppConfig {
  name: string;
  id: string;
  iconPath: string;
  fallbackIcon: string; // Nombre del icono Lucide o 'custom' para SVG
  category: 'system' | 'app' | 'utility';
  showInDock: boolean;
  showInStartMenu: boolean;
}

export const APP_LIST: AppConfig[] = [
  { name: 'Browser', id: 'Browser', iconPath: '/icons/browser.png', fallbackIcon: 'Globe', category: 'app', showInDock: true, showInStartMenu: true },
  { name: 'Notepad', id: 'Notepad', iconPath: '/icons/notepad.png', fallbackIcon: 'FileText', category: 'app', showInDock: false, showInStartMenu: true },
  { name: 'Terminal', id: 'Terminal', iconPath: '/icons/terminal.png', fallbackIcon: 'Terminal', category: 'app', showInDock: true, showInStartMenu: true },
  { name: 'File Explorer', id: 'FileExplorer', iconPath: '/icons/file-explorer.png', fallbackIcon: 'Folder', category: 'app', showInDock: true, showInStartMenu: true },
  { name: 'Media Player', id: 'MediaPlayer', iconPath: '/icons/media-player.png', fallbackIcon: 'PlayCircle', category: 'app', showInDock: true, showInStartMenu: true },
  { name: 'Music Player', id: 'MusicPlayer', iconPath: '/icons/music.png', fallbackIcon: 'Music', category: 'app', showInDock: true, showInStartMenu: true },
  { name: 'Settings', id: 'Settings', iconPath: '/icons/settings.png', fallbackIcon: 'Settings', category: 'system', showInDock: true, showInStartMenu: true },
  { name: 'Recycle Bin', id: 'RecycleBin', iconPath: '/icons/recycle-bin.png', fallbackIcon: 'Trash2', category: 'utility', showInDock: false, showInStartMenu: true },
];

export const DOCK_APPS = APP_LIST.filter(app => app.showInDock);
export const START_MENU_APPS = APP_LIST.filter(app => app.showInStartMenu);

/** Obtiene la configuración de una app por su nombre */
export function getAppConfig(name: string): AppConfig | undefined {
  return APP_LIST.find(app => app.name === name);
}