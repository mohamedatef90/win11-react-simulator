
import React, { useState } from 'react';
import { RefreshCw, ChevronLeft, ChevronRight, Lock, Search } from 'lucide-react';

const BrowserApp: React.FC = () => {
  const [url, setUrl] = useState('https://www.google.com/search?igu=1');
  const [input, setInput] = useState('https://www.bing.com');

  return (
    <div className="flex flex-col h-full bg-[#f3f3f3] text-black">
      {/* Toolbar */}
      <div className="bg-white px-2 py-1.5 flex items-center gap-3 border-b border-gray-300">
        <div className="flex gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft className="w-4 h-4 text-gray-400" /></button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight className="w-4 h-4 text-gray-400" /></button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><RefreshCw className="w-4 h-4" /></button>
        </div>
        
        <div className="flex-1 relative flex items-center group">
          <div className="absolute left-3 flex items-center gap-2">
            <Lock className="w-3 h-3 text-green-600" />
          </div>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full bg-gray-100 border border-gray-200 rounded-full py-1 pl-10 pr-4 text-xs focus:outline-none focus:bg-white focus:border-blue-500 transition-all"
          />
        </div>

        <div className="flex gap-1">
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><User className="w-4 h-4" /></button>
          <button className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"><Search className="w-4 h-4" /></button>
        </div>
      </div>

      {/* Page Content */}
      <div className="flex-1 relative bg-white">
        <iframe 
          src={url} 
          className="w-full h-full border-none"
          title="Browser View"
        />
        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-gray-50 opacity-10">
           {/* Decorative background if iframe is blocked by CSP */}
        </div>
      </div>
    </div>
  );
};

const User: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

export default BrowserApp;
