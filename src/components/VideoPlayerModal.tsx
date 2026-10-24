import React, { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  RotateCcw,
  FastForward,
  Rewind,
  Tv,
  Settings,
  Expand
} from 'lucide-react';
import { playBackSound, playSelectSound, playMoveSound } from '../utils/soundEffects';

interface VideoPlayerModalProps {
  title: string;
  streamUrl: string;
  category?: string;
  resolution?: string;
  onClose: () => void;
  onNextChannel?: () => void;
  onPrevChannel?: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  title,
  streamUrl,
  category,
  resolution = 'HD',
  onClose,
  onNextChannel,
  onPrevChannel
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hlsRef = useRef<Hls | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [volume, setVolume] = useState<number>(1);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [aspectRatio, setAspectRatio] = useState<'contain' | 'cover' | 'fill'>('contain');
  const [showControls, setShowControls] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const controlsTimeout = useRef<number | null>(null);

  // Auto-hide controls
  const resetControlsTimeout = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = window.setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3500);
  };

  useEffect(() => {
    resetControlsTimeout();
    return () => {
      if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    };
  }, [isPlaying]);

  // Stream loader effect (HLS.js / Native Video)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    setIsLoading(true);
    setErrorMessage(null);

    // Destroy existing HLS instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const isM3U8 = streamUrl.toLowerCase().includes('.m3u8') || streamUrl.includes('m3u');

    if (isM3U8 && Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
        backBufferLength: 90
      });
      hlsRef.current = hls;

      hls.loadSource(streamUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false);
        video.play().catch(() => {
          setIsPlaying(false);
        });
      });

      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              hls.startLoad();
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              break;
            default:
              setErrorMessage('Erreur lors du chargement du flux M3U8.');
              hls.destroy();
              break;
          }
        }
      });
    } else {
      // Standard MP4 / WebM / Native HLS (Safari/PS4)
      video.src = streamUrl;
      video.onloadeddata = () => {
        setIsLoading(false);
        video.play().catch(() => {
          setIsPlaying(false);
        });
      };
      video.onerror = () => {
        setIsLoading(false);
        setErrorMessage('Impossible de lire ce format vidéo ou flux indisponible.');
      };
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [streamUrl]);

  const togglePlay = () => {
    playSelectSound();
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const seek = (seconds: number) => {
    playMoveSound();
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      videoRef.current.muted = val === 0;
      setIsMuted(val === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const cycleAspectRatio = () => {
    playSelectSound();
    if (aspectRatio === 'contain') setAspectRatio('cover');
    else if (aspectRatio === 'cover') setAspectRatio('fill');
    else setAspectRatio('contain');
  };

  const cyclePlaybackRate = () => {
    playSelectSound();
    const rates = [0.75, 1, 1.25, 1.5, 2];
    const nextIdx = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextIdx];
    setPlaybackRate(nextRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextRate;
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds) || !isFinite(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={resetControlsTimeout}
      className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden select-none"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className={`w-full h-full ${
          aspectRatio === 'contain' ? 'object-contain' : aspectRatio === 'cover' ? 'object-cover' : 'object-fill'
        }`}
        onTimeUpdate={() => {
          if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
            setDuration(videoRef.current.duration || 0);
          }
        }}
        onClick={togglePlay}
        playsInline
      />

      {/* Loading Spinner */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 pointer-events-none">
          <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mb-3"></div>
          <p className="text-sm font-medium text-amber-300">Chargement du flux GoldPlayer...</p>
        </div>
      )}

      {/* Error Overlay */}
      {errorMessage && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 p-6 text-center">
          <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mb-4">
            <X className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Erreur de lecture vidéo</h3>
          <p className="text-sm text-slate-300 max-w-md mb-6">{errorMessage}</p>
          <div className="flex gap-4">
            <button
              onClick={() => {
                if (videoRef.current) {
                  videoRef.current.load();
                }
              }}
              className="px-4 py-2 bg-amber-400 text-slate-900 rounded-lg text-sm font-semibold hover:bg-amber-300"
            >
              Réessayer
            </button>
            <button
              onClick={() => {
                playBackSound();
                onClose();
              }}
              className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-700"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      {/* Top Header Overlay */}
      <div
        className={`absolute top-0 left-0 right-0 p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white tracking-wide">{title}</h2>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
              <span>{category || 'Média GoldPlayer'}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono text-amber-400">{resolution}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            playBackSound();
            onClose();
          }}
          className="p-2.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          title="Fermer (Touche ◯ ou Échap)"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Controls Overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Progress Bar (for VOD/Files, subtle indicator for Live) */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-1.5">
            <span>{formatTime(currentTime)}</span>
            <span>{duration > 0 ? formatTime(duration) : '● EN DIRECT'}</span>
          </div>
          <div
            onClick={(e) => {
              if (duration > 0 && videoRef.current) {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                videoRef.current.currentTime = pos * duration;
              }
            }}
            className="w-full h-1.5 bg-slate-800 rounded-full cursor-pointer overflow-hidden relative group"
          >
            <div
              className="h-full bg-amber-400 rounded-full transition-all"
              style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 100}%` }}
            />
          </div>
        </div>

        {/* Action Controls Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => seek(-10)}
              className="p-2 text-slate-300 hover:text-amber-400 transition-colors"
              title="Reculer de 10s"
            >
              <Rewind className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="p-3 bg-amber-400 text-slate-950 rounded-full hover:bg-amber-300 transition-transform active:scale-95 shadow-lg shadow-amber-500/20"
              title={isPlaying ? 'Pause' : 'Lecture'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            <button
              onClick={() => seek(10)}
              className="p-2 text-slate-300 hover:text-amber-400 transition-colors"
              title="Avancer de 10s"
            >
              <FastForward className="w-5 h-5" />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 ml-2">
              <button onClick={toggleMute} className="text-slate-300 hover:text-white">
                {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-amber-400 h-1 bg-slate-700 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            {/* Aspect Ratio Switcher */}
            <button
              onClick={cycleAspectRatio}
              className="px-2.5 py-1.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 font-medium"
              title="Format d'affichage"
            >
              Format: {aspectRatio === 'contain' ? '16:9' : aspectRatio === 'cover' ? 'Zoom' : 'Étiré'}
            </button>

            {/* Speed Rate */}
            <button
              onClick={cyclePlaybackRate}
              className="px-2.5 py-1.5 rounded bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 font-mono"
              title="Vitesse de lecture"
            >
              {playbackRate}x
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded bg-slate-800/80 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              title="Plein écran"
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
