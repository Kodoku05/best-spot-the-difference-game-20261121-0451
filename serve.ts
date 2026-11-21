import {createServer} from 'node:http';
import {readFileSync} from 'node:fs';
import {resolve,extname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';
const base=fileURLToPath(new URL('./game/',import.meta.url));
const at=process.argv.indexOf('--port'),port=at<0?8080:Number(process.argv[at+1]);
createServer((req,res)=>{try{const path=decodeURIComponent((req.url||'/').split('?')[0]);const file=resolve(base,'.'+(path.endsWith('/')?path+'index.html':path));if(!file.startsWith(resolve(base)+sep))throw Error('outside');const bytes=readFileSync(file);res.writeHead(200,{'Content-Type':({'.html':'text/html','.css':'text/css','.js':'text/javascript'})[extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(bytes);}catch{res.writeHead(404);res.end('Not found');}}).listen(port,'127.0.0.1',()=>console.log(`Serving game on port ${port}`));
