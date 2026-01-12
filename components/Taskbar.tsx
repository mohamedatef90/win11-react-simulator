
import React from 'react';
import { AppType, WindowState } from '../types';
import { 
  Search, 
  LayoutGrid, 
  MessageSquare, 
  Wifi, 
  Volume2, 
  Battery, 
  ChevronUp,
  CloudSun
} from 'lucide-react';
import AppIcon from './AppIcon';
import { APPS } from '../constants';

interface TaskbarProps {
  openWindows: WindowState[];
  activeWindowId: string | null;
  onStartClick: () => void;
  onAppClick: (type: AppType) => void;
  onWindowIconClick: (id: string) => void;
  currentTime: Date;
}

const TaskbarIcon: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  isActive?: boolean;
  isOpen?: boolean;
  tooltip?: string;
}> = ({ children, onClick, isActive, isOpen, tooltip }) => (
  <div 
    className={`relative group flex items-center justify-center w-10 h-10 rounded transition-all duration-200 cursor-default
      ${isActive ? 'bg-white bg-opacity-20 shadow-inner' : 'hover:bg-white hover:bg-opacity-10 active:scale-90'}`}
    onClick={onClick}
    title={tooltip}
  >
    {children}
    {isOpen && (
      <div className={`absolute bottom-0 h-[3px] rounded-full bg-blue-400 transition-all duration-300
        ${isActive ? 'w-4' : 'w-1.5'}`} 
      />
    )}
  </div>
);

const Taskbar: React.FC<TaskbarProps> = ({ 
  openWindows, 
  activeWindowId, 
  onStartClick, 
  onAppClick,
  onWindowIconClick,
  currentTime 
}) => {
  const isAppOpen = (type: AppType) => openWindows.some(w => w.type === type);
  const isAppActive = (type: AppType) => {
    const activeWin = openWindows.find(w => w.id === activeWindowId);
    return activeWin?.type === type;
  };
  const getAppId = (type: AppType) => openWindows.find(w => w.type === type)?.id;

  const getAppName = (type: AppType) => {
    const app = APPS.find(a => a.id === type);
    if (app) return app.name;
    return type.toLowerCase().split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const handlePinnedClick = (type: AppType) => {
    if (isAppOpen(type)) {
      const id = getAppId(type);
      if (id) onWindowIconClick(id);
    } else {
      onAppClick(type);
    }
  };

  return (
    <div className="absolute bottom-0 w-full h-12 glass flex items-center px-4 z-[1000] border-t border-white border-opacity-10">
      {/* Left side: Weather */}
      <div className="flex-1 flex items-center gap-2">
         <div className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white hover:bg-opacity-10 cursor-default transition-colors text-white text-xs font-medium">
            <CloudSun className="w-4 h-4 text-yellow-400" />
            <span>22°C</span>
         </div>
      </div>

      {/* Center Icons */}
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-xl">
        <TaskbarIcon onClick={onStartClick} tooltip="Start">
          <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Windows_logo_-_2021.svg" alt="Start" className="w-6 h-6 hover:scale-110 transition-transform" />
        </TaskbarIcon>
        
        <TaskbarIcon tooltip="Search">
          <Search className="w-5 h-5 text-gray-500" />
        </TaskbarIcon>

        <TaskbarIcon tooltip="Task View">
          <LayoutGrid className="w-5 h-5 text-gray-500" />
        </TaskbarIcon>

        <TaskbarIcon tooltip="Widgets">
          <LayoutGrid className="w-5 h-5 text-blue-400" />
        </TaskbarIcon>

        <TaskbarIcon tooltip="Chat">
          <MessageSquare className="w-5 h-5 text-gray-500" />
        </TaskbarIcon>

        <div className="w-px h-6 bg-white bg-opacity-10 mx-1" />

        {/* Pinned Taskbar Icons */}
        {[AppType.WORD, AppType.WHATSAPP, AppType.FILE_EXPLORER, AppType.BROWSER].map(type => (
          <TaskbarIcon 
            key={type}
            onClick={() => handlePinnedClick(type)} 
            tooltip={getAppName(type)}
            isOpen={isAppOpen(type)}
            isActive={isAppActive(type)}
          >
            <AppIcon type={type} />
          </TaskbarIcon>
        ))}

        {/* Dynamic App Icons for other open windows */}
        {openWindows.filter(w => ![AppType.WORD, AppType.WHATSAPP, AppType.FILE_EXPLORER, AppType.BROWSER].includes(w.type)).map(window => (
          <TaskbarIcon 
            key={window.id}
            isOpen={true}
            isActive={activeWindowId === window.id}
            onClick={() => onWindowIconClick(window.id)}
            tooltip={window.title}
          >
            <AppIcon type={window.type} />
          </TaskbarIcon>
        ))}
      </div>

      {/* Right side System Tray */}
      <div className="flex-1 flex items-center justify-end gap-1">
        <div className="flex items-center gap-1 px-2 py-1.5 rounded hover:bg-white hover:bg-opacity-10 cursor-default transition-colors">
          <ChevronUp className="w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex items-center gap-2.5 px-3 py-1.5 rounded hover:bg-white hover:bg-opacity-10 cursor-default transition-colors text-gray-800">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>

        <div className="flex flex-col items-end px-3 py-1 rounded hover:bg-white hover:bg-opacity-10 cursor-default transition-colors text-gray-800">
          <span className="text-[11px] font-bold">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <span className="text-[10px]">
            {currentTime.toLocaleDateString([], { month: 'numeric', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <div className="w-px h-full border-l border-white border-opacity-10 ml-1" />
      </div>
    </div>
  );
};

export default Taskbar;
