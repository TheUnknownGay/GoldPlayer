export interface PS4Game {
  id: string;
  titleId: string; // e.g. "CUSA07410"
  name: string;
  coverUrl: string;
  bannerUrl: string;
  sizeGb: number;
  version: string;
  genre: string;
  description: string;
  isFavorite?: boolean;
  installLocation: '/user/app' | '/mnt/usb0' | '/mnt/usb1';
}

export interface IPTVChannel {
  id: string;
  name: string;
  url: string;
  group: string;
  logo: string;
  tvgId?: string;
  tvgName?: string;
  resolution?: '4K' | '1080p' | '720p' | 'SD';
  language?: string;
  isFavorite?: boolean;
}

export interface MediaFile {
  id: string;
  name: string;
  path: string;
  usbSource: 'usb0' | 'usb1' | 'local';
  sizeMb: number;
  duration: string;
  format: 'mp4' | 'mkv' | 'avi' | 'webm' | 'ts';
  thumbnailUrl: string;
  url: string;
}

export interface GoldHenConfig {
  ps4Ip: string;
  restPort: number;
  ftpPort: number;
  klogPort: number;
  autoConnect: boolean;
  isConnected: boolean;
  firmware: string;
  goldHenVersion: string;
}

export interface DesignerInfo {
  designer: string;
  socialNetwork: string;
  phoneNumber: string;
  email: string;
  appTitle: string;
  appVersion: string;
  titleId: string;
  contentId: string;
  toolchain: string;
}
