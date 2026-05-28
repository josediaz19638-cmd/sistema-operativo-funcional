import { useEffect, useState } from 'react';

// =========================================================================
// RUTA DE TU FONDO DE PANTALLA:
// 1. Guarda tu imagen en la carpeta 'public' (por ejemplo, 'public/wallpaper.jpg')
// 2. Coloca aquí el nombre del archivo: '/wallpaper.jpg'
// 3. Si dejas esto vacío (''), se mostrará el fondo de neón/aurora animado por defecto.
// =========================================================================

interface DesktopProps {
  onOpenApp: (appName: string) => void;
  wallpaper?: string;
}

// =========================================================================
// Datos de auroras parametrizados para eliminar repetición de JSX
// =========================================================================
interface AuroraConfig {
  side: 'left' | 'right';
  rotate: number;
  skew: number;
  blur: string;
  width: string;
  height: string;
  shadow: string;
  borderColor: string;
}

const AURORAS: AuroraConfig[] = [
  {
    side: 'left', rotate: 14, skew: -8, blur: '1.5px', width: '55%', height: '120%',
    shadow: '12px 0px 45px rgba(236,72,153,0.22), inset -12px 0px 45px rgba(236,72,153,0.08)',
    borderColor: 'rgba(236,72,153,0.2)',
  },
  {
    side: 'left', rotate: 17, skew: -6, blur: '0.8px', width: '50%', height: '110%',
    shadow: '8px 0px 30px rgba(236,72,153,0.25), inset -6px 0px 20px rgba(236,72,153,0.12)',
    borderColor: 'rgba(236,72,153,0.35)',
  },
  {
    side: 'right', rotate: -23, skew: 10, blur: '1.5px', width: '50%', height: '100%',
    shadow: '-12px 0px 45px rgba(168,85,247,0.18), inset 12px 0px 45px rgba(168,85,247,0.06)',
    borderColor: 'rgba(168,85,247,0.18)',
  },
  {
    side: 'right', rotate: -20, skew: 8, blur: '0.8px', width: '45%', height: '90%',
    shadow: '-8px 0px 30px rgba(168,85,247,0.22), inset 6px 0px 20px rgba(168,85,247,0.1)',
    borderColor: 'rgba(168,85,247,0.28)',
  },
];

interface ReflectionConfig {
  side: 'left' | 'right';
  rotate: number;
  skew: number;
  blur: string;
  width: string;
  height: string;
  borderColor: string;
}

const AURORA_REFLECTIONS: ReflectionConfig[] = [
  {
    side: 'left', rotate: 14, skew: -8, blur: '3.5px', width: '55%', height: '120%',
    borderColor: 'rgba(236,72,153,0.08)',
  },
  {
    side: 'right', rotate: -23, skew: 10, blur: '3.5px', width: '50%', height: '100%',
    borderColor: 'rgba(168,85,247,0.06)',
  },
];

interface DiamondConfig {
  top: string;
  left?: string;
  right?: string;
  size: number;
  bg: string;
  borderColor: string;
  hasBlur: boolean;
}

const DIAMONDS: DiamondConfig[] = [
  { top: '28%', left: '23%', size: 2.5, bg: 'rgba(168,85,247,0.25)', borderColor: 'rgba(168,85,247,0.1)', hasBlur: true },
  { top: '45%', left: '8%', size: 1.5, bg: 'rgba(236,72,153,0.12)', borderColor: 'rgba(236,72,153,0.05)', hasBlur: false },
  { top: '32%', right: '20%', size: 3, bg: 'rgba(168,85,247,0.2)', borderColor: 'rgba(168,85,247,0.1)', hasBlur: true },
  { top: '56%', right: '10%', size: 2.5, bg: 'rgba(236,72,153,0.15)', borderColor: 'rgba(236,72,153,0.05)', hasBlur: false },
];

const WALLPAPER_FALLBACKS: Record<string, string[]> = {
  '/wallpapers/wallpaper-1.svg': ['/wallpapers/wallpaper-1.svg', '/wallpapers/wallpaper-1.jpg', '/1.1.jpg'],
  '/wallpapers/wallpaper-2.svg': ['/wallpapers/wallpaper-2.svg', '/wallpapers/wallpaper-2.jpg', '/2.jpg'],
  '/wallpapers/wallpaper-3.svg': ['/wallpapers/wallpaper-3.svg', '/wallpapers/wallpaper-3.png', '/wallpaper.png'],
  '/wallpapers/wallpaper-custom.svg': ['/wallpapers/wallpaper-custom.svg', '/wallpapers/wallpaper-custom.png', '/wallpaper.png'],
};

function resolveWallpaperCandidates(wallpaper: string) {
  return WALLPAPER_FALLBACKS[wallpaper] ?? [wallpaper];
}

function useResolvedWallpaper(wallpaper: string) {
  const [resolvedWallpaper, setResolvedWallpaper] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!wallpaper || wallpaper === 'aurora') {
      setResolvedWallpaper(null);
      return () => {
        cancelled = true;
      };
    }

    const candidates = resolveWallpaperCandidates(wallpaper);
    setResolvedWallpaper(null);

    const tryCandidate = (index: number) => {
      if (cancelled) return;
      if (index >= candidates.length) {
        setResolvedWallpaper('');
        return;
      }

      const candidate = candidates[index];
      const image = new Image();
      image.onload = () => {
        if (!cancelled) setResolvedWallpaper(candidate);
      };
      image.onerror = () => tryCandidate(index + 1);
      image.src = candidate;
    };

    tryCandidate(0);

    return () => {
      cancelled = true;
    };
  }, [wallpaper]);

  return resolvedWallpaper;
}

function AuroraElement({ aurora }: { aurora: AuroraConfig }) {
  const isLeft = aurora.side === 'left';
  return (
    <div
      className={`absolute ${isLeft ? 'left-[-15%]' : 'right-[-10%]'} bottom-0 rounded-[100%] pointer-events-none`}
      style={{
        width: aurora.width,
        height: aurora.height,
        borderRight: isLeft ? '2px solid' : undefined,
        borderLeft: !isLeft ? '2px solid' : undefined,
        borderColor: aurora.borderColor,
        boxShadow: aurora.shadow,
        transform: `rotate(${aurora.rotate}deg) skew(${aurora.skew}deg)`,
        filter: `blur(${aurora.blur})`,
      }}
    />
  );
}

function AuroraReflectionElement({ reflection }: { reflection: ReflectionConfig }) {
  const isLeft = reflection.side === 'left';
  return (
    <div
      className={`absolute ${isLeft ? 'left-[-15%]' : 'right-[-10%]'} top-0 rounded-[100%] opacity-35 pointer-events-none`}
      style={{
        width: reflection.width,
        height: reflection.height,
        borderRight: isLeft ? '1px solid' : undefined,
        borderLeft: !isLeft ? '1px solid' : undefined,
        borderColor: reflection.borderColor,
        transform: `scaleY(-1) rotate(${reflection.rotate}deg) skew(${reflection.skew}deg)`,
        filter: `blur(${reflection.blur})`,
      }}
    />
  );
}

function DiamondElement({ diamond }: { diamond: DiamondConfig }) {
  const posStyle: React.CSSProperties = { top: diamond.top };
  if (diamond.left) posStyle.left = diamond.left;
  if (diamond.right) posStyle.right = diamond.right;

  return (
    <div
      className="absolute rotate-45 pointer-events-none"
      style={{
        width: `${diamond.size}px`,
        height: `${diamond.size}px`,
        backgroundColor: diamond.bg,
        border: `1px solid ${diamond.borderColor}`,
        backdropFilter: diamond.hasBlur ? 'blur(0.5px)' : undefined,
        ...posStyle,
      }}
    />
  );
}

export function Desktop({ onOpenApp, wallpaper = '' }: DesktopProps) {
  const showWallpaper = wallpaper !== 'aurora' && wallpaper !== '';
  const resolvedWallpaper = useResolvedWallpaper(wallpaper);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#060012] select-none">
      {showWallpaper && resolvedWallpaper ? (
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${resolvedWallpaper})` }} />
      ) : (
        <>
          {/* BACKGROUND NEON SKY (Top 80%) */}
          <div className="absolute inset-0 bottom-[20%] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b003a] via-[#090014] to-[#04000a]" />
            
            {/* Ambient Glows */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[100%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(138,50,255,0.22)_0%,rgba(0,0,0,0)_65%)] blur-[50px] pointer-events-none" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.25)_0%,rgba(168,85,247,0.12)_40%,rgba(0,0,0,0)_70%)] blur-[60px] pointer-events-none" />

            {/* Auroras generadas desde datos */}
            {AURORAS.map((aurora, i) => (
              <AuroraElement key={i} aurora={aurora} />
            ))}

            {/* Floating Diamonds */}
            {DIAMONDS.map((diamond, i) => (
              <DiamondElement key={i} diamond={diamond} />
            ))}

            {/* Bright Central Horizon Flare */}
            <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[35%] h-[20px] bg-white rounded-full blur-[6px] opacity-75 pointer-events-none" />
            <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[55%] h-[55px] bg-pink-400 rounded-full blur-[22px] opacity-55 pointer-events-none animate-pulse duration-[5000ms]" />
          </div>

          {/* HORIZON LINE */}
          <div className="absolute bottom-[20%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8eff]/35 to-transparent blur-[0.5px] pointer-events-none z-10" />
          <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />

          {/* GLOSSY REFLECTIVE FLOOR (Bottom 20%) */}
          <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-[#040008] border-t border-purple-950/15 overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-full bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.22)_0%,rgba(168,85,247,0.06)_50%,rgba(0,0,0,0)_80%)] blur-[8px] pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[35%] bg-white/18 rounded-full blur-[5px] pointer-events-none" />

            {/* Aurora Reflections */}
            {AURORA_REFLECTIONS.map((reflection, i) => (
              <AuroraReflectionElement key={i} reflection={reflection} />
            ))}

            {/* Floor Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040008]/40 to-[#020004]" />
          </div>
        </>
      )}
    </div>
  );
}
