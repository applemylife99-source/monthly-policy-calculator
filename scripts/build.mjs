import {readFile,writeFile} from 'node:fs/promises';
const snapshot=JSON.parse(await readFile('market-snapshot.json','utf8'));
const html=(await readFile('src/page.html','utf8')).replace('<script>/*MODEL*/</script>','<script>const INITIAL_MARKET='+JSON.stringify(snapshot)+';</script><script src="/assets/model.js?v=2.2.0"></script><script src="/assets/finance.js?v=2.2.0"></script>').replace('<script>/*UI*/</script>','<script src="/assets/ui.js?v=2.2.0"></script>');
if(html.includes('/*MODEL*/')||html.includes('/*UI*/'))throw Error('Unresolved template');
await writeFile('index.html',html);
