import {cpSync,existsSync,mkdirSync,writeFileSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildDossier} from './vendor/makefun-game.ts';
const source=fileURLToPath(new URL('.',import.meta.url));
const destination=resolve(process.env.MAKEFUN_OUTPUT_DIR||'/output');
mkdirSync(destination,{recursive:true});
cpSync(join(source,'game'),join(destination,'game'),{recursive:true});
mkdirSync(join(destination,'screenshots'),{recursive:true});
if(existsSync(join(source,'screenshots')))cpSync(join(source,'screenshots'),join(destination,'screenshots'),{recursive:true});
// The scorer's own caps (reference/gate.json): only text_max_bytes shapes the
// bytes; the others refuse an entry the scorer would refuse (more than 4
// screenshots or one over 256 KiB; more than 993 files in game/ or 48 MiB of
// game files, or a path under game/ over 1000 bytes).
const limits={text_max_bytes:163840,screenshots:{max:4,max_bytes:262144},game_max_files:993,game_max_bytes:50331648,game_path_max_bytes:1000};
const dossier=buildDossier(destination,limits);
writeFileSync(join(destination,'dossier.json'),dossier);
