
export interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMaximized: boolean;
  isMinimized: boolean;
  zIndex: number;
  icon: string;
  type: AppType;
}

export enum AppType {
  GEMINI = 'GEMINI',
  SETTINGS = 'SETTINGS',
  BROWSER = 'BROWSER',
  NOTEPAD = 'NOTEPAD',
  FILE_EXPLORER = 'FILE_EXPLORER',
  MY_PC = 'MY_PC',
  RECYCLE_BIN = 'RECYCLE_BIN',
  WORD = 'WORD',
  WHATSAPP = 'WHATSAPP',
  LOCK_SCREEN = 'LOCK_SCREEN',
  SECURE_CONNECT = 'SECURE_CONNECT'
}

export interface AppConfig {
  id: AppType;
  name: string;
  icon: string;
  defaultWidth?: number;
  defaultHeight?: number;
}
