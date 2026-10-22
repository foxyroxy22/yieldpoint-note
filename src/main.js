import { buildPages, PW, TOTAL, curveSVG } from './pages.js';
import { COPY } from './copy.js';
import { propsSVG } from './props.js';

const N = 6;            // 한 장(leaf)을 세로로 나눈 조각 수 — 휘어짐 표현
const SW = PW / N;
const D = 1.6;          // 장 사이 z 간격 (px)
const TILT = 17;        // 책상 기울기 (deg)

// 재킷(트레싱지) + 4장. [앞면, 뒷면]
const LEAVES = [['jacket', 'jacketBack'], [1, 2], [3, 4], [5, 6], [7, 8], [9, 10]];
const LAST = LEAVES.length;

// 상태별 곡선 강조·측정값 (문구는 copy.js의 ui.states)
const STATES = [
  { hl: [], strain: 0, stress: 0 },
  { hl: [], strain: 0, stress: 0 },
  { hl: ['elastic'], strain: 0.012, stress: 18.6 },
  { hl: ['yield', 'drawing'], strain: 0.046, stress: 24.1 },
  { hl: ['drawing', 'harden'], strain: 0.164, stress: 27.9 },
  { hl: ['harden', 'ongoing'], strain: 0.318, stress: 31.8 },
  { hl: ['elastic', 'yield', 'drawing', 'harden', 'ongoing'], strain: 0.402, stress: 34.5 },
];

const $ = (id) => document.getElementById(id);
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

const scene = $('scene'), table = $('table'), drop = $('drop'), book = $('book');
const leavesEl = $('leaves'), spine = $('spine');
const prevBtn = $('prev'), nextBtn = $('next');

let state = 0;
let ready = false;
const lang = 'en';
let S = 1;
// 모바일 세로 화면: 한 번에 한 페이지만 크게. side = 지금 보고 있는 쪽
let single = false;
let side = 'right';

const isSingle = () => innerWidth < 700 && innerWidth < innerHeight;
// 펼침 안에 왼쪽·오른쪽 페이지가 둘 다 있는 상태
const hasBoth = (s) => s >= 2 && s <= LAST - 1;
// 한 장 넘긴 뒤 처음 보여 줄 쪽 (왼쪽부터 읽음)
const sideAfter = (s) => (s <= 1 ? 'right' : 'left');

/* ---------- build ---------- */

const leafEls = [];
const segEls = [];
const prog = LEAVES.map(() => 0);   // 0 = 오른쪽(덮임), 1 = 넘어감

LEAVES.forEach(([front, back], i) => {
  const leaf = document.createElement('div');
  leaf.className = 'leaf' + (i === 0 ? ' leaf--jacket' : '');
  let parent = leaf;
  const segs = [];
  for (let k = 0; k < N; k++) {
    const seg = document.createElement('div');
    seg.className = 'seg';
    seg.style.width = SW + 'px';
    seg.style.left = (k === 0 ? 0 : SW) + 'px';
    seg.innerHTML = `
      <div class="face face--front"><div class="face-inner" data-page="${front}" style="left:${-k * SW}px"></div><div class="shade"></div></div>
      <div class="face face--back"><div class="face-inner" data-page="${back}" style="left:${-(N - 1 - k) * SW}px"></div><div class="shade"></div></div>`;
    parent.appendChild(seg);
    parent = seg;
    segs.push(seg);
  }
  leavesEl.appendChild(leaf);
  leafEls.push(leaf);
  segEls.push(segs);
});

$('props').innerHTML = propsSVG();

/* ---------- page content ---------- */

const PAGES = buildPages(COPY[lang]);
for (const el of leavesEl.querySelectorAll('.face-inner')) el.innerHTML = PAGES[el.dataset.page];

// 스크린리더·검색용 텍스트
const sr = $('srPages');
for (let p = 1; p <= TOTAL; p++) {
  if (p === 5) continue; // 4–5는 한 펼침
  const art = document.createElement('article');
  art.innerHTML = PAGES[p];
  art.querySelectorAll('svg').forEach((s) => s.remove());
  sr.appendChild(art);
}

/* ---------- render ---------- */

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function render() {
  let top = LAST + 2;
  for (let i = 0; i < LAST; i++) {
    const p = prog[i];
    const A = -180 * ease(p);
    const C = i === 0 ? 22 : 15;
    // 들어 올릴 땐 끝이 앞서고, 내려앉을 땐 끝이 뒤처지며 공기에 뜨는 느낌
    const r = C * Math.sin(Math.PI * p) * (2 * p - 0.6);

    let z;
    if (p > 0 && p < 1) z = top++ * D;
    else if (p >= 1) z = (i + 1) * D;
    else z = (LAST - i) * D;

    leafEls[i].style.transform = `translateZ(${z}px) rotateY(${A}deg)`;
    const segs = segEls[i];
    for (let k = 0; k < N; k++) {
      if (k) segs[k].style.transform = `rotateY(${r}deg)`;
      const th = ((A + k * r) * Math.PI) / 180;
      segs[k].style.setProperty('--sh', (0.32 * (1 - Math.abs(Math.cos(th)))).toFixed(3));
    }
  }
}

/* ---------- tween ---------- */

const tweens = new Map();
let running = false;

function tween(i, to, dur, delay = 0) {
  tweens.set(i, { from: prog[i], to, start: performance.now() + delay, dur: Math.max(dur, 1) });
  if (!running) { running = true; requestAnimationFrame(loop); }
}

function loop(now) {
  for (const [i, t] of tweens) {
    const k = Math.min(1, Math.max(0, (now - t.start) / t.dur));
    prog[i] = t.from + (t.to - t.from) * k;
    if (k >= 1) tweens.delete(i);
  }
  render();
  if (tweens.size) requestAnimationFrame(loop);
  else running = false;
}

function flip(i, to, dur = 980) {
  if (reduce) {
    prog[i] = to;
    book.classList.remove('is-fading');
    void book.offsetWidth;
    book.classList.add('is-fading');
    setTimeout(render, 160);
    return;
  }
  tween(i, to, dur * Math.max(0.35, Math.abs(to - prog[i])));
}

/* ---------- navigation ---------- */

function next() {
  if (!ready) return;
  if (single && hasBoth(state) && side === 'left') { side = 'right'; return update(); }
  if (state >= LAST) return closeReport();
  flip(state, 1);
  state++;
  side = sideAfter(state);
  update();
}

function prev() {
  if (!ready) return;
  if (single && hasBoth(state) && side === 'right') { side = 'left'; return update(); }
  if (state <= 0) return;
  state--;
  flip(state, 0);
  side = 'right';
  update();
}

function closeReport() {
  // 마지막 장에서 다시 표지로
  for (let i = LAST - 1; i >= 1; i--) {
    if (reduce) prog[i] = 0;
    else tween(i, 0, 900, (LAST - 1 - i) * 150);
  }
  if (reduce) flip(0, 1);
  state = 1;
  side = 'right';
  update();
}

/* ---------- UI ---------- */

let shown = { strain: 0, stress: 0 };
let countRaf = 0;

function update() {
  const s = STATES[state];
  const ui = COPY[lang].ui;
  const [label, sub, stage] = ui.states[state];

  let off;
  if (single) off = (state === 0 || state === 1 || (hasBoth(state) && side === 'right')) ? -PW / 2 : PW / 2;
  else off = state === 0 ? -PW / 2 : state === LAST ? PW / 2 : 0;
  book.style.transform = `translateX(${off}px)`;

  const left = state >= 1 ? -PW : 0;
  const right = state <= LAST - 1 ? PW : 0;
  for (const el of [$('shadowSoft'), $('shadowContact')]) {
    el.style.left = left + 'px';
    el.style.width = right - left + 'px';
  }

  $('pageLabel').textContent = single && hasBoth(state)
    ? `p. ${String(state * 2 - 2 + (side === 'right' ? 1 : 0)).padStart(2, '0')} / ${TOTAL}`
    : label;
  $('pageSub').textContent = sub;
  $('rStage').textContent = stage;
  $('progressCurve').innerHTML = curveSVG({
    w: 84, h: 40, pad: [3, 4, 4, 4], hl: s.hl, base: '#4b535c', accent: 'var(--blue-hi)', sw: 1.5, axes: true, ticks: false, labels: null,
  });
  $('nextLabel').textContent = state >= LAST ? ui.close : state === 0 ? ui.open : ui.turn;
  prevBtn.disabled = state === 0;
  $('live').textContent = `${$('pageLabel').textContent} — ${sub}`;

  // 측정값 카운트
  cancelAnimationFrame(countRaf);
  const from = { ...shown };
  const t0 = performance.now();
  const step = (now) => {
    const k = reduce ? 1 : Math.min(1, (now - t0) / 900);
    const e = 1 - Math.pow(1 - k, 3);
    shown.strain = from.strain + (s.strain - from.strain) * e;
    shown.stress = from.stress + (s.stress - from.stress) * e;
    $('rStrain').textContent = (shown.strain * 100).toFixed(1);
    $('rStress').textContent = shown.stress.toFixed(1);
    if (k < 1) countRaf = requestAnimationFrame(step);
  };
  countRaf = requestAnimationFrame(step);
}

function fit() {
  const w = innerWidth, h = innerHeight;
  const wasSingle = single;
  single = isSingle();
  if (single) {
    // 한 페이지(420px) 기준으로 맞춤 — 옆 페이지가 가장자리에 살짝 보임
    S = Math.min((w * 0.86) / 420, (h - 200) / 640, 1.3);
  } else {
    const reserve = w < 640 ? 150 : 190;
    S = Math.min((w * 0.94) / 1000, (h - reserve) / 660, 1.3);
  }
  table.style.transform = `scale3d(${S}, ${S}, ${S}) rotateX(${single ? 10 : TILT}deg) rotateZ(${single ? -0.6 : -1.2}deg)`;
  if (wasSingle !== single) update();
}

/* ---------- input ---------- */

nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

addEventListener('keydown', (e) => {
  if (e.target.closest && e.target.closest('button') && (e.key === ' ' || e.key === 'Enter')) return;
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); next(); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
});

let drag = null;

scene.addEventListener('pointerdown', (e) => {
  if (!ready) return;
  const spineX = single ? innerWidth / 2 : spine.getBoundingClientRect().left;
  const fwd = e.clientX > spineX;
  const i = fwd ? state : state - 1;
  const canDrag = !single && (fwd ? state < LAST : state > 0) && !tweens.has(i) && !reduce;
  drag = { fwd, i, x0: e.clientX, moved: false, canDrag };
  scene.setPointerCapture(e.pointerId);
});

scene.addEventListener('pointermove', (e) => {
  if (!drag) return;
  const dx = e.clientX - drag.x0;
  if (!drag.moved && Math.abs(dx) > 6) {
    drag.moved = true;
    if (drag.canDrag) scene.classList.add('is-dragging');
  }
  if (!drag.moved || !drag.canDrag) return;
  const span = PW * S * 1.25;
  const k = Math.min(0.98, Math.max(0.02, drag.fwd ? -dx / span : 1 - dx / span));
  prog[drag.i] = k;
  render();
});

function endDrag(e) {
  if (!drag) return;
  const d = drag;
  drag = null;
  scene.classList.remove('is-dragging');
  if (!d.moved) {
    if (d.fwd) next(); else prev();
    return;
  }
  if (!d.canDrag) {
    // 스와이프로만 판단
    const dx = e.clientX - d.x0;
    if (dx < -30) next(); else if (dx > 30) prev();
    return;
  }
  const p = prog[d.i];
  if (d.fwd) {
    if (p > 0.22) { tween(d.i, 1, 700 * (1 - p) + 120); state++; }
    else tween(d.i, 0, 500 * p + 120);
  } else {
    if (p < 0.78) { tween(d.i, 0, 700 * p + 120); state--; }
    else tween(d.i, 1, 500 * (1 - p) + 120);
  }
  update();
}
scene.addEventListener('pointerup', endDrag);
scene.addEventListener('pointercancel', endDrag);

addEventListener('resize', fit);

/* ---------- intro ---------- */

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function intro() {
  fit();
  render();
  update();

  if (reduce) {
    drop.classList.remove('is-pre');
    prog[0] = 1;
    state = 1;
    render();
    update();
    document.body.classList.remove('is-intro');
    ready = true;
    return;
  }

  await (document.fonts ? Promise.race([document.fonts.ready, wait(600)]) : wait(300));
  document.body.classList.add('is-lit');         // 형광등 깜빡
  await wait(650);
  drop.classList.remove('is-pre');                // 실험노트가 책상 위에 놓임
  await wait(1250);
  tween(0, 1, 1900);                              // 트레싱지 재킷이 펼쳐짐
  state = 1;
  update();
  await wait(1300);
  document.body.classList.add('is-ready');       // 깜빡임 애니메이션이 멈춰 있어도 조명은 확실히 켬
  document.body.classList.remove('is-intro');
  ready = true;
}

intro();
