import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Monitor, Cpu, Shield, HelpCircle } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState<'system' | 'personalization' | 'about'>('system');
  const [cpuUsage, setCpuUsage] = useState(12);
  const [ramUsage, setRamUsage] = useState(4.2);

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
              <p className="text-xs text-slate-400">Estadísticas simuladas en tiempo real de tu NeonOS.</p>
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
              <p className="text-xs text-slate-400">Modifica el comportamiento y estética del escritorio.</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                <span className="text-xs font-bold text-white block mb-2">Fondos de Pantalla</span>
                <p className="text-[10px] text-slate-400 mb-3">En el siguiente paso podrás arrastrar tu propia imagen aquí para establecerla como fondo. Por ahora, el fondo CSS premium está activo.</p>
                <div className="flex gap-3">
                  <div className="w-20 h-12 rounded-lg border border-purple-500/40 bg-gradient-to-tr from-purple-900 to-pink-600 cursor-pointer flex items-center justify-center text-[9px] font-bold text-white shadow-lg">
                    Neon Aurora
                  </div>
                  <div className="w-20 h-12 rounded-lg border border-white/5 bg-[#03000b] hover:border-purple-500/20 cursor-pointer flex items-center justify-center text-[9px] text-slate-500">
                    Oscuro Puro
                  </div>
                  <div className="w-20 h-12 rounded-lg border border-white/5 bg-gradient-to-r from-blue-900 to-indigo-950 hover:border-purple-500/20 cursor-pointer flex items-center justify-center text-[9px] text-slate-500">
                    Espacio Profundo
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div>
                  <span className="text-xs font-bold text-white block">Efecto Glassmorphism</span>
                  <span className="text-[10px] text-slate-400">Activa desenfoques de fondo premium (Backdrop Blur)</span>
                </div>
                <div className="w-10 h-5 bg-purple-600 rounded-full p-0.5 cursor-pointer flex justify-end">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="text-center py-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.5)]">
                <SettingsIcon className="w-9 h-9 text-white animate-spin-slow" />
              </div>
              <h2 className="text-xl font-black tracking-widest text-white mb-1">NeonOS</h2>
              <span className="text-[10px] font-mono text-purple-400 font-bold bg-purple-950/40 px-2.5 py-0.5 rounded-full border border-purple-800/30">Version 1.0.0</span>
              <p className="text-xs text-slate-400 mt-4 max-w-sm mx-auto leading-relaxed">
                Un entorno de escritorio simulado interactivo, construido con React, Tailwind CSS y mucho amor al diseño moderno y futurista.
              </p>
            </div>

            <div className="border-t border-white/5 pt-4 text-center">
              <span className="text-[10px] text-slate-500">Google DeepMind - Antigravity Agent Coding</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
