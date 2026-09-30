// Three.js 場景：把手繪圖貼在一片片紙上，鏡頭隨滾動穿過它們
import * as THREE from 'three';
import { makeTextures } from './sketch.js';
import { items, petals, cameraKeys } from './layout.js';
import forest from './drawings/forest.js';
import desk from './drawings/desk.js';
import taipei from './drawings/taipei.js';
import tokyo from './drawings/tokyo.js';

const drawings = {};
Object.entries({ forest, desk, taipei, tokyo }).forEach(([scene, defs]) => {
  Object.entries(defs).forEach(([name, def]) => { drawings[`${scene}.${name}`] = def; });
});

export function createScene(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, .1, 200);

  // 只產生實際用到的貼圖
  const textures = {};
  const texturesFor = name => {
    if (!textures[name]) {
      if (!drawings[name]) throw new Error(`找不到圖案：${name}`);
      textures[name] = makeTextures(drawings[name], Object.keys(textures).length + 1);
    }
    return textures[name];
  };

  const planes = [];
  const addPlane = (name, x, y, z, width, opts = {}) => {
    const def = drawings[name];
    const mat = new THREE.MeshBasicMaterial({ map: texturesFor(name)[0], transparent: true, depthWrite: false, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, width * def.h / def.w), mat);
    mesh.position.set(x, y, z);
    mesh.rotation.z = opts.rot || 0;
    scene.add(mesh);
    const plane = { mesh, name, base: { x, y, z, rz: opts.rot || 0 }, opts, offset: planes.length };
    planes.push(plane);
    return plane;
  };

  items.forEach(([name, x, y, z, width, opts]) => addPlane(name, x, y, z, width, opts));

  const pr = Math.random;
  const lerp = ([a, b], t) => a + (b - a) * t;
  for (let i = 0; i < petals.count; i++) {
    const p = addPlane('tokyo.petal', lerp(petals.x, pr()), lerp(petals.y, pr()), lerp(petals.z, pr()), lerp(petals.size, pr()), { float: false });
    p.petal = { speed: .25 + pr() * .35, sway: pr() * 6, spin: (pr() - .5) * 2 };
  }

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.fov = camera.aspect < 1 ? 70 : 50;
    camera.updateProjectionMatrix();
  }
  addEventListener('resize', resize); resize();

  function cameraAt(p) {
    let i = 0; while (i < cameraKeys.length - 2 && p > cameraKeys[i + 1][0]) i++;
    const [p0, ...a] = cameraKeys[i], [p1, ...b] = cameraKeys[i + 1];
    let t = Math.min(1, Math.max(0, (p - p0) / (p1 - p0))); t = t * t * (3 - 2 * t);
    return a.map((v, k) => v + (b[k] - v) * t);
  }

  let lastBoil = -1, lastTime = 0;

  // progress: 滾動進度 0~1，mouse: 滑鼠位置 -1~1，time: 秒
  function render(progress, mouse, time) {
    const dt = Math.min(.1, time - lastTime); lastTime = time;
    const [x, y, z] = cameraAt(progress);
    camera.position.set(x + mouse.x * .4, y - mouse.y * .3, z);
    camera.lookAt(x * .6 + mouse.x * .3, y - mouse.y * .15, z - 10);

    const boil = Math.floor(time * 8); // 線條每秒抖動 8 次
    planes.forEach(pl => {
      const { mesh, base, opts } = pl;
      if (boil !== lastBoil) mesh.material.map = textures[pl.name][(boil + pl.offset) % 3];

      if (pl.petal) {
        mesh.position.y -= pl.petal.speed * dt;
        mesh.position.x = base.x + Math.sin(time * .8 + pl.petal.sway) * .6;
        mesh.rotation.z += pl.petal.spin * dt;
        if (mesh.position.y < petals.y[0]) mesh.position.y = petals.y[1];
      } else if (opts.float !== false) {
        mesh.position.y = base.y + Math.sin(time * .8 + pl.offset) * .08;
        mesh.rotation.z = base.rz + Math.sin(time * .5 + pl.offset) * .03;
      }
      if (opts.anim === 'pulse') {
        const k = ((time * .45 + pl.offset * .37) % 1);
        mesh.scale.setScalar(.3 + k * .9);
        mesh.userData.pulse = 1 - k * k;
      }
      if (opts.anim === 'flutter') { // 蝴蝶：忽上忽下地飛
        mesh.position.x = base.x + Math.sin(time * .45 + pl.offset) * 1.2;
        mesh.position.y = base.y + Math.sin(time * 1.7 + pl.offset) * .25 + Math.sin(time * .6) * .2;
        mesh.rotation.z = Math.cos(time * .45 + pl.offset) * .25;
      }
      if (opts.anim === 'glide') { // 燕子：從右到左滑過天空，飛出畫面後再回來
        mesh.position.x = 9 - ((9 - base.x + time * .9) % 18);
        mesh.position.y = base.y + Math.sin(time * .7 + pl.offset) * .3;
      }
      if (opts.anim === 'steam') { // 咖啡熱氣：往上飄、淡出
        const k = ((time * .3 + pl.offset * .5) % 1);
        mesh.position.y = base.y + k * .45;
        mesh.scale.setScalar(.8 + k * .5);
        mesh.userData.pulse = Math.sin(k * Math.PI) * .8;
      }

      // 遠處的紙片淡入、快撞到鏡頭時淡出
      const dz = z - mesh.position.z;
      mesh.material.opacity = THREE.MathUtils.smoothstep(dz, .3, 2)
        * (1 - THREE.MathUtils.smoothstep(dz, 12, 20))
        * (mesh.userData.pulse ?? 1);
    });
    lastBoil = boil;

    renderer.render(scene, camera);
  }

  return { render };
}
