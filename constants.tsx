
import React from 'react';
import { AppType, AppConfig } from './types';
import AppIcon from './components/AppIcon';

export const APPS: AppConfig[] = [
  { id: AppType.SECURE_CONNECT, name: 'Secure Connect', icon: 'Shield' },
  { id: AppType.FILE_EXPLORER, name: 'File Explorer', icon: 'Folder' },
  { id: AppType.BROWSER, name: 'Microsoft Edge', icon: 'Globe' },
  { id: AppType.WHATSAPP, name: 'WhatsApp', icon: 'MessageCircle' },
  { id: AppType.WORD, name: 'Word', icon: 'FileText' },
  { id: AppType.GEMINI, name: 'Gemini', icon: 'Cpu' },
  { id: AppType.SETTINGS, name: 'Settings', icon: 'Settings' },
  { id: AppType.LOCK_SCREEN, name: 'Lock Screen', icon: 'Lock' },
];

export const PINNED_APPS = [
  { name: 'Edge', icon: <AppIcon type={AppType.BROWSER} />, type: AppType.BROWSER },
  { name: 'Word', icon: <AppIcon type={AppType.WORD} />, type: AppType.WORD },
  { name: 'WhatsApp', icon: <AppIcon type={AppType.WHATSAPP} />, type: AppType.WHATSAPP },
  { name: 'Gemini', icon: <AppIcon type={AppType.GEMINI} />, type: AppType.GEMINI },
  { name: 'Secure Connect', icon: <AppIcon type={AppType.SECURE_CONNECT} />, type: AppType.SECURE_CONNECT },
  { name: 'Mail', icon: <i className="fa-solid fa-envelope text-2xl text-yellow-500"></i>, type: AppType.BROWSER },
  { name: 'Photos', icon: <i className="fa-solid fa-image text-2xl text-blue-400"></i>, type: AppType.FILE_EXPLORER },
  { name: 'Settings', icon: <AppIcon type={AppType.SETTINGS} />, type: AppType.SETTINGS },
  { name: 'Calculator', icon: <i className="fa-solid fa-calculator text-2xl text-green-600"></i>, type: AppType.SETTINGS },
  { name: 'Calendar', icon: <i className="fa-solid fa-calendar-days text-2xl text-pink-500"></i>, type: AppType.SETTINGS },
];

export const INITIAL_Z_INDEX = 100;
