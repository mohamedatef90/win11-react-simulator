
import React from 'react';
import { 
  Monitor, 
  Wifi, 
  Bluetooth, 
  Smartphone, 
  Layout, 
  Lock, 
  User, 
  Clock, 
  Accessibility, 
  ShieldCheck,
  Update
} from 'lucide-react';

const SettingsApp: React.FC = () => {
  const menuItems = [
    { icon: <Monitor className="w-4 h-4" />, label: 'System', active: true },
    { icon: <Bluetooth className="w-4 h-4" />, label: 'Bluetooth & devices' },
    { icon: <Wifi className="w-4 h-4" />, label: 'Network & internet' },
    { icon: <Layout className="w-4 h-4" />, label: 'Personalization' },
    { icon: <LayoutGrid className="w-4 h-4" />, label: 'Apps' },
    { icon: <User className="w-4 h-4" />, label: 'Accounts' },
    { icon: <Clock className="w-4 h-4" />, label: 'Time & language' },
    { icon: <Accessibility className="w-4 h-4" />, label: 'Accessibility' },
    { icon: <ShieldCheck className="w-4 h-4" />, label: 'Privacy & security' },
  ];

  return (
    <div className="flex h-full bg-[#f3f3f3] text-black">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-300 p-4 space-y-1">
        <div className="flex items-center gap-3 mb-6 px-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">JD</div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold">John Doe</span>
            <span className="text-[10px] text-gray-500">Local Account</span>
          </div>
        </div>
        
        {menuItems.map((item, i) => (
          <div 
            key={i} 
            className={`flex items-center gap-3 px-3 py-2 rounded transition-colors text-xs cursor-default
              ${item.active ? 'bg-white shadow-sm border border-gray-200' : 'hover:bg-gray-200'}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-2xl font-semibold mb-6">System</h1>
        
        <div className="grid grid-cols-1 gap-2">
          <SettingsSection 
            title="Display" 
            desc="Monitors, brightness, night light, display profile" 
            icon={<Monitor className="w-5 h-5 text-blue-500" />} 
          />
          <SettingsSection 
            title="Sound" 
            desc="Volume levels, output, input, sound devices" 
            icon={<Volume2 className="w-5 h-5 text-green-500" />} 
          />
          <SettingsSection 
            title="Notifications" 
            desc="Alerts from apps and system, do not disturb" 
            icon={<Bell className="w-5 h-5 text-yellow-500" />} 
          />
          <SettingsSection 
            title="Power & battery" 
            desc="Sleep, battery usage, power mode" 
            icon={<Battery className="w-5 h-5 text-blue-400" />} 
          />
          <SettingsSection 
            title="Storage" 
            desc="Storage space, drives, configuration rules" 
            icon={<Layout className="w-5 h-5 text-purple-500" />} 
          />
        </div>
      </div>
    </div>
  );
};

const SettingsSection: React.FC<{ title: string; desc: string; icon: React.ReactNode }> = ({ title, desc, icon }) => (
  <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 cursor-default transition-colors group">
    {icon}
    <div className="flex flex-col">
      <span className="text-sm font-semibold">{title}</span>
      <span className="text-[11px] text-gray-500">{desc}</span>
    </div>
    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
       <span className="text-xs text-gray-400">&gt;</span>
    </div>
  </div>
);

const LayoutGrid: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
);

const Volume2: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
);

const Bell: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
);

const Battery: React.FC<{className?: string}> = ({className}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="13" x2="23" y2="11"/></svg>
);

export default SettingsApp;
