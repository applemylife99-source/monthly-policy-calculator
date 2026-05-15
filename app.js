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

const scenarios = {
  flat: "預測常態波動平穩",
  up20: "預測常態波動偏牛",
  down20: "預測常態波動偏熊",
  normal: "預測常態波動劇烈",
};

const FUND_LABELS = {
  cash: "聯博",
  stock: "貝萊德",
};

const SCENARIO_PROFILES = {
  flat: { annualDrift: 0, annualVol: 0.09, label: "平穩", meanReversion: 0.3, rangeBand: 0.15, centerLevel: 0.98 },
  up20: { annualDrift: 0.025, annualVol: 0.2, label: "偏牛" },
  down20: { annualDrift: -0.01, annualVol: 0.22, label: "偏熊" },
  normal: { annualDrift: 0.005, annualVol: 0.32, label: "劇烈" },
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

const state = {
  market: null,
  scenario: "flat",
  scenarioSeeds: {
    flat: Date.now() + 101,
    up20: Date.now() + 202,
    down20: Date.now() + 303,
    normal: Date.now() + 404,
  },
  results: null,
};

const $ = (id) => document.getElementById(id);

function fmtMoney(value, currency = "NT$") {
  if (!Number.isFinite(value)) return "-";
  return `${currency}${Math.round(value).toLocaleString("zh-TW")}`;
}

function fmtUsd(value) {
  if (!Number.isFinite(value)) return "-";
  return `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}`;
}

function fmtPct(value, digits = 1) {
  if (!Number.isFinite(value)) return "-";
  return `${(value * 100).toFixed(digits)}%`;
}

function fmtSignedPct(value, digits = 2) {
  if (!Number.isFinite(value)) return "-";
  const sign = value > 0 ? "+" : "";
  return `${sign}${fmtPct(value, digits)}`;
}

function fmtUnits(value) {
  if (!Number.isFinite(value)) return "-";
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toLocaleString("zh-TW", { maximumFractionDigits: 4 })}`;
}

function policyYear(month) {
  return Math.floor((month - 1) / 12) + 1;
}

function feeRateFor(product, year) {
  const keys = Object.keys(product.monthlyRates).map(Number).sort((a, b) => a - b);
  let rate = 0;
  for (const key of keys) {
    if (year >= key) rate = product.monthlyRates[key];
  }
  return rate;
}

function surrenderRateFor(product, year) {
  return product.surrender[year] || 0;
}

function minDeathBenefitRatio(age, product) {
  const brackets = product.deathBenefitRatios || [[999, 1]];
  const match = brackets.find(([maxAge]) => age <= maxAge);
  return match ? match[1] : 1;
}

function buildMortalityTable(source) {
  return source
    .replace(/\s+/g, "")
    .split(",")
    .filter(Boolean)
    .reduce((table, item) => {
      const [ageText, values] = item.split(":");
      const [male, female] = values.split("/").map(Number);
      table[Number(ageText)] = { male, female };
      return table;
    }, {});
}

function monthlyInsuranceCost(netRiskTwd, age, gender, tableName) {
  const table = MORTALITY_TABLES[tableName] || MORTALITY_TABLES.tw5;
  const boundedAge = Math.max(15, Math.min(110, Math.round(age)));
  const ratePer100k = table[boundedAge]?.[gender] ?? 0;
  return (netRiskTwd / 100000) * ratePer100k;
}

function seededNormal(seed) {
  const x = Math.sin(seed) * 10000;
  const u1 = Math.max(0.0001, x - Math.floor(x));
  const y = Math.sin(seed * 1.7 + 11) * 10000;
  const u2 = Math.max(0.0001, y - Math.floor(y));
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

function scenarioNavPoint(baseNav, month, scenario, seed) {
  const profile = SCENARIO_PROFILES[scenario] || SCENARIO_PROFILES.flat;
  const monthlyDrift = profile.annualDrift / 12;
  const monthlyVol = profile.annualVol / Math.sqrt(12);

  if (profile.meanReversion) {
    let level = 1;
    let previousLevel = 1;
    let change = 0;
    const centerLevel = profile.centerLevel || 1;
    const lowerBand = centerLevel - profile.rangeBand;
    const upperBand = centerLevel + profile.rangeBand;
    for (let i = 1; i <= month; i += 1) {
      previousLevel = level;
      const shock = monthlyVol * seededNormal(seed + i);
      const pullBack = (centerLevel - level) * profile.meanReversion;
      level = Math.min(upperBand, Math.max(lowerBand, level + pullBack + shock));
      change = level / previousLevel - 1;
    }
    return { nav: baseNav * level, change };
  }

  let factor = 1;
  let change = 0;
  for (let i = 1; i <= month; i += 1) {
    change = Math.exp(monthlyDrift - (monthlyVol * monthlyVol) / 2 + monthlyVol * seededNormal(seed + i)) - 1;
    factor *= 1 + change;
  }
  return { nav: baseNav * Math.max(0.2, factor), change };
}

function fundSnapshot(input, fundKey) {
  const nav = fundKey === "stock" ? input.stockNav : input.cashNav;
  const dividend = fundKey === "stock" ? input.stockDiv : input.cashDiv;
  return {
    key: fundKey,
    label: FUND_LABELS[fundKey],
    nav,
    dividend,
    yield: nav ? (dividend * 12) / nav : 0,
  };
}

function fundPoint(fundKey, cashNavPoint, stockNavPoint) {
  return fundKey === "stock" ? stockNavPoint : cashNavPoint;
}

function inputs() {
  return {
    product: products[$("product").value],
    age: Number($("age").value || 0),
    gender: $("gender").value,
    capitalTwd: Number($("capital").value || 0),
    targetYield: Number($("targetYield").value || 0) / 100,
    fx: Number($("fx").value || 0),
    cashNav: Number($("cashNav").value || 0),
    cashDiv: Number($("cashDiv").value || 0),
    stockNav: Number($("stockNav").value || 0),
    stockDiv: Number($("stockDiv").value || 0),
    singleFund: $("singleFund").value,
    dualCashFund: $("dualCashFund").value,
    dualStockFund: $("dualStockFund").value,
  };
}

function selectedMonths() {
  const months = [];
  for (let i = 1; i <= 120; i += 1) months.push(i);
  for (let year = 15; year <= 60; year += 5) months.push(year * 12);
  return new Set(months);
}

function simulate(scenarioName) {
  const input = inputs();
  const product = input.product;
  const capitalUsd = input.fx ? input.capitalTwd / input.fx : 0;
  const issueDeathBenefitTwd = input.capitalTwd * minDeathBenefitRatio(input.age, product);
  const targetMonthlyCashUsd = (capitalUsd * input.targetYield) / 12;
  const payoutFundKey = product.mode === "dual" ? input.dualCashFund : input.singleFund;
  const growthFundKey = product.mode === "dual" ? input.dualStockFund : null;
  const payoutFund = fundSnapshot(input, payoutFundKey);
  const growthFund = growthFundKey ? fundSnapshot(input, growthFundKey) : null;
  const distributionYield = payoutFund.yield;
  const rawCashRatio = distributionYield ? input.targetYield / distributionYield : 1;
  const cashRatio = Math.max(0, Math.min(1, rawCashRatio));
  const stockRatio = product.mode === "dual" ? 1 - cashRatio : 0;

  let cashUnits = payoutFund.nav ? (capitalUsd * (product.mode === "dual" ? cashRatio : 1)) / payoutFund.nav : 0;
  let stockUnits = product.mode === "dual" && growthFund?.nav ? (capitalUsd * stockRatio) / growthFund.nav : 0;
  let cumulativeCashUsd = 0;
  let firstFeeUnits = 0;
  let firstFeeUsd = 0;
  const rows = [];
  const keep = selectedMonths();
  const seedBase = Math.round(input.age * 13 + input.capitalTwd / 100000 + input.targetYield * 1000);
  const seed = seedBase + (state.scenarioSeeds[scenarioName] || 0);
  let annualValueSumUsd = 0;
  let annualValueMonths = 0;
  let previousKeptUnits = null;

  for (let month = 1; month <= 720; month += 1) {
    const year = policyYear(month);
    const attainedAge = input.age + Math.floor((month - 1) / 12);
    const cashNavPoint = scenarioNavPoint(input.cashNav, month, scenarioName, seed);
    const stockNavPoint = scenarioNavPoint(input.stockNav, month, scenarioName, seed + 97);
    const payoutPoint = fundPoint(payoutFundKey, cashNavPoint, stockNavPoint);
    const growthPoint = growthFundKey ? fundPoint(growthFundKey, cashNavPoint, stockNavPoint) : null;
    const payoutNav = payoutPoint.nav;
    const growthNav = growthPoint?.nav || 0;
    const payoutDistribution = cashUnits * payoutFund.dividend;
    const growthDistribution = stockUnits * (growthFund?.dividend || 0);
    let monthlyCashUsd = 0;

    if (product.mode === "dual") {
      monthlyCashUsd = payoutDistribution;
      if (growthNav > 0) stockUnits += growthDistribution / growthNav;
    } else {
      monthlyCashUsd = payoutDistribution * cashRatio;
      const reinvest = Math.max(0, payoutDistribution - monthlyCashUsd);
      if (payoutNav > 0) cashUnits += reinvest / payoutNav;
    }

    const accountValueUsd = cashUnits * payoutNav + stockUnits * growthNav;
    const monthlyRate = feeRateFor(product, year);
    const adminFeeUsd = input.capitalTwd >= product.policyFeeWaiverTwd ? 0 : product.policyFeeTwd / input.fx;
    const currentMinimumDeathBenefitTwd = input.capitalTwd * minDeathBenefitRatio(attainedAge, product);
    const netRiskTwd = Math.max(0, currentMinimumDeathBenefitTwd - accountValueUsd * input.fx);
    const insuranceCostUsd = monthlyInsuranceCost(netRiskTwd, attainedAge, input.gender, product.mortalityTable) / input.fx;
    const platformFeeUsd = accountValueUsd * monthlyRate + adminFeeUsd + insuranceCostUsd;
    if (month === 1) firstFeeUsd = platformFeeUsd;

    if (product.mode === "dual" && stockUnits > 0 && growthNav > 0) {
      const units = platformFeeUsd / growthNav;
      stockUnits = Math.max(0, stockUnits - units);
      if (month === 1) firstFeeUnits = units;
    } else {
      const units = platformFeeUsd / payoutNav;
      cashUnits = Math.max(0, cashUnits - units);
      if (month === 1) firstFeeUnits = units;
    }

    cumulativeCashUsd += monthlyCashUsd;
    let grossValueUsd = cashUnits * payoutNav + stockUnits * growthNav;
    annualValueSumUsd += grossValueUsd;
    annualValueMonths += 1;
    let loyaltyBonusUsd = 0;
    if (product.loyaltyBonusRate && month % 12 === 0 && year >= product.loyaltyBonusStartYear) {
      loyaltyBonusUsd = (annualValueSumUsd / annualValueMonths) * product.loyaltyBonusRate;
      if (payoutNav > 0) cashUnits += loyaltyBonusUsd / payoutNav;
      grossValueUsd = cashUnits * payoutNav + stockUnits * growthNav;
    }
    if (month % 12 === 0) {
      annualValueSumUsd = 0;
      annualValueMonths = 0;
    }
    if (keep.has(month)) {
      const currentUnits = { payout: cashUnits, growth: stockUnits };
      const hasPreviousUnits = Boolean(previousKeptUnits);
      const unitChange = previousKeptUnits
        ? {
            payout: currentUnits.payout - previousKeptUnits.payout,
            growth: currentUnits.growth - previousKeptUnits.growth,
            payoutPct: previousKeptUnits.payout ? (currentUnits.payout - previousKeptUnits.payout) / previousKeptUnits.payout : 0,
            growthPct: previousKeptUnits.growth ? (currentUnits.growth - previousKeptUnits.growth) / previousKeptUnits.growth : 0,
          }
        : { payout: currentUnits.payout, growth: currentUnits.growth, payoutPct: 0, growthPct: 0 };
      previousKeptUnits = { ...currentUnits };
      rows.push({
        month,
        label: month <= 120 ? `第${month}月` : `第${month / 12}年`,
        navVolatility: formatNavVolatility(product, cashNavPoint, stockNavPoint, payoutFundKey, growthFundKey),
        unitChange: formatUnitChange(product, unitChange, payoutFundKey, growthFundKey, hasPreviousUnits),
        monthlyCashTwd: monthlyCashUsd * input.fx,
        cumulativeCashTwd: cumulativeCashUsd * input.fx,
        policyValueTwd: grossValueUsd * input.fx,
        breakEvenRate: input.capitalTwd ? (grossValueUsd * input.fx) / input.capitalTwd : 0,
        loyaltyBonusTwd: loyaltyBonusUsd * input.fx,
      });
    }
  }

  return {
    rows,
    summary: {
      cashRatio,
      stockRatio,
      monthlyCashTwd: activeFirstMonthCash(rows, targetMonthlyCashUsd * input.fx),
      deathBenefitTwd: issueDeathBenefitTwd,
      firstFeeUnits,
      firstFeeTwd: firstFeeUsd * input.fx,
      selectedFundYield: distributionYield,
      rawCashRatio,
    },
  };
}

function loanPolicyInputsV2(capitalTwd, annualCashRate) {
  return {
    ...inputs(),
    capitalTwd,
    targetYield: annualCashRate,
  };
}

function simulatePolicyForLoanV2(scenarioName, capitalTwd, annualCashRate, maxMonths = 720) {
  const input = loanPolicyInputsV2(capitalTwd, annualCashRate);
  const product = input.product;
  const capitalUsd = input.fx ? input.capitalTwd / input.fx : 0;
  const targetMonthlyCashUsd = (capitalUsd * input.targetYield) / 12;
  const payoutFundKey = product.mode === "dual" ? input.dualCashFund : input.singleFund;
  const growthFundKey = product.mode === "dual" ? input.dualStockFund : null;
  const payoutFund = fundSnapshot(input, payoutFundKey);
  const growthFund = growthFundKey ? fundSnapshot(input, growthFundKey) : null;
  const distributionYield = payoutFund.yield;
  const rawCashRatio = distributionYield ? input.targetYield / distributionYield : 1;
  const cashRatio = Math.max(0, Math.min(1, rawCashRatio));
  const stockRatio = product.mode === "dual" ? 1 - cashRatio : 0;

  let cashUnits = payoutFund.nav ? (capitalUsd * (product.mode === "dual" ? cashRatio : 1)) / payoutFund.nav : 0;
  let stockUnits = product.mode === "dual" && growthFund?.nav ? (capitalUsd * stockRatio) / growthFund.nav : 0;
  let cumulativeCashUsd = 0;
  let annualValueSumUsd = 0;
  let annualValueMonths = 0;
  const rows = [];
  const seedBase = Math.round(input.age * 13 + input.capitalTwd / 100000 + input.targetYield * 1000);
  const seed = seedBase + (state.scenarioSeeds[scenarioName] || 0);

  for (let month = 1; month <= maxMonths; month += 1) {
    const year = policyYear(month);
    const attainedAge = input.age + Math.floor((month - 1) / 12);
    const cashNavPoint = scenarioNavPoint(input.cashNav, month, scenarioName, seed);
    const stockNavPoint = scenarioNavPoint(input.stockNav, month, scenarioName, seed + 97);
    const payoutPoint = fundPoint(payoutFundKey, cashNavPoint, stockNavPoint);
    const growthPoint = growthFundKey ? fundPoint(growthFundKey, cashNavPoint, stockNavPoint) : null;
    const payoutNav = payoutPoint.nav;
    const growthNav = growthPoint?.nav || 0;
    const payoutDistribution = cashUnits * payoutFund.dividend;
    const growthDistribution = stockUnits * (growthFund?.dividend || 0);
    let monthlyCashUsd = 0;

    if (product.mode === "dual") {
      monthlyCashUsd = payoutDistribution;
      if (growthNav > 0) stockUnits += growthDistribution / growthNav;
    } else {
      monthlyCashUsd = payoutDistribution * cashRatio;
      const reinvest = Math.max(0, payoutDistribution - monthlyCashUsd);
      if (payoutNav > 0) cashUnits += reinvest / payoutNav;
    }

    const accountValueUsd = cashUnits * payoutNav + stockUnits * growthNav;
    const monthlyRate = feeRateFor(product, year);
    const adminFeeUsd = input.capitalTwd >= product.policyFeeWaiverTwd ? 0 : product.policyFeeTwd / input.fx;
    const currentMinimumDeathBenefitTwd = input.capitalTwd * minDeathBenefitRatio(attainedAge, product);
    const netRiskTwd = Math.max(0, currentMinimumDeathBenefitTwd - accountValueUsd * input.fx);
    const insuranceCostUsd = monthlyInsuranceCost(netRiskTwd, attainedAge, input.gender, product.mortalityTable) / input.fx;
    const platformFeeUsd = accountValueUsd * monthlyRate + adminFeeUsd + insuranceCostUsd;

    if (product.mode === "dual" && stockUnits > 0 && growthNav > 0) {
      stockUnits = Math.max(0, stockUnits - platformFeeUsd / growthNav);
    } else if (payoutNav > 0) {
      cashUnits = Math.max(0, cashUnits - platformFeeUsd / payoutNav);
    }

    cumulativeCashUsd += monthlyCashUsd;
    let grossValueUsd = cashUnits * payoutNav + stockUnits * growthNav;
    annualValueSumUsd += grossValueUsd;
    annualValueMonths += 1;
    if (product.loyaltyBonusRate && month % 12 === 0 && year >= product.loyaltyBonusStartYear) {
      const loyaltyBonusUsd = (annualValueSumUsd / annualValueMonths) * product.loyaltyBonusRate;
      if (payoutNav > 0) cashUnits += loyaltyBonusUsd / payoutNav;
      grossValueUsd = cashUnits * payoutNav + stockUnits * growthNav;
    }
    if (month % 12 === 0) {
      annualValueSumUsd = 0;
      annualValueMonths = 0;
    }

    rows.push({
      month,
      monthlyCashTwd: monthlyCashUsd * input.fx,
      cumulativeCashTwd: cumulativeCashUsd * input.fx,
      policyValueTwd: grossValueUsd * input.fx,
    });
  }

  return {
    rows,
    summary: {
      monthlyCashTwd: rows[0]?.monthlyCashTwd || targetMonthlyCashUsd * input.fx,
      cashRatio,
      rawCashRatio,
    },
  };
}

function policyProjectionRowV2(projection, month) {
  return projection.rows[Math.min(Math.max(month, 1), projection.rows.length) - 1] || {
    monthlyCashTwd: 0,
    cumulativeCashTwd: 0,
    policyValueTwd: 0,
  };
}

function smoothStepV2(value) {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

function navMultiplierToMonth48V2(month, changeRate) {
  const progress = month <= 48 ? smoothStepV2(month / 48) : 1;
  return Math.max(0.2, 1 + changeRate * progress);
}

function simulateCuicanAlliancePolicyForLoanV2(capitalTwd, annualCashRate, navChangeAtMonth48, maxMonths = 720) {
  const baseInput = inputs();
  const product = products.cuican;
  const fx = baseInput.fx || 1;
  const capitalUsd = capitalTwd / fx;
  const cashNav = baseInput.cashNav || 0;
  const cashDividend = baseInput.cashDiv || 0;
  const distributionYield = cashNav ? (cashDividend * 12) / cashNav : 0;
  const rawCashRatio = distributionYield ? annualCashRate / distributionYield : 1;
  const cashRatio = Math.max(0, Math.min(1, rawCashRatio));

  let cashUnits = cashNav ? capitalUsd / cashNav : 0;
  let cumulativeCashUsd = 0;
  const rows = [];

  for (let month = 1; month <= maxMonths; month += 1) {
    const year = policyYear(month);
    const attainedAge = baseInput.age + Math.floor((month - 1) / 12);
    const payoutNav = cashNav * navMultiplierToMonth48V2(month, navChangeAtMonth48);
    const payoutDistribution = cashUnits * cashDividend;
    const monthlyCashUsd = payoutDistribution * cashRatio;
    const reinvest = Math.max(0, payoutDistribution - monthlyCashUsd);
    if (payoutNav > 0) cashUnits += reinvest / payoutNav;

    const accountValueUsd = cashUnits * payoutNav;
    const monthlyRate = feeRateFor(product, year);
    const adminFeeUsd = product.policyFeeTwd / fx;
    const currentMinimumDeathBenefitTwd = capitalTwd * minDeathBenefitRatio(attainedAge, product);
    const netRiskTwd = Math.max(0, currentMinimumDeathBenefitTwd - accountValueUsd * fx);
    const insuranceCostUsd = monthlyInsuranceCost(netRiskTwd, attainedAge, baseInput.gender, product.mortalityTable) / fx;
    const platformFeeUsd = accountValueUsd * monthlyRate + adminFeeUsd + insuranceCostUsd;
    if (payoutNav > 0) cashUnits = Math.max(0, cashUnits - platformFeeUsd / payoutNav);

    cumulativeCashUsd += monthlyCashUsd;
    rows.push({
      month,
      monthlyCashTwd: monthlyCashUsd * fx,
      cumulativeCashTwd: cumulativeCashUsd * fx,
      policyValueTwd: cashUnits * payoutNav * fx,
      navTwd: payoutNav * fx,
    });
  }

  return {
    rows,
    summary: {
      monthlyCashTwd: rows[0]?.monthlyCashTwd || (capitalTwd * annualCashRate) / 12,
      cashRatio,
      rawCashRatio,
    },
  };
}

function renderProducts() {
  $("product").innerHTML = Object.entries(products)
    .map(([key, product]) => `<option value="${key}" ${key === "cuican" ? "selected" : ""}>${product.name}｜${product.insurer}</option>`)
    .join("");
}

function activeFirstMonthCash(rows, fallback) {
  return rows.length ? rows[0].monthlyCashTwd : fallback;
}

function formatFundNav(fundKey, point) {
  return `${FUND_LABELS[fundKey]} ${point.nav.toFixed(4)} / ${fmtSignedPct(point.change)}`;
}

function formatNavVolatility(product, cashNavPoint, stockNavPoint, payoutFundKey, growthFundKey) {
  if (product.mode === "dual") {
    const payoutPoint = payoutFundKey === "stock" ? stockNavPoint : cashNavPoint;
    const growthPoint = growthFundKey === "stock" ? stockNavPoint : cashNavPoint;
    return `配現 ${formatFundNav(payoutFundKey, payoutPoint)} / 配股 ${formatFundNav(growthFundKey, growthPoint)}`;
  }
  return formatFundNav(payoutFundKey, payoutFundKey === "stock" ? stockNavPoint : cashNavPoint);
}

function formatUnitChange(product, unitChange, payoutFundKey, growthFundKey, hasPreviousUnits) {
  const prefix = hasPreviousUnits ? "" : "初始 ";
  const payoutText = `${prefix}${FUND_LABELS[payoutFundKey]} ${fmtUnits(unitChange.payout)}${hasPreviousUnits ? ` (${fmtSignedPct(unitChange.payoutPct, 1)})` : ""}`;
  if (product.mode !== "dual") return payoutText;
  const growthText = `${prefix}${FUND_LABELS[growthFundKey]} ${fmtUnits(unitChange.growth)}${hasPreviousUnits ? ` (${fmtSignedPct(unitChange.growthPct, 1)})` : ""}`;
  return `配現 ${payoutText} / 配股 ${growthText}`;
}

function renderFeatureBody(body) {
  if (Array.isArray(body)) {
    return `<ul>${body.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }
  return `<p>${body}</p>`;
}

function renderFeatures() {
  const product = products[$("product").value];
  const singleFundLabel = $("singleFund").value === "stock" ? "貝萊德配現，超額回購" : "聯博配現，超額回購";
  const dualFundLabel = `${FUND_LABELS[$("dualCashFund").value]}領現，${FUND_LABELS[$("dualStockFund").value]}配股數`;
  $("singleFundField").classList.toggle("is-hidden", product.mode !== "single");
  $("dualCashFundField").classList.toggle("is-hidden", product.mode !== "dual");
  $("dualStockFundField").classList.toggle("is-hidden", product.mode !== "dual");
  $("featureStrip").innerHTML = [
    ["平台型態", `${product.type}｜${product.mode === "dual" ? "雙標的" : "單標的"}`],
    ["投保年齡", product.ageRange],
    ["配息邏輯", product.mode === "dual" ? dualFundLabel : singleFundLabel],
    ["保單平台特色", product.platformFeature],
  ]
    .map(([title, body], index) => `<article class="feature ${index === 3 ? "feature-wide" : ""}"><strong>${title}</strong>${renderFeatureBody(body)}</article>`)
    .join("");
}

function renderResults() {
  const allResults = {
    flat: simulate("flat"),
    up20: simulate("up20"),
    down20: simulate("down20"),
    normal: simulate("normal"),
  };
  state.results = allResults;
  const active = allResults[state.scenario];

  $("monthlyCash").textContent = fmtMoney(active.summary.monthlyCashTwd);
  $("deathBenefit").textContent = fmtMoney(active.summary.deathBenefitTwd);
  $("cashRatio").textContent = `${fmtPct(active.summary.cashRatio)}${active.summary.rawCashRatio > 1 ? " 上限" : ""}`;
  $("firstFeeUnits").textContent = fmtMoney(active.summary.firstFeeTwd);
  renderValueChart(active.rows);
  $("scenarioHint").textContent =
    state.scenario === "normal"
      ? `劇烈情境：年化波動率${fmtPct(SCENARIO_PROFILES.normal.annualVol, 1)}，每次點選會重新抽樣。`
      : `${SCENARIO_PROFILES[state.scenario].label}情境：年化波動率${fmtPct(SCENARIO_PROFILES[state.scenario].annualVol, 1)}，每次點選會重新抽樣。`;

  $("resultRows").innerHTML = active.rows
    .map(
      (row) => `
        <tr>
          <td data-label="期間">${row.label}</td>
          <td data-label="配現金">${fmtMoney(row.monthlyCashTwd)}</td>
          <td data-label="累積領現">${fmtMoney(row.cumulativeCashTwd)}</td>
          <td data-label="保單價值">${fmtMoney(row.policyValueTwd)}</td>
          <td data-label="淨值波動">${row.navVolatility}</td>
          <td data-label="淨標的單位新增">${row.unitChange}</td>
          <td data-label="保本率">${fmtPct(row.breakEvenRate)}</td>
        </tr>
      `,
    )
    .join("");
  renderLoanArbitrageV2();
}

function renderValueChart(rows) {
  const svg = $("valueChart");
  if (!rows.length) {
    svg.innerHTML = "";
    $("valueChartEnd").textContent = "-";
    $("valueChartStats").textContent = "";
    $("valueChartMilestones").textContent = "";
    return;
  }
  const width = 320;
  const height = 150;
  const pad = { left: 14, right: 12, top: 12, bottom: 24 };
  const values = rows.map((row) => row.policyValueTwd);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const range = Math.max(1, maxValue - minValue);
  const maxMonth = Math.max(...rows.map((row) => row.month));
  const points = rows
    .map((row) => {
      const x = pad.left + (row.month / maxMonth) * (width - pad.left - pad.right);
      const y = pad.top + (1 - (row.policyValueTwd - minValue) / range) * (height - pad.top - pad.bottom);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  const last = rows[rows.length - 1];
  const first = rows[0];
  const yBase = pad.top + (1 - (first.policyValueTwd - minValue) / range) * (height - pad.top - pad.bottom);
  svg.innerHTML = `
    <line x1="${pad.left}" y1="${yBase.toFixed(1)}" x2="${width - pad.right}" y2="${yBase.toFixed(1)}" class="chart-base"></line>
    <polyline points="${points}" class="chart-line"></polyline>
    <circle cx="${(pad.left + (last.month / maxMonth) * (width - pad.left - pad.right)).toFixed(1)}" cy="${(pad.top + (1 - (last.policyValueTwd - minValue) / range) * (height - pad.top - pad.bottom)).toFixed(1)}" r="3.5" class="chart-dot"></circle>
    <text x="${pad.left}" y="${height - 6}" class="chart-label">第1月</text>
    <text x="${width - pad.right}" y="${height - 6}" text-anchor="end" class="chart-label">第60年</text>
  `;
  $("valueChartEnd").textContent = fmtMoney(last.policyValueTwd);
  $("valueChartCaption").textContent = `${scenarios[state.scenario]}｜保單價值長期走勢`;
  $("valueChartStats").innerHTML = `
    <span>最低 ${fmtMoney(minValue)}</span>
    <span>最高 ${fmtMoney(maxValue)}</span>
    <span>末期保本率 ${fmtPct(last.breakEvenRate)}</span>
  `;
  const milestones = [
    [12, "1年"],
    [60, "5年"],
    [120, "10年"],
    [240, "20年"],
    [360, "30年"],
    [720, "60年"],
  ];
  $("valueChartMilestones").innerHTML = milestones
    .map(([month, label]) => {
      const row = rows.find((item) => item.month === month);
      return row ? `<span><small>${label}</small>${fmtMoney(row.policyValueTwd)}<em>累積領現 ${fmtMoney(row.cumulativeCashTwd)}</em></span>` : "";
    })
    .join("");
}

function applyMarket(market) {
  state.market = market;
  $("fx").value = market.usdTwd.rate.toFixed(3);
  $("cashNav").value = market.funds.cash.nav.toFixed(4);
  $("cashDiv").value = market.funds.cash.dividend.toFixed(4);
  $("stockNav").value = market.funds.stock.nav.toFixed(4);
  $("stockDiv").value = market.funds.stock.dividend.toFixed(4);
  $("fxSnapshot").textContent = market.usdTwd.rate.toFixed(3);
  $("cashNavSnapshot").textContent = market.funds.cash.nav.toFixed(4);
  $("cashDivSnapshot").textContent = market.funds.cash.dividend.toFixed(4);
  $("stockNavSnapshot").textContent = market.funds.stock.nav.toFixed(4);
  $("stockDivSnapshot").textContent = market.funds.stock.dividend.toFixed(4);
  const cashStatus = market.funds.cash.sourceStatus.join("、");
  const stockStatus = market.funds.stock.sourceStatus.join("、");
  $("dataStatus").textContent = `${market.usdTwd.sourceStatus}｜聯博${market.funds.cash.navDate}/${market.funds.cash.dividendDate}｜貝萊德${market.funds.stock.navDate}/${market.funds.stock.dividendDate}`;
  $("dataStatus").title = `${cashStatus}\n${stockStatus}`;
}

async function fetchMarketData() {
  const endpoints =
    location.protocol === "file:"
      ? ["http://127.0.0.1:4174/api/market-data"]
      : ["/api/market-data", "http://127.0.0.1:4174/api/market-data"];
  let lastError;
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.json();
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

async function refreshMarket() {
  $("dataStatus").textContent = "正在更新資料";
  try {
    applyMarket(await fetchMarketData());
  } catch (error) {
    applyMarket({
      usdTwd: { rate: 31.55, sourceStatus: `使用備援資料：${error.message}` },
      funds: {
        cash: { nav: 75.4, dividend: 0.1806, navDate: "fallback", dividendDate: "fallback", sourceStatus: [] },
        stock: { nav: 21.17, dividend: 0.111, navDate: "fallback", dividendDate: "fallback", sourceStatus: [] },
      },
    });
  }
  renderResults();
}

function loanNumberV2(id) {
  return Number($(id)?.value || 0);
}

function loanRateV2(id) {
  return loanNumberV2(id) / 100;
}

function amortizedPaymentV2(principal, annualRate, years) {
  const months = Math.max(0, Math.round(years * 12));
  if (!principal || !months) return 0;
  const monthlyRate = annualRate / 12;
  if (!monthlyRate) return principal / months;
  return (principal * monthlyRate) / (1 - (1 + monthlyRate) ** -months);
}

function remainingBalanceV2(principal, annualRate, years, paidMonths) {
  const months = Math.max(0, Math.round(years * 12));
  const month = Math.min(Math.max(0, paidMonths), months);
  if (!principal || !months) return 0;
  const payment = amortizedPaymentV2(principal, annualRate, years);
  const monthlyRate = annualRate / 12;
  if (!monthlyRate) return Math.max(0, principal - payment * month);
  return Math.max(0, principal * (1 + monthlyRate) ** month - payment * (((1 + monthlyRate) ** month - 1) / monthlyRate));
}

function fmtLoanRoiV2(cashOut, cumulativeOutflow) {
  if (cumulativeOutflow <= 0) return "配息已覆蓋";
  return fmtPct(cashOut / cumulativeOutflow, 1);
}

function renderLoanArbitrageV2() {
  if (!$("loanArbitrage")) return;

  const s1MortgageAmount = loanNumberV2("s1MortgageAmount");
  const s1MortgageRate = loanRateV2("s1MortgageRate");
  const s1MortgageYears = loanNumberV2("s1MortgageYears");
  const s1FlexAmount = loanNumberV2("s1FlexAmount");
  const s1FlexRate = loanRateV2("s1FlexRate");
  const s1PolicyYield = loanRateV2("s1PolicyYield");
  const s1MortgagePayment = amortizedPaymentV2(s1MortgageAmount, s1MortgageRate, s1MortgageYears);
  const s1FlexInterest = (s1FlexAmount * s1FlexRate) / 12;
  const s1PolicyCash = (s1FlexAmount * s1PolicyYield) / 12;
  const s1NetOutflow = s1MortgagePayment + s1FlexInterest - s1PolicyCash;

  $("s1MortgagePayment").textContent = fmtMoney(s1MortgagePayment);
  $("s1FlexInterest").textContent = fmtMoney(s1FlexInterest);
  $("s1PolicyCash").textContent = fmtMoney(s1PolicyCash);
  $("s1NetOutflow").textContent = fmtMoney(s1NetOutflow);

  const s2LoanAmount = loanNumberV2("s2LoanAmount");
  const s2LoanRate = loanRateV2("s2LoanRate");
  const s2LoanYears = loanNumberV2("s2LoanYears");
  const s2PolicyYield = loanRateV2("s2PolicyYield");
  const s2NavChange48 = loanRateV2("s2NavChange48");
  const s2TermMonths = Math.max(0, Math.round(s2LoanYears * 12));
  const s2LoanPayment = amortizedPaymentV2(s2LoanAmount, s2LoanRate, s2LoanYears);
  const s2PolicyProjection = simulateCuicanAlliancePolicyForLoanV2(s2LoanAmount, s2PolicyYield, s2NavChange48, Math.max(48, s2TermMonths));
  const s2PolicyCash = s2PolicyProjection.summary.monthlyCashTwd;
  const s2NetOutflow = s2LoanPayment - s2PolicyCash;

  $("s2LoanPayment").textContent = fmtMoney(s2LoanPayment);
  $("s2PolicyCash").textContent = fmtMoney(s2PolicyCash);
  $("s2NetOutflow").textContent = fmtMoney(s2NetOutflow);

  if (s2TermMonths < 48) {
    $("s2Month48CashOut").textContent = "期數不足";
    $("s2Month48Roi").textContent = "-";
    $("s2Rows").innerHTML = `<tr><td data-label="期數" colspan="6">貸款年期需滿 48 期，才會開始列出解約償還試算。</td></tr>`;
    return;
  }

  const rows = [];
  let month48Result = null;
  let cumulativeOutflow = 0;
  for (let month = 48; month <= s2TermMonths; month += 1) {
    const balance = remainingBalanceV2(s2LoanAmount, s2LoanRate, s2LoanYears, month);
    const policyRow = policyProjectionRowV2(s2PolicyProjection, month);
    const policyValue = policyRow.policyValueTwd;
    cumulativeOutflow = s2PolicyProjection.rows
      .slice(0, month)
      .reduce((sum, row) => sum + s2LoanPayment - row.monthlyCashTwd, 0);
    const cashOut = policyValue - balance;
    const roi = cumulativeO
