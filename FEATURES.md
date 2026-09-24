# RetroPal — feature overview and revision worksheet

This is the device / GitHub Pages edition. **Implemented** means code exists; it does not mean every commercial game or school device has been tested. See TEST_REPORT.md for verification scope.

## Pages

| Page | Included behavior | Revision notes |
| --- | --- | --- |
| Game library | Import, search, filters, sorting, grid/list, playable covers, editable details | |
| Favorites | Heart toggle and filtered favorite collection | |
| Recently played | Games ordered by last successfully started session | |
| All systems | 19 system cards, formats, browser/capability labels, system details, import entry points | |
| Settings | Device check, test cartridge, performance/motion/volume, BIOS, storage, metadata backups | |
| Field guide | Import instructions, controls, saves, file formats, troubleshooting, full compatibility table | |
| Player dialog | Live emulator, launch state, errors, fullscreen, exit, built-in emulator toolbar | |

## Visuals and components

- Charcoal, lime, lavender, and coral visual identity; simple RetroPal monogram and favicon.
- Animated first-load screen, route entrances, dialog transitions, button/card feedback.
- Layered typographic system tiles; gentle ambient motion when Low-power mode is off.
- Responsive sidebar becomes compact top navigation on narrow screens.
- Game covers default to typographic color treatments tied to the selected system.
- Upload custom JPEG/PNG/WebP covers, resized to a maximum 600-pixel edge.
- Native accessible dialogs, visible focus indicators, labels, skip link, live status notifications.
- Reduced-motion preference honors both the operating system and app settings.
- Optional CRT scanline overlay, disabled in Low-power mode.
- Empty collection, no-result, import feedback, launch loading, startup timeout, and error states.

## Library management

| Feature | Behavior and limits | Revision notes |
| --- | --- | --- |
| Multi-file import | Up to 100 files per batch; file chooser or drag/drop | |
| System detection | Unique extensions detected automatically; ambiguous extensions/archives need a choice | |
| Format validation | Rejects unsupported extensions and mismatched system/extension choices | |
| Local storage | Playable binaries stored in IndexedDB; metadata kept separately for fast startup | |
| Duplicate handling | Uses filename, size, last-modified time, and system; not content-hash detection | |
| Catalog entries | Unsupported or oversized files keep metadata without retaining their binaries | |
| Search | Title, original filename, and system name; slash shortcut focuses search | |
| Filters | Manufacturer and exact system | |
| Sorting | Recently added, title A–Z, last played | |
| Display modes | Cover grid or compact list | |
| Favorites | Persistent per-game heart toggle | |
| Game editor | Title, system, notes, custom cover; edit via three-dot button | |
| Removal | Confirmation; deletes catalog record and stored binary; leaves original file and separate emulator saves | |
| Recent play | Updates after the emulator reports game start | |
| Playtime | Measures launched session duration until normal player exit; includes paused time | |
| Metadata export | JSON with records and covers; no ROMs, BIOS files, or save data | |
| Metadata restore | Validates schema/IDs, preserves matching local files, creates missing-file catalog entries | |

## Emulation and controls

- Pinned EmulatorJS 4.2.3 with 12 bundled core binaries representing 14 system profiles.
- Same-origin loading; emulator code, styles, archive helpers, and cores ship with the site.
- Only the selected core is loaded; other cores are not downloaded into the browser on initial visit.
- Separate player document manages one emulation session at a time; closing it removes the frame.
- Keyboard remapping, controller support, touch controls where supported, pause, restart, mute/volume, and fullscreen through EmulatorJS.
- Save/load states and in-game save export/import through EmulatorJS, with game IDs stable across title edits.
- BIOS upload for NES/FDS, Atari 5200, PS1, GBA, and DS. Multi-file sets may be supplied as a ZIP. Validation of BIOS contents is delegated to the core.
- FDS and Atari 5200 launches prompt for BIOS if none has been stored.
- ZIP, 7z, and RAR decompression is delegated to the bundled emulator helpers. One game per archive; encrypted archives and oversized expansions are unsupported.
- PS1 CUE files alone are blocked with instructions to package all tracks together.
- Unsupported systems display an explanation instead of starting a fictitious emulator.
- Original NES **RetroPal Input Lab** cartridge included, with source; move the green square with the D-pad/arrow keys.
- No online multiplayer, cloud saves, ROM store, background game downloads, or console key handling.

## Every requested system and format

| System | Formats recognized | Playback in this build |
| --- | --- | --- |
| NES / Famicom Disk System | .nes, .fds | Browser core; FDS needs BIOS |
| SNES | .smc, .sfc | Browser core; enhancement-chip firmware varies |
| Nintendo 64 | .z64, .v64, .n64 | Device dependent |
| Game Boy | .gb | Browser core |
| Game Boy Color | .gbc | Browser core |
| Game Boy Advance | .gba | Browser core |
| Nintendo DS | .nds | Device dependent; firmware/game compatibility varies |
| Genesis / Mega Drive | .md, .smd, .gen, .bin | Browser core |
| Game Gear | .gg | Browser core |
| Master System | .sms | Browser core |
| Atari 2600 | .a26, .bin, .rom | Browser core |
| Atari 5200 | .a52, .bin, .rom | Browser core; BIOS required |
| Atari 7800 | .a78, .bin, .rom | Browser core; dump/header compatibility varies |
| PlayStation 1 | .bin, .cue, .iso, .chd | Device dependent; CUE+BIN must be bundled for multi-track playback |
| PlayStation 2 | .bin, .cue, .iso, .chd | Catalog only; no PS2 browser engine |
| GameCube | .iso, .gcm, .rvz | Catalog only; no Dolphin engine |
| Wii | .iso, .gcm, .rvz | Catalog only; no Dolphin engine |
| PSP | .iso, .cso | Catalog only on standard GitHub Pages; upstream core requires threads |
| Switch | .nsp, .xci | Catalog only; no Switch engine or keys |
| General archives | .zip, .7z, .rar | In-memory extraction for browser-supported systems; format/memory limits apply |

## device-specific choices

- Browser-only and no runtime package installation.
- Low-power mode on by default: stops continuous decorative animation, disables scanlines, caps imports at 128 MB.
- Standard mode permits 512 MB per game; big disc images can still exceed device memory.
- Device check tests WebAssembly, WebGL, IndexedDB read/write, local loader/core availability, and audio API availability.
- Storage usage/quota display and an optional persistent-storage request.
- No dependency on SharedArrayBuffer or cross-origin isolation for included cores.
- No external fonts, analytics, ROM uploads, or mandatory third-party CDN requests.
- Core assets have integrity hashes in `cores.lock.json`.
- GitHub Actions deploys the static `dist` folder. Works under repository subpaths.
- Does not bypass school restrictions. Does not claim a school-managed device or all games will work.

## Libraries and architecture

| Component | Choice |
| --- | --- |
| UI | Native HTML, CSS, ES modules; no large frontend framework |
| Persistence | IndexedDB with atomic metadata/file writes |
| Emulation | EmulatorJS 4.2.3; upstream Libretro cores |
| Archive decoding | EmulatorJS ZIP / 7z / RAR helpers |
| Icons | Small local SVG interface icons |
| Hosting | Static GitHub Pages; no database server or secrets |
| Developer scripts | Node.js 22+, no npm dependencies |
| Optional agent integration | Feature-detected WebMCP library search; unsupported browsers use normal UI |

## Suggested revision worksheet

These are decisions for your next revision, not completed extra features.

| Area | Keep / change / remove | Your direction |
| --- | --- | --- |
| RetroPal name and monogram | | |
| Lime/charcoal color palette | | |
| Loading screen and animations | | |
| Library density and cover proportions | | |
| Navigation and pages | | |
| Catalog-only systems visible or hidden | | |
| Low-power defaults and file-size caps | | |
| Additional collections/tags | | |
| More original homebrew demo games | | |
| Offline app-shell caching | | |
| Full save/ROM backup workflow | | |
| External metadata/cover lookup | | |
| device model-specific tuning | | |

Edit visual tokens in `dist/theme.css`, layouts in `dist/styles.css`, system entries in `dist/systems.js`, and feature behavior in `dist/app.js`. The GitHub repository has not yet been supplied or deployed.
