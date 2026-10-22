// 실험대 소품 — 위에서 내려다본 시점, 책 중심 = (900, 620)

function ruler(x, y, rot, len = 560) {
  let ticks = '';
  for (let i = 0; i <= len - 20; i += 4) {
    const mm = i / 4;
    const l = mm % 10 === 0 ? 14 : mm % 5 === 0 ? 9 : 5;
    ticks += `<path d="M${i + 10} 0 v${l}"/>`;
    if (mm % 10 === 0) ticks += `<text x="${i + 10}" y="24" text-anchor="middle">${mm / 10}</text>`;
  }
  return `
  <g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#shadow)">
    <rect width="${len}" height="46" rx="2" fill="url(#steel)"/>
    <rect width="${len}" height="46" rx="2" fill="none" stroke="rgba(255,255,255,.25)"/>
    <g stroke="#2a2e33" stroke-width=".8">${ticks}</g>
    <text x="${len - 14}" y="38" text-anchor="end" fill="#2a2e33" font-family="IBM Plex Mono, monospace" font-size="7" letter-spacing="1.5">STAINLESS · cm</text>
  </g>`;
}

function beaker(x, y, r = 108) {
  let grads = '';
  for (let a = -60; a <= 60; a += 12) grads += `<path d="M0 ${-r + 6} v${a % 24 === 0 ? 10 : 6}" transform="rotate(${a + 180})"/>`;
  return `
  <g transform="translate(${x} ${y})">
    <circle r="${r + 4}" fill="rgba(0,0,0,.5)" transform="translate(14 20)" filter="url(#blur)"/>
    <circle r="${r - 10}" fill="url(#liquid)"/>
    <circle r="${r}" fill="rgba(210,225,245,.05)" stroke="rgba(215,230,250,.42)" stroke-width="3.5"/>
    <circle r="${r - 6}" fill="none" stroke="rgba(215,230,250,.14)" stroke-width="1.2"/>
    <path d="M-12 ${-r - 1} Q0 ${-r - 18} 12 ${-r - 1}" fill="none" stroke="rgba(215,230,250,.45)" stroke-width="3"/>
    <g stroke="rgba(230,240,255,.35)" stroke-width="1.2">${grads}</g>
    <path d="M${-r * 0.62} ${-r * 0.5} A ${r * 0.8} ${r * 0.8} 0 0 1 ${r * 0.25} ${-r * 0.77}" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="${r * 0.3}" cy="${r * 0.32}" rx="${r * 0.28}" ry="${r * 0.12}" fill="rgba(255,255,255,.08)" transform="rotate(-30)"/>
  </g>`;
}

function petri(x, y, r = 84) {
  const drops = [
    [-26, -18, 13, '#2c5ff0'], [18, -30, 8, '#ff7a59'], [30, 12, 11, '#f2c14e'],
    [-6, 26, 9, '#2c5ff0'], [-38, 18, 6, '#ff7a59'], [8, -2, 5, '#7fb6ff'],
  ];
  return `
  <g transform="translate(${x} ${y})">
    <circle r="${r + 2}" fill="rgba(0,0,0,.45)" transform="translate(10 14)" filter="url(#blur)"/>
    <circle r="${r}" fill="rgba(220,235,255,.05)" stroke="rgba(215,230,250,.38)" stroke-width="2.5"/>
    <circle r="${r - 7}" fill="none" stroke="rgba(215,230,250,.16)" stroke-width="1.2"/>
    ${drops.map(([dx, dy, dr, c]) => `
      <circle cx="${dx}" cy="${dy}" r="${dr}" fill="${c}" opacity=".78"/>
      <circle cx="${dx - dr * 0.3}" cy="${dy - dr * 0.35}" r="${dr * 0.28}" fill="#fff" opacity=".55"/>`).join('')}
    <path d="M${-r * 0.7} ${-r * 0.45} A ${r * 0.85} ${r * 0.85} 0 0 1 ${-r * 0.1} ${-r * 0.82}" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="3" stroke-linecap="round"/>
  </g>`;
}

function specimen(x, y, rot) {
  return `
  <g transform="translate(${x} ${y}) rotate(${rot}) scale(1.05)" filter="url(#shadow)">
    <path d="M0 0 H80 C100 0 106 19 126 19 H214 C234 19 240 0 260 0 H340 V60 H260 C240 60 234 41 214 41 H126 C106 41 100 60 80 60 H0 Z"
          fill="rgba(80,130,255,.32)" stroke="rgba(160,190,255,.7)" stroke-width="1.5"/>
    <path d="M10 8 H70 M270 8 H330" stroke="rgba(255,255,255,.35)" stroke-width="2" stroke-linecap="round"/>
    <path d="M145 15 V45 M195 15 V45" stroke="#fff" stroke-width="2" opacity=".85"/>
    <text x="40" y="38" fill="rgba(255,255,255,.75)" font-family="IBM Plex Mono, monospace" font-size="10" letter-spacing="1">01</text>
  </g>`;
}

function pencil(x, y, rot) {
  let ribs = '';
  for (let i = 0; i < 14; i++) ribs += `<path d="M${40 + i * 6} 1 v16"/>`;
  return `
  <g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#shadow)">
    <path d="M0 9 L22 3 H30 V15 H22 Z" fill="#9aa2ab"/>
    <path d="M0 9 L6 7.4 V10.6 Z" fill="#222"/>
    <rect x="30" y="0" width="100" height="18" rx="3" fill="#22262b"/>
    <g stroke="#3a4048" stroke-width="2">${ribs}</g>
    <rect x="130" y="1" width="250" height="16" rx="2" fill="#2d3238"/>
    <rect x="130" y="2" width="250" height="4" fill="rgba(255,255,255,.08)"/>
    <rect x="240" y="-3" width="120" height="6" rx="3" fill="#a9b0b8"/>
    <rect x="380" y="2" width="22" height="14" rx="2" fill="#b9c0c7"/>
    <text x="150" y="13" fill="rgba(255,255,255,.4)" font-family="IBM Plex Mono, monospace" font-size="8" letter-spacing="2">0.5 HB</text>
  </g>`;
}

function tape(x, y, rot) {
  const W = 210, H = 52;
  const pts = [];
  for (let i = 0; i <= H; i += 6.5) pts.push(`${W + (i % 13 ? 3 : -2)},${i}`);
  for (let i = H; i >= 0; i -= 6.5) pts.push(`${i % 13 ? -3 : 2},${i}`);
  return `
  <g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#shadowSoft)">
    <polygon points="${pts.join(' ')}" fill="#d9cfb4" opacity=".93"/>
    <rect width="210" height="52" fill="url(#tapeTex)" opacity=".5"/>
    <text x="16" y="22" fill="#2f2a20" font-family="IBM Plex Mono, monospace" font-size="12" font-weight="600" letter-spacing="1.5">SPECIMEN 01</text>
    <text x="16" y="39" fill="#4a4335" font-family="IBM Plex Mono, monospace" font-size="9" letter-spacing=".5">do not discard · 2026.10</text>
  </g>`;
}

function stain(x, y, r) {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="rgba(160,130,90,.16)" stroke-width="6" filter="url(#blurS)"/>
          <circle cx="${x + 3}" cy="${y - 2}" r="${r - 4}" fill="none" stroke="rgba(160,130,90,.08)" stroke-width="2"/>`;
}

// 흡수 패드(벤치 라이너) — 실험 노트 밑에 깔린 흰 패드
function pad(x, y, w, h, rot) {
  return `
  <g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#shadowSoft)">
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="3" fill="#e6e9e8"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="3" fill="url(#quilt)"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="3" fill="url(#padLight)"/>
    <rect x="${-w / 2 + 1}" y="${-h / 2 + 1}" width="${w - 2}" height="${h - 2}" rx="3" fill="none" stroke="rgba(255,255,255,.55)"/>
    <text x="${w / 2 - 18}" y="${h / 2 - 16}" text-anchor="end" fill="rgba(60,70,80,.45)" font-family="IBM Plex Mono, monospace" font-size="9" letter-spacing="2">BENCH LINER · ABSORBENT SIDE UP</text>
  </g>`;
}

function tubeRack(x, y, rot) {
  const caps = [
    ['#2c5ff0', '#2c5ff0', null, '#e9eef5', '#ff7a59', null],
    [null, '#f2c14e', '#e9eef5', '#2c5ff0', null, '#7fb6ff'],
  ];
  let holes = '';
  caps.forEach((rowCaps, r) => rowCaps.forEach((c, i) => {
    const cx = 34 + i * 42, cy = 30 + r * 42;
    holes += c
      ? `<circle cx="${cx}" cy="${cy}" r="14" fill="${c}"/><circle cx="${cx}" cy="${cy}" r="9" fill="none" stroke="rgba(0,0,0,.18)" stroke-width="1.5"/><circle cx="${cx - 4}" cy="${cy - 5}" r="3" fill="#fff" opacity=".5"/>`
      : `<circle cx="${cx}" cy="${cy}" r="13" fill="#2a2f35"/><circle cx="${cx}" cy="${cy}" r="13" fill="none" stroke="rgba(0,0,0,.25)"/>`;
  }));
  return `
  <g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#shadow)">
    <rect width="278" height="102" rx="6" fill="#e9ecee"/>
    <rect width="278" height="102" rx="6" fill="none" stroke="rgba(255,255,255,.7)"/>
    ${holes}
  </g>`;
}

function glove(x, y, rot) {
  const c = '#5d80df';
  return `
  <g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#shadow)">
    <g fill="${c}">
      <rect x="-50" y="60" width="100" height="95" rx="10"/>
      <rect x="-56" y="-62" width="112" height="140" rx="42"/>
      <rect x="-56" y="-150" width="27" height="112" rx="13.5" transform="rotate(-6 -42 -60)"/>
      <rect x="-24" y="-168" width="27" height="124" rx="13.5"/>
      <rect x="8" y="-156" width="26" height="114" rx="13" transform="rotate(4 21 -60)"/>
      <rect x="36" y="-118" width="23" height="84" rx="11.5" transform="rotate(10 47 -40)"/>
      <rect x="-104" y="-36" width="29" height="92" rx="14.5" transform="rotate(-38 -60 30)"/>
    </g>
    <path d="M-50 150 H50" stroke="#86a2ec" stroke-width="6" stroke-linecap="round"/>
    <path d="M-36 -20 C-30 10 -30 40 -24 64 M-6 -40 V40 M22 -30 C26 0 26 30 22 56" stroke="rgba(255,255,255,.16)" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g>`;
}

function timer(x, y, rot) {
  return `
  <g transform="translate(${x} ${y}) rotate(${rot})" filter="url(#shadow)">
    <rect width="128" height="118" rx="14" fill="#e4e6e8"/>
    <rect x="12" y="14" width="104" height="46" rx="4" fill="#a9b4a3"/>
    <text x="64" y="47" text-anchor="middle" fill="#1f251d" font-family="IBM Plex Mono, monospace" font-size="27" font-weight="500">03:42</text>
    <g fill="#c8ccd0" stroke="rgba(0,0,0,.12)">
      <rect x="12" y="74" width="30" height="28" rx="6"/><rect x="49" y="74" width="30" height="28" rx="6"/>
      <rect x="86" y="74" width="30" height="28" rx="6" fill="#ff7a59"/>
    </g>
    <g fill="#55606a" font-family="IBM Plex Mono, monospace" font-size="7" text-anchor="middle">
      <text x="27" y="91">MIN</text><text x="64" y="91">SEC</text><text x="101" y="91" fill="#fff">ST</text>
    </g>
  </g>`;
}

export function propsSVG() {
  return `
<svg viewBox="0 0 1800 1240" width="1800" height="1240" aria-hidden="true">
  <defs>
    <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c9cfd5"/><stop offset=".45" stop-color="#e3e7eb"/>
      <stop offset=".55" stop-color="#b7bec5"/><stop offset="1" stop-color="#9aa2aa"/>
    </linearGradient>
    <radialGradient id="liquid" cx=".4" cy=".4" r=".7">
      <stop offset="0" stop-color="#3f74ff" stop-opacity=".55"/>
      <stop offset=".7" stop-color="#1d46c9" stop-opacity=".55"/>
      <stop offset="1" stop-color="#0f2a85" stop-opacity=".7"/>
    </radialGradient>
    <radialGradient id="padLight" cx=".5" cy=".45" r=".75">
      <stop offset="0" stop-color="#fff" stop-opacity=".18"/>
      <stop offset="1" stop-color="#000" stop-opacity=".18"/>
    </radialGradient>
    <pattern id="quilt" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <path d="M0 0 H28 M0 0 V28" stroke="rgba(40,50,60,.07)" stroke-width="1.2"/>
    </pattern>
    <pattern id="tapeTex" width="4" height="4" patternUnits="userSpaceOnUse">
      <path d="M0 0 L4 4" stroke="rgba(120,100,60,.25)" stroke-width=".5"/>
    </pattern>
    <filter id="shadow" x="-30%" y="-50%" width="160%" height="220%">
      <feDropShadow dx="6" dy="12" stdDeviation="7" flood-color="#000" flood-opacity=".55"/>
    </filter>
    <filter id="shadowSoft" x="-20%" y="-50%" width="140%" height="220%">
      <feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="#000" flood-opacity=".5"/>
    </filter>
    <filter id="blur"><feGaussianBlur stdDeviation="12"/></filter>
    <filter id="blurS"><feGaussianBlur stdDeviation="1.2"/></filter>
  </defs>

  ${pad(900, 628, 960, 690, -0.8)}

  ${stain(1620, 830, 52)}
  ${tubeRack(70, 340, -6)}
  ${petri(255, 640, 74)}
  ${glove(262, 935, 28)}
  ${pencil(230, 1075, -6)}

  ${beaker(1520, 360, 100)}
  ${timer(1470, 560, 8)}
  ${specimen(1460, 1080, -68)}

  ${ruler(406, 380, 90, 520)}
  ${tape(390, 292, -9)}
</svg>`;
}
