// =========================================================================
// RUTA DE TU FONDO DE PANTALLA:
// 1. Guarda tu imagen en la carpeta 'public' (por ejemplo, 'public/wallpaper.jpg')
// 2. Coloca aquí el nombre del archivo: '/wallpaper.jpg'
// 3. Si dejas esto vacío (''), se mostrará el fondo de neón/aurora animado por defecto.
// =========================================================================
const WALLPAPER_URL = '/wallpaper.png'; 

interface DesktopProps {
  onOpenApp: (appName: string) => void;
}

export function Desktop({ onOpenApp }: DesktopProps) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#060012] select-none">
      {WALLPAPER_URL ? (
        /* Fondo de pantalla personalizado a pantalla completa */
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${WALLPAPER_URL})` }}
        />
      ) : (
        <>
          {/* BACKGROUND NEON SKY (Top 80%) */}
          <div className="absolute inset-0 bottom-[20%] overflow-hidden">
            {/* Base Atmospheric Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1b003a] via-[#090014] to-[#04000a]" />

        {/* Ambient Glows */}
        <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[100%] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(138,50,255,0.22)_0%,rgba(0,0,0,0)_65%)] blur-[50px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_bottom,rgba(236,72,153,0.25)_0%,rgba(168,85,247,0.12)_40%,rgba(0,0,0,0)_70%)] blur-[60px] pointer-events-none" />

        {/* Left Glowing Curved Auroras */}
        <div 
          className="absolute left-[-15%] bottom-0 w-[55%] h-[120%] border-r-[2.5px] border-pink-500/20 rounded-[100%] pointer-events-none"
          style={{
            boxShadow: '12px 0px 45px rgba(236,72,153,0.22), inset -12px 0px 45px rgba(236,72,153,0.08)',
            transform: 'rotate(14deg) skew(-8deg)',
            filter: 'blur(1.5px)'
          }}
        />
        <div 
          className="absolute left-[-20%] bottom-0 w-[50%] h-[110%] border-r-[1.5px] border-pink-400/35 rounded-[100%] pointer-events-none"
          style={{
            boxShadow: '8px 0px 30px rgba(236,72,153,0.25), inset -6px 0px 20px rgba(236,72,153,0.12)',
            transform: 'rotate(17deg) skew(-6deg)',
            filter: 'blur(0.8px)'
          }}
        />

        {/* Right Glowing Curved Auroras */}
        <div 
          className="absolute right-[-10%] bottom-0 w-[50%] h-[100%] border-l-[2.5px] border-purple-500/18 rounded-[100%] pointer-events-none"
          style={{
            boxShadow: '-12px 0px 45px rgba(168,85,247,0.18), inset 12px 0px 45px rgba(168,85,247,0.06)',
            transform: 'rotate(-23deg) skew(10deg)',
            filter: 'blur(1.5px)'
          }}
        />
        <div 
          className="absolute right-[-16%] bottom-0 w-[45%] h-[90%] border-l-[1.5px] border-purple-400/28 rounded-[100%] pointer-events-none"
          style={{
            boxShadow: '-8px 0px 30px rgba(168,85,247,0.22), inset 6px 0px 20px rgba(168,85,247,0.1)',
            transform: 'rotate(-20deg) skew(8deg)',
            filter: 'blur(0.8px)'
          }}
        />

        {/* Floating Diamonds (visual elements from original image) */}
        <div className="absolute top-[28%] left-[23%] w-2.5 h-2.5 bg-purple-500/25 rotate-45 border border-purple-400/10 backdrop-blur-[0.5px] pointer-events-none" />
        <div className="absolute top-[45%] left-[8%] w-1.5 h-1.5 bg-pink-500/12 rotate-45 border border-pink-400/5 pointer-events-none" />
        <div className="absolute top-[32%] right-[20%] w-3 h-3 bg-purple-400/20 rotate-45 border border-purple-300/10 backdrop-blur-[0.5px] pointer-events-none" />
        <div className="absolute top-[56%] right-[10%] w-2.5 h-2.5 bg-pink-500/15 rotate-45 border border-pink-400/5 pointer-events-none" />

        {/* Bright Central Horizon Flare */}
        <div className="absolute bottom-[-10px] left-1/2 -translate-x-1/2 w-[35%] h-[20px] bg-white rounded-full blur-[6px] opacity-75 pointer-events-none" />
        <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 w-[55%] h-[55px] bg-pink-400 rounded-full blur-[22px] opacity-55 pointer-events-none animate-pulse duration-[5000ms]" />
      </div>

      {/* HORIZON LINE */}
      <div className="absolute bottom-[20%] left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff8eff]/35 to-transparent blur-[0.5px] pointer-events-none z-10" />
      <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none z-10" />

      {/* GLOSSY REFLECTIVE FLOOR (Bottom 20%) */}
      <div className="absolute bottom-0 left-0 right-0 h-[20%] bg-[#040008] border-t border-purple-950/15 overflow-hidden">
        {/* Floor Reflections */}
        {/* Center Horizon Light reflection */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-full bg-[radial-gradient(ellipse_at_top,rgba(236,72,153,0.22)_0%,rgba(168,85,247,0.06)_50%,rgba(0,0,0,0)_80%)] blur-[8px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[30%] h-[35%] bg-white/18 rounded-full blur-[5px] pointer-events-none" />

        {/* Aurora Flipped Reflections */}
        <div 
          className="absolute left-[-15%] top-0 w-[55%] h-[120%] border-r-[1px] border-pink-500/8 rounded-[100%] opacity-35 pointer-events-none"
          style={{
            transform: 'scaleY(-1) rotate(14deg) skew(-8deg)',
            filter: 'blur(3.5px)'
          }}
        />
        <div 
          className="absolute right-[-10%] top-0 w-[50%] h-[100%] border-l-[1px] border-purple-500/6 rounded-[100%] opacity-35 pointer-events-none"
          style={{
            transform: 'scaleY(-1) rotate(-23deg) skew(10deg)',
            filter: 'blur(3.5px)'
          }}
        />

        {/* Floor Overlay to fade reflection and look shiny */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#040008]/40 to-[#020004]" />
      </div>
        </>
        )}
    </div>
  );
}
