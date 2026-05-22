import { useState } from 'react';
import { Save, FileText, Undo, Redo } from 'lucide-react';

export function Notepad() {
  const [text, setText] = useState('');
  const [filename, setFilename] = useState('Sin_titulo.txt');
  const [isSaved, setIsSaved] = useState(true);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    setIsSaved(false);
  };

  const handleSave = () => {
    setIsSaved(true);
    alert(`¡Archivo "${filename}" guardado con éxito!`);
  };

  const handleNew = () => {
    if (!isSaved && text && !confirm('¿Quieres guardar los cambios?')) {
      return;
    }
    setText('');
    setFilename('Sin_titulo.txt');
    setIsSaved(true);
  };

  return (
    <div className="h-full flex flex-col bg-[#0f0724]/30 text-slate-100 font-sans select-none">
      {/* Menu Bar */}
      <div className="border-b border-white/5 bg-black/20 px-2 py-1 flex items-center gap-3">
        <button
          onClick={handleNew}
          className="px-2.5 py-1 hover:bg-white/5 text-xs text-slate-300 hover:text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <FileText className="w-3.5 h-3.5 text-purple-300" />
          Nuevo
        </button>
        <button
          onClick={handleSave}
          className={`px-2.5 py-1 hover:bg-white/5 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
            isSaved ? 'text-slate-500 hover:text-slate-400' : 'text-pink-300 hover:text-pink-200'
          }`}
          disabled={isSaved}
        >
          <Save className="w-3.5 h-3.5" />
          Guardar {!isSaved && '*'}
        </button>
        <div className="border-l border-white/5 h-4 mx-1" />
        <button className="px-2.5 py-1 hover:bg-white/5 text-xs text-slate-300 hover:text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer">
          <Undo className="w-3.5 h-3.5" />
          Deshacer
        </button>
        <button className="px-2.5 py-1 hover:bg-white/5 text-xs text-slate-300 hover:text-white rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer">
          <Redo className="w-3.5 h-3.5" />
          Rehacer
        </button>
      </div>

      {/* Filename bar */}
      <div className="px-3 py-1.5 bg-black/35 border-b border-white/5 flex items-center gap-2">
        <span className="text-xs font-semibold text-purple-300">Archivo:</span>
        <input
          type="text"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          className="px-2 py-0.5 bg-white/5 border border-white/10 rounded-md text-xs text-white flex-1 max-w-xs focus:border-purple-500/50 outline-none transition-colors"
        />
      </div>

      {/* Text Editor */}
      <textarea
        value={text}
        onChange={handleTextChange}
        className="flex-1 p-4 font-mono text-xs bg-transparent border-none text-slate-100 placeholder-purple-300/25 resize-none outline-none leading-relaxed"
        placeholder="Comienza a escribir aquí..."
        spellCheck={false}
      />

      {/* Status Bar */}
      <div className="border-t border-white/5 bg-black/35 px-3 py-1 text-[10px] text-slate-400 flex items-center justify-between font-mono">
        <span>Caracteres: {text.length}</span>
        <span>Líneas: {text.split('\n').length}</span>
        <span className={isSaved ? "text-purple-400 font-bold" : "text-pink-400 font-bold"}>
          {isSaved ? 'Guardado' : 'Modificado'}
        </span>
      </div>
    </div>
  );
}
