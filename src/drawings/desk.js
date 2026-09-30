// 場景 2：辦公桌（About Me）
import { ellipse, rect, roundRect } from '../sketch.js';

const ROSE_GOLD = '#b76e79';
const SILVER = '#d9dde3';

// 日曆顯示今天的日期
const today = new Date();
const WEEKDAY = ['日', '月', '火', '水', '木', '金', '土'][today.getDay()];

export default {
  desk: { w: 1024, h: 512, draw(s) {
    const top = [[20, 60], [1004, 60], [990, 110], [34, 110]];
    s.wash(top, '#c89b6d', .8); s.stroke(top, { closed: true, w: 5 });
    for (let i = 0; i < 4; i++) s.stroke([[80 + i * 230, 78 + s.j(4)], [220 + i * 230, 82 + s.j(4)]], { w: 2, color: '#8b5e3c' });
    [[70, 110, 110, 500], [914, 110, 954, 500]].forEach(([x1, y1, x2, y2]) => {
      const leg = rect(x1, y1, x2 - x1, y2 - y1);
      s.wash(leg, '#a97c50', .8); s.stroke(leg, { w: 4 });
    });
  }},
  monitor: { w: 640, h: 512, draw(s) {
    const frame = roundRect(30, 20, 580, 360, 18);
    s.wash(frame, '#3a3a3f', .9); s.stroke(frame, { closed: true, w: 5 });
    const screen = rect(52, 42, 536, 316);
    s.wash(screen, '#eaf4fb', .95);
    // 螢幕上的視窗與程式碼
    const win = rect(80, 70, 300, 250);
    s.wash(win, '#ffffff', .9); s.stroke(win, { closed: true, w: 3 });
    ['#e4572e', '#f6c85f', '#7fb069'].forEach((c, i) => s.dot(100 + i * 20, 88, 6, c));
    for (let i = 0; i < 7; i++) s.stroke([[100 + (i % 3) * 20, 120 + i * 26], [180 + s.r() * 170, 120 + i * 26]], { w: 5, color: ['#8ecae6', '#b76e79', '#7fb069'][i % 3], passes: 1 });
    const win2 = rect(400, 110, 160, 200);
    s.wash(win2, '#fbe7a1', .8); s.stroke(win2, { closed: true, w: 3 });
    s.stroke(ellipse(480, 190, 40), { closed: true, w: 3 });
    // 支架
    const neck = [[290, 380], [350, 380], [360, 480], [280, 480]];
    s.wash(neck, SILVER, .9); s.stroke(neck, { closed: true, w: 4 });
    s.stroke([[200, 490], [440, 490]], { w: 6 });
  }},
  mac: { w: 512, h: 384, draw(s) {
    const lid = roundRect(80, 20, 352, 240, 14);
    s.wash(lid, '#2e2e33', .9); s.stroke(lid, { closed: true, w: 5 });
    const screen = rect(96, 36, 320, 208);
    s.wash(screen, '#fde3e8', .95);
    s.stroke([[236, 30], [276, 30]], { w: 6 });
    // 螢幕上的手繪稿
    s.stroke(ellipse(200, 140, 50, 50, 30), { closed: true, w: 4 });
    s.stroke([[270, 110], [380, 110]], { w: 4 }); s.stroke([[270, 140], [350, 140]], { w: 4 }); s.stroke([[270, 170], [370, 170]], { w: 4 });
    const base = [[40, 262], [472, 262], [490, 292], [22, 292]];
    s.wash(base, SILVER, .95); s.stroke(base, { closed: true, w: 5 });
    s.stroke([[220, 272], [292, 272]], { w: 3 });
  }},
  ipad: { w: 384, h: 448, draw(s) {
    const body = roundRect(60, 30, 264, 350, 22);
    s.wash(body, '#3a3a3f', .9); s.stroke(body, { closed: true, w: 5 });
    const screen = rect(76, 48, 232, 314);
    s.wash(screen, '#fffaf0', .95);
    // 畫到一半的花
    const center = [192, 170];
    for (let i = 0; i < 6; i++) {
      const a = i / 6 * Math.PI * 2;
      s.stroke(ellipse(center[0] + Math.cos(a) * 38, center[1] + Math.sin(a) * 38, 24, 24, 16), { closed: true, w: 3, color: '#e87d98' });
    }
    s.dot(center[0], center[1], 18, '#f6c85f');
    s.stroke([[192, 210], [185, 330]], { w: 4, color: '#4f7942' });
    s.stroke([[188, 280], [150, 255], [186, 262]], { w: 3, color: '#4f7942' });
    // 支架與 Apple Pencil
    s.stroke([[120, 380], [100, 430]], { w: 6 }); s.stroke([[264, 380], [284, 430]], { w: 6 });
    s.stroke([[330, 120], [345, 380]], { w: 10, color: '#f5f5f5', passes: 1 });
    s.stroke([[330, 120], [345, 380]], { w: 2 });
  }},
  perfume: { w: 256, h: 384, draw(s) {
    const cap = rect(88, 30, 80, 80);
    s.wash(cap, '#8b5e3c', .9); s.hatch(cap, '#5c3a21', { gap: 9, angle: 1.4, w: 2 }); s.stroke(cap, { closed: true, w: 4 });
    s.stroke([[112, 110], [112, 130]], { w: 4 }); s.stroke([[144, 110], [144, 130]], { w: 4 });
    const bottle = roundRect(40, 130, 176, 230, 22);
    s.wash(bottle, '#f3dcb5', .45);
    const liquid = [[48, 200], [208, 196], [208, 350], [48, 352]];
    s.wash(liquid, '#d99a4e', .55);
    s.stroke(bottle, { closed: true, w: 5 });
    const label = rect(78, 230, 100, 70);
    s.wash(label, '#fffaf0', .9); s.stroke(label, { closed: true, w: 3 });
    s.text('WOOD', 128, 255, { size: 30 }); s.text('no.8', 128, 282, { size: 22, weight: 500 });
    s.stroke([[60, 150], [60, 190]], { w: 4, color: '#ffffff' });
  }},
  glasses: { w: 512, h: 224, draw(s) {
    s.stroke(ellipse(150, 112, 82, 82, 50), { closed: true, w: 5, color: ROSE_GOLD, jit: 1.8 });
    s.stroke(ellipse(362, 112, 82, 82, 50), { closed: true, w: 5, color: ROSE_GOLD, jit: 1.8 });
    s.stroke([[232, 100], [256, 84], [280, 100]], { w: 4, color: ROSE_GOLD, jit: 1 });
    s.stroke([[68, 104], [30, 96], [18, 150]], { w: 4, color: ROSE_GOLD, jit: 1 });
    s.stroke([[444, 104], [482, 96], [494, 150]], { w: 4, color: ROSE_GOLD, jit: 1 });
    s.stroke([[110, 70], [130, 60]], { w: 4, color: '#ffffff', passes: 1 });
    s.stroke([[322, 70], [342, 60]], { w: 4, color: '#ffffff', passes: 1 });
  }},
  calendar: { w: 320, h: 384, draw(s) {
    const board = roundRect(30, 40, 260, 320, 14);
    s.wash(board, '#fffaf0', .95); s.stroke(board, { closed: true, w: 5 });
    const head = rect(30, 40, 260, 70);
    s.wash(head, '#e4572e', .8);
    [110, 210].forEach(x => { s.stroke([[x, 20], [x, 60]], { w: 7 }); });
    s.text(`${today.getMonth() + 1}月`, 160, 78, { size: 40, font: 'LXGW WenKai TC', color: '#fffaf0' });
    s.text(String(today.getDate()), 160, 215, { size: 150, color: today.getDay() === 0 ? '#e4572e' : s.ink });
    s.text(`${WEEKDAY}曜日`, 160, 320, { size: 36, font: 'LXGW WenKai TC' });
  }},
};
