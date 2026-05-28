import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Monitor, Cpu, Shield, HelpCircle, Sun, Moon, Volume2, Palette } from 'lucide-react';
import { AppIcon } from './shared/AppIcon';
import { WALLPAPER_OPTIONS } from '../data/appConfig';

interface SettingsProps {
  selectedWallpaper: string;
  glassmorphismEnabled: boolean;
  onWallpaperChange: (wallpaper: string) => void;
  onGlassmorphismChange: (enabled: boolean) => void;
}

export function Settings({ selectedWallpaper, glassmorphismEnabled, onWallpaperChange, onGlassmorphismChange }: SettingsProps) {
  const [activeTab, setActiveTab] = useState<'system' | 'personalization' | 'about'>('system');
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(4.2);
  const wallpaperIconMap = {
    Sun: <Sun className="w-3 h-3 text-yellow-300" />,
    Moon: <Moon className="w-3 h-3 text-slate-300" />,
    Monitor: <Monitor className="w-3 h-3 text-blue-300" />,
    Palette: <Palette className="w-3 h-3 text-fuchsia-300" />,
    Settings: <SettingsIcon className="w-3 h-3 text-fuchsia-200" />,
  } as const;

  // Simular actividad del sistema
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuUsage(Math.round(Math.random() * 25 + 5)); // 5% - 30%
      setRamUsage(prev => {
        const change = (Math.random() - 0.5) * 0.1;
        const newVal = prev + change;
        return parseFloat(Math.max(4.0, Math.min(5.5, newVal)).toFixed(2));
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex text-slate-100 bg-[#0d071e]/40 select-none">
      {/* Sidebar */}
      <div className="w-48 border-r border-white/5 bg-black/20 p-3 flex flex-col gap-2">
        <button
          onClick={() => setActiveTab('system')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
            activeTab === 'system' 
              ? 'bg-purple-600/30 text-white border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Cpu className="w-4 h-4" />
          Sistema
        </button>
        <button
          onClick={() => setActiveTab('personalization')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
            activeTab === 'personalization' 
              ? 'bg-purple-600/30 text-white border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Monitor className="w-4 h-4" />
          Personalización
        </button>
        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium tracking-wide transition-all cursor-pointer ${
            activeTab === 'about' 
              ? 'bg-purple-600/30 text-white border border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.2)]' 
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          Acerca de
        </button>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-purple-400" /> Rendimiento del Sistema
              </h2>
              <p className="text-xs text-slate-400">Estadísticas simuladas en tiempo real de tu SerOS.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* CPU Box */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-purple-200">Uso de CPU</span>
                  <span className="text-xs font-mono text-pink-400 font-bold">{cpuUsage}%</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500" style={{ width: `${cpuUsage}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 mt-2 block">Simulando 8 Núcleos @ 3.8GHz</span>
              </div>

              {/* RAM Box */}
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-purple-200">Memoria RAM</span>
                  <span className="text-xs font-mono text-pink-400 font-bold">{ramUsage} GB / 16 GB</span>
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500" style={{ width: `${(ramUsage / 16) * 100}%` }} />
                </div>
                <span className="text-[10px] text-slate-500 mt-2 block">LPDDR5 de alta velocidad (Glass filter activo)</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex gap-4 items-center">
              <Shield className="w-8 h-8 text-green-400/80" />
              <div>
                <span className="text-xs font-bold text-white block">Seguridad del Sistema</span>
                <span className="text-[10px] text-slate-400">Todos los módulos virtuales están operativos y protegidos por sandbox.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'personalization' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-purple-400" /> Personalización Visual
              </h2>
              <p className="text-xs text-slate-400">Modifica el fondo de pantalla y el estilo del escritorio.</p>
            </div>

            {/* Wallpaper Selector */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5">
              <span className="text-xs font-bold text-white block mb-3">Fondo de Pantalla</span>
              <div className="flex gap-3 flex-wrap">
                {WALLPAPER_OPTIONS.map((wp) => (
                  <button
                    key={wp.value}
                    onClick={() => onWallpaperChange(wp.value)}
                    className={`w-24 h-16 rounded-lg bg-gradient-to-br ${wp.color} border-2 flex flex-col items-center justify-center gap-1 text-[9px] font-bold transition-all duration-200 cursor-pointer ${
                      selectedWallpaper === wp.value
                        ? 'border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.5)] scale-105'
                        : 'border-white/10 hover:border-purple-400/50 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {wallpaperIconMap[wp.iconName]}
                    <span className={selectedWallpaper === wp.value ? 'text-white' : 'text-slate-400'}>
                      {wp.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Glassmorphism Toggle */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${glassmorphismEnabled ? 'bg-purple-500/20' : 'bg-white/5'}`}>
                  <Monitor className={`w-5 h-5 ${glassmorphismEnabled ? 'text-purple-400' : 'text-slate-500'}`} />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Efecto Glassmorphism</span>
                  <span className="text-[10px] text-slate-400">Activa desenfoques de fondo premium (Backdrop Blur)</span>
                </div>
              </div>
              <button
                onClick={() => onGlassmorphismChange(!glassmorphismEnabled)}
                className={`relative w-12 h-6 rounded-full p-0.5 cursor-pointer transition-all duration-300 ${
                  glassmorphismEnabled ? 'bg-purple-600' : 'bg-white/20'
                }`}
              >
                <div className={`w-5 h-5 bg-white rounded-full transition-all duration-300 shadow-md ${
                  glassmorphismEnabled ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Otras opciones visuales */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-purple-300" />
                  <span className="text-xs font-bold text-white">Efectos de Sonido</span>
                </div>
                <div className="w-12 h-6 bg-white/20 rounded-full p-0.5 cursor-pointer opacity-50">
                  <div className="w-5 h-5 bg-white rounded-full" />
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Sun className="w-4 h-4 text-yellow-300" />
                  <span className="text-xs font-bold text-white">Tema Oscuro</span>
                </div>
                <div className="w-12 h-6 bg-purple-600 rounded-full p-0.5 cursor-pointer flex justify-end opacity-80">
                  <div className="w-5 h-5 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(168,85,247,0.5)] bg-white/5 p-2">
                <AppIcon
                  src="/icons/seros.png"
                  alt="SerOS"
                  className="w-14 h-14"
                  customFallback={<span className="text-xs font-semibold text-purple-200">SerOS</span>}
                />
              </div>
              <h2 className="text-xl font-black tracking-widest text-white mb-1">SerOS</h2>
              <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-950/40 px-2.5 py-0.5 rounded-full border border-purple-800/30">Version 1.0.0</span>
              <p className="text-xs text-slate-400 mt-4 max-w-sm mx-auto leading-relaxed">
                Creado por estudiantes de UNIPAZ - Un entorno de escritorio simulado interactivo, construido con React, Tailwind CSS y mucho amor al diseño moderno y futurista.
              </p>
            </div>

            <div className="border-t border-white/5 pt-4 text-center">
              <span className="text-[10px] text-slate-500">UNIPAZ - Estudiantes de Ingeniería de Sistemas</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
