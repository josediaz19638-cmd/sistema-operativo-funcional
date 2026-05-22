import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, Film } from 'lucide-react';

export function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(25);
  const [duration, setDuration] = useState("02:40");
  const [currentTime, setCurrentTime] = useState("00:40");

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          const next = prev + 0.5;
          // Calcular tiempo legible
          const totalSecs = 160; // 2:40
          const currSecs = Math.round((next / 100) * totalSecs);
          const mins = Math.floor(currSecs / 60);
          const secs = currSecs % 60;
          setCurrentTime(`0${mins}:${secs < 10 ? '0' + secs : secs}`);
          return next;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="h-full flex flex-col bg-[#0b051a]/95 text-slate-200 select-none p-4">
      {/* Video Screen Area */}
      <div className="flex-1 bg-black/40 border border-white/5 rounded-xl relative overflow-hidden flex items-center justify-center">
        {/* Animated Cyberpunk Grid/Canvas Mock */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none">
          <div 
            className="w-full h-full" 
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(138,50,255,0.15) 1px, transparent 1px)',
              backgroundSize: '16px 16px',
            }}
          />
        </div>

        {/* Video Visuals Mock */}
        <div className="text-center z-10 flex flex-col items-center gap-3">
          <div className={`w-20 h-20 rounded-full border border-purple-500/30 flex items-center justify-center bg-purple-900/10 shadow-[0_0_30px_rgba(168,85,247,0.2)] ${
            isPlaying ? 'animate-pulse scale-105' : ''
          } transition-all duration-500`}>
            <Film className="w-8 h-8 text-purple-300" />
          </div>
          <div>
            <h3 className="text-xs font-bold tracking-widest text-white uppercase">Neon_Horizon_Loop.mp4</h3>
            <span className="text-[10px] text-purple-400 font-semibold font-mono">1080p • 60 FPS • H.264</span>
          </div>
        </div>

        {/* Neon Light Bars on Screen Borders */}
        <div className={`absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-20'}`} />
        <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-20'}`} />
      </div>

      {/* Media Controls Bar */}
      <div className="mt-4 bg-black/20 border border-white/5 rounded-xl p-3 space-y-3">
        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-slate-400 w-8">{currentTime}</span>
          <div className="flex-1 bg-white/10 h-1.5 rounded-full cursor-pointer relative overflow-hidden group">
            <div className="bg-purple-500 h-full group-hover:bg-pink-500 transition-colors" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[9px] font-mono text-slate-400 w-8 text-right">{duration}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <button className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer">
              <Volume2 className="w-4 h-4" />
            </button>
            <div className="w-16 bg-white/10 h-1 rounded-full cursor-pointer relative">
              <div className="bg-purple-400 h-full w-[70%]" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer active:scale-95">
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 bg-purple-600 hover:bg-purple-500 text-white rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer active:scale-95 hover:scale-105"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer active:scale-95">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <div className="w-20 text-right">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">LOOP PLAY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
