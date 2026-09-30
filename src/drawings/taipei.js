// 場景 3：台北 101 夜景（Work Experience）
import { CHALK, ellipse, rect } from '../sketch.js';

const WINDOW = '#f6d77a';

export default {
  taipei101: { w: 320, h: 1280, ink: CHALK, draw(s) {
    // 塔尖
    s.stroke([[160, 20], [160, 150]], { w: 5 });
    s.dot(160, 24, 7, '#e4572e');
    const cap = [[135, 150], [185, 150], [195, 230], [125, 230]];
    s.wash(cap, '#4f7a8a', .8); s.stroke(cap, { closed: true, w: 4 });
    // 八節往上外擴的「竹節」
    const segH = 95;
    for (let i = 0; i < 8; i++) {
      const y = 230 + i * segH;
      const seg = [[88, y], [232, y], [206, y + segH], [114, y + segH]];
      s.wash(seg, '#3d6b7c', .85);
      s.stroke(seg, { closed: true, w: 4 });
      for (let k = 0; k < 4; k++) for (let c = 0; c < 4; c++) {
        if (s.fixed() > .35) s.dot(122 + c * 25, y + 18 + k * 20, 4.5, WINDOW);
      }
    }
    // 底座
    const base = [[70, 990], [250, 990], [270, 1270], [50, 1270]];
    s.wash(base, '#2f5566', .9); s.stroke(base, { closed: true, w: 4 });
    for (let k = 0; k < 9; k++) for (let c = 0; c < 6; c++) {
      if (s.fixed() > .4) s.dot(90 + c * 28, 1015 + k * 28, 4.5, WINDOW);
    }
  }},
  skyline: { w: 1536, h: 384, ink: CHALK, draw(s) {
    let x = 0;
    while (x < 1536) {
      const bw = 70 + s.fixed() * 90, bh = 100 + s.fixed() * 220;
      const b = rect(x, 384 - bh, bw, bh);
      s.wash(b, ['#2a3558', '#34416a', '#26304f'][Math.floor(s.fixed() * 3)], .95);
      s.stroke(b.slice(0, 3).concat([[x + bw, 384]]), { w: 3 });
      for (let wy = 384 - bh + 20; wy < 370; wy += 26) for (let wx = x + 14; wx < x + bw - 12; wx += 22) {
        if (s.fixed() > .55) s.dot(wx, wy, 3.5, WINDOW);
      }
      x += bw + 6;
    }
  }},
  moon: { w: 512, h: 512, ink: CHALK, draw(s) {
    const m = ellipse(256, 256, 170);
    s.wash(m, '#fbe7a1', .9); s.stroke(m, { closed: true, w: 6 });
    [[200, 200, 30], [300, 290, 40], [230, 330, 18]].forEach(([x, y, r]) => s.stroke(ellipse(x, y, r, r, 20), { closed: true, w: 3, color: '#d9b95c' }));
  }},
  star: { w: 256, h: 256, ink: CHALK, draw(s) {
    const pts = Array.from({ length: 10 }, (_, i) => {
      const a = i / 10 * Math.PI * 2 - Math.PI / 2, r = i % 2 ? 45 : 105;
      return [128 + Math.cos(a) * r, 128 + Math.sin(a) * r];
    });
    s.wash(pts, '#f6c85f', .85); s.stroke(pts, { closed: true, w: 5 });
  }},
  firework: { w: 512, h: 512, ink: CHALK, draw(s) {
    const colors = ['#f6c85f', '#e87d98', '#8ecae6', '#f3ecdf'];
    for (let i = 0; i < 18; i++) {
      const a = i / 18 * Math.PI * 2 + s.j(.05), r1 = 50 + s.r() * 20, r2 = 170 + s.r() * 60;
      const c = colors[i % colors.length];
      s.stroke([[256 + Math.cos(a) * r1, 256 + Math.sin(a) * r1], [256 + Math.cos(a) * r2, 256 + Math.sin(a) * r2]], { w: 5, color: c, passes: 1 });
      s.dot(256 + Math.cos(a) * (r2 + 16), 256 + Math.sin(a) * (r2 + 16), 7, c);
    }
  }},
};
