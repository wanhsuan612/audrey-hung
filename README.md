# Audrey Hung — Personal Website

An interactive, scroll-driven 3D portfolio with a hand-drawn storybook aesthetic. As the visitor scrolls, the camera travels through four illustrated scenes, each hosting a section of the site:

| Scene | Section |
|---|---|
| Forest | Intro |
| A backend engineer's desk | About Me |
| Taipei 101 at night | Work Experience |
| Tokyo Tower in spring | Side Projects · Contact |

**Live site:** https://audrey-hung.audrey-35921.workers.dev

![Preview](public/og-image.jpg)

## Highlights

- **Procedural illustration, zero image assets.** Every drawing is generated at runtime with the Canvas 2D API — wobbly ink strokes, watercolor washes and cross-hatching — then mapped onto planes in a Three.js scene.
- **Line-boil animation.** Each drawing is rendered in three slightly different variations and cycled, giving the classic hand-animated "boiling line" effect. A seeded PRNG keeps shapes stable while only the strokes jitter.
- **Scroll-driven camera.** A keyframed camera path (`src/layout.js`) is scrubbed by GSAP ScrollTrigger; closely spaced keyframes let the camera linger while each section is read.
- **Ambient motion.** Falling sakura petals, fireworks, rising coffee steam, gliding swallows and fluttering butterflies, plus subtle mouse parallax.
- **Per-section theming.** Background and ink colors transition between sections (e.g. a dark palette for the Taipei night scene).
- **Mobile-first robustness.** Smooth scrolling via Lenis on pointer devices, native scrolling on touch devices, and fixes for iOS Safari address-bar resizing and sticky-element jitter.
- **Social previews.** Open Graph metadata and a reproducible preview image generated from the live page.

## Tech Stack

- [Three.js](https://threejs.org) — 3D scene and rendering
- [GSAP + ScrollTrigger](https://gsap.com) — scroll-linked camera and text animations
- [Lenis](https://lenis.darkroom.engineering) — smooth scrolling
- [Vite](https://vite.dev) — dev server and build
- [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/) — static hosting

## Getting Started

Requires Node.js 20+.

```bash
npm install
npm run dev       # start the dev server at http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Project Structure

```
├── index.html             # Page content: intro, about, work, projects, contact
├── public/                # Static assets: favicons, cursors, Open Graph image
└── src/
    ├── main.js            # Entry point: scrolling, camera progress, theme transitions
    ├── scene.js           # Three.js scene, line boil, petals and other animations
    ├── layout.js          # Object placement, camera keyframes, section color themes
    ├── sketch.js          # Hand-drawn brush toolkit and texture generation
    ├── text.js            # Text reveal animations
    ├── style.css          # Layout and typography
    └── drawings/          # Procedural drawings for each scene
        ├── forest.js
        ├── desk.js
        ├── taipei.js
        └── tokyo.js
```

Most visual tweaks — where objects sit, how the camera moves, and each section's colors — live in `src/layout.js`.

## Configuration

| Variable | Description |
|---|---|
| `VITE_SITE_URL` | Canonical site URL (no trailing slash), used for the Open Graph URL and preview image. Set in `.env`. |

## Deployment

The site is deployed as static assets on Cloudflare Workers (see `wrangler.jsonc`):

```bash
npm run build
npx wrangler deploy
```

### Regenerating the Open Graph image

`public/og-image.jpg` is a 1200×630 screenshot of the home page with the `?og` query flag, which hides UI chrome. With the dev server running:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --force-device-scale-factor=1 --use-angle=swiftshader --enable-unsafe-swiftshader \
  --window-size=1200,630 --timeout=7000 --screenshot=og.png "http://localhost:5173/?og"
sips -s format jpeg -s formatOptions 88 og.png --out public/og-image.jpg && rm og.png
```

## License

© Audrey Hung. All rights reserved. The source is shared for reference; please don't reuse the design or content without permission.
