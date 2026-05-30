import { useState, useEffect } from 'react';
import { Power, Settings as SettingsIcon, User, Search, LogOut } from 'lucide-react';
import { AppIcon } from './shared/AppIcon';
import { DOCK_APPS, START_MENU_APPS } from '../data/appConfig';
import { fallbackSvgMap } from './shared/Icons';

interface TaskbarProps {
  openWindows: string[];
  onOpenApp: (appName: string) => void;
  activeWindow: string | null;
  onFocusWindow: (appName: string) => void;
  onLogout: () => void;
  userDisplayName: string;
}

export function Taskbar({ openWindows, onOpenApp, activeWindow, onFocusWindow, onLogout, userDisplayName }: TaskbarProps) {
  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    const handleToggle = () => setShowStartMenu(prev => !prev);
    window.addEventListener('toggle-start-menu', handleToggle);
    return () => window.removeEventListener('toggle-start-menu', handleToggle);
  }, []);

  const getFallbackSvg = (appName: string) => {
    const SvgComponent = fallbackSvgMap[appName];
    return SvgComponent ? <SvgComponent /> : undefined;
  };

  const dockApps = [
    {
      name: 'Home',
      icon: <AppIcon src="/icons/home.svg" alt="Home" className="w-full h-full" compact customFallback={getFallbackSvg('Home')} />,
      app: undefined as string | undefined,
      isSystem: true,
      action: () => setShowStartMenu(prev => !prev),
    },
    ...DOCK_APPS.map(app => ({
      name: app.name,
      icon: <AppIcon src={app.iconPath} alt={app.name} className="w-full h-full" compact customFallback={getFallbackSvg(app.name)} />,
      app: app.name,
      isSystem: false,
      action: undefined as (() => void) | undefined,
    })),
  ];

  const startMenuApps = START_MENU_APPS.map(app => ({
    name: app.name,
    icon: <AppIcon src={app.iconPath} alt={app.name} className="w-full h-full" compact customFallback={getFallbackSvg(app.name)} />,
    app: app.name,
  }));

  const handleDockItemClick = (item: typeof dockApps[0]) => {
    if (item.isSystem && item.action) {
      item.action();
      return;
    }

    if (item.app) {
      const isAlreadyOpen = openWindows.includes(item.app);
      if (isAlreadyOpen) {
        onFocusWindow(item.app);
      } else {
        onOpenApp(item.app);
      }
      setShowStartMenu(false);
    }
  };

  const handleAppClick = (appName: string) => {
    const isAlreadyOpen = openWindows.includes(appName);
    if (isAlreadyOpen) {
      onFocusWindow(appName);
    } else {
      onOpenApp(appName);
    }
    setShowStartMenu(false);
  };

  const getAppState = (appName?: string) => {
    if (!appName) return { isOpen: false, isActive: false };
    return { isOpen: openWindows.includes(appName), isActive: activeWindow === appName };
  };

  return (
    <div className="relative flex flex-col items-center pb-5 select-none z-50 pointer-events-none">
      {showStartMenu && (
        <>
          <div className="fixed inset-0 pointer-events-auto z-40" onClick={() => setShowStartMenu(false)} />
          <div className="absolute bottom-20 w-96 glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(138,50,255,0.25)] pointer-events-auto z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
            <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shadow-inner">
                  <User className="w-6 h-6 text-purple-200" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm tracking-wide">{userDisplayName}</div>
                  <div className="text-[10px] text-purple-300 font-mono opacity-80">user@seros</div>
                </div>
              </div>
            </div>

            <div className="p-3 border-b border-white/5 bg-black/20">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
                <Search className="w-4 h-4 text-purple-300" />
                <input
                  type="text"
                  placeholder="Buscar archivos o apps..."
                  className="flex-1 bg-transparent outline-none text-xs text-white placeholder-purple-300/50"
                />
              </div>
            </div>

            <div className="p-4 bg-black/10">
              <div className="text-[10px] font-bold text-purple-300 tracking-widest uppercase mb-3 px-1">Aplicaciones</div>
              <div className="grid grid-cols-3 gap-3">
                {startMenuApps.map((app) => (
                  <button
                    key={app.name}
                    onClick={() => handleAppClick(app.app)}
                    className="flex flex-col items-center gap-1.5 p-2.5 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer group"
                  >
                    <div className="w-11 h-11 transition-transform group-hover:scale-105">{app.icon}</div>
                    <span className="text-[10px] text-center text-purple-100 group-hover:text-white font-medium truncate w-full">{app.name}</span>
                    {getAppState(app.app).isOpen && <div className="w-1.5 h-1 bg-purple-400 rounded-full" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 p-2 bg-black/30 flex justify-between px-4 flex-wrap gap-2">
              <button
                onClick={() => {
                  onOpenApp('Settings');
                  setShowStartMenu(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg text-xs text-purple-200 hover:text-white cursor-pointer transition-colors"
              >
                <SettingsIcon className="w-4 h-4" /> Configuracion
              </button>
              <button
                onClick={() => {
                  onLogout();
                  setShowStartMenu(false);
                }}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg text-xs text-purple-200 hover:text-white cursor-pointer transition-colors"
              >
                <LogOut className="w-4 h-4" /> Cerrar sesion
              </button>
              <button
                onClick={() => {
                  if (confirm('Desea apagar el sistema simulado?')) window.close();
                }}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-red-500/10 rounded-lg text-xs text-red-400 hover:text-red-300 cursor-pointer transition-colors"
              >
                <Power className="w-4 h-4" /> Apagar
              </button>
            </div>
          </div>
        </>
      )}

      <div className="relative group/dock pointer-events-auto">
        <div className="absolute top-[102%] left-0 right-0 flex items-end justify-center gap-2.5 px-6 py-2.5 rounded-[24px] border border-white/5 opacity-[0.14] pointer-events-none z-10 select-none blur-[2.5px] scale-y-[-1] origin-top">
          {dockApps.map((item, idx) => (
            <div key={`reflect-${idx}`} className="w-12 h-12 flex items-center justify-center">
              <div className="w-10 h-10 opacity-70">{item.icon}</div>
            </div>
          ))}
        </div>

        <div className="flex items-end gap-2.5 px-6 py-2.5 rounded-[24px] glass-dock border border-white/10 relative z-30 transition-all duration-300 shadow-[0_15px_40px_-10px_rgba(138,50,255,0.4)]">
          {dockApps.map((item, index) => {
            const { isOpen, isActive } = getAppState(item.app);
            return (
              <div key={index} className="flex flex-col items-center relative group/item">
                <span className="absolute bottom-full mb-3 px-2.5 py-1 text-[10px] font-semibold text-purple-100 bg-slate-950/80 border border-white/10 rounded-lg shadow-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </span>
                <button
                  onClick={() => handleDockItemClick(item)}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ease-out origin-bottom hover:scale-125 hover:-translate-y-2.5 hover:mx-2 active:scale-95 cursor-pointer relative ${
                    isActive ? 'drop-shadow-[0_0_12px_rgba(236,72,153,0.5)]' : 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]'
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center">{item.icon}</div>
                </button>
                <div className="h-1.5 flex items-center justify-center mt-0.5 absolute -bottom-1">
                  {isActive ? (
                    <div className="w-2 h-1 bg-pink-400 rounded-full shadow-[0_0_8px_rgba(236,72,153,1)] animate-pulse" />
                  ) : isOpen ? (
                    <div className="w-1.5 h-1 bg-purple-400 rounded-full shadow-[0_0_6px_rgba(168,85,247,0.8)]" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
