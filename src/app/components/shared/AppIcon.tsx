// =========================================================================
// Componente unificado AppIcon para todo el sistema SerOS
// Reemplaza las implementaciones duplicadas de ImageIcon en App.tsx y Taskbar.tsx
// =========================================================================

import { useState } from 'react';
import { Terminal, FileText, Globe, Folder, PlayCircle, Music, Settings, Trash2, type LucideIcon } from 'lucide-react';

/** Mapa de nombres de iconos Lucide a componentes */
const lucideIconMap: Record<string, LucideIcon> = {
  Terminal, FileText, Globe, Folder, PlayCircle, Music, Settings, Trash2,
};

interface AppIconProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIconName?: string;
  /** Contenedor más pequeño para la Taskbar (compact) */
  compact?: boolean;
  /** Fallback ReactNode personalizado (sobrescribe fallbackIconName) */
  customFallback?: React.ReactNode;
}

export function AppIcon({ src, alt, className = '', fallbackIconName, compact = false, customFallback }: AppIconProps) {
  const [ok, setOk] = useState(true);
  
  const containerClass = compact
    ? 'inline-flex items-center justify-center w-full h-full p-1 rounded-md bg-gradient-to-br from-[#0f0519]/40 to-[#20102a]/30 shadow-[0_8px_18px_rgba(0,0,0,0.45)]'
    : 'inline-flex items-center justify-center w-full h-full p-1 rounded-lg bg-gradient-to-br from-[#0f0519]/40 to-[#20102a]/30 shadow-[0_8px_20px_rgba(0,0,0,0.45)]';

  if (!ok) {
    if (customFallback) return <>{customFallback}</>;
    if (fallbackIconName) {
      const FallbackIcon = lucideIconMap[fallbackIconName];
      if (FallbackIcon) {
        const colorMap: Record<string, string> = {
          Terminal: 'text-purple-300', FileText: 'text-pink-300', Globe: 'text-blue-300',
          Folder: 'text-indigo-300', PlayCircle: 'text-purple-300', Music: 'text-pink-300',
          Settings: 'text-slate-300', Trash2: 'text-indigo-300',
        };
        return <FallbackIcon className={`${className || 'w-4 h-4'} ${colorMap[fallbackIconName] || 'text-purple-300'}`} />;
      }
    }
    return null;
  }

  return (
    <div className={containerClass}>
      <img
        src={src}
        alt={alt}
        className={`${className} max-w-full max-h-full object-contain`}
        onError={() => setOk(false)}
      />
    </div>
  );
}