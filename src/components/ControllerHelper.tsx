import React from 'react';
import { Gamepad } from 'lucide-react';

interface ControllerHelperProps {
  hasGamepad: boolean;
  gamepadName?: string;
  onSimulateButton?: (btn: 'cross' | 'circle' | 'square' | 'triangle' | 'l1' | 'r1') => void;
}

export const ControllerHelper: React.FC<ControllerHelperProps> = ({
  hasGamepad,
  gamepadName,
  onSimulateButton
}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 bg-[#090c13]/95 border-t border-slate-800/80 backdrop-blur-md px-6 py-2 flex items-center justify-between text-xs text-slate-300">
      {/* Controller Buttons Legend */}
      <div className="flex items-center gap-5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => onSimulateButton?.('cross')}
          className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          title="Entrée ou Espace au clavier"
        >
          <span className="w-4 h-4 rounded-full bg-blue-600/30 border border-blue-500 text-blue-400 font-bold text-[10px] flex items-center justify-center">
            ✕
          </span>
          <span className="whitespace-nowrap">Valider / Lancer</span>
        </button>

        <button
          onClick={() => onSimulateButton?.('circle')}
          className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          title="Échap ou Retour au clavier"
        >
          <span className="w-4 h-4 rounded-full bg-red-600/30 border border-red-500 text-red-400 font-bold text-[10px] flex items-center justify-center">
            ◯
          </span>
          <span className="whitespace-nowrap">Retour</span>
        </button>

        <button
          onClick={() => onSimulateButton?.('square')}
          className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          title="Touche F au clavier"
        >
          <span className="w-4 h-4 rounded-sm bg-pink-600/30 border border-pink-500 text-pink-400 font-bold text-[10px] flex items-center justify-center">
            ▢
          </span>
          <span className="whitespace-nowrap">Favoris</span>
        </button>

        <button
          onClick={() => onSimulateButton?.('triangle')}
          className="flex items-center gap-1.5 hover:text-amber-400 transition-colors"
          title="Touche T au clavier"
        >
          <span className="w-4 h-4 rounded-sm bg-emerald-600/30 border border-emerald-500 text-emerald-400 font-bold text-[10px] flex items-center justify-center">
            △
          </span>
          <span className="whitespace-nowrap">Options / Détails</span>
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => onSimulateButton?.('l1')}
            className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]"
          >
            L1
          </button>
          <span className="text-slate-500">/</span>
          <button
            onClick={() => onSimulateButton?.('r1')}
            className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]"
          >
            R1
          </button>
          <span className="text-slate-400 whitespace-nowrap">Changer Onglet</span>
        </div>
      </div>

      {/* Connection & Hardware Status */}
      <div className="flex items-center gap-3 shrink-0 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <Gamepad className={`w-3.5 h-3.5 ${hasGamepad ? 'text-emerald-400' : 'text-amber-400'}`} />
          <span className="font-medium truncate max-w-[150px]">
            {hasGamepad ? (gamepadName || 'DualShock 4') : 'Contrôles Actifs'}
          </span>
        </div>
        <span className="text-slate-600" aria-hidden="true">·</span>
        <span className="font-mono text-slate-500 hidden md:inline">GoldHEN 2.4b16</span>
      </div>
    </footer>
  );
};
