# AI供應鏈深度地圖 × 黃仁勳五層蛋糕理論

互動式供應鏈地圖，從美股AI龍頭到台股受惠廠商，含原物料深度挖掘。

## 本地開發

```bash
npm install
npm run dev
```

瀏覽器開啟 http://localhost:5173

## 部署到 GitHub Pages

### 第一步：修改 repo 名稱

編輯 `vite.config.js`，把 `base` 改成你的 repo 名稱：

```js
base: '/你的repo名稱/',
```

### 第二步：建立 GitHub repo 並推上去

```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/你的帳號/你的repo名稱.git
git push -u origin main
```

### 第三步：開啟 GitHub Pages

1. 進到 GitHub repo → **Settings** → **Pages**
2. Source 選 **GitHub Actions**
3. 儲存後，每次 push 到 `main` 就會自動部署

部署完成後網址：`https://你的帳號.github.io/你的repo名稱/`

## 資料來源

國泰投信・玉山投顧・理財周刊・財報狗・數位時代・iThome・TechNews（2025–2026）

> ⚠️ 本專案僅供教育研究參考，不構成任何投資建議。
