// 手繪筆刷：在 canvas 上畫出會抖的線條、水彩色塊、斜線陰影
import * as THREE from 'three';

export const INK = '#2b2622';
export const CHALK = '#f3ecdf'; // 夜景用的淺色線條

export function rng(seed) {
  return () => {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

export function sketcher(g, r, ink = INK) {
  const j = a => (r() - .5) * 2 * a;

  function densify(pts, step = 14, closed = false) {
    const P = closed ? [...pts, pts[0]] : pts, out = [];
    for (let i = 0; i < P.length - 1; i++) {
      const [x1, y1] = P[i], [x2, y2] = P[i + 1];
      const n = Math.max(1, Math.ceil(Math.hypot(x2 - x1, y2 - y1) / step));
      for (let k = 0; k < n; k++) out.push([x1 + (x2 - x1) * k / n, y1 + (y2 - y1) * k / n]);
    }
    out.push(P[P.length - 1]);
    return out;
  }

  function stroke(pts, { w = 5, jit = 2.5, color = ink, passes = 2, closed = false } = {}) {
    const d = densify(pts, 14, closed);
    for (let p = 0; p < passes; p++) {
      const ph = r() * 10, ph2 = r() * 10;
      const q = d.map(([x, y], i) => [x + Math.sin(i * .35 + ph) * jit + j(jit * .3), y + Math.cos(i * .3 + ph2) * jit + j(jit * .3)]);
      g.beginPath(); g.moveTo(q[0][0], q[0][1]);
      for (let i = 1; i < q.length - 1; i++) {
        g.quadraticCurveTo(q[i][0], q[i][1], (q[i][0] + q[i + 1][0]) / 2, (q[i][1] + q[i + 1][1]) / 2);
      }
      g.lineTo(q[q.length - 1][0], q[q.length - 1][1]);
      g.strokeStyle = color; g.lineWidth = p ? w * .55 : w; g.globalAlpha = p ? .6 : 1;
      g.stroke(); g.globalAlpha = 1;
    }
  }

  function wash(pts, color, alpha = .55) {
    for (let p = 0; p < 2; p++) {
      const ox = j(6), oy = j(6);
      g.beginPath();
      densify(pts, 20, true).forEach(([x, y], i) => { const X = x + ox + j(3), Y = y + oy + j(3); i ? g.lineTo(X, Y) : g.moveTo(X, Y); });
      g.closePath(); g.fillStyle = color; g.globalAlpha = alpha; g.fill(); g.globalAlpha = 1;
    }
  }

  function hatch(pts, color, { gap = 14, angle = -.8, w = 3 } = {}) {
    g.save();
    g.beginPath(); pts.forEach(([x, y], i) => i ? g.lineTo(x, y) : g.moveTo(x, y)); g.closePath(); g.clip();
    const W = g.canvas.width, H = g.canvas.height, D = Math.hypot(W, H);
    g.translate(W / 2, H / 2); g.rotate(angle);
    for (let y = -D / 2; y < D / 2; y += gap) stroke([[-D / 2, y], [D / 2, y]], { w, jit: 1.5, color, passes: 1 });
    g.restore();
  }

  function text(str, x, y, { size = 48, font = 'Caveat', weight = 700, color = ink, align = 'center', rot = 0 } = {}) {
    g.save(); g.translate(x + j(1.5), y + j(1.5)); g.rotate(rot + j(.02));
    g.fillStyle = color; g.font = `${weight} ${size}px "${font}"`; g.textAlign = align; g.textBaseline = 'middle';
    g.fillText(str, 0, 0); g.restore();
  }

  function dot(x, y, rad, color) {
    g.beginPath(); g.arc(x + j(1), y + j(1), rad * (1 + j(.15)), 0, Math.PI * 2); g.fillStyle = color; g.fill();
  }

  return { stroke, wash, hatch, text, dot, r, j, g, ink };
}

// 點列產生器
export const ellipse = (cx, cy, rx, ry = rx, n = 40, bump = 0, bumps = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = i / n * Math.PI * 2, k = 1 + bump * Math.abs(Math.sin(a * bumps / 2));
    return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k];
  });

export const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];

export const roundRect = (x, y, w, h, r, n = 5) => {
  const pts = [];
  const corner = (cx, cy, a0) => { for (let i = 0; i <= n; i++) { const a = a0 + i / n * Math.PI / 2; pts.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]); } };
  corner(x + w - r, y + r, -Math.PI / 2); corner(x + w - r, y + h - r, 0);
  corner(x + r, y + h - r, Math.PI / 2); corner(x + r, y + r, Math.PI);
  return pts;
};

/**
 * 把一個圖案定義變成 3 張略有不同的貼圖（輪流播放 = 線條抖動 line boil）。
 *
 * 圖案定義有兩種：
 *   { w, h, draw(s, w, h), ink? }   程式畫的佔位圖
 *   { w, h, images: ['a.png', 'b.png', 'c.png'] }   你自己的手繪圖（放在 public/assets/）
 *                                                    只給 1 張也可以，就不會抖動
 */
export function makeTextures(def, seed) {
  if (def.images) {
    const loader = new THREE.TextureLoader();
    const list = def.images.map(src => {
      const t = loader.load(src); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; return t;
    });
    return [0, 1, 2].map(i => list[i % list.length]);
  }
  return [0, 1, 2].map(v => {
    const c = document.createElement('canvas'); c.width = def.w; c.height = def.h;
    const g = c.getContext('2d'); g.lineCap = 'round'; g.lineJoin = 'round';
    def.draw(sketcher(g, rng(seed * 100 + v + 1), def.ink), def.w, def.h);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
    return t;
  });
}
