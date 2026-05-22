import { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music, Shuffle, Repeat, Volume2 } from 'lucide-react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(15);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const playlist = [
    { title: "Neon Dreams", artist: "Synthwave Operator", duration: "3:45" },
    { title: "Retro Laser", artist: "Hyper Drive", duration: "4:12" },
    { title: "Cyber Sunset", artist: "Glitch In The Matrix", duration: "2:58" },
    { title: "Pixel Heartbeat", artist: "Chiptune Kid", duration: "3:30" }
  ];

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Siguiente track
            setCurrentTrackIndex(curr => (curr + 1) % playlist.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentTrack = playlist[currentTrackIndex];

  return (
    <div className="h-full flex flex-col bg-[#080214]/95 text-slate-100 select-none p-4 font-sans">
      {/* Player Top Info & Visualizer */}
      <div className="flex gap-4 items-center p-3 bg-white/5 border border-white/5 rounded-xl">
        {/* Vinyl/CD Glowing Cover */}
        <div className={`w-20 h-20 rounded-full border border-purple-500/30 bg-gradient-to-tr from-purple-800 to-pink-600 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.3)] relative overflow-hidden ${
          isPlaying ? 'animate-spin-slow' : ''
        }`}>
          {/* Vinyl center */}
          <div className="w-6 h-6 rounded-full bg-[#080214] border border-white/10 z-10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
          </div>
          {/* Vinyl grooves */}
          <div className="absolute inset-2 border border-white/5 rounded-full" />
          <div className="absolute inset-5 border border-white/5 rounded-full" />
        </div>

        {/* Track Title */}
        <div className="flex-1 min-w-0">
          <span className="text-[9px] font-bold uppercase tracking-widest text-pink-400 block mb-1">REPRODUCIENDO</span>
          <h3 className="text-sm font-extrabold text-white truncate">{currentTrack.title}</h3>
          <p className="text-xs text-slate-400 truncate">{currentTrack.artist}</p>
        </div>

        {/* Animated Equalizer Wave (Pure CSS) */}
        <div className="flex items-end gap-1 h-10 w-16 px-2">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="bg-purple-500 rounded-t w-1.5"
              style={{
                height: isPlaying ? '100%' : '15%',
                transformOrigin: 'bottom',
                animation: isPlaying ? `neon-pulse 1.2s ease-in-out infinite alternate` : 'none',
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Playlist Grid */}
      <div className="flex-1 my-4 bg-black/20 border border-white/5 rounded-xl p-2.5 overflow-y-auto no-scrollbar">
        <span className="text-[9px] font-bold text-purple-300 tracking-wider uppercase mb-2 block px-1.5">Lista de pistas</span>
        <div className="space-y-1">
          {playlist.map((track, idx) => (
            <div
              key={idx}
              onClick={() => { setCurrentTrackIndex(idx); setProgress(0); setIsPlaying(true); }}
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                idx === currentTrackIndex 
                  ? 'bg-purple-950/40 border border-purple-500/20 text-white' 
                  : 'hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Music className={`w-3.5 h-3.5 flex-shrink-0 ${idx === currentTrackIndex ? 'text-pink-400' : 'text-slate-500'}`} />
                <div className="truncate">
                  <span className="text-xs font-semibold block">{track.title}</span>
                  <span className="text-[10px] opacity-60 block">{track.artist}</span>
                </div>
              </div>
              <span className="text-[10px] font-mono opacity-80">{track.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-black/20 border border-white/5 rounded-xl p-3 space-y-3">
        {/* Timeline */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-mono text-slate-500">0:00</span>
          <div className="flex-1 bg-white/10 h-1 rounded-full cursor-pointer relative overflow-hidden group">
            <div className="bg-pink-500 h-full group-hover:bg-purple-400 transition-colors" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[9px] font-mono text-slate-500">{currentTrack.duration}</span>
        </div>

        <div className="flex items-center justify-between">
          <Shuffle className="w-4 h-4 text-slate-500 hover:text-slate-300 cursor-pointer" />
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { setCurrentTrackIndex(c => (c - 1 + playlist.length) % playlist.length); setProgress(0); }}
              className="p-1.5 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white cursor-pointer"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 bg-pink-500 hover:bg-pink-400 text-white rounded-full shadow-[0_0_12px_rgba(236,72,153,0.4)] transition-all cursor-pointer active:scale-95 hover:scale-105"
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>
            <button 
              onClick={() => { setCurrentTrackIndex(c => (c + 1) % playlist.length); setProgress(0); }}
              className="p-1.5 hover:bg-white/5 rounded-lg text-slate-300 hover:text-white cursor-pointer"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          <Repeat className="w-4 h-4 text-slate-500 hover:text-slate-300 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
