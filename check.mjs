import {readFile,readdir,stat} from 'node:fs/promises';
import {SourceTextModule} from 'node:vm';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
for(const dir of ['dist/','scripts/','tests/']){for(const name of await readdir(new URL(dir,root))){if(!/\.(js|mjs)$/.test(name))continue;new SourceTextModule(await readFile(new URL(dir+name,root),'utf8'),{identifier:dir+name});}}
const lock=JSON.parse(await readFile(new URL('cores.lock.json',root),'utf8'));
for(const [name,item] of Object.entries(lock.files)){const data=await readFile(new URL('dist/vendor/emulatorjs/'+name,root));const hash=createHash('sha256').update(data).digest('hex');if(hash!==(item.installedSha256||item.sha256))throw Error('Emulator integrity mismatch: '+name);}
for(const name of ['index.html','player.html','styles.css','theme.css','favicon.svg','demo/input-lab.nes','THIRD_PARTY_NOTICES.md'])await stat(new URL('dist/'+name,root));
console.log(`Syntax and ${Object.keys(lock.files).length} pinned emulator assets verified.`);
