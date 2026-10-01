import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { createScene } from './scene.js';
import { themes } from './layout.js';
import { setupText } from './text.js';

gsap.registerPlugin(ScrollTrigger);
// 手機網址列伸縮時不重新計算捲動動畫，避免文字卡片跳動
ScrollTrigger.config({ ignoreMobileResize: true });

// ?og：產生社群分享預覽圖用的乾淨畫面（見 README）
if (new URLSearchParams(location.search).has('og')) document.documentElement.classList.add('og');

// 等字型載好再畫圖（日曆和卡片會用到）
await Promise.all([
  document.fonts.load('700 72px Caveat'),
  document.fonts.load('400 40px "LXGW WenKai TC"', '月日火水木金土曜'),
]);

const { render } = createScene(document.getElementById('bg'));

/* 平滑滾動：只在滑鼠裝置啟用。
 * 觸控裝置（特別是 iPhone Safari）用原生捲動，Lenis 會和系統的慣性滾動互相拉扯而造成抖動 */
const isTouch = matchMedia('(pointer: coarse)').matches;
const lenis = isTouch ? null : new Lenis({ lerp: .08 });
lenis?.on('scroll', ScrollTrigger.update);
if (import.meta.env.DEV) window.lenis = lenis; // 開發時方便從 console 測試捲動
document.querySelectorAll('nav a').forEach(a => a.addEventListener('click', e => {
  e.preventDefault();
  const target = a.getAttribute('href');
  if (lenis) lenis.scrollTo(target);
  else document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
}));

/* 整頁滾動進度 → 鏡頭 */
const state = { p: 0 };
gsap.to(state, { p: 1, ease: 'none', scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: 1.2 } });

/* 滑鼠微視差 */
const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return; // 手指滑動不算，避免滑動時鏡頭跟著晃
  mouse.tx = e.clientX / innerWidth * 2 - 1; mouse.ty = e.clientY / innerHeight * 2 - 1;
});

gsap.ticker.add(time => {
  lenis?.raf(time * 1000);
  mouse.x += (mouse.tx - mouse.x) * .05; mouse.y += (mouse.ty - mouse.y) * .05;
  render(state.p, mouse, time);
});
gsap.ticker.lagSmoothing(0);

/* 每一段切換背景色與文字色 */
const root = document.documentElement;
const ids = Object.keys(themes);
const vars = t => ({ '--paper': t.paper, '--ink': t.ink });
gsap.set(root, vars(themes[ids[0]]));
ids.slice(1).forEach((id, i) => {
  gsap.fromTo(root, vars(themes[ids[i]]), {
    ...vars(themes[id]), ease: 'none', immediateRender: false,
    scrollTrigger: { trigger: `#${id}`, start: 'top 85%', end: 'top 35%', scrub: true },
  });
});

/* 右側進度線：像鉛筆一樣畫出來 */
const bar = document.querySelector('.progress .bar');
const len = bar.getTotalLength();
gsap.set(bar, { strokeDasharray: len, strokeDashoffset: len });
gsap.to(bar, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: 'main', start: 'top top', end: 'bottom bottom', scrub: true } });

setupText();

gsap.to('.loader', { opacity: 0, duration: .6, onComplete: () => document.querySelector('.loader').remove() });
