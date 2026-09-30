// 場景 2：後端工程師的一天（About Me）
import { ellipse, rect, roundRect } from '../sketch.js';

const INK = '#2b2622';
const CREAM = '#fbf6ef';
// 大地色系
const SAND = '#e8d5bc';
const TERRACOTTA = '#c0704a';
const BRICK = '#b85c38';
const ROSE_GOLD = '#c08a6a'; // 偏銅色的玫瑰金
const OLIVE = '#8f9e6b';
const OAK = '#c89b6d';
const OCHRE = '#d9a441';
const SILVER = '#e2dfdb';
const ESPRESSO = '#2f2622';
const MONO = 'Menlo, Consolas, monospace';

// 和其他場景一樣的手繪粗線條
const fine = (s, pts, o = {}) => s.stroke(pts, { w: 4.5, jit: 2.2, ...o });

const today = new Date();
const WEEKDAY = ['日', '月', '火', '水', '木', '金', '土'][today.getDay()];

export default {
  // 牆上的拱形窗，窗外是家鄉的森林
  window: { w: 448, h: 576, ink: INK, draw(s) {
    const arch = [];
    for (let i = 0; i <= 24; i++) { const a = Math.PI + i / 24 * Math.PI; arch.push([224 + Math.cos(a) * 170, 230 + Math.sin(a) * 170]); }
    const glass = [[54, 520], ...arch, [394, 520]];
    const grad = s.g.createLinearGradient(0, 60, 0, 520);
    grad.addColorStop(0, '#f7e7cc'); grad.addColorStop(1, '#efe3d0');
    s.g.save(); s.g.beginPath(); glass.forEach(([x, y], i) => i ? s.g.lineTo(x, y) : s.g.moveTo(x, y)); s.g.closePath(); s.g.clip();
    s.g.fillStyle = grad; s.g.fillRect(0, 0, 448, 576);
    // 窗外的山和樹
    s.wash([[40, 520], [40, 400], [140, 330], [230, 390], [330, 320], [420, 380], [420, 520]], '#cfc9a8', .7);
    for (let i = 0; i < 7; i++) {
      const x = 70 + i * 50, h = 60 + s.r() * 40;
      s.wash([[x, 520 - h - 40], [x + 22, 520], [x - 22, 520]], '#a3a27a', .6);
    }
    s.g.restore();
    fine(s, glass, { closed: true, w: 5, color: '#fbf6ef' });
    fine(s, glass, { closed: true, w: 2 });
    fine(s, [[224, 60], [224, 520]], { w: 4, color: CREAM }); fine(s, [[224, 60], [224, 520]], { w: 1.5 });
    fine(s, [[54, 330], [394, 330]], { w: 4, color: CREAM }); fine(s, [[54, 330], [394, 330]], { w: 1.5 });
    // 窗台
    const sill = rect(30, 520, 388, 26);
    s.wash(sill, CREAM, .95); fine(s, sill, { closed: true });
    // 薄紗窗簾
    for (let k = 0; k < 4; k++) {
      const x = 40 + k * 18;
      fine(s, Array.from({ length: 12 }, (_, i) => [x + Math.sin(i * .9 + k) * 6, 50 + i * 42]), { w: 1.5, color: TERRACOTTA, passes: 1 });
    }
    s.wash([[30, 40], [120, 40], [110, 520], [30, 520]], SAND, .35);
  }},

  // 窗台上的鬱金香
  vase: { w: 192, h: 384, ink: INK, draw(s) {
    fine(s, [[96, 250], [92, 140], [100, 80]], { w: 3, color: '#6f7d4f' });
    fine(s, [[94, 200], [60, 150], [90, 170]], { w: 2.5, color: '#6f7d4f' });
    const tulip = [[80, 90], [74, 55], [86, 40], [96, 58], [106, 40], [118, 55], [112, 90]];
    s.wash(tulip, OCHRE, .85); fine(s, tulip, { closed: true, w: 2.5 });
    const vase = [[70, 370], [60, 320], [72, 270], [86, 240], [106, 240], [120, 270], [132, 320], [122, 370]];
    s.wash(vase, OLIVE, .8); fine(s, vase, { closed: true });
    fine(s, [[78, 300], [82, 340]], { w: 2, color: CREAM, passes: 1 });
  }},

  calendar: { w: 256, h: 352, ink: INK, draw(s) {
    fine(s, [[70, 70], [128, 18], [186, 70]], { w: 2 });
    s.dot(128, 18, 6, OCHRE);
    const board = roundRect(30, 60, 196, 270, 10);
    s.wash(board, CREAM, .97); fine(s, board, { closed: true });
    s.wash(rect(30, 60, 196, 52), BRICK, .75);
    s.text(`${today.getMonth() + 1}月`, 128, 88, { size: 30, font: 'LXGW WenKai TC', color: CREAM });
    s.text(String(today.getDate()), 128, 200, { size: 130, color: today.getDay() === 0 ? BRICK : INK });
    s.text(`${WEEKDAY}曜日`, 128, 295, { size: 26, font: 'LXGW WenKai TC' });
  }},

  desk: { w: 1024, h: 512, ink: INK, draw(s) {
    const top = rect(16, 40, 992, 30);
    s.wash(top, OAK, .9); fine(s, top, { closed: true, w: 3.5 });
    for (let i = 0; i < 5; i++) fine(s, [[60 + i * 190, 52 + s.j(3)], [180 + i * 190, 56 + s.j(3)]], { w: 1.2, color: '#b8946e', passes: 1 });
    // 細長的斜腳
    [[110, 60, 1], [914, 964, -1]].forEach(([x1, x2, dir]) => {
      const leg = [[x1, 70], [x1 + 22 * dir, 70], [x2 + 8 * dir, 500], [x2, 500]];
      s.wash(leg, '#c7a47f', .9); fine(s, leg, { closed: true, w: 2.5 });
      s.wash(rect(Math.min(x2, x2 + 8 * dir) - 2, 482, 14, 18), OCHRE, .9);
    });
  }},

  // 外接螢幕：後端的終端機
  monitor: { w: 640, h: 520, ink: INK, draw(s) {
    const frame = roundRect(20, 20, 600, 360, 12);
    s.wash(frame, SILVER, .95); fine(s, frame, { closed: true, w: 3.5 });
    const screen = rect(34, 34, 572, 332);
    s.wash(screen, ESPRESSO, .97);
    ['#c0704a', '#d9a441', '#8f9e6b'].forEach((c, i) => s.dot(54 + i * 18, 52, 5, c));
    const lines = [
      ['$ pytest -q', '#e9e3da'],
      ['.......................  [100%]', '#b5bf85'],
      ['128 passed in 0.84s ✓', '#b5bf85'],
      ['$ uvicorn app.main:app', '#e9e3da'],
      ['INFO  Application startup complete.', '#e0b07a'],
      ['INFO  GET /health  200 OK', '#b5bf85'],
      ['$ ▍', '#e9e3da'],
    ];
    lines.forEach(([t, c], i) => s.text(t, 56, 88 + i * 38, { size: 19, font: MONO, weight: 400, color: c, align: 'left', rot: 0 }));
    // 右側的延遲曲線
    const panel = rect(440, 76, 144, 110);
    fine(s, panel, { closed: true, w: 1.5, color: '#5c4a40', passes: 1 });
    s.text('latency', 452, 94, { size: 14, font: MONO, weight: 400, color: '#a08c7c', align: 'left', rot: 0 });
    fine(s, Array.from({ length: 12 }, (_, i) => [452 + i * 11, 160 - Math.abs(Math.sin(i * .9)) * 30 - (i === 8 ? 18 : 0)]), { w: 2.5, color: OCHRE, passes: 1 });
    // 細支架
    const neck = [[300, 380], [340, 380], [346, 492], [294, 492]];
    s.wash(neck, SILVER, .95); fine(s, neck, { closed: true, w: 2.5 });
    const base = ellipse(320, 500, 110, 10, 30);
    s.wash(base, SILVER, .95); fine(s, base, { closed: true, w: 2.5 });
  }},

  // 筆電：資料庫關聯圖
  mac: { w: 512, h: 360, ink: INK, draw(s) {
    const lid = roundRect(76, 16, 360, 250, 12);
    s.wash(lid, SILVER, .95); fine(s, lid, { closed: true, w: 3 });
    const screen = rect(88, 28, 336, 226);
    s.wash(screen, '#fdfaf6', .98);
    const table = (x, y, name, rows, color) => {
      const box = rect(x, y, 92, 30 + rows * 18);
      s.wash(box, '#ffffff', .9); s.wash(rect(x, y, 92, 24), color, .8);
      fine(s, box, { closed: true, w: 1.8, passes: 1 });
      s.text(name, x + 46, y + 12, { size: 13, font: MONO, weight: 700, color: INK, rot: 0 });
      for (let i = 0; i < rows; i++) fine(s, [[x + 10, y + 38 + i * 18], [x + 40 + s.fixed() * 40, y + 38 + i * 18]], { w: 2, color: '#b9b0a8', passes: 1 });
    };
    table(104, 50, 'users', 4, SAND);
    table(316, 44, 'orders', 5, '#dfdcc4');
    table(212, 160, 'items', 3, '#f0e2c4');
    fine(s, [[196, 80], [316, 74]], { w: 1.8, color: TERRACOTTA, passes: 1 });
    fine(s, [[362, 160], [304, 180]], { w: 1.8, color: TERRACOTTA, passes: 1 });
    const base = [[36, 268], [476, 268], [490, 290], [22, 290]];
    s.wash(base, SILVER, .95); fine(s, base, { closed: true });
    fine(s, [[226, 276], [286, 276]], { w: 2 });
  }},

  // iPad：用 Apple Pencil 畫的系統架構草圖
  ipad: { w: 384, h: 448, ink: INK, draw(s) {
    const body = roundRect(52, 24, 280, 360, 20);
    s.wash(body, SILVER, .95); fine(s, body, { closed: true, w: 3 });
    s.wash(rect(66, 38, 252, 332), '#fffdf9', .98);
    const node = (x, y, label, c) => {
      const b = roundRect(x - 48, y - 20, 96, 40, 10);
      s.wash(b, c, .7); fine(s, b, { closed: true, w: 2 });
      s.text(label, x, y, { size: 26 });
    };
    node(192, 80, 'Client', SAND);
    node(192, 170, 'API', '#dfdcc4');
    node(120, 290, 'Queue', '#f0e2c4');
    fine(s, [[192, 100], [192, 150]], { w: 2 }); fine(s, [[184, 140], [192, 150], [200, 140]], { w: 2 });
    fine(s, [[170, 190], [130, 270]], { w: 2 });
    // 資料庫圓柱
    const db = [[226, 262], [226, 318], [306, 318], [306, 262]];
    s.wash(db, '#eadfce', .8); fine(s, ellipse(266, 262, 40, 10, 24), { closed: true, w: 2 });
    fine(s, [[226, 262], [226, 318]], { w: 2 }); fine(s, [[306, 262], [306, 318]], { w: 2 });
    fine(s, Array.from({ length: 13 }, (_, i) => { const a = i / 12 * Math.PI; return [266 - Math.cos(a) * 40, 318 + Math.sin(a) * 10]; }), { w: 2 });
    s.text('DB', 266, 292, { size: 24 });
    fine(s, [[214, 190], [256, 248]], { w: 2 });
    s.text('♡', 290, 110, { size: 28, color: TERRACOTTA });
    // 支架與 Pencil
    fine(s, [[120, 384], [104, 436]], { w: 4 }); fine(s, [[264, 384], [280, 436]], { w: 4 });
    fine(s, [[340, 150], [350, 400]], { w: 8, color: '#faf8f5', passes: 1 }); fine(s, [[340, 150], [350, 400]], { w: 1.5 });
  }},

  latte: { w: 256, h: 256, ink: INK, draw(s) {
    const saucer = ellipse(128, 222, 104, 20, 40);
    s.wash(saucer, SAND, .9); fine(s, saucer, { closed: true, w: 2.5 });
    const cup = [[58, 110], [66, 170], [90, 205], [166, 205], [190, 170], [198, 110]];
    s.wash(cup, CREAM, .97); fine(s, cup, { w: 2.8 });
    s.wash([[62, 140], [194, 140], [192, 156], [64, 156]], TERRACOTTA, .45);
    fine(s, [[196, 128], [230, 126], [232, 160], [190, 170]], { w: 2.8 });
    const top = ellipse(128, 110, 70, 18, 40);
    s.wash(top, '#c9a27c', .95); fine(s, top, { closed: true, w: 2.8 });
    // 拉花愛心
    s.wash([[128, 122], [108, 108], [114, 100], [128, 106], [142, 100], [148, 108]], '#fbf3e8', .95);
  }},

  steam: { w: 128, h: 256, ink: INK, draw(s) {
    fine(s, Array.from({ length: 14 }, (_, i) => [64 + Math.sin(i * .7 + s.r()) * 16, 240 - i * 16]), { w: 4, color: '#c7bab0', passes: 1 });
  }},

  perfume: { w: 256, h: 400, ink: INK, draw(s) {
    // 木頭圓柱瓶蓋
    const cap = roundRect(90, 20, 76, 92, 8);
    s.wash(cap, '#a07a58', .95); fine(s, cap, { closed: true, w: 2.5 });
    for (let i = 0; i < 4; i++) fine(s, [[100 + i * 18, 30], [104 + i * 18, 102]], { w: 1.2, color: '#7d5c40', passes: 1 });
    s.wash(rect(98, 112, 60, 22), OCHRE, .95); fine(s, rect(98, 112, 60, 22), { closed: true, w: 2 });
    // 厚玻璃瓶身
    const bottle = roundRect(46, 134, 164, 246, 14);
    s.wash(bottle, '#f4e6d4', .55);
    s.wash([[58, 190], [198, 186], [198, 368], [58, 370]], '#e2b77f', .5);
    fine(s, bottle, { closed: true, w: 3 });
    fine(s, roundRect(60, 148, 136, 218, 8), { closed: true, w: 1.2, color: '#c8a98a', passes: 1 });
    s.text('WOOD', 128, 258, { size: 40 });
    s.text('no.8', 128, 294, { size: 26, weight: 500 });
    fine(s, [[66, 160], [66, 220]], { w: 3, color: '#ffffff', passes: 1 });
  }},

  // 疊起來的技術書，上面放著玫瑰金眼鏡
  books: { w: 448, h: 320, ink: INK, draw(s) {
    const b1 = rect(36, 226, 370, 62);
    s.wash(b1, OLIVE, .85); fine(s, b1, { closed: true });
    s.wash(rect(380, 232, 20, 50), CREAM, .95);
    s.text('Data-Intensive Apps', 200, 257, { size: 34, color: CREAM });
    const b2 = rect(64, 176, 320, 50);
    s.wash(b2, SAND, .9); fine(s, b2, { closed: true });
    s.text('Site Reliability', 214, 201, { size: 32 });
    // 眼鏡
    fine(s, ellipse(168, 130, 42, 40, 40), { closed: true, w: 2.8, color: ROSE_GOLD, jit: .8 });
    fine(s, ellipse(272, 130, 42, 40, 40), { closed: true, w: 2.8, color: ROSE_GOLD, jit: .8 });
    fine(s, [[210, 124], [220, 114], [230, 124]], { w: 2.4, color: ROSE_GOLD, jit: .5 });
    fine(s, [[126, 126], [104, 150], [150, 176]], { w: 2.2, color: ROSE_GOLD, jit: .5 });
    fine(s, [[314, 126], [336, 150], [290, 176]], { w: 2.2, color: ROSE_GOLD, jit: .5 });
    fine(s, [[146, 108], [158, 100]], { w: 2.5, color: '#ffffff', passes: 1 });
    fine(s, [[250, 108], [262, 100]], { w: 2.5, color: '#ffffff', passes: 1 });
  }},
};
