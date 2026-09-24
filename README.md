# RetroPal

**Your collection. Every era.** A polished, local-first game library and emulator frontend built for ChromeOS and GitHub Pages.

RetroPal integrates existing EmulatorJS / Libretro cores; it is not a new emulator engine. It includes 14 browser system profiles, 5 catalog-only profiles, an original playable NES test cartridge, and a complete local library. No extensions, Linux mode, Android apps, accounts, or device installation are required.

**An EGSD device has not been available for testing. There is no 100% device/game compatibility guarantee.** School policies, Chrome settings, memory, hardware acceleration, and the individual game affect playback. The included Device check and test cartridge let you check the actual device.

## Start using it

Open the deployed GitHub Pages URL in Chrome. Select **Test your device**, then try moving the green square with the arrow keys. Add your own game files with **Add games**. Select a system when an extension is ambiguous. Use **Settings → BIOS & firmware** when needed.

All emulator assets are bundled and served from your Pages origin. A core loads only when you launch a game. No third-party CDN access is needed by the player. A network connection is still needed to load the site and uncached assets; guaranteed offline operation is not implemented.

## Deploy on GitHub Pages

1. Create or open your repository. Use `main` as the default branch, or adjust the workflow's branch setting.
2. Upload **the contents of this RetroPal folder** to the repository root, including `dist`, `scripts`, `tests`, `.github`, `package.json`, `cores.lock.json`, and license files. Do not upload the ZIP as your website.
3. In the repository, open **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Open **Actions → Deploy RetroPal to GitHub Pages**. Run it if the initial push has already happened. The workflow verifies the app and asset hashes, then deploys `dist`.
5. Use the Pages URL GitHub reports. A project subpath such as `/RetroPal/` works because assets use relative paths and navigation uses hash routes.

The repository owner must have Pages/Actions access. This delivery is not already pushed or published to a GitHub account.

Alternative: publish the contents of `dist` as the root of a `gh-pages` branch and select that branch in Pages settings. The included `.nojekyll` avoids unnecessary processing.

## Browser support in this build

| Status | Systems |
| --- | --- |
| Lightweight browser cores | NES/FDS, SNES, Game Boy, Game Boy Color, GBA, Genesis/Mega Drive, Game Gear, Master System, Atari 2600/5200/7800 |
| Device dependent | Nintendo 64, Nintendo DS, PlayStation 1 |
| Catalog only; cannot play in this build | PS2, GameCube, Wii, PSP, Switch |

PSP's upstream implementation requires browser threading. Standard GitHub Pages does not supply the isolation headers it needs, so this release does not claim PSP playback. PS2, Dolphin, and Switch engines are not included. File recognition does not mean a file can be emulated.

ZIP, 7z, and RAR are handled by EmulatorJS's in-memory extraction, subject to format and memory limits. Multi-track PS1 games need one ZIP containing the CUE and all referenced BIN files. Password-protected archives are not supported. CHD support depends on the PS1 core. RVZ remains catalog-only.

Low-power mode caps stored game files at **128 MB**. Turning it off permits **512 MB**, which still does not guarantee a large disc will run. Larger files are cataloged without copying the binary into browser storage.

## Features and revision guide

See [FEATURES.md](FEATURES.md) for a complete feature inventory, compatibility table, and editable revision checklist. See [TEST_REPORT.md](TEST_REPORT.md) for what was actually verified.

## Develop locally

Use Node.js 22 or later on a development computer. No package installation is required:

```sh
npm start
npm run check
npm test
```

Open the printed `http://127.0.0.1:4173` URL. Do not double-click `index.html`: module loading and browser storage require HTTP(S). The device only needs the published site, not Node.js.

```text
dist/index.html       App shell, navigation, dialogs
dist/app.js           Library, import, editing, settings, diagnostics
dist/styles.css       Layout, responsive components, motion
dist/theme.css        Brand colors and surface tokens
dist/systems.js       System registry and launch eligibility
dist/storage.js       IndexedDB access and atomic writes
dist/player.html/js   Isolated player document and public EmulatorJS options
dist/vendor/          Pinned emulator assets (do not delete before deployment)
dist/demo/            Original NES test cartridge
scripts/build-demo.mjs Original cartridge source and assembler
scripts/fetch-cores.mjs Reproduce/check pinned downloads
cores.lock.json       Asset hashes and documented local patch
.github/workflows/    GitHub Pages deployment workflow
```

`npm run prepare:cores` verifies existing pinned files or fetches missing ones from the official EmulatorJS 4.2.3 distribution. `npm run build:demo` regenerates the original NES cartridge. Do not replace pinned assets with `latest` without testing. Alternative cores selectable in upstream menus are not all bundled; use the default cores.

## Data and saves

ROMs, BIOS files, covers, preferences, and library metadata stay in this browser's IndexedDB. Emulator saves use EmulatorJS's separate browser storage. No backend or file-upload service exists. A public Pages deployment publishes app assets, never a user's imported games.

Library JSON exports **metadata and custom covers only**. Export game saves/states separately from the emulator toolbar. Chrome clearing site data, incognito sessions, or school profile resets may erase everything local. Requesting persistent storage does not override school policy. Session time is recorded on normal player close; an abrupt tab close may lose that session's elapsed time.

Use game files and firmware you are entitled to use. No commercial games, BIOS, firmware, or console keys are provided. RetroPal Input Lab is original CC0 material; the source is included.

## Licenses

RetroPal's authored frontend code is GPL-3.0-or-later. Third-party emulator engines retain their own licenses, including restrictions that differ from the frontend. See [dist/THIRD_PARTY_NOTICES.md](dist/THIRD_PARTY_NOTICES.md), the bundled license texts, and upstream source links. No commercial redistribution permission is implied for third-party cores.
