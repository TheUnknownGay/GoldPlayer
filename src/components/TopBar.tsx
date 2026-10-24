import React from 'react';
import { Gamepad2, Settings as SettingsIcon } from 'lucide-react';
import goldPlayerIcon from '../assets/images/goldplayer_app_icon_1792842191730.jpg';

interface TopBarProps {
  currentTab: 'home' | 'iptv' | 'usb' | 'github' | 'settings';
  onSelectTab: (tab: 'home' | 'iptv' | 'usb' | 'github' | 'settings') => void;
  hasGamepad: boolean;
  onOpenSettings: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  onSelectTab,
  hasGamepad,
  onOpenSettings
}) => {
  return (
    <header className="flex items-center justify-between gap-8 px-6 py-3.5 border-b border-slate-800/80 bg-[#090c13]/90 backdrop-blur-md sticky top-0 z-40 select-none">
      {/* Zone 1: Single text element wordmark */}
      <div 
        onClick={() => onSelectTab('home')}
        className="flex items-center gap-3 cursor-pointer group shrink-0"
      >
        <img 
          src={goldPlayerIcon} 
          alt="GoldPlayer Logo" 
          referrerPolicy="no-referrer"
          className="w-8 h-8 rounded-lg shadow-md border border-amber-500/30 group-hover:scale-105 transition-transform object-cover" 
        />
        <div className="flex items-baseline gap-1.5">
          <span className="text-lg font-bold tracking-tight text-white whitespace-nowrap">
            Gold<span className="text-amber-400">Player</span>
          </span>
          <span className="text-[11px] font-semibold text-amber-500/80 uppercase tracking-widest">
            PS4
          </span>
        </div>
      </div>

      {/* Zone 2: 4-5 clean single-line text navigation links */}
      <nav className="flex items-center gap-6 text-sm font-medium text-slate-300 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSelectTab('home')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
            currentTab === 'home' 
              ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' 
              : 'border-b-2 border-transparent'
          }`}
        >
          Accueil & Jeux
        </button>

        <button
          onClick={() => onSelectTab('iptv')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
            currentTab === 'iptv' 
              ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' 
              : 'border-b-2 border-transparent'
          }`}
        >
          IPTV & Télévision
        </button>

        <button
          onClick={() => onSelectTab('usb')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
            currentTab === 'usb' 
              ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' 
              : 'border-b-2 border-transparent'
          }`}
        >
          Disque USB & Vidéos
        </button>

        <button
          onClick={() => onSelectTab('github')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
            currentTab === 'github' 
              ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' 
              : 'border-b-2 border-transparent'
          }`}
        >
          Compilation PKG GitHub
        </button>

        <button
          onClick={() => onSelectTab('settings')}
          className={`hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 ${
            currentTab === 'settings' 
              ? 'text-amber-400 border-b-2 border-amber-400 font-semibold' 
              : 'border-b-2 border-transparent'
          }`}
        >
          Paramètres & À propos
        </button>
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onOpenSettings}
          className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 rounded-lg hover:bg-amber-300 transition-colors whitespace-nowrap shadow-sm shadow-amber-500/20 active:scale-95"
        >
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>{hasGamepad ? 'DualShock 4 Connectée' : 'Mode Console PS4'}</span>
        </button>
      </div>
    </header>
  );
};
