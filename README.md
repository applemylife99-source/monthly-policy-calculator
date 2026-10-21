# 月配息保單計算機 2.2.0

可在手機或電腦操作，包含月配息保單、房貸減壓、貸款套利，以及120期PDF報告。

## 公開網址

既有部署：https://monthly-policy-calculator.onrender.com/

程式碼由 GitHub 保存；網站由 Render 免費 Web Service 執行。團隊可直接開啟網址，不需要 ChatGPT 帳號。

## 更新既有 Render 服務

1. 登入 https://dashboard.render.com/ ，開啟 `monthly-policy-calculator`。
2. 在 Settings 確認連結此 GitHub repository 的 `main` 分支。
3. Start Command 為 `npm start`；使用 Free instance，無額外套件依賴。
4. 開啟 Auto Deploy 後，每次 main 分支更新會自動部署；若關閉，選 Manual Deploy → Deploy latest commit。
5. 部署後開啟網址，確認右上角版本為 `2.2.0 試用版`。

免費 Web Service 閒置後可能休眠，再次開啟會先等待喚醒。費用與用量限制以 Render 當期方案為準。

## 手機

- iPhone：用 Safari 開啟 → 分享 → 加入主畫面。
- Android：用 Chrome 開啟 → 選單 → 加入主畫面。

## 本機

需要 Node.js 20或更新版本。執行 `npm start` 後開啟 http://localhost:4173 。可用 PORT 環境變數指定埠號。

## 市場資料

後端直接抓取鉅亨淨值、MoneyDJ配息與美元匯率；不會呼叫本服務自己的資料接口。抓取逾時或格式變更時使用最近成功值並保留原資料日期，頁面清楚標示備援。

市場成功資料快取5分鐘；部分來源失敗後1分鐘重試。服務重啟時先以 `market-snapshot.json` 載入最近取得的公開市場資料。

## 目前試算限制

保單費用、解約費計算基礎、壽險給付及部分生命表年齡區段仍待正式契約核對，沿用已驗收試用版標示。報告不是保證獲利或保證回本；貸款條件、續約與資金用途須依實際契約。PDF不列商品及保險公司名稱，仍保留假設與非保證說明。

## 回復舊版本

GitHub保留全部版本。Render 的 Manual Deploy 可選先前commit；也可在 GitHub 反轉本次升級的pull request，讓 main 回到原版本。不要刪除repository或服務。

## 2.2.0 月配息保單專用設定

- 前期全回購：預設0期，可設定0–120期；前N期領現為0，配息回購原標的，第N+1期恢復選定領現方式，期間照常扣費。
- 自由比例：保留原年率／固定月領為預設。切換自由比例後，雙標的商品設定初始領現／回購標的配置；單標的商品設定每期配息的領現／回購比例。
- 新設定僅作用於第一分頁；房貸減壓與貸款套利維持原本設定。分享連結保存新增設定。
- 報表新增領現／回購規劃頁、分標的單位數、同期間未全回購比較；120期全回購時，明示第121期領現為報告期間外預測。

修改 `src/` 後執行 `npm run build`，再執行 `npm test`。PDF引擎沿用已核驗版本，以壓縮分檔保存並由伺服器驗證SHA256後還原。
