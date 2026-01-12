
import React, { useState, useCallback, useEffect } from 'react';
import Taskbar from './components/Taskbar';
import StartMenu from './components/StartMenu';
import DesktopIcon from './components/DesktopIcon';
import Window from './components/Window';
import LockScreen from './components/LockScreen';
import GeminiApp from './components/apps/GeminiApp';
import BrowserApp from './components/apps/BrowserApp';
import SettingsApp from './components/apps/SettingsApp';
import SecureConnectApp from './components/apps/SecureConnectApp';
import { AppType, WindowState } from './types';
import { APPS, INITIAL_Z_INDEX } from './constants';

const App: React.FC = () => {
  const [openWindows, setOpenWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(true); // Always start locked
  const [maxZIndex, setMaxZIndex] = useState(INITIAL_Z_INDEX);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const openApp = useCallback((type: AppType) => {
    if (type === AppType.LOCK_SCREEN) {
      setIsLocked(true);
      setIsStartOpen(false);
      return;
    }

    const existing = openWindows.find(w => w.type === type);
    if (existing) {
      if (existing.isMinimized) {
        toggleMinimize(existing.id);
      }
      focusWindow(existing.id);
      setIsStartOpen(false);
      return;
    }

    const appConfig = APPS.find(a => a.id === type);
    if (!appConfig) return;

    const newId = `${type}-${Date.now()}`;
    const newWindow: WindowState = {
      id: newId,
      title: appConfig.name,
      isOpen: true,
      isMaximized: false,
      isMinimized: false,
      zIndex: maxZIndex + 1,
      icon: appConfig.icon,
      type: type
    };

    setOpenWindows(prev => [...prev, newWindow]);
    setMaxZIndex(prev => prev + 1);
    setActiveWindowId(newId);
    setIsStartOpen(false);
  }, [openWindows, maxZIndex]);

  const closeWindow = useCallback((id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
    if (activeWindowId === id) setActiveWindowId(null);
  }, [activeWindowId]);

  const toggleMaximize = useCallback((id: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  }, []);

  const toggleMinimize = useCallback((id: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
    ));
    if (activeWindowId === id) setActiveWindowId(null);
  }, [activeWindowId]);

  const focusWindow = useCallback((id: string) => {
    setOpenWindows(prev => prev.map(w => 
      w.id === id ? { ...w, zIndex: maxZIndex + 1, isMinimized: false } : w
    ));
    setMaxZIndex(prev => prev + 1);
    setActiveWindowId(id);
  }, [maxZIndex]);

  const renderAppContent = (type: AppType) => {
    switch (type) {
      case AppType.GEMINI:
        return <GeminiApp />;
      case AppType.BROWSER:
        return <BrowserApp />;
      case AppType.SETTINGS:
        return <SettingsApp />;
      case AppType.SECURE_CONNECT:
        return <SecureConnectApp />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <p className="text-xl font-semibold">Coming Soon</p>
            <p>This application is still being developed.</p>
          </div>
        );
    }
  };

  return (
    <div 
      className="relative h-screen w-screen overflow-hidden bg-cover bg-center transition-all duration-700"
      style={{ backgroundImage: `url('https://i.postimg.cc/D0vSfJ3k/windows-11-blue-stock-white-background-light-official-3840x2400-5616.jpg')` }}
    >
      {/* Lock Screen Overlay */}
      {isLocked && (
        <LockScreen 
          currentTime={currentTime} 
          onUnlock={() => setIsLocked(false)} 
        />
      )}

      {/* Desktop Icons */}
      <div className="absolute top-0 left-0 p-4 grid grid-cols-1 grid-rows-8 gap-4 auto-cols-min h-full">
        {APPS.map(app => (
          <DesktopIcon 
            key={app.id} 
            app={app} 
            onDoubleClick={() => openApp(app.id)} 
          />
        ))}
      </div>

      {/* Windows Layer */}
      {openWindows.map(window => (
        <Window
          key={window.id}
          window={window}
          isActive={activeWindowId === window.id}
          onClose={() => closeWindow(window.id)}
          onMaximize={() => toggleMaximize(window.id)}
          onMinimize={() => toggleMinimize(window.id)}
          onFocus={() => focusWindow(window.id)}
        >
          {renderAppContent(window.type)}
        </Window>
      ))}

      {/* Overlays */}
      {isStartOpen && (
        <div className="absolute inset-0 z-[999]" onClick={() => setIsStartOpen(false)}>
           <StartMenu 
            onClose={() => setIsStartOpen(false)} 
            onAppClick={(type) => openApp(type)} 
          />
        </div>
      )}

      {/* Taskbar */}
      <Taskbar 
        openWindows={openWindows}
        activeWindowId={activeWindowId}
        onStartClick={() => setIsStartOpen(!isStartOpen)}
        onAppClick={(type) => openApp(type)}
        onWindowIconClick={(id) => focusWindow(id)}
        currentTime={currentTime}
      />
    </div>
  );
};

export default App;
