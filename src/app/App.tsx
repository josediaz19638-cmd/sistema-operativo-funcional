import { useState } from 'react';
import { Terminal as TerminalIcon, FileText, Globe, Folder, PlayCircle, Music, Settings as SettingsIcon, Trash2 } from 'lucide-react';
import { Desktop } from './components/Desktop';
import { Taskbar } from './components/Taskbar';
import { Window } from './components/Window';
import { Terminal } from './components/Terminal';
import { Notepad } from './components/Notepad';
import { Browser } from './components/Browser';
import { FileExplorer } from './components/FileExplorer';
import { TopBar } from './components/TopBar';
import { Settings } from './components/Settings';
import { MediaPlayer } from './components/MediaPlayer';
import { MusicPlayer } from './components/MusicPlayer';
import { RecycleBin } from './components/RecycleBin';


interface WindowState {
  id: string;
  app: string;
  isMinimized: boolean;
  zIndex: number;
}

export default function App() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>('/1.1.jpg');
  const [glassmorphismEnabled, setGlassmorphismEnabled] = useState(true);
    function ImageIcon({ src, alt, className, fallback }: { src: string; alt: string; className?: string; fallback?: React.ReactNode }) {
      const [ok, setOk] = useState(true);
      if (!ok) return <>{fallback ?? null}</>;
      return (
        <div className="inline-flex items-center justify-center w-full h-full p-1 rounded-lg bg-gradient-to-br from-[#0f0519]/40 to-[#20102a]/30 shadow-[0_8px_20px_rgba(0,0,0,0.45)]">
          <img
            src={src}
            alt={alt}
            className={`${className ?? ''} max-w-full max-h-full object-contain`} 
            onError={() => setOk(false)}
          />
        </div>
      );
    }

  const openApp = (appName: string) => {
    const existingWindow = windows.find(w => w.app === appName);

    if (existingWindow) {
      if (existingWindow.isMinimized) {
        setWindows(windows.map(w =>
          w.app === appName ? { ...w, isMinimized: false } : w
        ));
      }
      focusWindow(appName);
    } else {
      const newWindow: WindowState = {
        id: `${appName}-${Date.now()}`,
        app: appName,
        isMinimized: false,
        zIndex: nextZIndex
      };
      setWindows([...windows, newWindow]);
      setNextZIndex(nextZIndex + 1);
      setActiveWindow(appName);
    }
  };

  const closeWindow = (id: string) => {
    setWindows(windows.filter(w => w.id !== id));
    if (activeWindow === windows.find(w => w.id === id)?.app) {
      setActiveWindow(null);
    }
  };

  const minimizeWindow = (id: string) => {
    setWindows(windows.map(w =>
      w.id === id ? { ...w, isMinimized: true } : w
    ));
  };

  const focusWindow = (appName: string) => {
    const window = windows.find(w => w.app === appName);
    if (window) {
      if (window.isMinimized) {
        setWindows(windows.map(w =>
          w.app === appName ? { ...w, isMinimized: false } : w
        ));
      }
      setWindows(windows.map(w =>
        w.app === appName ? { ...w, zIndex: nextZIndex } : w
      ));
      setNextZIndex(nextZIndex + 1);
      setActiveWindow(appName);
    }
  };

  const getAppIcon = (appName: string) => {
    switch (appName) {
      case 'Terminal':
        return (
          <ImageIcon
            src="/icons/terminal.png"
            alt="Terminal"
            className="w-4 h-4"
            fallback={<TerminalIcon className="w-4 h-4 text-purple-300" />}
          />
        );
      case 'Notepad':
        return (
          <ImageIcon
            src="/icons/notepad.png"
            alt="Notepad"
            className="w-4 h-4"
            fallback={<FileText className="w-4 h-4 text-pink-300" />}
          />
        );
      case 'Browser':
        return (
          <ImageIcon
            src="/icons/browser.png"
            alt="Browser"
            className="w-4 h-4"
            fallback={<Globe className="w-4 h-4 text-blue-300" />}
          />
        );
      case 'File Explorer':
        return (
          <ImageIcon
            src="/icons/file-explorer.png"
            alt="File Explorer"
            className="w-4 h-4"
            fallback={<Folder className="w-4 h-4 text-indigo-300" />}
          />
        );
      case 'Media Player':
        return (
          <ImageIcon
            src="/icons/media-player.png"
            alt="Media Player"
            className="w-4 h-4"
            fallback={<PlayCircle className="w-4 h-4 text-purple-300" />}
          />
        );
      case 'Music Player':
        return (
          <ImageIcon
            src="/icons/music.png"
            alt="Music Player"
            className="w-4 h-4"
            fallback={<Music className="w-4 h-4 text-pink-300" />}
          />
        );
      case 'Settings':
        return (
          <ImageIcon
            src="/icons/settings.png"
            alt="Settings"
            className="w-4 h-4"
            fallback={<SettingsIcon className="w-4 h-4 text-slate-300" />}
          />
        );
      case 'Recycle Bin':
        return (
          <ImageIcon
            src="/icons/recycle-bin.png"
            alt="Recycle Bin"
            className="w-4 h-4"
            fallback={<Trash2 className="w-4 h-4 text-indigo-300" />}
          />
        );
      default: return null;
    }
  };

  const getAppContent = (appName: string) => {
    switch (appName) {
      case 'Terminal': return <Terminal />;
      case 'Notepad': return <Notepad />;
      case 'Browser': return <Browser />;
      case 'File Explorer': return <FileExplorer />;
      case 'Media Player': return <MediaPlayer />;
      case 'Music Player': return <MusicPlayer />;
      case 'Settings': return <Settings
        selectedWallpaper={selectedWallpaper}
        glassmorphismEnabled={glassmorphismEnabled}
        onWallpaperChange={setSelectedWallpaper}
        onGlassmorphismChange={setGlassmorphismEnabled}
      />;
      case 'Recycle Bin': return <RecycleBin />;
      default: return null;
    }
  };

  const getInitialPosition = (index: number) => {
    const offset = index * 30;
    return { x: 140 + offset, y: 80 + offset };
  };

  const visibleWindows = windows.filter(w => !w.isMinimized);
  const openWindowNames = windows.map(w => w.app);

  return (
    <div className="size-full relative overflow-hidden bg-[#060012]">
      {/* Top Floating Glass Navigation Bar */}
      <div className="absolute top-0 left-0 right-0 z-40">
        <TopBar onMenuClick={() => window.dispatchEvent(new CustomEvent('toggle-start-menu'))} />
      </div>

      {/* Desktop (renders CSS wallpaper & desktop shortcuts) */}
      <Desktop onOpenApp={openApp} wallpaper={selectedWallpaper} />

      {/* Windows Layer */}
      {visibleWindows.map((window, index) => (
        <Window
          key={window.id}
          title={window.app}
          icon={getAppIcon(window.app)}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          initialPosition={getInitialPosition(index)}
          zIndex={window.zIndex}
          onFocus={() => focusWindow(window.app)}
          isActive={activeWindow === window.app}
        >
          {getAppContent(window.app)}
        </Window>
      ))}

      {/* Bottom Floating Glass Dock */}
      <div className="absolute bottom-0 left-0 right-0 z-50">
        <Taskbar
          openWindows={openWindowNames}
          onOpenApp={openApp}
          activeWindow={activeWindow}
          onFocusWindow={focusWindow}
        />
      </div>
    </div>
  );
}