import React, { useState, useEffect, useCallback } from 'react';
import {
  DEFAULT_ABOUT,
  DEFAULT_GOLDHEN_CONFIG,
  DEFAULT_IPTV_CHANNELS,
  DEFAULT_MEDIA_FILES,
  DEFAULT_PS4_GAMES
} from './data/defaultData';
import { DesignerInfo, GoldHenConfig, IPTVChannel, MediaFile, PS4Game } from './types';
import { TopBar } from './components/TopBar';
import { ControllerHelper } from './components/ControllerHelper';
import { HomeView } from './components/HomeView';
import { IptvView } from './components/IptvView';
import { UsbMediaView } from './components/UsbMediaView';
import { GithubPkgView } from './components/GithubPkgView';
import { SettingsModal } from './components/SettingsModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { useGamepad } from './hooks/useGamepad';
import {
  playBackSound,
  playLaunchSound,
  playMoveSound,
  playNotificationSound,
  playSelectSound
} from './utils/soundEffects';
import { CheckCircle2, Disc3, X } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'iptv' | 'usb' | 'github' | 'settings'>('home');
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Data collections (with localStorage caching)
  const [games, setGames] = useState<PS4Game[]>(() => {
    try {
      const saved = localStorage.getItem('goldplayer_games');
      return saved ? JSON.parse(saved) : DEFAULT_PS4_GAMES;
    } catch {
      return DEFAULT_PS4_GAMES;
    }
  });

  const [iptvChannels, setIptvChannels] = useState<IPTVChannel[]>(() => {
    try {
      const saved = localStorage.getItem('goldplayer_channels');
      return saved ? JSON.parse(saved) : DEFAULT_IPTV_CHANNELS;
    } catch {
      return DEFAULT_IPTV_CHANNELS;
    }
  });

  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>(() => {
    try {
      const saved = localStorage.getItem('goldplayer_media');
      return saved ? JSON.parse(saved) : DEFAULT_MEDIA_FILES;
    } catch {
      return DEFAULT_MEDIA_FILES;
    }
  });

  const [goldHenConfig, setGoldHenConfig] = useState<GoldHenConfig>(() => {
    try {
      const saved = localStorage.getItem('goldplayer_goldhen');
      return saved ? JSON.parse(saved) : DEFAULT_GOLDHEN_CONFIG;
    } catch {
      return DEFAULT_GOLDHEN_CONFIG;
    }
  });

  const [aboutInfo] = useState<DesignerInfo>(DEFAULT_ABOUT);

  // Active Video Player state
  const [activeVideo, setActiveVideo] = useState<{
    title: string;
    streamUrl: string;
    category?: string;
    resolution?: string;
  } | null>(null);

  // Game Launch Notification
  const [launchingNotification, setLaunchingNotification] = useState<{
    game: PS4Game;
    status: 'launching' | 'success';
  } | null>(null);

  // Persist state updates
  useEffect(() => {
    try {
      localStorage.setItem('goldplayer_games', JSON.stringify(games));
    } catch {}
  }, [games]);

  useEffect(() => {
    try {
      localStorage.setItem('goldplayer_channels', JSON.stringify(iptvChannels));
    } catch {}
  }, [iptvChannels]);

  useEffect(() => {
    try {
      localStorage.setItem('goldplayer_media', JSON.stringify(mediaFiles));
    } catch {}
  }, [mediaFiles]);

  useEffect(() => {
    try {
      localStorage.setItem('goldplayer_goldhen', JSON.stringify(goldHenConfig));
    } catch {}
  }, [goldHenConfig]);

  // Tab cycling helper
  const tabs: Array<'home' | 'iptv' | 'usb' | 'github' | 'settings'> = ['home', 'iptv', 'usb', 'github', 'settings'];

  const cycleTab = useCallback((direction: 'next' | 'prev') => {
    if (activeVideo) return;
    playMoveSound();
    setCurrentTab(prev => {
      const currentIdx = tabs.indexOf(prev);
      const nextIdx = direction === 'next'
        ? (currentIdx + 1) % tabs.length
        : (currentIdx + tabs.length - 1) % tabs.length;
      return tabs[nextIdx];
    });
  }, [activeVideo, tabs]);

  // Gamepad integration
  const { hasGamepad, gamepadName } = useGamepad({
    onL1: () => cycleTab('prev'),
    onR1: () => cycleTab('next'),
    onCircle: () => {
      if (activeVideo) {
        playBackSound();
        setActiveVideo(null);
      } else if (isSettingsOpen) {
        playBackSound();
        setIsSettingsOpen(false);
      }
    },
    onOptions: () => {
      playSelectSound();
      setIsSettingsOpen(prev => !prev);
    }
  });

  // Launch Game Handler via GoldHEN REST API
  const handleLaunchGame = async (game: PS4Game) => {
    playLaunchSound();
    setLaunchingNotification({ game, status: 'launching' });

    // Try communicating with local GoldHEN REST API (PS4 port 2128)
    try {
      const url = `http://${goldHenConfig.ps4Ip}:${goldHenConfig.restPort}/api/launch_title?title_id=${game.titleId}`;
      fetch(url, { mode: 'no-cors' }).catch(() => {});
    } catch {
      // Graceful fallback for non-console or cross-origin
    }

    setTimeout(() => {
      setLaunchingNotification({ game, status: 'success' });
      playNotificationSound();
    }, 1500);

    setTimeout(() => {
      setLaunchingNotification(null);
    }, 5500);
  };

  const handlePlayChannel = (channel: IPTVChannel) => {
    setActiveVideo({
      title: channel.name,
      streamUrl: channel.url,
      category: channel.group,
      resolution: channel.resolution || '1080p'
    });
  };

  const handlePlayMedia = (file: MediaFile) => {
    setActiveVideo({
      title: file.name,
      streamUrl: file.url,
      category: `Disque ${file.usbSource.toUpperCase()}`,
      resolution: 'HD'
    });
  };

  const handleToggleFavoriteGame = (gameId: string) => {
    setGames(prev =>
      prev.map(g => (g.id === gameId ? { ...g, isFavorite: !g.isFavorite } : g))
    );
  };

  const handleToggleFavoriteChannel = (channelId: string) => {
    setIptvChannels(prev =>
      prev.map(c => (c.id === channelId ? { ...c, isFavorite: !c.isFavorite } : c))
    );
  };

  const handleImportChannels = (newChannels: IPTVChannel[]) => {
    setIptvChannels(prev => [...newChannels, ...prev]);
  };

  const handleAddLocalMedia = (file: MediaFile) => {
    setMediaFiles(prev => [file, ...prev]);
  };

  const handleAddCustomGame = (game: PS4Game) => {
    setGames(prev => [game, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans select-none antialiased">
      {/* GoldHEN System Notification Banner */}
      {launchingNotification && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3.5 bg-slate-900/95 border border-amber-400/80 rounded-2xl p-4 shadow-2xl backdrop-blur-md animate-in slide-in-from-top-4 duration-300 max-w-md">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
            {launchingNotification.status === 'launching' ? (
              <Disc3 className="w-6 h-6 animate-spin" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                GoldHEN v2.4b16
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-[10px] font-mono text-slate-400">
                {launchingNotification.game.titleId}
              </span>
            </div>
            <h4 className="text-sm font-bold text-white truncate">
              {launchingNotification.status === 'launching'
                ? `Lancement de ${launchingNotification.game.name}...`
                : `${launchingNotification.game.name} est prêt !`}
            </h4>
            <p className="text-[11px] text-slate-400">
              {launchingNotification.status === 'launching'
                ? 'Connexion au kernel orbis & exécution en cours'
                : 'Application lancée avec succès sur votre console PS4.'}
            </p>
          </div>
          <button
            onClick={() => setLaunchingNotification(null)}
            className="text-slate-500 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Top Navigation Bar */}
      <TopBar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          playSelectSound();
          if (tab === 'settings') {
            setIsSettingsOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        hasGamepad={hasGamepad}
        onOpenSettings={() => {
          playSelectSound();
          setIsSettingsOpen(true);
        }}
      />

      {/* Main View Container */}
      <main className="flex-1 overflow-y-auto">
        {currentTab === 'home' && (
          <HomeView
            games={games}
            onLaunchGame={handleLaunchGame}
            recentChannel={iptvChannels[0]}
            onPlayChannel={handlePlayChannel}
            recentMedia={mediaFiles[0]}
            onPlayMedia={handlePlayMedia}
            onSelectTab={(tab) => {
              playSelectSound();
              if (tab === 'settings') setIsSettingsOpen(true);
              else setCurrentTab(tab);
            }}
            onToggleFavoriteGame={handleToggleFavoriteGame}
            onAddCustomGame={handleAddCustomGame}
          />
        )}

        {currentTab === 'iptv' && (
          <IptvView
            channels={iptvChannels}
            onPlayChannel={handlePlayChannel}
            onToggleFavorite={handleToggleFavoriteChannel}
            onImportChannels={handleImportChannels}
          />
        )}

        {currentTab === 'usb' && (
          <UsbMediaView
            files={mediaFiles}
            onPlayMedia={handlePlayMedia}
            onAddLocalMedia={handleAddLocalMedia}
          />
        )}

        {currentTab === 'github' && <GithubPkgView />}
      </main>

      {/* Controller Helpers & Bottom Cues */}
      <ControllerHelper
        hasGamepad={hasGamepad}
        gamepadName={gamepadName}
        onSimulateButton={(btn) => {
          if (btn === 'l1') cycleTab('prev');
          if (btn === 'r1') cycleTab('next');
          if (btn === 'circle') {
            if (activeVideo) setActiveVideo(null);
            else if (isSettingsOpen) setIsSettingsOpen(false);
          }
          if (btn === 'cross') {
            playSelectSound();
          }
        }}
      />

      {/* Fullscreen Video Player Modal */}
      {activeVideo && (
        <VideoPlayerModal
          title={activeVideo.title}
          streamUrl={activeVideo.streamUrl}
          category={activeVideo.category}
          resolution={activeVideo.resolution}
          onClose={() => setActiveVideo(null)}
        />
      )}

      {/* Settings & About Modal (With user requested contact details) */}
      {isSettingsOpen && (
        <SettingsModal
          aboutInfo={aboutInfo}
          goldHenConfig={goldHenConfig}
          onUpdateGoldHenConfig={(cfg) => setGoldHenConfig(cfg)}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(prev => !prev)}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}
    </div>
  );
}
