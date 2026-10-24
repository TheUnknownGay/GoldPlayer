import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  GitBranch,
  Download,
  Copy,
  Check,
  Code2,
  Terminal,
  ExternalLink,
  Cpu,
  Layers,
  Sparkles,
  Package
} from 'lucide-react';
import { GITHUB_WORKFLOW_TEMPLATE, OPENORBIS_MAIN_CPP, DEFAULT_ABOUT } from '../data/defaultData';
import { playNotificationSound, playSelectSound } from '../utils/soundEffects';

const M3U_HPP_CODE = `#pragma once
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
`;

const M3U_CPP_CODE = `#include "m3u.hpp"

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
    // Supprimer le BOM UTF-8 si present
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
`;

const MAKEFILE_CODE = `TITLE       := GoldPlayer
TITLE_ID    := GOLD00001
CONTENT_ID  := IV0000-GOLD00001_00-GOLDPLAYER000000
VERSION     := 01.00

# OpenOrbis Toolchain configuration
CC          := clang
CXX         := clang++
LD          := ld.lld

CFLAGS      := -O2 -Wall -D__ORBIS__
CXXFLAGS    := -O2 -Wall -std=c++17 -D__ORBIS__
LDFLAGS     := -L$(OO_PS4_TOOLCHAIN)/lib -lkernel -lc -lSceSysmodule -lSDL2 -lfreetype

OBJS        := main.o m3u.o Game.o

all: $(TITLE).pkg

clean:
\trm -f *.o $(TITLE).elf $(TITLE).pkg
`;

const README_CODE = `# GoldPlayer PS4 - Lecteur Multimédia & IPTV GoldHEN

Application Homebrew native pour PlayStation 4 Jailbreak (FW 5.05 à 11.00) avec GoldHEN.

- **Designer** : DJAFFAR MOURTADHOI
- **Réseau Social** : @Mourtadhoi.Art
- **Téléphone** : 0693521495
- **Email** : djaffar.art@gmail.com
- **Title ID** : GOLD00001
- **Content ID** : IV0000-GOLD00001_00-GOLDPLAYER000000

## Instructions de compilation automatique via GitHub Actions :
1. Créez un nouveau dépôt GitHub (public ou privé).
2. Déposez ces fichiers dans votre dépôt :
   - \`.github/workflows/build-ps4-pkg.yml\`
   - \`main.cpp\`
   - \`m3u.hpp\`
   - \`m3u.cpp\`
   - \`Makefile\`
3. Allez dans l'onglet "Actions" de votre dépôt GitHub.
4. Lancez le workflow "Build GoldPlayer PS4 PKG".
5. Une fois terminé, téléchargez l'artifact \`GoldPlayer-PS4-PKG\` contenant votre fichier \`GoldPlayer.pkg\`.
6. Copiez le \`.pkg\` à la racine d'une clé USB (exFAT ou FAT32), branchez sur votre PS4 et installez via GoldHEN > Package Installer !
`;

export const GithubPkgView: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'workflow' | 'main' | 'm3u_hpp' | 'm3u_cpp' | 'makefile' | 'readme'>('workflow');
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isZipping, setIsZipping] = useState<boolean>(false);

  const getActiveCode = () => {
    switch (activeFile) {
      case 'workflow':
        return GITHUB_WORKFLOW_TEMPLATE;
      case 'main':
        return OPENORBIS_MAIN_CPP;
      case 'm3u_hpp':
        return M3U_HPP_CODE;
      case 'm3u_cpp':
        return M3U_CPP_CODE;
      case 'makefile':
        return MAKEFILE_CODE;
      case 'readme':
        return README_CODE;
      default:
        return '';
    }
  };

  const getFileName = () => {
    switch (activeFile) {
      case 'workflow':
        return '.github/workflows/build-ps4-pkg.yml';
      case 'main':
        return 'src_ps4/main.cpp';
      case 'm3u_hpp':
        return 'src_ps4/m3u.hpp';
      case 'm3u_cpp':
        return 'src_ps4/m3u.cpp';
      case 'makefile':
        return 'Makefile';
      case 'readme':
        return 'README.md';
    }
  };

  const copyCode = () => {
    playSelectSound();
    navigator.clipboard.writeText(getActiveCode());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Download complete ready-to-push ZIP archive
  const downloadCompletePack = async () => {
    playSelectSound();
    setIsZipping(true);

    try {
      const zip = new JSZip();

      // .github/workflows/build-ps4-pkg.yml
      const ghFolder = zip.folder('.github');
      const workflowsFolder = ghFolder?.folder('workflows');
      workflowsFolder?.file('build-ps4-pkg.yml', GITHUB_WORKFLOW_TEMPLATE);

      // C++ sources in src_ps4/
      const srcFolder = zip.folder('src_ps4');
      srcFolder?.file('main.cpp', OPENORBIS_MAIN_CPP);
      srcFolder?.file('m3u.hpp', M3U_HPP_CODE);
      srcFolder?.file('m3u.cpp', M3U_CPP_CODE);

      // Makefile and README at root
      zip.file('Makefile', MAKEFILE_CODE);
      zip.file('README.md', README_CODE);

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'GoldPlayer_PS4_GitHub_Package.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      playNotificationSound();
    } catch {
      // Error handling
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-7 pb-24 text-slate-100">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
        <div>
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-amber-400" />
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Compilation PKG PS4 & Dépôt GitHub
            </h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Générez et compilez le fichier PKG de GoldPlayer gratuitement via GitHub Actions sans avoir besoin d'installer Linux
          </p>
        </div>

        {/* Action Button: Download complete ZIP */}
        <button
          onClick={downloadCompletePack}
          disabled={isZipping}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-400 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-300 transition-all shadow-md shadow-amber-500/25 active:scale-95 disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isZipping ? 'Création de l\'archive ZIP...' : 'Télécharger le Pack Complet (.ZIP)'}</span>
        </button>
      </div>

      {/* 4-Step Walkthrough Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-amber-400">ÉTAPE 1</span>
            <GitBranch className="w-4 h-4 text-slate-500" />
          </div>
          <h4 className="text-xs font-semibold text-white mb-1">Télécharger le Pack</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Cliquez sur le bouton jaune ci-dessus pour obtenir tous les fichiers sources prêts à l'emploi.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-amber-400">ÉTAPE 2</span>
            <Terminal className="w-4 h-4 text-slate-500" />
          </div>
          <h4 className="text-xs font-semibold text-white mb-1">Dossier .github/workflows/</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Le fichier YAML doit OBLIGATOIREMENT être dans <code className="text-amber-400">.github/workflows/</code> avec le point initial.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-amber-400">ÉTAPE 3</span>
            <Cpu className="w-4 h-4 text-slate-500" />
          </div>
          <h4 className="text-xs font-semibold text-white mb-1">Activer les Actions</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Sur GitHub dans l'onglet "Actions", cliquez sur le bouton vert d'activation si demandé.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs font-bold text-amber-400">ÉTAPE 4</span>
            <Package className="w-4 h-4 text-slate-500" />
          </div>
          <h4 className="text-xs font-semibold text-white mb-1">Télécharger le PKG</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Récupérez le .pkg dans la section "Artifacts" et installez-le avec GoldHEN Package Installer.
          </p>
        </div>
      </div>

      {/* Troubleshooting Guide Box for Missing Actions */}
      <div className="mb-8 rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-950 p-5 shadow-lg">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 shrink-0">
            <Terminal className="w-5 h-5" />
          </div>
          <div className="space-y-3 flex-1">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Pourquoi vous ne voyez pas d'action dans GitHub ? Les 3 causes fréquentes :</span>
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                GitHub n'affiche les workflows que si des conditions très précises sont respectées :
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <span className="font-mono font-bold text-amber-400 text-[11px] block">1. Chemin exact du fichier</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Le fichier doit être situé à :
                </p>
                <div className="font-mono text-[10px] bg-slate-900 px-2 py-1 rounded text-amber-300 border border-slate-700 select-all">
                  .github/workflows/build-ps4-pkg.yml
                </div>
                <p className="text-[10px] text-slate-400">
                  ⚠️ Si le dossier s'appelle <code className="text-red-400">github</code> (sans point) ou si le fichier est à la racine, GitHub l'ignore totalement !
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <span className="font-mono font-bold text-amber-400 text-[11px] block">2. Activer les Actions sur le Dépôt</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Sur un nouveau dépôt, allez dans l'onglet <strong>Actions</strong> de votre projet GitHub.
                </p>
                <p className="text-[10px] text-slate-400">
                  Si un bouton vert apparaît disant <em>"I understand my workflows, go ahead and enable them"</em>, cliquez dessus pour autoriser l'exécution.
                </p>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-xl p-3.5 space-y-1.5">
                <span className="font-mono font-bold text-amber-400 text-[11px] block">3. Bouton "Run workflow"</span>
                <p className="text-slate-300 leading-relaxed text-[11px]">
                  Dans l'onglet <strong>Actions</strong>, cliquez sur <strong>Build GoldPlayer PS4 PKG</strong> dans la liste de gauche.
                </p>
                <p className="text-[10px] text-slate-400">
                  Cliquez ensuite sur le bouton gris <strong>« Run workflow »</strong> à droite puis validez pour forcer le lancement immédiat sans attendre un commit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* Code Inspector & File Switcher */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        {/* File Tabs Strip */}
        <div className="flex items-center justify-between bg-slate-950 px-4 py-2.5 border-b border-slate-800">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveFile('workflow')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                activeFile === 'workflow'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              build-ps4-pkg.yml
            </button>

            <button
              onClick={() => setActiveFile('main')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                activeFile === 'main'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              main.cpp (C++)
            </button>

            <button
              onClick={() => setActiveFile('m3u_hpp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                activeFile === 'm3u_hpp'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              m3u.hpp
            </button>

            <button
              onClick={() => setActiveFile('m3u_cpp')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                activeFile === 'm3u_cpp'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              m3u.cpp
            </button>

            <button
              onClick={() => setActiveFile('makefile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                activeFile === 'makefile'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Makefile
            </button>

            <button
              onClick={() => setActiveFile('readme')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                activeFile === 'readme'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              README.md
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
              {getFileName()}
            </span>

            <button
              onClick={copyCode}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors border border-slate-700 active:scale-95"
            >
              {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{isCopied ? 'Copié !' : 'Copier'}</span>
            </button>
          </div>
        </div>

        {/* Code Content View */}
        <div className="p-4 overflow-x-auto max-h-[500px]">
          <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre font-normal select-text">
            {getActiveCode()}
          </pre>
        </div>
      </div>
    </div>
  );
};
