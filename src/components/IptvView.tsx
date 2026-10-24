import React, { useState, useMemo } from 'react';
import {
  Tv,
  Search,
  Star,
  Play,
  Upload,
  Link as LinkIcon,
  Plus,
  Radio,
  FileText,
  Filter
} from 'lucide-react';
import { IPTVChannel } from '../types';
import { parseM3U } from '../utils/m3uParser';
import { playSelectSound, playMoveSound, playNotificationSound } from '../utils/soundEffects';

interface IptvViewProps {
  channels: IPTVChannel[];
  onPlayChannel: (channel: IPTVChannel) => void;
  onToggleFavorite: (channelId: string) => void;
  onImportChannels: (newChannels: IPTVChannel[]) => void;
}

export const IptvView: React.FC<IptvViewProps> = ({
  channels,
  onPlayChannel,
  onToggleFavorite,
  onImportChannels
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
  const [importMode, setImportMode] = useState<'url' | 'file' | 'text'>('url');

  // Import form state
  const [playlistUrl, setPlaylistUrl] = useState<string>('');
  const [rawM3uText, setRawM3uText] = useState<string>('');
  const [isFetchingUrl, setIsFetchingUrl] = useState<boolean>(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    channels.forEach(ch => {
      if (ch.group) set.add(ch.group);
    });
    return Array.from(set).sort();
  }, [channels]);

  // Filter channels
  const filteredChannels = useMemo(() => {
    return channels.filter(ch => {
      if (selectedCategory === 'favorites' && !ch.isFavorite) return false;
      if (selectedCategory !== 'all' && selectedCategory !== 'favorites' && ch.group !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return ch.name.toLowerCase().includes(q) || (ch.group && ch.group.toLowerCase().includes(q));
      }
      return true;
    });
  }, [channels, selectedCategory, searchQuery]);

  const handlePlay = (channel: IPTVChannel) => {
    playSelectSound();
    onPlayChannel(channel);
  };

  // Import from URL
  const handleUrlImport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playlistUrl.trim()) return;

    setIsFetchingUrl(true);
    setImportError(null);

    try {
      const response = await fetch(playlistUrl);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      const parsed = parseM3U(text);
      if (parsed.length === 0) {
        throw new Error('Aucun flux valide détecté dans le fichier M3U.');
      }
      onImportChannels(parsed);
      playNotificationSound();
      setIsImportModalOpen(false);
      setPlaylistUrl('');
    } catch (err) {
      setImportError('Impossible de charger la playlist M3U depuis cette URL (CORS ou URL inaccessible). Vous pouvez copier/coller le texte brut directement ou choisir un fichier local.');
    } finally {
      setIsFetchingUrl(false);
    }
  };

  // Import from local file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const parsed = parseM3U(content);
        if (parsed.length > 0) {
          onImportChannels(parsed);
          playNotificationSound();
          setIsImportModalOpen(false);
        } else {
          setImportError('Le fichier sélectionné ne contient aucun flux vidéo M3U valide.');
        }
      }
    };
    reader.onerror = () => {
      setImportError('Erreur lors de la lecture du fichier.');
    };
    reader.readAsText(file);
  };

  // Import from raw text
  const handleTextImport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rawM3uText.trim()) return;

    const parsed = parseM3U(rawM3uText);
    if (parsed.length > 0) {
      onImportChannels(parsed);
      playNotificationSound();
      setIsImportModalOpen(false);
      setRawM3uText('');
    } else {
      setImportError('Aucune chaîne valide détectée. Assurez-vous que le texte commence par #EXTM3U.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-7 pb-24 text-slate-100">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
        <div>
          <div className="flex items-center gap-2.5">
            <Radio className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Gestionnaire IPTV & Télévision
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Lecteur de flux directs M3U/M3U8 avec regroupement automatique et prise en charge DualShock 4
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              playSelectSound();
              setIsImportModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-300 transition-all shadow-sm shadow-amber-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Importer Playlist M3U</span>
          </button>
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => {
              playSelectSound();
              setSelectedCategory('all');
            }}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            Toutes les chaînes ({channels.length})
          </button>

          <button
            onClick={() => {
              playSelectSound();
              setSelectedCategory('favorites');
            }}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
              selectedCategory === 'favorites'
                ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>Favoris ({channels.filter(c => c.isFavorite).length})</span>
          </button>

          {categories.map((cat) => {
            const count = channels.filter(c => c.group === cat).length;
            return (
              <button
                key={cat}
                onClick={() => {
                  playSelectSound();
                  setSelectedCategory(cat);
                }}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-amber-400 text-slate-950 font-semibold shadow-xs'
                    : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher une chaîne par nom ou catégorie..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
          />
        </div>
      </div>

      {/* Channels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredChannels.map((channel, idx) => (
          <div
            key={channel.id}
            onClick={() => handlePlay(channel)}
            className="group relative rounded-xl border border-slate-800 bg-slate-900/70 hover:border-amber-400/80 hover:bg-slate-800/80 transition-all duration-200 cursor-pointer p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                {/* Channel Logo */}
                <div className="w-12 h-12 rounded-lg bg-slate-950 border border-slate-800 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                  {channel.logo ? (
                    <img
                      src={channel.logo}
                      alt={channel.name}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <Tv className="w-6 h-6 text-amber-400/80" />
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 font-semibold">
                    {channel.resolution || '1080p'}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSelectSound();
                      onToggleFavorite(channel.id);
                    }}
                    className="p-1.5 rounded-full hover:bg-slate-700/80 text-slate-400 hover:text-amber-400 transition-colors"
                    title="Ajouter aux favoris (Touche ▢)"
                  >
                    <Star className={`w-3.5 h-3.5 ${channel.isFavorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Channel Title */}
              <h3 className="text-sm font-semibold text-white tracking-tight truncate group-hover:text-amber-300 transition-colors">
                {channel.name}
              </h3>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                <span className="truncate">{channel.group || 'Général'}</span>
                {channel.language && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{channel.language}</span>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Row */}
            <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-[11px]">
              <span className="font-mono text-slate-500">CANAL {idx + 1}</span>
              <div className="flex items-center gap-1.5 text-amber-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                <Play className="w-3 h-3 fill-current" />
                <span>Regarder</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredChannels.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl p-8">
          <Tv className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">Aucune chaîne trouvée</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Aucun flux ne correspond à votre filtre. Importez une playlist M3U ou modifiez vos critères de recherche.
          </p>
        </div>
      )}

      {/* Import Modal */}
      {isImportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-lg w-full shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Importer une Playlist IPTV M3U</h3>
            <p className="text-xs text-slate-400 mb-5">
              Ajoutez vos listes de chaînes favorites au format M3U ou M3U8.
            </p>

            {/* Mode selection tabs */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl mb-5 border border-slate-800">
              <button
                onClick={() => setImportMode('url')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  importMode === 'url' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Lien URL M3U
              </button>
              <button
                onClick={() => setImportMode('file')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  importMode === 'file' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Fichier Local (.m3u)
              </button>
              <button
                onClick={() => setImportMode('text')}
                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  importMode === 'text' ? 'bg-amber-400 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Copier / Coller
              </button>
            </div>

            {importError && (
              <div className="p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                {importError}
              </div>
            )}

            {importMode === 'url' && (
              <form onSubmit={handleUrlImport} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Adresse URL de la playlist M3U / M3U8
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      required
                      placeholder="https://raw.githubusercontent.com/.../playlist.m3u"
                      value={playlistUrl}
                      onChange={(e) => setPlaylistUrl(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    disabled={isFetchingUrl}
                    className="px-5 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors disabled:opacity-50"
                  >
                    {isFetchingUrl ? 'Chargement...' : 'Télécharger & Analyser'}
                  </button>
                </div>
              </form>
            )}

            {importMode === 'file' && (
              <div className="space-y-4">
                <label className="border-2 border-dashed border-slate-700 hover:border-amber-400/60 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-slate-950/50">
                  <Upload className="w-8 h-8 text-amber-400 mb-2" />
                  <span className="text-xs font-semibold text-white">Choisir un fichier .m3u ou .m3u8</span>
                  <span className="text-[11px] text-slate-400 mt-1">Glissez-déposez ou cliquez pour parcourir</span>
                  <input
                    type="file"
                    accept=".m3u,.m3u8,text/plain"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                <div className="flex justify-end pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Fermer
                  </button>
                </div>
              </div>
            )}

            {importMode === 'text' && (
              <form onSubmit={handleTextImport} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Contenu brut M3U (#EXTM3U ...)
                  </label>
                  <textarea
                    rows={6}
                    required
                    value={rawM3uText}
                    onChange={(e) => setRawM3uText(e.target.value)}
                    placeholder={`#EXTM3U\n#EXTINF:-1 group-title="Actualités",Ma Chaîne 1\nhttp://exemple.com/live.m3u8`}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white font-mono focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-lg hover:bg-amber-300 transition-colors"
                  >
                    Analyser et Ajouter
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
