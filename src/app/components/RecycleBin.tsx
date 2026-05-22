import { useState } from 'react';
import { Trash2, File, Image, FileText, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TrashItem {
  name: string;
  type: 'file' | 'image' | 'text';
  size: string;
  deletedDate: string;
}

export function RecycleBin() {
  const [items, setItems] = useState<TrashItem[]>([
    { name: 'foto_antigua.jpg', type: 'image', size: '2.1 MB', deletedDate: '22/05/2026' },
    { name: 'documento_viejo.docx', type: 'text', size: '320 KB', deletedDate: '21/05/2026' },
    { name: 'temporal_temp.log', type: 'file', size: '4 KB', deletedDate: '20/05/2026' },
  ]);

  const handleEmpty = () => {
    if (items.length === 0) return;
    if (confirm('¿Estás seguro de que deseas vaciar la Papelera de Reciclaje permanentemente?')) {
      setItems([]);
      // Efecto divertido ya que canvas-confetti está en package.json
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#a855f7', '#ec4899', '#3b82f6']
      });
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image className="w-4 h-4 text-blue-400" />;
      case 'text': return <FileText className="w-4 h-4 text-pink-400" />;
      default: return <File className="w-4 h-4 text-slate-400" />;
    }
  };

  const totalSize = items.reduce((acc, item) => {
    if (item.size.includes('MB')) acc += parseFloat(item.size) * 1024;
    else acc += parseFloat(item.size);
    return acc;
  }, 0);

  return (
    <div className="h-full flex flex-col bg-[#0b051a]/95 text-slate-200 select-none p-4 font-sans">
      {/* Top action bar */}
      <div className="flex justify-between items-center bg-black/20 border border-white/5 rounded-xl p-3 mb-4">
        <div className="flex items-center gap-2">
          <Trash2 className="w-5 h-5 text-purple-400" />
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Papelera de Reciclaje</h3>
            <span className="text-[10px] text-slate-400">
              {items.length === 0 ? 'Vacía' : `${items.length} elementos (${(totalSize/1024).toFixed(2)} MB)`}
            </span>
          </div>
        </div>
        
        {items.length > 0 && (
          <button
            onClick={handleEmpty}
            className="px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-xs font-semibold cursor-pointer active:scale-95 transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)]"
          >
            Vaciar Papelera
          </button>
        )}
      </div>

      {/* Deleted files list */}
      <div className="flex-1 bg-black/10 border border-white/5 rounded-xl overflow-y-auto no-scrollbar p-3">
        {items.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2">
            <Trash2 className="w-10 h-10 opacity-20 text-purple-400" />
            <span className="text-xs">La papelera está vacía</span>
          </div>
        ) : (
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-purple-300 border-b border-white/5 pb-2">
                <th className="pb-2 px-2 font-semibold">Nombre</th>
                <th className="pb-2 px-2 font-semibold">Tamaño</th>
                <th className="pb-2 px-2 font-semibold">Fecha de Eliminación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {items.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/5 transition-colors group">
                  <td className="py-2 px-2 flex items-center gap-2 text-slate-300 group-hover:text-white">
                    {getIcon(item.type)}
                    <span>{item.name}</span>
                  </td>
                  <td className="py-2 px-2 text-slate-400">{item.size}</td>
                  <td className="py-2 px-2 text-slate-400">{item.deletedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Info footer */}
      <div className="mt-4 p-3 bg-white/5 border border-white/5 rounded-xl flex gap-3 items-center">
        <AlertCircle className="w-5 h-5 text-purple-400/80 flex-shrink-0" />
        <span className="text-[10px] text-slate-400 leading-relaxed">
          Los elementos eliminados se almacenan temporalmente aquí. Vaciar la papelera los borrará del almacenamiento simulado de NeonOS.
        </span>
      </div>
    </div>
  );
}
