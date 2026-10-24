import { IPTVChannel } from '../types';

export function parseM3U(rawText: string): IPTVChannel[] {
  let text = rawText.trim();
  // Strip BOM
  if (text.charCodeAt(0) === 0xFEFF) {
    text = text.slice(1);
  }

  const lines = text.split(/\r?\n/);
  const channels: IPTVChannel[] = [];
  
  let currentChannel: Partial<IPTVChannel> | null = null;
  let defaultGroup = 'Général';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith('#EXTINF:')) {
      // Parse EXTINF line
      currentChannel = {};

      // Parse tvg-id
      const idMatch = line.match(/tvg-id="([^"]*)"/i);
      if (idMatch) currentChannel.tvgId = idMatch[1];

      // Parse tvg-name
      const nameMatch = line.match(/tvg-name="([^"]*)"/i);
      if (nameMatch) currentChannel.tvgName = nameMatch[1];

      // Parse tvg-logo
      const logoMatch = line.match(/tvg-logo="([^"]*)"/i);
      if (logoMatch) currentChannel.logo = logoMatch[1];

      // Parse group-title
      const groupMatch = line.match(/group-title="([^"]*)"/i);
      if (groupMatch) {
        currentChannel.group = groupMatch[1];
      } else {
        currentChannel.group = defaultGroup;
      }

      // Parse title (after the comma)
      const commaIdx = line.lastIndexOf(',');
      if (commaIdx !== -1) {
        currentChannel.name = line.substring(commaIdx + 1).trim();
      } else {
        currentChannel.name = currentChannel.tvgName || 'Chaîne sans titre';
      }

      // Detect resolution from name
      const upperName = (currentChannel.name || '').toUpperCase();
      if (upperName.includes('4K') || upperName.includes('UHD')) {
        currentChannel.resolution = '4K';
      } else if (upperName.includes('FHD') || upperName.includes('1080')) {
        currentChannel.resolution = '1080p';
      } else if (upperName.includes('HD') || upperName.includes('720')) {
        currentChannel.resolution = '720p';
      } else {
        currentChannel.resolution = 'SD';
      }

    } else if (line.startsWith('#EXTGRP:')) {
      const groupVal = line.substring(8).trim();
      defaultGroup = groupVal;
      if (currentChannel) {
        currentChannel.group = groupVal;
      }
    } else if (!line.startsWith('#')) {
      // Stream URL line
      if (currentChannel) {
        currentChannel.url = line;
        currentChannel.id = `ch_${channels.length + 1}_${Date.now()}`;
        if (!currentChannel.logo) {
          // Provide placeholder logo
          currentChannel.logo = '';
        }
        if (!currentChannel.group) {
          currentChannel.group = defaultGroup || 'Général';
        }
        channels.push(currentChannel as IPTVChannel);
        currentChannel = null;
      } else {
        // Raw URL without previous EXTINF
        channels.push({
          id: `ch_${channels.length + 1}_${Date.now()}`,
          name: `Flux ${channels.length + 1}`,
          url: line,
          group: defaultGroup || 'Général',
          logo: '',
          resolution: '1080p'
        });
      }
    }
  }

  return channels;
}
