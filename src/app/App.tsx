import { useState } from 'react';
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
import { AppIcon } from './components/shared/AppIcon';
import { DEFAULT_WALLPAPER, getAppConfig } from './data/appConfig';
import { clearSession, loadSession, type UserSession } from './auth';
import { LoginScreen } from './components/LoginScreen';

interface WindowState {
  id: string;
  app: string;
  isMinimized: boolean;
  zIndex: number;
}

export default function App() {
  const [session, setSession] = useState<UserSession | null>(() => loadSession());
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(100);
  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [selectedWallpaper, setSelectedWallpaper] = useState<string>(DEFAULT_WALLPAPER);
  const [glassmorphismEnabled, setGlassmorphismEnabled] = useState(true);

  const handleLogin = (userSession: UserSession) => {
    setSession(userSession);
  };

  const handleLogout = () => {
    clearSession();
    setSession(null);
    setWindows([]);
    setNextZIndex(100);
    setActiveWindow(null);
  };

  if (!session) {
    return <LoginScreen onLogin={handleLogin} />;
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
    const config = getAppConfig(appName);
    if (!config) return null;
    return (
      <AppIcon
        src={config.iconPath}
        alt={appName}
        className="w-4 h-4"
        fallbackIconName={config.fallbackIcon}
      />
    );
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
          onLogout={handleLogout}
          userDisplayName={session.displayName}
        />
      </div>
    </div>
  );
}
