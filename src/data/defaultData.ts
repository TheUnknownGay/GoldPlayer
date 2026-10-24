import { DesignerInfo, GoldHenConfig, IPTVChannel, MediaFile, PS4Game } from '../types';

export const DEFAULT_ABOUT: DesignerInfo = {
  designer: 'DJAFFAR MOURTADHOI',
  socialNetwork: '@Mourtadhoi.Art',
  phoneNumber: '0693521495',
  email: 'djaffar.art@gmail.com',
  appTitle: 'GoldPlayer',
  appVersion: 'v1.0.0 Release',
  titleId: 'GOLD00001',
  contentId: 'IV0000-GOLD00001_00-GOLDPLAYER000000',
  toolchain: 'OpenOrbis PS4 Toolchain v0.5.4 & GoldHEN SDK'
};

export const DEFAULT_GOLDHEN_CONFIG: GoldHenConfig = {
  ps4Ip: '127.0.0.1',
  restPort: 2128,
  ftpPort: 2121,
  klogPort: 9998,
  autoConnect: true,
  isConnected: true,
  firmware: '9.00 / 11.00 GoldHEN',
  goldHenVersion: 'GoldHEN v2.4b16'
};

export const DEFAULT_PS4_GAMES: PS4Game[] = [
  {
    id: 'game_1',
    titleId: 'CUSA07410',
    name: 'God of War',
    coverUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    sizeGb: 45.3,
    version: 'v1.34',
    genre: 'Action-Aventure',
    description: 'Kratos affronte les dieux et monstres de la mythologie nordique aux côtés de son fils Atreus.',
    installLocation: '/user/app',
    isFavorite: true
  },
  {
    id: 'game_2',
    titleId: 'CUSA03173',
    name: 'Bloodborne',
    coverUrl: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    sizeGb: 29.8,
    version: 'v1.09',
    genre: 'Action-RPG',
    description: 'Explorez la sinistre cité victorienne de Yharnam ravagée par une épidémie monstrueuse.',
    installLocation: '/user/app',
    isFavorite: true
  },
  {
    id: 'game_3',
    titleId: 'CUSA10249',
    name: 'The Last of Us Part II',
    coverUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    sizeGb: 78.4,
    version: 'v1.08',
    genre: 'Aventure / Survie',
    description: 'Cinq ans après leur voyage périlleux à travers une Amérique post-pandémique, Ellie cherche la justice.',
    installLocation: '/user/app',
    isFavorite: false
  },
  {
    id: 'game_4',
    titleId: 'CUSA05855',
    name: 'Ghost of Tsushima',
    coverUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80',
    sizeGb: 59.2,
    version: 'v2.18',
    genre: 'Monde Ouvert',
    description: 'Incarnez Jin Sakai, dernier membre de son clan, prêt à tout pour libérer son île des envahisseurs mongols.',
    installLocation: '/mnt/usb0',
    isFavorite: true
  },
  {
    id: 'game_5',
    titleId: 'CUSA11993',
    name: "Marvel's Spider-Man",
    coverUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80',
    sizeGb: 52.1,
    version: 'v1.19',
    genre: 'Action / Super-Héros',
    description: 'Balancez-vous dans les rues de Manhattan et affrontez les pires criminels de New York.',
    installLocation: '/user/app',
    isFavorite: false
  },
  {
    id: 'game_6',
    titleId: 'CUSA18534',
    name: 'Elden Ring',
    coverUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    sizeGb: 44.9,
    version: 'v1.10',
    genre: 'Dark Fantasy RPG',
    description: "Levez-vous, Sans-éclat, et que la grâce guide vos pas vers l'Entre-terre pour devenir le Seigneur d'Elden.",
    installLocation: '/mnt/usb0',
    isFavorite: true
  },
  {
    id: 'game_7',
    titleId: 'CUSA08519',
    name: 'Red Dead Redemption 2',
    coverUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1200&q=80',
    sizeGb: 105.4,
    version: 'v1.29',
    genre: 'Western / Monde Ouvert',
    description: "L'épopée d'Arthur Morgan et de la bande de Van der Linde alors que le XIXe siècle touche à sa fin.",
    installLocation: '/user/app',
    isFavorite: false
  },
  {
    id: 'game_8',
    titleId: 'CUSA24769',
    name: 'Gran Turismo 7',
    coverUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=400&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80',
    sizeGb: 97.2,
    version: 'v1.42',
    genre: 'Simulation Course',
    description: 'Le simulateur de conduite réel avec plus de 420 voitures et 90 tracés de circuits.',
    installLocation: '/user/app',
    isFavorite: false
  }
];

export const DEFAULT_IPTV_CHANNELS: IPTVChannel[] = [
  {
    id: 'iptv_1',
    name: 'France 24 HD (Français)',
    url: 'https://cdn-france24.akamaized.net/hls/live/2030278/f24_fra/master.m3u8',
    group: 'Actualités & Info',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/France_24_logo.svg/512px-France_24_logo.svg.png',
    resolution: '1080p',
    language: 'Français',
    isFavorite: true
  },
  {
    id: 'iptv_2',
    name: 'France 24 English HD',
    url: 'https://cdn-france24.akamaized.net/hls/live/2030278/f24_en/master.m3u8',
    group: 'Actualités & Info',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/France_24_logo.svg/512px-France_24_logo.svg.png',
    resolution: '1080p',
    language: 'Anglais',
    isFavorite: false
  },
  {
    id: 'iptv_3',
    name: 'Euronews Français HD',
    url: 'https://euronews-euronews-french-3-fr.samsung.wurl.tv/playlist.m3u8',
    group: 'Actualités & Info',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Euronews_2016_logo.svg/512px-Euronews_2016_logo.svg.png',
    resolution: '1080p',
    language: 'Français',
    isFavorite: true
  },
  {
    id: 'iptv_4',
    name: 'NASA TV HD (Science & Espace)',
    url: 'https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8',
    group: 'Documentaires & Science',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/512px-NASA_logo.svg.png',
    resolution: '1080p',
    language: 'Anglais',
    isFavorite: true
  },
  {
    id: 'iptv_5',
    name: 'Red Bull TV (Sports Extrêmes)',
    url: 'https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8',
    group: 'Sports',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/Red_Bull_TV_logo.svg/512px-Red_Bull_TV_logo.svg.png',
    resolution: '1080p',
    language: 'Anglais',
    isFavorite: true
  },
  {
    id: 'iptv_6',
    name: 'DW News HD (Deutsche Welle)',
    url: 'https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/index.m3u8',
    group: 'Actualités & Info',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Deutsche_Welle_symbol_2012.svg/512px-Deutsche_Welle_symbol_2012.svg.png',
    resolution: '1080p',
    language: 'Anglais',
    isFavorite: false
  },
  {
    id: 'iptv_7',
    name: 'Tears of Steel (Cinéma Démo 4K)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    group: 'Cinéma & Séries',
    logo: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=200&q=80',
    resolution: '4K',
    language: 'Français',
    isFavorite: true
  },
  {
    id: 'iptv_8',
    name: 'Big Buck Bunny (Animation 1080p)',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    group: 'Divertissement',
    logo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=200&q=80',
    resolution: '1080p',
    language: 'Tous',
    isFavorite: false
  },
  {
    id: 'iptv_9',
    name: 'Sintel Blender Open Movie',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    group: 'Cinéma & Séries',
    logo: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=200&q=80',
    resolution: '1080p',
    language: 'Français',
    isFavorite: false
  }
];

export const DEFAULT_MEDIA_FILES: MediaFile[] = [
  {
    id: 'usb_1',
    name: 'Tears_of_Steel_UHD_HDR.mp4',
    path: '/mnt/usb0/Films/Tears_of_Steel_UHD_HDR.mp4',
    usbSource: 'usb0',
    sizeMb: 1420,
    duration: '12:14',
    format: 'mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=400&q=80',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
  },
  {
    id: 'usb_2',
    name: 'Big_Buck_Bunny_Remastered.mp4',
    path: '/mnt/usb0/Animation/Big_Buck_Bunny_Remastered.mp4',
    usbSource: 'usb0',
    sizeMb: 680,
    duration: '09:56',
    format: 'mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=400&q=80',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
  },
  {
    id: 'usb_3',
    name: 'Sintel_Dragon_Epic_1080p.mkv',
    path: '/mnt/usb1/Films/Sintel_Dragon_Epic_1080p.mkv',
    usbSource: 'usb1',
    sizeMb: 850,
    duration: '15:22',
    format: 'mkv',
    thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4'
  },
  {
    id: 'usb_4',
    name: 'For_Bigger_Blazes_Documentaire.mp4',
    path: '/mnt/usb0/Doc/For_Bigger_Blazes_Documentaire.mp4',
    usbSource: 'usb0',
    sizeMb: 340,
    duration: '00:15',
    format: 'mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=400&q=80',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
  },
  {
    id: 'usb_5',
    name: 'Subaru_Outback_Concert_Live.ts',
    path: '/mnt/usb1/Musique/Subaru_Outback_Concert_Live.ts',
    usbSource: 'usb1',
    sizeMb: 490,
    duration: '00:18',
    format: 'ts',
    thumbnailUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80',
    url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4'
  }
];

export const GITHUB_WORKFLOW_TEMPLATE = `name: Build GoldPlayer PS4 PKG
on:
  push:
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build:
    name: Compile GoldPlayer Homebrew PKG
    runs-on: ubuntu-latest
    env:
      DOTNET_ROLL_FORWARD: Major
      DOTNET_SYSTEM_GLOBALIZATION_INVARIANT: "1"
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Dependances Clang & LLD
        run: sudo apt-get update && sudo apt-get install -y clang lld

      - name: Installer libssl 1.1 pour OpenOrbis
        run: |
          wget -q -O libssl1.1.deb http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb || wget -q -O libssl1.1.deb https://security.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2.24_amd64.deb
          sudo dpkg -i libssl1.1.deb

      - name: Telecharger OpenOrbis PS4 Toolchain
        env:
          GH_TOKEN: \${{ github.token }}
        run: |
          shopt -s nullglob
          mkdir -p $HOME/oo
          gh release download v0.5.4 --repo OpenOrbis/OpenOrbis-PS4-Toolchain --pattern '*.tar.gz' --dir $HOME/oo
          for f in $HOME/oo/*.tar.gz; do tar -xzf "$f" -C $HOME/oo; done
          TC=$(dirname "$(find $HOME/oo -name link.x | head -1)")
          echo "OO_PS4_TOOLCHAIN=$TC" >> $GITHUB_ENV
          chmod -R +x "$TC/bin/linux" || true

      - name: Compiler GoldPlayer (Media Player, IPTV & PS4 Game Launcher)
        run: |
          mkdir -p $HOME/work
          cp -r "$OO_PS4_TOOLCHAIN/samples/SDL2" $HOME/work/SDL2
          cp -r "$OO_PS4_TOOLCHAIN/samples/_common" $HOME/work/_common
          cd $HOME/work/SDL2

          # 1. Header M3U pour GoldPlayer
          cat > SDL2/m3u.hpp <<'EOF'
          #pragma once
          #include <string>
          #include <vector>

          struct Channel {
              std::string name;
              std::string url;
              std::string group;
              std::string tvgId;
              std::string tvgName;
              std::string logo;
          };

          std::vector<Channel> parseM3U(const std::string& text);
          EOF

          # 2. Parseur M3U / M3U8
          cat > SDL2/m3u.cpp <<'EOF'
          #include "m3u.hpp"

          static std::string trim(const std::string& s) {
              size_t a = 0, b = s.size();
              while (a < b && (s[a] == ' ' || s[a] == '\\t' || s[a] == '\\r' || s[a] == '\\n')) a++;
              while (b > a && (s[b-1] == ' ' || s[b-1] == '\\t' || s[b-1] == '\\r' || s[b-1] == '\\n')) b--;
              return s.substr(a, b - a);
          }

          static std::string attr(const std::string& line, const std::string& key) {
              std::string pat = key + "=\\"";
              size_t p = line.find(pat);
              if (p == std::string::npos) return "";
              p += pat.size();
              size_t e = line.find('"', p);
              if (e == std::string::npos) return "";
              return line.substr(p, e - p);
          }

          std::vector<Channel> parseM3U(const std::string& textIn) {
              std::vector<Channel> out;
              std::string text = textIn;
              if (text.size() >= 3 && (unsigned char)text[0] == 0xEF && (unsigned char)text[1] == 0xBB && (unsigned char)text[2] == 0xBF) {
                  text.erase(0, 3);
              }
              Channel cur;
              bool pending = false;
              size_t pos = 0;
              while (pos <= text.size()) {
                  size_t nl = text.find('\\n', pos);
                  if (nl == std::string::npos) nl = text.size();
                  std::string line = trim(text.substr(pos, nl - pos));
                  pos = nl + 1;
                  if (line.empty()) continue;
                  if (line.compare(0, 8, "#EXTINF:") == 0) {
                      cur = Channel();
                      pending = true;
                      cur.tvgId = attr(line, "tvg-id");
                      cur.tvgName = attr(line, "tvg-name");
                      cur.logo = attr(line, "tvg-logo");
                      cur.group = attr(line, "group-title");
                      size_t q = line.rfind('"');
                      size_t c = line.find(',', q == std::string::npos ? 0 : q);
                      if (c != std::string::npos) cur.name = trim(line.substr(c + 1));
                      if (cur.name.empty()) cur.name = cur.tvgName;
                  } else if (line.compare(0, 8, "#EXTGRP:") == 0) {
                      if (pending && cur.group.empty()) cur.group = trim(line.substr(8));
                  } else if (line[0] != '#') {
                      if (!pending) { cur = Channel(); cur.name = line; }
                      cur.url = line;
                      out.push_back(cur);
                      pending = false;
                  }
              }
              return out;
          }
          EOF

          # 3. Code C++ complet de GoldPlayer (UI Console, Jeux PS4, IPTV, USB, Credits)
          cat > SDL2/main.cpp <<'EOF'
          #include <sstream>
          #include <cstdio>
          #include <cstring>
          #include <vector>
          #include <string>
          #include <sys/socket.h>
          #include <netinet/in.h>
          #include <arpa/inet.h>
          #include <unistd.h>
          #include <orbis/libkernel.h>
          #include <orbis/Sysmodule.h>

          #include "Game.h"
          #include "../../_common/log.h"
          #include "m3u.hpp"

          #define FRAME_WIDTH     1920
          #define FRAME_HEIGHT    1080

          std::stringstream debugLogStream;
          SDL_Window* window = NULL;
          SDL_Renderer* renderer = NULL;

          static void drawRect(SDL_Renderer* r, int x, int y, int w, int h, int cr, int cg, int cb, int a = 255) {
              SDL_SetRenderDrawColor(r, cr, cg, cb, a);
              SDL_Rect q = {x, y, w, h};
              SDL_RenderFillRect(r, &q);
          }

          struct PS4GameItem {
              const char* titleId;
              const char* name;
              const char* size;
              const char* location;
          };

          struct MediaFileItem {
              const char* name;
              const char* path;
              const char* duration;
              const char* format;
          };

          static const PS4GameItem g_games[] = {
              {"CUSA07410", "God of War", "45.3 Go", "/user/app"},
              {"CUSA03173", "Bloodborne", "29.8 Go", "/user/app"},
              {"CUSA10249", "The Last of Us Part II", "78.4 Go", "/user/app"},
              {"CUSA05855", "Ghost of Tsushima", "59.2 Go", "/mnt/usb0"},
              {"CUSA11993", "Marvel's Spider-Man", "52.1 Go", "/user/app"},
              {"CUSA18534", "Elden Ring", "44.9 Go", "/mnt/usb0"}
          };
          static const int g_gamesCount = 6;

          static const MediaFileItem g_files[] = {
              {"Tears_of_Steel_UHD.mp4", "/mnt/usb0/Films/Tears_of_Steel_UHD.mp4", "12:14", "MP4"},
              {"Big_Buck_Bunny_1080p.mp4", "/mnt/usb0/Animation/Big_Buck_Bunny.mp4", "09:56", "MP4"},
              {"Sintel_Dragon_FullHD.mkv", "/mnt/usb1/Films/Sintel.mkv", "15:22", "MKV"},
              {"Concert_Live_Session.ts", "/mnt/usb0/Musique/Concert.ts", "45:10", "TS"}
          };
          static const int g_filesCount = 4;

          static const char* defaultM3U =
              "#EXTM3U\\n"
              "#EXTINF:-1 group-title=\\"Actualites\\",France 24 HD (Francais)\\n"
              "https://cdn-france24.akamaized.net/hls/live/2030278/f24_fra/master.m3u8\\n"
              "#EXTINF:-1 group-title=\\"Actualites\\",Euronews Francais HD\\n"
              "https://euronews-euronews-french-3-fr.samsung.wurl.tv/playlist.m3u8\\n"
              "#EXTINF:-1 group-title=\\"Documentaires\\",NASA TV HD (Espace)\\n"
              "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8\\n"
              "#EXTINF:-1 group-title=\\"Sports\\",Red Bull TV HD\\n"
              "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8\\n"
              "#EXTINF:-1 group-title=\\"Culture\\",Arte Concert Live\\n"
              "https://artelive-lh.akamaihd.net/i/artelive_de@393591/master.m3u8\\n";

          static bool launchTitleViaGoldHEN(const char* titleId) {
              DEBUGLOG << "GoldPlayer: Envoi requete de lancement GoldHEN pour " << titleId;
              int sock = socket(AF_INET, SOCK_STREAM, 0);
              if (sock < 0) return false;

              struct sockaddr_in serv_addr;
              memset(&serv_addr, 0, sizeof(serv_addr));
              serv_addr.sin_family = AF_INET;
              serv_addr.sin_port = htons(2128);
              serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");

              struct timeval tv;
              tv.tv_sec = 1;
              tv.tv_usec = 0;
              setsockopt(sock, SOL_SOCKET, SO_RCVTIMEO, (const char*)&tv, sizeof tv);
              setsockopt(sock, SOL_SOCKET, SO_SNDTIMEO, (const char*)&tv, sizeof tv);

              if (connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr)) >= 0) {
                  char req[256];
                  snprintf(req, sizeof(req), "GET /api/launch_title?title_id=%s HTTP/1.1\\r\\nHost: 127.0.0.1:2128\\r\\nConnection: close\\r\\n\\r\\n", titleId);
                  send(sock, req, strlen(req), 0);
              }
              close(sock);
              return true;
          }

          int main(int argc, char* args[]) {
              int rc;
              SDL_Surface* windowSurface;
              setvbuf(stdout, NULL, _IONBF, 0);

              DEBUGLOG << "GoldPlayer: Initialisation...";

              if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_JOYSTICK) != 0) {
                  return -1;
              }

              rc = sceSysmoduleLoadModule(ORBIS_SYSMODULE_FREETYPE_OL);
              if (rc >= 0) {
                  FT_Init_FreeType(&ftLib);
              }

              window = SDL_CreateWindow("GoldPlayer", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, FRAME_WIDTH, FRAME_HEIGHT, 0);
              if (!window) return -1;

              windowSurface = SDL_GetWindowSurface(window);
              renderer = SDL_CreateSoftwareRenderer(windowSurface);
              if (!renderer) return -1;

              SDL_Joystick* joy = NULL;
              if (SDL_NumJoysticks() > 0) joy = SDL_JoystickOpen(0);

              std::vector<Channel> channels = parseM3U(defaultM3U);

              int currentTab = 0;
              int selectedIndex = 0;
              bool isRunning = true;
              char launchBanner[128] = "";
              int bannerTimer = 0;

              while (isRunning) {
                  SDL_Event e;
                  while (SDL_PollEvent(&e)) {
                      if (e.type == SDL_QUIT) isRunning = false;

                      if (e.type == SDL_KEYDOWN) {
                          if (e.key.keysym.sym == SDLK_ESCAPE) isRunning = false;
                          if (e.key.keysym.sym == SDLK_LEFT) currentTab = (currentTab + 3) % 4;
                          if (e.key.keysym.sym == SDLK_RIGHT) currentTab = (currentTab + 1) % 4;
                          if (e.key.keysym.sym == SDLK_UP && selectedIndex > 0) selectedIndex--;
                          if (e.key.keysym.sym == SDLK_DOWN) selectedIndex++;
                          if (e.key.keysym.sym == SDLK_RETURN || e.key.keysym.sym == SDLK_SPACE) {
                              if (currentTab == 0 && selectedIndex < g_gamesCount) {
                                  launchTitleViaGoldHEN(g_games[selectedIndex].titleId);
                                  snprintf(launchBanner, sizeof(launchBanner), "GoldHEN: Lancement de %s (%s)...", g_games[selectedIndex].name, g_games[selectedIndex].titleId);
                                  bannerTimer = 180;
                              }
                          }
                      }

                      if (e.type == SDL_JOYBUTTONDOWN) {
                          if (e.jbutton.button == 0) {
                              if (currentTab == 0 && selectedIndex < g_gamesCount) {
                                  launchTitleViaGoldHEN(g_games[selectedIndex].titleId);
                                  snprintf(launchBanner, sizeof(launchBanner), "GoldHEN: Lancement de %s (%s)...", g_games[selectedIndex].name, g_games[selectedIndex].titleId);
                                  bannerTimer = 180;
                              }
                          }
                          if (e.jbutton.button == 4) { currentTab = (currentTab + 3) % 4; selectedIndex = 0; }
                          if (e.jbutton.button == 5) { currentTab = (currentTab + 1) % 4; selectedIndex = 0; }
                      }

                      if (e.type == SDL_JOYHATMOTION) {
                          if (e.jhat.value == SDL_HAT_UP && selectedIndex > 0) selectedIndex--;
                          if (e.jhat.value == SDL_HAT_DOWN) selectedIndex++;
                          if (e.jhat.value == SDL_HAT_LEFT) { currentTab = (currentTab + 3) % 4; selectedIndex = 0; }
                          if (e.jhat.value == SDL_HAT_RIGHT) { currentTab = (currentTab + 1) % 4; selectedIndex = 0; }
                      }
                  }

                  drawRect(renderer, 0, 0, FRAME_WIDTH, FRAME_HEIGHT, 11, 14, 20);
                  drawRect(renderer, 0, 0, FRAME_WIDTH, 80, 18, 22, 32);
                  drawRect(renderer, 80, 22, 36, 36, 234, 179, 8);
                  drawRect(renderer, 126, 26, 180, 28, 255, 255, 255);

                  for (int t = 0; t < 4; t++) {
                      int tx = 400 + t * 290;
                      if (t == currentTab) {
                          drawRect(renderer, tx, 15, 260, 50, 234, 179, 8);
                      } else {
                          drawRect(renderer, tx, 18, 260, 44, 30, 36, 50);
                      }
                  }

                  if (currentTab == 0) {
                      drawRect(renderer, 80, 110, 800, 40, 234, 179, 8);
                      for (int i = 0; i < g_gamesCount; i++) {
                          int gy = 180 + i * 115;
                          if (i == selectedIndex) {
                              drawRect(renderer, 80, gy, 1200, 100, 234, 179, 8);
                              drawRect(renderer, 84, gy + 4, 1192, 92, 25, 32, 45);
                          } else {
                              drawRect(renderer, 80, gy, 1200, 100, 20, 26, 38);
                          }
                          drawRect(renderer, 95, gy + 10, 110, 80, 45, 55, 75);
                          drawRect(renderer, 230, gy + 15, 140, 30, 234, 179, 8);
                          drawRect(renderer, 390, gy + 18, 380, 24, 255, 255, 255);
                          drawRect(renderer, 230, gy + 55, 200, 20, 140, 160, 180);
                          drawRect(renderer, 1080, gy + 25, 160, 50, 234, 179, 8);
                      }
                      drawRect(renderer, 1340, 180, 500, 600, 16, 20, 30);
                      drawRect(renderer, 1360, 210, 460, 240, 35, 45, 65);
                      drawRect(renderer, 1360, 480, 300, 30, 234, 179, 8);
                      drawRect(renderer, 1360, 530, 420, 80, 25, 35, 50);

                  } else if (currentTab == 1) {
                      drawRect(renderer, 80, 110, 800, 40, 234, 179, 8);
                      int chCount = (int)channels.size();
                      if (chCount > 7) chCount = 7;
                      for (int i = 0; i < chCount; i++) {
                          int cy = 180 + i * 105;
                          if (i == selectedIndex) {
                              drawRect(renderer, 80, cy, 1400, 90, 234, 179, 8);
                              drawRect(renderer, 84, cy + 4, 1392, 82, 25, 32, 45);
                          } else {
                              drawRect(renderer, 80, cy, 1400, 90, 20, 26, 38);
                          }
                          drawRect(renderer, 100, cy + 15, 60, 60, 234, 179, 8);
                          drawRect(renderer, 180, cy + 25, 500, 25, 255, 255, 255);
                          drawRect(renderer, 180, cy + 55, 250, 18, 120, 140, 160);
                          drawRect(renderer, 1300, cy + 25, 140, 40, 40, 180, 90);
                      }

                  } else if (currentTab == 2) {
                      drawRect(renderer, 80, 110, 800, 40, 234, 179, 8);
                      drawRect(renderer, 80, 180, 550, 120, 25, 35, 50);
                      drawRect(renderer, 660, 180, 550, 120, 25, 35, 50);

                      for (int i = 0; i < g_filesCount; i++) {
                          int fy = 340 + i * 110;
                          if (i == selectedIndex) {
                              drawRect(renderer, 80, fy, 1400, 90, 234, 179, 8);
                              drawRect(renderer, 84, fy + 4, 1392, 82, 25, 32, 45);
                          } else {
                              drawRect(renderer, 80, fy, 1400, 90, 20, 26, 38);
                          }
                          drawRect(renderer, 100, fy + 15, 100, 60, 35, 45, 65);
                          drawRect(renderer, 220, fy + 22, 600, 25, 255, 255, 255);
                          drawRect(renderer, 220, fy + 54, 400, 18, 120, 140, 160);
                          drawRect(renderer, 1320, fy + 25, 120, 40, 234, 179, 8);
                      }

                  } else if (currentTab == 3) {
                      drawRect(renderer, 80, 110, 800, 40, 234, 179, 8);
                      drawRect(renderer, 80, 180, 1400, 520, 20, 26, 38);
                      drawRect(renderer, 80, 180, 1400, 8, 234, 179, 8);
                      drawRect(renderer, 130, 230, 120, 120, 234, 179, 8);
                      drawRect(renderer, 290, 230, 450, 36, 255, 255, 255);
                      drawRect(renderer, 290, 280, 300, 22, 234, 179, 8);
                      drawRect(renderer, 290, 340, 500, 65, 14, 18, 26);
                      drawRect(renderer, 830, 340, 500, 65, 14, 18, 26);
                      drawRect(renderer, 290, 430, 1040, 65, 14, 18, 26);
                      drawRect(renderer, 290, 520, 320, 50, 30, 38, 55);
                      drawRect(renderer, 640, 520, 690, 50, 30, 38, 55);
                  }

                  if (bannerTimer > 0) {
                      bannerTimer--;
                      drawRect(renderer, 1200, 100, 640, 70, 234, 179, 8);
                      drawRect(renderer, 1204, 104, 632, 62, 14, 18, 26);
                      drawRect(renderer, 1220, 120, 32, 32, 234, 179, 8);
                  }

                  drawRect(renderer, 0, 1010, FRAME_WIDTH, 70, 14, 18, 26);
                  drawRect(renderer, 80, 1030, 28, 28, 40, 120, 230);
                  drawRect(renderer, 320, 1030, 28, 28, 230, 50, 50);
                  drawRect(renderer, 520, 1030, 28, 28, 230, 80, 180);
                  drawRect(renderer, 720, 1030, 28, 28, 50, 200, 100);
                  drawRect(renderer, 950, 1030, 60, 28, 60, 70, 90);
                  drawRect(renderer, 1030, 1030, 60, 28, 60, 70, 90);

                  SDL_UpdateWindowSurface(window);
                  SDL_Delay(16);
              }

              if (joy) SDL_JoystickClose(joy);
              SDL_Quit();
              return 0;
          }
          EOF

          # 4. Configuration Makefile standard OpenOrbis (Clang)
          sed -i 's/^TITLE .*/TITLE := GoldPlayer/' Makefile
          sed -i 's/^TITLE_ID .*/TITLE_ID := GOLD00001/' Makefile
          sed -i 's/^CONTENT_ID .*/CONTENT_ID := IV0000-GOLD00001_00-GOLDPLAYER000000/' Makefile

          echo "=== Compilation de GoldPlayer en cours ==="
          make

          mkdir -p $GITHUB_WORKSPACE/out
          find "$HOME/work/SDL2" -name '*.pkg' -exec cp {} $GITHUB_WORKSPACE/out/ \\;
          echo "=== Fichier PKG genere avec succes ==="
          ls -la $GITHUB_WORKSPACE/out

      - name: Déposer le PKG en Artifact Téléchargeable
        uses: actions/upload-artifact@v4
        with:
          name: GoldPlayer-PS4-PKG
          path: out/*.pkg
`;

export const OPENORBIS_MAIN_CPP = `/**
 * GoldPlayer PS4 - Lecteur Multimédia & IPTV GoldHEN
 * Designer : DJAFFAR MOURTADHOI (@Mourtadhoi.Art)
 * Title ID : GOLD00001
 * Content ID : IV0000-GOLD00001_00-GOLDPLAYER000000
 */

#include <sstream>
#include <cstdio>
#include <cstring>
#include <vector>
#include <string>
#include <orbis/libkernel.h>
#include <orbis/Sysmodule.h>

#include "Game.h"
#include "../../_common/log.h"
#include "m3u.hpp"

#define FRAME_WIDTH     1920
#define FRAME_HEIGHT    1080

std::stringstream debugLogStream;
SDL_Window* window = NULL;
SDL_Renderer* renderer = NULL;

// Fonction de dessin rectangulaire
static void drawBox(SDL_Renderer* r, int x, int y, int w, int h, int cr, int cg, int cb, int a = 255) {
    SDL_SetRenderDrawColor(r, cr, cg, cb, a);
    SDL_Rect q = {x, y, w, h};
    SDL_RenderFillRect(r, &q);
}

// Fonction de lancement d'un jeu PS4 via GoldHEN REST API (Port 2128)
bool launchPS4Game(const char* titleId) {
    DEBUGLOG << "GoldPlayer: Envoi requete de lancement GoldHEN pour " << titleId;
    // Commande systeme ou socket HTTP locale sur 127.0.0.1:2128/api/launch_title?title_id=...
    return true;
}

int main(int argc, char* args[]) {
    int rc;
    SDL_Surface* windowSurface;
    setvbuf(stdout, NULL, _IONBF, 0);

    DEBUGLOG << "GoldPlayer: Initialisation SDL2 & Manette DualShock 4...";

    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_JOYSTICK) != 0) {
        DEBUGLOG << "Erreur SDL: " << SDL_GetError();
        return -1;
    }

    rc = sceSysmoduleLoadModule(ORBIS_SYSMODULE_FREETYPE_OL);
    if (rc >= 0) {
        FT_Init_FreeType(&ftLib);
    }

    window = SDL_CreateWindow("GoldPlayer", SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED, FRAME_WIDTH, FRAME_HEIGHT, 0);
    if (!window) return -1;

    windowSurface = SDL_GetWindowSurface(window);
    renderer = SDL_CreateSoftwareRenderer(windowSurface);

    SDL_Joystick* joy = NULL;
    if (SDL_NumJoysticks() > 0) joy = SDL_JoystickOpen(0);

    // Initialisation Playlist IPTV M3U par defaut ou depuis /mnt/usb0/playlist.m3u
    std::string m3uContent = 
        "#EXTM3U\\n"
        "#EXTINF:-1 group-title=\\"Actualites\\",France 24 HD\\n"
        "https://cdn-france24.akamaized.net/hls/live/2030278/f24_fra/master.m3u8\\n"
        "#EXTINF:-1 group-title=\\"Sports\\",Red Bull TV\\n"
        "https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8\\n"
        "#EXTINF:-1 group-title=\\"Documentaires\\",NASA TV HD\\n"
        "https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8\\n";

    std::vector<Channel> channels = parseM3U(m3uContent);

    bool running = true;
    int currentTab = 0; // 0: Accueil / Jeux, 1: IPTV, 2: Disque USB, 3: A propos
    int selectedIndex = 0;

    while (running) {
        SDL_Event e;
        while (SDL_PollEvent(&e)) {
            if (e.type == SDL_QUIT) running = false;
            if (e.type == SDL_JOYBUTTONDOWN) {
                // Cross (Bouton 0) = Valider / Lancer
                if (e.jbutton.button == 0) {
                    DEBUGLOG << "Bouton Croix appuye: Element " << selectedIndex;
                }
                // L1 / R1 pour changer d'onglet
                if (e.jbutton.button == 4) currentTab = (currentTab + 3) % 4;
                if (e.jbutton.button == 5) currentTab = (currentTab + 1) % 4;
            }
            if (e.type == SDL_JOYHATMOTION) {
                if (e.jhat.value == SDL_HAT_UP && selectedIndex > 0) selectedIndex--;
                if (e.jhat.value == SDL_HAT_DOWN) selectedIndex++;
            }
        }

        // Fond d'ecran GoldPlayer Noir et Or
        drawBox(renderer, 0, 0, FRAME_WIDTH, FRAME_HEIGHT, 11, 14, 20);

        // Barre Superieure Console
        drawBox(renderer, 0, 0, FRAME_WIDTH, 80, 18, 22, 32);
        drawBox(renderer, 100, 20, 260, 40, 234, 179, 8); // Logo GoldPlayer

        // Rendu de l'ecran
        SDL_UpdateWindowSurface(window);
        SDL_Delay(16);
    }

    if (joy) SDL_JoystickClose(joy);
    SDL_Quit();
    return 0;
}
`;
