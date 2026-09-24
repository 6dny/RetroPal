import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {SYSTEMS,candidates,accepted,launchIssue,extension} from '../dist/systems.js';
test('All requested extensions are recognized without pretending they identify a system',()=>{
  for(const ext of ['nes','fds','smc','sfc','z64','v64','n64','gb','gbc','gba','nds','md','smd','gen','bin','gg','sms','a26','rom','cue','iso','chd','gcm','rvz','cso','nsp','xci','zip','7z','rar'])assert.ok(accepted.includes(ext),ext);
  assert.equal(extension('GAME.NES'),'nes');
  assert.equal(candidates('a.gba')[0].id,'gba');
  assert.ok(candidates('a.bin').length>1);
  assert.ok(candidates('a.iso').length>1);
  assert.equal(candidates('a.zip').length,0);
});
test('device edition blocks unsupported systems and incomplete CUE files',()=>{
  for(const id of ['ps2','gc','wii','psp','switch'])assert.match(launchIssue({system:id,filename:'game.iso'}),/catalog-only/);
  assert.match(launchIssue({system:'psx',filename:'disc.cue'}),/every referenced BIN/);
  assert.equal(launchIssue({system:'psx',filename:'disc.zip'}),null);
  assert.equal(launchIssue({system:'nes',filename:'game.nes'}),null);
  assert.equal(SYSTEMS.filter(s=>s.core).length,14);
  assert.equal(new Set(SYSTEMS.map(s=>s.id)).size,19);
});
test('Original test cartridge is a complete NROM-128 image with valid vectors',async()=>{
  const data=await readFile(new URL('../dist/demo/input-lab.nes',import.meta.url));
  assert.equal(data.length,24592);assert.deepEqual([...data.subarray(0,6)],[78,69,83,26,1,1]);
  for(const offset of [0x3ffa,0x3ffc,0x3ffe]){const address=data.readUInt16LE(16+offset);assert.ok(address>=0x8000&&address<0xc000);}
});
