// Yield Point — page contents (A6, 105 × 148 mm → 420 × 594 px design units)
// 디자인 텍스처(Figma 내보내기)가 준비되면 이 HTML 페이지들을 이미지로 교체하면 된다.

export const PW = 420;
export const PH = 594;

/* ---------- stress–strain curve ---------- */

// 곡선 구간 (u = strain, v = stress, 0..1)
const SEGMENTS = {
  elastic: [[0, 0], [0.16, 0.52]],
  yield: [[0.16, 0.52], [0.18, 0.58], [0.2, 0.6], [0.22, 0.6], [0.24, 0.6], [0.25, 0.56], [0.27, 0.56]],
  drawing: [[0.27, 0.56], [0.35, 0.555], [0.42, 0.575], [0.5, 0.57]],
  harden: [[0.5, 0.57], [0.62, 0.6], [0.74, 0.78], [0.84, 0.84]],
  ongoing: [[0.84, 0.84], [0.88, 0.87], [0.92, 0.89], [0.95, 0.9]],
};

export function curveSVG({
  w, h,
  pad = [8, 8, 18, 22], // top right bottom left
  hl = [],
  base = '#141414',
  faint = null,       // 강조 외 구간 색 (없으면 base)
  accent = 'var(--blue)',
  sw = 1.6,
  axes = true,
  ticks = true,
  labels = ['Load', 'Stretch'],  // 세로축, 가로축 — null이면 생략
  cls = '',
}) {
  const [t, r, b, l] = pad;
  const m = (u, v) => [(l + u * (w - l - r)).toFixed(1), (h - b - v * (h - t - b)).toFixed(1)];
  const path = (pts) => {
    if (pts.length === 2) return `M${m(...pts[0])} L${m(...pts[1])}`;
    let d = `M${m(...pts[0])}`;
    for (let i = 1; i < pts.length; i += 3) d += ` C${m(...pts[i])} ${m(...pts[i + 1])} ${m(...pts[i + 2])}`;
    return d;
  };
  const color = (name) => (hl.includes(name) ? accent : faint || base);
  const width = (name) => (hl.includes(name) ? sw * 1.35 : sw);

  let s = `<svg class="curve ${cls}" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">`;
  if (axes) {
    const [ox, oy] = m(0, 0);
    s += `<g stroke="${base}" stroke-width="1" fill="none">
      <path d="M${ox} ${t - 2} L${ox} ${oy} L${w - r + 2} ${oy}"/>`;
    if (ticks) {
      for (let i = 1; i <= 10; i++) {
        const [x] = m(i / 10, 0);
        const [, y] = m(0, i / 10);
        s += `<path d="M${x} ${oy} l0 3"/><path d="M${ox} ${y} l-3 0"/>`;
      }
    }
    s += `</g>`;
    if (labels) {
      s += `<text x="${+ox + 5}" y="${t + 6}" class="axis-l">${labels[0]} ↑</text>
      <text x="${w - r}" y="${+oy - 6}" text-anchor="end" class="axis-l">${labels[1]} →</text>`;
    }
  }
  for (const name of ['elastic', 'yield', 'drawing', 'harden', 'ongoing']) {
    const dash = name === 'ongoing' ? ' stroke-dasharray="2 4"' : '';
    s += `<path d="${path(SEGMENTS[name])}" fill="none" stroke="${color(name)}" stroke-width="${width(name)}" stroke-linecap="round"${dash}/>`;
  }
  // 진행 중 화살표 (파단 없음)
  const [ex, ey] = m(0.95, 0.9);
  s += `<path d="M${ex} ${ey} l-7 -1 m7 1 l-4 6" fill="none" stroke="${color('ongoing')}" stroke-width="${width('ongoing')}" stroke-linecap="round"/>`;
  s += `</svg>`;
  return s;
}

export const curvePoint = (u, v, { w, h, pad = [8, 8, 18, 22] }) => {
  const [t, r, b, l] = pad;
  return [l + u * (w - l - r), h - b - v * (h - t - b)];
};

/* ---------- small graphics ---------- */

const dogboneVertical = `
<svg class="dogbone" viewBox="0 0 170 340" width="170" height="340" aria-hidden="true">
  <defs>
    <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <path d="M0 0 V6" stroke="#141414" stroke-width=".6" opacity=".45"/>
    </pattern>
  </defs>
  <path d="M75 -6 V346" stroke="var(--blue)" stroke-width=".8" stroke-dasharray="10 3 2 3" opacity=".7"/>
  <rect x="35" y="0" width="80" height="62" fill="url(#hatch)"/>
  <rect x="35" y="268" width="80" height="62" fill="url(#hatch)"/>
  <path d="M35 0 H115 V70 C115 92 91 98 91 122 V208 C91 232 115 238 115 260 V330 H35 V260 C35 238 59 232 59 208 V122 C59 98 35 92 35 70 Z"
        fill="none" stroke="#141414" stroke-width="1.4"/>
  <path d="M48 140 H102 M48 190 H102" stroke="var(--blue)" stroke-width="1.6"/>
  <g stroke="#141414" stroke-width=".8" fill="none">
    <path d="M128 140 H140 M128 190 H140 M136 140 V190"/>
    <path d="M133 146 l3 -6 l3 6 M133 184 l3 6 l3 -6"/>
  </g>
  <text x="146" y="168" class="dim">G</text>
</svg>`;

export const TOTAL = 10; // 총 쪽수

// p.7 흥미 막대그래프 — 부트캠프 기간 월별로 커지는 흥미
const INTEREST = [1, 1.8, 2.9, 4.2, 5.9, 8];
function interestChart(bc, axis) {
  const w = 360, h = 150, l = 22, b = 18, t = 22;
  const bw = 34, gap = (w - l - 10 - bw * INTEREST.length) / (INTEREST.length - 1);
  const k = (h - t - b) / Math.max(...INTEREST);
  const bars = INTEREST.map((v, i) => {
    const x = l + i * (bw + gap), bh = v * k, y = h - b - bh, last = i === INTEREST.length - 1;
    return `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" fill="${last ? 'var(--blue)' : '#141414'}" opacity="${last ? 1 : 0.18 + i * 0.1}"/>
      <text x="${x + bw / 2}" y="${h - 5}" text-anchor="middle" class="dim">${bc.months[i]}</text>` +
      (last ? `<text x="${x + bw / 2}" y="${y - 6}" text-anchor="middle" class="dim blue">${bc.peak} ↑</text>` : '');
  }).join('');
  return `<svg class="curve" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true">
    <path d="M${l} ${t - 14} V${h - b} H${w}" fill="none" stroke="#141414"/>
    <text x="${l + 5}" y="${t - 8}" class="axis-l">Interest ↑</text>
    ${bars}
  </svg>`;
}

/* ---------- page parts ----------
   모든 페이지 공통 구조:
   머리말(제목 · 쪽수) → 섹션 번호 · 제목 · 기간 → 쉽게 말하면 → 본문(표/그림 + 관찰) → 꼬리말
   문구는 copy.js에서 언어별로 가져온다. */

const page = (side, n, inner, extra = '') =>
  `<div class="page page--${side} ${extra}" data-page="${n}">${inner}</div>`;

const SPREAD_CURVE = { w: 780, h: 296, pad: [10, 10, 24, 28] };
const CT = 176; // 펼침 그래프 위치 (쉽게 말하면 상자 아래)
const [yx, yy] = curvePoint(0.22, 0.6, SPREAD_CURVE);
const [, py] = curvePoint(0.35, 0.56, SPREAD_CURVE);

// 곡선 구간 위의 한 점 (t = 0..1, 3차 베지어)
const along = (name, t) => {
  const [p0, p1, p2, p3] = SEGMENTS[name];
  const m = 1 - t;
  return [0, 1].map((i) => m * m * m * p0[i] + 3 * m * m * t * p1[i] + 3 * m * t * t * p2[i] + t * t * t * p3[i]);
};
// 변형 경화 구간 위 이정표: 부트캠프, 입사, 졸업
const [bx, by] = curvePoint(...along('harden', 0.25), SPREAD_CURVE);
const [hx, hy] = curvePoint(...along('harden', 0.7), SPREAD_CURVE);
const [gx, gy] = curvePoint(...along('harden', 1), SPREAD_CURVE);

// p.2 입문 그래프: 구간 번호 ①–④ 위치 (곡선에서 살짝 위)
const PRIMER_CURVE = { w: 360, h: 84, pad: [6, 6, 14, 20] };
const PRIMER_MARKS = [[0.08, 0.26], [0.22, 0.6], [0.38, 0.565], along('harden', 0.5)]
  .map(([u, v]) => curvePoint(u, v, PRIMER_CURVE))
  .map(([x, y]) => [x - 9, y - 11]);

export function buildPages(c) {
  const head = (n) =>
    `<header class="ph"><span>Yield Point</span><span>p.${String(n).padStart(2, '0')} / ${TOTAL}</span></header>`;
  const foot = (section) => `<footer class="pf"><span>${c.spec}</span><span>${section}</span></footer>`;
  const title = (sec, h, meta = '', plain = '') =>
    `<div class="sec">${sec}</div><h2>${h}</h2>${meta ? `<div class="meta">${meta}</div>` : ''}` +
    (plain ? `<p class="plain"><b>${c.plain}</b>${plain}</p>` : '');
  const row = (label, text) => `<div class="obs"><b>${label}</b><p>${text}</p></div>`;
  const table = (rows, cls = 'data') =>
    `<table class="${cls}">${rows.map(([a, b]) => `<tr><td>${a}</td><td>${b}</td></tr>`).join('')}</table>`;

  /* jacket (tracing paper) */
  const j = c.jacket;
  const jacketLabel = `
    <div class="crop crop--tl"></div><div class="crop crop--tr"></div>
    <div class="crop crop--bl"></div><div class="crop crop--br"></div>
    <div class="label">
      <div class="label-row label-row--big"><span>${j.specimen}</span><span>No. 01</span></div>
      <div class="label-row"><span>${j.material}</span><span>Ajin Kim</span></div>
      <div class="label-row"><span>${j.test}</span><span>${j.testVal}</span></div>
      <div class="label-row"><span>${j.status}</span><span class="status"><i></i>${j.statusVal}</span></div>
    </div>`;
  const jacket = page('right', 0, jacketLabel, 'page--jacket');
  const jacketBack = page('left', 0, `<div class="mirror">${jacketLabel}</div>`, 'page--jacket page--jacket-back');

  /* 1 · cover */
  const p1 = page('right', 1, `
    <header class="ph"><span>${c.cover.head}</span><span>No. 01</span></header>
    <h1 class="cover-title">YIELD<br>POINT</h1>
    <p class="cover-sub">${c.cover.sub}</p>
    <p class="cover-plain">${c.cover.plain}</p>
    <div class="cover-fig">${dogboneVertical}</div>
    <footer class="pf"><span><b>Fig. 0</b> — ${c.cover.fig}</span><span>Ajin Kim</span></footer>
  `, 'page--cover');

  /* 2 · materials */
  const m = c.p2;
  const p2 = page('left', 2, `
    ${head(2)}
    ${title(m.sec, m.h)}
    ${table(m.rows)}
    <div class="primer">
      <div class="primer-head"><b>Fig. 1</b> — ${m.primer.head}</div>
      <p class="primer-intro">${m.primer.intro}</p>
      <div class="primer-curve">
        ${curveSVG({ ...PRIMER_CURVE, labels: c.axis, ticks: false })}
        <svg viewBox="0 0 ${PRIMER_CURVE.w} ${PRIMER_CURVE.h}" width="${PRIMER_CURVE.w}" height="${PRIMER_CURVE.h}" aria-hidden="true">
          ${PRIMER_MARKS.map(([x, y], i) => `
            <circle cx="${x}" cy="${y}" r="7" fill="var(--blue)"/>
            <text x="${x}" y="${y + 3}" text-anchor="middle" class="mark-n">${i + 1}</text>`).join('')}
        </svg>
      </div>
      <table class="primer-table">
        <tr><th></th><th></th><th>${m.primer.cols[0]}</th><th>${m.primer.cols[1]}</th></tr>
        ${m.primer.regions.map(([name, lab, me], i) =>
          `<tr><td><i>${i + 1}</i></td><td>${name}</td><td>${lab}</td><td>${me}</td></tr>`).join('')}
      </table>
    </div>
    ${foot(m.foot)}
  `);

  /* 3 · log 01 */
  const l = c.p3;
  const p3 = page('right', 3, `
    ${head(3)}
    ${title(l.sec, l.h, '2020.02 – 2022.12', l.plain)}
    <figure class="fig fig--curve">
      ${curveSVG({ w: 360, h: 190, hl: ['elastic'], faint: 'rgba(20,20,20,.16)', labels: c.axis })}
      <figcaption><b>Fig. 2</b> — ${l.fig}</figcaption>
    </figure>
    ${row(c.obs, l.obs)}
    ${foot(l.foot)}
  `);

  /* 4–5 · center spread */
  const sp = c.spread;
  const spread = `
  <div class="spread">
    <header class="ph ph--abs" style="left:30px;right:450px"><span>Yield Point</span><span>p.04 / ${TOTAL}</span></header>
    <header class="ph ph--abs" style="left:450px;right:30px"><span>Yield Point</span><span>p.05 / ${TOTAL}</span></header>

    <div class="spread-title">${title(sp.sec, sp.h, '2022.12', sp.plain)}</div>

    <div class="spread-curve" style="left:30px;top:${CT}px">
      ${curveSVG({ ...SPREAD_CURVE, hl: ['yield', 'drawing'], sw: 1.8, labels: c.axis })}
      <svg class="spread-ghost" viewBox="0 0 780 296" width="780" height="296" aria-hidden="true">
        <circle cx="${yx}" cy="${yy}" r="4.5" fill="var(--paper)" stroke="var(--blue)" stroke-width="1.6"/>
        <path d="M${yx} ${yy - 8} V${yy - 70}" stroke="var(--blue)" stroke-width=".8"/>
        <g fill="var(--paper)" stroke="#141414" stroke-width="1.4">
          <circle cx="${bx}" cy="${by}" r="3.5"/><circle cx="${hx}" cy="${hy}" r="3.5"/><circle cx="${gx}" cy="${gy}" r="3.5"/>
        </g>
        <g stroke="#141414" stroke-width=".8">
          <path d="M${bx} ${by - 7} V${by - 56}"/><path d="M${hx} ${hy - 7} V${hy - 56}"/><path d="M${gx} ${gy + 7} V${gy + 22}"/>
        </g>
      </svg>
    </div>

    <div class="callout" style="left:${30 + yx + 8}px;top:${CT + yy - 82}px">
      <b>2022.12</b><br>${sp.yieldNote}
    </div>
    <div class="callout" style="left:262px;top:${CT + py + 26}px">
      <b>2023.02–2024.02</b><br>${sp.drawing}
    </div>
    <div class="callout callout--ink" style="left:${30 + bx + 6}px;top:${CT + by - 92}px">
      <b>2025.02–08</b><br>${sp.bootcamp}
    </div>
    <div class="callout callout--ink" style="left:${30 + hx + 6}px;top:${CT + hy - 92}px">
      <b>2025.11</b><br>${sp.hired}
    </div>
    <div class="callout callout--ink" style="left:${30 + gx + 6}px;top:${CT + gy + 14}px">
      <b>2026.02</b><br>${sp.graduated}
    </div>

    <div class="spread-obs">${row(c.obs, sp.obs)}</div>
    <figcaption class="spread-cap"><b>Fig. 3</b> — ${sp.fig}</figcaption>

    <footer class="pf pf--abs" style="left:30px;right:450px"><span>${c.spec}</span><span>${sp.foot}</span></footer>
    <footer class="pf pf--abs" style="left:450px;right:30px"><span>${c.spec}</span><span>${sp.foot}</span></footer>
  </div>`;
  const p4 = page('left', 4, `<div class="spread-wrap" style="left:0">${spread}</div>`, 'page--spread');
  const p5 = page('right', 5, `<div class="spread-wrap" style="left:-${PW}px">${spread}</div>`, 'page--spread');

  /* 6 · log 03 — Australia */
  const au = c.p6;
  const p6 = page('left', 6, `
    ${head(6)}
    ${title(au.sec, au.h, '2023.02 – 2024.02', au.plain)}
    ${table(au.rows, 'data data--compact')}
    <figure class="fig fig--curve">
      ${curveSVG({ w: 360, h: 150, hl: ['drawing'], faint: 'rgba(20,20,20,.16)', labels: c.axis })}
      <figcaption><b>Fig. 4</b> — ${au.fig}</figcaption>
    </figure>
    ${row(c.obs, au.obs)}
    ${row(au.decision, au.decisionText)}
    ${foot(au.foot)}
  `);

  /* 7 · log 04 — bootcamp */
  const bc = c.p7;
  const p7 = page('right', 7, `
    ${head(7)}
    ${title(bc.sec, bc.h, '2025.02 – 2025.08', bc.plain)}
    <figure class="fig">
      ${interestChart(bc, c.axis)}
      <figcaption><b>Fig. 5</b> — ${bc.fig}</figcaption>
    </figure>
    ${row(c.obs, bc.obs)}
    ${row(bc.result, bc.resultText)}
    ${foot(bc.foot)}
  `);

  /* 8 · discussion */
  const d = c.p8;
  const p8 = page('left', 8, `
    ${head(8)}
    ${title(d.sec, d.h, '2025.02 –', d.plain)}
    <ol class="timeline">${d.timeline.map(([t, x]) => `<li><span>${t}</span>${x}</li>`).join('')}</ol>
    ${row(c.obs, d.obs)}
    <table class="data data--loads">
      <tr><th>${d.loadsHead[0]}</th><th>${d.loadsHead[1]}</th></tr>
      ${d.loads.map((x) => `<tr><td>${x}</td><td><i class="bar"></i></td></tr>`).join('')}
    </table>
    ${row(d.result, d.resultText)}
    ${foot(d.foot)}
  `);

  /* 9 · future work */
  const f = c.p9;
  const p9 = page('right', 9, `
    ${head(9)}
    ${title(f.sec, f.h, '', f.plain)}
    ${row(c.obs, f.obs)}
    <ul class="checklist">${f.list.map((x) => `<li>${x}</li>`).join('')}</ul>
    ${row(f.hyp, f.hypText)}
    ${row(f.note, f.noteText)}
    <div class="running"><i></i>${f.running}</div>
    ${foot(f.foot)}
  `);

  /* 10 · colophon */
  const k = c.p10;
  const p10 = page('left', 10, `
    ${head(10)}
    ${title(k.sec, k.h)}
    ${table(k.rows)}
    ${foot(k.foot)}
  `, 'page--back');

  return { jacket, jacketBack, 1: p1, 2: p2, 3: p3, 4: p4, 5: p5, 6: p6, 7: p7, 8: p8, 9: p9, 10: p10 };
}
