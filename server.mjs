import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT || 4173);
const ROOT = new URL(".", import.meta.url).pathname;
const SNAPSHOT = JSON.parse(await readFile(new URL("./market-snapshot.json", import.meta.url), "utf8"));
let lastMarket = SNAPSHOT;
let cacheUntil = 0;
let pendingMarket = null;

const FUNDS = {
  cash: {
    name: "聯博-美國成長基金AP(總報酬月配)級別美元",
    cnyesCode: "B030870",
    moneyDjCode: "albt8",
    cnyesUrl:
      "https://fund.cnyes.com/detail/%E8%81%AF%E5%8D%9A-%E7%BE%8E%E5%9C%8B%E6%88%90%E9%95%B7%E5%9F%BA%E9%87%91AP%28%E7%B8%BD%E5%A0%B1%E9%85%AC%E6%9C%88%E9%85%8D%29%E7%B4%9A%E5%88%A5%E7%BE%8E%E5%85%83/B030870/overview",
    fallbackNav: 75.4,
    fallbackDividend: 0.1806,
  },
  stock: {
    name: "貝萊德世界科技基金A10美元(總報酬穩定配息)",
    cnyesCode: "B090460",
    moneyDjCode: "SHZV9",
    cnyesUrl:
      "https://fund.cnyes.com/detail/%E8%B2%9D%E8%90%8A%E5%BE%B7%E4%B8%96%E7%95%8C%E7%A7%91%E6%8A%80%E5%9F%BA%E9%87%91%2BA10%E7%BE%8E%E5%85%83%28%E7%B8%BD%E5%A0%B1%E9%85%AC%E7%A9%A9%E5%AE%9A%E9%85%8D%E6%81%AF%29/B090460/overview",
    fallbackNav: 21.17,
    fallbackDividend: 0.111,
  },
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
};

async function fetchText(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
      },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
}

function decodeEntities(text) {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'");
}

function parseCnyesNav(html) {
  const compact = html.replace(/\s+/g, " ");
  const match = compact.match(/單位淨值.*?<span[^>]*>([^<]+)<\/span>.*?<div class="[^"]*"[^>]*>([0-9.]+)<\/div>/);
  if (!match) return null;
  return {
    navDate: match[1].trim(),
    nav: Number(match[2]),
  };
}

function parseMoneyDjDividend(html) {
  const rows = [...html.matchAll(/<tr>\s*<td>(\d{4}\/\d{2}\/\d{2})<\/td>\s*<td[^>]*>\s*([^<]+)\s*<\/td>\s*<td[^>]*>\s*([0-9.]+)\s*<\/td>/g)];
  if (!rows.length) return null;
  const [date, currency, dividend] = rows[0].slice(1);
  return {
    dividendDate: date,
    dividendCurrency: decodeEntities(currency).trim(),
    dividend: Number(dividend),
  };
}

async function getFundData(fund, key) {
  const previous = lastMarket.funds[key];
  const result = { ...previous, name: fund.name, cnyesCode: fund.cnyesCode, moneyDjCode: fund.moneyDjCode, sourceStatus: [] };
  const [navResult, dividendResult] = await Promise.allSettled([
    fetchText(fund.cnyesUrl).then(html => { const parsed = parseCnyesNav(html); if (!(parsed?.nav > 0)) throw new Error("淨值格式無法辨識"); return parsed; }),
    fetchText(`https://m.moneydj.com/B5.aspx?a=${fund.moneyDjCode}`).then(html => { const parsed = parseMoneyDjDividend(html); if (!(parsed?.dividend > 0)) throw new Error("配息格式無法辨識"); return parsed; }),
  ]);
  if (navResult.status === "fulfilled") { Object.assign(result, navResult.value); result.sourceStatus.push("鉅亨淨值已更新"); }
  else result.sourceStatus.push("鉅亨淨值使用最近成功資料備援");
  if (dividendResult.status === "fulfilled") { Object.assign(result, dividendResult.value); result.sourceStatus.push("MoneyDJ配息已更新"); }
  else result.sourceStatus.push("MoneyDJ配息使用最近成功資料備援");
  result.annualDistributionRate = result.dividend * 12 / result.nav;
  return result;
}

async function getUsdTwd() {
  try {
    const json = JSON.parse(await fetchText("https://open.er-api.com/v6/latest/USD"));
    if (!(json?.rates?.TWD > 0)) throw new Error("TWD rate missing");
    return { rate: Number(json.rates.TWD), date: json.time_last_update_utc, sourceStatus: "匯率已更新" };
  } catch {
    return { ...lastMarket.usdTwd, sourceStatus: "匯率使用最近成功資料備援" };
  }
}

async function marketData() {
  if (Date.now() < cacheUntil) return lastMarket;
  if (pendingMarket) return pendingMarket;
  pendingMarket = (async () => {
    const [cash, stock, usdTwd] = await Promise.all([getFundData(FUNDS.cash, "cash"), getFundData(FUNDS.stock, "stock"), getUsdTwd()]);
    const stale = [usdTwd.sourceStatus, ...cash.sourceStatus, ...stock.sourceStatus].some(s => s.includes("備援"));
    lastMarket = { updatedAt: new Date().toISOString(), funds: { cash, stock }, usdTwd, stale };
    cacheUntil = Date.now() + (stale ? 60000 : 300000);
    return lastMarket;
  })().finally(() => { pendingMarket = null; });
  return pendingMarket;
}

function sendJson(response, value) {
  response.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
  response.end(JSON.stringify(value, null, 2));
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  if (!["/index.html", "/app.js", "/styles.css", "/assets/pdf-engine.js", "/assets/Noto-LICENSE.txt"].includes(requested)) { response.writeHead(404); response.end("Not found"); return; }
  const filePath = normalize(join(ROOT, requested));
  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  try {
    const file = await readFile(filePath);
    response.writeHead(200, { "content-type": MIME[extname(filePath)] || "application/octet-stream", "cache-control": "no-store", "x-content-type-options": "nosniff" });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    const path = new URL(request.url, "http://localhost").pathname;
    if (path === "/favicon.ico") { response.writeHead(204); response.end(); return; }
    if (path === "/health") { sendJson(response, { status: "ok", version: "2.1.9" }); return; }
    if (path === "/api/market-data") {
      sendJson(response, await marketData());
      return;
    }
    await serveStatic(request, response);
  } catch (error) {
    response.writeHead(500, { "content-type": "application/json; charset=utf-8" });
    response.end(JSON.stringify({ error: error.message }));
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Monthly insurance calculator running at http://127.0.0.1:${PORT}`);
});
