import React, { useState } from 'react';
import {
  HardDrive,
  Folder,
  FileVideo,
  Play,
  Upload,
  FolderOpen,
  Filter,
  CheckCircle,
  Clock,
  FileText
} from 'lucide-react';
import { MediaFile } from '../types';
import { playSelectSound, playMoveSound, playNotificationSound } from '../utils/soundEffects';

interface UsbMediaViewProps {
  files: MediaFile[];
  onPlayMedia: (file: MediaFile) => void;
  onAddLocalMedia: (file: MediaFile) => void;
}

export const UsbMediaView: React.FC<UsbMediaViewProps> = ({
  files,
  onPlayMedia,
  onAddLocalMedia
}) => {
  const [selectedSource, setSelectedSource] = useState<'all' | 'usb0' | 'usb1' | 'local'>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');

  const filteredFiles = files.filter(f => {
    if (selectedSource !== 'all' && f.usbSource !== selectedSource) return false;
    if (selectedFormat !== 'all' && f.format !== selectedFormat) return false;
    return true;
  });

  const handlePlay = (file: MediaFile) => {
    playSelectSound();
    onPlayMedia(file);
  };

  // Open real local file from disk / USB
  const handleOpenLocalFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const ext = file.name.split('.').pop()?.toLowerCase() || 'mp4';
    const validFormats: Array<MediaFile['format']> = ['mp4', 'mkv', 'avi', 'webm', 'ts'];
    const format = validFormats.includes(ext as MediaFile['format'])
      ? (ext as MediaFile['format'])
      : 'mp4';

    const newMedia: MediaFile = {
      id: `local_${Date.now()}`,
      name: file.name,
      path: `/mnt/usb0/Videos/${file.name}`,
      usbSource: 'local',
      sizeMb: Math.round(file.size / (1024 * 1024)),
      duration: '00:00 (Direct)',
      format,
      thumbnailUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&q=80',
      url: fileUrl
    };

    onAddLocalMedia(newMedia);
    playNotificationSound();
    onPlayMedia(newMedia);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-7 pb-24 text-slate-100">
      {/* Title & Stats */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
        <div>
          <div className="flex items-center gap-2.5">
            <HardDrive className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Explorateur Disque Dur Externe & USB
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Lecture instantanée de vos vidéos MKV, MP4, AVI et TS depuis les ports USB de la PS4 (/mnt/usb0 et /mnt/usb1)
          </p>
        </div>

        {/* Local File Selector */}
        <label className="flex items-center gap-2 px-4 py-2 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-300 transition-all shadow-sm shadow-amber-500/20 active:scale-95 cursor-pointer">
          <Upload className="w-4 h-4" />
          <span>Ouvrir Fichier Vidéo (USB / PC)</span>
          <input
            type="file"
            accept="video/*,.mkv,.mp4,.avi,.ts,.webm,.mov"
            onChange={handleOpenLocalFile}
            className="hidden"
          />
        </label>
      </div>

      {/* USB Drives Indicator Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        <div
          onClick={() => {
            playSelectSound();
            setSelectedSource('usb0');
          }}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            selectedSource === 'usb0'
              ? 'bg-slate-900 border-amber-400 ring-1 ring-amber-400/40'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white">Port USB 0 (Avant Gauche)</span>
            <span className="font-mono text-[10px] text-amber-400 font-bold">/mnt/usb0</span>
          </div>
          <div className="text-xs text-slate-400 mb-2">Samsung T7 Shield (exFAT)</div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full w-[82%]"></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>1.64 To utilisés</span>
            <span>2.0 To Total</span>
          </div>
        </div>

        <div
          onClick={() => {
            playSelectSound();
            setSelectedSource('usb1');
          }}
          className={`p-4 rounded-xl border cursor-pointer transition-all ${
            selectedSource === 'usb1'
              ? 'bg-slate-900 border-amber-400 ring-1 ring-amber-400/40'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-white">Port USB 1 (Avant Droite)</span>
            <span className="font-mono text-[10px] text-amber-400 font-bold">/mnt/usb1</span>
          </div>
          <div className="text-xs text-slate-400 mb-2">SanDisk Extreme 512 Go (FAT32)</div>
          <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full rounded-full w-[45%]"></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
            <span>230 Go utilisés</span>
            <span>512 Go Total</span>
          </div>
        </div>

        <div
          onClick={() => {
            playSelectSound();
            setSelectedSource('all');
          }}
          className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between ${
            selectedSource === 'all'
              ? 'bg-slate-900 border-amber-400 ring-1 ring-amber-400/40'
              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
          }`}
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-white">Tous les Périphériques</span>
              <span className="font-mono text-[10px] text-emerald-400 font-bold">MONTÉ</span>
            </div>
            <div className="text-xs text-slate-400">Total {files.length} fichiers vidéo détectés</div>
          </div>
          <p className="text-[11px] text-amber-300/90 font-medium">
            Afficher la bibliothèque complète des disques
          </p>
        </div>
      </div>

      {/* Format Filter Bar */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto no-scrollbar">
        <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Formats :
        </span>
        {['all', 'mp4', 'mkv', 'avi', 'ts', 'webm'].map((fmt) => (
          <button
            key={fmt}
            onClick={() => {
              playSelectSound();
              setSelectedFormat(fmt);
            }}
            className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-colors ${
              selectedFormat === fmt
                ? 'bg-amber-400 text-slate-950 font-bold shadow-xs'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {fmt === 'all' ? 'Tous' : fmt}
          </button>
        ))}
      </div>

      {/* Media Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5">
        {filteredFiles.map((file) => (
          <div
            key={file.id}
            onClick={() => handlePlay(file)}
            className="group relative rounded-xl border border-slate-800 bg-slate-900/70 hover:border-amber-400/80 hover:bg-slate-800/80 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full bg-slate-950 overflow-hidden">
              <img
                src={file.thumbnailUrl}
                alt={file.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

              {/* Badges */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-amber-400 font-bold border border-amber-500/30 uppercase">
                  {file.format}
                </span>
                <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-slate-300">
                  {file.usbSource === 'local' ? 'Local' : file.usbSource.toUpperCase()}
                </span>
              </div>

              <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-slate-300 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>{file.duration}</span>
              </div>

              {/* Play Hover Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="w-12 h-12 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>

            {/* Information */}
            <div className="p-4 flex flex-col flex-1 justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white tracking-tight truncate group-hover:text-amber-300 transition-colors">
                  {file.name}
                </h3>
                <p className="text-[11px] font-mono text-slate-400 truncate mt-1">
                  {file.path}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[11px]">
                <span className="font-mono text-slate-400">{file.sizeMb} Mo</span>
                <span className="text-amber-400 font-semibold flex items-center gap-1">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Lire</span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <div className="text-center py-16 border border-dashed border-slate-800 rounded-xl p-8">
          <FileVideo className="w-12 h-12 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white">Aucun fichier vidéo trouvé</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Aucun fichier ne correspond à vos filtres. Cliquez sur "Ouvrir Fichier Vidéo" pour charger une vidéo locale ou sélectionnez un autre port USB.
          </p>
        </div>
      )}
    </div>
  );
};
