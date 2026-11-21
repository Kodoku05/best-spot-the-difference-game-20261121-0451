import {scenes} from './scenes.js';
export function stageShot(name,w){if(!name||name==='start')return;w.startScene(name==='hard'?4:0);const indices=name==='end'?[0,1,2,3,4,5,6,7]:name==='hard'?[0,3,6]:[0,2,4,6];for(const i of indices){const d=scenes[w.scene].DIFFERENCES[i];w.guess(d.x,d.y);}if(name!=='end')w.time=name==='hard'?49:83;w.effects=[];w.shot=true;}
