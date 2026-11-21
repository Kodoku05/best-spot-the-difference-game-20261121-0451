import {World} from './world.js';
import {createAudio} from './audio.js';
import {createRenderer} from './render.js';
import {wireInput} from './input.js';
import {stageShot} from './shots.js';
import {mulberry32} from './random.js';
const query=new URLSearchParams(location.search);
const random=mulberry32(Number(query.get('seed')||1));
const world=new World(localStorage),audio=createAudio();
world.random=random;world.sound=name=>audio.play(name);
stageShot(query.get('shot'),world);
const canvas=document.querySelector('#game'),renderer=createRenderer(canvas,world,audio);
wireInput(canvas,world,renderer,audio);
renderer.render();
let last=performance.now();
function frame(now){if(!world.shot)world.tick(Math.min(.1,(now-last)/1000));last=now;renderer.render();document.querySelector('#status').textContent=`${world.found.size} of 8 found. ${Math.ceil(world.time)} seconds remaining.`;requestAnimationFrame(frame);}
requestAnimationFrame(frame);
