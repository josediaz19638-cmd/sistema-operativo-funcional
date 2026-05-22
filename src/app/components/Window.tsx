import { useState, useRef, useEffect } from 'react';
import { X, Minimize, Maximize2, Minimize2 } from 'lucide-react';

interface WindowProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClose: () => void;
  onMinimize?: () => void;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  zIndex: number;
  onFocus: () => void;
  isActive?: boolean;
}

export function Window({
  title,
  icon,
  children,
  onClose,
  onMinimize,
  initialPosition = { x: 100, y: 100 },
  initialSize = { width: 800, height: 600 },
  zIndex,
  onFocus,
  isActive = false
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [savedState, setSavedState] = useState({ position: initialPosition, size: initialSize });

  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        // Evitar que la ventana salga por la parte superior
        setPosition({
          x: e.clientX - dragStart.x,
          y: Math.max(0, e.clientY - dragStart.y)
        });
      } else if (isResizing) {
        const newWidth = Math.max(400, resizeStart.width + (e.clientX - resizeStart.x));
        const newHeight = Math.max(300, resizeStart.height + (e.clientY - resizeStart.y));
        setSize({ width: newWidth, height: newHeight });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, isResizing, dragStart, resizeStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.window-controls')) return;
    onFocus();
    setIsDragging(true);
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFocus();
    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height
    });
  };

  const handleMaximize = () => {
    if (isMaximized) {
      setPosition(savedState.position);
      setSize(savedState.size);
    } else {
      setSavedState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 70 });
    }
    setIsMaximized(!isMaximized);
  };

  return (
    <div
      ref={windowRef}
      className={`absolute flex flex-col overflow-hidden rounded-xl transition-shadow duration-300 backdrop-blur-xl border ${
        isActive 
          ? 'bg-slate-950/80 border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.3)]' 
          : 'bg-slate-950/65 border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex
      }}
      onClick={onFocus}
    >
      {/* Window Glow Border Highlight */}
      {isActive && (
        <div className="absolute inset-x-0 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-85 z-50 pointer-events-none" />
      )}

      {/* Title Bar (Glassmorphic dark header) */}
      <div
        className={`px-3 py-2 flex items-center justify-between cursor-move select-none border-b transition-colors duration-300 ${
          isActive 
            ? 'bg-purple-950/20 border-white/10 text-white' 
            : 'bg-black/10 border-white/5 text-slate-400'
        }`}
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          {icon && <div className="w-4 h-4 text-purple-300">{icon}</div>}
          <span className="text-xs font-semibold tracking-wider font-sans select-none">{title}</span>
        </div>
        
        {/* Controls */}
        <div className="window-controls flex items-center gap-1.5 z-10">
          {onMinimize && (
            <button
              onClick={(e) => { e.stopPropagation(); onMinimize(); }}
              className="hover:bg-white/10 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
              title="Minimizar"
            >
              <Minimize className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); handleMaximize(); }}
            className="hover:bg-white/10 text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            title={isMaximized ? "Restaurar" : "Maximizar"}
          >
            {isMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="hover:bg-red-500/80 hover:text-white text-slate-400 p-1 rounded-lg transition-colors cursor-pointer"
            title="Cerrar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto bg-[#0a0414]/40 text-slate-100 relative">
        {children}
      </div>

      {/* Resize Handle (only bottom-right corner) */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize z-50"
          onMouseDown={handleResizeMouseDown}
        >
          <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-r border-b border-purple-500/30 group-hover:border-purple-400 transition-colors" />
        </div>
      )}
    </div>
  );
}
