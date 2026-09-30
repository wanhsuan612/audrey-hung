// 場景 4：東京鐵塔與櫻花（Contact Me）
import { ellipse } from '../sketch.js';

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
    for (let i = 0; i < 14; i++) s.dot(80 + s.r() * 350, 90 + s.r() * 220, 8, '#ffffff');
  }},
  fuji: { w: 1024, h: 384, draw(s) {
    const m = [[40, 380], [420, 70], [600, 70], [990, 380]];
    s.wash(m, '#9fb4d6', .75);
    const snow = [[420, 70], [600, 70], [680, 140], [630, 130], [585, 160], [540, 125], [495, 165], [450, 130], [360, 150]];
    s.wash(snow, '#ffffff', .95);
    s.stroke(m, { w: 5 });
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
