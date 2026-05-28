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

export const DEFAULT_WALLPAPER = '/wallpapers/wallpaper-1.jpg';

export const WALLPAPER_OPTIONS = [
  { name: 'Neon Aurora', value: 'aurora', color: 'from-purple-900 to-pink-600', iconName: 'Sun' },
  { name: 'Oscuro Puro', value: '', color: 'bg-[#03000b]', iconName: 'Moon' },
  { name: 'Espacio Profundo', value: '/wallpapers/wallpaper-1.jpg', color: 'from-blue-900 to-indigo-950', iconName: 'Monitor' },
  { name: 'Mar Nocturno', value: '/wallpapers/wallpaper-2.jpg', color: 'from-teal-900 to-slate-950', iconName: 'Monitor' },
  { name: 'Abstracto', value: '/wallpapers/wallpaper-3.png', color: 'from-violet-900 to-fuchsia-950', iconName: 'Palette' },
  { name: 'Personalizado', value: '/wallpapers/wallpaper-custom.png', color: 'from-fuchsia-900 to-purple-950', iconName: 'Settings' },
] as const;
