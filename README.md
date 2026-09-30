# Audrey Hung — 個人網站

手繪繪本風的 3D 滾動網站：森林 → 辦公桌（About）→ 台北 101 夜景（Work）→ 東京鐵塔櫻花（Contact）。

技術：[Vite](https://vite.dev) + [Three.js](https://threejs.org) + [GSAP ScrollTrigger](https://gsap.com) + [Lenis](https://lenis.darkroom.engineering)

## 開發

```bash
npm install
npm run dev      # 開發伺服器
npm run build    # 打包到 dist/
npm run preview  # 預覽打包結果
```

## 檔案結構

| 檔案 | 用途 |
|---|---|
| `index.html` | 所有文字內容（自我介紹、工作經歷、聯絡方式） |
| `src/layout.js` | **最常改的檔案**：物件位置、鏡頭路線、每段背景色 |
| `src/drawings/*.js` | 四個場景的手繪圖案（目前是程式畫的佔位圖） |
| `src/scene.js` | Three.js 場景、線條抖動、櫻花飄落 |
| `src/text.js` | 文字動畫 |
| `src/sketch.js` | 手繪筆刷工具 |
| `src/style.css` | 版面樣式 |
| `prototype/` | 最早的單檔 prototype，保留參考 |

## 換成自己的手繪圖

1. 畫好去背 PNG（建議畫 3 張略有不同的版本，就會有線條抖動效果），放到 `public/assets/`
2. 在 `src/drawings/` 對應的檔案裡，把該圖案的定義換成：

   ```js
   pine: { w: 320, h: 512, images: ['/assets/pine-1.png', '/assets/pine-2.png', '/assets/pine-3.png'] },
   ```

   `w`、`h` 填圖片的寬高（用來算比例），只給一張圖也可以。
3. 如果大小或位置不對，到 `src/layout.js` 調整。
