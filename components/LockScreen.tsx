
import React, { useState } from 'react';
import { ShieldAlert, Key, Smartphone, Activity, XCircle, ShieldCheck } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
  currentTime: Date;
}

const LockScreen: React.FC<LockScreenProps> = ({ onUnlock, currentTime }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [isPushing, setIsPushing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePushVerification = () => {
    setIsPushing(true);
    // Simulate network delay and verification
    setTimeout(() => {
      setIsPushing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onUnlock();
      }, 1000);
    }, 2000);
  };

  const handleCancel = () => {
    setShowLogin(false);
    setIsPushing(false);
    setIsSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden flex flex-col items-center justify-center transition-all duration-700">
      {/* Background Layer with Conditional Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
        style={{ 
          backgroundImage: `url('https://i.postimg.cc/D0vSfJ3k/windows-11-blue-stock-white-background-light-official-3840x2400-5616.jpg')`,
          filter: showLogin ? 'brightness(0.4) blur(12px) scale(1.05)' : 'none',
          transform: showLogin ? 'scale(1.05)' : 'scale(1)'
        }}
      />

      {/* Landing State (Time & Date) */}
      {!showLogin ? (
        <div 
          className="relative w-full h-full flex flex-col items-center justify-between py-20 cursor-pointer animate-in fade-in duration-700"
          onClick={() => setShowLogin(true)}
        >
          <div className="text-center text-white drop-shadow-2xl mt-10">
            <h1 className="text-9xl font-light mb-2 tracking-tighter">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
            </h1>
            <p className="text-2xl font-medium opacity-90">
              {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 text-white animate-bounce opacity-80">
            <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center">
              <ChevronUp className="w-6 h-6" />
            </div>
            <span className="text-sm font-semibold tracking-widest uppercase">Click to unlock</span>
          </div>
        </div>
      ) : (
        /* Secure Connect Verification Card - The First Layer Above the Blur */
        <div className="relative z-50 flex flex-col items-center justify-center w-full h-full animate-in fade-in zoom-in-95 duration-500">
          <div className="w-[420px] bg-white rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] flex flex-col border border-white/20">
            {/* WorldPosta SSO Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-xl p-1.5">
                  <img 
                    src="https://i.postimg.cc/13jzFmbR/icon.png" 
                    alt="Secure Connect" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#293c51]">Secure Connect</h3>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Identity Verification</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border transition-colors duration-300
                ${isSuccess ? 'bg-green-50 text-[#679a41] border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isSuccess ? 'bg-[#679a41]' : 'bg-yellow-500 animate-pulse'}`} />
                {isSuccess ? 'Verified' : 'Pending'}
              </div>
            </div>

            {/* Verification Content */}
            <div className="p-10 flex flex-col items-center bg-[#fcfcfc]">
              <div className="relative mb-10">
                {/* Brand Pulse Effect */}
                {(isPushing || isSuccess) && (
                  <div className={`absolute inset-[-30px] rounded-full animate-ping opacity-10 ${isSuccess ? 'bg-[#679a41]' : 'bg-sky-500'}`} style={{ animationDuration: '2s' }} />
                )}
                
                <div className={`relative w-40 h-40 rounded-full bg-white flex flex-col items-center justify-center shadow-xl border-[6px] transition-all duration-700
                  ${isSuccess ? 'border-[#679a41]' : isPushing ? 'border-sky-200' : 'border-gray-50'}`}>
                  {isSuccess ? (
                    <ShieldCheck className="w-16 h-16 text-[#679a41] animate-in zoom-in duration-300" />
                  ) : isPushing ? (
                    <Activity className="w-16 h-16 text-sky-500 animate-pulse" />
                  ) : (
                    <ShieldAlert className="w-16 h-16 text-[#293c51]" />
                  )}
                  <span className={`mt-3 text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-500
                    ${isSuccess ? 'text-[#679a41]' : 'text-[#293c51] opacity-40'}`}>
                    {isSuccess ? 'Success' : isPushing ? 'Scanning' : 'Locked'}
                  </span>
                </div>
              </div>

              <div className="text-center mb-10">
                <h4 className="text-2xl font-bold text-[#293c51] mb-2">
                  {isSuccess ? 'Access Granted' : 'Authorize Session'}
                </h4>
                <p className="text-sm text-gray-500 max-w-[280px] leading-relaxed">
                  {isSuccess 
                    ? 'Your identity has been confirmed. Unlocking your workspace...' 
                    : 'To continue, please confirm this sign-in request on your mobile device.'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="w-full space-y-4">
                {!isSuccess && (
                  <>
                    <button 
                      onClick={handlePushVerification}
                      disabled={isPushing}
                      className="w-full h-14 bg-[#679a41] hover:bg-[#5a8738] text-white font-bold px-6 rounded-2xl flex items-center justify-center gap-4 transition-all active:scale-[0.97] shadow-xl shadow-[#679a41]/30 disabled:opacity-50"
                    >
                      <Smartphone className="w-5 h-5" />
                      <span className="text-sm tracking-wide">Push to my device</span>
                    </button>
                    
                    <button 
                      disabled={isPushing}
                      className="w-full h-14 bg-white hover:bg-gray-50 text-[#293c51] font-bold px-6 rounded-2xl flex items-center justify-center gap-4 transition-all active:scale-[0.97] border-2 border-gray-100 shadow-sm disabled:opacity-50"
                    >
                      <Key className="w-5 h-5" />
                      <span className="text-sm tracking-wide">Verification Options</span>
                    </button>
                  </>
                )}

                {!isSuccess && (
                  <button 
                    onClick={handleCancel}
                    disabled={isPushing}
                    className="w-full text-gray-400 hover:text-red-500 font-bold py-2 flex items-center justify-center gap-2 transition-colors text-[11px] mt-2 uppercase tracking-[0.25em] disabled:opacity-30"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>Cancel Request</span>
                  </button>
                )}
              </div>
            </div>

            {/* SSO Branded Footer */}
            <div className="px-8 py-5 border-t border-gray-100 bg-white flex items-center justify-between text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span>Secure Node Active</span>
              </div>
              <span>WP-SSO v4.2.0</span>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Tray */}
      <div className={`absolute bottom-10 w-full px-16 flex items-center justify-between text-white transition-opacity duration-500 ${showLogin ? 'opacity-40' : 'opacity-80'}`}>
        <div className="flex items-center gap-4">
        </div>
        <div className="flex items-center gap-8">
          <i className="fa-solid fa-wifi text-xl"></i>
          <i className="fa-solid fa-battery-full text-xl"></i>
          <i className="fa-solid fa-accessibility text-xl"></i>
          <i className="fa-solid fa-power-off text-xl cursor-pointer hover:text-red-400 transition-colors"></i>
        </div>
      </div>
    </div>
  );
};

const ChevronUp: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
);

export default LockScreen;
