
import React from 'react';
import { AppType } from '../types';

interface AppIconProps {
  type: AppType;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const AppIcon: React.FC<AppIconProps> = ({ type, className = '', size = 'md' }) => {
  const sizeClass = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  }[size];

  const iconTextSize = {
    sm: 'text-sm',
    md: 'text-xl',
    lg: 'text-3xl'
  }[size];

  const getIcon = () => {
    switch (type) {
      case AppType.GEMINI:
        return <i className={`fa-solid fa-wand-magic-sparkles text-purple-400 ${iconTextSize} ${sizeClass} flex items-center justify-center`} />;
      case AppType.SETTINGS:
        return <i className={`fa-solid fa-gear text-gray-400 ${iconTextSize} ${sizeClass} flex items-center justify-center`} />;
      case AppType.BROWSER:
        return <i className={`fa-brands fa-edge text-blue-500 ${iconTextSize} ${sizeClass} flex items-center justify-center`} />;
      case AppType.NOTEPAD:
        return <i className={`fa-solid fa-note-sticky text-blue-400 ${iconTextSize} ${sizeClass} flex items-center justify-center`} />;
      case AppType.FILE_EXPLORER:
        return <i className={`fa-solid fa-folder text-yellow-500 ${iconTextSize} ${sizeClass} flex items-center justify-center`} />;
      case AppType.RECYCLE_BIN:
        return <i className={`fa-solid fa-trash-can text-gray-400 ${iconTextSize} ${sizeClass} flex items-center justify-center`} />;
      case AppType.WORD:
        return <i className={`fa-solid fa-file-word text-blue-600 ${iconTextSize} ${sizeClass} flex items-center justify-center`} />;
      case AppType.WHATSAPP:
        return <i className={`fa-brands fa-whatsapp text-green-500 ${iconTextSize} ${sizeClass} flex items-center justify-center`} />;
      case AppType.LOCK_SCREEN:
        return <i className={`fa-solid fa-lock text-orange-400 ${iconTextSize} ${sizeClass} flex items-center justify-center`} />;
      case AppType.SECURE_CONNECT:
        return (
          <img 
            src="https://i.postimg.cc/13jzFmbR/icon.png" 
            alt="Secure Connect" 
            className={`${sizeClass} object-contain`}
          />
        );
      default:
        return <i className={`fa-solid fa-window-maximize text-blue-400 ${iconTextSize} ${sizeClass} flex items-center justify-center`} />;
    }
  };

  return (
    <div className={`flex items-center justify-center shrink-0 ${className}`}>
      {getIcon()}
    </div>
  );
};

export default AppIcon;
