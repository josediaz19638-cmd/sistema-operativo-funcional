import { useState } from 'react';
import { Folder, File, ArrowLeft, ArrowRight, ArrowUp, Search, Home, Download, Music, Image, Video, FileText } from 'lucide-react';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  size?: string;
  modified: string;
  icon: React.ReactNode;
}

const rootFiles: Record<string, FileItem[]> = {
  'C:\\Users\\User': [
    { name: 'Documents', type: 'folder', modified: '05/15/2026', icon: <Folder className="w-4 h-4 text-purple-300" /> },
    { name: 'Downloads', type: 'folder', modified: '05/18/2026', icon: <Folder className="w-4 h-4 text-purple-300" /> },
    { name: 'Pictures', type: 'folder', modified: '05/10/2026', icon: <Folder className="w-4 h-4 text-purple-300" /> },
    { name: 'Music', type: 'folder', modified: '05/12/2026', icon: <Folder className="w-4 h-4 text-purple-300" /> },
    { name: 'Videos', type: 'folder', modified: '05/14/2026', icon: <Folder className="w-4 h-4 text-purple-300" /> },
  ],
  'C:\\Users\\User\\Documents': [
    { name: 'reporte.pdf', type: 'file', size: '2.4 MB', modified: '05/19/2026', icon: <FileText className="w-4 h-4 text-pink-400" /> },
    { name: 'notas.txt', type: 'file', size: '12 KB', modified: '05/20/2026', icon: <File className="w-4 h-4 text-purple-300" /> },
    { name: 'Trabajo', type: 'folder', modified: '05/15/2026', icon: <Folder className="w-4 h-4 text-purple-300" /> },
  ],
  'C:\\Users\\User\\Downloads': [
    { name: 'instalador.exe', type: 'file', size: '45.2 MB', modified: '05/18/2026', icon: <File className="w-4 h-4 text-slate-300" /> },
    { name: 'foto_paisaje.jpg', type: 'file', size: '3.1 MB', modified: '05/17/2026', icon: <Image className="w-4 h-4 text-blue-300" /> },
  ],
  'C:\\Users\\User\\Pictures': [
    { name: 'vacaciones.jpg', type: 'file', size: '4.2 MB', modified: '05/10/2026', icon: <Image className="w-4 h-4 text-blue-300" /> },
    { name: 'familia.png', type: 'file', size: '2.8 MB', modified: '05/11/2026', icon: <Image className="w-4 h-4 text-blue-300" /> },
  ],
  'C:\\Users\\User\\Music': [
    { name: 'musica_neon.mp3', type: 'file', size: '5.6 MB', modified: '05/12/2026', icon: <Music className="w-4 h-4 text-pink-400" /> },
  ],
  'C:\\Users\\User\\Videos': [
    { name: 'bucle_futurista.mp4', type: 'file', size: '125.3 MB', modified: '05/14/2026', icon: <Video className="w-4 h-4 text-purple-400" /> },
  ],
};

export function FileExplorer() {
  const [currentPath, setCurrentPath] = useState('C:\\Users\\User');
  const [history, setHistory] = useState<string[]>(['C:\\Users\\User']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentFiles = rootFiles[currentPath] || [];

  const navigate = (newPath: string) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newPath];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCurrentPath(newPath);
    setSelectedItem(null);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
    }
  };

  const handleUp = () => {
    const parts = currentPath.split('\\');
    if (parts.length > 1) {
      parts.pop();
      const parentPath = parts.join('\\') || 'C:\\';
      navigate(parentPath);
    }
  };

  const handleItemClick = (item: FileItem) => {
    setSelectedItem(item.name);
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      const newPath = `${currentPath}\\${item.name}`;
      if (rootFiles[newPath]) {
        navigate(newPath);
      }
    } else {
      alert(`Abriendo archivo: ${item.name}...`);
    }
  };

  const filteredFiles = currentFiles.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-[#0f0724]/20 text-slate-200 select-none font-sans">
      {/* Navigation Bar */}
      <div className="border-b border-white/5 bg-black/20 p-2 flex items-center gap-2">
        <button
          onClick={handleBack}
          disabled={historyIndex === 0}
          className="p-1.5 hover:bg-white/5 text-slate-400 hover:text-white rounded-lg disabled:opacity-20 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button
          onClick={handleForward}
          disabled={historyIndex === history.length - 1}
          className="p-1.5 hover:bg-white/5 text-slate-400 hover:text-white rounded-lg disabled:opacity-20 cursor-pointer transition-colors"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
        <button
          onClick={handleUp}
          className="p-1.5 hover:bg-white/5 text-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        {/* Address Bar */}
        <div className="flex-1 flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full">
          <Home className="w-3.5 h-3.5 text-purple-300" />
          <input
            type="text"
            value={currentPath}
            readOnly
            className="flex-1 outline-none text-xs text-white bg-transparent"
          />
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-full w-56">
          <Search className="w-3.5 h-3.5 text-purple-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar archivos..."
            className="flex-1 outline-none text-xs text-white bg-transparent placeholder-purple-300/30"
          />
        </div>
      </div>

      {/* Quick Access Sidebar & List */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-44 border-r border-white/5 bg-black/10 p-2 flex flex-col gap-0.5">
          <div className="text-[9px] font-bold text-purple-300 tracking-wider uppercase mb-2 px-2">Acceso Rápido</div>
          <button
            onClick={() => navigate('C:\\Users\\User')}
            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer ${
              currentPath === 'C:\\Users\\User' ? 'bg-purple-600/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Inicio
          </button>
          <button
            onClick={() => navigate('C:\\Users\\User\\Downloads')}
            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer ${
              currentPath === 'C:\\Users\\User\\Downloads' ? 'bg-purple-600/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            Descargas
          </button>
          <button
            onClick={() => navigate('C:\\Users\\User\\Documents')}
            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer ${
              currentPath === 'C:\\Users\\User\\Documents' ? 'bg-purple-600/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            Documentos
          </button>
          <button
            onClick={() => navigate('C:\\Users\\User\\Pictures')}
            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center gap-2 transition-colors cursor-pointer ${
              currentPath === 'C:\\Users\\User\\Pictures' ? 'bg-purple-600/20 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Image className="w-3.5 h-3.5" />
            Imágenes
          </button>
        </div>

        {/* File Grid / List */}
        <div className="flex-1 overflow-auto p-4 bg-black/5">
          <table className="w-full text-xs">
            <thead className="border-b border-white/5 text-purple-300">
              <tr className="text-left">
                <th className="pb-2 px-2 font-semibold">Nombre</th>
                <th className="pb-2 px-2 font-semibold">Modificado</th>
                <th className="pb-2 px-2 font-semibold">Tipo</th>
                <th className="pb-2 px-2 font-semibold">Tamaño</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredFiles.map((item, index) => (
                <tr
                  key={index}
                  onClick={() => handleItemClick(item)}
                  onDoubleClick={() => handleItemDoubleClick(item)}
                  className={`cursor-pointer hover:bg-white/5 transition-colors border-l-2 ${
                    selectedItem === item.name 
                      ? 'bg-purple-600/15 border-purple-500 text-white' 
                      : 'border-transparent text-slate-300'
                  }`}
                >
                  <td className="py-2 px-2 flex items-center gap-2">
                    {item.icon}
                    <span>{item.name}</span>
                  </td>
                  <td className="py-2 px-2 opacity-80">{item.modified}</td>
                  <td className="py-2 px-2 capitalize opacity-80">{item.type === 'folder' ? 'Carpeta' : 'Archivo'}</td>
                  <td className="py-2 px-2 opacity-80">{item.size || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredFiles.length === 0 && (
            <div className="text-center py-16 text-slate-500">
              <Folder className="w-12 h-12 mx-auto mb-3 opacity-20 text-purple-400" />
              <p className="text-xs">Carpeta vacía</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="border-t border-white/5 bg-black/20 px-3 py-1 text-[10px] text-slate-400 font-mono">
        {filteredFiles.length} elementos
      </div>
    </div>
  );
}
