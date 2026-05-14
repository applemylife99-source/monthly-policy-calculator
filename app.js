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
  flat: "淨值不變",
  up20: "淨值+20%",
  down20: "淨值-20%",
  normal: "常態預測",
};

const NORMAL_ANNUAL_DRIFT = 0.06;
const NORMAL_ANNUAL_VOL = 0.16;
const NORMAL_MONTHLY_VOL = NORMAL_ANNUAL_VOL / Math.sqrt(12);

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
  normalSeed: Date.now(),
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
  if (scenario === "normal") {
    const monthlyDrift = NORMAL_ANNUAL_DRIFT / 12;
    let factor = 1;
    let change = 0;
    for (let i = 1; i <= month; i += 1) {
      change = Math.exp(monthlyDrift - (NORMAL_MONTHLY_VOL * NORMAL_MONTHLY_VOL) / 2 + NORMAL_MONTHLY_VOL * seededNormal(seed + i)) - 1;
      factor *= 1 + change;
    }
    return { nav: baseNav * Math.max(0.25, factor), change };
  }
  if (scenario === "up20") return { nav: baseNav * 1.2, change: month === 1 ? 0.2 : 0 };
  if (scenario === "down20") return { nav: baseNav * 0.8, change: month === 1 ? -0.2 : 0 };
  return { nav: baseNav, change: 0 };
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
  const cashFundYield = input.cashNav ? (input.cashDiv * 12) / input.cashNav : 0;
  const rawCashRatio = cashFundYield ? input.targetYield / cashFundYield : 1;
  const cashRatio = Math.max(0, Math.min(1, rawCashRatio));
  const stockRatio = product.mode === "dual" ? 1 - cashRatio : 0;

  let cashUnits = product.mode === "dual" ? (capitalUsd * cashRatio) / input.cashNav : capitalUsd / input.cashNav;
  let stockUnits = product.mode === "dual" ? (capitalUsd * stockRatio) / input.stockNav : 0;
  let cumulativeCashUsd = 0;
  let firstFeeUnits = 0;
  let firstFeeUsd = 0;
  const rows = [];
  const keep = selectedMonths();
  const seedBase = Math.round(input.age * 13 + input.capitalTwd / 100000 + input.targetYield * 1000);
  const seed = scenarioName === "normal" ? seedBase + state.normalSeed : seedBase;
  let annualValueSumUsd = 0;
  let annualValueMonths = 0;

  for (let month = 1; month <= 720; month += 1) {
    const year = policyYear(month);
    const attainedAge = input.age + Math.floor((month - 1) / 12);
    const cashNavPoint = scenarioNavPoint(input.cashNav, month, scenarioName, seed);
    const stockNavPoint = scenarioNavPoint(input.stockNav, month, scenarioName, seed + 97);
    const cashNav = cashNavPoint.nav;
    const stockNav = stockNavPoint.nav;
    let cashDistribution = cashUnits * input.cashDiv;
    let stockDistribution = stockUnits * input.stockDiv;
    let monthlyCashUsd = 0;

    if (product.mode === "dual") {
      monthlyCashUsd = cashDistribution;
      if (stockNav > 0) stockUnits += stockDistribution / stockNav;
    } else {
      monthlyCashUsd = cashDistribution * cashRatio;
      const reinvest = Math.max(0, cashDistribution - monthlyCashUsd);
      if (cashNav > 0) cashUnits += reinvest / cashNav;
    }

    const accountValueUsd = cashUnits * cashNav + stockUnits * stockNav;
    const monthlyRate = feeRateFor(product, year);
    const adminFeeUsd = input.capitalTwd >= product.policyFeeWaiverTwd ? 0 : product.policyFeeTwd / input.fx;
    const currentMinimumDeathBenefitTwd = input.capitalTwd * minDeathBenefitRatio(attainedAge, product);
    const netRiskTwd = Math.max(0, currentMinimumDeathBenefitTwd - accountValueUsd * input.fx);
    const insuranceCostUsd = monthlyInsuranceCost(netRiskTwd, attainedAge, input.gender, product.mortalityTable) / input.fx;
    const platformFeeUsd = accountValueUsd * monthlyRate + adminFeeUsd + insuranceCostUsd;
    if (month === 1) firstFeeUsd = platformFeeUsd;

    if (product.mode === "dual" && stockUnits > 0) {
      const units = platformFeeUsd / stockNav;
      stockUnits = Math.max(0, stockUnits - units);
      if (month === 1) firstFeeUnits = units;
    } else {
      const units = platformFeeUsd / cashNav;
      cashUnits = Math.max(0, cashUnits - units);
      if (month === 1) firstFeeUnits = units;
    }

    cumulativeCashUsd += monthlyCashUsd;
    let grossValueUsd = cashUnits * cashNav + stockUnits * stockNav;
    annualValueSumUsd += grossValueUsd;
    annualValueMonths += 1;
    let loyaltyBonusUsd = 0;
    if (product.loyaltyBonusRate && month % 12 === 0 && year >= product.loyaltyBonusStartYear) {
      loyaltyBonusUsd = (annualValueSumUsd / annualValueMonths) * product.loyaltyBonusRate;
      if (cashNav > 0) cashUnits += loyaltyBonusUsd / cashNav;
      grossValueUsd = cashUnits * cashNav + stockUnits * stockNav;
    }
    if (month % 12 === 0) {
      annualValueSumUsd = 0;
      annualValueMonths = 0;
    }
    if (keep.has(month)) {
      rows.push({
        month,
        label: month <= 120 ? `第${month}月` : `第${month / 12}年`,
        navVolatility: scenarioName === "normal" ? formatNavVolatility(product, cashNavPoint.change, stockNavPoint.change) : "-",
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
      cashFundYield,
      rawCashRatio,
    },
  };
}

function renderProducts() {
  $("product").innerHTML = Object.entries(products)
    .map(([key, product]) => `<option value="${key}">${product.name}｜${product.insurer}</option>`)
    .join("");
}

function activeFirstMonthCash(rows, fallback) {
  return rows.length ? rows[0].monthlyCashTwd : fallback;
}

function formatNavVolatility(product, cashChange, stockChange) {
  if (product.mode === "dual") return `聯博 ${fmtSignedPct(cashChange)} / 貝萊德 ${fmtSignedPct(stockChange)}`;
  return fmtSignedPct(cashChange);
}

function renderFeatureBody(body) {
  if (Array.isArray(body)) {
    return `<ul>${body.map((item) => `<li>${item}</li>`).join("")}</ul>`;
  }
  return `<p>${body}</p>`;
}

function renderFeatures() {
  const product = products[$("product").value];
  $("featureStrip").innerHTML = [
    ["平台型態", `${product.type}｜${product.mode === "dual" ? "雙標的" : "單標的"}`],
    ["投保年齡", product.ageRange],
    ["配息邏輯", product.mode === "dual" ? "聯博領現，貝萊德配股數" : "聯博領現，超額回購"],
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
  $("scenarioHint").textContent =
    state.scenario === "normal"
      ? `常態預測假設年化波動率${fmtPct(NORMAL_ANNUAL_VOL, 1)}，換算每月淨值波動率約${fmtPct(NORMAL_MONTHLY_VOL, 2)}。`
      : scenarios[state.scenario] === "淨值+20%" || scenarios[state.scenario] === "淨值-20%"
        ? "此情境假設進場後淨值立即調整至該水準，之後維持不變。"
        : "此情境假設標的淨值維持目前水準不變。";

  $("resultRows").innerHTML = active.rows
    .map(
      (row) => `
        <tr>
          <td>${row.label}</td>
          <td>${fmtMoney(row.monthlyCashTwd)}</td>
          <td>${fmtMoney(row.cumulativeCashTwd)}</td>
          <td>${fmtMoney(row.policyValueTwd)}</td>
          <td>${row.navVolatility}</td>
          <td>${fmtPct(row.breakEvenRate)}</td>
        </tr>
      `,
    )
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

function bindEvents() {
  ["product", "age", "gender", "capital", "targetYield", "fx", "cashNav", "cashDiv", "stockNav", "stockDiv"].forEach((id) => {
    $(id).addEventListener("input", () => {
      renderFeatures();
      renderResults();
    });
  });
  $("refreshData").addEventListener("click", refreshMarket);
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.scenario = button.dataset.scenario;
      if (state.scenario === "normal") {
        state.normalSeed = Date.now() + Math.floor(Math.random() * 1000000);
      }
      document.querySelectorAll(".tab").forEach((item) => item.classList.toggle("is-active", item === button));
      renderResults();
    });
  });
}

renderProducts();
renderFeatures();
bindEvents();
refreshMarket();
