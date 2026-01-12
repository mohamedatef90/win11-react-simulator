
import React from 'react';
import { Search } from 'lucide-react';
import { PINNED_APPS } from '../constants';
import { AppType } from '../types';

interface StartMenuProps {
  onClose: () => void;
  onAppClick: (type: AppType) => void;
}

const StartMenu: React.FC<StartMenuProps> = ({ onClose, onAppClick }) => {
  return (
    <div 
      className="absolute bottom-16 left-1/2 -translate-x-1/2 w-[540px] h-[600px] glass rounded-xl shadow-2xl p-8 flex flex-col gap-6 animate-in slide-in-from-bottom-8 duration-300"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search for apps, settings, and documents"
          className="w-full bg-black bg-opacity-20 border-b border-white border-opacity-10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-400 transition-colors"
        />
      </div>

      {/* Pinned Section */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-white">Pinned</h3>
          <button className="text-[11px] bg-white bg-opacity-10 hover:bg-opacity-20 px-3 py-1 rounded transition-colors text-white">All apps &gt;</button>
        </div>
        <div className="grid grid-cols-6 gap-y-6">
          {PINNED_APPS.map((app: any, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center gap-2 group cursor-default"
              onClick={() => onAppClick(app.type)}
            >
              <div className="p-3 w-12 h-12 flex items-center justify-center rounded-lg group-hover:bg-white group-hover:bg-opacity-10 transition-all duration-200">
                {app.icon}
              </div>
              <span className="text-[11px] text-white text-center">{app.name}</span>
            </div>
          ))}
        </div>

        {/* Recommended Section */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Recommended</h3>
            <button className="text-[11px] bg-white bg-opacity-10 hover:bg-opacity-20 px-3 py-1 rounded transition-colors text-white">More &gt;</button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div 
              className="flex items-center gap-3 p-2 rounded hover:bg-white hover:bg-opacity-10 cursor-default transition-colors"
              onClick={() => onAppClick(AppType.GEMINI)}
            >
              <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white">G</div>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-white">Gemini AI Assistant</span>
                <span className="text-[10px] text-gray-400">Recently added</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded hover:bg-white hover:bg-opacity-10 cursor-default transition-colors">
              <div className="w-8 h-8 rounded bg-green-500 flex items-center justify-center text-white font-bold text-xs">N</div>
              <div className="flex flex-col">
                <span className="text-[12px] font-semibold text-white">Notepad_Draft.txt</span>
                <span className="text-[10px] text-gray-400">2h ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-white border-opacity-5 flex items-center justify-between">
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 cursor-default transition-colors">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">JD</div>
          <span className="text-sm text-white">John Doe</span>
        </div>
        <div className="p-2 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white hover:bg-opacity-10 cursor-default transition-colors">
          <i className="fa-solid fa-power-off text-gray-200 text-sm"></i>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
