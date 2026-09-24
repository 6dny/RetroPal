// Pinned, same-origin assets: school clients need only the GitHub Pages host.
// No games, firmware, BIOS files, or keys are downloaded by this script.
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const base='https://cdn.emulatorjs.org/4.2.3/data/';
const root=new URL('../dist/vendor/emulatorjs/',import.meta.url);
const cores=['fceumm','snes9x','gambatte','mgba','melonds','mupen64plus_next','genesis_plus_gx','smsplus','stella2014','a5200','prosystem','pcsx_rearmed'];
const files=['loader.js','emulator.min.js','emulator.min.css','version.json','compression/extract7z.js','compression/extractzip.js','compression/libunrar.js','compression/libunrar.wasm',...cores.flatMap(c=>[`cores/reports/${c}.json`,`cores/${c}-wasm.data`,`cores/${c}-legacy-wasm.data`])];
const manifest={version:'4.2.3',source:base,files:{}};
let expected;try{expected=JSON.parse(await readFile(new URL('../cores.lock.json',import.meta.url),'utf8'));}catch{}
for(let i=0;i<files.length;i+=4){await Promise.all(files.slice(i,i+4).map(async name=>{
  const dest=new URL(name,root);let data;
  try{data=await readFile(dest);}catch{const r=await fetch(base+name,{signal:AbortSignal.timeout(90000)});if(!r.ok)throw new Error(`${name}: HTTP ${r.status}`);data=Buffer.from(await r.arrayBuffer());}
  const hash=createHash('sha256').update(data).digest('hex');
  const prior=expected?.files[name];
  if(prior&&prior.sha256!==hash&&prior.installedSha256!==hash)throw new Error(`Integrity mismatch: ${name}`);
  if(name==='emulator.min.js')data=Buffer.from(data.toString().replaceAll('https://cdn.emulatorjs.org/stable/data/version.json','./vendor/emulatorjs/version.json'));
  await mkdir(new URL('.',dest),{recursive:true});await writeFile(dest,data);
  manifest.files[name]={bytes:prior?.bytes||data.length,sha256:prior?.sha256||hash};
  if(name==='emulator.min.js'){manifest.files[name].installedSha256=createHash('sha256').update(data).digest('hex');manifest.files[name].patch='Version check uses bundled local version.json; no external update request.';}
  console.log(`Ready: ${name} (${Math.round(data.length/1024)} KB)`);
}));}
await writeFile(new URL('../cores.lock.json',import.meta.url),JSON.stringify(manifest,null,2)+'\n');
console.log('Pinned emulator assets are ready. They load only when needed.');
