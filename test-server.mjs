import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile} from 'node:fs/promises';
const snapshot=JSON.parse(await readFile(new URL('./market-snapshot.json',import.meta.url),'utf8'));
let source=await readFile(new URL('./server.mjs',import.meta.url),'utf8');
source=source.slice(0,source.indexOf('function sendJson')).replace(/^import .*;\n/gm,'').replace(/^const PORT =.*\n/m,'').replace(/^const ROOT =.*\n/m,'').replace(/^const SNAPSHOT =.*\n/m,'const SNAPSHOT='+JSON.stringify(snapshot)+';\n');
for(const offline of [true,false]){
 let calls=0;const context={console,URL,AbortController,setTimeout,clearTimeout,fetch:async url=>{
  calls++;assert.ok(!url.includes('onrender.com'),'market fetch must not call itself');
  if(offline)throw Error('offline');
  let text;if(url.includes('open.er-api.com'))text=JSON.stringify({rates:{TWD:32},time_last_update_utc:'Tue, 13 Oct 2026 00:00:00 +0000'});
  else if(url.includes('moneydj'))text='<tr><td>2026/09/30</td><td>美元</td><td>0.8322</td></tr>';
  else text='單位淨值<span>2026/10/13</span><div class="nav">73.74</div>';
  return {ok:true,text:async()=>text};
 }};
 vm.createContext(context);vm.runInContext(source+';this.api={marketData,parseCnyesNav,parseMoneyDjDividend};',context);
 const [a,b]=await Promise.all([context.api.marketData(),context.api.marketData()]);assert.equal(calls,5,'concurrent requests share one refresh');assert.equal(a,b);assert.equal(a.stale,offline);assert.ok(a.funds.cash.nav>0&&a.usdTwd.rate>0);await context.api.marketData();assert.equal(calls,5,'cached requests must not refetch');
 if(offline){assert.equal(a.funds.cash.nav,snapshot.funds.cash.nav);assert.equal(a.funds.cash.dividendDate,snapshot.funds.cash.dividendDate);assert.equal(a.usdTwd.rate,snapshot.usdTwd.rate);assert.ok(a.funds.cash.sourceStatus.some(s=>s.includes('備援')));}
 else {assert.equal(a.funds.cash.navDate,'2026/10/13');assert.equal(a.funds.cash.dividendDate,'2026/09/30');}
}
const html=await readFile(new URL('./index.html',import.meta.url),'utf8');assert.match(html,/2\.1\.8 試用版/);for(const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g))new vm.Script(match[1]);assert.ok(html.includes('const INITIAL_MARKET='));console.log('PASS: direct sources, parsers, dated offline fallback, cache, concurrent refresh, approved HTML scripts');
