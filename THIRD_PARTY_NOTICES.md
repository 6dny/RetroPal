# RetroPal credits and third-party notices

RetroPal integrates existing emulator software. It does not claim authorship of these engines. The authored RetroPal frontend is GPL-3.0-or-later; individual third-party components retain their own licenses. The original Input Lab cartridge and its generator are CC0-1.0.

## EmulatorJS 4.2.3

- Project and source: https://github.com/EmulatorJS/EmulatorJS/tree/v4.2.3
- Distribution: https://cdn.emulatorjs.org/4.2.3/data/
- License: GPL-3.0, reproduced in `licenses/EmulatorJS-LICENSE.txt`.
- A source snapshot is supplied in `licenses/EmulatorJS-v4.2.3-source.zip`.
- The locally bundled `emulator.min.js` has one documented change: the stable CDN version-check URL points at `./vendor/emulatorjs/version.json`. All game handling remains upstream. `scripts/fetch-cores.mjs` reproduces this replacement; `cores.lock.json` records upstream and installed hashes.
- ZIP/7z/RAR helpers, nipplejs, socket.io, and associated support code are part of the upstream distribution. Preserve upstream notices and consult the source snapshot for their terms. Network play is not configured by RetroPal.

## Emulator cores

These are the official EmulatorJS 4.2.3 core builds, with their build reports in `vendor/emulatorjs/cores/reports`. Each core and the linked RetroArch runtime has its own license. A frontend license does not replace those terms. Some cores contain noncommercial restrictions; do not assume this bundle is suitable for commercial redistribution.

| Core | Upstream source |
| --- | --- |
| FCEUmm | https://github.com/libretro/libretro-fceumm |
| Snes9x | https://github.com/libretro/snes9x |
| Gambatte | https://github.com/libretro/gambatte-libretro |
| mGBA | https://github.com/libretro/mgba |
| melonDS | https://github.com/libretro/melonds |
| Mupen64Plus-Next | https://github.com/libretro/mupen64plus-libretro-nx |
| Genesis Plus GX | https://github.com/libretro/Genesis-Plus-GX |
| SMS Plus | https://github.com/libretro/smsplus-gx |
| Stella 2014 | https://github.com/libretro/stella2014-libretro |
| Atari 5200 | https://github.com/libretro/a5200 |
| ProSystem | https://github.com/libretro/prosystem-libretro |
| PCSX ReARMed | https://github.com/libretro/pcsx_rearmed |
| RetroArch | https://github.com/libretro/RetroArch |

Build instructions and source integration: https://github.com/EmulatorJS/build and https://emulatorjs.org/docs4devs/building-retroarch-cores/

System and manufacturer names identify compatibility and remain their owners' trademarks. RetroPal is unaffiliated with those manufacturers. No commercial games, BIOS, firmware, or keys are distributed.
