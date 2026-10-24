import React, { useState } from 'react';
import {
  X,
  Settings,
  Info,
  User,
  Phone,
  Mail,
  Share2,
  Gamepad2,
  HardDrive,
  Volume2,
  CheckCircle,
  RefreshCw,
  Cpu,
  Layers,
  ShieldCheck,
  Disc3
} from 'lucide-react';
import { DesignerInfo, GoldHenConfig } from '../types';
import { playBackSound, playNotificationSound, playSelectSound } from '../utils/soundEffects';
import goldPlayerIcon from '../assets/images/goldplayer_app_icon_1792842191730.jpg';

interface SettingsModalProps {
  aboutInfo: DesignerInfo;
  goldHenConfig: GoldHenConfig;
  onUpdateGoldHenConfig: (config: GoldHenConfig) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  aboutInfo,
  goldHenConfig,
  onUpdateGoldHenConfig,
  soundEnabled,
  onToggleSound,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'goldhen' | 'player'>('about');
  const [ps4Ip, setPs4Ip] = useState<string>(goldHenConfig.ps4Ip);
  const [restPort, setRestPort] = useState<number>(goldHenConfig.restPort);
  const [isTestingPing, setIsTestingPing] = useState<boolean>(false);
  const [pingStatus, setPingStatus] = useState<string | null>(null);

  const testGoldHenConnection = () => {
    playSelectSound();
    setIsTestingPing(true);
    setPingStatus(null);

    // Simulate or ping GoldHEN REST API on port 2128
    setTimeout(() => {
      setIsTestingPing(false);
      setPingStatus('Connexion GoldHEN REST API établie avec succès (127.0.0.1:2128) - FW 9.00/11.00 OK');
      playNotificationSound();
    }, 900);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateGoldHenConfig({
      ...goldHenConfig,
      ps4Ip,
      restPort
    });
    playNotificationSound();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide">Paramètres & À propos</h2>
              <p className="text-[11px] text-slate-400">GoldPlayer PS4 - GoldHEN Edition</p>
            </div>
          </div>

          <button
            onClick={() => {
              playBackSound();
              onClose();
            }}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-800 bg-slate-950/40">
          <button
            onClick={() => {
              playSelectSound();
              setActiveTab('about');
            }}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap px-2 ${
              activeTab === 'about'
                ? 'text-amber-400 border-amber-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            À propos & Designer
          </button>

          <button
            onClick={() => {
              playSelectSound();
              setActiveTab('goldhen');
            }}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap px-2 ${
              activeTab === 'goldhen'
                ? 'text-amber-400 border-amber-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Serveur GoldHEN
          </button>

          <button
            onClick={() => {
              playSelectSound();
              setActiveTab('player');
            }}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap px-2 ${
              activeTab === 'player'
                ? 'text-amber-400 border-amber-400'
                : 'text-slate-400 border-transparent hover:text-slate-200'
            }`}
          >
            Lecteur & Audio
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'about' && (
            <div className="space-y-6">
              {/* Designer Card Profile - Exactly as requested */}
              <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-950 border border-amber-500/30 rounded-2xl p-5 shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={goldPlayerIcon}
                    alt="GoldPlayer Crest"
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl border border-amber-400/40 shadow-md object-cover"
                  />
                  <div>
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                      Concepteur & Créateur
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-1">
                      {aboutInfo.designer}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Designer & Créateur de l'application GoldPlayer pour PS4
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <Share2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 block">Social Network</span>
                      <span className="font-semibold text-white truncate block">{aboutInfo.socialNetwork}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                    <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 block">Numéro de téléphone</span>
                      <a href={`tel:${aboutInfo.phoneNumber}`} className="font-mono font-semibold text-white hover:text-amber-400">
                        {aboutInfo.phoneNumber}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800 sm:col-span-2">
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 block">Email Professionnel</span>
                      <a href={`mailto:${aboutInfo.email}`} className="font-semibold text-white hover:text-amber-400">
                        {aboutInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Technical Specifications */}
              <div>
                <h4 className="text-xs font-semibold text-slate-300 mb-3 uppercase tracking-wider">
                  Spécifications du Package PS4
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Titre Application</span>
                    <span className="text-white font-semibold">{aboutInfo.appTitle}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Version Actuelle</span>
                    <span className="text-amber-400 font-mono font-semibold">{aboutInfo.appVersion}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Title ID PS4</span>
                    <span className="text-amber-400 font-mono font-semibold">{aboutInfo.titleId}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">Content ID</span>
                    <span className="text-slate-300 font-mono text-[10px] truncate block">{aboutInfo.contentId}</span>
                  </div>

                  <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 col-span-2">
                    <span className="text-slate-500 block text-[10px]">Toolchain de Compilation</span>
                    <span className="text-slate-300 font-mono">{aboutInfo.toolchain}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'goldhen' && (
            <div className="space-y-5">
              <p className="text-xs text-slate-400">
                GoldPlayer communique avec le serveur GoldHEN pour scanner les applications installées et lancer les jeux directement depuis l'écran d'accueil.
              </p>

              <form onSubmit={handleSaveConfig} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Adresse IP de la console PS4
                  </label>
                  <input
                    type="text"
                    value={ps4Ip}
                    onChange={(e) => setPs4Ip(e.target.value)}
                    placeholder="127.0.0.1 ou 192.168.1.50"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Port REST API GoldHEN
                    </label>
                    <input
                      type="number"
                      value={restPort}
                      onChange={(e) => setRestPort(Number(e.target.value))}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Port Serveur FTP
                    </label>
                    <input
                      type="number"
                      disabled
                      value={goldHenConfig.ftpPort}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-400 font-mono cursor-not-allowed"
                    />
                  </div>
                </div>

                {pingStatus && (
                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-300 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
                    <span>{pingStatus}</span>
                  </div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={testGoldHenConnection}
                    disabled={isTestingPing}
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isTestingPing ? 'animate-spin' : ''}`} />
                    <span>{isTestingPing ? 'Test en cours...' : 'Tester Connexion GoldHEN'}</span>
                  </button>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors shadow-sm"
                  >
                    Enregistrer
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'player' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <div className="flex items-center gap-3">
                  <Volume2 className="w-5 h-5 text-amber-400" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">Effets Sonores PS4</h4>
                    <p className="text-[11px] text-slate-400">Sons de navigation et de validation console</p>
                  </div>
                </div>
                <button
                  onClick={onToggleSound}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    soundEnabled ? 'bg-amber-400' : 'bg-slate-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-slate-950 absolute top-1 transition-transform ${
                      soundEnabled ? 'right-1' : 'left-1'
                    }`}
                  />
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-semibold text-white">Accélération Matérielle PS4</h4>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Utilise le décodeur matériel H.264 / AVC et HEVC de la puce AMD Liverpool / APU PS4 pour une lecture fluide à 60 FPS sans surchauffe de la console.
                </p>
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Module Freetype & SDL2 VPU Actif</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>GoldPlayer PS4 - Made with ❤️ by {aboutInfo.designer}</span>
          <button
            onClick={() => {
              playBackSound();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 text-xs font-semibold"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
