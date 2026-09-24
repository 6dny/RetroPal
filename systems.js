export const SYSTEMS = [
  {id:'nes',name:'Nintendo Entertainment System',short:'NES',family:'Nintendo',year:1983,core:'nes',ext:['nes','fds'],color:'#f67460',tag:'THE ORIGINAL PLAYGROUND',note:'Famicom Disk System games need a disksys.rom BIOS.'},
  {id:'snes',name:'Super Nintendo',short:'SNES',family:'Nintendo',year:1990,core:'snes',ext:['smc','sfc'],color:'#a99bfc',tag:'16 BITS. INFINITE POSSIBILITIES.',note:'Some enhancement-chip games need extra firmware and may require a native emulator.'},
  {id:'n64',name:'Nintendo 64',short:'N64',family:'Nintendo',year:1996,core:'n64',ext:['z64','v64','n64'],color:'#96c581',tag:'A WHOLE NEW DIMENSION',note:'Browser compatibility and speed vary by game and device.'},
  {id:'gb',name:'Game Boy',short:'GB',family:'Nintendo',year:1989,core:'gb',ext:['gb'],color:'#c9d875',tag:'BIG ADVENTURES. SMALL SCREEN.',note:'Uses the Game Boy / Color core.'},
  {id:'gbc',name:'Game Boy Color',short:'GBC',family:'Nintendo',year:1998,core:'gb',ext:['gbc'],color:'#e4a0d7',tag:'LIFE IN FULL COLOR',note:'Uses the Game Boy / Color core.'},
  {id:'gba',name:'Game Boy Advance',short:'GBA',family:'Nintendo',year:2001,core:'gba',ext:['gba'],color:'#a79bef',tag:'TAKE YOUR WORLD WITH YOU',note:'Optional BIOS may improve compatibility.'},
  {id:'nds',name:'Nintendo DS',short:'DS',family:'Nintendo',year:2004,core:'nds',ext:['nds'],color:'#7bcbd6',tag:'TWO SCREENS. MORE POSSIBILITIES.',note:'Touch controls and compatibility depend on the selected core. Firmware-dependent games may need native setup.'},
  {id:'md',name:'Sega Genesis / Mega Drive',short:'MD',family:'Sega',year:1988,core:'segaMD',ext:['md','smd','gen','bin'],color:'#73c1df',tag:'WELCOME TO THE NEXT LEVEL',note:'Select this system for Genesis .bin files; .bin is shared by several systems.'},
  {id:'gg',name:'Sega Game Gear',short:'GG',family:'Sega',year:1990,core:'segaGG',ext:['gg'],color:'#e6aa65',tag:'COLOR ON THE GO',note:'Uses the Genesis Plus GX core.'},
  {id:'sms',name:'Sega Master System',short:'SMS',family:'Sega',year:1985,core:'segaMS',ext:['sms'],color:'#ea8777',tag:'THE OTHER SIDE OF 8-BIT',note:'Uses the SMS Plus core.'},
  {id:'a26',name:'Atari 2600',short:'2600',family:'Atari',year:1977,core:'atari2600',ext:['a26','bin','rom'],color:'#e2ae73',tag:'WHERE IT ALL BEGAN',note:'Generic .rom and .bin files need a system selection.'},
  {id:'a52',name:'Atari 5200',short:'5200',family:'Atari',year:1982,core:'a5200',ext:['bin','rom','a52'],color:'#aaaec7',tag:'SUPER SYSTEM. CLASSIC GAMES.',note:'A compatible Atari 5200 BIOS is required.'},
  {id:'a78',name:'Atari 7800',short:'7800',family:'Atari',year:1986,core:'atari7800',ext:['bin','rom','a78'],color:'#ce9b74',tag:'BACK TO THE ARCADE',note:'Some titles may need a BIOS. Headerless dumps can have compatibility issues.'},
  {id:'psx',name:'PlayStation',short:'PS1',family:'Sony',year:1994,core:'psx',ext:['bin','cue','iso','chd'],color:'#9eaff3',tag:'A NEW KIND OF PLAY',note:'Use a ZIP containing the .cue and every referenced .bin for browser multi-track games. A compatible BIOS is recommended.'},
  {id:'ps2',name:'PlayStation 2',short:'PS2',family:'Sony',year:2000,core:null,ext:['bin','cue','iso','chd'],color:'#8395ed',tag:'AN ENTIRE GENERATION',native:'PCSX2',args:['-batch','{rom}'],note:'Requires installed PCSX2 and a configured BIOS. Disc compatibility is determined by PCSX2.'},
  {id:'gc',name:'Nintendo GameCube',short:'GC',family:'Nintendo',year:2001,core:null,ext:['iso','gcm','rvz'],color:'#ad96ef',tag:'SMALL CUBE. HUGE MEMORIES.',native:'Dolphin',args:['-e','{rom}'],note:'Requires installed Dolphin. RVZ stays compressed; RetroPal does not convert it.'},
  {id:'wii',name:'Nintendo Wii',short:'Wii',family:'Nintendo',year:2006,core:null,ext:['iso','gcm','rvz'],color:'#a9dadb',tag:'EVERYONE PLAYS',native:'Dolphin',args:['-e','{rom}'],note:'Requires installed Dolphin with controllers configured for your game.'},
  {id:'psp',name:'PlayStation Portable',short:'PSP',family:'Sony',year:2004,core:'psp',ext:['iso','cso'],color:'#87b9c6',tag:'CONSOLE AMBITION. POCKET SIZE.',native:'PPSSPP',args:['{rom}'],note:'Browser core is experimental here; native PPSSPP is available through the desktop edition.'},
  {id:'switch',name:'Nintendo Switch',short:'SW',family:'Nintendo',year:2017,core:null,ext:['nsp','xci'],color:'#ec817f',tag:'PLAY YOUR WAY',native:'Custom Switch emulator',args:['{rom}'],note:'External launcher only. Supply a compatible installed emulator and its required firmware/keys. Package installation is handled there; NSP/XCI recognition is not a guarantee of bootability.'}
];
export const ARCHIVES = ['zip','7z','rar'];
// Pinned EmulatorJS 4.2.3 PSP needs threads. Standard GitHub Pages does not
// provide cross-origin isolation, so PSP is deliberately catalog-only here.
for (const s of SYSTEMS) {
  s.tier = ['ps2','gc','wii','psp','switch'].includes(s.id) ? 'catalog' : ['n64','nds','psx'].includes(s.id) ? 'demanding' : 'light';
  if(s.id==='psp') s.core=null;
  delete s.native; delete s.args;
  if(s.tier==='catalog') s.note = `${s.name} is catalog-only in this device edition. ${s.id==='psp'?'The bundled PSP core requires browser threading unavailable on standard GitHub Pages.':'No browser core is included for this system.'} RetroPal can organize these files, but cannot play them.`;
}
export const byId = id => SYSTEMS.find(s => s.id === id);
export const extension = name => name.split('.').pop().toLowerCase();
export const candidates = name => SYSTEMS.filter(s=>s.ext.includes(extension(name)));
export const accepted = [...new Set([...SYSTEMS.flatMap(s=>s.ext),...ARCHIVES])];
export function launchIssue(game) {
  const s=byId(game.system), ext=extension(game.filename);
  if(!s) return 'Choose a system for this game.';
  if(!s.core) return s.note;
  if(s.id==='psx' && ext==='cue') return 'Package the CUE and every referenced BIN together in one ZIP, then import the ZIP. A CUE alone contains no game data.';
  return null;
}
