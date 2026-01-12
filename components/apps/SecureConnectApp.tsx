
import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, Activity, Smartphone, Key, XCircle } from 'lucide-react';

const SecureConnectApp: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const toggleConnection = () => {
    if (isConnected) {
      setIsConnected(false);
    } else {
      setIsConnecting(true);
      setTimeout(() => {
        setIsConnecting(false);
        setIsConnected(true);
      }, 2000);
    }
  };

  const handleCancel = () => {
    setIsConnecting(false);
    setIsConnected(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#fcfcfc] text-[#293c51] font-sans animate-in fade-in duration-500">
      {/* Header */}
      <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <img 
              src="https://i.postimg.cc/13jzFmbR/icon.png" 
              alt="Secure Connect" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#293c51]">Secure Connect</h1>
            <p className="text-xs text-gray-500">Powered by WorldPosta SSO</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5
            ${isConnected 
              ? 'bg-green-100 text-[#679a41]' 
              : 'bg-yellow-100 text-yellow-700'}`}
          >
            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-[#679a41]' : 'bg-yellow-600'}`} />
            {isConnected ? 'Verified' : 'Pending Auth'}
          </div>
        </div>
      </div>

      {/* Main Connection Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-[#f8f8f8]">
        <div className="relative mb-8">
          {/* Decorative pulse using brand green */}
          {(isConnecting || isConnected) && (
            <div className={`absolute inset-0 rounded-full animate-ping opacity-10 ${isConnected ? 'bg-[#679a41]' : 'bg-sky-500'}`} style={{ animationDuration: '3s' }} />
          )}
          
          <div 
            className={`relative w-44 h-44 rounded-full flex flex-col items-center justify-center transition-all duration-700 border-2 
              ${isConnected 
                ? 'bg-white border-[#679a41] shadow-[0_0_40px_rgba(103,154,65,0.15)]' 
                : 'bg-white border-gray-200 shadow-sm'}
              ${isConnecting ? 'scale-105' : 'scale-100'}`}
          >
            {isConnecting ? (
              <Activity className="w-14 h-14 text-sky-500 animate-pulse" />
            ) : isConnected ? (
              <ShieldCheck className="w-14 h-14 text-[#679a41]" />
            ) : (
              <ShieldAlert className="w-14 h-14 text-[#293c51]" />
            )}
            <span className={`mt-3 text-[10px] font-black tracking-[0.2em] uppercase transition-colors ${isConnected ? 'text-[#679a41]' : 'text-[#293c51]'}`}>
              {isConnecting ? 'Verifying' : isConnected ? 'Secure' : 'Standby'}
            </span>
          </div>
        </div>

        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-[#293c51] mb-2">
            {isConnected ? 'Identity Confirmed' : 'Sign in Required'}
          </h2>
          <p className="text-sm text-gray-500 max-w-sm">
            {isConnected 
              ? 'Welcome back. Your access to WorldPosta services is now active.' 
              : 'Please choose a secondary verification method to secure your account.'}
          </p>
        </div>

        {/* Action Buttons using WorldPosta Palette */}
        <div className="w-full max-w-xs space-y-3">
          <button 
            onClick={toggleConnection}
            disabled={isConnecting || isConnected}
            className="w-full h-14 bg-[#679a41] hover:bg-[#5a8738] text-white font-bold px-6 rounded-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-[#679a41]/20 disabled:opacity-50"
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-sm">Push to my mobile</span>
          </button>
          
          <button 
            disabled={isConnecting || isConnected}
            className="w-full h-14 bg-white hover:bg-gray-50 text-[#293c51] font-bold px-6 rounded-lg flex items-center justify-center gap-3 transition-all active:scale-95 border border-gray-300 shadow-sm disabled:opacity-50"
          >
            <Key className="w-5 h-5" />
            <span className="text-sm">Use passcode</span>
          </button>

          <button 
            onClick={handleCancel}
            className="w-full text-gray-400 hover:text-red-600 font-medium py-2 flex items-center justify-center gap-2 transition-colors text-xs mt-2 uppercase tracking-widest"
          >
            <XCircle className="w-4 h-4" />
            <span>Cancel Request</span>
          </button>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="p-4 px-8 border-t border-gray-200 bg-white flex items-center justify-between text-[11px] font-semibold text-gray-400 uppercase tracking-tight">
        <div className="flex gap-6">
          <div className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-[#679a41]' : 'bg-gray-300'}`} />
            <span>System: {isConnected ? 'Active' : 'Idle'}</span>
          </div>
          <span>WorldPosta v4.2.0</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:text-[#679a41] cursor-pointer transition-colors">Privacy</span>
          <span className="hover:text-[#679a41] cursor-pointer transition-colors">Security</span>
        </div>
      </div>
    </div>
  );
};

export default SecureConnectApp;
