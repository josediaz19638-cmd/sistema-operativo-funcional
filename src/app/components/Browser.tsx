import { useState } from 'react';
import { Search, ExternalLink, Globe, RotateCw } from 'lucide-react';

// Sitios que SÍ se pueden ver en iframe
const SITIOS_VISIBLES = [
  'lite.duckduckgo.com',
  'en.m.wikipedia.org', 
  'es.m.wikipedia.org',
  'archive.org',
  'news.ycombinator.com',
  'codepen.io',
  'ipchicken.com',
  'whatsmyip.org',
];

export function Browser() {
  const [input, setInput] = useState('');
  const [modo, setModo] = useState<'inicio' | 'visor' | 'error'>('inicio');
  const [urlActual, setUrlActual] = useState('');
  const [cargando, setCargando] = useState(false);
  const [pagina, setPagina] = useState(0);

  const sePuedeVer = (url: string) => SITIOS_VISIBLES.some(s => url.includes(s));

  const abrir = (url: string) => {
    setUrlActual(url);
    setInput(url);
    
    if (sePuedeVer(url)) {
      setModo('visor');
      setCargando(true);
      setTimeout(() => setCargando(false), 1000);
    } else {
      setModo('error');
    }
  };

  const buscarEnBing = () => {
    if (!input.trim()) return;
    window.open(`https://www.bing.com/search?q=${encodeURIComponent(input.trim())}`, '_blank');
  };

  const manejarSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const texto = input.trim();
    if (!texto) return;

    // Detectar si es URL
    if (texto.includes('.') && !texto.includes(' ')) {
      let url = texto;
      if (!url.startsWith('http')) url = 'https://' + url;
      abrir(url);
    } else {
      // Buscar en Bing (abre externa)
      buscarEnBing();
    }
  };

  const sitios = [
    { nombre: 'DuckDuckGo Lite', url: 'https://lite.duckduckgo.com', icono: '🦆' },
    { nombre: 'Wikipedia', url: 'https://en.m.wikipedia.org', icono: '📚' },
    { nombre: 'Wikipedia ES', url: 'https://es.m.wikipedia.org', icono: '📖' },
    { nombre: 'Archive.org', url: 'https://archive.org', icono: '🏛️' },
    { nombre: 'Hacker News', url: 'https://news.ycombinator.com', icono: '📰' },
  ];

  return (
    <div className="h-full flex flex-col bg-white select-none">
      {/* BARRA SIMPLE */}
      <div className="bg-[#0d071e] p-2 flex items-center gap-2 border-b border-white/10">
        {/* Indicador modo */}
        <div className="flex items-center gap-1">
          <Globe className="w-4 h-4 text-purple-300" />
          {modo === 'visor' && (
            <button onClick={() => setModo('inicio')} className="text-[10px] text-purple-300 hover:text-white px-1.5 py-0.5 hover:bg-white/10 rounded cursor-pointer">
              ← Inicio
            </button>
          )}
        </div>

        {/* Barra URL/Búsqueda */}
        <form onSubmit={manejarSubmit} className="flex-1">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/40 border border-white/10 rounded-full focus-within:border-purple-500/50">
            <Search className="w-3.5 h-3.5 text-purple-400/60 flex-shrink-0" />
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 outline-none text-xs bg-transparent text-purple-100 placeholder-purple-300/40"
              placeholder="URL o búsqueda (abre en externa)..."
            />
          </div>
        </form>

        {/* Botón buscar en Bing */}
        <button
          onClick={buscarEnBing}
          className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-[10px] rounded-lg transition-colors cursor-pointer flex items-center gap-1"
          title="Buscar en Bing"
        >
          <Search className="w-3 h-3" />
          Bing
        </button>

        {/* Abrir externa */}
        {urlActual && (
          <button
            onClick={() => window.open(urlActual, '_blank')}
            className="p-1.5 hover:bg-white/10 rounded-lg text-purple-300 cursor-pointer"
            title="Abrir en ventana externa"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* CONTENIDO */}
      <div className="flex-1 relative overflow-hidden">

        {/* Cargando */}
        {cargando && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 z-10">
            <RotateCw className="w-8 h-8 animate-spin text-purple-500" />
          </div>
        )}

        {/* INICIO */}
        {modo === 'inicio' && (
          <div className="h-full overflow-auto p-6">
            <div className="max-w-xl mx-auto">
              <div className="text-center mb-6">
                <div className="w-20 h-20 mx-auto mb-3 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img src="/icons/seros.png" alt="SerOS" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-lg font-bold text-gray-800">SerOS - Navegador</h2>
                <p className="text-xs text-gray-500 mt-1">
                  Escribe una URL arriba o busca en Bing 📎
                </p>
              </div>

              <div className="mb-4">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-2">Sitios que puedes ver aquí:</p>
                <div className="grid grid-cols-2 gap-2">
                  {sitios.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInput(s.url);
                        abrir(s.url);
                      }}
                      className="flex items-center gap-2 p-3 bg-gray-50 hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-xl text-left transition-all cursor-pointer text-xs"
                    >
                      <span className="text-lg">{s.icono}</span>
                      <span className="font-medium text-gray-700">{s.nombre}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-[10px] text-amber-800">
                ⚠️ La mayoría de sitios (Google, YouTube, etc.) no se pueden mostrar aquí por seguridad. 
                Se abrirán en tu navegador real al buscar.
              </div>
            </div>
          </div>
        )}

        {/* VISOR */}
        {modo === 'visor' && !cargando && (
          <div className="h-full flex flex-col">
            <iframe
              key={urlActual}
              src={urlActual}
              className="flex-1 w-full border-none"
              title="Visor"
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
            <div className="bg-[#0d071e]/80 text-[10px] text-purple-300/60 px-3 py-1 border-t border-white/5 flex justify-between">
              <span className="truncate max-w-[70%]">{urlActual}</span>
              <span className="text-green-400">✅ Visible</span>
            </div>
          </div>
        )}

        {/* ERROR */}
        {modo === 'error' && (
          <div className="h-full flex items-center justify-center p-6">
            <div className="text-center max-w-sm">
              <Globe className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <h3 className="text-sm font-bold text-gray-700 mb-2">No se puede mostrar aquí</h3>
              <p className="text-[11px] text-gray-500 mb-4">
                "{urlActual}" no permite ser visto dentro del navegador integrado.
                Es una restricción de seguridad del sitio.
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => window.open(urlActual, '_blank')}
                  className="px-4 py-2 bg-purple-600 text-white text-xs rounded-lg hover:bg-purple-700 cursor-pointer"
                >
                  Abrir en externa
                </button>
                <button
                  onClick={() => setModo('inicio')}
                  className="px-4 py-2 border border-gray-300 text-gray-600 text-xs rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  Volver
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}