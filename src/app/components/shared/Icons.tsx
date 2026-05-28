// =========================================================================
// Iconos SVG personalizados extraídos de Taskbar.tsx
// Centralizados para eliminar redundancia y mantener limpios los componentes
// =========================================================================

export const HomeIconSvg = () => (
  <svg viewBox="0 0 24 24" className="w-full h-full select-none pointer-events-none" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" fill="white" stroke="white" />
    <polyline points="9 22 9 12 15 12 15 22" fill="#0f0519" stroke="#0f0519" strokeWidth="1.5" />
  </svg>
);

export const BrowserIconSvg = () => (
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
    <path d="M 15,55 A 40,14 26 0,1 85,45" fill="none" stroke="url(#ringGrad)" strokeWidth="5.5" strokeLinecap="round" opacity="0.6" />
    <circle cx="50" cy="50" r="25" fill="url(#planetGrad)" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.5))" />
    <path d="M 85,45 A 40,14 26 0,1 15,55" fill="none" stroke="url(#ringGrad)" strokeWidth="5.5" strokeLinecap="round" />
  </svg>
);

export const PlayIconSvg = () => (
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

export const CodeIconSvg = () => (
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

export const FolderIconSvg = () => (
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

export const MusicIconSvg = () => (
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

export const GearIconSvg = () => (
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

export const NotepadIconSvg = () => (
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

export const TrashIconSvg = () => (
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

/** Mapa de fallback SVG por nombre de app */
export const fallbackSvgMap: Record<string, React.ComponentType> = {
  Browser: BrowserIconSvg,
  'Media Player': PlayIconSvg,
  'Music Player': MusicIconSvg,
  Terminal: CodeIconSvg,
  'File Explorer': FolderIconSvg,
  Settings: GearIconSvg,
  Notepad: NotepadIconSvg,
  'Recycle Bin': TrashIconSvg,
  Home: HomeIconSvg,
};