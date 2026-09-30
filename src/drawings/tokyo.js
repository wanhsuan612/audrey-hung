// 場景 4：春天的東京鐵塔（Contact Me）
import { ellipse, rect } from '../sketch.js';

// 白天的大樓群；gapFrom~gapTo 之間留空給鐵塔
function building({ w, h, minH, maxH, gapFrom = -1, gapTo = -1 }) {
  return { w, h, draw(s) {
    let x = 0;
    while (x < w) {
      const bw = 80 + s.fixed() * 110, bh = minH + s.fixed() * (maxH - minH);
      const color = ['#efe8da', '#dfe4e6', '#e9dcc6', '#d8ddd2', '#f3eee6'][Math.floor(s.fixed() * 5)];
      const lit = s.fixed();
      if (x + bw > gapFrom && x < gapTo) { x += bw + 8; continue; }
      const b = rect(x, h - bh, bw, bh);
      s.wash(b, color, .95); s.stroke(b, { closed: true, w: 3.5 });
      // 窗戶
      for (let wy = h - bh + 22; wy < h - 20; wy += 30) {
        for (let wx = x + 14; wx < x + bw - 22; wx += 26) s.wash(rect(wx, wy, 12, 16), lit > .5 ? '#a9c3d4' : '#c9d6dc', .9);
      }
      // 屋頂小細節
      if (bh > (minH + maxH) / 2) s.stroke([[x + bw / 2, h - bh], [x + bw / 2, h - bh - 24]], { w: 3 });
      x += bw + 8;
    }
  }};
}

const TOWER_RED = '#e8503a';

export default {
  tokyoTower: { w: 448, h: 1280, draw(s) {
    // 左右兩條往下張開的塔身
    const L = y => 224 - (40 + Math.pow((y - 200) / 1060, 1.6) * 170);
    const R = y => 448 - L(y);
    const ys = [];
    for (let y = 200; y <= 1260; y += 53) ys.push(y);
    const body = [...ys.map(y => [R(y), y]), ...ys.slice().reverse().map(y => [L(y), y])];
    s.wash(body, TOWER_RED, .35);
    // 白色與紅色交錯的段落
    [[200, 330], [520, 600], [820, 900]].forEach(([y1, y2]) => {
      s.wash([[L(y1), y1], [R(y1), y1], [R(y2), y2], [L(y2), y2]], '#ffffff', .75);
    });
    // 鋼架斜線
    for (let i = 0; i < ys.length - 1; i++) {
      const y1 = ys[i], y2 = ys[i + 1];
      s.stroke([[L(y1), y1], [R(y2), y2]], { w: 2.5, color: TOWER_RED, passes: 1 });
      s.stroke([[R(y1), y1], [L(y2), y2]], { w: 2.5, color: TOWER_RED, passes: 1 });
    }
    s.stroke(ys.map(y => [L(y), y]), { w: 5 }); s.stroke(ys.map(y => [R(y), y]), { w: 5 });
    // 腳下的拱門
    s.stroke([[L(1260) + 60, 1260], [224, 1120], [R(1260) - 60, 1260]], { w: 5 });
    // 兩個展望台
    [[440, 60, 40], [760, 100, 60]].forEach(([y, half, h]) => {
      const deck = [[224 - half, y], [224 + half, y], [224 + half + 10, y + h], [224 - half - 10, y + h]];
      s.wash(deck, '#fffaf0', .95); s.stroke(deck, { closed: true, w: 4 });
      for (let x = 224 - half + 12; x < 224 + half; x += 18) s.stroke([[x, y + 10], [x, y + h - 10]], { w: 2, passes: 1 });
    });
    // 天線
    s.stroke([[224, 30], [224, 200]], { w: 5, color: TOWER_RED });
    s.stroke([[210, 120], [238, 120]], { w: 4 }); s.stroke([[214, 170], [234, 170]], { w: 4 });
  }},
  sakuraTree: { w: 512, h: 512, draw(s) {
    const trunk = [[235, 500], [240, 330], [220, 280], [250, 300], [275, 260], [270, 330], [280, 500]];
    s.wash(trunk, '#6b4a3a', .85); s.stroke(trunk, { closed: true, w: 4 });
    const top = ellipse(256, 200, 220, 160, 90, .18, 9);
    s.wash(top, '#f8c8d4', .8); s.hatch(top, '#e87d98', { gap: 18, angle: .6 }); s.stroke(top, { closed: true });
    for (let i = 0; i < 14; i++) s.dot(80 + s.fixed() * 350, 90 + s.fixed() * 220, 8, '#ffffff');
  }},
  // 鐵塔周圍白天的港區大樓
  cityBack: building({ w: 1536, h: 512, minH: 180, maxH: 470, gapFrom: 950, gapTo: 1230 }),
  cityFront: building({ w: 1536, h: 320, minH: 90, maxH: 250 }),
  // 鐵塔腳下的芝公園
  park: { w: 1536, h: 256, draw(s) {
    const top = Array.from({ length: 25 }, (_, i) => [i * 64, 70 + Math.sin(i * .6) * 10]);
    s.wash([...top, [1536, 256], [0, 256]], '#a8d08d', .9);
    s.stroke(top, { w: 5 });
    for (let i = 0; i < 9; i++) { // 圓圓的樹叢
      const cx = 80 + i * 170 + s.fixed() * 40;
      const bush = ellipse(cx, 80, 70, 38, 40, .12, 5);
      s.wash(bush, '#7fb069', .85); s.stroke(bush, { closed: true, w: 4 });
    }
    for (let i = 0; i < 30; i++) {
      const x = s.fixed() * 1500 + 18, y = 150 + s.fixed() * 90;
      s.stroke([[x - 8, y], [x, y - 16], [x + 8, y]], { w: 3, color: '#6a9955', passes: 1 });
    }
  }},
  butterfly: { w: 192, h: 160, draw(s) {
    const open = .45 + s.r() * .55; // 每個版本翅膀張開的角度不同 → 抖動時就像在拍翅
    const wing = dir => [[96, 80], [96 + dir * 70 * open, 20], [96 + dir * 88 * open, 70], [96 + dir * 60 * open, 90], [96 + dir * 70 * open, 135], [96, 92]];
    [-1, 1].forEach(d => { s.wash(wing(d), '#f6c85f', .9); s.stroke(wing(d), { closed: true, w: 4 }); });
    s.dot(96 + 40 * open, 50, 7, '#f2a65a'); s.dot(96 - 40 * open, 50, 7, '#f2a65a');
    s.stroke([[96, 60], [96, 115]], { w: 7 });
    s.stroke([[96, 60], [84, 36]], { w: 3 }); s.stroke([[96, 60], [108, 36]], { w: 3 });
  }},
  swallow: { w: 256, h: 160, draw(s) {
    const body = [[40, 70], [110, 62], [150, 70], [110, 84]];
    s.wash(body, '#2f3e5c', .9); s.stroke(body, { closed: true, w: 3 });
    s.wash([[112, 66], [140, 20], [132, 68]], '#2f3e5c', .9); s.stroke([[112, 66], [140, 20], [132, 68]], { w: 3 });
    s.wash([[112, 80], [150, 130], [128, 80]], '#2f3e5c', .9); s.stroke([[112, 80], [150, 130], [128, 80]], { w: 3 });
    s.stroke([[150, 70], [210, 58]], { w: 3 }); s.stroke([[150, 72], [212, 88]], { w: 3 });
    s.dot(58, 72, 6, '#e4572e');
  }},
  cloud: { w: 512, h: 320, draw(s) {
    const pts = ellipse(256, 175, 185, 95, 90, .2, 7);
    s.wash(pts, '#ffffff', .85); s.stroke(pts, { closed: true });
  }},
  petal: { w: 96, h: 96, draw(s) {
    const pts = [[48, 12], [60, 26], [80, 44], [72, 72], [48, 86], [24, 72], [16, 44], [36, 26]];
    s.wash(pts, '#f4a6b8', .9); s.stroke([[48, 12], [60, 26], [80, 44], [72, 72], [48, 86], [24, 72], [16, 44], [36, 26], [48, 12]], { w: 2.5, color: '#e87d98', passes: 1 });
  }},
};
