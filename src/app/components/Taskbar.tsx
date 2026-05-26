import { useState, useEffect } from 'react';
import { Power, Settings as SettingsIcon, User, Search, Terminal as TerminalIcon, FileText, Globe, Folder, PlayCircle, Music } from 'lucide-react';

interface TaskbarProps {
  openWindows: string[];
  onOpenApp: (appName: string) => void;
  activeWindow: string | null;
  onFocusWindow: (appName: string) => void;
}

// Iconos SVG personalizados para imitar la captura de pantalla del usuario
const HomeIconSvg = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full select-none pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="white" stroke="white" />
    <polyline points="9 22 9 12 15 12 15 22" fill="#0f0519" stroke="#0f0519" strokeWidth="1.5" />
  </svg>
);

const BrowserIconSvg = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none pointer-events-none">
    <defs>
      <radialGradient id="planetGrad" cx="35%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#9fc3f9" />
        <stop offset="35%" stopColor="#4f7ef2" />
        <stop offset="70%" stopColor="#1e3da0" />
        <stop offset="100%" stopColor="#0a1240" />
      </radialGradient>
      <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.9)" />
        <stop offset="50%" stopColor="rgba(200, 220, 255, 0.3)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="rgba(168, 85, 247, 0.9)" />
      </linearGradient>
    </defs>
    {/* Back Ring */}
    <path d="M 15,55 A 40,14 26 0,1 85,45" fill="none" stroke="url(#ringGrad)" strokeWidth="5.5" strokeLinecap="round" opacity="0.6" />
    {/* Planet Orb */}
    <circle cx="50" cy="50" r="25" fill="url(#planetGrad)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))" />
    {/* Front Ring */}
    <path d="M 85,45 A 40,14 26 0,1 15,55" fill="none" stroke="url(#ringGrad)" strokeWidth="5.5" strokeLinecap="round" />
  </svg>
);

const PlayIconSvg = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none pointer-events-none">
    <defs>
      <linearGradient id="playBtnGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d19fff" />
        <stop offset="45%" stopColor="#8a3eff" />
        <stop offset="100%" stopColor="#4c00cc" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#playBtnGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))" />
    <polygon points="41,33 68,50 41,67" fill="white" />
  </svg>
);

const CodeIconSvg = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none pointer-events-none">
    <defs>
      <linearGradient id="codeBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3d2166" />
        <stop offset="100%" stopColor="#140b26" />
      </linearGradient>
    </defs>
    <rect x="12" y="18" width="76" height="64" rx="14" fill="url(#codeBoxGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))" />
    <text x="50" y="57" fill="rgba(255,255,255,0.9)" fontSize="24" fontWeight="bold" textAnchor="middle" fontFamily="monospace">{"</>"}</text>
  </svg>
);

const FolderIconSvg = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none pointer-events-none">
    <defs>
      <linearGradient id="folderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a27bff" />
        <stop offset="100%" stopColor="#4c1d95" />
      </linearGradient>
      <linearGradient id="folderFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#bfa3ff" />
        <stop offset="100%" stopColor="#5b21b6" />
      </linearGradient>
    </defs>
    <path d="M 15,28 C 15,24 20,24 24,24 L 44,24 C 48,24 50,28 54,28 L 84,28 C 88,28 88,32 88,36 L 88,76 C 88,80 84,80 80,80 L 20,80 C 16,80 15,76 15,72 Z" fill="url(#folderGrad)" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))" />
    <rect x="25" y="32" width="50" height="38" rx="3" fill="white" opacity="0.25" />
    <path d="M 15,38 C 15,34 19,34 23,34 L 77,34 C 81,34 85,34 85,38 L 85,74 C 85,78 81,80 77,80 L 23,80 C 19,80 15,78 15,74 Z" fill="url(#folderFrontGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" filter="drop-shadow(0 -2px 5px rgba(0,0,0,0.2))" />
  </svg>
);

const MusicIconSvg = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none pointer-events-none">
    <defs>
      <linearGradient id="musicGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffffff" />
        <stop offset="100%" stopColor="#ca8aff" />
      </linearGradient>
    </defs>
    <path d="M38,68 A9,7.5 0 1,1 29,60 L29,26 C29,23 31,21 34,21 L66,13 C69,12 72,14 72,17 L72,55 A9,7.5 0 1,1 63,47 L63,28 L38,34 L38,68 Z" fill="url(#musicGrad)" filter="drop-shadow(0 3px 6px rgba(168,85,247,0.3))" />
  </svg>
);

const GearIconSvg = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none pointer-events-none">
    <defs>
      <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#c5a5ff" />
        <stop offset="100%" stopColor="#5b25b7" />
      </linearGradient>
    </defs>
    <path d="M50,38 A12,12 0 1,0 50,62 A12,12 0 1,0 50,38 M50,16 L55,23 A4,4 0 0,0 59,25 L67,22 A4,4 0 0,1 72,25 L76,32 A4,4 0 0,1 75,37 L71,43 A4,4 0 0,0 71,47 L75,53 A4,4 0 0,1 76,58 L72,65 A4,4 0 0,1 67,68 L59,65 A4,4 0 0,0 55,67 L50,74 L45,67 A4,4 0 0,0 41,65 L33,68 A4,4 0 0,1 28,65 L24,58 A4,4 0 0,1 25,53 L29,47 A4,4 0 0,0 29,43 L25,37 A4,4 0 0,1 24,32 L28,25 A4,4 0 0,1 33,22 L41,65 L41,25 A4,4 0 0,0 45,23 Z" fill="url(#gearGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.3))" />
  </svg>
);

const NotepadIconSvg = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none pointer-events-none">
    <defs>
      <linearGradient id="notepadGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ffb0d9" />
        <stop offset="50%" stopColor="#ec4899" />
        <stop offset="100%" stopColor="#a21caf" />
      </linearGradient>
    </defs>
    <rect x="15" y="15" width="70" height="70" rx="12" fill="url(#notepadGrad)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))" />
    <rect x="35" y="10" width="30" height="10" rx="4" fill="#ffffff" opacity="0.85" />
    <line x1="30" y1="35" x2="70" y2="35" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
    <line x1="30" y1="48" x2="60" y2="48" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
    <line x1="30" y1="61" x2="70" y2="61" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
    <line x1="30" y1="74" x2="50" y2="74" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
  </svg>
);

const TrashIconSvg = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full select-none pointer-events-none">
    <defs>
      <linearGradient id="trashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#a5b4fc" />
        <stop offset="50%" stopColor="#6366f1" />
        <stop offset="100%" stopColor="#312e81" />
      </linearGradient>
    </defs>
    <path d="M 28,32 L 34,80 C 35,84 39,87 43,87 L 57,87 C 61,87 65,84 66,80 L 72,32 Z" fill="url(#trashGrad)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.4))" />
    <path d="M 23,24 L 77,24 C 80,24 82,26 82,28 C 82,30 80,32 77,32 L 23,32 C 20,32 18,30 18,28 C 18,26 20,24 23,24 Z" fill="#ffffff" opacity="0.8" />
    <path d="M 42,24 L 42,16 C 42,14 44,12 46,12 L 54,12 C 56,12 58,14 58,16 L 58,24" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
    <line x1="42" y1="42" x2="44" y2="76" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" />
    <line x1="50" y1="42" x2="50" y2="76" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" />
    <line x1="58" y1="42" x2="56" y2="76" stroke="rgba(255,255,255,0.3)" strokeWidth="3" strokeLinecap="round" />
  </svg>
);


export function Taskbar({ openWindows, onOpenApp, activeWindow, onFocusWindow }: TaskbarProps) {
  function ImageIcon({ src, alt, className, fallback }: { src: string; alt: string; className?: string; fallback?: React.ReactNode }) {
    const [ok, setOk] = useState(true);
    if (!ok) return <>{fallback ?? null}</>;
    return (
      <div className="inline-flex items-center justify-center w-full h-full p-1 rounded-md bg-gradient-to-br from-[#0f0519]/40 to-[#20102a]/30 shadow-[0_8px_18px_rgba(0,0,0,0.45)]">
        <img
          src={src}
          alt={alt}
          className={`${className ?? ''} max-w-full max-h-full object-contain`} 
          onError={() => setOk(false)}
        />
      </div>
    );
  }

  const [showStartMenu, setShowStartMenu] = useState(false);

  useEffect(() => {
    const handleToggle = () => setShowStartMenu(prev => !prev);
    window.addEventListener('toggle-start-menu', handleToggle);
    return () => window.removeEventListener('toggle-start-menu', handleToggle);
  }, []);

  // Lista completa de aplicaciones en el Dock (coincide exactamente con la imagen)
  const dockApps = [
    { name: 'Home', icon: <ImageIcon src="/icons/home.png" alt="Home" className="w-full h-full" fallback={<HomeIconSvg />} />, action: () => setShowStartMenu(prev => !prev), isSystem: true },
    { name: 'Browser', icon: <ImageIcon src="/icons/browser.png" alt="Browser" className="w-full h-full" fallback={<BrowserIconSvg />} />, app: 'Browser' },
    { name: 'Media Player', icon: <ImageIcon src="/icons/media-player.png" alt="Media Player" className="w-full h-full" fallback={<PlayIconSvg />} />, app: 'Media Player' },
    { name: 'Terminal', icon: <ImageIcon src="/icons/terminal.png" alt="Terminal" className="w-full h-full" fallback={<CodeIconSvg />} />, app: 'Terminal' },
    { name: 'File Explorer', icon: <ImageIcon src="/icons/file-explorer.png" alt="File Explorer" className="w-full h-full" fallback={<FolderIconSvg />} />, app: 'File Explorer' },
    { name: 'Music Player', icon: <ImageIcon src="/icons/music.png" alt="Music" className="w-full h-full" fallback={<MusicIconSvg />} />, app: 'Music Player' },
    { name: 'Settings', icon: <ImageIcon src="/icons/settings.png" alt="Settings" className="w-full h-full" fallback={<GearIconSvg />} />, app: 'Settings' }
  ];

  // Lista de todas las aplicaciones disponibles en el Menú Inicio (Home)
  const startMenuApps = [
    { name: 'Browser', icon: <ImageIcon src="/icons/browser.png" alt="Browser" className="w-full h-full" fallback={<BrowserIconSvg />} />, app: 'Browser' },
    { name: 'Notepad', icon: <ImageIcon src="/icons/notepad.png" alt="Notepad" className="w-full h-full" fallback={<NotepadIconSvg />} />, app: 'Notepad' },
    { name: 'Terminal', icon: <ImageIcon src="/icons/terminal.png" alt="Terminal" className="w-full h-full" fallback={<CodeIconSvg />} />, app: 'Terminal' },
    { name: 'File Explorer', icon: <ImageIcon src="/icons/file-explorer.png" alt="File Explorer" className="w-full h-full" fallback={<FolderIconSvg />} />, app: 'File Explorer' },
    { name: 'Media Player', icon: <ImageIcon src="/icons/media-player.png" alt="Media Player" className="w-full h-full" fallback={<PlayIconSvg />} />, app: 'Media Player' },
    { name: 'Music Player', icon: <ImageIcon src="/icons/music.png" alt="Music" className="w-full h-full" fallback={<MusicIconSvg />} />, app: 'Music Player' },
    { name: 'Settings', icon: <ImageIcon src="/icons/settings.png" alt="Settings" className="w-full h-full" fallback={<GearIconSvg />} />, app: 'Settings' },
    { name: 'Recycle Bin', icon: <ImageIcon src="/icons/recycle-bin.png" alt="Recycle Bin" className="w-full h-full" fallback={<TrashIconSvg />} />, app: 'Recycle Bin' }
  ];

  const handleDockItemClick = (item: typeof dockApps[0]) => {
    if (item.isSystem && item.action) {
      item.action();
    } else if (item.app) {
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
    const isOpen = openWindows.includes(appName);
    const isActive = activeWindow === appName;
    return { isOpen, isActive };
  };

  return (
    <div className="relative flex flex-col items-center pb-5 select-none z-50 pointer-events-none">
      {/* Start Menu (Neon Dark Glassmorphism) */}
      {showStartMenu && (
        <>
          <div
            className="fixed inset-0 pointer-events-auto z-40"
            onClick={() => setShowStartMenu(false)}
          />
          <div className="absolute bottom-20 w-96 glass-panel border border-white/10 rounded-2xl overflow-hidden shadow-[0_15px_40px_rgba(138,50,255,0.25)] pointer-events-auto z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
            {/* User Section */}
            <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/60 p-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shadow-inner">
                  <User className="w-6 h-6 text-purple-200" />
                </div>
                <div>
                  <div className="font-semibold text-white text-sm tracking-wide">Usuario Local</div>
                  <div className="text-[10px] text-purple-300 font-mono opacity-80">user@seros</div>
                </div>
              </div>
            </div>

            {/* Search */}
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

            {/* Apps Grid */}
            <div className="p-4 bg-black/10">
              <div className="text-[10px] font-bold text-purple-300 tracking-widest uppercase mb-3 px-1">Aplicaciones</div>
              <div className="grid grid-cols-3 gap-3">
                {startMenuApps.map((app) => {
                  const { isOpen } = getAppState(app.app);
                  return (
                    <button
                      key={app.name}
                      onClick={() => handleAppClick(app.app)}
                      className="flex flex-col items-center gap-1.5 p-2.5 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl transition-all duration-200 active:scale-95 cursor-pointer group"
                    >
                      <div className="w-11 h-11 transition-transform group-hover:scale-105">
                        {app.icon}
                      </div>
                      <span className="text-[10px] text-center text-purple-100 group-hover:text-white font-medium truncate w-full">
                        {app.name}
                      </span>
                      {isOpen && <div className="w-1.5 h-1 bg-purple-400 rounded-full" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* System Options */}
            <div className="border-t border-white/5 p-2 bg-black/30 flex justify-between px-4">
              <button 
                onClick={() => { onOpenApp('Settings'); setShowStartMenu(false); }}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-white/5 rounded-lg text-xs text-purple-200 hover:text-white cursor-pointer transition-colors"
              >
                <SettingsIcon className="w-4 h-4" />
                Configuración
              </button>
              <button 
                onClick={() => { if(confirm('¿Desea apagar el sistema simulado?')) window.close(); }}
                className="flex items-center gap-2 px-3 py-1.5 hover:bg-red-500/10 rounded-lg text-xs text-red-400 hover:text-red-300 cursor-pointer transition-colors"
              >
                <Power className="w-4 h-4" />
                Apagar
              </button>
            </div>
          </div>
        </>
      )}

      {/* DOCK CONTAINER (Glassmorphic capsule with mirroring) */}
      <div className="relative group/dock pointer-events-auto">
        
        {/* Mirror Reflection Effect Underneath */}
        <div className="absolute top-[102%] left-0 right-0 flex items-end justify-center gap-2.5 px-6 py-2.5 rounded-[24px] border border-white/5 opacity-[0.14] pointer-events-none z-10 select-none blur-[2.5px] scale-y-[-1] origin-top">
          {dockApps.map((item, idx) => (
            <div key={`reflect-${idx}`} className="w-12 h-12 flex items-center justify-center">
              <div className="w-10 h-10 opacity-70">
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* The Actual Visible Interactive Dock */}
        <div className="flex items-end gap-2.5 px-6 py-2.5 rounded-[24px] glass-dock border border-white/10 relative z-30 transition-all duration-300 shadow-[0_15px_40px_-10px_rgba(138,50,255,0.4)]">
          {dockApps.map((item, index) => {
            const { isOpen, isActive } = getAppState(item.app);
            
            return (
              <div key={index} className="flex flex-col items-center relative group/item">
                
                {/* Tooltip Label */}
                <span className="absolute bottom-full mb-3 px-2.5 py-1 text-[10px] font-semibold text-purple-100 bg-slate-950/80 border border-white/10 rounded-lg shadow-lg opacity-0 group-hover/item:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                  {item.name}
                </span>

                {/* Dock Button Icon */}
                <button
                  onClick={() => handleDockItemClick(item)}
                  className={`w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 ease-out origin-bottom hover:scale-125 hover:-translate-y-2.5 hover:mx-2 active:scale-95 cursor-pointer relative ${
                    isActive ? 'drop-shadow-[0_0_12px_rgba(236,72,153,0.5)]' : 'drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]'
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center">
                    {item.icon}
                  </div>
                </button>

                {/* State LED Indicator Dot */}
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
