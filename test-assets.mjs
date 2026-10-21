import {spawn} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const child=spawn(process.execPath,['server.mjs'],{env:{...process.env,PORT:'4320'}});
try {
 await new Promise((resolve,reject)=>{child.stdout.once('data',resolve);child.once('error',reject);child.once('exit',code=>reject(Error('server exit '+code)));});
 for(const [url,path] of [['/','index.html'],['/assets/model.js','src/model.js'],['/assets/finance.js','src/finance.js'],['/assets/ui.js','src/ui.js']]){
  const response=await fetch('http://127.0.0.1:4320'+url);assert.equal(response.status,200);assert.equal(await response.text(),await readFile(path,'utf8'));if(url.endsWith('.js'))assert.match(response.headers.get('content-type'),/javascript/);
 }
 const response=await fetch('http://127.0.0.1:4320/assets/pdf-engine.js');assert.equal(response.status,200);assert.equal(createHash('sha256').update(new Uint8Array(await response.arrayBuffer())).digest('hex'),'d2d4fb0458175f2e499f9bf9a10b2fd865f3b1f2ba726099a043e0761f954547');
 assert.equal((await fetch('http://127.0.0.1:4320/src/model.js')).status,404);
 assert.equal((await (await fetch('http://127.0.0.1:4320/health')).json()).version,'2.2.0');
 console.log('PASS: production HTML, all JS assets, MIME types, PDF engine integrity and health version');
}finally{child.kill();}
