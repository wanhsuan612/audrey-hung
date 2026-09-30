// 場景 1：森林（家鄉）
import { ellipse } from '../sketch.js';

export default {
  pine: { w: 320, h: 512, draw(s) {
    const trunk = [[145, 490], [148, 400], [172, 400], [175, 490]];
    s.wash(trunk, '#8b5e3c'); s.stroke(trunk, { w: 4 });
    [[160, 40, 70, 180], [160, 120, 110, 300], [160, 210, 145, 420]].forEach(([cx, top, half, bottom]) => {
      const tri = [[cx, top], [cx + half, bottom], [cx - half, bottom]];
      s.wash(tri, '#4f7942', .75); s.hatch(tri, '#2f5233', { gap: 16, angle: .9 }); s.stroke(tri, { closed: true });
    });
  }},
  roundTree: { w: 384, h: 512, draw(s) {
    const trunk = [[170, 480], [175, 300], [210, 300], [215, 480]];
    s.wash(trunk, '#8b5e3c'); s.stroke(trunk, { w: 4 });
    const top = ellipse(192, 210, 140, 150, 80, .15, 9);
    s.wash(top, '#7fb069', .7); s.hatch(top, '#4f7942', { gap: 18 }); s.stroke(top, { closed: true });
  }},
  mountains: { w: 1024, h: 384, draw(s) {
    const far = [[0, 360], [180, 120], [330, 250], [520, 70], [720, 230], [870, 130], [1024, 300], [1024, 380], [0, 380]];
    s.wash(far, '#a9c5a0', .6); s.stroke(far.slice(0, 7), { w: 4 });
    const near = [[0, 380], [120, 260], [260, 330], [420, 220], [610, 330], [800, 240], [1024, 350], [1024, 384], [0, 384]];
    s.wash(near, '#7fb069', .6); s.stroke(near.slice(0, 7), { w: 4 });
  }},
  sun: { w: 512, h: 512, draw(s) {
    const body = ellipse(256, 256, 110);
    s.wash(body, '#f6c85f', .7); s.hatch(body, '#e8a33d', { gap: 16 }); s.stroke(body, { closed: true });
    for (let i = 0; i < 12; i++) {
      const a = i / 12 * Math.PI * 2 + s.j(.08), r1 = 140, r2 = 195 + s.j(20);
      s.stroke([[256 + Math.cos(a) * r1, 256 + Math.sin(a) * r1], [256 + Math.cos(a) * r2, 256 + Math.sin(a) * r2]], { w: 5 });
    }
    s.stroke([[220, 240], [222, 250]], { w: 9 }); s.stroke([[292, 240], [294, 250]], { w: 9 });
    s.stroke([[215, 285], [256, 310], [297, 285]], { w: 5 });
  }},
  cloud: { w: 512, h: 320, draw(s) {
    const pts = ellipse(256, 175, 185, 95, 90, .2, 7);
    s.wash(pts, '#ffffff', .8); s.stroke(pts, { closed: true });
    s.stroke([[170, 190], [200, 205], [235, 195]], { w: 3 });
  }},
  bird: { w: 256, h: 160, draw(s) {
    s.stroke([[50, 110], [95, 70], [128, 105], [161, 70], [206, 110]], { w: 6 });
  }},
  mushroom: { w: 256, h: 256, draw(s) {
    const stem = [[105, 230], [110, 140], [146, 140], [151, 230]];
    s.wash(stem, '#fff6e5', .9); s.stroke(stem, { closed: true, w: 4 });
    const cap = [[40, 150], [70, 70], [128, 45], [186, 70], [216, 150]];
    s.wash(cap, '#e4572e', .75); s.stroke(cap, { closed: true, w: 5 });
    [[95, 95], [150, 80], [175, 125], [115, 130]].forEach(([x, y]) => s.dot(x, y, 10, '#fff6e5'));
  }},
  grass: { w: 256, h: 128, draw(s) {
    for (let i = 0; i < 6; i++) {
      const x = 40 + i * 35;
      s.stroke([[x, 120], [x + s.j(20), 40 + s.j(20)]], { w: 4, color: '#4f7942' });
    }
  }},
};
