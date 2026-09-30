// 場景配置：所有物件放在哪、鏡頭怎麼走、每段的背景色都在這裡調
import { rng } from './sketch.js';

/*
 * 物件：[圖案, x, y, z, 寬度, 選項]
 *   x 左右、y 上下、z 前後（鏡頭從 z=10 往負的方向前進）
 *   選項 { rot: 旋轉, float: false 不要漂浮, anim: 'pulse' 煙火 | 'steam' 熱氣 | 'flutter' 蝴蝶 | 'glide' 燕子 }
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

  // ── 2. 後端工程師的一天（z ≈ -21）─────────────────
  ['desk.window', -3.3, 1.55, -21.8, 2, { float: false }],
  ['desk.vase', -2.75, 0.9, -21.7, .42, { float: false }],
  ['desk.calendar', 0.1, 1.75, -21.8, .75, { float: false }],
  ['desk.desk', -1.15, -2.96, -21, 7.6, { float: false }],
  ['desk.monitor', -1.9, -0.385, -21.2, 2.5, { float: false }],
  ['desk.ipad', -3.95, -0.72, -20.9, 1.2, { float: false }],
  ['desk.mac', -0.1, -0.9, -20.8, 1.8, { float: false }],
  ['desk.latte', -3.05, -1.15, -20.6, .55, { float: false }],
  ['desk.steam', -3.1, -0.85, -20.6, .22, { float: false, anim: 'steam' }],
  ['desk.steam', -2.97, -0.85, -20.6, .2, { float: false, anim: 'steam' }],
  ['desk.books', 1.35, -1.02, -20.7, 1.25, { float: false }],
  ['desk.perfume', 2.25, -1.01, -20.65, .5, { float: false }],

  // ── 3. 台北 101 夜景（z ≈ -41）──────────────────
  ['taipei.skyline', 0, -2.2, -42, 16, { float: false }],
  ['taipei.taipei101', 3.2, 0.3, -41, 1.6, { float: false }],
  ['taipei.moon', -3.5, 2.8, -44, 2.2],
  ['taipei.firework', 5.2, 2.8, -42, 2.2, { anim: 'pulse' }],
  ['taipei.firework', 1.2, 3.4, -43, 1.8, { anim: 'pulse' }],

  // ── 4. 春天的東京鐵塔（z ≈ -61）──────────────────
  ['tokyo.cloud', -3, 3, -63, 2.8],
  ['tokyo.cloud', 6.5, 3.2, -64, 2.4],
  ['tokyo.swallow', -4, 3.1, -62, .7, { float: false, anim: 'glide' }],
  ['tokyo.swallow', 1, 3.5, -63, .55, { float: false, anim: 'glide' }],
  ['tokyo.cityBack', 0, -0.9, -63, 18, { float: false }],
  ['tokyo.tokyoTower', 3, 0.2, -61, 2, { float: false }],
  ['tokyo.cityFront', 0, -2.3, -60.2, 16, { float: false }],
  ['tokyo.park', 0, -2.75, -58.9, 14, { float: false }],
  ['tokyo.sakuraTree', 5.8, -1.5, -59, 3, { float: false }],
  ['tokyo.sakuraTree', -5, -1.6, -59.6, 3.2, { float: false }],
  ['tokyo.sakuraTree', -2.6, -1.7, -58.6, 2.2, { float: false }],
  ['tokyo.butterfly', -1.2, -0.2, -57, .35, { float: false, anim: 'flutter' }],
  ['tokyo.butterfly', -3.6, 0.6, -58.5, .28, { float: false, anim: 'flutter' }],
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
  contact: { paper: '#e2eef2', ink: '#2b2622' },
};
