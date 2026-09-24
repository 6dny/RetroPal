# RetroPal verification report

Verified on September 24, 2026, in a Chromium-based local preview. An EGSD-issued device was not available for testing. No claim of universal school-device or game compatibility is made.

## Passed

- JavaScript syntax checks for authored application, script, and test files.
- SHA-256 integrity verification of 44 pinned emulator/support assets, including the documented local version-check patch.
- Three automated tests covering every requested extension, ambiguous format detection, catalog-only launch restrictions, incomplete CUE handling, unique system profiles, and the original NES cartridge's structure/vectors.
- Real NES core startup using the included original Input Lab cartridge; visible game output and the emulator's started event confirmed.
- Pause button changes to Play; player closes cleanly.
- Device check: WebAssembly, WebGL, IndexedDB read/write, local loader/core availability, audio API.
- Import of an actual `.nes` file with automatic NES selection.
- ZIP import with manual system selection, archive decompression, and successful NES playback.
- Library records remain after page reload.
- Favorite toggle, Favorites navigation, game-note editing, and search with matching and no-result queries.
- Browser UI exposes save/load states, controls, save-file import/export, volume, and fullscreen.
- Layout visually checked at 1366×768 and 390×844; document width did not overflow at either size. Narrow navigation is horizontally scrollable.
- Final branding uses the same local SVG for the app mark and favicon; BETA badge removed and interface terminology changed to device.
- No error logs observed during the final NES and ZIP playback checks after the local version-check patch.
- Optional WebMCP search returned the matching original cartridge and updated the visible filter; invalid input was rejected without changing the filtered results.

## Implemented but not end-to-end verified here

- Every game on the other included cores; BIOS-dependent games; PS1 CHD and multi-track disc playback.
- 7z/RAR archive variants, encrypted archive rejection, or large archive memory behavior.
- Physical USB/Bluetooth controllers, touch devices, hardware audio output, and every remapping option.
- Save-state restore and battery-save round trips across device/profile resets.
- Custom cover upload and full metadata export/restore round trips.
- Persistent-storage grants on a managed school profile.
- Optional WebMCP behavior across other browser implementations.
- Actual GitHub Actions deployment and the live Pages URL: no repository was provided or published.

## Deliberate limitations

- PS2, GameCube, Wii, PSP, and Switch are catalog-only in this release.
- N64, DS, and PS1 can exceed a low-powered device's performance or memory budget.
- Large files are cataloged rather than copied when they exceed the import limit.
- No guaranteed offline mode, cloud synchronization, bundled commercial games, firmware, or keys.
- Closing a tab abruptly may lose the current session's playtime and unflushed emulator save progress. Export important saves using the player toolbar.
