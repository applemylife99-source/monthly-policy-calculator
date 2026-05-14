import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const PORT = Number(process.env.PORT || 4173);
const ROOT = process.cwd();

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

async function getFundData(fund) {
  const result = {
    name: fund.name,
    cnyesCode: fund.cnyesCode,
    moneyDjCode: fund.moneyDjCode,
    nav: fund.fallbackNav,
    dividend: fund.fallbackDividend,
    navDate: "fallback",
    dividendDate: "fallback",
    sourceStatus: [],
  };

  try {
    const navHtml = await fetchText(fund.cnyesUrl);
    const nav = parseCnyesNav(navHtml);
    if (nav?.nav) Object.assign(result, nav);
    result.sourceStatus.push("鉅亨淨值已更新");
  } catch (error) {
    result.sourceStatus.push(`鉅亨淨值使用備援：${error.message}`);
  }

  try {
    const divHtml = await fetchText(`https://m.moneydj.com/B5.aspx?a=${fund.moneyDjCode}`);
    const dividend = parseMoneyDjDividend(divHtml);
    if (dividend?.dividend) Object.assign(result, dividend);
    result.sourceStatus.push("MoneyDJ配息已更新");
  } catch (error) {
    result.sourceStatus.push(`MoneyDJ配息使用備援：${error.message}`);
  }

  result.annualDistributionRate = result.nav ? (result.dividend * 12) / result.nav : 0;
  return result;
}

async function getUsdTwd() {
  try {
    const json = await (await fetch("https://open.er-api.com/v6/latest/USD")).json();
    if (json?.rates?.TWD) {
      return {
        rate: Number(json.rates.TWD),
        date: json.time_last_update_utc || "latest",
        sourceStatus: "匯率已更新",
      };
    }
    throw new Error("TWD rate missing");
  } catch (error) {
    return {
      rate: 31.55,
      date: "fallback",
      sourceStatus: `匯率使用備援：${error.message}`,
    };
  }
}

async function marketData() {
  const [cash, stock, usdTwd] = await Promise.all([
    getFundData(FUNDS.cash),
    getFundData(FUNDS.stock),
    getUsdTwd(),
  ]);
  return {
    updatedAt: new Date().toISOString(),
    funds: { cash, stock },
    usdTwd,
  };
}

function sendJson(response, value) {
  response.writeHead(200, { "content-type": "application/json; charset=utf-8" });
  response.end(JSON.stringify(value, null, 2));
}

async function serveStatic(request, response) {
  const url = new URL(request.url, `http://${request.headers.host}`);
  const requested = url.pathname === "/" ? "/index.html" : decodeURIComponent(url.pathname);
  const filePath = normalize(join(ROOT, requested));
  if (!filePath.startsWith(ROOT)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }
  try {
    const file = await readFile(filePath);
    response.writeHead(200, { "content-type": MIME[extname(filePath)] || "application/octet-stream" });
    response.end(file);
  } catch {
    response.writeHead(404);
    response.end("Not found");
  }
}

const server = http.createServer(async (request, response) => {
  try {
    if (request.url.startsWith("/api/market-data")) {
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
