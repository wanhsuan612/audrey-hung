// 文字動畫：逐字出現、開場標題四散
import gsap from 'gsap';

function splitChars(el) {
  const text = el.textContent; el.textContent = '';
  // 英文單字保持完整不斷行，中文逐字拆開
  return text.match(/[A-Za-z0-9'’]+|./gsu).map(ch => {
    const outer = document.createElement('span'); outer.className = 'char';
    const inner = document.createElement('span'); inner.className = 'ci'; inner.textContent = ch;
    outer.appendChild(inner); el.appendChild(outer);
    return outer;
  });
}

export function setupText() {
  // 開場標題：逐字彈出，往下滾時四散
  const heroChars = splitChars(document.querySelector('.split-hero'));
  gsap.from(heroChars.map(c => c.firstChild), {
    y: 90, opacity: 0, rotate: () => gsap.utils.random(-30, 30),
    stagger: .05, duration: 1, ease: 'back.out(2)', delay: .4,
  });
  gsap.to(heroChars, {
    x: () => gsap.utils.random(-220, 220), y: () => gsap.utils.random(-320, -120),
    rotate: () => gsap.utils.random(-90, 90), opacity: 0, ease: 'none',
    scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true },
  });
  gsap.to('#home .sub, .hint', {
    opacity: 0, y: -40,
    scrollTrigger: { trigger: '#home', start: 'top top', end: '40% top', scrub: true },
  });

  // 標題與內文：進入畫面時逐字出現
  document.querySelectorAll('.reveal').forEach(el => {
    const chars = splitChars(el);
    gsap.from(chars.map(c => c.firstChild), {
      y: 40, opacity: 0, rotate: () => gsap.utils.random(-15, 15),
      stagger: el.tagName === 'H2' ? .04 : .01, duration: .7, ease: 'back.out(1.8)',
      scrollTrigger: { trigger: el.closest('section'), start: 'top 60%', toggleActions: 'play none none reverse' },
    });
  });

  // About：便條紙貼上來、一天的行程依序彈出
  gsap.from('.eyebrow, .about-note', {
    y: 50, opacity: 0, rotate: () => gsap.utils.random(-6, 6), stagger: .15, duration: .8, ease: 'back.out(1.6)',
    scrollTrigger: { trigger: '#about', start: 'top 50%', toggleActions: 'play none none reverse' },
  });
  gsap.from('.day li', {
    x: -24, opacity: 0, stagger: .1, duration: .6, ease: 'back.out(2)', delay: .4,
    scrollTrigger: { trigger: '#about', start: 'top 50%', toggleActions: 'play none none reverse' },
  });

  // 工作經歷：便條紙一張張貼上來
  gsap.from('.timeline .note', {
    y: 60, opacity: 0, rotate: () => gsap.utils.random(-6, 6), stagger: .15, duration: .8, ease: 'back.out(1.6)',
    scrollTrigger: { trigger: '#work', start: 'top 50%', toggleActions: 'play none none reverse' },
  });

  // 聯絡資訊
  gsap.from('#contact .mail, #contact .socials a', {
    y: 30, opacity: 0, stagger: .1, duration: .6, ease: 'back.out(1.8)',
    scrollTrigger: { trigger: '#contact', start: 'top 50%', toggleActions: 'play none none reverse' },
  });
}
