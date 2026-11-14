# Win11 React Simulator

A Windows 11 desktop simulation built with React and Tailwind CSS, with a lock screen, taskbar, start menu, draggable windows, and an integrated Gemini assistant. It was created in Google AI Studio and can be viewed there: https://ai.studio/apps/drive/10SFrOlhnfKPxhoqQQotfc19e1ut9jbhJ

## Features

- **Lock screen:** the simulator always starts locked and unlocks through a simulated identity-confirmation animation (`components/LockScreen.tsx`).
- **Desktop shell:** desktop icons, a taskbar with a clock, a start menu, and windows that can be dragged, minimized, and maximized (`components/Window.tsx`, `components/Taskbar.tsx`, `components/StartMenu.tsx`).
- **Working apps:**
  - **Gemini:** a chat assistant that calls Google Gemini (`components/apps/GeminiApp.tsx`, `services/gemini.ts`).
  - **Microsoft Edge:** a browser window that loads pages in an iframe, so sites that block framing will not display.
  - **Settings:** a Windows-style settings window with a sidebar.
  - **Secure Connect:** a simulated secure-connection panel with connect and cancel states (no real network connection).
- **Other icons** (File Explorer, WhatsApp, Word, Mail, Photos, Calculator, Calendar, and similar) open a window that shows "Coming Soon".

## Tech stack

- React 19 and TypeScript
- Vite 6
- Tailwind CSS and Font Awesome (both loaded from CDNs in `index.html`), `lucide-react` icons
- Google Gemini through `@google/genai`

## Getting started

Prerequisites: Node.js and npm.

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build into dist/
npm run preview   # preview the production build
```

### Environment variable

`API_KEY`: your Gemini API key. `vite.config.ts` reads it from the process environment when Vite starts and inlines it into the client bundle, so use it only for local demos:

```bash
API_KEY=your-key npm run dev
```

Without it, the Gemini app shows a connection error message instead of answers. `GEMINI_API_KEY` and `.env.local` are not read by this code.

## Project structure

```
App.tsx, index.tsx   Desktop state, window management, and entry point
components/          Taskbar, start menu, lock screen, window, icons
components/apps/     Gemini, Browser, Settings, and Secure Connect apps
services/gemini.ts   Gemini client
constants.tsx        App and icon definitions
types.ts             Shared types
```
