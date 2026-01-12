
import React from 'react';
import { AppConfig } from '../types';
import AppIcon from './AppIcon';

interface DesktopIconProps {
  app: AppConfig;
  onDoubleClick: () => void;
}

const DesktopIcon: React.FC<DesktopIconProps> = ({ app, onDoubleClick }) => {
  return (
    <div 
      className="flex flex-col items-center gap-1 w-20 p-2 rounded hover:bg-white hover:bg-opacity-10 transition-all cursor-default select-none border border-transparent hover:border-white hover:border-opacity-20 group"
      onDoubleClick={onDoubleClick}
    >
      <div className="w-12 h-12 flex items-center justify-center transition-transform group-active:scale-90">
        <AppIcon type={app.id} size="lg" className="drop-shadow-lg" />
      </div>
      <span className="text-[11px] text-white text-center drop-shadow-md leading-tight px-1 font-medium group-hover:drop-shadow-none">
        {app.name}
      </span>
    </div>
  );
};

export default DesktopIcon;
