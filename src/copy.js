// 모든 문구. 페이지 구조는 pages.js, 문구는 여기서만 고친다.

export const COPY = {
  en: {
    spec: 'Specimen No. 01',
    plain: 'In plain words',
    axis: ['Load', 'Stretch'],
    obs: 'Observation',

    jacket: { specimen: 'SPECIMEN', material: 'Material', test: 'Test', testVal: 'Tensile', status: 'Status', statusVal: 'In progress' },

    cover: {
      head: 'Tensile test report',
      sub: 'A tensile test report<br>on one career',
      plain: 'How a polymer engineering student became a designer — written up as a lab report.',
      fig: 'Specimen, before test',
    },

    p2: {
      sec: '01 — Materials', h: 'Specimen No. 01', foot: 'Materials',
      rows: [
        ['Origin', 'B.Eng. Polymer Engineering, 2020–2026'],
        ['Initial purpose', 'Cosmetic research (color, mixing)'],
        ['Processing', 'UI/UX bootcamp, 2025.02–08'],
        ['Current application', 'Web designer, TK C&amp;CO, 2025.11–'],
        ['Test method', 'Tensile test (see Fig. 1)'],
      ],
      primer: {
        head: 'How a tensile test works',
        intro: 'A tensile test pulls a sample slowly and records how hard it’s pulled (load) and how far it stretches. In this report, the sample is me — and the load is new challenges.',
        cols: ['In the lab', 'In this report'],
        regions: [
          ['Elastic', 'Stretches, then springs back', 'Studying chemistry fundamentals'],
          ['Yield point', 'Starts to change shape for good', 'A small pull toward web design'],
          ['Cold drawing', 'Chains line up with the pull', 'Choosing to follow that interest'],
          ['Hardening', 'Gets stronger as it’s pulled', 'Interest growing into passion'],
        ],
      },
    },

    p3: {
      sec: '02 — Log 01', h: 'Elastic region', foot: 'Log 01',
      plain: 'Years of chemistry fundamentals, waiting for the part where I could experiment on my own. I stretched — but nothing in me changed.',
      fig: 'Pulled, then back to the original shape',
      obs: 'Load increased. Specimen stretched, but held its original form.',
    },

    spread: {
      sec: '03 — Log 02', h: 'Yield point', foot: 'Log 02',
      plain: 'I wanted to find what I was good at, so I joined a winter coding course for non-majors. Not a reason to switch yet — just a small pull.',
      yieldNote: 'Coding course for non-majors<br>Winter break, 3 months<br>CSS<br>A small pull: web design',
      drawing: 'Cold drawing: chains aligning<br>Working holiday, Australia',
      bootcamp: 'UI/UX bootcamp<br>6 months',
      hired: 'Hired: web designer<br>TK C&amp;CO',
      graduated: 'Graduated<br>Polymer Engineering',
      obs: 'Specimen did not return to its original form. A new direction had appeared.',
      fig: 'Where the chains started to align',
    },

    p6: {
      sec: '04 — Log 03', h: 'Cold drawing', foot: 'Log 03',
      plain: 'A year in Australia showed me how much of the world there is to see. I came back ambitious — wanting to find my passion, and to see more of the world through it.',
      rows: [
        ['Location', 'Australia, working holiday'],
        ['Duration', '12 months'],
        ['Finding', 'So much of the world left to see'],
      ],
      fig: 'Under a steady pull, the chains line up',
      obs: 'Load held steady. Chains slowly aligned with the direction of the pull.',
      decision: 'Decision', decisionText: 'Be ambitious. Find a passion, and follow it further.',
    },

    p7: {
      sec: '05 — Log 04', h: 'Interest, increasing', foot: 'Log 04',
      plain: 'During the UI/UX bootcamp, my interest kept getting bigger and bigger — until I knew I’d finally found my passion.',
      chartHead: 'Interest, by month',
      months: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      peak: 'passion',
      fig: 'Interest during the UI/UX bootcamp, 2025.02–08',
      obs: 'Under each new load, interest increased instead of fading.',
      result: 'Result', resultText: 'Passion found. Specimen committed to design.',
    },

    p8: {
      sec: '06 — Discussion', h: 'Strain hardening', foot: 'Discussion',
      plain: 'Aligned chains carry more load. The more design work I take on, the stronger I get.',
      timeline: [['2025.02–08', 'UI/UX bootcamp, 6 months'], ['2025.11', 'Hired as a web designer, TK C&amp;CO'], ['2026.02', 'Graduated, Polymer Engineering']],
      obs: 'Under new loads, the specimen grew stronger.',
      loadsHead: ['Loads tested', 'Interest'],
      loads: ['Packaging', 'Web', 'Exhibition space', 'Content marketing'],
      result: 'Result', resultText: 'No loss of interest observed.',
    },

    p9: {
      sec: '07 — Future work', h: 'Test in progress', foot: 'Future work',
      plain: 'Here’s what I want to study next — the loads I’m choosing to take on.',
      obs: 'Next loads to apply — what I want to study:',
      list: ['Typography', 'Editorial design', 'Art history', '3D design', 'Sketching'],
      hyp: 'Hypothesis', hypText: 'A second process, from the beginning, will make the material stronger.',
      note: 'Note', noteText: 'The first test did not fail. It measured what I am made of.',
      running: 'Test in progress. Fracture not observed.',
    },

    p10: {
      sec: '08 — Colophon', h: 'Test record', foot: 'Colophon',
      rows: [
        ['Typefaces', 'IBM Plex Mono, Newsreader'],
        ['Paper', 'Snow 100 g, matte'],
        ['Format', 'A6, 105 × 148 mm, 10 pp.'],
        ['Printing', 'Digital'],
        ['Date', '2026.10'],
        ['Place', 'Busan'],
        ['Contact', 'Behance · Instagram'],
      ],
    },

    ui: {
      hudSub: 'Tensile lab · Bench 03 · Specimen No. 01',
      stretch: 'Stretch', load: 'Load', stage: 'Stage',
      turn: 'Turn page', open: 'Open jacket', close: 'Close report',
      prev: 'Previous page',
      hint: '← → keys · click or drag the page',
      states: [
        ['Jacket', 'Specimen sleeve', 'Pre-test'],
        ['p. 01 / 10', 'Cover', 'Ready'],
        ['p. 02–03 / 10', 'Materials · Elastic region', 'Elastic'],
        ['p. 04–05 / 10', 'Yield point', 'Yield point'],
        ['p. 06–07 / 10', 'Cold drawing · Interest, increasing', 'Cold drawing'],
        ['p. 08–09 / 10', 'Strain hardening · Future work', 'Hardening'],
        ['p. 10 / 10', 'Colophon', 'In progress'],
      ],
    },
  },

};
