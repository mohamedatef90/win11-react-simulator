
import React, { useState, useRef, useEffect } from 'react';
import { X, Minus, Square, Copy } from 'lucide-react';
import { WindowState } from '../types';
import AppIcon from './AppIcon';

interface WindowProps {
  window: WindowState;
  isActive: boolean;
  onClose: () => void;
  onMaximize: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  children: React.ReactNode;
}

const Window: React.FC<WindowProps> = ({ 
  window, 
  isActive, 
  onClose, 
  onMaximize, 
  onMinimize, 
  onFocus, 
  children 
}) => {
  const [pos, setPos] = useState({ x: 100 + (parseInt(window.id.split('-')[1]) % 200), y: 100 + (parseInt(window.id.split('-')[1]) % 100) });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    onFocus();
    setDragging(true);
    setRel({
      x: e.pageX - pos.x,
      y: e.pageY - pos.y
    });
    e.stopPropagation();
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      setPos({
        x: e.pageX - rel.x,
        y: e.pageY - rel.y
      });
    };
    const onMouseUp = () => setDragging(false);

    if (dragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging, rel]);

  if (window.isMinimized) return null;

  const style: React.CSSProperties = window.isMaximized ? {
    top: 0,
    left: 0,
    width: '100vw',
    height: 'calc(100vh - 48px)',
    zIndex: window.zIndex,
  } : {
    top: pos.y,
    left: pos.x,
    width: '800px',
    height: '600px',
    zIndex: window.zIndex,
  };

  return (
    <div 
      ref={windowRef}
      className={`absolute glass rounded-lg overflow-hidden flex flex-col window-shadow transition-shadow duration-300 border border-white border-opacity-10
        ${isActive ? 'shadow-2xl' : 'shadow-lg opacity-95'}`}
      style={style}
      onMouseDown={onFocus}
    >
      {/* Title Bar */}
      <div 
        className={`h-9 flex items-center justify-between px-3 select-none transition-colors
          ${isActive ? 'bg-white bg-opacity-10' : 'bg-transparent'}`}
        onMouseDown={onMouseDown}
        onDoubleClick={onMaximize}
      >
        <div className="flex items-center gap-2">
          <AppIcon type={window.type} size="sm" />
          <span className="text-xs text-white font-medium">{window.title}</span>
        </div>
        
        <div className="flex items-center h-full">
          <button 
            className="h-full px-4 hover:bg-white hover:bg-opacity-10 transition-colors text-white"
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
          >
            <Minus className="w-4 h-4" />
          </button>
          <button 
            className="h-full px-4 hover:bg-white hover:bg-opacity-10 transition-colors text-white"
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
          >
            {window.isMaximized ? <Copy className="w-3 h-3" /> : <Square className="w-3 h-3" />}
          </button>
          <button 
            className="h-full px-4 hover:bg-red-500 transition-colors text-white group"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
          >
            <X className="w-4 h-4 group-hover:scale-110" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-black bg-opacity-20 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Window;
