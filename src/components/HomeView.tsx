import React, { useState } from 'react';
import {
  Play,
  HardDrive,
  Tv,
  Gamepad2,
  FolderSync,
  Search,
  Star,
  Plus,
  CheckCircle,
  ExternalLink,
  Disc3,
  Cpu,
  Layers
} from 'lucide-react';
import { IPTVChannel, MediaFile, PS4Game } from '../types';
import { playLaunchSound, playSelectSound, playMoveSound, playNotificationSound } from '../utils/soundEffects';
import heroBg from '../assets/images/goldplayer_hero_bg_1792842191885.jpg';
import gameBanner from '../assets/images/ps4_games_showcase_1792842192925.jpg';

interface HomeViewProps {
  games: PS4Game[];
  onLaunchGame: (game: PS4Game) => void;
  recentChannel: IPTVChannel;
  onPlayChannel: (channel: IPTVChannel) => void;
  recentMedia: MediaFile;
  onPlayMedia: (file: MediaFile) => void;
  onSelectTab: (tab: 'home' | 'iptv' | 'usb' | 'github' | 'settings') => void;
  onToggleFavoriteGame: (gameId: string) => void;
  onAddCustomGame: (game: PS4Game) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  games,
  onLaunchGame,
  recentChannel,
  onPlayChannel,
  recentMedia,
  onPlayMedia,
  onSelectTab,
  onToggleFavoriteGame,
  onAddCustomGame
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'favorites' | 'internal' | 'usb'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGameIndex, setSelectedGameIndex] = useState<number>(0);
  const [isAddGameOpen, setIsAddGameOpen] = useState<boolean>(false);

  // New game form state
  const [newTitleId, setNewTitleId] = useState<string>('CUSA');
  const [newName, setNewName] = useState<string>('');
  const [newSize, setNewSize] = useState<number>(42);
  const [newGenre, setNewGenre] = useState<string>('Action-Aventure');
  const [newLocation, setNewLocation] = useState<'/user/app' | '/mnt/usb0'>('/user/app');

  const filteredGames = games.filter(g => {
    if (selectedFilter === 'favorites' && !g.isFavorite) return false;
    if (selectedFilter === 'internal' && g.installLocation !== '/user/app') return false;
    if (selectedFilter === 'usb' && !g.installLocation.startsWith('/mnt/usb')) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return g.name.toLowerCase().includes(q) || g.titleId.toLowerCase().includes(q) || g.genre.toLowerCase().includes(q);
    }
    return true;
  });

  const featuredGame = filteredGames[selectedGameIndex] || games[0];

  const handleLaunch = (game: PS4Game) => {
    playLaunchSound();
    onLaunchGame(game);
  };

  const handleCreateGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newTitleId.trim()) return;

    const game: PS4Game = {
      id: `game_${Date.now()}`,
      titleId: newTitleId.trim().toUpperCase(),
      name: newName.trim(),
      coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
      bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
      sizeGb: Number(newSize) || 35,
      version: 'v1.00',
      genre: newGenre,
      description: 'Titre installé détecté sur stockage PS4 GoldHEN.',
      installLocation: newLocation,
      isFavorite: false
    };

    onAddCustomGame(game);
    playNotificationSound();
    setIsAddGameOpen(false);
    setNewName('');
    setNewTitleId('CUSA');
  };

  return (
    <div className="min-h-full pb-24 text-slate-100">
      {/* Hero Showcase with Atmospheric PS4 Dashboard Backdrop */}
      <div className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-[#090c13] via-[#0d121c] to-[#07090e]">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img
            src={heroBg}
            alt="PS4 Dashboard"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top filter blur-xs"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090e] via-transparent to-transparent pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 pt-7 pb-8 relative z-10">
          {/* Status strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-xs text-slate-400">
            <div className="flex items-center gap-3">
              <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                <Disc3 className="w-4 h-4 animate-spin text-amber-400" />
                GoldHEN v2.4b16 Actif
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="font-mono text-slate-300">PS4 FW 9.00 / 11.00</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span>REST API : 127.0.0.1:2128</span>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <HardDrive className="w-3.5 h-3.5 text-slate-400" />
                <span>Interne (/user/app) : 482 Go / 861 Go</span>
              </div>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <div className="flex items-center gap-1.5 text-amber-300">
                <HardDrive className="w-3.5 h-3.5 text-amber-400" />
                <span>USB 0 (/mnt/usb0) : 1.8 To / 2.0 To</span>
              </div>
            </div>
          </div>

          {/* Featured Title Spotlight */}
          {featuredGame && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/60 rounded-2xl border border-slate-800 p-6 backdrop-blur-md shadow-2xl">
              <div className="lg:col-span-8 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-amber-400/20 text-amber-400 font-semibold border border-amber-400/30">
                    {featuredGame.titleId}
                  </span>
                  <span className="text-xs text-slate-400">{featuredGame.genre}</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-xs text-slate-400">{featuredGame.version}</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-xs text-slate-400">{featuredGame.sizeGb} Go</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span className="text-xs font-mono text-emerald-400">{featuredGame.installLocation}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
                  {featuredGame.name}
                </h1>

                <p className="text-sm text-slate-300 max-w-2xl line-clamp-2 leading-relaxed">
                  {featuredGame.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => handleLaunch(featuredGame)}
                    className="flex items-center gap-2.5 px-6 py-2.5 bg-amber-400 text-slate-950 font-bold text-sm rounded-xl hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/25 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>Lancer le Jeu</span>
                  </button>

                  <button
                    onClick={() => onToggleFavoriteGame(featuredGame.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium hover:bg-slate-700 transition-colors"
                  >
                    <Star className={`w-4 h-4 ${featuredGame.isFavorite ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                    <span>{featuredGame.isFavorite ? 'Favori' : 'Ajouter aux favoris'}</span>
                  </button>

                  <div className="text-xs text-slate-400 flex items-center gap-1.5 ml-auto">
                    <span>Emplacement :</span>
                    <span className="font-mono text-slate-200">{featuredGame.installLocation}/{featuredGame.titleId}</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 relative group overflow-hidden rounded-xl aspect-video lg:aspect-4/3 border border-slate-700/80 shadow-lg bg-slate-950">
                <img
                  src={featuredGame.bannerUrl || gameBanner}
                  alt={featuredGame.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-mono text-amber-400/90 font-semibold">
                    GoldHEN App Launcher Direct
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">
        {/* Section 1: Visualisation & Lancement des Jeux PS4 Installés */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Jeux Installés sur la Console PS4
                </h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Visualisez vos jeux installés (/user/app et disque USB) et lancez-les directement via GoldPlayer
              </p>
            </div>

            {/* Filter and Action toolbar */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Interactive Segmented Filters */}
              <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
                <button
                  onClick={() => {
                    playSelectSound();
                    setSelectedFilter('all');
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedFilter === 'all'
                      ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Tous ({games.length})
                </button>

                <button
                  onClick={() => {
                    playSelectSound();
                    setSelectedFilter('favorites');
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedFilter === 'favorites'
                      ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Favoris ({games.filter(g => g.isFavorite).length})
                </button>

                <button
                  onClick={() => {
                    playSelectSound();
                    setSelectedFilter('internal');
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedFilter === 'internal'
                      ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Stockage Interne
                </button>

                <button
                  onClick={() => {
                    playSelectSound();
                    setSelectedFilter('usb');
                  }}
                  className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                    selectedFilter === 'usb'
                      ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Disque USB
                </button>
              </div>

              {/* Add Custom Title Button */}
              <button
                onClick={() => {
                  playSelectSound();
                  setIsAddGameOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-medium transition-colors"
                title="Déclarer manuellement un Title ID CUSA installé"
              >
                <Plus className="w-3.5 h-3.5 text-amber-400" />
                <span>Ajouter Titre</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-5 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher par nom de jeu, Title ID (CUSA...)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Games Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
            {filteredGames.map((game, idx) => {
              const isSelected = featuredGame?.id === game.id;
              return (
                <div
                  key={game.id}
                  onClick={() => {
                    playMoveSound();
                    setSelectedGameIndex(idx);
                  }}
                  onDoubleClick={() => handleLaunch(game)}
                  className={`group relative rounded-xl border bg-slate-900/80 overflow-hidden transition-all duration-200 cursor-pointer flex flex-col ${
                    isSelected
                      ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-xl shadow-amber-500/10 scale-[1.01]'
                      : 'border-slate-800 hover:border-slate-700 hover:scale-[1.005]'
                  }`}
                >
                  {/* Poster / Cover */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-950">
                    <img
                      src={game.coverUrl}
                      alt={game.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-amber-400 font-bold border border-amber-500/30">
                        {game.titleId}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playSelectSound();
                        onToggleFavoriteGame(game.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 backdrop-blur-md text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      <Star className={`w-3.5 h-3.5 ${game.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>

                    {/* Quick Launch Overlay on Hover */}
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLaunch(game);
                        }}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-950 rounded-lg text-xs font-bold hover:bg-amber-300 transition-transform active:scale-95 shadow-md"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Lancer</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-3.5 flex flex-col flex-1 justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-white tracking-tight truncate group-hover:text-amber-300 transition-colors">
                        {game.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                        <span>{game.genre}</span>
                        <span aria-hidden="true">·</span>
                        <span>{game.sizeGb} Go</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px] text-slate-500">
                      <span className="font-mono text-slate-400">{game.version}</span>
                      <span className="font-mono text-emerald-400/90 truncate max-w-[100px]">
                        {game.installLocation}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredGames.length === 0 && (
            <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl p-8">
              <Gamepad2 className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm text-slate-400 font-medium">Aucun jeu ne correspond à votre recherche.</p>
              <button
                onClick={() => {
                  setSelectedFilter('all');
                  setSearchQuery('');
                }}
                className="mt-3 text-xs text-amber-400 hover:underline"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>

        {/* Section 2: Accès Rapide Multimédia & IPTV */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: IPTV Reprise */}
          <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <Tv className="w-4 h-4" />
                  <span>IPTV & Chaîne Préférée</span>
                </div>
                <button
                  onClick={() => onSelectTab('iptv')}
                  className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <span>Toutes les chaînes</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-4 bg-slate-950/80 rounded-lg p-3 border border-slate-800/80">
                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-700 shrink-0">
                  {recentChannel.logo ? (
                    <img src={recentChannel.logo} alt={recentChannel.name} className="w-10 h-10 object-contain" />
                  ) : (
                    <Tv className="w-6 h-6 text-amber-400" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-white truncate">{recentChannel.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span>{recentChannel.group}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-amber-400">{recentChannel.resolution || '1080p'}</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playSelectSound();
                onPlayChannel(recentChannel);
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>Regarder le direct ({recentChannel.name})</span>
            </button>
          </div>

          {/* Card 2: Vidéo USB Reprise */}
          <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <HardDrive className="w-4 h-4" />
                  <span>Disque Dur Externe (/mnt/usb0)</span>
                </div>
                <button
                  onClick={() => onSelectTab('usb')}
                  className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <span>Explorer les disques</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-4 bg-slate-950/80 rounded-lg p-3 border border-slate-800/80">
                <div className="w-12 h-12 rounded-lg bg-slate-900 flex items-center justify-center overflow-hidden border border-slate-700 shrink-0">
                  <Play className="w-5 h-5 text-amber-400 fill-current" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-semibold text-white truncate">{recentMedia.name}</h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5 font-mono">
                    <span className="uppercase text-amber-400">{recentMedia.format}</span>
                    <span aria-hidden="true">·</span>
                    <span>{recentMedia.duration}</span>
                    <span aria-hidden="true">·</span>
                    <span>{recentMedia.sizeMb} Mo</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playSelectSound();
                onPlayMedia(recentMedia);
              }}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition-colors border border-slate-700"
            >
              <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
              <span>Lire la vidéo ({recentMedia.name})</span>
            </button>
          </div>
        </section>
      </div>

      {/* Add Custom Game Modal */}
      {isAddGameOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-2">Ajouter un jeu PS4 installé</h3>
            <p className="text-xs text-slate-400 mb-5">
              Renseignez les métadonnées du package installé pour l'ajouter à la grille de lancement GoldPlayer.
            </p>

            <form onSubmit={handleCreateGame} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Title ID de la PS4 (ex: CUSA07410)
                </label>
                <input
                  type="text"
                  required
                  value={newTitleId}
                  onChange={(e) => setNewTitleId(e.target.value.toUpperCase())}
                  placeholder="CUSA00123"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Nom du Jeu
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Mon Jeu PS4"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Taille (Go)
                  </label>
                  <input
                    type="number"
                    value={newSize}
                    onChange={(e) => setNewSize(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Genre
                  </label>
                  <input
                    type="text"
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Emplacement d'installation
                </label>
                <select
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value as '/user/app' | '/mnt/usb0')}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="/user/app">Stockage interne (/user/app)</option>
                  <option value="/mnt/usb0">Disque externe USB 0 (/mnt/usb0)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddGameOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors shadow-sm"
                >
                  Ajouter à la bibliothèque
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
