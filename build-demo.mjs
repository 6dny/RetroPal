// Original RetroPal Input Lab, CC0-1.0. No third-party ROM data.
// Tiny 6502 assembler + NROM-128 cartridge, with a D-pad controlled sprite.
import {mkdir,writeFile} from 'node:fs/promises';
const code=[],labels={},fixups=[];
const emit=(...b)=>code.push(...b),label=n=>labels[n]=0x8000+code.length;
const abs=(op,address)=>{emit(op,address&255,address>>8);};
const jump=(op,name)=>{emit(op,0,0);fixups.push({at:code.length-2,name,relative:false});};
const branch=(op,name)=>{emit(op,0);fixups.push({at:code.length-1,name,relative:true});};
const lda=n=>emit(0xa9,n),sta=address=>abs(0x8d,address);
const setPPU=address=>{lda(address>>8);sta(0x2006);lda(address&255);sta(0x2006);};
label('reset');emit(0x78,0xd8,0xa2,0xff,0x9a);lda(0);sta(0x2000);sta(0x2001);sta(0x4010);sta(0x4015);lda(0x40);sta(0x4017);
for(const n of ['vblank1','vblank2']){label(n);abs(0x2c,0x2002);branch(0x10,n);}
emit(0xa2,0);lda(0);label('clear');for(let p=0;p<8;p++)abs(0x9d,p*256);emit(0xe8);branch(0xd0,'clear');
lda(0xff);emit(0xa2,0);label('hide');abs(0x9d,0x200);emit(0xe8);branch(0xd0,'hide');
setPPU(0x3f00);for(const v of [0x0f,0x30,0x2a,0x19,0x0f,0x30,0x2a,0x19,0x0f,0x30,0x2a,0x19,0x0f,0x30,0x2a,0x19,0x0f,0x2a,0x30,0x19,0x0f,0x2a,0x30,0x19,0x0f,0x2a,0x30,0x19,0x0f,0x2a,0x30,0x19]){lda(v);sta(0x2007);}
setPPU(0x2000);lda(0);emit(0xa2,0,0xa0,4);label('clear-nt');sta(0x2007);emit(0xe8);branch(0xd0,'clear-nt');emit(0x88);branch(0xd0,'clear-nt');
const text=(row,str)=>{setPPU(0x2000+row*32+Math.floor((32-str.length)/2));for(const c of str){lda(c.charCodeAt(0)-32);sta(0x2007);}};
text(5,'RETROPAL INPUT LAB');text(8,'REAL NES. REAL PLAY.');text(11,'USE ARROW KEYS');text(22,'MOVE THE GREEN SQUARE');text(25,'BROWSER CORE: READY');
lda(120);emit(0x85,1);lda(135);emit(0x85,2);lda(127);sta(0x201);lda(0);sta(0x202);sta(0x2005);sta(0x2005);lda(0x80);sta(0x2000);lda(0x1e);sta(0x2001);
label('loop');jump(0x4c,'loop');
label('nmi');emit(0x48,0x8a,0x48,0x98,0x48);lda(1);sta(0x4016);lda(0);sta(0x4016);emit(0x85,0,0xa2,8);label('read-pad');abs(0xad,0x4016);emit(0x4a,0x26,0,0xca);branch(0xd0,'read-pad');
for(const [name,mask,coord,limit,compare,op] of [['right',1,1,240,0xb0,0xe6],['left',2,1,8,0x90,0xc6],['down',4,2,210,0xb0,0xe6],['up',8,2,24,0x90,0xc6]]){emit(0xa5,0,0x29,mask);branch(0xf0,'skip-'+name);emit(0xa5,coord,0xc9,limit);branch(compare,'skip-'+name);emit(op,coord);label('skip-'+name);}
emit(0xa5,0,0x29,16);branch(0xf0,'no-reset');lda(120);emit(0x85,1);lda(135);emit(0x85,2);label('no-reset');
emit(0xa5,2);sta(0x200);emit(0xa5,1);sta(0x203);lda(0);sta(0x2003);lda(2);sta(0x4014);lda(0);sta(0x2005);sta(0x2005);emit(0x68,0xa8,0x68,0xaa,0x68,0x40);
label('irq');emit(0x40);
for(const f of fixups){if(labels[f.name]===undefined)throw Error(f.name);if(f.relative){const delta=labels[f.name]-(0x8000+f.at+1);if(delta< -128||delta>127)throw Error('Branch out of range');code[f.at]=delta&255;}else{code[f.at]=labels[f.name]&255;code[f.at+1]=labels[f.name]>>8;}}
const prg=Buffer.alloc(16384,0xea);prg.set(code);prg.writeUInt16LE(labels.nmi,0x3ffa);prg.writeUInt16LE(labels.reset,0x3ffc);prg.writeUInt16LE(labels.irq,0x3ffe);
const glyphs={A:['01110','10001','10001','11111','10001','10001','10001'],B:['11110','10001','10001','11110','10001','10001','11110'],C:['01111','10000','10000','10000','10000','10000','01111'],D:['11110','10001','10001','10001','10001','10001','11110'],E:['11111','10000','10000','11110','10000','10000','11111'],G:['01111','10000','10000','10111','10001','10001','01111'],I:['11111','00100','00100','00100','00100','00100','11111'],K:['10001','10010','10100','11000','10100','10010','10001'],L:['10000','10000','10000','10000','10000','10000','11111'],M:['10001','11011','10101','10101','10001','10001','10001'],N:['10001','11001','10101','10011','10001','10001','10001'],O:['01110','10001','10001','10001','10001','10001','01110'],P:['11110','10001','10001','11110','10000','10000','10000'],Q:['01110','10001','10001','10001','10101','10010','01101'],R:['11110','10001','10001','11110','10100','10010','10001'],S:['01111','10000','10000','01110','00001','00001','11110'],T:['11111','00100','00100','00100','00100','00100','00100'],U:['10001','10001','10001','10001','10001','10001','01110'],V:['10001','10001','10001','10001','10001','01010','00100'],W:['10001','10001','10001','10101','10101','11011','10001'],Y:['10001','10001','01010','00100','00100','00100','00100'],'.':['00000','00000','00000','00000','00000','01100','01100'],':':['00000','01100','01100','00000','01100','01100','00000']};
glyphs.H=['10001','10001','10001','11111','10001','10001','10001'];
const chr=Buffer.alloc(8192);for(const [char,rows] of Object.entries(glyphs)){rows.forEach((row,i)=>chr[(char.charCodeAt(0)-32)*16+i]=parseInt(row,2)<<2);}for(let i=0;i<8;i++)chr[127*16+i]=i===0||i===7?0x7e:0xff;
const header=Buffer.from([0x4e,0x45,0x53,0x1a,1,1,0,0,0,0,0,0,0,0,0,0]);const out=new URL('../dist/demo/',import.meta.url);await mkdir(out,{recursive:true});await writeFile(new URL('input-lab.nes',out),Buffer.concat([header,prg,chr]));console.log('Original NES test cartridge built: 24,592 bytes.');
