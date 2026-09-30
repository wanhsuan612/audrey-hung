// 場景配置：所有物件放在哪、鏡頭怎麼走、每段的背景色都在這裡調
import { rng } from './sketch.js';

/*
 * 物件：[圖案, x, y, z, 寬度, 選項]
 *   x 左右、y 上下、z 前後（鏡頭從 z=10 往負的方向前進）
 *   選項 { rot: 旋轉, float: false 不要漂浮, anim: 'pulse' 煙火縮放 }
 */
export const items = [
  // ── 1. 森林（z 8 ~ -6）──────────────────────────
  ['forest.mountains', 0, -0.6, -6, 18],
  ['forest.sun', 4.6, 3, -5, 3],
  ['forest.cloud', -3.8, 3, -3, 3.4],
  ['forest.cloud', 2, 3.6, -6, 3],
  ['forest.pine', -6.4, 0, -2, 3],
  ['forest.pine', -5.4, -0.8, 2, 2.6],
  ['forest.pine', -3.6, -1.2, 4.5, 2],
  ['forest.pine', 5.2, -0.6, 1, 2.8],
  ['forest.pine', 3.6, -1.4, -1, 2.4],
  ['forest.pine', 4.4, -1.2, 5, 1.8],
  ['forest.roundTree', -2.4, -1.4, 5.5, 2],
  ['forest.roundTree', 2.3, -1.3, 6.2, 1.8],
  ['forest.mushroom', -1.6, -1.1, 7, .6],
  ['forest.mushroom', 1.9, -1.2, 7.3, .5],
  ['forest.grass', 0.4, -1.3, 7.6, .8],
  ['forest.bird', -1.5, 3, 0, 1.1, { rot: .1 }],
  ['forest.bird', 1.2, 3.3, -3, .9, { rot: -.1 }],

  // ── 2. 辦公桌（z ≈ -21）─────────────────────────
  ['desk.desk', -1, -2.74, -21, 7, { float: false }],
  ['desk.monitor', -1.8, -0.3, -21.3, 3, { float: false }],
  ['desk.mac', -0.1, -1.01, -20.8, 2, { float: false }],
  ['desk.ipad', -3.8, -0.7, -20.9, 1.3, { float: false }],
  ['desk.perfume', 1.6, -0.94, -20.7, .7, { float: false }],
  ['desk.glasses', -2.1, -1.21, -20.6, 1.2, { float: false }],
  ['desk.calendar', -4, 1.4, -21.4, 1.2, { float: false }],

  // ── 3. 台北 101 夜景（z ≈ -41）──────────────────
  ['taipei.skyline', 0, -2.2, -42, 16, { float: false }],
  ['taipei.taipei101', 3.2, 0.3, -41, 1.6, { float: false }],
  ['taipei.moon', -3.5, 2.8, -44, 2.2],
  ['taipei.firework', 5.2, 2.8, -42, 2.2, { anim: 'pulse' }],
  ['taipei.firework', 1.2, 3.4, -43, 1.8, { anim: 'pulse' }],

  // ── 4. 東京鐵塔櫻花（z ≈ -61）──────────────────
  ['tokyo.fuji', -1, -1.2, -66, 9, { float: false }],
  ['tokyo.cloud', -3, 3, -63, 2.8],
  ['tokyo.cloud', 6.5, 3.2, -64, 2.4],
  ['tokyo.tokyoTower', 3, 0.2, -61, 2, { float: false }],
  ['tokyo.sakuraTree', 5.8, -1.5, -59, 3, { float: false }],
  ['tokyo.sakuraTree', -5, -1.6, -60, 3.2, { float: false }],
  ['tokyo.sakuraTree', 1, -2.4, -57.5, 2, { float: false }],
];

// 台北的星星
const r = rng(7);
for (let i = 0; i < 14; i++) {
  items.push(['taipei.star', (r() - .5) * 16, .5 + r() * 4, -40 - r() * 6, .3 + r() * .3, { rot: r() }]);
}

// 飄落的櫻花瓣（範圍）
export const petals = { count: 50, x: [-7, 7], y: [-3, 4], z: [-62, -54], size: [.12, .22] };

/*
 * 鏡頭關鍵影格：[滾動進度 0~1, x, y, z]
 * 兩個影格之間的 z 差距小 = 鏡頭在那一段「停留」（讓人閱讀文字）
 */
export const cameraKeys = [
  [0,    0,    0,   10],    // 森林
  [.13,  .3,   .2, -12],    // 到辦公桌
  [.4,   .3,   .2, -14.5],  // 停留在 About Me
  [.5,  -.5,   .3, -31],    // 飛到台北
  [.77, -.5,   .3, -33.5],  // 停留在 Work Experience
  [.88,  0,    .4, -51],    // 飛到東京
  [1,    0,    .4, -53.5],  // 停留在 Contact
];

// 每一段的背景色和文字色（依 section id）
export const themes = {
  home:    { paper: '#eaf0dc', ink: '#2b2622' },
  about:   { paper: '#f5e9d6', ink: '#2b2622' },
  work:    { paper: '#1c2340', ink: '#f3ecdf' },
  contact: { paper: '#fbe9ee', ink: '#2b2622' },
};
