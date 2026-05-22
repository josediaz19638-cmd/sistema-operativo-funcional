import { Menu, Search, Wifi, Battery } from 'lucide-react';
import { useState, useEffect } from 'react';

interface TopBarProps {
  onMenuClick: () => void;
}

export function TopBar({ onMenuClick }: TopBarProps) {
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [isCharging, setIsCharging] = useState(false);

  useEffect(() => {
    // Intentar leer el estado de la batería del navegador real si está disponible
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updateBattery = () => {
          setBatteryLevel(Math.round(battery.level * 100));
          setIsCharging(battery.charging);
        };
        updateBattery();
        battery.addEventListener('levelchange', updateBattery);
        battery.addEventListener('chargingchange', updateBattery);
        return () => {
          battery.removeEventListener('levelchange', updateBattery);
          battery.removeEventListener('chargingchange', updateBattery);
        };
      });
    }
  }, []);

  return (
    <div className="w-[calc(100%-2rem)] max-w-7xl h-11 mx-auto mt-3 rounded-full glass-topbar flex items-center justify-between px-6 text-white select-none animate-fade-in border border-white/10 z-40 relative">
      {/* Left: MENU Button */}
      <button 
        onClick={onMenuClick}
        className="flex items-center gap-2 hover:bg-white/10 px-3 py-1 rounded-full transition-all duration-200 cursor-pointer active:scale-95 group"
      >
        <Menu className="w-4 h-4 text-purple-200 group-hover:text-white transition-colors" />
        <span className="text-xs font-semibold tracking-widest text-purple-100 group-hover:text-white transition-colors font-sans">
          MENU
        </span>
      </button>

      {/* Center: Decorative / Search Bar spacer */}
      <div className="flex-1 max-w-lg mx-4 h-5 rounded-full bg-white/5 border border-white/5 px-3 flex items-center opacity-40 hover:opacity-70 transition-opacity duration-300">
        <span className="text-[10px] text-purple-200 tracking-wider">Search or commands...</span>
      </div>

      {/* Right: Status Icons */}
      <div className="flex items-center gap-5 text-purple-200">
        {/* Search Toggle */}
        <button className="hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-90">
          <Search className="w-4 h-4" />
        </button>

        {/* Wifi Status */}
        <button className="hover:text-white hover:bg-white/10 p-1.5 rounded-full transition-all duration-200 cursor-pointer active:scale-90 relative group">
          <Wifi className="w-4 h-4 text-purple-300" />
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900/90 text-[10px] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
            Connected (100 Mbps)
          </span>
        </button>

        {/* Battery Status */}
        <div className="flex items-center gap-1.5 hover:bg-white/10 px-2 py-1 rounded-full transition-all duration-200 cursor-pointer relative group">
          <span className="text-[10px] font-medium tracking-tight">{batteryLevel}%</span>
          <div className="relative flex items-center">
            <Battery className="w-5 h-5 text-purple-300" />
            {isCharging && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-ping" />
              </div>
            )}
          </div>
          <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900/90 text-[10px] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
            {isCharging ? 'Charging' : 'On Battery'}
          </span>
        </div>
      </div>
    </div>
  );
}
