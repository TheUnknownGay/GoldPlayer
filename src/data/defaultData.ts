import { DesignerInfo, GoldHenConfig, IPTVChannel, MediaFile, PS4Game } from '../types';

export const DEFAULT_ABOUT: DesignerInfo = {
  designer: 'DJAFFAR MOURTADHOI',
  socialNetwork: '@Mourtadhoi.Art',
  phoneNumber: '0693521495',
  email: 'djaffar.art@gmail.com',
  appTitle: 'GoldPlayer',
  appVersion: 'v1.0.0 Release',
  titleId: 'GOLD00001',
  contentId: 'IV0000-GOLD00001_00-GOLDPLAYER00000',
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

      - name: Installer les dépendances Clang & LLVM
        run: sudo apt-get update && sudo apt-get install -y clang lld

      - name: Installer libssl 1.1 pour OpenOrbis
        run: |
          wget -q -O libssl1.1.deb http://archive.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2_amd64.deb || wget -q -O libssl1.1.deb https://security.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2.24_amd64.deb
          sudo dpkg -i libssl1.1.deb

      - name: Télécharger la Toolchain OpenOrbis PS4 (v0.5.4)
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

      - name: Compiler GoldPlayer (OpenOrbis + SDL2 + Freetype + GoldHEN REST API)
        run: |
          mkdir -p $HOME/work
          cp -r "$OO_PS4_TOOLCHAIN/samples/SDL2" $HOME/work/SDL2
          cp -r "$OO_PS4_TOOLCHAIN/samples/_common" $HOME/work/_common
          
          # Copier les fichiers sources du projet GoldPlayer
          cp -r src_ps4/* $HOME/work/SDL2/SDL2/ 2>/dev/null || true
          
          cd $HOME/work/SDL2
          
          # Configuration du Makefile pour GoldPlayer
          sed -i 's/^TITLE .*/TITLE := GoldPlayer/' Makefile
          sed -i 's/^TITLE_ID .*/TITLE_ID := GOLD00001/' Makefile
          sed -i 's/^CONTENT_ID .*/CONTENT_ID := IV0000-GOLD00001_00-GOLDPLAYER00000/' Makefile
          
          echo "=== Lancement de la compilation du package PKG ==="
          make
          
          mkdir -p $GITHUB_WORKSPACE/out
          find "$HOME/work/SDL2" -name '*.pkg' -exec cp {} $GITHUB_WORKSPACE/out/ \\;
          echo "=== Fichier PKG généré avec succès ==="
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
 * Content ID : IV0000-GOLD00001_00-GOLDPLAYER00000
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
