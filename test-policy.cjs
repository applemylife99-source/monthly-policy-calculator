const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('src/model.js','utf8'),legacy=fs.readFileSync('tests/fixtures/model-219.js','utf8');
const old={},next={};vm.createContext(old);vm.createContext(next);vm.runInContext(legacy+';this.project=project;',old);vm.runInContext(source+';this.project=project;',next);
const base={mode:'policy',capital:300,product:'cuican',age:45,gender:'male',fund:0,payout:'ratio',yield:8,monthCash:20000,shock:0,shockMonth:1,divChange:0,fxChange:0,fx:32,cashNav:75,cashDiv:.8,stockNav:22,stockDiv:.15,distributionMode:'rate',cashPercent:80,accumulationMonths:0};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-6,`${a} != ${b}`);
for(const product of ['cuican','jilifafa','zhihui','jincai','xinmanyizu'])for(const mode of ['policy','mortgage','loan'])for(const payout of ['ratio','fixed'])for(const shock of [-60,0,60]){
 const c={...base,product,mode,payout,shock};const before=old.project(c),after=next.project(c);
 for(let i=0;i<before.rows.length;i++)for(const k of Object.keys(before.rows[i]))near(after.rows[i][k],before.rows[i][k]);
 if(mode!=='policy'){const hidden=next.project({...c,distributionMode:'allocation',cashPercent:0,accumulationMonths:120});for(let i=0;i<before.rows.length;i++)for(const k of Object.keys(before.rows[i]))near(hidden.rows[i][k],before.rows[i][k]);}
}
for(const product of ['cuican','zhihui'])for(const n of [1,12,120])for(const percent of [0,20,80,100])for(const fund of [0,1]){
 const c={...base,product,fund,accumulationMonths:n,cashPercent:percent,distributionMode:'allocation'},r=next.project(c),control=next.project({...c,accumulationMonths:0});
 near(r.fraction,percent/100);assert.ok(r.rows.slice(0,n).every(x=>x.cash===0&&x.cum===0&&x.shortfall===0&&x.accumulating));assert.equal(r.rows[n].accumulating,false);
 if(percent>0)assert.ok(r.rows[n].cash>control.rows[n].cash);else assert.equal(r.rows[n].cash,0);
 for(const row of r.rows){near(row.total,row.net+row.cum);near(row.account,(row.primaryUnits*(fund?22:75)+row.growthUnits*(fund?75:22))*32);assert.ok(row.primaryUnits>=0&&row.growthUnits>=0);}
}
const single=next.project({...base,distributionMode:'allocation',cashPercent:80});near(single.rows[0].cash,3000000/32/75*.8*.8*32);near(single.rows[0].reinvested,3000000/32/75*.8*.2*32);
const dual=next.project({...base,product:'zhihui',distributionMode:'allocation',cashPercent:80});near(dual.initialPrimaryUnits,3000000*.8/32/75);near(dual.initialGrowthUnits,3000000*.2/32/22);near(dual.rows[0].cash,3000000*.8/32/75*.8*32);
const fixed=next.project({...base,payout:'fixed',accumulationMonths:12});assert.equal(fixed.rows[11].shortfall,0);near(fixed.rows[12].cash,20000);
console.log('PASS: 90 legacy scenarios unchanged; financing ignores policy-only controls; accumulation boundaries 1/12/120; 0–100% allocation; dual fund units, reinvestment, fixed payout and no double counting');
