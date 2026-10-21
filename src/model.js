const products = {
  "zhihui": {
    name: "智匯贏家",
    insurer: "安達人壽",
    type: "甲型",
    mode: "dual",
    mortalityTable: "tw5",
    ageRange: "15-80歲",
    deathBenefitRatios: [[30, 1.9], [40, 1.6], [50, 1.4], [60, 1.2], [70, 1.1], [90, 1.02], [999, 1]],
    monthlyRates: { 1: 0.0025, 2: 0.0025, 3: 0.00175, 4: 0.001075 },
    surrender: { 1: 0.14, 2: 0.12, 3: 0.1, 4: 0.08, 5: 0.07 },
    policyFeeTwd: 100,
    policyFeeWaiverTwd: 3000000,
    platformFeature: ["重大燒燙傷保障加值25%"],
  },
  "jincai": {
    name: "金采年華",
    insurer: "法國巴黎人壽",
    type: "甲型",
    mode: "dual",
    mortalityTable: "tw6",
    ageRange: "15-80歲",
    deathBenefitRatios: [[30, 1.9], [40, 1.6], [50, 1.4], [60, 1.2], [70, 1.1], [90, 1.02], [999, 1]],
    monthlyRates: { 1: 0.002, 2: 0.0016, 3: 0.001334, 4: 0.001334 },
    surrender: { 1: 0.09, 2: 0.08, 3: 0.07, 4: 0.06, 5: 0.05 },
    policyFeeTwd: 100,
    policyFeeWaiverTwd: 3000000,
    platformFeature: ["VIP尊榮服務享5年", "投入滿300萬：每年2次機場接送", "投入滿800萬：每年4次機場接送"],
  },
  "xinmanyizu": {
    name: "鑫滿意足",
    insurer: "法國巴黎人壽",
    type: "甲型",
    mode: "dual",
    mortalityTable: "tw6",
    ageRange: "15-80歲",
    deathBenefitRatios: [[30, 1.9], [40, 1.6], [50, 1.4], [60, 1.2], [70, 1.1], [90, 1.02], [999, 1]],
    monthlyRates: { 1: 0.001917, 2: 0.001667, 3: 0.001667, 4: 0.001584 },
    surrender: { 1: 0.1, 2: 0.09, 3: 0.08, 4: 0.07, 5: 0.06, 6: 0.05, 7: 0.04 },
    policyFeeTwd: 100,
    policyFeeWaiverTwd: 3000000,
    platformFeature: ["VIP尊榮服務享7年", "投入滿300萬：每年2次機場接送 OR 家事服務", "投入滿800萬：每年4次機場接送 OR 家事服務"],
  },
  "cuican": {
    name: "璀璨人生",
    insurer: "安聯人壽",
    type: "丁型",
    mode: "single",
    mortalityTable: "tw5",
    ageRange: "15-55歲",
    deathBenefitRatios: [[30, 2.1], [40, 1.8], [50, 1.6], [60, 1.3], [70, 1.2], [90, 1.05], [999, 1]],
    monthlyRates: { 1: 0.00205, 2: 0.00205, 3: 0.00205, 4: 0 },
    surrender: { 1: 0.07, 2: 0.055, 3: 0.045, 4: 0.02 },
    policyFeeTwd: 100,
    policyFeeWaiverTwd: Infinity,
    platformFeature: ["高壽險倍率", "僅收3年管理費"],
  },
  "jilifafa": {
    name: "吉利發發",
    insurer: "安聯人壽",
    type: "甲型",
    mode: "single",
    mortalityTable: "tw5",
    ageRange: "15-80歲",
    deathBenefitRatios: [[30, 1.9], [40, 1.6], [50, 1.4], [60, 1.2], [70, 1.1], [90, 1.02], [999, 1]],
    monthlyRates: { 1: 0.0016, 2: 0.0016, 3: 0.0016, 4: 0.0016, 5: 0 },
    surrender: { 1: 0.07, 2: 0.06, 3: 0.05, 4: 0.02 },
    policyFeeTwd: 100,
    policyFeeWaiverTwd: 3000000,
    loyaltyBonusRate: 0.0025,
    loyaltyBonusStartYear: 6,
    platformFeature: ["第六年起", "每年0.25%加值回饋金"],
  },
};

const MORTALITY_TABLES = {
  tw5: buildMortalityTable(`
15:2.867/1.508,16:3.792/1.717,17:4.500/1.933,18:4.867/2.025,19:5.058/2.075,20:5.200/2.108,21:5.342/2.158,22:5.567/2.275,23:5.917/2.458,24:6.350/2.692,
25:6.842/2.967,26:7.375/3.058,27:7.717/3.108,28:8.042/3.167,29:8.400/3.250,30:8.842/3.342,31:9.392/3.458,32:10.075/3.667,33:10.875/4.008,34:11.775/4.358,
35:12.767/4.658,36:13.842/4.950,37:15.033/5.292,38:16.242/5.767,39:17.408/6.300,40:18.783/6.850,41:20.242/7.400,42:21.967/7.925,43:23.958/8.550,44:26.158/9.317,
45:28.483/10.258,46:30.950/11.308,47:33.608/12.417,48:36.508/13.633,49:39.717/15.033,50:42.800/16.600,51:46.033/18.392,52:49.492/20.125,53:52.925/21.833,54:56.283/23.442,
55:59.908/25.183,56:64.075/27.292,57:69.333/29.992,58:75.700/33.350,59:83.667/37.242,60:91.192/41.533,61:97.333/45.675,62:104.933/49.858,63:114.158/54.642,64:124.842/60.158,
65:136.700/66.608,66:149.100/74.133,67:162.475/82.900,68:177.683/93.017,69:194.658/104.500,70:212.967/117.342,71:233.008/131.417,72:254.308/146.142,73:277.417/162.733,74:302.200/181.275,
75:329.017/202.208,76:357.608/225.742,77:388.558/251.683,78:422.192/280.583,79:459.083/312.250,80:499.517/346.900,81:543.767/385.083,82:591.433/426.950,83:643.367/473.308,84:698.767/524.183,
85:758.775/580.150,86:823.958/643.375,87:894.608/712.225,88:972.767/789.833,89:1059.975/875.192,90:1160.308/972.775,91:1276.308/1090.117,92:1391.333/1234.608,93:1516.733/1375.425,94:1653.425/1532.292,
95:1802.433/1707.058,96:1964.883/1901.758,97:2141.958/2118.658,98:2335.008/2360.300,99:2545.442/2629.500,100:2774.850/2929.408,101:3024.933/3263.517,102:3297.550/3635.733,103:3594.742/4050.400,104:3918.708/4512.367,
105:4271.883/5027.017,106:4656.883/5600.367,107:5076.575/6239.108,108:5534.100/6950.708,109:6032.850/7743.458,110:8333.333/8333.333
`),
  tw6: buildMortalityTable(`
15:2/1,16:3/1,17:3/1,18:3/1,19:4/2,20:4/1,21:4/2,22:4/2,23:4/2,24:4/2,
25:4/2,26:4/2,27:4/2,28:4/2,29:5/2,30:5/3,31:6/3,32:6/3,33:7/3,34:7/3,
35:8/4,36:9/4,37:10/4,38:11/5,39:12/5,40:13/5,41:14/6,42:15/6,43:16/7,44:18/7,
45:20/8,46:22/9,47:23/10,48:25/10,49:27/11,50:29/12,51:31/13,52:33/14,53:36/15,54:38/16,
55:42/18,56:45/19,57:48/21,58:52/22,59:56/24,60:62/28,61:67/30,62:72/33,63:77/36,64:84/39,
65:94/47,66:102/51,67:111/57,68:122/63,69:134/70,70:154/81,71:169/90,72:184/100,73:201/112,74:220/125,
75:239/136,76:262/153,77:287/171,78:314/192,79:344/215,80:376/240,81:411/268,82:449/298,83:490/332,84:535/370,
85:585/413,86:639/461,87:699/515,88:763/576,89:830/644,90:907/720,91:996/804,92:1085/898,93:1181/1001,94:1286/1115,
95:1401/1241,96:1526/1380,97:1662/1533,98:1810/1700,99:1972/1884,100:2149/2083,101:2336/2300,102:2528/2534,103:2733/2787,104:2949/3057,
105:3178/3344,106:3525/3740,107:3903/4156,108:4271/4638,109:4655/5162,110:8333/8333
`),
};


products.cuican.policyFeeWaiverTwd=3000000;
Object.assign(MORTALITY_TABLES.tw6,{"15": {"male": 2.5, "female": 1.1}, "35": {"male": 8.1, "female": 3.7}, "55": {"male": 42.2, "female": 18.0}, "75": {"male": 239.0, "female": 136.1}, "95": {"male": 1400.7, "female": 1241.4}, "16": {"male": 2.8, "female": 1.2}, "36": {"male": 8.9, "female": 4.0}, "56": {"male": 45.1, "female": 19.2}, "76": {"male": 261.7, "female": 152.6}, "96": {"male": 1525.7, "female": 1380.4}, "17": {"male": 3.2, "female": 1.3}, "37": {"male": 9.7, "female": 4.3}, "57": {"male": 48.4, "female": 20.6}, "77": {"male": 286.6, "female": 171.2}, "97": {"male": 1661.9, "female": 1533.1}, "18": {"male": 3.4, "female": 1.4}, "38": {"male": 10.6, "female": 4.6}, "58": {"male": 51.9, "female": 22.2}, "78": {"male": 314.1, "female": 191.8}, "98": {"male": 1810.4, "female": 1700.5}, "19": {"male": 3.6, "female": 1.5}, "39": {"male": 11.6, "female": 5.0}, "59": {"male": 55.7, "female": 24.1}, "79": {"male": 344.0, "female": 214.7}, "99": {"male": 1972.3, "female": 1883.6}, "20": {"male": 3.6, "female": 1.5}, "40": {"male": 12.7, "female": 5.5}, "60": {"male": 62.2, "female": 27.7}, "80": {"male": 376.5, "female": 239.9}, "100": {"male": 2148.7, "female": 2083.2}, "21": {"male": 3.7, "female": 1.6}, "41": {"male": 13.9, "female": 5.9}, "61": {"male": 66.7, "female": 30.0}, "81": {"male": 411.5, "female": 267.6}, "101": {"male": 2335.6, "female": 2299.9}, "22": {"male": 3.8, "female": 1.6}, "42": {"male": 15.1, "female": 6.4}, "62": {"male": 71.8, "female": 32.7}, "82": {"male": 449.3, "female": 298.2}, "102": {"male": 2528.2, "female": 2534.3}, "23": {"male": 3.9, "female": 1.7}, "43": {"male": 16.4, "female": 6.9}, "63": {"male": 77.4, "female": 35.7}, "83": {"male": 490.4, "female": 332.2}, "103": {"male": 2732.8, "female": 2786.6}, "24": {"male": 3.9, "female": 1.7}, "44": {"male": 17.8, "female": 7.4}, "64": {"male": 83.7, "female": 39.1}, "84": {"male": 535.3, "female": 370.1}, "104": {"male": 2949.5, "female": 3056.7}, "25": {"male": 4.1, "female": 2.0}, "45": {"male": 20.1, "female": 8.5}, "65": {"male": 93.9, "female": 46.7}, "85": {"male": 584.6, "female": 412.8}, "105": {"male": 3178.0, "female": 3343.9}, "26": {"male": 4.2, "female": 2.1}, "46": {"male": 21.7, "female": 9.1}, "66": {"male": 101.9, "female": 51.2}, "86": {"male": 639.0, "female": 460.9}, "106": {"male": 3525.2, "female": 3740.3}, "27": {"male": 4.3, "female": 2.2}, "47": {"male": 23.4, "female": 9.8}, "67": {"male": 111.2, "female": 56.6}, "87": {"male": 698.9, "female": 515.1}, "107": {"male": 3902.6, "female": 4156.1}, "28": {"male": 4.5, "female": 2.3}, "48": {"male": 25.2, "female": 10.5}, "68": {"male": 121.8, "female": 62.7}, "88": {"male": 762.5, "female": 576.0}, "108": {"male": 4271.2, "female": 4637.7}, "29": {"male": 4.7, "female": 2.4}, "49": {"male": 27.1, "female": 11.3}, "69": {"male": 133.6, "female": 69.7}, "89": {"male": 829.6, "female": 644.0}, "109": {"male": 4654.9, "female": 5162.2}, "30": {"male": 5.5, "female": 2.6}, "50": {"male": 28.9, "female": 11.9}, "70": {"male": 154.2, "female": 81.0}, "90": {"male": 906.8, "female": 719.9}, "110": {"male": 8333.3, "female": 8333.3}, "31": {"male": 6.0, "female": 2.8}, "51": {"male": 30.8, "female": 12.8}, "71": {"male": 168.6, "female": 90.2}, "91": {"male": 996.1, "female": 804.3}, "32": {"male": 6.5, "female": 2.9}, "52": {"male": 32.9, "female": 14.1}, "72": {"male": 184.3, "female": 100.4}, "92": {"male": 1085.4, "female": 898.0}, "33": {"male": 7.0, "female": 3.2}, "53": {"male": 35.7, "female": 15.3}, "73": {"male": 201.5, "female": 111.8}, "93": {"male": 1181.0, "female": 1001.3}, "34": {"male": 7.5, "female": 3.4}, "54": {"male": 38.2, "female": 16.2}, "74": {"male": 220.3, "female": 124.6}, "94": {"male": 1286.2, "female": 1115.4}});
function buildMortalityTable(source){return Object.fromEntries(source.replace(/\s+/g,'').split(',').filter(Boolean).map(s=>{const[a,v]=s.split(':');const[male,female]=v.split('/').map(Number);return[+a,{male,female}]}));}
for(const a of [31,32,33,34,51,52,53,54,71,72,73,74,91,92,93,94]){const original=buildMortalityTable(`
15:2/1,16:3/1,17:3/1,18:3/1,19:4/2,20:4/1,21:4/2,22:4/2,23:4/2,24:4/2,
25:4/2,26:4/2,27:4/2,28:4/2,29:5/2,30:5/3,31:6/3,32:6/3,33:7/3,34:7/3,
35:8/4,36:9/4,37:10/4,38:11/5,39:12/5,40:13/5,41:14/6,42:15/6,43:16/7,44:18/7,
45:20/8,46:22/9,47:23/10,48:25/10,49:27/11,50:29/12,51:31/13,52:33/14,53:36/15,54:38/16,
55:42/18,56:45/19,57:48/21,58:52/22,59:56/24,60:62/28,61:67/30,62:72/33,63:77/36,64:84/39,
65:94/47,66:102/51,67:111/57,68:122/63,69:134/70,70:154/81,71:169/90,72:184/100,73:201/112,74:220/125,
75:239/136,76:262/153,77:287/171,78:314/192,79:344/215,80:376/240,81:411/268,82:449/298,83:490/332,84:535/370,
85:585/413,86:639/461,87:699/515,88:763/576,89:830/644,90:907/720,91:996/804,92:1085/898,93:1181/1001,94:1286/1115,
95:1401/1241,96:1526/1380,97:1662/1533,98:1810/1700,99:1972/1884,100:2149/2083,101:2336/2300,102:2528/2534,103:2733/2787,104:2949/3057,
105:3178/3344,106:3525/3740,107:3903/4156,108:4271/4638,109:4655/5162,110:8333/8333
`);MORTALITY_TABLES.tw6[a]=original[a];}
function rateFor(p,y){let r=0;for(const k of Object.keys(p.monthlyRates).map(Number).sort((a,b)=>a-b))if(y>=k)r=p.monthlyRates[k];return r;}
function ratio(p,a){return p.deathBenefitRatios.find(b=>a<=b[0])[1];}
// Policy-only settings never change financing projections.
function policyOptions(c) {
 const policy = !c.mode || c.mode === 'policy';
 return { accumulationMonths: policy ? Math.max(0, Math.min(120, Math.trunc(Number(c.accumulationMonths) || 0))) : 0,
  customAllocation: policy && c.distributionMode === 'allocation' };
}
function project(c, override) {
 const p=products[c.product],capital=c.capital*10000,shock=override??c.shock/100,
  fx0=c.fx,fx=fx0*(1+c.fxChange/100),funds=[{nav:c.cashNav,div:c.cashDiv},{nav:c.stockNav,div:c.stockDiv}],pf=funds[c.fund],gf=funds[1-c.fund];
 const options=policyOptions(c),dist=pf.div*12/pf.nav;
 const fraction=options.customAllocation ? Math.min(1,Math.max(0,Number(c.cashPercent)/100)) : Math.min(1,Math.max(0,c.yield/100/dist));
 const fixed=c.payout==='fixed'&&!options.customAllocation;
 let u=capital/fx0/pf.nav*(p.mode==='dual'?fraction:1),v=p.mode==='dual'?capital/fx0/gf.nav*(1-fraction):0,cum=0,ann=0,cumReinvested=0;
 const initialPrimaryUnits=u,initialGrowthUnits=v;
 let rows=[],firstAccount=null,firstTotal=null;
 const limit=Math.min(360,(111-c.age)*12);
 for(let m=1;m<=limit;m++) {
  const y=Math.floor((m-1)/12)+1,age=c.age+y-1,level=m>=c.shockMonth?1+shock:1,pn=pf.nav*level,gn=gf.nav*level;
  const d=u*pf.div*(1+c.divChange/100),g=v*gf.div*(1+c.divChange/100),accumulating=m<=options.accumulationMonths;
  const cash=accumulating?0:fixed?Math.min(d,c.monthCash/fx):d*(p.mode==='dual'?1:fraction);
  const reinvested=(Math.max(0,d-cash)+g)*fx;
  u+=Math.max(0,d-cash)/pn;v+=g/gn;
  let account=(u*pn+v*gn)*fx;
  const nar=Math.max(0,capital*ratio(p,age)-account),coi=nar/100000*(MORTALITY_TABLES[p.mortalityTable][age]?.[c.gender]||0),admin=capital>=p.policyFeeWaiverTwd?0:p.policyFeeTwd,fee=account*rateFor(p,y)+admin+coi;
  let left=fee/fx;const takeG=Math.min(v*gn,left);v-=takeG/gn;left-=takeG;u=Math.max(0,u-left/pn);
  account=(u*pn+v*gn)*fx;ann+=account;
  if(m%12===0){if(p.loyaltyBonusRate&&y>=p.loyaltyBonusStartYear){const bonus=ann/12*p.loyaltyBonusRate;u+=bonus/fx/pn;account+=bonus;}ann=0;}
  cum+=cash*fx;cumReinvested+=reinvested;
  const surrenderFee=account*(p.surrender[y]||0),net=account-surrenderFee,total=net+cum;
  if(firstAccount===null&&net>=capital)firstAccount=m;if(firstTotal===null&&total>=capital)firstTotal=m;
  rows.push({m,cash:cash*fx,cum,account,net,total,fee,surrenderFee,units:u+v,primaryUnits:u,growthUnits:v,reinvested,cumReinvested,accumulating,
   shortfall:fixed&&!accumulating?Math.max(0,c.monthCash-cash*fx):0});
 }
 return {rows,firstAccount,firstTotal,fraction,capital,initialPrimaryUnits,initialGrowthUnits,...options};
}
