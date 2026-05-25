# RSL Helper V6 — Project Overview

## Description
**RSL Helper V6** is a third-party utility tool for **Raid: Shadow Legends** (a popular mobile/PC RPG by Plarium). The program allows players to view and manage game assets locally on their computer.

## Key Features
- View champion portraits and images
- View equipment (weapons, helmets, chests, gloves, boots, shields)
- View champion skills and abilities
- View masteries (large and small icons)
- Manage relics and gems
- Support for multiple game data versions (10.41.0, 10.60.0, 11.20.0, etc.)
- Automatic updates via built-in updater
- Extract assets from game Unity3D bundles

## Project Structure

### Main Executables
- **RSLHelper.exe** — Main application
- **RSLHelper_Updater.exe** — Auto-update component
- **rslhelper.dll** / **rslhelper_v80.dll** — Core libraries (game data parsing logic)

### Asset Directories
- **aPictures/** (523+ files) — Equipment slot images (Boots, Chest, Gloves, Helmet, Shield, Weapon) numbered by champion ID
- **bPictures/** — Mastery/skill ability icons (Big/Small versions) with rarity frames (rare, epic, legendary)
- **cPictures/** (1123+ files) — Champion portraits/thumbnails
- **iPictures/** — Various game icons:
  - `bm/` — Battle mechanic icons
  - `event/` — Event-related images
  - `relict/` — Relic system assets (Gems, RelicIcons, RelicStones, thumbnails)
  - `rv/` — Additional game assets
- **Skills/** (3530+ files) — Champion skill/ability icons (multiple levels per skill)
- **UserFav/** — User favorites storage

### Data Files
- **ci.dat** — Configuration/data file
- **rslSim.dat** — Simulation data
- **StandardJson.hsf** — JSON rules configuration
- **SQLITE3.DLL** — SQLite database support
- **libeay32.dll** / **ssleay32.dll** — OpenSSL encryption libraries
- **FinalSound.wav** — Sound file

### Log Files
- **_tmp_bundle_debug.log** — Asset bundle processing debug log
- **UnzipErrorLog.Bytes** — Unzip error log

## How It Works
The program reads game asset bundles from the Plarium Play Raid: Shadow Legends installation, processes Unity3D bundles (e.g., `HeroAvatarsLocal`, `FuseAvatarsLocal`), extracts champion data, and renders image atlases.

## Purpose
This is a **Raid: Shadow Legends asset viewer/extractor** that allows players to browse champion portraits, equipment, skills, masteries, relics, and other game assets locally on their PC, which is useful for planning team compositions or examining game resources in detail.

---
*Document creation date: April 11, 2026*
*Program version: V6*
