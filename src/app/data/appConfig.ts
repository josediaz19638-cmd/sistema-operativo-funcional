// =========================================================================
// Configuración centralizada de aplicaciones, iconos y wallpapers de SerOS
// Usa rutas base para que puedas cambiar svg/png/jpg/webp sin tocar código.
// =========================================================================

export interface AppConfig {
  name: string;
  id: string;
  iconPath: string;
  fallbackIcon: string;
  category: 'system' | 'app' | 'utility';
  showInDock: boolean;
  showInStartMenu: boolean;
}

export const ASSET_PATHS = {
  icons: {
    browser: '/icons/browser',
    fileExplorer: '/icons/file-explorer',
    home: '/icons/home',
    mediaPlayer: '/icons/media-player',
    music: '/icons/music',
    notepad: '/icons/notepad',
    recycleBin: '/icons/recycle-bin',
    seros: '/icons/seros',
    settings: '/icons/settings',
    terminal: '/icons/terminal',
  },
  wallpapers: {
    aurora: 'aurora',
    dark: '',
    space: '/wallpapers/wallpaper-1',
    sea: '/wallpapers/wallpaper-2',
    abstract: '/wallpapers/wallpaper-3',
    custom: '/wallpapers/wallpaper-custom',
  },
} as const;

export const APP_LIST: AppConfig[] = [
  { name: 'Browser', id: 'Browser', iconPath: ASSET_PATHS.icons.browser, fallbackIcon: 'Globe', category: 'app', showInDock: true, showInStartMenu: true },
  { name: 'Notepad', id: 'Notepad', iconPath: ASSET_PATHS.icons.notepad, fallbackIcon: 'FileText', category: 'app', showInDock: false, showInStartMenu: true },
  { name: 'Terminal', id: 'Terminal', iconPath: ASSET_PATHS.icons.terminal, fallbackIcon: 'Terminal', category: 'app', showInDock: true, showInStartMenu: true },
  { name: 'File Explorer', id: 'FileExplorer', iconPath: ASSET_PATHS.icons.fileExplorer, fallbackIcon: 'Folder', category: 'app', showInDock: true, showInStartMenu: true },
  { name: 'Media Player', id: 'MediaPlayer', iconPath: ASSET_PATHS.icons.mediaPlayer, fallbackIcon: 'PlayCircle', category: 'app', showInDock: true, showInStartMenu: true },
  { name: 'Music Player', id: 'MusicPlayer', iconPath: ASSET_PATHS.icons.music, fallbackIcon: 'Music', category: 'app', showInDock: true, showInStartMenu: true },
  { name: 'Settings', id: 'Settings', iconPath: ASSET_PATHS.icons.settings, fallbackIcon: 'Settings', category: 'system', showInDock: true, showInStartMenu: true },
  { name: 'Recycle Bin', id: 'RecycleBin', iconPath: ASSET_PATHS.icons.recycleBin, fallbackIcon: 'Trash2', category: 'utility', showInDock: false, showInStartMenu: true },
];

export const DOCK_APPS = APP_LIST.filter(app => app.showInDock);
export const START_MENU_APPS = APP_LIST.filter(app => app.showInStartMenu);

export function getAppConfig(name: string): AppConfig | undefined {
  return APP_LIST.find(app => app.name === name);
}

export const DEFAULT_WALLPAPER = ASSET_PATHS.wallpapers.space;

export const WALLPAPER_OPTIONS = [
  { name: 'Neon Aurora', value: ASSET_PATHS.wallpapers.aurora, color: 'from-purple-900 to-pink-600', iconName: 'Sun' },
  { name: 'Oscuro Puro', value: ASSET_PATHS.wallpapers.dark, color: 'bg-[#03000b]', iconName: 'Moon' },
  { name: 'Espacio Profundo', value: ASSET_PATHS.wallpapers.space, color: 'from-blue-900 to-indigo-950', iconName: 'Monitor' },
  { name: 'Mar Nocturno', value: ASSET_PATHS.wallpapers.sea, color: 'from-teal-900 to-slate-950', iconName: 'Monitor' },
  { name: 'Abstracto', value: ASSET_PATHS.wallpapers.abstract, color: 'from-violet-900 to-fuchsia-950', iconName: 'Palette' },
  { name: 'Personalizado', value: ASSET_PATHS.wallpapers.custom, color: 'from-fuchsia-900 to-purple-950', iconName: 'Settings' },
] as const;
