// A separate document keeps EmulatorJS's DOM and lifecycle out of the library.
let initialized=false, started=false, watchdog;
const report=(type,detail)=>parent.postMessage({source:'retropal-player',type,detail},location.origin);
function fail(message){clearTimeout(watchdog);const el=document.getElementById('status');el.classList.remove('hidden');el.replaceChildren();const title=document.createElement('h1');title.textContent='This game could not start.';const p=document.createElement('p');p.textContent=message;el.append(title,p);report('error',message);}
window.addEventListener('message',event=>{
  if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='load-game'||initialized)return;
  const {game,bios,core,id,volume,accent}=event.data;
  if(!(game instanceof Blob)||typeof core!=='string')return;
  initialized=true;
  window.EJS_player='#game';
  window.EJS_core=core;
  window.EJS_gameUrl=game;
  // Stable identity prevents edited display titles from separating saves.
  window.EJS_gameName=`retropal-${id}`;
  window.EJS_pathtodata=new URL('./vendor/emulatorjs/',location.href).href;
  window.EJS_biosUrl=bios||'';
  window.EJS_color=/^#[0-9a-f]{6}$/i.test(accent)?accent:'#c7f86c';
  window.EJS_backgroundColor='#101510';
  window.EJS_startOnLoaded=true;
  window.EJS_startButtonName='Play game';
  window.EJS_threads=false;
  window.EJS_volume=volume;
  window.EJS_language='en-US';
  window.EJS_disableAutoLang=false;
  window.EJS_CacheLimit=0; // ROMs are already stored in RetroPal's IndexedDB.
  window.EJS_defaultOptions={'save-state-location':'browser'};
  window.EJS_Buttons={screenRecord:false,netplay:false};
  window.EJS_ready=()=>{document.getElementById('status').classList.add('hidden');report('ready');};
  window.EJS_onGameStart=()=>{started=true;clearTimeout(watchdog);document.getElementById('status').classList.add('hidden');report('started');};
  window.EJS_onExit=()=>report('exit');
  watchdog=setTimeout(()=>{if(!started)fail('The emulator is taking too long. Close the player, run Device check, or try a smaller game. A blocked resource, missing BIOS, incompatible dump, or limited memory can prevent startup.');},120000);
  const script=document.createElement('script');script.src='./vendor/emulatorjs/loader.js';script.onerror=()=>fail('The emulator files are missing or blocked. Run Device check from Settings.');document.head.append(script);
});
window.addEventListener('error',e=>{if(!started&&initialized)fail(e.message||'An emulator resource failed to load.');});
window.addEventListener('unhandledrejection',()=>{if(!started&&initialized)fail('The core could not load this file. Check the system, file, and BIOS requirements.');});
report('frame-ready');

// EmulatorJS 4.2.3 binds its default click listener before user callbacks.
// Capture its two visible fullscreen controls so both toolbar and outer header
// share RetroPal's permission-safe fullscreen flow. No upstream files modified.
document.addEventListener('click',event=>{
  const button=event.target.closest?.('button.ejs_menu_button');
  const label=button?.querySelector('.ejs_menu_text')?.textContent?.trim();
  if(label!=='Enter Fullscreen'&&label!=='Exit Fullscreen')return;
  event.preventDefault();event.stopImmediatePropagation();
  parent.document.dispatchEvent(new Event('retropal:toggle-fullscreen'));
},true);
document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&parent.document.querySelector('#player')?.classList.contains('expanded')){
    event.preventDefault();event.stopPropagation();
    parent.document.dispatchEvent(new Event('retropal:toggle-fullscreen'));
  }
});
window.addEventListener('message',event=>{
  if(event.source!==parent||event.origin!==location.origin||event.data?.type!=='fullscreen-state')return;
  const active=!!event.data.active;
  for(const button of document.querySelectorAll('button.ejs_menu_button')){
    const label=button.querySelector('.ejs_menu_text');
    if(!['Enter Fullscreen','Exit Fullscreen'].includes(label?.textContent?.trim()))continue;
    label.textContent=active?'Exit Fullscreen':'Enter Fullscreen';
    button.title=label.textContent;
    button.setAttribute('aria-pressed',String(active));
  }
});
